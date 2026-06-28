const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { generateEventDraft } = require("./event-generator");

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const SCHOOLS_FILE = path.join(DATA_DIR, "schools.json");
const RESEARCH_FILE = path.join(DATA_DIR, "research.json");
const PORT = Number(process.env.PORT || 4180);
const HOST = process.env.HOST || "127.0.0.1";
const MAX_BODY = 1024 * 1024;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const DEFAULT_WEIGHTS = {
  eventFrequency: 1,
  academicPressure: 1,
  socialSupport: 1,
  recovery: 1,
  trustSensitivity: 1,
};

const EVENT_STAT_ALIASES = {
  wisdom: "wisdom",
  authority: "wisdom",
  stamina: "stamina",
  teacherStamina: "stamina",
  mood: "mood",
  teacherMood: "mood",
  peerFavor: "peerFavor",
  studentFavor: "peerFavor",
  homeroomTrust: "homeroomTrust",
  gradeTrust: "homeroomTrust",
};

const RESET_SCHOOL_NAME = "未命名学校";

const DEFAULT_SCHOOL = {
  id: "demo-school",
  name: "示例学校",
  tagline: "每所学校都有自己的生存规则。",
  skin: {
    primary: "#245f61",
    accent: "#d09a39",
    danger: "#b64d3f",
    sky: "#10242b",
  },
  weights: { ...DEFAULT_WEIGHTS },
  autoIteration: true,
  version: 1,
  lastIterationSessionCount: 0,
  customEvents: [],
};

function resetSchoolConfig(school) {
  return {
    ...school,
    name: RESET_SCHOOL_NAME,
    tagline: DEFAULT_SCHOOL.tagline,
    skin: { ...DEFAULT_SCHOOL.skin },
    weights: { ...DEFAULT_WEIGHTS },
    autoIteration: true,
    version: Number(school.version || 1) + 1,
    lastIterationSessionCount: 0,
    customEvents: [],
    updatedAt: new Date().toISOString(),
  };
}

function ensureDataFiles() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(SCHOOLS_FILE)) writeJson(SCHOOLS_FILE, [DEFAULT_SCHOOL]);
  if (!fs.existsSync(RESEARCH_FILE)) {
    writeJson(RESEARCH_FILE, { sessions: [], choices: [], feedback: [], iterations: [], reportSnapshots: [] });
  }
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(file, value) {
  const temporary = `${file}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(value, null, 2));
  fs.renameSync(temporary, file);
}

function sendJson(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
  });
  res.end(body);
}

function sendError(res, status, message) {
  sendJson(res, status, { ok: false, error: message });
}

function isLocalRequest(req) {
  const forwarded = String(req.headers["x-forwarded-host"] || "").split(",")[0].trim();
  const host = forwarded || String(req.headers.host || "");
  const hostname = host.replace(/^\[/, "").replace(/\].*$/, "").split(":")[0].toLowerCase();
  return hostname === "127.0.0.1" || hostname === "localhost" || hostname === "::1";
}

function isAdminApi(req, url) {
  return url.pathname === "/api/report";
}

function hashEditToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function canEditSchool(req, school) {
  if (isLocalRequest(req)) return true;
  const provided = hashEditToken(req.headers["x-school-edit-token"]);
  const expected = String(school.editTokenHash || "");
  if (!expected || provided.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

function publicSchoolConfig(school) {
  const { editTokenHash, ...safeSchool } = school;
  return safeSchool;
}

async function readBody(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw new Error("请求内容过大");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function cleanText(value, maxLength = 240) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);
}

const RESEARCH_RETENTION_MS = 180 * 24 * 60 * 60 * 1000;

function pruneResearchData(research, now = Date.now()) {
  const cutoff = now - RESEARCH_RETENTION_MS;
  const expiredSessionIds = new Set(
    research.sessions
      .filter((session) => {
        const timestamp = Date.parse(session.completedAt || session.startedAt || 0);
        return Number.isFinite(timestamp) && timestamp < cutoff;
      })
      .map((session) => session.id)
  );
  if (!expiredSessionIds.size) return 0;
  research.sessions = research.sessions.filter((session) => !expiredSessionIds.has(session.id));
  research.choices = research.choices.filter((choice) => !expiredSessionIds.has(choice.sessionId));
  research.feedback = research.feedback.filter((feedback) => !expiredSessionIds.has(feedback.sessionId));
  research.reportSnapshots = research.reportSnapshots.filter((report) => !expiredSessionIds.has(report.sessionId));
  return expiredSessionIds.size;
}

function cleanId(value) {
  return cleanText(value, 80).replace(/[^a-zA-Z0-9_-]/g, "");
}

function slugify(value) {
  const latin = cleanText(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return latin || `school-${crypto.randomBytes(5).toString("hex")}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number(value) || 0));
}

function sanitizeHex(value, fallback) {
  const next = cleanText(value, 7);
  return /^#[0-9a-fA-F]{6}$/.test(next) ? next : fallback;
}

function sanitizeWeights(input = {}) {
  return Object.fromEntries(
    Object.entries(DEFAULT_WEIGHTS).map(([key, fallback]) => [key, clamp(input[key] ?? fallback, 0.6, 1.4)])
  );
}

function sanitizeSchoolUpdate(existing, input) {
  return {
    ...existing,
    name: cleanText(input.name ?? existing.name, 60) || existing.name,
    tagline: cleanText(input.tagline ?? existing.tagline, 140),
    skin: {
      primary: sanitizeHex(input.skin?.primary, existing.skin.primary),
      accent: sanitizeHex(input.skin?.accent, existing.skin.accent),
      danger: sanitizeHex(input.skin?.danger, existing.skin.danger),
      sky: sanitizeHex(input.skin?.sky, existing.skin.sky),
    },
    weights: sanitizeWeights({ ...existing.weights, ...(input.weights || {}) }),
    autoIteration: input.autoIteration === undefined ? existing.autoIteration : Boolean(input.autoIteration),
    updatedAt: new Date().toISOString(),
  };
}

function classifyPrompt(prompt) {
  const rules = [
    ["academic", /作业|考试|测验|成绩|ddl|project|论文|竞赛|学习|课程/i],
    ["social", /同学|朋友|社交|小组|合作|孤独|排挤|班级/i],
    ["trust", /班主任|老师|年级|处分|检查|纪律|手机|迟到/i],
    ["wellbeing", /压力|焦虑|心情|睡眠|疲惫|体能|生病|心理/i],
    ["campus", /食堂|宿舍|校车|网络|wifi|设施|空调|校园/i],
  ];
  return rules.find(([, pattern]) => pattern.test(prompt))?.[0] || "campus";
}

function effectsForCategory(category, route) {
  const student = {
    academic: [["wisdom", 2], ["mood", -1]],
    social: [["peerFavor", 2], ["mood", 1]],
    trust: [["homeroomTrust", 2], ["mood", -1]],
    wellbeing: [["stamina", 2], ["mood", 2]],
    campus: [["mood", 1], ["stamina", 1]],
  };
  const teacher = {
    academic: [["authority", 2], ["teacherStamina", -1]],
    social: [["studentFavor", 2], ["teacherMood", 1]],
    trust: [["gradeTrust", 2], ["studentFavor", -1]],
    wellbeing: [["teacherStamina", 2], ["teacherMood", 2]],
    campus: [["teacherMood", 1], ["teacherStamina", 1]],
  };
  return route === "teacher" ? teacher[category] : student[category];
}

function invertEffects(effects) {
  return effects.map(([stat, delta]) => [stat, delta > 0 ? -1 : 1]);
}

function generateEvent(prompt, route = "student") {
  return generateEventDraft(cleanText(prompt, 320), route);
}

function sanitizeEventTranslations(input = {}, existing = {}) {
  const sanitizeLanguage = (language, fallback = {}) => {
    if (!language && !fallback) return null;
    return {
      title: cleanText(language?.title ?? fallback?.title, 60),
      description: cleanText(language?.description ?? fallback?.description, 360),
      options: Array.from({ length: 3 }, (_, index) => ({
        id: cleanId(language?.options?.[index]?.id || fallback?.options?.[index]?.id) || `choice_${index + 1}`,
        label: cleanText(language?.options?.[index]?.label ?? fallback?.options?.[index]?.label, 60),
        detail: cleanText(language?.options?.[index]?.detail ?? fallback?.options?.[index]?.detail, 180),
      })),
    };
  };
  const zh = sanitizeLanguage(input.zh, existing.zh);
  const en = sanitizeLanguage(input.en, existing.en);
  return zh || en ? { zh, en } : undefined;
}

function sanitizeEventEffects(input, fallback = []) {
  const source = Array.isArray(input) ? input : fallback;
  const effects = source.slice(0, 4).map((effect) => ({
    stat: EVENT_STAT_ALIASES[cleanText(effect?.stat, 40)] || "",
    delta: clamp(effect?.delta, -5, 5),
  })).filter((effect) => effect.stat && effect.delta !== 0);
  if (effects.length) return effects;
  if (source !== fallback) return sanitizeEventEffects(fallback, []);
  return [{ stat: "mood", delta: 1 }];
}

function sanitizeEventOptions(input, existing = []) {
  if (!Array.isArray(input)) return existing;
  return Array.from({ length: 3 }, (_, index) => {
    const option = input[index] || existing[index] || {};
    const fallback = existing[index] || {};
    return {
      id: cleanId(fallback.id || option?.id) || `choice_${index + 1}`,
      label: cleanText(option?.label, 60) || cleanText(fallback.label, 60) || `选择 ${index + 1}`,
      detail: cleanText(option?.detail, 180),
      effects: sanitizeEventEffects(option?.effects, fallback.effects),
    };
  });
}

function sanitizeEvent(existing, input) {
  const route = ["student", "teacher", "both"].includes(input.route) ? input.route : existing.route;
  return {
    ...existing,
    title: cleanText(input.title ?? existing.title, 60),
    description: cleanText(input.description ?? existing.description, 360),
    route,
    chance: clamp(input.chance ?? existing.chance, 1, 100),
    enabled: input.enabled === undefined ? existing.enabled : Boolean(input.enabled),
    options: sanitizeEventOptions(input.options, existing.options),
    sourceLanguage: input.sourceLanguage === "en" ? "en" : existing.sourceLanguage || "zh",
    translations: sanitizeEventTranslations(input.translations, existing.translations),
    updatedAt: new Date().toISOString(),
  };
}

function countBy(items, keyFn) {
  const counts = {};
  items.forEach((item) => {
    const key = keyFn(item);
    if (!key) return;
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

function endingIsBad(endingId) {
  return /madness|no_school|transfer|disappeared|lone_wolf|student_favor_zero|grade_group_zero|lost_authority|devil_teacher/.test(
    String(endingId || "")
  );
}

function summarizeBreakdown(sessions, field) {
  const groups = {};
  sessions.forEach((session) => {
    const key = session[field] || "未填写";
    groups[key] ||= [];
    groups[key].push(session);
  });
  return Object.entries(groups).map(([group, rows]) => ({
    group,
    plays: rows.length,
    badEndingRate: rows.length ? rows.filter((row) => endingIsBad(row.endingId)).length / rows.length : 0,
    topEnding: countBy(rows, (row) => row.endingTitle || row.endingId)[0]?.key || "暂无",
  }));
}

function buildReport(schoolId, schools, research, includeHistory = true) {
  const school = schools.find((item) => item.id === schoolId) || schools[0];
  const sessions = research.sessions.filter((item) => item.schoolId === school.id && item.completedAt);
  const sessionIds = new Set(sessions.map((item) => item.id));
  const choices = research.choices.filter((item) => sessionIds.has(item.sessionId));
  const feedback = research.feedback.filter((item) => sessionIds.has(item.sessionId));
  const players = new Set(sessions.map((item) => item.clientId).filter(Boolean));
  const average = (values) => values.length ? values.reduce((sum, value) => sum + Number(value || 0), 0) / values.length : 0;
  const choiceCounts = countBy(choices, (item) => item.choiceLabel || item.choiceId);
  const endingCounts = countBy(sessions, (item) => item.endingTitle || item.endingId);
  const feedbackTopics = countBy(feedback, (item) => item.topic);
  const negativeStats = {};
  const mechanisms = {};

  choices.forEach((choice) => {
    Object.entries(choice.deltas || {}).forEach(([stat, delta]) => {
      if (delta >= 0) return;
      negativeStats[stat] = (negativeStats[stat] || 0) + Math.abs(delta);
      const label = choice.contextLabel || choice.choiceLabel || choice.choiceId;
      mechanisms[label] = (mechanisms[label] || 0) + Math.abs(delta);
    });
  });

  const statLabels = {
    wisdom: "智慧",
    stamina: "体能",
    mood: "心情",
    peerFavor: "同学好感",
    homeroomTrust: "班主任信任",
    authority: "教学威严",
    teacherStamina: "教师体能",
    teacherMood: "教师心情",
    studentFavor: "学生好感",
    gradeTrust: "年级组信任",
  };
  const identityLabels = {
    commuter: "走读生",
    boarder: "住宿生",
    teacher: "教师",
  };
  const topPressureStats = Object.entries(negativeStats).sort((a, b) => b[1] - a[1]);
  const topMechanisms = Object.entries(mechanisms).sort((a, b) => b[1] - a[1]);
  const badSessions = sessions.filter((item) => endingIsBad(item.endingId));
  const topFeedback = feedbackTopics[0]?.key;
  const topicLabels = {
    schedule: "作息与时间安排",
    assessment: "作业和评价方式",
    wellbeing: "心理与身体恢复",
    trust: "师生信任和沟通",
    food: "食堂与校园设施",
    social: "同学关系与归属感",
    technology: "网络、设备与 AI 使用",
  };

  const pressurePath = topPressureStats.length
    ? `最常见的压力路径是${topPressureStats.slice(0, 3).map(([stat]) => statLabels[stat] || stat).join(" → ")}持续下降；相关选择主要集中在${topMechanisms.slice(0, 2).map(([label]) => `“${label}”`).join("和")}。`
    : "完成更多试玩后，系统会根据连续属性下降生成学生压力路径。";
  const badMechanism = topMechanisms.length
    ? `最容易把玩家推向坏结局的校园机制是“${topMechanisms[0][0]}”，它贡献了当前最大的累计负面属性变化。坏结局占比为${sessions.length ? Math.round((badSessions.length / sessions.length) * 100) : 0}%。`
    : "目前还没有足够的负面选择数据来判断坏结局机制。";
  const desiredExperience = topFeedback
    ? `玩家最希望优先优化${topicLabels[topFeedback] || topFeedback}；共有 ${feedbackTopics[0].count} 条反馈指向这一主题。`
    : "目前还没有玩家提交校园体验优化反馈。";

  const styleBreakdown = summarizeBreakdown(sessions, "playerStyle");
  const strategyText = styleBreakdown.length
    ? styleBreakdown.map((row) => `${row.group}型玩家最常到达“${row.topEnding}”，坏结局率${Math.round(row.badEndingRate * 100)}%`).join("；") + "。"
    : "完成更多试玩后，系统会比较学术型、社交型与平衡型玩家的生存策略。";

  const sacrificeCounts = {};
  choices.forEach((choice) => {
    Object.entries(choice.deltas || {}).forEach(([stat, delta]) => {
      if (Number(delta) >= 0) return;
      sacrificeCounts[stat] = (sacrificeCounts[stat] || 0) + 1;
    });
  });
  const topSacrifices = Object.entries(sacrificeCounts).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    return Number(negativeStats[b[0]] || 0) - Number(negativeStats[a[0]] || 0);
  });
  const sacrificedStat = topSacrifices.length
    ? `玩家最常牺牲的是${statLabels[topSacrifices[0][0]] || topSacrifices[0][0]}：共有 ${topSacrifices[0][1]} 次选择使它下降，累计损失 ${negativeStats[topSacrifices[0][0]] || 0} 点。`
    : "完成更多试玩后，系统会统计玩家最常牺牲的属性。";

  const studentSessions = sessions.filter((session) => session.route === "student");
  const studentSessionIds = new Set(studentSessions.map((session) => session.id));
  const studentChoices = choices.filter((choice) => studentSessionIds.has(choice.sessionId));
  const wisdomGainChoices = studentChoices.filter((choice) => Number(choice.deltas?.wisdom || 0) > 0);
  const costlyWisdomChoices = wisdomGainChoices.filter(
    (choice) => Number(choice.deltas?.mood || 0) < 0 || Number(choice.deltas?.stamina || 0) < 0
  );
  const highWisdomFinishes = studentSessions.filter((session) => Number(session.finalStats?.wisdom || 0) >= 9);
  const depletedHighWisdomFinishes = highWisdomFinishes.filter(
    (session) => Number(session.finalStats?.mood || 0) <= 4 || Number(session.finalStats?.stamina || 0) <= 4
  );
  const costlyWisdomRate = wisdomGainChoices.length ? costlyWisdomChoices.length / wisdomGainChoices.length : 0;
  const depletedHighWisdomRate = highWisdomFinishes.length ? depletedHighWisdomFinishes.length / highWisdomFinishes.length : 0;
  const wisdomPursuit = wisdomGainChoices.length
    ? `${costlyWisdomRate >= 0.5 || depletedHighWisdomRate >= 0.4 ? "存在过度追求智慧的倾向" : "暂未出现明显的智慧过度追求"}：${wisdomGainChoices.length} 次智慧提升中，${costlyWisdomChoices.length} 次同时损失心情或体能；以智慧 9 点以上结束的 ${highWisdomFinishes.length} 局中，${depletedHighWisdomFinishes.length} 局的心情或体能降到 4 点及以下。`
    : "学生路线还没有足够的智慧提升选择，暂时无法判断是否过度追求智慧。";

  function ivyCohortStats(rows) {
    const ids = new Set(rows.map((session) => session.id));
    const cohortChoices = choices.filter((choice) => ids.has(choice.sessionId));
    const moodLoss = cohortChoices.reduce((sum, choice) => sum + Math.max(0, -Number(choice.deltas?.mood || 0)), 0);
    const wisdomChoices = cohortChoices.filter((choice) => Number(choice.deltas?.wisdom || 0) > 0);
    const moodTradeoffs = wisdomChoices.filter((choice) => Number(choice.deltas?.mood || 0) < 0);
    return {
      plays: rows.length,
      averageMoodLoss: rows.length ? moodLoss / rows.length : 0,
      wisdomMoodTradeoffRate: wisdomChoices.length ? moodTradeoffs.length / wisdomChoices.length : 0,
    };
  }

  const sawIvy = ivyCohortStats(studentSessions.filter((session) => session.ivyHintSeenBeforeRun === true));
  const hadNotSeenIvy = ivyCohortStats(studentSessions.filter((session) => session.ivyHintSeenBeforeRun === false));
  let ivyMoodTradeoff = "需要同时积累“见过藤校结局”和“尚未见过藤校结局”的后续试玩，才能比较提示是否改变玩家选择。";
  if (sawIvy.plays && hadNotSeenIvy.plays) {
    const moreWilling =
      sawIvy.averageMoodLoss > hadNotSeenIvy.averageMoodLoss + 0.25 ||
      sawIvy.wisdomMoodTradeoffRate > hadNotSeenIvy.wisdomMoodTradeoffRate + 0.1;
    const confidence = sawIvy.plays >= 3 && hadNotSeenIvy.plays >= 3 ? "" : "当前样本较少，只能作为初步观察。";
    ivyMoodTradeoff = `见过藤校结局后，玩家${moreWilling ? "更愿意" : "没有更明显地"}牺牲心情：见过组每局平均损失 ${sawIvy.averageMoodLoss.toFixed(1)} 点心情，未见过组为 ${hadNotSeenIvy.averageMoodLoss.toFixed(1)} 点；智慧提升同时损失心情的比例分别为 ${Math.round(sawIvy.wisdomMoodTradeoffRate * 100)}% 和 ${Math.round(hadNotSeenIvy.wisdomMoodTradeoffRate * 100)}%。${confidence}`;
  }

  const identityGroups = {};
  studentSessions.forEach((session) => {
    const key = session.identity || "未填写";
    identityGroups[key] ||= [];
    identityGroups[key].push(session);
  });
  const identityStrategies = Object.entries(identityGroups).map(([identity, rows]) => {
    const ids = new Set(rows.map((session) => session.id));
    const groupChoices = choices.filter((choice) => ids.has(choice.sessionId));
    const topChoice = countBy(groupChoices, (choice) => choice.choiceLabel || choice.choiceId)[0]?.key || "暂无";
    const losses = {};
    groupChoices.forEach((choice) => {
      Object.entries(choice.deltas || {}).forEach(([stat, delta]) => {
        if (Number(delta) < 0) losses[stat] = (losses[stat] || 0) + Math.abs(Number(delta));
      });
    });
    const topLoss = Object.entries(losses).sort((a, b) => b[1] - a[1])[0]?.[0];
    return {
      identity,
      label: identityLabels[identity] || identity,
      plays: rows.length,
      topChoice,
      sacrificedStat: topLoss ? statLabels[topLoss] || topLoss : "暂无",
    };
  });
  let identityStrategy = "需要至少两种学生身份完成试玩，才能判断身份设定是否改变策略。";
  if (identityStrategies.length >= 2) {
    const distinctChoices = new Set(identityStrategies.map((row) => row.topChoice)).size;
    const distinctSacrifices = new Set(identityStrategies.map((row) => row.sacrificedStat)).size;
    const changed = distinctChoices > 1 || distinctSacrifices > 1;
    identityStrategy = `不同身份下的策略${changed ? "出现了变化" : "目前较为相似"}：${identityStrategies.map((row) => `${row.label}（${row.plays} 局）最常选择“${row.topChoice}”，最常牺牲${row.sacrificedStat}`).join("；")}。`;
  }

  const similarityFeedback = feedback.filter((item) => Number(item.optimalChoiceSimilarity) >= 1);
  const similarityAverage = average(similarityFeedback.map((item) => item.optimalChoiceSimilarity));
  const similarResponses = similarityFeedback.filter((item) => Number(item.optimalChoiceSimilarity) >= 4).length;
  const optimalRealitySimilarity = similarityFeedback.length
    ? `玩家对“游戏里的最优选择是否像真实校园选择”的平均评分为 ${similarityAverage.toFixed(1)}/5；${similarResponses}/${similarityFeedback.length} 人选择“比较相似”或“非常相似”。`
    : "目前还没有玩家回答“最优选择是否像真实校园生活”的问题。";

  const roundReports = includeHistory
    ? (research.reportSnapshots || [])
      .filter((item) => item.schoolId === school.id)
      .slice(-50)
      .reverse()
      .map((item) => ({
        id: item.id,
        sessionId: item.sessionId,
        roundNumber: item.roundNumber,
        generatedAt: item.generatedAt,
        endingTitle: item.endingTitle,
        route: item.route,
        identity: item.identity,
        difficulty: item.difficulty,
        metrics: item.metrics,
        insights: item.insights,
      }))
    : [];

  return {
    generatedAt: new Date().toISOString(),
    school: { id: school.id, name: school.name, version: school.version },
    metrics: {
      playCount: sessions.length,
      playerCount: players.size,
      averagePlaysPerPlayer: players.size ? sessions.length / players.size : 0,
      averageRoundsPerPlay: average(sessions.map((item) => item.roundsPlayed)),
      feedbackCount: feedback.length,
      optimalSimilarityResponses: similarityFeedback.length,
      badEndingRate: sessions.length ? badSessions.length / sessions.length : 0,
    },
    choiceCounts: choiceCounts.slice(0, 20),
    endingCounts: endingCounts.slice(0, 20),
    feedbackTopics,
    recentFeedback: feedback.slice(-20).reverse(),
    iterations: research.iterations.filter((item) => item.schoolId === school.id).slice(-12).reverse(),
    roundReports,
    breakdowns: {
      identity: summarizeBreakdown(sessions, "identity"),
      gradeBand: summarizeBreakdown(sessions, "gradeBand"),
      playerStyle: styleBreakdown,
    },
    insights: {
      pressurePath,
      badMechanism,
      desiredExperience,
      strategyText,
      sacrificedStat,
      wisdomPursuit,
      ivyMoodTradeoff,
      identityStrategy,
      optimalRealitySimilarity,
    },
    playerResearchReport: {
      trialPlayers: players.size,
      playerChoiceSummary: choiceCounts[0]
        ? `最常选择“${choiceCounts[0].key}”，共 ${choiceCounts[0].count} 次。`
        : "暂无选择数据。",
      endingDistribution: endingCounts.length
        ? endingCounts.slice(0, 3).map((item) => `${item.key} ${item.count} 次`).join("；")
        : "暂无结局数据。",
      playerFeedback: desiredExperience,
      campusPressureInsight: `${pressurePath}${badMechanism}`,
      sacrificedStat,
      wisdomPursuit,
      ivyMoodTradeoff,
      identityStrategy,
      optimalRealitySimilarity,
    },
  };
}

function saveRoundReport(school, schools, research, session) {
  research.reportSnapshots ||= [];
  const existingIndex = research.reportSnapshots.findIndex((item) => item.sessionId === session.id);
  const existing = existingIndex >= 0 ? research.reportSnapshots[existingIndex] : null;
  const schoolReports = research.reportSnapshots.filter((item) => item.schoolId === school.id);
  const roundNumber = existing?.roundNumber || schoolReports.reduce(
    (highest, item) => Math.max(highest, Number(item.roundNumber || 0)),
    0
  ) + 1;
  const report = buildReport(school.id, schools, research, false);
  const snapshot = {
    ...report,
    id: existing?.id || crypto.randomUUID(),
    sessionId: session.id,
    schoolId: school.id,
    roundNumber,
    endingTitle: session.endingTitle || session.endingId || "未记录结局",
    route: session.route,
    identity: session.identity,
    difficulty: session.difficulty,
    generatedAt: new Date().toISOString(),
  };
  if (existingIndex >= 0) research.reportSnapshots[existingIndex] = snapshot;
  else research.reportSnapshots.push(snapshot);
  return snapshot;
}

function maybeAutoIterate(school, schools, research) {
  if (!school.autoIteration) return null;
  const completedCount = research.sessions.filter((item) => item.schoolId === school.id && item.completedAt).length;
  if (completedCount - Number(school.lastIterationSessionCount || 0) < 5) return null;
  const report = buildReport(school.id, schools, research);
  const before = { ...school.weights };
  const next = { ...before };
  const reasons = [];

  if (report.metrics.badEndingRate > 0.55) {
    next.eventFrequency -= 0.05;
    next.recovery += 0.05;
    reasons.push("坏结局占比过高，略微降低事件密度并提高恢复效率");
  }
  const topTopic = report.feedbackTopics[0]?.key;
  if (topTopic === "assessment") {
    next.academicPressure -= 0.05;
    reasons.push("反馈集中在作业和评价压力，降低学术压力权重");
  }
  if (topTopic === "wellbeing" || topTopic === "schedule") {
    next.recovery += 0.05;
    reasons.push("反馈集中在恢复和作息，提高恢复权重");
  }
  if (topTopic === "trust" || topTopic === "social") {
    next.socialSupport += 0.05;
    next.trustSensitivity -= 0.05;
    reasons.push("反馈集中在关系与信任，提高支持并降低信任损耗敏感度");
  }
  if (!reasons.length) reasons.push("数据分布变化不大，本轮保留现有权重");

  school.weights = sanitizeWeights(next);
  school.version += 1;
  school.lastIterationSessionCount = completedCount;
  school.updatedAt = new Date().toISOString();
  const iteration = {
    id: crypto.randomUUID(),
    schoolId: school.id,
    createdAt: school.updatedAt,
    sessionCount: completedCount,
    before,
    after: school.weights,
    reasons,
  };
  research.iterations.push(iteration);
  return iteration;
}

function sessionSummary(session, choices) {
  const deltas = {};
  choices.forEach((choice) => {
    Object.entries(choice.deltas || {}).forEach(([stat, delta]) => {
      deltas[stat] = (deltas[stat] || 0) + delta;
    });
  });
  const negative = Object.entries(deltas).filter(([, value]) => value < 0).sort((a, b) => a[1] - b[1]);
  const positive = Object.entries(deltas).filter(([, value]) => value > 0).sort((a, b) => b[1] - a[1]);
  const label = {
    wisdom: "智慧", stamina: "体能", mood: "心情", peerFavor: "同学好感", homeroomTrust: "班主任信任",
    authority: "教学威严", teacherStamina: "教师体能", teacherMood: "教师心情", studentFavor: "学生好感", gradeTrust: "年级组信任",
  };
  const pressure = negative[0] ? `${label[negative[0][0]] || negative[0][0]}是本局最明显的压力来源` : "本局没有形成明显的持续损耗";
  const strength = positive[0] ? `${label[positive[0][0]] || positive[0][0]}是你的主要生存资源` : "你主要依靠避免损耗活了下来";
  return `${pressure}；${strength}。最终到达${session.endingTitle || "一个结局"}。`;
}

function serveStatic(req, res, url) {
  const requested = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname.slice(1));
  const normalized = path.normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
  const file = path.join(ROOT, normalized);
  if (!file.startsWith(ROOT)) return sendError(res, 403, "禁止访问");
  fs.readFile(file, (error, data) => {
    if (error) return sendError(res, 404, "文件不存在");
    res.writeHead(200, {
      "content-type": MIME_TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-cache",
    });
    res.end(data);
  });
}

async function handleApi(req, res, url) {
  if (isAdminApi(req, url) && !isLocalRequest(req)) {
    return sendError(res, 403, "研究后台仅允许在管理者本机访问");
  }
  const schools = readJson(SCHOOLS_FILE, [DEFAULT_SCHOOL]);
  const research = readJson(RESEARCH_FILE, { sessions: [], choices: [], feedback: [], iterations: [], reportSnapshots: [] });
  research.sessions ||= [];
  research.choices ||= [];
  research.feedback ||= [];
  research.iterations ||= [];
  research.reportSnapshots ||= [];
  if (pruneResearchData(research)) writeJson(RESEARCH_FILE, research);
  const parts = url.pathname.split("/").filter(Boolean);

  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, service: "Schooltopia", now: new Date().toISOString() });
  }
  if (req.method === "GET" && url.pathname === "/api/schools") {
    return sendJson(res, 200, schools.map((school) => ({
      id: school.id,
      name: school.name,
      tagline: school.tagline,
      version: school.version,
    })));
  }
  if (req.method === "GET" && url.pathname === "/api/config") {
    const id = cleanId(url.searchParams.get("school"));
    const school = id ? schools.find((item) => item.id === id) : schools[0];
    if (!school) return sendError(res, 404, "学校不存在");
    return sendJson(res, 200, publicSchoolConfig(school));
  }
  if (req.method === "GET" && url.pathname === "/api/report") {
    const id = cleanId(url.searchParams.get("school"));
    return sendJson(res, 200, buildReport(id || schools[0].id, schools, research));
  }
  if (req.method === "POST" && url.pathname === "/api/schools") {
    const body = await readBody(req);
    let id = slugify(body.name);
    if (schools.some((item) => item.id === id)) id = `${id}-${Date.now().toString(36).slice(-4)}`;
    const editToken = crypto.randomBytes(24).toString("hex");
    const school = sanitizeSchoolUpdate({
      ...DEFAULT_SCHOOL,
      id,
      name: cleanText(body.name, 60) || "新学校",
      customEvents: [],
      version: 1,
      editTokenHash: hashEditToken(editToken),
    }, body);
    schools.push(school);
    writeJson(SCHOOLS_FILE, schools);
    return sendJson(res, 201, { ...publicSchoolConfig(school), editToken });
  }

  if (parts[0] === "api" && parts[1] === "schools" && parts[2]) {
    const school = schools.find((item) => item.id === cleanId(parts[2]));
    if (!school) return sendError(res, 404, "学校不存在");
    if (!canEditSchool(req, school)) return sendError(res, 403, "没有这个学校版本的编辑权限");

    if (req.method === "PUT" && parts.length === 3) {
      const body = await readBody(req);
      Object.assign(school, sanitizeSchoolUpdate(school, body));
      writeJson(SCHOOLS_FILE, schools);
      return sendJson(res, 200, publicSchoolConfig(school));
    }
    if (req.method === "POST" && parts[3] === "reset") {
      Object.assign(school, resetSchoolConfig(school));
      writeJson(SCHOOLS_FILE, schools);
      return sendJson(res, 200, publicSchoolConfig(school));
    }
    if (req.method === "POST" && parts[3] === "events" && parts[4] === "generate") {
      const body = await readBody(req);
      const event = generateEvent(body.prompt, body.route);
      school.customEvents.push(event);
      school.updatedAt = new Date().toISOString();
      writeJson(SCHOOLS_FILE, schools);
      return sendJson(res, 201, event);
    }
    if (parts[3] === "events" && parts[4]) {
      const eventIndex = school.customEvents.findIndex((item) => item.id === cleanId(parts[4]));
      if (eventIndex < 0) return sendError(res, 404, "事件不存在");
      if (req.method === "PUT") {
        const body = await readBody(req);
        school.customEvents[eventIndex] = sanitizeEvent(school.customEvents[eventIndex], body);
        writeJson(SCHOOLS_FILE, schools);
        return sendJson(res, 200, school.customEvents[eventIndex]);
      }
      if (req.method === "DELETE") {
        const [removed] = school.customEvents.splice(eventIndex, 1);
        writeJson(SCHOOLS_FILE, schools);
        return sendJson(res, 200, removed);
      }
    }
    if (req.method === "POST" && parts[3] === "rebalance") {
      const body = await readBody(req);
      if (body.mode === "reset") {
        const before = { ...school.weights };
        school.weights = { ...DEFAULT_WEIGHTS };
        school.version += 1;
        const iteration = { id: crypto.randomUUID(), schoolId: school.id, createdAt: new Date().toISOString(), before, after: school.weights, reasons: ["管理员恢复默认权重"] };
        research.iterations.push(iteration);
        writeJson(SCHOOLS_FILE, schools);
        writeJson(RESEARCH_FILE, research);
        return sendJson(res, 200, iteration);
      }
      school.lastIterationSessionCount = Math.max(0, school.lastIterationSessionCount - 5);
      const iteration = maybeAutoIterate(school, schools, research);
      writeJson(SCHOOLS_FILE, schools);
      writeJson(RESEARCH_FILE, research);
      return sendJson(res, 200, iteration || { reasons: ["样本量不足 5 局，暂不自动调权"] });
    }
  }

  if (req.method === "POST" && url.pathname === "/api/sessions/start") {
    const body = await readBody(req);
    const deletionKey = cleanText(body.deletionKey, 128);
    if (body.researchConsent !== true || deletionKey.length < 16) {
      return sendError(res, 400, "需要明确同意研究记录，并提供有效的删除凭证");
    }
    const school = schools.find((item) => item.id === cleanId(body.schoolId)) || schools[0];
    const session = {
      id: crypto.randomUUID(),
      clientId: cleanId(body.clientId) || crypto.randomUUID(),
      clientDeletionHash: hashEditToken(deletionKey),
      schoolId: school.id,
      route: ["student", "teacher"].includes(body.route) ? body.route : "student",
      identity: cleanText(body.identity, 30),
      difficulty: cleanText(body.difficulty, 30),
      gradeBand: cleanText(body.gradeBand, 30) || "未填写",
      playerStyle: cleanText(body.playerStyle, 30) || "未填写",
      ivyHintSeenBeforeRun: typeof body.ivyHintSeenBeforeRun === "boolean" ? body.ivyHintSeenBeforeRun : null,
      startedAt: new Date().toISOString(),
    };
    research.sessions.push(session);
    writeJson(RESEARCH_FILE, research);
    return sendJson(res, 201, session);
  }

  if (req.method === "POST" && url.pathname === "/api/research/delete-client") {
    const body = await readBody(req);
    const clientId = cleanId(body.clientId);
    const deletionHash = hashEditToken(cleanText(body.deletionKey, 128));
    const authorized = research.sessions.some(
      (session) => session.clientId === clientId && session.clientDeletionHash === deletionHash
    );
    if (!authorized) return sendError(res, 403, "删除凭证无效");
    const sessionIds = new Set(research.sessions.filter((session) => session.clientId === clientId).map((session) => session.id));
    research.sessions = research.sessions.filter((session) => !sessionIds.has(session.id));
    research.choices = research.choices.filter((choice) => !sessionIds.has(choice.sessionId));
    research.feedback = research.feedback.filter((feedback) => !sessionIds.has(feedback.sessionId));
    research.reportSnapshots = research.reportSnapshots.filter((report) => !sessionIds.has(report.sessionId));
    writeJson(RESEARCH_FILE, research);
    return sendJson(res, 200, { deletedSessions: sessionIds.size });
  }

  if (parts[0] === "api" && parts[1] === "sessions" && parts[2]) {
    const session = research.sessions.find((item) => item.id === cleanId(parts[2]));
    if (!session) return sendError(res, 404, "试玩记录不存在");

    if (req.method === "POST" && parts[3] === "choice") {
      const body = await readBody(req);
      const choice = {
        id: crypto.randomUUID(),
        sessionId: session.id,
        schoolId: session.schoolId,
        source: cleanText(body.source, 24),
        contextId: cleanId(body.contextId),
        contextLabel: cleanText(body.contextLabel, 80),
        choiceId: cleanId(body.choiceId),
        choiceLabel: cleanText(body.choiceLabel, 80),
        week: clamp(body.week, 0, 99),
        phase: cleanText(body.phase, 40),
        deltas: typeof body.deltas === "object" && body.deltas ? body.deltas : {},
        createdAt: new Date().toISOString(),
      };
      research.choices.push(choice);
      writeJson(RESEARCH_FILE, research);
      return sendJson(res, 201, choice);
    }

    if (req.method === "POST" && parts[3] === "end") {
      const body = await readBody(req);
      session.endingId = cleanId(body.endingId);
      session.endingTitle = cleanText(body.endingTitle, 100);
      session.roundsPlayed = clamp(body.roundsPlayed, 0, 99);
      session.finalStats = typeof body.finalStats === "object" && body.finalStats ? body.finalStats : {};
      session.completedAt = new Date().toISOString();
      const school = schools.find((item) => item.id === session.schoolId) || schools[0];
      const iteration = maybeAutoIterate(school, schools, research);
      const roundReport = saveRoundReport(school, schools, research, session);
      writeJson(SCHOOLS_FILE, schools);
      writeJson(RESEARCH_FILE, research);
      const sessionChoices = research.choices.filter((item) => item.sessionId === session.id);
      return sendJson(res, 200, {
        session,
        summary: sessionSummary(session, sessionChoices),
        iteration,
        reportGeneratedAt: roundReport.generatedAt,
        reportRoundNumber: roundReport.roundNumber,
      });
    }

    if (req.method === "POST" && parts[3] === "feedback") {
      const body = await readBody(req);
      const feedback = {
        id: crypto.randomUUID(),
        sessionId: session.id,
        schoolId: session.schoolId,
        topic: cleanText(body.topic, 40),
        rating: clamp(body.rating, 1, 5),
        optimalChoiceSimilarity: body.optimalChoiceSimilarity === undefined
          ? null
          : clamp(body.optimalChoiceSimilarity, 1, 5),
        text: cleanText(body.text, 500),
        createdAt: new Date().toISOString(),
      };
      research.feedback.push(feedback);
      const school = schools.find((item) => item.id === session.schoolId) || schools[0];
      const roundReport = session.completedAt ? saveRoundReport(school, schools, research, session) : null;
      writeJson(RESEARCH_FILE, research);
      return sendJson(res, 201, {
        ...feedback,
        reportGeneratedAt: roundReport?.generatedAt || null,
        reportRoundNumber: roundReport?.roundNumber || null,
      });
    }
  }

  return sendError(res, 404, "接口不存在");
}

ensureDataFiles();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (url.pathname === "/admin.html" && !isLocalRequest(req)) {
      return sendError(res, 403, "研究后台仅允许在管理者本机访问");
    }
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    return serveStatic(req, res, url);
  } catch (error) {
    return sendError(res, 400, error.message || "请求处理失败");
  }
});

if (require.main === module) {
  server.listen(PORT, HOST, () => {
    console.log(`Schooltopia: http://${HOST}:${PORT}`);
    console.log(`后台: http://${HOST}:${PORT}/admin.html`);
  });
}

module.exports = {
  DEFAULT_SCHOOL,
  buildReport,
  canEditSchool,
  generateEvent,
  hashEditToken,
  maybeAutoIterate,
  pruneResearchData,
  resetSchoolConfig,
  saveRoundReport,
  sanitizeEvent,
  sanitizeWeights,
  sessionSummary,
};

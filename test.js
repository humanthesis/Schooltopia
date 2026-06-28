const assert = require("assert");
const fs = require("fs");
const {
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
  sessionSummary,
} = require("./server");
const {
  buildShareUrl,
  decodeConfig,
  encodeConfig,
  readShareUrl,
} = require("./shared-config");
const { generateEventDraft } = require("./event-generator");

const sharedSource = {
  id: "nanshan-school",
  name: "Nanshan <img src=x onerror=alert(1)>",
  tagline: "A real shared school",
  skin: { primary: "#123456", accent: "bad-color", danger: "#654321", sky: "#10242b" },
  weights: { eventFrequency: 99, academicPressure: 0.8, socialSupport: 1.2, recovery: 1.1, trustSensitivity: 0.9 },
  version: 7,
  customEvents: [{
    id: "custom-event",
    title: "Shared Event",
    category: "campus",
    route: "both",
    description: "A shared story node",
    chance: 999,
    enabled: true,
    sourceLanguage: "en",
    translations: {
      zh: {
        title: "共享事件",
        description: "一段共享剧情",
        options: [{ id: "choice-a", label: "安全显示", detail: "只显示文字" }],
      },
      en: {
        title: "Shared Event",
        description: "A shared story node",
        options: [{ id: "choice-a", label: "<img src=x onerror=alert(2)>", detail: "Displayed as text only" }],
      },
    },
    options: [{
      id: "choice-a",
      label: "<svg onload=alert(1)>",
      detail: "Displayed as text only",
      effects: [{ stat: "mood", delta: 2 }, { stat: "innerHTML", delta: 5 }],
    }],
  }],
};
const encodedSchool = encodeConfig(sharedSource);
const decodedSchool = decodeConfig(encodedSchool);
assert.equal(decodedSchool.name, sharedSource.name);
assert.equal(decodedSchool.skin.primary, "#123456");
assert.equal(decodedSchool.skin.accent, "#d09a39");
assert.equal(decodedSchool.weights.eventFrequency, 1.4);
assert.equal(decodedSchool.customEvents[0].chance, 100);
assert.equal(decodedSchool.customEvents[0].options[0].label, "<svg onload=alert(1)>");
assert.equal(decodedSchool.customEvents[0].translations.zh.title, "共享事件");
assert.equal(decodedSchool.customEvents[0].translations.en.options[0].label, "<img src=x onerror=alert(2)>");
assert.deepEqual(decodedSchool.customEvents[0].options[0].effects, [{ stat: "mood", delta: 2 }]);
const sharedUrl = buildShareUrl("https://humanthesis.github.io/Schooltopia/creator.html", sharedSource);
assert.ok(sharedUrl.startsWith("https://humanthesis.github.io/Schooltopia/index.html#"));
assert.deepEqual(readShareUrl(sharedUrl), decodedSchool);
const localSharedUrl = buildShareUrl("http://127.0.0.1:4182/creator.html?static=1", sharedSource);
assert.ok(localSharedUrl.startsWith("http://127.0.0.1:4182/index.html?static=1#"));
const serverSharedUrl = buildShareUrl("http://127.0.0.1:4180/creator.html?static=1", sharedSource);
assert.ok(serverSharedUrl.startsWith("http://127.0.0.1:4180/index.html?static=1#"));

const gameSource = fs.readFileSync("game.js", "utf8");
assert.ok(gameSource.includes("name.textContent = option.name"));
assert.ok(!gameSource.includes("game.metaSave.totalAiCopyCount"));
assert.ok(fs.readFileSync(".github/workflows/pages.yml", "utf8").includes("run: node test.js"));
assert.ok(fs.readFileSync(".github/workflows/pages.yml", "utf8").includes("event-generator.js"));
assert.ok(fs.readFileSync("i18n.js", "utf8").includes('"堵车": "Traffic Jam"'));
const creatorSource = fs.readFileSync("creator.js", "utf8");
assert.ok(creatorSource.includes('STATIC_SCHOOLS_KEY = "schooltopia_static_schools_v2"'));
assert.ok(creatorSource.includes("buildShareUrl(window.location.href"));
assert.ok(fs.readFileSync("schooltopia.js", "utf8").includes("const triggeredEvents = events.filter"));

const now = Date.now();
const retainedResearch = {
  sessions: [
    { id: "old", startedAt: new Date(now - 181 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "new", startedAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString() },
  ],
  choices: [{ sessionId: "old" }, { sessionId: "new" }],
  feedback: [{ sessionId: "old" }, { sessionId: "new" }],
  reportSnapshots: [{ sessionId: "old" }, { sessionId: "new" }],
};
assert.equal(pruneResearchData(retainedResearch, now), 1);
assert.deepEqual(retainedResearch.sessions.map((session) => session.id), ["new"]);
assert.ok(retainedResearch.choices.every((choice) => choice.sessionId === "new"));

const editSchool = { editTokenHash: hashEditToken("owner-secret") };
assert.equal(canEditSchool({ headers: { host: "public.example", "x-school-edit-token": "owner-secret" } }, editSchool), true);
assert.equal(canEditSchool({ headers: { host: "public.example", "x-school-edit-token": "wrong-secret" } }, editSchool), false);
assert.equal(canEditSchool({ headers: { host: "127.0.0.1:4180" } }, editSchool), true);

const generated = generateEvent("期中考试和社团汇演撞在同一周，学生既要排练又要复习。", "student");
assert.equal(generated.route, "student");
assert.equal(generated.options.length, 3);
assert.equal(generated.category, "academic");
assert.ok(generated.options.every((option) => option.effects.length));

const generatedTeacher = generateEvent("教师临时接到年级组公开课通知。", "teacher");
assert.equal(generatedTeacher.route, "teacher");
assert.ok(generatedTeacher.options.flatMap((option) => option.effects).every((effect) =>
  ["wisdom", "stamina", "mood", "peerFavor", "homeroomTrust"].includes(effect.stat)
));

const generatedEnglish = generateEventDraft(
  "Midterms, club festival, and group presentation all land in one week while the dorm Wi-Fi fails.",
  "both"
);
assert.equal(generatedEnglish.sourceLanguage, "en");
assert.equal(generatedEnglish.category, "academic");
assert.equal(generatedEnglish.route, "both");
assert.ok(generatedEnglish.title.startsWith("Midterms"));
assert.ok(generatedEnglish.title.length <= 60);
assert.ok(!/\b(?:a|an|and|at|for|in|of|on|or|the|to|with)$/i.test(generatedEnglish.title));
assert.equal(new Set(generatedEnglish.options.map((option) => option.label)).size, 3);
assert.ok(generatedEnglish.translations.zh.title);
assert.equal(generatedEnglish.translations.en.options.length, 3);

const customized = sanitizeEvent(generated, {
  description: "自定义开场",
  options: generated.options.map((option, index) => ({
    ...option,
    label: `自定义节点 ${index + 1}`,
    effects: [{ stat: index === 0 ? "teacherMood" : "peerFavor", delta: index === 2 ? -2 : 3 }],
  })),
});
assert.equal(customized.description, "自定义开场");
assert.equal(customized.options.length, 3);
assert.equal(customized.options[0].label, "自定义节点 1");
assert.deepEqual(customized.options[0].effects, [{ stat: "mood", delta: 3 }]);
assert.deepEqual(customized.options[2].effects, [{ stat: "peerFavor", delta: -2 }]);

const resetSource = {
  ...JSON.parse(JSON.stringify(DEFAULT_SCHOOL)),
  id: "custom-school",
  name: "保留的学校名称",
  version: 4,
  editTokenHash: "keep-token-hash",
  skin: { primary: "#111111", accent: "#222222", danger: "#333333", sky: "#444444" },
  weights: { eventFrequency: 1.4, academicPressure: 1.3, socialSupport: 0.6, recovery: 0.7, trustSensitivity: 1.2 },
  customEvents: [generated],
};
const resetResult = resetSchoolConfig(resetSource);
assert.equal(resetResult.name, "未命名学校");
assert.equal(resetResult.editTokenHash, resetSource.editTokenHash);
assert.equal(resetResult.version, 5);
assert.deepEqual(resetResult.skin, DEFAULT_SCHOOL.skin);
assert.deepEqual(resetResult.customEvents, []);

const school = JSON.parse(JSON.stringify(DEFAULT_SCHOOL));
school.autoIteration = true;
const schools = [school];
const sessions = Array.from({ length: 5 }, (_, index) => ({
  id: `session-${index}`,
  clientId: index < 3 ? `player-${index}` : "player-0",
  schoolId: school.id,
  route: "student",
  identity: index % 2 ? "boarder" : "commuter",
  gradeBand: index % 2 ? "upper" : "lower",
  playerStyle: index % 2 ? "social" : "academic",
  ivyHintSeenBeforeRun: index >= 3,
  endingId: index < 4 ? "ending_no_school" : "ending_top50_normal",
  endingTitle: index < 4 ? "《没学上了》" : "《TOP50，正常发挥》",
  roundsPlayed: 8 + index,
  completedAt: new Date().toISOString(),
}));
const choices = sessions.flatMap((session, index) => [
  {
    sessionId: session.id,
    schoolId: school.id,
    choiceId: "action_daily_study",
    choiceLabel: "刷题",
    contextLabel: "日常行动选择",
    deltas: { wisdom: 1, mood: -1 - (index % 2) },
  },
  {
    sessionId: session.id,
    schoolId: school.id,
    choiceId: "action_lunch_solo_study",
    choiceLabel: "一个人刷题",
    contextLabel: "午饭行动选择",
    deltas: { wisdom: 1, mood: -1 },
  },
]);
const research = {
  sessions,
  choices,
  feedback: sessions.map((session) => ({
    sessionId: session.id,
    schoolId: school.id,
    topic: "wellbeing",
    rating: 3,
    optimalChoiceSimilarity: 4,
    text: "希望有更多恢复时间。",
  })),
  iterations: [],
};

const report = buildReport(school.id, schools, research);
assert.equal(report.metrics.playCount, 5);
assert.equal(report.metrics.playerCount, 3);
assert.equal(report.choiceCounts[0].key, "刷题");
assert.ok(report.insights.pressurePath.includes("心情"));
assert.ok(report.insights.sacrificedStat.includes("心情"));
assert.ok(report.insights.wisdomPursuit.includes("智慧"));
assert.ok(report.insights.ivyMoodTradeoff.includes("见过组"));
assert.ok(report.insights.identityStrategy.includes("走读生"));
assert.ok(report.insights.optimalRealitySimilarity.includes("4.0/5"));
assert.ok(report.playerResearchReport.campusPressureInsight);

const firstRoundReport = saveRoundReport(school, schools, research, sessions[0]);
assert.equal(firstRoundReport.roundNumber, 1);
assert.equal(research.reportSnapshots.length, 1);
const secondRoundReport = saveRoundReport(school, schools, research, sessions[1]);
assert.equal(secondRoundReport.roundNumber, 2);
assert.equal(research.reportSnapshots.length, 2);
const refreshedFirstRoundReport = saveRoundReport(school, schools, research, sessions[0]);
assert.equal(refreshedFirstRoundReport.roundNumber, 1);
assert.equal(research.reportSnapshots.length, 2);
assert.equal(buildReport(school.id, schools, research).roundReports[0].roundNumber, 2);

const summary = sessionSummary(sessions[0], choices.filter((choice) => choice.sessionId === sessions[0].id));
assert.ok(summary.includes("心情"));
assert.ok(summary.includes("《没学上了》"));

const iteration = maybeAutoIterate(school, schools, research);
assert.ok(iteration);
assert.equal(research.iterations.length, 1);
assert.ok(school.weights.recovery > 1);
assert.ok(school.weights.eventFrequency < 1);

console.log("Schooltopia tests passed");

const assert = require("assert");
const {
  DEFAULT_SCHOOL,
  buildReport,
  canEditSchool,
  generateEvent,
  hashEditToken,
  maybeAutoIterate,
  resetSchoolConfig,
  saveRoundReport,
  sanitizeEvent,
  sessionSummary,
} = require("./server");

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

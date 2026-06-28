(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.SchooltopiaRunRecap = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const MEMORY_SLOTS = [
    { id: "focus", student: "wisdom", teacher: "authority" },
    { id: "stamina", student: "stamina", teacher: "teacherStamina" },
    { id: "mood", student: "mood", teacher: "teacherMood" },
    { id: "favor", student: "peerFavor", teacher: "studentFavor" },
    { id: "trust", student: "homeroomTrust", teacher: "gradeTrust" },
  ];
  const LEGENDARY_ENDINGS = new Set([
    "ending_complete_madness",
    "ending_teacher_complete_madness",
    "ending_campus_legend_student",
    "ending_campus_legend_teacher",
    "ending_ivy_admission",
    "ending_reject_ivy",
  ]);
  const RARE_ENDINGS = new Set([
    "ending_ai_graduates_for_me",
    "ending_disappeared_person",
    "ending_transfer",
    "ending_jingdezhen_resident",
    "ending_no_school",
    "ending_sports_legend",
    "ending_red_pen_war_god",
    "ending_devil_teacher",
    "ending_student_moonlight_teacher",
    "ending_grade_group_hidden_boss",
    "ending_teacher_lost_authority",
    "ending_teacher_student_favor_zero",
    "ending_teacher_grade_group_zero",
  ]);

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function cleanText(value, maxLength = 100) {
    return String(value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength);
  }

  function countCollection(value) {
    if (value instanceof Set) return value.size;
    return Array.isArray(value) ? value.length : 0;
  }

  function recordEntry(entries, entry) {
    const next = Array.isArray(entries) ? entries.slice(-79) : [];
    const kind = ["daily", "activity", "event"].includes(entry?.kind) ? entry.kind : "event";
    next.push({
      week: clamp(Math.round(Number(entry?.week) || 1), 1, 12),
      kind,
      title: cleanText(entry?.title, 80),
      choice: cleanText(entry?.choice, 80),
    });
    return next;
  }

  function normalizeChronicle(entries) {
    if (!Array.isArray(entries)) return [];
    return entries.slice(-80).map((entry) => ({
      week: clamp(Math.round(Number(entry?.week) || 1), 1, 12),
      kind: ["daily", "activity", "event"].includes(entry?.kind) ? entry.kind : "event",
      title: cleanText(entry?.title, 80),
      choice: cleanText(entry?.choice, 80),
    }));
  }

  function buildChronicle(entries) {
    const weeks = new Map();
    normalizeChronicle(entries).forEach((entry) => {
      if (!weeks.has(entry.week)) weeks.set(entry.week, { week: entry.week, daily: null, activity: null, events: [] });
      const week = weeks.get(entry.week);
      if (entry.kind === "daily") week.daily = entry;
      else if (entry.kind === "activity") week.activity = entry;
      else if (week.events.length < 3) week.events.push(entry);
    });
    return [...weeks.values()].sort((left, right) => left.week - right.week);
  }

  function endingRarityBase(endingId) {
    if (LEGENDARY_ENDINGS.has(endingId)) return 13;
    if (RARE_ENDINGS.has(endingId)) return 8;
    if (endingId === "ending_ordinary_graduate") return 0;
    return 2;
  }

  function calculateRunReport(input = {}) {
    const statValues = Object.values(input.stats || {}).map(Number).filter(Number.isFinite);
    const average = statValues.length ? statValues.reduce((sum, value) => sum + value, 0) / statValues.length : 0;
    const achievementCount = countCollection(input.achievements);
    const titleCount = countCollection(input.titles);
    const week = clamp(Math.round(Number(input.week) || 1), 1, 12);
    const difficultyBonus = { easy: 0, standard: 3, hell: 8 }[input.difficulty] || 0;
    const score = clamp(Math.round(
      average * 6 + week * 1.5 + Math.min(12, achievementCount * 4) + Math.min(8, titleCount * 2) + difficultyBonus
    ), 0, 100);
    const eventCount = normalizeChronicle(input.chronicle).filter((entry) => entry.kind === "event").length;
    const rarityPoints = endingRarityBase(input.endingId)
      + Math.min(6, achievementCount * 2)
      + Math.min(4, titleCount)
      + Math.min(3, Math.floor(eventCount / 2))
      + (input.difficulty === "hell" ? 2 : 0);
    const rarityId = rarityPoints >= 13 ? "legendary" : rarityPoints >= 8 ? "rare" : rarityPoints >= 4 ? "uncommon" : "common";
    const verdictId = score >= 90 ? "mythic" : score >= 75 ? "exceptional" : score >= 55 ? "survivor" : score >= 35 ? "accident" : "story";
    return { score, rarityId, rarityPoints, verdictId };
  }

  function memoryStatForRoute(memory, route) {
    const normalized = normalizeMemory(memory);
    const slot = normalized && MEMORY_SLOTS.find((item) => item.id === normalized.slot);
    return slot?.[route === "teacher" ? "teacher" : "student"] || "";
  }

  function normalizeMemory(memory) {
    if (!memory || !MEMORY_SLOTS.some((slot) => slot.id === memory.slot)) return null;
    return {
      slot: memory.slot,
      endingId: cleanText(memory.endingId, 80),
      endingTitle: cleanText(memory.endingTitle, 80),
    };
  }

  function getMemoryCandidates(stats, route) {
    return MEMORY_SLOTS.map((slot, index) => {
      const stat = slot[route === "teacher" ? "teacher" : "student"];
      return { slot: slot.id, stat, value: Number(stats?.[stat] || 0), index };
    })
      .sort((left, right) => right.value - left.value || left.index - right.index)
      .slice(0, 3)
      .map(({ index, ...candidate }) => candidate);
  }

  return {
    MEMORY_SLOTS,
    buildChronicle,
    calculateRunReport,
    getMemoryCandidates,
    memoryStatForRoute,
    normalizeChronicle,
    normalizeMemory,
    recordEntry,
  };
});

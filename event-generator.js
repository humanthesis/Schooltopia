(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.SchooltopiaEventGenerator = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const CATEGORIES = [
    {
      id: "academic",
      pattern: /作业|考试|测验|成绩|ddl|project|论文|竞赛|复习|课程|midterm|final|exam|homework|essay|study|deadline/i,
      title: { zh: "学术任务撞车", en: "Academic Deadline Collision" },
      description: {
        zh: "几项学术任务同时到来，你需要在完成度、状态和求助之间做决定。",
        en: "Several academic demands arrive together. You must choose between completion, wellbeing, and asking for help.",
      },
      options: [
        ["priority", "重排优先级", "先完成最影响全局的一项，其余任务接受不完美。", "Rebuild the Priority List", "Finish the highest-impact task first and accept imperfection elsewhere.", [["wisdom", 2], ["mood", -1]]],
        ["team", "和同伴拆分任务", "把能合作的部分拆开处理，但需要投入沟通时间。", "Split the Work with Peers", "Divide the parts that can be shared, at the cost of coordination time.", [["peerFavor", 2], ["stamina", -1]]],
        ["explain", "向老师说明冲突", "把时间冲突和当前进度说清楚，争取合理调整。", "Explain the Conflict", "Show the schedule conflict and current progress, then ask for a realistic adjustment.", [["homeroomTrust", 2], ["mood", 1]]],
        ["rest", "先保证睡眠", "保护第二天的状态，但会放弃一部分完成度。", "Protect Your Sleep", "Protect tomorrow's energy while giving up part of the completion target.", [["stamina", 2], ["wisdom", -1]]],
      ],
    },
    {
      id: "activity",
      pattern: /活动|社团|音乐|运动会|演出|义卖|竞选|典礼|festival|club|concert|sports|ceremony|performance|election|market/i,
      title: { zh: "校园活动现场变数", en: "Campus Event Under Pressure" },
      description: {
        zh: "活动现场同时出现时间、人员和物资问题，漂亮方案必须接受现实检验。",
        en: "Timing, staffing, and materials fail at once. The plan now has to survive contact with reality.",
      },
      options: [
        ["plan", "先救关键流程", "找出最影响全场的一环，其他问题暂时降级处理。", "Rescue the Critical Path", "Protect the one step that affects the whole event and downgrade the rest.", [["wisdom", 2], ["stamina", -1]]],
        ["mobilize", "临时动员同伴", "公开缺口并快速分工，现场关系会被重新组织。", "Mobilize the Team", "Make the gaps visible and redistribute work immediately.", [["peerFavor", 2], ["mood", 1], ["stamina", -1]]],
        ["report", "及时报告变化", "让负责老师知道真实情况，避免最后一刻才暴雷。", "Report the Change Early", "Tell the responsible teacher what changed before it becomes a last-minute failure.", [["homeroomTrust", 2], ["mood", -1]]],
        ["simplify", "缩小活动范围", "保住核心体验，主动删掉无法兑现的部分。", "Reduce the Scope", "Protect the core experience and remove promises the team cannot keep.", [["mood", 2], ["wisdom", 1]]],
      ],
    },
    {
      id: "social",
      pattern: /同学|朋友|社交|小组|合作|孤独|排挤|矛盾|peer|friend|group|team|conflict|belong/i,
      title: { zh: "关系网络出现裂缝", en: "A Crack in the Social Network" },
      description: {
        zh: "关系问题开始影响任务和情绪，你需要决定是沟通、求助还是暂时退出。",
        en: "A relationship problem is now affecting both work and mood. You must choose whether to talk, seek support, or step away.",
      },
      options: [
        ["talk", "把话说开", "直接说明感受和事实，不让猜测继续扩大。", "Talk It Through", "Name the facts and feelings before assumptions grow further.", [["peerFavor", 2], ["mood", 1]]],
        ["mediate", "请第三方协调", "找可信任的人帮助双方把问题说清楚。", "Ask for Mediation", "Bring in someone trusted to help both sides explain the problem.", [["homeroomTrust", 2], ["peerFavor", 1]]],
        ["boundary", "先划清边界", "暂时退出消耗性的互动，保护自己的状态。", "Set a Boundary", "Step out of the draining interaction and protect your own state.", [["stamina", 2], ["mood", 1], ["peerFavor", -1]]],
        ["repair", "用行动修复关系", "主动承担一件具体任务，让承诺重新变得可信。", "Repair It Through Action", "Take responsibility for one concrete task and make the promise credible again.", [["peerFavor", 2], ["stamina", -1], ["wisdom", 1]]],
      ],
    },
    {
      id: "trust",
      pattern: /班主任|老师|年级|处分|检查|纪律|手机|迟到|teacher|inspection|rule|phone|late|discipline/i,
      title: { zh: "规则与信任的拉扯", en: "Rules Versus Trust" },
      description: {
        zh: "一次纪律或沟通问题让信任进入危险区，你需要选择解释、配合或承担后果。",
        en: "A discipline or communication problem puts trust at risk. You must explain, cooperate, or accept the consequence.",
      },
      options: [
        ["facts", "先说明事实", "把经过和证据讲清楚，不用情绪替代解释。", "Explain the Facts", "Lay out what happened and the evidence without replacing explanation with emotion.", [["homeroomTrust", 2], ["wisdom", 1]]],
        ["cooperate", "先配合处理", "先完成必要流程，再讨论规则是否合理。", "Cooperate First", "Complete the required process before discussing whether the rule is fair.", [["homeroomTrust", 2], ["mood", -1]]],
        ["support", "找同伴作证", "请了解情况的人补充事实，但关系也会被卷进来。", "Ask a Peer to Confirm", "Invite someone who knows what happened to confirm the facts.", [["peerFavor", 2], ["homeroomTrust", 1]]],
        ["accept", "承担这次后果", "停止争论并保护剩余精力，但信任不会立刻恢复。", "Accept the Consequence", "Stop arguing and protect your remaining energy, though trust will not recover immediately.", [["stamina", 2], ["mood", 1], ["homeroomTrust", -1]]],
      ],
    },
    {
      id: "wellbeing",
      pattern: /压力|焦虑|心情|睡眠|疲惫|体能|生病|心理|stress|anxiety|sleep|tired|health|burnout/i,
      title: { zh: "状态发出警报", en: "Your State Sends a Warning" },
      description: {
        zh: "身体和情绪开始影响判断，继续硬撑不再是没有代价的选项。",
        en: "Physical and emotional strain are affecting judgment. Pushing through is no longer a cost-free option.",
      },
      options: [
        ["pause", "暂停一项任务", "主动减少负荷，让体能先回到可用范围。", "Pause One Commitment", "Reduce the load and bring stamina back into a usable range.", [["stamina", 2], ["wisdom", -1]]],
        ["support", "告诉可信任的人", "把真实状态说出来，争取支持和调整。", "Tell Someone You Trust", "Describe your actual state and ask for support or adjustment.", [["homeroomTrust", 2], ["mood", 2]]],
        ["friends", "和同伴一起缓冲", "用陪伴恢复情绪，但问题仍需要之后处理。", "Recover with Friends", "Use companionship to recover emotionally, while leaving the task for later.", [["peerFavor", 2], ["mood", 2]]],
        ["plan", "重新安排恢复时间", "把睡眠、运动和任务写进同一张计划。", "Schedule Recovery", "Put sleep, movement, and work into the same realistic plan.", [["stamina", 2], ["wisdom", 1]]],
      ],
    },
    {
      id: "campus",
      pattern: /食堂|宿舍|校车|网络|wifi|设施|空调|校园|cafeteria|dorm|bus|network|facility|campus/i,
      title: { zh: "校园设施突然掉线", en: "Campus Infrastructure Failure" },
      description: {
        zh: "一个校园设施问题打乱了原计划，你需要在等待、绕行和反馈之间选择。",
        en: "A campus facility failure disrupts the plan. You must choose between waiting, finding a workaround, and reporting it.",
      },
      options: [
        ["workaround", "先找替代方案", "绕开故障继续推进，但会多消耗一些精力。", "Find a Workaround", "Bypass the failure and keep moving at an extra energy cost.", [["wisdom", 2], ["stamina", -1]]],
        ["report", "提交清楚的反馈", "说明时间、地点和影响，让问题更容易被真正处理。", "Report It Clearly", "Include the time, location, and impact so the problem can actually be fixed.", [["homeroomTrust", 2], ["mood", 1]]],
        ["together", "和同伴共享资源", "临时合用设备或空间，关系会因此改善。", "Share Resources", "Temporarily share equipment or space and strengthen the relationship.", [["peerFavor", 2], ["mood", 1]]],
        ["wait", "接受计划延误", "停止无效消耗，等待设施恢复。", "Accept the Delay", "Stop wasting energy and wait for the facility to recover.", [["stamina", 2], ["mood", 1], ["wisdom", -1]]],
      ],
    },
  ];

  function hashText(text) {
    let hash = 0;
    for (const character of String(text)) hash = ((hash << 5) - hash + character.codePointAt(0)) | 0;
    return Math.abs(hash);
  }

  function detectLanguage(text) {
    return /[\u3400-\u9fff]/.test(text) ? "zh" : "en";
  }

  function cleanPrompt(prompt) {
    return String(prompt || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 320);
  }

  function promptTitle(prompt, language) {
    const firstSentence = prompt.split(/[。！？!?\n]/)[0].trim();
    if (!firstSentence) return language === "zh" ? "校园新事件" : "New Campus Event";
    if (language === "zh") return firstSentence.slice(0, 24);
    const words = firstSentence.split(/\s+/);
    let title = "";
    let truncated = false;
    for (const word of words) {
      const next = title ? `${title} ${word}` : word;
      if (next.length > 60) {
        truncated = true;
        break;
      }
      title = next;
    }
    if (truncated) {
      const stopWord = /\b(?:a|an|and|at|for|in|of|on|or|the|to|with)$/i;
      while (stopWord.test(title)) title = title.replace(/\s+\S+$/, "");
    }
    return title || firstSentence.slice(0, 60);
  }

  function optionForLanguage(option, language) {
    return {
      id: option[0],
      label: language === "zh" ? option[1] : option[3],
      detail: language === "zh" ? option[2] : option[4],
      effects: option[5].map(([stat, delta]) => ({ stat, delta })),
    };
  }

  function generateEventDraft(prompt, route = "student") {
    const safePrompt = cleanPrompt(prompt);
    const language = detectLanguage(safePrompt);
    const category = CATEGORIES.find((item) => item.pattern.test(safePrompt)) || CATEGORIES[CATEGORIES.length - 1];
    const start = hashText(safePrompt) % category.options.length;
    const chosen = Array.from({ length: 3 }, (_, index) => category.options[(start + index) % category.options.length]);
    const translations = {
      zh: {
        title: language === "zh" ? promptTitle(safePrompt, "zh") : category.title.zh,
        description: language === "zh" ? safePrompt : category.description.zh,
        options: chosen.map((option) => ({ id: option[0], label: option[1], detail: option[2] })),
      },
      en: {
        title: language === "en" ? promptTitle(safePrompt, "en") : category.title.en,
        description: language === "en" ? safePrompt : category.description.en,
        options: chosen.map((option) => ({ id: option[0], label: option[3], detail: option[4] })),
      },
    };
    const active = translations[language];
    return {
      id: `school_event_${Date.now().toString(36)}_${hashText(safePrompt).toString(36).slice(0, 5)}`,
      title: active.title,
      category: category.id,
      route: ["student", "teacher", "both"].includes(route) ? route : "student",
      description: active.description,
      chance: 18 + (hashText(safePrompt) % 15),
      enabled: true,
      generated: true,
      sourceLanguage: language,
      translations,
      options: chosen.map((option) => optionForLanguage(option, language)),
      createdAt: new Date().toISOString(),
    };
  }

  return { detectLanguage, generateEventDraft, promptTitle };
});

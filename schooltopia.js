(function () {
  const API = "/api";
  const STATIC_SCHOOL_KEY = "schooltopia_static_school_v1";
  const STATIC_HOST =
    window.location.hostname.endsWith(".github.io") ||
    new URLSearchParams(window.location.search).has("static");
  const PROFILE_KEY = "schooltopia_research_profile";
  const CLIENT_KEY = "schooltopia_anonymous_client";
  const CLIENT_SECRET_KEY = "schooltopia_research_delete_key";
  const CONSENT_KEY = "schooltopia_research_consent";
  const state = {
    schools: [],
    config: null,
    profile: loadProfile(),
    sessionId: null,
    sessionPromise: null,
    choiceQueue: Promise.resolve(),
    online: true,
    consent: readConsent(),
  };

  function readConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY) === "true";
    } catch {
      return false;
    }
  }

  function loadProfile() {
    try {
      return {
        schoolId: "demo-school",
        gradeBand: "lower",
        playerStyle: "balanced",
        ...JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}"),
      };
    } catch {
      return { schoolId: "demo-school", gradeBand: "lower", playerStyle: "balanced" };
    }
  }

  function saveProfile() {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(state.profile));
    } catch {
      // The game remains playable when storage is unavailable.
    }
  }

  function localizedText(value) {
    return window.SchooltopiaI18n?.phrase?.(String(value ?? "")) ?? String(value ?? "");
  }

  function renderSchoolOption(select, id, name) {
    if (!select) return;
    select.innerHTML = "";
    const option = document.createElement("option");
    option.value = id;
    option.textContent = localizedText(name);
    select.append(option);
    select.value = id;
  }

  function readStaticConfig() {
    const fallback = {
      id: "local-school",
      name: "Schooltopia",
      tagline: "每所学校都有自己的生存规则。",
      skin: {
        primary: "#245f61",
        accent: "#d09a39",
        danger: "#b64d3f",
        sky: "#10242b",
      },
      weights: {
        eventFrequency: 1,
        academicPressure: 1,
        socialSupport: 1,
        recovery: 1,
        trustSensitivity: 1,
      },
      version: 1,
      customEvents: [],
    };
    try {
      const shared = window.SchooltopiaShare?.readShareUrl?.(window.location.href);
      if (shared) return shared;
      const stored = JSON.parse(localStorage.getItem(STATIC_SCHOOL_KEY) || "null");
      if (!stored) return fallback;
      return window.SchooltopiaShare?.normalizeConfig?.({
        ...fallback,
        ...stored,
        skin: { ...fallback.skin, ...(stored.skin || {}) },
        weights: { ...fallback.weights, ...(stored.weights || {}) },
        customEvents: Array.isArray(stored.customEvents) ? stored.customEvents : [],
      }) || fallback;
    } catch {
      return fallback;
    }
  }

  function randomIdentityPart(prefix) {
    if (window.crypto?.randomUUID) return `${prefix}_${window.crypto.randomUUID().replace(/-/g, "")}`;
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
  }

  function getClientIdentity(create = true) {
    try {
      let id = localStorage.getItem(CLIENT_KEY);
      let deletionKey = localStorage.getItem(CLIENT_SECRET_KEY);
      if (create && !id) {
        id = randomIdentityPart("player");
        localStorage.setItem(CLIENT_KEY, id);
      }
      if (create && !deletionKey) {
        deletionKey = randomIdentityPart("delete");
        localStorage.setItem(CLIENT_SECRET_KEY, deletionKey);
      }
      return { id, deletionKey };
    } catch {
      return create
        ? { id: randomIdentityPart("session"), deletionKey: randomIdentityPart("delete") }
        : { id: "", deletionKey: "" };
    }
  }

  async function api(path, options = {}) {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "content-type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `请求失败：${response.status}`);
    }
    return response.json();
  }

  function setConnectionStatus(online, message) {
    state.online = online;
    const status = document.getElementById("researchConnection");
    if (!status) return;
    status.classList.toggle("offline", !online);
    status.textContent = message || (online ? "匿名研究已连接" : "离线试玩，不上传数据");
  }

  function setPrivacyCopy() {
    const note = document.getElementById("privacyNote");
    const consentWrap = document.getElementById("researchConsentWrap");
    const retention = document.querySelector(".retention-note");
    const consent = document.getElementById("researchConsent");
    if (consent) consent.checked = state.consent;
    if (STATIC_HOST) {
      consentWrap?.classList.add("hidden");
      if (note) note.textContent = "GitHub 公开版的学校设置、选择与结局只保存在当前浏览器，不会上传。年级段和玩家倾向只用于本机回顾，不改变玩法。";
      if (retention) retention.textContent = "清除浏览器网站数据即可删除这些本机记录。反馈框不会在离线版上传内容。";
      return;
    }
    consentWrap?.classList.remove("hidden");
    if (note) note.textContent = "只有在你明确同意后，系统才会记录匿名路线、选择、属性变化、结局与主动反馈。";
    if (retention) retention.textContent = "在线研究记录最多保留 180 天；反馈请勿填写姓名或可识别个人的信息。";
  }

  function bindPrivacyControls() {
    const consent = document.getElementById("researchConsent");
    consent?.addEventListener("change", () => {
      state.consent = Boolean(consent.checked);
      try {
        localStorage.setItem(CONSENT_KEY, state.consent ? "true" : "false");
      } catch {
        // Consent still applies to the current page session.
      }
      setConnectionStatus(state.online, state.consent ? "匿名研究已启用" : "匿名研究未启用");
    });

    document.getElementById("deleteResearchData")?.addEventListener("click", async () => {
      if (!(window.confirm?.("清除本机研究设置，并删除服务器上与此匿名标识关联的记录吗？") ?? true)) return;
      const identity = getClientIdentity(false);
      if (state.online && identity.id && identity.deletionKey) {
        try {
          await api("/research/delete-client", {
            method: "POST",
            body: JSON.stringify({ clientId: identity.id, deletionKey: identity.deletionKey }),
          });
        } catch {
          setConnectionStatus(false, "服务器记录暂时无法删除");
          return;
        }
      }
      try {
        [CLIENT_KEY, CLIENT_SECRET_KEY, CONSENT_KEY, PROFILE_KEY].forEach((key) => localStorage.removeItem(key));
      } catch {
        // The visible state is still reset for this page session.
      }
      state.consent = false;
      state.profile = { schoolId: state.config?.id || "demo-school", gradeBand: "lower", playerStyle: "balanced" };
      setChoiceButtons("gradeBandButtons", state.profile.gradeBand);
      setChoiceButtons("playerStyleButtons", state.profile.playerStyle);
      abandonSession();
      setPrivacyCopy();
      setConnectionStatus(state.online, STATIC_HOST ? "GitHub 离线试玩，不上传数据" : "研究数据已清除");
    });
    setPrivacyCopy();
  }

  function setChoiceButtons(containerId, value) {
    document.querySelectorAll(`#${containerId} [data-value]`).forEach((button) => {
      button.classList.toggle("active", button.dataset.value === value);
      button.setAttribute("aria-pressed", button.dataset.value === value ? "true" : "false");
    });
  }

  function bindProfileButtons(containerId, key) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener("click", (event) => {
      const button = event.target.closest("[data-value]");
      if (!button) return;
      state.profile[key] = button.dataset.value;
      saveProfile();
      setChoiceButtons(containerId, state.profile[key]);
    });
    setChoiceButtons(containerId, state.profile[key]);
  }

  function applyConfig(config) {
    if (!config) return;
    state.config = config;
    state.profile.schoolId = config.id;
    saveProfile();
    const root = document.documentElement;
    root.style.setProperty("--school-primary", config.skin.primary);
    root.style.setProperty("--school-accent", config.skin.accent);
    root.style.setProperty("--school-danger", config.skin.danger);
    root.style.setProperty("--school-sky", config.skin.sky);
    const name = document.getElementById("schoolNameDisplay");
    const tagline = document.getElementById("schoolTagline");
    const version = document.getElementById("schoolVersion");
    if (name) name.textContent = localizedText(config.name);
    if (tagline) tagline.textContent = localizedText(config.tagline);
    if (version) version.textContent = `规则版本 v${config.version}`;
    document.body.dataset.school = config.id;
  }

  async function loadConfig(schoolId) {
    const config = await api(`/config?school=${encodeURIComponent(schoolId || state.profile.schoolId)}`);
    applyConfig(config);
    return config;
  }

  async function init() {
    const requestedSchool = new URLSearchParams(window.location.search).get("school");
    if (requestedSchool) state.profile.schoolId = requestedSchool;
    bindProfileButtons("gradeBandButtons", "gradeBand");
    bindProfileButtons("playerStyleButtons", "playerStyle");
    bindPrivacyControls();
    const select = document.getElementById("schoolSelect");
    if (STATIC_HOST) {
      state.online = false;
      const config = readStaticConfig();
      applyConfig(config);
      renderSchoolOption(select, config.id, config.name);
      setConnectionStatus(false, "GitHub 离线试玩，不上传数据");
      setPrivacyCopy();
      bindFeedbackForm();
      window.addEventListener("schooltopia-language-change", () => {
        applyConfig(config);
        renderSchoolOption(select, config.id, config.name);
      });
      return;
    }
    try {
      state.schools = await api("/schools");
      if (select) {
        select.innerHTML = "";
        state.schools.forEach((school) => {
          const option = document.createElement("option");
          option.value = school.id;
          option.textContent = localizedText(school.name);
          select.append(option);
        });
        if (!state.schools.some((school) => school.id === state.profile.schoolId)) {
          state.profile.schoolId = state.schools[0]?.id || "demo-school";
        }
        select.value = state.profile.schoolId;
        select.addEventListener("change", async () => {
          state.profile.schoolId = select.value;
          saveProfile();
          await loadConfig(select.value);
        });
      }
      await loadConfig(state.profile.schoolId);
      setConnectionStatus(true, state.consent ? "匿名研究已启用" : "匿名研究未启用");
    } catch (error) {
      setConnectionStatus(false, "后台未启动，当前为离线试玩");
      renderSchoolOption(select, "demo-school", "离线示例学校");
    }
    bindFeedbackForm();
  }

  function snapshot(currentGame) {
    return currentGame?.stats ? { ...currentGame.stats } : {};
  }

  function hasSeenIvyEnding() {
    try {
      const endings = JSON.parse(localStorage.getItem("schooltopia_unlocked_endings") || "[]");
      return Array.isArray(endings) && (
        endings.includes("ending_ivy_admission") ||
        endings.includes("ending_reject_ivy")
      );
    } catch {
      return false;
    }
  }

  function getDeltas(before = {}, after = {}) {
    const deltas = {};
    new Set([...Object.keys(before), ...Object.keys(after)]).forEach((key) => {
      const delta = Number(after[key] || 0) - Number(before[key] || 0);
      if (delta) deltas[key] = delta;
    });
    return deltas;
  }

  function startSession(currentGame) {
    state.sessionId = null;
    state.choiceQueue = Promise.resolve();
    if (!state.online || !state.consent) return Promise.resolve(null);
    const client = getClientIdentity();
    state.sessionPromise = api("/sessions/start", {
      method: "POST",
      body: JSON.stringify({
        clientId: client.id,
        deletionKey: client.deletionKey,
        researchConsent: true,
        schoolId: state.profile.schoolId,
        route: currentGame.route,
        identity: currentGame.identity,
        difficulty: currentGame.difficulty,
        gradeBand: state.profile.gradeBand,
        playerStyle: state.profile.playerStyle,
        ivyHintSeenBeforeRun: hasSeenIvyEnding(),
      }),
    })
      .then((session) => {
        state.sessionId = session.id;
        return session.id;
      })
      .catch(() => {
        setConnectionStatus(false, "研究记录暂时无法上传");
        return null;
      });
    return state.sessionPromise;
  }

  async function sessionId() {
    if (state.sessionId) return state.sessionId;
    return state.sessionPromise ? state.sessionPromise : null;
  }

  function recordChoice(context, before, after, currentGame) {
    const writeChoice = async () => {
      const id = await sessionId();
      if (!id) return;
      try {
        await api(`/sessions/${id}/choice`, {
          method: "POST",
          body: JSON.stringify({
            source: context.source,
            contextId: context.contextId,
            contextLabel: context.contextLabel,
            choiceId: context.choiceId,
            choiceLabel: context.choiceLabel,
            week: context.week ?? currentGame?.week ?? 0,
            phase: context.phase ?? currentGame?.currentActionPhase ?? "",
            deltas: getDeltas(before, after),
          }),
        });
      } catch {
        setConnectionStatus(false, "部分研究记录未上传");
      }
    };
    state.choiceQueue = state.choiceQueue.then(writeChoice, writeChoice);
    return state.choiceQueue;
  }

  async function endSession(currentGame, endingId, endingTitle) {
    const id = await sessionId();
    if (!id) {
      const insight = document.getElementById("sessionInsight");
      if (insight) insight.textContent = localSessionSummary(currentGame, endingTitle);
      document.getElementById("feedbackPanel")?.classList.add("hidden");
      return;
    }
    await state.choiceQueue;
    const insight = document.getElementById("sessionInsight");
    if (insight) insight.textContent = "正在生成本局研究摘要...";
    try {
      const result = await api(`/sessions/${id}/end`, {
        method: "POST",
        body: JSON.stringify({
          endingId,
          endingTitle,
          roundsPlayed: currentGame?.week || 0,
          finalStats: snapshot(currentGame),
        }),
      });
      if (insight) {
        const reportNotice = result.reportRoundNumber
          ? `\n第 ${result.reportRoundNumber} 轮研究报告已生成。`
          : "";
        insight.textContent = `${result.summary}${reportNotice}`;
      }
      const feedbackPanel = document.getElementById("feedbackPanel");
      feedbackPanel?.classList.remove("hidden");
    } catch {
      if (insight) insight.textContent = "本局已结束，但研究摘要暂时无法连接后台。";
    }
  }

  function localSessionSummary(currentGame, endingTitle) {
    const stats = snapshot(currentGame);
    const labels = currentGame?.route === "teacher"
      ? { authority: "教学威严", teacherStamina: "教师体能", teacherMood: "教师心情", studentFavor: "学生好感", gradeTrust: "年级组信任" }
      : { wisdom: "智慧", stamina: "体能", mood: "心情", peerFavor: "同学好感", homeroomTrust: "班主任信任" };
    const ranked = Object.entries(stats)
      .filter(([key, value]) => labels[key] && Number.isFinite(Number(value)))
      .sort((a, b) => Number(a[1]) - Number(b[1]));
    const pressure = ranked[0] ? labels[ranked[0][0]] : "状态";
    const resource = ranked.at(-1) ? labels[ranked.at(-1)[0]] : "选择";
    const grade = state.profile.gradeBand === "upper" ? "高年级" : "低年级";
    const style = { academic: "学术型", social: "社交型", balanced: "平衡型" }[state.profile.playerStyle] || "平衡型";
    if (window.SchooltopiaI18n?.language === "en") {
      return `Local run summary for a ${localizedText(grade)} / ${localizedText(style)} profile: ${localizedText(pressure)} was the main pressure point, while ${localizedText(resource)} was your strongest resource. You reached ${localizedText(endingTitle)}. This summary stays in this browser.`;
    }
    return `本机回顾（${grade} / ${style}）：${pressure}是本局最明显的压力点，${resource}是最主要的生存资源。最终到达${endingTitle}。本摘要只保存在当前浏览器。`;
  }

  function abandonSession() {
    state.sessionId = null;
    state.sessionPromise = null;
    state.choiceQueue = Promise.resolve();
    const insight = document.getElementById("sessionInsight");
    if (insight) insight.textContent = "完成一局后，这里会生成匿名研究摘要。";
    document.getElementById("feedbackPanel")?.classList.add("hidden");
  }

  function bindFeedbackForm() {
    const button = document.getElementById("submitFeedback");
    if (!button) return;
    button.addEventListener("click", async () => {
      const id = await sessionId();
      const status = document.getElementById("feedbackStatus");
      if (!id) {
        if (status) status.textContent = "当前没有可关联的试玩记录。";
        return;
      }
      button.disabled = true;
      try {
        await api(`/sessions/${id}/feedback`, {
          method: "POST",
          body: JSON.stringify({
            topic: document.getElementById("feedbackTopic")?.value,
            rating: document.getElementById("feedbackRating")?.value,
            optimalChoiceSimilarity: document.getElementById("feedbackOptimalSimilarity")?.value,
            text: document.getElementById("feedbackText")?.value,
          }),
        });
        if (status) status.textContent = "反馈已匿名记录，会进入下一版规则分析。";
      } catch {
        if (status) status.textContent = "反馈暂时没有上传成功。";
      } finally {
        button.disabled = false;
      }
    });
  }

  function weightedRound(value) {
    if (!value) return 0;
    const sign = Math.sign(value);
    const magnitude = Math.abs(value);
    const whole = Math.floor(magnitude);
    const extra = Math.random() < magnitude - whole ? 1 : 0;
    return sign * (whole + extra);
  }

  function adjustStatDelta({ statName, delta, reason }) {
    if (!state.config || !delta) return delta;
    const weights = state.config.weights || {};
    let factor = 1;
    const recoveryStats = new Set(["stamina", "mood", "teacherStamina", "teacherMood"]);
    const relationStats = new Set(["peerFavor", "homeroomTrust", "studentFavor", "gradeTrust"]);
    const academicReason = /study|homework|exam|project|reading|grade|class|wisdom|academic/i.test(reason || "");
    if (delta > 0 && recoveryStats.has(statName)) factor = weights.recovery || 1;
    if (delta > 0 && relationStats.has(statName)) factor = weights.socialSupport || 1;
    if (delta < 0 && relationStats.has(statName)) factor = weights.trustSensitivity || 1;
    if (delta < 0 && academicReason) factor *= weights.academicPressure || 1;
    return weightedRound(delta * factor);
  }

  function getEventMultiplier() {
    return state.config?.weights?.eventFrequency || 1;
  }

  function maybeCreateEvent(currentGame, helpers) {
    const events = (state.config?.customEvents || []).filter(
      (event) => event.enabled && (event.route === "both" || event.route === currentGame.route)
    );
    if (!events.length) return null;
    const triggeredEvents = events.filter((event) => {
      const chance = Number(event.chance || 0) * getEventMultiplier();
      return helpers.randomChance(chance);
    });
    if (!triggeredEvents.length) return null;
    const event = triggeredEvents[Math.floor(Math.random() * triggeredEvents.length)];
    const teacherStat = {
      wisdom: "authority",
      stamina: "teacherStamina",
      mood: "teacherMood",
      peerFavor: "studentFavor",
      homeroomTrust: "gradeTrust",
    };
    const language = window.SchooltopiaI18n?.language === "en" ? "en" : "zh";
    const translation = event.translations?.[language];
    const translatedOptions = translation?.options || [];
    const eventTitle = translation?.title || localizedText(event.title);
    const eventDescription = translation?.description || localizedText(event.description);
    return helpers.makeEvent({
      id: event.id,
      name: eventTitle,
      type: `${state.config.name} · 校本事件`,
      description: eventDescription,
      options: event.options.map((option, index) => {
        const translated = translatedOptions.find((item) => item.id === option.id) || translatedOptions[index];
        const optionLabel = translated?.label || localizedText(option.label);
        const optionDetail = translated?.detail || localizedText(option.detail);
        return {
          id: `${event.id}_${option.id}`,
          name: optionLabel,
          detail: optionDetail,
          run() {
            option.effects.forEach(({ stat, delta }) => {
              const resolvedStat = currentGame.route === "teacher" ? teacherStat[stat] || stat : stat;
              helpers.applyStatChange(currentGame.route, resolvedStat, Number(delta), `${event.category}_${event.id}`);
            });
            helpers.addLog(`校本事件“${eventTitle}”：你选择了“${optionLabel}”。`);
          },
        };
      }),
    });
  }

  window.Schooltopia = {
    init,
    snapshot,
    startSession,
    recordChoice,
    endSession,
    abandonSession,
    adjustStatDelta,
    getEventMultiplier,
    maybeCreateEvent,
    loadConfig,
    get config() {
      return state.config;
    },
    get profile() {
      return { ...state.profile };
    },
  };

  init();
})();

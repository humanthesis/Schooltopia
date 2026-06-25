(function () {
  const API = "/api";
  const STATIC_SCHOOL_KEY = "schooltopia_static_school_v1";
  const STATIC_HOST =
    window.location.hostname.endsWith(".github.io") ||
    new URLSearchParams(window.location.search).has("static");
  const PROFILE_KEY = "schooltopia_research_profile";
  const CLIENT_KEY = "schooltopia_anonymous_client";
  const state = {
    schools: [],
    config: null,
    profile: loadProfile(),
    sessionId: null,
    sessionPromise: null,
    choiceQueue: Promise.resolve(),
    online: true,
  };

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

  function readStaticConfig() {
    const fallback = {
      id: "local-school",
      name: "未命名学校",
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
      const stored = JSON.parse(localStorage.getItem(STATIC_SCHOOL_KEY) || "null");
      if (!stored) return fallback;
      return {
        ...fallback,
        ...stored,
        skin: { ...fallback.skin, ...(stored.skin || {}) },
        weights: { ...fallback.weights, ...(stored.weights || {}) },
        customEvents: Array.isArray(stored.customEvents) ? stored.customEvents : [],
      };
    } catch {
      return fallback;
    }
  }

  function getClientId() {
    try {
      let id = localStorage.getItem(CLIENT_KEY);
      if (!id) {
        id = `player_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(CLIENT_KEY, id);
      }
      return id;
    } catch {
      return `session_${Date.now().toString(36)}`;
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
    if (name) name.textContent = config.name;
    if (tagline) tagline.textContent = config.tagline;
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
    const select = document.getElementById("schoolSelect");
    if (STATIC_HOST) {
      state.online = false;
      const config = readStaticConfig();
      applyConfig(config);
      if (select) {
        select.innerHTML = `<option value="${config.id}">${config.name}</option>`;
        select.value = config.id;
      }
      setConnectionStatus(false, "GitHub 离线试玩，不上传数据");
      bindFeedbackForm();
      return;
    }
    try {
      state.schools = await api("/schools");
      if (select) {
        select.innerHTML = state.schools.map((school) => `<option value="${school.id}">${school.name}</option>`).join("");
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
      setConnectionStatus(true);
    } catch (error) {
      setConnectionStatus(false, "后台未启动，当前为离线试玩");
      if (select) select.innerHTML = '<option value="demo-school">离线示例学校</option>';
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
    if (!state.online) return Promise.resolve(null);
    state.sessionPromise = api("/sessions/start", {
      method: "POST",
      body: JSON.stringify({
        clientId: getClientId(),
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
    if (!id) return;
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
    const event = events[Math.floor(Math.random() * events.length)];
    const chance = Number(event.chance || 0) * getEventMultiplier();
    if (!helpers.randomChance(chance)) return null;
    const teacherStat = {
      wisdom: "authority",
      stamina: "teacherStamina",
      mood: "teacherMood",
      peerFavor: "studentFavor",
      homeroomTrust: "gradeTrust",
    };
    return helpers.makeEvent({
      id: event.id,
      name: event.title,
      type: `${state.config.name} · 校本事件`,
      description: event.description,
      options: event.options.map((option) => ({
        id: `${event.id}_${option.id}`,
        name: option.label,
        detail: option.detail,
        run() {
          option.effects.forEach(({ stat, delta }) => {
            const resolvedStat = currentGame.route === "teacher" ? teacherStat[stat] || stat : stat;
            helpers.applyStatChange(currentGame.route, resolvedStat, Number(delta), `${event.category}_${event.id}`);
          });
          helpers.addLog(`校本事件“${event.title}”：你选择了“${option.label}”。`);
        },
      })),
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

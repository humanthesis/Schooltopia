(function () {
  const API = "/api";
  const OWNED_KEY = "schooltopia_owned_schools_v2";
  const STATIC_SCHOOL_KEY = "schooltopia_static_school_v1";
  const STATIC_HOST =
    window.location.hostname.endsWith(".github.io") ||
    new URLSearchParams(window.location.search).has("static");
  const DEFAULT_STATIC_SCHOOL = {
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
  const weightMeta = [
    ["eventFrequency", "事件密度", "随机事件出现频率"],
    ["academicPressure", "学术压力", "学习与考试造成的损耗"],
    ["socialSupport", "关系支持", "关系属性的正向收益"],
    ["recovery", "恢复效率", "体能与心情的恢复效果"],
    ["trustSensitivity", "信任敏感度", "好感与信任下降强度"],
  ];
  const eventStatMeta = [
    { id: "wisdom", student: "智慧", teacher: "教师威严" },
    { id: "stamina", student: "体能", teacher: "教师体能" },
    { id: "mood", student: "心情", teacher: "教师心情" },
    { id: "peerFavor", student: "同学好感", teacher: "学生好感" },
    { id: "homeroomTrust", student: "班主任信任", teacher: "年级组信任" },
  ];
  const skinPresets = [
    { id: "forest", name: "森林黑板", primary: "#245f61", accent: "#d09a39", danger: "#b64d3f", sky: "#10242b" },
    { id: "coast", name: "海盐蓝", primary: "#17657a", accent: "#f4b860", danger: "#d95d52", sky: "#14395a" },
    { id: "track", name: "运动场", primary: "#2e6b4f", accent: "#f2cf5b", danger: "#c34b3f", sky: "#78b7cf" },
    { id: "library", name: "旧图书馆", primary: "#57313d", accent: "#c79d54", danger: "#9f3e44", sky: "#26222a" },
    { id: "laboratory", name: "未来实验室", primary: "#237c88", accent: "#ffd166", danger: "#ef476f", sky: "#19324b" },
    { id: "night", name: "晚自习", primary: "#4a5b8f", accent: "#f4d35e", danger: "#ee6c4d", sky: "#1b2038" },
  ];
  const state = {
    owned: readOwned(),
    school: null,
    token: "",
    editingEventId: "",
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readOwned() {
    try {
      return JSON.parse(localStorage.getItem(OWNED_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveOwned() {
    try {
      localStorage.setItem(OWNED_KEY, JSON.stringify(state.owned));
    } catch {
      setStatus("浏览器无法保存编辑凭证，请保持本页面打开。", true);
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function readStaticSchool() {
    try {
      const stored = JSON.parse(localStorage.getItem(STATIC_SCHOOL_KEY) || "null");
      if (!stored) return clone(DEFAULT_STATIC_SCHOOL);
      return {
        ...clone(DEFAULT_STATIC_SCHOOL),
        ...stored,
        skin: { ...DEFAULT_STATIC_SCHOOL.skin, ...(stored.skin || {}) },
        weights: { ...DEFAULT_STATIC_SCHOOL.weights, ...(stored.weights || {}) },
        customEvents: Array.isArray(stored.customEvents) ? stored.customEvents : [],
      };
    } catch {
      return clone(DEFAULT_STATIC_SCHOOL);
    }
  }

  function saveStaticSchool(school) {
    state.school = school;
    try {
      localStorage.setItem(STATIC_SCHOOL_KEY, JSON.stringify(school));
    } catch {
      setStatus("浏览器无法保存学校设置，请保持本页面打开。", true);
    }
    return school;
  }

  function staticOwnedEntry(school) {
    return { id: school.id, name: school.name, token: "local" };
  }

  function localizedText(value) {
    return window.SchooltopiaI18n?.phrase?.(String(value ?? "")) ?? String(value ?? "");
  }

  function localizeKnownInput(input) {
    if (!input) return;
    const knownValues = [
      "未命名学校",
      "Untitled School",
      "每所学校都有自己的生存规则。",
      "Every school has its own survival rules.",
      "正面处理",
      "Face It",
      "找人合作",
      "Seek Support",
      "先保护状态",
      "Protect Yourself",
      "直接解决问题，收益更明显，也可能付出代价。",
      "Address the problem directly for a stronger result, with a possible cost.",
      "借助关系网络缓冲压力。",
      "Use your support network to soften the pressure.",
      "减少眼前损耗，但问题不会完全消失。",
      "Reduce the immediate strain, though the problem will not fully disappear.",
    ];
    if (knownValues.includes(input.value)) input.value = localizedText(input.value);
  }

  function localizeCreatorInputs() {
    localizeKnownInput($("creatorNameInput"));
    localizeKnownInput($("creatorTaglineInput"));
    document.querySelectorAll(".node-option-label, .node-option-detail").forEach(localizeKnownInput);
    if (state.school) {
      const name = $("creatorNameInput").value || localizedText(state.school.name);
      const tagline = $("creatorTaglineInput").value || localizedText(state.school.tagline || DEFAULT_STATIC_SCHOOL.tagline);
      $("creatorPreviewName").textContent = name;
      $("railSchoolName").textContent = name;
      $("creatorPreviewTagline").textContent = tagline;
    }
  }

  async function api(path, options = {}) {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "content-type": "application/json",
        ...(state.token ? { "x-school-edit-token": state.token } : {}),
        ...(options.headers || {}),
      },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 403 && String(body.error || "").includes("编辑权限")) {
        throw new Error("这个浏览器没有编辑权限。请用创建该学校的浏览器打开，或重新创建一个学校版本。");
      }
      throw new Error(body.error || `请求失败：${response.status}`);
    }
    return body;
  }

  function setStatus(message, error = false) {
    $("creatorStatus").textContent = message;
    $("creatorStatus").classList.toggle("error", error);
    window.dispatchEvent(new CustomEvent("creator-status", { detail: { message, error } }));
  }

  function renderOwned() {
    const wrap = $("ownedSchoolWrap");
    wrap.classList.toggle("hidden", !state.owned.length);
    const selected = $("ownedSchoolSelect").value;
    $("ownedSchoolSelect").innerHTML = state.owned
      .map((school) => `<option value="${escapeHtml(school.id)}">${escapeHtml(localizedText(school.name))}</option>`)
      .join("");
    if (state.owned.some((school) => school.id === selected)) $("ownedSchoolSelect").value = selected;
  }

  async function createSchool() {
    const name = $("creatorSchoolName").value.trim() || localizedText("未命名学校");
    const button = $("createOwnedSchool");
    button.disabled = true;
    try {
      if (STATIC_HOST) {
        const school = saveStaticSchool({
          ...clone(DEFAULT_STATIC_SCHOOL),
          name,
          updatedAt: new Date().toISOString(),
        });
        state.owned = [staticOwnedEntry(school)];
        renderOwned();
        $("ownedSchoolSelect").value = school.id;
        state.token = "local";
        renderWorkspace();
        $("creatorWorkspace").classList.remove("hidden");
        $("creatorSchoolName").value = "";
        setStatus(`已创建“${school.name}”。现在可以选择皮肤并添加校园事件。`);
        return;
      }
      state.token = "";
      const school = await api("/schools", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const owned = { id: school.id, name: school.name, token: school.editToken };
      state.owned = state.owned.filter((item) => item.id !== owned.id);
      state.owned.push(owned);
      saveOwned();
      renderOwned();
      $("ownedSchoolSelect").value = owned.id;
      state.token = owned.token;
      await loadSchool(owned.id);
      $("creatorSchoolName").value = "";
      setStatus(`已创建“${school.name}”。现在可以选择皮肤并添加校园事件。`);
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      button.disabled = false;
    }
  }

  async function loadOwnedSchool() {
    const id = $("ownedSchoolSelect").value;
    const owned = state.owned.find((item) => item.id === id);
    if (!owned) return;
    state.token = owned.token;
    await loadSchool(id);
  }

  async function loadSchool(id) {
    if (STATIC_HOST) {
      state.school = readStaticSchool();
      state.owned = [staticOwnedEntry(state.school)];
      renderOwned();
      $("ownedSchoolSelect").value = state.school.id;
      renderWorkspace();
      $("creatorWorkspace").classList.remove("hidden");
      return;
    }
    try {
      state.school = await api(`/config?school=${encodeURIComponent(id)}`);
      renderWorkspace();
      $("creatorWorkspace").classList.remove("hidden");
    } catch (error) {
      if (error.message === "学校不存在") {
        state.owned = state.owned.filter((item) => item.id !== id);
        state.school = null;
        state.token = "";
        saveOwned();
        renderOwned();
        $("creatorWorkspace").classList.add("hidden");
        setStatus("这个旧学校版本已经不存在，已从本机列表中移除。请重新创建。", true);
        return;
      }
      setStatus(error.message, true);
    }
  }

  function renderWorkspace() {
    const school = state.school;
    const eventCount = (school.customEvents || []).length;
    $("creatorNameInput").value = localizedText(school.name);
    $("creatorTaglineInput").value = localizedText(school.tagline || "");
    $("creatorPrimary").value = school.skin.primary;
    $("creatorAccent").value = school.skin.accent;
    $("creatorDanger").value = school.skin.danger;
    $("creatorSky").value = school.skin.sky;
    $("creatorPreviewName").textContent = localizedText(school.name);
    $("creatorPreviewTagline").textContent = localizedText(school.tagline || "每所学校都有自己的生存规则。");
    $("railSchoolName").textContent = localizedText(school.name);
    $("railEventCount").textContent = `${eventCount} 个校园事件`;
    $("previewEventCount").textContent = String(eventCount);
    renderSkinPreview();
    renderWeights();
    renderEvents();
    renderShareLink();
  }

  function currentSkin() {
    return {
      primary: $("creatorPrimary").value,
      accent: $("creatorAccent").value,
      danger: $("creatorDanger").value,
      sky: $("creatorSky").value,
    };
  }

  function renderSkinPreview() {
    const colors = currentSkin();
    $("creatorSkinPreview").style.setProperty("--preview-sky", colors.sky);
    $("creatorSkinPreview").style.setProperty("--preview-accent", colors.accent);
    document.documentElement.style.setProperty("--primary", colors.primary);
    document.documentElement.style.setProperty("--accent", colors.accent);
    document.documentElement.style.setProperty("--danger", colors.danger);
    $("previewPrimary").style.background = colors.primary;
    $("previewAccent").style.background = colors.accent;
    $("previewDanger").style.background = colors.danger;
    $("previewSky").style.background = colors.sky;
    window.Creator3D?.setTheme(colors);
    window.dispatchEvent(new CustomEvent("creator-theme-change", { detail: colors }));
    renderSkinPresets();
    drawCampusPreview(colors);
  }

  function renderSkinPresets() {
    const current = currentSkin();
    $("skinPresetGrid").innerHTML = skinPresets.map((preset) => {
      const active = ["primary", "accent", "danger", "sky"].every((key) => preset[key].toLowerCase() === current[key].toLowerCase());
      return `
        <button class="skin-preset${active ? " active" : ""}" type="button" data-preset="${preset.id}" aria-pressed="${active}">
          <span class="preset-swatches" aria-hidden="true">
            <i style="background:${preset.sky}"></i><i style="background:${preset.primary}"></i><i style="background:${preset.accent}"></i><i style="background:${preset.danger}"></i>
          </span>
          <strong>${preset.name}</strong>
        </button>
      `;
    }).join("");
    $("skinPresetGrid").querySelectorAll(".skin-preset").forEach((button) => {
      button.addEventListener("click", () => applySkinPreset(button.dataset.preset));
    });
  }

  function applySkinPreset(id) {
    const preset = skinPresets.find((item) => item.id === id);
    if (!preset) return;
    $("creatorPrimary").value = preset.primary;
    $("creatorAccent").value = preset.accent;
    $("creatorDanger").value = preset.danger;
    $("creatorSky").value = preset.sky;
    renderSkinPreview();
    setStatus(`已选择“${preset.name}”主题，保存后会应用到专属游戏。`);
  }

  function colorWithAlpha(hex, alpha) {
    const value = hex.replace("#", "");
    return `rgba(${parseInt(value.slice(0, 2), 16)}, ${parseInt(value.slice(2, 4), 16)}, ${parseInt(value.slice(4, 6), 16)}, ${alpha})`;
  }

  function drawCampusPreview(colors) {
    const canvas = $("creatorCampusPreview");
    const context = canvas.getContext("2d");
    if (!context) return;
    const width = canvas.width;
    const height = canvas.height;
    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, colors.sky);
    sky.addColorStop(0.68, colorWithAlpha(colors.primary, 0.82));
    sky.addColorStop(1, colors.primary);
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);
    context.globalAlpha = 0.18;
    context.fillStyle = "#ffffff";
    context.beginPath();
    context.arc(604, 76, 42, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;
    context.fillStyle = colorWithAlpha(colors.primary, 0.72);
    context.fillRect(0, 325, width, 135);
    context.fillStyle = colorWithAlpha(colors.danger, 0.72);
    context.fillRect(0, 386, width, 74);
    context.strokeStyle = colorWithAlpha("#ffffff", 0.48);
    context.lineWidth = 3;
    [401, 425].forEach((y) => {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y - 22);
      context.stroke();
    });
    context.fillStyle = colorWithAlpha("#091512", 0.42);
    context.fillRect(142, 154, 450, 204);
    context.fillStyle = colors.primary;
    context.fillRect(158, 136, 418, 214);
    context.fillStyle = colors.accent;
    context.fillRect(136, 122, 462, 23);
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        const x = 184 + col * 53;
        const y = 170 + row * 48;
        context.fillStyle = colorWithAlpha("#ffffff", 0.9);
        context.fillRect(x, y, 30, 25);
        context.fillStyle = colorWithAlpha(colors.accent, 0.54);
        context.fillRect(x + 14, y, 2, 25);
      }
    }
    context.fillStyle = colorWithAlpha("#0b1513", 0.72);
    context.fillRect(342, 286, 52, 64);
    [76, 640].forEach((x, index) => {
      context.fillStyle = colorWithAlpha("#13291e", 0.84);
      context.fillRect(x - 6, 276, 12, 84);
      context.fillStyle = index ? colors.accent : "#4f9b68";
      context.beginPath();
      context.arc(x, 248, 42, 0, Math.PI * 2);
      context.arc(x - 25, 270, 31, 0, Math.PI * 2);
      context.arc(x + 24, 271, 34, 0, Math.PI * 2);
      context.fill();
    });
    context.fillStyle = colors.accent;
    context.font = "900 18px Inter, sans-serif";
    context.textAlign = "center";
    context.fillText("SCHOOLTOPIA", width / 2, 112);
  }

  function renderWeights() {
    $("creatorWeightRows").innerHTML = weightMeta.map(([id, label, detail]) => `
      <div class="weight-row">
        <label for="creator-weight-${id}">${label}<small>${detail}</small></label>
        <input id="creator-weight-${id}" type="number" min="0.6" max="1.4" step="0.05" value="${state.school.weights[id]}" />
        <output id="creator-output-${id}">${Number(state.school.weights[id]).toFixed(2)}</output>
      </div>
    `).join("");
    weightMeta.forEach(([id]) => {
      $(`creator-weight-${id}`).addEventListener("input", () => {
        $(`creator-output-${id}`).textContent = Number($(`creator-weight-${id}`).value).toFixed(2);
      });
    });
  }

  function configPayload() {
    return {
      name: $("creatorNameInput").value,
      tagline: $("creatorTaglineInput").value,
      skin: currentSkin(),
      weights: Object.fromEntries(weightMeta.map(([id]) => [id, Number($(`creator-weight-${id}`).value)])),
    };
  }

  async function saveConfig() {
    try {
      if (STATIC_HOST) {
        const school = saveStaticSchool({
          ...state.school,
          ...configPayload(),
          version: Number(state.school.version || 1) + 1,
          updatedAt: new Date().toISOString(),
        });
        state.owned = [staticOwnedEntry(school)];
        renderOwned();
        $("ownedSchoolSelect").value = school.id;
        renderWorkspace();
        setStatus("学校外观和规则权重已保存，专属游戏会立即使用新设置。");
        return;
      }
      state.school = await api(`/schools/${state.school.id}`, {
        method: "PUT",
        body: JSON.stringify(configPayload()),
      });
      const owned = state.owned.find((item) => item.id === state.school.id);
      if (owned) owned.name = state.school.name;
      saveOwned();
      renderOwned();
      $("ownedSchoolSelect").value = state.school.id;
      renderWorkspace();
      setStatus("学校外观和规则权重已保存，专属游戏会立即使用新设置。");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  async function resetSchool() {
    if (!state.school) return;
    const confirmed = window.confirm(`确定重置“${state.school.name}”吗？\n\n学校名称会恢复为“未命名学校”；编辑权限保留，自定义事件、皮肤与规则权重会恢复默认。`);
    if (!confirmed) return;
    const button = $("resetOwnedSchool");
    button.disabled = true;
    try {
      if (STATIC_HOST) {
        const school = saveStaticSchool({
          ...clone(DEFAULT_STATIC_SCHOOL),
          version: Number(state.school.version || 1) + 1,
          updatedAt: new Date().toISOString(),
        });
        state.owned = [staticOwnedEntry(school)];
        renderOwned();
        $("ownedSchoolSelect").value = school.id;
        renderWorkspace();
        setStatus("学校已重置：名称恢复为“未命名学校”，编辑权限保留，其余设置已恢复初始状态。");
        return;
      }
      state.school = await api(`/schools/${state.school.id}/reset`, { method: "POST" });
      const owned = state.owned.find((item) => item.id === state.school.id);
      if (owned) owned.name = state.school.name;
      saveOwned();
      renderOwned();
      $("ownedSchoolSelect").value = state.school.id;
      renderWorkspace();
      setStatus("学校已重置：名称恢复为“未命名学校”，编辑权限保留，其余设置已恢复初始状态。");
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      button.disabled = false;
    }
  }

  async function generateEvent() {
    if (!state.school) {
      setStatus("请先创建或打开一个学校工作台，再生成剧情节点。", true);
      $("schoolDockTitle")?.scrollIntoView({ behavior: "smooth", block: "start" });
      $("creatorSchoolName")?.focus();
      return;
    }
    const prompt = $("creatorEventPrompt").value.trim();
    if (!prompt) {
      setStatus("请先填写一件真实校园事件。", true);
      $("creatorEventPrompt").focus();
      return;
    }
    const button = $("creatorGenerateEvent");
    button.disabled = true;
    try {
      if (STATIC_HOST) {
        const english = window.SchooltopiaI18n?.language === "en";
        const title = prompt.replace(/[。！？!?\n].*$/, "").slice(0, 18) || "校园新事件";
        const event = {
          id: `school_event_${Date.now().toString(36)}`,
          title,
          category: "campus",
          route: $("creatorEventRoute").value,
          description: prompt,
          chance: 22,
          enabled: true,
          generated: true,
          options: [
            {
              id: "face_it",
              label: english ? "Face It" : "正面处理",
              detail: english
                ? "Address the problem directly for a stronger result, with a possible cost."
                : "直接解决问题，收益更明显，也可能付出代价。",
              effects: [{ stat: "wisdom", delta: 2 }, { stat: "mood", delta: -1 }],
            },
            {
              id: "seek_support",
              label: english ? "Seek Support" : "找人合作",
              detail: english
                ? "Use your support network to soften the pressure."
                : "借助关系网络缓冲压力。",
              effects: [{ stat: "peerFavor", delta: 2 }, { stat: "homeroomTrust", delta: 1 }],
            },
            {
              id: "protect_self",
              label: english ? "Protect Yourself" : "先保护状态",
              detail: english
                ? "Reduce the immediate strain, though the problem will not fully disappear."
                : "减少眼前损耗，但问题不会完全消失。",
              effects: [{ stat: "stamina", delta: 2 }, { stat: "mood", delta: 1 }],
            },
          ],
          createdAt: new Date().toISOString(),
        };
        state.school.customEvents.push(event);
        state.school.version = Number(state.school.version || 1) + 1;
        saveStaticSchool(state.school);
        $("creatorEventPrompt").value = "";
        renderWorkspace();
        setStatus(`已把“${event.title}”生成三个可玩的剧情节点。`);
        return;
      }
      const event = await api(`/schools/${state.school.id}/events/generate`, {
        method: "POST",
        body: JSON.stringify({ prompt, route: $("creatorEventRoute").value }),
      });
      $("creatorEventPrompt").value = "";
      await loadSchool(state.school.id);
      setStatus(`已把“${event.title}”生成三个可玩的剧情节点。`);
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      button.disabled = false;
    }
  }

  function renderEvents() {
    const events = state.school.customEvents || [];
    const tbody = $("creatorEventTable");
    tbody.innerHTML = "";
    $("creatorEventEmpty").classList.toggle("hidden", events.length > 0);
    events.forEach((event) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input class="event-title-input" value="${escapeHtml(event.title)}" maxlength="60" /></td>
        <td><select class="route-select"><option value="student" ${event.route === "student" ? "selected" : ""}>学生</option><option value="teacher" ${event.route === "teacher" ? "selected" : ""}>教师</option><option value="both" ${event.route === "both" ? "selected" : ""}>双路线</option></select></td>
        <td><input class="chance-input" type="number" min="1" max="100" value="${event.chance}" />%</td>
        <td class="node-summary"><span>${event.options.map((option) => escapeHtml(option.label)).join(" / ")}</span><button class="edit-nodes" type="button">编辑节点</button></td>
        <td><input class="enabled-input" type="checkbox" ${event.enabled ? "checked" : ""} aria-label="启用 ${escapeHtml(event.title)}" /></td>
        <td><div class="row-actions"><button class="save-event" type="button">保存</button><button class="delete-event danger-button" type="button">删除</button></div></td>
      `;
      row.querySelector(".save-event").addEventListener("click", () => saveEvent(row, event.id));
      row.querySelector(".edit-nodes").addEventListener("click", () => openNodeEditor(event));
      row.querySelector(".delete-event").addEventListener("click", () => deleteEvent(event));
      tbody.append(row);
    });
  }

  function statOptionLabel(stat, route) {
    if (route === "student") return stat.student;
    if (route === "teacher") return stat.teacher;
    return `${stat.student} / ${stat.teacher}`;
  }

  function renderEffectRow(container, effect, route) {
    const row = document.createElement("div");
    row.className = "node-effect-row";
    row.innerHTML = `
      <select class="node-effect-stat" aria-label="影响属性">
        ${eventStatMeta.map((stat) => `<option value="${stat.id}" ${stat.id === effect.stat ? "selected" : ""}>${statOptionLabel(stat, route)}</option>`).join("")}
      </select>
      <input class="node-effect-delta" type="number" min="-5" max="5" step="1" value="${Number(effect.delta) || 1}" aria-label="属性变化数值" />
      <output class="node-effect-preview">${Number(effect.delta) > 0 ? "+" : ""}${Number(effect.delta) || 1}</output>
      <button class="remove-node-effect" type="button" aria-label="移除这项属性变化" title="移除">×</button>
    `;
    const deltaInput = row.querySelector(".node-effect-delta");
    const preview = row.querySelector(".node-effect-preview");
    deltaInput.addEventListener("input", () => {
      const value = Number(deltaInput.value) || 0;
      preview.textContent = `${value > 0 ? "+" : ""}${value}`;
      preview.classList.toggle("negative", value < 0);
    });
    preview.classList.toggle("negative", Number(effect.delta) < 0);
    row.querySelector(".remove-node-effect").addEventListener("click", () => {
      row.remove();
      if (!container.children.length) renderEffectRow(container, { stat: "mood", delta: 1 }, route);
    });
    container.append(row);
  }

  function renderNodeEditor(event) {
    const route = event.route || "student";
    const options = Array.from({ length: 3 }, (_, index) => event.options[index] || {
      id: `choice_${index + 1}`,
      label: `选择 ${index + 1}`,
      detail: "",
      effects: [{ stat: "mood", delta: 1 }],
    });
    const list = $("nodeEditorList");
    list.innerHTML = "";
    options.forEach((option, index) => {
      const card = document.createElement("article");
      card.className = "node-editor-card";
      card.dataset.optionId = option.id;
      card.innerHTML = `
        <header><span>NODE ${String(index + 1).padStart(2, "0")}</span><strong>玩家选择 ${index + 1}</strong></header>
        <div class="node-copy-fields">
          <label>选项名称<input class="node-option-label" maxlength="60" value="${escapeHtml(localizedText(option.label))}" /></label>
          <label>选项说明<textarea class="node-option-detail" rows="2" maxlength="180">${escapeHtml(localizedText(option.detail))}</textarea></label>
        </div>
        <div class="node-effects-head"><strong>选择后的属性变化</strong><button class="add-node-effect" type="button">＋ 添加变化</button></div>
        <div class="node-effect-list"></div>
      `;
      const effects = option.effects?.length ? option.effects : [{ stat: "mood", delta: 1 }];
      const effectList = card.querySelector(".node-effect-list");
      effects.forEach((effect) => renderEffectRow(effectList, effect, route));
      card.querySelector(".add-node-effect").addEventListener("click", () => {
        if (effectList.children.length >= 4) {
          setStatus("每个节点最多设置四项属性变化。", true);
          return;
        }
        renderEffectRow(effectList, { stat: "mood", delta: 1 }, route);
      });
      list.append(card);
    });
  }

  function openNodeEditor(event) {
    state.editingEventId = event.id;
    $("nodeEditorEventName").textContent = `正在编辑：${event.title}`;
    $("nodeEditorDescription").value = event.description || "";
    renderNodeEditor(event);
    $("nodeEditorDialog").showModal();
  }

  function closeNodeEditor() {
    state.editingEventId = "";
    $("nodeEditorDialog").close();
  }

  function collectNodeOptions() {
    return Array.from($("nodeEditorList").querySelectorAll(".node-editor-card")).map((card, index) => ({
      id: card.dataset.optionId || `choice_${index + 1}`,
      label: card.querySelector(".node-option-label").value,
      detail: card.querySelector(".node-option-detail").value,
      effects: Array.from(card.querySelectorAll(".node-effect-row")).map((row) => ({
        stat: row.querySelector(".node-effect-stat").value,
        delta: Number(row.querySelector(".node-effect-delta").value),
      })),
    }));
  }

  async function saveNodeEditor(event) {
    event.preventDefault();
    if (!state.editingEventId) return;
    const options = collectNodeOptions();
    const blankNode = options.findIndex((option) => !option.label.trim());
    if (blankNode >= 0) {
      setStatus(`请填写节点 ${blankNode + 1} 的选项名称。`, true);
      $("nodeEditorList").querySelectorAll(".node-option-label")[blankNode].focus();
      return;
    }
    const button = $("saveNodeEditor");
    button.disabled = true;
    try {
      if (STATIC_HOST) {
        const item = state.school.customEvents.find((entry) => entry.id === state.editingEventId);
        if (item) {
          item.description = $("nodeEditorDescription").value;
          item.options = options;
          item.updatedAt = new Date().toISOString();
          state.school.version = Number(state.school.version || 1) + 1;
          saveStaticSchool(state.school);
        }
        closeNodeEditor();
        renderWorkspace();
        setStatus("剧情节点已更新，新的选项与属性变化会直接进入游戏。");
        return;
      }
      await api(`/schools/${state.school.id}/events/${state.editingEventId}`, {
        method: "PUT",
        body: JSON.stringify({
          description: $("nodeEditorDescription").value,
          options,
        }),
      });
      closeNodeEditor();
      await loadSchool(state.school.id);
      setStatus("剧情节点已更新，新的选项与属性变化会直接进入游戏。");
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      button.disabled = false;
    }
  }

  async function saveEvent(row, eventId) {
    try {
      if (STATIC_HOST) {
        const item = state.school.customEvents.find((event) => event.id === eventId);
        if (item) {
          item.title = row.querySelector(".event-title-input").value;
          item.route = row.querySelector(".route-select").value;
          item.chance = Number(row.querySelector(".chance-input").value);
          item.enabled = row.querySelector(".enabled-input").checked;
          item.updatedAt = new Date().toISOString();
          state.school.version = Number(state.school.version || 1) + 1;
          saveStaticSchool(state.school);
        }
        renderWorkspace();
        setStatus("事件设置已保存。");
        return;
      }
      await api(`/schools/${state.school.id}/events/${eventId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: row.querySelector(".event-title-input").value,
          route: row.querySelector(".route-select").value,
          chance: Number(row.querySelector(".chance-input").value),
          enabled: row.querySelector(".enabled-input").checked,
        }),
      });
      await loadSchool(state.school.id);
      setStatus("事件设置已保存。");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  async function deleteEvent(event) {
    if (!window.confirm(`确定删除“${event.title}”吗？`)) return;
    try {
      if (STATIC_HOST) {
        state.school.customEvents = state.school.customEvents.filter((item) => item.id !== event.id);
        state.school.version = Number(state.school.version || 1) + 1;
        saveStaticSchool(state.school);
        renderWorkspace();
        setStatus("事件已删除。");
        return;
      }
      await api(`/schools/${state.school.id}/events/${event.id}`, { method: "DELETE" });
      await loadSchool(state.school.id);
      setStatus("事件已删除。");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function renderShareLink() {
    const origin = publicShareOrigin();
    const link = `${origin}/?school=${encodeURIComponent(state.school.id)}`;
    $("schoolShareLink").value = link;
    $("playOwnedSchool").href = link;
  }

  function publicShareOrigin() {
    const url = new URL(window.location.href);
    if (["127.0.0.1", "localhost"].includes(url.hostname) && url.port === "4180") {
      url.port = "4181";
    }
    return url.origin;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText($("schoolShareLink").value);
      setStatus("学校专属链接已复制，可以发给其他人。");
    } catch {
      $("schoolShareLink").select();
      setStatus("已选中链接，请复制后发送。");
    }
  }

  function bind() {
    $("createOwnedSchool").addEventListener("click", createSchool);
    $("loadOwnedSchool").addEventListener("click", loadOwnedSchool);
    $("saveCreatorConfig").addEventListener("click", saveConfig);
    $("creatorGenerateEvent").addEventListener("click", generateEvent);
    $("copySchoolLink").addEventListener("click", copyLink);
    $("resetOwnedSchool").addEventListener("click", resetSchool);
    $("nodeEditorForm").addEventListener("submit", saveNodeEditor);
    $("closeNodeEditor").addEventListener("click", closeNodeEditor);
    $("cancelNodeEditor").addEventListener("click", closeNodeEditor);
    ["creatorPrimary", "creatorAccent", "creatorDanger", "creatorSky"].forEach((id) => $(id).addEventListener("input", renderSkinPreview));
    $("creatorNameInput").addEventListener("input", () => {
      const name = $("creatorNameInput").value || "Schooltopia";
      $("creatorPreviewName").textContent = name;
      $("railSchoolName").textContent = name;
    });
    $("creatorTaglineInput").addEventListener("input", () => {
      $("creatorPreviewTagline").textContent = $("creatorTaglineInput").value || "每所学校都有自己的生存规则。";
    });
    window.addEventListener("schooltopia-language-change", () => {
      renderOwned();
      localizeCreatorInputs();
    });
  }

  async function init() {
    bind();
    if (STATIC_HOST) {
      state.school = readStaticSchool();
      state.owned = [staticOwnedEntry(state.school)];
      state.token = "local";
      renderOwned();
      $("ownedSchoolSelect").value = state.school.id;
      renderWorkspace();
      $("creatorWorkspace").classList.remove("hidden");
      setStatus("GitHub 版使用当前浏览器保存学校设置，六套皮肤和自定义事件均可直接试玩。");
      return;
    }
    try {
      const available = await api("/schools");
      const availableIds = new Set(available.map((school) => school.id));
      const reconciled = state.owned.filter((school) => availableIds.has(school.id));
      if (reconciled.length !== state.owned.length) {
        state.owned = reconciled;
        saveOwned();
      }
    } catch {
      // Keep local edit entries when the service is temporarily unavailable.
    }
    renderOwned();
    const requested = new URLSearchParams(window.location.search).get("school");
    const owned = state.owned.find((item) => item.id === requested) || state.owned[0];
    if (owned) {
      $("ownedSchoolSelect").value = owned.id;
      state.token = owned.token;
      loadSchool(owned.id);
    }
  }

  init();
})();

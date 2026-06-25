(function () {
  const API = "/api";
  const weights = [
    ["eventFrequency", "事件密度", "所有随机事件的整体出现频率"],
    ["academicPressure", "学术压力", "学习、作业与考试造成的负面损耗"],
    ["socialSupport", "关系支持", "同学、学生与教师关系的正向收益"],
    ["recovery", "恢复效率", "体能和心情恢复行动的效果"],
    ["trustSensitivity", "信任敏感度", "好感与信任下降的强度"],
  ];
  const labels = {
    commuter: "走读生",
    boarder: "住宿生",
    teacher: "教师",
    lower: "低年级",
    upper: "高年级",
    academic: "学术型",
    social: "社交型",
    balanced: "平衡型",
    student: "学生",
    both: "双路线",
  };
  const reportLabels = {
    trialPlayers: "试玩人数",
    playerChoiceSummary: "玩家选择统计",
    endingDistribution: "结局分布",
    playerFeedback: "玩家反馈",
    campusPressureInsight: "校园生活压力洞察",
    sacrificedStat: "玩家最常牺牲哪个属性",
    wisdomPursuit: "是否过度追求智慧",
    ivyMoodTradeoff: "藤校提示后的心情取舍",
    identityStrategy: "不同身份下的策略变化",
    optimalRealitySimilarity: "最优选择与真实生活是否相似",
  };
  const state = {
    schools: [],
    school: null,
    report: null,
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

  async function api(path, options = {}) {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: { "content-type": "application/json", ...(options.headers || {}) },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || `请求失败：${response.status}`);
    return body;
  }

  function setStatus(message, error = false) {
    const node = $("adminStatus");
    node.textContent = message;
    node.classList.toggle("error", error);
  }

  function bindTabs() {
    document.querySelectorAll(".admin-tabs button").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".admin-tabs button").forEach((item) => item.classList.toggle("active", item === button));
        document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `tab-${button.dataset.tab}`));
        if (button.dataset.tab === "report") loadReport();
      });
    });
  }

  async function loadSchools(preferredId) {
    state.schools = await api("/schools");
    const select = $("adminSchoolSelect");
    select.innerHTML = state.schools.map((school) => `<option value="${escapeHtml(school.id)}">${escapeHtml(school.name)}</option>`).join("");
    const id = preferredId || select.value || state.schools[0]?.id;
    select.value = state.schools.some((school) => school.id === id) ? id : state.schools[0]?.id;
    await loadWorkspace(select.value);
  }

  async function loadWorkspace(schoolId) {
    setStatus("正在读取学校配置与研究数据...");
    try {
      const [school, report] = await Promise.all([
        api(`/config?school=${encodeURIComponent(schoolId)}`),
        api(`/report?school=${encodeURIComponent(schoolId)}`),
      ]);
      state.school = school;
      state.report = report;
      renderSchool();
      renderReport();
      setStatus(`已载入 ${school.name}，共 ${report.metrics.playCount} 局完整试玩。`);
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function renderSchool() {
    const school = state.school;
    if (!school) return;
    $("workspaceTitle").textContent = school.name;
    $("workspaceMeta").textContent = `规则版本 v${school.version} · ${school.customEvents.length} 个校本事件`;
    $("schoolNameInput").value = school.name;
    $("schoolTaglineInput").value = school.tagline || "";
    $("autoIterationInput").checked = Boolean(school.autoIteration);
    $("skinPrimary").value = school.skin.primary;
    $("skinAccent").value = school.skin.accent;
    $("skinDanger").value = school.skin.danger;
    $("skinSky").value = school.skin.sky;
    document.documentElement.style.setProperty("--primary", school.skin.primary);
    document.documentElement.style.setProperty("--accent", school.skin.accent);
    document.documentElement.style.setProperty("--danger", school.skin.danger);
    renderSkinPreview();
    renderWeights();
    renderEvents();
  }

  function renderSkinPreview() {
    const preview = $("skinPreview");
    preview.style.setProperty("--preview-sky", $("skinSky").value);
    preview.style.setProperty("--preview-accent", $("skinAccent").value);
  }

  function renderWeights() {
    $("weightRows").innerHTML = weights.map(([id, name, detail]) => `
      <div class="weight-row">
        <label for="weight-${id}">${name}<small>${detail}</small></label>
        <input id="weight-${id}" type="range" min="0.6" max="1.4" step="0.05" value="${state.school.weights[id]}" />
        <output id="weight-output-${id}">${Number(state.school.weights[id]).toFixed(2)}</output>
      </div>
    `).join("");
    weights.forEach(([id]) => {
      $(`weight-${id}`).addEventListener("input", () => {
        $(`weight-output-${id}`).textContent = Number($(`weight-${id}`).value).toFixed(2);
      });
    });
  }

  function configPayload() {
    return {
      name: $("schoolNameInput").value,
      tagline: $("schoolTaglineInput").value,
      autoIteration: $("autoIterationInput").checked,
      skin: {
        primary: $("skinPrimary").value,
        accent: $("skinAccent").value,
        danger: $("skinDanger").value,
        sky: $("skinSky").value,
      },
      weights: Object.fromEntries(weights.map(([id]) => [id, Number($(`weight-${id}`).value)])),
    };
  }

  async function saveConfig() {
    setStatus("正在保存学校版本...");
    try {
      state.school = await api(`/schools/${state.school.id}`, {
        method: "PUT",
        body: JSON.stringify(configPayload()),
      });
      await loadSchools(state.school.id);
      setStatus("学校名称、皮肤和变量权重已保存。游戏刷新后会读取新版本。");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function renderEvents() {
    const tbody = $("eventTableBody");
    const events = state.school?.customEvents || [];
    tbody.innerHTML = "";
    $("eventEmpty").classList.toggle("hidden", events.length > 0);
    events.forEach((event) => {
      const row = document.createElement("tr");
      row.dataset.id = event.id;
      row.innerHTML = `
        <td><input class="event-title-input" value="${escapeHtml(event.title)}" maxlength="60" /></td>
        <td>
          <select class="route-select">
            <option value="student" ${event.route === "student" ? "selected" : ""}>学生</option>
            <option value="teacher" ${event.route === "teacher" ? "selected" : ""}>教师</option>
            <option value="both" ${event.route === "both" ? "selected" : ""}>双路线</option>
          </select>
        </td>
        <td><input class="chance-input" type="number" min="1" max="100" value="${event.chance}" />%</td>
        <td class="node-summary">${event.options.map((option) => escapeHtml(option.label)).join(" / ")}</td>
        <td><input class="enabled-input" type="checkbox" ${event.enabled ? "checked" : ""} aria-label="启用 ${escapeHtml(event.title)}" /></td>
        <td><div class="row-actions"><button class="save-event" type="button">保存</button><button class="delete-event danger-button" type="button">删除</button></div></td>
      `;
      row.querySelector(".save-event").addEventListener("click", () => saveEvent(row, event.id));
      row.querySelector(".delete-event").addEventListener("click", () => deleteEvent(event));
      tbody.append(row);
    });
  }

  async function saveEvent(row, eventId) {
    try {
      await api(`/schools/${state.school.id}/events/${eventId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: row.querySelector(".event-title-input").value,
          route: row.querySelector(".route-select").value,
          chance: Number(row.querySelector(".chance-input").value),
          enabled: row.querySelector(".enabled-input").checked,
        }),
      });
      await loadWorkspace(state.school.id);
      setStatus("事件设置已保存。下一局游戏会使用新配置。");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  async function deleteEvent(event) {
    if (!window.confirm(`确定删除“${event.title}”吗？`)) return;
    try {
      await api(`/schools/${state.school.id}/events/${event.id}`, { method: "DELETE" });
      await loadWorkspace(state.school.id);
      setStatus("事件已删除。");
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  async function generateEvent() {
    const prompt = $("eventPrompt").value.trim();
    if (!prompt) {
      setStatus("请先写下一个真实校园事件。", true);
      $("eventPrompt").focus();
      return;
    }
    const button = $("generateEvent");
    button.disabled = true;
    setStatus("正在把校园事件转换成剧情节点...");
    try {
      const event = await api(`/schools/${state.school.id}/events/generate`, {
        method: "POST",
        body: JSON.stringify({ prompt, route: $("eventRoute").value }),
      });
      $("eventPrompt").value = "";
      await loadWorkspace(state.school.id);
      setStatus(`已生成“${event.title}”及三个选择节点。`);
    } catch (error) {
      setStatus(error.message, true);
    } finally {
      button.disabled = false;
    }
  }

  function number(value, digits = 1) {
    return Number(value || 0).toFixed(digits);
  }

  function renderReport() {
    const report = state.report;
    if (!report) return;
    const metrics = [
      ["试玩人数", report.metrics.playerCount],
      ["完整局数", report.metrics.playCount],
      ["人均游玩", number(report.metrics.averagePlaysPerPlayer)],
      ["平均轮数", number(report.metrics.averageRoundsPerPlay)],
      ["坏结局率", `${Math.round(report.metrics.badEndingRate * 100)}%`],
      ["反馈数量", report.metrics.feedbackCount],
    ];
    $("metricGrid").innerHTML = metrics.map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`).join("");

    const insights = [
      ["学生最常见的压力路径", report.insights.pressurePath],
      ["最容易触发坏结局的校园机制", report.insights.badMechanism],
      ["学生最希望优化的校园体验", report.insights.desiredExperience],
      ["不同类型学生的生存策略", report.insights.strategyText],
      ["玩家最常牺牲哪个属性", report.insights.sacrificedStat],
      ["他们是否过度追求智慧", report.insights.wisdomPursuit],
      ["藤校结局被提示后，是否更愿意牺牲心情", report.insights.ivyMoodTradeoff],
      ["不同身份设定下，玩家策略是否变化", report.insights.identityStrategy],
      ["最优选择和真实校园生活是否相似", report.insights.optimalRealitySimilarity],
    ];
    $("insightList").innerHTML = insights.map(([title, text]) => `<article class="insight-item"><strong>${title}</strong><p>${escapeHtml(text)}</p></article>`).join("");
    renderBars("choiceBars", report.choiceCounts);
    renderBars("endingBars", report.endingCounts);
    renderBreakdown("identityBreakdown", report.breakdowns.identity);
    renderBreakdown("gradeBreakdown", report.breakdowns.gradeBand);
    renderBreakdown("styleBreakdown", report.breakdowns.playerStyle);
    renderFeedback(report.recentFeedback);
    renderIterations(report.iterations || []);
    renderRoundReports(report.roundReports || []);
    $("researchReport").innerHTML = Object.entries(report.playerResearchReport).map(([key, value]) => `<dt>${reportLabels[key] || key}</dt><dd>${escapeHtml(value)}</dd>`).join("");
  }

  function renderBars(id, rows) {
    const max = rows[0]?.count || 1;
    $(id).innerHTML = rows.length
      ? rows.slice(0, 10).map((row) => `
          <div class="bar-row">
            <span>${escapeHtml(row.key)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.max(4, (row.count / max) * 100)}%"></div></div>
            <strong>${row.count}</strong>
          </div>
        `).join("")
      : '<p class="empty-state">完成试玩后自动生成。</p>';
  }

  function renderBreakdown(id, rows) {
    $(id).innerHTML = rows.length
      ? rows.map((row) => `<div class="breakdown-row"><strong>${labels[row.group] || escapeHtml(row.group)}</strong><span>${row.plays} 局 · 坏结局率 ${Math.round(row.badEndingRate * 100)}% · 最常到达 ${escapeHtml(row.topEnding)}</span></div>`).join("")
      : '<p class="empty-state">暂无数据</p>';
  }

  function renderFeedback(rows) {
    $("feedbackTable").innerHTML = rows.length
      ? rows.map((row) => `<div class="feedback-row"><strong>${escapeHtml(row.topic || "未分类")} · 体验 ${row.rating}/5${row.optimalChoiceSimilarity ? ` · 现实相似度 ${row.optimalChoiceSimilarity}/5` : ""}</strong><span>${escapeHtml(row.text || "未填写文字反馈")}</span></div>`).join("")
      : '<p class="empty-state">暂无玩家反馈</p>';
  }

  function renderIterations(rows) {
    $("iterationList").innerHTML = rows.length
      ? rows.map((row) => `<div class="iteration-row"><strong>${new Date(row.createdAt).toLocaleString("zh-CN")}</strong><span>${escapeHtml((row.reasons || []).join("；"))}</span></div>`).join("")
      : '<p class="empty-state">尚未发生自动迭代</p>';
  }

  function renderRoundReports(rows) {
    $("roundReportList").innerHTML = rows.length
      ? rows.map((row) => `
          <article class="round-report-row">
            <div>
              <strong>第 ${row.roundNumber} 轮 · ${escapeHtml(row.endingTitle || "未记录结局")}</strong>
              <span>${new Date(row.generatedAt).toLocaleString("zh-CN")} · ${labels[row.identity] || escapeHtml(row.identity || row.route || "未填写")}</span>
            </div>
            <p>${escapeHtml(row.insights?.sacrificedStat || "本轮报告已生成。")}</p>
          </article>
        `).join("")
      : '<p class="empty-state">完成下一局后，这里会自动保存第 1 轮报告。</p>';
  }

  async function loadReport() {
    if (!state.school) return;
    try {
      state.report = await api(`/report?school=${encodeURIComponent(state.school.id)}`);
      renderReport();
      setStatus(`研究报告已更新：${new Date(state.report.generatedAt).toLocaleString("zh-CN")}`);
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function exportReport() {
    const report = state.report;
    if (!report) return;
    const lines = [
      ["Schooltopia Player Research Report"],
      ["学校", report.school.name],
      ["生成时间", report.generatedAt],
      ["试玩人数", report.metrics.playerCount],
      ["完整局数", report.metrics.playCount],
      ["人均游玩", report.metrics.averagePlaysPerPlayer],
      ["平均轮数", report.metrics.averageRoundsPerPlay],
      ["坏结局率", report.metrics.badEndingRate],
      [],
      ["选择", "次数"],
      ...report.choiceCounts.map((row) => [row.key, row.count]),
      [],
      ["结局", "次数"],
      ...report.endingCounts.map((row) => [row.key, row.count]),
      [],
      ["洞察", "内容"],
      ...Object.entries(report.insights),
    ];
    const csv = lines.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${state.school.id}-player-research-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function rebalance(mode) {
    const message = mode === "reset" ? "确定恢复全部默认权重吗？" : "现在运行一次数据迭代吗？样本不足时不会改动。";
    if (!window.confirm(message)) return;
    try {
      const result = await api(`/schools/${state.school.id}/rebalance`, {
        method: "POST",
        body: JSON.stringify({ mode }),
      });
      await loadWorkspace(state.school.id);
      setStatus((result.reasons || ["权重已更新"]).join("；"));
    } catch (error) {
      setStatus(error.message, true);
    }
  }

  function bindDialog() {
    const dialog = $("newSchoolDialog");
    $("openNewSchool").addEventListener("click", () => {
      $("newSchoolName").value = "";
      dialog.showModal();
      $("newSchoolName").focus();
    });
    $("createSchool").addEventListener("click", async (event) => {
      event.preventDefault();
      const name = $("newSchoolName").value.trim();
      if (!name) return $("newSchoolName").focus();
      try {
        const school = await api("/schools", { method: "POST", body: JSON.stringify({ name }) });
        dialog.close();
        await loadSchools(school.id);
        setStatus(`已创建 ${school.name}。`);
      } catch (error) {
        setStatus(error.message, true);
      }
    });
  }

  function bindControls() {
    $("adminSchoolSelect").addEventListener("change", (event) => loadWorkspace(event.target.value));
    $("saveConfig").addEventListener("click", saveConfig);
    $("generateEvent").addEventListener("click", generateEvent);
    $("refreshReport").addEventListener("click", loadReport);
    $("exportReport").addEventListener("click", exportReport);
    $("runIteration").addEventListener("click", () => rebalance("auto"));
    $("resetWeights").addEventListener("click", () => rebalance("reset"));
    ["skinPrimary", "skinAccent", "skinDanger", "skinSky"].forEach((id) => $(id).addEventListener("input", renderSkinPreview));
    bindDialog();
  }

  async function init() {
    bindTabs();
    bindControls();
    try {
      await loadSchools();
    } catch (error) {
      setStatus(`后台无法连接：${error.message}`, true);
    }
  }

  init();
})();

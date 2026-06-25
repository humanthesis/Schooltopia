(function () {
  const STORAGE_KEY = "schooltopia_language";
  const EN = {
    "创建学校": "Create School",
    "返回游戏": "Back to Game",
    "音乐 开": "Music On",
    "音乐 关": "Music Off",
    "音效 开": "Sound On",
    "音效 关": "Sound Off",
    "背景音乐：Gymnopédie No.1": "Background music: Gymnopedie No.1",
    "创建器音效": "Creator sound effects",
    "可配置校园生存模拟引擎": "Configurable Campus Survival Simulator",
    "示例学校": "Demo School",
    "每所学校都有自己的生存规则。": "Every school has its own survival rules.",
    "欢迎进入 Schooltopia。校园规则正在加载。": "Welcome to Schooltopia. Campus rules are loading.",
    "欢迎进入 Schooltopia。校园规则正在运行。": "Welcome to Schooltopia. Campus rules are running.",
    "身份系统": "Identity System",
    "开局选择": "Start Setup",
    "难度选择": "Difficulty",
    "标准模式": "Standard Mode",
    "轻松模式": "Relaxed Mode",
    "地狱期末模式": "Finals Inferno",
    "收集图鉴": "Collection",
    "属性系统": "Stats System",
    "用 + / - 调整属性点，单项最低为 3。把剩余属性点全部分配完后，开始游戏按钮就会亮起。": "Use + / - to adjust stats. Each stat stays at least 3. Spend all remaining points to unlock Start.",
    "开始游戏": "Start Game",
    "存档选择": "Save Slots",
    "本地 3 个槽位": "3 local slots",
    "试玩研究档案": "Player Research Profile",
    "正在连接匿名研究": "Connecting anonymous research",
    "匿名研究已连接": "Anonymous research connected",
    "离线试玩，不上传数据": "Offline play, no data upload",
    "后台未启动，当前为离线试玩": "Backend is offline. Playing locally.",
    "GitHub 离线试玩，不上传数据": "GitHub offline play. Data is not uploaded.",
    "GitHub 离线示例学校": "GitHub Offline Demo School",
    "研究记录暂时无法上传": "Research records cannot upload right now.",
    "部分研究记录未上传": "Some research records were not uploaded.",
    "学校版本": "School Version",
    "年级段": "Grade Band",
    "用于比较不同压力路径": "For comparing pressure paths",
    "低年级": "Lower Grade",
    "高年级": "Upper Grade",
    "玩家倾向": "Player Style",
    "用于比较生存策略": "For comparing survival strategies",
    "学术型": "Academic",
    "社交型": "Social",
    "平衡型": "Balanced",
    "仅记录匿名设备编号、路线、选项、属性变化、结局与主动反馈，不收集姓名或联系方式。": "Only anonymous device ID, route, choices, stat changes, endings, and optional feedback are recorded. No names or contact details are collected.",
    "学生路线": "Student Route",
    "教师路线": "Teacher Route",
    "走读生": "Commuter",
    "住宿生": "Boarder",
    "老师": "Teacher",
    "智慧": "Wisdom",
    "体能": "Stamina",
    "心情": "Mood",
    "同学好感": "Peer Favor",
    "班主任信任度": "Homeroom Trust",
    "教学威严": "Authority",
    "教师体能": "Teacher Stamina",
    "教师心情": "Teacher Mood",
    "学生好感": "Student Favor",
    "年级组信任度": "Grade Trust",
    "智慧 / 教师威严": "Wisdom / Authority",
    "体能 / 教师体能": "Stamina / Teacher Stamina",
    "心情 / 教师心情": "Mood / Teacher Mood",
    "同学好感 / 学生好感": "Peer Favor / Student Favor",
    "班主任信任 / 年级组信任": "Homeroom Trust / Grade Trust",
    "日常行动": "Daily Action",
    "午饭时间": "Lunch Break",
    "晚自习": "Evening Study",
    "行动中": "In Action",
    "日常行动选择": "Choose Daily Action",
    "每周选择一次": "Choose once each week",
    "本次变化": "Recent Changes",
    "选择后会在这里显示属性变化。": "Stat changes will appear here after each choice.",
    "状态": "Status",
    "称号": "Titles",
    "成就": "Achievements",
    "道具": "Items",
    "无": "None",
    "存档": "Save",
    "日常或午饭选择时可保存": "Save during daily or lunch choices",
    "系统记录": "System Log",
    "等待行动": "Waiting",
    "重新开始": "Restart",
    "确定要重新开始吗？当前这一局会丢失。": "Restart? This run will be lost.",
    "最终结局": "Final Ending",
    "本局研究摘要": "Run Research Summary",
    "完成一局后，这里会生成匿名研究摘要。": "After a run, an anonymous research summary appears here.",
    "校园体验反馈": "Campus Experience Feedback",
    "用于生成下一版研究洞察": "Helps shape the next research report",
    "最希望优化": "Most Needs Improvement",
    "作息与时间安排": "Schedule and Time",
    "作业和评价方式": "Homework and Assessment",
    "心理与身体恢复": "Mental and Physical Recovery",
    "师生信任和沟通": "Teacher-Student Trust",
    "食堂与校园设施": "Cafeteria and Facilities",
    "同学关系与归属感": "Peers and Belonging",
    "网络、设备与 AI 使用": "Network, Devices, and AI",
    "本局体验": "This Run",
    "5 · 很贴近": "5 · Very close",
    "4 · 比较贴近": "4 · Fairly close",
    "3 · 一般": "3 · Average",
    "2 · 不太贴近": "2 · Not very close",
    "1 · 完全不贴近": "1 · Not close",
    "最优选择像真实选择吗": "Do optimal choices feel like real choices?",
    "5 · 非常相似": "5 · Very similar",
    "4 · 比较相似": "4 · Fairly similar",
    "3 · 有时相似": "3 · Sometimes similar",
    "2 · 不太相似": "2 · Not very similar",
    "1 · 完全不同": "1 · Completely different",
    "还想告诉学校什么": "Anything else for the school",
    "提交匿名反馈": "Submit Anonymous Feedback",
    "反馈已匿名记录，会进入下一版规则分析。": "Feedback recorded anonymously for the next rule analysis.",
    "反馈暂时没有上传成功。": "Feedback could not upload right now.",
    "当前没有可关联的试玩记录。": "There is no linked play record right now.",
    "图鉴": "Collection",
    "返回": "Back",
    "事件": "Events",
    "结局": "Endings",
    "重置事件": "Reset Events",
    "重置结局": "Reset Endings",
    "重置成就": "Reset Achievements",
    "重置全部": "Reset All",
    "效率": "Efficiency",
    "诚信": "Integrity",
    "依赖": "Dependency",
    "风险": "Risk",
    "状态很好": "Great Shape",
    "濒临崩溃": "Near Collapse",
    "状态一般": "Holding On",
    "学生": "Student",
    "教师": "Teacher",
    "双路线": "Both Routes",
    "学生与教师": "Student and Teacher",
    "通用": "General",
    "普通事件": "Common Event",
    "稀有事件": "Rare Event",
    "身份事件": "Identity Event",
    "AI 事件": "AI Event",
    "终极 Boss": "Final Boss",
    "道具系统": "Item System",
    "结局选择": "Ending Choice",
    "校本事件": "School Event",
    "正面处理": "Face It",
    "找人合作": "Seek Support",
    "先保护状态": "Protect Yourself",
    "假装没看见": "Pretend Not to See",
    "属性变化": "Stat Changes",
    "Schooltopia Studio": "Schooltopia Studio",
    "学校版本编辑器": "School Version Editor",
    "SCHOOLTOPIA / CAMPUS STUDIO": "SCHOOLTOPIA / CAMPUS STUDIO",
    "搭建你的": "Build Your",
    "校园世界": "Campus World",
    "搭建你的校园世界": "Build Your Campus World",
    "换一套校园模型、写入真实事件，再重新定义这所学校的生存规则。": "Choose a campus model, add real events, and redefine this school's survival rules.",
    "开始创建": "Start Creating",
    "打开你的学校工作台": "Open Your School Workspace",
    "编辑凭证只保存在当前浏览器，其他玩家只能游玩，不能改动。": "Edit access stays in this browser. Other players can play, not edit.",
    "新学校名称": "New School Name",
    "创建并进入工作台": "Create and Open Workspace",
    "或": "or",
    "继续编辑": "Continue Editing",
    "打开": "Open",
    "正在编辑": "Editing",
    "学校外观": "School Look",
    "规则权重": "Rule Weights",
    "剧情节点": "Story Nodes",
    "发布分享": "Publish",
    "重置全部（含学校名称）": "Reset All (Including Name)",
    "保留编辑权限，名称恢复为“未命名学校”，同时清空事件并恢复默认外观和权重。": "Keeps edit access, restores the name to Untitled School, clears events, and resets look and weights.",
    "学校信息与皮肤": "School Info and Skin",
    "保存全部设置": "Save All Settings",
    "学校名称": "School Name",
    "学校版本说明": "School Version Note",
    "主题预设": "Theme Presets",
    "先选一套完整风格，也可以继续微调四种颜色。": "Pick a full style first, then fine-tune four colors.",
    "自定义颜色": "Custom Colors",
    "主色": "Primary",
    "强调色": "Accent",
    "风险色": "Risk Color",
    "天空色": "Sky Color",
    "1.00 是原版节奏；数值越高，对应机制越强。": "1.00 is the original pace. Higher values intensify that system.",
    "事件密度": "Event Density",
    "随机事件出现频率": "Random event frequency",
    "学术压力": "Academic Pressure",
    "学习与考试造成的损耗": "Loss from study and exams",
    "关系支持": "Relationship Support",
    "关系属性的正向收益": "Positive gains from relationships",
    "恢复效率": "Recovery Efficiency",
    "体能与心情的恢复效果": "Stamina and mood recovery",
    "信任敏感度": "Trust Sensitivity",
    "好感与信任下降强度": "Favor and trust loss strength",
    "真实事件转剧情节点": "Turn Real Events into Story Nodes",
    "输入真实校园事件生成三个初稿，再逐项修改选项、说明与属性变化。": "Enter a real campus event to generate three drafts, then edit choices, descriptions, and stat changes.",
    "校园事件": "Campus Event",
    "适用路线": "Route",
    "自动生成剧情节点": "Auto-Generate Story Nodes",
    "事件名称": "Event Name",
    "路线": "Route",
    "触发率": "Trigger Rate",
    "启用": "Enabled",
    "操作": "Actions",
    "还没有事件。写下第一件属于你学校的校园经历。": "No events yet. Write the first campus moment from your school.",
    "进入游戏并分享": "Play and Share",
    "专属链接会载入当前学校的皮肤、事件和变量权重。": "The school link loads this school's skin, events, and variable weights.",
    "复制链接": "Copy Link",
    "进入我的学校": "Enter My School",
    "自定义剧情节点": "Customize Story Nodes",
    "事件说明": "Event Description",
    "教师路线会自动把智慧、体能、心情、同学好感和班主任信任映射为对应的教师属性。": "Teacher route maps wisdom, stamina, mood, peer favor, and homeroom trust to matching teacher stats.",
    "取消": "Cancel",
    "保存节点": "Save Nodes",
    "选项名称": "Choice Name",
    "选项说明": "Choice Description",
    "选择后的属性变化": "Stat Changes After Choice",
    "＋ 添加变化": "+ Add Change",
    "影响属性": "Affected Stat",
    "属性变化数值": "Stat Delta",
    "移除这项属性变化": "Remove this stat change",
    "移除": "Remove",
    "请先填写学校名称。": "Please enter a school name first.",
    "请先填写一件真实校园事件。": "Please enter a real campus event first.",
    "请先创建或打开一个学校工作台，再生成剧情节点。": "Create or open a school workspace before generating story nodes.",
    "学校外观和规则权重已保存，专属游戏会立即使用新设置。": "School look and rule weights saved. The game will use them right away.",
    "学校专属链接已复制，可以发给其他人。": "School link copied. You can send it to others.",
    "已选中链接，请复制后发送。": "Link selected. Copy it to send.",
    "剧情节点已更新，新的选项与属性变化会直接进入游戏。": "Story nodes updated. New choices and stat changes go straight into the game.",
    "事件设置已保存。": "Event settings saved.",
    "事件已删除。": "Event deleted.",
    "这个浏览器没有编辑权限。请用创建该学校的浏览器打开，或重新创建一个学校版本。": "This browser does not have edit access. Open it in the browser that created the school, or create a new school version.",
    "未命名学校": "Untitled School",
    "南山实验学校": "Nanshan Experimental School",
    "例如：南山实验学校": "Example: Nanshan Experimental School",
    "例如：期中考试、社团汇演和小组展示撞在同一周。": "Example: midterms, club show, and group presentation all land in the same week.",
    "例如：最难受的是作业集中在同一周，恢复行动又太少。": "Example: the hardest part is homework piling into one week with too few recovery options.",
  };

  const ZH = Object.fromEntries(Object.entries(EN).map(([zh, en]) => [en, zh]));
  let current = readLanguage();
  let observer = null;
  let applying = false;

  function readLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "zh";
    } catch {
      return "zh";
    }
  }

  function writeLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Language switching still works for the current page.
    }
  }

  function dictionary() {
    return current === "en" ? EN : ZH;
  }

  function translateLine(line) {
    const map = dictionary();
    if (map[line]) return map[line];
    if (current === "en") {
      let match = line.match(/^剩余 (\d+) 点$/);
      if (match) return `${match[1]} points left`;
      match = line.match(/^规则版本 v(\d+)$/);
      if (match) return `Rules v${match[1]}`;
      match = line.match(/^第 (\d+) 周$/);
      if (match) return `Week ${match[1]}`;
      match = line.match(/^第 (\d+) 周 · (.+)$/);
      if (match) return `Week ${match[1]} · ${phrase(match[2])}`;
      match = line.match(/^第 (\d+)\/12 周$/);
      if (match) return `Week ${match[1]}/12`;
      match = line.match(/^(.+) 个校园事件$/);
      if (match) return `${match[1]} campus events`;
      match = line.match(/^玩家选择 (\d+)$/);
      if (match) return `Player Choice ${match[1]}`;
      match = line.match(/^选择 (\d+)$/);
      if (match) return `Choice ${match[1]}`;
      match = line.match(/^正在编辑：(.+)$/);
      if (match) return `Editing: ${match[1]}`;
      match = line.match(/^已把“(.+)”生成三个可玩的剧情节点。$/);
      if (match) return `Generated three playable story nodes for "${match[1]}".`;
      match = line.match(/^已创建“(.+)”。现在可以选择皮肤并添加校园事件。$/);
      if (match) return `Created "${match[1]}". You can now choose a skin and add campus events.`;
      match = line.match(/^已选择“(.+)”主题，保存后会应用到专属游戏。$/);
      if (match) return `Selected "${match[1]}". Save to apply it to your school game.`;
    } else {
      let match = line.match(/^(\d+) points left$/);
      if (match) return `剩余 ${match[1]} 点`;
      match = line.match(/^Rules v(\d+)$/);
      if (match) return `规则版本 v${match[1]}`;
      match = line.match(/^Week (\d+)$/);
      if (match) return `第 ${match[1]} 周`;
      match = line.match(/^Week (\d+) · (.+)$/);
      if (match) return `第 ${match[1]} 周 · ${phrase(match[2])}`;
      match = line.match(/^Week (\d+)\/12$/);
      if (match) return `第 ${match[1]}/12 周`;
      match = line.match(/^(.+) campus events$/);
      if (match) return `${match[1]} 个校园事件`;
      match = line.match(/^Player Choice (\d+)$/);
      if (match) return `玩家选择 ${match[1]}`;
      match = line.match(/^Choice (\d+)$/);
      if (match) return `选择 ${match[1]}`;
      match = line.match(/^Editing: (.+)$/);
      if (match) return `正在编辑：${match[1]}`;
    }
    return line;
  }

  function phrase(value) {
    const text = String(value ?? "");
    return text.split("\n").map((line) => {
      const leading = line.match(/^\s*/)[0];
      const trailing = line.match(/\s*$/)[0];
      const core = line.trim();
      if (!core) return line;
      return `${leading}${translateLine(core)}${trailing}`;
    }).join("\n");
  }

  function shouldSkipElement(element) {
    if (!element) return true;
    const tag = element.tagName;
    if (["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CANVAS"].includes(tag)) return true;
    return !!element.closest("[data-no-i18n]");
  }

  function translateTextNode(node) {
    if (!node?.parentElement || shouldSkipElement(node.parentElement)) return;
    const next = phrase(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function translateAttributes(root) {
    const elements = root.querySelectorAll?.("[placeholder], [title], [aria-label]") || [];
    elements.forEach((element) => {
      ["placeholder", "title", "aria-label"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const currentValue = element.getAttribute(attribute);
        const next = phrase(currentValue);
        if (next !== currentValue) element.setAttribute(attribute, next);
      });
    });
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && shouldSkipElement(root)) return;
    translateAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      translateTextNode(node);
      node = walker.nextNode();
    }
  }

  function updateToggles() {
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      const label = current === "en" ? "中文" : "English";
      const accessibleLabel = current === "en" ? "切换到中文" : "Switch to English";
      if (button.textContent !== label) button.textContent = label;
      if (button.getAttribute("aria-label") !== accessibleLabel) {
        button.setAttribute("aria-label", accessibleLabel);
      }
      if (button.title !== accessibleLabel) button.title = accessibleLabel;
    });
  }

  function apply(root = document) {
    if (!document.body || applying) return;
    applying = true;
    document.documentElement.lang = current === "en" ? "en" : "zh-CN";
    translateTree(root);
    updateToggles();
    applying = false;
  }

  function setLanguage(lang) {
    current = lang === "en" ? "en" : "zh";
    writeLanguage(current);
    apply(document);
    window.dispatchEvent(new CustomEvent("schooltopia-language-change", { detail: { language: current } }));
  }

  function bind() {
    document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(current === "en" ? "zh" : "en"));
    });
    observer = new MutationObserver((mutations) => {
      if (applying) return;
      mutations.forEach((mutation) => {
        if (mutation.type === "characterData") translateTextNode(mutation.target);
        mutation.addedNodes?.forEach((node) => translateTree(node));
      });
      updateToggles();
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    apply(document);
  }

  window.SchooltopiaI18n = {
    apply,
    get language() {
      return current;
    },
    phrase,
    setLanguage,
    toggle() {
      setLanguage(current === "en" ? "zh" : "en");
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind, { once: true });
  } else {
    bind();
  }
})();

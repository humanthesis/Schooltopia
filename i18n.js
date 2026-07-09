(function () {
  const STORAGE_KEY = "schooltopia_language";
  const EN = {
    "Schooltopia Studio · 创建我的学校": "Schooltopia Studio · Build Your School",
    "创建学校": "Create School",
    "立即开始": "Play Now",
    "前往开局": "Go to Setup",
    "返回游戏": "Back to Game",
    "音乐 开": "Music On",
    "音乐 关": "Music Off",
    "音效 开": "Sound On",
    "音效 关": "Sound Off",
    "声音设置": "Sound Settings",
    "背景音乐：Gymnopédie No.1": "Background music: Gymnopedie No.1",
    "创建器音效": "Creator sound effects",
    "重新加载 3D": "Reload 3D",
    "可配置校园生存模拟引擎": "Configurable Campus Survival Simulator",
    "示例学校": "Demo School",
    "每所学校都有自己的生存规则。": "Every school has its own survival rules.",
    "欢迎进入 Schooltopia。校园规则正在加载。": "Welcome to Schooltopia. Campus rules are loading.",
    "欢迎进入 Schooltopia。校园规则正在运行。": "Welcome to Schooltopia. Campus rules are running.",
    "身份系统": "Identity System",
    "路线选择": "Route Selection",
    "身份选择": "Identity Selection",
    "开局选择": "Start Setup",
    "难度选择": "Difficulty",
    "标准模式": "Standard Mode",
    "轻松模式": "Relaxed Mode",
    "地狱期末模式": "Finals Inferno",
    "收集图鉴": "Collection",
    "属性系统": "Stats System",
    "用 + / - 调整属性点，单项最低为 3。把剩余属性点全部分配完后，开始游戏按钮就会亮起。": "Use + / - to adjust stats. Each stat stays at least 3. Spend all remaining points to unlock Start.",
    "开始游戏": "Start Game",
    "一键均衡分配": "Use Balanced Setup",
    "存档选择": "Save Slots",
    "本地 3 个槽位": "3 local slots",
    "还没有保存过进度。": "No saved progress yet.",
    "空槽位": "Empty Slot",
    "读取": "Load",
    "清空": "Clear",
    "未知时间": "Unknown time",
    "选择槽位保存当前进度": "Choose a slot to save your progress",
    "事件处理中暂不能保存": "Saving is unavailable during an event",
    "校园行动第一轮": "Campus Action Round 1",
    "校园行动第二轮": "Campus Action Round 2",
    "第一轮已跳过": "Round 1 Skipped",
    "试玩研究档案": "Player Research Profile",
    "正在连接匿名研究": "Connecting anonymous research",
    "匿名研究已连接": "Anonymous research connected",
    "离线试玩，不上传数据": "Offline play, no data upload",
    "后台未启动，当前为离线试玩": "Backend is offline. Playing locally.",
    "GitHub 离线试玩，不上传数据": "GitHub offline play. Data is not uploaded.",
    "GitHub 离线示例学校": "GitHub Offline Demo School",
    "离线示例学校": "Offline Demo School",
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
    "班主任信任": "Homeroom Trust",
    "信任": "Trust",
    "教学威严": "Authority",
    "教师体能": "Teacher Stamina",
    "教师心情": "Teacher Mood",
    "学生好感": "Student Favor",
    "年级组信任度": "Grade Trust",
    "年级组信任": "Grade Trust",
    "年级组": "Grade Team",
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
    "未变化": "No Change",
    "状态": "Status",
    "称号": "Titles",
    "成就": "Achievements",
    "道具": "Items",
    "无": "None",
    "存档": "Save",
    "日常或午饭选择时可保存": "Save during daily or lunch choices",
    "日常行动或校园活动时可保存": "Save during daily actions or campus activities",
    "系统记录": "System Log",
    "等待行动": "Waiting",
    "重新开始": "Restart",
    "确定要重新开始吗？当前这一局会丢失。": "Restart? This run will be lost.",
    "最终结局": "Final Ending",
    "上局记忆": "Previous Run Memory",
    "开始后初始属性 +1": "Starting stat +1 when the run begins",
    "放下上局记忆": "Discard previous run memory",
    "不继承": "Do Not Inherit",
    "本局总评": "Run Score",
    "命运稀有度": "Fate Rarity",
    "最终属性": "Final Stats",
    "存活周数": "Weeks Survived",
    "难度": "Difficulty",
    "声望": "Reputation",
    "校园声望": "Campus Reputation",
    "教学声望": "Teaching Reputation",
    "本局同时达成": "Also Achieved This Run",
    "普通": "Common",
    "少见": "Uncommon",
    "罕见": "Rare",
    "传奇": "Legendary",
    "本学期编年史": "Semester Chronicle",
    "你负责选择，命运负责乱写。": "You make the choices. Fate writes whatever it wants.",
    "带走一项记忆": "Carry One Memory Forward",
    "从本局最突出的三项属性中选一项，下一局对应初始属性 +1。": "Choose one of this run's three strongest stats. Its matching starting stat gains +1 next run.",
    "下一局 +1": "Next Run +1",
    "这段记忆已保存。重新开始后生效。": "Memory saved. It will take effect when you restart.",
    "带着记忆重新开始": "Restart with Memory",
    "日常": "Daily",
    "活动": "Activity",
    "命运": "Fate",
    "还没来得及选择，结局先到了。": "The ending arrived before you had time to choose.",
    "你没有活过校园，是校园勉强活过了你。": "You did not survive campus. Campus barely survived you.",
    "教务系统决定把你标记为异常样本。": "The academic system has classified you as an anomalous sample.",
    "你活下来了，代价被系统礼貌地隐藏。": "You survived. The system has politely hidden the cost.",
    "这不是失败，是一份很有个人风格的事故报告。": "This is not failure. It is an incident report with a very personal style.",
    "数值不高，但故事已经足够让下一届害怕。": "The stats are low, but the story is enough to frighten next year's class.",
    "本局研究摘要": "Run Research Summary",
    "本局回顾": "Run Recap",
    "清除匿名研究标识": "Clear Anonymous Research ID",
    "重置全部游戏进度": "Reset All Game Progress",
    "确定要重置全部游戏进度吗？这会清空三个存档、图鉴、累计记录和跨局记忆，不影响创建器里的学校。": "Reset all game progress? This clears all three saves, collections, cumulative records, and inherited memory without changing schools in the creator.",
    "当前状态无法选择这项行动。": "This action is unavailable in your current state.",
    "退出现场，回办公室调整": "Leave and Recover in the Office",
    "退出现场，去医务室调整": "Leave and Recover in the Infirmary",
    "当所有方案都付不起成本时，先恢复到能继续做决定的状态。": "When every plan costs more than you can pay, recover enough to make another decision.",
    "你暂时离开了活动现场。活着回来也是项目管理的一部分。": "You stepped away from the event. Returning alive is also project management.",
    "你无法真正逃离 Schooltopia。因为当你开始讲述这段校园生活时，它已经成为了你的故事。": "You cannot truly escape Schooltopia. Once you tell this campus story, it has already become part of your life.",
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
    "直接解决问题，收益更明显，也可能付出代价。": "Address the problem directly for a stronger result, with a possible cost.",
    "借助关系网络缓冲压力。": "Use your support network to soften the pressure.",
    "减少眼前损耗，但问题不会完全消失。": "Reduce the immediate strain, though the problem will not fully disappear.",
    "Schooltopia Studio": "Schooltopia Studio",
    "学校版本编辑器": "School Version Editor",
    "编辑步骤": "School Editing Steps",
    "学校实时预览": "Live School Preview",
    "当前学校配色": "Current School Colors",
    "学校专属游戏链接": "School Game Link",
    "SCHOOLTOPIA / CAMPUS STUDIO": "SCHOOLTOPIA / CAMPUS STUDIO",
    "搭建你的": "Build Your",
    "校园世界": "Campus World",
    "搭建你的校园世界": "Build Your Campus World",
    "创建你的校园版本": "Build Your School Version",
    "创建你的": "Build Your",
    "校园版本": "School Version",
    "选择校园配色、写入真实事件，再重新定义这所学校的生存规则。": "Choose campus colors, add real events, and redefine this school's survival rules.",
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
    "身份与主题": "Identity & Theme",
    "学校信息与配色": "School Info and Colors",
    "保存全部设置": "Save All Settings",
    "保存修改": "Save Changes",
    "学校名称": "School Name",
    "学校版本说明": "School Version Note",
    "主题预设": "Theme Presets",
    "配色预设": "Color Presets",
    "先选一套校园配色，也可以继续微调四种颜色。": "Choose a campus color preset, then fine-tune the four colors.",
    "先选一套完整风格，也可以继续微调四种颜色。": "Pick a full style first, then fine-tune four colors.",
    "自定义颜色": "Custom Colors",
    "主色": "Primary",
    "强调色": "Accent",
    "风险色": "Risk Color",
    "天空色": "Sky Color",
    "主色十六进制值": "Primary color hex value",
    "强调色十六进制值": "Accent color hex value",
    "风险色十六进制值": "Risk color hex value",
    "天空色十六进制值": "Sky color hex value",
    "颜色值需要使用 #RRGGBB 格式。": "Use the #RRGGBB format for color values.",
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
    "规则调节": "Rule Mixer",
    "剧情草稿生成器": "Story Draft Generator",
    "真实事件转剧情草稿": "Turn Real Events into Story Drafts",
    "根据事件关键词、路线和压力类型生成三条草稿，再逐项修改文本与属性变化。": "Generate three drafts from event keywords, route, and pressure type, then edit their text and stat changes.",
    "根据事件关键词、路线和压力类型生成三条草稿，再逐项修改文本与属性变化。每条事件独立判定触发率，同一时点最多出现一条。": "Generate three drafts from event keywords, route, and pressure type, then edit their text and stat changes. Each event rolls its own trigger rate, with at most one appearing at a time.",
    "输入真实校园事件生成三个初稿，再逐项修改选项、说明与属性变化。": "Enter a real campus event to generate three drafts, then edit choices, descriptions, and stat changes.",
    "校园事件": "Campus Event",
    "适用路线": "Route",
    "自动生成剧情节点": "Auto-Generate Story Nodes",
    "生成三条剧情草稿": "Generate Three Story Drafts",
    "事件名称": "Event Name",
    "路线": "Route",
    "触发率": "Trigger Rate",
    "启用": "Enabled",
    "操作": "Actions",
    "规则": "Rules",
    "周期": "Cycle",
    "12 周": "12 Weeks",
    "保存": "Save",
    "删除": "Delete",
    "编辑节点": "Edit Nodes",
    "还没有事件。写下第一件属于你学校的校园经历。": "No events yet. Write the first campus moment from your school.",
    "进入游戏并分享": "Play and Share",
    "专属链接会载入当前学校的皮肤、事件和变量权重。": "The school link loads this school's skin, events, and variable weights.",
    "专属链接内含当前学校的配色、事件和变量权重；接收者无需本机存档。": "The link contains this school's colors, events, and variable weights; recipients do not need your browser storage.",
    "发布": "Publish",
    "实时预览": "Live Preview",
    "复制链接": "Copy Link",
    "进入我的学校": "Enter My School",
    "自定义剧情节点": "Customize Story Nodes",
    "事件说明": "Event Description",
    "事件开场描述": "Event Opening",
    "教师路线会自动把智慧、体能、心情、同学好感和班主任信任映射为对应的教师属性。": "Teacher route maps wisdom, stamina, mood, peer favor, and homeroom trust to matching teacher stats.",
    "取消": "Cancel",
    "保存节点": "Save Nodes",
    "保存三个节点": "Save Three Nodes",
    "关闭节点编辑器": "Close Node Editor",
    "关闭": "Close",
    "关闭系统提示": "Dismiss system message",
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
    "森林黑板": "Forest Chalkboard",
    "海盐蓝": "Sea Salt Blue",
    "运动场": "Track and Field",
    "旧图书馆": "Old Library",
    "未来实验室": "Future Laboratory",
    "晚自习": "Evening Study",
    "GitHub 版使用当前浏览器保存学校设置，六套配色和自定义事件均可直接试玩。": "The GitHub version saves school settings in this browser. All six color presets and custom events are ready to use.",
    "浏览器无法保存学校设置，请保持本页面打开。": "The browser cannot save school settings. Keep this page open.",
    "例如：南山实验学校": "Example: Nanshan Experimental School",
    "例如：期中考试、社团汇演和小组展示撞在同一周。": "Example: midterms, club show, and group presentation all land in the same week.",
    "例如：最难受的是作业集中在同一周，恢复行动又太少。": "Example: the hardest part is homework piling into one week with too few recovery options.",
  };

  Object.assign(EN, {
    "学习、考试、Project、Reading Journal、同学关系、班主任信任度、手机检查和升学结局": "Study, exams, projects, Reading Journals, friendships, homeroom trust, phone checks, and college outcomes.",
    "每周开始时有机会回家短暂回血，手机检查也更不容易暴露": "At the start of each week, you may recover at home and are less likely to be exposed during phone checks.",
    "宿舍夜谈会增强人际连接，但住宿生活也会持续消耗体能": "Late-night dorm talks strengthen relationships, but boarding life steadily drains stamina.",
    "批作业、拖堂、突击检查、考试出难题、学生好感、年级组信任度和教师专属结局": "Grade homework, keep classes late, run surprise inspections, write brutal exams, manage student favor and grade-team trust, and reach teacher-only endings.",
    "不参与大学录取类结局": "Teacher runs do not use college-admission endings.",
    "开局 14 点，随机事件更少，期末要求更低，适合熟悉规则和体验主线。": "Start with 14 points, fewer random events, and easier finals. Best for learning the rules and following the main story.",
    "开局 10 点，保留原本节奏，事件和期末压力比较均衡。": "Start with 10 points. Events and finals pressure follow the intended balanced pace.",
    "开局 6 点，事件更密集，期末额外扣状态，Project 和考试要求更高。": "Start with 6 points, denser events, extra finals drain, and tougher project and exam requirements.",
    "开局 14 点，每周最多 1 个随机事件，期末要求更低，适合熟悉规则和体验主线。": "Start with 14 points and at most 1 random event per week, with easier finals.",
    "开局 10 点，每周最多 2 个随机事件，事件和期末压力比较均衡。": "Start with 10 points and at most 2 random events per week, with balanced finals pressure.",
    "开局 6 点，每周最多 3 个随机事件，大额恢复会少 1 点，期末要求更高。": "Start with 6 points and at most 3 random events per week. Large recovery gains lose 1 point and finals are harder.",
    "先把步骤想清楚，出错机会较少。": "Plan the steps first to reduce mistakes.",
    "做法更新鲜，现场气氛会更好。": "A fresher approach improves the atmosphere.",
    "靠大家一起完成，关系会变好。": "Complete it together and strengthen relationships.",
    "少做一点，能恢复状态，但会损失信任。": "Do less to recover, at the cost of trust.",
    "主动负责，大家会更信任你，但很累。": "Take responsibility to gain trust, but spend more energy.",
    "把真实情况说清楚，信任会上升。": "Explain the truth clearly to build trust.",
    "直接上场解决，痛快但会消耗体能。": "Step in and solve it directly. Effective, but physically draining.",
    "先照顾别人，两种关系都会改善。": "Support others first to improve both relationships.",
    "专心把结果做好，能力提升但压力更大。": "Focus on the result to improve ability, with greater pressure.",
    "亲自上场，体能和心情都会提升。": "Join in personally to improve stamina and mood.",
    "靠人气推动活动，关系提升但会分心。": "Use popularity to move things forward, improving relationships but losing focus.",
    "仔细处理细节，状态变化不大。": "Handle the details carefully with only minor stat changes.",
    "直接追求更高结果，但会同时消耗体能和心情。": "Push directly for a stronger result at a guaranteed stamina and mood cost.",
    "手机检查、信任和备用机会影响结果。": "Phone checks, trust, and a backup phone affect the outcome.",
    "作业压力会牵动智慧和信任。": "Homework pressure affects wisdom and trust.",
    "同学关系会改变小组作业的收益。": "Peer relationships change the rewards of group work.",
    "智慧或威严足够高时会出现特殊解法。": "High wisdom or authority unlocks a special solution.",
    "对饭菜的评价会改变下一次食堂体验。": "Your review changes the next cafeteria experience.",
    "短暂的好运会给下一次行动留余地。": "A brief stroke of luck gives your next action more room.",
    "自由活动时间适合补短板。": "Free activity time is ideal for repairing weak stats.",
    "走读生更容易遇到交通考验。": "Commuters are more likely to face traffic trouble.",
    "巡查会放大被发现的风险。": "Inspections amplify the risk of being caught.",
    "住宿生夜间生活的代价。": "The price of boarding-school nightlife.",
    "心情太低时安静也未必学得进去。": "When mood is too low, even silence may not help you study.",
    "关系提升常常会交换体能。": "Relationship gains often cost stamina.",
    "作业推进会增加 AI 事件机会。": "Making homework progress increases the chance of AI events.",
    "不同用法会长期改变 AI 使用习惯。": "Different choices reshape your long-term AI habits.",
    "期末 Project 必定检验 AI 使用习惯。": "The final project always tests your AI habits.",
    "批作业越多，越容易进入红笔深水区。": "The more you grade, the deeper you enter red-pen territory.",
    "拖堂、突击检查和学生好感会共同影响风险。": "Overtime classes, surprise inspections, and student favor jointly shape the risk.",
    "连续低分试卷会改变学生对你的称呼。": "Repeated low-scoring exams change what students call you.",
    "年级组信任太低时，杂活会想起你。": "When grade-team trust is low, every unwanted task remembers your name.",
    "教师心情过低时会触发额外波动。": "Very low teacher mood triggers additional instability.",
    "他经常在你意识到之前出现。": "He often appears before you realize he is there.",
    "被选中过多次会留下校园传说。": "Being chosen repeatedly may turn into a campus legend.",
    "低心情与低同学好感下，命运会很抽象。": "With low mood and low peer favor, fate becomes extremely strange.",
    "第 4 周和第 8 周可能买到备用机。": "A backup phone may appear in Weeks 4 and 8.",
    "足够亮眼时，选择本身也会成为结局。": "When your run is outstanding enough, the choice itself becomes an ending.",
    "通关后会记录到这里。": "Completed encounters are recorded here.",
    "达成特殊条件后解锁。": "Unlock by meeting a special condition.",
    "备用机": "Backup Phone",
    "手机检查时可选择“交出备用机”。": "During a phone check, you can hand over the backup phone.",
    "若失败，惩罚加重。": "If it fails, the penalty becomes harsher.",
    "会消耗一些心情，但能在手机检查时多一层保险。": "Costs some mood, but provides extra protection during phone checks.",
    "提升智慧，但会消耗心情；连续三周选择刷题可获得《刷题机器》。": "Gain wisdom at the cost of mood. Choose practice drills for three consecutive weeks to earn Study Machine.",
    "恢复体能和心情；体能很高时会进入《体育生の神秘力量》。": "Recover stamina and mood. Very high stamina can trigger Mysterious Athlete Power.",
    "大幅恢复体能和心情，但会牺牲一点学习时间；连续体育行动可积累校运会传说条件。": "Greatly recover stamina and mood at the cost of study time. Repeated sports actions build toward the Sports Day Legend.",
    "大幅恢复体能；体能很低时会额外救你一把。": "Greatly recover stamina, with an extra rescue when stamina is critically low.",
    "成功会明显恢复心情并累计请假天数；失败会损失班主任信任和心情。": "Success restores mood and adds an absence day; failure costs homeroom trust and mood.",
    "有一半机会让气氛变好，也有一半机会让空气突然安静。": "A fifty-fifty chance to improve the mood or make the room painfully silent.",
    "提升教学威严，但会明显消耗体能；批得够多会获得《红笔熟练工》。": "Gain authority while spending substantial stamina. Grade enough work to earn Skilled Red-Pen Worker.",
    "认真回应学生问题，明显提升学生好感并恢复一点教师心情。": "Answer student questions seriously to gain student favor and recover some teacher mood.",
    "提升年级组信任度，不损失学生好感；会消耗一点教师体能。": "Gain grade-team trust without losing student favor, at a small stamina cost.",
    "提升教学威严，但学生好感会大幅下降；连续拖堂可能引发《学生起义》。": "Gain authority, but lose substantial student favor. Repeated overtime classes may trigger a Student Rebellion.",
    "提升年级组信任度，但会损失学生好感；连续突击检查会触发额外后果。": "Gain grade-team trust at the cost of student favor. Repeated surprise inspections have additional consequences.",
    "大幅提升教学威严，但会明显损失学生好感，并生成一次班级均分。": "Greatly increase authority, clearly reduce student favor, and generate a class average.",
    "主要恢复教师体能，顺便恢复一点心情；连续选择可获得《办公室羽毛球王者》。": "Primarily recover teacher stamina and a little mood. Repeated choices can earn Office Badminton Champion.",
    "明显提升同学好感并恢复心情；同学关系很好时可能触发《复习资料共享联盟》。": "Clearly gain peer favor and mood. Strong friendships may trigger the Study Materials Alliance.",
    "明显提升班主任信任并恢复一点心情；连续找老师聊天会让同学眼中的你变得复杂。": "Clearly gain homeroom trust and some mood. Repeated teacher chats complicate your reputation among classmates.",
    "提升智慧，但会消耗心情；智慧很高时能提高期末 Project 表现。": "Gain wisdom at the cost of mood. High wisdom improves final-project performance.",
    "随机触发体能、心情、智慧变化，或上吐下泻。": "Randomly changes stamina, mood, or wisdom, or causes catastrophic digestive consequences.",
    "专门恢复教师心情，不影响教师体能。": "Recover teacher mood without changing stamina.",
    "大幅恢复教师体能，不影响教师心情。": "Greatly recover teacher stamina without changing mood.",
    "提升年级组信任度，并恢复教师心情。": "Gain grade-team trust and recover teacher mood.",
    "认真帮学生解决问题，学生好感会大幅提升，但会消耗一些教师体能。": "Seriously help students solve problems for a large favor gain at a teacher-stamina cost.",
    "学生好感明显提升，但教师心情会被现实轻轻撞一下。": "Clearly gain student favor, while reality lightly dents teacher mood.",
    "大幅恢复教师心情，但学生会觉得你突然消失了。": "Greatly recover teacher mood, but students may feel you suddenly disappeared.",
    "随机触发教师体能、教师心情、教学威严变化，或上吐下泻。": "Randomly changes teacher stamina, mood, or authority, or causes catastrophic digestive consequences.",
    "你还有手机检查豁免，本次检查会自动通过。": "Your phone-check exemption is still active, so this inspection passes automatically.",
    "班主任突然开始查手机。": "The homeroom teacher suddenly begins a phone inspection.",
    "你可以立刻上交、假装没带，或者在有备用机时交出备用机。": "You can surrender your phone, pretend you left it behind, or hand over a backup phone if you have one.",
    "你以为你没交的是 Reading Journal，其实你没交的是信任。": "You thought you failed to submit a Reading Journal. What you really failed to submit was trust.",
    "你是组长、组员、排版、引用格式和精神支柱。": "You are the leader, member, layout editor, citation manager, and emotional support system.",
    "神秘 WiFi 密码：88888888": "Mysterious Wi-Fi password: 88888888",
    "学校 WiFi 突然断开。": "The school Wi-Fi suddenly goes down.",
    "如果你的智慧或教学威严足够高，可以尝试“智慧用电物联”。": "With enough wisdom or authority, you can attempt the Smart Power IoT solution.",
    "今天的老师像一个人类，而不是 DDL 的使者。": "Today the teacher resembles a human being rather than a messenger of deadlines.",
    "本节课≈自由活动。": "This lesson is approximately free activity.",
    "代课老师是命运给你的短暂赦免。": "The substitute teacher is a brief pardon granted by fate.",
    "你在和上海交通进行哲学辩论。": "You are having a philosophical debate with Shanghai traffic.",
    "年级主任的脚步声，是校园恐怖游戏的 BGM。": "The grade director's footsteps are the soundtrack of a campus horror game.",
    "住宿生专属事件。": "A boarder-only event.",
    "晚自习突然安静。": "Evening study suddenly becomes silent.",
    "宿舍夜谈失控。": "The late-night dorm conversation escapes control.",
    "熄灯后继续写作业。": "You keep doing homework after lights-out.",
    "写作业、Project 或 Reading Journal 时，AI 选项出现了。": "An AI choice appears while you work on homework, a project, or a Reading Journal.",
    "你的选择会长期改变效率、诚信、依赖和风险。": "Your choice permanently shifts efficiency, integrity, dependency, and risk.",
    "智慧提升更多，但心情会下降；诚信上升，依赖和风险下降。": "Gain more wisdom but lose mood; integrity rises while dependency and risk fall.",
    "小幅提升效率和心情；保持诚信时，后续收益更可靠。": "Slightly improve efficiency and mood. With solid integrity, later benefits are more reliable.",
    "批作业地狱。": "Homework Grading Hell.",
    "恶魔教师事件。": "The Devil Teacher event.",
    "信任度低不是没人管你，是所有杂活都想起了你。": "Low trust does not mean nobody cares. It means every unwanted task remembers you.",
    "你短暂地理解了学生为什么不想上学。": "For a moment, you understand why students do not want to come to school.",
    "Ray 老师的鹦鹉随机飞到某位同学头上。": "Ray's parrot randomly lands on a student's head.",
    "你短暂变成了一只乌龟。": "You briefly turn into a turtle.",
    "你以第一视角体验了校园地面的高度。": "You experience the campus floor from a first-person perspective.",
    "世界突然变得很大，同学的鞋底也很大。": "The world suddenly becomes enormous, including your classmates' shoes.",
    "期末 Project 阶段必定提供 AI 选择。": "The final-project stage always presents an AI choice.",
    "这一刻会结算你整学期的 AI 使用习惯。": "This moment evaluates your AI habits across the entire term.",
    "保住诚信和自主性，但会消耗心情。": "Preserve integrity and independence, at the cost of mood.",
    "风险较低的工具型使用方式，会看你的长期习惯。": "A lower-risk tool-based approach that still considers your long-term habits.",
    "录取邮件弹出的那一刻，你沉默了三秒。": "When the admission email appears, you fall silent for three seconds.",
    "然后你开始截图、转发、发朋友圈、假装冷静。": "Then you screenshot it, forward it, post it, and pretend to remain calm.",
  });

  Object.assign(EN, {
    "校园行动": "Campus Action",
    "第一轮": "Round 1",
    "第二轮": "Round 2",
    "校园行动 · 第一轮": "Campus Action · Round 1",
    "校园行动 · 第二轮": "Campus Action · Round 2",
    "日常行动第一轮": "Daily Action Round",
    "校园活动第二轮": "Campus Activity Round",
    "日常行动已跳过": "Daily Action Skipped",
    "校园活动": "Campus Activity",
    "第一轮 · 日常行动": "Round 1 · Daily Action",
    "第二轮 · 校园活动": "Round 2 · Campus Activity",
    "正常上课与课间": "Classes and Breaks",
    "上课 / 课间": "Class / Break",
    "午休 / 课后": "Lunch / After Class",
    "普通周": "Regular Week",
    "周初判定": "Week Opening",
    "事件判定": "Event Check",
    "本周事件": "This Week's Events",
    "先准备：选一种做法": "Preparation: choose an approach",
    "到现场：选一种处理方式": "On site: choose a response",
    "状态不足，本轮跳过": "Not enough stamina. This round is skipped.",
    "进入第二轮": "Continue to Round 2",
    "状态不足，日常行动跳过": "Not enough stamina. The daily action is skipped.",
    "进入校园活动": "Enter Campus Activity",
    "上课、课间或午休：选择一项日常行动": "Class, break, or lunch: choose one daily action",
    "继续": "Continue",
    "暂存事件": "Hold Event",
    "继续处理暂存事件": "Resume Held Event",
    "同学": "Peers",
    "威严": "Authority",
    "学生": "Students",
    "神秘 NPC": "Mysterious NPC",
    "晚自习事件": "Evening Study Event",
    "教师专属事件": "Teacher Event",
    "彩蛋事件": "Easter Egg Event",
    "特殊商店": "Special Shop",
    "购买备用机": "Buy a Backup Phone",
    "路过": "Walk Past",
    "开学典礼": "Opening Ceremony",
    "升旗仪式岗位亮相": "Flag Ceremony Role Reveal",
    "学生协会招新与部员大会": "Student Association Recruitment",
    "教师节小活动": "Teachers' Day Event",
    "O/C/R 奖申报": "O/C/R Award Application",
    "草坪音乐节": "Lawn Music Festival",
    "秋季运动会": "Autumn Sports Meet",
    "新年 TED": "New Year TED",
    "领航鲸英奖报名": "Leading Whale Award Application",
    "爱心义卖・庠序世集": "Charity Market",
    "常委换届竞选": "Committee Election",
    "文化周": "Culture Week",
    "成人礼暨领航鲸英颁奖": "Coming-of-Age and Awards Ceremony",
    "常委换届交接": "Committee Handover",
    "服务部合作项目拓展": "Service Partnership Expansion",
    "轮岗与岗位匹配": "Role Rotation and Matching",
    "下学期活动准备梳理": "Next-Term Activity Planning",
    "嘉宾还没到，你需要把台上的三十秒变得像原计划。": "The guest has not arrived. Make the next thirty seconds onstage look intentional.",
    "在全校面前把新团队介绍清楚，也给没被看见的人留位置。": "Introduce the new team clearly to the school while leaving room for those who were overlooked.",
    "把部门目标、合作方式和第一项任务讲明白。": "Make the department goals, working style, and first task clear.",
    "用最少打扰完成布置，并在上课前恢复现场。": "Finish the setup with minimal disruption and restore the room before class.",
    "让同伴专挑漏洞，提前发现最难回答的问题。": "Ask peers to find the gaps before the hardest questions arrive.",
    "临时处理串场、缺货和音响失灵，让现场继续流动。": "Handle transitions, shortages, and sound failures without stopping the event.",
    "检录提前、物资走错，你决定先救最影响全局的一环。": "Check-in moves early and supplies go missing. Rescue the failure that affects the whole event first.",
    "节目临时延长，你要重新安排演讲与表演的衔接。": "A performance runs long. Rebuild the transition between talks and acts.",
    "补齐数据、见证和反思，让申报不只剩漂亮形容词。": "Add evidence, testimony, and reflection so the application is more than polished adjectives.",
    "收摊后公开数字，让每一笔收入都能被追溯。": "Publish the numbers after closing so every payment can be traced.",
    "不绕开质疑，说明你会如何处理资源冲突和团队分歧。": "Answer the challenge directly and explain how you would handle resource conflicts and team disagreements.",
    "两个节目同时到场，临时协调空间、时间和观众动线。": "Two performances arrive at once. Rework the space, schedule, and audience flow.",
    "名单、奖项和上台顺序临时变化，你要保证没有人被叫错。": "The names, awards, and stage order change at the last minute. Make sure nobody is announced incorrectly.",
    "让新团队亲手做一次，你只在关键节点提供支持。": "Let the new team do it themselves while you support only the critical moments.",
    "控制人数和承诺范围，用真实反馈决定是否继续。": "Limit the group and promises, then use real feedback to decide whether to continue.",
    "先用短任务验证匹配，再决定正式岗位。": "Test the match with a short task before assigning permanent roles.",
    "用影响而不是惯例做判断，为团队留出真实余量。": "Judge by impact instead of habit and leave the team real breathing room.",
    "DDL 正在靠近。": "A deadline is getting closer.",
    "你们吃的不是饭，是小组作业时期的人脉保险。": "This is less a meal than social insurance for the next group project.",
    "你没有变快乐，但身体重新上线了一点。": "You are not happier, but your body has come back online.",
    "完整彩排一遍": "Run a Full Rehearsal",
    "让学生即兴开场": "Let Students Improvise the Opening",
    "删掉一半流程": "Cut Half the Program",
    "自己上台救场": "Step Onstage and Rescue It",
    "请乐队临时加演": "Ask the Band for an Encore",
    "暂停五分钟等嘉宾": "Pause Five Minutes for the Guest",
    "按能力分岗位": "Assign Roles by Ability",
    "让大家自己选岗位": "Let Everyone Choose a Role",
    "抽签决定岗位": "Draw Lots for Roles",
    "一次公布所有岗位": "Announce Every Role at Once",
    "允许现场交换岗位": "Allow On-the-Spot Role Swaps",
    "暂缓有争议的岗位": "Delay Disputed Assignments",
    "办现场体验任务": "Run a Live Trial Task",
    "看报名表筛人": "Screen the Application Forms",
    "请老部员推荐": "Ask Returning Members to Recommend",
    "介绍每个部门": "Introduce Every Department",
    "先玩破冰游戏": "Start with an Icebreaker",
    "直接发第一周任务": "Assign the First-Week Task",
    "收集真实小故事": "Collect Real Stories",
    "买统一小礼物": "Buy Matching Small Gifts",
    "拍搞笑祝福视频": "Film a Funny Thank-You Video",
    "课前秘密布置": "Decorate in Secret Before Class",
    "当面读感谢信": "Read the Thank-You Letter Aloud",
    "只发一张电子卡": "Send One Digital Card",
    "按数据整理材料": "Organize the Evidence by Data",
    "重点写个人故事": "Lead with a Personal Story",
    "临时补一个项目": "Invent a Last-Minute Project",
    "模拟正式答辩": "Rehearse the Formal Defense",
    "请朋友专门挑错": "Ask Friends to Find Every Flaw",
    "不准备，现场发挥": "Skip Preparation and Improvise",
    "先排节目顺序": "Schedule the Performances First",
    "先抢热门摊位": "Grab the Popular Booths First",
    "让乐队自己安排": "Let the Bands Organize Themselves",
    "守住舞台和音响": "Guard the Stage and Sound Desk",
    "去小摊帮忙": "Help at the Booths",
    "跟观众一起热场": "Warm Up the Crowd",
    "按实力安排项目": "Assign Events by Ability",
    "让大家自愿报名": "Use Voluntary Sign-Ups",
    "把希望全押在接力": "Bet Everything on the Relay",
    "亲自参加比赛": "Compete in Person",
    "去做检录志愿者": "Volunteer at Check-In",
    "在看台带队加油": "Lead Cheers from the Stands",
    "讲一次真实失败": "Tell a Story of Real Failure",
    "讲自己的研究成果": "Present Your Research",
    "做一场互动演讲": "Give an Interactive Talk",
    "自己上台填空": "Fill the Empty Slot Yourself",
    "临时加一个小表演": "Add a Small Last-Minute Act",
    "缩短后面的节目": "Shorten the Remaining Program",
    "推荐默默服务的人": "Nominate an Unsung Contributor",
    "推荐成绩最好的人": "Nominate the Top Student",
    "向全校公开征集": "Open Nominations to the School",
    "用数据写报名材料": "Build the Application with Data",
    "用故事打动评委": "Win the Judges with a Story",
    "请老师一起修改": "Revise It with a Teacher",
    "卖自己做的小物件": "Sell Handmade Items",
    "办二手交换摊": "Run a Secondhand Swap Booth",
    "高价卖限量款": "Sell Limited Editions at a Premium",
    "公开每一笔收入": "Publish Every Transaction",
    "把钱交给负责老师": "Hand the Money to the Teacher",
    "当场宣布捐赠结果": "Announce the Donation Total",
    "只承诺三件能做到的事": "Promise Only Three Achievable Things",
    "提出一次大胆改革": "Propose One Bold Reform",
    "主打人气拉票": "Campaign on Popularity",
    "正面回答所有问题": "Answer Every Question Directly",
    "请队友一起补充": "Invite Teammates to Add Details",
    "避开有争议的问题": "Avoid the Controversial Questions",
    "做跨班主题展览": "Build a Cross-Class Exhibition",
    "办一场舞台演出": "Stage a Live Performance",
    "做安静体验活动": "Create a Quiet Interactive Exhibit",
    "重新安排节目时间": "Reschedule the Performances",
    "让两个节目一起演": "Merge the Two Performances",
    "临时取消一个节目": "Cancel One Performance",
    "采访同学成长故事": "Interview a Classmate About Growth",
    "做一段照片回顾": "Create a Photo Retrospective",
    "只准备官方流程": "Prepare Only the Official Program",
    "逐个核对颁奖名单": "Verify Every Award Recipient",
    "安慰没有获奖的同学": "Support Those Who Did Not Win",
    "临时调整颁奖顺序": "Change the Award Order",
    "写清楚所有踩过的坑": "Document Every Mistake",
    "只交成功活动模板": "Hand Over Only Successful Templates",
    "开会口头讲一遍": "Explain It Once in a Meeting",
    "让新人独立完成": "Let the New Team Do It Alone",
    "陪新人一步步做": "Guide the New Team Step by Step",
    "出问题时再来救场": "Step In Only When Things Break",
    "先问社区真正需要什么": "Ask What the Community Actually Needs",
    "复制已有合作模式": "Copy an Existing Partnership",
    "选择最热门的项目": "Choose the Most Popular Project",
    "先做一次小范围测试": "Run a Small Pilot First",
    "一次招很多志愿者": "Recruit Many Volunteers at Once",
    "和老合作方一起做": "Work with an Existing Partner",
    "按兴趣分岗位": "Assign Roles by Interest",
    "做能力测试再分岗": "Test Skills Before Assigning Roles",
    "直接随机轮岗": "Randomize the Rotation",
    "每个岗位试做两天": "Try Each Role for Two Days",
    "不合适就马上换": "Switch Immediately if It Fails",
    "先固定岗位一个月": "Lock Roles for One Month",
    "先查所有时间冲突": "Check Every Schedule Conflict",
    "让各部门自己报计划": "Let Departments Submit Their Plans",
    "只定最重要的三件事": "Choose Only the Top Three Priorities",
    "删掉重复活动": "Remove Duplicate Events",
    "延后最难做的活动": "Delay the Hardest Event",
    "全部保留，大家硬扛": "Keep Everything and Push Through",
    "刷题": "Practice Problems",
    "下午大课间溜圈": "Walk During the Afternoon Break",
    "打羽毛球": "Play Badminton",
    "体育课认真参与": "Take PE Seriously",
    "请假": "Ask for Leave",
    "讲冷笑话": "Tell a Bad Joke",
    "批作业": "Grade Homework",
    "课堂互动": "Run a Class Discussion",
    "准备公开课": "Prepare an Open Class",
    "拖堂": "Keep the Class Late",
    "突击检查": "Run a Surprise Inspection",
    "考试出难题": "Write a Brutal Exam",
    "教师打羽毛球": "Teacher Badminton",
    "和同学吃饭": "Eat with Classmates",
    "找老师聊天": "Talk with a Teacher",
    "一个人刷题": "Study Alone",
    "勇闯神秘食堂菜品": "Challenge the Mystery Cafeteria Dish",
    "在办公室吃饭": "Eat in the Office",
    "趴桌午休": "Take a Desk Nap",
    "和同事聊天": "Talk with Colleagues",
    "课后答疑": "Answer Questions After Class",
    "听学生吐槽": "Listen to Student Complaints",
    "躲进空教室回血": "Recover in an Empty Classroom",
    "教师勇闯神秘食堂菜品": "Teacher vs. Mystery Cafeteria Dish",
    "班主任突然查手机": "Surprise Phone Inspection",
    "立刻上交": "Hand It Over",
    "假装没带": "Pretend You Left It Behind",
    "交出备用机": "Hand Over the Backup Phone",
    "Reading Journal 截止前一天": "The Day Before the Reading Journal Deadline",
    "按时完成": "Finish on Time",
    "熬夜完成": "Stay Up and Finish",
    "未完成": "Leave It Unfinished",
    "小组作业队友失踪": "The Missing Group-Project Teammate",
    "一个人完成": "Finish It Alone",
    "摆烂": "Give Up",
    "在群里疯狂艾特": "Spam Mentions in the Group Chat",
    "学校 WiFi 炸了": "The School Wi-Fi Is Down",
    "等老师修": "Wait for a Teacher to Fix It",
    "智慧用电物联": "Smart Power IoT",
    "食堂游荡大厨": "The Wandering Cafeteria Chef",
    "真诚夸奖": "Offer Sincere Praise",
    "委婉建议": "Give Gentle Feedback",
    "说出真相": "Tell the Truth",
    "老师今天心情不错": "The Teacher Is in a Good Mood",
    "神秘代课老师": "The Mysterious Substitute Teacher",
    "摸鱼": "Slack Off",
    "和同学聊天": "Chat with Classmates",
    "堵车": "Traffic Jam",
    "年级巡查": "Grade-Level Inspection",
    "配合巡查": "Cooperate with the Inspection",
    "宿管巡查": "Dorm Inspection",
    "假装睡觉": "Pretend to Sleep",
    "继续写作业": "Keep Doing Homework",
    "继续聊天": "Keep Talking",
    "晚自习突然安静": "Evening Study Goes Silent",
    "宿舍夜谈失控": "Dorm Conversation Out of Control",
    "熄灯后继续写作业": "Homework After Lights-Out",
    "不使用 AI": "Do Not Use AI",
    "适度参考": "Use AI as a Reference",
    "全部复制": "Copy Everything",
    "批作业地狱": "Homework Grading Hell",
    "学生起义": "Student Rebellion",
    "恶魔教师事件": "Devil Teacher Event",
    "年级组临时任务": "Urgent Grade-Team Task",
    "老师今天不想上班": "The Teacher Does Not Want to Work Today",
    "步履轻盈的年级主任": "The Silent Grade Director",
    "Ray 老师的鹦鹉": "Ray's Parrot",
    "被同学砸死（乌龟）": "Killed by a Classmate (Turtle)",
    "乌龟也要考期末。": "Even turtles have to take finals.",
    "藤校录取": "Ivy League Admission",
    "去": "Accept",
    "不去": "Decline",
    "《彻底疯狂》": "Total Breakdown",
    "《教师版彻底疯狂》": "Teacher Breakdown",
    "《AI 替我毕业》": "AI Graduated for Me",
    "《消失的人》": "The Disappeared Student",
    "《转学》": "Transfer",
    "《景德镇常住居民》": "Permanent Resident of Jingdezhen",
    "《校园传说》": "Campus Legend",
    "《讲台透明人》": "Invisible at the Lectern",
    "《全班静音》": "The Silent Classroom",
    "《年级组黑名单》": "Grade-Team Blacklist",
    "《藤校拒了我，但我拒了藤校》": "The Ivy Rejected Me, but I Rejected the Ivy",
    "《藤校录取》": "Ivy League Admission",
    "《TOP50，正常发挥》": "Top 50, As Expected",
    "《WCU（Wild Chicken University）录取》": "Admitted to WCU (Wild Chicken University)",
    "《没学上了》": "No School Left",
    "《收获一群终身挚友》": "Friends for Life",
    "《独狼》": "Lone Wolf",
    "《校运会传奇》": "Sports Day Legend",
    "《红笔战神》": "Red-Pen War God",
    "《恶魔教师》": "Devil Teacher",
    "《学生心中的白月光》": "The Teacher Students Remember",
    "《年级组隐藏 Boss》": "The Grade Team's Hidden Boss",
    "《普通毕业生》": "Ordinary Graduate",
    "《普通教师》": "Ordinary Teacher",
    "系统提示：": "System Notice:",
    "系统评价：": "System Review:",
    "毕业致谢：": "Graduation Acknowledgements:",
    "有人问：": "Someone asks:",
    "你说：": "You say:",
    "普通地批了作业。": "You graded homework normally.",
    "你普通地完成了这个学期。": "You completed this semester normally.",
    "普通地开完会。": "You finished meetings normally.",
    "普通地熬过了期末。": "You survived finals normally.",
    "在 Schooltopia，普通下班本身就是一种隐藏成就。": "In Schooltopia, leaving work normally is a hidden achievement by itself.",
    "只有在你明确同意后才会记录研究数据；你可以随时清除本机研究标识。": "Research data is recorded only after your explicit consent, and you can clear your research identity at any time.",
    "我同意记录匿名路线、选择、属性变化、结局与主动反馈，用于校园体验研究。": "I consent to recording anonymous routes, choices, stat changes, endings, and optional feedback for campus-experience research.",
    "清除我的研究数据": "Delete My Research Data",
    "在线研究记录最多保留 180 天；反馈请勿填写姓名或可识别个人的信息。": "Online research records are kept for no more than 180 days. Do not include names or identifying details in feedback.",
    "匿名研究已启用": "Anonymous Research Enabled",
    "匿名研究未启用": "Anonymous Research Disabled",
    "研究数据已清除": "Research Data Deleted",
    "服务器记录暂时无法删除": "Server records could not be deleted right now",
    "AI 使用习惯": "AI Habits",
    "查看图鉴": "View Collection",
    "收集进度": "Collection Progress",
    "走读生本周回家短暂回血，心情恢复了一些。": "The commuter route recovers a little mood at home this week.",
    "GitHub 公开版的学校设置、选择与结局只保存在当前浏览器，不会上传。年级段和玩家倾向只用于本机回顾，不改变玩法。": "On GitHub, school settings, choices, and endings stay in this browser and are never uploaded. Grade band and player style are used only in the local recap and do not change gameplay.",
    "清除浏览器网站数据即可删除这些本机记录。反馈框不会在离线版上传内容。": "Clear this site's browser data to remove local records. The offline edition never uploads feedback.",
    "只有在你明确同意后，系统才会记录匿名路线、选择、属性变化、结局与主动反馈。": "The system records anonymous routes, choices, stat changes, endings, and optional feedback only after your explicit consent.",
  });

  const ZH = Object.fromEntries(Object.entries(EN).map(([zh, en]) => [en, zh]));
  const HAN_TEXT = /[\u3400-\u9fff]/;
  const EN_COMPOSITE_KEYS = Object.keys(EN)
    .filter((key) => key.length >= 2 && HAN_TEXT.test(key) && EN[key] !== key)
    .sort((left, right) => right.length - left.length);
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
      match = line.match(/^还需分配 (\d+) 点$/);
      if (match) return `${match[1]} points still unassigned`;
      match = line.match(/^存档 (\d+)$/);
      if (match) return `Save Slot ${match[1]}`;
      match = line.match(/^保存 (\d+)$/);
      if (match) return `Save ${match[1]}`;
      match = line.match(/^保存时间：(.+)$/);
      if (match) return `Saved: ${match[1]}`;
      match = line.match(/^已读取存档 (\d+)。$/);
      if (match) return `Loaded Save Slot ${match[1]}.`;
      match = line.match(/^本局 (\d+)\/10$/);
      if (match) return `This Run ${match[1]}/10`;
      match = line.match(/^上局记忆生效：(.+) \+1。$/);
      if (match) return `Previous run memory applied: ${phrase(match[1])} +1.`;
      match = line.match(/^属性不足：(.+)$/);
      if (match) {
        const costs = match[1].split("；").map((part) => {
          const cost = part.match(/^(.+)需要 (\d+)，当前 (\d+)$/);
          return cost ? `${phrase(cost[1])}: need ${cost[2]}, current ${cost[3]}` : phrase(part);
        });
        return `Not enough stats: ${costs.join("; ")}`;
      }
      match = line.match(/^(.+)的溢出提升转化为(校园声望|教学声望) \+(\d+)。$/);
      if (match) return `${phrase(match[1])} overflow became ${phrase(match[2])} +${match[3]}.`;
      match = line.match(/^本周随机事件已达上限（(\d+)），其余事件顺延到命运的未读消息里。$/);
      if (match) return `This week's random-event limit (${match[1]}) has been reached. The rest remain in fate's unread messages.`;
      match = line.match(/^原始总分 (\d+)，总评最高记为 100。$/);
      if (match) return `Raw score ${match[1]}; the run score is capped at 100.`;
      match = line.match(/^第 (\d+) 周 · (\d+) 条记录$/);
      if (match) return `Week ${match[1]} · ${match[2]} entries`;
      match = line.match(/^(.+) ([+-]1)$/);
      if (match && EN[match[1]]) return `${EN[match[1]]} ${match[2]}`;
      match = line.match(/^(学生路线|教师路线) · 第 (\d+) 周 · (校园行动第一轮|校园行动第二轮|第一轮已跳过|日常行动第一轮|校园活动第二轮|日常行动已跳过) · (.+)$/);
      if (match) return `${phrase(match[1])} · Week ${match[2]} · ${phrase(match[3])} · ${phrase(match[4])}`;
      match = line.match(/^(?:第 (\d+) 周|Week (\d+)) · 校园行动 · (第一轮|第二轮)$/);
      if (match) return `Week ${match[1] || match[2]} · Campus Action · ${phrase(match[3])}`;
      match = line.match(/^(第一轮|第二轮) · (.+)$/);
      if (match) return `${phrase(match[1])} · ${phrase(match[2])}`;
      match = line.match(/^本轮只出现“(.+)”的专属选项。$/);
      if (match) return `Only choices unique to "${phrase(match[1])}" appear this round.`;
      match = line.match(/^本周活动：(.+)。$/);
      if (match) return `This week's activity: ${phrase(match[1])}.`;
      match = line.match(/^(.+)(提升|降低) (\d+)$/);
      if (match) return `${phrase(match[1])} ${match[2] === "提升" ? "increased" : "decreased"} by ${match[3]}`;
      match = line.match(/^(.+)：(.+)。$/);
      if (match) {
        const subject = phrase(match[1]);
        const action = phrase(match[2]);
        if (!HAN_TEXT.test(subject) && !HAN_TEXT.test(action)) return `${subject}: ${action}.`;
      }
      match = line.match(/^(.+)｜(.+)｜第 (\d+)\/12 周$/);
      if (match) return `${phrase(match[1])} | ${phrase(match[2])} | Week ${match[3]}/12`;
      match = line.match(/^(.+) · 校本事件$/);
      if (match) return `${match[1]} · School Event`;
      match = line.match(/^启用 (.+)$/);
      if (match) return `Enable ${match[1]}`;
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
      match = line.match(/^当前暴露率：(\d+)%$/);
      if (match) return `Current exposure risk: ${match[1]}%`;
      match = line.match(/^迟到概率：(\d+)%$/);
      if (match) return `Late-arrival risk: ${match[1]}%`;
      match = line.match(/^效率很高，心情大涨，但智慧下降；当前被发现风险：(\d+)%$/);
      if (match) return `High efficiency and a large mood gain, but wisdom falls. Current detection risk: ${match[1]}%`;
      match = line.match(/^速度最快，但期末被发现风险：(\d+)%$/);
      if (match) return `Fastest option, but final-project detection risk is ${match[1]}%`;
      match = line.match(/^正在编辑：(.+)$/);
      if (match) return `Editing: ${match[1]}`;
      match = line.match(/^已把“(.+)”生成三个可玩的剧情节点。$/);
      if (match) return `Generated three playable story nodes for "${match[1]}".`;
      match = line.match(/^已根据“(.+)”生成三条剧情草稿。$/);
      if (match) return `Generated three story drafts from "${match[1]}".`;
      match = line.match(/^已创建“(.+)”。现在可以选择皮肤并添加校园事件。$/);
      if (match) return `Created "${match[1]}". You can now choose a skin and add campus events.`;
      match = line.match(/^已创建“(.+)”。现在可以选择配色并添加校园事件。$/);
      if (match) return `Created "${match[1]}". You can now choose a color preset and add campus events.`;
      match = line.match(/^已选择“(.+)”主题，保存后会应用到专属游戏。$/);
      if (match) return `Selected "${match[1]}". Save to apply it to your school game.`;
      match = line.match(/^已选择“(.+)”配色，保存后会应用到专属游戏。$/);
      if (match) return `Selected "${match[1]}". Save to apply it to your school game.`;
      const composite = EN_COMPOSITE_KEYS.reduce(
        (result, key) => result.includes(key) ? result.split(key).join(EN[key]) : result,
        line
      );
      if (composite !== line && !HAN_TEXT.test(composite)) return composite;
    } else {
      let match = line.match(/^(\d+) points left$/);
      if (match) return `剩余 ${match[1]} 点`;
      match = line.match(/^(\d+) points still unassigned$/);
      if (match) return `还需分配 ${match[1]} 点`;
      match = line.match(/^Save Slot (\d+)$/);
      if (match) return `存档 ${match[1]}`;
      match = line.match(/^Save (\d+)$/);
      if (match) return `保存 ${match[1]}`;
      match = line.match(/^Saved: (.+)$/);
      if (match) return `保存时间：${match[1]}`;
      match = line.match(/^Loaded Save Slot (\d+)\.$/);
      if (match) return `已读取存档 ${match[1]}。`;
      match = line.match(/^This Run (\d+)\/10$/);
      if (match) return `本局 ${match[1]}/10`;
      match = line.match(/^Previous run memory applied: (.+) \+1\.$/);
      if (match) return `上局记忆生效：${phrase(match[1])} +1。`;
      match = line.match(/^Not enough stats: (.+)$/);
      if (match) {
        const costs = match[1].split("; ").map((part) => {
          const cost = part.match(/^(.+): need (\d+), current (\d+)$/);
          return cost ? `${phrase(cost[1])}需要 ${cost[2]}，当前 ${cost[3]}` : phrase(part);
        });
        return `属性不足：${costs.join("；")}`;
      }
      match = line.match(/^(.+) overflow became (Campus Reputation|Teaching Reputation) \+(\d+)\.$/);
      if (match) return `${phrase(match[1])}的溢出提升转化为${phrase(match[2])} +${match[3]}。`;
      match = line.match(/^This week's random-event limit \((\d+)\) has been reached\. The rest remain in fate's unread messages\.$/);
      if (match) return `本周随机事件已达上限（${match[1]}），其余事件顺延到命运的未读消息里。`;
      match = line.match(/^Raw score (\d+); the run score is capped at 100\.$/);
      if (match) return `原始总分 ${match[1]}，总评最高记为 100。`;
      match = line.match(/^Week (\d+) · (\d+) entries$/);
      if (match) return `第 ${match[1]} 周 · ${match[2]} 条记录`;
      match = line.match(/^(.+) ([+-]1)$/);
      if (match && ZH[match[1]]) return `${ZH[match[1]]} ${match[2]}`;
      match = line.match(/^(Student Route|Teacher Route) · (Relaxed Mode|Standard Mode|Finals Inferno)$/);
      if (match) return `${phrase(match[1])} · ${phrase(match[2])}`;
      match = line.match(/^(Student|Teacher) · (Commuter|Boarder|Teacher)$/);
      if (match) return `${phrase(match[1])} · ${phrase(match[2])}`;
      match = line.match(/^(Relaxed Mode|Standard Mode|Finals Inferno) \| (Great Shape|Holding On|Near Collapse) \| Week (\d+)\/12$/);
      if (match) return `${phrase(match[1])} | ${phrase(match[2])} | 第 ${match[3]}/12 周`;
      match = line.match(/^(Student Route|Teacher Route) · Week (\d+) · (Campus Action Round 1|Campus Action Round 2|Round 1 Skipped|Daily Action Round|Campus Activity Round|Daily Action Skipped) · (.+)$/);
      if (match) return `${phrase(match[1])} · 第 ${match[2]} 周 · ${phrase(match[3])} · ${phrase(match[4])}`;
      match = line.match(/^Only choices unique to "(.+)" appear this round\.$/);
      if (match) return `本轮只出现“${phrase(match[1])}”的专属选项。`;
      match = line.match(/^Enable (.+)$/);
      if (match) return `启用 ${match[1]}`;
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
    const selector = "[placeholder], [title], [aria-label], [data-label]";
    const elements = [
      ...(root.matches?.(selector) ? [root] : []),
      ...(root.querySelectorAll?.(selector) || []),
    ];
    elements.forEach((element) => {
      ["placeholder", "title", "aria-label", "data-label"].forEach((attribute) => {
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

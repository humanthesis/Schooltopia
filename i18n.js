(function () {
  const STORAGE_KEY = "schooltopia_language";
  const EN = {
    "Schooltopia Studio · 创建我的学校": "Schooltopia Studio · Build Your School",
    "创建学校": "Create School",
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
    "教学威严": "Authority",
    "教师体能": "Teacher Stamina",
    "教师心情": "Teacher Mood",
    "学生好感": "Student Favor",
    "年级组信任度": "Grade Trust",
    "年级组信任": "Grade Trust",
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
    "规则": "Rules",
    "周期": "Cycle",
    "12 周": "12 Weeks",
    "保存": "Save",
    "删除": "Delete",
    "编辑节点": "Edit Nodes",
    "还没有事件。写下第一件属于你学校的校园经历。": "No events yet. Write the first campus moment from your school.",
    "进入游戏并分享": "Play and Share",
    "专属链接会载入当前学校的皮肤、事件和变量权重。": "The school link loads this school's skin, events, and variable weights.",
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
    "GitHub 版使用当前浏览器保存学校设置，六套皮肤和自定义事件均可直接试玩。": "The GitHub version saves school settings in this browser. All six skins and custom events are ready to use.",
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
    "开局 14 点，随机事件更少，期末要求更低，适合先看剧情和收集图鉴。": "Start with 14 points, fewer random events, and easier finals. Best for exploring stories and filling the collection.",
    "开局 10 点，保留原本节奏，事件和期末压力比较均衡。": "Start with 10 points. Events and finals pressure follow the intended balanced pace.",
    "开局 6 点，事件更密集，期末额外扣状态，Project 和考试要求更高。": "Start with 6 points, denser events, extra finals drain, and tougher project and exam requirements.",
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
    "赌一把会多拿一点结果，但失败成本很高。": "Take a gamble for a bigger result, with a high failure cost.",
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
      match = line.match(/^还需分配 (\d+) 点$/);
      if (match) return `${match[1]} points still unassigned`;
      match = line.match(/^存档 (\d+)$/);
      if (match) return `Save Slot ${match[1]}`;
      match = line.match(/^保存 (\d+)$/);
      if (match) return `Save ${match[1]}`;
      match = line.match(/^保存时间：(.+)$/);
      if (match) return `Saved: ${match[1]}`;
      match = line.match(/^(.+) ([+-]1)$/);
      if (match && EN[match[1]]) return `${EN[match[1]]} ${match[2]}`;
      match = line.match(/^(学生路线|教师路线) · 第 (\d+) 周 · (校园行动第一轮|校园行动第二轮|第一轮已跳过) · (.+)$/);
      if (match) return `${phrase(match[1])} · Week ${match[2]} · ${phrase(match[3])} · ${phrase(match[4])}`;
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
      match = line.match(/^已创建“(.+)”。现在可以选择皮肤并添加校园事件。$/);
      if (match) return `Created "${match[1]}". You can now choose a skin and add campus events.`;
      match = line.match(/^已选择“(.+)”主题，保存后会应用到专属游戏。$/);
      if (match) return `Selected "${match[1]}". Save to apply it to your school game.`;
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
      match = line.match(/^(.+) ([+-]1)$/);
      if (match && ZH[match[1]]) return `${ZH[match[1]]} ${match[2]}`;
      match = line.match(/^(Student Route|Teacher Route) · Week (\d+) · (Campus Action Round 1|Campus Action Round 2|Round 1 Skipped) · (.+)$/);
      if (match) return `${phrase(match[1])} · 第 ${match[2]} 周 · ${phrase(match[3])} · ${phrase(match[4])}`;
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

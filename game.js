const TEXT = {
  systemLine: "欢迎进入 Schooltopia。校园规则正在运行。",
  finalPrompt: "你无法真正逃离 Schooltopia。\n因为当你开始讲述校园生活的时候，\n你已经成为研究的一部分。",
  tips: [
    "DDL 正在靠近。",
    "你的心情值发出了不属于人类的声音。",
    "班主任正在加载中。",
    "食堂今日菜品正在进行不可描述的化学反应。",
    "你的智慧进入短暂离线状态。",
    "同学好感正在缓慢蒸发。",
    "你打开了作业，又关闭了人生。",
    "期末周不是一周，是一种自然灾害。",
    "欢迎进入 Schooltopia。请确认你已保存精神状态。",
    "这里不是桃源，是 DDL 的源头。",
  ],
};

const ATTRIBUTES = {
  student: [
    { id: "wisdom", name: "智慧", tone: "blue" },
    { id: "stamina", name: "体能", tone: "green" },
    { id: "mood", name: "心情", tone: "gold" },
    { id: "peerFavor", name: "同学好感", tone: "rose" },
    { id: "homeroomTrust", name: "班主任信任度", tone: "ink" },
  ],
  teacher: [
    { id: "authority", name: "教学威严", tone: "ink" },
    { id: "teacherStamina", name: "教师体能", tone: "green" },
    { id: "teacherMood", name: "教师心情", tone: "gold" },
    { id: "studentFavor", name: "学生好感", tone: "rose" },
    { id: "gradeTrust", name: "年级组信任度", tone: "blue" },
  ],
};

const ROUTES = [
  {
    id: "student",
    name: "学生路线",
    detail: "学习、考试、Project、Reading Journal、同学关系、班主任信任度、手机检查和升学结局",
    identities: [
      {
        id: "commuter",
        name: "走读生",
        detail: "每周开始时有机会回家短暂回血，手机检查也更不容易暴露",
      },
      {
        id: "boarder",
        name: "住宿生",
        detail: "宿舍夜谈会增强人际连接，但住宿生活也会持续消耗体能",
      },
    ],
  },
  {
    id: "teacher",
    name: "教师路线",
    detail: "批作业、拖堂、突击检查、考试出难题、学生好感、年级组信任度和教师专属结局",
    identities: [{ id: "teacher", name: "老师", detail: "不参与大学录取类结局" }],
  },
];

const STAT_ROUTE = {
  wisdom: "student",
  stamina: "student",
  mood: "student",
  peerFavor: "student",
  homeroomTrust: "student",
  authority: "teacher",
  teacherStamina: "teacher",
  teacherMood: "teacher",
  studentFavor: "teacher",
  gradeTrust: "teacher",
};

const PHYSICAL_STUDENT_ACTIONS = new Set([
  "action_walk_during_break",
  "action_play_badminton_student",
  "action_serious_pe_class",
]);

const STATUS = {
  status_mysterious_athlete_power: { name: "体育生の神秘力量", type: "dynamic" },
  status_icu_watchlist: { name: "ICU 观察名单", type: "dynamic" },
  status_dont_want_school: { name: "我不想上学", type: "dynamic" },
  status_key_attention_target: { name: "重点关注对象", type: "dynamic" },
  status_organ_phone: { name: "器官型手机", type: "permanent" },
  status_ai_dependency: { name: "AI 依赖症", type: "permanent" },
  status_study_machine: { name: "刷题机器", type: "permanent" },
  status_classroom_out_of_control: { name: "课堂失控", type: "permanent" },
  status_review_material_alliance: { name: "复习资料共享联盟", type: "permanent" },
  status_lonely_academic_machine: { name: "孤独的学术机器", type: "permanent" },
  status_red_pen_unusable: { name: "红笔拿不动了", type: "dynamic" },
};

const TITLES = {
  title_homeroom_favorite: { name: "班主任的亲孩子" },
  title_late_habitual_offender: { name: "迟到惯犯" },
  title_canteen_warrior: { name: "食堂勇士" },
  title_red_pen_skilled_worker: { name: "红笔熟练工" },
  title_red_pen_war_god: { name: "红笔战神" },
  title_grade_group_hidden_boss: { name: "年级组隐藏 Boss" },
  title_light_footed: { name: "步履轻盈" },
  title_office_badminton_king: { name: "办公室羽毛球王者" },
  title_walking_grade_inspection: { name: "行走的年级巡查" },
  title_student_moonlight_teacher: { name: "学生心中的白月光" },
};

const ACHIEVEMENTS = {
  achievement_warning_slip_calling: { name: "警告单在召唤" },
  achievement_super_cold_joke_king: { name: "超级冷笑话大王" },
  achievement_prompt_engineer: { name: "Prompt 工程师" },
  achievement_ray_teacher_parrot: { name: "Ray 老师的鹦鹉" },
  achievement_smart_electric_iot_engineer: { name: "智慧用电物联工程师" },
  achievement_turtle_shell_defense: { name: "龟壳防御" },
  achievement_jennifer_teacher_angry: { name: "站你飞（Jennifer 老师）都怒了" },
  achievement_best_late_award: { name: "最佳迟到奖" },
  achievement_smile_legend: { name: "微笑神" },
  achievement_jingdezhen_survivor: { name: "景德镇幸存者" },
  achievement_red_pen_war_god: { name: "红笔战神" },
  achievement_devil_teacher: { name: "恶魔教师" },
};

const ADVANCED_ACHIEVEMENTS = new Set([
  "achievement_prompt_engineer",
  "achievement_super_cold_joke_king",
  "achievement_ray_teacher_parrot",
  "achievement_smart_electric_iot_engineer",
  "achievement_jingdezhen_survivor",
  "achievement_turtle_shell_defense",
  "achievement_best_late_award",
]);

const ITEMS = {
  item_mysterious_wifi_password: { name: "神秘 WiFi 密码：88888888" },
  item_backup_phone: { name: "备用机" },
};

const EVENT_CHANCES = {
  commonStudent: 55,
  commonTeacher: 30,
  rare: 18,
  npcStudent: 10,
  npcTeacher: 8,
  homeworkGradingHell: 45,
};

const DIFFICULTIES = [
  {
    id: "easy",
    name: "轻松模式",
    detail: "开局 14 点，随机事件更少，期末要求更低，适合熟悉规则和体验主线。",
    setupPoints: 14,
    eventMultiplier: 0.65,
    rareMultiplier: 0.55,
    aiRiskMultiplier: 0.65,
    finalDrain: 0,
    finalScoreModifier: 1,
    projectTarget: 6,
    examTarget: 3,
    teacherSummaryTarget: 10,
    baseLateRate: 8,
    rebellionBonus: -2,
    jingdezhenResidentRuns: 6,
  },
  {
    id: "standard",
    name: "标准模式",
    detail: "开局 10 点，保留原本节奏，事件和期末压力比较均衡。",
    setupPoints: 10,
    eventMultiplier: 1,
    rareMultiplier: 1,
    aiRiskMultiplier: 1,
    finalDrain: 0,
    finalScoreModifier: 0,
    projectTarget: 7,
    examTarget: 4,
    teacherSummaryTarget: 12,
    baseLateRate: 15,
    rebellionBonus: 0,
    jingdezhenResidentRuns: 5,
  },
  {
    id: "hell",
    name: "地狱期末模式",
    detail: "开局 6 点，事件更密集，期末额外扣状态，Project 和考试要求更高。",
    setupPoints: 6,
    eventMultiplier: 1.35,
    rareMultiplier: 1.55,
    aiRiskMultiplier: 1.6,
    finalDrain: 2,
    finalScoreModifier: -2,
    projectTarget: 9,
    examTarget: 5,
    teacherSummaryTarget: 15,
    baseLateRate: 30,
    rebellionBonus: 6,
    jingdezhenResidentRuns: 5,
  },
];

const AI_HABITS = [
  { id: "efficiency", name: "效率" },
  { id: "integrity", name: "诚信" },
  { id: "dependency", name: "依赖" },
  { id: "risk", name: "风险" },
];

const CAMPUS_ACTIVITY_POOL = [
  {
    id: "opening_ceremony",
    stage: "启航",
    title: "开学典礼",
    brief: "新学期第一次集体亮相，流程、台词和现场秩序都要有人接住。",
    profile: "organization",
    firstName: "排好典礼流程",
    firstDetail: "删掉重复环节，给主持、音控和候场重新排时间。",
    secondName: "主持人临时救场",
    secondDetail: "嘉宾还没到，你需要把台上的三十秒变得像原计划。",
  },
  {
    id: "flag_roles",
    stage: "启航",
    title: "升旗仪式岗位亮相",
    brief: "学生协会要公开宣布岗位，名字、站位和职责不能对不上。",
    profile: "transition",
    firstName: "确认每个人的岗位",
    firstDetail: "把轮岗结果变成一张所有人都看得懂的站位表。",
    secondName: "上台宣布岗位",
    secondDetail: "在全校面前把新团队介绍清楚，也给没被看见的人留位置。",
  },
  {
    id: "association_recruitment",
    stage: "启航",
    title: "学生协会招新与部员大会",
    brief: "第二届学生协会成立，新部员需要被招进来，也需要知道自己为什么在这里。",
    profile: "transition",
    firstName: "设计招新小游戏",
    firstDetail: "不只收报名表，让候选人现场试一次真实任务。",
    secondName: "主持第一次部员大会",
    secondDetail: "把部门目标、合作方式和第一项任务讲明白。",
  },
  {
    id: "teachers_day",
    stage: "探索",
    title: "教师节小活动",
    brief: "活动要有心意，但不能把感谢做成新的形式主义作业。",
    profile: "culture",
    firstName: "收集感谢小故事",
    firstDetail: "让每个人写一句真实的小事，再从中整理活动内容。",
    secondName: "准备教师节惊喜",
    secondDetail: "用最少打扰完成布置，并在上课前恢复现场。",
  },
  {
    id: "ocr_awards",
    stage: "探索",
    title: "O/C/R 奖申报",
    brief: "材料、故事和证据都要对得上，漂亮包装不能替代真实经历。",
    profile: "recognition",
    firstName: "整理申报材料",
    firstDetail: "把零散活动记录变成可核验的项目故事。",
    secondName: "练习回答问题",
    secondDetail: "让同伴专挑漏洞，提前发现最难回答的问题。",
  },
  {
    id: "lawn_music_festival",
    stage: "探索",
    title: "草坪音乐节",
    brief: "节目、音响、草地和周边摊位同时开工，浪漫背后全是执行细节。",
    profile: "culture",
    firstName: "安排节目和摊位",
    firstDetail: "避免观众、候场和摊位排队挤在同一条路上。",
    secondName: "守住舞台与小摊",
    secondDetail: "临时处理串场、缺货和音响失灵，让现场继续流动。",
  },
  {
    id: "autumn_sports_meet",
    stage: "探索",
    title: "秋季运动会",
    brief: "比赛、检录、志愿岗和班级情绪一起升温，任何空岗都会被看见。",
    profile: "sports",
    firstName: "安排比赛项目和志愿者",
    firstDetail: "按体能和意愿分配任务，别让能跑的人只负责搬水。",
    secondName: "处理现场混乱",
    secondDetail: "检录提前、物资走错，你决定先救最影响全局的一环。",
  },
  {
    id: "new_year_ted",
    stage: "沉淀",
    title: "新年 TED",
    brief: "演讲之间穿插优雅节目，既要有观点，也不能让节奏掉到地上。",
    profile: "recognition",
    firstName: "修改演讲稿",
    firstDetail: "删掉空话，用一个具体校园瞬间撑起整段表达。",
    secondName: "安排节目顺序",
    secondDetail: "节目临时延长，你要重新安排演讲与表演的衔接。",
  },
  {
    id: "whale_award",
    stage: "蓄力",
    title: "领航鲸英奖报名",
    brief: "真正值得被看见的贡献，常常散落在没有镜头的日常里。",
    profile: "recognition",
    firstName: "推荐认真做事的人",
    firstDetail: "从长期服务和实际影响出发，而不是只看谁最会写材料。",
    secondName: "补全报名材料",
    secondDetail: "补齐数据、见证和反思，让申报不只剩漂亮形容词。",
  },
  {
    id: "charity_market",
    stage: "践行",
    title: "爱心义卖・庠序世集",
    brief: "摊位不仅要热闹，定价、公益去向和收支透明同样重要。",
    profile: "service",
    firstName: "准备义卖摊位",
    firstDetail: "把售卖内容、成本和公益目标写在同一张计划里。",
    secondName: "清点收入并公开去向",
    secondDetail: "收摊后公开数字，让每一笔收入都能被追溯。",
  },
  {
    id: "committee_election",
    stage: "绽放 & 传承",
    title: "常委换届竞选",
    brief: "报名和公开竞选同时到来，承诺要经得起下一届真正执行。",
    profile: "transition",
    firstName: "准备竞选发言",
    firstDetail: "把口号改成目标、资源和能被检查的时间点。",
    secondName: "回答现场提问",
    secondDetail: "不绕开质疑，说明你会如何处理资源冲突和团队分歧。",
  },
  {
    id: "culture_week",
    stage: "绽放 & 传承",
    title: "文化周",
    brief: "不同班级和社团都想表达自己，主题需要统一，内容不能变成复制粘贴。",
    profile: "culture",
    firstName: "准备文化周展览",
    firstDetail: "为不同内容找到共同线索，也保留各自真正的差异。",
    secondName: "处理节目时间冲突",
    secondDetail: "两个节目同时到场，临时协调空间、时间和观众动线。",
  },
  {
    id: "coming_of_age_awards",
    stage: "绽放 & 传承",
    title: "成人礼暨领航鲸英颁奖",
    brief: "成长叙事和颁奖流程挤在同一场典礼里，情绪需要真实而克制。",
    profile: "recognition",
    firstName: "采访一段成长故事",
    firstDetail: "从一次失败和一次改变入手，拒绝套用标准答案。",
    secondName: "核对颁奖名单",
    secondDetail: "名单、奖项和上台顺序临时变化，你要保证没有人被叫错。",
  },
  {
    id: "committee_handover",
    stage: "绽放 & 传承",
    title: "常委换届交接",
    brief: "真正的交接不是传一个文件夹，而是让下一届能独立解决问题。",
    profile: "transition",
    firstName: "整理交接注意事项",
    firstDetail: "除了成功经验，也把踩过的坑和未解决的问题留下。",
    secondName: "带新常委做一次",
    secondDetail: "让新团队亲手做一次，你只在关键节点提供支持。",
  },
  {
    id: "service_expansion",
    stage: "践行",
    title: "服务部合作项目拓展",
    brief: "同星关爱与快乐家园已有固定合作，下一步要寻找真正需要的新项目。",
    profile: "service",
    firstName: "寻找新的服务项目",
    firstDetail: "先访谈需求方，不用熟悉的活动模板替别人定义问题。",
    secondName: "先做一次小活动",
    secondDetail: "控制人数和承诺范围，用真实反馈决定是否继续。",
  },
  {
    id: "rotation_matching",
    stage: "启航",
    title: "轮岗与岗位匹配",
    brief: "工作计划、个人意愿和岗位能力需要同时被看见，不能只按空缺塞人。",
    profile: "organization",
    firstName: "问清大家想做什么",
    firstDetail: "让每个人说明想做什么、做过什么，以及想学会什么。",
    secondName: "试做不同岗位",
    secondDetail: "先用短任务验证匹配，再决定正式岗位。",
  },
  {
    id: "next_term_planning",
    stage: "蓄力",
    title: "下学期活动准备梳理",
    brief: "活动清单越长，越需要看见时间冲突、负责人负荷和真正的优先级。",
    profile: "organization",
    firstName: "检查活动是否撞时间",
    firstDetail: "把筹备周期、场地和负责人放在一张图上找重叠。",
    secondName: "删掉不重要的安排",
    secondDetail: "用影响而不是惯例做判断，为团队留出真实余量。",
  },
];

const CAMPUS_CHOICE_STYLES = {
  plan: {
    detail: "先把步骤想清楚，出错机会较少。",
    student: [["wisdom", 1], ["homeroomTrust", 1], ["mood", -1]],
    teacher: [["authority", 1], ["gradeTrust", 1], ["teacherStamina", -1]],
  },
  creative: {
    detail: "做法更新鲜，现场气氛会更好。",
    student: [["mood", 1], ["wisdom", 1], ["stamina", -1]],
    teacher: [["teacherMood", 1], ["studentFavor", 1], ["teacherStamina", -1]],
  },
  teamwork: {
    detail: "靠大家一起完成，关系会变好。",
    student: [["peerFavor", 1], ["mood", 1], ["stamina", -1]],
    teacher: [["studentFavor", 1], ["teacherMood", 1], ["teacherStamina", -1]],
  },
  recover: {
    detail: "少做一点，能恢复状态，但会损失信任。",
    student: [["stamina", 1], ["mood", 1], ["homeroomTrust", -1]],
    teacher: [["teacherStamina", 1], ["teacherMood", 1], ["gradeTrust", -1]],
  },
  leadership: {
    detail: "主动负责，大家会更信任你，但很累。",
    student: [["homeroomTrust", 1], ["peerFavor", 1], ["stamina", -2]],
    teacher: [["gradeTrust", 1], ["studentFavor", 1], ["teacherStamina", -2]],
  },
  honest: {
    detail: "把真实情况说清楚，信任会上升。",
    student: [["homeroomTrust", 1], ["mood", 1], ["wisdom", -1]],
    teacher: [["gradeTrust", 1], ["studentFavor", 1], ["authority", -1]],
  },
  bold: {
    detail: "直接上场解决，痛快但会消耗体能。",
    student: [["mood", 1], ["peerFavor", 1], ["stamina", -2]],
    teacher: [["teacherMood", 1], ["studentFavor", 1], ["teacherStamina", -2]],
  },
  service: {
    detail: "先照顾别人，两种关系都会改善。",
    student: [["peerFavor", 1], ["homeroomTrust", 1], ["stamina", -1]],
    teacher: [["studentFavor", 1], ["gradeTrust", 1], ["teacherStamina", -1]],
  },
  focus: {
    detail: "专心把结果做好，能力提升但压力更大。",
    student: [["wisdom", 1], ["stamina", -1], ["mood", -1]],
    teacher: [["authority", 1], ["teacherStamina", -1], ["teacherMood", -1]],
  },
  physical: {
    detail: "亲自上场，体能和心情都会提升。",
    student: [["stamina", 2], ["mood", 1], ["wisdom", -1]],
    teacher: [["teacherStamina", 2], ["teacherMood", 1], ["authority", -1]],
  },
  social: {
    detail: "靠人气推动活动，关系提升但会分心。",
    student: [["peerFavor", 1], ["mood", 1], ["wisdom", -1]],
    teacher: [["studentFavor", 1], ["teacherMood", 1], ["authority", -1]],
  },
  careful: {
    detail: "仔细处理细节，状态变化不大。",
    student: [["wisdom", 1], ["stamina", 1], ["mood", -1]],
    teacher: [["authority", 1], ["teacherStamina", 1], ["teacherMood", -1]],
  },
  risky: {
    detail: "直接追求更高结果，但会同时消耗体能和心情。",
    student: [["wisdom", 1], ["peerFavor", 1], ["stamina", -2], ["mood", -2]],
    teacher: [["authority", 1], ["studentFavor", 1], ["teacherStamina", -2], ["teacherMood", -2]],
  },
};

const CAMPUS_ACTIVITY_OPTIONS = {
  opening_ceremony: {
    first: [["完整彩排一遍", "plan"], ["让学生即兴开场", "creative"], ["删掉一半流程", "recover"]],
    second: [["自己上台救场", "bold"], ["请乐队临时加演", "teamwork"], ["暂停五分钟等嘉宾", "careful"]],
  },
  flag_roles: {
    first: [["按能力分岗位", "plan"], ["让大家自己选岗位", "social"], ["抽签决定岗位", "risky"]],
    second: [["一次公布所有岗位", "leadership"], ["允许现场交换岗位", "teamwork"], ["暂缓有争议的岗位", "honest"]],
  },
  association_recruitment: {
    first: [["办现场体验任务", "creative"], ["看报名表筛人", "focus"], ["请老部员推荐", "teamwork"]],
    second: [["介绍每个部门", "leadership"], ["先玩破冰游戏", "social"], ["直接发第一周任务", "plan"]],
  },
  teachers_day: {
    first: [["收集真实小故事", "honest"], ["买统一小礼物", "service"], ["拍搞笑祝福视频", "creative"]],
    second: [["课前秘密布置", "teamwork"], ["当面读感谢信", "bold"], ["只发一张电子卡", "recover"]],
  },
  ocr_awards: {
    first: [["按数据整理材料", "plan"], ["重点写个人故事", "honest"], ["临时补一个项目", "risky"]],
    second: [["模拟正式答辩", "focus"], ["请朋友专门挑错", "teamwork"], ["不准备，现场发挥", "bold"]],
  },
  lawn_music_festival: {
    first: [["先排节目顺序", "plan"], ["先抢热门摊位", "risky"], ["让乐队自己安排", "creative"]],
    second: [["守住舞台和音响", "careful"], ["去小摊帮忙", "service"], ["跟观众一起热场", "social"]],
  },
  autumn_sports_meet: {
    first: [["按实力安排项目", "focus"], ["让大家自愿报名", "social"], ["把希望全押在接力", "risky"]],
    second: [["亲自参加比赛", "physical"], ["去做检录志愿者", "service"], ["在看台带队加油", "social"]],
  },
  new_year_ted: {
    first: [["讲一次真实失败", "honest"], ["讲自己的研究成果", "focus"], ["做一场互动演讲", "creative"]],
    second: [["自己上台填空", "bold"], ["临时加一个小表演", "creative"], ["缩短后面的节目", "plan"]],
  },
  whale_award: {
    first: [["推荐默默服务的人", "service"], ["推荐成绩最好的人", "focus"], ["向全校公开征集", "social"]],
    second: [["用数据写报名材料", "plan"], ["用故事打动评委", "honest"], ["请老师一起修改", "teamwork"]],
  },
  charity_market: {
    first: [["卖自己做的小物件", "creative"], ["办二手交换摊", "service"], ["高价卖限量款", "risky"]],
    second: [["公开每一笔收入", "honest"], ["把钱交给负责老师", "careful"], ["当场宣布捐赠结果", "leadership"]],
  },
  committee_election: {
    first: [["只承诺三件能做到的事", "honest"], ["提出一次大胆改革", "bold"], ["主打人气拉票", "social"]],
    second: [["正面回答所有问题", "leadership"], ["请队友一起补充", "teamwork"], ["避开有争议的问题", "recover"]],
  },
  culture_week: {
    first: [["做跨班主题展览", "creative"], ["办一场舞台演出", "bold"], ["做安静体验活动", "careful"]],
    second: [["重新安排节目时间", "plan"], ["让两个节目一起演", "teamwork"], ["临时取消一个节目", "leadership"]],
  },
  coming_of_age_awards: {
    first: [["采访同学成长故事", "honest"], ["做一段照片回顾", "creative"], ["只准备官方流程", "plan"]],
    second: [["逐个核对颁奖名单", "careful"], ["安慰没有获奖的同学", "service"], ["临时调整颁奖顺序", "leadership"]],
  },
  committee_handover: {
    first: [["写清楚所有踩过的坑", "honest"], ["只交成功活动模板", "plan"], ["开会口头讲一遍", "recover"]],
    second: [["让新人独立完成", "leadership"], ["陪新人一步步做", "teamwork"], ["出问题时再来救场", "bold"]],
  },
  service_expansion: {
    first: [["先问社区真正需要什么", "service"], ["复制已有合作模式", "plan"], ["选择最热门的项目", "social"]],
    second: [["先做一次小范围测试", "careful"], ["一次招很多志愿者", "risky"], ["和老合作方一起做", "teamwork"]],
  },
  rotation_matching: {
    first: [["按兴趣分岗位", "social"], ["做能力测试再分岗", "focus"], ["直接随机轮岗", "bold"]],
    second: [["每个岗位试做两天", "careful"], ["不合适就马上换", "honest"], ["先固定岗位一个月", "plan"]],
  },
  next_term_planning: {
    first: [["先查所有时间冲突", "plan"], ["让各部门自己报计划", "social"], ["只定最重要的三件事", "focus"]],
    second: [["删掉重复活动", "honest"], ["延后最难做的活动", "recover"], ["全部保留，大家硬扛", "risky"]],
  },
};

CAMPUS_ACTIVITY_POOL.forEach((activity) => {
  const phases = CAMPUS_ACTIVITY_OPTIONS[activity.id];
  ["first", "second"].forEach((phase) => {
    const choices = phases?.[phase] || [];
    const names = new Set(choices.map(([name]) => name));
    const stylesAreValid = choices.every(([, styleId]) => Boolean(CAMPUS_CHOICE_STYLES[styleId]));
    if (choices.length !== 3 || names.size !== 3 || !stylesAreValid) {
      throw new Error(`Campus activity options are incomplete: ${activity.id}/${phase}`);
    }
  });
});

const CODEX_EVENTS = [
  { id: "event_phone_check", name: "班主任突然查手机", type: "普通事件", route: "学生", hint: "手机检查、信任和备用机会影响结果。" },
  { id: "event_reading_journal_deadline", name: "Reading Journal 截止前一天", type: "普通事件", route: "学生", hint: "作业压力会牵动智慧和信任。" },
  { id: "event_missing_groupmate", name: "小组作业队友失踪", type: "普通事件", route: "学生", hint: "同学关系会改变小组作业的收益。" },
  { id: "event_school_wifi_broken", name: "学校 WiFi 炸了", type: "普通事件", route: "通用", hint: "智慧或威严足够高时会出现特殊解法。" },
  { id: "event_wandering_canteen_chef", name: "食堂游荡大厨", type: "普通事件 / 神秘 NPC", route: "通用", hint: "对饭菜的评价会改变下一次食堂体验。" },
  { id: "event_teacher_good_mood_today", name: "老师今天心情不错", type: "稀有事件", route: "通用", hint: "短暂的好运会给下一次行动留余地。" },
  { id: "event_mysterious_substitute_teacher", name: "神秘代课老师", type: "稀有事件", route: "学生", hint: "自由活动时间适合补短板。" },
  { id: "event_traffic_jam", name: "堵车", type: "稀有事件", route: "学生", hint: "走读生更容易遇到交通考验。" },
  { id: "event_grade_inspection", name: "年级巡查", type: "稀有事件", route: "通用", hint: "巡查会放大被发现的风险。" },
  { id: "event_dorm_inspection", name: "宿管巡查", type: "身份事件", route: "住宿生", hint: "住宿生夜间生活的代价。" },
  { id: "event_evening_study_quiet", name: "晚自习突然安静", type: "晚自习事件", route: "住宿生", hint: "心情太低时安静也未必学得进去。" },
  { id: "event_dorm_late_night_chat", name: "宿舍夜谈失控", type: "晚自习事件", route: "住宿生", hint: "关系提升常常会交换体能。" },
  { id: "event_after_lights_out_homework", name: "熄灯后继续写作业", type: "晚自习事件", route: "住宿生", hint: "作业推进会增加 AI 事件机会。" },
  { id: "event_ai_choice", name: "AI 事件", type: "AI 事件", route: "学生", hint: "不同用法会长期改变 AI 使用习惯。" },
  { id: "event_final_project_ai_choice", name: "全科期末 Project", type: "终极 Boss", route: "学生", hint: "期末 Project 必定检验 AI 使用习惯。" },
  { id: "event_homework_grading_hell", name: "批作业地狱", type: "教师专属事件", route: "教师", hint: "批作业越多，越容易进入红笔深水区。" },
  { id: "event_student_rebellion", name: "学生起义", type: "教师专属事件", route: "教师", hint: "拖堂、突击检查和学生好感会共同影响风险。" },
  { id: "event_devil_teacher", name: "恶魔教师事件", type: "教师专属事件", route: "教师", hint: "连续低分试卷会改变学生对你的称呼。" },
  { id: "event_temporary_grade_group_task", name: "年级组临时任务", type: "教师专属事件", route: "教师", hint: "年级组信任太低时，杂活会想起你。" },
  { id: "event_teacher_does_not_want_work_today", name: "老师今天不想上班", type: "教师专属事件", route: "教师", hint: "教师心情过低时会触发额外波动。" },
  { id: "event_grade_director_random_check", name: "步履轻盈的年级主任", type: "神秘 NPC", route: "通用", hint: "他经常在你意识到之前出现。" },
  { id: "event_ray_teacher_parrot", name: "Ray 老师的鹦鹉", type: "神秘 NPC", route: "学生", hint: "被选中过多次会留下校园传说。" },
  { id: "event_turtle_incident", name: "被同学砸死（乌龟）", type: "彩蛋事件", route: "学生", hint: "低心情与低同学好感下，命运会很抽象。" },
  { id: "event_special_shop", name: "特殊商店", type: "道具系统", route: "学生", hint: "第 4 周和第 8 周可能买到备用机。" },
  { id: "event_ivy_choice", name: "藤校录取", type: "结局选择", route: "学生", hint: "足够亮眼时，选择本身也会成为结局。" },
];

const ENDINGS = {
  ending_complete_madness: {
    priority: 1000,
    route: "student",
    title: "《彻底疯狂》",
    text: "你看着钉钉和微信群消息同时亮起。\n世界安静了。\n你笑了。\n\n系统提示：\n你已退出正常人类行为模式。",
  },
  ending_teacher_complete_madness: {
    priority: 990,
    route: "teacher",
    title: "《教师版彻底疯狂》",
    text: "你看着一摞没批完的作业。\n一摞新的作业。\n一摞学生补交的作业。\n你突然理解了宇宙的虚无。\n\n系统评价：\n你已退出教师行为模式。",
  },
  ending_ai_graduates_for_me: {
    priority: 950,
    route: "student",
    title: "《AI 替我毕业》",
    text: "毕业致谢：\n“感谢豆包对本文的大力支持。”\n\n系统评价：\n你没有完成高中，高中被自动生成了。",
  },
  ending_disappeared_person: {
    priority: 940,
    route: "student",
    title: "《消失的人》",
    text: "毕业那天，大家翻看合照。\n有人问：\n“这个人是谁？”\n没有人回答。\n\n系统评价：\n你不是毕业了，你淡出了。",
  },
  ending_transfer: {
    priority: 930,
    route: "student",
    title: "《转学》",
    text: "你离开了这所学校。\n走之前，你看了一眼熟悉的教学楼、食堂和永远写不完的作业。\n\n系统评价：\n有时候，逃跑不是失败，是换地图。",
  },
  ending_jingdezhen_resident: {
    priority: 900,
    route: "student",
    title: "《景德镇常住居民》",
    text: "第三次来到景德镇时，你已经不需要老师介绍流程了。\n你熟悉路线，熟悉集合点，甚至熟悉泥土的湿度。\n\n系统评价：\n你已经学会自己烧瓷了。",
  },
  ending_campus_legend_student: {
    priority: 850,
    route: "student",
    title: "《校园传说》",
    text: "毕业时，所有老师都认识你。\n有人认识你是因为成绩。\n有人认识你是因为活动。\n有人认识你是因为冷笑话。\n有人认识你是因为你被鹦鹉选中过三次。\n\n系统评价：\n你离开了校园，但你已经成为了校园传说的一部分。",
  },
  ending_campus_legend_teacher: {
    priority: 840,
    route: "teacher",
    title: "《校园传说》",
    text: "多年以后，学生仍然会在走廊传说中提到你。\n有人说你拖堂拖到天荒地老。\n有人说你的试卷让人怀疑人生。\n有人说你的红笔拥有独立人格。\n\n系统评价：\n你是校园生态系统中的高阶生物。",
  },
  ending_teacher_lost_authority: {
    priority: 675,
    route: "teacher",
    title: "《讲台透明人》",
    text: "你站在讲台上，声音穿过教室，却没有落在任何人心里。\n学生没有反抗你。\n他们只是默认你不存在。\n\n系统评价：\n教学威严归零时，普通下班也会变成一种沉默事故。",
  },
  ending_teacher_student_favor_zero: {
    priority: 680,
    route: "teacher",
    title: "《全班静音》",
    text: "你走进教室，所有人同时低头。\n不是在学习。\n是在用沉默表达一种非常整齐的抗议。\n\n系统评价：\n学生好感跌到危险线时，课堂不会爆炸，只会变成一间没有回声的房间。",
  },
  ending_teacher_grade_group_zero: {
    priority: 678,
    route: "teacher",
    title: "《年级组黑名单》",
    text: "年级组会议上，所有人都默契地跳过了你的名字。\n不是忘了你。\n是他们已经把你归进了另一个文件夹。\n\n系统评价：\n年级组信任度归零时，你很难再被称为普通教师。",
  },
  ending_reject_ivy: {
    priority: 800,
    route: "student",
    title: "《藤校拒了我，但我拒了藤校》",
    text: "你看着藤校录取通知书，缓缓点击拒绝。\n系统震惊。\n班主任震惊。\n同学震惊。\n你说：\n“我要追寻更抽象的人生。”\n\n系统评价：\n你选择让命运看不懂你。",
  },
  ending_ivy_admission: {
    priority: 790,
    route: "student",
    title: "《藤校录取》",
    text: "录取邮件弹出的那一刻，你沉默了三秒。\n然后你开始截图、转发、发朋友圈、假装冷静。",
  },
  ending_top50_normal: {
    priority: 780,
    route: "student",
    title: "《TOP50，正常发挥》",
    text: "你正常发挥，正常焦虑，正常申请，正常等待，正常收到一个还不错的结果。\n\n系统评价：\n人生没有爆炸，但也没有坍塌。这已经很了不起了。",
  },
  ending_wcu_admission: {
    priority: 770,
    route: "student",
    title: "《WCU（Wild Chicken University）录取》",
    text: "恭喜你被 WCU 录取。\nWild Chicken University 欢迎每一个相信奇迹的人。\n\n系统评价：\n虽然不知道它在哪，但至少它要你。",
  },
  ending_no_school: {
    priority: 760,
    route: "student",
    title: "《没学上了》",
    text: "你盯着成绩单，成绩单也盯着你。\n你们都沉默了。\n\n系统评价：\n知识没有抛弃你，你却先放开了它的手。",
  },
  ending_lifelong_friends: {
    priority: 700,
    route: "student",
    title: "《收获一群终身挚友》",
    text: "毕业那天，你们拍了很多照片。\n有些人去了不同国家，有些人去了不同城市。\n但你知道，很多年后再见面，你们还是会聊起那顿神秘食堂菜品和那次小组作业队友失踪。\n\n系统评价：\n你通关的不是学校，是关系树。",
  },
  ending_lone_wolf: {
    priority: 690,
    route: "student",
    title: "《独狼》",
    text: "毕业照里，大家都找到了自己的小团体。\n你也找到了。\n是空气。\n\n系统评价：\n你完成了社交断舍离。",
  },
  ending_sports_legend: {
    priority: 720,
    route: "student",
    title: "《校运会传奇》",
    text: "你站在操场上，风吹过跑道。\n那一刻，所有人都知道：\n成绩单会过期，但校运会传说不会。\n\n系统评价：\n你用体能属性打穿了学术副本。",
  },
  ending_red_pen_war_god: {
    priority: 650,
    route: "teacher",
    title: "《红笔战神》",
    text: "你的红笔划过纸面。\n那不是批注，是战斗痕迹。",
  },
  ending_devil_teacher: {
    priority: 640,
    route: "teacher",
    title: "《恶魔教师》",
    text: "学生看见你的试卷，像看见命运的宣判书。",
  },
  ending_student_moonlight_teacher: {
    priority: 630,
    route: "teacher",
    title: "《学生心中的白月光》",
    text: "多年后，学生想起你时，记得的不只是知识点，还有你曾经放过他们一马。\n\n系统评价：\n你治愈了课堂。",
  },
  ending_grade_group_hidden_boss: {
    priority: 620,
    route: "teacher",
    title: "《年级组隐藏 Boss》",
    text: "年级主任看向你，点了点头。\n你知道，从这一刻开始，你已经不是普通老师。\n\n系统评价：\n你进入了学校管理系统副本。",
  },
  ending_ordinary_graduate: {
    priority: 100,
    route: "both",
    title: "《普通毕业生》",
    text: "你普通地完成了这个学期。\n普通地交了作业。\n普通地考完试。\n普通地活了下来。\n\n系统评价：\n在 Schooltopia，普通通关本身就是一种隐藏成就。",
  },
};

const EVENT_META = {
  event_traffic_jam: { notInRandomPool: true },
  event_dorm_inspection: { uniquePerWeek: true },
  event_grade_inspection: { uniquePerWeek: true },
  event_grade_director_random_check: { uniquePerWeek: true },
  event_special_shop: { uniquePerWeek: true },
};

const setup = {
  route: "student",
  identity: "commuter",
  difficulty: "standard",
  points: 10,
  stats: {},
};

let game = null;
let activeEventDone = null;
let activeEvent = null;
let lastFocusedElement = null;
let codexLastFocusedElement = null;
let activeOptionButtons = [];
let activeCodexTab = "events";
let codexReturnView = "setup";
let metaSave = loadMetaSave();
let soundEnabled = readSoundPreference();
let musicEnabled = readMusicPreference();
let audioContext = null;
let musicGain = null;
let musicTimer = 0;
let playgroundSources = [];
let audioUnlocked = false;
let lastStatSoundAt = 0;

const SAVE_SLOT_COUNT = 3;
const SAVE_STORAGE_PREFIX = "schooltopia_game_save_slot_";
const INHERITED_MEMORY_KEY = "schooltopia_inherited_memory_v1";
const SAVE_PHASES = new Set(["daily", "daily_skip", "lunch"]);

const dom = {
  routeButtons: document.getElementById("routeButtons"),
  soundToggle: document.getElementById("soundToggle"),
  soundLabel: document.getElementById("soundLabel"),
  musicToggle: document.getElementById("musicToggle"),
  musicLabel: document.getElementById("musicLabel"),
  identityButtons: document.getElementById("identityButtons"),
  difficultyButtons: document.getElementById("difficultyButtons"),
  difficultyLabel: document.getElementById("difficultyLabel"),
  inheritedMemoryBanner: document.getElementById("inheritedMemoryBanner"),
  inheritedMemoryName: document.getElementById("inheritedMemoryName"),
  clearInheritedMemory: document.getElementById("clearInheritedMemory"),
  pointsLeft: document.getElementById("pointsLeft"),
  attributeSetup: document.getElementById("attributeSetup"),
  recommendedSetup: document.getElementById("recommendedSetup"),
  startGame: document.getElementById("startGame"),
  saveSlotList: document.getElementById("saveSlotList"),
  openCodexSetup: document.getElementById("openCodexSetup"),
  setupView: document.getElementById("setupView"),
  gameView: document.getElementById("gameView"),
  endingView: document.getElementById("endingView"),
  codexView: document.getElementById("codexView"),
  closeCodex: document.getElementById("closeCodex"),
  codexSummary: document.getElementById("codexSummary"),
  codexGrid: document.getElementById("codexGrid"),
  codexTabs: [...document.querySelectorAll(".codex-tab")],
  resetCodexEvents: document.getElementById("resetCodexEvents"),
  resetCodexEndings: document.getElementById("resetCodexEndings"),
  resetCodexAchievements: document.getElementById("resetCodexAchievements"),
  resetCodexAll: document.getElementById("resetCodexAll"),
  openCodexGame: document.getElementById("openCodexGame"),
  openCodexStats: document.getElementById("openCodexStats"),
  openCodexEnding: document.getElementById("openCodexEnding"),
  routeBadge: document.getElementById("routeBadge"),
  hudTitle: document.getElementById("hudTitle"),
  hudStats: document.getElementById("hudStats"),
  roleScene: document.getElementById("roleScene"),
  statsList: document.getElementById("statsList"),
  changeFeed: document.getElementById("changeFeed"),
  changeFeedWrap: document.getElementById("changeFeedWrap"),
  aiHabitPanel: document.getElementById("aiHabitPanel"),
  statusList: document.getElementById("statusList"),
  titleList: document.getElementById("titleList"),
  achievementList: document.getElementById("achievementList"),
  itemList: document.getElementById("itemList"),
  saveHint: document.getElementById("saveHint"),
  saveInGameSlots: document.getElementById("saveInGameSlots"),
  weekLabel: document.getElementById("weekLabel"),
  phaseLabel: document.getElementById("phaseLabel"),
  actionTitle: document.getElementById("actionTitle"),
  actionSubtitle: document.getElementById("actionSubtitle"),
  actionList: document.getElementById("actionList"),
  logList: document.getElementById("logList"),
  roundState: document.getElementById("roundState"),
  eventModal: document.getElementById("eventModal"),
  eventTitle: document.getElementById("eventTitle"),
  eventType: document.getElementById("eventType"),
  eventDescription: document.getElementById("eventDescription"),
  eventOptions: document.getElementById("eventOptions"),
  endingTitle: document.getElementById("endingTitle"),
  endingText: document.getElementById("endingText"),
  endingScore: document.getElementById("endingScore"),
  endingRarity: document.getElementById("endingRarity"),
  endingVerdict: document.getElementById("endingVerdict"),
  endingChronicle: document.getElementById("endingChronicle"),
  memoryOptions: document.getElementById("memoryOptions"),
  memoryStatus: document.getElementById("memoryStatus"),
  restartGame: document.getElementById("restartGame"),
  restartInGame: document.getElementById("restartInGame"),
  systemLine: document.getElementById("systemLine"),
  canvas: document.getElementById("campusCanvas"),
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChance(percent) {
  return Math.random() * 100 < clamp(percent, 0, 100);
}

function difficultyChance(percent, kind = "event") {
  const difficulty = difficultyConfig(game?.difficulty || setup.difficulty);
  const multiplier = kind === "rare" ? difficulty.rareMultiplier : difficulty.eventMultiplier;
  const schoolMultiplier = window.Schooltopia?.getEventMultiplier?.() || 1;
  return clamp(Math.round(percent * multiplier * schoolMultiplier), 0, 100);
}

function randomChoice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffledCampusActivityIds() {
  const ids = CAMPUS_ACTIVITY_POOL.map((activity) => activity.id);
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(0, index);
    [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
  }
  return ids;
}

function readSoundPreference() {
  try {
    return localStorage.getItem("schooltopia_sound_enabled") === "true";
  } catch {
    return false;
  }
}

function readMusicPreference() {
  try {
    return localStorage.getItem("schooltopia_music_enabled") === "true";
  } catch {
    return false;
  }
}

function saveSoundPreference() {
  try {
    localStorage.setItem("schooltopia_sound_enabled", soundEnabled ? "true" : "false");
  } catch {
    // Sound preference is optional; the game should continue without storage.
  }
}

function saveMusicPreference() {
  try {
    localStorage.setItem("schooltopia_music_enabled", musicEnabled ? "true" : "false");
  } catch {
    // Music preference is optional; the game should continue without storage.
  }
}

function syncSoundToggle() {
  if (!dom.soundToggle || !dom.soundLabel) return;
  dom.soundToggle.setAttribute("aria-pressed", soundEnabled ? "true" : "false");
  dom.soundLabel.textContent = soundEnabled ? "音效 开" : "音效 关";
}

function syncMusicToggle() {
  if (!dom.musicToggle || !dom.musicLabel) return;
  dom.musicToggle.setAttribute("aria-pressed", musicEnabled ? "true" : "false");
  dom.musicLabel.textContent = musicEnabled ? "音乐 开" : "音乐 关";
}

function ensureAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume?.().catch(() => {});
  return audioContext;
}

function getAudioContext() {
  if (!soundEnabled) return null;
  return ensureAudioContext();
}

const SOUND_VOLUME = 1.9;

function playTone(frequency, duration = 0.08, options = {}) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + (options.delay || 0);
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = options.type || "sine";
  oscillator.frequency.setValueAtTime(frequency, now);
  if (options.slide) {
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, frequency + options.slide), now + duration);
  }
  if (options.detune) oscillator.detune.setValueAtTime(options.detune, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.min(0.14, (options.gain || 0.035) * SOUND_VOLUME), now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function playNoise(duration = 0.08, options = {}) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + (options.delay || 0);
  const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    const decay = 1 - i / data.length;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  filter.type = options.filter || "bandpass";
  filter.frequency.setValueAtTime(options.frequency || 900, now);
  filter.Q.setValueAtTime(options.q || 1.8, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.min(0.12, (options.gain || 0.026) * SOUND_VOLUME), now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
  source.stop(now + duration + 0.02);
}

function playKeyboardSound() {
  playNoise(0.045, { filter: "highpass", frequency: 1850, q: 1.1, gain: 0.018 });
  playNoise(0.035, { filter: "bandpass", frequency: 920, q: 2.8, gain: 0.012, delay: 0.055 });
  playTone(310, 0.035, { type: "triangle", gain: 0.009, delay: 0.016, slide: -45 });
}

function playPaperSound() {
  playNoise(0.34, { filter: "bandpass", frequency: 1150, q: 0.72, gain: 0.024 });
  playNoise(0.26, { filter: "highpass", frequency: 1750, q: 0.55, gain: 0.014, delay: 0.12 });
  playNoise(0.18, { filter: "bandpass", frequency: 760, q: 0.9, gain: 0.012, delay: 0.25 });
}

function playSchoolBell() {
  [784, 988, 784].forEach((frequency, index) => {
    playTone(frequency, 0.72, { type: "sine", gain: 0.022, delay: index * 0.34 });
    playTone(frequency * 2.01, 0.48, { type: "triangle", gain: 0.007, delay: index * 0.34 + 0.012 });
  });
}

function startPlaygroundAmbience() {
  if (!soundEnabled || playgroundSources.length || document.hidden) return;
  const ctx = ensureAudioContext();
  if (!ctx) return;
  const duration = 4;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let smooth = 0;
  for (let index = 0; index < data.length; index += 1) {
    smooth = smooth * 0.985 + (Math.random() * 2 - 1) * 0.015;
    data[index] = smooth;
  }
  const source = ctx.createBufferSource();
  const lowpass = ctx.createBiquadFilter();
  const bandpass = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  source.loop = true;
  lowpass.type = "lowpass";
  lowpass.frequency.value = 620;
  bandpass.type = "bandpass";
  bandpass.frequency.value = 260;
  bandpass.Q.value = 0.45;
  gain.gain.value = 0.018;
  source.connect(lowpass);
  lowpass.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);
  source.start();
  playgroundSources = [source, gain];
}

function stopPlaygroundAmbience() {
  const [source, gain] = playgroundSources;
  if (gain && audioContext) {
    gain.gain.cancelScheduledValues(audioContext.currentTime);
    gain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.12);
  }
  if (source) {
    window.setTimeout(() => {
      try { source.stop(); } catch { /* Already stopped. */ }
    }, 420);
  }
  playgroundSources = [];
}

function midiFrequency(note) {
  return 440 * (2 ** ((note - 69) / 12));
}

function scheduleMusicNote(ctx, note, start, duration, gainValue = 0.02, type = "sine") {
  if (!musicGain) return;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(midiFrequency(note), start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.08);
  gain.gain.setTargetAtTime(0.0001, start + Math.max(0.16, duration - 0.38), 0.18);
  oscillator.connect(gain);
  gain.connect(musicGain);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.4);
}

function scheduleGymnopedieLoop() {
  if (!musicEnabled || document.hidden) return;
  const ctx = ensureAudioContext();
  if (!ctx) return;
  if (!musicGain) {
    musicGain = ctx.createGain();
    musicGain.gain.value = 0.0001;
    musicGain.connect(ctx.destination);
  }
  const now = ctx.currentTime;
  musicGain.gain.cancelScheduledValues(now);
  musicGain.gain.setValueAtTime(Math.max(0.0001, musicGain.gain.value), now);
  musicGain.gain.setTargetAtTime(0.62, now, 0.9);
  const beat = 0.82;
  const start = now + 0.14;
  const chords = [
    { bass: 43, notes: [55, 59, 62, 66] },
    { bass: 38, notes: [50, 54, 57, 61] },
  ];
  for (let bar = 0; bar < 16; bar += 1) {
    const chord = chords[bar % 2];
    const barStart = start + bar * beat * 3;
    scheduleMusicNote(ctx, chord.bass, barStart, beat * 2.75, 0.018, "sine");
    chord.notes.forEach((note, index) => {
      scheduleMusicNote(ctx, note, barStart + beat * 0.9, beat * 1.75, 0.0065 - index * 0.0004, "triangle");
    });
  }
  const melody = [
    [66, 0, 2], [69, 2, 1], [68, 3, 2], [66, 5, 1],
    [61, 6, 2], [59, 8, 1], [61, 9, 2], [62, 11, 1],
    [57, 12, 2], [59, 14, 1], [61, 15, 2], [62, 17, 1],
    [66, 18, 2], [64, 20, 1], [62, 21, 2], [61, 23, 1],
    [59, 24, 2], [61, 26, 1], [62, 27, 2], [66, 29, 1],
    [69, 30, 2], [68, 32, 1], [66, 33, 3],
    [61, 36, 2], [62, 38, 1], [59, 39, 2], [57, 41, 1], [54, 42, 4],
  ];
  melody.forEach(([note, offset, duration]) => {
    scheduleMusicNote(ctx, note, start + offset * beat, duration * beat * 0.94, 0.018, "sine");
    scheduleMusicNote(ctx, note + 12, start + offset * beat + 0.01, duration * beat * 0.72, 0.0032, "triangle");
  });
  window.clearTimeout(musicTimer);
  musicTimer = window.setTimeout(scheduleGymnopedieLoop, beat * 47 * 1000);
}

function stopMusic() {
  window.clearTimeout(musicTimer);
  musicTimer = 0;
  if (musicGain && audioContext) {
    const now = audioContext.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setTargetAtTime(0.0001, now, 0.18);
  }
}

function unlockAudio() {
  audioUnlocked = true;
  ensureAudioContext();
  if (musicEnabled && !musicTimer) scheduleGymnopedieLoop();
  if (soundEnabled) startPlaygroundAmbience();
}

function playSound(kind) {
  if (kind === "action") {
    playKeyboardSound();
    return;
  }
  if (kind === "event") {
    playPaperSound();
    return;
  }
  if (kind === "bell") {
    playSchoolBell();
    return;
  }
  const patterns = {
    toggle: {
      tones: [
        [520, 0.055, { type: "triangle", gain: 0.034, slide: 60 }],
        [780, 0.075, { type: "sine", gain: 0.03, delay: 0.045 }],
      ],
      noises: [[0.025, { filter: "highpass", frequency: 1200, gain: 0.012 }]],
    },
    click: {
      tones: [[440, 0.045, { type: "square", gain: 0.032, slide: -130 }]],
      noises: [[0.035, { filter: "highpass", frequency: 1600, gain: 0.018 }]],
    },
    action: {
      tones: [
        [260, 0.055, { type: "sawtooth", gain: 0.034, slide: 90 }],
        [520, 0.075, { type: "triangle", gain: 0.038, delay: 0.035 }],
        [690, 0.06, { type: "sine", gain: 0.024, delay: 0.09 }],
      ],
      noises: [[0.045, { filter: "bandpass", frequency: 760, q: 2.4, gain: 0.02 }]],
    },
    event: {
      tones: [
        [132, 0.12, { type: "sawtooth", gain: 0.042, slide: 130 }],
        [198, 0.15, { type: "triangle", gain: 0.034, delay: 0.06, slide: -35 }],
        [390, 0.08, { type: "square", gain: 0.022, delay: 0.18 }],
      ],
      noises: [[0.11, { filter: "lowpass", frequency: 520, q: 1.2, gain: 0.036, delay: 0.015 }]],
    },
    gain: {
      tones: [
        [560, 0.05, { type: "triangle", gain: 0.034, slide: 90 }],
        [760, 0.065, { type: "sine", gain: 0.032, delay: 0.04 }],
        [980, 0.055, { type: "sine", gain: 0.022, delay: 0.09 }],
      ],
      noises: [],
    },
    loss: {
      tones: [
        [310, 0.075, { type: "triangle", gain: 0.04, slide: -120 }],
        [185, 0.095, { type: "sawtooth", gain: 0.028, delay: 0.055, slide: -65 }],
      ],
      noises: [[0.065, { filter: "bandpass", frequency: 280, q: 1.5, gain: 0.02, delay: 0.02 }]],
    },
    reward: {
      tones: [
        [523, 0.06, { type: "triangle", gain: 0.04 }],
        [659, 0.07, { type: "triangle", gain: 0.04, delay: 0.055 }],
        [784, 0.08, { type: "sine", gain: 0.035, delay: 0.11 }],
        [1046, 0.12, { type: "sine", gain: 0.026, delay: 0.185 }],
      ],
      noises: [[0.055, { filter: "highpass", frequency: 1800, gain: 0.014, delay: 0.035 }]],
    },
    save: {
      tones: [
        [392, 0.055, { type: "square", gain: 0.032, slide: 70 }],
        [588, 0.075, { type: "triangle", gain: 0.034, delay: 0.048 }],
        [784, 0.06, { type: "sine", gain: 0.022, delay: 0.105 }],
      ],
      noises: [[0.028, { filter: "highpass", frequency: 2200, gain: 0.016 }]],
    },
    ending: {
      tones: [
        [147, 0.18, { type: "sawtooth", gain: 0.045, slide: 35 }],
        [220, 0.2, { type: "triangle", gain: 0.04, delay: 0.12 }],
        [330, 0.22, { type: "triangle", gain: 0.035, delay: 0.26 }],
        [494, 0.35, { type: "sine", gain: 0.028, delay: 0.42 }],
      ],
      noises: [[0.18, { filter: "lowpass", frequency: 680, gain: 0.022, delay: 0.05 }]],
    },
  };
  const pattern = patterns[kind] || patterns.click;
  pattern.tones.forEach(([frequency, duration, options]) => {
    playTone(frequency, duration, options);
  });
  pattern.noises.forEach(([duration, options]) => {
    playNoise(duration, options);
  });
}

function playStatSound(actual) {
  if (!actual) return;
  const now = performance.now?.() || Date.now();
  if (now - lastStatSoundAt < 95) return;
  lastStatSoundAt = now;
  playSound(actual > 0 ? "gain" : "loss");
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  saveSoundPreference();
  syncSoundToggle();
  if (soundEnabled) {
    playSound("toggle");
    startPlaygroundAmbience();
  } else {
    stopPlaygroundAmbience();
  }
}

function toggleMusic() {
  musicEnabled = !musicEnabled;
  saveMusicPreference();
  syncMusicToggle();
  if (musicEnabled) scheduleGymnopedieLoop();
  else stopMusic();
}

function weightedChoice(items) {
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight ?? 1;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function displayName(collection, id) {
  return collection[id]?.name || id;
}

function statLabel(statName) {
  const attrs = ATTRIBUTES[game?.route || setup.route] || [];
  return attrs.find((attr) => attr.id === statName)?.name || statName;
}

function routeConfig(route = setup.route) {
  return ROUTES.find((item) => item.id === route);
}

function difficultyConfig(id = setup.difficulty) {
  return DIFFICULTIES.find((item) => item.id === id) || DIFFICULTIES[1];
}

function setupPointTotal() {
  return difficultyConfig().setupPoints;
}

function makeStats(route) {
  return Object.fromEntries(ATTRIBUTES[route].map((attr) => [attr.id, 3]));
}

function readStoredSet(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function loadMetaSave() {
  try {
    localStorage.removeItem("schooltopia_total_ai_copy");
    return {
      totalJingdezhenRunCount: Number(localStorage.getItem("schooltopia_total_jingdezhen") || 0),
      unlockedEvents: readStoredSet("schooltopia_unlocked_events"),
      unlockedEndings: readStoredSet("schooltopia_unlocked_endings"),
      unlockedAchievements: readStoredSet("schooltopia_unlocked_achievements"),
      inheritedMemory: window.SchooltopiaRunRecap?.normalizeMemory?.(
        JSON.parse(localStorage.getItem(INHERITED_MEMORY_KEY) || "null")
      ) || null,
    };
  } catch {
    return {
      totalJingdezhenRunCount: 0,
      unlockedEvents: new Set(),
      unlockedEndings: new Set(),
      unlockedAchievements: new Set(),
      inheritedMemory: null,
    };
  }
}

function cloneMetaSave(save) {
  return {
    totalJingdezhenRunCount: Number(save.totalJingdezhenRunCount || 0),
    unlockedEvents: new Set(save.unlockedEvents || []),
    unlockedEndings: new Set(save.unlockedEndings || []),
    unlockedAchievements: new Set(save.unlockedAchievements || []),
    inheritedMemory: window.SchooltopiaRunRecap?.normalizeMemory?.(save.inheritedMemory) || null,
  };
}

function saveMetaSave() {
  const save = game?.metaSave || metaSave;
  if (!save) return;
  try {
    localStorage.setItem("schooltopia_total_jingdezhen", String(save.totalJingdezhenRunCount));
    localStorage.setItem("schooltopia_unlocked_events", JSON.stringify([...save.unlockedEvents]));
    localStorage.setItem("schooltopia_unlocked_endings", JSON.stringify([...save.unlockedEndings]));
    localStorage.setItem("schooltopia_unlocked_achievements", JSON.stringify([...save.unlockedAchievements]));
    if (save.inheritedMemory) localStorage.setItem(INHERITED_MEMORY_KEY, JSON.stringify(save.inheritedMemory));
    else localStorage.removeItem(INHERITED_MEMORY_KEY);
    metaSave = cloneMetaSave(save);
  } catch {
    if (game) addLog("本地记录暂时无法保存，但本局游戏可以继续。");
  }
}

function unlockCodex(kind, id) {
  const save = game?.metaSave || metaSave;
  const key = {
    event: "unlockedEvents",
    ending: "unlockedEndings",
    achievement: "unlockedAchievements",
  }[kind];
  if (!save || !key || save[key].has(id)) return;
  save[key].add(id);
  saveMetaSave();
  if (!dom.codexView.classList.contains("hidden")) renderCodex();
}

function saveSlotKey(slot) {
  return `${SAVE_STORAGE_PREFIX}${slot}`;
}

function readGameSaveSlot(slot) {
  try {
    const raw = localStorage.getItem(saveSlotKey(slot));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.game ? parsed : null;
  } catch {
    return null;
  }
}

function serializeSet(set) {
  return [...(set || [])];
}

function serializeGameForSave() {
  return {
    week: game.week,
    route: game.route,
    identity: game.identity,
    difficulty: game.difficulty,
    currentActionPhase: SAVE_PHASES.has(game.currentActionPhase) ? game.currentActionPhase : "daily",
    currentEnding: null,
    gameEnded: false,
    stats: { ...game.stats },
    dynamicStatuses: serializeSet(game.dynamicStatuses),
    permanentStatuses: serializeSet(game.permanentStatuses),
    titles: serializeSet(game.titles),
    achievements: serializeSet(game.achievements),
    items: serializeSet(game.items),
    flags: serializeSet(game.flags),
    endingFlags: serializeSet(game.endingFlags),
    currentWeekTriggeredEventIds: serializeSet(game.currentWeekTriggeredEventIds),
    campusActivityDeck: [...game.campusActivityDeck],
    recentChanges: [...game.recentChanges],
    recentChangedStats: serializeSet(game.recentChangedStats),
    aiHabit: { ...game.aiHabit },
    chronicle: window.SchooltopiaRunRecap?.normalizeChronicle?.(game.chronicle) || [],
    inheritedMemory: window.SchooltopiaRunRecap?.normalizeMemory?.(game.inheritedMemory) || null,
    log: [...game.log],
    counters: { ...game.counters },
    classState: { ...game.classState },
    temp: { ...game.temp },
    futurePhysicalActionBlockedWeeks: game.futurePhysicalActionBlockedWeeks,
    futureDailyActionSkippedWeeks: game.futureDailyActionSkippedWeeks,
    projectScoreModifier: game.projectScoreModifier,
  };
}

function normalizeSavePhase(phase) {
  return SAVE_PHASES.has(phase) ? phase : "daily";
}

function reviveSet(value) {
  return new Set(Array.isArray(value) ? value : []);
}

function reviveGameFromSave(save) {
  const state = save?.game;
  if (!state || !routeConfig(state.route)) return null;
  setup.route = state.route;
  setup.identity = state.identity || routeConfig(state.route).identities[0]?.id || "student";
  setup.difficulty = difficultyConfig(state.difficulty).id;
  setup.stats = { ...makeStats(setup.route), ...(state.stats || {}) };
  setup.points = 0;

  const restored = createGameState();
  restored.week = clamp(Number(state.week) || 1, 1, 12);
  restored.gameEnded = false;
  restored.currentEnding = null;
  restored.currentActionPhase = normalizeSavePhase(state.currentActionPhase);
  restored.stats = { ...restored.stats, ...(state.stats || {}) };
  restored.dynamicStatuses = reviveSet(state.dynamicStatuses);
  restored.permanentStatuses = reviveSet(state.permanentStatuses);
  restored.titles = reviveSet(state.titles);
  restored.achievements = reviveSet(state.achievements);
  restored.items = reviveSet(state.items);
  restored.flags = reviveSet(state.flags);
  restored.endingFlags = reviveSet(state.endingFlags);
  restored.currentWeekTriggeredEventIds = reviveSet(state.currentWeekTriggeredEventIds);
  const validCampusActivityIds = new Set(CAMPUS_ACTIVITY_POOL.map((activity) => activity.id));
  const savedCampusActivityDeck = Array.isArray(state.campusActivityDeck)
    ? state.campusActivityDeck.filter((id) => validCampusActivityIds.has(id))
    : [];
  if (savedCampusActivityDeck.length >= 11) restored.campusActivityDeck = savedCampusActivityDeck;
  restored.metaSave = cloneMetaSave(metaSave);
  restored.recentChanges = Array.isArray(state.recentChanges) ? state.recentChanges.slice(0, 8) : [];
  restored.recentChangedStats = reviveSet(state.recentChangedStats);
  restored.aiHabit = { ...restored.aiHabit, ...(state.aiHabit || {}) };
  restored.chronicle = window.SchooltopiaRunRecap?.normalizeChronicle?.(state.chronicle) || [];
  restored.inheritedMemory = window.SchooltopiaRunRecap?.normalizeMemory?.(state.inheritedMemory) || null;
  restored.log = Array.isArray(state.log) ? state.log.slice(0, 120) : [];
  restored.counters = { ...restored.counters, ...(state.counters || {}) };
  restored.classState = { ...restored.classState, ...(state.classState || {}) };
  restored.temp = { ...restored.temp, ...(state.temp || {}) };
  restored.futurePhysicalActionBlockedWeeks = Number(state.futurePhysicalActionBlockedWeeks || 0);
  restored.futureDailyActionSkippedWeeks = Number(state.futureDailyActionSkippedWeeks || 0);
  restored.projectScoreModifier = Number(state.projectScoreModifier || 0);
  return restored;
}

function formatSaveDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "未知时间";
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function saveSlotSummary(save) {
  const state = save?.game;
  if (!state) return "空槽位";
  const routeName = state.route === "teacher" ? "教师路线" : "学生路线";
  const difficultyName = difficultyConfig(state.difficulty).name;
  const phaseName =
    state.currentActionPhase === "lunch" ? "校园活动第二轮" : state.currentActionPhase === "daily_skip" ? "日常行动已跳过" : "日常行动第一轮";
  return `${routeName} · 第 ${state.week || 1} 周 · ${phaseName} · ${difficultyName}`;
}

function canSaveCurrentGame() {
  return Boolean(
    game &&
      !game.gameEnded &&
      SAVE_PHASES.has(game.currentActionPhase) &&
      !activeEvent &&
      dom.eventModal.classList.contains("hidden")
  );
}

function saveGameToSlot(slot) {
  if (!canSaveCurrentGame()) {
    window.alert?.("当前阶段暂时不能保存，请等事件处理完，回到行动选择时再存档。");
    return;
  }
  const existing = readGameSaveSlot(slot);
  if (existing && !(window.confirm?.(`覆盖存档 ${slot} 吗？`) ?? true)) return;
  try {
    localStorage.setItem(
      saveSlotKey(slot),
      JSON.stringify({
        version: 1,
        savedAt: new Date().toISOString(),
        game: serializeGameForSave(),
      })
    );
    addLog(`已保存到存档 ${slot}。`);
    playSound("save");
    renderSaveSlots();
    renderInGameSaveControls();
  } catch {
    window.alert?.("存档失败：浏览器当前不允许写入本地存储。");
  }
}

function loadGameFromSlot(slot) {
  const save = readGameSaveSlot(slot);
  if (!save) return;
  if (game && !game.gameEnded && !(window.confirm?.("读取存档会覆盖当前这一局，确定读取吗？") ?? true)) return;
  const restored = reviveGameFromSave(save);
  if (!restored) {
    window.alert?.("这个存档无法读取。");
    return;
  }
  game = restored;
  window.Schooltopia?.startSession?.(game);
  activeEvent = null;
  activeEventDone = null;
  lastFocusedElement = null;
  activeOptionButtons = [];
  document.body.classList.add("game-active");
  dom.setupView.classList.add("hidden");
  dom.endingView.classList.add("hidden");
  dom.codexView.classList.add("hidden");
  dom.eventModal.classList.add("hidden");
  dom.gameView.classList.remove("hidden");
  renderSavedActionPhase();
  addLog(`已读取存档 ${slot}。`);
  playSound("save");
  renderSaveSlots();
}

function clearGameSaveSlot(slot) {
  const save = readGameSaveSlot(slot);
  if (!save) return;
  if (!(window.confirm?.(`清空存档 ${slot} 吗？`) ?? true)) return;
  try {
    localStorage.removeItem(saveSlotKey(slot));
    renderSaveSlots();
    renderInGameSaveControls();
  } catch {
    window.alert?.("清空失败：浏览器当前不允许修改本地存储。");
  }
}

function renderSavedActionPhase() {
  if (!game) return;
  if (game.currentActionPhase === "lunch") {
    chooseLunchAction();
    return;
  }
  if (game.currentActionPhase === "daily_skip") {
    dom.phaseLabel.textContent = "第一轮 · 日常行动";
    dom.roundState.textContent = "日常行动已跳过";
    renderContinueAction("第一轮 · 日常行动", "状态不足，日常行动跳过", "进入校园活动", chooseLunchAction);
    return;
  }
  chooseDailyAction();
}

function renderSaveSlots() {
  if (!dom.saveSlotList) return;
  dom.saveSlotList.innerHTML = "";
  for (let slot = 1; slot <= SAVE_SLOT_COUNT; slot += 1) {
    const save = readGameSaveSlot(slot);
    const card = document.createElement("article");
    card.className = `save-slot-card${save ? "" : " empty"}`;

    const title = document.createElement("strong");
    title.textContent = `存档 ${slot}`;
    const summary = document.createElement("span");
    summary.textContent = save ? saveSlotSummary(save) : "还没有保存过进度。";
    const time = document.createElement("small");
    time.textContent = save ? `保存时间：${formatSaveDate(save.savedAt)}` : "空槽位";

    const actions = document.createElement("div");
    actions.className = "save-slot-actions";
    const loadButton = document.createElement("button");
    loadButton.className = "secondary-action compact-action";
    loadButton.type = "button";
    loadButton.textContent = "读取";
    loadButton.disabled = !save;
    loadButton.addEventListener("click", () => loadGameFromSlot(slot));
    const clearButton = document.createElement("button");
    clearButton.className = "secondary-action compact-action danger-action";
    clearButton.type = "button";
    clearButton.textContent = "清空";
    clearButton.disabled = !save;
    clearButton.addEventListener("click", () => clearGameSaveSlot(slot));
    actions.append(loadButton, clearButton);

    card.append(title, summary, time, actions);
    dom.saveSlotList.append(card);
  }
}

function renderInGameSaveControls() {
  if (!dom.saveInGameSlots) return;
  const canSave = canSaveCurrentGame();
  dom.saveHint.textContent = canSave ? "选择槽位保存当前进度" : "事件处理中暂不能保存";
  dom.saveInGameSlots.innerHTML = "";
  for (let slot = 1; slot <= SAVE_SLOT_COUNT; slot += 1) {
    const button = document.createElement("button");
    button.className = "secondary-action compact-action";
    button.type = "button";
    button.textContent = `保存 ${slot}`;
    button.disabled = !canSave;
    button.addEventListener("click", () => saveGameToSlot(slot));
    dom.saveInGameSlots.append(button);
  }
}

function createGameState() {
  const difficulty = difficultyConfig(setup.difficulty);
  const state = {
    week: 1,
    route: setup.route,
    identity: setup.identity,
    difficulty: setup.difficulty,
    gameEnded: false,
    currentEnding: null,
    currentActionPhase: "daily",
    stats: { ...setup.stats },
    dynamicStatuses: new Set(),
    permanentStatuses: new Set(),
    titles: new Set(),
    achievements: new Set(),
    items: new Set(),
    flags: new Set(),
    endingFlags: new Set(),
    currentWeekTriggeredEventIds: new Set(),
    campusActivityDeck: shuffledCampusActivityIds(),
    metaSave: cloneMetaSave(metaSave),
    recentChanges: [],
    recentChangedStats: new Set(),
    aiHabit: {
      efficiency: 0,
      integrity: 5,
      dependency: 0,
      risk: 0,
    },
    chronicle: [],
    inheritedMemory: null,
    log: [],
    counters: {
      absenceDays: 0,
      absenceCount: 0,
      lateCount: 0,
      coldJokeCount: 0,
      badReadingJournalCount: 0,
      aiReferenceCount: 0,
      aiCopyCount: 0,
      aiUseCount: 0,
      phoneCaughtStreak: 0,
      phoneCheckImmunity: 0,
      dailyStudyStreak: 0,
      lunchSoloStudyStreak: 0,
      sportsActionStreak: 0,
      parrotChosenCount: 0,
      highMoodWeeks: 0,
      lowMoodWeeks: 0,
      dontWantSchoolWeeks: 0,
      runJingdezhenRunCount: 0,
      eatWithClassmatesCount: 0,
      chatWithTeacherLunchStreak: 0,
      homeworkGradingCount: 0,
      dragClassStreak: 0,
      surpriseCheckStreak: 0,
      lowScoreExamStreak: 0,
      gradeInspectionCooperateCount: 0,
      studentRebellionSuppressedCount: 0,
      teacherBadmintonStreak: 0,
      studentRebellionTriggeredCount: 0,
      campusActivityChoices: 0,
    },
    classState: {
      classAverageWisdom: 5,
      classAverageMood: 5,
      classAverageScore: 75,
      baseStudentRebellionRate: clamp(3 + difficulty.rebellionBonus, 0, 12),
    },
    temp: {
      canChoosePhysicalAction: true,
      currentWeekHasHomeworkLikeTask: false,
      currentWeekGradeInspection: false,
      phoneCheckImmunityUsedThisWeek: false,
      blockWisdomGainThisWeek: false,
      nextDailyStudyNoMoodCost: false,
      nextGradeHomeworkStaminaCostReduction: 0,
      currentWeekChoseDailyPhysicalAction: false,
      shouldSkipDailyActionThisWeek: false,
      zeroStaminaPenaltyAppliedThisWeek: false,
      isFinalWeek: false,
      isCheckingThresholdRewards: false,
      eveningStudyWisdomGainModifier: 0,
      baseLateRate: difficulty.baseLateRate,
      lastLateRate: 0,
      lastCaughtRate: 0,
      examScore: 0,
      projectScore: 0,
      jingdezhenScore: 0,
      finalWisdom: 0,
      invigilationScore: 0,
      finalGradingScore: 0,
      summaryScore: 0,
      choseGradeHomeworkThisWeek: false,
      finalProjectChoice: null,
    },
    futurePhysicalActionBlockedWeeks: 0,
    futureDailyActionSkippedWeeks: 0,
    projectScoreModifier: 0,
  };
  const inheritedMemory = window.SchooltopiaRunRecap?.normalizeMemory?.(metaSave.inheritedMemory);
  const inheritedStat = window.SchooltopiaRunRecap?.memoryStatForRoute?.(inheritedMemory, state.route);
  if (inheritedMemory && inheritedStat && Object.hasOwn(state.stats, inheritedStat)) {
    state.stats[inheritedStat] = clamp(state.stats[inheritedStat] + 1, 0, 10);
    state.inheritedMemory = inheritedMemory;
  }
  return state;
}

function assertStudentRoute() {
  if (game?.route !== "student") throw new Error("Student-only logic called on non-student route");
}

function assertTeacherRoute() {
  if (game?.route !== "teacher") throw new Error("Teacher-only logic called on non-teacher route");
}

function hasStatus(statusId) {
  return game.dynamicStatuses.has(statusId) || game.permanentStatuses.has(statusId);
}

function hasTitle(titleId) {
  return game.titles.has(titleId);
}

function hasAchievement(achievementId) {
  return game.achievements.has(achievementId);
}

function hasItem(itemId) {
  return game.items.has(itemId);
}

function getStatMax(statName) {
  let max = 10;
  if (statName === "mood" && game && hasStatus("status_organ_phone")) max += 1;
  if (statName === "teacherStamina" && game && hasTitle("title_red_pen_war_god")) max -= 1;
  if (statName === "homeroomTrust" && game?.flags.has("flag_homeroom_trust_max_2_until_final")) {
    max = Math.min(max, 2);
  }
  return max;
}

function addLog(text) {
  if (!game || !text) return;
  game.log.unshift(text);
  game.log = game.log.slice(0, 120);
  renderLog();
}

function rememberStatChange(statName, actual, requestedDelta) {
  if (!game) return;
  const change = {
    statName,
    label: statLabel(statName),
    actual,
    requestedDelta,
    max: getStatMax(statName),
    value: game.stats[statName],
  };
  game.recentChanges.unshift(change);
  game.recentChanges = game.recentChanges.slice(0, 8);
  game.recentChangedStats = new Set(game.recentChanges.filter((item) => item.actual !== 0).map((item) => item.statName));
}

function clearRecentChanges() {
  if (!game) return;
  game.recentChanges = [];
  game.recentChangedStats = new Set();
}

function clearCompleteMadnessWarningIfRecovered(statName, actual) {
  if (
    game?.route === "student" &&
    statName === "mood" &&
    actual > 0 &&
    game.stats.mood >= 5 &&
    game.flags.has("flag_complete_madness_warning_used")
  ) {
    game.flags.delete("flag_complete_madness_warning_used");
    addLog("心情恢复到安全线，彻底疯狂预警已解除。");
  }
}

function applyStatChangeModifiers(route, statName, delta, reason = "") {
  let nextDelta = delta;
  if (route === "student" && hasStatus("status_dont_want_school") && nextDelta > 0) {
    nextDelta = Math.max(0, nextDelta - 1);
  }
  if (route === "student" && statName === "wisdom" && nextDelta > 0 && game.temp.blockWisdomGainThisWeek) {
    nextDelta = 0;
  }
  if (hasTitle("title_late_habitual_offender") && statName === "homeroomTrust" && nextDelta > 0) {
    nextDelta = Math.max(0, nextDelta - 1);
  }
  if (hasStatus("status_study_machine") && statName === "mood" && nextDelta > 0) {
    nextDelta = Math.max(0, nextDelta - 1);
  }
  if (
    route === "student" &&
    game.temp.isFinalWeek &&
    statName === "mood" &&
    nextDelta < 0 &&
    game.flags.has("flag_final_week_icu_enhanced")
  ) {
    nextDelta -= 1;
  }
  return window.Schooltopia?.adjustStatDelta?.({ route, statName, delta: nextDelta, reason }) ?? nextDelta;
}

function applyStatChange(route, statName, delta, reason = "") {
  if (!game || game.gameEnded) return 0;
  if (STAT_ROUTE[statName] !== route) return 0;
  if (!(statName in game.stats)) return 0;

  const finalDelta = applyStatChangeModifiers(route, statName, delta, reason);
  const before = game.stats[statName];
  game.stats[statName] = clamp(before + finalDelta, 0, getStatMax(statName));
  const actual = game.stats[statName] - before;
  if (delta !== 0 || finalDelta !== 0) rememberStatChange(statName, actual, delta);
  clearCompleteMadnessWarningIfRecovered(statName, actual);

  if (actual !== 0) {
    playStatSound(actual);
    addLog(`${statLabel(statName)}${actual > 0 ? "提升" : "降低"} ${Math.abs(actual)}`);
    if (delta > 0 && finalDelta < delta) {
      addLog(`${statLabel(statName)}这次提升被当前状态削弱了。`);
    } else if (finalDelta > 0 && actual < finalDelta) {
      addLog(`${statLabel(statName)}接近上限，剩余提升没有继续增加。`);
    } else if (finalDelta < 0 && actual > finalDelta) {
      addLog(`${statLabel(statName)}接近下限，剩余降低没有继续扣除。`);
    }
  } else if (delta > 0 && finalDelta === 0) {
    addLog(`${statLabel(statName)}这次没有变化：当前状态抵消了这次提升。`);
  } else if (finalDelta > 0) {
    addLog(`${statLabel(statName)}已经到顶了。`);
  } else if (finalDelta < 0) {
    addLog(`${statLabel(statName)}已经到底了。`);
  }

  refreshDynamicStatuses();
  checkZeroStatPenalties();
  checkThresholdRewards();
  checkImmediateEndings();
  renderAll();
  return actual;
}

function applyEffects(route, effects, reason) {
  effects.forEach(([statName, delta]) => applyStatChange(route, statName, delta, reason));
}

function refreshDynamicStatuses() {
  if (!game) return;
  const next = new Set();
  if (game.route === "student") {
    if (game.stats.stamina >= 8) next.add("status_mysterious_athlete_power");
    if (game.stats.stamina <= 2) next.add("status_icu_watchlist");
    if (game.stats.mood <= 2) next.add("status_dont_want_school");
    if (game.stats.homeroomTrust <= 2) next.add("status_key_attention_target");
  } else if (game.route === "teacher") {
    if (game.stats.teacherStamina === 0) next.add("status_red_pen_unusable");
  }
  game.dynamicStatuses = next;
}

function grantTitle(titleId) {
  if (!game || game.gameEnded || game.titles.has(titleId)) return;
  game.titles.add(titleId);
  addLog(`获得称号：${displayName(TITLES, titleId)}`);
  playSound("reward");
  applyTitleGainEffect(titleId);
  refreshDynamicStatuses();
  checkThresholdRewards();
  checkImmediateEndings();
  renderAll();
}

function grantAchievement(achievementId) {
  if (!game || game.gameEnded || game.achievements.has(achievementId)) return;
  game.achievements.add(achievementId);
  unlockCodex("achievement", achievementId);
  addLog(`获得成就：${displayName(ACHIEVEMENTS, achievementId)}`);
  playSound("reward");
  applyAchievementGainEffect(achievementId);
  checkThresholdRewards();
  checkImmediateEndings();
  renderAll();
}

function grantPermanentStatus(statusId) {
  if (!game || game.gameEnded || game.permanentStatuses.has(statusId)) return;
  game.permanentStatuses.add(statusId);
  addLog(`获得状态：${displayName(STATUS, statusId)}`);
  playSound("reward");
  applyPermanentStatusGainEffect(statusId);
  refreshDynamicStatuses();
  checkThresholdRewards();
  checkImmediateEndings();
  renderAll();
}

function grantItem(itemId) {
  if (!game || game.gameEnded || game.items.has(itemId)) return;
  game.items.add(itemId);
  addLog(`获得道具：${displayName(ITEMS, itemId)}`);
  playSound("reward");
  renderAll();
}

function applyTitleGainEffect(titleId) {
  if (titleId === "title_red_pen_war_god" && game.route === "teacher") {
    applyStatChange("teacher", "authority", 2, "gain_title_red_pen_war_god");
    game.stats.teacherStamina = clamp(game.stats.teacherStamina, 0, getStatMax("teacherStamina"));
  }
  if (titleId === "title_light_footed" && game.route === "teacher") {
    applyStatChange("teacher", "studentFavor", -2, "gain_title_light_footed");
    applyStatChange("teacher", "gradeTrust", 2, "gain_title_light_footed");
  }
  if (titleId === "title_office_badminton_king" && game.route === "teacher") {
    applyStatChange("teacher", "teacherStamina", 1, "gain_title_office_badminton_king");
    applyStatChange("teacher", "teacherMood", 1, "gain_title_office_badminton_king");
  }
  if (titleId === "title_walking_grade_inspection" && game.route === "teacher") {
    applyStatChange("teacher", "studentFavor", -1, "gain_title_walking_grade_inspection");
    applyStatChange("teacher", "gradeTrust", 1, "gain_title_walking_grade_inspection");
  }
}

function applyAchievementGainEffect(achievementId) {
  if (achievementId === "achievement_smart_electric_iot_engineer") {
    grantItem("item_mysterious_wifi_password");
  }
  if (achievementId === "achievement_ray_teacher_parrot" && game.route === "student") {
    ["wisdom", "stamina", "mood", "peerFavor", "homeroomTrust"].forEach((statName) => {
      applyStatChange("student", statName, 1, "gain_achievement_ray_teacher_parrot");
    });
    addLog("其实你才是真正的鹦鹉。");
  }
}

function applyPermanentStatusGainEffect(statusId) {
  if (statusId === "status_classroom_out_of_control" && game.route === "teacher") {
    applyStatChange("teacher", "authority", -2, "gain_status_classroom_out_of_control");
    applyStatChange("teacher", "studentFavor", -1, "gain_status_classroom_out_of_control");
    game.flags.add("flag_next_drag_class_must_fail");
  }
}

function checkZeroStatPenalties() {
  if (!game || game.gameEnded) return;
  if (
    game.route === "student" &&
    game.stats.stamina === 0 &&
    !game.temp.zeroStaminaPenaltyAppliedThisWeek
  ) {
    game.temp.zeroStaminaPenaltyAppliedThisWeek = true;
    game.futureDailyActionSkippedWeeks = Math.max(game.futureDailyActionSkippedWeeks, 1);
    addLog("体能决定了你能不能活着看到期末周。");
    applyStatChange("student", "mood", -1, "zero_stamina_penalty");
  }
}

function checkThresholdRewards() {
  if (!game || game.gameEnded || game.temp.isCheckingThresholdRewards) return;
  game.temp.isCheckingThresholdRewards = true;
  try {
    if (game.route === "student") checkStudentThresholdRewards();
    if (game.route === "teacher") checkTeacherThresholdRewards();
  } finally {
    game.temp.isCheckingThresholdRewards = false;
  }
}

function checkStudentThresholdRewards() {
  assertStudentRoute();
  if (game.stats.homeroomTrust >= 8 && !game.flags.has("flag_trust_8_immunity_given")) {
    game.flags.add("flag_trust_8_immunity_given");
    game.counters.phoneCheckImmunity += 1;
    addLog("班主任信任度奖励：获得一次手机检查豁免。");
  }
  if (game.stats.homeroomTrust === 10 && !game.flags.has("flag_homeroom_favorite_reward_given")) {
    game.flags.add("flag_homeroom_favorite_reward_given");
    grantTitle("title_homeroom_favorite");
    game.counters.phoneCheckImmunity += 1;
  }
  if (game.stats.peerFavor >= 9) grantPermanentStatus("status_review_material_alliance");
  if (game.counters.dailyStudyStreak >= 3) {
    grantPermanentStatus("status_study_machine");
    addLog("你已经不在刷题了，你正在被题刷。");
  }
  if (game.counters.lunchSoloStudyStreak >= 3 && !hasStatus("status_lonely_academic_machine")) {
    grantPermanentStatus("status_lonely_academic_machine");
    applyStatChange("student", "peerFavor", -1, "gain_status_lonely_academic_machine");
    applyStatChange("student", "wisdom", 1, "gain_status_lonely_academic_machine");
  }
  if (game.counters.lateCount >= 5) grantTitle("title_late_habitual_offender");
  if (game.counters.lateCount >= 10) grantAchievement("achievement_best_late_award");
  if (game.counters.lateCount >= 15 && !game.flags.has("flag_homeroom_trust_max_2_until_final")) {
    game.flags.add("flag_homeroom_trust_max_2_until_final");
    applyStatChange("student", "homeroomTrust", 0, "late_15_trust_cap_refresh");
  }
  if (game.counters.absenceDays >= 10) grantAchievement("achievement_warning_slip_calling");
  if (game.counters.absenceDays >= 40) game.endingFlags.add("ending_flag_disappeared_person_candidate");
  if (game.counters.coldJokeCount >= 10) grantAchievement("achievement_super_cold_joke_king");
  if (game.counters.badReadingJournalCount >= 3) grantAchievement("achievement_jennifer_teacher_angry");
  if (game.counters.aiUseCount >= 5) grantAchievement("achievement_prompt_engineer");
  if (game.counters.aiCopyCount >= 5 || game.aiHabit.dependency >= 8) grantPermanentStatus("status_ai_dependency");
  if (game.counters.aiCopyCount >= 10) game.endingFlags.add("ending_flag_ai_graduation_risk");
  if (game.counters.parrotChosenCount >= 3) grantAchievement("achievement_ray_teacher_parrot");
  if (game.stats.stamina === 10) game.flags.add("flag_reached_stamina_10_before_final");
  if (game.counters.sportsActionStreak >= 3) game.flags.add("flag_sports_legend_history_condition");
}

function checkTeacherThresholdRewards() {
  assertTeacherRoute();
  if (game.stats.studentFavor >= 8) grantTitle("title_student_moonlight_teacher");
  if (game.stats.gradeTrust === 10) grantTitle("title_grade_group_hidden_boss");
  if (game.counters.homeworkGradingCount >= 5) grantTitle("title_red_pen_skilled_worker");
  if (game.counters.homeworkGradingCount >= 10) {
    grantAchievement("achievement_red_pen_war_god");
    grantTitle("title_red_pen_war_god");
  }
  if (game.counters.surpriseCheckStreak >= 3) grantTitle("title_light_footed");
  if (game.counters.teacherBadmintonStreak >= 3) grantTitle("title_office_badminton_king");
  if (game.counters.gradeInspectionCooperateCount >= 3) grantTitle("title_walking_grade_inspection");
  if (game.counters.lowScoreExamStreak >= 3) grantAchievement("achievement_devil_teacher");
}

function checkImmediateEndings() {
  if (!game || game.gameEnded) return;
  if (game.route === "student") {
    if (game.stats.mood <= 0) {
      if (!game.flags.has("flag_complete_madness_warning_used")) {
        game.flags.add("flag_complete_madness_warning_used");
        game.endingFlags.add("ending_flag_transfer_candidate");
        game.stats.mood = 1;
        rememberStatChange("mood", 1, 1);
        refreshDynamicStatuses();
        addLog("心情归零触发崩溃预警。你暂时撑住了，但再归零就会彻底疯狂。");
        renderAll();
        return;
      }
      triggerEnding("ending_complete_madness");
      return;
    }
    if (game.counters.aiCopyCount >= 10) {
      triggerEnding("ending_ai_graduates_for_me");
    }
  }
  if (game.route === "teacher" && game.stats.teacherMood <= 0) {
    triggerEnding("ending_teacher_complete_madness");
  }
}

function setSetupRoute(route) {
  setup.route = route;
  setup.identity = routeConfig(route).identities[0].id;
  setup.stats = makeStats(route);
  setup.points = setupPointTotal();
  renderSetup();
}

function setSetupIdentity(identity) {
  setup.identity = identity;
  renderSetup();
}

function setSetupDifficulty(difficulty) {
  setup.difficulty = difficulty;
  setup.stats = makeStats(setup.route);
  setup.points = setupPointTotal();
  renderSetup();
}

function adjustSetupStat(statName, delta) {
  if (delta > 0 && setup.points <= 0) return;
  if (delta > 0 && setup.stats[statName] >= 10) return;
  if (delta < 0 && setup.stats[statName] <= 3) return;
  setup.stats[statName] += delta;
  setup.points -= delta;
  renderSetup();
}

function applyRecommendedSetup() {
  setup.stats = makeStats(setup.route);
  setup.points = setupPointTotal();
  const statIds = ATTRIBUTES[setup.route].map((attribute) => attribute.id);
  let index = 0;
  while (setup.points > 0 && statIds.some((statName) => setup.stats[statName] < 10)) {
    const statName = statIds[index % statIds.length];
    if (setup.stats[statName] < 10) {
      setup.stats[statName] += 1;
      setup.points -= 1;
    }
    index += 1;
  }
  renderSetup();
}

function memoryTargetForSetup() {
  const memory = window.SchooltopiaRunRecap?.normalizeMemory?.(metaSave.inheritedMemory);
  const stat = window.SchooltopiaRunRecap?.memoryStatForRoute?.(memory, setup.route);
  const attribute = ATTRIBUTES[setup.route].find((item) => item.id === stat);
  return memory && attribute ? { memory, stat, label: attribute.name } : null;
}

function renderInheritedMemoryBanner() {
  const target = memoryTargetForSetup();
  dom.inheritedMemoryBanner.classList.toggle("hidden", !target);
  if (target) dom.inheritedMemoryName.textContent = target.label;
}

function clearInheritedMemory() {
  metaSave.inheritedMemory = null;
  saveMetaSave();
  renderInheritedMemoryBanner();
}

function renderSetup() {
  dom.routeButtons.innerHTML = "";
  ROUTES.forEach((route) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${setup.route === route.id ? " active" : ""}`;
    button.innerHTML = `<strong>${route.name}</strong><small>${route.detail}</small>`;
    button.addEventListener("click", () => setSetupRoute(route.id));
    dom.routeButtons.append(button);
  });

  dom.identityButtons.innerHTML = "";
  const identities = routeConfig().identities;
  dom.identityButtons.classList.toggle("hidden", identities.length <= 1);
  identities.forEach((identity) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${setup.identity === identity.id ? " active" : ""}`;
    button.innerHTML = `<strong>${identity.name}</strong><small>${identity.detail}</small>`;
    button.addEventListener("click", () => setSetupIdentity(identity.id));
    dom.identityButtons.append(button);
  });

  dom.difficultyButtons.innerHTML = "";
  DIFFICULTIES.forEach((difficulty) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button difficulty-button${setup.difficulty === difficulty.id ? " active" : ""}`;
    button.innerHTML = `<strong>${difficulty.name}</strong><small>${difficulty.detail}</small>`;
    button.addEventListener("click", () => setSetupDifficulty(difficulty.id));
    dom.difficultyButtons.append(button);
  });
  dom.difficultyLabel.textContent = difficultyConfig().name;

  dom.attributeSetup.innerHTML = "";
  ATTRIBUTES[setup.route].forEach((attr) => {
    const row = document.createElement("div");
    row.className = "attribute-row";
    row.innerHTML = `
      <strong>${attr.name}</strong>
      <button class="step-button" type="button" aria-label="${attr.name} -1">-</button>
      <output>${setup.stats[attr.id]}</output>
      <button class="step-button" type="button" aria-label="${attr.name} +1">+</button>
    `;
    const [minus, plus] = row.querySelectorAll("button");
    minus.disabled = setup.stats[attr.id] <= 3;
    plus.disabled = setup.points <= 0 || setup.stats[attr.id] >= 10;
    minus.addEventListener("click", () => adjustSetupStat(attr.id, -1));
    plus.addEventListener("click", () => adjustSetupStat(attr.id, 1));
    dom.attributeSetup.append(row);
  });
  dom.pointsLeft.textContent = `剩余 ${setup.points} 点`;
  dom.startGame.disabled = setup.points !== 0;
  dom.startGame.textContent = setup.points === 0 ? "开始游戏" : `还需分配 ${setup.points} 点`;
  renderInheritedMemoryBanner();
  renderSaveSlots();
}

function startGame() {
  playSound("action");
  game = createGameState();
  const inheritedStat = window.SchooltopiaRunRecap?.memoryStatForRoute?.(game.inheritedMemory, game.route);
  if (game.inheritedMemory) {
    game.metaSave.inheritedMemory = null;
    saveMetaSave();
  }
  window.Schooltopia?.startSession?.(game);
  document.body.classList.add("game-active");
  refreshDynamicStatuses();
  checkThresholdRewards();
  dom.setupView.classList.add("hidden");
  dom.endingView.classList.add("hidden");
  dom.gameView.classList.remove("hidden");
  dom.eventModal.classList.add("hidden");
  addLog(TEXT.systemLine);
  if (inheritedStat) addLog(`上局记忆生效：${statLabel(inheritedStat)} +1。`);
  renderAll();
  enterWeek();
}

function resetGame() {
  window.Schooltopia?.abandonSession?.();
  game = null;
  setup.stats = makeStats(setup.route);
  setup.points = setupPointTotal();
  activeEvent = null;
  activeEventDone = null;
  lastFocusedElement = null;
  activeOptionButtons = [];
  dom.setupView.classList.remove("hidden");
  dom.gameView.classList.add("hidden");
  dom.endingView.classList.add("hidden");
  dom.codexView.classList.add("hidden");
  dom.eventModal.classList.add("hidden");
  dom.actionList.innerHTML = "";
  dom.logList.innerHTML = "";
  dom.systemLine.textContent = TEXT.systemLine;
  document.body.classList.remove("game-active");
  renderSetup();
}

function confirmRestartInGame() {
  const ok = window.confirm?.("确定要重新开始吗？当前这一局会丢失。") ?? true;
  if (ok) resetGame();
}

function renderAll() {
  if (!game) return;
  renderHud();
  renderRoleScene();
  renderStats();
  renderChangeFeed();
  renderAIHabit();
  renderCollections();
  renderLog();
  renderInGameSaveControls();
  dom.weekLabel.textContent = game.week >= 12 ? "第 12 周" : `第 ${game.week} 周`;
  dom.systemLine.textContent = game.gameEnded ? TEXT.finalPrompt : TEXT.systemLine;
}

function renderHud() {
  const difficulty = difficultyConfig(game.difficulty);
  const routeName = game.route === "student" ? "学生路线" : "教师路线";
  dom.routeBadge.textContent = `${routeName} · ${difficulty.name}`;
  dom.hudTitle.textContent = `第 ${game.week} 周 · ${dom.phaseLabel.textContent || "行动中"}`;
  const primaryStats =
    game.route === "student"
      ? [
          ["智慧", "wisdom"],
          ["心情", "mood"],
          ["同学", "peerFavor"],
        ]
      : [
          ["威严", "authority"],
          ["体能", "teacherStamina"],
          ["学生", "studentFavor"],
        ];
  dom.hudStats.innerHTML = "";
  primaryStats.forEach(([label, statName]) => {
    const value = game.stats[statName];
    const max = getStatMax(statName);
    const chip = document.createElement("div");
    chip.className = "hud-chip";
    chip.innerHTML = `<b>${value}/${max}</b><small>${label}</small>`;
    dom.hudStats.append(chip);
  });
}

function renderRoleScene() {
  const difficulty = difficultyConfig(game.difficulty);
  const routeName = game.route === "student" ? "学生" : "教师";
  const identityName =
    game.route === "student"
      ? routeConfig("student").identities.find((item) => item.id === game.identity)?.name
      : "老师";
  const moodValue = game.route === "student" ? game.stats.mood : game.stats.teacherMood;
  const moodText = moodValue >= 8 ? "状态很好" : moodValue <= 2 ? "濒临崩溃" : "状态一般";
  dom.roleScene.className = `role-scene ${game.route}`;
  dom.roleScene.innerHTML = `
    <div class="role-avatar" aria-hidden="true"></div>
    <div class="role-copy">
      <strong>${routeName} · ${identityName}</strong>
      <span>${difficulty.name}｜${moodText}｜第 ${game.week}/12 周</span>
    </div>
  `;
}

function renderStats() {
  dom.statsList.innerHTML = "";
  ATTRIBUTES[game.route].forEach((attr) => {
    const value = game.stats[attr.id];
    const max = getStatMax(attr.id);
    const row = document.createElement("div");
    row.className = `stat tone-${attr.tone}${game.recentChangedStats.has(attr.id) ? " changed" : ""}`;
    row.innerHTML = `
      <div class="stat-top"><span>${attr.name}</span><span>${value}/${max}</span></div>
      <div class="meter" role="progressbar" aria-label="${attr.name}" aria-valuemin="0" aria-valuemax="${max}" aria-valuenow="${value}"><span style="width:${(value / max) * 100}%"></span></div>
    `;
    dom.statsList.append(row);
  });
}

function renderChangeFeed() {
  dom.changeFeed.innerHTML = "";
  if (!game.recentChanges.length) {
    const empty = document.createElement("div");
    empty.className = "change-empty";
    empty.textContent = "选择后会在这里显示属性变化。";
    dom.changeFeed.append(empty);
    return;
  }
  const netChanges = [...game.recentChanges.reduce((changes, change) => {
    const current = changes.get(change.statName) || { ...change, actual: 0 };
    current.actual += Number(change.actual || 0);
    current.value = change.value;
    current.max = change.max;
    changes.set(change.statName, current);
    return changes;
  }, new Map()).values()];
  netChanges.slice(0, 5).forEach((change) => {
    const item = document.createElement("div");
    const tone = change.actual > 0 ? "positive" : change.actual < 0 ? "negative" : "neutral";
    const deltaText = change.actual === 0 ? "未变化" : `${change.actual > 0 ? "+" : ""}${change.actual}`;
    item.className = `change-pill ${tone}`;
    item.innerHTML = `<span>${change.label}</span><b>${deltaText}</b>`;
    dom.changeFeed.append(item);
  });
}

function renderAIHabit() {
  if (game.route !== "student" || game.counters.aiUseCount === 0) {
    dom.aiHabitPanel.classList.add("hidden");
    dom.aiHabitPanel.innerHTML = "";
    return;
  }
  dom.aiHabitPanel.classList.remove("hidden");
  dom.aiHabitPanel.innerHTML = `
    <div class="ai-habit-title">
      <span>AI 使用习惯</span>
      <small>效率 / 诚信 / 依赖 / 风险</small>
    </div>
    <div class="ai-habit-grid">
      ${AI_HABITS.map((habit) => {
        const value = game.aiHabit[habit.id];
        return `
          <div class="ai-habit-row ${habit.id}">
            <span>${habit.name}</span>
            <div class="ai-habit-bar"><span style="width:${value * 10}%"></span></div>
            <b>${value}</b>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderCollections() {
  renderCollection(dom.statusList, [
    ...[...game.dynamicStatuses].map((id) => ({ id, name: displayName(STATUS, id), kind: "动态" })),
    ...[...game.permanentStatuses].map((id) => ({ id, name: displayName(STATUS, id), kind: "永久" })),
  ]);
  renderCollection(dom.titleList, [...game.titles].map((id) => ({ id, name: displayName(TITLES, id) })));
  renderCollection(
    dom.achievementList,
    [...game.achievements].map((id) => ({ id, name: displayName(ACHIEVEMENTS, id) }))
  );
  renderCollection(dom.itemList, [...game.items].map((id) => ({ id, name: displayName(ITEMS, id) })));
}

function renderCollection(node, entries) {
  node.innerHTML = "";
  if (!entries.length) {
    node.textContent = "无";
    return;
  }
  entries.forEach((entry) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = entry.kind ? `${entry.name} · ${entry.kind}` : entry.name;
    node.append(chip);
  });
}

function getCodexSave() {
  return game?.metaSave || metaSave;
}

function codexProgress(key, total) {
  const save = getCodexSave();
  const count = save[key].size;
  return { count, total, percent: total ? Math.round((count / total) * 100) : 0 };
}

const CODEX_RESET_TARGETS = {
  events: { key: "unlockedEvents", label: "事件图鉴" },
  endings: { key: "unlockedEndings", label: "结局图鉴" },
  achievements: { key: "unlockedAchievements", label: "成就图鉴" },
};

function resetCodex(kind) {
  const targets = kind === "all" ? Object.values(CODEX_RESET_TARGETS) : [CODEX_RESET_TARGETS[kind]];
  if (targets.some((target) => !target)) return;
  const label = kind === "all" ? "全部图鉴" : targets[0].label;
  const ok = window.confirm?.(`确定要重置${label}吗？只会清空图鉴记录，不会重开当前这一局。`) ?? true;
  if (!ok) return;
  const save = getCodexSave();
  targets.forEach((target) => save[target.key].clear());
  if (kind === "all") {
    try {
      localStorage.removeItem("schooltopia_total_ai_copy");
    } catch {
      // Legacy counters never affect the current run.
    }
  }
  saveMetaSave();
  renderCodex();
  if (game && !game.gameEnded) addLog(`${label}记录已重置。`);
}

function renderCodex() {
  const save = getCodexSave();
  const eventProgress = codexProgress("unlockedEvents", CODEX_EVENTS.length);
  const endingProgress = codexProgress("unlockedEndings", Object.keys(ENDINGS).length);
  const achievementProgress = codexProgress("unlockedAchievements", Object.keys(ACHIEVEMENTS).length);

  dom.codexSummary.innerHTML = "";
  [
    ["事件", eventProgress],
    ["结局", endingProgress],
    ["成就", achievementProgress],
  ].forEach(([label, progress]) => {
    const item = document.createElement("div");
    item.className = "codex-progress";
    item.innerHTML = `<strong>${progress.count}/${progress.total}</strong><span>${label}收集 · ${progress.percent}%</span>`;
    dom.codexSummary.append(item);
  });

  dom.codexTabs.forEach((button) => {
    const selected = button.dataset.codexTab === activeCodexTab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", selected ? "true" : "false");
    button.tabIndex = selected ? 0 : -1;
  });
  const activeTab = dom.codexTabs.find((button) => button.dataset.codexTab === activeCodexTab);
  if (activeTab) dom.codexGrid.setAttribute("aria-labelledby", activeTab.id);

  let entries = [];
  let unlocked = new Set();
  if (activeCodexTab === "events") {
    entries = CODEX_EVENTS.map((event) => ({
      id: event.id,
      title: event.name,
      tag: `${event.type} · ${event.route}`,
      hint: event.hint,
    }));
    unlocked = save.unlockedEvents;
  } else if (activeCodexTab === "endings") {
    entries = Object.entries(ENDINGS)
      .sort(([, a], [, b]) => b.priority - a.priority)
      .map(([id, ending]) => ({
        id,
        title: ending.title,
        tag: ending.route === "both" ? "通用结局" : ending.route === "student" ? "学生结局" : "教师结局",
        hint: "通关后会记录到这里。",
      }));
    unlocked = save.unlockedEndings;
  } else {
    entries = Object.entries(ACHIEVEMENTS).map(([id, achievement]) => ({
      id,
      title: achievement.name,
      tag: "成就",
      hint: "达成特殊条件后解锁。",
    }));
    unlocked = save.unlockedAchievements;
  }

  dom.codexGrid.innerHTML = "";
  entries.forEach((entry) => {
    const isUnlocked = unlocked.has(entry.id);
    const card = document.createElement("article");
    card.className = `codex-card${isUnlocked ? "" : " locked"}`;
    card.innerHTML = `
      <small>${isUnlocked ? "已记录" : "未解锁"} · ${entry.tag}</small>
      <strong>${isUnlocked ? entry.title : "???"}</strong>
      <span>${isUnlocked ? entry.hint : "继续游玩，在不同路线和难度里寻找它。"}</span>
    `;
    dom.codexGrid.append(card);
  });
}

function openCodex(tab = activeCodexTab) {
  codexLastFocusedElement = document.activeElement;
  if (!dom.gameView.classList.contains("hidden")) codexReturnView = "game";
  else if (!dom.endingView.classList.contains("hidden")) codexReturnView = "ending";
  else codexReturnView = "setup";
  activeCodexTab = tab;
  dom.setupView.classList.add("hidden");
  dom.gameView.classList.add("hidden");
  dom.endingView.classList.add("hidden");
  dom.codexView.classList.remove("hidden");
  renderCodex();
  dom.codexTabs.find((button) => button.dataset.codexTab === activeCodexTab)?.focus();
}

function closeCodex() {
  dom.codexView.classList.add("hidden");
  if (codexReturnView === "game" && game && !game.gameEnded) {
    dom.gameView.classList.remove("hidden");
  } else if (codexReturnView === "ending" && game?.gameEnded) {
    dom.endingView.classList.remove("hidden");
  } else {
    dom.setupView.classList.remove("hidden");
  }
  codexLastFocusedElement?.focus?.();
  codexLastFocusedElement = null;
}

function renderLog() {
  if (!game) return;
  dom.logList.innerHTML = "";
  game.log.forEach((entry) => {
    const item = document.createElement("div");
    item.className = "log-entry";
    item.textContent = entry;
    dom.logList.append(item);
  });
}

function renderActionEffects(effects, effectText = "") {
  if (effectText) {
    return `<span class="action-effects"><b>属性变化</b><span class="action-effect variable">${effectText}</span></span>`;
  }
  if (!Array.isArray(effects) || !effects.length) return "";
  const items = effects
    .filter(([, delta]) => Number(delta) !== 0)
    .map(([statName, delta]) => {
      const value = Number(delta);
      return `<span class="action-effect ${value > 0 ? "positive" : "negative"}">${statLabel(statName)} ${value > 0 ? "+" : ""}${value}</span>`;
    })
    .join("");
  return items ? `<span class="action-effects"><b>属性变化</b>${items}</span>` : "";
}

function recordChronicleEntry(kind, title, choice) {
  if (!game || !window.SchooltopiaRunRecap?.recordEntry) return;
  game.chronicle = window.SchooltopiaRunRecap.recordEntry(game.chronicle, {
    week: game.week,
    kind,
    title,
    choice,
  });
}

function recordActionChronicle(action) {
  if (!game) return;
  if (game.currentActionPhase === "lunch" && action.activityAction) {
    recordChronicleEntry("activity", action.contextLabel || "校园活动", action.name);
    return;
  }
  if (["daily", "daily_skip"].includes(game.currentActionPhase)) {
    const choice = game.currentActionPhase === "daily_skip" ? "日常行动跳过" : action.name;
    recordChronicleEntry("daily", "日常行动", choice);
  }
}

function renderActions(title, subtitle, actions) {
  dom.actionTitle.textContent = title;
  dom.actionSubtitle.textContent = subtitle;
  dom.actionList.innerHTML = "";
  dom.actionList.closest(".action-panel")?.classList.toggle(
    "activity-round",
    actions.length > 0 && actions.every((action) => action.activityAction)
  );
  actions.forEach((action, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `action-card${action.activityAction ? " activity-action" : ""}${action.featured ? " featured-action" : ""}`;
    button.disabled = Boolean(action.disabled?.());
    const key = action.keyLabel || String.fromCharCode(65 + index);
    if (/^[A-Z]$/.test(key) && typeof button.setAttribute === "function") {
      button.setAttribute("aria-keyshortcuts", `${key} ${index + 1}`);
    }
    button.innerHTML = `
      <span class="action-key">${key}</span>
      <span class="action-copy">${action.contextLabel ? `<span class="action-context">${action.contextLabel}</span>` : ""}<strong>${action.name}</strong><span>${action.detail || ""}</span>${renderActionEffects(action.effects, action.effectText)}</span>
    `;
    button.addEventListener("click", () => {
      if (button.disabled) return;
      playSound(action.keyLabel === "→" ? "click" : "action");
      const researchBefore = window.Schooltopia?.snapshot?.(game) || {};
      const researchWeek = game?.week || 0;
      const researchPhase = game?.currentActionPhase || "";
      clearRecentChanges();
      resetInactiveNormalActionStreaks(action);
      recordActionChronicle(action);
      action.run();
      window.Schooltopia?.recordChoice?.(
        {
          source: "action",
          contextId: `${researchPhase || "action"}_${researchWeek}`,
          contextLabel: title,
          choiceId: action.id || `action_${index}`,
          choiceLabel: action.name,
          week: researchWeek,
          phase: researchPhase,
        },
        researchBefore,
        window.Schooltopia?.snapshot?.(game) || {},
        game
      );
    });
    dom.actionList.append(button);
  });
  activeOptionButtons = [...dom.actionList.querySelectorAll("button")];
  renderAll();
  scrollActionIntoView();
}

function renderContinueAction(title, subtitle, label, run) {
  renderActions(title, subtitle, [{ id: "continue", name: label, detail: "", keyLabel: "→", run }]);
}

function scrollActionIntoView() {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const smallScreen = window.matchMedia?.("(max-width: 980px)").matches;
  if (!smallScreen || dom.gameView.classList.contains("hidden")) return;
  const target = dom.actionList.parentElement || dom.actionList.parentNode;
  if (target && typeof target.scrollIntoView === "function") {
    target.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }
}

function enterWeek() {
  if (!game || game.gameEnded) return;
  if (game.week >= 12) {
    runFinalWeek();
    return;
  }
  runNormalWeek();
}

function startWeekReset() {
  game.temp.currentWeekHasHomeworkLikeTask = false;
  game.temp.currentWeekGradeInspection = false;
  game.temp.phoneCheckImmunityUsedThisWeek = false;
  game.temp.blockWisdomGainThisWeek = false;
  game.temp.nextDailyStudyNoMoodCost = false;
  game.temp.nextGradeHomeworkStaminaCostReduction = 0;
  game.temp.currentWeekChoseDailyPhysicalAction = false;
  game.temp.eveningStudyWisdomGainModifier = 0;
  game.temp.lastLateRate = 0;
  game.temp.lastCaughtRate = 0;
  game.temp.zeroStaminaPenaltyAppliedThisWeek = false;
  game.temp.isFinalWeek = false;
  game.temp.choseGradeHomeworkThisWeek = false;
  game.temp.canChoosePhysicalAction = game.futurePhysicalActionBlockedWeeks <= 0;
  game.temp.shouldSkipDailyActionThisWeek = game.futureDailyActionSkippedWeeks > 0;
  game.currentWeekTriggeredEventIds.clear();

  if (game.futurePhysicalActionBlockedWeeks > 0) game.futurePhysicalActionBlockedWeeks -= 1;
  if (game.futureDailyActionSkippedWeeks > 0) game.futureDailyActionSkippedWeeks -= 1;

  refreshDynamicStatuses();
}

function getCurrentCampusActivity() {
  if (!Array.isArray(game.campusActivityDeck) || game.campusActivityDeck.length < 11) {
    game.campusActivityDeck = shuffledCampusActivityIds();
  }
  const activityId = game.campusActivityDeck[(game.week - 1) % game.campusActivityDeck.length];
  return CAMPUS_ACTIVITY_POOL.find((activity) => activity.id === activityId) || CAMPUS_ACTIVITY_POOL[0];
}

function selectRotatingCoreActions(actions) {
  const count = Math.min(3, actions.length);
  const block = Math.floor((game.week - 1) / 3);
  const start = (block * count) % actions.length;
  return Array.from({ length: count }, (_, offset) => actions[(start + offset) % actions.length]);
}

function makeCampusActivityActions(phase) {
  const activity = getCurrentCampusActivity();
  const effectPhase = phase === "first" ? "first" : "second";
  const finish = phase === "first" ? finishDailyAction : finishLunchAction;
  const choices = CAMPUS_ACTIVITY_OPTIONS[activity.id]?.[effectPhase] || [];
  return choices.map(([name, styleId], index) => {
    const style = CAMPUS_CHOICE_STYLES[styleId] || CAMPUS_CHOICE_STYLES.plan;
    const effects = style[game.route];
    const actionId = `activity_${activity.id}_${effectPhase}_${index + 1}`;
    return {
      id: actionId,
      name,
      detail: `${activity[`${effectPhase}Detail`] || activity.brief} ${style.detail}`,
      effects,
      featured: false,
      activityAction: true,
      contextLabel: activity.title,
      run() {
        applyEffects(game.route, effects, actionId);
        game.counters.campusActivityChoices += 1;
        addLog(`${activity.title}：${name}。`);
        finish();
      },
    };
  });
}

function buildNormalActionChoices(classActions, breakActions) {
  const classChoices = selectRotatingCoreActions(classActions).map((action) => ({
    ...action,
    normalCategory: "class",
    contextLabel: "上课 / 课间",
  }));
  const breakChoices = selectRotatingCoreActions(breakActions).map((action) => ({
    ...action,
    normalCategory: "break",
    contextLabel: "午休 / 课后",
  }));
  const count = Math.max(classChoices.length, breakChoices.length);
  return Array.from({ length: count }, (_, index) => [classChoices[index], breakChoices[index]])
    .flat()
    .filter(Boolean);
}

function getStudentDailyActions() {
  return buildNormalActionChoices(getAllStudentDailyActions(), getAllStudentLunchActions());
}

function getTeacherDailyActions() {
  return buildNormalActionChoices(getAllTeacherDailyActions(), getAllTeacherLunchActions());
}

function getStudentLunchActions() {
  return makeCampusActivityActions("second");
}

function getTeacherLunchActions() {
  return makeCampusActivityActions("second");
}

function runNormalWeek() {
  startWeekReset();
  playSound("bell");
  dom.phaseLabel.textContent = "普通周";
  dom.roundState.textContent = "周初判定";
  applyIdentityPassiveAtWeekStart();
  const activity = getCurrentCampusActivity();
  addLog(`本周活动：${activity.title}。`);

  const queue = [];
  const shop = triggerShopIfNeeded();
  if (shop) queue.push(shop);
  const traffic = triggerTrafficJamCheck();
  if (traffic) queue.push(traffic);
  const preAction = triggerPreActionRareEnvironmentEventIfNeeded();
  if (preAction) queue.push(preAction);

  runEventQueue(queue, () => chooseDailyAction());
}

function applyIdentityPassiveAtWeekStart() {
  if (game.route !== "student") return;
  if (game.identity === "commuter" && randomChance(30)) {
    applyStatChange("student", "mood", 1, "commuter_home_recovery");
    addLog("走读生本周回家短暂回血，心情恢复了一些。");
  }
  if (game.identity === "boarder") {
    applyStatChange("student", "peerFavor", 1, "boarder_dorm_friendship");
    applyStatChange("student", "stamina", -1, "boarder_life_cost");
  }
}

function triggerShopIfNeeded() {
  if (game.route !== "student") return null;
  if (![4, 8].includes(game.week)) return null;
  return makeEvent({
    id: "event_special_shop",
    name: "特殊商店",
    type: "道具系统",
    description: "备用机\n\n手机检查时可选择“交出备用机”。\n若失败，惩罚加重。",
    options: [
      {
        id: "choice_buy_backup_phone",
        name: "购买备用机",
        detail: "会消耗一些心情，但能在手机检查时多一层保险。",
        disabled: () => hasItem("item_backup_phone") || (game.route === "student" && game.stats.mood <= 0),
        run() {
          if (game.route === "student") applyStatChange("student", "mood", -2, "buy_backup_phone");
          if (game.route === "teacher") applyStatChange("teacher", "teacherMood", -2, "buy_backup_phone");
          grantItem("item_backup_phone");
        },
      },
      { id: "choice_skip_shop", name: "路过", run() {} },
    ],
  });
}

function triggerTrafficJamCheck() {
  if (game.route !== "student") return null;
  const baseChance = game.identity === "commuter" ? 20 : 5;
  const trafficMultiplier = game.difficulty === "hell" ? 1.2 : difficultyConfig(game.difficulty).rareMultiplier;
  const chance = clamp(Math.round(baseChance * trafficMultiplier), 0, 100);
  if (!randomChance(chance)) return null;
  return eventTrafficJam();
}

function triggerPreActionRareEnvironmentEventIfNeeded() {
  if (!randomChance(difficultyChance(10, "rare"))) return null;
  return randomEventFromPool([eventTeacherGoodMoodToday, eventGradeInspection], "randomPool");
}

function chooseDailyAction() {
  if (game.gameEnded) return;
  game.currentActionPhase = "daily";
  dom.phaseLabel.textContent = "第一轮 · 日常行动";
  dom.roundState.textContent = "正常上课与课间";
  if (game.temp.shouldSkipDailyActionThisWeek) {
    game.currentActionPhase = "daily_skip";
    game.temp.shouldSkipDailyActionThisWeek = false;
    resetAllNormalActionStreaks();
    addLog("本周因体能耗尽或特殊事件跳过日常行动。");
    renderContinueAction("第一轮 · 日常行动", "状态不足，日常行动跳过", "进入校园活动", chooseLunchAction);
    return;
  }
  const actions = game.route === "student" ? getStudentDailyActions() : getTeacherDailyActions();
  renderActions("第一轮 · 日常行动", "上课、课间或午休：选择一项日常行动", actions);
}

function advanceAfterActionSelection() {
  if (game.gameEnded) return;
  checkThresholdRewards();
  checkImmediateEndings();
  if (game.gameEnded) return;
  if (game.currentActionPhase === "lunch") runPostLunchChecks();
  else chooseLunchAction();
}

function finishDailyAction() {
  advanceAfterActionSelection();
}

function chooseLunchAction() {
  if (game.gameEnded) return;
  game.currentActionPhase = "lunch";
  const activity = getCurrentCampusActivity();
  dom.phaseLabel.textContent = "第二轮 · 校园活动";
  dom.roundState.textContent = activity.title;
  const actions = game.route === "student" ? getStudentLunchActions() : getTeacherLunchActions();
  renderActions(`第二轮 · ${activity.title}`, `本轮只出现“${activity.title}”的专属选项。`, actions);
}

function finishLunchAction() {
  advanceAfterActionSelection();
}

function runPostLunchChecks() {
  game.currentActionPhase = "event";
  dom.phaseLabel.textContent = "事件判定";
  dom.roundState.textContent = "本周事件";
  const queue = [];
  const common = triggerCommonEventCheck();
  if (common) queue.push(common);
  const schoolEvent = window.Schooltopia?.maybeCreateEvent?.(game, {
    randomChance,
    makeEvent,
    applyStatChange,
    addLog,
  });
  if (schoolEvent) queue.push(schoolEvent);
  const rare = triggerRareEventCheck();
  if (rare) queue.push(rare);
  queue.push(...triggerTeacherSpecificCheck());
  const identityEvent = triggerIdentitySpecificEventCheck();
  if (identityEvent) queue.push(identityEvent);
  const evening = triggerEveningStudyEventCheck();
  if (evening) queue.push(evening);
  const npc = triggerNPCEventCheck();
  if (npc) queue.push(npc);
  const easterEgg = triggerEasterEggEventCheck();
  if (easterEgg) queue.push(easterEgg);

  runEventQueue(queue, () => {
    const ai = triggerAIEventCheck();
    if (ai) {
      runEventQueue([ai], () => endWeekUpdate());
      return;
    }
    if (!queue.length) addLog(randomChoice(TEXT.tips));
    endWeekUpdate();
  });
}

function endWeekUpdate() {
  if (game.gameEnded) return;
  if (game.route === "student") {
    if (game.stats.mood <= 2) game.counters.dontWantSchoolWeeks += 1;
    else game.counters.dontWantSchoolWeeks = 0;

    if (game.stats.mood >= 9) game.counters.highMoodWeeks += 1;
    else game.counters.highMoodWeeks = 0;

    if (game.stats.mood <= 2) game.counters.lowMoodWeeks += 1;
    else game.counters.lowMoodWeeks = 0;

    if (game.counters.dontWantSchoolWeeks >= 2) game.endingFlags.add("ending_flag_transfer_candidate");
    if (game.counters.highMoodWeeks >= 4) grantAchievement("achievement_smile_legend");
  }
  refreshDynamicStatuses();
  checkZeroStatPenalties();
  checkThresholdRewards();
  checkImmediateEndings();
  if (game.gameEnded) return;

  addLog(randomChoice(TEXT.tips));
  if (game.week >= 11) {
    game.week = 12;
    renderAll();
    runFinalWeek();
    return;
  }
  game.week += 1;
  renderAll();
  runNormalWeek();
}

function updateStudentDailyActionStreaks(actionId) {
  assertStudentRoute();
  if (hasStatus("status_dont_want_school")) {
    if (actionId !== "action_daily_study") game.counters.dailyStudyStreak = 0;
    if (!PHYSICAL_STUDENT_ACTIONS.has(actionId)) game.counters.sportsActionStreak = 0;
    return;
  }
  if (actionId === "action_daily_study") game.counters.dailyStudyStreak += 1;
  else game.counters.dailyStudyStreak = 0;

  if (PHYSICAL_STUDENT_ACTIONS.has(actionId)) {
    game.counters.sportsActionStreak += 1;
    game.temp.currentWeekChoseDailyPhysicalAction = true;
  } else {
    game.counters.sportsActionStreak = 0;
  }
}

function resetAllNormalActionStreaks() {
  if (game.route === "student") {
    game.counters.dailyStudyStreak = 0;
    game.counters.sportsActionStreak = 0;
    game.counters.lunchSoloStudyStreak = 0;
    game.counters.chatWithTeacherLunchStreak = 0;
    return;
  }
  game.counters.dragClassStreak = 0;
  game.counters.surpriseCheckStreak = 0;
  game.counters.teacherBadmintonStreak = 0;
}

function resetInactiveNormalActionStreaks(action) {
  if (!game || game.currentActionPhase !== "daily" || action.activityAction) return;
  if (game.route === "student") {
    if (action.normalCategory === "break") {
      game.counters.dailyStudyStreak = 0;
      game.counters.sportsActionStreak = 0;
    } else if (action.normalCategory === "class") {
      game.counters.lunchSoloStudyStreak = 0;
      game.counters.chatWithTeacherLunchStreak = 0;
    }
    return;
  }
  if (action.normalCategory === "break") {
    game.counters.dragClassStreak = 0;
    game.counters.surpriseCheckStreak = 0;
    game.counters.teacherBadmintonStreak = 0;
  }
}

function updateStudentLunchActionStreaks(actionId) {
  assertStudentRoute();
  if (hasStatus("status_dont_want_school")) {
    if (actionId !== "action_lunch_solo_study") game.counters.lunchSoloStudyStreak = 0;
    if (actionId !== "action_chat_with_teacher") game.counters.chatWithTeacherLunchStreak = 0;
    return;
  }
  if (actionId === "action_lunch_solo_study") game.counters.lunchSoloStudyStreak += 1;
  else game.counters.lunchSoloStudyStreak = 0;

  if (actionId === "action_chat_with_teacher") game.counters.chatWithTeacherLunchStreak += 1;
  else game.counters.chatWithTeacherLunchStreak = 0;
}

function updateTeacherDailyActionStreaks(actionId) {
  assertTeacherRoute();
  if (actionId === "action_drag_class") game.counters.dragClassStreak += 1;
  else game.counters.dragClassStreak = 0;

  if (actionId === "action_surprise_check") game.counters.surpriseCheckStreak += 1;
  else game.counters.surpriseCheckStreak = 0;

  if (actionId === "action_play_badminton_teacher") game.counters.teacherBadmintonStreak += 1;
  else game.counters.teacherBadmintonStreak = 0;
}

function getAllStudentDailyActions() {
  return [
    {
      id: "action_daily_study",
      name: "刷题",
      detail: "提升智慧，但会消耗心情；连续三周选择刷题可获得《刷题机器》。",
      effects: [["wisdom", 1], ["mood", -1]],
      run() {
        updateStudentDailyActionStreaks("action_daily_study");
        applyStatChange("student", "wisdom", 1, "action_daily_study");
        if (hasStatus("status_study_machine")) applyStatChange("student", "wisdom", 1, "status_study_machine");
        if (game.temp.nextDailyStudyNoMoodCost) {
          game.temp.nextDailyStudyNoMoodCost = false;
          addLog("老师今天心情不错，这次刷题没有消耗心情。");
        } else {
          applyStatChange("student", "mood", -1, "action_daily_study");
        }
        finishDailyAction();
      },
    },
    {
      id: "action_walk_during_break",
      name: "下午大课间溜圈",
      detail: "恢复体能和心情；体能很高时会进入《体育生の神秘力量》。",
      effects: [["stamina", 1], ["mood", 1]],
      disabled: () => !game.temp.canChoosePhysicalAction,
      run() {
        updateStudentDailyActionStreaks("action_walk_during_break");
        applyEffects("student", [
          ["stamina", 1],
          ["mood", 1],
        ], "action_walk_during_break");
        finishDailyAction();
      },
    },
    {
      id: "action_play_badminton_student",
      name: "打羽毛球",
      detail: "大幅恢复体能和心情，但会牺牲一点学习时间；连续体育行动可积累校运会传说条件。",
      effects: [["stamina", 2], ["mood", 1], ["wisdom", -1]],
      disabled: () => !game.temp.canChoosePhysicalAction,
      run() {
        updateStudentDailyActionStreaks("action_play_badminton_student");
        applyEffects("student", [
          ["stamina", 2],
          ["mood", 1],
          ["wisdom", -1],
        ], "action_play_badminton_student");
        finishDailyAction();
      },
    },
    {
      id: "action_serious_pe_class",
      name: "体育课认真参与",
      detail: "大幅恢复体能；体能很低时会额外救你一把。",
      effectText: "体能 +2；低体能时额外 +1",
      disabled: () => !game.temp.canChoosePhysicalAction,
      run() {
        updateStudentDailyActionStreaks("action_serious_pe_class");
        const wasLow = game.stats.stamina <= 2;
        applyStatChange("student", "stamina", 2, "action_serious_pe_class");
        if (wasLow) {
          applyStatChange("student", "stamina", 1, "action_serious_pe_class_low_stamina");
          addLog("因为你一直在拯救自己。");
        }
        finishDailyAction();
      },
    },
    {
      id: "action_ask_for_leave",
      name: "请假",
      detail: "成功会明显恢复心情并累计请假天数；失败会损失班主任信任和心情。",
      effectText: "成功：心情 +2；失败：班主任信任度 -1、心情 -1",
      run() {
        updateStudentDailyActionStreaks("action_ask_for_leave");
        game.temp.blockWisdomGainThisWeek = true;
        let rate = 30;
        if (hasTitle("title_homeroom_favorite") || game.stats.homeroomTrust >= 8) rate = 100;
        else if (game.stats.homeroomTrust >= 5) rate = 70;
        else if (game.stats.homeroomTrust >= 3) rate = 50;
        if (randomChance(rate)) {
          applyStatChange("student", "mood", 2, "action_ask_for_leave_success");
          game.counters.absenceCount += 1;
          game.counters.absenceDays += randomInt(1, 5);
          addLog("请假成功。");
        } else {
          applyEffects("student", [
            ["homeroomTrust", -1],
            ["mood", -1],
          ], "action_ask_for_leave_failed");
          addLog("请假失败。");
        }
        finishDailyAction();
      },
    },
    {
      id: "action_tell_cold_joke",
      name: "讲冷笑话",
      detail: "有一半机会让气氛变好，也有一半机会让空气突然安静。",
      effectText: "成功：同学好感 +1、心情 +1；失败：同学好感 -1",
      run() {
        updateStudentDailyActionStreaks("action_tell_cold_joke");
        game.counters.coldJokeCount += 1;
        if (randomChance(50)) {
          applyEffects("student", [
            ["peerFavor", 1],
            ["mood", 1],
          ], "action_tell_cold_joke_success");
        } else {
          applyStatChange("student", "peerFavor", -1, "action_tell_cold_joke_failed");
          addLog("空气突然安静。");
        }
        if (game.counters.coldJokeCount >= 10) {
          addLog("你的笑话没有杀伤力，但有沉默力，哈 哈 哈。");
        }
        finishDailyAction();
      },
    },
  ];
}

function getAllTeacherDailyActions() {
  return [
    {
      id: "action_grade_homework",
      name: "批作业",
      detail: "提升教学威严，但会明显消耗体能；批得够多会获得《红笔熟练工》。",
      effects: [["authority", 1], ["teacherStamina", -2]],
      disabled: () => hasStatus("status_red_pen_unusable"),
      run() {
        updateTeacherDailyActionStreaks("action_grade_homework");
        game.counters.homeworkGradingCount += 1;
        game.temp.choseGradeHomeworkThisWeek = true;
        applyStatChange("teacher", "authority", 1, "action_grade_homework");
        applyStatChange("teacher", "teacherStamina", -2, "action_grade_homework");
        if (hasTitle("title_red_pen_skilled_worker")) {
          applyStatChange("teacher", "teacherStamina", 1, "title_red_pen_skilled_worker");
        }
        if (game.temp.nextGradeHomeworkStaminaCostReduction > 0) {
          applyStatChange(
            "teacher",
            "teacherStamina",
            game.temp.nextGradeHomeworkStaminaCostReduction,
            "next_grade_homework_stamina_cost_reduction"
          );
          game.temp.nextGradeHomeworkStaminaCostReduction = 0;
        }
        if (game.stats.teacherStamina <= 1) addLog("体能已经见底，下一次批作业前最好先恢复一下。");
        addLog("你在和人类表达能力的下限搏斗。");
        finishDailyAction();
      },
    },
    {
      id: "action_classroom_interaction",
      name: "课堂互动",
      detail: "认真回应学生问题，明显提升学生好感并恢复一点教师心情。",
      effects: [["studentFavor", 2], ["teacherMood", 1]],
      run() {
        updateTeacherDailyActionStreaks("action_classroom_interaction");
        applyEffects("teacher", [
          ["studentFavor", 2],
          ["teacherMood", 1],
        ], "action_classroom_interaction");
        addLog("这节课没有推进很多进度，但学生终于觉得自己被听见了。");
        finishDailyAction();
      },
    },
    {
      id: "action_prepare_open_class",
      name: "准备公开课",
      detail: "提升年级组信任度，不损失学生好感；会消耗一点教师体能。",
      effects: [["gradeTrust", 1], ["teacherStamina", -1]],
      run() {
        updateTeacherDailyActionStreaks("action_prepare_open_class");
        applyEffects("teacher", [
          ["gradeTrust", 1],
          ["teacherStamina", -1],
        ], "action_prepare_open_class");
        addLog("你把公开课材料整理得像一份对现实的反击。");
        finishDailyAction();
      },
    },
    {
      id: "action_drag_class",
      name: "拖堂",
      detail: "提升教学威严，但学生好感会大幅下降；连续拖堂可能引发《学生起义》。",
      effects: [["authority", 1], ["studentFavor", -3], ["teacherStamina", -1]],
      run() {
        updateTeacherDailyActionStreaks("action_drag_class");
        game.classState.classAverageWisdom += 1;
        addLog("课堂掌控感提升了。");
        applyEffects("teacher", [
          ["authority", 1],
          ["studentFavor", -3],
          ["teacherStamina", -1],
        ], "action_drag_class");
        if (hasStatus("status_classroom_out_of_control") && game.flags.has("flag_next_drag_class_must_fail")) {
          applyEffects("teacher", [
            ["studentFavor", -1],
            ["teacherMood", -1],
          ], "drag_class_must_fail");
          game.flags.delete("flag_next_drag_class_must_fail");
          addLog("本次拖堂失败。");
        }
        addLog("你在考察学生的人生信念。");
        if (game.counters.dragClassStreak === 3) addLog("连续拖堂让班里的怨气明显升高。");
        finishDailyAction();
      },
    },
    {
      id: "action_surprise_check",
      name: "突击检查",
      detail: "提升年级组信任度，但会损失学生好感；连续突击检查会触发额外后果。",
      effectText: "成功：年级组信任度 +1、学生好感 -1；失败：教师心情 -1、学生好感 -1",
      run() {
        updateTeacherDailyActionStreaks("action_surprise_check");
        const successRate = getSurpriseCheckSuccessRate();
        addLog(`突击检查成功率：${successRate}%`);
        if (randomChance(successRate)) {
          applyEffects("teacher", [
            ["gradeTrust", 1],
            ["studentFavor", -1],
          ], "action_surprise_check_success");
          addLog("突击检查成功，年级组觉得你很可靠。");
        } else {
          applyEffects("teacher", [
            ["teacherMood", -1],
            ["studentFavor", -1],
          ], "action_surprise_check_failed");
          addLog("突击检查扑空，学生沉默地记住了这件事。");
        }
        if (game.counters.surpriseCheckStreak === 3) {
          applyStatChange("teacher", "studentFavor", -2, "surprise_check_streak");
          grantTitle("title_light_footed");
          addLog("连续突击检查让学生开始集体防御。");
        }
        finishDailyAction();
      },
    },
    {
      id: "action_make_hard_exam",
      name: "考试出难题",
      detail: "大幅提升教学威严，但会明显损失学生好感，并生成一次班级均分。",
      effects: [["authority", 2], ["studentFavor", -2]],
      run() {
        updateTeacherDailyActionStreaks("action_make_hard_exam");
        applyEffects("teacher", [
          ["authority", 2],
          ["studentFavor", -2],
        ], "action_make_hard_exam");
        game.classState.classAverageScore = 75 - game.stats.authority * 2 + randomInt(-10, 10);
        addLog(`本次班级均分：${game.classState.classAverageScore}`);
        if (game.classState.classAverageScore < 60) game.counters.lowScoreExamStreak += 1;
        else game.counters.lowScoreExamStreak = 0;
        addLog("你在考察学生的人生信念。");
        finishDailyAction();
      },
    },
    {
      id: "action_play_badminton_teacher",
      name: "教师打羽毛球",
      detail: "主要恢复教师体能，顺便恢复一点心情；连续选择可获得《办公室羽毛球王者》。",
      effects: [["teacherStamina", 4], ["teacherMood", 1]],
      run() {
        updateTeacherDailyActionStreaks("action_play_badminton_teacher");
        applyEffects("teacher", [
          ["teacherStamina", 4],
          ["teacherMood", 1],
        ], "action_play_badminton_teacher");
        finishDailyAction();
      },
    },
  ];
}

function getAllStudentLunchActions() {
  return [
    {
      id: "action_eat_with_classmates",
      name: "和同学吃饭",
      detail: "明显提升同学好感并恢复心情；同学关系很好时可能触发《复习资料共享联盟》。",
      effects: [["peerFavor", 2], ["mood", 2]],
      run() {
        updateStudentLunchActionStreaks("action_eat_with_classmates");
        game.counters.eatWithClassmatesCount += 1;
        applyEffects("student", [
          ["peerFavor", 2],
          ["mood", 2],
        ], "action_eat_with_classmates");
        if (game.stats.peerFavor >= 8 && randomChance(30)) {
          grantPermanentStatus("status_review_material_alliance");
        }
        addLog("你们吃的不是饭，是小组作业时期的人脉保险。");
        finishLunchAction();
      },
    },
    {
      id: "action_chat_with_teacher",
      name: "找老师聊天",
      detail: "明显提升班主任信任并恢复一点心情；连续找老师聊天会让同学眼中的你变得复杂。",
      effects: [["homeroomTrust", 2], ["mood", 1]],
      run() {
        updateStudentLunchActionStreaks("action_chat_with_teacher");
        applyEffects("student", [
          ["homeroomTrust", 2],
          ["mood", 1],
        ], "action_chat_with_teacher");
        if (game.counters.chatWithTeacherLunchStreak >= 3) {
          applyStatChange("student", "peerFavor", -1, "chat_with_teacher_lunch_streak");
          addLog("你在同学眼中的身份开始变得复杂。");
        }
        finishLunchAction();
      },
    },
    {
      id: "action_lunch_solo_study",
      name: "一个人刷题",
      detail: "提升智慧，但会消耗心情；智慧很高时能提高期末 Project 表现。",
      effects: [["wisdom", 1], ["mood", -1]],
      run() {
        updateStudentLunchActionStreaks("action_lunch_solo_study");
        applyEffects("student", [
          ["wisdom", 1],
          ["mood", -1],
        ], "action_lunch_solo_study");
        if (game.stats.wisdom >= 8) {
          game.projectScoreModifier += 1;
          addLog("期末 Project 的底气增加了。");
        }
        finishLunchAction();
      },
    },
    {
      id: "action_mystery_canteen_food",
      name: "勇闯神秘食堂菜品",
      detail: "随机触发体能、心情、智慧变化，或上吐下泻。",
      effectText: "随机：体能、心情或智慧变化，也可能上吐下泻",
      run() {
        updateStudentLunchActionStreaks("action_mystery_canteen_food");
        resolveMysteryCanteenFood("student");
        finishLunchAction();
      },
    },
  ];
}

function getAllTeacherLunchActions() {
  return [
    {
      id: "action_eat_in_office",
      name: "在办公室吃饭",
      detail: "专门恢复教师心情，不影响教师体能。",
      effects: [["teacherMood", 2]],
      run() {
        applyStatChange("teacher", "teacherMood", 2, "action_eat_in_office");
        finishLunchAction();
      },
    },
    {
      id: "action_teacher_power_nap",
      name: "趴桌午休",
      detail: "大幅恢复教师体能，不影响教师心情。",
      effects: [["teacherStamina", 3]],
      run() {
        applyStatChange("teacher", "teacherStamina", 3, "action_teacher_power_nap");
        addLog("你没有变快乐，但身体重新上线了一点。");
        finishLunchAction();
      },
    },
    {
      id: "action_chat_with_colleagues",
      name: "和同事聊天",
      detail: "提升年级组信任度，并恢复教师心情。",
      effects: [["gradeTrust", 2], ["teacherMood", 2]],
      run() {
        applyEffects("teacher", [
          ["gradeTrust", 2],
          ["teacherMood", 2],
        ], "action_chat_with_colleagues");
        finishLunchAction();
      },
    },
    {
      id: "action_after_class_tutoring",
      name: "课后答疑",
      detail: "认真帮学生解决问题，学生好感会大幅提升，但会消耗一些教师体能。",
      effects: [["studentFavor", 3], ["teacherStamina", -1]],
      run() {
        applyEffects("teacher", [
          ["studentFavor", 3],
          ["teacherStamina", -1],
        ], "action_after_class_tutoring");
        addLog("你没有放过知识点，但放过了学生。");
        finishLunchAction();
      },
    },
    {
      id: "action_listen_to_students",
      name: "听学生吐槽",
      detail: "学生好感明显提升，但教师心情会被现实轻轻撞一下。",
      effects: [["studentFavor", 2], ["teacherMood", -1]],
      run() {
        applyEffects("teacher", [
          ["studentFavor", 2],
          ["teacherMood", -1],
        ], "action_listen_to_students");
        addLog("你听完了。你理解了。你也更累了。");
        finishLunchAction();
      },
    },
    {
      id: "action_hide_in_empty_classroom",
      name: "躲进空教室回血",
      detail: "大幅恢复教师心情，但学生会觉得你突然消失了。",
      effects: [["teacherMood", 3], ["studentFavor", -1]],
      run() {
        applyEffects("teacher", [
          ["teacherMood", 3],
          ["studentFavor", -1],
        ], "action_hide_in_empty_classroom");
        finishLunchAction();
      },
    },
    {
      id: "action_mystery_canteen_food_teacher",
      name: "教师勇闯神秘食堂菜品",
      detail: "随机触发教师体能、教师心情、教学威严变化，或上吐下泻。",
      effectText: "随机：教师体能、教师心情或教学威严变化，也可能上吐下泻",
      run() {
        resolveMysteryCanteenFood("teacher");
        finishLunchAction();
      },
    },
  ];
}

function resolveMysteryCanteenFood(route) {
  let effects =
    route === "student"
      ? ["stamina_up", "stamina_down", "mood_up", "mood_down", "wisdom_up", "diarrhea"]
      : ["teacher_stamina_up", "teacher_stamina_down", "teacher_mood_up", "teacher_mood_down", "authority_up", "diarrhea"];

  if (game.flags.has("flag_canteen_positive_boost_next_time")) {
    game.flags.delete("flag_canteen_positive_boost_next_time");
    addLog("大厨的善意生效了，这次只会抽到正面菜品。");
    effects =
      route === "student"
        ? ["stamina_up", "mood_up", "wisdom_up"]
        : ["teacher_stamina_up", "teacher_mood_up", "authority_up"];
  }

  const result = randomChoice(effects);
  const negative = ["stamina_down", "mood_down", "teacher_stamina_down", "teacher_mood_down", "diarrhea"].includes(result);
  if (negative && hasTitle("title_canteen_warrior") && randomChance(20)) {
    addLog("食堂勇士免疫了本次负面效果。");
    return;
  }

  if (result === "stamina_up") applyStatChange("student", "stamina", 1, "mystery_canteen_food");
  if (result === "stamina_down") applyStatChange("student", "stamina", -1, "mystery_canteen_food");
  if (result === "mood_up") applyStatChange("student", "mood", 1, "mystery_canteen_food");
  if (result === "mood_down") applyStatChange("student", "mood", -1, "mystery_canteen_food");
  if (result === "wisdom_up") applyStatChange("student", "wisdom", 1, "mystery_canteen_food");
  if (result === "teacher_stamina_up") applyStatChange("teacher", "teacherStamina", 1, "mystery_canteen_food");
  if (result === "teacher_stamina_down") applyStatChange("teacher", "teacherStamina", -1, "mystery_canteen_food");
  if (result === "teacher_mood_up") applyStatChange("teacher", "teacherMood", 1, "mystery_canteen_food");
  if (result === "teacher_mood_down") applyStatChange("teacher", "teacherMood", -1, "mystery_canteen_food");
  if (result === "authority_up") applyStatChange("teacher", "authority", 1, "mystery_canteen_food");
  if (result === "diarrhea") applyDiarrhea(route, false);
  addLog("食堂菜品是一场盲盒式人体实验。");
}

function applyDiarrhea(route, enhanced) {
  if (hasTitle("title_canteen_warrior") && randomChance(20)) {
    addLog("食堂勇士免疫了本次负面效果。");
    return;
  }
  if (route === "student") {
    const wasOnIcuWatchlist = hasStatus("status_icu_watchlist");
    applyEffects("student", [
      ["stamina", enhanced ? -3 : -2],
      ["mood", -2],
    ], enhanced ? "diarrhea_enhanced" : "diarrhea");
    if (wasOnIcuWatchlist) {
      applyStatChange("student", "mood", -1, "icu_watchlist_physical_failure");
      addLog("ICU 观察名单让这次体能事故更伤心情。");
    }
    game.futurePhysicalActionBlockedWeeks = Math.max(game.futurePhysicalActionBlockedWeeks, 1);
    addLog(enhanced ? "上吐下泻强化版：下回合无法进行体能类行动。" : "上吐下泻：下回合不能选择体育课、打羽毛球或下午大课间溜圈。");
  } else {
    applyEffects("teacher", [
      ["teacherStamina", enhanced ? -3 : -2],
      ["teacherMood", -2],
    ], enhanced ? "diarrhea_enhanced" : "diarrhea");
  }
}

function makeEvent(config) {
  return {
    weight: 1,
    ...config,
  };
}

function continueOption(run = () => {}) {
  return { id: "choice_continue", name: "继续", run };
}

function canTriggerEvent(eventId, source = "direct") {
  if (!game || game.gameEnded || !eventId) return false;
  const meta = EVENT_META[eventId] || {};
  if (source === "randomPool" && meta.notInRandomPool) return false;
  if (!meta.explicitAllowDuplicate && game.currentWeekTriggeredEventIds.has(eventId)) return false;
  return true;
}

function runEventQueue(queue, onDone) {
  const events = queue.filter(Boolean);
  const next = () => {
    if (game.gameEnded) return;
    const event = events.shift();
    if (!event) {
      onDone();
      return;
    }
    if (!canTriggerEvent(event.id, event.source || "direct")) {
      next();
      return;
    }
    game.currentWeekTriggeredEventIds.add(event.id);
    openEvent(event, next);
  };
  next();
}

function openEvent(event, onDone) {
  if (!event || game.gameEnded) return;
  unlockCodex("event", event.id);
  playSound("event");
  activeEvent = event;
  activeEventDone = onDone;
  lastFocusedElement = document.activeElement;
  dom.eventTitle.textContent = event.name;
  dom.eventType.textContent = event.type || "事件";
  dom.eventDescription.textContent = event.description || "";
  dom.eventOptions.innerHTML = "";
  event.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "event-option";
    button.disabled = Boolean(option.disabled?.());
    if (typeof button.setAttribute === "function") {
      button.setAttribute("aria-keyshortcuts", `${String.fromCharCode(65 + index)} ${index + 1}`);
    }
    const name = document.createElement("strong");
    name.textContent = option.name;
    button.append(name);
    if (option.detail) {
      const detail = document.createElement("span");
      detail.textContent = option.detail;
      button.append(detail);
    }
    button.addEventListener("click", () => {
      if (button.disabled) return;
      playSound("action");
      dom.eventModal.classList.add("hidden");
      const researchBefore = window.Schooltopia?.snapshot?.(game) || {};
      const researchWeek = game?.week || 0;
      const researchPhase = game?.currentActionPhase || "event";
      clearRecentChanges();
      recordChronicleEntry("event", event.name, option.name);
      option.run?.();
      window.Schooltopia?.recordChoice?.(
        {
          source: "event",
          contextId: event.id,
          contextLabel: event.name,
          choiceId: option.id || `event_choice_${index}`,
          choiceLabel: option.name,
          week: researchWeek,
          phase: researchPhase,
        },
        researchBefore,
        window.Schooltopia?.snapshot?.(game) || {},
        game
      );
      checkThresholdRewards();
      checkImmediateEndings();
      if (game.gameEnded) return;
      const done = activeEventDone;
      activeEvent = null;
      activeEventDone = null;
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
      done?.();
    });
    dom.eventOptions.append(button);
  });
  activeOptionButtons = [...dom.eventOptions.querySelectorAll("button")];
  dom.eventModal.classList.remove("hidden");
  const firstEnabled = activeOptionButtons.find((button) => !button.disabled);
  if (firstEnabled && typeof firstEnabled.focus === "function") {
    firstEnabled.focus();
  }
}

function collapseEventModal() {
  if (!activeEvent || dom.eventModal.classList.contains("hidden")) return;
  dom.eventModal.classList.add("hidden");
  renderContinueAction("暂存事件", activeEvent.name, "继续处理暂存事件", () => {
    openEvent(activeEvent, activeEventDone);
  });
  addLog("事件已暂存，并没有跳过；继续前需要先处理它。");
}

function visibleOptionButtons() {
  const source = dom.eventModal.classList.contains("hidden")
    ? dom.actionList
    : dom.eventOptions;
  return [...source.querySelectorAll("button")].filter((button) => !button.disabled);
}

function handleShortcut(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  if (!dom.codexView.classList.contains("hidden") && event.key === "Escape") {
    event.preventDefault();
    closeCodex();
    return;
  }
  const modalOpen = !dom.eventModal.classList.contains("hidden");
  if (modalOpen && event.key === "Escape") {
    event.preventDefault();
    collapseEventModal();
    return;
  }
  if (modalOpen && event.key === "Tab") {
    const buttons = visibleOptionButtons();
    if (!buttons.length) return;
    const currentIndex = buttons.indexOf(document.activeElement);
    const nextIndex = event.shiftKey
      ? (currentIndex <= 0 ? buttons.length - 1 : currentIndex - 1)
      : (currentIndex >= buttons.length - 1 ? 0 : currentIndex + 1);
    event.preventDefault();
    buttons[nextIndex].focus();
    return;
  }

  const key = event.key.toLowerCase();
  let index = -1;
  if (/^[a-z]$/.test(key)) index = key.charCodeAt(0) - 97;
  if (/^[1-9]$/.test(key)) index = Number(key) - 1;
  if (index < 0) return;

  const buttons = visibleOptionButtons();
  if (!buttons[index]) return;
  event.preventDefault();
  buttons[index].click();
}

function randomEventFromPool(factories, source) {
  const candidates = factories
    .map((factory) => factory())
    .filter(Boolean)
    .filter((event) => canTriggerEvent(event.id, source))
    .map((event) => ({ ...event, source }));
  if (!candidates.length) return null;
  return weightedChoice(candidates);
}

function triggerCommonEventCheck() {
  const chance = game.route === "student" ? EVENT_CHANCES.commonStudent : EVENT_CHANCES.commonTeacher;
  if (!randomChance(difficultyChance(chance))) return null;
  const pool =
    game.route === "student"
      ? [eventPhoneCheck, eventReadingJournalDeadline, eventMissingGroupmate, eventSchoolWifiBroken, eventWanderingCanteenChef]
      : [eventSchoolWifiBroken, eventWanderingCanteenChef];
  return randomEventFromPool(pool, "randomPool");
}

function triggerRareEventCheck() {
  if (!randomChance(difficultyChance(EVENT_CHANCES.rare, "rare"))) return null;
  const pool = game.route === "student" ? [eventMysteriousSubstituteTeacher] : [];
  return randomEventFromPool(pool, "randomPool");
}

function triggerAIEventCheck() {
  if (game.route !== "student") return null;
  if (!game.temp.currentWeekHasHomeworkLikeTask) return null;
  const habitChance = 25 + game.aiHabit.dependency * 2 + game.aiHabit.efficiency;
  if (!randomChance(difficultyChance(habitChance))) return null;
  return eventAIChoice();
}

function triggerIdentitySpecificEventCheck() {
  if (game.route === "student" && game.identity === "boarder" && randomChance(difficultyChance(16))) {
    return eventDormInspection();
  }
  return null;
}

function triggerEveningStudyEventCheck() {
  if (game.route !== "student" || game.identity !== "boarder" || !randomChance(difficultyChance(20))) return null;
  return randomEventFromPool([eventEveningStudyQuiet, eventDormLateNightChat, eventAfterLightsOutHomework], "randomPool");
}

function triggerNPCEventCheck() {
  const chance = game.route === "student" ? EVENT_CHANCES.npcStudent : EVENT_CHANCES.npcTeacher;
  if (!randomChance(difficultyChance(chance, "rare"))) return null;
  const pool =
    game.route === "student"
      ? [eventWanderingCanteenChef, eventGradeDirectorRandomCheck, eventRayTeacherParrot]
      : [eventWanderingCanteenChef, eventGradeDirectorRandomCheck];
  return randomEventFromPool(pool, "randomPool");
}

function triggerEasterEggEventCheck() {
  if (
    game.route === "student" &&
    game.stats.mood <= 3 &&
    game.stats.peerFavor <= 3 &&
    randomChance(difficultyChance(3, "rare"))
  ) {
    return eventTurtleIncident();
  }
  return null;
}

function triggerTeacherSpecificCheck() {
  if (game.route !== "teacher") return [];
  const queue = [];
  if (game.temp.choseGradeHomeworkThisWeek && randomChance(difficultyChance(EVENT_CHANCES.homeworkGradingHell))) {
    queue.push(eventHomeworkGradingHell());
  }
  if (randomChance(getStudentRebellionRate())) queue.push(eventStudentRebellion());
  if (game.counters.lowScoreExamStreak >= 3) queue.push(eventDevilTeacher());
  if (game.stats.gradeTrust <= 2 && randomChance(difficultyChance(30))) queue.push(eventTemporaryGradeGroupTask());
  if (game.stats.teacherMood <= 2 && randomChance(difficultyChance(30))) queue.push(eventTeacherDoesNotWantWorkToday());
  return queue;
}

function calculatePhoneExposeRate() {
  let rate = 30;
  if (game.identity === "commuter") rate -= 10;
  if (game.stats.homeroomTrust <= 2) rate = 60;
  if (hasStatus("status_key_attention_target")) rate += 50;
  if (hasStatus("status_organ_phone")) rate += 30;
  if (game.temp.currentWeekGradeInspection) rate *= 2;
  return clamp(rate, 0, 90);
}

function calculateGenericExposeRate(base = 30) {
  let rate = base;
  if (hasStatus("status_key_attention_target")) rate += 50;
  if (game.temp.currentWeekGradeInspection) rate *= 2;
  return clamp(rate, 0, 90);
}

function consumePhoneImmunity() {
  if (game.counters.phoneCheckImmunity <= 0) return false;
  game.counters.phoneCheckImmunity -= 1;
  game.temp.phoneCheckImmunityUsedThisWeek = true;
  addLog("本次检查自动通过。");
  return true;
}

function applyOrganPhoneMoodBoost() {
  if (game.route === "student" && hasStatus("status_organ_phone")) {
    applyStatChange("student", "mood", 1, "status_organ_phone");
  }
}

function eventPhoneCheck() {
  if (game.route !== "student") return null;
  if (game.counters.phoneCheckImmunity > 0) {
    return makeEvent({
      id: "event_phone_check",
      name: "班主任突然查手机",
      type: "普通事件",
      description: "你还有手机检查豁免，本次检查会自动通过。",
      options: [continueOption(() => consumePhoneImmunity())],
    });
  }
  return makeEvent({
    id: "event_phone_check",
    name: "班主任突然查手机",
    type: "普通事件",
    description: "班主任突然开始查手机。\n\n你可以立刻上交、假装没带，或者在有备用机时交出备用机。",
    options: [
      {
        id: "choice_submit_phone",
        name: "立刻上交",
        run() {
          applyOrganPhoneMoodBoost();
          applyEffects("student", [
            ["homeroomTrust", 1],
            ["mood", -1],
          ], "choice_submit_phone");
          game.counters.phoneCaughtStreak = 0;
        },
      },
      {
        id: "choice_pretend_no_phone",
        name: "假装没带",
        detail: `当前暴露率：${calculatePhoneExposeRate()}%`,
        run() {
          applyOrganPhoneMoodBoost();
          if (randomChance(calculatePhoneExposeRate())) {
            applyEffects("student", [
              ["mood", -3],
              ["homeroomTrust", -2],
            ], "choice_pretend_no_phone_failed");
            game.counters.phoneCaughtStreak += 1;
            addLog("暴露率判定失败。");
          } else {
            applyEffects("student", [
              ["homeroomTrust", 1],
              ["mood", 1],
            ], "choice_pretend_no_phone_success");
            game.counters.phoneCaughtStreak = 0;
            addLog("暴露率判定成功。");
          }
          if (game.counters.phoneCaughtStreak >= 3) {
            grantPermanentStatus("status_organ_phone");
            addLog("手机已经成为你的体外器官。");
          }
        },
      },
      {
        id: "choice_submit_backup_phone",
        name: "交出备用机",
        disabled: () => !hasItem("item_backup_phone") && !hasStatus("status_organ_phone"),
        run() {
          applyOrganPhoneMoodBoost();
          let successRate = 0;
          if (hasItem("item_backup_phone") && hasStatus("status_organ_phone")) successRate = 90;
          else if (hasItem("item_backup_phone")) successRate = 80;
          else if (hasStatus("status_organ_phone")) successRate = 60;
          if (randomChance(successRate)) {
            applyStatChange("student", "mood", 1, "choice_submit_backup_phone_success");
            game.counters.phoneCaughtStreak = 0;
          } else {
            applyEffects("student", [
              ["mood", -4],
              ["homeroomTrust", -3],
            ], "choice_submit_backup_phone_failed");
            game.counters.phoneCaughtStreak += 1;
          }
          if (game.counters.phoneCaughtStreak >= 3) {
            grantPermanentStatus("status_organ_phone");
            addLog("手机已经成为你的体外器官。");
          }
        },
      },
    ],
  });
}

function eventReadingJournalDeadline() {
  if (game.route !== "student") return null;
  return makeEvent({
    id: "event_reading_journal_deadline",
    weight: 0.6,
    name: "Reading Journal 截止前一天",
    type: "普通事件",
    description: "你以为你没交的是 Reading Journal，其实你没交的是信任。",
    options: [
      {
        id: "choice_finish_on_time",
        name: "按时完成",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          applyEffects("student", [
            ["wisdom", 1],
            ["homeroomTrust", 1],
          ], "choice_finish_reading_journal_on_time");
        },
      },
      {
        id: "choice_finish_overnight",
        name: "熬夜完成",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          applyEffects("student", [
            ["wisdom", 1],
            ["stamina", -1],
            ["mood", -1],
          ], "choice_finish_reading_journal_overnight");
        },
      },
      {
        id: "choice_unfinished_reading_journal",
        name: "未完成",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          game.counters.badReadingJournalCount += 1;
          applyStatChange("student", "homeroomTrust", -1, "choice_unfinished_reading_journal");
          if (game.counters.badReadingJournalCount >= 5) {
            applyEffects("student", [
              ["homeroomTrust", -2],
              ["mood", -1],
            ], "bad_reading_journal_count_5");
          }
        },
      },
    ],
  });
}

function getGroupProjectPeerModifier() {
  return game.identity === "boarder" ? 1 : 0;
}

function eventMissingGroupmate() {
  if (game.route !== "student") return null;
  return makeEvent({
    id: "event_missing_groupmate",
    name: "小组作业队友失踪",
    type: "普通事件",
    description: "你是组长、组员、排版、引用格式和精神支柱。",
    options: [
      {
        id: "choice_finish_group_project_alone",
        name: "一个人完成",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          applyEffects("student", [
            ["wisdom", 2],
            ["mood", -2],
            ["peerFavor", 1 + getGroupProjectPeerModifier()],
          ], "choice_finish_group_project_alone");
        },
      },
      {
        id: "choice_group_project_give_up",
        name: "摆烂",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          applyEffects("student", [
            ["wisdom", -1],
            ["peerFavor", -2],
            ["mood", 1],
          ], "choice_group_project_give_up");
        },
      },
      {
        id: "choice_group_chat_tag_all",
        name: "在群里疯狂艾特",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          if (randomChance(50)) {
            applyStatChange("student", "peerFavor", 1 + getGroupProjectPeerModifier(), "choice_group_chat_tag_all_success");
          } else {
            applyEffects("student", [
              ["peerFavor", -1],
              ["mood", -1],
            ], "choice_group_chat_tag_all_failed");
          }
        },
      },
    ],
  });
}

function eventSchoolWifiBroken() {
  if (hasItem("item_mysterious_wifi_password")) {
    return makeEvent({
      id: "event_school_wifi_broken",
      weight: 0.6,
      name: "学校 WiFi 炸了",
      type: "普通事件",
      description: "神秘 WiFi 密码：88888888",
      options: [
        continueOption(() => {
          if (game.route === "student") applyStatChange("student", "mood", 1, "item_mysterious_wifi_password");
          if (game.route === "teacher") applyStatChange("teacher", "teacherMood", 1, "item_mysterious_wifi_password");
        }),
      ],
    });
  }
  return makeEvent({
    id: "event_school_wifi_broken",
    weight: 0.6,
    name: "学校 WiFi 炸了",
    type: "普通事件",
    description: "学校 WiFi 突然断开。\n\n如果你的智慧或教学威严足够高，可以尝试“智慧用电物联”。",
    options: [
      {
        id: "choice_wait_teacher_fix_wifi",
        name: "等老师修",
        run() {
          if (game.route === "student") applyStatChange("student", "mood", -1, "choice_wait_teacher_fix_wifi");
          if (game.route === "teacher") applyStatChange("teacher", "teacherMood", -1, "choice_wait_teacher_fix_wifi");
        },
      },
      {
        id: "choice_smart_electric_iot",
        name: "智慧用电物联",
        disabled: () =>
          (game.route === "student" && game.stats.wisdom < 8) ||
          (game.route === "teacher" && game.stats.authority < 8),
        run() {
          grantAchievement("achievement_smart_electric_iot_engineer");
          if (game.route === "teacher") applyStatChange("teacher", "studentFavor", 1, "choice_smart_electric_iot_teacher");
          addLog("密码：88888888。\n你不知道它为什么能用，但它确实能用。");
        },
      },
    ],
  });
}

function eventWanderingCanteenChef() {
  const description =
    game.route === "teacher"
      ? "食堂游荡大厨随机询问老师对饭菜的评价。\n\n食堂菜品是一场盲盒式人体实验。"
      : "食堂游荡大厨随机询问学生对饭菜的评价。\n\n食堂菜品是一场盲盒式人体实验。";
  return makeEvent({
    id: "event_wandering_canteen_chef",
    weight: 0.55,
    name: "食堂游荡大厨",
    type: "普通事件 / 神秘 NPC",
    description,
    options: [
      {
        id: "choice_praise_chef",
        name: "真诚夸奖",
        run() {
          if (game.route === "student") applyStatChange("student", "mood", 1, "choice_praise_chef");
          if (game.route === "teacher") applyStatChange("teacher", "teacherMood", 1, "choice_praise_chef");
          if (randomChance(30)) {
            game.flags.add("flag_canteen_positive_boost_next_time");
            addLog("大厨记住了你的夸奖，下次神秘食堂菜品会更友好。");
          }
        },
      },
      {
        id: "choice_suggest_chef",
        name: "委婉建议",
        run() {
          if (game.route === "student") applyStatChange("student", "wisdom", 1, "choice_suggest_chef");
          if (game.route === "teacher") applyStatChange("teacher", "authority", 1, "choice_suggest_chef");
        },
      },
      {
        id: "choice_tell_chef_truth",
        name: "说出真相",
        run() {
          if (randomChance(50)) grantTitle("title_canteen_warrior");
          else applyDiarrhea(game.route, true);
        },
      },
    ],
  });
}

function eventTeacherGoodMoodToday() {
  return makeEvent({
    id: "event_teacher_good_mood_today",
    name: "老师今天心情不错",
    type: "稀有事件",
    description: "今天的老师像一个人类，而不是 DDL 的使者。",
    options: [
      continueOption(() => {
          if (game.route === "student") {
            applyStatChange("student", "mood", 2, "event_teacher_good_mood_today");
            game.temp.nextDailyStudyNoMoodCost = true;
            addLog("下一次刷题不会额外消耗心情。");
          } else {
            applyStatChange("teacher", "teacherMood", 2, "event_teacher_good_mood_today");
            game.temp.nextGradeHomeworkStaminaCostReduction += 1;
            addLog("下一次批作业会省一点体力。");
          }
        }),
      ],
  });
}

function eventMysteriousSubstituteTeacher() {
  if (game.route !== "student") return null;
  return makeEvent({
    id: "event_mysterious_substitute_teacher",
    name: "神秘代课老师",
    type: "稀有事件",
    description: "本节课≈自由活动。\n\n代课老师是命运给你的短暂赦免。",
    options: [
      { id: "choice_substitute_slack", name: "摸鱼", run: () => applyStatChange("student", "mood", 2, "choice_substitute_slack") },
      { id: "choice_substitute_study", name: "刷题", run: () => applyStatChange("student", "wisdom", 2, "choice_substitute_study") },
      {
        id: "choice_substitute_chat",
        name: "和同学聊天",
        run() {
          applyEffects("student", [
            ["peerFavor", 2],
            ["mood", 1],
          ], "choice_substitute_chat");
        },
      },
    ],
  });
}

function eventTrafficJam() {
  if (game.route !== "student") return null;
  const lateRate = clamp(game.temp.baseLateRate + 50, 0, 90);
  game.temp.lastLateRate = lateRate;
  return makeEvent({
    id: "event_traffic_jam",
    name: "堵车",
    type: "稀有事件",
    description: `你在和上海交通进行哲学辩论。\n\n迟到概率：${lateRate}%`,
    options: [
      continueOption(() => {
        if (randomChance(lateRate)) {
          game.counters.lateCount += 1;
          applyEffects("student", [
            ["homeroomTrust", -1],
            ["mood", -1],
          ], "event_traffic_jam_late");
        }
      }),
    ],
  });
}

function eventGradeInspection() {
  return makeEvent({
    id: "event_grade_inspection",
    name: "年级巡查",
    type: "稀有事件",
    description: "年级主任的脚步声，是校园恐怖游戏的 BGM。",
    options:
      game.route === "teacher"
        ? [
            {
              id: "choice_cooperate_grade_inspection",
              name: "配合巡查",
              run() {
                game.temp.currentWeekGradeInspection = true;
                applyEffects("teacher", [
                  ["gradeTrust", 2],
                  ["studentFavor", -1],
                ], "choice_cooperate_grade_inspection");
                game.counters.gradeInspectionCooperateCount += 1;
                if (hasTitle("title_grade_group_hidden_boss")) {
                  applyStatChange("teacher", "gradeTrust", 1, "hidden_boss_extra_grade_trust");
                }
              },
            },
          ]
        : [
            continueOption(() => {
              game.temp.currentWeekGradeInspection = true;
            }),
          ],
  });
}

function eventDormInspection() {
  if (game.route !== "student" || game.identity !== "boarder") return null;
  return makeEvent({
    id: "event_dorm_inspection",
    name: "宿管巡查",
    type: "稀有事件 / 身份事件",
    description: "住宿生专属事件。",
    options: [
      {
        id: "choice_dorm_pretend_sleep",
        name: "假装睡觉",
        run() {
          if (game.stats.mood >= 5) applyStatChange("student", "mood", 1, "choice_dorm_pretend_sleep_success");
          else applyStatChange("student", "mood", -1, "choice_dorm_pretend_sleep_failed");
        },
      },
      {
        id: "choice_dorm_keep_homework",
        name: "继续写作业",
        run() {
          game.temp.currentWeekHasHomeworkLikeTask = true;
          applyEffects("student", [
            ["wisdom", 1],
            ["stamina", -1],
          ], "choice_dorm_keep_homework");
        },
      },
      {
        id: "choice_dorm_keep_chat",
        name: "继续聊天",
        run() {
          applyStatChange("student", "peerFavor", 1, "choice_dorm_keep_chat");
          const caughtRate = calculateGenericExposeRate(30);
          game.temp.lastCaughtRate = caughtRate;
          if (randomChance(caughtRate)) {
            applyEffects("student", [
              ["homeroomTrust", -1],
              ["mood", -1],
            ], "choice_dorm_keep_chat_caught");
            addLog("被发现。");
          }
        },
      },
    ],
  });
}

function eventEveningStudyQuiet() {
  return makeEvent({
    id: "event_evening_study_quiet",
    name: "晚自习突然安静",
    type: "晚自习事件",
    description: "晚自习突然安静。",
    options: [
      continueOption(() => {
        const gain = Math.max(0, 1 + game.temp.eveningStudyWisdomGainModifier + (game.stats.mood <= 3 ? -1 : 0));
        if (gain > 0) {
          applyStatChange("student", "wisdom", gain, "event_evening_study_quiet");
        } else {
          addLog("晚自习很安静，但你完全读不进去。");
        }
      }),
    ],
  });
}

function eventDormLateNightChat() {
  return makeEvent({
    id: "event_dorm_late_night_chat",
    name: "宿舍夜谈失控",
    type: "晚自习事件",
    description: "宿舍夜谈失控。",
    options: [
      continueOption(() => {
        applyEffects("student", [
          ["peerFavor", 1],
          ["mood", 1],
          ["stamina", -1],
        ], "event_dorm_late_night_chat");
      }),
    ],
  });
}

function eventAfterLightsOutHomework() {
  return makeEvent({
    id: "event_after_lights_out_homework",
    name: "熄灯后继续写作业",
    type: "晚自习事件",
    description: "熄灯后继续写作业。",
    options: [
      continueOption(() => {
        game.temp.currentWeekHasHomeworkLikeTask = true;
        applyEffects("student", [
          ["wisdom", 1],
          ["stamina", -1],
          ["mood", -1],
        ], "event_after_lights_out_homework");
      }),
    ],
  });
}

function adjustAIHabit(deltas) {
  if (!game || game.route !== "student") return;
  const messages = [];
  Object.entries(deltas).forEach(([key, delta]) => {
    if (!(key in game.aiHabit) || delta === 0) return;
    const before = game.aiHabit[key];
    game.aiHabit[key] = clamp(before + delta, 0, 10);
    const actual = game.aiHabit[key] - before;
    if (actual !== 0) {
      const name = AI_HABITS.find((habit) => habit.id === key)?.name || key;
      messages.push(`${name}${actual > 0 ? "+" : ""}${actual}`);
    }
  });
  if (messages.length) addLog(`AI 使用习惯变化：${messages.join("，")}`);
  renderAll();
}

function getAiCopyDetectionChance() {
  const difficulty = difficultyConfig(game.difficulty);
  const base = 12 + game.aiHabit.risk * 4 + game.aiHabit.dependency * 2 - game.aiHabit.integrity * 2;
  return clamp(Math.round(base * difficulty.aiRiskMultiplier), 5, 75);
}

function resolveAIChoice(choiceId, options = {}) {
  assertStudentRoute();
  game.temp.finalProjectChoice = options.finalProject ? choiceId : game.temp.finalProjectChoice;
  if (choiceId === "choice_no_ai") {
    adjustAIHabit({ efficiency: -1, integrity: 2, dependency: -2, risk: -1 });
    applyStatChange("student", "wisdom", 2, "choice_no_ai");
    applyStatChange("student", "mood", -1, "choice_no_ai");
    if (hasStatus("status_ai_dependency") || game.aiHabit.dependency >= 7) {
      applyStatChange("student", "mood", -1, "ai_dependency_no_ai_penalty");
    }
    addLog("你选择了人类尊严，也选择了多花三个小时。");
  }
  if (choiceId === "choice_ai_reference") {
    adjustAIHabit({ efficiency: 1, integrity: 1, dependency: 1, risk: 1 });
    const wisdomGain = hasStatus("status_ai_dependency") || game.aiHabit.dependency >= 8 ? 0 : 1;
    if (wisdomGain > 0) applyStatChange("student", "wisdom", wisdomGain, "choice_ai_reference");
    else addLog("AI 依赖症抵消了这次智慧提升。");
    applyStatChange("student", "mood", 1, "choice_ai_reference");
    if (game.aiHabit.integrity >= 8 && game.aiHabit.dependency <= 4) {
      applyStatChange("student", "wisdom", 1, "ai_habit_integrity_reference");
      addLog("你把 AI 当工具，而不是当替身。");
    }
    game.counters.aiReferenceCount += 1;
    game.counters.aiUseCount += 1;
    addLog("你没有被 AI 替代，你只是学会了和非人生物合作。");
  }
  if (choiceId === "choice_ai_copy_all") {
    adjustAIHabit({ efficiency: 3, integrity: -2, dependency: 3, risk: 3 });
    applyStatChange("student", "mood", 3, "choice_ai_copy_all");
    applyStatChange("student", "wisdom", -1, "choice_ai_copy_all");
    game.counters.aiCopyCount += 1;
    game.counters.aiUseCount += 1;
    const detectedChance = getAiCopyDetectionChance();
    addLog(`AI 风险判定：${detectedChance}%`);
    if (randomChance(detectedChance)) applyStatChange("student", "homeroomTrust", -2, "ai_copy_detected");
    if (options.finalProject && game.counters.aiCopyCount >= 10) triggerEnding("ending_ai_graduates_for_me");
  }
  checkThresholdRewards();
  checkImmediateEndings();
}

function eventAIChoice() {
  if (game.route !== "student") return null;
  const risk = getAiCopyDetectionChance();
  return makeEvent({
    id: "event_ai_choice",
    name: "AI 事件",
    type: "AI 事件",
    description: "写作业、Project 或 Reading Journal 时，AI 选项出现了。\n\n你的选择会长期改变效率、诚信、依赖和风险。",
    options: [
      { id: "choice_no_ai", name: "不使用 AI", detail: "智慧提升更多，但心情会下降；诚信上升，依赖和风险下降。", run: () => resolveAIChoice("choice_no_ai") },
      { id: "choice_ai_reference", name: "适度参考", detail: "小幅提升效率和心情；保持诚信时，后续收益更可靠。", run: () => resolveAIChoice("choice_ai_reference") },
      { id: "choice_ai_copy_all", name: "全部复制", detail: `效率很高，心情大涨，但智慧下降；当前被发现风险：${risk}%`, run: () => resolveAIChoice("choice_ai_copy_all") },
    ],
  });
}

function eventHomeworkGradingHell() {
  return makeEvent({
    id: "event_homework_grading_hell",
    name: "批作业地狱",
    type: "教师专属事件",
    description: "批作业地狱。",
    options: [
      continueOption(() => {
        const roll = randomInt(1, 100);
        if (roll <= 50) applyStatChange("teacher", "teacherMood", -1, "event_homework_grading_hell_bad_answer");
        else if (roll <= 80) applyStatChange("teacher", "teacherMood", 1, "event_homework_grading_hell_good_answer");
        else applyStatChange("teacher", "teacherStamina", -1, "event_homework_grading_hell_silence");
      }),
    ],
  });
}

function getStudentRebellionReasons() {
  const reasons = [];
  if (game.counters.dragClassStreak >= 2) reasons.push("连续拖堂");
  if (game.counters.surpriseCheckStreak >= 2) reasons.push("连续突击检查");
  if (hasStatus("status_classroom_out_of_control")) reasons.push("课堂已经失控");
  if (reasons.length && game.stats.studentFavor <= 2) reasons.push("学生好感过低");
  if (reasons.length && game.stats.authority <= 2) reasons.push("教学威严过低");
  return reasons;
}

function getStudentRebellionRate() {
  let rate = 0;
  if (game.counters.dragClassStreak >= 2) {
    rate += game.classState.baseStudentRebellionRate + (game.counters.dragClassStreak - 1) * 5;
  }
  if (game.counters.surpriseCheckStreak >= 2) {
    rate += (game.counters.surpriseCheckStreak - 1) * 4;
  }
  if (hasStatus("status_classroom_out_of_control")) rate += 8;
  if (rate > 0 && game.stats.studentFavor <= 2) rate += 4;
  if (rate > 0 && game.stats.authority <= 2) rate += 5;
  return clamp(rate, 0, 30);
}

function getSurpriseCheckSuccessRate() {
  let rate = 50;
  if (game.stats.gradeTrust >= 8) rate += 20;
  if (hasTitle("title_grade_group_hidden_boss")) rate += 20;
  if (hasTitle("title_walking_grade_inspection")) rate += 10;
  return clamp(rate, 0, 100);
}

function triggerStudentRebellion() {
  const reasons = getStudentRebellionReasons();
  game.flags.add("flag_student_rebellion_triggered");
  game.counters.studentRebellionTriggeredCount += 1;
  if (reasons.length) addLog(`学生起义触发原因：${reasons.join("、")}。`);
  applyEffects("teacher", [
    ["studentFavor", -2],
    ["teacherMood", -2],
  ], "event_student_rebellion");
  if (game.stats.authority >= 8) {
    applyStatChange("teacher", "gradeTrust", 1, "student_rebellion_suppressed");
    game.counters.studentRebellionSuppressedCount += 1;
    addLog("镇压成功。");
  } else if (game.stats.authority <= 3) {
    grantPermanentStatus("status_classroom_out_of_control");
    addLog("镇压失败。");
  }
}

function eventStudentRebellion() {
  const reasons = getStudentRebellionReasons();
  const reasonText = reasons.length ? `触发原因：${reasons.join("、")}。` : "触发原因：班级怨气持续累积。";
  return makeEvent({
    id: "event_student_rebellion",
    name: "学生起义",
    type: "教师专属事件",
    description: `学生起义。\n\n${reasonText}`,
    options: [continueOption(() => triggerStudentRebellion())],
  });
}

function eventDevilTeacher() {
  return makeEvent({
    id: "event_devil_teacher",
    name: "恶魔教师事件",
    type: "教师专属事件",
    description: "恶魔教师事件。",
    options: [
      continueOption(() => {
        grantAchievement("achievement_devil_teacher");
        applyEffects("teacher", [
          ["authority", 2],
          ["studentFavor", -3],
        ], "event_devil_teacher");
      }),
    ],
  });
}

function eventTemporaryGradeGroupTask() {
  return makeEvent({
    id: "event_temporary_grade_group_task",
    name: "年级组临时任务",
    type: "教师专属事件",
    description: "信任度低不是没人管你，是所有杂活都想起了你。",
    options: [
      continueOption(() => {
        applyEffects("teacher", [
          ["teacherStamina", -2],
          ["gradeTrust", 1],
        ], "event_temporary_grade_group_task");
        addLog("杂活主要消耗体能，但至少没有继续压心情。");
      }),
    ],
  });
}

function eventTeacherDoesNotWantWorkToday() {
  return makeEvent({
    id: "event_teacher_does_not_want_work_today",
    name: "老师今天不想上班",
    type: "教师专属事件",
    description: "你短暂地理解了学生为什么不想上学。",
    options: [
      continueOption(() => {
        applyEffects("teacher", [
          ["teacherMood", -1],
          ["studentFavor", 1],
        ], "event_teacher_does_not_want_work_today");
      }),
    ],
  });
}

function eventGradeDirectorRandomCheck() {
  return makeEvent({
    id: "event_grade_director_random_check",
    name: "步履轻盈的年级主任",
    type: "神秘 NPC",
    description:
      game.route === "teacher"
        ? "你刚把教案合上，年级主任已经站在教室后门，开始检查课堂秩序和备课痕迹。"
        : "你还没看见他，他已经看见你的手机屏幕亮了一下。",
    options:
      game.route === "teacher"
        ? [
            {
              id: "choice_cooperate_grade_director",
              name: "配合巡查",
              run() {
                applyEffects("teacher", [
                  ["gradeTrust", 2],
                  ["studentFavor", -1],
                ], "choice_cooperate_grade_director");
                game.counters.gradeInspectionCooperateCount += 1;
                if (hasTitle("title_grade_group_hidden_boss")) {
                  applyStatChange("teacher", "gradeTrust", 1, "hidden_boss_extra_grade_trust");
                }
              },
            },
          ]
        : [
            continueOption(() => {
              const checkType = randomChoice(["phone", "uniform", "late", "evening_study"]);
              const exposeRate = checkType === "phone" ? calculatePhoneExposeRate() : calculateGenericExposeRate(30);
              game.temp.lastCaughtRate = exposeRate;
              if (consumePhoneImmunity()) return;
              if (randomChance(exposeRate)) {
                applyEffects("student", [
                  ["homeroomTrust", -1],
                  ["mood", -1],
                ], "grade_director_check_failed");
              } else {
                applyStatChange("student", "mood", 1, "grade_director_check_passed");
              }
            }),
          ],
  });
}

function eventRayTeacherParrot() {
  if (game.route !== "student") return null;
  if (hasAchievement("achievement_ray_teacher_parrot")) return null;
  return makeEvent({
    id: "event_ray_teacher_parrot",
    weight: 0.35,
    name: "Ray 老师的鹦鹉",
    type: "神秘 NPC",
    description: "Ray 老师的鹦鹉随机飞到某位同学头上。",
    options: [
      continueOption(() => {
        game.counters.parrotChosenCount += 1;
        applyEffects("student", [
          ["mood", 1],
          ["peerFavor", 1],
        ], "event_ray_teacher_parrot");
      }),
    ],
  });
}

function eventTurtleIncident() {
  return makeEvent({
    id: "event_turtle_incident",
    name: "被同学砸死（乌龟）",
    type: "彩蛋事件",
    description: "你短暂变成了一只乌龟。\n你以第一视角体验了校园地面的高度。\n世界突然变得很大，同学的鞋底也很大。",
    options: [
      continueOption(() => {
        game.futureDailyActionSkippedWeeks = Math.max(game.futureDailyActionSkippedWeeks, 1);
        applyStatChange("student", "stamina", 1, "event_turtle_incident");
        applyStatChange("student", "mood", -1, "event_turtle_incident");
        grantAchievement("achievement_turtle_shell_defense");
        if (game.temp.isFinalWeek) {
          applyStatChange("student", "mood", -1, "event_turtle_incident_final_week");
          addLog("乌龟也要考期末。");
        }
      }),
    ],
  });
}

function applyDifficultyFinalDrain(route, label) {
  const drain = difficultyConfig(game.difficulty).finalDrain;
  if (drain <= 0) return;
  if (route === "student") {
    applyEffects("student", [
      ["stamina", -drain],
      ["mood", -drain],
    ], label);
  } else {
    const teacherMoodDrain = Math.max(0, drain - 1);
    applyEffects("teacher", [
      ["teacherStamina", -drain],
      ["teacherMood", -teacherMoodDrain],
    ], label);
  }
  addLog("地狱期末模式追加压力生效。");
}

function runFinalWeek() {
  if (game.gameEnded) return;
  game.temp.isFinalWeek = true;
  game.week = 12;
  dom.phaseLabel.textContent = "终极 Boss";
  dom.roundState.textContent = "期末周";
  renderAll();
  addLog("第 12 周自动进入终极 Boss：期末周。");
  if (game.route === "student") {
    runStudentFinalWeek();
  } else {
    runTeacherFinalWeek();
  }
}

function runStudentFinalWeek() {
  runJingdezhenStage();
  if (game.gameEnded) return;
  openEvent(eventFinalProjectAIChoice(), () => {
    if (game.gameEnded) return;
    runFinalProjectStage();
    if (game.gameEnded) return;
    runFinalExamStage();
    if (game.gameEnded) return;
    determineFinalEnding();
  });
}

function runJingdezhenStage() {
  const difficulty = difficultyConfig(game.difficulty);
  addLog("第一阶段：景德镇一周素质拓展活动。");
  const staminaBeforeStage = game.stats.stamina;
  const hadAthletePower = hasStatus("status_mysterious_athlete_power");
  applyEffects("student", [
    ["stamina", -2],
    ["mood", -2],
  ], "jingdezhen_stage");
  applyDifficultyFinalDrain("student", "difficulty_jingdezhen_stage");
  game.counters.runJingdezhenRunCount += 1;
  game.metaSave.totalJingdezhenRunCount += 1;
  saveMetaSave();
  game.temp.jingdezhenScore = game.stats.stamina;
  if (staminaBeforeStage >= 8) {
    grantAchievement("achievement_jingdezhen_survivor");
    applyStatChange("student", "mood", 1, "jingdezhen_stamina_8");
  }
  if (hadAthletePower) {
    game.temp.jingdezhenScore += 1;
    addLog("体育生の神秘力量帮你扛过了景德镇。");
  }
  if (game.stats.stamina <= 2) {
    applyStatChange("student", "mood", -2, "jingdezhen_stamina_low");
    game.flags.add("flag_final_week_icu_enhanced");
  }
  if (
    game.metaSave.totalJingdezhenRunCount >= difficulty.jingdezhenResidentRuns &&
    (game.temp.jingdezhenScore <= 2 || (game.stats.stamina <= 1 && game.stats.mood <= 2))
  ) {
    game.endingFlags.add("ending_flag_jingdezhen_resident_candidate");
    addLog("你已经太熟悉景德镇了，而且这次真的被它击穿了。");
  }
}

function eventFinalProjectAIChoice() {
  const risk = getAiCopyDetectionChance();
  return makeEvent({
    id: "event_final_project_ai_choice",
    name: "全科期末 Project",
    type: "终极 Boss",
    description: "期末 Project 阶段必定提供 AI 选择。\n\n这一刻会结算你整学期的 AI 使用习惯。",
    options: [
      { id: "choice_no_ai", name: "不使用 AI", detail: "保住诚信和自主性，但会消耗心情。", run: () => resolveAIChoice("choice_no_ai", { finalProject: true }) },
      { id: "choice_ai_reference", name: "适度参考", detail: "风险较低的工具型使用方式，会看你的长期习惯。", run: () => resolveAIChoice("choice_ai_reference", { finalProject: true }) },
      { id: "choice_ai_copy_all", name: "全部复制", detail: `速度最快，但期末被发现风险：${risk}%`, run: () => resolveAIChoice("choice_ai_copy_all", { finalProject: true }) },
    ],
  });
}

function runFinalProjectStage() {
  const difficulty = difficultyConfig(game.difficulty);
  addLog("第二阶段：全科期末 Project。");
  let score = game.stats.wisdom;
  if (game.stats.wisdom >= 7) score += 2;
  if (game.stats.peerFavor >= 8) score += 1;
  else if (game.stats.peerFavor <= 2) score -= 1;
  if (game.stats.mood <= 2) score -= 2;
  else if (game.stats.mood >= 8) score += 1;
  if (hasStatus("status_ai_dependency")) score -= 1;
  score += Math.floor(game.aiHabit.efficiency / 4);
  if (game.aiHabit.integrity >= 8 && game.aiHabit.risk <= 4) score += 1;
  if (game.aiHabit.dependency >= 8) score -= 1;
  if (game.aiHabit.risk >= 8) score -= 1;
  score += difficulty.finalScoreModifier;
  score += game.projectScoreModifier;
  game.temp.projectScore = score;
  if (score >= difficulty.projectTarget) {
    applyEffects("student", [
      ["wisdom", 1],
      ["mood", 1],
    ], "final_project_success");
    game.flags.add("flag_final_project_success");
  } else {
    applyEffects("student", [
      ["mood", -2],
      ["homeroomTrust", -1],
    ], "final_project_failed");
    game.flags.add("flag_final_project_failed");
  }
}

function runFinalExamStage() {
  const difficulty = difficultyConfig(game.difficulty);
  addLog("第三阶段：期末考试。");
  const staminaBeforeExam = game.stats.stamina;
  const moodBeforeExam = game.stats.mood;
  const hadAthletePower = hasStatus("status_mysterious_athlete_power");
  applyEffects("student", [
    ["stamina", -2],
    ["mood", -2],
  ], "final_exam_stage");
  applyDifficultyFinalDrain("student", "difficulty_final_exam_stage");
  let examScore = game.stats.wisdom;
  if (staminaBeforeExam >= 8) examScore += 1;
  else if (game.stats.stamina <= 2) examScore -= 1;
  if (moodBeforeExam >= 8) examScore += 1;
  else if (game.stats.mood <= 3) {
    examScore += randomInt(-2, 2);
    addLog("你的脑子正在重新加载。");
  }
  if (hadAthletePower) examScore += 1;
  if (hasStatus("status_review_material_alliance")) examScore += 2;
  if (hasStatus("status_study_machine")) {
    examScore += 1;
    applyStatChange("student", "mood", -1, "status_study_machine_final_exam");
  }
  examScore += difficulty.finalScoreModifier;
  game.temp.examScore = examScore;
  if (examScore >= difficulty.examTarget) {
    game.flags.add("flag_final_exam_success");
  } else {
    applyStatChange("student", "mood", -2, "final_exam_failed");
    applyStatChange("student", "wisdom", -1, "final_exam_failed");
    game.flags.add("flag_final_exam_failed");
  }
  if (examScore <= 3 && game.stats.wisdom <= 3) {
    game.endingFlags.add("ending_flag_no_school_candidate");
  }
}

function runTeacherFinalWeek() {
  runInvigilationStage();
  if (game.gameEnded) return;
  runFinalGradingStage();
  if (game.gameEnded) return;
  runGradeSummaryStage();
  if (game.gameEnded) return;
  determineFinalEnding();
}

function runInvigilationStage() {
  addLog("第一阶段：监考。");
  applyEffects("teacher", [
    ["teacherStamina", -2],
    ["teacherMood", -1],
  ], "invigilation_stage");
  applyDifficultyFinalDrain("teacher", "difficulty_invigilation_stage");
  if (game.stats.authority >= 8) applyStatChange("teacher", "gradeTrust", 1, "invigilation_authority_8");
  if (game.stats.teacherStamina <= 1) addLog("体能快见底了，但你暂时还能靠职业本能撑住。");
  addLog("你站在考场前方，像一个会移动的倒计时。");
}

function runFinalGradingStage() {
  addLog("第二阶段：批期末卷。");
  game.counters.homeworkGradingCount += 1;
  applyEffects("teacher", [
    ["teacherStamina", -2],
    ["teacherMood", -2],
  ], "final_grading_stage");
  applyDifficultyFinalDrain("teacher", "difficulty_final_grading_stage");
  if (hasTitle("title_red_pen_skilled_worker")) {
    applyStatChange("teacher", "teacherStamina", 1, "title_red_pen_skilled_worker_final");
  }
  addLog("红笔落下的声音，是期末周最后的雨。");
}

function runGradeSummaryStage() {
  const difficulty = difficultyConfig(game.difficulty);
  addLog("第三阶段：年级总结。");
  let summaryScore = game.stats.gradeTrust + game.stats.authority;
  if (game.stats.studentFavor >= 8) {
    applyStatChange("teacher", "teacherMood", 1, "grade_summary_student_favor");
    summaryScore += 1;
  }
  if (hasAchievement("achievement_devil_teacher")) {
    summaryScore += 1;
    applyStatChange("teacher", "studentFavor", -1, "grade_summary_devil_teacher");
  }
  if (hasTitle("title_grade_group_hidden_boss")) summaryScore += 2;
  summaryScore += difficulty.finalScoreModifier;
  game.temp.summaryScore = summaryScore;
  if (summaryScore >= difficulty.teacherSummaryTarget) applyStatChange("teacher", "gradeTrust", 1, "grade_summary_success");
  else applyStatChange("teacher", "teacherMood", -1, "grade_summary_failed");
  addLog("你不是在总结一学期，你是在给混乱写墓志铭。");
}

function determineFinalEnding() {
  if (game.gameEnded) return game.currentEnding;
  if (game.route === "student") game.temp.finalWisdom = game.stats.wisdom;
  checkImmediateEndings();
  if (game.gameEnded) return game.currentEnding;
  const endings = collectAvailableEndings();
  if (!endings.length) {
    triggerEnding("ending_ordinary_graduate");
    return game.currentEnding;
  }
  endings.sort((a, b) => ENDINGS[b].priority - ENDINGS[a].priority);
  const topEnding = endings[0];
  if (topEnding === "ending_ivy_admission") {
    runIvyChoiceFlow();
    return null;
  }
  triggerEnding(topEnding);
  return game.currentEnding;
}

function collectAvailableEndings() {
  if (game.route === "student") return collectStudentEndings();
  return collectTeacherEndings();
}

function advancedAchievementCount() {
  return [...game.achievements].filter((id) => ADVANCED_ACHIEVEMENTS.has(id)).length;
}

function studentCampusLegendCount() {
  return [
    hasTitle("title_homeroom_favorite"),
    hasAchievement("achievement_best_late_award"),
    hasAchievement("achievement_prompt_engineer"),
    hasAchievement("achievement_ray_teacher_parrot"),
    hasAchievement("achievement_smart_electric_iot_engineer"),
    hasAchievement("achievement_super_cold_joke_king"),
    hasAchievement("achievement_jingdezhen_survivor"),
  ].filter(Boolean).length;
}

function teacherCampusLegendCount() {
  return [
    hasAchievement("achievement_red_pen_war_god"),
    hasAchievement("achievement_devil_teacher"),
    game.counters.studentRebellionSuppressedCount >= 1,
    hasTitle("title_grade_group_hidden_boss"),
    hasTitle("title_office_badminton_king"),
    hasTitle("title_walking_grade_inspection"),
  ].filter(Boolean).length;
}

function collectStudentEndings() {
  const endings = [];
  const difficulty = difficultyConfig(game.difficulty);
  const finalWisdom = game.temp.finalWisdom;
  const noSchoolRescued =
    finalWisdom >= 4 || game.flags.has("flag_final_project_success") || game.temp.examScore >= difficulty.examTarget;

  if (game.counters.aiCopyCount >= 10) {
    endings.push("ending_ai_graduates_for_me");
  }
  if (game.counters.absenceDays >= 35) endings.push("ending_disappeared_person");
  if (game.counters.dontWantSchoolWeeks >= 2 || game.endingFlags.has("ending_flag_transfer_candidate")) {
    endings.push("ending_transfer");
  }
  if (game.endingFlags.has("ending_flag_jingdezhen_resident_candidate")) {
    endings.push("ending_jingdezhen_resident");
  }
  if (studentCampusLegendCount() >= 4) endings.push("ending_campus_legend_student");
  if (
    (finalWisdom <= 3 && game.flags.has("flag_final_exam_failed") && !noSchoolRescued) ||
    (game.endingFlags.has("ending_flag_no_school_candidate") && !noSchoolRescued)
  ) {
    endings.push("ending_no_school");
  }
  if (finalWisdom >= 9 && game.stats.mood >= 5 && advancedAchievementCount() >= 2) {
    endings.push("ending_ivy_admission");
  }
  const strongAcademicFinish =
    game.flags.has("flag_final_project_success") && game.flags.has("flag_final_exam_success");
  const hasBasicHomeroomTrust = game.stats.homeroomTrust >= 3;
  if (
    hasBasicHomeroomTrust &&
    ((finalWisdom >= 7 && finalWisdom <= 8 && game.stats.mood >= 3) ||
      (finalWisdom >= 9 && game.stats.mood >= 3 && strongAcademicFinish))
  ) {
    endings.push("ending_top50_normal");
  }
  if (finalWisdom >= 4 && finalWisdom <= 7) endings.push("ending_wcu_admission");
  if (
    game.stats.peerFavor >= 10 &&
    game.stats.mood >= 6 &&
    game.counters.eatWithClassmatesCount >= 4 &&
    hasStatus("status_review_material_alliance") &&
    !hasStatus("status_lonely_academic_machine") &&
    game.counters.absenceDays < 15
  ) {
    endings.push("ending_lifelong_friends");
  }
  if (game.stats.peerFavor <= 3) endings.push("ending_lone_wolf");
  if (
    game.flags.has("flag_reached_stamina_10_before_final") &&
    game.flags.has("flag_sports_legend_history_condition")
  ) {
    endings.push("ending_sports_legend");
  }
  return endings;
}

function collectTeacherEndings() {
  const endings = [];
  if (teacherCampusLegendCount() >= 4) endings.push("ending_campus_legend_teacher");
  if (game.stats.studentFavor <= 2) endings.push("ending_teacher_student_favor_zero");
  if (game.stats.gradeTrust <= 0) endings.push("ending_teacher_grade_group_zero");
  if (game.stats.authority <= 0) endings.push("ending_teacher_lost_authority");
  if (game.counters.homeworkGradingCount >= 10 && game.stats.teacherStamina > 0) {
    endings.push("ending_red_pen_war_god");
  }
  if (game.counters.lowScoreExamStreak >= 3 || hasAchievement("achievement_devil_teacher")) {
    endings.push("ending_devil_teacher");
  }
  if (
    game.stats.studentFavor >= 8 &&
    game.stats.authority >= 5 &&
    game.stats.gradeTrust > 0 &&
    !game.flags.has("flag_student_rebellion_triggered")
  ) {
    endings.push("ending_student_moonlight_teacher");
  }
  if (game.stats.gradeTrust === 10 && game.counters.gradeInspectionCooperateCount >= 3) {
    endings.push("ending_grade_group_hidden_boss");
  }
  return endings;
}

function runIvyChoiceFlow() {
  openEvent(
    makeEvent({
      id: "event_ivy_choice",
      name: "藤校录取",
      type: "结局选择",
      description: "录取邮件弹出的那一刻，你沉默了三秒。\n然后你开始截图、转发、发朋友圈、假装冷静。",
      options: [
        { id: "choice_accept_ivy", name: "去", run: () => triggerEnding("ending_ivy_admission") },
        { id: "choice_reject_ivy", name: "不去", run: () => triggerEnding("ending_reject_ivy") },
      ],
    }),
    () => {}
  );
}

function getEndingPresentation(endingId) {
  const ending = ENDINGS[endingId];
  if (endingId === "ending_ordinary_graduate" && game?.route === "teacher") {
    return {
      ...ending,
      title: "《普通教师》",
      text: "你普通地完成了这个学期。\n普通地批了作业。\n普通地开完会。\n普通地熬过了期末。\n\n系统评价：\n在 Schooltopia，普通下班本身就是一种隐藏成就。",
    };
  }
  return ending;
}

const ENDING_RARITY_LABELS = {
  common: "普通",
  uncommon: "少见",
  rare: "罕见",
  legendary: "传奇",
};

const ENDING_VERDICTS = {
  mythic: "你没有活过校园，是校园勉强活过了你。",
  exceptional: "教务系统决定把你标记为异常样本。",
  survivor: "你活下来了，代价被系统礼貌地隐藏。",
  accident: "这不是失败，是一份很有个人风格的事故报告。",
  story: "数值不高，但故事已经足够让下一届害怕。",
};

function appendChronicleLine(container, kind, text) {
  const line = document.createElement("div");
  line.className = "chronicle-line";
  const label = document.createElement("span");
  label.className = "chronicle-kind";
  label.textContent = kind;
  const copy = document.createElement("strong");
  copy.textContent = text;
  line.append(label, copy);
  container.append(line);
}

function renderEndingChronicle() {
  const weeks = window.SchooltopiaRunRecap?.buildChronicle?.(game.chronicle) || [];
  dom.endingChronicle.innerHTML = "";
  if (!weeks.length) {
    const item = document.createElement("li");
    const week = document.createElement("span");
    week.className = "chronicle-week";
    week.textContent = `第 ${game.week} 周`;
    const lines = document.createElement("div");
    lines.className = "chronicle-lines";
    appendChronicleLine(lines, "命运", "还没来得及选择，结局先到了。");
    item.append(week, lines);
    dom.endingChronicle.append(item);
    return;
  }
  weeks.forEach((entry) => {
    const item = document.createElement("li");
    const week = document.createElement("span");
    week.className = "chronicle-week";
    week.textContent = `第 ${entry.week} 周`;
    const lines = document.createElement("div");
    lines.className = "chronicle-lines";
    if (entry.daily) appendChronicleLine(lines, "日常", entry.daily.choice);
    if (entry.activity) appendChronicleLine(lines, "活动", `${entry.activity.title} · ${entry.activity.choice}`);
    entry.events.forEach((event) => appendChronicleLine(lines, "事件", `${event.title} · ${event.choice}`));
    item.append(week, lines);
    dom.endingChronicle.append(item);
  });
}

function chooseInheritedMemory(candidate, endingId, endingTitle) {
  game.metaSave.inheritedMemory = {
    slot: candidate.slot,
    endingId,
    endingTitle,
  };
  saveMetaSave();
  renderMemoryOptions(endingId, endingTitle);
  dom.memoryStatus.textContent = "这段记忆已保存。重新开始后生效。";
  dom.restartGame.textContent = "带着记忆重新开始";
  playSound("save");
}

function renderMemoryOptions(endingId, endingTitle) {
  const candidates = window.SchooltopiaRunRecap?.getMemoryCandidates?.(game.stats, game.route) || [];
  const selectedSlot = game.metaSave.inheritedMemory?.slot || "";
  dom.memoryOptions.innerHTML = "";
  candidates.forEach((candidate) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `memory-option${candidate.slot === selectedSlot ? " selected" : ""}`;
    button.setAttribute("aria-pressed", candidate.slot === selectedSlot ? "true" : "false");
    const label = statLabel(candidate.stat);
    const meta = document.createElement("small");
    meta.textContent = `本局 ${candidate.value}/10`;
    const title = document.createElement("strong");
    title.textContent = label;
    const effect = document.createElement("span");
    effect.textContent = "下一局 +1";
    button.append(meta, title, effect);
    button.addEventListener("click", () => chooseInheritedMemory(candidate, endingId, endingTitle));
    dom.memoryOptions.append(button);
  });
}

function renderRunRecap(endingId, endingTitle) {
  const report = window.SchooltopiaRunRecap?.calculateRunReport?.({
    stats: game.stats,
    week: game.week,
    difficulty: game.difficulty,
    achievements: game.achievements,
    titles: game.titles,
    endingId,
    chronicle: game.chronicle,
  }) || { score: 0, rarityId: "common", verdictId: "story" };
  dom.endingScore.textContent = String(report.score);
  dom.endingRarity.textContent = ENDING_RARITY_LABELS[report.rarityId] || ENDING_RARITY_LABELS.common;
  dom.endingRarity.dataset.rarity = report.rarityId;
  dom.endingVerdict.textContent = ENDING_VERDICTS[report.verdictId] || ENDING_VERDICTS.story;
  dom.memoryStatus.textContent = "";
  dom.restartGame.textContent = "重新开始";
  renderEndingChronicle();
  renderMemoryOptions(endingId, endingTitle);
}

function triggerEnding(endingId) {
  if (!game || game.gameEnded) return;
  const ending = getEndingPresentation(endingId);
  game.gameEnded = true;
  game.currentEnding = endingId;
  unlockCodex("ending", endingId);
  playSound("ending");
  dom.eventModal.classList.add("hidden");
  dom.setupView.classList.add("hidden");
  dom.gameView.classList.add("hidden");
  dom.endingView.classList.remove("hidden");
  dom.endingTitle.textContent = ending.title;
  dom.endingText.innerHTML = "";
  const endingCopy = document.createElement("div");
  endingCopy.className = "ending-copy";
  endingCopy.textContent = ending.text;
  dom.endingText.append(endingCopy);
  const prompt = document.createElement("div");
  prompt.className = "final-prompt";
  prompt.textContent = TEXT.finalPrompt;
  dom.endingText.append(prompt);
  renderRunRecap(endingId, ending.title);
  window.Schooltopia?.endSession?.(game, endingId, ending.title);
  renderAll();
}

function drawCampus() {
  const canvas = dom.canvas;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let frame = 0;
  let animationId = 0;
  let reducedMotion = Boolean(motionQuery?.matches);
  let particles = [];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = Math.floor(rect.width * dpr);
    height = Math.floor(rect.height * dpr);
    canvas.width = width;
    canvas.height = height;
    particles = Array.from({ length: 64 }, (_, index) => ({
      x: ((index * 73) % 100) / 100,
      y: ((index * 41) % 100) / 100,
      z: 1 + ((index * 29) % 120) / 10,
      speed: 0.012 + ((index * 17) % 9) * 0.002,
    }));
  }

  function rect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  function poly(points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  }

  function line(points, color, size = 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = size * dpr;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  }

  function project(x, y, z) {
    const depth = z + 7.2;
    const scale = Math.min(width, height * 1.45) * 0.78 / depth;
    return {
      x: width * 0.5 + x * scale,
      y: height * 0.7 - y * scale + z * height * 0.018,
      scale,
      depth,
    };
  }

  function projectedPoly(points, color) {
    poly(points.map(([x, y, z]) => {
      const point = project(x, y, z);
      return [point.x, point.y];
    }), color);
  }

  function projectedLine(points, color, size = 1) {
    line(points.map(([x, y, z]) => project(x, y, z)), color, size);
  }

  function drawWindow(cx, y, z, w, h, color) {
    projectedPoly(
      [
        [cx - w / 2, y - h / 2, z],
        [cx + w / 2, y - h / 2, z],
        [cx + w / 2, y + h / 2, z],
        [cx - w / 2, y + h / 2, z],
      ],
      color
    );
  }

  function drawCuboid({ x, z, w, d, h, body, side, top, roof }) {
    const left = x - w / 2;
    const right = x + w / 2;
    const front = z - d / 2;
    const back = z + d / 2;
    projectedPoly(
      [
        [left - 0.08, 0.02, front + 0.18],
        [right + 0.15, 0.02, front + 0.18],
        [right + 0.55, 0.02, back + 0.32],
        [left + 0.32, 0.02, back + 0.32],
      ],
      "rgba(0, 0, 0, 0.18)"
    );
    projectedPoly(
      [
        [right, 0, front],
        [right, 0, back],
        [right, h, back],
        [right, h, front],
      ],
      side
    );
    projectedPoly(
      [
        [left, 0, front],
        [right, 0, front],
        [right, h, front],
        [left, h, front],
      ],
      body
    );
    projectedPoly(
      [
        [left, h, front],
        [right, h, front],
        [right, h, back],
        [left, h, back],
      ],
      top
    );
    projectedPoly(
      [
        [left - 0.16, h + 0.08, front - 0.04],
        [right + 0.16, h + 0.08, front - 0.04],
        [right + 0.24, h + 0.02, back + 0.06],
        [left - 0.08, h + 0.02, back + 0.06],
      ],
      roof
    );

    const cols = Math.max(2, Math.floor(w * 2.2));
    const rows = Math.max(2, Math.floor(h * 1.6));
    for (let c = 0; c < cols; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        const glow = Math.sin(frame / 36 + c * 0.9 + r * 1.4 + x) > -0.28 ? 0.68 : 0.25;
        drawWindow(
          left + w * (0.18 + (c / Math.max(1, cols - 1)) * 0.64),
          h * (0.22 + (r / Math.max(1, rows)) * 0.6),
          front - 0.01,
          w * 0.06,
          h * 0.08,
          `rgba(255, 238, 178, ${glow})`
        );
      }
    }
  }

  function drawFloatingSign(t) {
    const angle = Math.sin(t * 0.02) * 0.45;
    const compactScene = width / dpr < 680;
    const cx = compactScene ? 2.9 : 6.1;
    const cy = (compactScene ? 2.74 : 2.82) + Math.sin(t * 0.035) * 0.08;
    const cz = compactScene ? 1.35 : 1.12;
    const signWidth = compactScene ? 2.25 : 2.75;
    const signHeight = compactScene ? 0.72 : 0.82;
    const corners = [
      [-signWidth / 2, -signHeight / 2],
      [signWidth / 2, -signHeight / 2],
      [signWidth / 2, signHeight / 2],
      [-signWidth / 2, signHeight / 2],
    ].map(([x, y]) => {
      const rotatedX = x * Math.cos(angle);
      const rotatedZ = x * Math.sin(angle);
      return [cx + rotatedX, cy + y, cz + rotatedZ];
    });
    projectedPoly(corners, "rgba(179, 69, 54, 0.82)");
    projectedLine([corners[0], corners[1], corners[2], corners[3], corners[0]], "rgba(255, 247, 230, 0.62)", 1.2);
    const label = project(cx - 0.76 * Math.cos(angle), cy + 0.18, cz - 0.76 * Math.sin(angle));
    ctx.save();
    ctx.translate(label.x, label.y);
    ctx.scale(Math.max(0.82, label.scale / (28 * dpr)), Math.max(0.82, label.scale / (28 * dpr)));
    ctx.fillStyle = "rgba(255, 247, 230, 0.9)";
    ctx.font = `${34 * dpr}px system-ui, sans-serif`;
    ctx.fillText("DDL", 0, 0);
    ctx.restore();
  }

  function drawTinyStudent(x, z, t, color) {
    const bob = Math.sin(t * 0.12 + x * 3) * 0.045;
    const head = project(x, 0.56 + bob, z);
    const bodyTop = project(x, 0.42 + bob, z);
    const bodyBottom = project(x, 0.12, z);
    ctx.strokeStyle = "rgba(255, 247, 230, 0.82)";
    ctx.lineWidth = Math.max(1, head.scale * 0.035);
    ctx.beginPath();
    ctx.moveTo(bodyTop.x, bodyTop.y);
    ctx.lineTo(bodyBottom.x, bodyBottom.y);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(head.x, head.y, Math.max(1.5 * dpr, head.scale * 0.065), 0, Math.PI * 2);
    ctx.fill();
  }

  function render() {
    frame += reducedMotion ? 0 : 1;
    const t = reducedMotion ? 38 : frame;
    ctx.clearRect(0, 0, width, height);
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, "#0c1922");
    sky.addColorStop(0.46, "#244650");
    sky.addColorStop(1, "#142019");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunX = width * 0.78;
    const sunY = height * 0.22;
    ctx.fillStyle = "rgba(244, 188, 73, 0.24)";
    ctx.beginPath();
    ctx.arc(sunX, sunY, height * 0.16, 0, Math.PI * 2);
    ctx.fill();

    particles.forEach((particle) => {
      const drift = reducedMotion ? 0 : t * particle.speed;
      const x = ((particle.x + drift * 0.012) % 1) * width;
      const y = height * (0.08 + particle.y * 0.34);
      const size = Math.max(1.2 * dpr, (10 / (particle.z + 3)) * dpr);
      rect(x, y, size, size, "rgba(255, 246, 218, 0.46)");
    });

    const baseY = height * 0.7;
    poly(
      [
        [0, baseY * 0.84],
        [width * 0.14, baseY * 0.68],
        [width * 0.31, baseY * 0.82],
        [width * 0.48, baseY * 0.6],
        [width * 0.68, baseY * 0.82],
        [width * 0.84, baseY * 0.66],
        [width, baseY * 0.84],
        [width, baseY],
        [0, baseY],
      ],
      "rgba(21, 44, 42, 0.56)"
    );
    poly(
      [
        [0, baseY * 0.92],
        [width * 0.16, baseY * 0.78],
        [width * 0.42, baseY * 0.93],
        [width * 0.63, baseY * 0.74],
        [width, baseY * 0.91],
        [width, baseY],
        [0, baseY],
      ],
      "rgba(18, 34, 32, 0.72)"
    );

    const field = ctx.createLinearGradient(0, baseY, 0, height);
    field.addColorStop(0, "#1e392e");
    field.addColorStop(1, "#111a15");
    ctx.fillStyle = field;
    ctx.fillRect(0, baseY, width, height - baseY);

    projectedPoly(
      [
        [-8, 0, 0.35],
        [8, 0, 0.35],
        [15, 0, 14],
        [-15, 0, 14],
      ],
      "rgba(24, 47, 39, 0.88)"
    );

    projectedPoly(
      [
        [-0.62, 0.01, 0.4],
        [0.62, 0.01, 0.4],
        [3.05, 0.01, 13],
        [-3.05, 0.01, 13],
      ],
      "rgba(210, 161, 75, 0.28)"
    );
    for (let i = -3; i <= 3; i += 1) {
      projectedLine(
        [
          [i * 0.34, 0.03, 0.5],
          [i * 1.28, 0.03, 13],
        ],
        "rgba(255, 247, 230, 0.22)",
        1
      );
    }
    for (let z = 1.4; z < 13; z += 1.45) {
      projectedLine(
        [
          [-2.85, 0.035, z],
          [2.85, 0.035, z],
        ],
        "rgba(240, 197, 95, 0.16)",
        1
      );
    }

    const buildings = [
      { x: -4.45, z: 3.78, w: 3.18, d: 1.78, h: 3.62, body: "#26332e", side: "#192621", top: "#35483e", roof: "#b94737" },
      { x: -0.38, z: 4.22, w: 4.32, d: 2.12, h: 4.48, body: "#202a2f", side: "#172029", top: "#31404a", roof: "#d09633" },
      { x: 4.18, z: 3.92, w: 3.04, d: 1.72, h: 3.82, body: "#2e3028", side: "#20241f", top: "#41483a", roof: "#3d7c73" },
    ];
    buildings.sort((a, b) => b.z - a.z).forEach(drawCuboid);

    for (let i = 0; i < 14; i += 1) {
      const side = i % 2 ? -1 : 1;
      const z = 1.2 + (i % 7) * 1.75;
      const x = side * (3.2 + Math.sin(i) * 0.28);
      const trunkBottom = project(x, 0, z);
      const trunkTop = project(x, 0.56, z);
      line([trunkBottom, trunkTop], "rgba(42, 31, 23, 0.72)", 2.3);
      const crown = project(x, 0.86 + Math.sin(t / 42 + i) * 0.035, z);
      ctx.fillStyle = i % 3 ? "rgba(47, 120, 94, 0.72)" : "rgba(36, 122, 134, 0.66)";
      ctx.beginPath();
      ctx.ellipse(crown.x, crown.y, crown.scale * 0.18, crown.scale * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 8; i += 1) {
      const z = ((t * 0.028 + i * 1.55) % 12.4) + 0.6;
      const x = Math.sin(i * 1.73) * 1.35;
      drawTinyStudent(x, z, t + i * 20, i % 2 ? "rgba(255, 247, 230, 0.86)" : "rgba(240, 197, 95, 0.82)");
    }

    drawFloatingSign(t);

    if (!reducedMotion && !document.hidden) {
      animationId = requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
      animationId = 0;
      return;
    }
    if (!reducedMotion && !animationId) render();
  });
  motionQuery?.addEventListener?.("change", (event) => {
    reducedMotion = event.matches;
    if (animationId) cancelAnimationFrame(animationId);
    animationId = 0;
    render();
  });
  render();
}

dom.systemLine.textContent = TEXT.systemLine;
syncSoundToggle();
syncMusicToggle();
dom.soundToggle.addEventListener("click", toggleSound);
dom.musicToggle.addEventListener("click", toggleMusic);
document.addEventListener("pointerdown", unlockAudio, { once: true, capture: true });
document.addEventListener("keydown", unlockAudio, { once: true, capture: true });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopMusic();
    stopPlaygroundAmbience();
    return;
  }
  if (!audioUnlocked) return;
  if (musicEnabled) scheduleGymnopedieLoop();
  if (soundEnabled) startPlaygroundAmbience();
});
dom.startGame.addEventListener("click", startGame);
dom.recommendedSetup.addEventListener("click", applyRecommendedSetup);
dom.clearInheritedMemory.addEventListener("click", clearInheritedMemory);
dom.restartGame.addEventListener("click", resetGame);
dom.restartInGame.addEventListener("click", confirmRestartInGame);
dom.openCodexSetup.addEventListener("click", () => openCodex("events"));
dom.openCodexGame.addEventListener("click", () => openCodex("events"));
dom.openCodexStats.addEventListener("click", () => openCodex("achievements"));
dom.openCodexEnding.addEventListener("click", () => openCodex("endings"));
dom.closeCodex.addEventListener("click", closeCodex);
dom.resetCodexEvents.addEventListener("click", () => resetCodex("events"));
dom.resetCodexEndings.addEventListener("click", () => resetCodex("endings"));
dom.resetCodexAchievements.addEventListener("click", () => resetCodex("achievements"));
dom.resetCodexAll.addEventListener("click", () => resetCodex("all"));
dom.codexTabs.forEach((button) => {
  button.addEventListener("click", () => {
    activeCodexTab = button.dataset.codexTab;
    renderCodex();
  });
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = dom.codexTabs.indexOf(button);
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? dom.codexTabs.length - 1
        : (current + (event.key === "ArrowRight" ? 1 : -1) + dom.codexTabs.length) % dom.codexTabs.length;
    activeCodexTab = dom.codexTabs[next].dataset.codexTab;
    renderCodex();
    dom.codexTabs[next].focus();
  });
});
document.addEventListener("keydown", handleShortcut);
setup.stats = makeStats(setup.route);
setup.points = setupPointTotal();
renderSetup();
drawCampus();

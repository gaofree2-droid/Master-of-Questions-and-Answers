import type { Question } from '../types';

export const questions: Question[] = [
  // 科学类
  {
    id: 's1',
    text: '光年是什么单位？',
    options: ['时间单位', '长度单位', '速度单位', '亮度单位'],
    correctIndex: 1,
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 's2',
    text: '人体最大的器官是什么？',
    options: ['肝脏', '大脑', '皮肤', '心脏'],
    correctIndex: 2,
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 's3',
    text: '水的化学式是什么？',
    options: ['H2O', 'CO2', 'NaCl', 'O2'],
    correctIndex: 0,
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 's4',
    text: '地球围绕太阳公转一周大约需要多久？',
    options: ['365天', '30天', '24小时', '7天'],
    correctIndex: 0,
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 's5',
    text: '声音在空气中的传播速度约为多少？',
    options: ['340米/秒', '1000米/秒', '300000千米/秒', '100米/秒'],
    correctIndex: 0,
    category: 'science',
    difficulty: 'medium',
  },
  {
    id: 's6',
    text: 'DNA的全称是什么？',
    options: ['脱氧核糖核酸', '核糖核酸', '氨基酸', '脂肪酸'],
    correctIndex: 0,
    category: 'science',
    difficulty: 'medium',
  },
  {
    id: 's7',
    text: '哪种金属常温下是液态？',
    options: ['铁', '汞', '铜', '铝'],
    correctIndex: 1,
    category: 'science',
    difficulty: 'easy',
  },
  {
    id: 's8',
    text: '光合作用主要发生在植物的哪个部位？',
    options: ['根部', '茎部', '叶片', '花朵'],
    correctIndex: 2,
    category: 'science',
    difficulty: 'medium',
  },
  // 历史类
  {
    id: 'h1',
    text: '秦始皇统一中国是在哪一年？',
    options: ['公元前221年', '公元前206年', '公元前256年', '公元前300年'],
    correctIndex: 0,
    category: 'history',
    difficulty: 'medium',
  },
  {
    id: 'h2',
    text: '第二次世界大战结束于哪一年？',
    options: ['1943年', '1944年', '1945年', '1946年'],
    correctIndex: 2,
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'h3',
    text: '万里长城最初是哪个朝代开始修建的？',
    options: ['秦朝', '汉朝', '明朝', '战国时期'],
    correctIndex: 3,
    category: 'history',
    difficulty: 'medium',
  },
  {
    id: 'h4',
    text: '拿破仑在哪场战役中最终战败？',
    options: ['奥斯特里茨战役', '滑铁卢战役', '莱比锡战役', '特拉法尔加海战'],
    correctIndex: 1,
    category: 'history',
    difficulty: 'medium',
  },
  {
    id: 'h5',
    text: '中国历史上第一个皇帝是谁？',
    options: ['刘邦', '嬴政', '项羽', '勾践'],
    correctIndex: 1,
    category: 'history',
    difficulty: 'easy',
  },
  {
    id: 'h6',
    text: '丝绸之路的起点是哪座城市？',
    options: ['长安', '洛阳', '敦煌', '楼兰'],
    correctIndex: 0,
    category: 'history',
    difficulty: 'medium',
  },
  // 地理类
  {
    id: 'g1',
    text: '世界上面积最大的国家是哪个？',
    options: ['中国', '美国', '加拿大', '俄罗斯'],
    correctIndex: 3,
    category: 'geography',
    difficulty: 'easy',
  },
  {
    id: 'g2',
    text: '世界上最长的河流是哪条？',
    options: ['长江', '亚马逊河', '尼罗河', '密西西比河'],
    correctIndex: 2,
    category: 'geography',
    difficulty: 'easy',
  },
  {
    id: 'g3',
    text: '世界上最高的山峰是哪座？',
    options: ['K2', '珠穆朗玛峰', '干城章嘉峰', '洛子峰'],
    correctIndex: 1,
    category: 'geography',
    difficulty: 'easy',
  },
  {
    id: 'g4',
    text: '澳大利亚位于哪个半球？',
    options: ['北半球', '南半球', '东半球', '赤道上'],
    correctIndex: 1,
    category: 'geography',
    difficulty: 'easy',
  },
  {
    id: 'g5',
    text: '地球上最大的沙漠是哪个？',
    options: ['撒哈拉沙漠', '戈壁沙漠', '阿拉伯沙漠', '南极洲'],
    correctIndex: 3,
    category: 'geography',
    difficulty: 'hard',
  },
  {
    id: 'g6',
    text: '太平洋是世界上第几大洋？',
    options: ['第二', '第三', '第一', '第四'],
    correctIndex: 2,
    category: 'geography',
    difficulty: 'easy',
  },
  // 娱乐类
  {
    id: 'e1',
    text: '《哈利·波特》系列的作者是谁？',
    options: ['J.R.R.托尔金', 'J.K.罗琳', '斯蒂芬·金', '乔治·马丁'],
    correctIndex: 1,
    category: 'entertainment',
    difficulty: 'easy',
  },
  {
    id: 'e2',
    text: '世界上最大的社交媒体平台是？',
    options: ['Instagram', 'Twitter', 'Facebook', 'TikTok'],
    correctIndex: 2,
    category: 'entertainment',
    difficulty: 'easy',
  },
  {
    id: 'e3',
    text: '《泰坦尼克号》的导演是谁？',
    options: ['斯皮尔伯格', '詹姆斯·卡梅隆', '诺兰', '雷德利·斯科特'],
    correctIndex: 1,
    category: 'entertainment',
    difficulty: 'medium',
  },
  {
    id: 'e4',
    text: 'YouTube是哪一年创立的？',
    options: ['2003年', '2004年', '2005年', '2006年'],
    correctIndex: 2,
    category: 'entertainment',
    difficulty: 'medium',
  },
  // 体育类
  {
    id: 'sp1',
    text: '世界杯足球赛每几年举办一次？',
    options: ['2年', '3年', '4年', '5年'],
    correctIndex: 2,
    category: 'sports',
    difficulty: 'easy',
  },
  {
    id: 'sp2',
    text: '篮球比赛中一队上场几名球员？',
    options: ['4人', '5人', '6人', '7人'],
    correctIndex: 1,
    category: 'sports',
    difficulty: 'easy',
  },
  {
    id: 'sp3',
    text: '奥运会五环旗中没有哪个颜色？',
    options: ['红色', '蓝色', '黄色', '绿色'],
    correctIndex: 0,
    category: 'sports',
    difficulty: 'medium',
  },
  {
    id: 'sp4',
    text: '乒乓球起源于哪个国家？',
    options: ['中国', '日本', '英国', '美国'],
    correctIndex: 2,
    category: 'sports',
    difficulty: 'medium',
  },
  // 科技类
  {
    id: 't1',
    text: 'iPhone是哪家公司发布的？',
    options: ['Google', 'Microsoft', 'Apple', 'Samsung'],
    correctIndex: 2,
    category: 'technology',
    difficulty: 'easy',
  },
  {
    id: 't2',
    text: 'HTML是什么的缩写？',
    options: ['超文本标记语言', '高级文本管理语言', '家庭工具标记语言', '超链接文本语言'],
    correctIndex: 0,
    category: 'technology',
    difficulty: 'medium',
  },
  {
    id: 't3',
    text: '世界上第一台电子计算机叫什么？',
    options: ['ENIAC', 'UNIVAC', 'EDVAC', 'Colossus'],
    correctIndex: 0,
    category: 'technology',
    difficulty: 'hard',
  },
  {
    id: 't4',
    text: '比特币的创始人化名是什么？',
    options: ['Vitalik Buterin', '中本聪', 'Elon Musk', 'Mark Zuckerberg'],
    correctIndex: 1,
    category: 'technology',
    difficulty: 'easy',
  },
  {
    id: 't5',
    text: '5G网络的理论最高速率可达多少？',
    options: ['1Gbps', '10Gbps', '20Gbps', '100Gbps'],
    correctIndex: 2,
    category: 'technology',
    difficulty: 'hard',
  },
  // 文学类
  {
    id: 'l1',
    text: '《红楼梦》的作者是谁？',
    options: ['施耐庵', '曹雪芹', '吴承恩', '罗贯中'],
    correctIndex: 1,
    category: 'literature',
    difficulty: 'easy',
  },
  {
    id: 'l2',
    text: '莎士比亚是哪国人？',
    options: ['法国人', '德国人', '英国人', '意大利人'],
    correctIndex: 2,
    category: 'literature',
    difficulty: 'easy',
  },
  {
    id: 'l3',
    text: '《百年孤独》的作者是谁？',
    options: ['博尔赫斯', '马尔克斯', '聂鲁达', '略萨'],
    correctIndex: 1,
    category: 'literature',
    difficulty: 'medium',
  },
  {
    id: 'l4',
    text: '中国四大名著不包括以下哪部？',
    options: ['红楼梦', '西游记', '聊斋志异', '三国演义'],
    correctIndex: 2,
    category: 'literature',
    difficulty: 'easy',
  },
  // 常识类
  {
    id: 'gk1',
    text: '一年有多少个月有31天？',
    options: ['5个', '6个', '7个', '8个'],
    correctIndex: 2,
    category: 'general',
    difficulty: 'medium',
  },
  {
    id: 'gk2',
    text: '交通信号灯中黄灯代表什么？',
    options: ['停止', '通行', '警示/准备', '慢行'],
    correctIndex: 2,
    category: 'general',
    difficulty: 'easy',
  },
  {
    id: 'gk3',
    text: '人体正常体温约为多少摄氏度？',
    options: ['35°C', '36.5°C', '37°C', '38°C'],
    correctIndex: 2,
    category: 'general',
    difficulty: 'easy',
  },
  {
    id: 'gk4',
    text: '国际象棋中，哪个棋子可以斜着走？',
    options: ['车', '象', '马', '兵'],
    correctIndex: 1,
    category: 'general',
    difficulty: 'medium',
  },
];

export const categoryNames: Record<string, string> = {
  science: '🔬 科学',
  history: '📜 历史',
  geography: '🌍 地理',
  entertainment: '🎬 娱乐',
  sports: '⚽ 体育',
  technology: '💻 科技',
  literature: '📚 文学',
  general: '💡 常识',
};

export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter((q) => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: string): Question[] {
  return questions.filter((q) => q.difficulty === difficulty);
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function selectGameQuestions(
  count: number = 10,
  category?: string
): Question[] {
  let pool = category
    ? questions.filter((q) => q.category === category)
    : [...questions];

  if (pool.length < count) {
    pool = [...questions];
  }

  const shuffled = shuffleArray(pool);

  const easy = shuffled.filter((q) => q.difficulty === 'easy');
  const medium = shuffled.filter((q) => q.difficulty === 'medium');
  const hard = shuffled.filter((q) => q.difficulty === 'hard');

  const easyCount = Math.ceil(count * 0.4);
  const mediumCount = Math.ceil(count * 0.4);
  const hardCount = count - easyCount - mediumCount;

  const selected = [
    ...easy.slice(0, easyCount),
    ...medium.slice(0, mediumCount),
    ...hard.slice(0, hardCount),
  ];

  return shuffleArray(selected).slice(0, count);
}

export function selectDailyChallenge(): Question[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  const shuffled = [...questions];
  let currentIndex = shuffled.length;
  let randomValue = seed;

  while (currentIndex !== 0) {
    randomValue = (randomValue * 16807) % 2147483647;
    const randomIndex = randomValue % currentIndex;
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
  }

  return shuffled.slice(0, 15);
}

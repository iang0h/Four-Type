export type HomeLocale = 'en' | 'zh-CN' | 'es'

type TemperamentHomeCopy = {
  title: string
  name: string
  description: string
  traits: string[]
}

export type HomeCopy = {
  heroAlt: string
  heroStatement: string
  heroCta: string
  heroMeta: string
  choosePath: string
  introSrTitle: string
  introParagraphs: string[]
  guideEyebrow: string
  guideTitle: string
  guideDescription: string
  readGuide: string
  stats: {
    peopleTested: string
    blends: string
    wisdom: string
  }
  whyTitle: string
  whyDescription: string
  videoTitle: string
  temperaments: Record<string, TemperamentHomeCopy>
  features: {
    title: string
    description: string
  }[]
  guides: {
    href: string
    title: string
    description: string
  }[]
}

export const homeCopy: Record<HomeLocale, HomeCopy> = {
  en: {
    heroAlt: 'FourType — Know Your True Nature — The Temperament Quest',
    heroStatement: 'Know your nature under pressure. Take the free 40-question test to reveal your core type, secondary blend, stress response, communication style, and growth edge.',
    heroCta: 'Take the 6-minute test',
    heroMeta: '40 questions • Instant result • No email required • 16 patterns',
    choosePath: 'Choose Your Path',
    introSrTitle: 'Free Four Temperaments Test — Discover Your Personality Type Online',
    introParagraphs: [
      'The four temperaments is an ancient framework for understanding personality that has influenced psychology for over 2,500 years. Originating with Hippocrates, this timeless model identifies four core personality types: Sanguine, Choleric, Melancholic, and Phlegmatic.',
      'Unlike personality frameworks like the Myers-Briggs Type Indicator (MBTI) or Big Five personality traits, the four temperaments focus on your core motivations, stress responses, and natural strengths. Our free temperament test goes deeper — it identifies not just your primary type, but your unique blend of all four temperaments, revealing 16 distinct personality patterns for a complete picture of who you are.',
      'Take our 40-question online personality test to discover your temperament profile, understand how you naturally think and feel, learn practical strategies for growth, and improve your relationships with others.',
    ],
    guideEyebrow: 'Temperament Test Guides',
    guideTitle: 'Start With The Free Temperament Test, Then Read The Pattern',
    guideDescription: 'Use these core FourType guides to understand the free temperament test, compare the four classic patterns, review the question design, and judge your result with the right amount of confidence.',
    readGuide: 'Read guide',
    stats: {
      peopleTested: 'Questions',
      blends: 'Unique Temperament Blends',
      wisdom: 'Years of Wisdom',
    },
    whyTitle: 'Why Study Temperaments?',
    whyDescription: 'FourType helps you understand your default nature under pressure, in relationships, work, leadership, and growth.',
    videoTitle: 'Why Study Temperaments - FourType',
    temperaments: {
      sanguine: {
        title: 'The Bard',
        name: 'Sanguine',
        description: 'The enthusiastic connector who lights up every room with infectious energy and optimism.',
        traits: ['Charismatic', 'Creative', 'Spontaneous'],
      },
      choleric: {
        title: 'The Commander',
        name: 'Choleric',
        description: 'The natural leader who takes charge, drives results, and turns vision into reality.',
        traits: ['Decisive', 'Ambitious', 'Strategic'],
      },
      melancholic: {
        title: 'The Strategist',
        name: 'Melancholic',
        description: 'The deep thinker who sees patterns others miss and holds the world to high standards.',
        traits: ['Analytical', 'Perfectionist', 'Loyal'],
      },
      phlegmatic: {
        title: 'The Guardian',
        name: 'Phlegmatic',
        description: 'The calm peacemaker who brings harmony, listens deeply, and holds teams together.',
        traits: ['Patient', 'Diplomatic', 'Reliable'],
      },
    },
    features: [
      { title: '2,500 Years of Wisdom', description: 'From Hippocrates to modern psychology, the temperaments have stood the test of time.' },
      { title: 'Understand Yourself & Others', description: 'Learn why you react the way you do, and how to connect better with every type.' },
      { title: 'Actionable Insights', description: 'Practical strategies for growth, relationships, leadership, and daily life.' },
      { title: '16 Personality Patterns', description: 'Go beyond the basics with detailed blend profiles for deeper self-discovery.' },
    ],
    guides: [
      { href: '/temperament-test', title: 'Temperament Test', description: 'Start with the main free temperament test guide and learn how FourType reads your score spread.' },
      { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic before taking the free quiz.' },
      { href: '/blog/temperament-test-questions', title: 'Temperament Test Questions', description: 'See what useful behavior-based temperament test questions should measure.' },
      { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'Learn how to judge temperament quiz results responsibly without overclaiming.' },
    ],
  },
  'zh-CN': {
    heroAlt: 'FourType — 认识你的真实本性 — 气质探索任务',
    heroStatement: '认识你在压力下的真实本性。通过 40 题免费测试了解你的核心类型、副气质、压力反应、沟通方式和成长边界。',
    heroCta: '开始你的任务',
    heroMeta: '40 个问题 • 15 种混合型 • 永久免费',
    choosePath: '选择你的路径',
    introSrTitle: '免费四气质测试：在线发现你的气质类型',
    introParagraphs: [
      '四气质是一个古老的人格理解框架，影响心理学已有两千五百多年。它把人的核心模式分为多血质、胆汁质、抑郁质和黏液质。',
      'FourType 免费气质测试关注你的核心动机、压力反应和自然优势。它不只给你一个单一标签，也会比较四种气质的分数，并指出可能的混合型方向。',
      '通过 40 个问题，你可以了解自己的气质分布、思考和情绪反应方式，并获得更适合关系、成长和工作的自我理解。',
    ],
    guideEyebrow: '气质测试指南',
    guideTitle: '先做免费气质测试，再读懂你的模式',
    guideDescription: '这些 FourType 指南帮助你理解测试、比较四种经典气质、了解题目设计，并更负责任地解读结果。',
    readGuide: '阅读指南',
    stats: {
      peopleTested: '测试题目',
      blends: '独特气质混合型',
      wisdom: '智慧传承年数',
    },
    whyTitle: '为什么要研究气质？',
    whyDescription: '理解气质，是理解自己并更好连接他人的第一步。',
    videoTitle: '为什么要研究气质 - FourType',
    temperaments: {
      sanguine: {
        title: '吟游者',
        name: '多血质',
        description: '热情的连接者，用感染力、乐观和表达照亮每个空间。',
        traits: ['有魅力', '有创意', '自发'],
      },
      choleric: {
        title: '指挥官',
        name: '胆汁质',
        description: '天生的领导者，主动掌控、推动结果，并把愿景变成现实。',
        traits: ['果断', '有野心', '战略性'],
      },
      melancholic: {
        title: '战略家',
        name: '抑郁质',
        description: '深度思考者，看见别人错过的模式，也重视标准和质量。',
        traits: ['分析型', '追求完美', '忠诚'],
      },
      phlegmatic: {
        title: '守护者',
        name: '黏液质',
        description: '平静的调和者，带来和谐、耐心倾听，并维系长期关系。',
        traits: ['有耐心', '会调和', '可靠'],
      },
    },
    features: [
      { title: '2,500 年智慧', description: '从希波克拉底到现代心理学，气质模型经受了时间考验。' },
      { title: '理解自己和他人', description: '看清你的反应方式，也学习如何更好地连接不同类型的人。' },
      { title: '可行动的洞察', description: '用于成长、关系、领导力和日常生活的实用策略。' },
      { title: '15 种独特混合型', description: '不止四个标签，而是更深入地理解你的气质组合。' },
    ],
    guides: [
      { href: '/zh-CN/temperament-test', title: '气质测试', description: '从主要的免费气质测试指南开始，了解 FourType 如何读取你的分数分布。' },
      { href: '/zh-CN/four-temperaments-test', title: '四气质测试', description: '在测试前比较胆汁质、多血质、抑郁质和黏液质。' },
      { href: '/blog/temperament-test-questions', title: '气质测试题目', description: '了解有用的行为型气质测试题目应该测量什么。' },
      { href: '/blog/4-temperaments-test-free', title: '免费四气质测试', description: '学习如何解读分数分布，而不是只看一个单一标签。' },
    ],
  },
  es: {
    heroAlt: 'FourType — Conoce tu verdadera naturaleza — La búsqueda del temperamento',
    heroStatement: 'Conoce tu naturaleza bajo presión. Haz el test gratis de 40 preguntas para descubrir tu tipo central, mezcla secundaria, respuesta al estrés, estilo de comunicación y punto de crecimiento.',
    heroCta: 'Comenzar la misión',
    heroMeta: '40 preguntas • 15 mezclas únicas • Gratis para siempre',
    choosePath: 'Elige tu camino',
    introSrTitle: 'Test gratis de los cuatro temperamentos: descubre tu tipo online',
    introParagraphs: [
      'Los cuatro temperamentos son un marco antiguo para entender la personalidad que ha influido en la psicología durante más de 2,500 años. El modelo identifica cuatro patrones centrales: Sanguíneo, Colérico, Melancólico y Flemático.',
      'FourType se enfoca en motivaciones, respuestas al estrés y fortalezas naturales. El test no solo muestra tu tipo principal, también compara tus cuatro puntuaciones y señala una posible mezcla de temperamentos.',
      'Con 40 preguntas puedes descubrir tu perfil, entender cómo piensas y reaccionas, y obtener ideas prácticas para crecimiento, relaciones y trabajo.',
    ],
    guideEyebrow: 'Guías del test de temperamento',
    guideTitle: 'Empieza con el test gratis y luego lee tu patrón',
    guideDescription: 'Estas guías de FourType te ayudan a entender el test, comparar los cuatro temperamentos clásicos, revisar el diseño de preguntas e interpretar tu resultado con equilibrio.',
    readGuide: 'Leer guía',
    stats: {
      peopleTested: 'Preguntas',
      blends: 'Mezclas de temperamento',
      wisdom: 'Años de sabiduría',
    },
    whyTitle: '¿Por qué estudiar los temperamentos?',
    whyDescription: 'Comprender tu temperamento es el primer paso para entenderte y conectar mejor con otros.',
    videoTitle: 'Por qué estudiar los temperamentos - FourType',
    temperaments: {
      sanguine: {
        title: 'El Bardo',
        name: 'Sanguíneo',
        description: 'El conector entusiasta que ilumina cualquier lugar con energía y optimismo.',
        traits: ['Carismático', 'Creativo', 'Espontáneo'],
      },
      choleric: {
        title: 'El Comandante',
        name: 'Colérico',
        description: 'El líder natural que toma el mando, impulsa resultados y convierte visión en realidad.',
        traits: ['Decidido', 'Ambicioso', 'Estratégico'],
      },
      melancholic: {
        title: 'El Estratega',
        name: 'Melancólico',
        description: 'El pensador profundo que ve patrones ocultos y valora estándares altos.',
        traits: ['Analítico', 'Perfeccionista', 'Leal'],
      },
      phlegmatic: {
        title: 'El Guardián',
        name: 'Flemático',
        description: 'El pacificador tranquilo que aporta armonía, escucha profundamente y sostiene equipos.',
        traits: ['Paciente', 'Diplomático', 'Confiable'],
      },
    },
    features: [
      { title: '2,500 años de sabiduría', description: 'De Hipócrates a la psicología moderna, los temperamentos han resistido el paso del tiempo.' },
      { title: 'Entiéndete a ti y a otros', description: 'Aprende por qué reaccionas como reaccionas y cómo conectar mejor con cada tipo.' },
      { title: 'Ideas prácticas', description: 'Estrategias para crecimiento, relaciones, liderazgo y vida diaria.' },
      { title: '15 subtipos únicos', description: 'Ve más allá de lo básico con perfiles de mezcla para un autoconocimiento más profundo.' },
    ],
    guides: [
      { href: '/es/temperament-test', title: 'Test de temperamento', description: 'Empieza con la guía principal y aprende cómo FourType lee tu distribución de puntuaciones.' },
      { href: '/es/four-temperaments-test', title: 'Test de los cuatro temperamentos', description: 'Compara Colérico, Sanguíneo, Melancólico y Flemático antes de hacer el test.' },
      { href: '/blog/temperament-test-questions', title: 'Preguntas del test', description: 'Mira qué deberían medir las preguntas útiles basadas en conducta.' },
      { href: '/blog/4-temperaments-test-free', title: 'Test gratuito de 4 temperamentos', description: 'Aprende a leer tu distribución sin reducirte a una sola etiqueta.' },
    ],
  },
}

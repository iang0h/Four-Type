import { QUESTIONS, type Question } from './questions'
import type { BlendKey } from './blends'
import type { TemperamentKey } from './scoringKey'

export type QuizLocale = 'en' | 'zh-CN' | 'es'

export interface QuizCopy {
  name: {
    eyebrow: string
    title: string
    description: string
    placeholder: string
    error: string
    rulesTitle: string
    rules: string[]
    startButton: string
  }
  question: {
    questLabel: string
    entering: string
    keyboardHint: string
    sectionNames: Record<number, string>
    levelGateMessages: Record<number, string>
  }
  loading: {
    eyebrow: string
    messages: string[]
    progressLabel: string
  }
  results: {
    characterClass: string
    youAre: (name: string) => string
    identityLore: string
    coreDrive: string
    tagline: string
    scoreBreakdown: string
    secondary: string
    dominant: string
    tabs: Record<string, string>
    underStress: string
    speakTo: (name: string) => string
    neverDo: string
    bestPartners: string
    frictionWith: string
    famous: (name: string) => string
    identityStack: string
    primaryDrive: string
    likelyMbti: string
    enneagramPattern: string
    rpgClass: string
    inferredNote: string
    inRelationships: string
    atWork: string
    growthIntro: string
    allClasses: string
    tapClass: string
    you: string
    shareResults: string
    showCard: string
    hideCard: string
    shareCardPrompt: string
    continueJourney: string
    journeyIntro: string
    shareButton: string
    copyButton: string
    copiedButton: string
    retakeButton: string
    footer: string
    coreNeed: string
    strengths: string
    shadowSide: string
    thisIsDominant: string
    temperamentNames: Record<TemperamentKey, string>
    classTitles: Record<TemperamentKey, string>
    temperamentLanguages: Record<TemperamentKey, string>
    masking: {
      diagonal: string
      general: string
    }
    interpretation: {
      pure: (name: string) => string
      bilingual: (primary: string, secondary: string) => string
      diagonal: string
    }
  }
}

type LocalizedQuestionText = Pick<Question, 'instruction' | 'text' | 'answers' | 'sectionLabel'>

type LocalizedBlendSummary = {
  name: string
  blend: string
  rpgClass: string
  tagline: string
  drive: string
  lore: string
  strengths: string[]
  shadows: string[]
  underStress: string
  speakTo: string
  neverDo: string
}

const enCopy: QuizCopy = {
  name: {
    eyebrow: 'Hero Initiation',
    title: 'Enter the name of your hero',
    description: 'This quest will reveal the temperament you were born with — answer honestly, as your true self.',
    placeholder: 'Your name or alias...',
    error: 'Your hero needs a name.',
    rulesTitle: 'Quest Rules',
    rules: [
      'Choose the ONE answer you most naturally identify with',
      'Answer as your true self — not who you wish to be',
      'Follow your first instinct; do not overthink',
      'No temperament is better than any other',
    ],
    startButton: 'Begin the Assessment',
  },
  question: {
    questLabel: 'Quest',
    entering: 'Entering',
    keyboardHint: 'Press A, B, C, or D to answer quickly',
    sectionNames: { 1: 'CHAPTER I', 2: 'CHAPTER II', 3: 'CHAPTER III', 4: 'CHAPTER IV' },
    levelGateMessages: {
      10: "Level Up! You've crossed the first threshold.",
      20: 'Level Up! The oracle grows attentive.',
      30: 'Level Up! Your true nature emerges.',
    },
  },
  loading: {
    eyebrow: 'The Oracle Speaks',
    messages: [
      'Consulting the ancient scrolls...',
      'Weighing your answers against the four winds...',
      'The oracle peers into your soul...',
      'Aligning your nature with the stars...',
      'Your destiny is being forged...',
    ],
    progressLabel: 'Calculating your destiny...',
  },
  results: {
    characterClass: 'Your Character Class',
    youAre: (name) => `${name}, you are`,
    identityLore: 'Identity Lore',
    coreDrive: 'Core Drive',
    tagline: 'Tagline',
    scoreBreakdown: 'Score Breakdown',
    secondary: 'Secondary',
    dominant: 'Dominant',
    tabs: {
      strengths: 'Strengths',
      shadow: 'Shadow',
      communication: 'Style',
      partners: 'Match',
      deeper: 'Analysis',
      growth: 'Growth',
    },
    underStress: 'Under stress:',
    speakTo: (name) => `Speak to ${name}`,
    neverDo: 'Never Do',
    bestPartners: 'Best Partners',
    frictionWith: 'Friction With',
    famous: (name) => `Famous ${name}s`,
    identityStack: 'Identity Stack',
    primaryDrive: 'Primary Drive',
    likelyMbti: 'Likely MBTI',
    enneagramPattern: 'Enneagram Pattern',
    rpgClass: 'RPG Class',
    inferredNote: 'Inferred from your pattern — not definitive typing',
    inRelationships: 'In Relationships',
    atWork: 'At Work',
    growthIntro: 'Areas to develop for a more balanced life:',
    allClasses: 'All Character Classes',
    tapClass: 'Tap any class to learn more',
    you: 'YOU',
    shareResults: 'Share Your Results',
    showCard: 'Show',
    hideCard: 'Hide',
    shareCardPrompt: 'Generate a shareable character card to post on social media',
    continueJourney: 'Continue Your Journey',
    journeyIntro: 'Dive deeper into understanding your temperament:',
    shareButton: 'Share My Class',
    copyButton: 'Copy Shareable Link',
    copiedButton: 'Link Copied!',
    retakeButton: 'Retake Quest',
    footer: 'FourType • Free forever • Know Thyself.',
    coreNeed: 'Core Need',
    strengths: 'Strengths',
    shadowSide: 'Shadow Side',
    thisIsDominant: 'This is your dominant type!',
    temperamentNames: {
      Yellow: 'Sanguine',
      Red: 'Choleric',
      Blue: 'Melancholic',
      Green: 'Phlegmatic',
    },
    classTitles: {
      Yellow: 'The Bard',
      Red: 'The Commander',
      Blue: 'The Strategist',
      Green: 'The Guardian',
    },
    temperamentLanguages: {
      Yellow: 'People & Fun',
      Red: 'Power & Control',
      Blue: 'Order & Perfection',
      Green: 'Peace & Stability',
    },
    masking: {
      diagonal: 'This rare diagonal combination may indicate masking — learned behavior vs. true wiring. Take note.',
      general: 'Your scores suggest masking — you may have adapted your personality to meet external expectations. Focus on your dominant temperament for now.',
    },
    interpretation: {
      pure: (name) => `Pure ${name} — rare and singular`,
      bilingual: (primary, secondary) => `Bilingual in two temperaments — ${primary} and ${secondary}`,
      diagonal: 'This rare diagonal combination may indicate masking — learned behavior vs. true wiring',
    },
  },
}

const zhCopy: QuizCopy = {
  name: {
    eyebrow: '英雄启程',
    title: '输入你的英雄名字',
    description: '这场任务会揭示你最自然的气质模式。请诚实作答，按照真实的自己选择。',
    placeholder: '你的名字或昵称...',
    error: '你的英雄需要一个名字。',
    rulesTitle: '任务规则',
    rules: [
      '选择最自然符合你的一个答案',
      '按照真实的自己作答，不要选择理想中的自己',
      '相信第一直觉，不要过度分析',
      '没有哪一种气质比另一种更好',
    ],
    startButton: '开始测评',
  },
  question: {
    questLabel: '任务',
    entering: '进入',
    keyboardHint: '按 A、B、C 或 D 可快速作答',
    sectionNames: { 1: '第一章', 2: '第二章', 3: '第三章', 4: '第四章' },
    levelGateMessages: {
      10: '升级！你已经跨过第一道门槛。',
      20: '升级！神谕开始认真倾听。',
      30: '升级！你的真实本性逐渐显现。',
    },
  },
  loading: {
    eyebrow: '神谕正在回应',
    messages: [
      '正在查阅古老卷轴...',
      '正在以四方之风衡量你的答案...',
      '神谕正在凝视你的内在...',
      '正在让你的本性与星辰对齐...',
      '你的命运正在成形...',
    ],
    progressLabel: '正在计算你的命运...',
  },
  results: {
    ...enCopy.results,
    characterClass: '你的角色职业',
    youAre: (name) => `${name}，你是`,
    identityLore: '身份传说',
    coreDrive: '核心驱动力',
    tagline: '一句话描述',
    scoreBreakdown: '分数分布',
    secondary: '第二气质',
    dominant: '主导',
    tabs: {
      strengths: '优势',
      shadow: '阴影面',
      communication: '沟通',
      partners: '匹配',
      deeper: '分析',
      growth: '成长',
    },
    underStress: '压力下：',
    speakTo: (name) => `如何与 ${name} 沟通`,
    neverDo: '不要这样做',
    bestPartners: '最佳搭档',
    frictionWith: '容易摩擦',
    famous: (name) => `著名 ${name}`,
    identityStack: '身份结构',
    primaryDrive: '主要驱动力',
    likelyMbti: '可能的 MBTI',
    enneagramPattern: '九型人格倾向',
    rpgClass: 'RPG 职业',
    inferredNote: '根据你的作答模式推断，不等同于最终人格定型',
    inRelationships: '在人际关系中',
    atWork: '在工作中',
    growthIntro: '帮助生活更平衡的成长方向：',
    allClasses: '所有角色职业',
    tapClass: '点击任一职业了解更多',
    you: '你',
    shareResults: '分享你的结果',
    showCard: '显示',
    hideCard: '隐藏',
    shareCardPrompt: '生成一张可分享到社交媒体的角色卡',
    continueJourney: '继续你的旅程',
    journeyIntro: '继续深入理解你的气质：',
    shareButton: '分享我的职业',
    copyButton: '复制分享链接',
    copiedButton: '链接已复制！',
    retakeButton: '重新测试',
    footer: 'FourType • 永久免费 • 认识你自己。',
    coreNeed: '核心需求',
    strengths: '优势',
    shadowSide: '阴影面',
    thisIsDominant: '这是你的主导类型！',
    temperamentNames: {
      Yellow: '多血质',
      Red: '胆汁质',
      Blue: '抑郁质',
      Green: '粘液质',
    },
    classTitles: {
      Yellow: '吟游者',
      Red: '指挥官',
      Blue: '战略家',
      Green: '守护者',
    },
    temperamentLanguages: {
      Yellow: '人群与乐趣',
      Red: '力量与掌控',
      Blue: '秩序与完美',
      Green: '和平与稳定',
    },
    masking: {
      diagonal: '这种少见的对角组合可能表示人格遮蔽：学会的行为与真实倾向不完全一致。请特别留意。',
      general: '你的分数显示可能存在人格遮蔽：你也许为了外界期待而调整了表现。先关注主导气质会更清晰。',
    },
    interpretation: {
      pure: (name) => `纯 ${name}：少见而鲜明`,
      bilingual: (primary, secondary) => `你像会说两种气质语言：${primary} 与 ${secondary}`,
      diagonal: '这种少见的对角组合可能表示人格遮蔽：学会的行为与真实倾向不完全一致',
    },
  },
}

const esCopy: QuizCopy = {
  name: {
    eyebrow: 'Inicio del héroe',
    title: 'Escribe el nombre de tu héroe',
    description: 'Esta misión revelará tu patrón de temperamento más natural. Responde con honestidad, como tu yo real.',
    placeholder: 'Tu nombre o alias...',
    error: 'Tu héroe necesita un nombre.',
    rulesTitle: 'Reglas de la misión',
    rules: [
      'Elige la única respuesta con la que te identificas de forma más natural',
      'Responde como eres, no como te gustaría ser',
      'Sigue tu primer instinto; no lo pienses demasiado',
      'Ningún temperamento es mejor que otro',
    ],
    startButton: 'Empezar el test',
  },
  question: {
    questLabel: 'Misión',
    entering: 'Entrando',
    keyboardHint: 'Pulsa A, B, C o D para responder rápido',
    sectionNames: { 1: 'CAPÍTULO I', 2: 'CAPÍTULO II', 3: 'CAPÍTULO III', 4: 'CAPÍTULO IV' },
    levelGateMessages: {
      10: '¡Subiste de nivel! Cruzaste el primer umbral.',
      20: '¡Subiste de nivel! El oráculo presta atención.',
      30: '¡Subiste de nivel! Tu verdadera naturaleza aparece.',
    },
  },
  loading: {
    eyebrow: 'El oráculo habla',
    messages: [
      'Consultando los pergaminos antiguos...',
      'Pesando tus respuestas contra los cuatro vientos...',
      'El oráculo mira dentro de tu alma...',
      'Alineando tu naturaleza con las estrellas...',
      'Tu destino está tomando forma...',
    ],
    progressLabel: 'Calculando tu destino...',
  },
  results: {
    ...enCopy.results,
    characterClass: 'Tu clase de personaje',
    youAre: (name) => `${name}, eres`,
    identityLore: 'Leyenda de identidad',
    coreDrive: 'Impulso central',
    tagline: 'Frase clave',
    scoreBreakdown: 'Desglose de puntuación',
    secondary: 'Secundario',
    dominant: 'Dominante',
    tabs: {
      strengths: 'Fortalezas',
      shadow: 'Sombra',
      communication: 'Estilo',
      partners: 'Afinidad',
      deeper: 'Análisis',
      growth: 'Crecimiento',
    },
    underStress: 'Bajo estrés:',
    speakTo: (name) => `Cómo hablar con ${name}`,
    neverDo: 'Nunca hagas esto',
    bestPartners: 'Mejores parejas',
    frictionWith: 'Fricción con',
    famous: (name) => `${name} famosos`,
    identityStack: 'Estructura de identidad',
    primaryDrive: 'Impulso principal',
    likelyMbti: 'MBTI probable',
    enneagramPattern: 'Patrón de eneagrama',
    rpgClass: 'Clase RPG',
    inferredNote: 'Inferido desde tu patrón; no es un diagnóstico definitivo',
    inRelationships: 'En relaciones',
    atWork: 'En el trabajo',
    growthIntro: 'Áreas para desarrollar una vida más equilibrada:',
    allClasses: 'Todas las clases',
    tapClass: 'Toca cualquier clase para saber más',
    you: 'TÚ',
    shareResults: 'Comparte tus resultados',
    showCard: 'Mostrar',
    hideCard: 'Ocultar',
    shareCardPrompt: 'Genera una tarjeta de personaje para compartir en redes sociales',
    continueJourney: 'Continúa tu viaje',
    journeyIntro: 'Profundiza en la comprensión de tu temperamento:',
    shareButton: 'Compartir mi clase',
    copyButton: 'Copiar enlace',
    copiedButton: '¡Enlace copiado!',
    retakeButton: 'Repetir misión',
    footer: 'FourType • Gratis para siempre • Conócete a ti mismo.',
    coreNeed: 'Necesidad central',
    strengths: 'Fortalezas',
    shadowSide: 'Lado sombra',
    thisIsDominant: '¡Este es tu tipo dominante!',
    temperamentNames: {
      Yellow: 'Sanguíneo',
      Red: 'Colérico',
      Blue: 'Melancólico',
      Green: 'Flemático',
    },
    classTitles: {
      Yellow: 'El Bardo',
      Red: 'El Comandante',
      Blue: 'El Estratega',
      Green: 'El Guardián',
    },
    temperamentLanguages: {
      Yellow: 'Personas y diversión',
      Red: 'Poder y control',
      Blue: 'Orden y perfección',
      Green: 'Paz y estabilidad',
    },
    masking: {
      diagonal: 'Esta combinación diagonal poco común puede indicar enmascaramiento: conducta aprendida frente a tu cableado natural. Tómalo en cuenta.',
      general: 'Tus puntuaciones sugieren enmascaramiento: quizá adaptaste tu personalidad a expectativas externas. Por ahora, enfócate en tu temperamento dominante.',
    },
    interpretation: {
      pure: (name) => `${name} puro: raro y singular`,
      bilingual: (primary, secondary) => `Bilingüe en dos temperamentos: ${primary} y ${secondary}`,
      diagonal: 'Esta combinación diagonal poco común puede indicar enmascaramiento: conducta aprendida frente a tu tendencia real',
    },
  },
}

export const quizCopy: Record<QuizLocale, QuizCopy> = {
  en: enCopy,
  'zh-CN': zhCopy,
  es: esCopy,
}

const zhQuestions: Record<number, LocalizedQuestionText> = {
  1: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '愿意立刻投入新任务，被挑战激发' }, { letter: 'B', text: '随和，容易相处' }, { letter: 'C', text: '对他人的情绪很敏感' }, { letter: 'D', text: '容易兴奋，热情，很快答应' }] },
  2: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '有目标感，想取得成果，也愿意领导' }, { letter: 'B', text: '精力充沛，活泼，公开表达爱与亲近' }, { letter: 'C', text: '重逻辑，会收集事实和资料，喜欢清单' }, { letter: 'D', text: '灵活，能适应变化，在混乱中保持冷静' }] },
  3: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '避免冲突和戏剧化，头脑冷静' }, { letter: 'B', text: '相处有趣，擅长讲故事，也有幽默感' }, { letter: 'C', text: '自我驱动，通常相信自己是对的' }, { letter: 'D', text: '谨慎，考虑周到，不会仓促行动' }] },
  4: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '乐观，总能看到人和事情好的一面' }, { letter: 'B', text: '注重细节，有条理，整洁' }, { letter: 'C', text: '对自己的看法自信且坚定' }, { letter: 'D', text: '合作性强，愿意接纳他人的需要和想法' }] },
  5: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '坚定的问题解决者，会想办法完成' }, { letter: 'B', text: '爱玩，自发，活在当下' }, { letter: 'C', text: '体贴，善良，有礼貌' }, { letter: 'D', text: '认真，避免冲动或过度张扬' }] },
  6: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '友善，外向，健谈' }, { letter: 'B', text: '善于有效运用时间和精力' }, { letter: 'C', text: '放松，不容易被激怒或烦扰' }, { letter: 'D', text: '精确，彻底，对标准要求很高' }] },
  7: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '在社交场合不太自信' }, { letter: 'B', text: '有时脾气来得很快' }, { letter: 'C', text: '很难快速做决定' }, { letter: 'D', text: '有时会主导对话' }] },
  8: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '不怕与别人意见不同，有时显得强势' }, { letter: 'B', text: '不喜欢独处，害怕错过事情' }, { letter: 'C', text: '很少为自己设目标，对方向不够清楚' }, { letter: 'D', text: '有时感到孤立，太常向内思考' }] },
  9: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '可能压迫感强，喜欢掌控' }, { letter: 'B', text: '对自己不确定，不太愿意加入对话或活动' }, { letter: 'C', text: '容易从任务中分心，可能浪费时间或做白日梦' }, { letter: 'D', text: '容易悲伤或阴郁，会被坏消息困住' }] },
  10: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '会说服别人按我的方式做，认为结果可以证明手段' }, { letter: 'B', text: '常把故事讲得夸张，话很多' }, { letter: 'C', text: '不高兴时会用讽刺或沉默表达' }, { letter: 'D', text: '不太会表达热情' }] },
  11: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '缺乏紧迫感，不喜欢被催促' }, { letter: 'B', text: '怀疑性强，会先看到阻碍和最坏情况' }, { letter: 'C', text: '善变，健忘，找借口，会重复讲故事' }, { letter: 'D', text: '不太愿意承认错误或道歉，也很少称赞别人' }] },
  12: { sectionLabel: '特质', instruction: '选择一个最自然符合你的描述。', text: '问问自己：我是不是一个...', answers: [{ letter: 'A', text: '很难坚持到底，尤其当事情不再有趣时' }, { letter: 'B', text: '启动很慢，容易拖延' }, { letter: 'C', text: '不喜欢别人流泪或情绪化，有时显得缺乏同理心' }, { letter: 'D', text: '很难取悦，可能比较挑剔' }] },
  13: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '我喜欢和别人一起把决定说出来、讨论出来。' }, { letter: 'B', text: '我很果断，而且我的决定通常是对的。' }, { letter: 'C', text: '我想先掌握所有信息再做决定。' }, { letter: 'D', text: '有时我希望别人替我做决定。' }] },
  14: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '我喜欢什么都懂一点，也会深入了解真正感兴趣的事。' }, { letter: 'B', text: '我喜欢按自己的日程安排做事。' }, { letter: 'C', text: '我喜欢完成事情，也喜欢有生产力的感觉。' }, { letter: 'D', text: '我喜欢想出让别人喜欢的创意。' }] },
  15: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '我常注意到不完美和错误。' }, { letter: 'B', text: '我常忘记或忽略自己不感兴趣的事。' }, { letter: 'C', text: '我常不会去想糟糕或悲伤的事。' }, { letter: 'D', text: '我通常不表现自己的情绪。' }] },
  16: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '我经常讲自己的经历故事。' }, { letter: 'B', text: '我会先考虑每个想法和细节再表达。' }, { letter: 'C', text: '我谈话喜欢直奔重点，不需要所有细节。' }, { letter: 'D', text: '当我不同意群体时，我会犹豫是否为自己发声。' }] },
  17: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '我希望能按自己的时间节奏完成项目。' }, { letter: 'B', text: '我需要时间处理想法和答案，确保它们正确。' }, { letter: 'C', text: '我想知道项目背后的原因，确认它值得我投入。' }, { letter: 'D', text: '我希望项目有变化和自发性。' }] },
  18: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '我擅长把事情委派给别人。' }, { letter: 'B', text: '我擅长教导别人。' }, { letter: 'C', text: '我擅长激励别人。' }, { letter: 'D', text: '我擅长照顾别人。' }] },
  19: { sectionLabel: '陈述', instruction: '选择最能代表你的一个陈述。', answers: [{ letter: 'A', text: '当我觉得别人不喜欢我时，我会有压力。' }, { letter: 'B', text: '当我觉得别人不理解我时，我会有压力。' }, { letter: 'C', text: '当我觉得自己失去掌控时，我会有压力。' }, { letter: 'D', text: '当我被卷入冲突时，我会有压力。' }] },
  20: { sectionLabel: '短语', instruction: '选择你最可能在心里或口中说的一句话。', answers: [{ letter: 'A', text: '还有谁会去？' }, { letter: 'B', text: '我们要做什么？' }, { letter: 'C', text: '我一定要去吗？' }, { letter: 'D', text: '你去吧。我有更重要的事。' }] },
  21: { sectionLabel: '短语', instruction: '选择你最可能在心里或口中说的一句话。', answers: [{ letter: 'A', text: '你确定安全吗？' }, { letter: 'B', text: '快点！我们迟到了。' }, { letter: 'C', text: '听起来很好玩！' }, { letter: 'D', text: '我怎样都可以。' }] },
  22: { sectionLabel: '短语', instruction: '选择你最可能在心里或口中说的一句话。', answers: [{ letter: 'A', text: '完成了。我处理好了。' }, { letter: 'B', text: '如果有人陪我一起做，我就做。' }, { letter: 'C', text: '我一直在认真思考这件事。' }, { letter: 'D', text: '别担心，一切都会解决的。' }] },
  23: { sectionLabel: '短语', instruction: '选择你最可能在心里或口中说的一句话。', answers: [{ letter: 'A', text: '不用了，谢谢。我看着就好。' }, { letter: 'B', text: '我不是那个意思。' }, { letter: 'C', text: '我很乐意帮忙！' }, { letter: 'D', text: '我不确定我信任他们。' }] },
  24: { sectionLabel: '短语', instruction: '选择你最可能在心里或口中说的一句话。', answers: [{ letter: 'A', text: '我完全忘了。对不起。' }, { letter: 'B', text: '我其实无所谓。你决定吧。' }, { letter: 'C', text: '那行不通。我已经计划好要...' }, { letter: 'D', text: '直接告诉我重点。' }] },
  25: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '随和' }, { letter: 'B', text: '有野心' }, { letter: 'C', text: '精力充沛' }, { letter: 'D', text: '善于分析' }] },
  26: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '热情' }, { letter: 'B', text: '无畏' }, { letter: 'C', text: '好相处' }, { letter: 'D', text: '有同理心' }] },
  27: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '谨慎' }, { letter: 'B', text: '能干' }, { letter: 'C', text: '冷静' }, { letter: 'D', text: '有魅力' }] },
  28: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '积极' }, { letter: 'B', text: '有组织' }, { letter: 'C', text: '坚定' }, { letter: 'D', text: '满足' }] },
  29: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '足智多谋' }, { letter: 'B', text: '体贴' }, { letter: 'C', text: '轻松愉快' }, { letter: 'D', text: '内敛' }] },
  30: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '高效' }, { letter: 'B', text: '有耐心' }, { letter: 'C', text: '注重细节' }, { letter: 'D', text: '以人为本' }] },
  31: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '悲观' }, { letter: 'B', text: '爱指挥' }, { letter: 'C', text: '冷淡' }, { letter: 'D', text: '容易分心' }] },
  32: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '要求高' }, { letter: 'B', text: '疏离' }, { letter: 'C', text: '天真' }, { letter: 'D', text: '情绪化' }] },
  33: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '以自我为中心' }, { letter: 'B', text: '迟缓' }, { letter: 'C', text: '粗心散漫' }, { letter: 'D', text: '多疑' }] },
  34: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '缺乏自律' }, { letter: 'B', text: '缺乏动力' }, { letter: 'C', text: '缺乏同情心' }, { letter: 'D', text: '不宽恕' }] },
  35: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '优柔寡断' }, { letter: 'B', text: '戏剧化' }, { letter: 'C', text: '急躁' }, { letter: 'D', text: '缺乏安全感' }] },
  36: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '直率' }, { letter: 'B', text: '爱评判' }, { letter: 'C', text: '冷漠' }, { letter: 'D', text: '坐不住' }] },
  37: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '有驱动力' }, { letter: 'B', text: '富有想象力' }, { letter: 'C', text: '有怜悯心' }, { letter: 'D', text: '情绪稳定' }] },
  38: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '平衡' }, { letter: 'B', text: '享受努力工作' }, { letter: 'C', text: '有音乐或艺术气质' }, { letter: 'D', text: '能把危机变成笑话' }] },
  39: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '有方法' }, { letter: 'B', text: '笑声很大' }, { letter: 'C', text: '安静但机智' }, { letter: 'D', text: '勇敢' }] },
  40: { sectionLabel: '词语', instruction: '选择最能描述你的一个词或短语。', answers: [{ letter: 'A', text: '有耐心的领导者' }, { letter: 'B', text: '好奇' }, { letter: 'C', text: '善于委派' }, { letter: 'D', text: '深刻且思虑周全' }] },
}

const esQuestions: Record<number, LocalizedQuestionText> = {
  1: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Se lanza a tareas nuevas y se energiza con los retos' }, { letter: 'B', text: 'Es agradable y fácil de tratar' }, { letter: 'C', text: 'Es sensible a las emociones de los demás' }, { letter: 'D', text: 'Se entusiasma rápido, es apasionado y dice que sí enseguida' }] },
  2: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Está motivado por metas y desea liderar' }, { letter: 'B', text: 'Es enérgico, vivaz y expresa afecto abiertamente' }, { letter: 'C', text: 'Es lógico, reúne datos y hechos, y le gustan las listas' }, { letter: 'D', text: 'Es flexible, se adapta a cambios y mantiene la calma en el caos' }] },
  3: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Evita conflicto y drama, mantiene la cabeza fría' }, { letter: 'B', text: 'Es divertido, buen narrador y con sentido del humor' }, { letter: 'C', text: 'Se motiva solo y suele tener razón' }, { letter: 'D', text: 'Es cuidadoso, reflexivo y no se precipita' }] },
  4: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Es optimista y ve lo mejor en personas y situaciones' }, { letter: 'B', text: 'Es detallista, ordenado y pulcro' }, { letter: 'C', text: 'Es seguro y firme con sus opiniones' }, { letter: 'D', text: 'Es cooperativo y abierto a las necesidades e ideas de otros' }] },
  5: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Resuelve problemas con determinación y encuentra la forma de hacerlo' }, { letter: 'B', text: 'Es juguetón, espontáneo y vive el momento' }, { letter: 'C', text: 'Es considerado, amable y educado' }, { letter: 'D', text: 'Es serio y evita ser impulsivo o llamativo' }] },
  6: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Es amigable, extrovertido y conversador' }, { letter: 'B', text: 'Usa su tiempo y esfuerzo de forma eficaz' }, { letter: 'C', text: 'Es relajado y difícil de provocar' }, { letter: 'D', text: 'Es preciso, minucioso y con estándares muy altos' }] },
  7: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'No se siente seguro en situaciones sociales' }, { letter: 'B', text: 'Puede tener mal genio rápidamente' }, { letter: 'C', text: 'Le cuesta tomar decisiones rápidas' }, { letter: 'D', text: 'Puede dominar las conversaciones' }] },
  8: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'No teme discrepar y puede parecer mandón' }, { letter: 'B', text: 'Se incomoda con la soledad y teme perderse algo' }, { letter: 'C', text: 'Rara vez se fija metas y no tiene claro su rumbo' }, { letter: 'D', text: 'A veces se siente aislado y demasiado introspectivo' }] },
  9: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Puede ser dominante y prefiere tener el control' }, { letter: 'B', text: 'Duda de sí mismo y evita sumarse a conversaciones o actividades' }, { letter: 'C', text: 'Busca distracciones y puede perder tiempo o soñar despierto' }, { letter: 'D', text: 'Tiende a sentirse triste o sombrío y se queda atrapado en malas noticias' }] },
  10: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Persuade a otros para hacer las cosas a su manera y cree que el fin justifica los medios' }, { letter: 'B', text: 'Suele exagerar historias y habla compulsivamente' }, { letter: 'C', text: 'Usa sarcasmo o silencio cuando se molesta' }, { letter: 'D', text: 'Le cuesta expresar entusiasmo' }] },
  11: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'No siente urgencia y le molesta que lo presionen' }, { letter: 'B', text: 'Es escéptico, ve obstáculos y piensa en el peor caso' }, { letter: 'C', text: 'Es cambiante, olvidadizo, pone excusas y repite historias' }, { letter: 'D', text: 'Le cuesta admitir errores o pedir perdón, y rara vez halaga' }] },
  12: { sectionLabel: 'Rasgos', instruction: 'Elige la única descripción con la que te identificas de forma más natural.', text: 'Pregúntate: ¿soy alguien que...', answers: [{ letter: 'A', text: 'Le cuesta terminar, sobre todo cuando deja de ser divertido' }, { letter: 'B', text: 'Tarda en ponerse en marcha y procrastina' }, { letter: 'C', text: 'Le incomodan las lágrimas y emociones de otros; puede parecer poco empático' }, { letter: 'D', text: 'Es difícil de complacer y puede ser crítico' }] },
  13: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'Me gusta hablar mis decisiones en voz alta con otras personas.' }, { letter: 'B', text: 'Soy decidido y mis decisiones suelen ser correctas.' }, { letter: 'C', text: 'Quiero toda la información antes de decidir.' }, { letter: 'D', text: 'A veces prefiero que otra persona decida por mí.' }] },
  14: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'Me gusta saber un poco de muchas cosas y mucho de lo que realmente me interesa.' }, { letter: 'B', text: 'Me gusta seguir mi horario.' }, { letter: 'C', text: 'Me gusta lograr cosas y sentirme productivo.' }, { letter: 'D', text: 'Me gusta crear ideas que la gente disfrute.' }] },
  15: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'Suelo notar imperfecciones y errores.' }, { letter: 'B', text: 'Suelo olvidar o ignorar lo que no me interesa.' }, { letter: 'C', text: 'Suelo ni siquiera pensar en cosas malas o tristes.' }, { letter: 'D', text: 'Suelo no mostrar mis emociones.' }] },
  16: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'A menudo cuento historias sobre mis experiencias personales.' }, { letter: 'B', text: 'Considero cada idea y detalle antes de comunicarme.' }, { letter: 'C', text: 'Voy al grano en las conversaciones; no necesito todos los detalles.' }, { letter: 'D', text: 'Dudo en hablar y defenderme cuando no estoy de acuerdo con el grupo.' }] },
  17: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'Quiero libertad para hacer proyectos en mi propio ritmo.' }, { letter: 'B', text: 'Quiero tiempo para procesar mis ideas y respuestas y saber que son correctas.' }, { letter: 'C', text: 'Quiero saber el porqué de un proyecto para decidir si vale mi tiempo.' }, { letter: 'D', text: 'Quiero variedad y espontaneidad en los proyectos.' }] },
  18: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'Soy bueno delegando en otros.' }, { letter: 'B', text: 'Soy bueno enseñando a otros.' }, { letter: 'C', text: 'Soy bueno inspirando a otros.' }, { letter: 'D', text: 'Soy bueno cuidando a otros.' }] },
  19: { sectionLabel: 'Afirmaciones', instruction: 'Elige la afirmación que mejor te representa.', answers: [{ letter: 'A', text: 'Me estreso cuando siento que no caigo bien.' }, { letter: 'B', text: 'Me estreso cuando siento que no me entienden.' }, { letter: 'C', text: 'Me estreso cuando siento que no tengo el control.' }, { letter: 'D', text: 'Me estreso cuando me arrastran a un conflicto.' }] },
  20: { sectionLabel: 'Frases', instruction: 'Elige la frase que más probablemente dirías en tu mente o en voz alta.', answers: [{ letter: 'A', text: '¿Quién más va a estar?' }, { letter: 'B', text: '¿Qué vamos a hacer?' }, { letter: 'C', text: '¿Tengo que ir?' }, { letter: 'D', text: 'Ve tú. Tengo mejores cosas que hacer.' }] },
  21: { sectionLabel: 'Frases', instruction: 'Elige la frase que más probablemente dirías en tu mente o en voz alta.', answers: [{ letter: 'A', text: '¿Seguro que eso es seguro?' }, { letter: 'B', text: '¡Apúrate! Llegamos tarde.' }, { letter: 'C', text: '¡Eso suena divertido!' }, { letter: 'D', text: 'Me parece bien lo que sea.' }] },
  22: { sectionLabel: 'Frases', instruction: 'Elige la frase que más probablemente dirías en tu mente o en voz alta.', answers: [{ letter: 'A', text: 'Está hecho. Ya me encargué.' }, { letter: 'B', text: 'Lo haré si alguien lo hace conmigo.' }, { letter: 'C', text: 'He estado pensándolo.' }, { letter: 'D', text: 'No te preocupes, todo saldrá bien.' }] },
  23: { sectionLabel: 'Frases', instruction: 'Elige la frase que más probablemente dirías en tu mente o en voz alta.', answers: [{ letter: 'A', text: 'No, gracias. Solo miraré.' }, { letter: 'B', text: 'No quise decirlo así.' }, { letter: 'C', text: '¡Me encantaría ayudar!' }, { letter: 'D', text: 'No sé si confío en ellos.' }] },
  24: { sectionLabel: 'Frases', instruction: 'Elige la frase que más probablemente dirías en tu mente o en voz alta.', answers: [{ letter: 'A', text: 'Lo olvidé por completo. Lo siento.' }, { letter: 'B', text: 'En realidad no me importa. Decide tú.' }, { letter: 'C', text: 'Eso no funcionará. Ya planeé...' }, { letter: 'D', text: 'Solo dame el resumen.' }] },
  25: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Tranquilo' }, { letter: 'B', text: 'Ambicioso' }, { letter: 'C', text: 'Energético' }, { letter: 'D', text: 'Analítico' }] },
  26: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Entusiasta' }, { letter: 'B', text: 'Intrépido' }, { letter: 'C', text: 'Agradable' }, { letter: 'D', text: 'Empático' }] },
  27: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Cauteloso' }, { letter: 'B', text: 'Capaz' }, { letter: 'C', text: 'Calmado' }, { letter: 'D', text: 'Encantador' }] },
  28: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Positivo' }, { letter: 'B', text: 'Organizado' }, { letter: 'C', text: 'Asertivo' }, { letter: 'D', text: 'Conforme' }] },
  29: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Ingenioso' }, { letter: 'B', text: 'Considerado' }, { letter: 'C', text: 'Despreocupado' }, { letter: 'D', text: 'Reservado' }] },
  30: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Productivo' }, { letter: 'B', text: 'Paciente' }, { letter: 'C', text: 'Detallista' }, { letter: 'D', text: 'Orientado a personas' }] },
  31: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Pesimista' }, { letter: 'B', text: 'Mandón' }, { letter: 'C', text: 'Indiferente' }, { letter: 'D', text: 'Distraído' }] },
  32: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Exigente' }, { letter: 'B', text: 'Distante' }, { letter: 'C', text: 'Ingenuo' }, { letter: 'D', text: 'Cambiante' }] },
  33: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Egocéntrico' }, { letter: 'B', text: 'Lento' }, { letter: 'C', text: 'Despistado' }, { letter: 'D', text: 'Desconfiado' }] },
  34: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Indisciplinado' }, { letter: 'B', text: 'Desmotivado' }, { letter: 'C', text: 'Poco empático' }, { letter: 'D', text: 'Rencoroso' }] },
  35: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Indeciso' }, { letter: 'B', text: 'Dramático' }, { letter: 'C', text: 'Impaciente' }, { letter: 'D', text: 'Inseguro' }] },
  36: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Directo' }, { letter: 'B', text: 'Crítico' }, { letter: 'C', text: 'Apático' }, { letter: 'D', text: 'Inquieto' }] },
  37: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Impulsado' }, { letter: 'B', text: 'Imaginativo' }, { letter: 'C', text: 'Compasivo' }, { letter: 'D', text: 'Equilibrado' }] },
  38: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Bien equilibrado' }, { letter: 'B', text: 'Disfruta trabajar duro' }, { letter: 'C', text: 'Musical o artístico' }, { letter: 'D', text: 'Convierte la crisis en humor' }] },
  39: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Metódico' }, { letter: 'B', text: 'Risa fuerte' }, { letter: 'C', text: 'Callado pero ingenioso' }, { letter: 'D', text: 'Valiente' }] },
  40: { sectionLabel: 'Palabras', instruction: 'Elige la palabra o frase que mejor te describe.', answers: [{ letter: 'A', text: 'Líder paciente' }, { letter: 'B', text: 'Curioso' }, { letter: 'C', text: 'Delega bien' }, { letter: 'D', text: 'Profundo y reflexivo' }] },
}

export function getQuizQuestions(locale: QuizLocale): Question[] {
  if (locale === 'en') return QUESTIONS

  const translations = locale === 'zh-CN' ? zhQuestions : esQuestions
  return QUESTIONS.map((question) => ({
    ...question,
    ...translations[question.id],
  }))
}

export function getQuizCopy(locale: QuizLocale): QuizCopy {
  return quizCopy[locale]
}

const zhBlendSummaries: Record<BlendKey, LocalizedBlendSummary> = {
  Motivator: { name: '激励者', blend: '胆汁质-多血质', rpgClass: '战地吟游领袖', tagline: '赢得快，也让人愿意跟随。', drive: '取得结果 + 被接纳', lore: '你能把行动力和感染力结合起来。你不只是推动事情发生，也会让过程充满能量。', strengths: ['说服力强，能把逻辑和魅力结合', '擅长带动人群和团队', '压力下行动迅速', '敢于站到前面'], shadows: ['可能急躁到伤人', '容易把关系变成输赢', '开始很猛但容易对收尾失去兴趣'], underStress: '会变得爆发、强势，随后又试图用魅力缓和。', speakTo: '给他们挑战，把事情说成可以赢的局面，重点要短。', neverDo: '不要被动、含糊，或只表达情绪却没有重点。' },
  Executive: { name: '执行官', blend: '胆汁质-粘液质', rpgClass: '冷静战术家', tagline: '用系统取得结果，用稳定保持掌控。', drive: '取得结果 + 维持稳定', lore: '你有决断力，也有稳定感。你不一定大声，但别人会自然信任你的判断。', strengths: ['果断但不鲁莽', '危机中稳定可靠', '标准高但不爱制造戏剧', '能赢得长期尊重'], shadows: ['可能显得冷淡', '不常称赞别人', '情感连结需要练习'], underStress: '会退回冷静和疏离，然后突然非常直接。', speakTo: '先讲结果，展示能力，不要要求太多情绪表态。', neverDo: '不要戏剧化、含糊或过度依赖他们的安抚。' },
  Director: { name: '导演者', blend: '胆汁质-抑郁质', rpgClass: '铁血统帅', tagline: '要正确的结果，也要正确的方式。', drive: '取得结果 + 做到完美', lore: '你同时追求成果和标准。你强烈、精确，常让别人既尊敬又有压力。', strengths: ['行动力和精确度都很强', '标准极高', '分析后能快速决策', '擅长战略规划'], shadows: ['容易批判自己和他人', '对不达标的人缺乏耐心', '容易因压力过大而耗尽'], underStress: '会微观管理、爆发，然后制定一整套改进方案。', speakTo: '准备充分，拿出资料，主动承认缺口。', neverDo: '不要找借口、粗心或浪费他们时间。' },
  Marketer: { name: '推广者', blend: '多血质-胆汁质', rpgClass: '冠军商人', tagline: '被喜欢，也把事情推进。', drive: '被接纳 + 取得结果', lore: '你是极强的外向能量组合，热情、乐观、能把想法卖给世界。', strengths: ['极强的推广和销售能力', '能让房间充满活力', '不怕被拒绝', '比纯多血质更能推动成果'], shadows: ['容易过度承诺', '停不下来，制造混乱', '需要被看见来调节状态'], underStress: '会变得吵杂、分散，并寻找掌声恢复能量。', speakTo: '公开肯定他们，给他们舞台，让他们负责表达。', neverDo: '不要给他们没有人际意义的细碎数据任务。' },
  Relater: { name: '连结者', blend: '多血质-粘液质', rpgClass: '村庄疗愈者', tagline: '与人在一起，让人感觉舒服。', drive: '被接纳 + 维持和谐', lore: '你很容易被喜欢，既有趣又安全。很多人靠近你，是因为你让关系变轻。', strengths: ['亲和力极强', '自然建立关系', '有趣又有同理心', '能和多数人合作'], shadows: ['自我驱动力较弱', '为了避免冲突而压抑自己', '难以拒绝别人'], underStress: '会用玩笑带过，然后悄悄承受。', speakTo: '保持温暖和个人化，说明任务背后的人际意义。', neverDo: '不要把他们放进高冲突或长期孤立的位置。' },
  Performer: { name: '表演者', blend: '多血质-抑郁质', rpgClass: '宫廷诗人', tagline: '表达得动人，也希望表达得好。', drive: '被接纳 + 做到有意义', lore: '你把情感表达和审美标准结合起来。你需要舞台，也需要作品有深度。', strengths: ['表达力强且有审美', '能让感受变成故事', '对氛围和细节敏感', '创意能打动人'], shadows: ['容易情绪起伏', '害怕被误解或否定', '可能在完美与注意力之间拉扯'], underStress: '会戏剧化、敏感，并反复解读别人反应。', speakTo: '肯定他们的表达，同时给清楚、温柔的反馈。', neverDo: '不要嘲笑他们的感受或粗暴否定作品。' },
  Inspector: { name: '检查者', blend: '粘液质-胆汁质', rpgClass: '沉稳守卫', tagline: '用冷静把事情做对。', drive: '维持稳定 + 取得结果', lore: '你平静、务实，也知道何时采取行动。你不像锋芒毕露的人，但很可靠。', strengths: ['稳定又能执行', '不容易被情绪带走', '适合维持秩序', '在压力中可信任'], shadows: ['可能固执', '不愿被催促', '行动力会被舒适区拖慢'], underStress: '会变得被动抵抗，或突然用强硬方式收回控制。', speakTo: '说明现实影响，给他们时间，但也给清晰边界。', neverDo: '不要用混乱、催促或情绪勒索推动他们。' },
  Harmonizer: { name: '调和者', blend: '粘液质-多血质', rpgClass: '和平使者', tagline: '轻松相处，也让气氛变好。', drive: '维持和谐 + 被接纳', lore: '你是关系里的缓冲和温度。你不喜欢冲突，但很会让人放松下来。', strengths: ['让人感到安全舒服', '幽默温和', '擅长缓和气氛', '很容易合作'], shadows: ['可能逃避困难对话', '容易随波逐流', '目标感需要外部支持'], underStress: '会用轻松掩饰压力，并拖延真正的冲突。', speakTo: '用温和语气，给他们参与感和安全感。', neverDo: '不要逼他们当众对抗别人。' },
  Helper: { name: '帮助者', blend: '粘液质-抑郁质', rpgClass: '安静守护者', tagline: '细心照顾，默默守住稳定。', drive: '维持和谐 + 做到有质量', lore: '你温和、细致、忠诚。你不需要被看见，但你常是别人真正依靠的人。', strengths: ['耐心且可靠', '观察细节', '忠诚体贴', '适合支持长期关系'], shadows: ['容易压抑需求', '担心犯错', '会把不满藏很久'], underStress: '会退缩、过度担心，并用沉默表达不满。', speakTo: '温柔、具体，给足处理时间。', neverDo: '不要突然施压或轻视他们的顾虑。' },
  Achiever: { name: '成就者', blend: '抑郁质-胆汁质', rpgClass: '精密建筑师', tagline: '高标准，也要真正完成。', drive: '做到完美 + 取得结果', lore: '你把深度思考和行动决心结合起来。你对质量认真，也希望事情真正落地。', strengths: ['认真且有执行力', '能发现问题并修正', '标准高', '适合复杂目标'], shadows: ['容易过度紧绷', '对自己和别人都苛刻', '难以放下控制'], underStress: '会批判、加速、试图亲自修复一切。', speakTo: '给证据、清晰标准和可执行路径。', neverDo: '不要草率承诺或模糊责任。' },
  Diplomat: { name: '外交者', blend: '抑郁质-多血质', rpgClass: '敏感使者', tagline: '既有深度，也希望被理解。', drive: '做到有意义 + 被接纳', lore: '你既有情感色彩，也有思考深度。你希望表达被看见，也希望内容有分量。', strengths: ['有同理心且有洞察', '表达细腻', '能理解复杂情绪', '适合创作和沟通'], shadows: ['容易过度解读', '被批评后受伤很深', '会在表现与退缩之间摇摆'], underStress: '会敏感、退缩，然后寻求确认。', speakTo: '温柔具体地反馈，先理解再建议。', neverDo: '不要轻率评价他们的感受或动机。' },
  Analyst: { name: '分析师', blend: '抑郁质-粘液质', rpgClass: '静默学者', tagline: '深思熟虑，稳定而精准。', drive: '做到完美 + 维持稳定', lore: '你安静、谨慎、可靠。你不追求喧闹的舞台，而追求正确、清晰和稳定。', strengths: ['深度分析', '稳定耐心', '细节可靠', '适合长期专注'], shadows: ['容易拖延决定', '担心风险', '不愿主动表达需求'], underStress: '会退回内心、反复分析，行动变慢。', speakTo: '给事实、时间和清楚结构。', neverDo: '不要催促他们在信息不足时承诺。' },
  Strategist: { name: '纯战略家', blend: '纯抑郁质', rpgClass: '深度学者', tagline: '先有深度，永远重视标准。', drive: '追求意义与质量', lore: '你的抑郁质非常突出。你能看见别人忽略的模式、风险和质量问题，也容易把高标准背在自己身上。', strengths: ['分析深刻', '标准清晰', '能提前发现风险', '忠于意义和质量'], shadows: ['容易完美主义', '内在批评很强', '压力下会退回思考而迟迟不行动'], underStress: '会反复思考、更加挑剔，并等待足够确定才行动。', speakTo: '具体、真诚、有准备，尊重他们对质量的重视。', neverDo: '不要催促、敷衍或把他们的顾虑说成负面。' },
  Commander: { name: '纯指挥官', blend: '纯胆汁质', rpgClass: '统帅', tagline: '目标清晰，行动直接。', drive: '掌控局面并取得结果', lore: '你的胆汁质非常突出。你天然朝向领导、效率和成果。', strengths: ['果断', '目标感强', '危机中行动快', '能够推动团队'], shadows: ['容易强势', '耐心不足', '忽略他人感受'], underStress: '会更想控制一切，并加快节奏。', speakTo: '简洁、具体、带方案。', neverDo: '不要绕圈子或只抱怨不解决。' },
  Spark: { name: '纯火花', blend: '纯多血质', rpgClass: '吟游火花', tagline: '热情、表达、连接。', drive: '被喜欢并创造快乐', lore: '你的多血质非常突出。你自然把人聚在一起，让场面变亮。', strengths: ['外向有感染力', '乐观', '擅长讲故事', '容易建立连接'], shadows: ['容易分心', '难以坚持', '害怕无聊'], underStress: '会寻找热闹和分散注意力。', speakTo: '温暖、鼓励、带一点趣味。', neverDo: '不要用冷漠和过度细节压住他们。' },
  Guardian: { name: '纯守护者', blend: '纯粘液质', rpgClass: '静水守护者', tagline: '守住和平，吸收压力，不被催促。', drive: '维持稳定与和平', lore: '你的粘液质非常突出。你平静、耐心、包容，是让别人感到安全的人，但也可能把自己的方向藏得太深。', strengths: ['情绪稳定', '耐心可靠', '擅长倾听', '让关系更安全'], shadows: ['容易逃避主动性', '冲突中会沉默', '舒适区可能困住成长'], underStress: '会退回被动和沉默，等待压力过去，而不是说出自己的需要。', speakTo: '温和、清楚，先给安全感，再邀请一个明确的下一步。', neverDo: '不要施压、羞辱或逼他们突然对抗。' },
}

const esBlendSummaries: Record<BlendKey, LocalizedBlendSummary> = {
  Motivator: { name: 'El Motivador', blend: 'Colérico-Sanguíneo', rpgClass: 'Bardo Señor de Guerra', tagline: 'Ganar rápido, con la gente mirando.', drive: 'Lograr resultados + ser aceptado', lore: 'Combinas empuje y carisma. No solo haces que las cosas pasen; haces que parezcan emocionantes.', strengths: ['Persuasivo: lógica y carisma juntos', 'Mueve grupos con facilidad', 'Actúa rápido bajo presión', 'No teme estar al frente'], shadows: ['Puede ser cruel por impaciencia', 'Convierte relaciones en ganar o perder', 'Empieza fuerte y se aburre al cerrar'], underStress: 'Explota, domina y luego intenta suavizarlo con encanto.', speakTo: 'Dale un reto, plantea la situación como algo que puede ganar y ve al punto.', neverDo: 'No seas pasivo, vago ni emocional sin una idea clara.' },
  Executive: { name: 'El Ejecutivo', blend: 'Colérico-Flemático', rpgClass: 'El Táctico', tagline: 'Resultados con sistemas. Control con calma.', drive: 'Lograr resultados + mantener estabilidad', lore: 'Eres decidido y estable. No necesitas ser ruidoso para que otros confíen en tu juicio.', strengths: ['Decisivo sin ser temerario', 'Estable en crisis', 'Altos estándares con poco drama', 'Gana respeto duradero'], shadows: ['Puede parecer frío', 'Rara vez elogia', 'Necesita practicar conexión emocional'], underStress: 'Se vuelve distante y luego muy directo.', speakTo: 'Empieza con resultados, muestra competencia y no exijas mucha validación emocional.', neverDo: 'No seas dramático, vago ni necesitado.' },
  Director: { name: 'El Director', blend: 'Colérico-Melancólico', rpgClass: 'General de Hierro', tagline: 'El resultado correcto, hecho correctamente.', drive: 'Lograr resultados + hacerlo perfecto', lore: 'Buscas resultados y estándares altos. Eres intenso, preciso y difícil de ignorar.', strengths: ['Acción con precisión', 'Estándares muy altos', 'Analiza y decide rápido', 'Gran planificación estratégica'], shadows: ['Crítico consigo mismo y con otros', 'Impaciente con quien no cumple', 'Riesgo de agotamiento'], underStress: 'Micromaneja, explota y crea un plan de mejora enorme.', speakTo: 'Prepárate, muestra datos y asume responsabilidad.', neverDo: 'No pongas excusas, no seas descuidado ni pierdas su tiempo.' },
  Marketer: { name: 'El Promotor', blend: 'Sanguíneo-Colérico', rpgClass: 'Mercader Campeón', tagline: 'Ser querido y lograr cosas.', drive: 'Ser aceptado + lograr resultados', lore: 'Tienes una energía extrovertida enorme: cálida, audaz y capaz de vender una idea al mundo.', strengths: ['Gran promotor y vendedor', 'Energiza cualquier sala', 'No teme el rechazo', 'Más orientado a resultados que el sanguíneo puro'], shadows: ['Promete más de lo que puede cumplir', 'No sabe quedarse quieto', 'Necesita atención para regularse'], underStress: 'Se vuelve ruidoso, disperso y busca aplauso.', speakTo: 'Reconócelo públicamente, dale audiencia y deja que presente la idea.', neverDo: 'No le des tareas secas y llenas de datos sin un gancho humano.' },
  Relater: { name: 'El Conector', blend: 'Sanguíneo-Flemático', rpgClass: 'Sanador del Pueblo', tagline: 'Estar con la gente y hacerla sentir bien.', drive: 'Ser aceptado + mantener armonía', lore: 'Eres fácil de querer: divertido, seguro y amable. La gente se relaja a tu alrededor.', strengths: ['Muy agradable', 'Construye relaciones naturalmente', 'Divertido y empático', 'Coopera con casi cualquiera'], shadows: ['Menor automotivación', 'Evita conflicto hasta borrarse', 'Le cuesta decir no'], underStress: 'Lo convierte en broma y luego lo carga en silencio.', speakTo: 'Sé cálido, personal y conecta la tarea con su significado humano.', neverDo: 'No lo fuerces a roles aislados o de alto conflicto.' },
  Performer: { name: 'El Intérprete', blend: 'Sanguíneo-Melancólico', rpgClass: 'Poeta de la Corte', tagline: 'Expresar con belleza y ser comprendido.', drive: 'Ser aceptado + crear significado', lore: 'Unes expresión emocional con criterio estético. Necesitas escenario, pero también profundidad.', strengths: ['Expresivo y estético', 'Convierte emociones en historias', 'Sensible al ambiente y detalle', 'Creativo y conmovedor'], shadows: ['Altibajos emocionales', 'Miedo a ser malinterpretado', 'Tensión entre perfección y atención'], underStress: 'Se vuelve dramático, sensible y lee demasiado las reacciones.', speakTo: 'Valida su expresión y da feedback claro con suavidad.', neverDo: 'No ridiculices sus emociones ni descartes su obra.' },
  Inspector: { name: 'El Inspector', blend: 'Flemático-Colérico', rpgClass: 'Guardia Sereno', tagline: 'Hacer lo correcto con calma.', drive: 'Mantener estabilidad + lograr resultados', lore: 'Eres tranquilo y práctico, pero sabes cuándo actuar. No eres llamativo, eres fiable.', strengths: ['Estable y ejecutor', 'No se deja arrastrar por emociones', 'Mantiene orden', 'Confiable bajo presión'], shadows: ['Puede ser terco', 'Odia que lo presionen', 'La comodidad puede frenar acción'], underStress: 'Resiste pasivamente o recupera control de forma dura.', speakTo: 'Explica el impacto real, dale tiempo y límites claros.', neverDo: 'No uses caos, prisas ni chantaje emocional.' },
  Harmonizer: { name: 'El Armonizador', blend: 'Flemático-Sanguíneo', rpgClass: 'Pacificador', tagline: 'Fácil de tratar y mejora el ambiente.', drive: 'Mantener armonía + ser aceptado', lore: 'Eres amortiguador y calidez en las relaciones. No amas el conflicto, pero sabes relajar a otros.', strengths: ['Hace sentir seguro a otros', 'Humor suave', 'Reduce tensión', 'Muy cooperativo'], shadows: ['Evita conversaciones difíciles', 'Se deja llevar', 'Necesita apoyo para metas'], underStress: 'Usa ligereza para tapar presión y pospone el conflicto real.', speakTo: 'Usa tono amable, participación y seguridad.', neverDo: 'No lo obligues a confrontar públicamente.' },
  Helper: { name: 'El Ayudante', blend: 'Flemático-Melancólico', rpgClass: 'Guardián Silencioso', tagline: 'Cuidar con detalle y sostener la estabilidad.', drive: 'Mantener armonía + hacer bien las cosas', lore: 'Eres amable, cuidadoso y leal. No buscas el foco, pero otros dependen de ti.', strengths: ['Paciente y fiable', 'Observa detalles', 'Leal y considerado', 'Sostiene relaciones largas'], shadows: ['Esconde sus necesidades', 'Teme equivocarse', 'Acumula resentimiento en silencio'], underStress: 'Se retrae, se preocupa y expresa malestar con silencio.', speakTo: 'Sé amable, específico y dale tiempo para procesar.', neverDo: 'No lo presiones de golpe ni minimices sus preocupaciones.' },
  Achiever: { name: 'El Logrador', blend: 'Melancólico-Colérico', rpgClass: 'Arquitecto Preciso', tagline: 'Alto estándar y acción real.', drive: 'Hacerlo perfecto + lograr resultados', lore: 'Unes pensamiento profundo con determinación. Te importa la calidad y también terminar.', strengths: ['Serio y ejecutivo', 'Detecta problemas y los corrige', 'Altos estándares', 'Ideal para objetivos complejos'], shadows: ['Se tensa demasiado', 'Duro consigo mismo y con otros', 'Le cuesta soltar control'], underStress: 'Critica, acelera e intenta arreglar todo personalmente.', speakTo: 'Da evidencia, estándares claros y una ruta ejecutable.', neverDo: 'No prometas a la ligera ni dejes responsabilidades ambiguas.' },
  Diplomat: { name: 'El Diplomático', blend: 'Melancólico-Sanguíneo', rpgClass: 'Mensajero Sensible', tagline: 'Profundidad que quiere ser comprendida.', drive: 'Crear significado + ser aceptado', lore: 'Tienes color emocional y profundidad mental. Quieres ser visto, pero también tener sustancia.', strengths: ['Empático e intuitivo', 'Expresión matizada', 'Comprende emociones complejas', 'Bueno para creación y comunicación'], shadows: ['Sobreinterpreta', 'La crítica duele mucho', 'Oscila entre mostrarse y retirarse'], underStress: 'Se vuelve sensible, se retira y busca confirmación.', speakTo: 'Da feedback amable y específico; comprende antes de aconsejar.', neverDo: 'No juzgues rápido sus emociones o motivos.' },
  Analyst: { name: 'El Analista', blend: 'Melancólico-Flemático', rpgClass: 'Erudito Silencioso', tagline: 'Reflexivo, estable y preciso.', drive: 'Hacerlo perfecto + mantener estabilidad', lore: 'Eres tranquilo, cuidadoso y fiable. No buscas ruido, buscas claridad, corrección y estabilidad.', strengths: ['Análisis profundo', 'Paciencia estable', 'Detalle confiable', 'Enfoque prolongado'], shadows: ['Retrasa decisiones', 'Ve muchos riesgos', 'No expresa necesidades fácilmente'], underStress: 'Se encierra, analiza demasiado y actúa más lento.', speakTo: 'Da hechos, tiempo y estructura clara.', neverDo: 'No lo apures a comprometerse sin información suficiente.' },
  Strategist: { name: 'El Estratega Puro', blend: 'Melancólico puro', rpgClass: 'Erudito Profundo', tagline: 'Profundidad primero. Estándares siempre.', drive: 'Buscar significado y calidad', lore: 'Tu melancólico es muy fuerte. Ves patrones, riesgos y problemas de calidad que otros pasan por alto, aunque tus estándares también pueden pesar mucho sobre ti.', strengths: ['Análisis profundo', 'Estándares claros', 'Detecta riesgos temprano', 'Leal al significado y a la calidad'], shadows: ['Perfeccionismo', 'Crítica interna fuerte', 'Puede pensar demasiado antes de actuar'], underStress: 'Rumía, se vuelve más crítico y espera certeza antes de moverse.', speakTo: 'Sé específico, sincero y preparado. Respeta su necesidad de calidad.', neverDo: 'No lo apures ni trates sus preocupaciones como simple negatividad.' },
  Commander: { name: 'El Comandante Puro', blend: 'Colérico puro', rpgClass: 'Comandante', tagline: 'Meta clara, acción directa.', drive: 'Tomar control y lograr resultados', lore: 'Tu colérico es muy fuerte. Te orientas naturalmente a liderazgo, eficiencia y resultados.', strengths: ['Decidido', 'Orientado a metas', 'Rápido en crisis', 'Puede mover equipos'], shadows: ['Puede ser dominante', 'Impaciente', 'Ignora emociones ajenas'], underStress: 'Quiere controlarlo todo y acelera el ritmo.', speakTo: 'Sé breve, concreto y trae soluciones.', neverDo: 'No des vueltas ni te quejes sin resolver.' },
  Spark: { name: 'La Chispa Pura', blend: 'Sanguíneo puro', rpgClass: 'Chispa Bardica', tagline: 'Entusiasmo, expresión y conexión.', drive: 'Ser querido y crear alegría', lore: 'Tu sanguíneo es muy fuerte. Unes personas y haces que el ambiente se ilumine.', strengths: ['Extrovertido y contagioso', 'Optimista', 'Buen narrador', 'Conecta fácilmente'], shadows: ['Se distrae', 'Le cuesta terminar', 'Teme el aburrimiento'], underStress: 'Busca ruido social y distracción.', speakTo: 'Sé cálido, alentador y con un toque de diversión.', neverDo: 'No lo aplastes con frialdad o detalles excesivos.' },
  Guardian: { name: 'El Guardián Puro', blend: 'Flemático puro', rpgClass: 'Agua Serena', tagline: 'Paz preservada. Presión absorbida. Nada apresurado.', drive: 'Mantener estabilidad y paz', lore: 'Tu flemático es muy fuerte. Eres tranquilo, paciente y aceptante; das seguridad a otros, aunque puedes esconder demasiado tu propia dirección.', strengths: ['Estabilidad emocional', 'Paciencia profunda', 'Escucha excelente', 'Crea seguridad'], shadows: ['Evita iniciativa', 'Se calla en conflicto', 'La comodidad puede frenar crecimiento'], underStress: 'Se vuelve pasivo, calla y espera que la presión pase en vez de nombrar lo que necesita.', speakTo: 'Sé calmado, amable y concreto. Da seguridad y un siguiente paso claro.', neverDo: 'No lo presiones, avergüences ni encierres en confrontación repentina.' },
}

export function getLocalizedBlendSummary(locale: QuizLocale, blendKey: BlendKey): LocalizedBlendSummary | null {
  if (locale === 'zh-CN') return zhBlendSummaries[blendKey]
  if (locale === 'es') return esBlendSummaries[blendKey]
  return null
}

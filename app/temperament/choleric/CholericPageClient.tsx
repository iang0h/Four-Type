'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Users, Briefcase, Heart, AlertTriangle, Zap, BookOpen, Crown } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function CholericPageClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>('traits');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => { setIsVisible(true); }, []);

  const traits = [
    'Natural leader',
    'Decisive and determined',
    'Goal-oriented',
    'Direct communicator',
    'Competitive',
    'Action-focused',
    'Confident',
    'Takes charge naturally',
  ];

  const strengths = [
    'Excellent leadership abilities',
    'Gets things done efficiently',
    'Natural problem-solver',
    'Motivates teams to achieve',
    'Strong willpower and focus',
    'Clear vision and direction',
    'Confident decision-maker',
    'Drives organizational success',
  ];

  const challenges = [
    'Can be overly aggressive',
    'May appear domineering',
    'Impatient with others',
    'Difficulty delegating',
    'Can seem cold or insensitive',
    'Burnout from overwork',
    'May dismiss others\' input',
    'Struggles with empathy',
  ];

  const careerFits = [
    { title: 'Executive Leadership', description: 'Natural fit for C-suite roles where decisive vision-casting and results matter.' },
    { title: 'Entrepreneurship', description: 'Starting and scaling businesses leverages Choleric drive and risk tolerance.' },
    { title: 'Military/Law Enforcement', description: 'Command structures and high-stakes decisions suit Choleric temperament.' },
    { title: 'Project Management', description: 'Driving teams toward deadlines and objectives is a natural Choleric strength.' },
    { title: 'Sales Management', description: 'Competitive environments with clear metrics where results are rewarded.' },
    { title: 'Strategic Planning', description: 'Long-term vision combined with practical execution pathways.' },
    { title: 'Politics', description: 'Influencing policy and leading constituencies requires Choleric confidence.' },
    { title: 'Emergency Services', description: 'High-pressure, fast-decision environments where leadership saves lives.' },
  ];

  const faqs = [
    {
      question: 'What is a Choleric temperament?',
      answer: 'The Choleric temperament is one of the four classical temperaments identified by Hippocrates over 2,500 years ago. The word "choleric" comes from Greek "cholē" meaning bile, as ancient physicians associated this temperament with yellow bile in the body\'s humoral system. Cholerics are characterized by ambition, decisiveness, and natural leadership ability. They are goal-oriented extroverts who excel at taking charge, driving results, and turning vision into reality. In the FourType system, we call them "The Commander" because of their commanding presence and strategic mind.',
    },
    {
      question: 'What are the main strengths of a Choleric personality?',
      answer: 'Cholerics possess powerful natural gifts: exceptional leadership abilities that inspire teams to achieve, efficiency in getting things done when others procrastinate, natural problem-solving skills that cut through complexity, strong willpower and focus that sustains effort over time, clear vision and direction that provides strategic clarity, and the ability to motivate teams through both challenge and example. They are the temperament most likely to start businesses, lead organizations, and drive transformational change.',
    },
    {
      question: 'What careers are best for Choleric temperaments?',
      answer: 'Cholerics excel in leadership-intensive careers with clear results and authority: executive leadership (CEO, COO positions), entrepreneurship (starting and scaling ventures), military and law enforcement (command roles), project management (driving complex initiatives), sales management (competitive environments), strategic planning (long-term vision work), politics (policy influence), and emergency services (high-stakes decision-making). They thrive where they can lead, decide, and see tangible results from their efforts.',
    },
    {
      question: 'How do Cholerics behave in relationships?',
      answer: 'In relationships, Cholerics are protective, loyal, and action-oriented partners. They show love through providing, problem-solving, and taking charge of challenges. They appreciate partners who are confident, can handle direct communication, and don\'t need constant emotional reassurance. Best matches often include Phlegmatics (who provide peace and support their drive), Melancholics (who handle details they overlook), or other Cholerics (power couples with shared ambition). Their challenge is slowing down for emotional connection and not treating relationships like projects to manage.',
    },
    {
      question: 'What are the weaknesses of the Choleric temperament?',
      answer: 'Every temperament has growth areas. For Cholerics: appearing aggressive or domineering when passion for results overrides sensitivity, impatience with slower-paced people and processes, difficulty delegating (believing they can do it better themselves), struggling with empathy and emotional intelligence, workaholic tendencies leading to burnout and relationship neglect, and dismissing others\' input too quickly. Self-awareness and intentional humility help Cholerics grow into servant leaders rather than just commanders.',
    },
    {
      question: 'How does a Choleric handle stress?',
      answer: 'Under stress, Cholerics may become more controlling, aggressive, or workaholic. They might micromanage, become short-tempered, or work longer hours instead of addressing root issues. Healthy coping strategies include: intense physical exercise (channeling aggressive energy), strategic problem-solving (breaking down overwhelming situations), learning to delegate and trust others, taking brief retreats to regain perspective, and building in non-negotiable rest. The key is recognizing when drive becomes destructive.',
    },
    {
      question: 'Is Choleric the same as Type A personality?',
      answer: 'While similar, they\'re not identical. Type A personality, developed by cardiologists Friedman and Rosenman, focuses primarily on competitiveness, urgency, and hostility—often as heart disease risk factors. The Choleric temperament encompasses broader leadership traits including decisiveness, goal-orientation, commanding presence, and strategic thinking. Many Type A individuals are indeed Choleric, but the temperament system provides deeper insights into motivation, relationships, and growth pathways that Type A doesn\'t address.',
    },
  ];

  return (
    <>
      <RuneBackground />
      <Navigation />
      <main className="min-h-screen relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="inline-block mb-4">
                  <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">The Commander Archetype</span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">The Choleric Temperament</h1>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-lg text-white font-medium">
                    <strong>Definition:</strong> The Choleric temperament is characterized by ambition, decisiveness, and natural leadership ability. Cholerics are goal-oriented extroverts who excel at taking charge, driving results, and turning vision into reality.
                  </p>
                </div>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Powerful, decisive, and commanding, the Choleric personality is born to lead. These natural authorities drive ambitious goals and inspire action in others through their unwavering confidence and strategic vision. Dating back 2,500 years, this temperament has shaped history&apos;s greatest leaders, generals, and entrepreneurs.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/quiz" className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Take the Quiz</Link>
                  <Link href="/blog/choleric" className="px-8 py-3 border-2 border-red-600 text-red-500 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300">Deep Dive Article</Link>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png" alt="The Commander - Choleric Temperament Character Illustration" width={400} height={500} className="relative z-10 w-auto h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4"><p className="text-3xl font-bold text-red-500">Red</p><p className="text-gray-400 text-sm">Color Association</p></div>
              <div className="text-center p-4"><p className="text-3xl font-bold text-red-500">Fire</p><p className="text-gray-400 text-sm">Classical Element</p></div>
              <div className="text-center p-4"><p className="text-3xl font-bold text-red-500">Summer</p><p className="text-gray-400 text-sm">Season</p></div>
              <div className="text-center p-4"><p className="text-3xl font-bold text-red-500">Control</p><p className="text-gray-400 text-sm">Love Language</p></div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Image src="/images/choleric-hero.jpg" alt="The Commander - Choleric Temperament character card showing Fire element, Summer season, and Testosterone neurochemical" width={1200} height={600} className="rounded-lg shadow-2xl w-full object-cover" />
          </div>
        </section>
        
        {/* Subtypes Image Section */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Image src="/images/choleric-subtypes.jpg" alt="Fire Core: The Choleric Subtypes - Pure Choleric, Chol-San, Chol-Mel, and Chol-Phleg variations" width={1200} height={600} className="rounded-lg shadow-2xl w-full object-cover" />
          </div>
        </section>

        {/* In-Depth Overview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Understanding the Choleric Temperament</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">
                The Choleric temperament represents the driven achiever in humanity&apos;s personality spectrum. Named from the Greek &quot;cholē&quot; (bile), ancient physicians believed this temperament resulted from an excess of yellow bile, associating it with heat and dryness—fitting metaphors for the Choleric&apos;s burning ambition and decisive nature.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                In modern personality psychology, Cholerics correlate with high extraversion and low agreeableness in the Big Five model—they&apos;re outgoing but don&apos;t prioritize pleasing others over achieving goals. They share characteristics with ENTJ and ESTJ types in Myers-Briggs. However, the temperament approach reveals unique insights about emotional patterns and interpersonal dynamics that other systems miss.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                What distinguishes Cholerics is their orientation toward results and control. While Sanguines are people-focused and Melancholics are task-quality focused, Cholerics are task-completion focused. They ask not &quot;Is everyone happy?&quot; or &quot;Is this perfect?&quot; but &quot;Is this done?&quot; This makes them indispensable in organizations that need to execute, but challenging in environments that require patience and consensus.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-700">
              {[
                { id: 'traits', label: 'Key Traits', icon: Crown },
                { id: 'strengths', label: 'Strengths', icon: Zap },
                { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
              ].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-all duration-300 ${activeTab === tab.id ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-400 hover:text-white'}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(activeTab === 'traits' ? traits : activeTab === 'strengths' ? strengths : challenges).map((item, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-500 transition-all duration-300 transform hover:scale-105">
                  <p className="text-sm font-semibold text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Under Stress Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-white text-center">The Choleric Under Stress</h2>
            </div>
            <div className="bg-gray-900 border border-red-500/30 rounded-lg p-8">
              <p className="text-gray-300 leading-relaxed mb-6">When Cholerics face prolonged stress, their strengths can become liabilities. Understanding these patterns helps both Cholerics and those around them navigate difficult seasons.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-4">Stress Warning Signs</h3>
                  <ul className="space-y-2">
                    {['Becoming controlling and micromanaging', 'Increased aggression or short temper', 'Working longer hours, sleeping less', 'Dismissing others\' concerns entirely', 'Making rash decisions without input', 'Physical symptoms: headaches, tension', 'Withdrawal from emotional connection'].map((sign, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-red-500 mt-1">&#8226;</span>{sign}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-500 mb-4">Healthy Coping Strategies</h3>
                  <ul className="space-y-2">
                    {['Intense physical exercise (weights, running, sports)', 'Strategic problem-solving sessions', 'Learning to delegate and trust others', 'Brief retreats to regain perspective', 'Building in non-negotiable rest', 'Talking with trusted advisors', 'Focusing on what you CAN control'].map((strategy, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-green-400 mt-1">&#10003;</span>{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationships Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-white text-center">Cholerics in Relationships</h2>
            </div>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed">Understanding how Cholerics approach love, friendship, and leadership helps build stronger connections with these powerful personalities.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-4">Romantic Relationships</h3>
                <p className="text-gray-300 mb-4">Cholerics are protective, loyal partners who show love through action—solving problems, providing security, and taking charge of challenges. They value competent, confident partners.</p>
                <p className="text-gray-400 text-sm"><strong>Best matches:</strong> Phlegmatic (peaceful support), Melancholic (detail partner), or Choleric (power couple with clear domains).</p>
              </div>
              <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-4">Friendships</h3>
                <p className="text-gray-300 mb-4">Cholerics have few but fiercely loyal friends. They value competence and reliability over quantity of connections. They&apos;re the friend who shows up to help you move or solve a crisis.</p>
                <p className="text-gray-400 text-sm"><strong>Challenge:</strong> May struggle with purely social friendships without purpose or activity.</p>
              </div>
              <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-4">As Parents</h3>
                <p className="text-gray-300 mb-4">Strong, protective parents who teach resilience and achievement. They provide clear structure and high expectations, preparing children for the real world.</p>
                <p className="text-gray-400 text-sm"><strong>Growth area:</strong> Balancing high expectations with emotional warmth and patience for children&apos;s developmental pace.</p>
              </div>
              <div className="bg-gray-900 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-4">As Leaders</h3>
                <p className="text-gray-300 mb-4">Natural executives who cast vision, make decisions, and drive results. They build high-performing teams and aren&apos;t afraid of difficult conversations or unpopular decisions.</p>
                <p className="text-gray-400 text-sm"><strong>Challenge:</strong> Learning servant leadership—supporting team growth, not just extracting performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Fits */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-white text-center">Best Careers for Cholerics</h2>
            </div>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Cholerics thrive in careers with clear authority, measurable results, and leadership opportunity.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {careerFits.map((career, index) => (
                <div key={index} className="p-6 bg-gray-900 border border-red-600/30 rounded-lg hover:border-red-600 transition-all duration-300 group cursor-pointer">
                  <h3 className="text-lg font-bold text-red-500 group-hover:translate-x-2 transition-transform duration-300">{career.title}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{career.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Strategies */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Growth Strategies for Cholerics</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Your drive is a gift. These practices help you lead with greater impact while avoiding common Choleric pitfalls.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Putting others first and verbalizing your appreciation for them',
                'Greeting others with a sincere smile and giving them your full attention',
                'Waiting until you\'re asked before sharing your opinions',
                'Listening all the way to the end – trying to understand, not just formulating your response',
                'Making requests instead of issuing demands, saying please',
                'Pausing for a deep breath when you feel yourself getting angry and/or loud',
                'Connecting with people, not just completing projects',
                'Moderating your tone and volume',
                'Owning your mistakes and apologizing out loud',
                'Praying for others instead of trying to fix them or giving unsolicited advice',
                'Lightening up, cutting loose, stepping away from work and tasks',
                'Giving others complete ownership over the method and time frame of completing tasks',
              ].map((tip, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-600 transition-all duration-300">
                  <p className="text-sm text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build-Up Guide */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">How to Support a Choleric</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Knowing someone&apos;s temperament helps you connect with them more effectively.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-red-600/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-500 mb-6">Do This to Build Them Up</h3>
                <ul className="space-y-3">
                  {['Giving them something to be in control of', 'Recognizing their work and results', 'Encouraging their intellect and problem-solving', 'Having their back publicly', 'Letting them decide when appropriate', 'Keeping communication short and to the point', 'Promoting their leadership', 'Speaking logically and realistically'].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-red-500 mt-1">&#9654;</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Avoid These Behaviors</h3>
                <ul className="space-y-3">
                  {['Making decisions for them without input', 'Not following through on commitments', 'Embarrassing them in front of others', 'Arguing with or lecturing them', 'Overlooking their contributions', 'Being vague or overly emotional', 'Not respecting their time'].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-red-400 mt-1">&#9654;</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors">
                    <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-red-500 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && <div className="px-6 pb-6"><p className="text-gray-300 leading-relaxed">{faq.answer}</p></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Learn More</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Link href="/blog/choleric" className="p-6 bg-gray-900 border border-red-500/30 rounded-lg hover:border-red-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-red-500 mb-2">Deep Dive: The Choleric</h3>
                <p className="text-gray-400 text-sm">Extended article exploring leadership psychology and Choleric excellence.</p>
              </Link>
              <Link href="/blog/subtypes" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2">16 Temperament Patterns</h3>
                <p className="text-gray-400 text-sm">Discover Choleric-Sanguine, Choleric-Melancholic, and other blend profiles.</p>
              </Link>
              <Link href="/quiz" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2">Take the Temperament Quiz</h3>
                <p className="text-gray-400 text-sm">40 questions to discover your unique temperament blend.</p>
              </Link>
              <Link href="/blog/leadership-and-temperament" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-red-500 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-2">Leadership & Temperament</h3>
                <p className="text-gray-400 text-sm">How each temperament approaches leadership differently.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Explore Other Temperaments */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Explore Other Temperaments</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sanguine', slug: 'sanguine', color: '#FFD700', title: 'The Bard', description: 'Enthusiastic connectors who bring energy and joy.' },
                { name: 'Melancholic', slug: 'melancholic', color: '#3B82F6', title: 'The Strategist', description: 'Deep thinkers who excel at analysis and perfectionism.' },
                { name: 'Phlegmatic', slug: 'phlegmatic', color: '#22C55E', title: 'The Guardian', description: 'Peaceful supporters who create harmony and stability.' },
              ].map((temp) => (
                <Link key={temp.name} href={`/temperament/${temp.slug}`} className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${temp.color}20`, border: `2px solid ${temp.color}` }}>
                    <span className="text-2xl font-bold" style={{ color: temp.color }}>{temp.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{temp.name}</h3>
                  <p className="text-sm font-medium mb-2" style={{ color: temp.color }}>{temp.title}</p>
                  <p className="text-gray-400 text-sm">{temp.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Discover Your Temperament</h2>
            <p className="text-gray-400 mb-8">Take our free 40-question quiz to discover your unique temperament blend and unlock personalized leadership insights.</p>
            <Link href="/quiz" className="inline-block px-12 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105">Start the Free Quiz</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

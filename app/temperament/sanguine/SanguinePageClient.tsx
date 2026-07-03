'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Users, Briefcase, Heart, AlertTriangle, Zap, BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function SanguinePageClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>('traits');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const traits = [
    'Extroverted and social',
    'Enthusiastic and optimistic',
    'Creative and spontaneous',
    'Talkative and persuasive',
    'Enjoys new experiences',
    'Playful and humorous',
    'Adaptable and flexible',
    'People-focused',
  ];

  const strengths = [
    'Natural communicators with charisma',
    'Excellent at building relationships',
    'Creative problem-solving approach',
    'Energizes and motivates others',
    'Adaptable to change',
    'Brings joy and light to situations',
    'Strong networking abilities',
    'Excellent at public speaking',
  ];

  const challenges = [
    'Can be impulsive and scattered',
    'Difficulty with long-term focus',
    'May struggle with detail-oriented tasks',
    'Can appear shallow to others',
    'Prone to overspending',
    'May avoid difficult conversations',
    'Can be unreliable if not disciplined',
    'Struggles with patience',
  ];

  const careerFits = [
    { title: 'Sales and Marketing', description: 'Natural persuasion and relationship-building skills make Sanguines top performers in client-facing roles.' },
    { title: 'Entertainment', description: 'The spotlight feels like home—acting, comedy, music, and hosting come naturally.' },
    { title: 'Event Planning', description: 'Creativity, social skills, and ability to handle chaos make event management ideal.' },
    { title: 'Public Relations', description: 'Building relationships with media and stakeholders plays to core Sanguine strengths.' },
    { title: 'Teaching', description: 'Engaging students and making learning fun is a natural Sanguine gift.' },
    { title: 'Hospitality', description: 'Hotels, restaurants, and tourism industries value the warm Sanguine presence.' },
    { title: 'Creative Industries', description: 'Advertising, design, and content creation channels endless creative energy.' },
    { title: 'Leadership Roles', description: 'Inspiring teams and casting vision comes naturally to enthusiastic Sanguines.' },
  ];

  const faqs = [
    {
      question: 'What is a Sanguine temperament?',
      answer: 'The Sanguine temperament is one of the four classical temperaments first identified by Hippocrates over 2,500 years ago. Characterized by enthusiasm, optimism, and social magnetism, Sanguines are the extroverts of the temperament world. They thrive on human connection, love new experiences, and bring infectious energy to everything they do. In the FourType system, we call them "The Bard" because of their natural storytelling abilities and charismatic presence.',
    },
    {
      question: 'What are the main strengths of a Sanguine personality?',
      answer: 'Sanguines possess remarkable natural gifts: they\'re excellent communicators who can captivate any audience, skilled networkers who build relationships effortlessly, creative thinkers who generate innovative solutions, and natural motivators who inspire those around them. Their adaptability means they handle change better than most temperaments, and their optimism helps teams push through challenges. They\'re often the emotional glue that holds groups together.',
    },
    {
      question: 'What careers are best for Sanguine temperaments?',
      answer: 'Sanguines excel in careers that combine people interaction with creativity and variety. Top choices include: sales and marketing (using natural persuasion), entertainment and media (comfortable in the spotlight), event planning (thriving in dynamic environments), public relations (building relationships), teaching (engaging students), hospitality (creating welcoming experiences), and creative industries (channeling endless ideas). Leadership roles that require inspiring others are also excellent fits.',
    },
    {
      question: 'How do Sanguines behave in relationships?',
      answer: 'In relationships, Sanguines are warm, affectionate, and fun-loving partners who keep things exciting. They express love through quality time, words of affirmation, and spontaneous gestures. However, they may struggle with consistency in daily routines and deep emotional conversations that require patience. They need partners who appreciate their social nature and give them freedom to maintain friendships. The best matches often include Phlegmatics (who provide stability) or other Sanguines (who share their zest for life).',
    },
    {
      question: 'What are the weaknesses of the Sanguine temperament?',
      answer: 'Every temperament has growth areas. For Sanguines, common challenges include: impulsivity (acting before thinking), difficulty maintaining long-term focus (distracted by new opportunities), struggles with detail-oriented tasks (preferring big-picture thinking), tendency to overcommit (saying yes to everything), and sometimes being perceived as shallow (prioritizing breadth over depth in relationships). Self-awareness and intentional discipline help Sanguines grow past these limitations.',
    },
    {
      question: 'How does a Sanguine handle stress?',
      answer: 'Under stress, Sanguines may become scattered, overly talkative, or seek distraction through social activities and entertainment. They might avoid dealing with problems directly, hoping issues will resolve themselves. Healthy coping strategies include: talking through problems with trusted friends, channeling stress into creative projects, maintaining some routine structure, and breaking overwhelming tasks into smaller social-friendly chunks. Physical activity and laughter are powerful stress relievers for this temperament.',
    },
    {
      question: 'What is the difference between Sanguine and Choleric temperaments?',
      answer: 'While both Sanguines and Cholerics are extroverted and energetic, they differ fundamentally in focus. Sanguines are people-focused—they seek connection, fun, and shared experiences. Cholerics are task-focused—they seek achievement, results, and control. Sanguines inspire through enthusiasm and charisma; Cholerics lead through decisive action and clear direction. Sanguines ask "Who\'s coming?" while Cholerics ask "What\'s the goal?" Understanding these differences helps these two temperaments work together effectively.',
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
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="inline-block mb-4">
                  <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-widest">
                    The Bard Archetype
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  The Sanguine Temperament
                </h1>
                
                {/* Clear Definition */}
                <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4 mb-6">
                  <p className="text-lg text-white font-medium">
                    <strong>Definition:</strong> The Sanguine temperament is characterized by enthusiasm, optimism, creativity, and a natural gift for connecting with others. Sanguines are extroverted personalities who thrive in social settings and bring energy to every room they enter.
                  </p>
                </div>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Vibrant, charismatic, and eternally optimistic, the Sanguine personality brings
                  warmth and energy to every interaction. Known as the life of the party, Sanguines
                  thrive in social settings and inspire those around them with their infectious
                  enthusiasm. This ancient temperament type has been recognized for over 2,500 years
                  as one of the four fundamental personality patterns.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Link
                    href="/quiz"
                    className="px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                  >
                    Take the Quiz
                  </Link>
                  <Link
                    href="/blog/sanguine"
                    className="px-8 py-3 border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700] hover:text-black transition-all duration-300"
                  >
                    Deep Dive Article
                  </Link>
                </div>
              </div>

              <div className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png"
                    alt="The Bard - Sanguine Temperament Character Illustration"
                    width={400}
                    height={500}
                    className="relative z-10 w-auto h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-[#FFD700]">Yellow</p>
                <p className="text-gray-400 text-sm">Color Association</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-[#FFD700]">Air</p>
                <p className="text-gray-400 text-sm">Classical Element</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-[#FFD700]">Spring</p>
                <p className="text-gray-400 text-sm">Season</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-[#FFD700]">Influence</p>
                <p className="text-gray-400 text-sm">Love Language</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Image
              src="/images/sanguine-hero.jpg"
              alt="The Bard - Sanguine Temperament character card showing Air element, Spring season, and Dopamine neurochemical"
              width={1200}
              height={600}
              className="rounded-lg shadow-2xl w-full object-cover"
            />
          </div>
        </section>
        
        {/* Subtypes Image Section */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Image
              src="/images/sanguine-subtypes.jpg"
              alt="Air Core: The Sanguine Subtypes - Pure Sanguine, San-Chol, San-Mel, and San-Phleg variations"
              width={1200}
              height={600}
              className="rounded-lg shadow-2xl w-full object-cover"
            />
          </div>
        </section>

        {/* In-Depth Overview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Understanding the Sanguine Temperament</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">
                The Sanguine temperament represents one of humanity&apos;s oldest personality classifications, 
                dating back to the ancient Greek physician Hippocrates around 400 BCE. The word &quot;sanguine&quot; 
                derives from the Latin &quot;sanguis,&quot; meaning blood, as ancient physicians believed this 
                temperament was associated with an abundance of blood in the body&apos;s humoral balance.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                In modern personality psychology, the Sanguine type correlates strongly with high extraversion 
                and high openness to experience in the Big Five model. They share characteristics with ENFP 
                and ESFP types in the Myers-Briggs system. However, the temperament approach offers unique 
                insights that other systems miss—particularly around emotional patterns, stress responses, 
                and interpersonal dynamics that have been observed consistently for millennia.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                What makes Sanguines truly distinctive is their emotional responsiveness and social orientation. 
                They experience emotions quickly and intensely but also move through them rapidly. A Sanguine 
                can be genuinely upset one moment and laughing the next—not because they&apos;re shallow, but 
                because their emotional processing style is fundamentally different from other temperaments.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Section - Traits, Strengths, Challenges */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-700">
              {[
                { id: 'traits', label: 'Key Traits', icon: Zap },
                { id: 'strengths', label: 'Strengths', icon: Users },
                { id: 'challenges', label: 'Challenges', icon: AlertTriangle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-[#FFD700] border-b-2 border-[#FFD700]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(activeTab === 'traits'
                ? traits
                : activeTab === 'strengths'
                  ? strengths
                  : challenges
              ).map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300 transform hover:scale-105"
                >
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
              <AlertTriangle className="w-8 h-8 text-[#FFD700]" />
              <h2 className="text-3xl font-bold text-white text-center">The Sanguine Under Stress</h2>
            </div>
            <div className="bg-gray-900 border border-[#FFD700]/30 rounded-lg p-8">
              <p className="text-gray-300 leading-relaxed mb-6">
                When Sanguines face prolonged stress, their normally sunny disposition can shift dramatically. 
                Understanding these stress responses helps both Sanguines and those who care about them 
                recognize when support is needed.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#FFD700] mb-4">Stress Warning Signs</h3>
                  <ul className="space-y-2">
                    {[
                      'Becoming unusually scattered or forgetful',
                      'Excessive talking without listening',
                      'Compulsive social media checking',
                      'Overspending or impulse purchases',
                      'Avoiding alone time at all costs',
                      'Making promises they can\'t keep',
                      'Dramatic mood swings',
                    ].map((sign, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-[#FFD700] mt-1">&#8226;</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#FFD700] mb-4">Healthy Coping Strategies</h3>
                  <ul className="space-y-2">
                    {[
                      'Talk through problems with trusted friends',
                      'Channel stress into creative projects',
                      'Maintain some routine structure',
                      'Break tasks into small, social-friendly chunks',
                      'Use physical activity and exercise',
                      'Practice saying "no" to new commitments',
                      'Schedule intentional downtime',
                    ].map((strategy, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        {strategy}
                      </li>
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
              <Heart className="w-8 h-8 text-[#FFD700]" />
              <h2 className="text-3xl font-bold text-white text-center">Sanguines in Relationships</h2>
            </div>
            
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Understanding how Sanguines approach love, friendship, and family helps build stronger, 
              more fulfilling connections with these warm-hearted individuals.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900 border border-[#FFD700]/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Romantic Relationships</h3>
                <p className="text-gray-300 mb-4">
                  Sanguines are passionate, expressive partners who keep relationships exciting. They 
                  show love through quality time, spontaneous adventures, and verbal affirmation.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Best matches:</strong> Phlegmatic (provides stability), fellow Sanguine (shared enthusiasm), 
                  or Choleric (complementary strengths in a power couple dynamic).
                </p>
              </div>
              <div className="bg-gray-900 border border-[#FFD700]/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">Friendships</h3>
                <p className="text-gray-300 mb-4">
                  Sanguines collect friends like treasures. They maintain wide social circles and are 
                  often the connectors who bring different friend groups together.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Challenge:</strong> May have many acquaintances but struggle to develop deep, 
                  vulnerable friendships. Need to invest in quality over quantity.
                </p>
              </div>
              <div className="bg-gray-900 border border-[#FFD700]/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">As Parents</h3>
                <p className="text-gray-300 mb-4">
                  Fun, engaging parents who create magical childhood memories. Excel at play, creativity, 
                  and making everyday moments special.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Growth area:</strong> Consistency with rules and follow-through on discipline. 
                  May benefit from a more structured co-parent.
                </p>
              </div>
              <div className="bg-gray-900 border border-[#FFD700]/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-[#FFD700] mb-4">In the Workplace</h3>
                <p className="text-gray-300 mb-4">
                  Natural team energizers who boost morale and facilitate collaboration. Excel in 
                  client-facing roles, brainstorming sessions, and team building.
                </p>
                <p className="text-gray-400 text-sm">
                  <strong>Challenge:</strong> May struggle with detail-oriented tasks, deadlines, and 
                  working in isolation. Need variety and social interaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Fits */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-[#FFD700]" />
              <h2 className="text-3xl font-bold text-white text-center">Best Careers for Sanguines</h2>
            </div>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Sanguines thrive in careers that combine people interaction, creativity, and variety. 
              Here are the top career paths where this temperament naturally excels.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {careerFits.map((career, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900 border border-[#FFD700]/30 rounded-lg hover:border-[#FFD700] transition-all duration-300 group cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-[#FFD700] group-hover:translate-x-2 transition-transform duration-300">
                    {career.title}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">
                    {career.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Strength Training Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Growth Strategies for Sanguines</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Your temperament is a gift. These practices help you amplify your natural strengths 
              while developing in areas that don&apos;t come as naturally.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Pausing and filtering your thoughts before blurting them out',
                'Matching the volume and atmosphere in the room',
                'Remembering your obligations and establishing organizational systems',
                'Staying on track when telling a story',
                'Being on time and realistically assessing how long things take',
                'Waiting for others to finish talking, then asking them another question',
                'Thinking before volunteering or committing to something',
                'Finishing what you start',
                'Telling only the truth and limiting your exaggerations',
                'Showing curiosity and interest in everyone',
                '"Adulting" – being responsible for even the boring obligations',
                'Empathizing with others\' emotions without trying to cheer them up',
              ].map((tip, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300"
                >
                  <p className="text-sm text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build-Up Guide Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">How to Support a Sanguine</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Knowing someone&apos;s temperament is like having a relationship cheat sheet! Use these 
              actions and words to build up the Sanguine in your life.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-[#FFD700]/30 rounded-lg">
                <h3 className="text-xl font-bold text-[#FFD700] mb-6">Do This to Build Them Up</h3>
                <ul className="space-y-3">
                  {[
                    'Listen to their stories with genuine interest',
                    'Make eye contact when they\'re talking',
                    'Be positive and match their enthusiasm',
                    'Promote their creativity: "What should we do next? You pick."',
                    'Laugh with them',
                    'Show interest in their friends',
                    'Approve of them: "You\'re so good at..."',
                    'Take them seriously when needed',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-[#FFD700] mt-1">&#9654;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Avoid These Behaviors</h3>
                <ul className="space-y-3">
                  {[
                    'Being too serious: "I just want to get this over with"',
                    'Demanding perfection: "Go back over this one more time."',
                    'Shaming them: "Shhhh! You\'re being too loud"',
                    'Consuming all their free time',
                    'Not listening or giving them your full attention',
                    'Not respecting their need for friends',
                    'Requiring them to always be "on"',
                  ].map((item, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-red-400 mt-1">&#9654;</span>
                      {item}
                    </li>
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
              <BookOpen className="w-8 h-8 text-[#FFD700]" />
              <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors"
                  >
                    <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-[#FFD700] transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Learn More</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Link
                href="/blog/sanguine"
                className="p-6 bg-gray-900 border border-[#FFD700]/30 rounded-lg hover:border-[#FFD700] transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[#FFD700] mb-2">Deep Dive: The Sanguine</h3>
                <p className="text-gray-400 text-sm">Extended article exploring the Sanguine temperament in greater depth.</p>
              </Link>
              <Link
                href="/blog/subtypes"
                className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-2">16 Temperament Patterns</h3>
                <p className="text-gray-400 text-sm">Discover the unique subtypes like Sanguine-Choleric and Sanguine-Phlegmatic.</p>
              </Link>
              <Link
                href="/quiz"
                className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-2">Take the Temperament Quiz</h3>
                <p className="text-gray-400 text-sm">40 questions to discover your unique temperament blend.</p>
              </Link>
              <Link
                href="/blog/history-of-temperaments"
                className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-2">History of Temperaments</h3>
                <p className="text-gray-400 text-sm">From Hippocrates to modern psychology—2,500 years of wisdom.</p>
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
                { name: 'Choleric', slug: 'choleric', color: '#EF4444', title: 'The Commander', description: 'Decisive leaders who drive results through strategic action.' },
                { name: 'Melancholic', slug: 'melancholic', color: '#3B82F6', title: 'The Strategist', description: 'Deep thinkers who excel at analysis and perfectionism.' },
                { name: 'Phlegmatic', slug: 'phlegmatic', color: '#22C55E', title: 'The Guardian', description: 'Peaceful supporters who create harmony and stability.' },
              ].map((temp) => (
                <Link
                  key={temp.name}
                  href={`/temperament/${temp.slug}`}
                  className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center"
                >
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${temp.color}20`, border: `2px solid ${temp.color}` }}
                  >
                    <span className="text-2xl font-bold" style={{ color: temp.color }}>{temp.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FFD700] transition-colors">
                    {temp.name}
                  </h3>
                  <p className="text-sm font-medium mb-2" style={{ color: temp.color }}>{temp.title}</p>
                  <p className="text-gray-400 text-sm">{temp.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Discover Your Temperament</h2>
            <p className="text-gray-400 mb-8">
              Take our free 40-question quiz to discover your unique temperament blend and unlock 
              personalized insights about your personality.
            </p>
            <Link
              href="/quiz"
              className="inline-block px-12 py-4 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              Start the Free Quiz
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

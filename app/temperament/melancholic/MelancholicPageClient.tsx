'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Users, Briefcase, Heart, AlertTriangle, Zap, BookOpen, Brain } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function MelancholicPageClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>('traits');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => { setIsVisible(true); }, []);

  const traits = ['Analytical and thoughtful', 'Detail-oriented perfectionist', 'Introverted and reserved', 'Deep thinker', 'Values quality over quantity', 'Sensitive and empathetic', 'Organized planner', 'Seeks meaning and depth'];
  const strengths = ['Exceptional analytical skills', 'High-quality work output', 'Great attention to detail', 'Reliable and dependable', 'Deep emotional intelligence', 'Excellent problem-solving', 'Creates comprehensive plans', 'Produces thorough research'];
  const challenges = ['Can be overly critical', 'Perfectionism can paralyze', 'Difficulty with delegation', 'May be socially withdrawn', 'Prone to anxiety', 'Slow decision-making', 'Can seem pessimistic', 'Struggles with spontaneity'];

  const careerFits = [
    { title: 'Research & Science', description: 'Deep analysis and methodical investigation align perfectly with Melancholic strengths.' },
    { title: 'Software Development', description: 'Complex problem-solving and attention to code quality suit this temperament.' },
    { title: 'Accounting & Finance', description: 'Precision, detail-orientation, and systematic processes are natural fits.' },
    { title: 'Academic Careers', description: 'Deep expertise, research, and thoughtful analysis thrive in academia.' },
    { title: 'Quality Assurance', description: 'Finding flaws others miss and maintaining high standards is a Melancholic strength.' },
    { title: 'Writing & Journalism', description: 'Careful research, thoughtful analysis, and meaningful communication.' },
    { title: 'Psychology & Counseling', description: 'Deep empathy and analytical understanding of human nature.' },
    { title: 'Engineering', description: 'Precision, systematic thinking, and complex problem-solving.' },
  ];

  const faqs = [
    { question: 'What is a Melancholic temperament?', answer: 'The Melancholic temperament is one of the four classical temperaments identified by Hippocrates over 2,500 years ago. The word "melancholic" derives from Greek "melaina chole" meaning black bile, which ancient physicians believed produced this contemplative personality. Melancholics are characterized by analytical thinking, perfectionism, and deep introspection. They are introverted thinkers who excel at detailed work and maintain the highest standards. In the FourType system, we call them "The Strategist" because of their ability to see patterns, anticipate problems, and create comprehensive plans.' },
    { question: 'What are the main strengths of a Melancholic personality?', answer: 'Melancholics possess remarkable gifts: exceptional analytical skills that see what others miss, high-quality work output that sets industry standards, great attention to detail that catches errors, reliability and dependability that builds trust, deep emotional intelligence that understands nuance, and the ability to create comprehensive plans and thorough research. They are often the quality control of any organization—the people who ensure things are done right, not just done.' },
    { question: 'What careers are best for Melancholic temperaments?', answer: 'Melancholics excel in careers requiring precision, depth, and quality: research and science (systematic investigation), software development (complex code, attention to detail), accounting and finance (precision with numbers), academic careers (deep expertise), quality assurance (finding flaws), writing and journalism (careful research), psychology and counseling (deep empathy), and engineering (systematic problem-solving). They thrive where depth matters more than speed.' },
    { question: 'How do Melancholics behave in relationships?', answer: 'In relationships, Melancholics are deeply loyal, thoughtful partners who show love through acts of service, quality time, and remembering important details. They take time to open up but form profound bonds once trust is established. They need partners who respect their need for alone time and deep conversation over small talk. Best matches often include Phlegmatics (peaceful stability), Sanguines (balance their seriousness), or other Melancholics (shared depth). Their challenge is expressing emotions openly and not withdrawing when hurt.' },
    { question: 'What are the weaknesses of the Melancholic temperament?', answer: 'Every temperament has growth areas. For Melancholics: being overly critical of self and others (the inner critic never rests), perfectionism that paralyzes action (waiting for perfect conditions), difficulty delegating (no one meets their standards), social withdrawal (preferring solitude over connection), anxiety and overthinking (analyzing every possibility), slow decision-making (more data is always needed), and appearing pessimistic (seeing problems others miss). Self-compassion and intentional action help Melancholics grow.' },
    { question: 'How does a Melancholic handle stress?', answer: 'Under stress, Melancholics may become withdrawn, overly critical, anxious, or pessimistic. They might isolate themselves, engage in negative self-talk, or become paralyzed by perfectionism. Healthy coping strategies include: structured problem-solving (breaking down overwhelming situations), creative outlets (art, music, writing), talking with trusted confidants, physical exercise, setting "good enough" standards, and practices that break overthinking cycles like mindfulness or journaling. The key is moving from analysis to action.' },
    { question: 'Is Melancholic the same as being depressed?', answer: 'No, despite the similar-sounding name. The Melancholic temperament is not depression—it\'s a personality type characterized by thoughtfulness, depth, and high standards. While Melancholics may be more prone to negative emotions due to their reflective nature and awareness of imperfection, the temperament itself is not a mental health condition. Many highly successful artists, scientists, and thinkers throughout history have been Melancholic. That said, Melancholics should be aware of their tendency toward negative thinking and seek support when needed.' },
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
                <div className="inline-block mb-4"><span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">The Strategist Archetype</span></div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">The Melancholic Temperament</h1>
                <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-4 mb-6">
                  <p className="text-lg text-white font-medium"><strong>Definition:</strong> The Melancholic temperament is characterized by analytical thinking, perfectionism, and deep introspection. Melancholics are introverted thinkers who excel at detailed work, maintain high standards, and see patterns others miss.</p>
                </div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">Contemplative, analytical, and deeply thoughtful, the Melancholic personality excels at understanding complexity. These introspective perfectionists create meaningful work and drive innovation through careful deliberation. For 2,500 years, this temperament has produced humanity&apos;s greatest artists, scientists, and philosophers.</p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/quiz" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">Take the Quiz</Link>
                  <Link href="/blog/melancholic" className="px-8 py-3 border-2 border-blue-600 text-blue-400 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">Deep Dive Article</Link>
                </div>
              </div>
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png" alt="The Strategist - Melancholic Temperament Character Illustration" width={400} height={500} className="relative z-10 w-auto h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4"><p className="text-3xl font-bold text-blue-400">Blue</p><p className="text-gray-400 text-sm">Color Association</p></div>
            <div className="text-center p-4"><p className="text-3xl font-bold text-blue-400">Earth</p><p className="text-gray-400 text-sm">Classical Element</p></div>
            <div className="text-center p-4"><p className="text-3xl font-bold text-blue-400">Autumn</p><p className="text-gray-400 text-sm">Season</p></div>
            <div className="text-center p-4"><p className="text-3xl font-bold text-blue-400">Perfection</p><p className="text-gray-400 text-sm">Love Language</p></div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto"><Image src="/images/melancholic-hero.jpg" alt="The Strategist - Melancholic Temperament character card showing Earth element, Autumn season, and Serotonin neurochemical" width={1200} height={600} className="rounded-lg shadow-2xl w-full object-cover" /></div>
        </section>
        
        {/* Subtypes Image Section */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto"><Image src="/images/melancholic-subtypes.jpg" alt="Earth Core: The Melancholic Subtypes - Pure Melancholic, Mel-San, Mel-Chol, and Mel-Phleg variations" width={1200} height={600} className="rounded-lg shadow-2xl w-full object-cover" /></div>
        </section>

        {/* In-Depth Overview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Understanding the Melancholic Temperament</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">The Melancholic temperament represents the thoughtful analyst in humanity&apos;s personality spectrum. Named from Greek &quot;melaina chole&quot; (black bile), ancient physicians believed this temperament resulted from this bodily humor, associating it with earth, coldness, and dryness—fitting metaphors for the Melancholic&apos;s grounded, measured approach to life.</p>
              <p className="text-gray-300 leading-relaxed mb-6">In modern personality psychology, Melancholics correlate with high conscientiousness and neuroticism (emotional sensitivity) in the Big Five model. They share characteristics with INTJ and INFJ types in Myers-Briggs. However, the temperament approach reveals unique insights about their perfectionism patterns and emotional depth that other systems often miss.</p>
              <p className="text-gray-300 leading-relaxed mb-6">What distinguishes Melancholics is their orientation toward quality and meaning. While Sanguines ask &quot;Is this fun?&quot; and Cholerics ask &quot;Is this done?&quot; Melancholics ask &quot;Is this right?&quot; This makes them invaluable in any endeavor requiring excellence, but challenging in environments that prioritize speed over substance.</p>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-700">
              {[{ id: 'traits', label: 'Key Traits', icon: Brain }, { id: 'strengths', label: 'Strengths', icon: Zap }, { id: 'challenges', label: 'Challenges', icon: AlertTriangle }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-all duration-300 ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(activeTab === 'traits' ? traits : activeTab === 'strengths' ? strengths : challenges).map((item, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300 transform hover:scale-105"><p className="text-sm font-semibold text-white">{item}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Under Stress */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><AlertTriangle className="w-8 h-8 text-blue-400" /><h2 className="text-3xl font-bold text-white text-center">The Melancholic Under Stress</h2></div>
            <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-8">
              <p className="text-gray-300 leading-relaxed mb-6">When Melancholics face prolonged stress, their strengths can become liabilities. The same analytical mind that solves complex problems can spiral into anxiety and paralysis.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Stress Warning Signs</h3>
                  <ul className="space-y-2">{['Social withdrawal and isolation', 'Increased self-criticism and negative self-talk', 'Analysis paralysis—unable to decide', 'Heightened anxiety and worry', 'Pessimism and hopelessness', 'Physical symptoms: insomnia, tension', 'Becoming hypercritical of others'].map((sign, i) => (<li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-blue-400 mt-1">&#8226;</span>{sign}</li>))}</ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Healthy Coping Strategies</h3>
                  <ul className="space-y-2">{['Structured problem-solving sessions', 'Creative outlets (art, music, writing)', 'Talking with a trusted confidant', 'Physical exercise and movement', 'Setting "good enough" standards', 'Mindfulness to break overthinking', 'Scheduled worry time (then stop)'].map((strategy, i) => (<li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-green-400 mt-1">&#10003;</span>{strategy}</li>))}</ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationships */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><Heart className="w-8 h-8 text-blue-400" /><h2 className="text-3xl font-bold text-white text-center">Melancholics in Relationships</h2></div>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed">Understanding how Melancholics approach love reveals their profound capacity for deep, meaningful connection.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Romantic Relationships</h3>
                <p className="text-gray-300 mb-4">Melancholics are deeply loyal partners who show love through thoughtful gestures, remembering details, and quality time. They seek profound connection over surface-level romance.</p>
                <p className="text-gray-400 text-sm"><strong>Best matches:</strong> Phlegmatic (peaceful stability), Sanguine (lighten their seriousness), or Melancholic (shared depth and standards).</p>
              </div>
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Friendships</h3>
                <p className="text-gray-300 mb-4">Melancholics prefer few deep friendships over many superficial ones. They are loyal friends who remember important details and offer thoughtful support.</p>
                <p className="text-gray-400 text-sm"><strong>Challenge:</strong> May withdraw when hurt instead of communicating, and can be seen as distant or aloof.</p>
              </div>
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4">As Parents</h3>
                <p className="text-gray-300 mb-4">Thoughtful, involved parents who notice children&apos;s emotional needs and create structured, nurturing environments. They invest deeply in their children&apos;s development.</p>
                <p className="text-gray-400 text-sm"><strong>Growth area:</strong> Relaxing perfectionist standards and allowing children to make mistakes and learn.</p>
              </div>
              <div className="bg-gray-900 border border-blue-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4">In the Workplace</h3>
                <p className="text-gray-300 mb-4">Reliable team members who produce high-quality work and catch details others miss. They excel at analysis, planning, and maintaining standards.</p>
                <p className="text-gray-400 text-sm"><strong>Challenge:</strong> May struggle with criticism, tight deadlines, and environments that don&apos;t value quality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Fits */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><Briefcase className="w-8 h-8 text-blue-400" /><h2 className="text-3xl font-bold text-white text-center">Best Careers for Melancholics</h2></div>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Melancholics thrive in careers requiring precision, depth, and quality where their attention to detail is valued.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {careerFits.map((career, index) => (
                <div key={index} className="p-6 bg-gray-900 border border-blue-600/30 rounded-lg hover:border-blue-600 transition-all duration-300 group cursor-pointer">
                  <h3 className="text-lg font-bold text-blue-400 group-hover:translate-x-2 transition-transform duration-300">{career.title}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{career.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Strategies */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Growth Strategies for Melancholics</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Your depth is a gift. These practices help you share your gifts with the world while avoiding common Melancholic pitfalls.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {['Smiling more, lightening up, responding optimistically', 'Being grateful and counting your blessings', 'Reflecting back what others say to confirm understanding', 'Turning in projects when they are good enough', 'Coming up with a Plan B when feeling anxious', 'Accepting invitations and joining in', 'Captivating negative thoughts with helpful truths', 'Responding with trust rather than suspicion', 'Speaking up to share your ideas', 'Being flexible about changes to plans', 'Sharing your creative talents graciously', 'Forgiving others and releasing grudges'].map((tip, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-600 transition-all duration-300"><p className="text-sm text-gray-300">{tip}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Build-Up Guide */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">How to Support a Melancholic</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Knowing someone&apos;s temperament helps you connect with them more effectively.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-blue-600/30 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-6">Do This to Build Them Up</h3>
                <ul className="space-y-3">{['Notice when they need support', 'Keep their secrets and confidences', 'Encourage their creative expression', 'Be sensitive to their emotions', 'Help them feel safe to share', 'Help formulate backup plans', 'Make eye contact when they speak', 'Believe in them and their abilities'].map((item, index) => (<li key={index} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-blue-400 mt-1">&#9654;</span>{item}</li>))}</ul>
              </div>
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Avoid These Behaviors</h3>
                <ul className="space-y-3">{['Dismissing their emotions', 'Not giving enough details', 'Infringing on their space and silence', 'Joining their negative spiral', 'Changing schedules without notice', 'Making them feel guilty for needs', 'Interrupting their thoughts'].map((item, index) => (<li key={index} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-red-400 mt-1">&#9654;</span>{item}</li>))}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><BookOpen className="w-8 h-8 text-blue-400" /><h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2></div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors">
                    <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
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
              <Link href="/blog/melancholic" className="p-6 bg-gray-900 border border-blue-500/30 rounded-lg hover:border-blue-500 transition-all duration-300"><h3 className="text-lg font-bold text-blue-400 mb-2">Deep Dive: The Melancholic</h3><p className="text-gray-400 text-sm">Extended article exploring analytical psychology and perfectionism.</p></Link>
              <Link href="/blog/subtypes" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300"><h3 className="text-lg font-bold text-white mb-2">16 Temperament Patterns</h3><p className="text-gray-400 text-sm">Discover Melancholic-Choleric, Melancholic-Phlegmatic, and other profiles.</p></Link>
              <Link href="/quiz" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300"><h3 className="text-lg font-bold text-white mb-2">Take the Temperament Quiz</h3><p className="text-gray-400 text-sm">40 questions to discover your unique temperament blend.</p></Link>
              <Link href="/blog/history-of-temperaments" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-blue-500 transition-all duration-300"><h3 className="text-lg font-bold text-white mb-2">History of Temperaments</h3><p className="text-gray-400 text-sm">From Hippocrates to modern psychology—2,500 years of wisdom.</p></Link>
            </div>
          </div>
        </section>

        {/* Explore Other Temperaments */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Explore Other Temperaments</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{ name: 'Sanguine', slug: 'sanguine', color: '#FFD700', title: 'The Bard', description: 'Enthusiastic connectors who bring energy and joy.' }, { name: 'Choleric', slug: 'choleric', color: '#EF4444', title: 'The Commander', description: 'Decisive leaders who drive results through action.' }, { name: 'Phlegmatic', slug: 'phlegmatic', color: '#22C55E', title: 'The Guardian', description: 'Peaceful supporters who create harmony and stability.' }].map((temp) => (
                <Link key={temp.name} href={`/temperament/${temp.slug}`} className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${temp.color}20`, border: `2px solid ${temp.color}` }}><span className="text-2xl font-bold" style={{ color: temp.color }}>{temp.name[0]}</span></div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{temp.name}</h3>
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
            <p className="text-gray-400 mb-8">Take our free 40-question quiz to discover your unique temperament blend and unlock personalized insights.</p>
            <Link href="/quiz" className="inline-block px-12 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">Start the Free Quiz</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

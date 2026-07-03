'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Users, Briefcase, Heart, AlertTriangle, Zap, BookOpen, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';

export default function PhlegmaticPageClient() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'traits' | 'strengths' | 'challenges'>('traits');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => { setIsVisible(true); }, []);

  const traits = ['Calm and peaceful', 'Loyal and dependable', 'Cooperative team player', 'Patient listener', 'Avoids conflict', 'Steady and reliable', 'Supportive nature', 'Diplomatic and tactful'];
  const strengths = ['Creates peaceful environments', 'Excellent team mediator', 'Truly listens to others', 'Consistent and reliable', 'Supportive and encouraging', 'Great at routine and process', 'Loyal friend and colleague', 'Keeps teams balanced'];
  const challenges = ['Can be overly passive', 'Slow to make decisions', 'May lack initiative', 'Difficulty with change', 'Can seem unmotivated', 'May suppress own needs', 'Avoids conflict to a fault', 'Struggles with assertiveness'];

  const careerFits = [
    { title: 'Human Resources', description: 'Natural mediators who build trust and create positive workplace cultures.' },
    { title: 'Counseling & Therapy', description: 'Patient listeners who create safe spaces for others to share and heal.' },
    { title: 'Nursing & Healthcare', description: 'Caring, steady presence that calms patients and supports families.' },
    { title: 'Teaching & Education', description: 'Patient educators who create nurturing learning environments.' },
    { title: 'Social Work', description: 'Compassionate advocates who support vulnerable populations.' },
    { title: 'Administrative Roles', description: 'Reliable organizers who keep operations running smoothly.' },
    { title: 'Customer Service', description: 'Patient problem-solvers who de-escalate and satisfy customers.' },
    { title: 'Team Coordination', description: 'Natural facilitators who bring people together and maintain harmony.' },
  ];

  const faqs = [
    { question: 'What is a Phlegmatic temperament?', answer: 'The Phlegmatic temperament is one of the four classical temperaments identified by Hippocrates over 2,500 years ago. The word "phlegmatic" derives from Greek "phlegma" meaning phlegm, which ancient physicians believed produced this calm personality. Phlegmatics are characterized by peacefulness, loyalty, and a supportive disposition. They are introverted supporters who excel at creating harmony, maintaining stability, and building deep, lasting relationships. In the FourType system, we call them "The Guardian" because of their protective, nurturing nature.' },
    { question: 'What are the main strengths of a Phlegmatic personality?', answer: 'Phlegmatics possess remarkable gifts: exceptional listening skills that make others feel truly heard, natural ability to create peaceful environments, outstanding loyalty and dependability that builds trust, talent for mediation and conflict resolution, steady and consistent work output that others rely on, and the ability to remain calm under pressure when others panic. They are often the emotional anchors of their families and teams—the people who hold everything together.' },
    { question: 'What careers are best for Phlegmatic temperaments?', answer: 'Phlegmatics excel in careers requiring patience, interpersonal skills, and steady reliability: human resources (building positive cultures), counseling and therapy (patient listening), nursing and healthcare (calm, caring presence), social work (compassionate advocacy), teaching (nurturing environments), administrative roles (reliable organization), customer service (patient problem-solving), and team coordination (natural facilitation). They thrive where stability matters more than speed.' },
    { question: 'How do Phlegmatics behave in relationships?', answer: 'In relationships, Phlegmatics are deeply loyal, supportive partners who create stable, harmonious environments. They show love through consistent presence, acts of service, and unwavering support. They need time to open up but form unbreakable bonds once trust is established. Best matches often include Cholerics (balancing action with peace), Sanguines (adding energy to their calm), or other Phlegmatics (shared tranquility). Their challenge is expressing their own needs and not suppressing emotions.' },
    { question: 'What are the weaknesses of the Phlegmatic temperament?', answer: 'Every temperament has growth areas. For Phlegmatics: being overly passive (waiting instead of acting), difficulty making decisions (fearing the wrong choice), lack of initiative (needing external motivation), resistance to change (preferring familiar routines), suppressing their own needs (prioritizing others\' comfort), avoiding conflict to an unhealthy degree (letting problems fester), and struggling with assertiveness (not speaking up). Intentional action and self-advocacy help Phlegmatics grow.' },
    { question: 'How does a Phlegmatic handle stress?', answer: 'Under stress, Phlegmatics may become withdrawn, stubborn, or passive-aggressive. They might internalize problems rather than addressing them, leading to hidden resentment that eventually surfaces. Healthy coping strategies include: gentle exercise like walking or yoga, time in nature (restorative and calming), talking with trusted confidants (one-on-one), structured problem-solving at their own pace, setting small boundaries to prevent overwhelm, and journaling to process emotions. The key is addressing issues before resentment builds.' },
    { question: 'What is the difference between Phlegmatic and Melancholic temperaments?', answer: 'While both Phlegmatics and Melancholics are introverted, they differ fundamentally in orientation. Phlegmatics seek harmony and stability—they want peaceful relationships and consistent environments. Melancholics seek perfection and depth—they want things done right and ideas explored thoroughly. Phlegmatics are relationship-oriented; Melancholics are task-oriented. Phlegmatics ask "Is everyone okay?" while Melancholics ask "Is this correct?" Understanding these differences helps these two temperaments appreciate each other.' },
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
                <div className="inline-block mb-4"><span className="text-xs font-semibold text-green-400 uppercase tracking-widest">The Guardian Archetype</span></div>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">The Phlegmatic Temperament</h1>
                <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 mb-6">
                  <p className="text-lg text-white font-medium"><strong>Definition:</strong> The Phlegmatic temperament is characterized by calmness, loyalty, and peaceful disposition. Phlegmatics are introverted supporters who excel at creating harmony, maintaining stability, and building deep, lasting relationships.</p>
                </div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">Gentle, steady, and profoundly loyal, the Phlegmatic personality creates harmony wherever they go. These peaceful supporters excel at building trust and maintaining stable, nurturing environments. For 2,500 years, this temperament has been the steady anchor of families, teams, and communities.</p>
                <div className="flex gap-4 flex-wrap">
                  <Link href="/quiz" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">Take the Quiz</Link>
                  <Link href="/blog/phlegmatic" className="px-8 py-3 border-2 border-green-600 text-green-400 font-bold rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300">Deep Dive Article</Link>
                </div>
              </div>
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-transparent rounded-lg blur-xl opacity-20 animate-pulse"></div>
                  <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png" alt="The Guardian - Phlegmatic Temperament Character Illustration" width={400} height={500} className="relative z-10 w-auto h-auto" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 px-4 bg-gray-900/50">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4"><p className="text-3xl font-bold text-green-400">Green</p><p className="text-gray-400 text-sm">Color Association</p></div>
            <div className="text-center p-4"><p className="text-3xl font-bold text-green-400">Water</p><p className="text-gray-400 text-sm">Classical Element</p></div>
            <div className="text-center p-4"><p className="text-3xl font-bold text-green-400">Winter</p><p className="text-gray-400 text-sm">Season</p></div>
            <div className="text-center p-4"><p className="text-3xl font-bold text-green-400">Harmony</p><p className="text-gray-400 text-sm">Core Need</p></div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto"><Image src="/images/phlegmatic-hero.jpg" alt="The Guardian - Phlegmatic Temperament character card showing Water element, Winter season, and Estrogen/Oxytocin neurochemical" width={1200} height={600} className="rounded-lg shadow-2xl w-full object-cover" /></div>
        </section>
        
        {/* Subtypes Image Section */}
        <section className="relative py-12 px-4">
          <div className="max-w-6xl mx-auto"><Image src="/images/phlegmatic-subtypes.jpg" alt="Water Core: The Phlegmatic Subtypes - Pure Phlegmatic, Phleg-San, Phleg-Chol, and Phleg-Mel variations" width={1200} height={600} className="rounded-lg shadow-2xl w-full object-cover" /></div>
        </section>

        {/* In-Depth Overview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Understanding the Phlegmatic Temperament</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-6">The Phlegmatic temperament represents the peaceful stabilizer in humanity&apos;s personality spectrum. Named from Greek &quot;phlegma&quot; (phlegm), ancient physicians believed this temperament resulted from this bodily humor, associating it with water, coldness, and moisture—fitting metaphors for the Phlegmatic&apos;s calm, adaptable, and nurturing approach to life.</p>
              <p className="text-gray-300 leading-relaxed mb-6">In modern personality psychology, Phlegmatics correlate with high agreeableness and emotional stability in the Big Five model. They share characteristics with ISFJ and INFP types in Myers-Briggs. However, the temperament approach reveals unique insights about their loyalty patterns and conflict-avoidance tendencies that other systems often miss.</p>
              <p className="text-gray-300 leading-relaxed mb-6">What distinguishes Phlegmatics is their orientation toward harmony and relationships. While Cholerics ask &quot;What needs to be done?&quot; and Sanguines ask &quot;Who&apos;s coming?&quot; Phlegmatics ask &quot;Is everyone okay?&quot; This makes them invaluable in any endeavor requiring teamwork, but challenging in environments that require rapid change or aggressive competition.</p>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-700">
              {[{ id: 'traits', label: 'Key Traits', icon: Shield }, { id: 'strengths', label: 'Strengths', icon: Zap }, { id: 'challenges', label: 'Challenges', icon: AlertTriangle }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-all duration-300 ${activeTab === tab.id ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}>
                  <tab.icon className="w-4 h-4" />{tab.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(activeTab === 'traits' ? traits : activeTab === 'strengths' ? strengths : challenges).map((item, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300 transform hover:scale-105"><p className="text-sm font-semibold text-white">{item}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Under Stress */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><AlertTriangle className="w-8 h-8 text-green-400" /><h2 className="text-3xl font-bold text-white text-center">The Phlegmatic Under Stress</h2></div>
            <div className="bg-gray-900 border border-green-400/30 rounded-lg p-8">
              <p className="text-gray-300 leading-relaxed mb-6">When Phlegmatics face prolonged stress, their peaceful nature can turn inward. The same steadiness that creates stability can become stubbornness, and their conflict avoidance can lead to suppressed resentment.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">Stress Warning Signs</h3>
                  <ul className="space-y-2">{['Withdrawal and isolation', 'Passive-aggressive behavior', 'Increased stubbornness', 'Hidden resentment building', 'Physical symptoms: fatigue, lethargy', 'Avoidance of all decisions', 'Saying yes but meaning no'].map((sign, i) => (<li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-green-400 mt-1">&#8226;</span>{sign}</li>))}</ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-4">Healthy Coping Strategies</h3>
                  <ul className="space-y-2">{['Gentle exercise: walking, yoga', 'Time in nature for restoration', 'Trusted one-on-one conversations', 'Small boundary-setting practice', 'Journaling to process emotions', 'Regular self-care routines', 'Addressing issues before they fester'].map((strategy, i) => (<li key={i} className="text-gray-300 flex items-start gap-2"><span className="text-green-400 mt-1">&#10003;</span>{strategy}</li>))}</ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationships */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><Heart className="w-8 h-8 text-green-400" /><h2 className="text-3xl font-bold text-white text-center">Phlegmatics in Relationships</h2></div>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed">Understanding how Phlegmatics approach love reveals their profound capacity for loyal, nurturing connection.</p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">Romantic Relationships</h3>
                <p className="text-gray-300 mb-4">Phlegmatics are steady, loyal partners who show love through consistent presence and support. They create stable, peaceful home environments and prioritize their partner&apos;s comfort.</p>
                <p className="text-gray-400 text-sm"><strong>Best matches:</strong> Choleric (adds drive to their calm), Sanguine (brings energy and fun), or Phlegmatic (shared tranquility and understanding).</p>
              </div>
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">Friendships</h3>
                <p className="text-gray-300 mb-4">Phlegmatics are loyal, low-maintenance friends who are always there when needed. They prefer quality over quantity and maintain friendships for life.</p>
                <p className="text-gray-400 text-sm"><strong>Challenge:</strong> May not initiate contact often, leading friends to wonder if they care. They do—deeply.</p>
              </div>
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">As Parents</h3>
                <p className="text-gray-300 mb-4">Patient, nurturing parents who create calm, secure homes. They support children&apos;s development without pressure and model emotional stability.</p>
                <p className="text-gray-400 text-sm"><strong>Growth area:</strong> Setting boundaries and following through on discipline, not avoiding conflict with children.</p>
              </div>
              <div className="bg-gray-900 border border-green-400/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4">In the Workplace</h3>
                <p className="text-gray-300 mb-4">Reliable team members who create harmony and keep things running smoothly. They excel at routine tasks and mediating conflicts.</p>
                <p className="text-gray-400 text-sm"><strong>Challenge:</strong> May be overlooked for promotions due to not self-advocating or taking initiative.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Career Fits */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><Briefcase className="w-8 h-8 text-green-400" /><h2 className="text-3xl font-bold text-white text-center">Best Careers for Phlegmatics</h2></div>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Phlegmatics thrive in careers requiring patience, interpersonal skills, and steady reliability.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {careerFits.map((career, index) => (
                <div key={index} className="p-6 bg-gray-900 border border-green-600/30 rounded-lg hover:border-green-600 transition-all duration-300 group cursor-pointer">
                  <h3 className="text-lg font-bold text-green-400 group-hover:translate-x-2 transition-transform duration-300">{career.title}</h3>
                  <p className="text-gray-400 mt-2 text-sm">{career.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Growth Strategies */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Growth Strategies for Phlegmatics</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Your steadiness is a gift. These practices help you take initiative while maintaining your peaceful core.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {['Starting something new—a class, hobby, or skill—that interests you', 'Advocating for yourself rather than letting resentment build', 'Jumping into conversations and sharing your ideas', 'Matching the energy of others when appropriate', 'Trusting your abilities and remembering past successes', 'Responding with enthusiasm when excited', 'Volunteering to lead or be the point person', 'Committing to deadlines and meeting them', 'Expressing preferences when offered choices', 'Explaining you need time to think, rather than going silent', 'Staying present until conflicts are fully resolved', 'Vocalizing your appreciation of others'].map((tip, index) => (
                <div key={index} className="p-4 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-600 transition-all duration-300"><p className="text-sm text-gray-300">{tip}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* Build-Up Guide */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">How to Support a Phlegmatic</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Knowing someone&apos;s temperament helps you connect with them more effectively.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-900 border border-green-600/30 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-6">Do This to Build Them Up</h3>
                <ul className="space-y-3">{['Let them do one task at a time', 'Be kind in your criticism', 'Ask their thoughts and feelings', 'Show curiosity about their interests', 'Encourage their involvement gently', 'Listen completely without interrupting', 'Give them time to process', 'Handle conflict calmly and quietly'].map((item, index) => (<li key={index} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-green-400 mt-1">&#9654;</span>{item}</li>))}</ul>
              </div>
              <div className="p-6 bg-gray-900 border border-red-900/30 rounded-lg">
                <h3 className="text-xl font-bold text-red-400 mb-6">Avoid These Behaviors</h3>
                <ul className="space-y-3">{['Expecting things on your timeline', 'Pushing their involvement aggressively', 'Not listening when they speak up', 'Mistaking quiet for apathy', 'Speaking down to them', 'Stressing them with demands', 'Assuming they know how you feel'].map((item, index) => (<li key={index} className="text-gray-300 text-sm flex items-start gap-2"><span className="text-red-400 mt-1">&#9654;</span>{item}</li>))}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8"><BookOpen className="w-8 h-8 text-green-400" /><h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2></div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors">
                    <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown className={`w-5 h-5 text-green-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
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
              <Link href="/blog/phlegmatic" className="p-6 bg-gray-900 border border-green-500/30 rounded-lg hover:border-green-500 transition-all duration-300"><h3 className="text-lg font-bold text-green-400 mb-2">Deep Dive: The Phlegmatic</h3><p className="text-gray-400 text-sm">Extended article exploring the Guardian&apos;s psychology and potential.</p></Link>
              <Link href="/blog/subtypes" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300"><h3 className="text-lg font-bold text-white mb-2">16 Temperament Patterns</h3><p className="text-gray-400 text-sm">Discover Phlegmatic-Choleric, Phlegmatic-Sanguine, and other profiles.</p></Link>
              <Link href="/quiz" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300"><h3 className="text-lg font-bold text-white mb-2">Take the Temperament Quiz</h3><p className="text-gray-400 text-sm">40 questions to discover your unique temperament blend.</p></Link>
              <Link href="/blog/history-of-temperaments" className="p-6 bg-gray-900 border border-gray-700 rounded-lg hover:border-green-500 transition-all duration-300"><h3 className="text-lg font-bold text-white mb-2">History of Temperaments</h3><p className="text-gray-400 text-sm">From Hippocrates to modern psychology—2,500 years of wisdom.</p></Link>
            </div>
          </div>
        </section>

        {/* Explore Other Temperaments */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Explore Other Temperaments</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{ name: 'Sanguine', slug: 'sanguine', color: '#FFD700', title: 'The Bard', description: 'Enthusiastic connectors who bring energy and joy.' }, { name: 'Choleric', slug: 'choleric', color: '#EF4444', title: 'The Commander', description: 'Decisive leaders who drive results through action.' }, { name: 'Melancholic', slug: 'melancholic', color: '#3B82F6', title: 'The Strategist', description: 'Analytical thinkers who pursue depth and perfection.' }].map((temp) => (
                <Link key={temp.name} href={`/temperament/${temp.slug}`} className="group p-8 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${temp.color}20`, border: `2px solid ${temp.color}` }}><span className="text-2xl font-bold" style={{ color: temp.color }}>{temp.name[0]}</span></div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{temp.name}</h3>
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
            <Link href="/quiz" className="inline-block px-12 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105">Start the Free Quiz</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

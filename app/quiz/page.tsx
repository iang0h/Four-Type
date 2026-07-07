'use client'

import { Suspense, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnswerLetter } from '@/lib/questions'
import { calculateScores, ScoreMap } from '@/lib/scoringKey'
import { getQuizCopy, getQuizQuestions, type QuizLocale } from '@/lib/quiz-i18n'
import { decodeShareId } from '@/lib/share-id'
import NameInputScreen from '@/components/NameInputScreen'
import QuestionScreen from '@/components/QuestionScreen'
import LoadingScreen from '@/components/LoadingScreen'
import ResultsScreen from '@/components/ResultsScreen'

type Stage = 'name' | 'quiz' | 'loading' | 'results'

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizExperienceWithSearch locale="en" />
    </Suspense>
  )
}

function QuizExperienceWithSearch({ locale = 'en', showSeo = true }: { locale?: QuizLocale; showSeo?: boolean }) {
  const searchParams = useSearchParams()

  return <QuizExperience locale={locale} showSeo={showSeo} comparisonId={searchParams.get('compare') || ''} />
}

export function QuizExperience({ locale = 'en', showSeo = true, comparisonId = '' }: { locale?: QuizLocale; showSeo?: boolean; comparisonId?: string }) {
  const comparison = useMemo(() => decodeShareId(comparisonId), [comparisonId])
  const [stage, setStage] = useState<Stage>('name')
  const [heroName, setHeroName] = useState('')
  const [answers, setAnswers] = useState<Record<number, AnswerLetter>>({})
  const [scores, setScores] = useState<ScoreMap>({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })
  const copy = getQuizCopy(locale)
  const questions = getQuizQuestions(locale)

  // Handle name submission
  function handleNameSubmit(name: string) {
    setHeroName(name)
    setStage('quiz')
  }

  // Handle quiz completion
  function handleQuizComplete(quizAnswers: Record<number, AnswerLetter>) {
    setAnswers(quizAnswers)
    const calculatedScores = calculateScores(quizAnswers)
    setScores(calculatedScores)
    setStage('loading')
  }

  // Handle loading complete
  function handleLoadingComplete() {
    setStage('results')
  }

  // Handle retake
  function handleRetake() {
    setAnswers({})
    setScores({ Yellow: 0, Red: 0, Blue: 0, Green: 0 })
    setStage('name')
  }

  let screen: ReactNode
  switch (stage) {
    case 'name':
      screen = <NameInputScreen onStart={handleNameSubmit} copy={copy.name} />
      break

    case 'quiz':
      screen = <QuestionScreen heroName={heroName} onComplete={handleQuizComplete} copy={copy.question} questions={questions} />
      break

    case 'loading':
      screen = <LoadingScreen heroName={heroName} onComplete={handleLoadingComplete} copy={copy.loading} />
      break

    case 'results':
      screen = <ResultsScreen heroName={heroName} scores={scores} onRetake={handleRetake} copy={copy.results} locale={locale} comparison={comparison} />
      break

    default:
      screen = null
  }

  return (
    <>
      {screen}
      {showSeo && stage === 'name' && <QuizSeoSection />}
    </>
  )
}

function QuizSeoSection() {
  return (
    <section className="bg-background border-t border-border px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">Free Temperament Test</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Take the FourType Temperament Test
          </h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            FourType is a free 40-question temperament test for discovering whether your strongest pattern is
            Choleric, Sanguine, Melancholic, Phlegmatic, or a blended subtype. Answer based on your repeated
            behavior under ordinary pressure, then compare your score spread across all four temperaments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            { title: 'Choleric', body: 'Direct, decisive, goal-focused, and energized by challenge.', href: '/choleric-test' },
            { title: 'Sanguine', body: 'Expressive, social, optimistic, and energized by connection.', href: '/sanguine-test' },
            { title: 'Melancholic', body: 'Analytical, careful, meaning-focused, and energized by quality.', href: '/melancholic-test' },
            { title: 'Phlegmatic', body: 'Calm, loyal, steady, and energized by peace and trust.', href: '/phlegmatic-test' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-border bg-secondary/20 p-5 transition-colors hover:border-primary/50">
              <h2 className="font-serif text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { title: '40 questions', body: 'A focused quiz built around behavior, motivation, stress response, and communication style.' },
            { title: 'Score spread', body: 'See how your answers distribute across all four temperaments instead of forcing a single flat label.' },
            { title: 'Subtype direction', body: 'Use your top two scores to understand blended patterns when more than one type fits.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-serif text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">Temperament Test Guides</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Use these guides before or after the quiz to understand your score spread, question design, and blended subtype result.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            { title: 'How the temperament test works', body: 'Read the main temperament test guide before or after taking the quiz.', href: '/temperament-test' },
            { title: 'Take the four temperaments test', body: 'Use the free Choleric, Sanguine, Melancholic, and Phlegmatic quiz path.', href: '/four-temperaments-test' },
            { title: 'Compare the four temperament types', body: 'See how Choleric, Sanguine, Melancholic, and Phlegmatic test patterns differ.', href: '/blog/choleric-sanguine-melancholic-phlegmatic-test' },
            { title: 'What the questions measure', body: 'See why behavior-based temperament test questions make results more useful.', href: '/blog/temperament-test-questions' },
            { title: 'Take a free 4 temperaments test', body: 'Learn how to read your score spread without forcing a flat label.', href: '/blog/4-temperaments-test-free' },
            { title: 'How FourType scores answers', body: 'Understand score spread, primary type, secondary type, and responsible limits.', href: '/methodology' },
            { title: 'What mixed results mean', body: 'Use your top two scores to explore blended temperament subtypes.', href: '/subtypes' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-border bg-secondary/20 p-5 transition-colors hover:border-primary/50">
              <h2 className="font-serif text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </Link>
          ))}
        </div>

        <div className="border-t border-border pt-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">Temperament Test Questions</h2>
          <div className="space-y-4">
            {[
              {
                question: 'What does the FourType temperament test measure?',
                answer: 'It measures repeated behavioral patterns across the four temperaments: how you respond to pressure, make decisions, relate to people, and recover energy.',
              },
              {
                question: 'Is this temperament test free?',
                answer: 'Yes. The core FourType temperament test is free and gives you a primary pattern, score spread, and subtype direction.',
              },
              {
                question: 'How should I answer the quiz?',
                answer: 'Answer as your default self, especially under ordinary stress. Avoid choosing the answer that sounds most impressive or ideal.',
              },
              {
                question: 'What are the four temperament results?',
                answer: 'The four main results are Choleric, Sanguine, Melancholic, and Phlegmatic. FourType also points you toward a blended subtype when your top two scores are close.',
              },
              {
                question: 'How long does the temperament test take?',
                answer: 'The FourType temperament test has 40 questions and usually takes under 10 minutes.',
              },
            ].map((item) => (
              <div key={item.question} className="rounded-xl border border-border bg-secondary/20 p-5">
                <h3 className="font-serif text-lg font-bold mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

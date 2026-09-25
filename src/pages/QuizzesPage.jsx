import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import PageBackground from '../components/layout/PageBackground'
import QuizCard from '../components/quiz/QuizCard'

import {
  useProgress,
} from '../context/ProgressContext'

import lessons from '../data/lessons'

export default function QuizzesPage() {
  const [selectedLessonId, setSelectedLessonId] =
    useState(lessons[0]?.id)

  const {
    completedLessons,
    completeLesson,
  } = useProgress()

  const selectedLesson = useMemo(() => {
    return lessons.find(
      (lesson) =>
        lesson.id === selectedLessonId
    )
  }, [selectedLessonId])

  function handleQuizComplete(
    isCorrect
  ) {
    if (!isCorrect || !selectedLesson) {
      return
    }

    completeLesson(
      selectedLesson.id
    )
  }

  return (
    <PageBackground>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            Knowledge Check
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Test your cloud knowledge.
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base">
            Choose a concept and complete
            its five-question quiz.
          </p>
        </header>

        {/* Stats */}
        <section className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-bold text-white">
              {lessons.length}
            </p>

            <p className="mt-1 text-xs text-white/35">
              Concepts
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-bold text-white">
              {lessons.length * 5}
            </p>

            <p className="mt-1 text-xs text-white/35">
              Questions
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-bold text-emerald-300">
              {completedLessons.length}
            </p>

            <p className="mt-1 text-xs text-white/35">
              Completed
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-2xl font-bold text-white">
              {lessons.length -
                completedLessons.length}
            </p>

            <p className="mt-1 text-xs text-white/35">
              Remaining
            </p>
          </div>
        </section>

        {/* Quiz area */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-24">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                  Choose a quiz
                </p>

                <p className="mt-1 text-sm text-white/40">
                  {completedLessons.length} of{' '}
                  {lessons.length} completed
                </p>
              </div>

              <div className="space-y-2">
                {lessons.map((lesson) => {
                  const isSelected =
                    lesson.id ===
                    selectedLessonId

                  const isCompleted =
                    completedLessons.includes(
                      lesson.id
                    )

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() =>
                        setSelectedLessonId(
                          lesson.id
                        )
                      }
                      className={`
                        flex w-full items-center gap-3
                        rounded-2xl border p-3
                        text-left transition
                        ${
                          isSelected
                            ? 'border-violet-400/40 bg-violet-500/10'
                            : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
                        }
                      `}
                    >
                      <span
                        className={`
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-xl text-xs font-bold
                          ${
                            isCompleted
                              ? 'bg-emerald-400/10 text-emerald-300'
                              : isSelected
                              ? 'bg-violet-500 text-white'
                              : 'bg-white/5 text-white/30'
                          }
                        `}
                      >
                        {isCompleted
                          ? '✓'
                          : String(
                              lesson.number
                            ).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-white">
                          {lesson.title}
                        </span>

                        <span className="mt-0.5 block text-xs text-white/30">
                          5 questions
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Quiz */}
          <div className="min-w-0">
            {selectedLesson && (
              <>
                <div className="mb-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/30">
                        Concept{' '}
                        {String(
                          selectedLesson.number
                        ).padStart(2, '0')}
                      </p>

                      <h2 className="mt-1 text-2xl font-bold text-white">
                        {selectedLesson.title}
                      </h2>
                    </div>

                    {completedLessons.includes(
                      selectedLesson.id
                    ) && (
                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-300">
                        Completed
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Complete all five questions
                    to finish this concept.
                  </p>
                </div>

                <QuizCard
                  quiz={selectedLesson.quiz}
                  onComplete={
                    handleQuizComplete
                  }
                />
              </>
            )}
          </div>
        </section>

        {/* Learn CTA */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Need to review the concept?
              </p>

              <p className="mt-1 text-sm text-white/35">
                Go back to Learn and explore the
                explanation and 3D visualization.
              </p>
            </div>

            <Link
              to="/learn"
              className="shrink-0 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
            >
              Back to Learn →
            </Link>
          </div>
        </section>
      </main>
    </PageBackground>
  )
}
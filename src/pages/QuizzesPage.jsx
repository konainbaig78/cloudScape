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

  const progressPercent = lessons.length
    ? Math.round(
        (completedLessons.length /
          lessons.length) *
          100
      )
    : 0

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
        <section className="mt-10">
          {/* Horizontal concept picker */}
          <div className="sticky top-4 z-10 -mx-5 mb-8 border-b border-white/10 bg-[#05070d]/80 px-5 pb-5 pt-1 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mb-3 flex items-end justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">
                Choose a quiz
              </p>

              <p className="whitespace-nowrap text-sm text-white/40">
                {completedLessons.length} of{' '}
                {lessons.length} completed
              </p>
            </div>

            <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-violet-500 transition-all duration-500"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            <div className="[mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
              <div className="flex snap-x gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                        flex shrink-0 snap-start items-center gap-2.5
                        rounded-2xl border px-4 py-3
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
                          flex h-7 w-7 shrink-0
                          items-center justify-center
                          rounded-lg text-xs font-bold
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

                      <span className="whitespace-nowrap text-sm font-medium text-white">
                        {lesson.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quiz */}
          <div className="mx-auto max-w-3xl">
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
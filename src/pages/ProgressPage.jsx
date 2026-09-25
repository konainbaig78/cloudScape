import { Link } from 'react-router-dom'

import PageBackground from '../components/layout/PageBackground'

import {
  useProgress,
} from '../context/ProgressContext'

import lessons from '../data/lessons'

export default function ProgressPage() {
  const {
    completedLessons,
    completedCount,
    progressPercentage,
    nextLesson,
    resetProgress,
  } = useProgress()

  return (
    <PageBackground>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            Your Learning Journey
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Your Progress
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Track your cloud learning journey
            and see which concepts you've
            completed.
          </p>
        </header>

        {/* Main progress */}
        <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-sm text-white/35">
                  Overall completion
                </p>

                <p className="mt-2 text-6xl font-bold tracking-tight text-white">
                  {progressPercentage}%
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  {completedCount}
                  <span className="text-white/25">
                    /{lessons.length}
                  </span>
                </p>

                <p className="text-xs text-white/30">
                  Concepts completed
                </p>
              </div>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-violet-500 transition-all duration-700"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-white/35">
                {nextLesson
                  ? `Next: ${nextLesson.title}`
                  : 'All concepts completed!'}
              </p>

              <Link
                to="/learn"
                className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Continue Learning →
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Completed
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-300">
                {completedCount}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Remaining
              </p>

              <p className="mt-3 text-3xl font-bold text-white">
                {lessons.length -
                  completedCount}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Concepts
              </p>

              <p className="mt-3 text-3xl font-bold text-white">
                {lessons.length}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[10px] uppercase tracking-wider text-white/30">
                Questions
              </p>

              <p className="mt-3 text-3xl font-bold text-white">
                {lessons.length * 5}
              </p>
            </div>
          </div>
        </div>

        {/* Learning path */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Learning Path
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Cloud Foundations
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            {lessons.map((lesson) => {
              const completed =
                completedLessons.includes(
                  lesson.id
                )

              return (
                <div
                  key={lesson.id}
                  className="flex items-center gap-4 p-4 sm:p-5"
                >
                  <div
                    className={`
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl text-xs font-bold
                      ${
                        completed
                          ? 'bg-emerald-400/10 text-emerald-300'
                          : 'bg-white/5 text-white/30'
                      }
                    `}
                  >
                    {completed
                      ? '✓'
                      : String(
                          lesson.number
                        ).padStart(2, '0')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {lesson.title}
                    </h3>

                    <p className="mt-1 text-xs text-white/30">
                      {lesson.category}
                      {' · '}
                      {lesson.duration}
                    </p>
                  </div>

                  <span
                    className={
                      completed
                        ? 'text-xs text-emerald-300'
                        : 'text-xs text-white/25'
                    }
                  >
                    {completed
                      ? 'Completed'
                      : 'Not started'}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Reset */}
        {completedCount > 0 && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={resetProgress}
              className="rounded-xl border border-red-400/10 bg-red-400/[0.03] px-4 py-2.5 text-xs font-semibold text-red-300/70 transition hover:bg-red-400/[0.06] hover:text-red-300"
            >
              Reset Progress
            </button>
          </div>
        )}
      </main>
    </PageBackground>
  )
}
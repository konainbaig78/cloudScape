import { Link } from 'react-router-dom'

import PageBackground from '../components/layout/PageBackground'

import lessons from '../data/lessons'

export default function HomePage() {
  return (
    <PageBackground>
      <main>
        <section className="mx-auto max-w-7xl px-5 pb-24 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
              Interactive Cloud Learning
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Understand the cloud.
              <span className="block text-white/40">
                See how it works.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
              Learn cloud computing through
              interactive 3D visualizations,
              practical lessons, quizzes, and
              an AI tutor.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/learn"
                className="rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                Start Learning →
              </Link>

              <Link
                to="/ai-tutor"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                Ask AI Tutor
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-3xl font-bold">
                {lessons.length}
              </p>

              <p className="mt-2 text-sm text-white/40">
                Cloud concepts
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-3xl font-bold">
                {lessons.length * 5}
              </p>

              <p className="mt-2 text-sm text-white/40">
                Quiz questions
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-3xl font-bold">
                3D
              </p>

              <p className="mt-2 text-sm text-white/40">
                Interactive visualization
              </p>
            </div>
          </div>
        </section>
      </main>
    </PageBackground>
  )
}
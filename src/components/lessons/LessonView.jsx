import { useState } from 'react'

import CloudScene from '../cloud/CloudScene'
import { Link } from "react-router-dom";

export default function LessonView({
  lesson,
}) {
  const [selectedNode, setSelectedNode] =
    useState(null)

  const [activeSection, setActiveSection] =
    useState(0)

  if (!lesson) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
        <p className="text-sm text-white/40">
          Select a lesson to begin.
        </p>
      </div>
    )
  }

  const architecture =
    lesson.architecture

  const activeContent =
    lesson.sections?.[activeSection]

  return (
    <div className="space-y-6">
      {/* ================= LESSON HEADER ================= */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                Concept{' '}
                {String(
                  lesson.number
                ).padStart(2, '0')}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
                {lesson.level}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
                {lesson.duration}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {lesson.title}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45 sm:text-base">
              {lesson.description}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/25">
              Category
            </p>

            <p className="mt-1 text-sm font-medium text-white/70">
              {lesson.category}
            </p>
          </div>
        </div>
      </section>

      {/* ================= LEARNING GOALS ================= */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            What You'll Learn
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">
            Learning Goals
          </h2>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {lesson.learningGoals?.map(
            (goal, index) => (
              <div
                key={goal}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-semibold text-violet-300">
                  {index + 1}
                </span>

                <p className="text-sm leading-6 text-white/55">
                  {goal}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* ================= 3D VISUALIZATION ================= */}
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Interactive Lab
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                Visualize the Architecture
              </h2>
            </div>

            <p className="text-xs text-white/30">
              Click a component to inspect it
            </p>
          </div>
        </div>

        <div className="relative h-[520px]">
          <CloudScene
            nodes={architecture?.nodes}
            connections={
              architecture?.connections
            }
            selected={selectedNode}
            onSelect={setSelectedNode}
          />

          {/* Selected Node */}
          {selectedNode && (
            <div className="absolute right-4 top-4 z-20 w-[280px] rounded-2xl border border-white/10 bg-[#0b0f19]/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-violet-400">
                    Selected Component
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-white">
                    {selectedNode.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNode(null)
                  }
                  className="text-white/30 transition hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/25">
                    Type
                  </p>

                  <p className="mt-1 text-sm text-white/65">
                    {selectedNode.type}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/25">
                    Status
                  </p>

                  <p className="mt-1 text-sm text-emerald-300">
                    {selectedNode.status ||
                      'Healthy'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= EXPLANATION ================= */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Concept Guide
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            Understand the Concept
          </h2>
        </div>

        {/* Section tabs */}
        {lesson.sections?.length > 1 && (
          <div className="overflow-x-auto border-b border-white/10">
            <div className="flex min-w-max gap-1 px-4 py-3">
              {lesson.sections.map(
                (section, index) => (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() =>
                      setActiveSection(index)
                    }
                    className={`
                      rounded-xl px-4 py-2.5
                      text-sm font-medium
                      transition
                      ${
                        activeSection ===
                        index
                          ? 'bg-violet-500/10 text-violet-300'
                          : 'text-white/40 hover:bg-white/5 hover:text-white/70'
                      }
                    `}
                  >
                    {section.title}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Active explanation */}
        {activeContent && (
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-white">
              {activeContent.title}
            </h3>

            <p className="mt-4 max-w-4xl text-sm leading-8 text-white/55 sm:text-base">
              {activeContent.content}
            </p>
          </div>
        )}

        {/* All sections on smaller/simple layouts */}
        {lesson.sections?.length === 1 && (
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-white">
              {lesson.sections[0].title}
            </h3>

            <p className="mt-4 text-sm leading-8 text-white/55 sm:text-base">
              {lesson.sections[0].content}
            </p>
          </div>
        )}
      </section>

      {/* ================= QUIZ REDIRECT ================= */}
      <section className="rounded-3xl border border-violet-400/10 bg-violet-500/[0.04] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Ready to test yourself?
            </p>

            <h2 className="mt-2 text-xl font-bold text-white">
              Take the {lesson.title} quiz.
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Head to the Quizzes page when
              you're ready to test your
              understanding.
            </p>
          </div>

          <Link
            href="/quizzes"
            className="shrink-0 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
          >
            Take Quiz →
          </Link>
        </div>
      </section>
    </div>
  )
}
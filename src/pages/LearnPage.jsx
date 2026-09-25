import { useState } from 'react'

import PageBackground from '../components/layout/PageBackground'
import LessonSidebar from '../components/lessons/LessonSidebar'
import LessonView from '../components/lessons/LessonView'

import { useProgress } from '../context/ProgressContext'

import lessons from '../data/lessons'

export default function LearnPage() {
  const [selectedLessonId, setSelectedLessonId] =
    useState(lessons[0]?.id)

  const {
    completedLessons,
  } = useProgress()

  const selectedLesson = lessons.find(
    (lesson) =>
      lesson.id === selectedLessonId
  )

  return (
    <PageBackground>
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Learn
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Cloud Foundations
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
            Learn cloud concepts through
            interactive explanations and
            3D architecture
            visualizations.
          </p>
        </div>

        {/* Learning area */}
        <div className="flex flex-col gap-8 lg:flex-row">
          <LessonSidebar
            lessons={lessons}
            selectedLesson={selectedLesson}
            completedLessons={
              completedLessons
            }
            onSelect={(lesson) =>
              setSelectedLessonId(
                lesson.id
              )
            }
          />

          <div className="min-w-0 flex-1">
            <LessonView
              lesson={selectedLesson}
            />
          </div>
        </div>
      </main>
    </PageBackground>
  )
}
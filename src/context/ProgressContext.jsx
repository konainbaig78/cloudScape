import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import lessons from '../data/lessons'

const ProgressContext =
  createContext(null)

const STORAGE_KEY =
  'cloudscape-completed-lessons'

export function ProgressProvider({
  children,
}) {
  const [completedLessons, setCompletedLessons] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            STORAGE_KEY
          )

        const parsed = saved
          ? JSON.parse(saved)
          : []

        return Array.isArray(parsed)
          ? parsed
          : []
      } catch {
        return []
      }
    })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(completedLessons)
    )
  }, [completedLessons])

  function completeLesson(lessonId) {
    setCompletedLessons((current) => {
      if (current.includes(lessonId)) {
        return current
      }

      return [...current, lessonId]
    })
  }

  function isLessonCompleted(lessonId) {
    return completedLessons.includes(
      lessonId
    )
  }

  function resetProgress() {
    setCompletedLessons([])
  }

  const progressPercentage =
    lessons.length > 0
      ? Math.round(
          (completedLessons.length /
            lessons.length) *
            100
        )
      : 0

  const nextLesson = useMemo(() => {
    return (
      lessons.find(
        (lesson) =>
          !completedLessons.includes(
            lesson.id
          )
      ) || null
    )
  }, [completedLessons])

  const value = {
    completedLessons,
    completedCount:
      completedLessons.length,
    totalLessons: lessons.length,
    progressPercentage,
    nextLesson,
    completeLesson,
    isLessonCompleted,
    resetProgress,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context =
    useContext(ProgressContext)

  if (!context) {
    throw new Error(
      'useProgress must be used inside ProgressProvider'
    )
  }

  return context
}
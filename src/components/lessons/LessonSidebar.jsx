import LessonCard from './LessonCard'

export default function LessonSidebar({
  lessons,
  selectedLesson,
  completedLessons = [],
  onSelect,
}) {
  const completedCount = completedLessons.length

  const progress =
    lessons.length > 0
      ? Math.round(
          (completedCount / lessons.length) * 100
        )
      : 0

  return (
    <aside className="w-full shrink-0 lg:w-[330px]">
      <div className="lg:sticky lg:top-24">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                Learning Path
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                Cloud Foundations
              </h2>
            </div>

            <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
              {completedCount}/{lessons.length}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-white/40">
            Learn cloud concepts step by step.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-2 flex justify-between">
            <span className="text-[10px] uppercase tracking-wider text-white/25">
              Progress
            </span>

            <span className="text-[10px] text-white/30">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-violet-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Contained lesson list */}
       <div className="max-h-[76rem] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isActive={
                selectedLesson?.id === lesson.id
              }
              isCompleted={completedLessons.includes(
                lesson.id
              )}
              onClick={onSelect}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
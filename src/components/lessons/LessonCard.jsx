export default function LessonCard({
  lesson,
  isActive = false,
  isCompleted = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(lesson)}
      className={`
        group w-full rounded-2xl border p-5 text-left
        transition-all duration-300
        ${
          isActive
            ? 'border-violet-400/50 bg-violet-500/10 shadow-lg shadow-violet-500/5'
            : 'border-white/10 bg-white/[0.03] hover:border-violet-400/30 hover:bg-white/[0.06]'
        }
      `}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`
              flex h-8 w-8 shrink-0 items-center justify-center
              rounded-lg text-xs font-bold
              ${
                isCompleted
                  ? 'bg-emerald-400/15 text-emerald-300'
                  : isActive
                  ? 'bg-violet-500 text-white'
                  : 'bg-white/10 text-white/60 group-hover:bg-violet-500/20 group-hover:text-violet-300'
              }
            `}
          >
            {isCompleted
              ? '✓'
              : String(lesson.number).padStart(2, '0')}
          </span>

          {isCompleted && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              Complete
            </span>
          )}
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/50">
          {lesson.level}
        </span>
      </div>

      <h3 className="mb-2 text-base font-semibold text-white">
        {lesson.title}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-6 text-white/50">
        {lesson.description}
      </p>

      <div className="flex items-center justify-between text-xs text-white/40">
        <span>{lesson.category}</span>

        <span className="flex items-center gap-1">
          <span>◷</span>
          {lesson.duration}
        </span>
      </div>
    </button>
  )
}
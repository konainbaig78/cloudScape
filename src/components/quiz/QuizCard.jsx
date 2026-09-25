import { useEffect, useMemo, useState } from 'react'

export default function QuizCard({
  quiz,
  onComplete,
}) {
  const quizzes = useMemo(() => {
    if (Array.isArray(quiz)) {
      return quiz.filter(
        (item) =>
          item &&
          Array.isArray(item.options) &&
          item.options.length > 0
      )
    }

    if (
      quiz &&
      Array.isArray(quiz.options) &&
      quiz.options.length > 0
    ) {
      return [quiz]
    }

    return []
  }, [quiz])

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(() => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setSubmitted(false)
    setCompleted(false)
    setCorrectCount(0)
  }, [quiz])

  if (quizzes.length === 0) {
    return (
      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm text-white/40">
          Quiz coming soon for this lesson.
        </p>
      </section>
    )
  }

  const activeQuiz = quizzes[currentQuestion]

  const correctAnswer = Number.isInteger(activeQuiz.answer)
    ? activeQuiz.answer
    : Number(activeQuiz.answer)

  const isCorrect = selectedAnswer === correctAnswer

  const progress =
    ((currentQuestion + (submitted && isCorrect ? 1 : 0)) /
      quizzes.length) *
    100

  function handleSubmit() {
    if (selectedAnswer === null) {
      return
    }

    setSubmitted(true)

    if (isCorrect) {
      setCorrectCount((count) => count + 1)
    }
  }

  function handleRetry() {
    setSelectedAnswer(null)
    setSubmitted(false)
  }

  function handleNext() {
    const isLastQuestion =
      currentQuestion === quizzes.length - 1

    if (isLastQuestion) {
      setCompleted(true)

      onComplete?.(true, {
        totalQuestions: quizzes.length,
        correctAnswers: correctCount,
        completed: true,
      })

      return
    }

    setCurrentQuestion((current) => current + 1)
    setSelectedAnswer(null)
    setSubmitted(false)
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setSubmitted(false)
    setCompleted(false)
    setCorrectCount(0)
  }

  if (completed) {
    return (
      <section className="mt-6 overflow-hidden rounded-3xl border border-emerald-400/20 bg-white/[0.03]">
        <div className="border-b border-white/10 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
              ✓
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Concept Complete
              </p>

              <p className="mt-0.5 text-xs text-white/35">
                You completed all {quizzes.length} questions.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5">
            <p className="text-lg font-semibold text-white">
              Great work! 🎉
            </p>

            <p className="mt-2 text-sm leading-6 text-white/50">
              You completed the knowledge check for this concept.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Questions
                </p>

                <p className="mt-1 text-lg font-semibold text-white">
                  {quizzes.length}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/30">
                  Correct
                </p>

                <p className="mt-1 text-lg font-semibold text-emerald-300">
                  {quizzes.length}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
          >
            Retake Quiz
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      {/* Header */}
      <div className="border-b border-white/10 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              ?
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                Quick Check
              </p>

              <p className="mt-0.5 text-xs text-white/35">
                Test your understanding
              </p>
            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/50">
            Question {currentQuestion + 1} / {quizzes.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/30">
            <span>Quiz Progress</span>

            <span>
              {Math.round(progress)}%
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
      </div>

      {/* Question */}
      <div className="p-5 sm:p-6">
        <h3 className="max-w-3xl text-lg font-semibold leading-7 text-white sm:text-xl">
          {activeQuiz.question}
        </h3>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {activeQuiz.options.map((option, index) => {
            const isSelected =
              selectedAnswer === index

            const isCorrectOption =
              submitted &&
              index === correctAnswer

            const isWrongSelected =
              submitted &&
              isSelected &&
              !isCorrect

            let optionClass =
              'border-white/10 bg-white/[0.02] hover:border-violet-400/30 hover:bg-violet-500/[0.05]'

            if (
              isSelected &&
              !submitted
            ) {
              optionClass =
                'border-violet-400/50 bg-violet-500/10'
            }

            if (isCorrectOption) {
              optionClass =
                'border-emerald-400/40 bg-emerald-400/10'
            }

            if (isWrongSelected) {
              optionClass =
                'border-red-400/30 bg-red-400/10'
            }

            return (
              <button
                key={`${currentQuestion}-${index}-${option}`}
                type="button"
                disabled={submitted}
                onClick={() =>
                  setSelectedAnswer(index)
                }
                className={`
                  group flex w-full items-center gap-4
                  rounded-2xl border p-4 text-left
                  transition-all duration-200
                  ${optionClass}
                  ${
                    submitted
                      ? 'cursor-default'
                      : 'cursor-pointer'
                  }
                `}
              >
                <span
                  className={`
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-xl border
                    text-xs font-semibold
                    ${
                      isCorrectOption
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                        : isWrongSelected
                        ? 'border-red-400/30 bg-red-400/10 text-red-300'
                        : isSelected
                        ? 'border-violet-400/30 bg-violet-400/10 text-violet-300'
                        : 'border-white/10 bg-white/5 text-white/40 group-hover:border-violet-400/20 group-hover:text-violet-300'
                    }
                  `}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="flex-1 text-sm leading-6 text-white/65">
                  {option}
                </span>

                {isCorrectOption && (
                  <span className="text-emerald-300">
                    ✓
                  </span>
                )}

                {isWrongSelected && (
                  <span className="text-red-300">
                    ×
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {submitted && (
          <div
            className={`
              mt-5 rounded-2xl border p-4
              ${
                isCorrect
                  ? 'border-emerald-400/20 bg-emerald-400/[0.06]'
                  : 'border-amber-400/20 bg-amber-400/[0.06]'
              }
            `}
          >
            <div className="flex items-start gap-3">
              <div
                className={`
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-lg
                  ${
                    isCorrect
                      ? 'bg-emerald-400/10 text-emerald-300'
                      : 'bg-amber-400/10 text-amber-300'
                  }
                `}
              >
                {isCorrect ? '✓' : 'i'}
              </div>

              <div>
                <p
                  className={`
                    text-sm font-semibold
                    ${
                      isCorrect
                        ? 'text-emerald-300'
                        : 'text-amber-300'
                    }
                  `}
                >
                  {isCorrect
                    ? 'Correct!'
                    : 'Not quite.'}
                </p>

                <p className="mt-1 text-sm leading-6 text-white/50">
                  {activeQuiz.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            {!submitted
              ? 'Select one answer to continue.'
              : isCorrect
              ? currentQuestion === quizzes.length - 1
                ? 'You completed the final question.'
                : 'Nice! Continue to the next question.'
              : 'Review the explanation and try again.'}
          </p>

          {/* Check Answer */}
          {!submitted && (
            <button
              type="button"
              disabled={selectedAnswer === null}
              onClick={handleSubmit}
              className={`
                rounded-xl px-5 py-2.5
                text-sm font-semibold
                transition
                ${
                  selectedAnswer === null
                    ? 'cursor-not-allowed bg-white/5 text-white/20'
                    : 'bg-violet-500 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-400'
                }
              `}
            >
              Check Answer →
            </button>
          )}

          {/* Retry */}
          {submitted && !isCorrect && (
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/70 transition hover:bg-white/[0.08] hover:text-white"
            >
              Try Again
            </button>
          )}

          {/* Next / Complete */}
          {submitted && isCorrect && (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-xl bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
            >
              {currentQuestion === quizzes.length - 1
                ? 'Complete Quiz ✓'
                : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

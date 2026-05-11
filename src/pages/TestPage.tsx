import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ActionButton } from '../components/ActionButton';
import { questions } from '../data/questions';
import { useTestStore } from '../store/testStore';

export const TestPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState('');
  const { answers, setAnswer, completeTest } = useTestStore();
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const selectedCount = useMemo(
    () => questions.filter((question) => answers[question.id]).length,
    [answers],
  );

  const goNext = () => {
    if (!selectedAnswer) {
      setMessage('先选一个最像你的精神反应，再继续。');
      return;
    }
    setMessage('');

    if (currentIndex === questions.length - 1) {
      completeTest();
      navigate('/result');
      return;
    }

    setCurrentIndex((index) => index + 1);
  };

  return (
    <section className="mx-auto grid min-h-[calc(100vh-68px)] max-w-5xl content-center px-4 py-8 sm:px-6">
      <div className="rounded-[1.75rem] border border-ink/10 bg-white/76 p-4 shadow-ink sm:p-7">
        <div className="mb-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-ink/55">
            <span>
              Q{currentQuestion.index} / {questions.length}
            </span>
            <span>{selectedCount} 已选择</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-ink/8">
            <div className="h-full rounded-full bg-ink" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <h1 className="text-2xl font-black leading-tight sm:text-4xl">
          {currentQuestion.prompt}
        </h1>

        <div className="mt-7 grid gap-3">
          {currentQuestion.options.map((option) => {
            const active = selectedAnswer === option.id;

            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setAnswer(currentQuestion.id, option.id);
                  setMessage('');
                }}
                className={`flex min-h-16 items-center gap-3 rounded-card border p-4 text-left transition ${
                  active
                    ? 'border-ink bg-ink/8 shadow-sm'
                    : 'border-ink/10 bg-paper/60 hover:border-ink/25'
                }`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-lg font-black shadow-sm">
                  {option.id.toUpperCase()}
                </span>
                <span className="min-w-0 flex-1 text-base font-semibold leading-7">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <ActionButton
            tone="light"
            disabled={currentIndex === 0}
            onClick={() => {
              setMessage('');
              setCurrentIndex((index) => Math.max(0, index - 1));
            }}
          >
            <ArrowLeft size={18} /> 上一题
          </ActionButton>
          <div className="min-h-6 text-center text-sm font-semibold text-fire-ink">
            {message}
          </div>
          <ActionButton onClick={goNext}>
            {currentIndex === questions.length - 1 ? (
              <>
                <Check size={18} /> 查看结果
              </>
            ) : (
              <>
                下一题 <ArrowRight size={18} />
              </>
            )}
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

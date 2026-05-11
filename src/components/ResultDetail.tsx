import { Copy, RotateCcw, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ELEMENT_META } from '../data/elements';
import type { ElementScores, PersonalityResult } from '../types/personality';
import { ActionButton } from './ActionButton';
import { ImageWithFallback } from './ImageWithFallback';
import { ScoreBars } from './ScoreBars';

interface ResultDetailProps {
  result: PersonalityResult;
  scores?: ElementScores | null;
  onReset?: () => void;
}

const copyText = async (result: PersonalityResult) => {
  const text = `${result.comboLabel} ${result.state} / ${result.typeName}\n${result.quote}\n${result.anchor}\n${result.longDescription}`;
  await navigator.clipboard.writeText(text);
};

const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
};

export const ResultDetail = ({ result, scores, onReset }: ResultDetailProps) => {
  const mainMeta = ELEMENT_META[result.mainElement];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-card border border-ink/10 bg-white shadow-ink">
            <ImageWithFallback
              src={result.image}
              alt={`${result.comboLabel} ${result.state}`}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          {scores ? (
            <div className="rounded-card border border-ink/10 bg-white/75 p-5">
              <h2 className="mb-4 text-base font-black">五行分数盘</h2>
              <ScoreBars scores={scores} />
            </div>
          ) : null}
        </div>

        <article className="space-y-6">
          <div className="rounded-card border border-ink/10 bg-white/78 p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink/60">
              <span className={`rounded-full px-3 py-1 ${mainMeta.bgClass}`}>
                {mainMeta.icon} {result.comboLabel}
              </span>
              <span>{result.animal}</span>
            </div>
            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-ink/45">
              {result.typeName}
            </p>
            <h1 className="mt-2 text-4xl font-black leading-tight sm:text-6xl">
              {result.state}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-8 text-ink/74">
              {result.anchor}
            </p>
            <p className="mt-5 rounded-card bg-ink px-5 py-4 text-lg font-black leading-8 text-paper">
              {result.quote}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Info title="创意职业" value={result.creativeCareer} />
            <Info title="缺什么" value={result.missing} />
            <Info title="最佳合拍" value={result.bestMatch} />
            <Info title="运势风格" value={result.fortuneStyle} />
          </div>

          <div className="rounded-card border border-ink/10 bg-white/78 p-5 leading-8 text-ink/76 sm:p-7">
            <h2 className="mb-3 text-xl font-black text-ink">荒诞解读</h2>
            <p>{result.absurdReading}</p>
            <h2 className="mb-3 mt-6 text-xl font-black text-ink">关系解读</h2>
            <p>{result.relationshipReading}</p>
            <h2 className="mb-3 mt-6 text-xl font-black text-ink">长文案</h2>
            <p>{result.longDescription}</p>
          </div>

          <div className="rounded-card border border-ink/10 bg-white/78 p-5 sm:p-7">
            <h2 className="mb-3 text-xl font-black">天选职业</h2>
            <div className="flex flex-wrap gap-2">
              {result.careers.map((career) => (
                <span
                  key={career}
                  className="rounded-full border border-ink/10 bg-paper px-3 py-1.5 text-sm"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {onReset ? (
              <ActionButton onClick={onReset}>
                <RotateCcw size={18} /> 重新测试
              </ActionButton>
            ) : (
              <Link to="/test">
                <ActionButton>
                  <RotateCcw size={18} /> 去测试
                </ActionButton>
              </Link>
            )}
            <ActionButton tone="light" onClick={() => void copyText(result)}>
              <Copy size={18} /> 复制结果文案
            </ActionButton>
            <ActionButton tone="light" onClick={() => void copyLink()}>
              <Share2 size={18} /> 复制链接
            </ActionButton>
          </div>
        </article>
      </div>
    </section>
  );
};

const Info = ({ title, value }: { title: string; value: string }) => (
  <div className="rounded-card border border-ink/10 bg-white/78 p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/42">
      {title}
    </p>
    <p className="mt-2 text-lg font-black leading-7">{value}</p>
  </div>
);

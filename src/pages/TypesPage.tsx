import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ELEMENT_META, ELEMENT_ORDER } from '../data/elements';
import { personalityResults } from '../data/results';
import type { ElementKey } from '../types/personality';
import { ResultCard } from '../components/ResultCard';

type FilterValue = ElementKey | 'all';

export const TypesPage = () => {
  const [filter, setFilter] = useState<FilterValue>('all');
  const results = useMemo(
    () =>
      filter === 'all'
        ? personalityResults
        : personalityResults.filter((result) => result.mainElement === filter),
    [filter],
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/42">
            type matrix
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-6xl">25 种五行人格</h1>
          <p className="mt-3 max-w-2xl leading-7 text-ink/62">
            主元素决定核心底色，副元素决定行为调味。点开任意卡片查看完整兽设、金句、运势和职业建议。
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            全部
          </FilterButton>
          {ELEMENT_ORDER.map((element) => (
            <FilterButton
              key={element}
              active={filter === element}
              onClick={() => setFilter(element)}
            >
              {ELEMENT_META[element].icon} {ELEMENT_META[element].label}
            </FilterButton>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </section>
  );
};

const FilterButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition ${
      active ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-white/70 text-ink/65'
    }`}
  >
    {children}
  </button>
);

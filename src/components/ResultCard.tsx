import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ELEMENT_META } from '../data/elements';
import type { PersonalityResult } from '../types/personality';
import { ImageWithFallback } from './ImageWithFallback';

interface ResultCardProps {
  result: PersonalityResult;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const mainMeta = ELEMENT_META[result.mainElement];

  return (
    <Link
      to={`/types/${result.id}`}
      className="group overflow-hidden rounded-card border border-ink/10 bg-white/72 shadow-sm transition hover:-translate-y-1 hover:shadow-ink"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink/5">
        <ImageWithFallback
          src={result.image}
          alt={`${result.comboLabel} ${result.state}`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold text-ink">
          {mainMeta.icon} {result.comboLabel}
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-ink/45">
              {result.typeName}
            </p>
            <h3 className="mt-1 text-xl font-black">{result.state}</h3>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-ink/40 transition group-hover:text-ink" />
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-ink/68">{result.quote}</p>
      </div>
    </Link>
  );
};

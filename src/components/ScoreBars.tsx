import { ELEMENT_META, ELEMENT_ORDER } from '../data/elements';
import { getDominantPercent } from '../utils/scoring';
import type { ElementScores } from '../types/personality';

interface ScoreBarsProps {
  scores: ElementScores;
}

export const ScoreBars = ({ scores }: ScoreBarsProps) => {
  return (
    <div className="space-y-3">
      {ELEMENT_ORDER.map((element) => {
        const meta = ELEMENT_META[element];
        const percent = getDominantPercent(scores, element);

        return (
          <div key={element}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-semibold">
                {meta.icon} {meta.label}
              </span>
              <span className="text-ink/55">{scores[element]} 分</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink/8">
              <div
                className={`h-full rounded-full ${meta.bgClass}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

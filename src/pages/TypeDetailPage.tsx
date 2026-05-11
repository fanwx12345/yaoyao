import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ResultDetail } from '../components/ResultDetail';
import { personalityResults } from '../data/results';

export const TypeDetailPage = () => {
  const { typeId } = useParams();
  const result = personalityResults.find((item) => item.id === typeId);

  if (!result) return <Navigate to="/types" replace />;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          to="/types"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink/58 hover:text-ink"
        >
          <ArrowLeft size={17} /> 返回总览
        </Link>
      </div>
      <ResultDetail result={result} />
    </>
  );
};

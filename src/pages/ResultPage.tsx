import { Navigate, useNavigate } from 'react-router-dom';
import { ResultDetail } from '../components/ResultDetail';
import { useTestStore } from '../store/testStore';
import { resolvePersonalityType } from '../utils/scoring';

export const ResultPage = () => {
  const navigate = useNavigate();
  const { scores, resetTest } = useTestStore();

  if (!scores) return <Navigate to="/test" replace />;

  const result = resolvePersonalityType(scores);

  return (
    <ResultDetail
      result={result}
      scores={scores}
      onReset={() => {
        resetTest();
        navigate('/test');
      }}
    />
  );
};

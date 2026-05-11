import { Link } from 'react-router-dom';
import { ActionButton } from '../components/ActionButton';

export const NotFoundPage = () => (
  <section className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 text-center">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ink/42">
        404
      </p>
      <h1 className="mt-3 text-4xl font-black sm:text-6xl">此签不在卦盘中</h1>
      <p className="mt-4 leading-7 text-ink/62">这条路径没有对应人格，先回首页重开一局。</p>
      <Link to="/" className="mt-6 inline-block">
        <ActionButton>回首页</ActionButton>
      </Link>
    </div>
  </section>
);

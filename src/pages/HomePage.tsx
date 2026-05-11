import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { ActionButton } from '../components/ActionButton';
import { ELEMENT_META, ELEMENT_ORDER } from '../data/elements';
import { personalityResults } from '../data/results';
import { ResultCard } from '../components/ResultCard';

export const HomePage = () => {
  const featured = personalityResults.filter((result) =>
    ['fire-metal', 'water-water', 'wood-earth'].includes(result.id),
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-sm font-semibold text-ink/62">
            <Sparkles size={16} />
            五行人格测试 / 算命风格人格测试
          </div>
          <div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] sm:text-7xl lg:text-8xl">
              yaoyao check now
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/68 sm:text-xl">
              15 道互联网精神场景题，算出你的主副五行人格。不是玄学，也不是科学，是一种足够准确的今日精神天气。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/test">
              <ActionButton className="px-6">
                Check Now <ArrowRight size={18} />
              </ActionButton>
            </Link>
            <Link to="/types">
              <ActionButton tone="light">浏览 25 种类型</ActionButton>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['25', '主副五行组合'],
              ['15', '场景化选择题'],
              ['1', '张可复制结果文案'],
            ].map(([number, label]) => (
              <div
                key={label}
                className="rounded-card border border-ink/10 bg-white/58 p-4"
              >
                <p className="text-3xl font-black">{number}</p>
                <p className="mt-1 text-sm text-ink/55">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="rounded-[2rem] border border-ink/10 bg-white/70 p-4 shadow-ink">
            <div className="grid grid-cols-5 gap-2">
              {ELEMENT_ORDER.map((element) => {
                const meta = ELEMENT_META[element];
                return (
                  <div
                    key={element}
                    className={`rounded-card ${meta.bgClass} p-3 text-center`}
                  >
                    <div className="text-2xl">{meta.icon}</div>
                    <div className="mt-1 text-sm font-black">{meta.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-card bg-ink p-5 text-paper">
              <p className="text-sm uppercase tracking-[0.22em] text-paper/55">
                今日签文
              </p>
              <p className="mt-3 text-2xl font-black leading-tight">
                你的精神状态不是 bug，是五行正在后台渲染。
              </p>
            </div>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-card border border-ink/10 p-4">
                <BadgeCheck size={18} />
                <p className="mt-2 font-semibold">平票优先级</p>
                <p className="mt-1 text-ink/58">火 &gt; 水 &gt; 木 &gt; 金 &gt; 土</p>
              </div>
              <div className="rounded-card border border-ink/10 p-4">
                <Compass size={18} />
                <p className="mt-2 font-semibold">主副元素</p>
                <p className="mt-1 text-ink/58">最高分决定底色，第二名负责调味。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink/42">
              featured types
            </p>
            <h2 className="mt-2 text-3xl font-black">先看看几种离谱但精准的样本</h2>
          </div>
          <Link to="/types" className="hidden text-sm font-semibold text-ink/58 sm:block">
            查看全部
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    </section>
  );
};

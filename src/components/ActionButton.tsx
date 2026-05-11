import { clsx } from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  tone?: 'dark' | 'light' | 'ghost';
}

export const ActionButton = ({
  children,
  tone = 'dark',
  className,
  ...props
}: ActionButtonProps) => {
  return (
    <button
      className={clsx(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45',
        tone === 'dark' && 'bg-ink text-paper shadow-ink hover:-translate-y-0.5',
        tone === 'light' && 'border border-ink/15 bg-white text-ink hover:border-ink/35',
        tone === 'ghost' && 'text-ink/70 hover:bg-ink/5 hover:text-ink',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

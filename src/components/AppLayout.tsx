import { Link, NavLink, Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const navItems = [
  { to: '/test', label: '测试' },
  { to: '/types', label: '类型总览' },
];

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/88 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-wide">
            <span className="grid size-9 place-items-center rounded-full bg-ink text-paper">
              <Sparkles size={17} />
            </span>
            <span className="leading-tight">yaoyao check now</span>
          </Link>
          <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-white/60 p-1 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 transition ${
                    isActive ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

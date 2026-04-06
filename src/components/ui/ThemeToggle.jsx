import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Alternar para modo claro' : 'Alternar para modo escuro'}
      className="
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        text-gray-body hover:text-primary
        dark:text-gray-light dark:hover:text-white
        hover:bg-gray-bg dark:hover:bg-white/10
        transition-all duration-300
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        active:scale-[0.92]
        cursor-pointer
      "
    >
      {/* Sun — visible in dark mode (click to go light) */}
      <Sun
        size={20}
        strokeWidth={1.75}
        aria-hidden="true"
        className={`
          absolute transition-all duration-500 ease-in-out
          ${isDark
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
          }
        `}
      />

      {/* Moon — visible in light mode (click to go dark) */}
      <Moon
        size={20}
        strokeWidth={1.75}
        aria-hidden="true"
        className={`
          absolute transition-all duration-500 ease-in-out
          ${isDark
            ? '-rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
          }
        `}
      />
    </button>
  );
}

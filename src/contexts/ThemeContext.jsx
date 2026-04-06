import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const THEME_STORAGE_KEY = 'theme';
const VALID_THEMES = ['light', 'dark', 'system'];

const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof window === 'undefined') return 'system';

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme && VALID_THEMES.includes(storedTheme)) {
    return storedTheme;
  }

  return 'system';
}

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const isFirstThemeApply = useRef(true);

  const setTheme = useCallback((nextTheme) => {
    if (!VALID_THEMES.includes(nextTheme)) {
      throw new Error(`Invalid theme: ${nextTheme}. Expected one of ${VALID_THEMES.join(', ')}`);
    }
    setThemeState(nextTheme);
  }, []);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const effectiveTheme = currentTheme === 'system' ? getSystemTheme() : currentTheme;
      return effectiveTheme === 'dark' ? 'light' : 'dark';
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const onChange = (event) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', resolvedTheme === 'dark');

    if (isFirstThemeApply.current) {
      isFirstThemeApply.current = false;
      return undefined;
    }

    root.classList.add('transitioning');
    const timeoutId = window.setTimeout(() => {
      root.classList.remove('transitioning');
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      root.classList.remove('transitioning');
    };
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

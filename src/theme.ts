import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'anatomica.theme';
const META = { dark: '#0c2329', light: '#dfe8e6' };

function initial(): Theme {
  try { const t = localStorage.getItem(KEY); if (t === 'light' || t === 'dark') return t; } catch { /* storage unavailable */ }
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[t]);
}
apply(initial());

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initial);
  useEffect(() => {
    apply(theme);
    try { localStorage.setItem(KEY, theme); } catch { /* storage unavailable */ }
  }, [theme]);
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))] as const;
}

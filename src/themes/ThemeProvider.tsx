import { createContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ThemeDefinition } from './types';
import { themes, defaultThemeId } from './registry';

interface ThemeContextValue {
  theme: ThemeDefinition;
  themeId: string;
  setTheme: (id: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue>(null!);

const STORAGE_KEY = 'pitchblck-theme';

function loadStoredThemeId(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && themes[stored]) return stored;
  } catch {}
  return defaultThemeId;
}

function tokensToCSS(tokens: Record<string, string | number>): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(tokens)) {
    // camelCase → kebab-case: colorAccent → --theme-color-accent
    const cssName = '--theme-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
    vars[cssName] = String(value);
  }
  return vars;
}

function useFontLoader(fontUrl: string) {
  useEffect(() => {
    if (!fontUrl) return;
    const id = 'theme-fonts';
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = fontUrl;
  }, [fontUrl]);
}

function useBodyStyles(tokens: Record<string, string | number>) {
  useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = String(tokens.colorBg);
    body.style.color = String(tokens.colorText);
    body.style.backgroundImage = String(tokens.bgTexture);
    body.style.backgroundSize = String(tokens.bgTextureSize);
  }, [tokens]);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(loadStoredThemeId);

  const theme = themes[themeId] ?? themes[defaultThemeId];

  const setTheme = (id: string) => {
    if (themes[id]) {
      setThemeId(id);
      try { localStorage.setItem(STORAGE_KEY, id); } catch {}
    }
  };

  // CSS custom properties from tokens
  const cssVars = useMemo(() => tokensToCSS(theme.tokens), [theme.tokens]);

  // Load fonts dynamically
  useFontLoader(String(theme.tokens.fontUrl));

  // Apply body-level styles
  useBodyStyles(theme.tokens);

  const contextValue = useMemo(
    () => ({ theme, themeId, setTheme }),
    [theme, themeId]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div style={cssVars}>{children}</div>
    </ThemeContext.Provider>
  );
}

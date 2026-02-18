import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { esES } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import { createCorpicoTheme } from '@/shared/theme/Themes';
import { ThemeMode, ThemeModeContext, ThemeModeContextValue } from './ThemeModeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('themeMode');
    return stored === 'dark' ? 'dark' : 'light';
  });

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', next);
      return next;
    });
  }, []);

  const theme = useMemo(() => createTheme(createCorpicoTheme(mode), esES), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeModeContext.Provider>
  );
};

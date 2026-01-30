import { useMemo, type ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { esES } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';
import corpicoTheme from '@/shared/theme/Themes';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useMemo(() => createTheme(corpicoTheme, esES), []);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

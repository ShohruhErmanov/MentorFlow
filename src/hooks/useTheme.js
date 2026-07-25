import { useContext } from 'react';
import { ThemeContext } from '../components/theme/ThemeProvider';

/**
 * Hook to access the current theme and set a new theme.
 * @returns {{ theme: 'light' | 'dark' | 'system', resolvedTheme: 'light' | 'dark', setTheme: (theme: string) => void }}
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

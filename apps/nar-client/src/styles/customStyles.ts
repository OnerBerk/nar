import {setupTheme} from './theme.ts';

const theme = setupTheme();

export function getCustomStyles() {
  return {
    backgrounds: {
      card: `linear-gradient(115deg, ${theme.palette.background.pomegranate} 0%, ${theme.palette.background.pomegranate} 5%, #fff 85%, #fff 100%)`,
    },
    shadows: {
      card: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
    },
  };
}

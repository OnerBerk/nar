import { GlobalStyles } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const AppGlobalStyles = () => (
  <GlobalStyles
    styles={(theme: Theme) => ({
      html: {
        fontSize: '100%',
      },
      body: {
        fontSize: '1rem',
        fontFamily: 'karla, sans-serif',
        backgroundColor: theme.palette.background.default,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        color: theme.palette.text.primary,
      },
      '#root': {
        width: '100%',
        height: '100%',
      },
      '*': {
        boxSizing: 'border-box',
        scrollbarWidth: 'thin',
        scrollbarColor: 'transparent transparent',
      },
      '*::-webkit-scrollbar': {
        width: '6px',
        height: '6px',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
      },
    })}
  />
);

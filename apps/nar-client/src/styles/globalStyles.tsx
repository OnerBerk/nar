import {GlobalStyles} from '@mui/material';
import {Theme} from '@mui/material/styles';

export const AppGlobalStyles = () => (
  <GlobalStyles
    styles={(theme: Theme) => ({
      html: {
        fontSize: '100%',
      },
      body: {
        fontSize: '1rem',
        fontFamily: 'karla, sans-serif',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 30%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0.95) 100%)`,
        backgroundAttachment: 'fixed',
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
      // Suppression complète de l'autofill jaune
      'input:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
        '-webkit-text-fill-color': 'inherit !important',
        transition: 'background-color 5000s ease-in-out 0s',
      },
      'input:-webkit-autofill:hover': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:focus': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:active': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:visited': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:checked': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:enabled': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:disabled': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:read-only': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:read-write': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:required': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:optional': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:valid': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:invalid': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:in-range': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:out-of-range': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:placeholder-shown': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
      'input:-webkit-autofill:not(:placeholder-shown)': {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
      },
    })}
  />
);

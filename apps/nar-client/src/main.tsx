import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { responsiveFontSizes, ThemeProvider } from '@mui/material';
import { AppGlobalStyles } from './styles/globalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import { setupTheme } from './styles/theme';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app-routes/routes.tsx';

let theme = setupTheme();
theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <AppGlobalStyles />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

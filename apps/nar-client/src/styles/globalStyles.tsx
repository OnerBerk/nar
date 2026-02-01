import {GlobalStyles} from '@mui/material';
import {Theme} from '@mui/material/styles';

import MiskanWoff from '@/assets/font/miskan/Miskan.woff?url';
import MiskanObliqueWoff from '@/assets/font/miskan/Miskan Oblique.woff?url';

export const AppGlobalStyles = () => (
  <GlobalStyles
    styles={(theme: Theme) => ({
      '@font-face': [
        {
          fontFamily: 'Miskan',
          src: `url(${MiskanWoff}) format('woff')`,
          fontWeight: 'light',
          fontStyle: 'normal',
        },
        {
          fontFamily: 'Miskan',
          src: `url(${MiskanObliqueWoff}) format('woff')`,
          fontWeight: 'light',
          fontStyle: 'oblique',
        },
      ],
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        margin: 0,
        fontFamily: '"Miskan", Karla, sans-serif',
        fontWeight: 400,
        fontStyle: 'normal',
        color: theme.palette.text.primary,
        background: `linear-gradient(
          135deg,
          ${theme.palette.background.default} 0%,
          ${theme.palette.background.default} 5%,
          rgba(255, 255, 255, 0.8) 30%,
          rgba(255, 255, 255, 0.95) 100%
        )`,
        backgroundAttachment: 'fixed',
      },
    })}
  />
);

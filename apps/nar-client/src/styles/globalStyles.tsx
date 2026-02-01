import {GlobalStyles} from '@mui/material';
import {Theme} from '@mui/material/styles';

import MiskanWoff from '@/assets/font/miskan/Miskan.woff?url';
import MiskanObliqueWoff from '@/assets/font/miskan/Miskan Oblique.woff?url';
import FrenchTeaTtf from '@/assets/font/french-tea/FreshTea.ttf?url';

export const AppGlobalStyles = () => (
  <GlobalStyles
    styles={(theme: Theme) => ({
      '@font-face': [
        {
          fontFamily: 'Miskan',
          src: `url(${MiskanWoff}) format('woff')`,
          fontStyle: 'normal',
        },
        {
          fontFamily: 'Miskan',
          src: `url(${MiskanObliqueWoff}) format('woff')`,
          fontStyle: 'oblique',
        },
        {
          fontFamily: 'FrenchTea',
          src: `url(${FrenchTeaTtf}) format('truetype')`,
          fontWeight: 'normal',
          fontStyle: 'normal',
        },
      ],
      html: {
        height: '100%',
        fontSize: 25,
      },
      body: {
        height: '100%',
        margin: 0,
        fontFamily: '"FrenchTea", "Miskan", Karla, sans-serif',
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
      '.Toastify__toast': {
        fontFamily: theme.typography.fontFamily,
        fontSize: `${theme.typography.body1?.fontSize ?? theme.typography.htmlFontSize}px`,
      },
    })}
  />
);

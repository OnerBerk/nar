import React from 'react';

import { useIsMobile } from '../hooks/use-responsive';

import { Box, keyframes, Typography } from '@mui/material';
import narLogo from '../assets/nar-logo.png';

const logoAnimation = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <Box
      border={1}
      sx={{
        cursor: 'pointer',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        component="img"
        src={narLogo}
        alt="Nar logo"
        sx={{
          width: isMobile ? '50%' : '25%',
          animation: `${logoAnimation} 2s ease-out forwards`,
          transformOrigin: 'center',
        }}
      />
      <Typography variant="h1">Nar</Typography>
    </Box>
  );
};

export default HomePage;

import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import narLogo from '../../../assets/nar-logo.png';
import {useIsMobile} from '@/hooks/use-responsive';

interface AuthSwitcherProps {
  staticText: string;
  clickableText: string;
  onSwitch: () => void;
}

const AuthSwitcher: React.FC<AuthSwitcherProps> = ({staticText, clickableText, onSwitch}) => {
  const isMobile = useIsMobile();

  return (
    <Stack
      height='100%'
      spacing={2}
      alignItems='center'
      justifyContent='center'
      width={isMobile ? '100%' : '80%'}
      p={5}
      sx={{position: 'relative'}}>
      <Box
        component='img'
        src={narLogo}
        alt='Nar logo'
        sx={{
          width: '65%',
          opacity: 0.1,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
        }}
      />

      <Stack direction='row' spacing={1} justifyContent='center' sx={{zIndex: 0}}>
        <Typography variant='inherit' sx={{fontSize: 16, textAlign: 'center'}}>
          {staticText}{' '}
          <span
            onClick={onSwitch}
            style={{
              color: 'primary.main',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline',
            }}>
            {clickableText}
          </span>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AuthSwitcher;

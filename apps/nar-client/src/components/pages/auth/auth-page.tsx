import React, {useCallback, useState} from 'react';

import {useIsMobile} from '../../../hooks/use-responsive.ts';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import RegisterForm from '../../forms/register-form.tsx';
import AuthSwitcher from './auth-switcher.tsx';
import LoginForm from '../../forms/login-form.tsx';

const AuthPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoginPos, setIsLoginPos] = useState(true);

  const handleClick = useCallback(() => {
    setIsLoginPos(!isLoginPos);
  }, [isLoginPos]);

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      rowGap={2}
      sx={{
        borderRadius: 2,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
        width: '80vw',
        height: 700,
        position: 'relative',
      }}>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          left: isMobile ? 0 : isLoginPos ? 0 : '50%',
          right: isMobile ? 0 : isLoginPos ? '50%' : 0,
          bottom: 0,
          justifyContent: 'center',
          zIndex: 1,
          borderRadius: 2,
          width: isMobile ? '100%' : '50%',
          backgroundColor: 'secondary.main',
          transition: isMobile ? 'none' : 'left 0.4s ease-in-out, right 0.4s ease-in-out',
        }}>
        {isLoginPos ? (
          <LoginForm setIsLoginPos={setIsLoginPos} />
        ) : (
          <RegisterForm onRegisterSuccess={() => setIsLoginPos(true)} setIsLoginPos={setIsLoginPos} />
        )}
      </Box>

      <AuthSwitcher staticText='Vous avez déjà un compte ?' clickableText='Connectez-vous' onSwitch={handleClick} />
      <AuthSwitcher
        staticText="Vous n'avez pas encore de compte ?"
        clickableText='Inscrivez-vous'
        onSwitch={handleClick}
      />
    </Stack>
  );
};

export default AuthPage;

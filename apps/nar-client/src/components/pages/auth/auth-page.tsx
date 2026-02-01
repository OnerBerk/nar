import React, {useCallback, useState} from 'react';

import {useIsMobile} from '../../../hooks/use-responsive.ts';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import RegisterForm from '../../forms/register-form.tsx';
import AuthSwitcher from './auth-switcher.tsx';
import LoginForm from '../../forms/login-form.tsx';
import {getCustomStyles} from '@/styles/customStyles.ts';

const AuthPage: React.FC = () => {
  const styles = getCustomStyles();
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
        boxShadow: styles.shadows.card,
        width: '80vw',
        maxWidth: 1200,
        height: 700,
        maxHeight: '80vh',
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
          transition: isMobile ? 'none' : 'left 0.4s ease-in-out, right 0.4s ease-in-out',
          boxShadow: styles.shadows.card,
          background: styles.backgrounds.card,
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

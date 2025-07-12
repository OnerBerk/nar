import React, {useCallback, useMemo, useState} from 'react';

import {useIsMobile} from '../../../hooks/use-responsive.ts';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import RegisterForm from '../../forms/register-form.tsx';
import AuthSwitcher from './auth-switcher.tsx';
import LoginForm from '../../forms/login-form.tsx';

const AuthPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [isLoginPos, setIsLoginPos] = useState(true);

  const absoluteBoxStyle = useMemo(() => {
    if (isMobile) {
      if (isLoginPos) {
        return {
          top: 10,
          left: -15,
          transform: 'translateY(0)',
        };
      }
      return {
        top: 10,
        left: -15,
        transform: 'translateY(300px)',
      };
    } else {
      if (isLoginPos) {
        return {
          top: -50,
          left: 10,
          transform: 'translateX(0)',
        };
      }
      return {
        top: -50,
        left: 10,
        transform: 'translateX(calc(600px - 270px - 20px))',
      };
    }
  }, [isLoginPos, isMobile]);

  const handleClick = useCallback(() => {
    setIsLoginPos(!isLoginPos);
  }, [isLoginPos]);

  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      rowGap={2}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        padding: 1,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
        width: isMobile ? '80vw' : 600,
        height: isMobile ? 700 : 300,
        position: 'relative',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: isLoginPos ? 'center' : 'flex-start',
          zIndex: 1,
          borderRadius: 2,
          position: 'absolute',
          width: isMobile ? '110%' : '45%',
          height: isMobile ? 380 : 400,
          backgroundColor: 'secondary.light',
          transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          ...absoluteBoxStyle,
        }}>
        {isLoginPos ? <LoginForm /> : <RegisterForm />}
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

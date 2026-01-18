import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {LoginFormData} from '@/types';
import NarTextField from '../../ui-components/nar-textfield.tsx';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useAppDispatch} from '@/hooks/use-app-dispatch.ts';
import {login} from '@/redux/modules/auth/auth.actions.ts';
import {useIsMobile} from '@/hooks/use-responsive.ts';

const LoginForm: React.FC<{setIsLoginPos: (isLoginPos: boolean) => void}> = ({setIsLoginPos}) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const {handleSubmit, control} = useForm<LoginFormData>();

  const loginSubmit = useCallback(
    (data: LoginFormData) => {
      dispatch(login({email: data.email, password: data.password}));
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleSubmit(loginSubmit)}>
      <Stack height='100%' width='100%' justifyContent='space-between' alignItems='center' p={3}>
        <Typography textAlign='center' variant='h5' fontWeight={600}>
          CONNECTION
        </Typography>
        <Stack spacing={5}>
          <NarTextField
            rules={{
              required: 'L’email est requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format d’email invalide',
              },
            }}
            label='Email'
            name='email'
            control={control}
            placeholder='Email'
            isRequired
          />
          <NarTextField
            rules={{required: 'Le mot de passe est requis'}}
            label='Mot de passe'
            name='password'
            control={control}
            placeholder='Mot de passe'
            type='password'
            isRequired
            showPasswordToggle
          />
        </Stack>
        <Stack direction='column' spacing={1} justifyContent='center'>
          <Button type='submit' variant='outlined' sx={{border: 'none', alignSelf: 'center', marginTop: 1}}>
            Se connecter
          </Button>
          {isMobile && (
            <Stack direction='row' spacing={1} justifyContent='center' sx={{zIndex: 0}}>
              <Typography variant='inherit' sx={{fontSize: 16, textAlign: 'center'}}>
                Vous n'avez pas encore de compte ?{' '}
                <span
                  onClick={() => setIsLoginPos(false)}
                  style={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textDecoration: 'underline',
                  }}>
                  Inscrivez-vous
                </span>
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginForm;

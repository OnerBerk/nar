import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {LoginFormData} from '@/types/types.ts';
import NarTextField from '../../ui-components/nar-textfield.tsx';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {useAppDispatch} from '@/hooks/use-app-dispatch.ts';
import {login} from '@/redux/modules/auth/auth.actions.ts';
import {useIsMobile} from '@/hooks/use-responsive.ts';

const LoginForm: React.FC = () => {
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
      <Stack height={isMobile ? 250 : 400} width='100%' justifyContent='space-between' alignItems='center' p={3}>
        <Typography textAlign='center' variant='h5' fontWeight={600}>
          CONNECTION
        </Typography>
        <Box>
          <NarTextField
            rules={{
              required: 'L’email est requis',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format d’email invalide',
              },
            }}
            name='email'
            control={control}
            placeholder='Email'
            isRequired
          />
          <NarTextField
            rules={{required: 'Le mot de passe est requis'}}
            name='password'
            control={control}
            placeholder='Mot de passe'
            type='password'
            isRequired
            showPasswordToggle
          />
        </Box>
        <Button type='submit' variant='outlined' sx={{border: 'none', alignSelf: 'center', marginTop: 1}}>
          Se connecter
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;

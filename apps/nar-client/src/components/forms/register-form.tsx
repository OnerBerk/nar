import React, {useCallback} from 'react';

import {RegisterFormData} from '@/types/types.ts';

import {useForm} from 'react-hook-form';

import NarTextField from '@/ui-components/nar-textfield.tsx';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {register} from '@/redux/modules/auth/auth.actions';
import {Typography} from '@mui/material';
import {useIsMobile} from '@/hooks/use-responsive';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const {handleSubmit, control, watch} = useForm<RegisterFormData>();

  const password = watch('password');

  const registerSubmit = useCallback(
    (data: RegisterFormData) => {
      dispatch(
        register({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        })
      );
    },
    [dispatch]
  );

  return (
    <form onSubmit={handleSubmit(registerSubmit)}>
      <Stack height={isMobile ? 250 : 400} width='100%' justifyContent='space-between' alignItems='center' p={2}>
        <Typography textAlign='center' variant='h4'>
          Inscription
        </Typography>
        <Box>
          <NarTextField
            rules={{required: 'Le prénom est requis'}}
            name='firstname'
            control={control}
            placeholder='Prénom'
            isRequired
          />
          <NarTextField
            rules={{required: 'Le nom est requis'}}
            name='lastname'
            control={control}
            placeholder='Nom'
            isRequired
          />
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
            rules={{
              required: 'Le mot de passe est requis',
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$/,
                message:
                  'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et 8 caractères minimum.',
              },
            }}
            name='password'
            control={control}
            placeholder='Mot de passe'
            type='password'
            isRequired
            showPasswordToggle
          />
          <NarTextField
            rules={{
              required: 'La confirmation est requise',
              validate: (value) => value === password || 'Les mots de passe ne correspondent pas',
            }}
            name='confirmPassword'
            control={control}
            placeholder='Confirmer le mot de passe'
            type='password'
            isRequired
            showPasswordToggle
          />
        </Box>

        <Button type='submit' variant='outlined' sx={{border: 'none', alignSelf: 'center', marginTop: 1}}>
          S’inscrire
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;

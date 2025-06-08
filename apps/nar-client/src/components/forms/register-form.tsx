import React, { useCallback } from 'react';

import { RegisterFormData } from '@/types/types.ts';

import { useIsMobile } from '@/hooks/use-responsive.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import NarTextField from '@/ui-components/nar-textfield.tsx';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

interface Props {
  onSubmit: (data: RegisterFormData) => void;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const { handleSubmit, control, watch } = useForm<RegisterFormData>();

  const password = watch('password');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <Box width={isMobile ? '90vw' : '40vw'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} border={1} p={2} borderRadius={2} width="100%">
          <Typography textAlign="center" variant="h2">
            Inscription
          </Typography>

          <NarTextField
            rules={{ required: 'Le prénom est requis' }}
            name="firstname"
            control={control}
            placeholder="Prénom"
            isRequired
          />
          <NarTextField
            rules={{ required: 'Le nom est requis' }}
            name="lastname"
            control={control}
            placeholder="Nom"
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
            name="email"
            control={control}
            placeholder="Email"
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
            name="password"
            control={control}
            placeholder="Mot de passe"
            type="password"
            isRequired
            showPasswordToggle
          />
          <NarTextField
            rules={{
              required: 'La confirmation est requise',
              validate: (value) => value === password || 'Les mots de passe ne correspondent pas',
            }}
            name="confirmPassword"
            control={control}
            placeholder="Confirmer le mot de passe"
            type="password"
            isRequired
            showPasswordToggle
          />

          <Button type="submit" variant="outlined" sx={{ width: '50%', alignSelf: 'center' }}>
            S’inscrire
          </Button>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="inherit" sx={{ fontSize: 14 }} textAlign="center">
              Vous êtes déjà inscrit ?
            </Typography>
            <Link component="button" onClick={goToLogin}>
              <Typography
                variant="inherit"
                sx={{ fontSize: 12, color: 'secondary.main' }}
                textAlign="center"
              >
                Connectez-vous
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;

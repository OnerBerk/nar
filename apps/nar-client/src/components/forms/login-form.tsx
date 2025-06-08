import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData } from '@/types/types.ts';
import NarTextField from '../../ui-components/nar-textfield.tsx';
import { useIsMobile } from '@/hooks/use-responsive.ts';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm<LoginFormData>();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const goToRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <Box width={isMobile ? '90vw' : '40vw'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} border={1} p={2} borderRadius={2} width="100%">
          <Typography textAlign="center" variant="h2">
            Connexion
          </Typography>

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
            rules={{ required: 'Le mot de passe est requis' }}
            name="password"
            control={control}
            placeholder="Mot de passe"
            type="password"
            isRequired
            showPasswordToggle
          />

          <Button type="submit" variant="outlined" sx={{ width: '50%', alignSelf: 'center' }}>
            Se connecter
          </Button>

          <Stack direction="row" spacing={1} justifyContent="center">
            <Typography variant="inherit" sx={{ fontSize: 14 }}>
              Vous n’avez pas encore de compte ?
            </Typography>
            <Link component="button" onClick={goToRegister}>
              <Typography
                variant="inherit"
                sx={{ fontSize: 12, color: 'secondary.main' }}
                textAlign="center"
              >
                Inscrivez-vous
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;

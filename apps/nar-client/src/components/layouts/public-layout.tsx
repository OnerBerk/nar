import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={2} sx={{ position: 'absolute', right: 10, top: 10 }} direction="row">
        <Button onClick={() => navigate('/login')}>Connexion</Button>
        <Button onClick={() => navigate('/register')}>Inscription</Button>
      </Stack>
      <Outlet />
    </Box>
  );
};

export default PublicLayout;

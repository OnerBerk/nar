import React, {useMemo} from 'react';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {DateTime} from 'luxon';

import {Outlet} from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import logo from '../../assets/nar-logo.png';
import {Typography} from '@mui/material';
import {logout} from '@/redux/modules/auth/auth.actions';

const PrivateLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const currentYear = useMemo(() => {
    return DateTime.now().year;
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{
          borderBottom: 0.5,
          borderColor: 'primary.main',
          height: 70,
          p: 2,
          cursor: 'pointer',
        }}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Box component='img' src={logo} alt='logo' sx={{height: 50, width: 'auto'}} />
        </Box>
        <Box onClick={handleLogout} sx={{display: 'flex', alignItems: 'center', gap: 2}}>
          <Typography variant='h6' fontWeight={600}>
            Déconnexion
          </Typography>
        </Box>
      </Stack>
      <Stack p={2} height='100%'>
        <Outlet />
      </Stack>
      <Stack gap={1} direction='row' alignItems='center' justifyContent='center' sx={{height: 40, p: 2}}>
        <Typography variant='subtitle2' fontWeight={600}>
          ©
        </Typography>
        <Typography color='secondary.main' variant='subtitle2' fontWeight={600}>
          Nar
        </Typography>
        <Typography variant='subtitle2' fontWeight={600}>
          ÖnAir - {currentYear}
        </Typography>
      </Stack>
    </Box>
  );
};

export default PrivateLayout;

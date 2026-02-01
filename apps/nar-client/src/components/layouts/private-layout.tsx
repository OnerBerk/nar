import React, {useCallback, useMemo, useState} from 'react';

import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/stores';

import {DateTime} from 'luxon';

import {Outlet} from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import logo from '../../assets/nar-logo.png';
import LogoutIcon from '@mui/icons-material/Logout';

import {logout} from '@/redux/modules/auth/auth.actions';

const PrivateLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleOpenMenu = useCallback(() => {
    setIsOpenMenu(!isOpenMenu);
  }, [isOpenMenu, setIsOpenMenu]);

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
        }}
        onClick={handleOpenMenu}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Box component='img' src={logo} alt='logo' sx={{height: 50, width: 'auto'}} />
        </Box>

        <Stack direction='row' alignItems='center' gap={2} position='relative'>
          <Box width={50} height={50}>
            <Avatar
              sx={{
                backgroundColor: 'secondary.dark',
                color: 'text.secondary',
                width: '100%',
                height: '100%',
              }}>
              {user?.firstname.charAt(0).toUpperCase()}
            </Avatar>
            {isOpenMenu && (
              <Stack
                p={2}
                position='absolute'
                top={65}
                right={0}
                border={1}
                borderRadius={1}
                height={100}
                alignItems='center'
                sx={({palette}) => ({
                  backgroundColor: palette.background.paper,
                  borderColor: palette.primary.main,
                })}>
                <Box onClick={handleLogout} sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                  <Typography>Déconnexion</Typography>
                  <LogoutIcon fontSize='small' />
                </Box>
              </Stack>
            )}
          </Box>
        </Stack>
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

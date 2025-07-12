import React from 'react';

import Box from '@mui/material/Box';

import {Outlet} from 'react-router-dom';

const PublicLayout: React.FC = () => {
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
      }}>
      <Outlet />
    </Box>
  );
};

export default PublicLayout;

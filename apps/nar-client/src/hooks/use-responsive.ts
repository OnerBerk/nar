import { useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

const useResponsiveQuery = (query: string | ((theme: any) => string), options: Parameters<typeof useMediaQuery>[1] = {}) => {
  const theme = useTheme();
  const finalQuery = typeof query === 'function' ? query(theme) : query;
  return useMediaQuery(finalQuery, { noSsr: true, ...options });
};

export const useIsMobile = () => {
  const theme = useTheme();
  const [ready, setReady] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: typeof window !== 'undefined' ? window.innerWidth < theme.breakpoints.values.sm : false,
    noSsr: true,
  });

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? isMobile : false;
};

export const useIsTablet = () => useResponsiveQuery((theme) => theme.breakpoints.between('sm', 'md'));

export const useIsDesktop = () => useResponsiveQuery((theme) => theme.breakpoints.up('md'));

export const useIsLandscape = () => useResponsiveQuery('(orientation: landscape)');

export const useIsPortrait = () => useResponsiveQuery('(orientation: portrait)');

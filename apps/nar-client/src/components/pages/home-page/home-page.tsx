import React, {useCallback, useEffect} from 'react';

import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/stores';
import {getCustomStyles} from '@/styles/customStyles';

import {getMeasurements} from '@/redux/modules/measurements/measurements.actions';

import {useMediaQuery, useTheme} from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';

import narGreen from '@/assets/nar-vert.webp';
import narBlack from '@/assets/nar-noir.webp';
import graph from '@/assets/graph.webp';
import row from '@/assets/row.webp';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const styles = getCustomStyles();
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const user = useSelector((state: RootState) => state.auth.user);
  const measurements = useSelector((state: RootState) => state.measurements.measurements);

  const lastMeasurement = measurements?.[measurements.length - 1];
  const diffFromLastMeasurement = lastMeasurement
    ? ((lastMeasurement.weight - measurements[measurements.length - 2]?.weight) / 1000).toFixed(2)
    : 'N/A';

  const fetchMeasurements = useCallback(() => {
    dispatch(getMeasurements()).unwrap();
  }, [dispatch]);

  const navigateTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    fetchMeasurements();
  }, [fetchMeasurements]);

  return (
    <Stack p={2} alignItems='center' width='100%'>
      <Box width='100%' maxWidth={1500} sx={{flexGrow: 1}}>
        <Grid
          container
          borderColor='primary.dark'
          borderRadius={2}
          boxShadow={styles.shadows.card}
          overflow='hidden'
          sx={{
            height: '80vh',
            display: 'grid',
            gridTemplateRows: 'repeat(3, 1fr)',
            gridTemplateColumns: 'repeat(12, 1fr)',
            '& > *': {minHeight: 0},
          }}>
          <>
            <Grid sx={{gridColumn: 'span 4', overflow: 'hidden'}}>
              <Box
                component='img'
                src={narGreen}
                alt='Nar'
                sx={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block'}}
              />
            </Grid>
            <Grid
              sx={{gridColumn: 'span 5', cursor: 'pointer'}}
              role='button'
              tabIndex={0}
              onClick={() => navigateTo('/stats')}>
              <Box sx={{position: 'relative', width: '100%', height: '100%'}}>
                <Box
                  component='img'
                  src={graph}
                  alt='Stats'
                  sx={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block'}}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  }}>
                  <Typography variant='h2' color='common.white' textAlign='center' sx={{lineHeight: 1}}>
                    Stats
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid sx={{gridColumn: 'span 3'}}>
              <Grid
                container
                sx={{
                  height: '100%',
                  backgroundColor: '#c4dfe5',
                  display: 'grid',
                  gridTemplateRows: 'repeat(2, 1fr)',
                }}>
                {user?.BMR ? (
                  <>
                    <Grid size={12} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                      <Typography variant='h5' textAlign='center'>
                        {isMobile ? 'BMR' : 'Métabolisme de base'}
                      </Typography>
                      <Typography variant='h2' textAlign='center' sx={{lineHeight: 1}}>
                        {user?.BMR} kcal
                      </Typography>
                    </Grid>
                    <Grid size={12} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                      <Typography variant='h5' textAlign='center'>
                        {isMobile ? 'DEJ' : 'Dépense énergétique totale'}
                      </Typography>
                      <Typography variant='h2' textAlign='center' sx={{lineHeight: 1}}>
                        {user?.TDEE} kcal
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end'>
                    <Typography variant='h5' textAlign='center'>
                      Pas de données disponibles
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </>
          <>
            <Grid
              sx={{gridColumn: 'span 4', cursor: 'pointer'}}
              display='flex'
              alignItems='stretch'
              role='button'
              tabIndex={0}
              onClick={() => navigateTo('/measurements/list')}>
              <Grid
                container
                sx={{
                  width: '100%',
                  height: '100%',
                  flex: 1,
                  backgroundColor: 'background.paper',
                  display: 'grid',
                  gridTemplateRows: 'repeat(2, 1fr)',
                }}>
                {lastMeasurement ? (
                  <>
                    <Grid size={12} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                      <Typography variant='h5' textAlign='center'>
                        {isMobile ? 'Poids' : 'Dernière mesure'}
                      </Typography>
                      <Typography variant='h2' textAlign='center' sx={{lineHeight: 1}}>
                        {lastMeasurement?.weight ? lastMeasurement.weight / 1000 : 'N/A'} kg
                      </Typography>
                    </Grid>
                    <Grid size={12} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                      <Typography variant='h5' textAlign='center'>
                        {isMobile ? 'Diff - 1' : 'Différence avec la mesure précédente'}
                      </Typography>
                      <Typography variant='h2' textAlign='center' sx={{lineHeight: 1}}>
                        {diffFromLastMeasurement} kg
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <Grid display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end'>
                    <Typography variant='h5' textAlign='center'>
                      Pas de données disponibles
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid sx={{gridColumn: 'span 8', backgroundColor: '#c8ceee'}}>
              <Box width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
                <Typography variant='h1' textAlign='center' sx={{lineHeight: 1}}>
                  NAR
                </Typography>
              </Box>
            </Grid>
          </>
          <>
            <Grid sx={{gridColumn: 'span 6'}}>
              <Box
                component='img'
                src={row}
                alt='Row'
                sx={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block'}}
              />
            </Grid>
            <Grid
              sx={{gridColumn: 'span 2', cursor: 'pointer'}}
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              role='button'
              tabIndex={0}
              onClick={() => navigateTo('/measurements/create')}>
              <Typography variant='h4' textAlign='center' sx={{lineHeight: 1}}>
                Ajouter une mesure
              </Typography>
              <MonitorWeightIcon sx={{mt: 1, fontSize: '3rem', color: 'primary.main'}} />
            </Grid>
            <Grid sx={{gridColumn: 'span 4'}}>
              <Box
                component='img'
                src={narBlack}
                alt='Nar'
                sx={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block'}}
              />
            </Grid>
          </>
        </Grid>
      </Box>
    </Stack>
  );
};

export default HomePage;

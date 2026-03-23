import React, {useCallback, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {getMeasurements} from '@/redux/modules/measurements/measurements.actions';
import {RootState} from '@/redux/stores';
import WeightChart from '@/components/charts/weight-chart';
import MetricChart from '@/components/charts/metric-chart';

const StatsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const measurements = useSelector((state: RootState) => state.measurements.measurements);

  const fetchMeasurements = useCallback(() => {
    dispatch(getMeasurements())
      .unwrap()
      .then((items) => {
        if (!items || items.length === 0) {
          navigate('/measurements/create');
        }
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchMeasurements();
  }, [fetchMeasurements]);

  const sortedMeasurements = useMemo(
    () => [...(measurements ?? [])].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [measurements]
  );

  const xLabels = useMemo(
    () =>
      sortedMeasurements.map((m) => {
        const d = new Date(m.date);
        return Number.isNaN(d.getTime()) ? m.date : d.toLocaleDateString('fr-FR', {month: '2-digit', day: '2-digit'});
      }),
    [sortedMeasurements]
  );

  return (
    <Stack p={2} alignItems='center' width='100%'>
      <Box
        width='100%'
        maxWidth={1500}
        sx={{
          display: 'grid',
          gap: 2,
          height: '70vh',
          minHeight: 0,
          gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
          gridTemplateRows: {xs: '1fr 1fr 1fr', md: '1fr 1fr'},
          gridTemplateAreas: {
            xs: `
              "top"
              "left"
              "right"
            `,
            md: `
              "top top"
              "left right"
            `,
          },
        }}>
        <Box sx={{gridArea: 'top', minHeight: 0}}>
          <Typography variant='h4' textAlign='center' mb={1}>
            Stats
          </Typography>
          <Box
            sx={{
              height: 'calc(100% - 40px)',
              minHeight: 0,
              bgcolor: 'background.paper',
              p: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant='h5' mb={1}>
              Poids
            </Typography>
            <Box sx={{flex: 1, minHeight: 0}}>
              <WeightChart
                points={measurements?.map((m) => ({date: m.date, weight: m.weight}))}
                yMinOffsetKg={2}
                tickStepKg={0.5}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            gridArea: 'left',
            minHeight: 0,
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant='h5' mb={1}>
            Taille / Ventre / Poitrine
          </Typography>
          <Box sx={{flex: 1, minHeight: 0}}>
            <MetricChart
              dates={xLabels}
              unit='cm'
              tickStep={5}
              series={[
                {label: 'Taille (cm)', data: sortedMeasurements.map((m) => m.height)},
                {label: 'Ventre (cm)', data: sortedMeasurements.map((m) => m.belly_waist)},
                {label: 'Poitrine (cm)', data: sortedMeasurements.map((m) => m.chest)},
              ]}
            />
          </Box>
        </Box>

        <Box
          sx={{
            gridArea: 'right',
            minHeight: 0,
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Typography variant='h5' mb={1}>
            Cuisse / Bras
          </Typography>
          <Box sx={{flex: 1, minHeight: 0}}>
            <MetricChart
              dates={xLabels}
              unit='cm'
              tickStep={5}
              series={[
                {label: 'Cuisse (cm)', data: sortedMeasurements.map((m) => m.thigh)},
                {label: 'Bras (cm)', data: sortedMeasurements.map((m) => m.arm)},
              ]}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default StatsPage;

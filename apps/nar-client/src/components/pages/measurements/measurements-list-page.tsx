import React, {useCallback} from 'react';

import {Measurements} from '@/types/measurements.types';

import {DataGrid, GridRenderCellParams} from '@mui/x-data-grid';
import formatDate from '@/formaters/date-formater';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

interface MeasurementsListPageProps {
  measurements: Measurements[];
}

const MeasurementsListPage: React.FC<MeasurementsListPageProps> = ({measurements}) => {
  const navigate = useNavigate();

  const columns = [
    {
      field: 'date',
      headerName: 'Date',
      renderCell: (params: GridRenderCellParams) => formatDate(params.value as string),
      flex: 1,
    },
    {
      field: 'weight',
      headerName: 'Poids (kg)',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => `${params.value / 100}`,
    },
    {field: 'height', headerName: 'Taille (cm)', flex: 1},
    {field: 'waist', headerName: 'Tour de taille (cm)', flex: 1},
    {field: 'thigh', headerName: 'Tour de cuisse (cm)', flex: 1},
    {field: 'arm', headerName: "Tour d'avant-bras (cm)", flex: 1},
    {field: 'chest', headerName: 'Tour de poitrine (cm)', flex: 1},
  ];

  const handleAddMeasurement = useCallback(() => {
    navigate('/measurements/create');
  }, [navigate]);

  return (
    <Stack width='100%' height='100%' overflow='auto' alignItems='center'>
      <Box width='100%' display='flex' py={2}>
        <Button variant='contained' sx={{fontSize: '1rem'}} onClick={handleAddMeasurement}>
          Ajouter une mesure
        </Button>
      </Box>
      <Paper sx={{p: 2, width: '100%'}}>
        <DataGrid
          rows={measurements}
          columns={columns}
          sx={(theme) => ({
            '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
              backgroundColor: `${theme.palette.secondary.dark} !important`,
              color: theme.palette.text.secondary,
              fontSize: '1rem',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '0.8rem',
            },
          })}
        />
      </Paper>
    </Stack>
  );
};

export default MeasurementsListPage;

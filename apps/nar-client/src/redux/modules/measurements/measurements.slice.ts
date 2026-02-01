// src/store/auth/auth.slice.ts
import {createSlice} from '@reduxjs/toolkit';
import {Measurements} from '@/types';
import {createMeasurement, getMeasurements} from './measurements.actions';

type MeasurementsState = {
  measurements: Measurements[] | undefined;
  loading: boolean;
  error: string | null;
};

const initialState: MeasurementsState = {
  measurements: undefined,
  loading: false,
  error: null,
};

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE MEASUREMENT
    builder.addCase(createMeasurement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMeasurement.fulfilled, (state, action) => {
      state.loading = false;
      state.measurements?.push(action.payload);
    });
    builder.addCase(createMeasurement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // GET MEASUREMENTS
    builder.addCase(getMeasurements.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMeasurements.fulfilled, (state, action) => {
      state.loading = false;
      state.measurements = action.payload;
    });
    builder.addCase(getMeasurements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default measurementsSlice.reducer;

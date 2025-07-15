// src/store/auth/auth.slice.ts
import {createSlice} from '@reduxjs/toolkit';
import {register, login, logout} from './auth.actions';
import {NarUser} from '../../../types/types.ts';

const localToken = localStorage.getItem('token');

type AuthState = {
  user: NarUser | undefined;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: undefined,
  loading: false,
  error: null,
  isAuthenticated: localToken ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = undefined;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;

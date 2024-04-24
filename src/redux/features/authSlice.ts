/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../config/index';
import localStorageService from '../../../src/libs/localStorage.service';
// import { persistor } from '../store';

export const loginUser = createAsyncThunk(
  '/login',
  async (user: any, { rejectWithValue }) => {
    try {
      console.log('user', user);
      const data = await axios.put(`${API_BASE_URL}/entrance/login`, {
        username: user.username,
        password: user.password,
        isWebLogin: user.isWebLogin,
        loginSession: user?.loginSession,
      });
      return data;
    } catch (error: any) {
      console.log('error .....', error);
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (emailAddress: any, { rejectWithValue }: any) => {
    try {
      let token = JSON.parse(localStorageService.getItem('token') || '') || '';

      const data = await axios.post(
        `${API_BASE_URL}/logout-user`,
        {
          emailAddress: emailAddress,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('data from logout user', data);
      console.log('user logged out');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.removeItem('login_session');
      return { success: true, data: data };
    } catch (error: any) {
      console.log('error .....', error);
      return rejectWithValue(error);
    }
  }
);

const initialState: any = {
  data: [],
  status: null,
  loading: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: any) => {
      state.status = 'Pending';
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state: any, action: any) => {
      state.status = 'Fulfilled';
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state: any) => {
      state.status = 'Rejected';
      state.loading = false;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.status = 'Pending';
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (_state: any) => {
      return initialState;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.status = 'Rejected';
      state.loading = false;
    });
  },
});
// export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

/** @format */

import { RootState } from './store';

export const authSelector = (state: RootState) => state.auth;
export const snackbarSelector = (state: RootState) => state.snackbar;

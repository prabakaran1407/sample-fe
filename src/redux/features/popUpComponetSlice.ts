/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IPopUpCompProps {
  open: boolean
  component: any
}

const initialState: IPopUpCompProps = {
  open: false,
  component: () => {},
}

export const popUpComponentSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openComponet: (state, action: PayloadAction<IPopUpCompProps>) => {
      state.open = action.payload.open
      state.component = action.payload.component
    },
    closeComponet: (state) => {
      state.open = false
      state.component = () => null
    },
  },
})

// Action creators are generated for each case reducer function
export const { openComponet, closeComponet } = popUpComponentSlice.actions

export default popUpComponentSlice.reducer

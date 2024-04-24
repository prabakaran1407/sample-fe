/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import * as React from 'react';
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

interface IDatePickerProps extends DatePickerProps<any> {
  InputLabelProps?: Record<string, any>;
  defaultProps?: Record<string, any>;
  renderInput?: any;
  minDate?: any;
  maxDate?: any;
  textFieldProps?: Record<any, any>;
  error?: boolean;
}

export const Datepicker: React.FC<IDatePickerProps> = (
  props: IDatePickerProps
) => {
  const [open, setOpen] = React.useState(false);
  const defaultProps: Record<string, any> | any = {
    label: 'Date',
    InputLabelProps: {
      shrink: true,
    },
  };
  const defaultStyleProps: Record<string, any> = {
    sx: props?.sx ? props?.sx : {},
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={["DatePicker"]}> */}
      <DatePicker
        // open={open}
        {...defaultProps}
        {...props}
        sx={{
          ...defaultStyleProps?.sx,
          '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
            // height: "0.4em",
            height: 6,
            width: '100%',
          },
        }}
        slotProps={{
          textField: {
            InputLabelProps: { shrink: true },
            ...props?.textFieldProps,
            onClick: () => {
              setOpen(!open);
            },
            onChange: () => {
              setOpen(!open);
            },
          },
          actionBar: {
            actions: ['clear'],
          },
        }}
      />
      {/* </DemoContainer> */}
    </LocalizationProvider>
  );
};

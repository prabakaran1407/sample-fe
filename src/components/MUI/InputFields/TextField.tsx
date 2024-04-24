/**
 * eslint-disable react-refresh/only-export-components
 *
 * @format
 */

/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { InputBase, TextField, TextFieldProps, alpha } from "@mui/material";
import { styled } from "@mui/system";
// ************* Types
import { TNestedObj } from "../../../types/global.types.ts";
import { FC } from "react";

export const TextField_v1 = styled(TextField)(({}: TNestedObj) => ({
  borderRadius: 0,
  width: "100%",
}));

// interface ITextFieldProps extends TextFieldProps {}
export const Textfield: FC<TextFieldProps> = (props: TextFieldProps) => {
  const defaultProps: TextFieldProps = {
    size: "small",
  };
  return (
    <TextField
      {...defaultProps}
      {...props}
      // InputLabelProps={{
      //   shrink: true,
      // }}
    />
  );
};

export const TextField_v2 = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(0),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1A2027",
    // border: "1px solid",
    // borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    padding: "8px 13px",
    // transition: theme.transitions.create([
    //   'border-color',
    //   'background-color',
    //   'box-shadow',
    // ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    "&::placeholder": {
      color: "#969696",
      opacity: 1,
    },
  },
}));

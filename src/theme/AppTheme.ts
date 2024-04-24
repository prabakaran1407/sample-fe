import { createTheme, colors } from "@mui/material";
import { COLORS } from "../utils/globals.ts";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    // MuiInput: {
    //   styleOverrides: {
    //     root: {
    //       defaultProps: {
    //         // Disable wheel scrolling on the input
    //         onWheel: (e:any) => e.preventDefault(),
    //       },
    //       // Disable spinner
    //       '&[type="number"]': {
    //         '-moz-appearance': 'textfield', // For Firefox
    //         '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
    //           '-webkit-appearance': 'none',
    //           margin: 0,
    //         },
    //       },
    //     },

    //   },
    // },

    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       // Customize the root style of the TextField
    //       backgroundColor: '#f0f0f0',
    //       borderRadius: '8px',
    //       // '&:hover': {
    //       //   backgroundColor: 'red',
    //       // },
    //       '&:disabled': {
    //         // Customize the style when the TextField is disabled
    //         backgroundColor: 'red', // Example: Lighter gray background for disabled state
    //         color: '#000000', // Example: Dim text color for disabled state
    //         // Add more styles as needed
    //         opacity: 10,
    //       },
    //     },
    //   },
    // },
  },
  // typography: {
  //   allVariants: {
  //     color: "#ffffff"
  //   },
  // },
  typography: {
    fontFamily:
      // eslint-disable-next-line max-len
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      main: COLORS.primary,
      light: COLORS.primary,
      dark: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
      dark: COLORS.secondary,
      light: COLORS.secondary,
    },
    error: {
      main: colors.red["500"],
      dark: colors.red["800"],
      light: colors.red["300"],
    },
    action: {
      activatedOpacity: 0.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  zIndex: {
    appBar: 1100,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

export const ALLCOLORS = {
  ...colors,
};

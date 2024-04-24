/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// *********** MUI
import { Paper } from "@mui/material";
import { theme } from "../../../theme/AppTheme";

export const PaperContainer = ({ children }: any) => {
  return (
    <Paper
      sx={{
        // padding: "10px 10px 10px 10px",
        height: "100%",
        width: "100%",
        // opacity: `${theme.palette.action.activatedOpacity}`,
        // borderRadius: 2,
        background: "#E9EAEE",
        display: "flex",
        flexWrap: "wrap",
        // border: "2px solid black",
      }}
    >
      {children}
    </Paper>
  );
};

export const PaperContainerV2 = ({ styles, children }: any) => {
  return (
    <Paper
      sx={{
        padding: "10px 10px 10px 10px",
        height: "100%",
        width: "100%",
        opacity: `${theme.palette.action.activatedOpacity}`,
        borderRadius: 2,
        // background: 'green',
        display: "flex",
        flexWrap: "wrap",
        // border: "2px solid black",
        ...styles,
      }}
    >
      {children}
    </Paper>
  );
};

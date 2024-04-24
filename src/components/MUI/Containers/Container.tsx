/* eslint-disable @typescript-eslint/no-explicit-any */

// ************************* MUI
import { CssBaseline } from "@mui/material";

// *********************** Component
import { ContainerBox } from "../Box/Box";

export const ContainerWrapper = ({ children }: any) => {
  return (
    <>
      <CssBaseline />

      <ContainerBox component="div" id="main-container">
        {children}
      </ContainerBox>
    </>
  );
};

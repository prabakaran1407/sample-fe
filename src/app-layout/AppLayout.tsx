/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

// ******************* components
import { ContainerWrapper } from "../components/MUI/mui.index";

// **************** MUI

// ************* Layout component
import AppSideBar from "./AppSideBar/AppSideBar";
import { useNavigate } from 'react-router-dom'
import RBACService from '../utils/RBAC.ts'
import { APP_ROUTES } from '../data/AppRoutes.ts'
import { enqueueSnackbar } from "notistack";
// For overflow style

export default function AppLayout() {
  const navigate = useNavigate()
  const [, seWH] = useState({
    height: `${window.innerHeight}px`,
    width: `${window.innerWidth}px`,
  });

  useEffect(() => {
    seWH({
      height: `${window.innerHeight}px`,
      width: `${window.innerWidth}px`,
    });
    if(!RBACService?.CHECK_LOGIN_TOKEN()){
      // toast.info('Please login')
      enqueueSnackbar('Please login', {
        variant: 'info'
      })
      navigate(APP_ROUTES?.SIGN_IN?.pathName)
    }

  }, []);

  return (
    <>
      <ContainerWrapper>
        {/* <PaperContainer> */}
        {/* <Grid
            container
            xs={12}
            spacing={1}
            sx={{ height: "100%" }}
          > */}
        {/* <Grid container item xs={12}>
              ************************ | Top Bar|
              <AppTopBar />
            </Grid> */}
        {/* <Grid xs={12} container item sx={{ height: "100%" }}> */}
        {/* <Grid container item xs={12} xl={12} sx={GRIDSX}> */}
        {/* ************************* | SideBar| **********  */}
        {/* <Box sx={{ background: "red" }}> */}
        <AppSideBar />
        {/* </Box> */}

        {/* </Grid> */}
        {/* <Grid container item xs={10} xl={11} sx={GRIDSX}> */}
        {/* ************************* | Container | **********  */}
        {/* <AppContainer /> */}
        {/* </Grid> */}
        {/* </Grid> */}
        {/* </Grid> */}
        {/* </PaperContainer> */}
      

      </ContainerWrapper>
    </>
  );
}

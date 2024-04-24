/** @format */

import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { theme } from "../../../theme/AppTheme";

// ************** Icons

import { MyDrawer } from "../mui.index";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import noresult from "../../../assets/png/no-results.png";
import { Box } from "@mui/material";
import { COLORS } from "../../../utils/globals.ts";

interface CustomizedMenusProps {
  value(value: any, arg1: string): unknown;
  services: string | string[];
}

export default function CustomizedMenus(props: CustomizedMenusProps | any) {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
  // const toggleDrawer =
  //   (anchor: Anchor, open: boolean) =>
  //   (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event.type === "keydown" &&
  //       ((event as React.KeyboardEvent).key === "Tab" ||
  //         (event as React.KeyboardEvent).key === "Shift")
  //     ) {
  //       return;
  //     }

  //     setState({ ...state, [anchor]: open });

  //   };

  // const list = (anchor: Anchor) => (
  //   <Box
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //     sx={{
  //       padding: 2,
  //     }}
  //   >
  //     <Grid xs={12} container spacing={2}>
  //       <Grid xs={12} container item>
  //         <Typography marginTop={"80px"} textAlign={"left"} variant="h6">
  //           Services:
  //         </Typography>
  //       </Grid>
  //       <CustomDivier />
  //       <Grid xs={12} container item sx={{ color: theme?.palette?.primary?.light}}>
  //         {props?.data?.billingdetailsitems?.map(
  //           (option: any, _index: number) => (
  //             <>
  //               <Grid xs={2} item>
  //                 <ShapeLineIcon  color="primary" sx={{ fontSize: '15px'}} />
  //               </Grid>
  //               <Grid xs={10} item>
  //                 <Typography
  //                   variant="subtitle2"
  //                 >
  //                   {option?.parentmodules?.moduleName}
  //                 </Typography>
  //               </Grid>
  //             </>
  //           )
  //         )}
  //       </Grid>
  //     </Grid>
  //   </Box>
  // );

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <ButtonGroup variant="outlined">
          {(["right"] as const).map((anchor) => (
            <Button
              key={anchor}
              onClick={() => setDrawerOpen(true)}
              sx={{
                border: `1px solid ${COLORS.primary}`,
                color: COLORS.primary,
              }}
            >
              View
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {(["right"] as const).map((_anchor: any) => (
        <MyDrawer
          anchor={"right"}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onClose={undefined}
          onOpen={() => {
            undefined;
          }}
          drawerWidth="25%"
          title="Modules"
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {props?.data?.billingdetailsitems &&
            props?.data?.billingdetailsitems?.length > 0 ? (
              props?.data?.billingdetailsitems?.map(
                (option: any, _index: number) => (
                  <div
                    style={{
                      width: "100%",
                      color: theme?.palette?.primary?.light,
                      padding: "5px",
                      borderRadius: 5,
                      background: `rgba(191, 186, 233, 1)`,
                      textAlign: "center",
                      margin: "1px",
                    }}
                  >
                    <Typography variant="subtitle2">
                      {option?.parentmodules?.moduleName}
                    </Typography>
                  </div>
                )
              )
            ) : (
              <div
                style={{
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                  height: "100%",
                }}
              >
                <LazyLoadImage
                  src={noresult}
                  style={{
                    // ...customStyle,
                    width: "90%",
                    height: "60%",
                    flexWrap: "wrap",
                  }}
                />
                <Typography variant="subtitle2">No modules found</Typography>
              </div>
            )}
          </div>
        </MyDrawer>
      ))}
    </React.Fragment>
  );
}

/** @format */

import { useMemo, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AttachMoney, Flight, Hotel } from "@mui/icons-material";
import { COLORS } from "../../../../../utils/globals.ts";
import FixedAmountAllocation from "./FixedAmount/page.tsx";
import TravelAmountAllocation from "./TravelAmount/page.tsx";
import RoomRentalAmountAllocation from "./RoomRentalAmount/page.tsx";

function AmountAllocation() {
  const [activeBox, setActiveBox] = useState<any>(0);

  const SelectedMenuPage = () => {
    switch (activeBox) {
      case 0:
        return FixedAmountAllocation;
      case 1:
        return TravelAmountAllocation;
      case 2:
        return RoomRentalAmountAllocation;
      default:
        return FixedAmountAllocation;
    }
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activeBox]
  );

  return (
    <>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container rowSpacing={2} columnSpacing={5}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "70px",
                    background: activeBox === 0 ? COLORS.primary : "#FFFFFF",
                    border: "2px solid #efefef",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => setActiveBox(0)}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: activeBox === 0 ? "#FFFFFF" : "#5E6278",
                    }}
                    px={2}
                  >
                    Fixed Amount
                    <br />
                    Allocation
                  </Typography>
                  <AttachMoney sx={{ fontSize: 34, color: "#FFC700", mx: 2 }} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "70px",
                    background: activeBox === 1 ? COLORS.primary : "#FFFFFF",
                    border: "2px solid #efefef",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => setActiveBox(1)}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: activeBox === 1 ? "#FFFFFF" : "#5E6278",
                    }}
                    px={2}
                  >
                    Travel Amount
                    <br />
                    Allocation
                  </Typography>
                  <Flight sx={{ fontSize: 34, color: "#FFC700", mx: 2 }} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "70px",
                    background: activeBox === 2 ? COLORS.primary : "#FFFFFF",
                    border: "2px solid #efefef",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => setActiveBox(2)}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: activeBox === 2 ? "#FFFFFF" : "#5E6278",
                    }}
                    px={2}
                  >
                    Room Rental Amount
                    <br />
                    Allocation
                  </Typography>
                  <Hotel sx={{ fontSize: 34, color: "#FFC700", mx: 2 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <SelectedPageContent />
        </Grid>
      </Grid>
    </>
  );
}

export default AmountAllocation;

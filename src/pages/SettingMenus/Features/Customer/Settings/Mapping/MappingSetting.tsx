/** @format */

import { useMemo, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AttachMoney, Flight, Hotel } from "@mui/icons-material";
import { COLORS } from "../../../../../../utils/globals.ts";

// tab components
import UserMapping from "./1-User/UserMapping";
import CustomerMapping from "./2-Customer/CustomerMapping";
import BillingPartyMapping from "./3-BillingParty/BillingPartyMapping";
import { useAppSelector } from "../../../../../../hooks/index.ts";

function UserCustomerBillingMappingSetting() {
  const [activeBox, setActiveBox] = useState<any>(0);
  const AUTH = useAppSelector((state) => state?.auth);

  const SelectedMenuPage = () => {
    switch (activeBox) {
      case 0:
        return UserMapping;
      case 1:
        return CustomerMapping;
      case 2:
        return BillingPartyMapping;
      default:
        return UserMapping;
    }
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activeBox]
  );

  return (
    <>
      <Grid container rowSpacing={1}>
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
                    User Mapping
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
                    Customer Mapping
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
                    Billing Party Mapping
                  </Typography>
                  <Hotel sx={{ fontSize: 34, color: "#FFC700", mx: 2 }} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <SelectedPageContent AUTH={AUTH} />
        </Grid>
      </Grid>
    </>
  );
}

export default UserCustomerBillingMappingSetting;

/** @format */

import { useState, useMemo } from "react";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************* MUI
import { Grid, Typography } from "@mui/material";

// ***************** Icons
import {
  AccountBalanceWallet,
  Commute,
  LocalGasStation,
  Payments,
  PinDrop,
} from "@mui/icons-material";

import ClaimType from "./ClaimType/page.tsx";
import ModeOfTransport from "./ModeOfTransport/page.tsx";
import SplitSubCategory from "./SplitSubCategory/page.tsx";
import CityGrading from "./CityGrading/page.tsx";
import AmountAllocation from "./AmountAllocation/page.tsx";

function ClaimSettings() {
  const CLAIM_TAB_MENU = useMemo(() => {
    return [
      {
        label: "Claim Type",
        icon: <AccountBalanceWallet fontSize="small" />,
      },
      {
        label: "Mode Of Transport",
        icon: <Commute fontSize="small" />,
      },
      {
        label: "Split Sub Category",
        icon: <LocalGasStation fontSize="small" />,
      },
      {
        label: "City Grading",
        icon: <PinDrop fontSize="small" />,
      },
      {
        label: "Amount Allocation",
        icon: <Payments fontSize="small" />,
      },
    ];
  }, []);

  // ******************** Claim settings menus

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return ClaimType;
      case 1:
        return ModeOfTransport;
      case 2:
        return SplitSubCategory;
      case 3:
        return CityGrading;
      case 4:
        return AmountAllocation;
      default:
        return ClaimType;
    }
  };

  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12} rowSpacing={3}>
          <Grid item xs={12} sx={{ borderBottomColor: "black" }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Claim Management Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TabMenus
              tabMenus={CLAIM_TAB_MENU}
              selectedTab={handleTabSelect}
              value={activatedTab}
              variant="scrollable"
              scrollButtons="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectedPageContent />
          </Grid>
        </Grid>
      </ContainerBoxV2>
    </>
  );
}

export default ClaimSettings;

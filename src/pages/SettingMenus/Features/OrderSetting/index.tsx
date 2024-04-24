/** @format */

import { useState, useMemo, FC } from "react";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************* MUI
import { Grid, Typography } from "@mui/material";

// ************* Settings component
import PrimaryStatus from "./PrimaryStatus";
import SecondaryStatus from "./SecondaryStatus";

function OrderSetting() {
  const tabs = [
    {
      label: "Primary Status",
    },
    {
      label: "Secondary Status",
    },
  ];

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return PrimaryStatus;
      case 1:
        return SecondaryStatus;
      default:
        return PrimaryStatus;
    }
  };
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };

  const SelectedPageContent: FC<any> = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12} rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Order Settings
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ background: "#FEFEFE" }}>
            <TabMenus
              tabMenus={tabs}
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

export default OrderSetting;

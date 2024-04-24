/** @format */

import { useState, useMemo, FC } from "react";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************* MUI
import { Grid, Typography } from "@mui/material";

// ************* Settings component
import GeneralDesignation from "./Designation/page";
import GeneralDepartment from "./Department/page";
import ProductPriceType from "./Productpricetype/page";
import GeneralLogistics from "./Logistics/page";

function GeneralSettings() {
  const [tabs, _setTab] = useState([
    {
      label: "Designation",
    },
    {
      label: "Department",
    },
    {
      label: "Logistics",
    }
    // {
    //   label: "Product Price Type",
    // },
  ]);

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return GeneralDesignation;
      case 1:
        return GeneralDepartment;
      case 2:
        return GeneralLogistics;
      case 3:
        return ProductPriceType;
      default:
        return GeneralDesignation;
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
              General Settings
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

export default GeneralSettings;

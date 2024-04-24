/** @format */

import { useState, useMemo } from "react";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************* MUI
import { Grid, Typography } from "@mui/material";

// ************* Settings component
// import GeneralDesignation from './Designation/page'
// import GeneralDepartment from './Department/page'
// import leadType from './leadType/page';
import leadStatus from "./status/page";
import leadPriority from "./priority/page";
import leadSource from "./sourceType/page";

function LeadManagementSettings() {
  const [tabs, _setTab] = useState([
    // {
    //   label: "Lead Type",
    // },
    {
      label: "Status Type",
    },
    {
      label: "Priority Type",
    },
    {
      label: "Source Type",
    },
  ]);

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      // case 0:
      //   return leadType ;
      case 0:
        return leadStatus;
      case 1:
        return leadPriority;
      case 2:
        return leadSource;
      default:
        return <></>;
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
              Lead Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
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

export default LeadManagementSettings;

/** @format */

import { useState, useMemo } from "react";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************* MUI
import { Grid, Typography } from "@mui/material";

// ************* Settings component
// import GeneralDesignation from './Designation/page'
// import GeneralDepartment from './Department/page'
import page from "./Task-type/page";
import Status from "./status/page";
import Priority from "./Priority/page";

function TaskManagementSettings() {
  const [tabs, _setTab] = useState([
    {
      label: "Task Type",
    },
    {
      label: "Status",
    },
    {
      label: "Priority",
    },
  ]);

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return page;
      case 1:
        return Status;
      case 2:
        return Priority;

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
        <Grid container xs={12} rowSpacing={1.5}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Task Settings
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

export default TaskManagementSettings;

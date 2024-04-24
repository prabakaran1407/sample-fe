/** @format */

import { useState, useMemo, useEffect } from "react";

// ************* MUI
import { Grid, Typography } from "@mui/material";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************ services
import SettingService from "../../../../services/settings/settings.service.ts";

// ********** Utils
import { GET_CONST_FROM_AUTH } from "../../../../utils/index.ts";

// ***************** Icons

import Person4Icon from "@mui/icons-material/Person4";
// import Person3Icon from '@mui/icons-material/Person3';
// import Person2Icon from '@mui/icons-material/Person2';
// import PersonIcon from '@mui/icons-material/Person';

import activeIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

// ********* Hooks
import { useAppSelector } from "../../../../hooks/index";

import AddEditViewHierarchy from "./add-edit-view/AddEditViewHierarchy";

export const DeactiveIcon = DeleteIcon;
export const ActiveIcon = activeIcon;

function HierarchyMappingSetting() {
  const AUTH = useAppSelector((state) => state?.auth);
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  const [tabs, setTabs] = useState<Record<string, any>[]>([]);
  const [selectedOption, setSelectedOption] = useState<Record<string, any>>({})
  // ******************** Product settings menus

  // const SelectedMenuPage = () => {
  //   switch (activatedTab) {
  //     case 0:
  //       return <></>;
  //     default:
  //       return <></>;
  //   }
  // };

  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setSelectedOption(tabs[selection])
    setActivatedTab(selection);
  };

  // const SelectedPageContent: any = useMemo(
  //   () => SelectedMenuPage(),
  //   [activatedTab]
  // );

  const getDesignation = async () => {
    try {
      let payload = {
        matchObj: {
          isActive: true,
          settingsType: CONSTANT_DATA?.SETTING_TYPES[1],
          subTypes: CONSTANT_DATA?.SETTING_SUB_TYPES[1],
        },
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let listRes = await SettingService.list(payload, "?isCount=false");
      listRes = listRes?.data
      console.log('listRes >>>>>>>>>', listRes)
      if (listRes?.status) {
        let filterData: Record<string, any>[] | any = listRes?.response?.data?.data.map((element: Record<string, any>) => ({
          label: element?.value,
          data: element,
          icon: <Person4Icon fontSize="small" />,
        }))
        setTabs([...filterData])
        setSelectedOption(filterData[0])
      }
      console.log("listRes data", listRes);
    } catch (error) {
      console.log('ERROR', error)
    }
  };
  useEffect(() => {
    getDesignation();
  }, []);
  return (
    <>
      <ContainerBoxV2 styles={{ padding: "2px 0px" }}>
        <Grid container xs={12}>
          <Grid
            item
            xs={2}
            sx={{ borderBottomColor: "black" }}
            justifyContent={"flex-start"}
          >
            <Typography
              variant="body1"
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                fontWeight: "600",
                padding: "0%",
              }}
            >
              {"Hierarchy Mapping"}
            </Typography>
          </Grid>
          <Grid item xs={10} sx={{ width: "300px" }}>
            <TabMenus
              tabMenus={tabs}
              selectedTab={handleTabSelect}
              value={activatedTab}
              variant="scrollable"
              scrollButtons="auto"
            />
          </Grid>
          <Grid item xs={12}>
            <AddEditViewHierarchy
              selectedOption={selectedOption}
              AUTH={AUTH}
              CONSTANT_DATA={CONSTANT_DATA}
            />
          </Grid>
        </Grid>
      </ContainerBoxV2>
    </>
  );
}

export default HierarchyMappingSetting;

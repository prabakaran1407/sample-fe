/** @format */

import {

  ContainerBoxV2,
  TabMenus,
} from "../../../../components/MUI/mui.index";
import Typography from "@mui/material/Typography";
import {

  Stack,

  Grid,

} from "@mui/material";
import  { useMemo } from "react";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";

import { getUserListForAdmin } from "../../../../components/com_components/CustomerSettingsAPI.tsx";

import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatIcon from "@mui/icons-material/Repeat";
import RecurringTarget from "./Tabs/RecurringTarget.tsx";
import OneTimeTarget from "./Tabs/OneTimeTarget.tsx";

// interface Task {
//   priority: any;
//   taskStatus: any;
//   _id: string;
//   organization_id: string;
//   taskType: string;
//   status: string;
// }

const SalesTarget = () => {
  const TAB_MENUS = useMemo(() => {
    return [
      {
        label: "One Time",
        icon: <RepeatOneIcon fontSize="small" />,
      },
      {
        label: "Recurring",
        icon: <RepeatIcon fontSize="small" />,
      },
    ];
  }, []);

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return OneTimeTarget;
      case 1:
        return RecurringTarget;

      default:
        return OneTimeTarget;
    }
  };

  const [_assigneeOptions, setAssigneeOptions] = useState([]);
  const auth = useAppSelector((state) => state.auth);

  let organization_id = auth?.data?.userRecord?.organization_id;

  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );

  const getUserData = async () => {
    await getUserListForAdmin(organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setAssigneeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <ContainerBoxV2 styles={{ position: "sticky", zIndex: 999 }}>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Target
              </Typography>
            </Stack>

            <Grid item xs={12}>
              <TabMenus
                tabMenus={TAB_MENUS}
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
        </Grid>
      </ContainerBoxV2>
    </>
  );
};

export default SalesTarget;

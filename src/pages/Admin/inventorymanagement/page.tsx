import { Grid, Typography } from "@mui/material";
import { Route, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { ContainerBoxV2 } from "../../../../src/components/MUI/Box/Box";
import { TabMenus } from "../../../../src/components/MUI/Tabs/Tabs";
import Warehouse from "./WareHouseSettings/WareHouse/Warehouse";
import WarehouseMapping from "./WareHouseSettings/Mapping/WarehouseMapping";

const InventoryManagement = () => {
  const PROD_TAB_MENU = useMemo(() => {
    return [
      {
        label: "Create Warehouse",
        icon: <Store />,
      },
      {
        label: "Mapping",
        icon: <Route />,
      },
    ];
  }, []);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return Warehouse;
      case 1:
        return WarehouseMapping;

      default:
        return Warehouse;
    }
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );

  return (
    <ContainerBoxV2>
      <Grid container xs={12} rowSpacing={3}>
        <Grid item xs={12} sx={{ borderBottomColor: "black" }}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Inventory Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TabMenus
            tabMenus={PROD_TAB_MENU}
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
  );
};

export default InventoryManagement;

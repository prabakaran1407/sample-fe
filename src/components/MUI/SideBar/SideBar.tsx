// ************ MUI
// import { MuiDrawer } from '@mui/material'

// component *********************
import { SideBarBox } from "../Box/Box";
// import { SideBarMenus } from "./SideBarMenus/SideBarMenu";
import SideBarMenus from "./SideBarMenus/SideBarMenu";
import "./sidebar.scss";

// const SideBarDrawer = styled(Drawer)(({ theme }) => ({}))

export const SideBar = () => {
  // const theme = useTheme();

  return (
    <SideBarBox className="sidebar">
      <SideBarMenus />
    </SideBarBox>
  );
};

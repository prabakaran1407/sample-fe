/**
 * eslint-disable react-hooks/exhaustive-deps
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import * as React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Avatar,
  Box,
  CssBaseline,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  Button,
  Modal,
} from "@mui/material";

import { SideBarMenuItems } from "../../../../data/SideBarData";

// import PersonAdd from "@mui/icons-material/PersonAdd";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AppContainer from "../../../../app-layout/AppContainer/AppContainer";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import { APP_ROUTES } from "../../../../data/AppRoutes.ts";

import { getAppBarSetting } from "../../../../data/AppBarData.tsx";
import RBACService from "../../../../utils/RBAC.ts";
import { useAppDispatch, useAppSelector } from "../../../../hooks/index.ts";

import { useMemo } from "react";
import ChatBoxModal from "../../../../pages/Others/Help/index.tsx";
import { logoutUser } from "../../../../redux/features/authSlice.ts";
import { AppDispatch } from "../../../../redux/store.ts";
import Logo from "../../../../assets/png/logo.png";

// ************** Setting Option
import MainSettingOptions from "../../../../pages/SettingMenus/page.tsx";
import { Person, SegmentRounded } from "@mui/icons-material";
import { COLORS } from "../../../../utils/globals.ts";

// ************* Icons
import KeyboardDoubleArrowLeftSharpIcon from "@mui/icons-material/KeyboardDoubleArrowLeftSharp";

const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBarMenus() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const isSuperAdmin = auth?.data?.userRecord?.isSuperAdmin;
  const SIDEBAR_DATA = useMemo(() => {
    return RBACService.GET_SIDEBAR_DATA(
      SideBarMenuItems(auth),
      auth?.data?.userRecord
    );
  }, []);
  console.log("auth123", auth);
  const [isSignoutModalOpen, setIsSignoutModalOpen] = React.useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = React.useState(false);
  const [SIDEBAR, SETSIDEBAR] = React.useState<any>(SIDEBAR_DATA);
  const handleOpenSignoutModal = () => {
    setIsSignoutModalOpen(true);
  };

  const handleCloseSignoutModal = () => {
    setIsSignoutModalOpen(false);
  };

  const handleCloseHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [open, setOpen] = React.useState(true);
  const [openSubMenu, setOpenSubMenu] = React.useState(null);
  const [accountMenu, setAccountMenu] = React.useState<null | HTMLElement>(
    null
  );

  const openAccountMenu = Boolean(accountMenu);

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenu(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAccountMenu(null);
  };

  const [popoverAnchor, setPopoverAnchor] = React.useState(null);
  const [popoverIndex, setPopoverIndex] = React.useState(null);
  const handlePopoverOpen = (event: any, index: any) => {
    setPopoverAnchor(event.currentTarget);
    setPopoverIndex(index);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
    setPopoverIndex(null);
  };

  const [settingsMenu, setSettingsMenu] = React.useState<null | HTMLElement>(
    null
  );

  const openSettingsMenu = Boolean(settingsMenu);

  const handleSettingsMenu = isSuperAdmin
    ? undefined
    : (event: React.MouseEvent<HTMLElement>) => {
        setSettingsMenu(event.currentTarget);
        // activateSideMenu();
      };
  const handleSettingsMenuClose = () => {
    setSettingsMenu(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubMenuClick = (index: any) => {
    setOpenSubMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSubMenuClickAndNavigate = (index: any, path: any) => {
    handleSubMenuClick(index);
    handlePopoverClose();
    navigate(path);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setPopoverIndex(null);
    setOpen(false);
  };

  const handleSignout = async () => {
    try {
      await dispatch(logoutUser(auth?.data?.userRecord?.emailAddress));
      navigate("/", { replace: true });
    } catch (error) {
      console.log("error", error);
    }
  };
  const APP_BAR_SETTINGS = useMemo(() => {
    return getAppBarSetting(auth);
  }, []);

  const location = useLocation();
  const currentPathName = location.pathname;

  function activateSideMenu() {
    function recursive(array: any) {
      for (let index = 0; index < array?.length; index++) {
        const element = array[index];
        element.isActive = element?.path === currentPathName ? true : false;
        if (element?.submenu && element?.submenu?.length > 0) {
          recursive(element?.submenu);
        }
      }
    }

    SETSIDEBAR((prevSidebar: any) => {
      const updatedSidebar = [...prevSidebar];
      recursive(updatedSidebar);
      return updatedSidebar;
    });
  }

  React.useEffect(() => {
    activateSideMenu();
  }, [currentPathName]);

  // Recursive sidebard menu
  const getSideBarData = (SIDE_MENU: any[], isSubmenus = false) => {
    return [
      ...SIDE_MENU.map((menu: any, index: number) =>
        !isSubmenus ? (
          <>
            <ListItem
              onClick={(event) =>
                menu?.submenu &&
                menu?.submenu?.length > 0 &&
                handlePopoverOpen(event, index)
              }
              key={index}
              disablePadding
              sx={{
                display: "block",
                height: 39,
              }}
            >
              <Tooltip
                title={!open ? `${menu.title}` : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2,
                    mx: 1,
                    color: menu?.isActive ? COLORS.secondary : "#fff",
                    borderRadius: 1,
                    height: 36,
                    "&:hover": {
                      background: COLORS.secondary,
                      color: "white",
                    },
                    background: menu?.isActive ? "#ffff" : "",
                  }}
                  onClick={() => {
                    menu?.submenu && menu?.submenu?.length > 0
                      ? handleSubMenuClick(index)
                      : navigate(menu.path);
                    // activateSideMenu();
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 3,
                      mt: open ? 0 : 1,
                      display: open ? "flex" : "",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {menu?.icon}
                  </Box>
                  <ListItemText
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        opacity: open ? 1 : 0,
                      }}
                    >
                      {menu?.title}
                    </Typography>
                  </ListItemText>
                  {open &&
                    menu?.submenu &&
                    menu?.submenu?.length > 0 &&
                    (openSubMenu === index ? (
                      <ExpandMoreRoundedIcon />
                    ) : (
                      <ChevronRightRoundedIcon />
                    ))}
                </ListItemButton>
              </Tooltip>
            </ListItem>
            {open && menu?.submenu && menu?.submenu?.length > 0 && (
              <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {...getSideBarData(menu?.submenu, true)}
                </List>
              </Collapse>
            )}
            {!open &&
              popoverAnchor !== null &&
              popoverIndex === index &&
              menu?.submenu &&
              menu?.submenu?.length > 0 && (
                <Menu
                  open={Boolean(popoverAnchor)}
                  anchorEl={popoverAnchor}
                  onClose={handlePopoverClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 14,
                        left: 0,
                        width: 20,
                        height: 20,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  {menu?.submenu.map((subMenuItem: any, subIndex: any) => {
                    return (
                      <MenuItem
                        key={subIndex}
                        onClick={() => {
                          handleSubMenuClickAndNavigate(
                            index,
                            subMenuItem.path
                          );
                        }}
                      >
                        {subMenuItem.title}
                      </MenuItem>
                    );
                  })}
                </Menu>
              )}
          </>
        ) : (
          <>
            <ListItem
              key={index}
              disablePadding
              sx={{
                height: 39,
              }}
            >
              <ListItemButton
                sx={{
                  justifyContent: open ? "initial" : "center",
                  pl: 4,
                  mx: 1,
                  color: menu?.isActive ? COLORS.secondary : "#fff",
                  borderRadius: 1,
                  height: 36,
                  "&:hover": {
                    background: COLORS.secondary,
                    color: "white",
                  },
                  background: menu?.isActive ? "#ffff" : "",
                }}
                onClick={() => {
                  menu?.submenu && menu?.submenu?.length > 0
                    ? handleSubMenuClick(index)
                    : navigate(menu.path);
                  // activateSideMenu();
                }}
              >
                <Box
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {menu?.icon}
                </Box>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  <Typography sx={{ fontSize: 14, opacity: open ? 1 : 0 }}>
                    {menu?.title}
                  </Typography>
                </ListItemText>
                {open &&
                  menu?.submenu &&
                  menu?.submenu?.length > 0 &&
                  (openSubMenu === index ? (
                    <ExpandMoreRoundedIcon />
                  ) : (
                    <ChevronRightRoundedIcon />
                  ))}
              </ListItemButton>
            </ListItem>
            {open && menu?.submenu && menu?.submenu?.length > 0 && (
              <Collapse in={openSubMenu === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {...getSideBarData(menu?.submenu, true)}
                </List>
              </Collapse>
            )}
          </>
        )
      ),
    ];
  };
  const SIDEBAR_ITEMS = useMemo(
    () => getSideBarData(SIDEBAR),
    [open, handleSubMenuClick, SIDEBAR]
  );

  /**
   * @login_session check 5 second's once
   */
  // React.useEffect(() => {
  //   const interval = setInterval(async () => {
  //     console.log('<<<<<<<<<<<<<<<⏲️>>>>>>>>>>>>>');
  //     let isMulti = await RBACService.CHECK_IS_MULTI_LOGIN({
  //       isWebLogin: true,
  //       username: auth?.data?.userRecord?.emailAddress,
  //     });
  //     if (isMulti) {
  //       navigate(APP_ROUTES?.SIGN_IN?.pathName);
  //     }
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            background: "#fff",
            display: "flex",
            // justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                ...(open && { display: "none" }),
              }}
            >
              <MenuRoundedIcon
                style={{ fontSize: 30, color: COLORS.primary }}
              />
            </IconButton>
            <img
              src={Logo}
              alt="logo"
              style={{
                width: isMobile ? 30 : 40,
                height: isMobile ? 30 : 40,
                ...(open && { display: "none" }),
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontSize: isMobile ? 22 : 22,
                fontWeight: "600",
                fontFamily: "Poppins",
                color: COLORS.primary,
                textAlign: "center",
                ...(open && { display: "none" }),
              }}
              pl={2}
            >
              Sales10<sup>x</sup>
            </Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Tooltip title="Back">
                <IconButton
                  // onClick={handleSettingsMenu}
                  color="inherit"
                  edge="end"
                  sx={{
                    marginRight: 2,
                    ...(isMobile && { display: "none" }),
                  }}
                  aria-controls={openSettingsMenu ? "setting-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSettingsMenu ? "true" : undefined}
                  onClick={() => navigate(-1)}
                >
                  <KeyboardDoubleArrowLeftSharpIcon
                    style={{ fontSize: 24, color: COLORS.primary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              style={{
                display: "flex",
                // justifyContent: "end",
                alignItems: "center",
              }}
            >
              {!isSuperAdmin && (
                <Tooltip title="Settings">
                  <IconButton
                    onClick={handleSettingsMenu}
                    color="inherit"
                    edge="end"
                    sx={{
                      marginRight: 2,
                      ...(isMobile && { display: "none" }),
                    }}
                    aria-controls={
                      openSettingsMenu ? "setting-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openSettingsMenu ? "true" : undefined}
                  >
                    <SettingsOutlinedIcon
                      style={{ fontSize: 24, color: COLORS.primary }}
                    />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleAccountMenu}
                  color="inherit"
                  edge="end"
                  aria-controls={openAccountMenu ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      bgcolor: COLORS.secondary,
                      fontSize: 16,
                      fontWeight: "500",
                      width: 38,
                      height: 38,
                    }}
                  >
                    {auth?.data?.userRecord?.firstName
                      ? auth?.data?.userRecord?.firstName
                          .charAt(0)
                          .toUpperCase()
                      : ""}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            background: COLORS.primary,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "space-around",
              alignItems: "center",
            }}
          >
            {/* <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              edge="start"
              sx={{
                marginLeft: "5px",
                marginRight: 1,
                ...(isMobile && { display: "none" }),
              }}
            >
              <MenuRoundedIcon style={{ fontSize: 30, color: "#7145B0" }} />
            </IconButton> */}
            <img
              src={Logo}
              alt="logo"
              style={{
                width: isMobile ? 30 : 40,
                height: isMobile ? 30 : 40,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontSize: isMobile ? 18 : 22,
                fontFamily: "Poppins",
                fontWeight: "600",
                color: "#ffffff",
                textAlign: "center",
              }}
              px={isMobile ? 2 : 0}
            >
              Sales10<sup>x</sup>
            </Typography>
            <IconButton
              onClick={handleDrawerClose}
              sx={{
                ...(isMobile && { display: "none" }),
              }}
            >
              <SegmentRounded style={{ fontSize: 24, color: "#c0c0c0" }} />
            </IconButton>
          </Box>

          <IconButton
            onClick={handleDrawerClose}
            sx={{
              ...(!isMobile && { display: "none" }),
            }}
          >
            <CloseRoundedIcon style={{ fontSize: 24, color: "#ffffff" }} />
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List
          sx={{
            background: COLORS.primary,
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {...SIDEBAR_ITEMS}
        </List>
        <Divider sx={{ width: "90%" }} />
        <Box
          sx={{
            background: COLORS.primary,
            display: "flex",
            justifyContent: open ? "space-around" : "space-around",
            alignItems: "center",
            height: open ? "15%" : "43%",
            flexDirection: open ? "row" : "column",
          }}
        >
          <Tooltip title="Notification" placement="right" arrow>
            <IconButton
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: COLORS.secondary,
                width: "2.5rem",
                height: "2.5rem",
              }}
              onClick={() => {
                navigate(APP_ROUTES?.NOTIFICATION.pathName);
              }}
            >
              <NotificationsActiveOutlinedIcon
                style={{ width: "1.25rem", height: "1.25rem", color: "#ffff" }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Help" placement="right" arrow>
            <IconButton
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: COLORS.secondary,
                width: "2.5rem",
                height: "2.5rem",
              }}
              onClick={() => {
                setIsHelpModalOpen(!isHelpModalOpen);
              }}
            >
              <QuestionAnswerOutlinedIcon
                style={{ width: "1.25rem", height: "1.25rem", color: "#ffff" }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout" placement="right" arrow>
            <IconButton
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: COLORS.secondary,
                width: "2.5rem",
                height: "2.5rem",
              }}
              onClick={handleOpenSignoutModal}
            >
              <LogoutRoundedIcon
                style={{ width: "1.25rem", height: "1.25rem", color: "#ffff" }}
              />
            </IconButton>
          </Tooltip>
          {/* Signout Confirmation Modal */}
          <Modal
            open={isSignoutModalOpen}
            onClose={handleCloseSignoutModal}
            aria-labelledby="signout-modal-title"
            aria-describedby="signout-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                width: 350,
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 24,
                p: 3,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: "600" }}>
                Logout
              </Typography>
              <Typography
                id="signout-modal-title"
                variant="h6"
                component="div"
                sx={{ textAlign: "center", fontSize: 15 }}
              >
                Are you sure you want to logout?
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  justifyContent: "space-evenly",
                  display: "flex",
                  width: "100%",
                }}
              >
                <Button
                  onClick={handleCloseSignoutModal}
                  variant="outlined"
                  sx={{
                    height: 38,
                    width: "45%",
                    fontSize: 16,
                    border: `1px solid ${COLORS.primary}`,
                    color: COLORS.primary,
                    "&:hover": {
                      border: `1px solid ${COLORS.secondary}`,
                      color: COLORS.secondary,
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSignout}
                  variant="contained"
                  sx={{
                    height: 38,
                    width: "45%",
                    fontSize: 16,
                    background: COLORS.primary,
                    "&:hover": {
                      background: COLORS.secondary,
                      color: "white",
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* Help Modal */}
          <ChatBoxModal
            open={isHelpModalOpen}
            handleClose={handleCloseHelpModal}
          />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        <AppContainer />
      </Box>

      {/* Account Settings Menu */}
      <Menu
        anchorEl={accountMenu}
        id="account-menu"
        open={openAccountMenu}
        onClose={handleAccountMenuClose}
        onClick={handleAccountMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Box
            sx={{ display: "flex", alignItems: "center", minWidth: "250px" }}
          >
            <Avatar
              sx={{
                bgcolor: COLORS.secondary,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {auth?.data?.userRecord?.firstName
                ? auth?.data?.userRecord?.firstName.charAt(0).toUpperCase()
                : ""}
              {/* {auth?.data?.userRecord?.lastName
                ? auth?.data?.userRecord?.lastName.charAt(0).toUpperCase()
                : ""} */}
            </Avatar>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                {auth?.data?.userRecord?.firstName}{" "}
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#636f86",
                }}
              >
                {auth?.data?.userRecord?.emailAddress}
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() =>
            navigate(APP_ROUTES?.MYPROFILE?.ORGANIZATION?.pathname)
          }
        >
          <ListItemIcon>
            <Person fontSize="medium" />
          </ListItemIcon>
          My Profile
        </MenuItem>

        {!isSuperAdmin && (
          <>
            <Divider />
            <MenuItem
              onClick={() => navigate(APP_ROUTES?.ADMIN?.SERVICESHOP?.pathName)}
            >
              <ListItemIcon>
                <LocalGroceryStoreIcon fontSize="medium" />
              </ListItemIcon>
              Shop
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() =>
                navigate(APP_ROUTES?.ADMIN?.ORG_SETTINGS?.pathName)
              }
            >
              <ListItemIcon>
                <CorporateFareIcon fontSize="medium" />
              </ListItemIcon>
              Organization
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Settings Menu */}
      <MainSettingOptions
        settingsMenu={settingsMenu}
        openSettingsMenu={openSettingsMenu}
        handleSettingsMenuClose={handleSettingsMenuClose}
        APP_BAR_SETTINGS={APP_BAR_SETTINGS}
        setSettingsMenu={setSettingsMenu}
      />
    </Box>
  );
}

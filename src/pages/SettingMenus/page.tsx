/** @format */

import { useMemo } from "react";
import { theme } from "../../theme/AppTheme";
import { Menu, MenuItem, Grid, Divider, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainSettingOptions(props: any) {
  const {
    settingsMenu,
    openSettingsMenu,
    handleSettingsMenuClose,
    APP_BAR_SETTINGS,
    setSettingsMenu,
  } = props;
  const navigate = useNavigate();

  const settingNavigation = (path: string) => {
    if (path) navigate(path);
    setSettingsMenu(null);
  };

  const MenuArray = useMemo(() => {
    return Object.entries(APP_BAR_SETTINGS);
  }, []);

  return (
    <>
      <Menu
        anchorEl={settingsMenu}
        id="setting-menu"
        open={openSettingsMenu}
        onClose={handleSettingsMenuClose}
        onClick={handleSettingsMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: "32",
              height: "32",
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
        <Grid container direction={"row"} columnSpacing={2} gap={1}>
          {MenuArray.map(
            ([key, value]: [any, any], idx: number) =>
              APP_BAR_SETTINGS[key].can_access && (
                <>
                  <Grid item xs={5} key={idx}>
                    {APP_BAR_SETTINGS[key].can_access && (
                      <Box component="div">
                        <MenuItem
                          disableRipple
                          sx={{
                            width: 170,
                            minWidth: "100%",
                            ":hover": {
                              background: "#ffffff",
                            },
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 500, fontSize: "1rem" }}
                          >
                            {APP_BAR_SETTINGS[key]?.title}
                          </Typography>
                        </MenuItem>
                        {value?.menus?.map(
                          (menu: any, i: number) =>
                            menu?.can_access && (
                              <MenuItem
                                key={i}
                                disableRipple
                                onClick={() => settingNavigation(menu?.path)}
                                sx={{
                                  width: 170,
                                  minWidth: "100%",
                                  ":hover": {
                                    color: theme.palette.primary.main,
                                  },
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                  }}
                                >
                                  {menu?.icon}
                                  <Typography
                                    sx={{ fontSize: "0.8rem", pl: 2 }}
                                  >
                                    {menu?.title}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            )
                        )}
                      </Box>
                    )}
                  </Grid>
                  {MenuArray?.length != idx + 1 && value?.menus?.length > 0 && (
                    <Grid item>
                      <Divider orientation="vertical" />
                    </Grid>
                  )}
                </>
              )
          )}
        </Grid>
      </Menu>
    </>
  );
}

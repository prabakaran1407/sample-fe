import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";

export default function Device_Radio(props?: any) {
  const devicePermission = (name: any, value: any) => {
    props?.setData({
      ...props?.data,
      deviceRadioState: {
        ...props?.data?.deviceRadioState,
        [name]: value,
      },
    });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Device Radio State
        </Typography>
      </Box>

      <div>
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="flex-start"
          pt={3}
        >
          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">wifi State</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={props?.data?.deviceRadioState?.wifiState}
                value={props?.data?.deviceRadioState?.wifiState}
                options={[
                  "WIFI_STATE_UNSPECIFIED",
                  "WIFI_STATE_USER_CHOICE",
                  "WIFI_ENABLED",
                  "WIFI_DISABLED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField {...params} label="wifi State" size="small" />
                )}
                onChange={(_e, value) => {
                  devicePermission("wifiState", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Airplane Mode State</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={props?.data?.deviceRadioState?.airplaneModeState}
                value={props?.data?.deviceRadioState?.airplaneModeState}
                options={[
                  "AIRPLANE_MODE_STATE_UNSPECIFIED",
                  "AIRPLANE_MODE_USER_CHOICE",
                  "AIRPLANE_MODE_DISABLED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Airplane Mode State"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("airplaneModeState", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Ultra Wideband State</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={props?.data?.deviceRadioState?.ultraWidebandState}
                value={props?.data?.deviceRadioState?.ultraWidebandState}
                options={[
                  "ULTRA_WIDEBAND_STATE_UNSPECIFIED",
                  "ULTRA_WIDEBAND_USER_CHOICE",
                  "ULTRA_WIDEBAND_DISABLED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ultra Wideband State"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("ultraWidebandState", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Cellular TwoG State</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={props?.data?.deviceRadioState?.cellularTwoGState}
                value={props?.data?.deviceRadioState?.cellularTwoGState}
                options={[
                  "CELLULAR_TWO_G_STATE_UNSPECIFIED",
                  "CELLULAR_TWO_G_USER_CHOICE",
                  "CELLULAR_TWO_G_DISABLED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cellular TwoG State"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("cellularTwoGState", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">
                Minimum Wifi Security Level
              </label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={
                  props?.data?.deviceRadioState?.minimumWifiSecurityLevel
                }
                value={props?.data?.deviceRadioState?.minimumWifiSecurityLevel}
                options={[
                  "MINIMUM_WIFI_SECURITY_LEVEL_UNSPECIFIED",
                  "OPEN_NETWORK_SECURITY",
                  "PERSONAL_NETWORK_SECURITY",
                  "ENTERPRISE_NETWORK_SECURITY",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Minimum Wifi Security Level"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("minimumWifiSecurityLevel", value);
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

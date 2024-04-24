import {
  
  Box,
  Grid,
  Typography,
} from "@mui/material";

export default function Key_Guard(props?: any) {
  const devicePermission = (name: any, value: any) => {
    props?.setData({ ...props?.data, [name]: value });
  };
  const Options = [
    "CAMERA",
    "NOTIFICATIONS",
    "DISABLE_FINGERPRINT",
    "FACE",
    "IRIS",
    "BIOMETRICS",
    "SHORTCUTS",
    "ALL_FEATURES",
  ];

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" mb={4} sx={{ fontWeight: "bold" }}>
          Key Guard Disabled Features
        </Typography>
      </Box>
      {/* <div className="col-sm">
          <Autocomplete
            disablePortal
            multiple={true}
            id="combo-box-demo"
            defaultValue={
              props?.data?.keyguardDisabledFeatures
                ? props?.data?.keyguardDisabledFeatures
                : []
            }
            value={
              props?.data?.keyguardDisabledFeatures
                ? props?.data?.keyguardDisabledFeatures
                : []
            }
            options={[
              "CAMERA",
              "NOTIFICATIONS",
              "DISABLE_FINGERPRINT",
              "FACE",
              "IRIS",
              "BIOMETRICS",
              "SHORTCUTS",
              "ALL_FEATURES",
            ]}
            sx={{ width: 340, background: "#FFFFFF" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="keyguard Disabled Features"
                size="small"
              />
            )}
            onChange={(_e, value) => {
              devicePermission("keyguardDisabledFeatures", value);
            }}
          />
        </div> */}

      {Options.map((e: any) => {
        return (
          <Grid
            container
            spacing={3}
            pb={2}
            direction="row"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <div>
                <label>{e}</label>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div>
                <label className="switch">
                  <input
                    name="screenCaptureDisabled"
                    type="checkbox"
                    checked={props?.data?.keyguardDisabledFeatures?.includes(e)}
                    onChange={(value: any) => {
                      console.log("value", value?.target?.checked);
                      const isChecked = value?.target?.checked;
                      devicePermission(
                        "keyguardDisabledFeatures",
                        isChecked
                          ? [...props?.data?.keyguardDisabledFeatures, e]
                          : props?.data?.keyguardDisabledFeatures.filter(
                              (item: string) => item !== e
                            )
                      );
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

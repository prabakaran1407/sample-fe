import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";

export default function PolicyEnforcementRule(props?: any) {
  const devicePermission = (name: any, value: any) => {
    props?.setData({
      ...props?.data,
      policyEnforcementRules: [
        {
          ...props?.data?.policyEnforcementRules?.[0],
          [name]: value,
        },
      ],
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
          Policy Enforcement Rule
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        direction="row"
        alignItems="flex-start"
        pt={3}
      >
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Setting Name</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <TextField
              label="Setting Name"
              size="small"
              type="text"
              style={{
                width: 340,
                background: "#FFFFFF",
              }}
              defaultValue={
                props?.data?.policyEnforcementRules?.[0]?.settingName
              }
              onChange={(e) => {
                devicePermission("settingName", e.target.value);
              }}
            />
          </div>
        </Grid>
      </Grid>

      <Typography sx={{ fontWeight: "bold" }} mt={3}>
        Block Action
      </Typography>

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
              <label className="d-block fs-6">Block After Days</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <TextField
                label="Account Types With Management Disabled"
                size="small"
                type="number"
                style={{
                  width: 340,
                  background: "#FFFFFF",
                }}
                defaultValue={
                  props?.data?.policyEnforcementRules?.[0]?.blockAction
                    ?.blockAfterDays
                }
                onChange={(e) => {
                  devicePermission("blockAction", {
                    ...props?.data?.policyEnforcementRules?.[0]?.blockAction,
                    blockAfterDays: Number(e.target.value),
                  });
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Block Scope</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={
                  props?.data?.policyEnforcementRules?.[0]?.blockAction
                    ?.blockScope
                }
                value={
                  props?.data?.policyEnforcementRules?.[0]?.blockAction
                    ?.blockScope
                }
                options={[
                  "BLOCK_SCOPE_UNSPECIFIED",
                  "BLOCK_SCOPE_WORK_PROFILE",
                  "BLOCK_SCOPE_DEVICE",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField {...params} label="Block Scope" size="small" />
                )}
                onChange={(_e, value) => {
                  devicePermission("blockAction", {
                    ...props?.data?.policyEnforcementRules?.[0]?.blockAction,
                    blockScope: value,
                  });
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Typography sx={{ fontWeight: "bold" }} mt={3}>
          Wipe Action
        </Typography>

        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="flex-start"
          pt={3}
        >
          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Wipe Action</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <TextField
                label="Wipe Action"
                size="small"
                type="number"
                style={{
                  width: 340,
                  background: "#FFFFFF",
                }}
                defaultValue={
                  props?.data?.policyEnforcementRules?.[0]?.wipeAction
                    ?.wipeAfterDays
                }
                onChange={(e) => {
                  devicePermission("wipeAction", {
                    ...props?.data?.policyEnforcementRules?.[0]?.wipeAction,
                    wipeAfterDays: Number(e.target.value),
                  });
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Preserve Frp</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <label className="switch">
                <input
                  type="checkbox"
                  name="wifiConfigsLockdownEnabled"
                  onChange={(e) => {
                    devicePermission("wipeAction", {
                      ...props?.data?.policyEnforcementRules?.[0]?.wipeAction,
                      preserveFrp: e.target.checked,
                    });
                  }}
                  checked={
                    props?.data.policyEnforcementRules?.[0]?.wipeAction
                      ?.preserveFrp
                  }
                />
                <span className="slider round"></span>
              </label>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

/** @format */

import {
  Autocomplete,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import * as _ from "lodash";

type Props = {
  data: any;
  setData: any;
  setActive: any;
  editData: any;
};

const Passcode: React.FC<Props> = ({ data, setData, setActive, editData }) => {
  const devicePermission = (name: any, value: any) => {
    let statusbarData = { ...data?.passwordRequirements, [name]: value };
    if (_.isEmpty(value)) {
      statusbarData = {};
    }
    setData({
      ...data,
      passwordRequirements: statusbarData,
    });
  };

  return (
    <div style={{ height: "auto", overflow: "scroll" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", pb: 4 }}>
        Passcode
      </Typography>

      <Grid container spacing={5} direction="row" alignItems="flex-start">
        <Grid item xs={4}>
          <Typography variant="subtitle1">Password Quality</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              "PASSWORD_QUALITY_UNSPECIFIED",
              "BIOMETRIC_WEAK",
              "SOMETHING",
              "NUMERIC",
              "NUMERIC_COMPLEX",
              "ALPHABETIC",
              "ALPHANUMERIC",
              "COMPLEX",
              "COMPLEXITY_LOW",
              "COMPLEXITY_MEDIUM",
              "COMPLEXITY_HIGH",
            ]}
            value={editData?.passwordRequirements?.passwordQuality}
            defaultValue={undefined}
            onChange={(_e, value) => {
              devicePermission("passwordQuality", value);
            }}
            sx={{ background: "#FFFFFF" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select"
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1">Require Password Unlock</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              "REQUIRE_PASSWORD_UNLOCK_UNSPECIFIED",
              "USE_DEFAULT_DEVICE_TIMEOUT",
              "REQUIRE_EVERY_DAY",
            ]}
            value={editData?.passwordRequirements?.requirePasswordUnlock}
            defaultValue={undefined}
            onChange={(_e, value) => {
              devicePermission("requirePasswordUnlock", value);
            }}
            sx={{ background: "#FFFFFF" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select"
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1">Unified Lock Settings</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              "UNIFIED_LOCK_SETTINGS_UNSPECIFIED",
              "ALLOW_UNIFIED_WORK_AND_PERSONAL_LOCK",
              "REQUIRE_SEPARATE_WORK_LOCK",
            ]}
            value={editData?.passwordRequirements?.unifiedLockSettings}
            defaultValue={undefined}
            onChange={(_e, value) => {
              devicePermission("unifiedLockSettings", value);
            }}
            sx={{ background: "#FFFFFF" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select"
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1">Password Minimum Length</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            value={editData?.passwordRequirements?.passwordMinimumLength}
            style={{ background: "#FFFFFF" }}
            label="Password Minimum Length"
            name="minimumVersionCode"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(e) => {
              devicePermission("passwordMinimumLength", e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1">
            Maximum Failed Passwords For Wipe
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            value={
              editData?.passwordRequirements?.maximumFailedPasswordsForWipe
            }
            style={{ background: "#FFFFFF" }}
            label="Maximum Failed Passwords For Wipe"
            name="minimumVersionCode"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(e) => {
              devicePermission("maximumFailedPasswordsForWipe", e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1">
            Password Expiration Timeout
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={editData?.passwordRequirements?.passwordExpirationTimeout}
            style={{ background: "#FFFFFF" }}
            label="Password Expiration Timeout "
            name="minimumVersionCode"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(e) => {
              devicePermission("passwordExpirationTimeout", e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle1">Password History Length</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={editData?.passwordRequirements?.passwordExpirationTimeout}
            style={{ background: "#FFFFFF" }}
            label="Password Expiration Timeout "
            name="minimumVersionCode"
            InputLabelProps={{ shrink: true }}
            size="small"
            onChange={(e) => {
              devicePermission("passwordExpirationTimeout", e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle1">Password Scope</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1">:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={editData?.passwordRequirements?.passwordScope}
            options={["SCOPE_UNSPECIFIED", "SCOPE_DEVICE", "SCOPE_PROFILE"]}
            defaultValue={undefined}
            onChange={(_e, value) => {
              devicePermission("passwordScope", value);
            }}
            sx={{ background: "#FFFFFF" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select"
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            )}
          />
        </Grid>

        <Grid item xs={8.5}></Grid>
        <Grid item xs={1.1}>
          <Button color="error" variant="contained">
            Back
          </Button>
        </Grid>
        <Grid item xs={1.3}>
          <Button
            variant="contained"
            onClick={() => {
              setTimeout(() => {
                setActive("createPolicy");
              }, 500);
            }}
            color="primary"
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
};

export default Passcode;

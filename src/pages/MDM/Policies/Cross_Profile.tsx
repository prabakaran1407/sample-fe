import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";

export default function Cross_Profile(props?: any) {
  const devicePermission = (name: any, value: any) => {
    props?.setData({
      ...props?.data,
      crossProfilePolicies: {
        ...props?.data?.crossProfilePolicies,
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
          Cross Profile Policies
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
              <label className="d-block fs-6">
                Show Work Contacts In Personal Profile
              </label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={
                  props?.data?.crossProfilePolicies
                    ?.showWorkContactsInPersonalProfile
                }
                value={
                  props?.data?.crossProfilePolicies
                    ?.showWorkContactsInPersonalProfile
                }
                options={[
                  "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_UNSPECIFIED",
                  "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED",
                  "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_ALLOWED",
                  "SHOW_WORK_CONTACTS_IN_PERSONAL_PROFILE_DISALLOWED_EXCEPT_SYSTEM",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Show Work Contacts In Personal Profile"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("showWorkContactsInPersonalProfile", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Cross Profile Copy Paste</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={
                  props?.data?.crossProfilePolicies?.crossProfileCopyPaste
                }
                value={props?.data?.crossProfilePolicies?.crossProfileCopyPaste}
                options={[
                  "CROSS_PROFILE_COPY_PASTE_UNSPECIFIED",
                  "COPY_FROM_WORK_TO_PERSONAL_DISALLOWED",
                  "CROSS_PROFILE_COPY_PASTE_ALLOWED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cross Profile Copy Paste"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("crossProfileCopyPaste", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">Cross Profile Data Sharing</label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={
                  props?.data?.crossProfilePolicies?.crossProfileDataSharing
                }
                value={
                  props?.data?.crossProfilePolicies?.crossProfileDataSharing
                }
                options={[
                  "CROSS_PROFILE_DATA_SHARING_UNSPECIFIED",
                  "CROSS_PROFILE_DATA_SHARING_DISALLOWED",
                  "DATA_SHARING_FROM_WORK_TO_PERSONAL_DISALLOWED",
                  "CROSS_PROFILE_DATA_SHARING_ALLOWED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cross Profile Data Sharing"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("crossProfileDataSharing", value);
                }}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className="col-sm">
              <label className="d-block fs-6">
                Work Profile Widgets Default
              </label>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="col-sm">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={
                  props?.data?.crossProfilePolicies?.workProfileWidgetsDefault
                }
                value={
                  props?.data?.crossProfilePolicies?.workProfileWidgetsDefault
                }
                options={[
                  "WORK_PROFILE_WIDGETS_DEFAULT_UNSPECIFIED",
                  "WORK_PROFILE_WIDGETS_DEFAULT_ALLOWED",
                  "WORK_PROFILE_WIDGETS_DEFAULT_DISALLOWED",
                ]}
                sx={{ width: 340, background: "#FFFFFF" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Work Profile Widgets Default"
                    size="small"
                  />
                )}
                onChange={(_e, value) => {
                  devicePermission("workProfileWidgetsDefault", value);
                }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

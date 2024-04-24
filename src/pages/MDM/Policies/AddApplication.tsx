/** @format */

import { Autocomplete, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import "./app.module.css";
import { Application } from "./Application";
import { PlaystoreModal } from "./PlaystoreModal";
import { getPlayStore } from "../../../services/admin/mdm/application.service";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface ApplicationInterface {
  packageName: string | null | undefined;
  installType: string | null | undefined;
  lockTaskAllowed: boolean | undefined | null;
  defaultPermissionPolicy: string | undefined | null;
  permissionGrants: [] | null | undefined;
  disabled: boolean | undefined | null;
  minimumVersionCode: number | undefined | null;
  delegatedScopes: [] | undefined | null;
  connectedWorkAndPersonalApp: string | undefined | null;
  autoUpdateMode: string | undefined | null;
  alwaysOnVpnLockdownExemption: string | undefined | null;
  workProfileWidgets: string | undefined | null;
  ConnectedWorkAndPersonalApp?: any | undefined | null;
}
const defaultValues: ApplicationInterface = {
  packageName: null,
  installType: null,
  lockTaskAllowed: null,
  defaultPermissionPolicy: null,
  permissionGrants: undefined,
  disabled: null,
  minimumVersionCode: null,
  delegatedScopes: null,
  connectedWorkAndPersonalApp: null,
  autoUpdateMode: null,
  alwaysOnVpnLockdownExemption: null,
  workProfileWidgets: null,
};

const AddApplication = ({
  applicationData,
  applicationSetData,
  setShowAddApplication,
  editApplication,
  handleClose,
}: any) => {
  const [applicationState, setApplocationState] =
    useState<ApplicationInterface>(defaultValues);
  const [showApplication, _setShowApplication] = useState(false);
  const [showPlaystoreModal, setShowPlaystoreModal] = useState(false);
  const [playStoreToken, setPlayStoreToken] = useState("");

  const [id, setId] = useState(undefined);
  const [renderModal, setRenderModal] = useState(false);

  async function pullFromPlaystore() {
    await getPlayStore()
      .then((res: any) => {
        // console.log(res);

        let data = res.data.device;
        // console.log(data);

        setPlayStoreToken(data.value);
      })
      .catch((_err: any) => console.log(""));
  }

  const devicePermission = (name: any, value: any) => {
    setApplocationState({ ...applicationState, [name]: value });
  };

  const formSubmit = (e: any) => {
    e.preventDefault();

    let prevData = applicationData;
    let app = prevData["applications"];

    let data: any = applicationState;
    let Obj: any = {};
    let Value = Object.keys(data);
    for (let index = 0; index < Value.length; index++) {
      const element = Value[index];
      if (data[element] !== null && data[element] !== undefined) {
        Obj[element] = data[element];
      }
    }

    let index = app
      ? app?.findIndex((item: any) => item.packageName === Obj.packageName)
      : -1;
    // console.log(Obj, "obj index");
    if (index !== -1) {
      app[index] = Obj;
    } else {
      if (app) {
        app.push(Obj);
      } else {
        app = [Obj];
      }
    }

    prevData["applications"] = app;

    // console.log(Obj, "obj");
    applicationSetData(prevData);
    setApplocationState(defaultValues);
    setShowAddApplication(false);
    console.log(applicationData, "obj");
  };

  useEffect(() => {
    if (editApplication) {
      setApplocationState(editApplication);
    }
  }, [editApplication]);
  return (
    <div>
      <div>
        {!showApplication ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Application
              </Typography>

              <Button
                variant="contained"
                startIcon={<ArrowBackIosRoundedIcon fontSize="inherit" />}
                onClick={() => handleClose(applicationData)}
                // sx={{ color: 'grey', backgroundColor: '#ffffff' }}
              >
                Back
              </Button>
            </Box>

            {/* <div>
              <h4>Add Application</h4>
            </div> */}
            <form onSubmit={formSubmit}>
              <div style={{ marginTop: "30px" }}>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  alignItems="flex-start"
                >
                  <Grid item xs={9}>
                    <TextField
                      required
                      fullWidth
                      value={
                        editApplication === ""
                          ? applicationState.packageName
                          : editApplication?.packageName
                      }
                      style={{ background: "#FFFFFF" }}
                      label="Package Name"
                      name="packageName"
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      onChange={(e) => {
                        devicePermission("packageName", e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      // style={{ width: '180px' }}
                      type="button"
                      onClick={() => {
                        pullFromPlaystore();
                        setRenderModal(false);
                        setId(id);
                        setRenderModal(true);
                        setShowPlaystoreModal(true);
                      }}
                      variant="contained"
                    >
                      Pull from Playstore
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      defaultValue={applicationState?.installType}
                      value={editApplication?.installType}
                      options={[
                        "INSTALL_TYPE_UNSPECIFIED",
                        "PREINSTALLED",
                        "FORCE_INSTALLED",
                        "BLOCKED",
                        "AVAILABLE",
                        "REQUIRED_FOR_SETUP",
                        "KIOSK",
                      ]}
                      sx={{ background: "#FFFFFF" }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          InputLabelProps={{ shrink: true }}
                          label="Install Type"
                          size="small"
                        />
                      )}
                      onChange={(_e, value) => {
                        devicePermission("installType", value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={[
                        "PERMISSION_POLICY_UNSPECIFIED",
                        "PROMPT",
                        "GRANT",
                        "DENY",
                      ]}
                      defaultValue={applicationState?.defaultPermissionPolicy}
                      value={editApplication?.defaultPermissionPolicy}
                      onChange={(_e, value) => {
                        devicePermission("defaultPermissionPolicy", value);
                      }}
                      sx={{ background: "#FFFFFF" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Default Permission Policy"
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      defaultValue={applicationState?.workProfileWidgets}
                      value={editApplication?.workProfileWidgets}
                      options={[
                        "WORK_PROFILE_WIDGETS_UNSPECIFIED",
                        "WORK_PROFILE_WIDGETS_ALLOWED",
                        "WORK_PROFILE_WIDGETS_DISALLOWED",
                      ]}
                      onChange={(_e, value) => {
                        devicePermission("workProfileWidgets", value);
                      }}
                      sx={{ background: "#FFFFFF" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="WorkProfile Widgets"
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  {/* <Grid item xs={6}>
                    <TextField
                      fullWidth
                      style={{ background: "#FFFFFF" }}
                      label="Minimum Version Code"
                      name="minimumVersionCode"
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      onChange={(e) => {
                        devicePermission(
                          "minimumVersionCode",
                          toInteger(e.target.value)
                        );
                      }}
                      value={
                        editApplication === ""
                          ? applicationState.minimumVersionCode
                          : editApplication?.minimumVersionCode
                      }
                    />
                  </Grid> */}
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      defaultValue={applicationState?.autoUpdateMode}
                      value={editApplication?.autoUpdateMode}
                      options={[
                        "AUTO_UPDATE_MODE_UNSPECIFIED",
                        "AUTO_UPDATE_DEFAULT",
                        "AUTO_UPDATE_POSTPONED",
                        "AUTO_UPDATE_HIGH_PRIORITY",
                      ]}
                      onChange={(_e, value) => {
                        devicePermission("autoUpdateMode", value);
                      }}
                      sx={{ background: "#FFFFFF" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Auto Update Mode"
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      defaultValue={
                        applicationState?.alwaysOnVpnLockdownExemption
                      }
                      value={editApplication?.alwaysOnVpnLockdownExemption}
                      options={[
                        "ALWAYS_ON_VPN_LOCKDOWN_EXEMPTION_UNSPECIFIED",
                        "VPN_LOCKDOWN_ENFORCED",
                        "VPN_LOCKDOWN_EXEMPTION",
                      ]}
                      onChange={(_e, value) => {
                        devicePermission("alwaysOnVpnLockdownExemption", value);
                      }}
                      sx={{ background: "#FFFFFF" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Always On Vpn Lockdown Exemption"
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      defaultValue={
                        applicationState?.connectedWorkAndPersonalApp
                      }
                      value={editApplication?.connectedWorkAndPersonalApp}
                      options={[
                        "CONNECTED_WORK_AND_PERSONAL_APP_UNSPECIFIED",
                        "CONNECTED_WORK_AND_PERSONAL_APP_DISALLOWED",
                        "CONNECTED_WORK_AND_PERSONAL_APP_ALLOWED",
                      ]}
                      onChange={(_e, value) => {
                        devicePermission("connectedWorkAndPersonalApp", value);
                      }}
                      sx={{ background: "#FFFFFF" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Connected Work And Personal App"
                          InputLabelProps={{ shrink: true }}
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      alignItems="flex-start"
                    >
                      <Grid item xs={6}>
                        <div>
                          <div>
                            <label>Disabled</label>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name="disabled"
                              onChange={(e) =>
                                devicePermission("disabled", e.target.checked)
                              }
                              checked={editApplication?.disabled}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid
                      container
                      spacing={3}
                      direction="row"
                      alignItems="flex-start"
                    >
                      <Grid item xs={6}>
                        <div>
                          <div>
                            <label>LockTaskAllowed</label>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              name="lockTaskAllowed"
                              onChange={(e) =>
                                devicePermission(
                                  "lockTaskAllowed",
                                  e.target.checked
                                )
                              }
                              checked={editApplication?.lockTaskAllowed}
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={5.2}></Grid>

                  <Grid item xs={6}>
                    <Button
                      type={"submit"}
                      style={{ width: "100px" }}
                      className="btn btn-sm btn-danger fw-bolder"
                      variant="contained"
                      color="success"
                      // onClick={() => setShowApplication(true)}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </>
        ) : (
          <Application />
        )}
      </div>

      {renderModal && (
        <PlaystoreModal
          id={id}
          playStoreToken={playStoreToken}
          show={showPlaystoreModal}
          devicePermission={devicePermission}
          handleClose={(refreshFlag: any) => {
            setShowPlaystoreModal(false);
            if (!refreshFlag) return;
            // reRender({ where: {} });
          }}
        />
      )}
    </div>
  );
};

export default AddApplication;

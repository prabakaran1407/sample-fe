/** @format */

import React from "react";
import "../policies.css";
import KioskCustomization from "./KioskCustomization";
import StatusReportingSettings from "./StatusReportingSettings";
import AlwaysOnVpnPackage from "./AlwaysOnVpnPackage";
import AdvancedSecurityOverrides from "./AdvancedSecurityOverrides";
import SystemUpdate from "./SystemUpdate";
import { Autocomplete, TextField, Typography, Grid } from "@mui/material";

type Props = {
  onInputChange: any;
  onStatusReportingChange: any;
  onApplicationReportingChange: any;
  onAlwaysOnVpnPackageChange: any;
  data: any;
  setData: any;
  editData: any;
};

const Restrictions: React.FC<Props> = ({
  onInputChange,
  onStatusReportingChange,
  onApplicationReportingChange,
  onAlwaysOnVpnPackageChange,
  data,
  setData,
  editData,
}) => {
  const devicePermission = (name: any, value: any) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div style={{ height: "100vh", marginBottom: "20px" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", pb: 3 }}>
        Restrictions
      </Typography>
      <Grid container spacing={3} direction="row" alignItems="flex-start">
        <Grid item xs={4}>
          <div>
            <label>Screen Capture Diasbled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div>
            <label className="switch">
              <input
                name="screenCaptureDisabled"
                type="checkbox"
                checked={data.screenCaptureDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Camera Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                name="cameraDisabled"
                checked={data.cameraDisabled}
                type="checkbox"
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Skip First Use Hints Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                name="skipFirstUseHintsEnabled"
                type="checkbox"
                checked={data.skipFirstUseHintsEnabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Share Location Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                name="shareLocationDisabled"
                type="checkbox"
                checked={data.shareLocationDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">
              Private Key Selection Enabled
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                name="privateKeySelectionEnabled"
                type="checkbox"
                checked={data.privateKeySelectionEnabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">Add User Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                name="addUserDisabled"
                type="checkbox"
                checked={data.addUserDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Adjust Volume Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                name="adjustVolumeDisabled"
                type="checkbox"
                checked={data.adjustVolumeDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Factory Reset Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="factoryResetDisabled"
                checked={data.factoryResetDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">Install Apps Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="installAppsDisabled"
                checked={data.installAppsDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">
              Mount Physical Media Disabled
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="mountPhysicalMediaDisabled"
                checked={data.mountPhysicalMediaDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Modify Accounts Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="modifyAccountsDisabled"
                checked={data.modifyAccountsDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Uninstall Apps Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="uninstallAppsDisabled"
                checked={data.uninstallAppsDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Key Guard Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="keyguardDisabled"
                checked={data.keyguardDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">
              Bluetooth Contact Sharing Disabled
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="bluetoothContactSharingDisabled"
                checked={data.bluetoothContactSharingDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Bluetooth Config Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="bluetoothConfigDisabled"
                checked={data.bluetoothConfigDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">
              Cell Broadcasts Config Disabled
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="cellBroadcastsConfigDisabled"
                checked={data.cellBroadcastsConfigDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Credentials Config Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="credentialsConfigDisabled"
                checked={data.credentialsConfigDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">
              Mobile Networks Config Disabled
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="mobileNetworksConfigDisabled"
                checked={data.mobileNetworksConfigDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Tethering Config Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="tetheringConfigDisabled"
                checked={data.tetheringConfigDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Vpn Config Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="vpnConfigDisabled"
                checked={data.vpnConfigDisabled}
                onChange={(e) => onInputChange(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">Wifi Config Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="wifiConfigDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.wifiConfigDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Create Windows Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="createWindowsDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.createWindowsDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Network Reset Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="networkResetDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.networkResetDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">Outgoing Beam Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="outgoingBeamDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.outgoingBeamDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">Outgoing Calls Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="outgoingCallsDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.outgoingCallsDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          {" "}
          <div className="col-sm">
            <label className="d-block fs-6">Remove User Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="removeUserDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.removeUserDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">SMS Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="smsDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.smsDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">USB File Transfer Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="usbFileTransferDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.usbFileTransferDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Ensure Verify Apps Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          {" "}
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="ensureVerifyAppsEnabled"
                onChange={(e) => onInputChange(e)}
                checked={data.ensureVerifyAppsEnabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Set User Icon Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="setUserIconDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.setUserIconDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Set Wallpaper Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="setWallpaperDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.setWallpaperDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Data Roaming Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="dataRoamingDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.dataRoamingDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Network Escape Hatch Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="networkEscapeHatchEnabled"
                onChange={(e) => onInputChange(e)}
                checked={data.networkEscapeHatchEnabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Bluetooth Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="bluetoothDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.bluetoothDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Fun Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="funDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.funDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>{" "}
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Safe Boot Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="safeBootDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.safeBootDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Status Bar Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="statusBarDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.statusBarDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <label className="d-block fs-6">Wifi Configs Lockdown Enabled</label>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="wifiConfigsLockdownEnabled"
                onChange={(e) => onInputChange(e)}
                checked={data.wifiConfigsLockdownEnabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Unmute Microphone Disabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="unmuteMicrophoneDisabled"
                onChange={(e) => onInputChange(e)}
                checked={data.unmuteMicrophoneDisabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Block Applications Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="blockApplicationsEnabled"
                onChange={(e) => onInputChange(e)}
                checked={data.blockApplicationsEnabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">
              Install Unknown Sources Allowed
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="installUnknownSourcesAllowed"
                onChange={(e) => onInputChange(e)}
                checked={data.installUnknownSourcesAllowed}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Debugging Features Allowed</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="debuggingFeaturesAllowed"
                onChange={(e) => onInputChange(e)}
                checked={data.debuggingFeaturesAllowed}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">Auto Time Required</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="autoTimeRequired"
                onChange={(e) => onInputChange(e)}
                checked={data.autoTimeRequired}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="col-sm">
            <label className="d-block fs-6">USB Mass Storage Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="col-sm">
            <label className="switch">
              <input
                type="checkbox"
                name="usbMassStorageEnabled"
                onChange={(e) => onInputChange(e)}
                checked={data.usbMassStorageEnabled}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Device Permission</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={data.defaultPermissionPolicy}
              defaultValue={data.defaultPermissionPolicy}
              options={[
                "PERMISSION_POLICY_UNSPECIFIED",
                "PROMPT",
                "GRANT",
                "DENY",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Device Permission" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("defaultPermissionPolicy", value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Location Mode</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.LocationMode}
              value={data.locationMode}
              options={[
                "LOCATION_MODE_UNSPECIFIED",
                "HIGH_ACCURACY",
                "SENSORS_ONLY",
                "BATTERY_SAVING",
                "OFF",
                "LOCATION_USER_CHOICE",
                "LOCATION_ENFORCED",
                "LOCATION_DISABLED",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Location Mode" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("locationMode", value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Auto Update</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.AppAutoUpdatePolicy}
              value={data.appAutoUpdatePolicy}
              options={[
                "APP_AUTO_UPDATE_POLICY_UNSPECIFIED",
                "CHOICE_TO_THE_USER",
                "NEVER",
                "WIFI_ONLY",
                "ALWAYS",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Auto Update" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("appAutoUpdatePolicy", value);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Encryption Policy</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={data.encryptionPolicy}
              defaultValue={data.EncryptionPolicy}
              options={[
                "ENCRYPTION_POLICY_UNSPECIFIED",
                "ENABLED_WITHOUT_PASSWORD",
                "ENABLED_WITH_PASSWORD",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Encryption Policy" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("encryptionPolicy", value);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Play Store</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.PlayStoreMode}
              value={data.playStoreMode}
              options={[
                "PLAY_STORE_MODE_UNSPECIFIED",
                "WHITELIST",
                "BLACKLIST",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Play Store" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("playStoreMode", value);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Auto Date and Time</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.AutoDateAndTimeZone}
              value={data.autoDateAndTimeZone}
              options={[
                "AUTO_DATE_AND_TIME_ZONE_UNSPECIFIED",
                "AUTO_DATE_AND_TIME_ZONE_USER_CHOICE",
                "AUTO_DATE_AND_TIME_ZONE_ENFORCED",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Auto Date and Time"
                  size="small"
                />
              )}
              onChange={(_e, value) => {
                devicePermission("autoDateAndTimeZone", value);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Preferential Network Service</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.PreferentialNetworkService}
              value={data.preferentialNetworkService}
              options={[
                "PREFERENTIAL_NETWORK_SERVICE_UNSPECIFIED",
                "PREFERENTIAL_NETWORK_SERVICE_DISABLED",
                "PREFERENTIAL_NETWORK_SERVICE_ENABLED",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Preferential Network Service"
                  size="small"
                />
              )}
              onChange={(_e, value) => {
                devicePermission("preferentialNetworkService", value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Camera Access</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.CameraAccess}
              value={data.cameraAccess}
              options={[
                "CAMERA_ACCESS_UNSPECIFIED",
                "CAMERA_ACCESS_USER_CHOICE",
                "CAMERA_ACCESS_DISABLED",
                "CAMERA_ACCESS_ENFORCED",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Camera Access" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("cameraAccess", value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Microphone Access</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.MicrophoneAccess}
              value={data.microphoneAccess}
              options={[
                "MICROPHONE_ACCESS_UNSPECIFIED",
                "MICROPHONE_ACCESS_USER_CHOICE",
                "MICROPHONE_ACCESS_DISABLED",
                "MICROPHONE_ACCESS_ENFORCED",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField {...params} label="Microphone Access" size="small" />
              )}
              onChange={(_e, value) => {
                devicePermission("microphoneAccess", value);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Minimum Api Level</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <TextField
              label="Minimum Api Level"
              size="small"
              style={{
                width: 340,
                background: "#FFFFFF",
              }}
              defaultValue={data?.minimumApiLevel}
              onChange={(e) => {
                devicePermission("minimumApiLevel", Number(e.target.value));
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">
              Account Types With Management Disabled
            </label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <TextField
              label="Account Types With Management Disabled"
              size="small"
              style={{
                width: 340,
                background: "#FFFFFF",
              }}
              defaultValue={data?.accountTypesWithManagementDisabled}
              onChange={(e) => {
                devicePermission("accountTypesWithManagementDisabled", [
                  e.target.value,
                ]);
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Device Owner Lockscreen Info</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <TextField
              label="Device Owner Lockscreen Info"
              size="small"
              style={{
                width: 340,
                background: "#FFFFFF",
              }}
              defaultValue={data?.deviceOwnerLockScreenInfo?.defaultMessage}
              onChange={(e) => {
                devicePermission("deviceOwnerLockScreenInfo", {
                  defaultMessage: e.target.value,
                });
              }}
            />
          </div>
        </Grid>{" "}
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">StayOn Plugged Mode</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data.stayOnPluggedModes}
              value={data.stayOnPluggedModes}
              options={[
                "BATTERY_PLUGGED_MODE_UNSPECIFIED",
                "AC",
                "USB",
                "WIRELESS",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="StayOn Plugged Mode"
                  size="small"
                />
              )}
              onChange={(_e, value) => {
                devicePermission("stayOnPluggedModes", value);
              }}
            />
          </div>
        </Grid>{" "}
      </Grid>

      <KioskCustomization
        onInputChange={onInputChange}
        data={data}
        setData={setData}
        editData={editData}
      />
      <SystemUpdate data={data} setData={setData} editData={editData} />
      <StatusReportingSettings
        onStatusReportingChange={onStatusReportingChange}
        onApplicationReportingChange={onApplicationReportingChange}
        data={data}
        setData={setData}
        editData={editData}
      />
      {/* <SsmAndLsm data={data} setData={setData} editData={editData} /> */}
      <AlwaysOnVpnPackage
        onAlwaysOnVpnPackageChange={onAlwaysOnVpnPackageChange}
        data={data}
        setData={setData}
        editData={editData}
      />
      <AdvancedSecurityOverrides
        data={data}
        setData={setData}
        editData={editData}
      />
    </div>
  );
};

export default Restrictions;

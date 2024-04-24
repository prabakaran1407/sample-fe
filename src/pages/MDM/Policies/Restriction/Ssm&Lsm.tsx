/** @format */

import React from "react";
import { TextField } from "@mui/material";
import "../policies.css";

type Props = {
  data: any;
  setData: any;
  editData: any;
};

const SsmAndLsm: React.FC<Props> = ({ data, setData }) => {
  const shortSupportMessage = (name: any, value: any) => {
    setData({
      ...data,
      shortSupportMessage: { ...data?.shortSupportMessage, [name]: value },
    });
  };

  const longSupportMessage = (name: any, value: any) => {
    setData({
      ...data,
      longSupportMessage: { ...data?.longSupportMessage, [name]: value },
    });
  };

  const deviceOwnerLockScreenInfo = (name: any, value: any) => {
    setData({
      ...data,
      deviceOwnerLockScreenInfo: {
        ...data?.deviceOwnerLockScreenInfo,
        [name]: value,
      },
    });
  };

  return (
    <div>
      <div className="pt-5">
        <h3>Short Support Message</h3>
      </div>
      <div className="container mt-8">
        <div className="row">
          <div className="col-sm">
            <label className="d-block fs-6">Localized Messages</label>
          </div>
          <div className="col-sm">
            <TextField
              label="Localized Message"
              size="small"
              style={{
                width: 300,
                background: "#FFFFFF",
              }}
              defaultValue={data?.shortSupportMessage?.localizedMessages}
              onChange={(e) => {
                shortSupportMessage("localizedMessages", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm">
            <label className="d-block fs-6">Default Message</label>
          </div>
          <div className="col-sm">
            <TextField
              label="Default Message"
              size="small"
              style={{
                width: 300,
                background: "#FFFFFF",
              }}
              defaultValue={data?.shortSupportMessage?.defaultMessage}
              onChange={(e) => {
                shortSupportMessage("defaultMessage", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="pt-5">
        <h3>Long Support Message</h3>
      </div>
      <div className="container mt-8">
        <div className="row">
          <div className="col-sm">
            <label className="d-block fs-6">Localized Messages</label>
          </div>
          <div className="col-sm">
            <TextField
              label="Localized Message"
              size="small"
              style={{
                width: 300,
                background: "#FFFFFF",
              }}
              defaultValue={data?.longSupportMessage?.localizedMessages}
              onChange={(e) => {
                longSupportMessage("localizedMessages", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm">
            <label className="d-block fs-6">Default Message</label>
          </div>
          <div className="col-sm">
            <TextField
              label="Default Message"
              size="small"
              style={{
                width: 300,
                background: "#FFFFFF",
              }}
              defaultValue={data?.longSupportMessage?.defaultMessage}
              onChange={(e) => {
                longSupportMessage("defaultMessage", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="pt-5">
        <h3>Device Owner Lock Screen Info</h3>
      </div>
      <div className="container mt-8">
        <div className="row">
          <div className="col-sm">
            <label className="d-block fs-6">Localized Messages</label>
          </div>
          <div className="col-sm">
            <TextField
              label="Localized Message"
              size="small"
              style={{
                width: 300,
                background: "#FFFFFF",
              }}
              defaultValue={data?.deviceOwnerLockScreenInfo?.localizedMessages}
              onChange={(e) => {
                deviceOwnerLockScreenInfo("localizedMessages", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm">
            <label className="d-block fs-6">Default Message</label>
          </div>
          <div className="col-sm">
            <TextField
              label="Default Message"
              size="small"
              style={{
                width: 300,
                background: "#FFFFFF",
              }}
              defaultValue={data?.deviceOwnerLockScreenInfo?.defaultMessage}
              onChange={(e) => {
                deviceOwnerLockScreenInfo("defaultMessage", e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SsmAndLsm;

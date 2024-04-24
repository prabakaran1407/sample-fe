/** @format */

import React from "react";
import { Autocomplete, TextField, Typography, Grid, Box } from "@mui/material";
import "../policies.css";

type Props = {
  data: any;
  setData: any;
  editData: any;
};

const SystemUpdate: React.FC<Props> = ({ data, setData }) => {
  const systemUpdate = (name: any, value: any) => {
    setData({
      ...data,
      systemUpdate: { ...data?.systemUpdate, [name]: value },
    });
  };

  return (
    <div>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          System Update{" "}
        </Typography>
      </Box>

      <Grid container spacing={3} direction="row" alignItems="flex-start">
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">System Update Type</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              defaultValue={data?.SystemUpdateType || []}
              value={data?.systemUpdate?.type}
              options={[
                "SYSTEM_UPDATE_TYPE_UNSPECIFIED",
                "AUTOMATIC",
                "WINDOWED",
                "POSTPONE",
              ]}
              sx={{ width: 340, background: "#FFFFFF" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="System Update Type"
                  size="small"
                />
              )}
              onChange={(_e, value) => {
                systemUpdate("type", value);
                console.log("system", value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Start Minute</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <input
              type="number"
              placeholder="Start Minute (Between 0 and 1439)"
              style={{
                width: 340,
                height: 40,
                border: "1px solid #C4C4C4",
                borderRadius: 5,
                background: "#FFFFFF",
                paddingLeft: 12,
                fontFamily: "sans-serif",
              }}
              defaultValue={data?.systemUpdate?.startMinutes}
              onChange={(e) => {
                systemUpdate("startMinutes", e.target.value);
                console.log("start min", e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">End Minute</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <input
              type="number"
              max={1439}
              placeholder="End Minute (Between 0 and 1439)"
              style={{
                width: 340,
                height: 40,
                border: "1px solid #C4C4C4",
                borderRadius: 5,
                background: "#FFFFFF",
                paddingLeft: 12,
                fontFamily: "sans-serif",
              }}
              defaultValue={data?.systemUpdate?.endMinutes}
              onChange={(e) => {
                systemUpdate("endMinutes", e.target.value);
                console.log("end min", e.target.value);
              }}
            />
          </div>
        </Grid>
        {/* <Grid item xs={6}>
          <div className="col-sm">
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Freeze Period
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">Start Date</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <input
              type="text"
              max={1439}
              placeholder="Start Date (DD/MM)"
              style={{
                width: 340,
                height: 40,
                border: "1px solid #C4C4C4",
                borderRadius: 5,
                background: "#FFFFFF",
                paddingLeft: 12,
                fontFamily: "sans-serif",
              }}
              defaultValue={data?.systemUpdate?.freezePeriods?.startDate}
              onChange={(e) => {
                systemUpdate("freezePeriods", [
                  {
                    ...data?.systemUpdate?.freezePeriods,
                    startDate: {
                      month: e.target.value?.split("/")[1],
                      date: e.target.value?.split("/")[0],
                    },
                  },
                ]);
                console.log("end min", e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <label className="d-block fs-6">End Date</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="col-sm">
            <input
              type="text"
              max={1439}
              placeholder="End Date (DD/MM)"
              style={{
                width: 340,
                height: 40,
                border: "1px solid #C4C4C4",
                borderRadius: 5,
                background: "#FFFFFF",
                paddingLeft: 12,
                fontFamily: "sans-serif",
              }}
              defaultValue={data?.systemUpdate?.freezePeriods?.endDate}
              onChange={(e) => {
                systemUpdate("freezePeriods", [
                  {
                    ...data?.systemUpdate?.freezePeriods,
                    endDate: {
                      month: e.target.value?.split("/")[1],
                      date: e.target.value?.split("/")[0],
                    },
                  },
                ]);
                console.log("end min", e.target.value);
              }}
            />
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default SystemUpdate;

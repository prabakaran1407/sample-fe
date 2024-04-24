/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography } from "@mui/material";
import PhoneAndroidTwoToneIcon from "@mui/icons-material/PhoneAndroidTwoTone";
import { LucideBatteryFull } from "lucide-react";

interface DeviceCellRendererProps {
  value: any;
}

const DeviceCellRenderer: React.FC<DeviceCellRendererProps> = (props: any) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PhoneAndroidTwoToneIcon sx={{ fontSize: 18, color: "#99D8FC" }} />
            <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
              {props.data.checkInDevice ? props.data.checkInDevice : "--"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt={1}
          >
            <LucideBatteryFull
              style={{ width: 20, height: 20, color: "#50CD89" }}
            />
            <Typography sx={{ fontSize: 11, color: "#A1A5B7" }} pl={1}>
              {props.data.checkInDeviceBatteryPercentage
                ? props.data.checkInDeviceBatteryPercentage
                : "--"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default DeviceCellRenderer;

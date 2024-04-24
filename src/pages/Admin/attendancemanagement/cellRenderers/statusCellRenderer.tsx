/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import moment from "moment";

interface StatusCellRendererProps {
  value: any;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = (props: any) => {
  const checkIn = moment.utc(props.data.checkInTime).local();
  const checkOut = moment.utc(props.data.checkOutTime).local();

  // const formattedCheckInTime = checkIn.toLocaleTimeString("en-US", {
  //   hour12: false,
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // const formattedCheckOutTime = checkOut.toLocaleTimeString("en-US", {
  //   hour12: false,
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  const time = useMemo(() => {
    return {
      formattedCheckInTime: checkIn.isValid() ? checkIn.format("h:mm A") : "--",
      formattedCheckOutTime: checkOut.isValid() ? checkOut.format("h:mm A") : "--",
    };
  }, [checkIn, checkOut]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#EBFFF6",
            width: 50,
            height: 55,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 1,
          }}
        >
          <EastRoundedIcon sx={{ fontSize: 18, color: "#50CD89" }} />
          <Typography
            sx={{ fontSize: 13, fontWeight: "500", color: "#50CD89" }}
          >
            {time.formattedCheckInTime}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#FFF5F8",
            width: 55,
            height: 55,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 1,
          }}
        >
          <EastRoundedIcon sx={{ fontSize: 18, color: "#F1416C" }} />
          <Typography
            sx={{ fontSize: 13, fontWeight: "500", color: "#F1416C" }}
          >
            {time.formattedCheckOutTime}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default StatusCellRenderer;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography } from "@mui/material";

interface AddressCellRendererProps {
  value: any;
}

const AddressCellRenderer: React.FC<AddressCellRendererProps> = (
  props: any
) => {
  return (
    <React.Fragment>
      <Box sx={{ alignItems: "center", width: "100%", height: "100%" }}>
        <Typography
          style={{
            textAlign: "center",
            whiteSpace: "normal",
            fontSize: 10,
            fontWeight: "700",
          }}
        >
          {props.data.checkInAddress ? props.data.checkInAddress : "--"}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default AddressCellRenderer;

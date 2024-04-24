/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography } from "@mui/material";

interface AddressCellRendererProps {
  value: any;
}

const AddressCellRenderer1: React.FC<AddressCellRendererProps> = (
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
          {props.data.checkOutAddress ? props.data.checkOutAddress : "--"}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default AddressCellRenderer1;

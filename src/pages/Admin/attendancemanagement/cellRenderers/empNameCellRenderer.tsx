/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography } from "@mui/material";

interface EmpNameCellRendererProps {
  value: any;
}

const EmpNameCellRenderer: React.FC<EmpNameCellRendererProps> = (
  props: any
) => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Typography sx={{ fontSize: 11, fontWeight: "700" }}>
          {props.data.userId.firstName.toUpperCase()}{" "}
          {props.data.userId.lastName.toUpperCase()}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default EmpNameCellRenderer;

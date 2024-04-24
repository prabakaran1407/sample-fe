/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Typography } from "@mui/material";

interface DateCellRendererProps {
  value: any;
}

const DateCellRenderer: React.FC<DateCellRendererProps> = (props: any) => {
  const date = new Date(props.data.createdAt).toLocaleDateString();
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Typography sx={{ fontSize: 11, fontWeight: "700" }}>{date}</Typography>
      </Box>
    </React.Fragment>
  );
};

export default DateCellRenderer;

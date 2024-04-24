import React from "react";
import { Box } from "@mui/material";

interface StatusCellRendererProps {
  value: any;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = (props: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {props.data.billingType === "PAID" ? (
        <Box
          sx={{
            color: "#1A4331",
            fontSize: 12,
            fontWeight: "500",
            height: "25px",
            width: "90px",
            background: "#C6F1DA",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Paid
        </Box>
      ) : (
        <Box
          sx={{
            color: "#916060",
            fontSize: 12,
            fontWeight: "500",
            height: "25px",
            width: "90px",
            background: "#FCD9D9",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Trial
        </Box>
      )}
    </Box>
  );
};

export default StatusCellRenderer;

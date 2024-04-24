import React from "react";
import { Box } from "@mui/material";

interface StatusCellRendererProps {
  value: any;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = (props: any) => {
  const getLatestStatus = () => {
    const latestStatusItem: any =
      props?.data?.contactStatusData[
        props?.data?.contactStatusData?.length - 1
      ];
    return latestStatusItem ? latestStatusItem?.contactStatus : "";
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {getLatestStatus() === "OPEN" ? (
        <Box
          sx={{
            color: "#FF69B4",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#FFE1F0",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Open
        </Box>
      ) : getLatestStatus() === "Contacted" ? (
        <Box
          sx={{
            color: "#3498db",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#DDF1FF",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Contacted
        </Box>
      ) : getLatestStatus() === "Scheduled" ? (
        <Box
          sx={{
            color: "#f39c12",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#FFEDD0",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Scheduled
        </Box>
      ) : getLatestStatus() === "Dropped" ? (
        <Box
          sx={{
            color: "#e74c3c",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#FFD2CD",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Dropped
        </Box>
      ) : getLatestStatus() === "Follow Up" ? (
        <Box
          sx={{
            color: "#9b59b6",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#F0CCFF",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Follow Up
        </Box>
      ) : getLatestStatus() === "Not Reachable" ? (
        <Box
          sx={{
            color: "#95a5a6",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#EFEEEE",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Not Reachable
        </Box>
      ) : getLatestStatus() === "Completed" ? (
        <Box
          sx={{
            color: "#27ae60",
            fontSize: 12,
            fontWeight: "700",
            height: "25px",
            width: "110px",
            background: "#CDFFE2",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Completed
        </Box>
      ) : (
        "---"
      )}
    </Box>
  );
};

export default StatusCellRenderer;

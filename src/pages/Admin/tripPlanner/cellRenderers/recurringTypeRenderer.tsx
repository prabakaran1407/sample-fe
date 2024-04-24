import React from "react";
import { Box } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

interface RecurringTypeRendererProps {
  value: any;
}

interface RecurringTypeStyles {
  [key: string]: {
    color: string;
    label: string;
  };
}

const RecurringTypeRenderer: React.FC<RecurringTypeRendererProps> = ({
  value,
}: RecurringTypeRendererProps) => {
  const recurringTypeStyles: RecurringTypeStyles = {
    TODAY: {
      color: "#95a5a6",
      label: "Today",
    },
    DAILY: { color: "#9b59b6", label: "Daily" },
    WEEKLY: {
      color: "#27ae60",
      label: "Weekly",
    },
  };

  const selectedType = recurringTypeStyles[value] || {
    color: "#000000",
    label: "---",
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
      <Box
        sx={{
          color: selectedType.color,
          fontSize: 12,
          fontWeight: "700",
          height: "25px",
          width: "110px",
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "60%",
          }}
        >
          <FiberManualRecord sx={{ fontSize: 16, mr: 1 }} />
          {selectedType.label}
        </Box>
      </Box>
    </Box>
  );
};

export default RecurringTypeRenderer;

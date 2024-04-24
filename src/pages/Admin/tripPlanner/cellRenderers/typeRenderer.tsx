import React from "react";
import { Box } from "@mui/material";

interface TypeRendererProps {
  value: any;
}

interface TypeStyles {
  [key: string]: {
    color: string;
    background: string;
    label: string;
  };
}

const TypeRenderer: React.FC<TypeRendererProps> = ({
  value,
}: TypeRendererProps) => {
  const typeStyles: TypeStyles = {
    GROUP: {
      color: "#FF69B4",
      background: "#FFE1F0",
      label: "Group",
    },
    CUSTOMER: {
      color: "#3498db",
      background: "#DDF1FF",
      label: "Customer",
    },
    BILLING_PARTY: {
      color: "#f39c12",
      background: "#FFEDD0",
      label: "Billing Party",
    },
  };

  const selectedType = typeStyles[value] || {
    color: "#000000",
    background: "#FFFFFF",
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
          background: selectedType.background,
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedType.label}
      </Box>
    </Box>
  );
};

export default TypeRenderer;

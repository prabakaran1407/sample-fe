import React from "react";
import { IconButton } from "@mui/material";
import { Download } from "lucide-react";

interface InvoiceCopyRendererProps {
  value: string;
  onDownload: (value: string) => void; 
}

const InvoiceCopyRenderer: React.FC<InvoiceCopyRendererProps> = ({ value, onDownload }) => {
  return (
    <IconButton onClick={() => onDownload(value)} size="small">
      <Download />
    </IconButton>
  );
};

export default InvoiceCopyRenderer;

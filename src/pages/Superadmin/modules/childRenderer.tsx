import { Box, Typography } from "@mui/material";
import React from "react";

interface ChildRendererProps {
  value: any;
}

const ChildRenderer: React.FC<ChildRendererProps> = (props: any) => {
  return (
    <Box
      sx={{ display: "flex",alignItems: "center",height:"100%" }}
     
    >
      <Typography sx={{fontSize:14}}>{props?.data?.modules?.moduleName ? props.data.modules.moduleName:"--"}</Typography>
    </Box>
  );
};

export default ChildRenderer;

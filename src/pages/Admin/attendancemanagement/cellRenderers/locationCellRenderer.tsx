import { memo } from "react";
// *********** Icon
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Stack, Tooltip } from "@mui/material";

// ************MUI
import { ActionIconButton } from "../../../../components/MUI/mui.index";

import { MAP_URL } from "../../../../config/index.ts";

function TableLocationRenderer(props: any) {
  const { checkInLocation, checkOutLocation } = props.data;

  const viewMap = (type: string) => {
    const URL =
      type === "IN"
        ? `${MAP_URL}?q=${checkInLocation[0]},${checkInLocation[1]}`
        : `${MAP_URL}?q=${checkOutLocation[0]},${checkOutLocation[1]}`;
    window.open(URL, "_blank");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Stack direction="row">
          {checkInLocation && checkInLocation?.length > 0 && (
            <ActionIconButton actionType="" onClick={() => viewMap("IN")}>
              <Tooltip title="In location">
                <LocationOnIcon color="error" />
              </Tooltip>
            </ActionIconButton>
          )}{" "}
          |
          {checkOutLocation && checkOutLocation?.length > 0 && (
            <ActionIconButton actionType="" onClick={() => viewMap("OUT")}>
              <Tooltip title="Out location">
                <LocationOnIcon color="error" />
              </Tooltip>
            </ActionIconButton>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default memo(TableLocationRenderer);

/** @format */

import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../../src/hooks";

const Enterprise = ({}) => {
  const auth = useAppSelector((state) => state.auth);
  const org_data = auth?.data?.userRecord?.organizationData;

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">
              Enterprise ID:{" "}
              <span style={{ fontWeight: "bold" }}>
                {org_data?.enterprise_id?.split("/")?.[1] || "LC03vckpp7"}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Enterprise;

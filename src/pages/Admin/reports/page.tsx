import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import { Link } from "react-router-dom";
import { ReportsPageComponents } from "./ReportsComponents.tsx";
import { useSelector } from "react-redux";
import RBACService from "../../../utils/RBAC.ts";
import { useMemo, useState } from "react";

const Reports = () => {
  const authData = useSelector(({ auth }) => auth);
  const [reportsArray, setReportsArray] = useState<any>([]);

  useMemo(async () => {
    const dataFromFun = await RBACService.GET_REPORTS_DATA(
      ReportsPageComponents,
      authData.data.userRecord.services_for_user.UAS_MODULES
    );
    setReportsArray(dataFromFun.length > 0 ? dataFromFun : []);
  }, []);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Reports
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <Grid container spacing={2}>
        {reportsArray.map((items: any) => (
          <Grid item xs={12} sm={6} md={3}>
            {
              <Paper elevation={3} style={{ padding: "30px", margin: "10px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: "15px",
                    borderBottom: "2px solid #3A1C60",
                    paddingBottom: "10px",
                  }}
                >
                  {items?.title}
                </Typography>
                {/* <Link
                  to='/sales10x/reports/attendance'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant='body1' sx={{ marginTop: '20px' }}>
                    Attendance
                  </Typography>
                </Link> */}
                {items?.reports?.map((report: any) => (
                  <Link
                    to={report?.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="body1" sx={{ marginTop: "20px" }}>
                      {report.title}
                    </Typography>
                  </Link>
                ))}
              </Paper>
            }
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Reports;

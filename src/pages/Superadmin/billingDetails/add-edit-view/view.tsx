import { useLocation } from "react-router-dom";
import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";
import AgDataGrid from "../../../../../src/components/AG-GRID/DataGrid/AgDataGrid";
import CustomCellRenderValues from "../../../../../src/components/CustomCellAgGrid/CustomCellRenderValues";
import { ColDef } from "ag-grid-community";
import GetHeaderParams from "../../../../../src/components/CustomCellAgGrid/CustomHeaderValue";

function propsValue(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    id: locationState?.userId,
    data: locationState?.data.rowItem,
  };
}
const ViewBilling = (props: any) => {
  const location = useLocation();
  let { data } = propsValue(props, location?.state);
  const data1 = data.billingdetailsitems;

  console.log("data  ViewBilling:", data.billingdetailsitems);
  const startDate = new Date(data.serviceStartDate).toLocaleDateString();
  const endDate = new Date(data.serviceEndDate).toLocaleDateString();

  const columnDefs: ColDef[] = [
    {
      headerName: "Modules",
      field: "billingDetailsId",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "parentmodules.keyName",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Number of users",
      field: "numberOfUsers",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "numberOfUsers",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Cost per day",
      field: "cost",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "cost",
      },
      ...GetHeaderParams(),
    },
  ];
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Billing Details
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Organization name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.organization.organizationName}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Start date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{startDate}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Billing status:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.billingType}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  End date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{endDate}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <CustomDivier />
      <Grid container xs={12} ml={3} mt={1}>
        <Grid xs={12}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Modules Details
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <ContainerBoxV2>
        <AgDataGrid
          rowData={data1}
          columnDefs={columnDefs}
          TableHeight={45}
          rowHeight={50}
          handleCellClick={undefined}
          loading={false}
          disableClickSelectionRenderers={false}
          serverSidePagination={false}
          noDataTxt="No Records Found"
        />
      </ContainerBoxV2>
    </>
  );
};

export default ViewBilling;

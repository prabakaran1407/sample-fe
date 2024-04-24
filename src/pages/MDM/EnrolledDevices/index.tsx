/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import { useEffect, useState } from "react";
import * as _ from "lodash";

import { CSVLink } from "react-csv";
import { getAllDevices } from "../../../services/admin/mdm/enrollment.service";
import { Grid, Box, Typography, Button } from "@mui/material";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import PolicyCellRenderer from "../components/PolicyCellRenderer";
import LastCellRenderer from "../components/LastSync";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";
import ActionCellRenderer from "../components/ActionCellRenderer";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
import Loader from "../../../../src/components/PorpagateLoader/PropagateLoader";
import { useAppSelector } from "../../../../src/hooks";

const EnrolledDevices = ({}) => {
  const [_loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const auth = useAppSelector((state) => state.auth);
  const org_data = auth?.data?.userRecord?.organizationData;

  const [csvData, setCsvData] = useState([]);
  // const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, _setTotalCount] = useState(0);

  const columnDefs: ColDef[] = [
    {
      headerName: "Device ID",
      field: "hardwareInfo.model",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 140,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "hardwareInfo.model",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Device Name",
      field: "hardwareInfo.brand",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 180,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "hardwareInfo.brand",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Policy",
      field: "appliedPolicyName",
      filter: true,
      cellRenderer: PolicyCellRenderer,
      cellStyle: {
        textAlign: "center",
      },
      width: 160,
      ...GetHeaderParams(),
    },
    {
      headerName: "Enrolled Details",
      field: "managementMode",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 200,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "managementMode",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Device Version Code",
      field: "hardwareInfo.deviceBasebandVersion",
      filter: true,
      width: 200,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "hardwareInfo.deviceBasebandVersion",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Last Sync",
      field: "toDate",
      filter: true,
      width: 120,
      cellRenderer: LastCellRenderer,
      ...GetHeaderParams(),
    },
    {
      headerName: "Actions",
      field: "toDate",
      filter: true,
      width: 120,
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        getPoliciesList,
      },
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  async function getPoliciesList() {
    setLoading(true);
    await getAllDevices(pageSize, org_data?.enterprise_id).then((res: any) => {
      setTableData(res?.data?.devices);
    });
    setLoading(false);
  }

  // async function getAllDevicesCounts() {
  //   await getAllDevicesCount().then((res: any) => {
  //     // setTableData(res?.data?.devices);
  //     console.log('resres', res);
  //   });
  //   setLoading(false);
  // }

  useEffect(() => {
    setLoading(true);
    getPoliciesList();
  }, [pageSize]);

  useEffect(() => {
    let refactorData = _.reduce(
      tableData,
      (result, value): any => {
        let temp: any = result;
        temp.push({
          DeviceId: _.get(value, "hardwareInfo.model", ""),
          Brand: _.get(value, "hardwareInfo.brand", ""),
          Policy: _.get(value, "appliedPolicyName", ""),
          EnrollDevices: _.get(value, "appliedPolicyName", ""),
          DeviceVersion: _.get(value, "hardwareInfo.deviceBasebandVersion", ""),
          LastUpdated: _.get(value, "lastPolicySyncTime", ""),
        });
        return temp;
      },
      []
    );
    setCsvData(refactorData);
  }, []);

  return (
    <>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="flex-start">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Enrolled Devices
          </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button variant="contained" color="success">
              Sync
            </Button>
          </Grid>

          <Grid item>
            <CSVLink
              data={csvData}
              filename={"Devices-report.csv"}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" color="primary">
                Export
              </Button>
            </CSVLink>
          </Grid>
        </Grid>
      </Box>
      <ContainerBoxV2>
        <Grid container xs={12}>
          {_loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "65vh",
                width: "100%",
              }}
            >
              <Loader />
            </Box>
          ) : (
            <AgDataGrid
              rowData={tableData || []}
              columnDefs={columnDefs}
              TableHeight={58}
              rowHeight={50}
              noDataTxt="No Records Found"
              loading={false}
              // enableCellTextSelection={true}
              serverSidePagination={true}
              pageSize={pageSize}
              totalDataCount={totalCount}
              serverRowSize={pageSize}
              currentPage={page}
              serverPageCount={Math.ceil(totalCount / pageSize)}
              setServerRowSize={(rowSize: number) => {
                setPageSize(rowSize);
              }}
              setServerSidePage={(_e: any, p: number) => {
                setPage(p);
              }}
              page={page}
              setPageSize={setPageSize}
              setPage={setPage}
            />
          )}
        </Grid>
      </ContainerBoxV2>
    </>
  );
};

export default EnrolledDevices;

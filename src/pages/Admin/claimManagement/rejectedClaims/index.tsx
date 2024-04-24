/** @format */

import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import {
  ContainerBoxV2,
  Textfield,
} from "../../../../components/MUI/mui.index";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useEffect, useState } from "react";
import { getUserListForAdmin } from "../../../../components/com_components/CustomerSettingsAPI";
import { useAppSelector } from "../../../../hooks";
import claimManagementService from "../../../../services/claim-management/claim-management.service";

export default function RejectedClaims() {
  const user: any = useAppSelector((state: any) => state.auth).data.userRecord;
  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [filterOptions, setFilterOptions] = useState<any>({
    assigneeLabel: "",
    assigneeValue: "",
    fromDateTimeStamp: "",
    fromDate: "",
    toDateTimeStamp: "",
    toDate: "",
  });

  const [UserTypeOptions, setUserTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getUserData = async () => {
    setLoading(true);
    await getUserListForAdmin(user?.organization_id)
      .then((res) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setUserTypeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
    setLoading(false);
  };

  const getClaimData = async () => {
    setLoading(true);
    try {
      let payload: any = {
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        organization_id: user.organization_id,
        status: "rejected",
      };
      if (
        filterOptions?.assigneeValue !== undefined &&
        filterOptions?.assigneeValue !== ""
      ) {
        payload["userId"] = filterOptions?.assigneeValue;
      }
      if (filterOptions?.fromDate !== "") {
        payload["fromDate"] = filterOptions?.fromDate;
      }
      if (filterOptions?.toDate !== "") {
        payload["toDate"] = filterOptions?.toDate;
      }
      const res = await claimManagementService.getAllClaims(payload);
      setTableData(res?.data?.data);
      setTotalData(res?.data?.total);
    } catch (e) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getClaimData();
  }, [
    filterOptions?.assigneeValue,
    filterOptions?.fromDate,
    filterOptions?.toDate,
  ]);

  const columnDefs: ColDef[] = [
    {
      headerName: "User",
      field: "organizationName",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
    },
    {
      headerName: "Date",
      field: "contactPerson",
      filter: true,
      width: 400,
      suppressMovable: true,
    },
    {
      headerName: "Category",
      field: "contactNumber",
      filter: true,
      width: 400,
      suppressMovable: true,
    },
    {
      headerName: "Claimed",
      field: "emailAddress",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
    {
      headerName: "Approved",
      field: "emailAddress",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
    {
      headerName: "Paid",
      field: "emailAddress",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
    {
      headerName: "View",
      field: "emailAddress",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
    {
      headerName: "Action",
      field: "emailAddress",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
    {
      headerName: "Image",
      field: "emailAddress",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
  ];

  return (
    <>
      <ContainerBoxV2>
        <Grid container alignItems={"center"} columnSpacing={1} rowSpacing={2}>
          <Grid item xs={12} lg={5}>
            <Typography
              sx={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Rejected Claims
            </Typography>
          </Grid>
          <Grid item xs={6} lg={2}>
            <Textfield
              fullWidth
              label="From Date"
              type="date"
              name="fromDate"
              value={filterOptions?.fromDate}
              onChange={(e: any) => {
                const selectedDate = e.target.value;
                const timestamp = new Date(selectedDate).getTime();
                setFilterOptions({
                  ...filterOptions,
                  fromDate: selectedDate,
                  fromDateTimeStamp: timestamp,
                });
              }}
            />
          </Grid>
          <Grid item xs={6} lg={2}>
            <Textfield
              fullWidth
              label="To Date"
              type="date"
              name="toDate"
              value={filterOptions?.toDate}
              onChange={(e: any) => {
                const selectedDate = e.target.value;
                const timestamp = new Date(selectedDate).getTime();
                setFilterOptions({
                  ...filterOptions,
                  toDate: selectedDate,
                  toDateTimeStamp: timestamp,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Autocomplete
              value={filterOptions?.assigneeLabel || null}
              onChange={(_event, newValue) =>
                setFilterOptions({
                  ...filterOptions,
                  assigneeLabel: newValue?.label,
                  assigneeValue: newValue?.value,
                })
              }
              options={UserTypeOptions}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Select Username"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </ContainerBoxV2>
      {/* <CustomDivier /> */}
      <ContainerBoxV2>
        <Grid container xs={12}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "65vh",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <AgDataGrid
              rowData={tableData}
              columnDefs={columnDefs}
              TableHeight={58}
              rowHeight={50}
              handleCellClick={undefined}
              loading={false}
              disableClickSelectionRenderers={false}
              noDataTxt="No Records Found"
              pageSize={pageSize}
              totalDataCount={totalData}
              serverRowSize={pageSize}
              currentPage={page}
              serverSidePagination={true}
              serverPageCount={Math.ceil(totalData / pageSize)}
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
}

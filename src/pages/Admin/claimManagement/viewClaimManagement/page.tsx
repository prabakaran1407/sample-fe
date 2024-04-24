/** @format */

import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import {
  ActionItems,
  ContainerBoxV2,
  Textfield,
  MyDrawer,
  ActionModal,
} from "../../../../components/MUI/mui.index";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useEffect, useState } from "react";
import { getUserListForAdmin } from "../../../../components/com_components/CustomerSettingsAPI";
import { useAppSelector } from "../../../../hooks";
import { Receipt } from "@mui/icons-material";
import { ACTION_ICON_TYPES, CLAIM_STATUS } from "../../../../data/AppConst";
import ImageCellRenderer from "./cellRenderers/imageCellRenderer";
import claimManagementService from "../../../../services/claim-management/claim-management.service";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../utils/globals.ts";
import { CustomDivier } from "../../../../components/APP/app.index.tsx";
import CountUp from "react-countup";

// ****************** Claim Action model
import ClaimView from "./ClaimActions/ClaimView";
import ClaimAction from "./ClaimActions/ClaimActions";
import dayjs from "dayjs";

export default function ActionAreaCard() {
  const user: any = useAppSelector((state: any) => state.auth).data.userRecord;
  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalData, setTotalData] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [countData, setCountData] = useState<any>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any>>({});
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [openOutstandingModal, setOpenOutstandingModal] =
    useState<boolean>(false);
  const [seletSelectedOption, setSelectedOption] = useState<any>({
    pending_approver: true,
    pending_payer: false,
    pending_payment: false,
    reviewed: false,
    rejected: false,
    paid: false,
  });
  const [selectedStatus, setSelectedStatus] = useState("pending_approver");

  const cardData = [
    {
      title: "Pending for Approver",
      value: "pending_approver",
      count: countData?.count?.claimedClaimsCount
        ? countData?.count?.claimedClaimsCount
        : "0",
      claim: CLAIM_STATUS[0]?.value,
    },
    {
      title: "Pending for Payer",
      value: "pending_payer",
      count: countData?.count?.approvedClaimsCount
        ? countData?.count?.approvedClaimsCount
        : "0",
      claim: CLAIM_STATUS[1]?.value,
    },
    {
      title: "Pending for Payment",
      value: "pending_payment",
      count: countData?.count?.pendingForPaymentCount
        ? countData?.count?.pendingForPaymentCount
        : "0",
      claim: CLAIM_STATUS[5]?.value,
    },
    {
      title: "Reviewed",
      value: "reviewed",
      count: countData?.count?.reviewedClaimsCount
        ? countData?.count?.reviewedClaimsCount
        : "0",
      claim: CLAIM_STATUS[3]?.value,
    },
    {
      title: "Rejected",
      value: "rejected",
      count: countData?.count?.rejectedClaimsCount
        ? countData?.count?.rejectedClaimsCount
        : "0",
      claim: CLAIM_STATUS[4]?.value,
    },
    {
      title: "Paid",
      value: "paid",
      count: countData?.count?.paidClaimsCount
        ? countData?.count?.paidClaimsCount
        : "0",
      claim: CLAIM_STATUS[2]?.value,
    },
  ];

  const [currentCard, _setCurrentCard] = useState(0);

  const CustomCard = ({ data, onClick }: any) => {
    return (
      <>
        <Card
          sx={{
            width: "100%",
            height: "90%",
            borderRadius: 2,
            background:
              data?.value === selectedStatus ? COLORS.primary : "#FFFFFF",
            cursor: "pointer",
          }}
          onClick={onClick}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{ fontSize: 14, height: "40px" }}
                    color={
                      data?.value === selectedStatus
                        ? "#FFFFFF"
                        : COLORS.secondary
                    }
                  >
                    {data?.title}
                  </Typography>
                  <Typography
                    color={
                      data?.value === selectedStatus
                        ? "#FFFFFF"
                        : COLORS.secondary
                    }
                    sx={{ fontSize: 22, fontWeight: "600" }}
                  >
                    {/* {data?.count} */}
                    <CountUp start={0} end={data?.count} duration={2.5} />
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ position: "relative", width: "100%" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      right: -2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 35,
                        height: 35,
                        background: "#E9EAEE",
                        borderRadius: 5,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Receipt sx={{ color: COLORS.primary, fontSize: 18 }} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  };

  const [outstandingData, setOutstandingData] = useState<any>([]);

  const [filterOptions, setFilterOptions] = useState<any>({
    assigneeLabel: "",
    assigneeValue: "",
    fromDateTimeStamp: "",
    fromDate: "",
    toDateTimeStamp: "",
    toDate: "",
    status: "",
    statusLabel: "",
  });

  const [UserTypeOptions, setUserTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const setActiveOption = (key: string, filterStatus: string) => {
    let tempObj = {} as any;
    Object.keys(seletSelectedOption).forEach((m) => {
      tempObj[m] = m === key ? true : false;
    });
    setSelectedOption(tempObj);
    setFilterOptions({
      ...filterOptions,
      status: filterStatus,
    });
  };

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

  const getClaimCount = async () => {
    setLoading(true);
    let query = `organization_id=${user?.organization_id}`;
    await claimManagementService
      .getClaimDashboard(query)
      .then((res) => {
        setCountData(res?.data);
      })
      .catch((err: any) => console.log(err.message));
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
    getClaimCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClaimData = async () => {
    setLoading(true);
    try {
      let payload: any = {
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        organization_id: user.organization_id,
        status: CLAIM_STATUS[0].value,
      };
  
      if (filterOptions?.status !== undefined && filterOptions?.status !== "") {
        payload["status"] = filterOptions?.status;
      }
      if (
        filterOptions?.assigneeValue !== undefined &&
        filterOptions?.assigneeValue !== ""
      ) {
        payload["userId"] = filterOptions?.assigneeValue;
      }
  
      // Handle fromDate filter
      if (filterOptions?.fromDate !== "") {
        const fromTimestamp = dayjs(filterOptions?.fromDate).valueOf();
        payload["fromDate"] = fromTimestamp;
      } else {
        // If fromDate filter is empty, use the current date
        const currentDate = new Date();
        const currentDayTimestamp = Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        payload["fromDate"] = currentDayTimestamp;
      }
  
      // Handle toDate filter
      if (filterOptions?.toDate !== "") {
        const toTimestamp = dayjs(filterOptions?.toDate).valueOf();
        payload["toDate"] = toTimestamp;
      } else {
        // If toDate filter is empty, use the current date
        const currentDate = new Date();
        const currentDayTimestamp = Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        payload["toDate"] = currentDayTimestamp;
      }
  
      const res = await claimManagementService.getAllClaims(payload);
      setTableData(res?.data?.data);
      setTotalData(res?.data?.total);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };
  

  const getOutstandingData = async () => {
    setModalLoading(true);
    try {
      let payload: any = {
        organization_id: user.organization_id,
      };
      const res = await claimManagementService.getOutstandingForClaims(
        payload?.organization_id
      );
      setOutstandingData(res?.data?.result);
    } catch (e) {
      console.log("error");
    } finally {
      setModalLoading(false);
    }
  };

  const handleView = async (rowItem: Record<string, any>) => {
    setDrawerOpen(true);
    setSelectedRow(rowItem);
  };

  const handleEdit = async (rowItem: Record<string, any>) => {
    setSelectedRow(rowItem);
    setOpenModel(true);
  };

  const refreshCall = () => {
    getClaimCount();
    getClaimData();
  };

  useEffect(() => {
    getClaimData();
  }, [
    filterOptions?.assigneeValue,
    filterOptions?.fromDate,
    filterOptions?.toDate,
    filterOptions?.status,
    page,
    pageSize,
  ]);

  const columnDefs: ColDef[] = React.useMemo(() => {
    const columns = [
      {
        headerName: "User",
        field: "user.fullname",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellStyle: { textTransform: "capitalize" },
        cellRendererParams: {
          field: "user.fullname",
        },
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Date",
        field: "createdAt",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "createdAt",
          length: false,
          formatter: (value: any) =>
            value ? new Date(value).toLocaleDateString() : "",
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Claim type",
        field: "claimType.typeOfClaim",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "claimType.typeOfClaim",
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Claimed",
        field: "totalExpenses",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "totalExpenses",
          formatter: (value: any) => value.toString(),
        },
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      // {
      //   headerName: "Approved",
      //   field: "approvedAmount",
      //   filter: true,
      //   width: 500,
      //   cellRenderer: CustomCellRenderValues,
      //   cellRendererParams: () => ({
      //     field: "approvedAmount",
      //     formatter: (value: any) => value.toString(),
      //   }),
      //   suppressMovable: true,
      //   ...GetHeaderParams(),
      // },
      // {
      //   headerName: "Paid",
      //   field: "paidAmount",
      //   filter: true,
      //   width: 500,
      //   cellRenderer: CustomCellRenderValues,
      //   cellRendererParams: () => ({
      //     field: "paidAmount",
      //     formatter: (value: any) => value.toString(),
      //   }),
      //   suppressMovable: true,
      //   ...GetHeaderParams(),
      // },
      // {
      //   headerName: "Image",
      //   field: "",
      //   cellRenderer: ImageCellRenderer,
      //   filter: true,
      //   width: 500,
      //   suppressMovable: true,
      //   ...GetHeaderParams({
      //     display: "flex",
      //     justifyContent: "center",
      //     width: "100%",
      //   }),
      // },
      // {
      //   headerName: "Actions",
      //   field: "",
      //   cellRenderer: ActionItems,
      //   cellRendererParams: {
      //     permission: {
      //       can_edit:
      //         seletSelectedOption?.pending_approver ||
      //         seletSelectedOption?.pending_payer ||
      //         seletSelectedOption?.pending_payment
      //           ? true
      //           : false,
      //       can_view: true,
      //     },
      //     enableActions: ACTION_ICON_TYPES,
      //     handleEdit: handleEdit,
      //     handleView: handleView,
      //   },
      //   width: 500,
      //   suppressMovable: true,
      //   ...GetHeaderParams({
      //     display: "flex",
      //     justifyContent: "center",
      //     width: "100%",
      //   }),
      // },
    ];
    if (!seletSelectedOption?.pending_approver) {
      columns.push({
        headerName: "Approved",
        field: "approvedAmount",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "approvedAmount",
          formatter: (value: any) => value.toString(),
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      });
    }
    if (
      !seletSelectedOption?.pending_approver &&
      !seletSelectedOption?.pending_payer
    ) {
      columns.push({
        headerName: "Requested",
        field: "requestPaymentAmount",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "requestPaymentAmount",
          formatter: (value: any) => value.toString(),
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      });
    }
    if (seletSelectedOption?.paid) {
      columns.push({
        headerName: "Paid",
        field: "paidAmount",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "paidAmount",
          formatter: (value: any) => value.toString(),
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      });
    }
    columns.push(
      {
        headerName: "Image",
        field: "",
        cellRenderer: ImageCellRenderer,
        filter: true,
        width: 400,
        cellRendererParams: () => ({
          field: "",
        }),
        suppressMovable: true,
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
      {
        headerName: "Actions",
        field: "",
        filter: false,
        cellRenderer: ActionItems,
        cellRendererParams: () => ({
          field: "",
          permission: {
            can_edit:
              seletSelectedOption?.pending_approver ||
              seletSelectedOption?.pending_payer ||
              seletSelectedOption?.pending_payment
                ? true
                : false,
            can_view: true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
        }),
        width: 400,
        suppressMovable: true,
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      }
    );

    return columns;
  }, [seletSelectedOption]);

  if (filterOptions.status === "approved") {
    columnDefs[0].headerName = "Approver";
  }
  if (filterOptions.status === "paid") {
    columnDefs[0].headerName = "Payer";
  }

  const modalColDef: ColDef[] = React.useMemo(
    () => [
      {
        headerName: "User",
        field: "firstName",
        filter: true,
        width: 500,
        cellRenderer: function (params: any) {
          const firstName = params.data.firstName;
          const lastName = params.data.lastName;
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {firstName ? `${firstName} ${lastName}` : "--"}
              </Typography>
            </Box>
          );
        },
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Claimed",
        field: "claimed",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "claimed",
          formatter: (value: any) => value?.toString(),
        },
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Approved",
        field: "pendingForPayment",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "pendingForPayment",
          formatter: (value: any) => value?.toString(),
        },
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Paid",
        field: "paid",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "paid",
          formatter: (value: any) => value?.toString(),
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Balance",
        field: "balance",
        filter: true,
        width: 400,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "balance",
          formatter: (value: any) => value?.toString(),
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      },
    ],
    []
  );

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12} rowSpacing={2}>
          <Grid item xs={12} lg={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Claim Management
              </Typography>
              <Button
                variant="text"
                onClick={() => {
                  getOutstandingData();
                  setOpenOutstandingModal(true);
                }}
              >
                View Outstanding Balance
              </Button>
            </Stack>
          </Grid>
          {/* <Grid item xs={12} lg={3}>
            <Autocomplete
              value={filterOptions?.statusLabel || null}
              onChange={(_event, newValue) =>
                setFilterOptions({
                  ...filterOptions,
                  statusLabel: newValue?.label,
                  status: newValue?.value,
                })
              }
              options={CLAIM_STATUS}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Select claimed status"
                  variant="outlined"
                />
              )}
            />
          </Grid> */}
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <ContainerBoxV2>
        <Grid
          container
          columnSpacing={2}
          sx={{ display: "flex", overflow: "hidden" }}
        >
          {cardData
            ?.slice(currentCard, currentCard + 6)
            ?.map((data: any, index: any) => (
              <Grid key={index} item xs={6} md={4} lg={2}>
                <CustomCard
                  data={data}
                  onClick={() => {
                    setActiveOption(data?.value, data?.claim);
                    setSelectedStatus(data?.value);
                  }}
                />
              </Grid>
            ))}
        </Grid>
        <Grid
          container
          alignItems={"center"}
          columnSpacing={1}
          rowSpacing={1}
          my={1}
        >
          <Grid item xs={12} lg={5}>
            <Typography
              style={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {filterOptions.status === "claimed"
                ? "Claimed Amount by User"
                : filterOptions.status === "approved"
                ? "Approved Claimed Amount"
                : filterOptions.status === "pendingForPayment"
                ? "Pending Payment Claimed Amount"
                : filterOptions.status === "paid"
                ? "Paid Claimed Amount"
                : filterOptions.status === "reviewed"
                ? "Reviewed Claimed Amount"
                : filterOptions.status === "rejected"
                ? "Rejected Claimed Amount"
                : filterOptions.status === ""
                ? "Claimed Amount by User"
                : // ? "Total Claimed Amount"
                  ""}
            </Typography>
          </Grid>
          <Grid item xs={6} lg={2}>
            {/* <InputLabel
              shrink
              sx={{ fontSize: 16, fontWeight: '600', color: '#181C32' }}>
              From Date
            </InputLabel> */}
            <Textfield
              fullWidth
              label="From Date"
              type="date"
              name="fromDate"
              value={filterOptions?.fromDate}
              onChange={(e: any) => {
                const selectedDate = e.target.value ? e.target.value : new Date();
                const timestamp = new Date(selectedDate).getTime();
                setFilterOptions({
                  ...filterOptions,
                  fromDate: selectedDate,
                  fromDateTimeStamp: timestamp,
                });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6} lg={2}>
            {/* <InputLabel
              shrink
              sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
            >
              To Date
            </InputLabel> */}
            <Textfield
              fullWidth
              label="To Date"
              type="date"
              name="toDate"
              value={filterOptions?.toDate}
              onChange={(e: any) => {
                const selectedDate = e.target.value ? e.target.value : new Date();
                const timestamp = new Date(selectedDate).getTime();
                setFilterOptions({
                  ...filterOptions,
                  toDate: selectedDate,
                  toDateTimeStamp: timestamp,
                });
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            {/* <InputLabel
              shrink
              sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
            >
              User
            </InputLabel> */}
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
              <PropagateLoader color={COLORS.primary} />
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
        <MyDrawer
          anchor={"right"}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onClose={undefined}
          onOpen={() => {
            undefined;
          }}
          drawerWidth="35%"
          title="Claim view"
        >
          <ClaimView
            selectedRow={selectedRow}
            seletSelectedOption={seletSelectedOption}
          />
        </MyDrawer>
        <ActionModal
          open={openModel}
          onClose={() => {
            setOpenModel(false);
          }}
          title="Claim action"
        >
          <ClaimAction
            selectedRow={selectedRow}
            setOpenModel={setOpenModel}
            refreshCall={refreshCall}
            seletSelectedOption={seletSelectedOption}
          />
        </ActionModal>
        <ActionModal
          open={openOutstandingModal}
          onClose={() => {
            setOpenOutstandingModal(false);
          }}
          title="Total Outstanding Balance"
        >
          {modalLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
                width: "100%",
              }}
            >
              <PropagateLoader color={COLORS.primary} />
            </Box>
          ) : (
            <AgDataGrid
              rowData={outstandingData}
              columnDefs={modalColDef}
              TableHeight={58}
              rowHeight={50}
              handleCellClick={undefined}
              loading={false}
              disableClickSelectionRenderers={false}
              noDataTxt="No Records Found"
            />
          )}
        </ActionModal>
      </ContainerBoxV2>
    </>
  );
}

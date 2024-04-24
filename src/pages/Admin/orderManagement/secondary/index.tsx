/** @format */

import { useEffect, useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ActionIconButton,
  ActionItems,
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../../../components/MUI/mui.index.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useAppSelector } from "../../../../hooks/index.ts";
import {
  BarChart,
  ChevronLeft,
  ChevronRight,
  FilterList,
  TrendingFlat,
} from "@mui/icons-material";
import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../../data/AppConst.ts";
import * as _ from "lodash";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../utils/globals.ts";
import { CustomDivier } from "../../../../components/APP/app.index.tsx";
import settingsService from "../../../../services/settings/settings.service.ts";
import OrderManagementService from "../../../../services/admin/OrderManagement.service.ts";
import { APP_ROUTES } from "../../../../data/AppRoutes.ts";
import AdminSalesManagementService from "../../../../services/admin/sales/Sales.service.ts";
import AUMService from "../../../../services/admin/UserManagemet.service.ts";
import GeneralApiService from "../../../../services/genearls/general.service";
import { dayStartOrEnd } from "../../../../utils/datetime.ts";

export default function SecondaryOrder() {
  const navigate = useNavigate();
  const user: any = useAppSelector((state: any) => state.auth).data.userRecord;
  const [tableData, setTableData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<any>();
  const [cardData, setCardData] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [statusOption, setStatusOption] = useState<any>({});
  const [orderStatus, setOrderStatus] = useState<any>();
  const [cancelledStatusId, setCancelledStatusId] = useState<any>();
  const [reason, setReason] = useState("");

  // ************** filter set
  const [filterOptions, setFilterOptions] = useState<any>({});
  const [openFilterModel, setOpenFilterModel] = useState(false);
  const [filterDropDown, setFilterDropDowns] = useState<any>({});

  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };

  const handleStatusChange = (field: any, value: any) => {
    setOrderStatus({
      ...orderStatus,
      [field]: value,
    });
  };

  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.SECONDARY?.view,
      {
        id: rowItem?.id,
      }
    );
    navigate(pathUrl, {
      state: {
        primaryView: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };

  const getOrderCount = async () => {
    try {
      const payload = {
        organization_id: user.organization_id,
        type: user?.CONSTANT_DATA?.ORDER_SETTING_TYPES[1],
      };
      const countRes = await OrderManagementService.getOrderCount(payload);
      const responseData = countRes?.data?.countByStatus || [];

      const pendingStatus = responseData.find(
        (status: any) => status.type === "Pending"
      );
      if (pendingStatus) {
        setSelected(pendingStatus?.id);
      }

      const cancelledStatus = responseData.find(
        (status: any) => status.type === "Cancelled"
      );

      if (cancelledStatus) {
        setCancelledStatusId(cancelledStatus?.id);
      }

      setCardData(responseData);
    } catch (error) {
      console.log("Error fetching count data:", error);
    }
  };

  const getStatusList = async () => {
    try {
      const payload = {
        matchObj: {
          status: true,
          settingsType: user?.CONSTANT_DATA?.ORDER_SETTING_TYPES[1],
        },
        organization_id: user.organization_id,
      };
      const listRes = await settingsService.listAllOrderSetting(
        payload,
        "?isCount=true"
      );
      if (listRes?.status) {
        const responseData = listRes?.data?.response?.data || [];

        const filteredStatus = responseData.map((e: any) => ({
          label: e?.value,
          value: e?._id,
        }));
        setStatusOption(filteredStatus);
      }
    } catch (error) {
      console.log("Error fetching status:", error);
    }
  };

  const getAllOrders = async () => {
    setLoading(true);
    try {
      let payload = {
        organization_id: user.organization_id,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        status: selected?.toLowerCase(),
        type: "secondary",
      } as any;
      if (Object.values(filterOptions)?.some((ev) => Boolean(ev))) {
        if (filterOptions?.user) {
          payload.user = [filterOptions.user?.value];
        }
        if (filterOptions?.orderNo) {
          payload.orderNo = filterOptions?.orderNo?.label;
        }

        if (filterOptions?.fromDate) {
          payload.fromDate = dayStartOrEnd(filterOptions?.fromDate)?.valueOf();
        }
        if (filterOptions?.toDate) {
          payload.toDate = dayStartOrEnd(
            filterOptions?.toDate,
            "END"
          )?.valueOf();
        }
        if (filterOptions?.customers) {
          payload.customers = filterOptions.customers?.value;
        }
      } else {
        payload.fromDate = dayStartOrEnd(new Date())?.valueOf();
        payload.toDate = dayStartOrEnd(new Date(), "END")?.valueOf();
      }
      const response = await OrderManagementService.getAll(payload);

      setTableData(response?.data?.data || []);
      setTotalData(response?.data?.total || 0);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDropDownData = async () => {
    try {
      let tempObj: any = {};
      const orderNoData = await GeneralApiService.accessModel("Sales", {
        where: {
          organization_id: user?.organization_id,
          type: "secondary",
        },
        select: ["orderNo", "id"],
      });
      let customer_url = `/general/customers?organization_id=${user?.organization_id}&select=customerName,id`;
      const customerData = await AdminSalesManagementService.defaultApi(
        customer_url
      );
      let payload = {
        populate: true,
        select: [
          "firstName",
          "lastName",
          "id",
          "emailAddress",
          "mobile",
          "status",
          "isAdmin",
        ],

        where: {
          status: true,
        },
        organization_id: user?.organization_id,
        isAdmin: false,
      };
      const userData = await AUMService.getAll(payload);

      tempObj.orderNo = orderNoData?.data?.map((m: any) => ({
        label: m?.orderNo,
        value: m?.id,
      }));
      tempObj.customers = customerData?.data?.map((m: any) => ({
        label: m?.customerName,
        value: m?.id,
      }));
      tempObj.users = userData?.data?.data?.map((m: any) => ({
        label: m?.fullname,
        value: m?.id,
      }));
      setFilterDropDowns({ ...tempObj });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateOrderStatus = async () => {
    setLoading(true);
    try {
      const payload = {
        id: selectedRow,
        producttype: [],
        status: orderStatus?.filteredStatus?.value,
        organization_id: user.organization_id,
        type: "secondary",
        reason: reason,
      };
      await OrderManagementService.updateOrder(payload);
    } catch (error) {
      console.log("Error while updating status", error);
    } finally {
      setSelectedRow([]);
      setOpenStatusModal(false);
      getAllOrders();
      getOrderCount();
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [page, pageSize, selected]);

  useEffect(() => {
    getOrderCount();
    getStatusList();
    getDropDownData();
  }, []);

  const [currentCard, setCurrentCard] = useState(0);

  const handleNext = () => {
    const nextStart = Math.min(currentCard + 1, cardData.length);
    setCurrentCard(nextStart);
  };

  const handlePrev = () => {
    const prevStart = Math.max(currentCard - 1, 0);
    setCurrentCard(prevStart);
  };

  const CustomCard = ({ data, onClick }: any) => {
    return (
      <>
        <Card
          sx={{
            width: "100%",
            height: "90%",
            borderRadius: 2,
            background: data?.id === selected ? COLORS.primary : "#FFFFFF",
            cursor: "pointer",
          }}
          onClick={onClick}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{ fontSize: 14, textTransform: "capitalize" }}
                    color={data?.id === selected ? "#FFFFFF" : COLORS.secondary}
                  >
                    {data?.value}
                  </Typography>
                  <Typography
                    color={data?.id === selected ? "#FFFFFF" : COLORS.secondary}
                    sx={{ fontSize: 22, fontWeight: "600" }}
                  >
                    {data?.count}
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
                        width: 30,
                        height: 30,
                        background: "#E9EAEE",
                        borderRadius: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <BarChart sx={{ color: COLORS.primary, fontSize: 18 }} />
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

  const onSelectionChanged = (event: any) => {
    const selectedRows: string[] = event.api
      .getSelectedRows()
      .map((row: any) => row.id.toString());
    setSelectedRow(selectedRows);
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 100,
        showDisabledCheckboxes: true,
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Date",
        field: "sales.createdAt",
        filter: true,
        width: 300,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "sales.createdAt",
          length: false,
          formatter: (value: any) =>
            value ? new Date(value).toLocaleDateString() : "",
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Order Number",
        field: "orderNo",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "orderNo",
        }),
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "Approved Date",
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
        headerName: "Customer",
        field: "sales.customer.customerName",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "sales.customer.customerName",
          formatter: (value: any) => value.toString(),
        },
        suppressMovable: true,
        ...GetHeaderParams(),
      },
      {
        headerName: "View",
        field: "",
        cellRenderer: ActionItems,
        cellRendererParams: {
          permission: {
            can_view: true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleView: handleView,
        },
        width: 200,
        suppressMovable: true,
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    []
  );

  return (
    <>
      <ContainerBoxV2>
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Order Management - Secondary
              </Typography>
              <Box columnGap={1} sx={{ display: "flex" }}>
                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[6]}
                  sx={{
                    background: COLORS.primary,
                    borderRadius: 1,
                    width: 38,
                    height: 38,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  onClick={() => {
                    getAllOrders();
                  }}
                />
                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[11]}
                  sx={{
                    background: COLORS.primary,
                    borderRadius: 1,
                    width: 38,
                    height: 38,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  onClick={() => {
                    setOpenFilterModel(true);
                  }}
                  title="Filter"
                >
                  <FilterList sx={{ color: "white", fontSize: 16 }} />
                </ActionIconButton>
              </Box>
            </Box>
          </Grid>
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
              <Grid
                key={index}
                item
                xs={6}
                md={4}
                lg={2}
                // style={{
                //    transform: `translateX(${(index - currentCard) * 100}%)`,
                // }}
              >
                <CustomCard data={data} onClick={() => setSelected(data?.id)} />
              </Grid>
            ))}
          {cardData?.length > 6 && (
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Tooltip title="Previous">
                    <IconButton
                      onClick={handlePrev}
                      disabled={currentCard === 0}
                      sx={{
                        width: 25,
                        height: 25,
                        background: COLORS.primary,
                        "&:hover": {
                          background: COLORS.secondary,
                        },
                      }}
                    >
                      <ChevronLeft sx={{ color: "#fff", fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Next">
                    <IconButton
                      onClick={handleNext}
                      disabled={currentCard === cardData.length - 6}
                      sx={{
                        width: 25,
                        height: 25,
                        background: COLORS.primary,
                        "&:hover": {
                          background: COLORS.secondary,
                        },
                      }}
                    >
                      <ChevronRight sx={{ color: "#fff", fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
        {!_.isEmpty(selectedRow) && (
          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setOpenStatusModal(true);
                  }}
                >
                  Change Status
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={1} mt={1}>
          <Grid item xs={12}>
            {loading ? (
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
                rowData={tableData}
                columnDefs={columnDefs}
                TableHeight={58}
                rowHeight={50}
                noDataTxt="No Records Found"
                handleCellClick={undefined}
                loading={false}
                rowSelection={"multiple"}
                disableClickSelectionRenderers={false}
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
                onSelectionChanged={onSelectionChanged}
              />
            )}
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <ActionModal
        open={openFilterModel}
        onClose={() => {
          setOpenFilterModel(false);
        }}
        title="Advance filter | Select atleast one filter"
        modalWidth="45%"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Textfield
                  fullWidth
                  label="From Date"
                  type="date"
                  name="fromDate"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    handleFilterChange("fromDate", selectedDate);
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions?.fromDate}
                />
              </Grid>

              <Grid item xs={6}>
                <Textfield
                  fullWidth
                  label="To Date"
                  type="date"
                  name="toDate"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    handleFilterChange("toDate", selectedDate);
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions?.toDate}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  value={filterOptions?.orderNo}
                  onChange={(_event, newValue) => {
                    handleFilterChange("orderNo", newValue);
                  }}
                  options={filterDropDown?.orderNo}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Order No"
                      variant="outlined"
                      placeholder="Select order no."
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  value={filterOptions?.customers}
                  onChange={(_event, newValue) => {
                    handleFilterChange("customers", newValue);
                  }}
                  options={filterDropDown?.customers}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      label="Customer"
                      placeholder="Select customer"
                    />
                  )}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <AutoComplete
                  value={filterOptions?.user}
                  onChange={(_event, newValue) => {
                    handleFilterChange("user", newValue);
                  }}
                  options={filterDropDown?.users}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="User"
                      placeholder="Select user"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ fontSize: 16, fontWeight: "600" }}
                  onClick={() => {
                    setOpenFilterModel(false);
                    if (page != 1) {
                      setPage(1);
                    } else {
                      getAllOrders();
                    }
                  }}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ActionModal>
      <ActionModal
        open={openStatusModal}
        onClose={() => {
          setOpenStatusModal(false);
        }}
        title="Change order status"
        modalWidth="35%"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
          }}
        >
          <Typography>
            {cardData.find((status: any) => status?.id === selected)?.value}
          </Typography>
          <TrendingFlat sx={{ fontSize: 46 }} />

          <Box sx={{ width: "60%" }}>
            <AutoComplete
              value={orderStatus?.filteredStatus}
              onChange={(_event, newValue) => {
                handleStatusChange("filteredStatus", newValue);
              }}
              options={statusOption}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  label="Status"
                  variant="outlined"
                  placeholder="Select order status"
                />
              )}
            />
          </Box>
        </Box>
        {orderStatus?.filteredStatus?.value === cancelledStatusId &&
          orderStatus?.filteredStatus?.value !== undefined && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ width: "60%", py: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Reason"
                  variant="outlined"
                  placeholder="Enter reason"
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </Box>
            </Box>
          )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenStatusModal(false);
            }}
            sx={{ mx: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateOrderStatus();
              setOpenStatusModal(false);
            }}
          >
            Update Status
          </Button>
        </Box>
      </ActionModal>
    </>
  );
}

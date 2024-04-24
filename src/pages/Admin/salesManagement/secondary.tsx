/**
 * eslint-disable prefer-const
 *
 * @format
 */

/**
 * eslint-disable prefer-const
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useEffect, useState } from "react";
import {
  ActionIconButton,
  ActionItems,
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../..//components/MUI/mui.index";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";

import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import AdminSalesManagementService from "../../../services/admin/sales/Sales.service.ts";
import LocalStorage from "../../../libs/localStorage.service";
// import StatusCellRenderer from "./statuscellrender";
import { ACTION_ICON_TYPES } from "../../../data/AppConst";
import { CustomDivier } from "../../../components/APP/app.index";
import { TNestedObj } from "../../..//types/global.types";
import LeaveApprovalModal from "../../../components/MUI/LeaveModal/LeaveModal";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";
import { useAppSelector } from "../../../hooks";
import { getUserListForAdmin } from "../../../components/com_components/CustomerSettingsAPI.tsx";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { COLORS } from "../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
import DateCellRenderer from "../attendancemanagement/cellRenderers/dateCellRenderer.tsx";
import { generatePath, useNavigate } from "react-router-dom";
import { AUM_FORM_ACTION_TYPES } from "../../../data/AppConst.ts";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import { dayStartOrEnd } from "../../../../src/utils/datetime.ts";
import FilterListIcon from "@mui/icons-material/FilterList";
import AUMService from "../../../services/admin/UserManagemet.service.ts";
import GeneralApiService from "../../../services/genearls/general.service";

const LeaveManagement = () => {
  // const [tableData, setTableData] = useState([]);
  // const [singleData, setSingleData] = useState<TNestedObj>({});
  // const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  // const [totalData, setTotalData] = useState(0);
  // const [loading, setLoading] = useState(true);

  // ******************** State
  const auth = useAppSelector((state) => state.auth);

  const [tableData, setTableData] = useState<TNestedObj[]>([]);
  // const [openModal, setOpenModal] = useState(false);
  // const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, _setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(true);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_assigneeOptions, setAssigneeOptions] = useState([]);

  const [filterOptions, setFilterOptions] = useState<any>({
    statusLabel: "",
    statusValue: "",
    assigneeLabel: "",
    assigneeValue: "",
    fromDate: "",
    fromDateTimeStamp: 0,
    toDate: "",
    toDateTimeStamp: 0,
  });
  const [openModel, setOpenModel] = useState(false);
  const [filterDropDown, setFilterDropDowns] = useState<any>({});

  let getPayload = {
    organization_id: auth?.data?.userRecord?.organization_id,
  };

  // const handleUpdateReq = (value: TNestedObj) => {
  //   setRowItem(value);
  //   setIsModalOpen(true);
  // };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.SECONDARY?.view,
      {
        id: rowItem?.id,
      }
    );
    navigate(pathUrl, {
      state: {
        secondaryView: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };
  const columnDefs: ColDef[] = [
    {
      headerName: "Date",
      field: "createdAt",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      // cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "createdAt",
      },
      cellRenderer: DateCellRenderer,

      ...GetHeaderParams(),
    },
    {
      headerName: "Order No",
      field: "orderNo",
      filter: true,
      width: 400,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "orderNo",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "User",
      field: "user.fullname",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "user.fullname",
      },

      ...GetHeaderParams(),
    },
    {
      headerName: "Customer",
      field: "customer.customerName",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "customer.customerName",
      },

      ...GetHeaderParams(),
    },

    {
      headerName: "Billing Party",
      field: "customer.customerName",
      filter: true,
      width: 450,
      cellStyle: { textTransform: "capitalize" },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "customer.customerName",
      },

      ...GetHeaderParams(),
    },

    {
      headerName: "Quantity",
      field: "quantity",
      filter: true,
      width: 400,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "quantity",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Value",
      field: "value",
      filter: true,
      width: 400,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "value",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Status",
      field: "status",
      width: 400,

      cellStyle: function (params) {
        let backgroundColor = "";
        let textColor = "#000000";
        let marginTopValue = "12px";
        if (params.value === "open") {
          backgroundColor = "#ffe0b2";
          textColor = "#f57c00";
        } else if (params.value === "approved") {
          backgroundColor = "#C6F1DA";
          textColor = "#1A4331";
        }
        return {
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          textTransform: "capitalize",
          backgroundColor: backgroundColor,
          borderRadius: "30px",
          color: textColor,
          height: "50%",
          marginTop: marginTopValue,
        };
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Actions",
      field: "",
      width: 400,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  // const currentDate = new Date();

  const getLeaveManagementlist = async () => {
    setLoading(true);
    try {
      let localStoreData = LocalStorage.parseObj(
        LocalStorage.parseObj(LocalStorage.getItem("userData"))
      );
      let payload: any = {
        organization_id: localStoreData?.organization_id,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        type: "secondary",
      };
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

      let salesData = await AdminSalesManagementService.getAllSalesData(
        payload
      );
      setTableData(salesData?.data.response.data);
      setTotalCount(salesData?.data.response.total);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const downloadSalesData = () => {
    const salesData = tableData;

    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent +=
      "orderNo,createdAt,productType,productName,quantity,value,size,color,brandData,mrpPrice,sellingPrice\n";

    salesData.forEach((item) => {
      const { orderNo, createdAt, sales }: any = item;
      const createdAtDate = new Date(createdAt).toLocaleDateString();
      Object.entries(sales).forEach(([productType, products]: any) => {
        Object.entries(products).forEach(
          ([productName, productDetails]: any) => {
            // Generate CSV rows for each product
            productDetails.forEach((product: any) => {
              const {
                quantity,
                value,
                size,
                color,
                brandData,
                mrpPrice,
                sellingPrice,
              } = product;
              csvContent += `${orderNo},${createdAtDate},${productType},${productName},${quantity},${value},${size},${color},${brandData},${mrpPrice},${sellingPrice}\n`;
            });
          }
        );
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sales_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };

  const getUserData = async () => {
    await getUserListForAdmin(getPayload?.organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setAssigneeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };
  const getDropDownData = async () => {
    try {
      let tempObj: any = {};
      const orderNoData = await GeneralApiService.accessModel("Sales", {
        where: {
          organization_id: auth?.data?.userRecord?.organization_id,
          type: "secondary",
        },
        select: ["orderNo", "id"],
      });
      const customerData = await GeneralApiService.accessModel("Customers", {
        where: {
          organization_id: auth?.data?.userRecord?.organization_id,
        },
        select: ["customerName", "id"],
      });
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
        organization_id: auth?.data?.userRecord?.organization_id,
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
    } catch (error) {}
  };

  useEffect(() => {
    getLeaveManagementlist();
  }, [
    page,
    pageSize,
    // filterOptions?.assigneeValue,
    // filterOptions?.statusValue,
    // filterOptions,
  ]);

  useEffect(() => {
    getUserData();
    getDropDownData();
  }, []);

  return (
    <div>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                  Sales Management - Secondary
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container columnSpacing={3.5} justifyContent={"end"}>
                  {/* <Grid item xs={4}>
                    <Textfield
                      fullWidth
                      label='From Date'
                      type='date'
                      name='fromDate'
                      onChange={(e: any) => {
                        const selectedDate = e.target.value;
                        const fromDate = selectedDate
                          ? selectedDate
                          : new Date().toISOString().split('T')[0];
                        handleFilterChange('fromDate', fromDate);
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid> */}

                  {/* <Grid item xs={4}>
                    <Textfield
                      fullWidth
                      label='To Date'
                      type='date'
                      name='toDate'
                      onChange={(e: any) => {
                        const selectedDate = e.target.value;
                        const toDate = selectedDate
                          ? selectedDate
                          : new Date().toISOString().split('T')[0];
                        handleFilterChange('toDate', toDate);
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid> */}
                  {/* <Grid item xs={3}>
                    <Autocomplete
                      value={filterOptions?.assigneeLabel || null}
                      onChange={(_event, newValue) =>
                        setFilterOptions({
                          ...filterOptions,
                          assigneeLabel:
                            newValue === null ? '' : newValue?.label,
                          assigneeValue:
                            newValue === null ? '' : newValue?.value,
                        })
                      }
                      options={assigneeOptions}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          size='small'
                          label='Users'
                          variant='outlined'
                        />
                      )}
                    />
                  </Grid> */}
                  {/* <Grid item xs={1}>
                    <ActionIconButton
                      actionType={ACTION_ICON_TYPES[6]}
                      sx={{
                        background: COLORS.primary,
                        borderRadius: 1,
                        width: 38,
                        height: 38,
                        '&:hover': {
                          background: COLORS.secondary,
                        },
                      }}
                      onClick={() => {
                        getLeaveManagementlist();
                      }}
                    />
                  </Grid> */}
                  <Grid item xs={1}>
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
                        getLeaveManagementlist();
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
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
                        setOpenModel(true);
                      }}
                      title="Filter"
                    >
                      <FilterListIcon sx={{ color: "white", fontSize: 16 }} />
                    </ActionIconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Grid sx={{ padding: 1.5, justifyContent: "end", display: "flex" }}>
          <Button variant="contained" onClick={downloadSalesData}>
            Export CSV
          </Button>
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
              noDataTxt="No Records Found"
              loading={false}
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
              // onPaginationChanged={getLeaveManagementlist}
              fetchData={getLeaveManagementlist}
            />
          )}
        </Grid>
        <LeaveApprovalModal
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
          }}
          reRender={() => {
            getLeaveManagementlist();
          }}
          reason={rowItem.reason}
          rowItem={rowItem}
          // replace with the actual field name
        />
      </ContainerBoxV2>
      <ActionModal
        open={openModel}
        onClose={() => {
          setOpenModel(false);
        }}
        title="Advance filter | select atleast one filter"
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
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6} sx={{ height: "30px" }}>
                <Textfield
                  fullWidth
                  label="From Date"
                  type="date"
                  name="fromDate"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;

                    handleFilterChange("fromDate", selectedDate);
                    // setFilterOptions({
                    //   ...filterOptions,
                    //   fromDate:
                    // })
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

                    // setFilterOptions({
                    //   ...filterOptions,
                    //   orderNo: newValue
                    // })
                  }}
                  options={filterDropDown?.orderNo}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Order No"
                      variant="outlined"
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
                      label="customer"
                    />
                  )}
                  // value={null}
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
                      label="Users"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setOpenModel(false);
                    if (page != 1) {
                      setPage(1);
                    } else {
                      getLeaveManagementlist();
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
    </div>
  );
};

export default LeaveManagement;

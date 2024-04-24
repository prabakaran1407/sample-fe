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
  ContainerBoxV2,
  Textfield,
} from "../../..//components/MUI/mui.index";
import {
  Box,
  // CircularProgress,
  Grid,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Popper,
  Button,
} from "@mui/material";

import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import LeaveManagementservice from "../../../services/admin/LeaveManagement.service";
import LocalStorage from "../../../libs/localStorage.service";
import StatusCellRenderer from "./statuscellrender";
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
import dayjs from "dayjs";
import { CSVLink } from "react-csv";
import { getTimeStamp } from "../../../../src/utils/datetime.ts";


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
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(true);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [csvData, setCsvData] = useState([]);


  const [filterOptions, setFilterOptions] = useState<any>({
    statusLabel: "",
    statusValue: "",
    assigneeLabel: "",
    assigneeValue: "",
    fromDate: '',
    fromDateTimeStamp: 0,
    toDate: '',
    toDateTimeStamp: 0,
    user: [],
    organization_id: '',
  });
  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };


  let getPayload = {
    organization_id: auth?.data?.userRecord?.organization_id,
  };

  const handleUpdateReq = (value: TNestedObj) => {
    setRowItem(value);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Employee Code",
      field: "user.embCode",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "user.embCode",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: " User Name",
      field: "user.firstName",
      filter: true,
      width: 500,
      cellStyle: { textTransform: "capitalize" },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "user.firstName",
      },
      ...GetHeaderParams(),
    },
    // {
    //   headerName: 'Leave Type',
    //   field: '',
    //   filter: true,
    //   width: 500,
    // },
    {
      headerName: "Start Date",
      field: "fromDate",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "fromDate",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "End Date",
      field: "toDate",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "toDate",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Status",
      field: "status",
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      cellRenderer: StatusCellRenderer,
      // headerComponent: StatusHeader,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },

    {
      headerName: "Actions",
      field: "",
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          canUpdateReq: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleUpdateReq: handleUpdateReq,
      },
      // headerComponent: ActionHeader,
      width: 400,
      suppressMovable: true,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  const STATUS_ARRAY = [
    {
      label: "Applied",
      value: "applied",
      color: "#f57c00",
      backGroundColor: "#ffe0b2",
    },
    {
      label: "Rejected",
      value: "rejected",
      color: "#b71c1c",
      backGroundColor: "#ffcdd2",
    },
    {
      label: "Approved",
      value: "approved",
      color: "#1A4331",
      backGroundColor: "#C6F1DA",
    },
  ];

  const getLeaveManagementlist = async () => {
    setLoading(true);
    try {
      let localStoreData = LocalStorage.parseObj(
        LocalStorage.parseObj(LocalStorage.getItem("userData"))
      );
  
      // Get current UTC date and set time to midnight
      const currentDate = new Date();
      const currentDayTimestamp = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
      let payload = {
        where: JSON.stringify({
          organization_id: localStoreData?.organization_id,
        }),
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        filterStatus:
          filterOptions?.statusValue === "" ? "" : filterOptions?.statusValue,
        userId:
          filterOptions?.assigneeValue === ""
            ? ""
            : filterOptions?.assigneeValue,
        startDate: filterOptions?.fromDateTimeStamp || currentDayTimestamp, // Use static currentDayTimestamp if fromDate is empty
        endDate: filterOptions?.toDateTimeStamp || currentDayTimestamp, // Use static currentDayTimestamp if toDate is empty
      };
  
      // Handle additional conditions for startDate and endDate
      if (filterOptions?.fromDate) {
        payload.startDate = await getTimeStamp(filterOptions.fromDate);
      }
      if (filterOptions?.toDate) {
        payload.endDate = await getTimeStamp(filterOptions.toDate);
      }
  
      let listData = await LeaveManagementservice.getLeaveManagementlist(payload);
      listData = listData.data;
      setTableData(listData?.data);
      setTotalCount(listData?.total);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
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

  useEffect(() => {
    getLeaveManagementlist();
  }, [
    page,
    pageSize,
    filterOptions?.assigneeValue,
    filterOptions?.statusValue,
    filterOptions?.fromDate,
    filterOptions?.toDate,
  ]);

  useEffect(() => {
    getUserData();
  }, []);

const generateCsvData = () => {
    // Assuming tableData is an array of objects with the same structure
    const csvData = tableData.map((row: any) => ({
      "Employee Code": row.user.embCode,
      "User Name": row.user.firstName,
      "Start Date": row.fromDate,
      "End Date": row.toDate,
      "Reason for leave": row.reason,
      Status: row.status,
    }));
    return csvData;
  };
const handleExportCsv = () => {
    const data: any = generateCsvData();
    setCsvData(data);
  };
  return (
    <div>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Leave Management
              </Typography>
              <Box sx={{ padding: 0, display: "flex", columnGap: 1 }}>
                <Grid item xs={4}>
                  <Textfield
                    type="date"
                    label='Start Date'
                    name="fromDate"
                    onChange={(event) => {
                      const timestamp = dayjs(event.target.value).valueOf();
                      handleFilterChange("fromDate", timestamp);
                    }}
                    InputLabelProps={{shrink: true}}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <Textfield
                    type="date"
                    label='End date'
                    name="toDate"
                    onChange={(event) => {
                      const timestamp = dayjs(event.target.value).valueOf();
                      handleFilterChange("toDate", timestamp);
                    }}
                    InputLabelProps={{shrink: true}}
                    fullWidth

                  />
                </Grid>


                <Autocomplete
                  options={STATUS_ARRAY}
                  value={filterOptions?.statusLabel || null}
                  // inputValue={filterOptions?.statusLabel || null}
                  // // getOptionLabel={(option) => option.label}
                  // renderOption={(props, option) => (
                  //   <li
                  //     {...props}
                  //     style={{ backgroundColor: option.backGroundColor }}
                  //   >
                  //     {/* <Box
                  //       component='span'
                  //       sx={{
                  //         width: 18,
                  //         height: 18,
                  //         flexShrink: 0,
                  //         borderRadius: '3px',
                  //         mr: 2,
                  //         mt: '2px',
                  //       }}
                  //       style={{ backgroundColor: option.color }}
                  //     /> */}
                  //     <Box>
                  //       <span style={{ color: option.color }}>
                  //         {option.label}
                  //       </span>
                  //     </Box>
                  //   </li>
                  // )}
                  onChange={(_event, newValue) => {
                    return setFilterOptions({
                      ...filterOptions,
                      statusLabel: newValue === null ? "" : newValue?.label,
                      statusValue: newValue === null ? "" : newValue?.value,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Status"
                      size="small"
                      variant="outlined"
                    />
                  )}
                  sx={{ width: 180 }}
                  PopperComponent={(props) => (
                    <Popper {...props} placement="bottom-start" />
                  )}
                />
                <Autocomplete
                  value={filterOptions?.assigneeLabel || null}
                  onChange={(_event, newValue) =>
                    setFilterOptions({
                      ...filterOptions,
                      assigneeLabel: newValue === null ? "" : newValue?.label,
                      assigneeValue: newValue === null ? "" : newValue?.value,
                    })
                  }
                  options={assigneeOptions}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      size="small"
                      label="User"
                      variant="outlined"
                    />
                  )}
                  sx={{ width: 180 }}
                />

                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[6]}
                  sx={{
                    background: COLORS.primary,
                    borderRadius: 1,
                    width: 38,
                    height: 38,
                    mx: 1,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  onClick={() => {
                    getLeaveManagementlist();
                  }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight:"20px",
              marginTop:"10px"
            }}
          >
            <CSVLink
              data={csvData}
              filename={"leave_management.csv"}
              className="btn btn-primary btn-sm"
              target="_blank"
            >
              <Button variant="contained" onClick={handleExportCsv}>
                Export to CSV
              </Button>
            </CSVLink>
          </Grid>
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
    </div>
  );
};

export default LeaveManagement;

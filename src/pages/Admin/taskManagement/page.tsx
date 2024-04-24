/** @format */

import {
  ActionIconButton,
  ActionItems,
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../../components/MUI/mui.index";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Stack,
  TextField,
  Grid,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import moment from "moment";
import React from "react";
import { ACTION_ICON_TYPES } from "../../../data/AppConst";
import { CustomDivier } from "../../../components/APP/app.index";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import ATMService from "../../../services/admin/TaskManagement.Service.tsx";
import SettingService from "../../../services/settings/settings.service.ts";
import TaskCreationModal from "./components/CreateAndEditModal.tsx";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";
import { getUserListForAdmin } from "../../../components/com_components/CustomerSettingsAPI.tsx";
import { PropagateLoader } from "react-spinners";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { useNavigate, generatePath } from "react-router-dom";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import { AUM_FORM_ACTION_TYPES } from "../../../data/AppConst.ts";
import { COLORS } from "../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import GeneralApiService from "../../../../src/services/genearls/general.service.ts";
import AdminSalesManagementService from "../../../services/admin/sales/Sales.service.ts";
import AUMService from "../../../services/admin/UserManagemet.service.ts";

interface Task {
  priority: any;
  taskStatus: any;
  _id: string;
  organization_id: string;
  taskType: string;
  status: string;
}

const TaskManagement = () => {
  const [tableData, setTableData] = React.useState<any>([]);

  const [] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [open, setOpen] = React.useState(false);
  const auth = useAppSelector((state) => state.auth);
  console.log('authintaskmanagement',auth)
  const [isAddOrEdit, setIsAddOrEdit] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [openModel, setOpenModel] = useState(false);
  const [filterDropDown, setFilterDropDowns] = useState<any>({});
  console.log("filterdropdownstask",filterDropDown)
  // const [totalCount, setTotalCount] = useState(0);

  const [filterOptions, setFilterOptions] = useState<any>({
    taskStatusLabel: "",
    taskStatusValue: "",
    taskPriorityLabel: "",
    taskPriorityValue: "",
    taskTypeLabel: "",
    taskTypeValue: "",
    assigneeLabel: "",
    assigneeValue: "",
    fromDate: "",
    fromDateTimeStamp: 0,
    toDate: "",
    toDateTimeStamp: 0,
    userData: "",
  });
  console.log('filteredoptionstask',filterOptions)
  const navigate = useNavigate();

  const handleView = (rowItem: any) => {
    let pathUrl = generatePath(APP_ROUTES?.ADMIN?.TASK_MANAGEMENT?.view, {
      id: rowItem?.id,
    });
    console.log("rowItem", rowItem);
    navigate(pathUrl, {
      state: {
        viewTask: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
    setSelectedData(rowItem?.id);
  };

  const handleEdit = (props: any) => {
    setSelectedData(props);
    setOpen(true);
    setIsAddOrEdit("EDIT");
    setLoading(true)
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Assignee",
      field: "user.fullname",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "user.fullname",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Task Type",
      field: "taskType",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "taskType.taskType",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Status Type",
      field: "Status",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "taskStatus.taskStatus",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Priority Type",
      field: "priority",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "taskPriority.priority",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Due Date",
      field: "dueDate",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: (params: any) => {
        const momentDate = moment(params.value);
        const formattedDate = momentDate.format("DD/MM/YYYY");

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
              {formattedDate}
            </Typography>
          </Box>
        );
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
          // can_cancel: true,
          // can_delete: true,
          can_edit: true,
          can_view: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
        handleEdit: handleEdit,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
  const getList = async () => {
    try {
      const organization_id = auth?.data?.userRecord?.organization_id;

      let payload = {
        organizationId: organization_id,
        taskStatus: filterOptions?.statusData?.value,
        userId: filterOptions?.assigneeValue,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        taskPriority: filterOptions?.priorityData?.value,
        taskType: filterOptions?.TaskTypeData?.value,
        user: filterOptions?.userData?.value,
        fromDate: filterOptions?.fromDate,
        toDate: filterOptions?.toDate,
      };

      let listData = await ATMService.getAll(payload);
      const dataList = listData.data;
      setTableData(dataList ? dataList?.data : []);
      setTotalData(listData.data?.data?.length > 0 ? listData?.data?.total : 0);
      setLoading(false)
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  };
 console.log(tableData,'tableData');
 
  // ***********Pagination
  useEffect(() => {
    getList();
  }, [
    page,
    pageSize,
    filterOptions?.priorityData,
    filterOptions?.statusData,
    filterOptions?.TaskTypeData,
    filterOptions?.userData,
  ]);
  const getDropDownData = async () => {
    try {
      let tempObj: any = {};
      // let orderno_url = `/general/sales?organization_id=${auth?.data?.userRecord?.organization_id}&select=orderNo,id`;
      const priorityData = await GeneralApiService.accessModel("taskpriorities", {
        where: {
          organization_id: auth?.data?.userRecord?.organization_id,
        },
        select: ["priority", "id"],
      });
      const statusData = await GeneralApiService.accessModel("taskstatus", {
        where: {
          organization_id: auth?.data?.userRecord?.organization_id,
        },
        select: ["taskStatus", "id"],
      });
      const TaskTypeData = await GeneralApiService.accessModel("tasktypes", {
        where: {
          organization_id: auth?.data?.userRecord?.organization_id,
        },
        select: ["taskType", "id"],
      });

      let customer_url = `/general/customers?organization_id=${auth?.data?.userRecord?.organization_id}&select=customerName,id`;
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
        organization_id: auth?.data?.userRecord?.organization_id,
        isAdmin: false,
      };
      const userData = await AUMService.getAll(payload);
      console.log("priorityData >>>>>", priorityData);
      console.log("customerData >>>>>", customerData);
      console.log("userDatatask >>>>>", userData);

      tempObj.priorityData = priorityData?.data?.map((m: any) => ({
        label: m?.priority,
        value: m?.id,
      }));
      tempObj.statusData = statusData?.data?.map((m: any) => ({
        label: m?.taskStatus,
        value: m?.id,
      }));
      tempObj.TaskTypeData = TaskTypeData?.data?.map((m: any) => ({
        label: m?.taskType,
        value: m?.id,
      }));
      tempObj.customers = customerData?.data?.map((m: any) => ({
        label: m?.customerName,
        value: m?.id,
      }));
      tempObj.userData = userData?.data?.data.map((m: any) => ({
        label: m?.fullname,
        value: m?.id,
      }));
      // tempObj.users = userData?.data?.data?.map((m: any) => ({
      //   label: m?.assignee,
      //   value: m?.id,
      // }));
      console.log("setFilterDropDowns tempObj >>>>>>>>>", tempObj);
      setFilterDropDowns({ ...tempObj });
    } catch (error) {}
  };
  useEffect(() => {
    getDropDownData();
  }, []);

  /////////////////

  const handleOpenModal = () => {
    setOpen(true);
    setIsAddOrEdit("ADD");
  };
const clearFilters = async () => {
  try {
    // Set loading to true
    setLoading(true);
    // Clear filter options
    setFilterOptions({
      ...filterOptions,
      TaskTypeData: null,
      statusData: null,
      priorityData: null,
      userData: null,
      fromDate: null,
      toDate: null,
    });
    getList();
  } catch (error) {
    console.error('Error clearing filters:', error);
  } finally {
    setLoading(false);
  }
}; 
  // assignee get
  const [_assigneeOptions, setAssigneeOptions] = useState([]);

  const getUserData = async () => {
    await getUserListForAdmin(getPayload?.organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(({ _id, firstName, lastName }: any) => {
          return {
            label: `${firstName} ${lastName}`,
            value: _id,
          };
        });
        setAssigneeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  //// task get

  let getPayload = {
    organization_id: auth?.data?.userRecord?.organization_id,
  };
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await SettingService.listTaskTypes(getPayload);
  //       setTaskOptions(response ? response?.data?.data : []);
  //     } catch (error) {
  //       console.error('Error fetching task data:', error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  //// get status
  const [_statusOptions, setStatusOptions] = useState<Task[]>([]);

  // get priority

  // post task

  const getStatus = async () => {
    try {
      const response = await SettingService.listStatus(getPayload);

      if (response) {
        const taskStatus = response?.data?.data.map((r: any) => ({
          label: r?.taskStatus,
          value: r?.id,
        }));
        setStatusOptions(taskStatus);
      }
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };

  useEffect(() => {
    getStatus();
    getUserData();
  }, []);
  const handleFilterChange = (field: any, value: any) => {
  let newValue = value;
  if (field === 'fromDate') {
      newValue = value ? moment(value).startOf('day').valueOf() : 0;
    }
  if (field === 'toDate') {
      newValue = value ? moment(value).endOf('day').valueOf() : 0;
    }
    setFilterOptions({
      ...filterOptions,
      [field]: newValue,
    });
  }

  return (
    <>
      <ContainerBoxV2 styles={{ position: "sticky", zIndex: 999 }}>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Task Management
              </Typography>

              <Box sx={{ padding: 0, display: "flex", columnGap: 1 }}>
                {/* <Autocomplete
                  options={statusOptions}
                  value={filterOptions?.taskStatusLabel || null}
                  onChange={(_event, newValue) =>
                    setFilterOptions({
                      ...filterOptions,
                      taskStatusLabel: newValue?.label,
                      taskStatusValue: newValue?.value,
                    })
                  }
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
                  disabled={isAddOrEdit === "VIEW" ? true : false}
                />
                <Autocomplete
                  value={filterOptions?.assigneeLabel || null}
                  onChange={(_event, newValue) =>
                    setFilterOptions({
                      ...filterOptions,
                      assigneeLabel: newValue?.label,
                      assigneeValue: newValue?.value,
                    })
                  }
                  options={assigneeOptions}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Assignee"
                      variant="outlined"
                    />
                  )}
                  sx={{ width: 180 }}
                  disabled={isAddOrEdit === "VIEW" ? true : false}
                /> */}
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
                  onClick={getList}
                />
                <Button
                  variant="contained"
                  onClick={handleOpenModal}
                  sx={{ height: 38 }}
                >
                  <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                </Button>
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
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier style={{ marginTop: "0px" }} />
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
        <ContainerBoxV2>
          <AgDataGrid
            rowData={tableData}
            columnDefs={columnDefs}
            TableHeight={58}
            rowHeight={50}
            handleCellClick={undefined}
            loading={false}
            disableClickSelectionRenderers={false}
            noDataTxt="No Records Found"
            serverSidePagination={true}
            pageSize={pageSize}
            totalDataCount={totalData}
            serverRowSize={pageSize}
            currentPage={page}
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
        </ContainerBoxV2>
      )}

      <TaskCreationModal
        open={open}
        setOpen={setOpen}
        data={selectedData}
        isAddOrEdit={isAddOrEdit}
        setIsAddOrEdit={setIsAddOrEdit}
        reRender={() => {
          getList();
        }}
      />
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
                    // const _fromDate = selectedDate
                    //   ? selectedDate
                    //   : new Date().toISOString().split("T")[0];
                    handleFilterChange("fromDate", selectedDate);
                    // setFilterOptions({
                    //   ...filterOptions,
                    //   fromDate:
                    // })
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions.fromDate ? moment(filterOptions.fromDate).format('YYYY-MM-DD') : ''}
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
                    // const _toDate = selectedDate
                    //   ? selectedDate
                    //   : new Date().toISOString().split("T")[0];
                    // handleFilterChange('toDate', toDate);
                    handleFilterChange("toDate", selectedDate);
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions.toDate ? moment(filterOptions.toDate).format('YYYY-MM-DD') : ''}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  value={filterOptions?.TaskTypeData}
                  onChange={(_event, newValue) => {
                    handleFilterChange("TaskTypeData", newValue);

                    // setFilterOptions({
                    //   ...filterOptions,
                    //   orderNo: newValue
                    // })
                  }}
                  options={filterDropDown?.TaskTypeData}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Task type"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  value={filterOptions?.statusData}
                  onChange={(_event, newValue) => {
                    handleFilterChange("statusData", newValue);
                  }}
                  options={filterDropDown?.statusData}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      label="Status Type"
                    />
                  )}
                  // value={null}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <AutoComplete
                  value={filterOptions?.priorityData}
                  onChange={(_event, newValue) => {
                    handleFilterChange("priorityData", newValue);
                  }}
                  options={filterDropDown?.priorityData}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="Priority Type"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <AutoComplete
                  value={filterOptions?.userData}
                  onChange={(_event, newValue) => {
                    handleFilterChange("userData", newValue);
                  }}
                  options={filterDropDown?.userData}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      label="User"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    setOpenModel(false);
                      clearFilters();
                      getList();
                  }}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setOpenModel(false);
                    if (page != 1) {
                      setPage(1);
                    } else {
                      getList()
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
    </>
  );
};

export default TaskManagement;

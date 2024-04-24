/** @format */

import AgDataGrid from "../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  ActionItems,
  PillTab,
  ActionConfirmation,
} from "../../../../../components/MUI/mui.index";
import { TNestedObj } from "../../../../../types/global.types";
import { Box, Button, Grid, InputLabel, Stack } from "@mui/material";
import { ColDef } from "ag-grid-community";
import React, { useEffect, useMemo, useState } from "react";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../data/AppConst";
import CustomCellRenderValues from "../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// ******* Service
import SettingService from "../../../../../services/settings/settings.service.ts";

// ************** Util
import { getSkipCount } from "../../../../../utils/index.ts";

// ************** | Form schema
import { TaskTypeSchema } from "../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../../utils/globals.ts";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { toast } from "react-toastify";

const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    id: data?._id,
  };
};

// ******************** | Add edit model|*******************
interface IAddEditViewModal {
  actionType: string;
  data?: TNestedObj | Record<string, any>;
  setActivatedTab?: (value?: any) => void;
  handleClose?: (value?: any) => void;
  refresh: (value?: Record<string, any>) => void;
  open: boolean;
  render: number;
}

function AddEditViewModal(props: IAddEditViewModal) {
  let { open, handleClose, actionType, data, refresh, render } = props;

  const { isAdd, isEdit, isView, id } = formActionType({
    actionType,
    data,
  });
  const AUTH = useAppSelector((state) => state?.auth);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    taskType: null,
    status: true,
  });

  const handleCreateTaskType = async () => {
    try {
      const organizationId = AUTH?.data?.userRecord?.organization_id;
      const taskTypeData = {
        taskType: formik.values.taskType,
        status: formik.values.status,
        organization_id: organizationId,
      };

      if (isEdit) {
        // Check if the updated task type already exists
        const settingList = await SettingService.listTaskTypes({
          organization_id: organizationId,
        });

        const temp = settingList?.data?.data?.find(
          (item: any) =>
            item.taskType === taskTypeData.taskType &&
            item.organization_id === taskTypeData.organization_id &&
            item.id !== id // Exclude the current task type from the check during edit
        );

        if (!temp) {
          // Update existing task type
          await SettingService.editTaskTypes({
            ...taskTypeData,
            id: id,
          });
          ResetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          formik.setFieldError("taskType", "Task type already exists.");
          // Additional handling if needed
        }
      } else {
        // Create new task type
        const settingList = await SettingService.listTaskTypes(taskTypeData);
        const temp = settingList?.data?.data?.find(
          (item: any) =>
            item.taskType === taskTypeData.taskType &&
            item.organization_id === taskTypeData.organization_id
        );

        if (!temp) {
          await SettingService.createTaskTypes(taskTypeData);
          ResetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          formik.setFieldError("taskType", "Task type already exists.");
          // Additional handling if needed
        }
      }
    } catch (error) {
      console.error("Error saving task type:", error);
    }
  };

  const formik = useFormik({
    validationSchema: TaskTypeSchema({}),
    onSubmit: handleCreateTaskType,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const setDataForEditView = () => {
    setFormValue({
      taskType: data?.taskType,
      status: data?.status,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ taskType: null, status: true });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  return (
    <ActionModal
      open={open}
      onClose={() => {
        ResetForm();
        handleClose && handleClose();
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? "Add Task Type"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Task Type"
          : "View Task Type"
      }
      modalWidth="40%"
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
        <form onSubmit={formik.handleSubmit} style={{ width: "70%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ py: 1 }}>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Task type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="taskType"
                  value={(formik?.values?.taskType || "").trimStart()}  
                  fullWidth
                  error={getError(formik, "taskType")?.isTrue}
                  helperText={
                    getError(formik, "taskType")?.isTrue &&
                    getError(formik, "taskType")?.message 
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter task type"
                  disabled={isView}
                />
              </Box>

              {/* Add the status switch for the Edit pop-up */}
              {/* {isEdit && (
                <Grid item xs={6} sx={{ textAlign: "" }}>
                  <Switch
                    name="status"
                    checked={formik?.values?.status}
                    onChange={(event) => {
                      formik.setFieldValue("status", event.target.checked);
                    }}
                    disabled={isView}
                  />
                  <span>{formik?.values?.status ? "Active" : "Inactive"}</span>
                </Grid>
              )} */}
            </Grid>
            {!isView && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <ButtonV1
                    disabled={
                      formik?.isSubmitting ||
                      !formik.isValid ||
                      !formik.values.taskType?.trim()
                    }
                    type="submit"
                    style={{ height: 38, fontSize: 14, width: "30%" }}
                  >
                    {isAdd ? "Add" : "Update"}
                  </ButtonV1>
                </Box>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </ActionModal>
  );
}

type TNestedObjWithStatus = TNestedObj & {
  status: boolean;
};

// ********************* | Main List Page | *****************
function TaskType() {
  const AUTH = useAppSelector((state) => state?.auth);
  // ******************** State
  const [tableData, setTableData] = useState<TNestedObjWithStatus[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(false);
  const [render, reRender] = useState(0);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };

  //******************** handle */
  const handleModalOpen = (setType: string) =>
    setType === "OPEN" ? setOpenModal(true) : setOpenModal(false);
  const handleClose = () => setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleDelete = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate Task Type",
      message: `Are you sure you want to deactivate this task type?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Task Type",
      message: `Are you sure you want to activate this task type?`,
    });
  };

  const getList = async () => {
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
    };

    setLoading(true);
    try {
      const listRes = await SettingService.listTaskTypes(payload);
      if (listRes?.status) {
        setTableData(listRes?.data?.data || []);
        setTotalCount(listRes?.data?.total);
      } else {
        console.log("Task type response failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab]);

  const activeDeactive = async () => {
    try {
      let payload = {
        status: !isActive,
      } as Record<string, any>;
      let id: any = rowItem._id;
      await SettingService.editTaskTypes({
        ...payload,
        id,
      });
      getList();
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Task Type",
        field: "taskType",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "taskType",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 100,
        cellRenderer: ActionItems,
        cellRendererParams: {
          permission: {
            can_delete: activatedTab === 0 ? true : false,
            can_edit: activatedTab === 0 ? true : false,
            can_view: true,
            can_activate: activatedTab === 0 ? false : true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
          handleDelete: handleDelete,
          handleActivate: handleActivate,
        },
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    [activatedTab]
  );

  const tab = [
    {
      label: "Active Task Type",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Deactivated Task Type",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];

  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={8}>
              <PillTab
                tabMenus={tab}
                selectedTab={handleTabSelect}
                value={activatedTab}
              />
            </Grid>
            <Grid xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Box>
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
                      getList();
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      setOpenModal(true);
                    }}
                    sx={{ height: 38 }}
                  >
                    <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ContainerBoxV2>

        <ContainerBoxV2 styles={{ padding: 0 }}>
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
                TableHeight={50}
                rowHeight={50}
                noDataTxt="No Records Found"
                loading={false}
                serverSidePagination={Boolean(totalCount)}
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
        <AddEditViewModal
          actionType={actionType}
          handleClose={handleClose}
          open={openModal}
          data={rowItem}
          refresh={() => {
            getList();
          }}
          render={render}
        />
      </div>
      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          activeDeactive();
        }}
        onClose={() => {
          setOpenConfirmation({
            ...openConfirmation,
            open: false,
          });
        }}
        children={<></>}
      />
    </>
  );
}

export default TaskType;

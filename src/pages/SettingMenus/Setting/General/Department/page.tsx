/** @format */

import React, { memo, useEffect, useMemo, useState } from "react";
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
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { ColDef } from "ag-grid-community";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../data/AppConst";
import CustomCellRenderValues from "../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// ******* Service
import SettingService from "../../../../../services/settings/settings.service.ts";

// ************** Util
import {
  GET_CONST_FROM_AUTH,
  getSkipCount,
} from "../../../../../utils/index.ts";

// ************** | Form schema
import { departmentFormSchema } from "../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";

import Socket from "../../../../../libs/SocketService";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { COLORS } from "../../../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

// const socket = Socket.GET_SOCKET_INSTANCE();
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
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    department: null,
    description: null,
  });

  const handleSubmit = async (value: Record<string, any>) => {
    const handleError = (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";
      formik.setFieldError("department", errorMessage);
    };
    try {
      let payload = {
        name: value?.department,
        description: value?.description,
        organization_id: AUTH?.data?.userRecord?.organization_id,
        updatedBy: AUTH?.data?.userRecord?.id,
      } as Record<string, any>;
      if (isEdit) {
        let query = `?setting_sub_type=${CONSTANT_DATA?.SETTING_SUB_TYPES[2]}`;
        await SettingService.update(id, payload, query);
      } else {
        payload = {
          ...payload,
          settingsType: CONSTANT_DATA.SETTING_TYPES[1],
          subTypes: CONSTANT_DATA.SETTING_SUB_TYPES[2],
          createdBy: AUTH?.data?.userRecord?.id,
        };
        let query = `?setting_sub_type=${CONSTANT_DATA?.SETTING_SUB_TYPES[2]}`;
        await SettingService.create(payload, query);
      }
      ResetForm();
      refresh && refresh();
      handleClose && handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  const formik = useFormik({
    validationSchema: departmentFormSchema({}),
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const setDataForEditView = () => {
    setFormValue({
      department: data?.name,
      description: data?.description,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ leaveType: null, description: null });
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
          ? "Add Department"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Department"
          : "View Department"
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
                  Department <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="department"
                  value={(formik?.values?.department || "").trimStart()}
                  error={getError(formik, "department")?.isTrue}
                  helperText={
                    getError(formik, "department")?.isTrue &&
                    getError(formik, "department")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter department"
                  disabled={isView}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ py: 1 }}>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Description <span style={{ color: "red" }}></span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="description"
                  value={(formik?.values?.description || "").trimStart()}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter description"
                  disabled={isView}
                />
              </Box>
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
                      !formik.values.department?.trim()
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

// ********************* | Main List Page | *****************
function GeneralDepartment() {
  const AUTH = useAppSelector((state) => state?.auth);
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  // ******************** State
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [loading, _setLoading] = useState(false);
  const [render, reRender] = useState(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [filterobject, setFilterObject] = useState<any>({});
  console.log("filterObjectBP", filterobject);
  const [filterValue, setFilterValue] = useState<any>([]);
  console.log("filtervalueBP", filterValue);
  const list = "DROPDOWN_LIST";

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
      title: "Deactivate Department",
      message: `Are you sure you want to deactivate this department?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Department",
      message: `Are you sure you want to activate this department?`,
    });
  };

  const getList = async () => {
    let payload = {
      matchObj: {
        status: isActive,
        settingsType: CONSTANT_DATA?.SETTING_TYPES[1],
        subTypes: CONSTANT_DATA?.SETTING_SUB_TYPES[2],
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      status: isActive,
      value: filterobject?.value || "",
    };

    // ********** Extra query added
    _setLoading(true);
    let query = `?setting_sub_type=${CONSTANT_DATA?.SETTING_SUB_TYPES[2]}&isCount=true`;
    const listRes = await SettingService.list(payload, query);

    if (listRes?.status) {
      setTableData(listRes?.data?.response?.data?.data || []);
      setTotalCount(listRes?.data?.response?.totalCount?.count);
    }
    _setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab, filterobject]);

  const getListFilter = async () => {
    let payload = {
      matchObj: {
        status: isActive,
        settingsType: CONSTANT_DATA?.SETTING_TYPES[1],
        subTypes: CONSTANT_DATA?.SETTING_SUB_TYPES[2],
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      status: isActive,
      // lists: list,
    };

    // ********** Extra query added
    _setLoading(true);
    let query = `?setting_sub_type=${CONSTANT_DATA?.SETTING_SUB_TYPES[2]}&isCount=true&lists=${list}`;
    const listRes = await SettingService.list(payload, query);

    if (listRes?.status) {
      setFilterValue(listRes?.data?.response?.data?.data || []);
      // setTotalCount(listRes?.data?.response?.totalCount?.count);
    }
    _setLoading(false);
  };

  useEffect(() => {
    getListFilter();
  }, [activatedTab]);

  const activeDeactive = async () => {
    try {
      let payload = {
        status: !isActive,
      } as Record<string, any>;
      let id: any = rowItem._id;
      let query = "?setting_sub_type=DEPARTMENT";
      await SettingService.updateIsActive(id, payload, query);
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
        headerName: "Department",
        field: "name",
        filter: true,
        width: 500,
        cellStyle: { textTransform: "capitalize" },
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: { field: "name" },
        ...GetHeaderParams(),
      },
      {
        headerName: "Description",
        field: "description",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: { field: "description" },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 200,
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
      label: "Active Department",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Deactivated Department",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];

  useEffect(() => {
    // socket.on("GET_LIST", (socketData: any) => {
    //   console.log('socket data >>>>', socketData)
    //   console.log("socketData", socketData);
    //   getList();
    //   // socket.close()
    // });
    Socket.GET_SOCKET_ON_CB("GET_LIST", () => {
      getList();
    });
  }, []);

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
                <Grid item xs={4} sx={{ marginRight: "12px" }}>
                  <Autocomplete
                    value={filterobject?.label}
                    onChange={(_event, newValue) => setFilterObject(newValue)}
                    options={filterValue}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        label="Department"
                        variant="outlined"
                        sx={{ width: 130 }}
                      />
                    )}
                  />
                </Grid>
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
                TableHeight={55}
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

export default memo(GeneralDepartment);

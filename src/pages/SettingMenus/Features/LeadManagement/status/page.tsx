import AgDataGrid from "../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  ActionItems,
  PillTab,
} from "../../../../../components/MUI/mui.index";
import { TNestedObj } from "../../../../../types/global.types";
import { Box, Button, Grid, InputLabel, Stack, Switch } from "@mui/material";
import { ColDef } from "ag-grid-community";
import React, { useEffect, useMemo, useState } from "react";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../data/AppConst";
import CustomCellRenderValues from "../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// ******* Service
import SettingService from "../../../../../services/settings/settings.service.ts";

// ************** Util

// ************** | Form schema
import { StatusLeadSchema } from "../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";
import { COLORS } from "../../../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";
import { Cancel, CheckCircle } from "@mui/icons-material";

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

  const { isAdd, isEdit, isView } = formActionType({
    actionType,
    data,
  });

  const AUTH = useAppSelector((state: { auth: any }) => state?.auth);
  console.log("AUTH", AUTH);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    leadStatus: null,
    status: true,
  });

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ leadStatus: null, status: true });
  };

  const handleCreateStatusType = async () => {
    try {
      const organizationId = AUTH?.data?.userRecord?.organization_id;
      // const id = AUTH?.data?.userRecord?.id;

      const statusTypeData = {
        leadStatus: formik.values.leadStatus,
        status: formik.values.status,
        organization_id: organizationId,
        id: data?.id,
      };

      let response;

      if (isEdit) {
        console.log("Editing existing task type:", {
          ...statusTypeData,
        });
        response = await SettingService.editLeadStatusTypes({
          ...statusTypeData,
        });
      } else {
        console.log("Creating new task type:", statusTypeData);
        response = await SettingService.createLeadStatusTypes(statusTypeData);
      }

      console.log("API Response:", response);

      if (response && response.id) {
        console.log("status type saved successfully:", response);
        refresh && refresh();
        handleClose && handleClose();
      } else {
        formik.resetForm();
        console.error("Failed to save status type:", response);
        handleClose && handleClose();
        refresh && refresh();
      }
    } catch (error) {
      console.error("Error saving status type:", error);
    }
    console.log("Form values before submission:", formik.values);
  };

  const formik = useFormik({
    validationSchema: StatusLeadSchema({}),
    onSubmit: handleCreateStatusType,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const setDataForEditView = () => {
    setFormValue({
      leadStatus: data?.leadStatus,
      status: data?.status,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
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
          ? "Add status Type"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit status Type"
          : "View status Type"
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
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Status Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="leadStatus"
                  value={formik?.values?.leadStatus}
                  fullWidth
                  error={getError(formik, "leadStatus")?.isTrue}
                  helperText={
                    getError(formik, "leadStatus")?.isTrue &&
                    getError(formik, "leadStatus")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter status Type"
                  disabled={isView}
                />
              </Box>
            </Grid>
            {/* Add the status switch for the Edit pop-up */}
            {isEdit && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    name="status"
                    checked={formik?.values?.status}
                    onChange={(event) => {
                      formik.setFieldValue("status", event.target.checked);
                    }}
                    disabled={isView}
                  />
                  <span>{formik?.values?.status ? "Active" : "Inactive"}</span>
                </Box>
              </Grid>
            )}
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
                    disabled={formik?.isSubmitting}
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
function statusType() {
  // ******************** State
  const [tableData, setTableData] = useState<TNestedObjWithStatus[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(false);
  const [render, reRender] = useState(0);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0); //Tabs
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  //tab

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    console.log("_element >>>>>>>", _element, "selection >>>", selection);
    setActivatedTab(selection);
    setIsActive(selection === 0);
  };
  const tab = [
    {
      label: "Active Status Type",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "De-Active Status Type",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];
  const activeTableData = useMemo(
    () => tableData.filter((item) => item.status === true),
    [tableData]
  );
  const deactiveTableData = useMemo(
    () => tableData.filter((item) => item.status === false),
    [tableData]
  );
  const currentTableData = isActive ? activeTableData : deactiveTableData;

  //******************** handle */
  const handleModalOpen = (setType: string) =>
    setType === "OPEN" ? setOpenModal(true) : setOpenModal(false);
  const handleClose = () => setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    console.log("EDIT >>>>>", value);
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
  const AUTH = useAppSelector((state: { auth: any }) => state?.auth);

  const getList = async () => {
    let payload = {
      status: true,
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };
    setLoading(true);
    try {
      const listRes = await SettingService.listLeadStatus(payload);

      if (listRes.status === 200) {
        const responseData = listRes?.data;

        if (responseData) {
          setTableData(responseData || []);
          setTotalCount(responseData.length);
          console.log("listRes data1", responseData || []);
        } else {
          console.error("Invalid response structure:", listRes);
        }
      } else {
        console.error("Non-200 status code:", listRes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // console.log("hello", tableData);

  useEffect(() => {
    getList();
  }, [page, pageSize]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      // {
      //   headerName: "Organization Id",
      //   field: "organization_id",
      //   filter: true,
      //   width: 500,
      //   cellStyle: { textTransform: "capitalize" },
      // },
      {
        headerName: "Status Type",
        field: "leadStatus",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: { field: "leadStatus" },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 100,
        cellRenderer: ActionItems,
        cellRendererParams: {
          // handleEdit: handleopenModal,
          permission: {
            // can_cancel: true,
            // can_delete: true,
            can_edit: true,
            can_view: true,
            // can_refresh: false,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
        },
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
                rowData={currentTableData}
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
    </>
  );
}

export default statusType;

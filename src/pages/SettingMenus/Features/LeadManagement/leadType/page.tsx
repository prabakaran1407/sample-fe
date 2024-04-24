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
import { Box, Button, Grid, Stack, Switch } from "@mui/material";
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
import { LeadTypeSchema } from "../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import { COLORS } from "../../../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";

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
  const AUTH = useAppSelector((state: { auth: any }) => state?.auth);
  console.log("AUTH", AUTH);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    leadType: null,
    status: true,
  });

  const ResetForm = () => {
    setFormValue({ leadType: null, status: true });
  };

  const handleCreateLeadType = async () => {
    // console.log("Form values before submission:", formik.values);
    // console.log("CONSTANT_DATA:", AUTH?.data?.userRecord?.organization_id);
    try {
      const organizationId = AUTH?.data?.userRecord?.organization_id;

      const leadTypeData = {
        leadType: formik.values.leadType,
        status: formik.values.status,
        organization_id: organizationId,
      };

      let response;

      if (isEdit) {
        // Edit existing task type
        response = await SettingService.editLeadTypes({
          ...leadTypeData,
          id: id,
        });
      } else {
        response = await SettingService.createLeadTypes(leadTypeData);
      }

      console.log("API Response:", response);

      if (response.ok) {
        console.log("Lead type saved successfully:", response.data);
        refresh && refresh();
        handleClose && handleClose();
      } else {
        formik.resetForm();
        console.error("Failed to save Lead type:", response.data);
        handleClose && handleClose();
        refresh && refresh();
      }
    } catch (error) {
      console.error("Error saving lead type:", error);
    }
  };

  const formik = useFormik({
    validationSchema: LeadTypeSchema({}),
    onSubmit: handleCreateLeadType,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const setDataForEditView = () => {
    setFormValue({
      leadType: data?.leadType,
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
          ? "Add Lead Type"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit lead Type"
          : "View Lead Type"
      }
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={{ width: "100%", padding: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container item xs={12} spacing={2}>
            <Grid
              container
              item
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Textfield
                  type="text"
                  name="leadType"
                  value={formik?.values?.leadType}
                  fullWidth
                  label="Lead Type"
                  error={getError(formik, "leadType")?.isTrue}
                  helperText={
                    getError(formik, "leadType")?.isTrue &&
                    getError(formik, "leadType")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter Lead Type"
                  disabled={isView}
                />
              </Grid>
              {/* Add the status switch for the Edit pop-up */}
              {isEdit && (
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
              )}
            </Grid>
            {!isView && (
              <Grid
                container
                item
                xs={12}
                justifyContent="flex-end"
                alignItems="center"
              >
                <ButtonV1 disabled={formik?.isSubmitting} type="submit">
                  {isAdd ? "Add" : "Update"}
                </ButtonV1>
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
function LeadType() {
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
      label: "Active Lead Type",
      icon: <StickyNote2Icon fontSize="small" />,
      status: true,
    },
    {
      label: "De-Active Lead Type",
      icon: <SpeakerNotesOffIcon fontSize="small" />,
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
  const getList = async () => {
    // let payload = {
    //   status: true,
    //   organization_id: AUTH?.data?.userRecord?.organization_id,
    //   skip: getSkipCount(page, pageSize),
    //   limit: pageSize,
    // };
    // setLoading(true);
    try {
      const listRes = await SettingService.listLeadTypes();

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
        headerName: "Lead Type",
        field: "leadType",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: { field: "leadType" },
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

export default LeadType;

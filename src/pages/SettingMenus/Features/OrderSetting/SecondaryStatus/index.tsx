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
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ColDef } from "ag-grid-community";
import React, { memo, useEffect, useMemo, useState } from "react";

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
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppSelector } from "../../../../../hooks/index.ts";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { COLORS } from "../../../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    id: data?._id,
  };
};

const validationSchema = yup.object().shape({
  secondaryStatus: yup.string().trim().required("Secondary status is required"),
});

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
    secondaryStatus: null,
    type: "Others",
    description: null,
  });

  const handleSubmit = async (value: Record<string, any>) => {
    const handleError = (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";
      if (errorMessage.includes("type")) {
        formik.setFieldError("type", errorMessage);
      } else {
        formik.setFieldError("secondaryStatus", errorMessage);
      }
    };
    try {
      let payload = {
        value: value?.secondaryStatus,
        type: value?.type,
        description: value?.description,
        organization_id: AUTH?.data?.userRecord?.organization_id,
        settingsType: CONSTANT_DATA.ORDER_SETTING_TYPES[1],
        updatedBy: AUTH?.data?.userRecord?.id,
      } as Record<string, any>;
      if (isEdit) {
        await SettingService.updateOrderSetting(id, payload);
      } else {
        payload = {
          ...payload,
          createdBy: AUTH?.data?.userRecord?.id,
        };
        await SettingService.createOrderSetting(payload);
      }
      ResetForm();
      refresh && refresh();
      handleClose && handleClose();
    } catch (error) {
      handleError(error);
    }
  };

  const formik = useFormik({
    validationSchema: validationSchema,
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
      secondaryStatus: data?.value,
      type: data?.type,
      description: data?.description,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ secondaryStatus: null, type: "Others", description: null });
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
          ? "Add Secondary Status"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Secondary Status"
          : "View Secondary Status"
      }
      modalWidth="55%"
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
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ py: 1, width: "80%" }}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                    >
                      Secondary Status <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Textfield
                      type="text"
                      name="secondaryStatus"
                      value={(
                        formik?.values?.secondaryStatus || ""
                      ).trimStart()}
                      fullWidth
                      error={getError(formik, "secondaryStatus")?.isTrue}
                      helperText={
                        getError(formik, "secondaryStatus")?.isTrue &&
                        getError(formik, "secondaryStatus")?.message
                      }
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      placeholder="Enter secondary status"
                      disabled={isView}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ py: 1, width: "80%" }}>
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
                <Grid item xs={12}>
                  <Box sx={{ width: "80%" }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontStyle: "italic",
                        color: "#969696",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>Note:</span> The
                      statuses "Completed" and "Cancelled" cannot be reversed.
                      The initial status should be set as "Pending". The
                      "Others" status can accommodate all other status options.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ py: 1 }}>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <FormControl error={getError(formik, "type")?.isTrue}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formik?.values?.type}
                    name="type"
                    onChange={formik?.handleChange}
                  >
                    <FormControlLabel
                      value="Pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="Cancelled"
                      control={<Radio />}
                      label="Cancelled"
                    />
                    <FormControlLabel
                      value="Completed"
                      control={<Radio />}
                      label="Completed"
                    />
                    <FormControlLabel
                      value="Others"
                      control={<Radio />}
                      label="Others"
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {getError(formik, "type")?.isTrue &&
                      getError(formik, "type")?.message}
                  </FormHelperText>
                </FormControl>
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
                      !formik.values.secondaryStatus?.trim() ||
                      !formik.values.type === null
                    }
                    type="submit"
                    style={{ height: 38, fontSize: 14, width: "20%" }}
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
function SecondaryStatus() {
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
      title: "Deactivate Secondary Status",
      message: `Are you sure you want to deactivate this status?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Secondary Status",
      message: `Are you sure you want to activate this status?`,
    });
  };

  const getList = async () => {
    let payload = {
      matchObj: {
        status: isActive,
        settingsType: CONSTANT_DATA?.ORDER_SETTING_TYPES[1],
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
    };
    _setLoading(true);
    const listRes = await SettingService.listAllOrderSetting(
      payload,
      "?isCount=true"
    );
    if (listRes?.status) {
      setTableData(listRes?.data?.response?.data || []);
      setTotalCount(listRes?.data?.response?.totalCount?.count);
    }
    _setLoading(false);
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
      await SettingService.activateOrderSetting(id, payload);
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
        headerName: "Secondary Status",
        field: "value",
        filter: true,
        width: 500,
        cellStyle: { textTransform: "capitalize" },
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Type",
        field: "type",
        filter: true,
        width: 500,
        cellStyle: { textTransform: "capitalize" },
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "type",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Description",
        field: "description",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "description",
        },
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
      label: "Active Status",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Deactivated Status",
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

export default memo(SecondaryStatus);

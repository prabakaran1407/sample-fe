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
  ActionConfirmation,
  PillTab,
  AutoComplete,
} from "../../../../../components/MUI/mui.index";
import { TNestedObj, Ipayload } from "../../../../../types/global.types";
import { Box, Button, Grid, InputLabel, Stack } from "@mui/material";
import { ColDef } from "ag-grid-community";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../data/AppConst";
import CustomCellRenderValues from "../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// ******* Service
import SplitSubCategoryService from "../apis/Claim/SplitSubCategory";

// ************** Util
import { getSkipCount } from "../../../../../utils/index.ts";
import { COLORS } from "../../../../../utils/globals.ts";
import { useAppSelector } from "../../../../../hooks/index.ts";
import _ from "lodash";

// ************** | Form schema
import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-toastify";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";
import CreateOptionApiService from "../apis/Claim/CreateOptionAPI.ts";

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

const validationSchema = yup.object({
  transportType: yup
    .object()
    .shape({
      label: yup.string().required("Mode of transport is required"),
      value: yup.string().required("Mode of transport is required"),
    })
    .required("Mode of transport is required"),
  name: yup
    .string()
    .trim()
    .required("Sub category name is required.")
    .notOneOf([" "], "Sub category name should not contain spaces."),
});

function AddEditViewModal(props: IAddEditViewModal) {
  let { open, handleClose, actionType, data, refresh, render } = props;

  const { isAdd, isEdit, isView, id } = formActionType({
    actionType,
    data,
  });
  const AUTH = useAppSelector((state) => state?.auth);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    name: null,
    transportType: null,
    checked: true,
  });
  const [transportData, setTransportData] = useState<Record<string, any>[]>([]);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let data: any = {
        TypeofSubCategory: value?.name?.toUpperCase(),
        transportType: value?.transportType?.value,
        status: value?.checked,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      } as Ipayload;

      const response =
        await SplitSubCategoryService.requestClaimTravelSplitSubCategoryData(
          data
        );

      const temp = response?.data?.data?.find((item: any) => {
        return (
          item.transportType._id === data.transportType &&
          item.TypeofSubCategory === data.TypeofSubCategory &&
          item.organization._id === data.organization_id
        );
      });

      if (isEdit) {
        if (!temp) {
          await CreateOptionApiService.updateClaimCategoryTravel(data, id);
          ResetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          formik.setFieldError("name", "Sub category name already exists.");
        }
      } else {
        if (!temp) {
          await CreateOptionApiService.createClaimTransportCategory(data);
          ResetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          formik.setFieldError("name", "Sub category name already exists.");
        }
      }
    } catch (error: any) {
      if (!error?.message) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
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
      name: data?.TypeofSubCategory,
      transportType: {
        label: data?.transportType?.modeOfTransport,
        value: data?.transportType?._id,
      },
      checked: data?.status,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ name: null, transportType: null, checked: true });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  // ******************** Get initial Data
  const getInitialData = async () => {
    try {
      let data = {
        status: true,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let response =
        await SplitSubCategoryService.requestClaimSplitSubCategoryDataTravel(
          data.status,
          data.organization_id
        );
      let optionsData = response?.data || [];
      let options = optionsData.map((value: any) => ({
        label: value.modeOfTransport,
        _id: value.id,
        value: value.id,
      }));
      setTransportData(options || []);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    getInitialData();
  }, [render]);

  const disabledSxProp: any = useMemo(
    () =>
      isView
        ? {
            "& .MuiInputBase-input": {
              backgroundColor: "transparent",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              opacity: 1,
              "-webkit-text-fill-color": "rgb(0, 0, 0, 1)",
            },
          }
        : {},
    []
  );

  return (
    <ActionModal
      open={open}
      onClose={() => {
        ResetForm();
        handleClose && handleClose();
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? "Add Split Sub Category"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Split Sub Category"
          : "View Split Sub Category"
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
                  Mode Of Transport <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={transportData}
                  getOptionLabel={(option: any) => {
                    return option.label;
                  }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="transportType"
                      placeholder="Select mode of transport"
                      error={getError(formik, "transportType")?.isTrue}
                      helperText={
                        getError(formik, "transportType")?.isTrue &&
                        getError(formik, "transportType")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.transportType || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("transportType", selectedOption);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ py: 1 }}>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Sub Category <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="name"
                  value={(formik?.values?.name || "").trimStart()}
                  fullWidth
                  error={getError(formik, "name")?.isTrue}
                  helperText={
                    getError(formik, "name")?.isTrue &&
                    getError(formik, "name")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter sub category name"
                  disabled={isView}
                  sx={disabledSxProp}
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
                      !formik.values.name?.trim()
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
function SplitSubCategory() {
  const AUTH = useAppSelector((state: any) => state?.auth);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [render, reRender] = useState(0);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

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

  const handleDelete = (value: TNestedObj) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate Split Sub Category",
      message: `Are you sure you want to deactivate this split sub category?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Split Sub Category",
      message: `Are you sure you want to activate this split sub category?`,
    });
  };

  const getList = async () => {
    setSpinner(true);
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
    };
    const response =
      await SplitSubCategoryService.requestClaimTravelSplitSubCategoryData(
        payload
      );

    if (response?.status) {
      setTableData(response?.data?.data || []);
      setTotalCount(response?.data?.totalCount);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab]);

  const activeDeactive = async () => {
    setActionLoading(true);
    try {
      let data = {
        status: !isActive,
      } as Record<string, any>;
      let id: any = rowItem._id;
      await CreateOptionApiService.updateClaimCategoryTravel(data, id);
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
    setActionLoading(false);
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Mode Of Transport",
        field: "transportType.modeOfTransport",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "transportType.modeOfTransport",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Sub Category",
        field: "TypeofSubCategory",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "TypeofSubCategory",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 150,
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

  const TABS = useMemo(
    () => [
      {
        label: "Active Split Sub Category",
        icon: <CheckCircle fontSize="small" />,
      },
      {
        label: "Deactivated Split Sub Category",
        icon: <Cancel fontSize="small" />,
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
                tabMenus={TABS}
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
            {spinner ? (
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
        loading={actionLoading}
        children={<></>}
      />
    </>
  );
}

export default memo(SplitSubCategory);

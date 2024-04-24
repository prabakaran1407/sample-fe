/** @format */

import AgDataGrid from "../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  ActionItems,
  MyDrawer,
  ActionConfirmation,
  PillTab,
} from "../../../../../components/MUI/mui.index";
import { TNestedObj, Ipayload } from "../../../../../types/global.types";
import { Autocomplete, Box, Button, Grid, InputLabel, Stack, TextField } from "@mui/material";
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
import { productHsnSchema } from "../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";

// ********* Bulkupload
import ProductSettingBulkUpload from "../Bukupload/ProductSettingBulkUpload";

// **************** | Loader |**********
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
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    hsn: "",
    cgst: "",
    sgst: "",
    igst: "",
    description: null,
  });

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let payload = {
        value: value?.hsn,
        cgst: value?.cgst,
        sgst: value?.sgst,
        igst: value?.igst,
        description: value?.description,
      } as Ipayload;
      let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[7]}`;
      if (isEdit) {
        payload = {
          ...payload,
          updatedBy: AUTH?.data?.userRecord?.id,
        };
        await SettingService.productSettingUpdate(id, payload, query);
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      } else {
        payload = {
          ...payload,
          createdBy: AUTH?.data?.userRecord?.id,
          updatedBy: AUTH?.data?.userRecord?.id,
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        await SettingService.productSettingCreate(payload, query);
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      }
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        if (error?.response?.data?.response?.isDuplicate) {
          formik.setFieldError("hsn", error?.response?.data?.message);
          return;
        }
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  const formik = useFormik({
    validationSchema: productHsnSchema({}),
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
      hsn: data?.value,
      cgst: data?.cgst,
      sgst: data?.sgst,
      igst: data?.igst,
      description: data?.description,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({
      hsn: "",
      cgst: "",
      sgst: "",
      igst: "",
      description: null,
    });
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
          ? "Add HSN Code"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit HSN Code"
          : "View HSN Code"
      }
    >
      <>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    HSN Code <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    fullWidth
                    type="text"
                    name="hsn"
                    value={(formik?.values?.hsn || "").trimStart()}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder="Enter HSN Code"
                    disabled={isView}
                    error={getError(formik, "hsn")?.isTrue}
                    helperText={
                      getError(formik, "hsn")?.isTrue &&
                      getError(formik, "hsn")?.message
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    CGST(%) <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    fullWidth
                    type="number"
                    name="cgst"
                    value={formik?.values?.cgst?.toString() || ""}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder="Enter CGST"
                    disabled={isView}
                    error={getError(formik, "cgst")?.isTrue}
                    helperText={
                      getError(formik, "cgst")?.isTrue &&
                      getError(formik, "cgst")?.message
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    SGST(%) <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    fullWidth
                    type="number"
                    name="sgst"
                    value={formik?.values?.sgst.toString() || ""}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder="Enter SGST"
                    disabled={isView}
                    error={getError(formik, "sgst")?.isTrue}
                    helperText={
                      getError(formik, "sgst")?.isTrue &&
                      getError(formik, "sgst")?.message
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    IGST(%) <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    fullWidth
                    type="number"
                    name="igst"
                    value={formik?.values?.igst.toString() || ""}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder="Enter IGST"
                    disabled={isView}
                    error={getError(formik, "igst")?.isTrue}
                    helperText={
                      getError(formik, "igst")?.isTrue &&
                      getError(formik, "igst")?.message
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Description
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
                        !formik.values.hsn?.trim()
                        // !formik.values.cgst ||
                        // !formik.values.sgst ||
                        // !formik.values.igst
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
      </>
    </ActionModal>
  );
}

// ********************* | Main List Page | *****************
function ProductHsn() {
  const AUTH = useAppSelector((state: any) => state?.auth);
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  // ******************** State
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [render, reRender] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [filterobject, setFilterObject] = useState<any>({});
  console.log('filterObjectHSN',filterobject)
  const [filterValue, setFilterValue] = useState<any>([]);

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
      title: "Deactivate HSN Code",
      message: `Are you sure you want to deactivate this HSN code?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate HSN Code",
      message: `Are you sure you want to activate this HSN code?`,
    });
  };

  const getList = async () => {
    setSpinner(true);
    let payload = {
      matchObj: {
        isActive: isActive,
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      value: filterobject?.value || '',
      limit: pageSize,
      project: [],
    };
    let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[7]}&isCount=true&listType=LIST`;
    const listRes = await SettingService.productSettingList(payload, query);
    if (listRes?.status) {
      setTableData(listRes?.data?.response?.data || []);
      setTotalCount(listRes?.data?.response?.totalCount?.count);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab,filterobject]);

  const getListFilter = async () => {
    setSpinner(true);
    let payload = {
      matchObj: {
        isActive: isActive,
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      project: [],
    };
    let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[7]}&isCount=true&listType=DROPDOWN_LIST`;
    const listResFilter = await SettingService.productSettingList(payload, query);
    if (listResFilter) {
      setFilterValue(listResFilter?.data?.response?.data || []);
    }
    setSpinner(false);
  };
  useEffect(() => {
    getListFilter();
  }, []);


  const activeDeactive = async () => {
    try {
      setBtnLoading(true);
      let payload = {
        isActive: !isActive,
      } as Record<string, any>;
      let id: any = rowItem._id;
      let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[7]}`;
      await SettingService.productsSettingActiveDeactive(id, payload, query);
      getList();
      setBtnLoading(false);
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      setBtnLoading(false);
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
        headerName: "HSN Code",
        field: "value",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "CGST(%)",
        field: "cgst",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "cgst",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "SGST(%)",
        field: "sgst",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "sgst",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "IGST(%)",
        field: "igst",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "igst",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 500,
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
        label: "Active HSN Code",
        icon: <CheckCircle fontSize="small" />,
      },
      {
        label: "Deactivated HSN Code",
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
                <Grid item xs={4} sx={{marginRight:"12px"}}>
                  <Autocomplete
                    value={filterobject?.label}
                    onChange={(_event, newValue) =>
                      setFilterObject(newValue)
                    }
                    options={filterValue}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        label="HSN Code"
                        variant="outlined"
                        sx={{ width: 120 }}
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
                      "&:hover": {
                        background: COLORS.secondary,
                      },
                    }}
                    onClick={() => {
                      getList();
                    }}
                  />
                  <ActionIconButton
                    actionType={ACTION_ICON_TYPES[7]}
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
                      setActionType(ACTION_ICON_TYPES[7]);
                      setDrawerOpen(true);
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
        <MyDrawer
          anchor={"right"}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          onClose={undefined}
          onOpen={() => {
            undefined;
          }}
          drawerWidth="40%"
          title="Brand bulkupload"
        >
          <ProductSettingBulkUpload
            setting_type={CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}
            sub_type={CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[7]}
          />
        </MyDrawer>
        <ActionConfirmation
          title={openConfirmation?.title}
          open={openConfirmation.open}
          message={openConfirmation?.message}
          loading={btnLoading}
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
      </div>
    </>
  );
}

export default memo(ProductHsn);

/** @format */

import AgDataGrid from "../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  ActionItems,
  AutoComplete,
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
  getApiCallableState,
} from "../../../../../utils/index.ts";

// ************** | Form schema
import { productColorSchema } from "../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";

// ********* Bulkupload
import ProductSettingBulkUpload from "../Bukupload/ProductSettingBulkUpload";

// **************** | Loader |**********
// import { BackDropLoader } from "../../../../../components/APP/SuspenseLoader/index";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { COLORS } from "../../../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
// import { toast } from "react-toastify";

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
    color: null,
    description: null,
    brand: null,
    category: null,
    subcategory: null,
    producttype: null,
  });

  const [brandData, setBrandData] = useState<Record<string, any>[]>([]);
  const [categoryList, setCategoryList] = useState<Record<string, any>[]>([]);
  const [subCategoryList, setSubCategoryList] = useState<Record<string, any>[]>(
    []
  );
  const [productType, setProductType] = useState<Record<string, any>[]>([]);
  const [apiCallState, setApiCallState] = useState<Record<string, any>>(
    getApiCallableState(CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES)
  );
  const [errorMessage, setErrorMessage] = useState("");
  console.log("reserrormessage", errorMessage);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let payload = {
        value: value?.color,
        producttype: value?.producttype?.value,
        category: value?.category?.value,
        brand: value?.brand?.value,
        subcategory: value?.subcategory?.value,
        description: value?.description,
      } as Ipayload;
      let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[4]}`;
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
        setErrorMessage("");
      }
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        if(error?.response?.data?.response?.isDuplicate){
          formik.setFieldError('color', error?.response?.data?.message)
          return 
        }
        const errorMessage = error?.response?.data?.message || "";
        setErrorMessage(errorMessage);
      }
    }
  };
  const formik = useFormik({
    validationSchema: productColorSchema({}),
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
      color: data?.value,
      producttype: {
        label: data?.producttype?.value,
        value: data?.producttype?._id,
      },
      brand: { label: data?.brandData?.value, value: data?.brandData?._id },
      category: { label: data?.category?.value, value: data?.category?._id },
      subcategory: {
        label: data?.subcategory?.value,
        value: data?.subcategory?._id,
      },
      description: data?.description,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({
      color: null,
      description: null,
      brand: null,
      category: null,
      subcategory: null,
      producttype: null,
    });
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
      // *************** Brand Data
      let getBrand = {
        matchObj: {
          isActive: true,
        },
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}&listType=DROPDOWN_LIST`;
      let list = await SettingService.productSettingList(getBrand, query);
      setBrandData(list?.data?.response?.data || []);
    } catch (error) {
      console.log("getInitialData >>>>", error);
    }
  };

  const getSelectionBaseData = async () => {
    try {
      if (apiCallState?.category) {
        // ************ Category
        let categoryPayload = {
          matchObj: {
            isActive: true,
            brand: formik?.values?.brand?.value,
          },
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        let categoryQuery = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[1]}&listType=DROPDOWN_LIST`;
        let categoryList = await SettingService.productSettingList(
          categoryPayload,
          categoryQuery
        );
        setCategoryList(categoryList?.data?.response?.data || []);
      }

      if (apiCallState?.subcategory) {
        // ************ SubCategory
        let subcategoryPayload = {
          matchObj: {
            isActive: true,
            brand: formik?.values?.brand?.value,
            category: formik?.values?.category?.value,
          },
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        let subcategoryQuery = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[2]}&listType=DROPDOWN_LIST`;
        let subcategoryList = await SettingService.productSettingList(
          subcategoryPayload,
          subcategoryQuery
        );
        setSubCategoryList(subcategoryList?.data?.response?.data || []);
      }

      if (apiCallState?.producttype) {
        // ************ Product type
        let productTypePayload = {
          matchObj: {
            isActive: true,
            brand: formik?.values?.brand?.value,
            category: formik?.values?.category?.value,
            subcategory: formik?.values?.subcategory?.value,
          },
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        let productTypeQuery = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[3]}&listType=DROPDOWN_LIST`;
        let productTypeList = await SettingService.productSettingList(
          productTypePayload,
          productTypeQuery
        );
        setProductType(productTypeList?.data?.response?.data || []);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    getInitialData();
  }, [render]);
  useEffect(() => {
    getSelectionBaseData();
  }, [render, apiCallState]);

  return (
    <ActionModal
      open={open}
      onClose={() => {
        ResetForm();
        handleClose && handleClose();
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? "Add Color"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Color"
          : "View Color"
      }
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
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
                  Brand <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={brandData}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="brand"
                      placeholder="Select brand type"
                      error={getError(formik, "brand")?.isTrue}
                      helperText={
                        getError(formik, "brand")?.isTrue &&
                        getError(formik, "brand")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.brand || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("brand", selectedOption);
                    setApiCallState(
                      getApiCallableState(
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES,
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]
                      )
                    );
                  }}
                  disabled={isView || isEdit}
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
                  Category <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={categoryList}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="category"
                      placeholder="Select category type"
                      error={getError(formik, "category")?.isTrue}
                      helperText={
                        getError(formik, "category")?.isTrue &&
                        getError(formik, "category")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.category || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("category", selectedOption);
                    setApiCallState(
                      getApiCallableState(
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES,
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[1]
                      )
                    );
                  }}
                  disabled={isView || isEdit}
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
                  Sub Category <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={subCategoryList}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="subcategory"
                      placeholder="Select sub category"
                      error={getError(formik, "subcategory")?.isTrue}
                      helperText={
                        getError(formik, "subcategory")?.isTrue &&
                        getError(formik, "subcategory")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.subcategory || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("subcategory", selectedOption);
                    setApiCallState(
                      getApiCallableState(
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES,
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[2]
                      )
                    );
                  }}
                  disabled={isView || isEdit}
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
                  Product Type <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={productType}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="producttype"
                      placeholder="Select product type"
                      error={getError(formik, "producttype")?.isTrue}
                      helperText={
                        getError(formik, "producttype")?.isTrue &&
                        getError(formik, "producttype")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.producttype || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("producttype", selectedOption);
                    setApiCallState(
                      getApiCallableState(
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES,
                        CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[3]
                      )
                    );
                  }}
                  disabled={isView || isEdit}
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
                  Product Variant <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="color"
                  value={(formik?.values?.color || "").trimStart()}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter product color"
                  disabled={isView}
                  error={getError(formik, "color")?.isTrue}
                  helperText={
                    getError(formik, "color")?.isTrue &&
                    getError(formik, "color")?.message
                  }
                />
                {errorMessage && (
                  <Box
                    sx={{
                      color: "red",
                      textAlign: "center",
                      marginBottom: "10px",
                      fontSize: "small",
                    }}
                  >
                    {errorMessage}
                  </Box>
                )}
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
                  Description
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="description"
                  value={formik?.values?.description}
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
                      !formik.values.brand ||
                      !formik.values.category ||
                      !formik.values.subcategory ||
                      !formik.values.producttype ||
                      !formik.values.color.trim()
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
function ProductColor() {
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
  console.log('filterObjectcolor',filterobject)
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
      title: "Deactivate Color",
      message: `Are you sure you want to deactivate this color?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Color",
      message: `Are you sure you want to activate this color?`,
    });
  };

  const getList = async () => {
    setSpinner(true);
    let payload = {
      matchObj: {
        isActive: isActive,
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      value: filterobject?.value || '',
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      project: [],
    };
    let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[4]}&isCount=true&listType=LIST`;
    const listRes = await SettingService.productSettingList(payload, query);
    if (listRes?.status) {
      setTableData(listRes?.data?.response?.data || []);
      setTotalCount(listRes?.data?.response?.totalCount?.count);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab, filterobject]);

  const getListFilter = async () => {
    setSpinner(true);
    let payload = {
      matchObj: {
        isActive: isActive,
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      project: [],
    };
    let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[4]}&isCount=true&listType=DROPDOWN_LIST`;
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
      setBtnLoading(true)
      let payload = {
        isActive: !isActive,
      } as Record<string, any>;
      let id: any = rowItem._id;
      let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[4]}`;
      await SettingService.productsSettingActiveDeactive(id, payload, query);
      getList();
      setBtnLoading(false)
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      setBtnLoading(false)
      if (!error?.response?.data?.status) {
        // toast.error(error?.response?.data?.message || "", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    }
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Brand",
        field: "brandData.value",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "brandData.value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Category",
        field: "category.value",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "category.value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Sub Category",
        field: "subcategory.value",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "subcategory.value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Product type",
        field: "producttype.value",
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "producttype.value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Color",
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
        label: "Active Color",
        icon: <CheckCircle fontSize="small" />,
      },
      {
        label: "Deactivated Color",
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
                        label="Variant"
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
            sub_type={CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[4]}
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

export default memo(ProductColor);

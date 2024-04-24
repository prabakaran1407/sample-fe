/** @format */

import AgDataGrid from '../../../../../components/AG-GRID/DataGrid/AgDataGrid';
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  ActionItems,
  MyDrawer,
  ActionConfirmation,
  FileUpload,
  PillTab,
} from '../../../../../components/MUI/mui.index';
import { TNestedObj, Ipayload } from '../../../../../types/global.types';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ColDef } from 'ag-grid-community';
import React, { memo, useEffect, useMemo, useState } from 'react';

// ************* Const
import { ACTION_ICON_TYPES } from '../../../../../data/AppConst';
import CustomCellRenderValues from '../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx';
import GetHeaderParams from '../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx';

// ******* Service
import SettingService from '../../../../../services/settings/settings.service.ts';

// ************** Util
import {
  GET_CONST_FROM_AUTH,
  getSkipCount,
} from '../../../../../utils/index.ts';

// ************** | Form schema
import { productBrandSchema } from '../../../../../data/yup/settings/settings.ts';
import { useFormik } from 'formik';
import { useAppSelector } from '../../../../../hooks/index.ts';

// ********* Bulkupload
import ProductSettingBulkUpload from '../Bukupload/ProductSettingBulkUpload';

import { ProductImageCellRenderer } from '../CellRendererComponent.tsx';

// **************** | Loader |**********
// import { BackDropLoader } from "../../../../../components/APP/SuspenseLoader/index";
import { toast } from 'react-toastify';
import { Add, Cancel, CheckCircle, ImageOutlined } from '@mui/icons-material';
import { COLORS } from '../../../../../utils/globals.ts';
import { PropagateLoader } from 'react-spinners';

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
    brand: null,
    description: null,
  });
  const [viewImage, setViewImage] = useState('');
  const [_selectedFile, _setSelectedFile] = useState<
    Record<string, any> | FormData | any
  >(null);
  const [_disableBtn, setDisableBtn] = useState<boolean>(false);
  const [fileUpload, handleFileUpload] = useState<any>(null);

  // const fileUploadRes = async (payload: any) => {
  //   let fileUploadRes: any = await CommonService.uploadImage(
  //     selectedFile,
  //     selectedFile?.type
  //   );
  //   fileUploadRes = fileUploadRes?.data;
  //   if (fileUploadRes?.status && fileUploadRes?.imagePath) {
  //     payload = {
  //       ...payload,
  //       images: {
  //         imagePath: fileUploadRes?.imagePath,
  //         meta_data: {
  //           ...fileUploadRes?.s3Object,
  //         },
  //       },
  //     };
  //   }

  //   return payload;
  // };

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let payload: any = {
        value: value?.brand,
        description: value?.description,
      } as Ipayload;
      if (isEdit) {
        payload = {
          ...payload,
          updatedBy: AUTH?.data?.userRecord?.id,
        };
        // File upload fn
        if (fileUpload) {
          // payload = await fileUploadRes(payload);
          payload.images = {
            imagePath: fileUpload?.imagePath,
            filename: fileUpload?.imagePath
              ? fileUpload?.imagePath?.split('/').reverse()[0]
              : '',
          };
        }

        let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}`;
        await SettingService.productSettingUpdate(id, payload, query);
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      } else {
        payload = {
          ...payload,
          //   settingsType: CONSTANT_DATA.SETTING_TYPES[1],
          //   subTypes: CONSTANT_DATA.SETTING_SUB_TYPES[1],
          createdBy: AUTH?.data?.userRecord?.id,
          updatedBy: AUTH?.data?.userRecord?.id,
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        // File upload fn
        if (fileUpload) {
          // payload = await fileUploadRes(payload);
          payload.images = {
            imagePath: fileUpload?.imagePath,
            filename: fileUpload?.imagePath
              ? fileUpload?.imagePath?.split('/').reverse()[0]
              : '',
          };
        }

        let listquery = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}&isCount=true&listType=LIST`;
        const settingList = await SettingService.productSettingList(
          payload,
          listquery
        );

        const temp = settingList?.data?.response?.data?.find(
          (item: any) =>
            item.value === payload.value &&
            item.organization_id === payload.organization_id
        );

        if (!temp) {
          let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}`;
          await SettingService.productSettingCreate(payload, query);
          ResetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          formik.setFieldError('brand', 'Brand already exists.');
        }
      }
    } catch (error: any) {
      console.log('error >>>>', error);
      if (!error?.response?.data?.status) {
        if (error?.response?.data?.response?.isDuplicate) {
          formik.setFieldError('brand', error?.response?.data?.message);
          return;
        }
        toast.error(error?.response?.data?.message || '', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  const formik = useFormik({
    validationSchema: productBrandSchema({}),
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
      brand: data?.value,
      description: data?.description,
    });
    setViewImage(data?.images?.imagePath);
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ brand: null, description: null });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  const disabledSxProp: any = useMemo(
    () =>
      isView
        ? {
            '& .MuiInputBase-input': {
              backgroundColor: 'transparent',
            },
            '& .MuiInputBase-input.Mui-disabled': {
              opacity: 1,
              '-webkit-text-fill-color': 'rgb(0, 0, 0, 1)',
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
          ? 'Add Brand'
          : actionType === ACTION_ICON_TYPES[1]
          ? 'Edit Brand'
          : 'View Brand'
      }>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 1,
        }}>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          {!isView ? (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ py: 1 }}>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    Brand <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Textfield
                    type='text'
                    name='brand'
                    value={(formik?.values?.brand || '').trimStart()}
                    fullWidth
                    error={getError(formik, 'brand')?.isTrue}
                    helperText={
                      getError(formik, 'brand')?.isTrue &&
                      getError(formik, 'brand')?.message
                    }
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder='Enter brand'
                    disabled={isView}
                    sx={disabledSxProp}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ py: 1 }}>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    Description
                  </InputLabel>
                  <Textfield
                    fullWidth
                    type='text'
                    name='description'
                    value={(formik?.values?.description || '').trimStart()}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder='Enter description'
                    disabled={isView}
                    sx={disabledSxProp}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ py: 1 }}>
                  <FileUpload
                    handleFileUpload={handleFileUpload}
                    onProgress={setDisableBtn}
                    // getFileOnly={true}
                    showNote={false}
                    labelName={data?.images?.filename}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 1,
                  }}>
                  <ButtonV1
                    disabled={
                      formik?.isSubmitting ||
                      !formik.isValid ||
                      !formik.values.brand?.trim()
                    }
                    type='submit'
                    style={{ height: 38, fontSize: 14, width: '20%' }}>
                    {isAdd ? 'Add' : 'Update'}
                  </ButtonV1>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ py: 1 }}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Brand <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Textfield
                        type='text'
                        name='brand'
                        value={(formik?.values?.brand || '').trimStart()}
                        fullWidth
                        error={getError(formik, 'brand')?.isTrue}
                        helperText={
                          getError(formik, 'brand')?.isTrue &&
                          getError(formik, 'brand')?.message
                        }
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        placeholder='Enter brand'
                        disabled={isView}
                        sx={disabledSxProp}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ py: 1 }}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Description
                      </InputLabel>
                      <Textfield
                        fullWidth
                        type='text'
                        name='description'
                        value={(formik?.values?.description || '').trimStart()}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        placeholder='Enter description'
                        disabled={isView}
                        sx={disabledSxProp}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  {viewImage ? (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '50%',
                          height: '30vh',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          my: 1,
                        }}>
                        <img
                          src={viewImage}
                          alt=''
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Box>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '60%',
                          height: '30vh',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          border: '1px dashed gray',
                          borderRadius: 1,
                          my: 1,
                        }}>
                        <ImageOutlined sx={{ color: 'gray' }} />
                        <Typography sx={{ fontSize: 14, color: 'gray', py: 1 }}>
                          No brand image
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
    </ActionModal>
  );
}

// ********************* | Main List Page | *****************
function ProductBrand() {
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
    setType === 'OPEN' ? setOpenModal(true) : setOpenModal(false);
  const handleClose = () => setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    handleModalOpen('OPEN');
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen('OPEN');
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleDelete = (value: TNestedObj) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: 'Deactivate Brand',
      message: `Are you sure you want to deactivate this brand?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: 'Activate Brand',
      message: `Are you sure you want to activate this brand?`,
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
    let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}&isCount=true&listType=LIST`;
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
    let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}&isCount=true&listType=DROPDOWN_LIST`;
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
      let query = `?setting_type=${CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}&sub_type=${CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}`;
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
        toast.error(error?.response?.data?.message || '', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: 'Brand Name',
        field: 'value',
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'value',
        },
        ...GetHeaderParams(),
      },
      {
        headerName: 'Brand',
        field: 'images',
        filter: true,
        width: 500,
        cellRenderer: ProductImageCellRenderer,
        ...GetHeaderParams(),
      },
      {
        headerName: 'Description',
        field: 'description',
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'description',
        },
        ...GetHeaderParams(),
      },
      {
        headerName: 'Actions',
        field: '',
        filter: true,
        width: 250,
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
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }),
      },
    ],
    [activatedTab]
  );

  const TABS = useMemo(
    () => [
      {
        label: 'Active Brand',
        icon: <CheckCircle fontSize='small' />,
      },
      {
        label: 'Deactivated Brand',
        icon: <Cancel fontSize='small' />,
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
            <Grid xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Stack direction='row' justifyContent={'space-between'}>
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
                        label="Brand"
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
                      '&:hover': {
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
                      '&:hover': {
                        background: COLORS.secondary,
                      },
                    }}
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[7]);
                      setDrawerOpen(true);
                    }}
                  />
                  <Button
                    variant='contained'
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      setOpenModal(true);
                    }}
                    sx={{ height: 38 }}>
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '65vh',
                  width: '100%',
                }}>
                <PropagateLoader color={COLORS.primary} />
              </Box>
            ) : (
              <AgDataGrid
                rowData={tableData}
                columnDefs={columnDefs}
                TableHeight={55}
                rowHeight={50}
                noDataTxt='No Records Found'
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
      <MyDrawer
        anchor={'right'}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onClose={undefined}
        onOpen={() => {
          undefined;
        }}
        drawerWidth='40%'
        title='Brand bulkupload'>
        <ProductSettingBulkUpload
          setting_type={CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}
          sub_type={CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}
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
    </>
  );
}

export default memo(ProductBrand);

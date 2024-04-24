/** @format */

import AgDataGrid from '../../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx';
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
} from '../../../../../components/MUI/mui.index.tsx';
import { TNestedObj, Ipayload } from '../../../../../types/global.types.ts';
import { Box, Button, Grid, InputLabel, Stack } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import React, { memo, useEffect, useMemo, useState } from 'react';

// ************* Const
import { ACTION_ICON_TYPES } from '../../../../../data/AppConst.ts';
import CustomCellRenderValues from '../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx';
import GetHeaderParams from '../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx';

// ******* Service
import VisitServiceSetting from '../../../../../services/settings/visitsettings.service.ts';

// ************** Util
import {
  GET_CONST_FROM_AUTH,
  getSkipCount,
} from '../../../../../utils/index.ts';

// ************** | Form schema
import { visitType } from '../../../../../data/yup/settings/visitsetting.ts';
import { useFormik } from 'formik';
import { useAppSelector } from '../../../../../hooks/index.ts';

// ********* Bulkupload

// **************** | Loader |**********
import { toast } from 'react-toastify';
import { Add, Cancel, CheckCircle } from '@mui/icons-material';
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
    type: null,
    purpose: null,
  });

  const [_disableBtn, _setDisableBtn] = useState<boolean>(false);
  const [visitPurpose, serVisitPurpose] = useState<Record<string, any>[]>([]);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let payload: any = {
        purpose: value?.purpose?.value,
        type: value?.type,
      } as Ipayload;
      if (isEdit) {
        payload = {
          ...payload,
          updatedBy: AUTH?.data?.userRecord?.id,
        };

        let query = `?visit_setting_type=${CONSTANT_DATA?.VISIT_SETTINGS[0]}`;
        await VisitServiceSetting.update(id, payload, query);
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
        let query = `?visit_setting_type=${CONSTANT_DATA?.VISIT_SETTINGS[0]}`;
        await VisitServiceSetting.create(payload, query);
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      }
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || '', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  const formik = useFormik({
    validationSchema: visitType({}),
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });
  // ******************** Get initial Data
  const getInitialData = async () => {
    try {
      // Brand Data
      let getVisit = {
        matchObj: {
          status: true,
        },
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let query = `?visit_setting_type=${CONSTANT_DATA?.VISIT_SETTINGS[1]}&type=DROPDOWN_LIST`;
      let list = await VisitServiceSetting.list(getVisit, query);
      serVisitPurpose(list?.data?.response?.data || []);
    } catch (e) {
      console.log('Error', e);
    }
  };

  const setDataForEditView = () => {
    setFormValue({
      type: data?.type,
      purpose: {
        label: data?.visitpurpose?.purpose,
        value: data?.visitpurpose?._id,
      },
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ type: null, purpose: null });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    getInitialData();
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
          ? 'Add Type of visit'
          : actionType === ACTION_ICON_TYPES[1]
          ? 'Edit Type of visit'
          : 'View Type of visit'
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
          <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    Visit purpose <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <AutoComplete
                    options={visitPurpose}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='purpose'
                        placeholder='Select visit purpose'
                        error={getError(formik, 'purpose')?.isTrue}
                        helperText={
                          getError(formik, 'purpose')?.isTrue &&
                          getError(formik, 'purpose')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.purpose || null}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      console.log('selectedOption >>>>>>>>', selectedOption);
                      console.log('brand data', formik?.values?.purpose);

                      formik?.setFieldValue('purpose', selectedOption);
                    }}
                    disabled={isView || isEdit}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    Visit Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Textfield
                    type='text'
                    name='type'
                    value={(formik?.values?.type || '').trimStart()}
                    fullWidth
                    error={getError(formik, 'type')?.isTrue}
                    helperText={
                      getError(formik, 'type')?.isTrue &&
                      getError(formik, 'type')?.message
                    }
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder='Enter type'
                    disabled={isView}
                  />
                </Box>
              </Grid>
            </Grid>
            {!isView && (
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
                  disabled={formik?.isSubmitting || !formik.isValid || isView}
                  type='submit'
                  style={{ height: 38, fontSize: 14, width: '20%' }}>
                  {isAdd ? 'Add' : 'Update'}
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
function VisitType() {
  const AUTH = useAppSelector((state: any) => state?.auth);
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  // ******************** State
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [render, reRender] = useState(0);
  const [spinner, setSpinner] = useState<boolean>(false);
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
      title: 'Deactivate visit type',
      message: `Are you sure you want to deactivate this visit type?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: 'Activate visit type',
      message: `Are you sure you want to activate this visit type?`,
    });
  };

  const getList = async () => {
    setSpinner(true);
    let payload = {
      matchObj: {
        status: isActive,
      },
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      project: [],
    };
    let query = `?visit_setting_type=${CONSTANT_DATA?.VISIT_SETTINGS[0]}&isCount=true`;
    const listRes = await VisitServiceSetting.list(payload, query);
    if (listRes?.status) {
      setTableData(listRes?.data?.response?.data || []);
      setTotalCount(listRes?.data?.response?.totalCount);
    }
    setSpinner(false);
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
      let query = `?visit_setting_type=${CONSTANT_DATA?.VISIT_SETTINGS[0]}`;
      // await VisitServiceSetting.update(id, payload, query);
      await VisitServiceSetting.activedeactive(id, payload, query);
      getList();
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
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
        headerName: 'Type of visit',
        field: 'type',
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'type',
        },
        ...GetHeaderParams(),
      },
      //   {
      //     headerName: "Brand",
      //     field: "images",
      //     filter: true,
      //     width: 500,
      //     cellRenderer: ProductImageCellRenderer,
      //     ...GetHeaderParams(),
      //   },
      {
        headerName: 'Purpose of visit',
        field: 'visitpurpose.purpose',
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'visitpurpose.purpose',
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
        label: 'Active Tyoe',
        icon: <CheckCircle fontSize='small' />,
      },
      {
        label: 'Deactivated Type',
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
                <Box>
                  <ActionIconButton
                    actionType={ACTION_ICON_TYPES[6]}
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
                      getList();
                    }}
                  />
                  {/* <ActionIconButton
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
                                    /> */}
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
                TableHeight={40}
                rowHeight={45}
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
      {/* <MyDrawer
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
          sub_type={CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}
        />
      </MyDrawer> */}
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

export default memo(VisitType);

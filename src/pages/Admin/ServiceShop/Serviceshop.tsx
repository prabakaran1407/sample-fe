import { useEffect, useState, useMemo } from 'react';
import { Box, Grid, InputLabel, Typography, Stack, Tooltip } from '@mui/material';
import { useAppSelector } from '../../../hooks/index.ts';
import { ACTION_ICON_TYPES } from '../../../data/AppConst.ts';
import { Ipayload } from '../../../types/global.types.ts';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  AutoComplete,
  Textfield,
  ContainerBoxV2,
  ButtonV1,
} from '../../../components/MUI/mui.index.tsx';
import {
  CustomDivier,
  MultiSelectTable,
} from '../../../components/APP/app.index.tsx';

// **************  Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useLocation } from 'react-router-dom';

// ************ services
import ShopService from '../../../services/admin/shop/Shop.service.ts';
// import AUMService from '../../../services/admin/UserManagemet.service.ts'

// ************* utils
import { dayStartOrEnd, getDateDiff } from '../../../utils/datetime';


const boxStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  justifyContent: 'center',
  height: '100%',
  width: 'auto',
  // padding: '5px',
  // gap: '5px'
  marginBottom: '20px'
};

function formActionType(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    isAdd: locationState?.actionType === ACTION_ICON_TYPES[0],
    isEdit: locationState?.actionType === ACTION_ICON_TYPES[1],
    isView: locationState?.actionType === ACTION_ICON_TYPES[2],
    id: locationState?.id,
  };
}

const validationSchema = (_condition: any) =>
  yup.object({
    billingId: yup
      .object()
      .shape({
        label: yup.string().required('Billing is required'),
        value: yup.string().required('Billing is required'),
      })
      .required('Billing is required'),
    module: yup
      .object()
      .shape({
        label: yup.string().required('Module is required'),
        value: yup.string().required('Module is required'),
      })
      .required('Module is required'),
  });

export default function ServiceShop(props: any) {
  const location = useLocation();
  const AUTH = useAppSelector((state) => state?.auth);
  const { isEdit, isView } = formActionType(props, location?.state);
  const [formvalue, _setFormValue] = useState<Record<string, any>>({
    billingId: null,
    module: null,
  });

  const [_userData, _setUserData] = useState<Record<string, any>[]>([]);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [_recType, _setRecType] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [billings, setBillings] = useState<Record<string, any>[]>([])
  const [modules, setModules] = useState<Record<string, any>[]>([])

  const handleSubmit = async (_value: Record<string, any>) => {
    try {
      setLoading(true);
      if (selectedRow?.length === 0) {
        return;
      }
      let payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        billingDetailsId: formik?.values?.billingId?.value,
        moduleId: formik?.values?.module?.value,
      } as Ipayload | any;
      payload.users = selectedRow.map((m: any) => m?.id);
      console.log('payload of service', payload);
      if (isEdit) {
        payload = {
          ...payload,
          updatedBy: AUTH?.data?.userRecord?.id,
        };

        // await SettingService.productSettingUpdate(id, payload, query);
        setLoading(false);
        // navigate(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName);
      } else {
        payload = {
          ...payload,
          createdBy: AUTH?.data?.userRecord?.id,
          updatedBy: AUTH?.data?.userRecord?.id,
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        const res = await ShopService.createUserService(payload)
        console.log('res >>>>>', res)
        if(res?.data?.status){
          toast.success(res?.data?.message || '', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setLoading(false);
        setTableData([])
        getUserData()
        // navigate(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName);
      }
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || '', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    validationSchema: validationSchema({}),
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });
  console.log('fomik values', formik?.values);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });


  console.log('tableData >>>>>>>>.', tableData)
  console.log('formik?.isValid >>>>>>>', formik?.isValid)
  async function getUserData() {
    try {

      const payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        isAdmin: false,
        toDay: dayStartOrEnd(new Date()).valueOf()
      } as any;
      if (formik?.values?.billingId) payload.billingDetailsId = formik?.values?.billingId?.value
      if (formik?.values?.module) payload.moduleId = formik?.values?.module?.value
      const listData = await ShopService.listUsers(payload)
      // console.log('res >>>>>>>>>>', res)
      // let listData = await AUMService.getAll(payload);
      // console.log('listData >>>>>>>>>>', listData)
      setTableData(listData?.data?.response?.length > 0 ? [...listData?.data?.response] : []);

    } catch (error) {
      console.log('error : ', error);
    }
  };

  const getBillings = async () => {
    try {
      const Payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        currentDate: dayStartOrEnd(new Date(), 'END')?.valueOf(),
      };
      let response = await ShopService.getAdminBillings(Payload);
      response = response?.data?.response
      console.log('getBillings response >>>>>>>>>>>', response);
      response.data;
      // setUserData(categoriesOption);
      if (response?.length > 0) {
        setBillings(response?.map((m: any) => ({
          label: m?.formatServiceStartDate,
          value: m?._id,
          details: m
        })))
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };
  const getUnassignedCount = (val: any) => ((val?.numberOfUsers || 0) - (val?.parentmodules?.UASC?.assignedCount || 0)) 

  useEffect(() => {
    getBillings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // ************** Modules based on selected billings,
    if (formik?.values?.billingId) {
      console.log('formik?.values?.billingId >>>>>>>>>>>', formik?.values?.billingId)
      if (formik?.values?.billingId?.details?.billingitems?.length > 0) {
        setModules(formik?.values?.billingId?.details?.billingitems?.map((m: any) => ({
          label: m?.parentmodules?.moduleName,
          value: m?.parentmodules?._id,
          details: m
        })))
      } else {
        setModules([])
      }
    } else {
      setModules([])
    }
  }, [formik?.values?.billingId])

  useEffect(() => {
    // ************** Modules based on selected billings,
    getUserData();
    return () => {
      setTableData([]);
    }
  }, [formik?.values?.billingId, formik?.values?.module])

  const colDef = useMemo(() =>
    [
      {
        headerName: 'User Name',
        field: 'fullname',
      }
    ], [])

  const MultiSelectTableComponent = useMemo(() => MultiSelectTable, [tableData]);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                {/* {isAdd ? 'Add New Trip Plan' : 'Edit Trip Plan'} */}
                Shop
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <ContainerBoxV2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Billings <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={billings}
                  getOptionLabel={(option: any) => option?.label}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type='text'
                      name='billingId'
                      placeholder='Select Billing'
                      error={getError(formik, 'billingId')?.isTrue}
                      helperText={
                        getError(formik, 'billingId')?.isTrue &&
                        getError(formik, 'billingId')?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.billingId || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue('billingId', selectedOption);
                    formik?.setFieldValue('module', null);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Modules <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={modules}
                  getOptionLabel={(option: any) => option?.label}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type='text'
                      name='module'
                      placeholder='Select Module'
                      error={getError(formik, 'module')?.isTrue}
                      helperText={
                        getError(formik, 'module')?.isTrue &&
                        getError(formik, 'module')?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.module || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue('module', selectedOption);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={6} flexDirection={'column'}>
              <Stack
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                sx={{ height: '100%', width: '100%' }}>
                {
                  formik?.values?.billingId && formik?.values?.module && (formik?.values?.billingId?.details?.billingType === 'PAID' ?
                    (<>
                      <Box component='div' sx={{ ...boxStyle }}>
                        <Typography variant="body2" sx={{ color: 'blue' }}>Total: &nbsp;</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>

                          <Typography variant="body2">{formik?.values?.module?.details?.numberOfUsers}</Typography>
                          <Tooltip title={`You can assign this service to a maximum of ${formik?.values?.module?.details?.numberOfUsers} user(s).`}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <InfoOutlinedIcon sx={{ fontSize: '10px' }} />
                            </div>
                          </Tooltip>
                        </div>
                      </Box>
                      <Box component='div' sx={{ ...boxStyle }}>
                        <Typography variant="body2" sx={{ color: 'green' }}>Assigned: &nbsp;</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>

                          <Typography variant="body2">{formik?.values?.module?.details?.parentmodules?.UASC?.assignedCount || 0}</Typography>
                          <Tooltip title={formik?.values?.module?.details?.parentmodules?.UASC?.assignedCount ? `The number of user(s) already assigned` : `Service not yet assign to user(s)`}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <InfoOutlinedIcon sx={{ fontSize: '10px' }} />
                            </div>
                          </Tooltip>
                        </div>
                      </Box>

                      { getUnassignedCount(formik?.values?.module?.details) && (<Box component='div' sx={{ ...boxStyle }}>
                        <Typography variant="body2" sx={{ color: '#7d393a' }}>Un-Assigned: &nbsp;</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>

                          <Typography variant="body2">{getUnassignedCount(formik?.values?.module?.details)}</Typography>
                          <Tooltip title={`${getUnassignedCount(formik?.values?.module?.details)} service(s) available for assign to user(s)`}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <InfoOutlinedIcon sx={{ fontSize: '10px' }} />
                            </div>
                          </Tooltip>
                        </div>
                      </Box>)
                    }
                    </>
                    ) : (
                      <>

                        <Box component='div' sx={{ ...boxStyle }}>
                          <Typography variant="body2" sx={{ color: 'green' }}>Total: &nbsp;</Typography>
                          <div style={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>

                            <Typography variant="body2">{formik?.values?.module?.details?.numberOfUsers}</Typography>
                            <Tooltip title={`You can assign this service to a maximum of ${formik?.values?.module?.details?.numberOfUsers} user(s).`}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <InfoOutlinedIcon sx={{ fontSize: '10px' }} />
                              </div>
                            </Tooltip>
                          </div>
                        </Box>
                      </>
                    )
                  )
                }
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {formik?.values?.billingId && (<Box
                style={{
                  padding: '2px',
                  // border: '1px dashed violet',
                  // textAlign: 'center',
                  borderRadius: '5px',
                  // background: '#E7DCF2',
                  // color: 'whitesmoke'
                }}>
                <Typography variant='body2'>
                Note: {`Service will expire within ${getDateDiff(formik?.values?.billingId?.details?.formatServiceEndDate)?.diff} ${getDateDiff(formik?.values?.billingId?.details?.formatServiceEndDate)?.unit}.`}
                </Typography>
              </Box>)}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  height: "400px",
                  overflow: "scroll",
                  width: "100%",
                }}
              >
                {
                  tableData?.length > 0 && (
                    <MultiSelectTableComponent
                      colDef={colDef}
                      tableData={tableData}
                      isMultiSelect={true}
                      selectedRow={(updatedTableData: any[]) => {
                        console.log('selectedRow >>>>>>>>>>>>>', updatedTableData);
                        setTableData(updatedTableData);
                        setSelectedRow([...updatedTableData?.filter((ft: any) => ft?.isSelected)])
                      }}
                    />
                  )
                }

              </Box>

            </Grid>
            <Grid item xs={12} >
              <Box
                sx={{
                  position: "sticky",
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <ButtonV1
                  type="submit"
                  style={{ height: 38, fontSize: 14, width: "15%" }}
                  disabled={!formik?.isValid || !selectedRow?.length || loading}
                >
                  Submit
                </ButtonV1>
              </Box>
            </Grid>
          </Grid>
        </form>
      </ContainerBoxV2>
    </>
  );
}

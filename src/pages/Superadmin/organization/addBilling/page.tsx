import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../../../hooks';
// import { TNestedObj } from '../../../../types/global.types';
import { isDecimal, isInteger } from '../../../../utils';
import {
  ActionIconButton,
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from '../../../../components/MUI/mui.index';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { dateDiff, getTimeStamp } from '../../../../utils/datetime';
import { COLORS } from '../../../../utils/globals.ts';
import {
  ACTION_ICON_TYPES,
  MODULE_TYPES,
  PaymentService,
} from '../../../../data/AppConst';
import _ from 'lodash';

import BilllingService from '../../../../services/super-admin/billing/billing.service.ts';
import ModuleService from '../../../../services/super-admin/modulesservice.ts';

// ************** | Form schema
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowBackRounded, CloseRounded } from '@mui/icons-material';
import { CustomDivier } from '../../../../components/APP/app.index.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import DownloadPdf from '../pdfPreview/DownloadPdf.tsx';
import PreviewPdf from '../pdfPreview/PreviewPdf.tsx';

const formActionType = ({ data }: Record<string, any>) => {
  return {
    id: data?._id,
  };
};

const validationSchema = yup.object({
  billingType: yup
    .object()
    .shape({
      label: yup.string().required('Billing type is required'),
      value: yup.string().required('Billing type is required'),
    })
    .required('Billing type is required'),
  startDate: yup.string().required('Start date is required'),
  endDate: yup.string().required('End date is required'),
});

export default function AddBilling() {
  const location = useLocation();
  const { data } = location.state || {};
  // let { data } = props;
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  console.log('data of org', data);

  const { id } = formActionType({ data });
  const AUTH = useAppSelector((state) => state?.auth);
  console.log('AUTH', AUTH);
  const [loadingButton, _setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parentServices, setParentServices] = useState<Record<string, any>[]>(
    []
  );
  console.log('loading', loading);
  const [itemTable, setItemTable] = useState<Record<string, any>[]>([
    {
      parentModule: null,
      numberOfUser: null,
      cost: null,
    },
  ]);
  console.log('itemTable', itemTable);
  const [removedItems, setRemovedItem] = useState<Record<string, any>[]>([]);
  const [formvalue, _setFormValue] = useState<Record<string, any>>({
    billingType: null,
    startDate: null,
    endDate: null,
    selectParent: null,
    selectChild: null,
    totalCost: null,
  });

  const [openPdf, setOpenPdf] = useState(false);
  const handleOpenPdf = () => setOpenPdf(true);
  const handleClosePdf = () => setOpenPdf(false);

  const handleSubmit = async (value: Record<string, any>) => {
    setLoading(true);
    try {
      let payload: Record<string, any> = {
        organization_id: id,
        serviceStartDate: getTimeStamp(value?.startDate),
        serviceEndDate: getTimeStamp(value?.endDate),
        billingType: value?.billingType?.value,
        createdBy: AUTH?.data?.userRecord?.id,
        updatedBy: AUTH?.data?.userRecord?.id,
        totalCost: value?.totalCost ? value?.totalCost : 0,
        status: 'PENDING',
        remarks: [
          {
            name: `${AUTH?.data.userRecord.firstName} ${AUTH?.data.userRecord.lastName}`,
            createdAt: Date.now(),
            createOrUpdate: 'Created',
            serviceStartDate: getTimeStamp(value?.startDate),
            serviceEndDate: getTimeStamp(value?.endDate),
            billingType: value?.billingType?.value,
          },
        ],
      };
      if (value?.billingType?.value === 'PAID') {
        let { service, isValid } = validateService(itemTable);
        if (!isValid) {
          toast.error('At least one module must be selected.' || '', {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
          return;
        }
        payload.services = [...service];
      }

      let create = await BilllingService.create(payload);
      create = create.data;
      if (create?.status) {
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong', {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (!error?.response?.status) {
        toast.error(error?.message || 'Something went wrong', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    setLoading(false);
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

  function validateService(value: Record<string, any>[]) {
    let isValid = true;
    for (let i = 0; i < value?.length; i++) {
      let el = value[i];
      function modifyData() {
        el.numberOfUsers = parseInt(el?.numberOfUser);
        el.cost =
          formik.values?.billingType?.value === 'PAID'
            ? parseFloat(el?.cost)
            : 0;
        el.parentModuleId = el?.parentModule?.value;
        return el;
      }
      if (formik.values?.billingType?.value === 'PAID') {
        if (el?.parentModule && el?.numberOfUser && el?.cost) {
          el = modifyData();
        } else {
          isValid = false;
        }
      } else {
        if (el?.parentModule && el?.numberOfUser) {
          el = modifyData();
        } else {
          isValid = false;
        }
      }
    }
    value = value.filter((ft: Record<string, any>) => Boolean(ft));
    return { service: value, isValid };
  }

  const getInitialData = async () => {
    try {
      let modulePayload = {
        moduleType: MODULE_TYPES[0],
        condtion: {
          status: true,
        },
      };
      let getServices = await ModuleService.getModules(modulePayload);

      getServices = getServices?.data?.response;
      let getUniq =
        getServices?.data?.map((m: Record<string, any>) => ({
          label: m?.moduleName,
          value: m?._id,
          details: m,
        })) || [];
      setParentServices(_.uniqBy(getUniq, 'value'));

      // let childModulePayload = {
      //   moduleType: MODULE_TYPES[1],
      //   condtion: {
      //     status: true,
      //   },
      // };
      // let childServices = await ModuleService.getModules(childModulePayload);
      // childServices = childServices?.data?.response;
      // setChildServices(
      //   childServices?.data?.map((m: Record<string, any>) => ({
      //     label: m?.moduleName,
      //     value: m?._id,
      //   })) || []
      // );
    } catch (e) {
      console.log('error', e);
    }
  };

  // ******************** Initial data
  useEffect(() => {
    getInitialData();
  }, []);

  const addLineItem = () => {
    setItemTable([
      ...itemTable,
      {
        parentModule: null,
        numberOfUser: null,
        cost: null,
      },
    ]);
  };

  const removeLineItem = (index: number) => {
    // ************* Only for Edit fn
    let removedItem = { ...itemTable[index] };
    if (removedItem?.id) {
      removedItem.isActive = false;
      setRemovedItem([...removedItems, removedItem]);
    }

    if (itemTable?.length != 1) {
      setItemTable([...itemTable.filter((_ft: any, i: number) => index != i)]);
    } else {
      let nullArray: any[] = [];
      itemTable.forEach((item: any) => {
        Object.keys(item).forEach((key: any) => {
          item[key] = typeof item[key] === 'object' ? null : '';
        });
        nullArray.push(item);
      });
      setItemTable([...nullArray]);
    }
  };

  const setItemData = (inputValue: any, field: string, index: number) => {
    let item = itemTable[index];
    if (field === 'cost' && isDecimal(inputValue)) {
      item[field] = inputValue ? inputValue : 0;
      // Calculate total price
      calculateTotalCost();
    }
    if (field === 'numberOfUser' && isInteger(inputValue)) {
      item[field] = parseInt(inputValue ? inputValue : 0);
    }
    if (field === 'parentModule') {
      // Check duplicate item
      let isAlreadyExist = itemTable.find(
        (f) => inputValue && f?.parentModule?.label === inputValue?.label
      );
      console.log('isAlreadyExist >>>>>>>', isAlreadyExist);
      if (!isAlreadyExist) {
        item[field] = inputValue;
      } else {
        toast.error(`${inputValue?.label} service, already exist `, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
    }
    setItemTable([...itemTable]);
  };

  const TBL_TH = useMemo(
    () =>
      formik?.values?.billingType?.value === 'PAID'
        ? [
            { name: 'Module', width: '30%' },
            { name: 'Users Count', width: '30%' },
            { name: 'Cost / day', width: '30%' },
          ]
        : [
            { name: 'Module', width: '50%' },
            { name: 'Users Count', width: '50%' },
          ],
    [formik?.values?.billingType]
  );

  function calculateTotalCost() {
    console.log('itemTable <<<<<<<>>>>', itemTable);
    const daysCount = dateDiff(
      formik?.values?.startDate,
      formik?.values?.endDate
    );
    const totalValue = _.sumBy(
      itemTable,
      (el) =>
        parseFloat(el?.cost || 0) * daysCount * parseInt(el?.numberOfUser || 1)
    );
    console.log('daysCount >>>>', daysCount);
    console.log('totalValue >>>>', totalValue);
    formik.setFieldValue('totalCost', totalValue);
  }
  useEffect(() => {
    if (formik?.values?.billingType?.value === 'PAID') {
      calculateTotalCost();
    }
  }, [formik?.values?.startDate, formik?.values?.endDate, itemTable]);

  return (
    // <ActionModal
    //   open={open}
    //   onClose={() => {
    //     ResetForm();
    //     handleClose && handleClose();
    //   }}
    //   title={`Add Billing | ${data?.organizationName?.toUpperCase()} (${
    //     data?.noOfUsers
    //   })`}
    // >
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack
              direction='row'
              sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                sx={{
                  width: '2rem',
                  height: '1.7rem',
                  border: '1px solid #ccc',
                  borderRadius: 0.6,
                  marginRight: '1rem',
                }}
                onClick={() => {
                  navigate(-1);
                }}>
                <ArrowBackRounded style={{ color: '#333', fontSize: '22px' }} />
              </IconButton>

              <Typography sx={{ fontSize: 18, fontWeight: '600' }}>
                Add Billing Details
                <span
                  className='text-xl font-light text-[#2C2B2B]'
                  style={{ fontSize: 22, fontWeight: '300' }}>
                  {' '}
                  |{' '}
                </span>{' '}
                {data?.organizationName?.toUpperCase()} {'('}
                {data?.noOfUsers}
                {')'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 1,
          }}>
          <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2} px={1}>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    Billing Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <AutoComplete
                    options={PaymentService}
                    getOptionLabel={(option: any) => {
                      return option.label;
                    }}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='billingType'
                        placeholder='Select billing type'
                        error={getError(formik, 'billingType')?.isTrue}
                        helperText={
                          getError(formik, 'billingType')?.isTrue &&
                          getError(formik, 'billingType')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.billingType || null}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue('billingType', selectedOption);
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    Start Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Textfield
                    type='date'
                    name='startDate'
                    value={(formik?.values?.startDate || '').trimStart()}
                    fullWidth
                    error={getError(formik, 'startDate')?.isTrue}
                    helperText={
                      getError(formik, 'startDate')?.isTrue &&
                      getError(formik, 'startDate')?.message
                    }
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    inputProps={{
                      min: today,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                    End Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Textfield
                    type='date'
                    name='endDate'
                    value={(formik?.values?.endDate || '').trimStart()}
                    fullWidth
                    error={getError(formik, 'endDate')?.isTrue}
                    helperText={
                      getError(formik, 'endDate')?.isTrue &&
                      getError(formik, 'endDate')?.message
                    }
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    inputProps={{
                      min: formik.values.startDate || today,
                    }}
                  />
                </Box>
              </Grid>

              {formik.values.billingType?.value === 'PAID' && (
                <>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Service details
                      </Typography>

                      <ActionIconButton
                        sx={{
                          background: COLORS.primary,
                          borderRadius: 1,
                          width: 30,
                          height: 30,
                          '&:hover': {
                            background: COLORS.secondary,
                          },
                        }}
                        actionType={ACTION_ICON_TYPES[0]}
                        onClick={() => addLineItem()}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <table style={{ borderRadius: '10px' }}>
                      <thead>
                        {TBL_TH?.map((th: any) => (
                          <th
                            style={{
                              width: th.width,
                              textAlign: 'center',
                            }}>
                            {th.name}
                          </th>
                        ))}
                        <th colSpan={2} style={{ textAlign: 'center' }}>
                          Action
                        </th>
                      </thead>
                      <tbody>
                        {itemTable?.map(
                          (row: Record<string, any>, index: number) => (
                            <tr key={index}>
                              <td>
                                <AutoComplete
                                  options={parentServices}
                                  renderInput={(params) => (
                                    <Textfield
                                      {...params}
                                      fullWidth
                                      type='text'
                                      name='parentModule'
                                      placeholder='Select services'
                                    />
                                  )}
                                  value={row?.parentModule || null}
                                  fullWidth
                                  onChange={(
                                    _,
                                    selectedOption: Record<string, any>
                                  ) => {
                                    setItemData(
                                      selectedOption,
                                      'parentModule',
                                      index
                                    );
                                  }}
                                />
                              </td>
                              <td>
                                <Textfield
                                  placeholder='Number of users'
                                  type='text'
                                  name='numberOfUser'
                                  value={row?.numberOfUser || ''}
                                  onChange={(event: any) => {
                                    setItemData(
                                      event?.target?.value,
                                      'numberOfUser',
                                      index
                                    );
                                  }}
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </td>
                              {formik?.values?.billingType?.value ===
                                'PAID' && (
                                <td>
                                  <Textfield
                                    placeholder='Enter cost'
                                    type='text'
                                    name='cost'
                                    value={row?.cost || ''}
                                    onChange={(event: any) => {
                                      setItemData(
                                        event?.target?.value,
                                        'cost',
                                        index
                                      );
                                    }}
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />
                                </td>
                              )}

                              <td style={{ textAlign: 'center' }}>
                                <ActionIconButton
                                  actionType={ACTION_ICON_TYPES[4]}
                                  onClick={() => {
                                    removeLineItem(index);
                                  }}
                                  title='Remove'>
                                  <CloseRounded
                                    fontSize='medium'
                                    color='error'
                                  />
                                </ActionIconButton>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                        Total Cost: {formik?.values?.totalCost || 0}
                      </Typography>
                    </Box>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                  }}>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    {formik?.values?.billingType?.value !== undefined &&
                      formik.values.startDate !== null &&
                      formik.values.endDate !== null &&
                      itemTable[0]?.numberOfUser !== null &&
                      itemTable[0]?.cost !== null && (
                        <>
                          <Button
                            variant='contained'
                            sx={{
                              height: 38,
                              width: '20%',
                              mr: 2,
                            }}
                            onClick={handleOpenPdf}>
                            Preview
                          </Button>
                          <Box sx={{ width: '100%' }}>
                            <DownloadPdf
                              data={itemTable}
                              totalCost={formik?.values?.totalCost || 0}
                              values={formik?.values}
                            />
                          </Box>
                        </>
                      )}
                  </Box>

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <Button
                      variant='outlined'
                      sx={{ height: 38, width: '20%', mx: 2 }}
                      onClick={() => {
                        navigate(-1);
                      }}>
                      Cancel
                    </Button>
                    <LoadingButton
                      variant='contained'
                      type='submit'
                      style={{ height: 38, width: '20%' }}
                      loading={loadingButton}
                      disabled={loading || !formik.isValid}>
                      Submit
                    </LoadingButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
        {openPdf && itemTable[0]?.numberOfUser !== null && (
          <PreviewPdf
            openPdf={openPdf}
            handleClosePdf={handleClosePdf}
            data={itemTable}
            totalCost={formik?.values?.totalCost || 0}
            values={formik?.values}
          />
        )}
      </ContainerBoxV2>
    </>
    // </ActionModal>
  );
}

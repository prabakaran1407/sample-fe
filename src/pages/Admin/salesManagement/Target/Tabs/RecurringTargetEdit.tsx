import React, { useEffect, useRef, useState } from 'react';
import {
  AutoComplete,
  ButtonV1,
  ContainerBoxV2,
  Textfield,
} from '../../../../../components/MUI/mui.index';
import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import _ from 'lodash';
import { getUserListForAdmin } from '../../../../../components/com_components/CustomerSettingsAPI.tsx';
import { useAppSelector } from '../../../../../hooks';
import { TRIP_PLANNER_DATE_RECURRING_TYPES } from '../../../../../data/AppConst';
import SalesTargetService from '../../../../../services/admin/salesTarget/salestarget.service.ts';
import { CustomDivier } from '../../../../../components/APP/app.index';
import { useLocation } from 'react-router';
import { generatePath, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../../../../src/data/AppRoutes.ts';

function RecurringTargetEdit() {
  const location = useLocation();
  const { data } = location.state;
  console.log('data1234', data);

  const [formData, setFormData] = useState<Record<string, unknown | any>>({
    targetType: null,
    users: [],
    fromDate: '',
    toDate: '',
    targetValue: null,
    isOneTimeOrRecurring: '',
    recurringType: '',
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  console.log('formData', formData);
  const auth = useAppSelector((state: any) => state.auth);

  let organization_id = auth?.data?.userRecord?.organization_id;

  console.log('auth', auth);

  const [users, setUsers] = useState([]);

  const ValidationSchema = () => {
    return yup.object().shape({
      fromDate: yup.string().trim().required('From Date is required'),
      toDate: yup.string().trim().required('To Date is required'),
      users: yup.array().min(1, 'At least one option must be selected'),
      targetType: yup
        .object()
        .shape({
          label: yup.string().required('Target Type is required'),
          value: yup.string().required('Target Type is required'),
        })
        .required('Target Type is required'),
      targetValue: yup.number().required('Target Value is required'),
      recurringType: yup.string().required('Recurring Type is required'),
    });
  };

  let { id } = auth?.data?.userRecord;
  const _id = data?._id;
  const navigate = useNavigate();

  const handleSubmit = async (value: Record<string, any>) => {
    let payload = {
      organization: organization_id,
      fromDate: value.fromDate,
      toDate: value.toDate,
      targetType: value.targetType.label,
      targetValue: value.targetValue,
      allocatedUsers: value.users,
      isOneTimeOrRecurring: 'RECURRING',
      createdBy: id,
      recurringType: value.recurringType,
      id: _id,
    };
    setLoading(true);
    setDisabled(true);
    try {
      const response = await SalesTargetService.updateRecurring(payload);
      if (response.status === 200) {
        const path = generatePath(
          APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.pathName
        );
        navigate(path);
      }
    } catch (error) {
      console.error('ERROR', error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const formik = useFormik({
    validationSchema: ValidationSchema,
    onSubmit: handleSubmit,
    initialValues: formData,
    enableReinitialize: true,
  });

  console.log('formikformik', formik);
  const getUserData = async () => {
    await getUserListForAdmin(organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setUsers(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const TARGET_TYPE = [
    { label: 'QUANTITY', value: 'QUANTITY' },
    { label: 'VALUE', value: 'VALUE' },
    // { label: 'SALES COUNT', value: 'SALES COUNT' },
  ];

  const inputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e: any) => {
      e.preventDefault();
    };

    const inputElement: any = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        inputElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  useEffect(() => {
    getUserData();
    if (data) {
      setFormData({
        targetType: { label: data.targetType, value: data.targetType },
        allocatedUsers: data.allocatedUsers.map((user: any) => ({
          label: user.label,
          value: user.value,
        })),
        fromDate: parseInt(data.fromDate),
        toDate: parseInt(data.toDate),
        targetValue: data.targetValue,
        id: data._id,
        recurringType: data.recurringType,
      });
    }
  }, []);

  console.log(formik.values.fromDate, 'date123');

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography
                variant='h6'
                sx={{ fontWeight: '600', marginBottom: '20px' }}
              >
                Edit Recurring
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <CustomDivier />
      </ContainerBoxV2>
      <ContainerBoxV2>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: '10px' }}>
          <Grid container item xs={12} spacing={3}>
            <Grid container item xs={12} spacing={3}></Grid>
            {/* <Grid container item xs={12} spacing={1}></Grid> */}
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={3}>
                <Box sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Target Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <AutoComplete
                    options={TARGET_TYPE}
                    value={formik?.values?.targetType || null}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='targetType'
                        placeholder='Select targetType'
                        error={getError(formik, 'targetType')?.isTrue}
                        helperText={
                          getError(formik, 'targetType')?.isTrue &&
                          getError(formik, 'targetType')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue('targetType', selectedOption);
                    }}
                    fullWidth
                    // defaultValue={{label:"test", value: 'test'}}
                  />
                </Box>
              </Grid>
              <Grid container item xs={3}>
                <Box sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Users <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Autocomplete
                    multiple
                    id='tags-standard'
                    options={users}
                    limitTags={1}
                    defaultValue={[...data.allocatedUsers]}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='users'
                        placeholder='Select users'
                        error={getError(formik, 'users')?.isTrue}
                        helperText={
                          getError(formik, 'users')?.isTrue &&
                          getError(formik, 'users')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      console.log('selectedOption', selectedOption);
                      formik?.setFieldValue('users', selectedOption);
                    }}
                    size='small'
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid container item xs={3}>
                <Box sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Textfield
                    placeholder='dd-mm-yyyy'
                    type='date'
                    name='fromDate'
                    value={
                      formik.values.fromDate
                        ? new Date(formik.values.fromDate)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const milliseconds = Date.parse(e.target.value);
                      formik.setFieldValue(
                        'fromDate',
                        isNaN(milliseconds) ? '' : milliseconds
                      );
                    }}
                    error={getError(formik, 'fromDate')?.isTrue}
                    helperText={
                      getError(formik, 'fromDate')?.isTrue &&
                      getError(formik, 'fromDate')?.message
                    }
                    inputProps={{
                      max: formik.values.toDate
                        ? new Date(formik.values.toDate)
                            .toISOString()
                            .split('T')[0]
                        : null,
                    }}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid container item xs={3}>
                <Box sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Recurring Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <AutoComplete
                    options={TRIP_PLANNER_DATE_RECURRING_TYPES}
                    value={formik?.values?.recurringType || null}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='recurringType'
                        placeholder='Select recurring type'
                        error={getError(formik, 'recurringType')?.isTrue}
                        helperText={
                          getError(formik, 'recurringType')?.isTrue &&
                          getError(formik, 'recurringType')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue(
                        'recurringType',
                        selectedOption.value || ''
                      );
                    }}
                    fullWidth
                    // defaultValue={{label:"test", value: 'test'}}
                  />
                </Box>
              </Grid>
              <Grid container item xs={3}>
                <Box sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Recurring Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Textfield
                    placeholder='dd-mm-yyyy'
                    type='date'
                    name='toDate'
                    value={
                      formik.values.toDate
                        ? new Date(formik.values.toDate)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const milliseconds = Date.parse(e.target.value);
                      formik.setFieldValue(
                        'toDate',
                        isNaN(milliseconds) ? '' : milliseconds
                      );
                    }}
                    error={getError(formik, 'toDate')?.isTrue}
                    helperText={
                      getError(formik, 'toDate')?.isTrue &&
                      getError(formik, 'toDate')?.message
                    }
                    inputProps={{
                      min: formik.values.fromDate
                        ? new Date(formik.values.fromDate)
                            .toISOString()
                            .split('T')[0]
                        : null,
                    }}
                    onBlur={formik.handleBlur}
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid container item xs={3}>
                <Box sx={{ width: '100%' }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Target {_.capitalize(formik?.values?.targetType?.label)}{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Textfield
                    type='number'
                    name='targetValue'
                    value={formik.values.targetValue}
                    onChange={(e: any) => {
                      formik?.setFieldValue('targetValue', e?.target?.value);
                    }}
                    error={getError(formik, 'targetValue')?.isTrue}
                    helperText={
                      getError(formik, 'targetValue')?.isTrue &&
                      getError(formik, 'targetValue')?.message
                    }
                    onBlur={formik?.handleBlur}
                    fullWidth
                    inputRef={inputRef}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <ButtonV1
              type='submit'
              disabled={!formik.isValid || !formik.dirty || disabled}
              style={{
                height: 38,
                fontSize: 14,
                width: '10%',
                marginTop: '15px',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Update'
              )}
            </ButtonV1>
          </Grid>
        </form>
      </ContainerBoxV2>
    </>
  );
}

export default RecurringTargetEdit;

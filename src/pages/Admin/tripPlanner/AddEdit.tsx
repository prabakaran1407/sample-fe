import { useEffect, useState, useMemo } from 'react';
import { Box, Grid, InputLabel, Typography, Stack } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import {
  ACTION_ICON_TYPES,
  TRIP_PLANNER_TYPE,
  TRIP_PLANNER_DATE_RECURRING_TYPES,
} from '../../../data/AppConst';
import { Ipayload } from '../../../types/global.types';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  AutoComplete,
  ButtonV1,
  Textfield,
  ContainerBoxV2,
} from '../../../components/MUI/mui.index';
import { getUserListForAdmin } from '../../../components/com_components/CustomerSettingsAPI';
import {
  CustomDivier,
  MultiSelectTable,
} from '../../../components/APP/app.index';

// ************** Ag Grid
import CustomCellRenderValues from '../../../components/CustomCellAgGrid/CustomCellRenderValues';
import GetHeaderParams from '../../../components/CustomCellAgGrid/CustomHeaderValue';

// ************ services
import TripplanService from '../../../services/admin/tripplanner/tripplanner.service.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../data/AppRoutes.ts';
import { PropagateLoader } from 'react-spinners';
import { COLORS } from '../../../utils/globals.ts';
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

const validationSchema = (condition: any) =>
  yup.object({
    type: yup
      .object()
      .shape({
        label: yup.string().required('Type is required'),
        value: yup.string().required('Type is required'),
      })
      .required('Type is required'),
    user: yup
      .object()
      .shape({
        label: yup.string().required('User is required'),
        value: yup.string().required('User is required'),
      })
      .required('User is required'),
    planDate: yup.string().required('Date is required'),
    recurringType: yup
      .object()
      .shape({
        label: yup.string().required('Recurring type is required'),
        value: yup.string().required('Recurring type is required'),
      })
      .required('Recurring type is required'),
    recurringExpirDate: condition?.recurringExpDateIsRequired
      ? yup.string().required('Recurring end date is required')
      : yup.string().notRequired(),
  });

export default function AddEditTripPlanner(props: any) {
  const location = useLocation();
  const navigate = useNavigate();
  const AUTH = useAppSelector((state) => state?.auth);
  const { isAdd, isEdit, isView, id } = formActionType(props, location?.state);
  console.log('{ isAdd, isEdit, isView, id } >>>>>', {
    isAdd,
    isEdit,
    isView,
    id,
  });
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    type: null,
    user: null,
    planDate: null,
    recurringType: null,
    description: null,
    recurringExpirDate: null,
  });

  const [userData, setUserData] = useState<Record<string, any>[]>([]);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [recType, setRecType] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      if (selectedRow?.length === 0) {
        console.log('submit if block >>>>>>>>>>>');
        return;
      }
      setLoading(true);
      let payload = {
        type: value?.type?.value,
        users: [value?.user?.value],
        planDate: new Date(value?.planDate).getTime(),
        recurringType: value?.recurringType.value,
        recurringExpirDate: new Date(value?.recurringExpirDate).getTime(),
        description: value?.description,
      } as Ipayload | any;
      payload.planToVisit = selectedRow.map((m: any) => {
        if (m?.isSelected) {
          return {
            id: m?.id,
            isVisited: m?.isVisited != undefined ? m?.isVisited : false,
          };
        }
      });
      if (isEdit) {
        payload = {
          ...payload,
          updatedBy: AUTH?.data?.userRecord?.id,
        };
        console.log('EDIT else block >>>>>>>>>>>', payload);
        await TripplanService.update(payload, id);
        setLoading(false);
        navigate(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName);
      } else {
        payload = {
          ...payload,
          createdBy: AUTH?.data?.userRecord?.id,
          updatedBy: AUTH?.data?.userRecord?.id,
          organization_id: AUTH?.data?.userRecord?.organization_id,
        };
        await TripplanService.create(payload);
        setLoading(false);
        navigate(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName);
      }
    } catch (error: any) {
      console.log('error >>>>>>>', error);
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || '', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

  const formik = useFormik({
    validationSchema: validationSchema({
      recurringExpDateIsRequired: isEdit
        ? formvalue?.recurringType?.value !=
          TRIP_PLANNER_DATE_RECURRING_TYPES[0]?.value
        : recType?.value != TRIP_PLANNER_DATE_RECURRING_TYPES[0]?.value,
    }),
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });
  console.log('fomik values', formik?.values);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const getExistData = async () => {
    setLoading(true);
    const payload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };
    let existData = await TripplanService.getTripplanById(payload, id);
    existData = existData?.data?.response;
    setFormValue({
      type: {
        label:
          existData?.type === 'CUSTOMER'
            ? 'Customers'
            : existData?.type === 'GROUP'
            ? 'Group'
            : 'BillingParty',
        value: existData?.type,
      },
      user: {
        label: `${existData?.users[0]?.firstName} ${existData?.users[0]?.lastName}`,
        value: existData?.users[0]?.id,
      },
      planDate: new Date(existData?.planDate).toISOString().split('T')[0],
      recurringType: {
        label:
          existData?.recurringType === 'TODAY'
            ? 'Today'
            : existData?.recurringType === 'DAILY'
            ? 'Daily'
            : 'Weekly',
        value: existData?.recurringType,
      },
      description: null,
      recurringExpirDate: existData?.recurringExpirDate
        ? new Date(existData?.recurringExpirDate).toISOString().split('T')[0]
        : null,
    });
    setRecType(existData?.recurringType);
    setTableData(existData?.gcbList);
    setLoading(false);
  };

  const getTableDataByType = async () => {
    setSelectedRow([]);
    let payload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
      status: true,
      user: [formik?.values?.user?.value],
      type: formik?.values.type?.value,
    } as any;
    const res = await TripplanService.userMappeGroupWiseData(payload);
    setTableData(res?.data?.response || []);
  };

  const getUserData = async () => {
    try {
      const Payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      const response = await getUserListForAdmin(Payload?.organization_id);
      const categoriesOption = response?.data?.data?.map(
        ({ _id, firstName, lastName }: any) => {
          return {
            label: `${firstName} ${lastName}`,
            value: _id,
          };
        }
      );
      setUserData(categoriesOption);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    if (isEdit || isView) {
      getExistData();
    } else {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Add time only invoke this fn
    if (isAdd) {
      if (formik?.values?.type && formik?.values?.user) getTableDataByType();
    }
  }, [formik?.values?.type, formik?.values?.user]);

  const columnDefs = [
    {
      headerName: `${formik?.values?.type?.label} Name`,
      field: 'name',
      filter: true,
      cellStyle: { textTransform: 'capitalize' },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'name',
      },
      ...GetHeaderParams(),
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
      selected: true,
    },
  ];

  const MultiSelectTableComponent = useMemo(() => MultiSelectTable, []);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                {isAdd
                  ? 'Add New Trip Plan'
                  : isEdit
                  ? 'Edit Trip Plan'
                  : 'View Trip Plan'}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <ContainerBoxV2>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '65vh',
            }}
          >
            <PropagateLoader color={COLORS.primary} />
          </Box>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
                  >
                    User <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <AutoComplete
                    options={userData}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='user'
                        placeholder='Select user'
                        error={getError(formik, 'user')?.isTrue}
                        helperText={
                          getError(formik, 'user')?.isTrue &&
                          getError(formik, 'user')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.user || null}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue('user', selectedOption);
                    }}
                    disabled={isView || isEdit}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
                  >
                    Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <AutoComplete
                    options={TRIP_PLANNER_TYPE}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type='text'
                        name='type'
                        placeholder='Select type'
                        error={getError(formik, 'type')?.isTrue}
                        helperText={
                          getError(formik, 'type')?.isTrue &&
                          getError(formik, 'type')?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.type || null}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue('type', selectedOption);
                      // getCustomerData(selectedOption?.value);
                    }}
                    disabled={isView || isEdit || !formik?.values?.user}
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
                  >
                    Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Textfield
                    fullWidth
                    type='date'
                    name='planDate'
                    value={formik?.values?.planDate || ''}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    placeholder='Select date'
                    disabled={isView}
                    error={getError(formik, 'planDate')?.isTrue}
                    helperText={
                      getError(formik, 'planDate')?.isTrue &&
                      getError(formik, 'planDate')?.message
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
                  >
                    Recurring Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <AutoComplete
                    options={TRIP_PLANNER_DATE_RECURRING_TYPES}
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
                    value={formik?.values?.recurringType || null}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue('recurringType', selectedOption);
                      setRecType(selectedOption);
                      // setFormValue({
                      //   ...formvalue,
                      //   recurringType: selectedOption

                      // })
                    }}
                    disabled={isView || isEdit}
                  />
                </Box>
              </Grid>
              {(formik?.values?.recurringType?.value ===
                TRIP_PLANNER_DATE_RECURRING_TYPES[1]?.value ||
                formik?.values?.recurringType?.value ===
                  TRIP_PLANNER_DATE_RECURRING_TYPES[3]?.value ||
                formik?.values?.recurringType?.value ===
                  TRIP_PLANNER_DATE_RECURRING_TYPES[2]?.value) && (
                <Grid item xs={4}>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
                    >
                      Recurring End Date <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Textfield
                      fullWidth
                      type='date'
                      name='recurringExpirDate'
                      value={formik?.values?.recurringExpirDate || ''}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      placeholder='Select date'
                      disabled={isView}
                      error={getError(formik, 'recurringExpirDate')?.isTrue}
                      helperText={
                        getError(formik, 'recurringExpirDate')?.isTrue &&
                        getError(formik, 'recurringExpirDate')?.message
                      }
                    />
                  </Box>
                </Grid>
              )}
              {/* ************ AG GRID SEC */}
              {tableData?.length > 0 && !isView && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                  }}
                >
                  <Box
                    sx={{
                      height: '250px',
                      overflow: 'scroll',
                      width: '100%',
                    }}
                  >
                    <MultiSelectTableComponent
                      colDef={columnDefs}
                      tableData={tableData}
                      isMultiSelect={true}
                      selectedRow={(updatedTableData: any[]) => {
                        console.log(
                          'selectedRow >>>>>>>>>>>>>',
                          updatedTableData
                        );
                        setTableData(updatedTableData);
                        setSelectedRow(
                          updatedTableData?.filter((m) => m?.isSelected)
                        );
                      }}
                    />
                  </Box>
                  {/* {isEdit && (<Box
                      sx={{
                        height: '250px',
                        overflow: 'scroll',
                        width: '50%'

                      }}>
                      <MultiSelectTableComponent
                        colDef={columnDefs}
                        tableData={tableData}
                        isMultiSelect={true}
                        selectedRow={(updatedTableData: any[]) => {
                          console.log('selectedRow >>>>>>>>>>>>>', updatedTableData);
                          setTableData(updatedTableData);
                          setSelectedRow(updatedTableData?.filter(m => m?.isSelected))
                        }}
                      />
                    </Box>)} */}
                </Grid>
              )}

              {!isView && (
                <>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        position: 'sticky',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        py: 1,
                      }}
                    >
                      <ButtonV1
                        type='submit'
                        style={{ height: 38, fontSize: 14, width: '15%' }}
                        disabled={
                          formik.values.recurringType?.value !==
                            TRIP_PLANNER_DATE_RECURRING_TYPES[0].value &&
                          !formik.values.recurringExpirDate
                        }
                      >
                        {loading ? 'Loading...' : isAdd ? 'Submit' : 'Update'}
                      </ButtonV1>
                    </Box>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        )}
        {/* {isView ? <TripPlannerMap userId={"65d5a7b745e719078c4f458d"} /> : null} */}
      </ContainerBoxV2>
    </>
  );
}

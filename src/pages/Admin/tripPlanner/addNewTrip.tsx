import { useEffect, useState } from 'react';
import { Box, Grid, InputLabel } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import { ACTION_ICON_TYPES } from '../../../data/AppConst';
import { Ipayload, TNestedObj } from '../../../types/global.types';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  ActionModal,
  AutoComplete,
  ButtonV1,
  Textfield,
} from '../../../components/MUI/mui.index';
import groupSettingService from '../../../services/settings/group.setting.service';
import customerSettingService from '../../../services/settings/customer.setting.service';
import { getUserListForAdmin } from '../../../components/com_components/CustomerSettingsAPI';

interface IAddNewTripModal {
  actionType: string;
  data?: TNestedObj | Record<string, any>;
  handleClose?: (value?: any) => void;
  refresh: (value?: Record<string, any>) => void;
  open: boolean;
  render: number;
}

const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    id: data?._id,
  };
};

const validationSchema = yup.object({
  group: yup.object().required('Group is required.'),
  customer: yup.object().required('Customer is required.'),
  billingParty: yup.object().required('Billing party is required.'),
  user: yup.object().required('User is required.'),
  date: yup.string().required('Date is required.'),
  // recurringType: yup.string().required("Recurring type is required."),
  plannedAmount: yup.string().required('Planned amount is required.'),
});

export default function AddNewTrip(props: IAddNewTripModal) {
  let { open, handleClose, actionType, data, refresh, render } = props;

  const { isAdd, isEdit, isView } = formActionType({
    actionType,
    data,
  });
  const AUTH = useAppSelector((state) => state?.auth);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    group: null,
    customer: null,
    billingParty: null,
    user: null,
    date: null,
    recurringType: null,
    plannedAmount: null,
    description: null,
  });

  const [groupData, setGroupData] = useState<Record<string, any>[]>([]);
  const [customerData, setCustomerData] = useState<Record<string, any>[]>([]);
  const [billingData, setBillingData] = useState<Record<string, any>[]>([]);
  const [userData, setUserData] = useState<Record<string, any>[]>([]);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let payload = {
        group: value?.group?.value,
        customer: value?.customer?.value,
        billingParty: value?.billingParty?.value,
        user: value?.user?.value,
        date: value?.date,
        recurringType: value?.recurringType,
        plannedAmount: value?.plannedAmount,
        description: value?.description,
      } as Ipayload;
      console.log('payload of new trip', payload);
      if (isEdit) {
        payload = {
          ...payload,
          updatedBy: AUTH?.data?.userRecord?.id,
        };

        // await SettingService.productSettingUpdate(id, payload, query);
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

        // await SettingService.productSettingCreate(payload, query);
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
      group: { label: data?.group?.value, value: data?.group?.id },
      customer: { label: data?.customer?.value, value: data?.customer?._id },
      billingParty: {
        label: data?.billingParty?.value,
        value: data?.billingParty?._id,
      },
      user: { label: data?.user?.value, value: data?.user?._id },
      date: data?.date,
      recurringType: data?.recurringType,
      plannedAmount: data?.plannedAmount,
      description: data?.description,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({
      group: null,
      customer: null,
      billingParty: null,
      user: null,
      date: null,
      recurringType: null,
      plannedAmount: null,
      description: null,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  const getGroupData = async () => {
    try {
      const payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      const response = await groupSettingService.getAll(payload);
      const categoriesOption = response?.data?.data?.map(
        ({ id, groupName }: any) => {
          return {
            label: groupName,
            value: id,
          };
        }
      );

      if (response?.data?.status) {
        setGroupData(categoriesOption);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const getCustomerData = async (group: any) => {
    try {
      const Payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        groupId: group,
      };
      const response = await customerSettingService.getCustomerByGroup(Payload);
      const categoriesOption = response?.data?.data?.map(
        ({ customer_id, customerName }: any) => {
          return {
            label: customerName,
            value: customer_id,
          };
        }
      );
      setCustomerData(categoriesOption);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const getBillingPartyData = async (customerId: any) => {
    try {
      const Payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        customerId: customerId,
      };
      const response = await customerSettingService.getBillingPartyByCustomer(
        Payload
      );
      const categoriesOption = response?.data?.data?.map(
        ({ _id, billingPartyName }: any) => {
          return {
            label: billingPartyName,
            value: _id,
          };
        }
      );
      setBillingData(categoriesOption);
    } catch (error) {
      console.log('error : ', error);
    }
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
    getGroupData();
    getUserData();
  }, []);

  return (
    <ActionModal
      open={open}
      onClose={() => {
        ResetForm();
        handleClose && handleClose();
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? 'Add New Trip Plan'
          : actionType === ACTION_ICON_TYPES[1]
          ? 'Edit New Trip Plan'
          : 'View New Trip Plan'
      }>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 1,
        }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Group <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={groupData}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type='text'
                      name='group'
                      placeholder='Select group'
                      error={getError(formik, 'group')?.isTrue}
                      helperText={
                        getError(formik, 'group')?.isTrue &&
                        getError(formik, 'group')?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.group || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue('group', selectedOption);
                    getCustomerData(selectedOption?.value);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Customer <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={customerData}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type='text'
                      name='customer'
                      placeholder='Select customer'
                      error={getError(formik, 'customer')?.isTrue}
                      helperText={
                        getError(formik, 'customer')?.isTrue &&
                        getError(formik, 'customer')?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.customer || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue('customer', selectedOption);
                    getBillingPartyData(selectedOption?.value);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Billing Party <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={billingData}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type='text'
                      name='billingParty'
                      placeholder='Select billing party'
                      error={getError(formik, 'billingParty')?.isTrue}
                      helperText={
                        getError(formik, 'billingParty')?.isTrue &&
                        getError(formik, 'billingParty')?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.billingParty || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue('billingParty', selectedOption);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
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
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Date <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type='date'
                  name='date'
                  value={formik?.values?.date || ''}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder='Select date'
                  disabled={isView}
                  error={getError(formik, 'date')?.isTrue}
                  helperText={
                    getError(formik, 'date')?.isTrue &&
                    getError(formik, 'date')?.message
                  }
                />
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}>
                  Recurring Type <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={[]}
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
                  Planned Amount <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type='text'
                  name='plannedAmount'
                  value={formik?.values?.plannedAmount || ''}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder='Enter planned amount'
                  disabled={isView}
                  error={getError(formik, 'plannedAmount')?.isTrue}
                  helperText={
                    getError(formik, 'plannedAmount')?.isTrue &&
                    getError(formik, 'plannedAmount')?.message
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
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
                />
              </Box>
            </Grid>

            {!isView && (
              <>
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
                      type='submit'
                      style={{ height: 38, fontSize: 14, width: '15%' }}>
                      {isAdd ? 'Submit' : 'Update'}
                    </ButtonV1>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </Box>
    </ActionModal>
  );
}

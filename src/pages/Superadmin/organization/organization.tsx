/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

// *************** MUI ***************
import {
  Grid,
  Typography,
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  // Autocomplete,
  MenuItem,
  InputLabel,
  Autocomplete,
} from '@mui/material';

// ************* APP Components
import { CustomDivier } from '../../../components/APP/app.index';

// ************* MUI Components
import {
  ContainerBoxV2,
  ActionItems,
  ActionIconButton,
  ActionConfirmation,
  PillTab,
} from '../../../components/MUI/mui.index';

import AgDataGrid from '../../../components/AG-GRID/DataGrid/AgDataGrid.tsx';

// *********** const
import { APP_ROUTES } from '../../../data/AppRoutes';
import {
  AUM_FORM_ACTION_TYPES,
  ACTION_ICON_TYPES,
} from '../../../data/AppConst';
import GetHeaderParams from '../../../components/CustomCellAgGrid/CustomHeaderValue';
import CustomCellRenderValues from '../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx';
import requestdemoService from '../../../services/requestdemoservice/requestdemo.service';
// import { AutoComplete } from "../../../components/MUI/mui.index";
// ********** Temp data
import { ColDef } from '@ag-grid-community/core/dist/esm/es6/entities/colDef';

// *********** Service
import OrganizationService from '../../../services/super-admin/organization/organization.service.ts';
import { PropagateLoader } from 'react-spinners';
import { COLORS } from '../../../utils/globals.ts';
import _ from 'lodash';

import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Add } from '@mui/icons-material';
import { TNestedObj } from '../../../types/global.types.ts';
import { toast } from 'react-toastify';

import ActiveIcon from '@mui/icons-material/CheckCircleRounded';
// import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from '@mui/icons-material/Block';
import { enqueueSnackbar } from 'notistack';
import CountryStateCity from '../../../services/admin/CountryStateCity/CountryStateCity.service.ts';
interface ApiResponse {
  _id: any;
  id: string;
  name: string;
}
const validationSchema = Yup.object().shape({
  organizationName: Yup.string()
    .required('Organization Name is required')
    .matches(/\S/, 'Organization Name cannot consist of only spaces'),
  contactPerson: Yup.string()
    .required('Contact Person is required')
    .matches(/\S/, 'Contact Person cannot consist of only spaces'),

  emailAddress: Yup.string()
    .lowercase('Uppercase letters are not allowed')
    .strict()
    .email('Email must be valid')
    .lowercase('Uppercase letters are not allowed')

    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Email must have a .com domain'),
  contactNumber: Yup.string()
    .required('Contact Number is required')
    .min(10, 'Invalid Contact Number')
    .max(10, 'Invalid Contact Number')
    .matches(/^[0-9]+$/, 'Contact Number must only contain numbers'),
  password: Yup.string()
    .required('Password is required')
    .matches(/\S/, 'Password cannot consist of only spaces'),

  organizationType: Yup.string()
    .required('Organization Type is required')
    .matches(/\S/, 'Organization Type cannot consist of only spaces'),
    country: Yup.string()
    .required('Country is required')
    .matches(/\S/, 'Country cannot consist of only spaces'),
  gstNumber: Yup.string()
    .required('GST Number is required')
    .matches(/\S/, 'GST Number cannot consist of only spaces'),
  address: Yup.string()
    .required('Address is required')
    .matches(/\S/, 'Address cannot consist of only spaces'),
  noOfUsers: Yup.string()
    .required(' Number of users is required')
    .min(1, 'Invalid Number of users ')
    .max(10, 'Invalid Number of users ')
    .matches(/^[0-9]+$/, ' Number of users must only contain numbers'),
});

const validationSchemaForEdit = Yup.object().shape({
  organizationName: Yup.string()
    .required('Organization name is required')
    .matches(/\S/, 'Organization name cannot consist of only spaces'),
  contactPerson: Yup.string()
    .required('Contact person is required')
    .matches(/\S/, 'Contact person cannot consist of only spaces'),
  emailAddress: Yup.string()
    .email('Invalid email')
    .required('Email address is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      'Email address must contain the full stop symbol (.)'
    ),

  contactNumber: Yup.string()
    .required('Contact number is required')
    .min(10, 'Invalid contact number')
    .max(10, 'Invalid contact number')
    .matches(/^[0-9]+$/, 'Contact number must only contain numbers'),

  organizationType: Yup.string()
    .required('Organization type is required')
    .matches(/\S/, 'Organization type cannot consist of only spaces'),
  country: Yup.string()
    .required('Country is required')
    .matches(/\S/, 'Country cannot consist of only spaces'),
  gstNumber: Yup.string()
    .required('GST number is required')
    .matches(/\S/, 'GST number cannot consist of only spaces'),
  address: Yup.string()
    .required('Address is required')
    .matches(/\S/, 'Address cannot consist of only spaces'),
  noOfUsers: Yup.string()
    .required(' Number of users is required')
    .min(1, 'Invalid number of users ')
    .max(10, 'Invalid number of users ')
    .matches(/^[0-9]+$/, ' Number of users must only contain numbers'),
});

function Organization() {
  const navigate = useNavigate();
  const [tableData, setTableDate] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [_isModalOpen, _setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [_isEditModalOpen, _setEditModalOpen] = useState(false);
  const [_selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Billing Modal
  const [_penBillingModal, _setOpenBillingModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      organizationName: '',
      contactPerson: '',
      emailAddress: '',
      contactNumber: '',
      password: '',
      gstNumber: '',
      address: '',
      noOfUsers: '',
      organizationType: '',
      organizationValue: '',
      country:"",
      countryValue:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log('Form submitted with values:', values);
    },
  });
  // const initialValues = {
  //   organizationName: "",
  //   contactPerson: "",
  //   emailAddress: "",
  //   contactNumber: "",
  //   password: "",
  //   organizationType: "",
  //   gstNumber: "",
  //   address: "",
  //   noOfUsers: "",
  // };
  // const { handleChange, handleBlur, handleSubmit, values, touched, isValid } = formik;

  const [rowItem, setRowItem] = useState<TNestedObj | any>({});
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const [loadingButton, setLoadingButton] = useState(false);

  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  const handleEdit = (rowItem: any) => {
    setSelectedUserId(rowItem?._id);
    setIsEdit(true);
    formik.setValues({
      organizationName: rowItem?.organizationName,
      contactPerson: rowItem?.contactPerson,
      emailAddress: rowItem?.emailAddress,
      contactNumber: rowItem?.contactNumber,
      gstNumber: rowItem?.gstNumber,
      address: rowItem?.address,
      noOfUsers: rowItem?.noOfUsers,
      organizationType: rowItem?.organizationType?._id,
      organizationValue: rowItem?.organizationType[0]?.name,
      country: rowItem?.country,
      countryValue: rowItem?.countryValue?.name,
      password: '',
    });
    openModal();
  };

  const handleBilling = (data: any) => {
    setRowItem(data);
    setSelectedUserId(data?._id);
    // handleOpenBilling();
    navigate(APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.pathName, {
      state: { data },
    });
  };

  const openModal = () => {
    _setModalOpen(true);
  };

  const closeModal = () => {
    _setModalOpen(false);
    setIsEdit(false);
    formik.setValues({
      organizationName: '',
      contactPerson: '',
      emailAddress: '',
      contactNumber: '',
      password: '',
      gstNumber: '',
      address: '',
      noOfUsers: '',
      organizationType: '',
      organizationValue: '',
      country:"",
      countryValue:"",
    });
    formik.resetForm();
  };

  const handleView = (rowItem: Record<string, any>) => {
    navigate(APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.VIEW?.pathName, {
      state: {
        userId: rowItem?._id,
        actionType: AUM_FORM_ACTION_TYPES[2],
        data: rowItem,
      },
    });
  };

  const handleDelete = (value: TNestedObj) => {
    setRowItem(value);
    if (activatedTab === 0) {
      setOpenConfirmation({
        open: true,
        title: 'Deactive: Organization',
        message: `Are you sure you want to deactivate this organization?`,
      });
    } else {
      setOpenConfirmation({
        open: true,
        title: 'Activate: Organization',
        message: `Are you sure you want to activate this organization?`,
      });
    }
  };

  const deactivate = async () => {
    try {
      let payload = {
        status: false,
        organizationName: rowItem?.organizationName,
        contactNumber: rowItem?.contactNumber,
        emailAddress: rowItem?.emailAddress
      };
      await OrganizationService.updateOrganization(rowItem?._id, payload);
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
      getAllOrganizations();
    } catch (error: any) {
      error = error.response;
      toast.error(error?.data?.message || '', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const handleActivate = (value: TNestedObj) => {
    setRowItem(value);
    setOpenConfirmation({
      open: true,
      title: 'Activate: Organization',
      message: `Are you sure you want to activate this organization?`,
    });
  };

  const activate = async () => {
    try {
      let payload = {
        status: true,
        organizationName: rowItem?.organizationName,
        contactNumber: rowItem?.contactNumber,
        emailAddress: rowItem?.emailAddress
      };
      await OrganizationService.updateOrganization(rowItem?._id, payload);
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
      getAllOrganizations();
    } catch (error: any) {
      error = error.response;
      toast.error(error?.data?.message || '', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const handleFormSubmit = async (
    values: Record<string, any>,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setLoadingButton(true);
      const { organizationType } = formik.values;
      const { country } = formik.values;
      let payloadData = {
        ...values,
        organizationType: organizationType,
        country: country,

      };

      if (isEdit) {
        if (_selectedUserId !== null) {
          await OrganizationService.updateOrganization(
            _selectedUserId,
            payloadData
          );

          setLoading(false);
          setLoadingButton(false);
        } else {
          console.error('Organization ID is null during edit.');
        }
      } else {
        await OrganizationService.createOrganization(payloadData);

        setLoadingButton(false);
      }

      navigate(APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.pathName);
      closeModal();
      setLoadingButton(false);

      getAllOrganizations();
      formik.resetForm();
    } catch (error: any) {
      enqueueSnackbar(
        `${
          error?.response?.data.message
            ? error?.response?.data.message
            : 'Invalid Username or Password'
        }`,
        // 'Invalid Username or Password',

        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        }
      );
      // setLoading(false);
      setLoadingButton(false);
    } finally {
      setSubmitting(false);
    }
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Organization Name',
      field: 'organizationName',
      filter: true,
      width: 400,
      cellStyle: { textTransform: 'capitalize' },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'organizationName',
      },
      suppressMovable: true,
      ...GetHeaderParams(),
    },
    {
      headerName: 'Organization Type',
      field: 'organizationName',
      filter: true,
      width: 400,
      cellStyle: { textTransform: 'capitalize' },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'organizationType.name',
      },
      suppressMovable: true,
      ...GetHeaderParams(),
    },
    {
      headerName: 'Contact Person ',
      field: 'contactPerson',
      filter: true,
      width: 400,
      cellStyle: { textTransform: 'capitalize' },
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'contactPerson',
      },
      suppressMovable: true,
      ...GetHeaderParams(),
    },
    {
      headerName: 'Contact Number',
      field: 'contactNumber',
      filter: true,
      width: 400,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'contactNumber',
      },
      suppressMovable: true,
      ...GetHeaderParams(),
    },
    {
      headerName: 'Email Address',
      field: 'emailAddress',
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'emailAddress',
      },
      suppressMovable: true,
      ...GetHeaderParams(),
    },
    {
      headerName: 'Actions',
      field: '',
      width: 400,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
          can_bill: activatedTab === 0 ? true : false,
          can_activate: activatedTab === 0 ? false : true,
          can_delete: activatedTab === 0 ? true : false,
          can_edit: activatedTab === 0 ? true : false,
        },
        enableActions: ACTION_ICON_TYPES,
        handleEdit: handleEdit,
        handleView: handleView,
        handleBilling: handleBilling,
        handleDelete: handleDelete,
        handleActivate: handleActivate,
      },
      ...GetHeaderParams({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }),
    },
  ];

  const [filterOptions, setFilterOptions] = useState<any>({
    organizationLabel: '',
    organizationValue: '',
  });
  const [organizationOptions, setOrganizationOptions] = useState<any[]>([]);

  const getAllOrganizations = async () => {
    setLoading(true);
    try {
      const payload = {
        status: isActive,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        organization:
          filterOptions?.organizationValue === ''
            ? ''
            : filterOptions?.organizationValue,
      };
      const listData = await OrganizationService.getAllOrganizations(payload);
      setTableDate(listData?.data?.data.length > 0 ? listData?.data?.data : []);
      setTotalData(listData?.data?.total);

      // if (listData && listData.data && Array.isArray(listData.data.data)) {
      //   const orgOptions = listData.data.data.map(
      //     (item: { organizationName: any; id: any }) => ({
      //       label: item.organizationName,
      //       value: item.id,
      //     })
      //   );
      //   setOrganizationOptions(orgOptions);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const [organizationTypeOptions, setOrganizationTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getIndustryType = async () => {
    try {
      const response = await requestdemoService.getIndustryType();
      if (!response) {
        throw new Error('No data received');
      }
      const responseData: any = response;
      const transformedOptions = responseData?.data?.data?.map(
        (option: ApiResponse) => ({
          label: option.name,
          value: option.id,
        })
      );
      setOrganizationTypeOptions(transformedOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllOrganizationsForDropDown = async () => {
    try {
      const response =
        await OrganizationService.getAllOrganizationsForDropDown();
      if (!response) {
        throw new Error('No data received');
      }

      setOrganizationOptions(response?.data?.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };

  const TABS = useMemo(
    () => [
      {
        label: 'Active Organization',
        icon: <ActiveIcon />,
        // onClick: () => handleTabSelect(0),
      },
      {
        label: 'Deactive Organization',
        icon: <BlockIcon />,
        // onClick: () => handleTabSelect(1),
      },
    ],
    []
  );

  console.log(formik.isValid, 'formik');
  useEffect(() => {
    formik.setValues({
      organizationName: '',
      contactPerson: '',
      emailAddress: '',
      contactNumber: '',
      password: '',
      gstNumber: '',
      address: '',
      noOfUsers: '',
      organizationType: '',
      organizationValue: '',
      country:"",
      countryValue:"",
    });
  }, []);

  // countries

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await CountryStateCity.getAllCountries();
        const countryOptions = response?.data?.data?.map(
          (option: ApiResponse) => ({
            label: option.name,
            value: option._id,
          })
        );
        setCountries(countryOptions);
      } catch (error) {
        console.log('Error fetching countries:', error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    getAllOrganizations();
    getIndustryType();
    getAllOrganizationsForDropDown();
  }, [page, pageSize, activatedTab, filterOptions]);

  console.log(formik.values,"formik.values.organizationType");
  
  return (
    <>
      {/* <MyComponent /> */}
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack
              direction='row'
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                Organization Details
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Autocomplete
                  value={filterOptions?.organizationLabel || null}
                  onChange={(_event, newValue) =>
                    setFilterOptions({
                      ...filterOptions,
                      organizationLabel:
                        newValue === null ? '' : newValue?.label,
                      organizationValue:
                        newValue === null ? '' : newValue?.value,
                    })
                  }
                  options={organizationOptions}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      size='small'
                      label='Organization Name'
                      variant='outlined'
                    />
                  )}
                  sx={{ width: 200 }}
                />
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
                    getAllOrganizations();
                  }}
                />

                <Button
                  variant='contained'
                  onClick={() => {
                    setIsEdit(false);
                    openModal();
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
      <CustomDivier />
      <ContainerBoxV2>
        <PillTab
          tabMenus={TABS}
          selectedTab={handleTabSelect}
          value={activatedTab}
        />
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '65vh',
              width: '100%',
            }}
          >
            <PropagateLoader color={COLORS.primary} />
          </Box>
        ) : (
          <AgDataGrid
            rowData={tableData}
            columnDefs={columnDefs}
            TableHeight={50}
            rowHeight={50}
            handleCellClick={undefined}
            loading={false}
            disableClickSelectionRenderers={false}
            noDataTxt='No Records Found'
            pageSize={pageSize}
            totalDataCount={totalData}
            serverRowSize={pageSize}
            currentPage={page}
            serverSidePagination={true}
            serverPageCount={Math.ceil(totalData / pageSize)}
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
      </ContainerBoxV2>

      {/* Add/Edit Modal */}
      <Dialog
        open={_isModalOpen}
        onClose={(_event, reason) => {
          if (reason !== 'backdropClick') {
            closeModal();
          }
        }}
        sx={{ '& .MuiDialog-paper': { maxWidth: '60%' } }}
      >
        {' '}
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          {isEdit ? 'Edit Organization' : 'Add Organization'}
        </DialogTitle>
        <CustomDivier />
        <Formik
          initialValues={formik.values}
          validationSchema={isEdit ? validationSchemaForEdit : validationSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize={true}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Organization Name{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='organizationName'
                        name='organizationName'
                        placeholder='Enter organization name'
                        fullWidth
                        value={values.organizationName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.organizationName &&
                          Boolean(formik.errors.organizationName)
                        }
                        helperText={
                          formik.touched.organizationName &&
                          formik.errors.organizationName
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Organization Type{' '}
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='organizationType'
                        name='organizationType'
                        placeholder='Select organization type'
                        fullWidth
                        select
                        value={formik.values.organizationType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.organizationType &&
                          Boolean(formik.errors.organizationType)
                        }
                        helperText={
                          formik.touched.organizationType &&
                          formik.errors.organizationType
                        }
                        size='small'
                      >
                        {organizationTypeOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Country <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='country'
                        name='country'
                        placeholder='Select organization type'
                        fullWidth
                        select
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.country &&
                          Boolean(formik.errors.country)
                        }
                        helperText={
                          formik.touched.country &&
                          formik.errors.country
                        }
                        size='small'
                      >
                        {countries.map((option:any) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Contact Person <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='contactPerson'
                        name='contactPerson'
                        fullWidth
                        placeholder='Enter contact person'
                        value={formik.values.contactPerson}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.contactPerson &&
                          Boolean(formik.errors.contactPerson)
                        }
                        helperText={
                          formik.touched.contactPerson &&
                          formik.errors.contactPerson
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Email Address <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='emailAddress'
                        name='emailAddress'
                        placeholder='Enter email address'
                        fullWidth
                        value={formik.values.emailAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.emailAddress &&
                          Boolean(formik.errors.emailAddress)
                        }
                        helperText={
                          formik.touched.emailAddress &&
                          formik.errors.emailAddress
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Contact Number
                        <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='contactNumber'
                        name='contactNumber'
                        label=''
                        fullWidth
                        placeholder='Enter contact number'
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.contactNumber &&
                          Boolean(formik.errors.contactNumber)
                        }
                        helperText={
                          formik.touched.contactNumber &&
                          formik.errors.contactNumber
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>

                  {!isEdit && (
                    <Grid item xs={4}>
                      <Box>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#181C32',
                          }}
                        >
                          Password <span style={{ color: 'red' }}>*</span>
                        </InputLabel>
                        <TextField
                          id='password'
                          name='password'
                          placeholder='Enter password'
                          fullWidth
                          type='password'
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.password &&
                            Boolean(formik.errors.password)
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          size='small'
                        />
                      </Box>
                    </Grid>
                  )}
                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        GST Number <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='gstNumber'
                        name='gstNumber'
                        label=''
                        placeholder='Enter GST Number'
                        fullWidth
                        value={formik.values.gstNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.gstNumber &&
                          Boolean(formik.errors.gstNumber)
                        }
                        helperText={
                          formik.touched.gstNumber && formik.errors.gstNumber
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        Address <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='address'
                        name='address'
                        placeholder='Enter Address'
                        fullWidth
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                        helperText={
                          formik.touched.address && formik.errors.address
                        }
                        size='small'
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#181C32',
                        }}
                      >
                        No of users <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <TextField
                        id='noOfUsers'
                        name='noOfUsers'
                        placeholder='Enter number of users'
                        fullWidth
                        value={formik.values.noOfUsers}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.noOfUsers &&
                          Boolean(formik.errors.noOfUsers)
                        }
                        helperText={
                          formik.touched.noOfUsers && formik.errors.noOfUsers
                        }
                        size='small'
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
                        mt: 1,
                      }}
                    >
                      <Button
                        variant='outlined'
                        sx={{ height: 38, width: '15%', mx: 2 }}
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                      {!isEdit ? (
                        <LoadingButton
                          variant='contained'
                          type='submit'
                          style={{ height: 38, width: '15%' }}
                          loading={loadingButton}
                          disabled={loading || !formik.isValid}
                        >
                          Save
                        </LoadingButton>
                      ) : (
                        <LoadingButton
                          variant='contained'
                          type='submit'
                          style={{ height: 38, width: '15%' }}
                          loading={loadingButton}
                          // disabled={loading || !formik.isValid}
                        >
                          Update
                        </LoadingButton>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Dialog>

      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          activatedTab === 0 ? deactivate() : activate();
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

export default Organization;

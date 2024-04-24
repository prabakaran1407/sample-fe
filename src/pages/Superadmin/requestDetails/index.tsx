/** @format */

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

// *************** MUI ***************
import {
  Grid,
  Typography,
  Stack,
  Box,
  Button,
  IconButton,
  InputLabel,
  Modal,
  Avatar,
  TextField,
  Autocomplete,
  Tooltip,
} from '@mui/material';
import { FiberManualRecord, LaunchRounded } from '@mui/icons-material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LoadingButton from '@mui/lab/LoadingButton';

// ************* APP Components
import { CustomDivier } from '../../../components/APP/app.index';
import _ from 'lodash';

// ************* MUI Components
import {
  ContainerBoxV2,
  ActionItems,
  // FileUpload,
  Textfield,
  ActionIconButton,
} from '../../../components/MUI/mui.index';

import AgDataGrid from '../../../components/AG-GRID/DataGrid/AgDataGrid.tsx';
import GetHeaderParams from '../../../components/CustomCellAgGrid/CustomHeaderValue';
import CustomCellRenderValues from '../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx';

// *********** const
import {
  ACTION_ICON_TYPES,
  // PaymentService,
  MODULE_TYPES,
  ContactStatus,
  AUM_FORM_ACTION_TYPES,
} from '../../../data/AppConst';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { APP_ROUTES } from '../../../data/AppRoutes.ts';

// ********** Temp data
import { ColDef } from '@ag-grid-community/core/dist/esm/es6/entities/colDef';
import StatusCellRenderer from './statusCellRenderer.tsx';

// *********** Service
import RequestDemoDetails from '../../../services/requestDetails/requestDetail.service.ts';
import ModuleService from '../../../services/super-admin/modulesservice.ts';
import { PropagateLoader } from 'react-spinners';
import { COLORS } from '../../../utils/globals.ts';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function RequestDetails() {
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth);
  const [tableData, setTableDate] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [_selectedUserId, setSelectedUserId] = useState('');
  const [singleData, setSingleData] = useState<any>([]);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [showApproval, setShowApproval] = useState(false);
  const [moduleOption, setModuleOption] = useState<any>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [_btnDisable, setBtnDisable] = useState(true);

  const [contactStatus, setContactStatus] = useState({ label: '', id: '' });

  const [remarks, setRemarks] = useState('');
  const [scheduledDate, setScheduledDate] = useState<any>('');
  const [scheduledTime, setScheduledTime] = useState<any>('');
  const [followUpDate, setFollowUpDate] = useState<any>('');
  const [followUpTime, setFollowUpTime] = useState<any>('');
  // const [subscriptionPlan, setSubscriptionPlan] = useState({
  //   label: "",
  //   id: "",
  // });
  // const [startDate, setStartDate] = useState<any>("");
  // const [endDate, setEndDate] = useState<any>("");
  console.log('singleData', singleData);
  const [gstNo, setGstNo] = useState('');
  const [noOfUsers, setNoOfUsers] = useState('');
  const [_serviceData, setServiceData] = useState([]);
  // const [fileUploadRes, setFileUploadRes] = useState<any>("");

  const handleUpdateReq = async (rowItem: Record<string, any>) => {
    setSelectedUserId(rowItem?._id);
    setSingleData(rowItem);
    setShowApproval(true);
    if (rowItem?.contactStatusData && rowItem.contactStatusData.length > 0) {
      let latestStatus: any =
        rowItem.contactStatusData[rowItem.contactStatusData.length - 1];
      setContactStatus({
        id: latestStatus.contactStatus,
        label: latestStatus.contactStatus,
      });
    }
    if (rowItem?.scheduledDate !== '') {
      let date: any = new Date(parseInt(rowItem?.scheduledDate))
        .toISOString()
        .split('T')[0];
      setScheduledDate(date);
    }
    if (rowItem?.scheduledTime !== '') {
      setScheduledTime(rowItem?.scheduledTime);
    }
    if (rowItem?.followUpDate !== '') {
      let date: any = new Date(parseInt(rowItem?.followUpDate))
        .toISOString()
        .split('T')[0];
      setFollowUpDate(date);
    }
    if (rowItem?.followUpTime !== '') {
      setFollowUpTime(rowItem?.followUpTime);
    }
    // if (rowItem?.billingData && rowItem?.billingData[0]?.billingType !== "") {
    //   setSubscriptionPlan({
    //     id: rowItem?.billingData[0].billingType,
    //     label: rowItem?.billingData[0].billingType,
    //   });
    // }
    // if (rowItem?.billingData && rowItem?.billingData[0].serviceStartDate) {
    //   let date: any = new Date(rowItem?.billingData[0].serviceStartDate)
    //     .toISOString()
    //     .split("T")[0];
    //   setStartDate(date);
    // }
    // if (rowItem?.billingData && rowItem?.billingData[0].serviceEndDate) {
    //   let date: any = new Date(parseInt(rowItem?.billingData[0].serviceEndDate))
    //     .toISOString()
    //     .split("T")[0];
    //   setEndDate(date);
    // }
    if (
      rowItem?.organizationData &&
      rowItem?.organizationData[0]?.gstNumber !== ''
    ) {
      setGstNo(rowItem?.organizationData[0]?.gstNumber);
    }
    if (
      rowItem?.organizationData &&
      rowItem?.organizationData[0]?.noOfUsers !== ''
    ) {
      setNoOfUsers(rowItem?.organizationData[0]?.noOfUsers);
    }
  };

  const getAllMOdules = async () => {
    try {
      let modulePayload = {
        moduleType: MODULE_TYPES[0],
        condtion: {
          status: true,
        },
      };

      let getServices = await ModuleService.getModules(modulePayload);
      getServices = getServices?.data?.response;
      setModuleOption(
        getServices?.data?.map((m: Record<string, any>) => ({
          label: m?.moduleName,
          value: m?._id,
        })) || []
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (contactStatus.label === 'Completed') {
      getAllMOdules();
    }
  }, [contactStatus.label]);

  useEffect(() => {
    if (
      moduleOption.length > 0 &&
      singleData?.billingData &&
      singleData?.billingData[0]?.services
    ) {
      let billingServices = singleData?.billingData[0]?.services.map(
        (serviceId: any) =>
          moduleOption.find((option: any) => option.value === serviceId)
      );
      setServiceData(billingServices);
    }
  }, [moduleOption, singleData]);

  // const handleFileUpload = (res: Record<any, any>) => {
  //   setFileUploadRes(res?.imagePath);
  // };

  const handleUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const [sortedData, setSortedData] = useState([]);
  const statusAndRemarks: any = [
    ...(singleData?.contactStatusData || []),
    ...(singleData?.remarksData || []),
  ];

  statusAndRemarks.sort((a: any, b: any) => {
    const dateA: any = a?.createdAt ? new Date(a.createdAt) : 0;
    const dateB: any = b?.createdAt ? new Date(b.createdAt) : 0;
    const sort = dateA - dateB;
    return sort;
  });

  useEffect(() => {
    setSortedData(statusAndRemarks);
  }, [singleData]);

  const getLatestStatus = () => {
    const latestStatusItem: any =
      singleData?.contactStatusData[singleData?.contactStatusData?.length - 1];
    return latestStatusItem ? latestStatusItem?.contactStatus : '';
  };

  function dateFormatter(timestamp: any) {
    const date = new Date(parseInt(timestamp));

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function timeFormatter(time24Hrs: any) {
    const [hours, minutes] = time24Hrs.split(':');
    const time12Hrs = new Date(0, 0, 0, hours, minutes);
    // Use toLocaleString to format the time in 12-hour format
    const formattedTime = time12Hrs.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedTime;
  }

  const columnDefs: ColDef[] = [
    {
      headerName: 'Organization Name',
      field: 'organizationName',
      filter: true,
      width: 500,
      cellStyle: { textTransform: 'capitalize' },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'organizationName',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Contact Person ',
      field: 'contactPerson',
      filter: true,
      width: 500,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'contactPerson',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Contact No',
      field: 'contactNo',
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'contactNo',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Email Address',
      field: 'email',
      filter: true,
      width: 500,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'email',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Status',
      field: 'requestDemoStatus',
      cellRenderer: StatusCellRenderer,
      width: 400,
      suppressMovable: true,
      ...GetHeaderParams({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }),
    },
    {
      headerName: 'Actions',
      field: '',
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          canUpdateReq: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleUpdateReq: handleUpdateReq,
      },
      width: 300,
      suppressMovable: true,
      ...GetHeaderParams({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }),
    },
  ];

  const handleOrg = () => {
    navigate(APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.VIEW?.pathName, {
      state: {
        userId: singleData?.organizationData[0]?._id,
        actionType: AUM_FORM_ACTION_TYPES[2],
        data: singleData?.organizationData[0],
        isFromRequestDetails: true,
        org: singleData?.organizationType?.name,
      },
    });
  };

  // const handleBilling = () => {
  //   navigate(APP_ROUTES?.SUPER_ADMIN?.BILLING?.CREATE, {
  //     state: {
  //       userId: singleData?.billingData[0]?._id,
  //       actionType: AUM_FORM_ACTION_TYPES[2],
  //       data: singleData?.billingData[0],
  //     },
  //   });
  // };

  const [filterOptions, setFilterOptions] = useState<any>({
    statusLabel: '',
    statusValue: '',
  });
  const [statusOptions, setStatusOptions] = useState<any[]>([]);

  const getAllRequest = async () => {
    try {
      const payload = {
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        contactStatus: filterOptions.statusValue,
      };
      const listData = await RequestDemoDetails.getAllRequestDetails(payload);
      setTableDate(listData?.data?.data.length > 0 ? listData?.data?.data : []);
      setTotalData(listData?.data?.total);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = (_event: any, newValue: any) => {
    setFilterOptions({
      ...filterOptions,
      statusLabel: newValue === null ? '' : newValue.label,
      statusValue: newValue === null ? '' : newValue.value,
    });
  };
  const getAllResponse = async () => {
    if (Array.isArray(ContactStatus)) {
      const orgOptions = ContactStatus.map((item) => ({
        label: item.label,
        value: item.value,
      }));
      setStatusOptions(orgOptions);
    }
  };
  useEffect(() => {
    getAllResponse();
    getAllRequest();
  }, [filterOptions]);

  useEffect(() => {
    getAllRequest();
  }, [page, pageSize]);

  const clearAll = () => {
    setContactStatus({ label: '', id: '' });
    // setSubscriptionPlan({ label: "", id: "" });
    // setFileUploadRes("");
    // setStartDate("");
    // setEndDate("");
    // setServiceData([]);
    setGstNo('');
    setNoOfUsers('');
    setScheduledDate('');
    setScheduledTime('');
    setFollowUpDate('');
    setFollowUpTime('');
    setRemarks('');
  };

  const updateRequest = async () => {
    // const startTimeStamp = startDate ? new Date(startDate).getTime() : "";
    setUpdateLoading(true);
    // const endTimeStamp = endDate ? new Date(endDate).getTime() : "";
    const scheduledDateTimeStamp = scheduledDate
      ? new Date(scheduledDate).getTime()
      : '';
    const scheduledTimeTimeStamp = scheduledTime ? scheduledTime : '';
    const followUpDateTimeStamp = followUpDate
      ? new Date(followUpDate).getTime()
      : '';
    const followUpTimeTimeStamp = followUpTime ? followUpTime : '';

    const payload =
      contactStatus.label === 'Completed'
        ? {
            ...singleData,
            contactStatus: contactStatus.label,
            requestStatus: contactStatus.label,
            remarks: remarks,
            // paymentStatus: subscriptionPlan.label,
            // serviceStartDate: startTimeStamp,
            // serviceEndDate: endTimeStamp,
            gstNumber: gstNo,
            noOfUsers: noOfUsers,
            // permission_list: _.map(serviceData, "value"),
            // invoiceCopy: fileUploadRes,
          }
        : contactStatus.label === 'Follow Up'
        ? {
            ...singleData,
            contactStatus: contactStatus.label,
            requestStatus: contactStatus.label,
            remarks: remarks,
            followUpDate: followUpDateTimeStamp.toString(),
            followUpTime: followUpTimeTimeStamp.toString(),
          }
        : contactStatus.label === 'Scheduled'
        ? {
            ...singleData,
            contactStatus: contactStatus.label,
            requestStatus: contactStatus.label,
            remarks: remarks,
            scheduledDate: scheduledDateTimeStamp.toString(),
            scheduledTime: scheduledTimeTimeStamp.toString(),
          }
        : {
            ...singleData,
            contactStatus: contactStatus.label,
            requestStatus: contactStatus.label,
            remarks: remarks,
          };
    try {
      console.log('payload of request', payload);

      await RequestDemoDetails.updateRequestData(_selectedUserId, payload);
      setUpdateLoading(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong.Please try again!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      setUpdateLoading(false);
    }
    handleUpdateModal();
    setShowApproval(false);
    clearAll();
    getAllRequest();
  };
  const validationSchema = Yup.object({
    // subscriptionPlan: Yup.string().required("Subscription plan is Required"),
    // ModuleService: Yup.string().required("Modules &Services required"),
    // startDate: Yup.date().required("Start Date is required"),
    // endDate: Yup.date().required("End Date is required"),
    gstNo: Yup.string().required('GSTIN is required'),
    noOfUsers: Yup.number().required('Number of Users required'),
  });
  const MyForm = useFormik({
    initialValues: {
      // subscriptionPlan: "",
      // ModuleService: "",
      // startDate: "",
      // endDate: "",
      gstNo: '',
      noOfUsers: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form Values', values);
    },
    enableReinitialize: true,
  });
  const areShownFieldsFilled = (contactStatus: String) => {
    let isEnableButton = false;
    if (
      contactStatus === 'Contacted' ||
      contactStatus === 'Dropped' ||
      contactStatus === 'Not Reachable'
    ) {
      isEnableButton = true;
    }

    if (contactStatus === 'Scheduled') {
      if (scheduledDate !== '' && scheduledTime !== '') {
        isEnableButton = true;
      }
    }

    if (contactStatus === 'Follow Up') {
      if (followUpDate !== '' && followUpTime !== '') {
        isEnableButton = true;
      }
    }
    console.log('GSTIN:', gstNo);
    console.log('Number of Users:', noOfUsers);
    if (contactStatus === 'Completed') {
      // Check if gstNo and noOfUsers are defined and not empty
      if (
        gstNo !== undefined &&
        gstNo !== '' &&
        noOfUsers !== undefined &&
        noOfUsers !== ''
      ) {
        isEnableButton = true;
      }
    }
    console.log('Button Enabled:', isEnableButton);

    // return (
    //   startDate !== '' &&
    //   endDate !== '' &&
    //   serviceData.length > 0 &&
    //   gstNo !== '' &&
    //   noOfUsers !== ''
    // );
    return isEnableButton;
  };

  return (
    <>
      {!showApproval ? (
        <>
          <ContainerBoxV2>
            <Grid container xs={12}>
              <Grid xs={12}>
                <Stack direction="row" justifyContent={'space-between'}>
                  <Typography variant="h6" sx={{ fontWeight: '600' }}>
                    Request Details
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Autocomplete
                      value={
                        statusOptions.find(
                          (option) => option.value === filterOptions.statusValue
                        ) || null
                      }
                      onChange={handleStatusChange}
                      options={statusOptions}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          size="small"
                          label="Users"
                          variant="outlined"
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
                        getAllRequest();
                      }}
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </ContainerBoxV2>
          <CustomDivier />
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
            <ContainerBoxV2>
              <AgDataGrid
                rowData={tableData}
                columnDefs={columnDefs}
                TableHeight={58}
                rowHeight={50}
                handleCellClick={undefined}
                loading={false}
                disableClickSelectionRenderers={false}
                noDataTxt="No Records Found"
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
            </ContainerBoxV2>
          )}
        </>
      ) : (
        <>
          <ContainerBoxV2>
            <Grid container xs={12}>
              <Grid xs={12}>
                <Stack
                  direction="row"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <IconButton
                    sx={{
                      width: '2rem',
                      height: '1.7rem',
                      border: '1px solid #ccc',
                      borderRadius: 0.6,
                      marginRight: '1rem',
                    }}
                    onClick={() => {
                      setShowApproval(false);
                      clearAll();
                    }}
                  >
                    <ArrowBackRoundedIcon
                      style={{ color: '#333', fontSize: '22px' }}
                    />
                  </IconButton>

                  <Typography sx={{ fontSize: 18, fontWeight: '600' }}>
                    Request Details
                    <span
                      className="text-xl font-light text-[#2C2B2B]"
                      style={{ fontSize: 22, fontWeight: '300' }}
                    >
                      {' '}
                      |{' '}
                    </span>{' '}
                    {singleData?.organizationName}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </ContainerBoxV2>
          <CustomDivier />
          <Grid container xs={12}>
            <Grid container xs={12} justifyContent="space-between">
              <Grid item xs={12} md={7.9}>
                <Box
                  sx={{
                    height: '72vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    '::-webkit-scrollbar': {
                      width: '0.4em',
                    },
                    '::-webkit-scrollbar-thumb': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Box p={2}>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Contact Person :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography sx={{ fontSize: 14 }}>
                          {singleData?.contactPerson}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Contact Number :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography sx={{ fontSize: 14 }}>
                          {singleData?.contactNo}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Email :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography sx={{ fontSize: 14 }}>
                          {singleData?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Organization Type :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography sx={{ fontSize: 14 }}>
                          {singleData?.organizationType.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Address :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography sx={{ fontSize: 14 }}>
                          {singleData?.address}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Notes :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography sx={{ fontSize: 14 }}>
                          {singleData?.notes ? singleData?.notes : '---'}
                        </Typography>
                      </Grid>
                    </Grid>
                    {getLatestStatus() === 'Scheduled' && (
                      <>
                        <Grid container xs={12} pb={3}>
                          <Grid item xs={7} md={3}>
                            <Typography
                              sx={{ fontSize: 14, fontWeight: '600' }}
                            >
                              Scheduled Date :
                            </Typography>
                          </Grid>
                          <Grid item xs={5} md={9}>
                            <Typography sx={{ fontSize: 14 }}>
                              {singleData?.scheduledDate
                                ? dateFormatter(singleData?.scheduledDate)
                                : '---'}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container xs={12} pb={3}>
                          <Grid item xs={7} md={3}>
                            <Typography
                              sx={{ fontSize: 14, fontWeight: '600' }}
                            >
                              Scheduled Time :
                            </Typography>
                          </Grid>
                          <Grid item xs={5} md={9}>
                            <Typography sx={{ fontSize: 14 }}>
                              {singleData?.scheduledTime
                                ? timeFormatter(singleData?.scheduledTime)
                                : '---'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                    {getLatestStatus() === 'Follow Up' && (
                      <>
                        <Grid container xs={12} pb={3}>
                          <Grid item xs={7} md={3}>
                            <Typography
                              sx={{ fontSize: 14, fontWeight: '600' }}
                            >
                              Follow Up Date :
                            </Typography>
                          </Grid>
                          <Grid item xs={5} md={9}>
                            <Typography sx={{ fontSize: 14 }}>
                              {singleData?.followUpDate
                                ? dateFormatter(singleData?.followUpDate)
                                : '---'}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container xs={12} pb={3}>
                          <Grid item xs={7} md={3}>
                            <Typography
                              sx={{ fontSize: 14, fontWeight: '600' }}
                            >
                              Follow Up Time :
                            </Typography>
                          </Grid>
                          <Grid item xs={5} md={9}>
                            <Typography sx={{ fontSize: 14 }}>
                              {singleData?.followUpTime
                                ? timeFormatter(singleData?.followUpTime)
                                : '---'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                          Current Status :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Box
                          sx={{
                            color:
                              getLatestStatus() === 'OPEN'
                                ? '#FF69B4'
                                : getLatestStatus() === 'Contacted'
                                ? '#3498db'
                                : getLatestStatus() === 'Scheduled'
                                ? '#f39c12'
                                : getLatestStatus() === 'Dropped'
                                ? '#e74c3c'
                                : getLatestStatus() === 'Follow Up'
                                ? '#9b59b6'
                                : getLatestStatus() === 'Not Reachable'
                                ? '#95a5a6'
                                : getLatestStatus() === 'Completed'
                                ? '#27ae60'
                                : '',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <FiberManualRecord sx={{ fontSize: 16 }} />
                          <Typography
                            sx={{
                              fontWeight: '700',
                              fontSize: 14,
                            }}
                            pl={1}
                          >
                            {getLatestStatus()}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <CustomDivier />
                  <Box p={2}>
                    <Typography sx={{ fontSize: 16, fontWeight: '600' }}>
                      Remarks & Activity
                    </Typography>
                    <Box py={1}>
                      {sortedData?.map((item: any) => (
                        <Box
                          py={1}
                          key={`${item.createdAt}`}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Avatar sx={{ mr: 2, width: 30, height: 30 }} />
                          <Tooltip
                            title={`Date: ${new Date(
                              item.createdAt
                            ).toLocaleDateString()},Time: ${new Date(
                              item.createdAt
                            ).toLocaleTimeString()}`}
                          >
                            <Typography sx={{ fontSize: 15 }}>
                              {item?.contactStatus
                                ? item?.contactStatus === 'OPEN'
                                  ? `${singleData?.contactPerson} opened this request. `
                                  : item?.contactStatus === 'Scheduled'
                                  ? `${user.data.userRecord?.firstName}  ${
                                      user.data.userRecord?.lastName
                                    } changed the status to ${item?.contactStatus?.toLowerCase()} and made an appointment at ${timeFormatter(
                                      item.scheduledTime
                                    )} on ${dateFormatter(
                                      item.scheduledDate
                                    )}. `
                                  : item?.contactStatus === 'Follow Up'
                                  ? `${user.data.userRecord?.firstName}  ${
                                      user.data.userRecord?.lastName
                                    } changed the status to ${item?.contactStatus?.toLowerCase()} and scheduled a follow-up appointment at ${timeFormatter(
                                      item.followUpTime
                                    )} on ${dateFormatter(item.followUpDate)}. `
                                  : `${user.data.userRecord?.firstName}  ${
                                      user.data.userRecord?.lastName
                                    } changed the status to ${item?.contactStatus?.toLowerCase()}. `
                                : item?.remarks
                                ? `${user.data.userRecord?.firstName}  ${user.data.userRecord?.lastName} added a remark : ${item?.remarks}. `
                                : null}
                              <span
                                style={{
                                  fontSize: 13,
                                  fontWeight: '500',
                                  color: '#969696',
                                }}
                              >
                                {formatDistanceToNow(new Date(item.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </Typography>
                          </Tooltip>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Box style={{ borderRight: '3px solid whitesmoke' }} />
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    height: '60vh',
                    overflowY: 'auto',
                  }}
                  p={2}
                >
                  <Grid container xs={12}>
                    <Grid item xs={12}>
                      <Box pb={2}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#000',
                          }}
                        >
                          Contact Status{' '}
                          <span style={{ color: 'red', fontSize: '20px' }}>
                            *
                          </span>
                        </InputLabel>
                        {/* <AutoComplete_V2
                          placeholder="Select the contact status"
                          defaultValue={contactStatus}
                          handleChange={(e: any) => {
                            setContactStatus(e.value);
                          }}
                          options={ContactStatus}
                        /> */}
                        <Autocomplete
                          disablePortal
                          options={ContactStatus}
                          value={contactStatus}
                          getOptionLabel={(category: any) => {
                            return category?.label || '';
                          }}
                          onChange={(_event: any, value: any) => {
                            setContactStatus({
                              ...contactStatus,
                              label: value?.label,
                              id: value?.label,
                            });
                          }}
                          readOnly={
                            getLatestStatus() === 'Completed' ? true : false
                          }
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              size="small"
                              placeholder="Select the contact status"
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    {contactStatus.label === 'Scheduled' && (
                      <>
                        <Grid item xs={12}>
                          <Box pb={2}>
                            <InputLabel
                              shrink
                              sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#000',
                              }}
                            >
                              Scheduled Date{' '}
                              <span style={{ color: 'red', fontSize: '20px' }}>
                                *
                              </span>
                            </InputLabel>
                            <Textfield
                              fullWidth
                              type="date"
                              placeholder="Select scheduled date"
                              value={scheduledDate}
                              onChange={(event: any) => {
                                setScheduledDate(event.target.value);
                                setFollowUpDate('');
                                setFollowUpTime('');
                              }}
                              sx={{
                                background: '#fff',
                                borderRadius: 1,
                              }}
                              inputProps={{
                                min: new Date().toISOString().split('T')[0],
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box pb={2}>
                            <InputLabel
                              shrink
                              sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#000',
                              }}
                            >
                              Scheduled Time{' '}
                              <span style={{ color: 'red', fontSize: '20px' }}>
                                *
                              </span>
                            </InputLabel>
                            <Textfield
                              fullWidth
                              type="time"
                              placeholder="Select scheduled time"
                              value={scheduledTime}
                              onChange={(event: any) => {
                                setScheduledTime(event.target.value);
                              }}
                              sx={{
                                background: '#fff',
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                        </Grid>
                      </>
                    )}

                    {contactStatus.label === 'Follow Up' && (
                      <>
                        <Grid item xs={12}>
                          <Box pb={2}>
                            <InputLabel
                              shrink
                              sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#000',
                              }}
                            >
                              Follow Up Date{' '}
                              <span style={{ color: 'red', fontSize: '20px' }}>
                                *
                              </span>
                            </InputLabel>
                            <Textfield
                              fullWidth
                              type="date"
                              placeholder="Select follow up date"
                              value={followUpDate}
                              onChange={(event: any) => {
                                setFollowUpDate(event.target.value);
                              }}
                              sx={{
                                background: '#fff',
                                borderRadius: 1,
                              }}
                              inputProps={{
                                min: new Date().toISOString().split('T')[0],
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box pb={2}>
                            <InputLabel
                              shrink
                              sx={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#000',
                              }}
                            >
                              Follow Up Time{' '}
                              <span style={{ color: 'red', fontSize: '20px' }}>
                                *
                              </span>
                            </InputLabel>
                            <Textfield
                              fullWidth
                              type="time"
                              placeholder="Select follow up time"
                              value={followUpTime}
                              onChange={(event: any) => {
                                setFollowUpTime(event.target.value);
                                setScheduledDate('');
                                setScheduledTime('');
                              }}
                              sx={{
                                background: '#fff',
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                        </Grid>
                      </>
                    )}

                    {contactStatus.label === 'Completed' &&
                      singleData.isRequestCompleted === false && (
                        <>
                          {/* {singleData.isRequestCompleted === false ? ( */}
                          <>
                            <Grid item xs={12}>
                              <Box pb={2}>
                                <InputLabel
                                  shrink
                                  sx={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#000',
                                  }}
                                >
                                  GSTIN{' '}
                                  <span
                                    style={{
                                      color: 'red',
                                      fontSize: '20px',
                                    }}
                                  >
                                    *
                                  </span>
                                </InputLabel>
                                <Textfield
                                  fullWidth
                                  type="text"
                                  placeholder="Enter the GSTIN"
                                  value={gstNo}
                                  id="gstNo"
                                  onBlur={() =>
                                    MyForm.setFieldTouched('gstNo', true)
                                  }
                                  name="gstNo"
                                  onChange={(e) => {
                                    setGstNo(e.target.value.toUpperCase());
                                    MyForm.setFieldValue(
                                      'gstNo',
                                      e.target.value.toUpperCase()
                                    );
                                    MyForm.setFieldTouched('gstNo', true); // Manually mark field as touched on change
                                  }}
                                  sx={{
                                    background: '#fff',
                                    borderRadius: 1,
                                  }}
                                  inputProps={{
                                    readOnly:
                                      getLatestStatus() === 'Completed'
                                        ? true
                                        : false,
                                  }}
                                />
                                {MyForm.touched.gstNo && MyForm.errors.gstNo ? (
                                  <div style={{ color: 'red', fontSize: 14 }}>
                                    {MyForm.errors.gstNo}
                                  </div>
                                ) : null}
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <Box pb={2}>
                                <InputLabel
                                  shrink
                                  sx={{
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    color: '#000',
                                  }}
                                >
                                  Number of Users{' '}
                                  <span
                                    style={{
                                      color: 'red',
                                      fontSize: '20px',
                                    }}
                                  >
                                    *
                                  </span>
                                </InputLabel>
                                <Textfield
                                  fullWidth
                                  type="number"
                                  value={noOfUsers}
                                  onBlur={() =>
                                    MyForm.setFieldTouched('noOfUsers', true)
                                  }
                                  onChange={(e) => {
                                    setNoOfUsers(e.target.value);
                                    MyForm.setFieldValue(
                                      'noOfUsers',
                                      e.target.value
                                    );
                                    MyForm.setFieldTouched('noOfUsers', true);
                                  }}
                                  placeholder="Enter the number of users"
                                  sx={{
                                    background: '#fff',
                                    borderRadius: 1,
                                  }}
                                  inputProps={{
                                    readOnly:
                                      getLatestStatus() === 'Completed'
                                        ? true
                                        : false,
                                  }}
                                />
                                {MyForm.touched.noOfUsers &&
                                MyForm.errors.noOfUsers ? (
                                  <div style={{ color: 'red', fontSize: 14 }}>
                                    {MyForm.errors.noOfUsers}
                                  </div>
                                ) : null}
                              </Box>
                            </Grid>
                          </>
                          {/* // ) : null} */}
                        </>
                      )}

                    {getLatestStatus() !== 'Completed' &&
                      singleData.isRequestCompleted === false && (
                        <>
                          <Grid item xs={12}>
                            <Box pb={2}>
                              <InputLabel
                                shrink
                                sx={{
                                  fontSize: '18px',
                                  fontWeight: '600',
                                  color: '#000',
                                }}
                              >
                                Remarks
                              </InputLabel>
                              <Textfield
                                fullWidth
                                type="test"
                                placeholder="Enter your remarks"
                                onChange={(e) => setRemarks(e.target.value)}
                                sx={{
                                  background: '#fff',
                                  borderRadius: 1,
                                }}
                              />
                            </Box>
                          </Grid>
                        </>
                      )}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    height: '12vh',
                    overflowY: 'hidden',
                    display: 'flex',
                    alignItems: 'end',
                  }}
                  p={2}
                >
                  {getLatestStatus() === 'Completed' ? (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          fontSize: 14,
                          fontWeight: '600',
                          width: '100%',
                          height: 38,
                        }}
                        onClick={handleOrg}
                      >
                        <LaunchRounded
                          sx={{ color: '#fff', fontSize: 18, mr: 1 }}
                        />
                        View Organization
                      </Button>
                      {/* <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          fontSize: 12,
                          fontWeight: "600",
                          width: "48%",
                        }}
                        onClick={handleBilling}
                      >
                        <LaunchRounded
                          sx={{ color: "#fff", fontSize: 18, mr: 1 }}
                        />
                        Billing
                      </Button> */}
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        fontSize: 14,
                        fontWeight: '600',
                        width: '100%',
                        height: 38,
                      }}
                      onClick={() => {
                        setIsUpdateModalOpen(true);
                      }}
                      disabled={!areShownFieldsFilled(contactStatus?.label)}
                    >
                      Update
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Update Request Modal */}

          <Modal open={isUpdateModalOpen} onClose={handleUpdateModal}>
            <Box
              sx={{
                position: 'absolute',
                width: 350,
                bgcolor: 'background.paper',
                borderRadius: '8px',
                boxShadow: 24,
                p: 3,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: '600' }}>
                Update Request
              </Typography>
              <Typography
                id="signout-modal-title"
                variant="h6"
                component="div"
                sx={{ textAlign: 'center', fontSize: 15 }}
              >
                Are you sure you want to update this request?
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  justifyContent: 'space-evenly',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <Button
                  onClick={handleUpdateModal}
                  variant="outlined"
                  sx={{
                    height: 38,
                    width: '45%',
                    fontSize: 16,
                    border: `1px solid ${COLORS.primary}`,
                    color: COLORS.primary,
                    '&:hover': {
                      border: `1px solid ${COLORS.secondary}`,
                      color: COLORS.secondary,
                    },
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  onClick={updateRequest}
                  variant="contained"
                  loading={updateLoading}
                  sx={{
                    height: 38,
                    width: '45%',
                    fontSize: 16,
                    background: COLORS.primary,
                    '&:hover': {
                      background: COLORS.secondary,
                      color: 'white',
                    },
                  }}
                >
                  Update
                </LoadingButton>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}

export default RequestDetails;

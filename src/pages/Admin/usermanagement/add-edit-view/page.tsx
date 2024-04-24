/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
"use client";
import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import _ from "lodash";
import { toast } from "react-toastify";
// ************* MUI Components
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Tooltip,
  // IconButton,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
// Components ******************
import {
  Textfield,
  AutoComplete,
  ButtonV1,
  ContainerBoxV2,
  ToggleSwitch,
  Button_v2,
  ActionIconButton,
  MyDrawer,
  InfoIcon as IconInfo,
} from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";

// **************** Service
import AUMService from "../../../../services/admin/UserManagemet.service";
import { formSchema } from "../../../../data/yup/admin/addedit-usermanagement";
import SettingService from "../../../../services/settings/settings.service";

// ************ costant data ***********
import {
  AUM_FORM_ACTION_TYPES,
  API_DATE_FORMAT,
  DAYS_OF_WEEK,
  // CUSTOMER_OR_BILLINGPARTY,
} from "../../../../data/AppConst";
import LocalStorage from "../../../../libs/localStorage.service";
import { APP_ROUTES } from "../../../../data/AppRoutes";
import { useAppSelector } from "../../../../hooks";
import { GET_CONST_FROM_AUTH } from "../../../../utils";
import { formatedDate } from "../../../../utils/datetime";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../utils/globals";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  ACCORDIAN_DATA,
  SIGN_IN,
  LOGIN_PLATFROMS,
} from "../../../../data/AppConst";
import React from "react";
import SelectLocation from "../../../SettingMenus/Features/Customer/Settings/CustomerDetail/SetLocation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CountryStateCity from "../../../../services/admin/CountryStateCity/CountryStateCity.service.ts";
import AssignedServiceForUser from "./view-user-services";

interface ToggleStates {
  [key: string]: boolean;
}

function prospValue(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    isAdd: locationState?.actionType === AUM_FORM_ACTION_TYPES[0],
    isEdit: locationState?.actionType === AUM_FORM_ACTION_TYPES[1],
    isView: locationState?.actionType === AUM_FORM_ACTION_TYPES[2],
    id: locationState?.userId,
  };
}
function AddEditViewUserManagement(props: any) {
  const AUTH = useAppSelector((state) => state?.auth);
  console.log(AUTH, "auth");

  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  const location = useLocation();
  let { isAdd, isEdit, isView, id } = prospValue(props, location?.state);
  console.log("{ isAdd, isEdit, isView, id }", { isAdd, isEdit, isView, id });
  const navigate = useNavigate();
  //   const router = useRouter();
  const [formData, setFormData] = useState<Record<string, unknown | any>>({
    firstName: "",
    lastName: "",
    emailAddress: "",
    mobile: "",
    password: "",
    state: null,
    headquarters: null,
    embCode: "",
    designation: null,
    role: null,
    department: null,
    status: true,
    appVersion: null,
    lastSeenAt: null,
    batteryLevel: null,
    deviceId: null,
    lastLogin: null,
    isMobileLogin: false,
    customer_or_billingparty: "customer",
    attendanceType: "",
    location: null,
    Visit_PurposeOfVisit: "",
    Visit_TypeOfVisit: "",
    Visit_MultipleImage: "",
    Visit_VoiceRecord: "",
    sales_ordertype: "",
    sales_defaultlogtype: "",
    sales_deliverylocation: "",
    sales_deliverydate: "",
    claim_fuel_reimbursement_by_tracking: "",
    general_customer_or_billingparty: "",

    tracking_autoattendance: false,
    startTime: "",
    endTime: "",
    time_interval: 30000,
    days: [],
  });
  console.log("formLocation", formData?.location);
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${formik?.values?.location?.lat},${formik?.values?.location?.lng}`;
    window.open(url, "_blank");
  };

  const [department, setDepartment] = useState<Record<string, any>[]>([]);
  const [_category, setCategory] = useState<Record<string, any>[]>([]);
  const [_hqData, _setHqData] = useState<Record<string, any>[]>([]);
  const [roles, setRoles] = useState<Record<string, any>[]>([]);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [localstorageData, setLocalStorageData] = useState<Record<string, any>>(
    {}
  );
  const [designation, setDesignation] = useState<Record<string, any>[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState<ToggleStates>({});
  console.log("toggleStates", toggleStates);
  const [attendanceType, setAttendanceType] = useState("default_location");
  console.log("useratteradio", attendanceType);
  const [isShowMap, setIsShowMap] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [userServices, setUserService] = useState<Record<string, any>[]>([]);
  const handleAttendanceTypeChange = (event: any) => {
    setAttendanceType(event.target.value);
  };
  console.log("togglestatesvalue", toggleStates);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      setSpinner(true);
      const isEmailExist = tableData.some((user) => {
        if (isEdit && user.id === id) {
          return false;
        }
        return user.emailAddress === value.emailAddress;
      });

      if (isEmailExist) {
        formik.setErrors({ emailAddress: "Email already exists" });
        setSpinner(false);
        return;
      }
      const cloneFormData = _.cloneDeep(value);
      console.log("cloneFormData", cloneFormData);
      let localStoreData = LocalStorage.parseObj(localstorageData);
      console.log("localStorageData", localStoreData);
      let payloadData = {
        ...toggleStates,
        ...cloneFormData,
        state: cloneFormData?.state?.value || null,
        headquarters: cloneFormData?.headquarters?.value || null,
        designation: cloneFormData?.designation?.value || null,
        role: cloneFormData?.role?.value || null,
        department: cloneFormData?.department?.value || null,
        status: cloneFormData?.status,
        customer_or_billingparty:
          toggleStates?.general_customer_or_billingparty === true
            ? "billingparty"
            : "customer",
        attendanceType: attendanceType,
        organization_id: localStoreData?.organization_id || null,
        isMobileLogin: cloneFormData?.isMobileLogin,

        //User tracking
        tracking_autoattendance:
          cloneFormData?.tracking_autoattendance || false,
        startTime: cloneFormData?.startTime || "",
        endTime: cloneFormData?.endTime || "",
        time_interval: cloneFormData?.time_interval || 30000,
        days: cloneFormData?.days || [],

        userRestrictionData: {
          visit_purposeofvisit: toggleStates?.visit_purposeofvisit,
          visit_typeofvisit: toggleStates?.visit_typeofvisit,
          visit_multipleimage: toggleStates?.visit_multipleimage,
          visit_voicerecord: toggleStates?.visit_voicerecord,
          visit_auto_voicerecord: toggleStates?.visit_auto_voicerecord,
          sales_ordertype: toggleStates?.sales_ordertype,
          sales_defaultlogtype: toggleStates?.sales_defaultlogtype,
          sales_deliverylocation: toggleStates?.sales_deliverylocation,
          sales_deliverydate: toggleStates?.sales_deliverydate,
          claim_fuel_reimbursement_by_tracking:
            toggleStates?.claim_fuel_reimbursement_by_tracking,
          general_customer_or_billingparty:
            toggleStates?.general_customer_or_billingparty,

          is_location_tracking: toggleStates?.is_location_tracking,
          login_platform: toggleStates?.login_platform
            ? toggleStates?.login_platform
            : null,
          is_attendance_not_required:
            toggleStates?.is_attendance_not_required != undefined
              ? toggleStates?.is_attendance_not_required
              : false,
        },
      };
      console.log("check payload", payloadData);

      payloadData = JSON.parse(JSON.stringify(payloadData));

      if (isEdit) {
        let _user: Record<string, any> = await AUMService.updateUser(
          id,
          payloadData
        );
        console.log("updated", _user);
      } else {
        let user: Record<string, any> = await AUMService.createUser(
          payloadData
        );
        user = user?.data;
        if (user?.status) {
          // toast.success(user?.message, {
          //   className: "toast-success",
          // });
          setSpinner(false);
        } else {
          setSpinner(false);
          return toast.error(user?.message, {
            className: "toast-error",
          });
        }
      }
      // Return to list page
      navigate(APP_ROUTES?.ADMIN?.USERMANAGEMENT?.pathName);
    } catch (e) {
      console.log("error", e);
      toast.error(
        "Something went wrong while adding the user. Please try again after some time",
        {
          className: "toast-error",
        }
      );
    }
    setSpinner(false);
  };

  const formik = useFormik({
    validationSchema: formSchema({ isView, isEdit }),
    onSubmit: handleSubmit,
    initialValues: formData,
    enableReinitialize: isEdit || isView,
  });

  console.log("formik1234", formik);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const getInitialData = async () => {
    try {
      const payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: true,
      };
      let query = `?setting_sub_type=${CONSTANT_DATA.SETTING_SUB_TYPES[2]}`;
      let departmentData: any = await SettingService.list(payload, query);
      departmentData = departmentData?.data?.response?.data?.data;
      console.log("departmentData >>>>>>", departmentData);
      departmentData =
        departmentData?.length > 0
          ? departmentData.map((m: Record<string, unknown>) => ({
              label: m?.name,
              value: m?._id,
            }))
          : [];
      setDepartment([...departmentData]);
      console.log("departmentData", departmentData);
      let designationPayload = {
        matchObj: {
          isActive: true,
          settingsType: CONSTANT_DATA.SETTING_TYPES[1],
          subTypes: CONSTANT_DATA.SETTING_SUB_TYPES[1],
        },
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let designationData: any = await SettingService.list(designationPayload);
      designationData = designationData?.data?.response?.data?.data;
      designationData =
        designationData?.length > 0
          ? designationData.map((m: Record<string, unknown>) => ({
              label: m?.value,
              value: m?._id,
            }))
          : [];
      setDesignation(designationData);

      let categoryData: any = await AUMService.getCategory(
        `&isSubCategory=false`
      );
      categoryData = categoryData?.data;
      categoryData =
        categoryData?.length > 0
          ? categoryData.map((m: Record<string, unknown>) => ({
              label: m?.name,
              value: m?.id,
            }))
          : [];
      setCategory([...categoryData]);
      console.log("categoryData", categoryData);
      let rolesData: any = await AUMService.getRoles();
      console.log("rolesData", rolesData);
      rolesData = rolesData?.data?.data;
      rolesData =
        rolesData?.modules?.length > 0
          ? rolesData?.modules.map((m: Record<string, unknown>) => ({
              label: m?.role,
              value: m?._id,
            }))
          : [];
      rolesData = rolesData.filter(
        (ft: Record<string, unknown>) => ft?.label != "super_admin"
      );
      setRoles([...rolesData]);
    } catch (e) {
      console.log("error", e);
    }
  };

  // const getHQData = async () => {
  //   try {
  //     let hq: any = await AUMService.getCategory(
  //       `&isSubCategory=true&parentCategory=${formik?.values.state?.value}`
  //     );
  //     console.log('hq data', hq);
  //     hq = hq?.data;
  //     hq =
  //       hq?.length > 0
  //         ? hq?.map((m: Record<string, unknown>) => ({
  //             label: m?.name,
  //             value: m?.id,
  //           }))
  //         : [];
  //     setHqData(hq);
  //     console.log('hq >>>>>>>>>>>>>>>', hq);
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };
  // ******************** Initial data
  useEffect(() => {
    getInitialData();
    setLocalStorageData(
      LocalStorage.parseObj(LocalStorage.getItem("userData") || "{}")
    );
  }, []);

  // ************** Get head quaters data
  // useEffect(() => {
  //   if (formik?.values?.state) {
  //     getHQData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [formik?.values?.state]);

  // *********************** | Edit flow| **************

  const getUserData = async () => {
    setSpinner(true);
    let userData: any = await AUMService.getOneUser(id as string);

    userData = userData?.data;
    console.log("userData >>>>>>", userData);
    setFormData({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      emailAddress: userData?.emailAddress,
      mobile: userData?.mobile,
      state: userData?.state
        ? {
            label: userData?.state?.name,
            value: userData?.state?.id,
          }
        : null,
      headquarters: userData?.headquarters
        ? {
            label: userData?.headquarters?.name,
            value: userData?.headquarters?.id,
          }
        : null,
      embCode: userData?.embCode,
      designation: userData?.designation
        ? {
            label: userData?.designation?.value,
            value: userData?.designation?.id,
          }
        : null,
      role: userData?.role
        ? { label: userData?.role?.role, value: userData?.role?.id }
        : null,
      department: userData?.department
        ? {
            label: userData?.department?.name,
            value: userData?.department?.id,
          }
        : null,
      status: userData?.status,
      batteryLevel: userData?.batteryLevel,
      appVersion: userData?.appVersion,
      lastSeenAt: userData?.lastSeenAt,
      deviceId: userData?.deviceId,
      lastLogin: userData?.lastLogin,
      isMobileLogin: userData?.isMobileLogin,
      customer_or_billingparty: userData?.customer_or_billingparty,
      attendanceType: attendanceType,
      location: userData?.location,

      //User tracking
      tracking_autoattendance: userData?.tracking_autoattendance || false,
      startTime: userData?.startTime || "",
      endTime: userData?.endTime || "",
      time_interval: userData?.time_interval || 30000,
      days: userData?.days || [],

      userRestrictionData: {
        visit_purposeofvisit: toggleStates?.visit_purposeofvisit,
        visit_typeofvisit: toggleStates?.visit_typeofvisit,
        visit_multipleimage: toggleStates?.visit_multipleimage,
        visit_voicerecord: toggleStates?.visit_voicerecord,
        visit_auto_voicerecord: toggleStates?.visit_auto_voicerecord,
        sales_ordertype: toggleStates?.sales_ordertype,
        sales_defaultlogtype: toggleStates?.sales_defaultlogtype,
        sales_deliverylocation: toggleStates?.sales_deliverylocation,
        sales_deliverydate: toggleStates?.sales_deliverydate,
        claim_fuel_reimbursement_by_tracking:
          toggleStates?.claim_fuel_reimbursement_by_tracking,
        general_customer_or_billingparty:
          toggleStates?.general_customer_or_billingparty,
        is_location_tracking: toggleStates?.is_location_tracking,
        login_platform: toggleStates?.login_platform,
      },
    });
    // if(!formik?.isValid){
    //   getUserData()
    //   restrictedData()
    // }
    setSpinner(false);
    // formik.initialValues = {
    //   ...formData
    // }
    console.log("<<<<<<<<<<<<<< formik values >>>>>>>>>>>>>>", formik?.isValid);
  };
  const restrictedData = async () => {
    try {
      let userRestrictionData: any = await AUMService.listUserById(
        id as string
      );
      let userRestriction = userRestrictionData?.data?.userRestriction;

      console.log("userRestriction", userRestriction);

      setToggleStates({
        visit_purposeofvisit: userRestriction?.visit_purposeofvisit || false,
        visit_typeofvisit: userRestriction?.visit_typeofvisit || false,
        visit_multipleimage: userRestriction?.visit_multipleimage || false,
        visit_voicerecord: userRestriction?.visit_voicerecord || false,
        visit_auto_voicerecord:
          userRestriction?.visit_auto_voicerecord || false,
        sales_ordertype: userRestriction?.sales_ordertype || false,
        sales_defaultlogtype: userRestriction?.sales_defaultlogtype || false,
        sales_deliverylocation:
          userRestriction?.sales_deliverylocation || false,
        sales_deliverydate: userRestriction?.sales_deliverydate || false,
        claim_fuel_reimbursement_by_tracking:
          userRestriction?.claim_fuel_reimbursement_by_tracking || false,
        general_customer_or_billingparty:
          userRestriction?.general_customer_or_billingparty || false,
        is_location_tracking: userRestriction?.is_location_tracking || false,
        login_platform: userRestriction?.login_platform,
        is_attendance_not_required: userRestriction?.is_attendance_not_required
          ? userRestriction?.is_attendance_not_required
          : false,
      });
    } catch (error) {
      console.log("Error while getting userRestriction", error);
    }
  };
  const getAssignedServiceForUsers = async () => {
    try {
      const payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        userId: [id],
      };
      let services: any = await AUMService.getAssignedServiceForUser(payload);
      setUserService(services?.data?.response);
      console.log("setUserService >>>>>>", services?.data?.response);
    } catch (error) {
      console.log("Error while getting userRestriction", error);
    }
  };

  useEffect(() => {
    if (isEdit || isView) {
      getUserData();
      restrictedData();
    }
    if (isView) {
      getAssignedServiceForUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disabledSxProp: any = useMemo(
    () =>
      isView
        ? {
            "& .MuiInputBase-input.Mui-disabled": {
              // fontWeight: "bold",
            },
          }
        : {},
    []
  );
  console.log("formik values >>>>>>>>>>>>>>>>>", formik.values);
  const getList = async () => {
    try {
      const payload = {
        populate: true,
        select: ["emailAddress"],
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let listData = await AUMService.getAll(payload);
      listData = listData.data;
      console.log("tabledatafor", listData);
      setTableData(listData?.data?.length > 0 ? listData.data : []);
    } catch (e) {
      console.log("error");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setToggleStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  console.log("toggleStates", toggleStates);

  useEffect(() => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      userRestrictionData: {
        ...prevValues.userRestrictionData,
        ...toggleStates,
      },
    }));
  }, [toggleStates]);

  const countryDataId =
    AUTH?.data?.userRecord?.organizationData?.countryData?.countryId;

  const [states, setStates] = useState<any>();
  const fetchStates = async (countryId: any) => {
    try {
      const response = await CountryStateCity.getAllStatesByCountry(countryId);
      const statesData = response?.data?.data || [];
      console.log("statesData", statesData);
      const formattedStates = statesData.map((state: any) => ({
        label: state.name,
        value: state._id,
        id: state?.id,
      }));
      setStates(formattedStates);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  console.log(states, "hello");

  useEffect(() => {
    if (countryDataId) {
      fetchStates(countryDataId);
    }
  }, [countryDataId]);

  const [cities, setCities] = useState<any[]>([]);

  const fetchCities = async () => {
    try {
      console.log("formik?.values.state?.id", formik?.values.state?.value);
      const stateId = states.filter(
        (state: any) => state.value === formik?.values.state?.value
      )[0];

      const response = await CountryStateCity.getAllCitiesByState(
        formik?.values.state?.id === undefined
          ? stateId?.id
          : formik?.values.state?.id
      );
      const citiesData = response?.data?.data || [];
      const formattedCities = citiesData.map((city: any) => ({
        label: city.name,
        value: city._id,
      }));
      setCities(formattedCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  console.log(cities, "cities");
  console.log(formik, "formik2345");

  useEffect(() => {
    console.log("Selected state changed, fetching cities...");
    if (formik?.values?.state) {
      fetchCities();
    } else {
      console.log("while fetcing erro");
    }
  }, [formik?.values?.state?.value]);

  const handleCheckValues = () => {
    if (toggleStates["is_location_tracking"]) {
      if (formik?.values?.time_interval < 15000) {
        return true;
      }
      if (formik?.values?.tracking_autoattendance) {
        if (
          formik?.values?.startTime &&
          formik?.values?.endTime &&
          formik?.values?.days?.length > 0
        ) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  return (
    <>
      <ContainerBoxV2>
        <Grid
          container
          xs={12}
          style={{
            height: "auto",
            width: "100%",
            position: "sticky",
          }}
        >
          <Grid container item xs={12} justifyContent={"space-between"}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "600" }}>
                {`${isAdd ? "Add" : isEdit ? "Update" : "View"} User`}
              </Typography>
            </Box>
            {isView && (
              <Box>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setDrawerOpen(true)}
                >
                  service(s)
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
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
          <Grid
            container
            xs={12}
            style={{
              height: "calc(100vh - 200px)",
              width: "100%",
              marginTop: 5,
              // overflowY: 'auto',
            }}
          >
            <form onSubmit={formik.handleSubmit} style={{ marginTop: "10px" }}>
              {isShowMap ? (
                <>
                  <ButtonV1
                    variant="contained"
                    onClick={() => {
                      setIsShowMap(false);
                    }}
                  >
                    Back
                  </ButtonV1>
                  <SelectLocation
                    setFormData={setFormData}
                    formData={formData}
                    formik={formik}
                  />
                </>
              ) : (
                <Grid container item xs={12} spacing={3}>
                  <Grid container item xs={12} spacing={3}></Grid>
                  {/* <Grid container item xs={12} spacing={1}></Grid> */}
                  <Grid container item xs={12} spacing={3}>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          EMP Code <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Textfield
                          placeholder="Enter EMP code"
                          type="text"
                          name="embCode"
                          value={(formik?.values?.embCode || "").trimStart()}
                          onChange={formik.handleChange}
                          error={getError(formik, "embCode")?.isTrue}
                          helperText={
                            getError(formik, "embCode")?.isTrue &&
                            getError(formik, "embCode")?.message
                          }
                          disabled={isView}
                          fullWidth
                          onBlur={formik?.handleBlur}
                          style={disabledSxProp}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          First Name <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <TextField
                          placeholder="Enter first name"
                          variant="outlined"
                          type="text"
                          name="firstName"
                          value={(formik?.values?.firstName || "").trimStart()}
                          onChange={formik.handleChange}
                          error={getError(formik, "firstName")?.isTrue}
                          helperText={
                            getError(formik, "firstName")?.isTrue &&
                            getError(formik, "firstName")?.message
                          }
                          disabled={isView}
                          fullWidth
                          size="small"
                          onBlur={formik?.handleBlur}
                          sx={disabledSxProp}
                        />
                      </Box>
                    </Grid>

                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          {" "}
                          Last Name <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Textfield
                          placeholder="Enter last name"
                          type="text"
                          name="lastName"
                          value={(formik?.values?.lastName || "").trimStart()}
                          onChange={formik.handleChange}
                          error={getError(formik, "lastName")?.isTrue}
                          helperText={
                            getError(formik, "lastName")?.isTrue &&
                            getError(formik, "lastName")?.message
                          }
                          disabled={isView}
                          fullWidth
                          onBlur={formik?.handleBlur}
                          sx={disabledSxProp}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Mobile <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Textfield
                          placeholder="Enter mobile"
                          type="number"
                          name="mobile"
                          value={(
                            formik?.values?.mobile.toString() || ""
                          ).trimStart()}
                          onChange={formik.handleChange}
                          error={getError(formik, "mobile")?.isTrue}
                          helperText={
                            getError(formik, "mobile")?.isTrue &&
                            getError(formik, "mobile")?.message
                          }
                          disabled={isEdit || isView}
                          fullWidth
                          onBlur={formik?.handleBlur}
                          sx={disabledSxProp}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Email Address <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Textfield
                          placeholder="Enter email"
                          type="text"
                          name="emailAddress"
                          value={(
                            formik?.values?.emailAddress || ""
                          ).trimStart()}
                          onChange={formik.handleChange}
                          error={getError(formik, "emailAddress")?.isTrue}
                          helperText={
                            getError(formik, "emailAddress")?.isTrue &&
                            getError(formik, "emailAddress")?.message
                          }
                          disabled={isView}
                          fullWidth
                          onBlur={formik?.handleBlur}
                          sx={disabledSxProp}
                        />
                      </Box>
                    </Grid>
                    {isAdd && (
                      <Grid container item xs={3}>
                        <Box sx={{ width: "100%" }}>
                          <InputLabel
                            shrink
                            sx={{
                              fontSize: 16,
                              fontWeight: "600",
                              color: "#181C32",
                            }}
                          >
                            {" "}
                            Password <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <Textfield
                            placeholder="Enter password"
                            type="text"
                            name="password"
                            value={(formik?.values?.password || "").trimStart()}
                            onChange={formik.handleChange}
                            error={getError(formik, "password")?.isTrue}
                            helperText={
                              getError(formik, "password")?.isTrue &&
                              getError(formik, "password")?.message
                            }
                            fullWidth
                            onBlur={formik?.handleBlur}
                            sx={disabledSxProp}
                          />
                        </Box>
                      </Grid>
                    )}
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Department <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <AutoComplete
                          options={department}
                          value={formik?.values?.department || null}
                          renderInput={(params) => (
                            <Textfield
                              {...params}
                              fullWidth
                              type="text"
                              name="department"
                              placeholder="Select department"
                              error={getError(formik, "department")?.isTrue}
                              helperText={
                                getError(formik, "department")?.isTrue &&
                                getError(formik, "department")?.message
                              }
                              onBlur={formik?.handleBlur}
                              sx={disabledSxProp}
                            />
                          )}
                          onChange={(
                            _,
                            selectedOption: Record<string, any>
                          ) => {
                            formik?.setFieldValue("department", selectedOption);
                          }}
                          fullWidth
                          // defaultValue={{label:"test", value: 'test'}}
                          disabled={isView}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          {" "}
                          Designation <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <AutoComplete
                          options={designation}
                          value={formik?.values?.designation || null}
                          renderInput={(params) => (
                            <Textfield
                              {...params}
                              fullWidth
                              type="text"
                              name="designation"
                              placeholder="Select designation"
                              error={getError(formik, "designation")?.isTrue}
                              helperText={
                                getError(formik, "designation")?.isTrue &&
                                getError(formik, "designation")?.message
                              }
                              onBlur={formik?.handleBlur}
                              sx={disabledSxProp}
                            />
                          )}
                          onChange={(
                            _,
                            selectedOption: Record<string, any>
                          ) => {
                            formik?.setFieldValue(
                              "designation",
                              selectedOption
                            );
                          }}
                          fullWidth
                          // defaultValue={{label:"test", value: 'test'}}
                          disabled={isView}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          {" "}
                          Role <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <AutoComplete
                          options={roles}
                          renderInput={(params) => (
                            <Textfield
                              {...params}
                              fullWidth
                              type="text"
                              name="role"
                              placeholder="Select role"
                              error={getError(formik, "role")?.isTrue}
                              helperText={
                                getError(formik, "role")?.isTrue &&
                                getError(formik, "role")?.message
                              }
                              onBlur={formik?.handleBlur}
                              sx={disabledSxProp}
                            />
                          )}
                          value={formik?.values?.role || null}
                          fullWidth
                          onChange={(
                            _,
                            selectedOption: Record<string, any>
                          ) => {
                            formik?.setFieldValue("role", selectedOption);
                          }}
                          disabled={isView}
                          // defaultValue={{label:"test", value: 'test'}}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          {" "}
                          State <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <AutoComplete
                          options={states}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              type="text"
                              name="state"
                              placeholder="Select state"
                              error={getError(formik, "state")?.isTrue}
                              helperText={
                                getError(formik, "state")?.isTrue &&
                                getError(formik, "state")?.message
                              }
                              onBlur={formik?.handleBlur}
                              sx={disabledSxProp}
                            />
                          )}
                          value={formik?.values?.state || null}
                          fullWidth
                          onChange={(
                            _,
                            selectedOption: Record<string, any>
                          ) => {
                            formik?.setFieldValue("state", selectedOption);
                            formik.setFieldValue("headquarters", null);
                          }}
                          disabled={isView}
                        />
                      </Box>
                    </Grid>
                    <Grid container item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          {" "}
                          City <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <AutoComplete
                          options={cities}
                          value={formik?.values?.headquarters || null}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              type="text"
                              name="headquarters"
                              placeholder="Select district"
                              error={getError(formik, "headquarters")?.isTrue}
                              helperText={
                                getError(formik, "headquarters")?.isTrue &&
                                getError(formik, "headquarters")?.message
                              }
                              onBlur={formik?.handleBlur}
                              sx={disabledSxProp}
                            />
                          )}
                          onChange={(
                            _,
                            selectedOption: Record<string, any>
                          ) => {
                            formik?.setFieldValue(
                              "headquarters",
                              selectedOption
                            );
                          }}
                          fullWidth
                          disabled={isView}
                        />
                      </Box>
                    </Grid>

                    {isView && (
                      <Grid container item xs={3}>
                        <Box sx={{ width: "100%" }}>
                          <InputLabel
                            shrink
                            sx={{
                              fontSize: 16,
                              fontWeight: "600",
                              color: "#181C32",
                            }}
                          >
                            Location:
                          </InputLabel>
                          {formik?.values?.location !== null && (
                            <ActionIconButton
                              actionType=""
                              onClick={() => openGoogleMaps()}
                            >
                              <Tooltip title="Location">
                                <LocationOnIcon color="error" />
                              </Tooltip>
                            </ActionIconButton>
                          )}
                        </Box>
                      </Grid>
                    )}
                    {!isView && (
                      <Grid item xs={3}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Location
                        </InputLabel>
                        <Grid>
                          <Button
                            variant="contained"
                            onClick={() => {
                              setIsShowMap(true);
                            }}
                          >
                            Set Location
                          </Button>

                          {formik?.values?.location !== null && (
                            <ActionIconButton
                              actionType=""
                              onClick={() => openGoogleMaps()}
                            >
                              <Tooltip title="Location">
                                <LocationOnIcon color="error" />
                              </Tooltip>
                            </ActionIconButton>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  {!isEdit && !isView && (
                    <>
                      <CustomDivier style={{ marginTop: "10px" }} />
                      <Grid container item xs={4}>
                        <Button_v2 onClick={handleClick}>
                          <ManageAccountsIcon />
                          <span>Advanced Settings</span>{" "}
                          {isOpen ? (
                            <KeyboardArrowDownIcon />
                          ) : (
                            <KeyboardArrowRightIcon />
                          )}
                        </Button_v2>
                      </Grid>
                    </>
                  )}

                  {/* <Grid container item xs={12} spacing={3}>
                {isEdit && (
                  <Grid container item xs={4}>
                    <Box
                      style={{
                        marginLeft: 10,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: 'center'
                      }}
                    >
                      <ToggleSwitch
                        label="Active User"
                        checked={formik?.values?.status}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid> */}
                </Grid>
              )}
              {isEdit && (
                <>
                  <CustomDivier style={{ marginTop: "10px" }} />
                  <Grid container xs={12} pb={3} mt={2}>
                    <Grid container item xs={4} alignItems="center">
                      <Box display="flex" alignItems="center">
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#181C32",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Mobile Login{" "}
                          <Tooltip title="If the toggle is switched off, mobile login will be logged out.">
                            <InfoIcon
                              sx={{ marginLeft: 0.5, fontSize: "20px" }}
                              color="primary"
                            />
                          </Tooltip>
                          :
                        </InputLabel>
                        <ToggleSwitch
                          checked={formik?.values?.isMobileLogin}
                          onChange={(event) => {
                            console.log(
                              "ToggleSwitch event >>>>>>",
                              event.target.checked
                            );
                            formik?.setFieldValue(
                              "isMobileLogin",
                              event?.target?.checked
                            );
                          }}
                          sx={{ marginBottom: 1, marginLeft: -2 }}
                        />
                      </Box>
                      <Button_v2 onClick={handleClick}>
                        <ManageAccountsIcon />
                        <span>Advanced Settings</span>
                        {isOpen ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )}
                      </Button_v2>
                    </Grid>
                  </Grid>
                </>
              )}

              {/* Login Type */}
              {isOpen && (
                <Grid container>
                  <Accordion
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {SIGN_IN?.title}
                      </Typography>
                    </AccordionSummary>
                    <Divider />

                    <AccordionDetails>
                      <RadioGroup
                        value={
                          toggleStates?.login_platform
                            ? toggleStates?.login_platform
                            : LOGIN_PLATFROMS[0]
                        }
                        onChange={(event: any) => {
                          console.log("event >>>>>>>>>>> <<<<<<<<<?", event);
                          setToggleStates({
                            ...toggleStates,
                            login_platform: event?.target?.value,
                          });
                        }}
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        {SIGN_IN?.items?.map((menu: any, index: number) => (
                          <FormControlLabel
                            value={LOGIN_PLATFROMS[index]}
                            control={<Radio />}
                            label={menu?.label}
                          />
                        ))}
                      </RadioGroup>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}

              {isOpen && (
                <Grid container>
                  <Accordion
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Attendance Management
                      </Typography>
                    </AccordionSummary>
                    <Divider />

                    <AccordionDetails>
                      <Grid
                        container
                        spacing={3}
                        direction="row"
                        alignItems="flex-start"
                      >
                        <Grid item xs={12} justifyContent={"space-around"}>
                          <RadioGroup
                            value={attendanceType}
                            onChange={handleAttendanceTypeChange}
                            sx={{ display: "flex", flexDirection: "row" }}
                          >
                            <Grid item xs={4}>
                              <FormControlLabel
                                value="default_location"
                                control={<Radio />}
                                label="Default Location"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControlLabel
                                value="customer_location"
                                control={<Radio />}
                                label="Customer Location"
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControlLabel
                                value="user_location"
                                control={<Radio />}
                                label="User Location"
                              />
                            </Grid>
                          </RadioGroup>
                        </Grid>

                        <Grid container item xs={12}>
                          <Grid item xs={4}>
                            <div>
                              <label>Is Attendance not required</label>
                            </div>
                          </Grid>
                          <Grid item xs={2}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <label className="switch">
                                <input
                                  name="is_attendance_not_required"
                                  type="checkbox"
                                  checked={
                                    toggleStates?.is_attendance_not_required
                                  }
                                  onChange={(event: any) =>
                                    setToggleStates({
                                      ...toggleStates,
                                      is_attendance_not_required:
                                        event?.target?.checked,
                                    })
                                  }
                                />
                                <span className="slider round"></span>
                              </label>
                              <IconInfo info="If this menu is enabled, this user can perform actions (such as adding, editing, etc.) without having to punch in or punch out on the mobile app" />
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}

              {isOpen && (
                <>
                  {ACCORDIAN_DATA.map((section: any, index: any) => (
                    <Grid container key={index}>
                      <Accordion
                        sx={{
                          width: "100%",
                          marginTop: index > 0 ? "20px" : 0,
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel${index + 1}-content`}
                          id={`panel${index + 1}-header`}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {section.title}
                          </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                          <Grid
                            container
                            spacing={3}
                            direction="row"
                            alignItems="flex-start"
                          >
                            {section.items.map((item: any, idx: any) => (
                              <React.Fragment key={idx}>
                                <Grid item xs={4}>
                                  <div>
                                    <label>{item.label}</label>
                                  </div>
                                </Grid>
                                <Grid item xs={2}>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    <label className="switch">
                                      <input
                                        name={item.name}
                                        type="checkbox"
                                        checked={
                                          toggleStates[item.name] || false
                                        }
                                        onChange={handleToggleChange}
                                      />
                                      <span className="slider round"></span>
                                    </label>

                                    {item.name ===
                                    "general_customer_or_billingparty" ? (
                                      <>
                                        <span
                                          style={{
                                            marginLeft: 2,
                                          }}
                                        >
                                          {toggleStates[
                                            `general_customer_or_billingparty`
                                          ] === true
                                            ? "Billing Party"
                                            : "Customer"}
                                        </span>
                                      </>
                                    ) : null}
                                    <IconInfo info={item.icon} />
                                  </div>
                                </Grid>
                              </React.Fragment>
                            ))}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))}
                </>
              )}

              {isOpen && (
                <Grid container>
                  <Accordion
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Location Tracking
                      </Typography>
                    </AccordionSummary>
                    <Divider />

                    <AccordionDetails>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "20px",
                        }}
                      >
                        <Grid item xs={2}>
                          <div>
                            <label>{"Tracking"}</label>
                          </div>
                        </Grid>
                        <Grid item>
                          <div>
                            <label className="switch">
                              <input
                                name={"is_location_tracking"}
                                type="checkbox"
                                checked={
                                  toggleStates["is_location_tracking"] || false
                                }
                                onChange={handleToggleChange}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </Grid>
                      </div>

                      {toggleStates["is_location_tracking"] ? (
                        <>
                          <Grid container item xs={3} mt={3}>
                            <Box sx={{ width: "100%" }}>
                              <InputLabel
                                shrink
                                sx={{
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "#181C32",
                                }}
                              >
                                Time Interval
                                <span style={{ color: "red" }}>*</span>
                              </InputLabel>
                              <AutoComplete
                                options={[
                                  { label: "15 seconds", value: 15 },
                                  { label: "30 seconds", value: 30 },
                                  { label: "60 seconds", value: 60 },
                                ]}
                                value={formik?.values?.time_interval || null}
                                renderInput={(params) => (
                                  <Textfield
                                    {...params}
                                    fullWidth
                                    type="text"
                                    name="time_interval"
                                    placeholder="Select Time Interval"
                                    error={
                                      getError(formik, "time_interval")?.isTrue
                                    }
                                    helperText={
                                      getError(formik, "time_interval")
                                        ?.isTrue &&
                                      getError(formik, "time_interval")?.message
                                    }
                                    onBlur={formik?.handleBlur}
                                    sx={disabledSxProp}
                                  />
                                )}
                                onChange={(_, selectedOption: any) => {
                                  // Multiply selected value by 1000
                                  const timeInSeconds =
                                    selectedOption?.value * 1000;
                                  formik?.setFieldValue(
                                    "time_interval",
                                    timeInSeconds
                                  );
                                }}
                                fullWidth
                                disabled={isView}
                              />
                            </Box>
                          </Grid>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: "20px",
                            }}
                          >
                            <Grid item xs={2}>
                              <div>
                                <label>{"Auto Tracking"}</label>
                              </div>
                            </Grid>
                            <Grid item>
                              <div>
                                <label className="switch">
                                  <input
                                    name={"tracking_autoattendance"}
                                    type="checkbox"
                                    checked={
                                      formik?.values?.tracking_autoattendance ||
                                      false
                                    }
                                    onChange={() => {
                                      formik.setFieldValue(
                                        "tracking_autoattendance",
                                        !formik?.values?.tracking_autoattendance
                                      );
                                    }}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </Grid>
                          </div>

                          {formik?.values?.tracking_autoattendance && (
                            <>
                              {/* //Start time */}
                              <Grid item xs={2} mt={3}>
                                <Box sx={{ width: "100%" }}>
                                  <InputLabel
                                    shrink
                                    sx={{
                                      fontSize: 16,
                                      fontWeight: "600",
                                      color: "#181C32",
                                    }}
                                  >
                                    Start time
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>
                                  <TextField
                                    id="start-time"
                                    type="time"
                                    value={formik?.values?.startTime}
                                    onChange={(e: any) => {
                                      formik.setFieldValue(
                                        "startTime",
                                        e.target.value
                                      );
                                      // If end time is set and is less than start time, update it
                                      if (
                                        formik.values.endTime &&
                                        e.target.value >= formik.values.endTime
                                      ) {
                                        formik.setFieldValue("endTime", ""); // Reset end time
                                      }
                                    }}
                                    sx={{
                                      display: "inline",
                                    }}
                                    size="small"
                                  />
                                </Box>
                              </Grid>

                              {/* // end time */}
                              <Grid item xs={2} mt={3}>
                                <Box sx={{ width: "100%" }}>
                                  <InputLabel
                                    shrink
                                    sx={{
                                      fontSize: 16,
                                      fontWeight: "600",
                                      color: "#181C32",
                                    }}
                                  >
                                    End time
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>
                                  <TextField
                                    id="end-time"
                                    type="time"
                                    value={formik?.values?.endTime}
                                    onChange={(e: any) => {
                                      // Parse time string to hours and minutes
                                      const [hours, minutes] = e.target.value
                                        .split(":")
                                        .map(Number);
                                      const [startHours, startMinutes] =
                                        formik.values.startTime
                                          .split(":")
                                          .map(Number);

                                      if (
                                        hours > startHours ||
                                        (hours === startHours &&
                                          minutes > startMinutes)
                                      ) {
                                        formik.setFieldValue(
                                          "endTime",
                                          e.target.value
                                        );
                                      } else {
                                        // If not greater, keep it empty
                                        formik.setFieldValue("endTime", "");
                                      }
                                    }}
                                    sx={{
                                      display: "inline",
                                    }}
                                    size="small"
                                  />
                                </Box>
                              </Grid>

                              {/* //Select Days */}

                              <Grid container item xs={2} mt={3}>
                                <Box sx={{ width: "100%" }}>
                                  <InputLabel
                                    shrink
                                    sx={{
                                      fontSize: 16,
                                      fontWeight: "600",
                                      color: "#181C32",
                                    }}
                                  >
                                    Days
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>
                                  <Select
                                    multiple
                                    value={formik?.values?.days || []}
                                    onChange={(event) => {
                                      formik?.setFieldValue(
                                        "days",
                                        event.target.value
                                      );
                                      console.log(event.target.value);
                                    }}
                                    fullWidth
                                    disabled={isView}
                                    size="small"
                                  >
                                    {DAYS_OF_WEEK.map((day, index) => (
                                      <MenuItem key={day} value={index}>
                                        {day}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </Box>
                              </Grid>
                            </>
                          )}
                        </>
                      ) : null}
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )}

              {isView && (
                <>
                  <CustomDivier style={{ marginTop: "10px" }} />
                  <Box padding={3}>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontWeight: "600" }}>
                          Last Login:
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography>
                          {formData?.lastLogin
                            ? formatedDate(
                                formData?.lastLogin,
                                API_DATE_FORMAT[12]
                              )
                            : "--"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontWeight: "600" }}>
                          App Version:
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography>
                          {formData?.appVersion ? formData?.appVersion : "--"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontWeight: "600" }}>
                          Last Seen :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography>
                          {formData?.lastSeenAt
                            ? formatedDate(
                                Number(formData?.lastSeenAt),
                                API_DATE_FORMAT[12]
                              )
                            : "--"}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid container xs={12} pb={3}>
                    <Grid item xs={7} md={3}>
                      <Typography sx={{ fontWeight: '600' }}>
                        Latest GPS :
                      </Typography>
                    </Grid>
                    <Grid item xs={5} md={9}>
                      <Typography>.......</Typography>
                    </Grid>
                  </Grid> */}
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontWeight: "600" }}>
                          Battery Level :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography>
                          {formData?.batteryLevel
                            ? `${formData?.batteryLevel}`
                            : "--"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container xs={12} pb={3}>
                      <Grid item xs={7} md={3}>
                        <Typography sx={{ fontWeight: "600" }}>
                          Device ID :
                        </Typography>
                      </Grid>
                      <Grid item xs={5} md={9}>
                        <Typography>
                          {formData?.deviceId ? formData?.deviceId : "--"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

              {!isView && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <ButtonV1
                    type="submit"
                    disabled={
                      !formik.isValid ||
                      !formik.dirty ||
                      !formik.values.lastName ||
                      handleCheckValues()
                    }
                    style={{
                      height: 38,
                      fontSize: 14,
                      width: "10%",
                      marginTop: "15px",
                    }}
                  >
                    {isAdd ? "Submit" : "Update"}
                  </ButtonV1>
                </Grid>
              )}
            </form>
          </Grid>
        )}
      </ContainerBoxV2>
      <MyDrawer
        anchor={"right"}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onClose={undefined}
        onOpen={() => {
          undefined;
        }}
        drawerWidth="40%"
        title="Assigned service(s)"
      >
        <AssignedServiceForUser services={userServices} />
      </MyDrawer>
    </>
  );
}

export default AddEditViewUserManagement;

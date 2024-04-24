/** @format */

import AgDataGrid from "../../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  ActionItems,
  PillTab,
  ActionConfirmation,
  FileUpload,
  Textfield,
  AutoComplete,
  MyDrawer,
} from "../../../../../../components/MUI/mui.index";
import { TNestedObj } from "../../../../../../types/global.types";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ColDef } from "ag-grid-community";
import React, { useEffect, useMemo, useState } from "react";
import "../../../../../../styles/Animations.css";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../../data/AppConst";
import CustomCellRenderValues from "../../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// ******* Service

// ************** Util
import { getSkipCount } from "../../../../../../utils/index.ts";

// ************** | Form schema
import { billingPartySchema } from "../../../../../../data/yup/settings/settings.ts";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../../hooks/index.ts";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { COLORS } from "../../../../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";
import customerSettingService from "../../../../../../../src/services/settings/customer.setting.service.ts";
import { CUSTOMER_DETAIL_RADIUS } from "../../../../../../data/AppConst";
import requestdemoService from "../../../../../../../src/services/requestdemoservice/requestdemo.service.ts";
import { useSelector } from "react-redux";
import SelectLocation from "./SelectLocation.tsx";
import SettingsService from "../../../../../../services/settings/settings.service.ts";

import BillingBulkUpload from "./BillingBulkUpload";

const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    id: data?._id,
  };
};
interface Customer {
  _id: any;
  id: string;
  customerName: string;
}
interface Countries {
  label: string;
  _id: string;
}

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
  const [isShowMap, setIsShowMap] = useState<boolean>(false);
  const [Logistics, setLogistics] = useState<any[]>([]);

  const { isAdd, isEdit, isView } = formActionType({
    actionType,
    data,
  });
  const user = useSelector(({ auth }) => auth);
  const organization_id = user?.data.userRecord.organization_id;

  const id = data?.id || null;
  const AUTH = useAppSelector((state) => state?.auth);
  const [_fileUploadRes, setFileUploadRes] = useState<Record<string, any>>({});
  const handleFileUpload = (res: Record<any, any>) => {
    setFileUploadRes(res);
    formik.setFieldValue("images", res?.imagePath || "");
  };
  const [_btnDisable, setBtnDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // const [exist, setExist] = useState(false);
  // const [errormsg, setErrormsg] = useState("");
  // ****************| Get customers |*****************
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const allCustomers =
          await customerSettingService.getAllCustomersByOrganization(
            organization_id
          );
        setCustomers(allCustomers?.data?.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomers();
  }, []);

  const [formvalue, setFormValue] = useState<Record<string, any>>({
    billingPartyName: "",
    billingPartyId: "",
    contactPerson: "",
    contactNumber: "",
    emailAddresses: "",
    addressLineOne: "",
    addressLineTwo: "",
    addressLineThree: "",
    city: "",
    district: "",
    state: "",
    country: "",
    defaultLogistic: "",
    defaultDeliveryPoint: "",
    limit: "",
    radius: { label: "100", value: "100" },
    GSTNo: "",
    images: "",
    notes: "",
    pinCode: "",
    status: true,
    customer: "",
    location: null,
  });

  const handleSubmit = async () => {
    setLoading(true);
    setDisabled(true);
    try {
      const organizationId = AUTH?.data?.userRecord?.organization_id;
      const BillingpartyData = {
        billingPartyName: formik?.values?.billingPartyName,
        billingPartyId: formik?.values?.billingPartyId,
        contactPerson: formik?.values?.contactPerson,
        contactNumber: formik?.values?.contactNumber,
        emailAddresses: formik?.values?.emailAddresses,
        addressLineOne: formik?.values?.addressLineOne,
        addressLineTwo: formik?.values?.addressLineTwo,
        addressLineThree: formik?.values?.addressLineThree,
        city: formik?.values?.city,
        district: formik?.values?.district,
        state: formik?.values?.state,
        country: formik?.values?.country?.value,
        defaultLogistic: formik?.values?.defaultLogistic?.value,
        defaultDeliveryPoint: formik?.values?.defaultDeliveryPoint,
        limit: formik?.values?.limit,
        radius: formik?.values?.radius?.value,
        GSTNo: formik?.values?.GSTNo,
        images: formik?.values?.images,
        notes: formik?.values?.notes,
        pinCode: formik?.values?.pinCode,
        status: formik?.values?.status,
        customer: formik.values?.customer?.value,
        organization_id: organizationId,
        location: formik?.values?.location,
      };

      if (isEdit) {
        // Edit existing status type
        const res = await customerSettingService.updateBillingParty({
          updatedData: BillingpartyData,
          id: id,
        });
        if (!res.data?.status) {
          toast.error(res?.data?.message || "", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      } else {
        const res = await customerSettingService.createBillingParty(
          BillingpartyData
        );
        if (!res.data?.status) {
          toast.error(res?.data?.message || "", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
        // const temp = settingList?.data?.data?.find(
        //   (item: any) =>
        //     item.contactNumber === formik.values.contactNumber &&
        //     item.organization_id === BillingpartyData.organization_id
        // );
        // if (!temp) {
        //   await customerSettingService.createBillingParty(BillingpartyData);
        //   ResetForm();
        //   refresh && refresh();
        //   handleClose && handleClose();
        // } else {
        //   formik.setFieldError(
        //     "billingPartyName",
        //     "BillingParty already exists."
        //   );
        // }
      }
      // setExist(false);
    } catch (error: any) {
      console.error("Error saving status type:", error);
      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setExist(true);
      // setErrormsg(error?.response?.data?.message);
    }
    setLoading(false);
    setDisabled(false);
  };

  const formik = useFormik({
    validationSchema: billingPartySchema({}),
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
      ...formvalue,
      billingPartyName: data?.billingPartyName,
      billingPartyId: data?.billingPartyId,
      contactPerson: data?.contactPerson,
      contactNumber: data?.contactNumber,
      emailAddresses: data?.emailAddresses,
      addressLineOne: data?.addressLineOne,
      addressLineTwo: data?.addressLineTwo,
      addressLineThree: data?.addressLineThree,
      city: data?.city,
      district: data?.district,
      state: data?.state,
      country: {
        label: data?.country?.label,
        value: data?.country?.id,
      },
      defaultLogistic: data?.defaultLogistic
        ? {
            label: data?.defaultLogistic?.logistics,
            value: data?.defaultLogistic?.id,
          }
        : null,
      defaultDeliveryPoint: data?.defaultDeliveryPoint,
      limit: data?.limit,
      radius: { label: data?.radius, value: data?.radius },
      GSTNo: data?.GSTNo,
      images: data?.images,
      notes: data?.notes,
      pinCode: data?.pinCode,
      status: data?.status,
      location: data?.location,
      customer: {
        label: data?.customer?.customerName,
        value: data?.customer?.id,
      },
    });
  };

  //***********Labels for View************** */
  const ViewKeyValue: any[] = [
    { label: "Billing Party Name", value: data?.billingPartyName || "-" },
    { label: "Billing Party ID", value: data?.billingPartyId || "-" },
    { label: "Contact Person", value: data?.contactPerson || "-" },
    {
      label: "Customer",
      value: data?.customer
        ? data?.customer.customerName
        : data?.customer || "-",
    },
    { label: "Contact Number", value: data?.contactNumber || "-" },
    { label: "Email Address", value: data?.emailAddresses || "-" },
    { label: "Address Line 1", value: data?.addressLineOne || "-" },
    { label: "Address Line 2", value: data?.addressLineTwo || "-" },
    { label: "Address Line 3", value: data?.addressLineThree || "-" },
    { label: "City", value: data?.city || "-" },
    { label: "District", value: data?.district || "-" },
    { label: "State", value: data?.state || "-" },
    { label: "Pincode/Zipcode", value: data?.pinCode || "-" },
    {
      label: "Country",
      value: data?.country ? data?.country.label : data?.country || "-",
    },
    {
      label: "Default Logistics",
      value: data?.defaultLogistic ? data?.defaultLogistic?.logistics : "-",
    },
    {
      label: "Default Delivery Point",
      value: data?.defaultDeliveryPoint || "-",
    },
    { label: "Limit", value: data?.limit || "-" },
    { label: "Radius", value: data?.radius || "-" },
    { label: "GST No", value: data?.GSTNo || "-" },
    { label: "Notes", value: data?.notes || "-" },
    { label: "Images", value: data?.images || "-" },
  ];

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({
      billingPartyName: "",
      billingPartyId: "",
      contactPerson: "",
      contactNumber: "",
      emailAddresses: "",
      addressLineOne: "",
      addressLineTwo: "",
      addressLineThree: "",
      city: "",
      district: "",
      state: "",
      country: "",
      defaultLogistic: "",
      defaultDeliveryPoint: "",
      limit: "",
      radius: { label: "100", value: "100" },
      GSTNo: "",
      images: "",
      notes: "",
      pinCode: "",
      status: true,
      customer: "",
      location: null,
    });
    // setExist(false);
  };
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${formik?.values?.location?.lat},${formik?.values?.location?.lng}`;
    window.open(url, "_blank");
  };
  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    // return () => {
    //   setFormValue({})
    // };
  }, [render]);

  // **********get countries*********
  const [countries, setCountries] = useState<Countries[]>([]);
  const getAllCountries = async () => {
    try {
      const response = await requestdemoService.getAllCountries();
      if (!response) {
        throw new Error("No data received");
      }
      setCountries(response?.data?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);

  // console.log(
  //   "cust",
  //   formik?.values,
  //   customers.find(
  //     (customer) => customer.id === formik?.values?.customer?.value
  //   ) || null
  // );
  // ***********| GET LOGISTICS |*********************
  const getList = async () => {
    let payload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };
    setLoading(true);
    setDisabled(true);

    const listRes = await SettingsService.listLogistics(payload);
    const result = listRes?.data?.data?.map((data: any) => {
      return {
        label: data?.logistics,
        value: data?.id,
      };
    });
    setDisabled(false);
    setLoading(false);
    setLogistics(result || []);

    if (Logistics === undefined) {
      setLoading(true);
      setDisabled(true);
    } else {
      setLoading(false);
      setDisabled(false);
    }
  };
  useEffect(() => {
    getList();
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
          ? "Add Billing Party"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Billing Party"
          : "View Billing Party"
      }
    >
      {isShowMap ? (
        <Box pr={4} pl={4} pb={4}>
          <Button
            variant="contained"
            onClick={() => {
              setIsShowMap(false);
            }}
          >
            Back
          </Button>
          {isShowMap && <SelectLocation formik={formik} />}
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {isView ? (
            <Grid container spacing={2}>
              {ViewKeyValue.map(
                ({ label, value }) =>
                  value !== "" && (
                    <>
                      <Grid item xs={6} key={label}>
                        {label !== "Images" && (
                          <Grid container spacing={2}>
                            <Grid item xs={5}>
                              <Typography
                                sx={{ fontSize: 14, fontWeight: "600" }}
                              >
                                {label}
                              </Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography
                                sx={{ fontSize: 14, fontWeight: "600" }}
                              >
                                :
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  overflowWrap: "break-word",
                                }}
                              >
                                {value}
                              </Typography>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                      {label === "Images" && (
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <img
                                src={value}
                                style={{ width: "100%", height: 350 }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )
              )}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {/* {exist && (
              <Grid item xs={12}>
                <Box className="slide-in-text-container">
                  <span className="slide-in-text">{errormsg}</span>
                </Box>
              </Grid>
            )} */}

              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Billing Party Name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    name="billingPartyName"
                    variant="outlined"
                    value={(formik?.values?.billingPartyName || "").trimStart()}
                    onChange={formik.handleChange}
                    error={getError(formik, "billingPartyName")?.isTrue}
                    helperText={
                      getError(formik, "billingPartyName")?.isTrue &&
                      getError(formik, "billingPartyName")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter billing party name"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Billing party Id
                  </InputLabel>
                  <Textfield
                    name="billingPartyId"
                    variant="outlined"
                    value={(formik?.values?.billingPartyId || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "billingPartyId")?.isTrue}
                    helperText={
                      getError(formik, "billingPartyId")?.isTrue &&
                      getError(formik, "billingPartyId")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter billing party Id"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Customer <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    options={customers}
                    value={
                      customers.find(
                        (customer) =>
                          customer._id === formik?.values?.customer?.value
                      ) || null
                    }
                    onChange={(_event, value) => {
                      formik.setFieldValue(
                        "customer",
                        value
                          ? { label: value?.customerName, value: value._id }
                          : null
                      );
                    }}
                    getOptionLabel={(option) => option.customerName}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        name="customer"
                        error={getError(formik, "customer")?.isTrue}
                        helperText={
                          getError(formik, "customer")?.isTrue &&
                          getError(formik, "customer")?.message
                        }
                        onBlur={formik?.handleBlur}
                        variant="outlined"
                        placeholder="Select customer"
                        disabled={isView}
                        size="small"
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Contact Person <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    name="contactPerson"
                    variant="outlined"
                    value={(formik?.values?.contactPerson || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "contactPerson")?.isTrue}
                    helperText={
                      getError(formik, "contactPerson")?.isTrue &&
                      getError(formik, "contactPerson")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Contact person name"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Contact Number <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    type="number"
                    name="contactNumber"
                    variant="outlined"
                    value={formik?.values?.contactNumber}
                    onChange={formik?.handleChange}
                    error={getError(formik, "contactNumber")?.isTrue}
                    helperText={
                      getError(formik, "contactNumber")?.isTrue &&
                      getError(formik, "contactNumber")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter Contact Number"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Email Address 
                  </InputLabel>
                  <Textfield
                    name="emailAddresses"
                    variant="outlined"
                    value={(formik?.values?.emailAddresses || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "emailAddresses")?.isTrue}
                    // helperText={
                    //   getError(formik, "emailAddresses")?.isTrue &&
                    //   getError(formik, "emailAddresses")?.message
                    // }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter email address"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Address Line 1 <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    name="addressLineOne"
                    variant="outlined"
                    value={(formik?.values?.addressLineOne || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "addressLineOne")?.isTrue}
                    helperText={
                      getError(formik, "addressLineOne")?.isTrue &&
                      getError(formik, "addressLineOne")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="House.NO / Flat"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Address Line 2
                  </InputLabel>
                  <Textfield
                    name="addressLineTwo"
                    variant="outlined"
                    value={(formik?.values?.addressLineTwo || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "addressLineTwo")?.isTrue}
                    helperText={
                      getError(formik, "addressLineTwo")?.isTrue &&
                      getError(formik, "addressLineTwo")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter street"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Address Line 3
                  </InputLabel>
                  <Textfield
                    name="addressLineThree"
                    variant="outlined"
                    value={(formik?.values?.addressLineThree || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "addressLineThree")?.isTrue}
                    helperText={
                      getError(formik, "addressLineThree")?.isTrue &&
                      getError(formik, "addressLineThree")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter landmark"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    City
                  </InputLabel>
                  <Textfield
                    name="city"
                    variant="outlined"
                    value={(formik?.values?.city || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "city")?.isTrue}
                    helperText={
                      getError(formik, "city")?.isTrue &&
                      getError(formik, "city")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter city"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    District <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    name="district"
                    variant="outlined"
                    value={(formik?.values?.district || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "district")?.isTrue}
                    helperText={
                      getError(formik, "district")?.isTrue &&
                      getError(formik, "district")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter district"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    State <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    name="state"
                    variant="outlined"
                    value={(formik?.values?.state || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "state")?.isTrue}
                    helperText={
                      getError(formik, "state")?.isTrue &&
                      getError(formik, "state")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter state"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Pincode <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    type="number"
                    name="pinCode"
                    variant="outlined"
                    value={formik?.values?.pinCode}
                    onChange={formik?.handleChange}
                    error={getError(formik, "pinCode")?.isTrue}
                    helperText={
                      getError(formik, "pinCode")?.isTrue &&
                      getError(formik, "pinCode")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter pincode"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Country
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    options={countries}
                    value={
                      countries.find(
                        (country) =>
                          country._id === formik?.values?.country?.value
                      ) || null
                    }
                    onChange={(_event, value) => {
                      formik.setFieldValue(
                        "country",
                        value ? { label: value?.label, value: value._id } : null
                      );
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        name="country"
                        variant="outlined"
                        placeholder="Select country"
                        disabled={isView}
                        size="small"
                        onBlur={formik?.handleBlur}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Default Logistic
                </InputLabel>
                <AutoComplete
                  options={Logistics}
                  // onChange={formik.handleChange}
                  // isOptionEqualToValue={(option: any) => option.label }
                  value={formik.values?.defaultLogistic || null}
                  onChange={(_e, newValue) => {
                    formik.setFieldValue("defaultLogistic", newValue);
                    // setFormData({...formData, defaultLogistic : newValue});
                  }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      placeholder="Enter default logistic"
                      error={getError(formik, "defaultLogistic")?.isTrue}
                      helperText={
                        getError(formik, "defaultLogistic")?.isTrue &&
                        getError(formik, "defaultLogistic")?.message
                      }
                      fullWidth
                      onBlur={formik.handleBlur}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Default Delivery Point
                  </InputLabel>
                  <Textfield
                    name="defaultDeliveryPoint"
                    variant="outlined"
                    value={(
                      formik?.values?.defaultDeliveryPoint || ""
                    ).trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "defaultDeliveryPoint")?.isTrue}
                    helperText={
                      getError(formik, "defaultDeliveryPoint")?.isTrue &&
                      getError(formik, "defaultDeliveryPoint")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter delivery point"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Limit
                  </InputLabel>
                  <Textfield
                    type="number"
                    name="limit"
                    variant="outlined"
                    value={formik?.values?.limit}
                    onChange={formik?.handleChange}
                    error={getError(formik, "limit")?.isTrue}
                    helperText={
                      getError(formik, "limit")?.isTrue &&
                      getError(formik, "limit")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter the limit"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Radius
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    isOptionEqualToValue={(option) => option.label}
                    options={CUSTOMER_DETAIL_RADIUS}
                    value={formik?.values?.radius || null}
                    clearIcon={false}
                    onChange={(_event, value) => {
                      formik?.setFieldValue(
                        "radius",
                        { label: value?.value, value: value?.value } || {
                          label: "100",
                          value: "100",
                        }
                      );
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        name="radius"
                        variant="outlined"
                        placeholder="Select radius"
                        disabled={isView}
                        size="small"
                        error={getError(formik, "radius")?.isTrue}
                        helperText={
                          getError(formik, "radius")?.isTrue &&
                          getError(formik, "radius")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    GST No
                  </InputLabel>
                  <Textfield
                    name="GSTNo"
                    variant="outlined"
                    value={(formik?.values?.GSTNo || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "GSTNo")?.isTrue}
                    helperText={
                      getError(formik, "GSTNo")?.isTrue &&
                      getError(formik, "GSTNo")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter GST number"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Image
                  </InputLabel>
                  <FileUpload
                    handleFileUpload={handleFileUpload}
                    onProgress={(flag: boolean) => {
                      setBtnDisable(flag);
                    }}
                    showNote={true}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Notes
                  </InputLabel>
                  <Textfield
                    label=""
                    name="notes"
                    variant="outlined"
                    value={(formik?.values?.notes || "").trimStart()}
                    onChange={formik?.handleChange}
                    error={getError(formik, "notes")?.isTrue}
                    helperText={
                      getError(formik, "notes")?.isTrue &&
                      getError(formik, "notes")?.message
                    }
                    onBlur={formik?.handleBlur}
                    placeholder="Enter notes"
                    disabled={isView}
                    size="small"
                  />
                </Box>
              </Grid>
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

              {/* Submit button */}
              {!isView && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: 1,
                    }}
                  >
                    {/* <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mx: 2, width: "15%" }}
                    onClick={() => {
                      ResetForm();
                      handleClose && handleClose();
                    }}
                  >
                    Cancel
                  </Button> */}

                    {isAdd ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: "15%" }}
                        disabled={disabled}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: "15%" }}
                        disabled={disabled}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Update"
                        )}{" "}
                      </Button>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          )}
        </form>
      )}
    </ActionModal>
  );
}

// ********************* | Main List Page | *****************
type TNestedObjWithStatus = TNestedObj & {
  status: boolean;
};

function StatusType() {
  const AUTH = useAppSelector((state) => state?.auth);
  // ******************** State
  const [_tableData, setTableData] = useState<TNestedObjWithStatus[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(false);
  const [render, reRender] = useState(0);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activeTableData, setActiveTableData] = useState<
    TNestedObjWithStatus[]
  >([]);
  const [deactivatedTableData, setDeactivatedTableData] = useState<
    TNestedObjWithStatus[]
  >([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [filterobject, setFilterObject] = useState<any>({});
  console.log("filterObjectBP", filterobject);
  const [filterValue, setFilterValue] = useState<any>([]);
  console.log("filtervalueBP", filterValue);
  const list = "DROPDOWN_LIST";

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
    setType === "OPEN" ? setOpenModal(true) : setOpenModal(false);
  const handleClose = () => setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
    handleModalOpen("OPEN");
    reRender(Math.random());
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleDelete = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate Status",
      message: `Are you sure you want to deactivate this Billing Party?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Status",
      message: `Are you sure you want to activate this Billing Party?`,
    });
  };

  const getList = async () => {
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      value: filterobject?.value || "",
    };

    setLoading(true);
    try {
      const listRes = await customerSettingService.getAllBillingParty(payload);
      if (listRes?.status) {
        const data = listRes?.data?.data || [];
        setTableData(listRes?.data?.data || []);
        setActiveTableData(
          data.filter((item: { status: boolean }) => item.status === true)
        );
        setDeactivatedTableData(
          data.filter((item: { status: boolean }) => item.status === false)
        );
        setTotalCount(listRes?.data?.total);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const getListFilter = async () => {
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      list: list,
    };

    setLoading(true);
    try {
      const listRes = await customerSettingService.getAllBillingParty(payload);
      if (listRes?.status) {
        const data = listRes?.data?.data || [];
        setFilterValue(listRes?.data?.data || []);
        setActiveTableData(
          data.filter((item: { status: boolean }) => item.status === true)
        );
        setDeactivatedTableData(
          data.filter((item: { status: boolean }) => item.status === false)
        );
        setTotalCount(listRes?.data?.total);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const getBulkuploadTemplateData = async () => {
    try {
      await customerSettingService.getBillingBulkuploadTemp();
    } catch (error) {
      console.error("Error template data:", error);
    }
  };

  useEffect(() => {
    getList();
    getBulkuploadTemplateData();
  }, [page, pageSize, activatedTab, filterobject]);

  useEffect(() => {
    getListFilter();
  }, [activatedTab]);

  const activeDeactive = async () => {
    try {
      let payload = {
        status: !isActive,
      } as Record<string, any>;
      let id: any = rowItem.id;
      await customerSettingService.billingPartyActiveDeactive(id, payload);
      getList();
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Billing Party Name",
        field: "billingPartyName",
        filter: true,
        width: 250,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "billingPartyName",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Customer Name",
        field: "customer.customerName",
        filter: true,
        width: 250,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "customer.customerName",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 100,
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
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    [activatedTab]
  );

  const tab = [
    {
      label: "Active Billing Party",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Deactivated Billing Party",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];

  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={8}>
              <PillTab
                tabMenus={tab}
                selectedTab={handleTabSelect}
                value={activatedTab}
              />
            </Grid>
            <Grid
              xs={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Stack direction="row" justifyContent={"space-between"}>
                <Grid item xs={4} sx={{ marginRight: "12px" }}>
                  <Autocomplete
                    value={filterobject?.label}
                    onChange={(_event, newValue) => setFilterObject(newValue)}
                    options={filterValue}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        label="Billing Party"
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
                      mx: 1,
                      "&:hover": {
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
                      "&:hover": {
                        background: COLORS.secondary,
                      },
                    }}
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[7]);
                      setDrawerOpen(true);
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      setOpenModal(true);
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

        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            {loading ? (
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
              <AgDataGrid
                rowData={
                  activatedTab === 0 ? activeTableData : deactivatedTableData
                }
                columnDefs={columnDefs}
                TableHeight={50}
                rowHeight={50}
                noDataTxt="No Records Found"
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
      <MyDrawer
        anchor={"right"}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onClose={undefined}
        onOpen={() => {
          undefined;
        }}
        drawerWidth="40%"
        title="Customer bulkupload"
      >
        <BillingBulkUpload getList={getList} setDrawerOpen={setDrawerOpen} />
      </MyDrawer>
    </>
  );
}

export default StatusType;

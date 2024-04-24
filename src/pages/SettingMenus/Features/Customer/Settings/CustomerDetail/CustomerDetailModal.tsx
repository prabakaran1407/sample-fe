/** @format */

import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import RequestDemoService from "../../../../../../services/requestdemoservice/requestdemo.service";
import { useAppSelector } from "../../../../../../hooks/index.ts";
import { Box, Button, Grid, InputLabel, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import {
  ActionIconButton,
  ActionModal,
  AutoComplete,
  Button_v2,
  FileUpload,
  Textfield,
  ToggleSwitch,
  InfoIcon as IconInfo,
} from "../../../../../../components/MUI/mui.index";
import { customerDetailSchema } from "../../../../../../data/yup/admin/addedit-usermanagement";
import { CUSTOMER_DETAIL_RADIUS } from "../../../../../../data/AppConst";
import customerSettingService from "../../../../../../../src/services/settings/customer.setting.service.ts";
import SelectLocation from "./SetLocation.tsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsService from "../../../../../../services/settings/settings.service.ts";
import { toast } from "react-toastify";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  id: any;
  refresh: any;
};

const CustomerDetailModal: React.FC<Props> = (props: Props) => {
  const { show, handleClose, refresh }: Props = props;

  return (
    <ActionModal
      open={show}
      onClose={() => {
        handleClose(false);
      }}
      title="Add New Customer"
    >
      <FormField {...props} refresh={refresh} />
    </ActionModal>
  );
};

const useStyles = makeStyles(() => ({
  requiredAsterisk: {
    color: "red", // or any other red color you prefer
  },
}));
const FormField = ({ handleClose, refresh }: Props) => {
  const AUTH = useAppSelector((state: { auth: any }) => state.auth);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [isShowMap, setIsShowMap] = useState(false);

  const [_checked, _setChecked] = useState(true);
  const [_selectedLevel, _setSelectedLevel] = useState<any>({});
  const [fileUploadRes, setFileUploadRes] = useState<Record<string, any>>({});
  const [_btnDisable, setBtnDisable] = useState(false);
  const [Logistics, setLogistics] = useState<any[]>([]);
  console.log("ddededed", Logistics);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileUpload = (res: Record<any, any>) => {
    setFileUploadRes(res);
  };

  const [formData, setFormData] = useState<Record<string, unknown | any>>({
    customerName: null,
    customerId: "",
    // group_id:null,
    contactPerson: null,
    contactPerson_two: null,
    contactPerson_three: null,
    contactNumber: null,
    contactNumber_two: null,
    contactNumber_three: null,
    emailAddresses: "",
    addressLineOne: null,
    addressLineTwo: null || "",
    addressLineThree: null || "",
    city: null || "",
    state: null || "",
    country: null,
    district: null || "",
    pinCode: null,
    defaultLogistic: null || "",
    defaultLogisticSecondary: null || "",
    defaultDeliveryPoint: null || "",
    radius: { label: "100", value: "100" },
    GSTNo: null || "",
    limit: null || "",
    notes: null || "",
    images: fileUploadRes?.imagePath || "",
    location: null,
    distributorLogin: false,
  });

  const [_value, _setValue] = useState<any>(formData);

  const ResetForm = () => {
    formik.resetForm();
    setFormData({
      customerName: null,
      customerId: "",
      // group_id:null,
      contactPerson: null,
      contactNumber: null,
      emailAddresses: "",
      addressLineOne: null,
      addressLineTwo: null || "",
      addressLineThree: null || "",
      city: null || "",
      state: null || "",
      country: null,
      district: null || "",
      pinCode: null,
      defaultLogistic: null || "",
      defaultDeliveryPoint: null || "",
      radius: null,
      GSTNo: null || "",
      limit: null || "",
      notes: null || "",
      images: null || "",
      location: null,
      defaultLogisticSecondary: null || "",
      contactNumber_two: null,
      contactNumber_three: null,
      contactPerson_two: null,
      contactPerson_three: null,
      distributorLogin: false,
    });
  };

  const formik: any = useFormik({
    validationSchema: customerDetailSchema,
    initialValues: formData,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const organization_id = AUTH?.data?.userRecord?.organization_id;
        const userId = AUTH?.data?.userRecord?.id;
        console.log("values >>>>>>>>>>>", values);
        const dataToSend: any = {
          ...values,
          organization_id,
          userId,
          radius: values?.radius ? parseFloat(values?.radius) : null,
        };
        dataToSend.defaultLogistic = values?.defaultLogistic
          ? values?.defaultLogistic.value
          : null;
        dataToSend.defaultLogisticSecondary = values?.defaultLogisticSecondary
          ? values?.defaultLogisticSecondary.value
          : null;
        dataToSend.country = values?.country ? values?.country.label : null;
        (dataToSend.contactNumber_two = values?.contactNumber_two
          ? values?.contactNumber_two
          : ""),
          (dataToSend.contactNumber_three = values?.contactNumber_three
            ? values?.contactNumber_three
            : ""),
          setSubmitting(true);

        const res: any = await customerSettingService.createCustomer(
          dataToSend
        );
        console.log("res >>>>>>>>", res);
        if (!res?.data?.status) {
          toast.error(res?.data?.message || "", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        ResetForm();
        refresh();
        handleClose(true);
        setLoading(false);
      } catch (error) {
        console.error("Error creating Customer:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log("formik", formik);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const [countries, setCountries] = useState<
    { label: string; phone: string; code: string }[]
  >([]);

  const getAllCountries = async () => {
    try {
      const response = await RequestDemoService.getAllCountries();
      if (!response) {
        throw new Error("No data received");
      }

      setCountries(
        response?.data?.data?.map((m: any) => ({
          label: m?.label,
          value: m?._id,
        }))
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${formik?.values?.location?.lat},${formik?.values?.location?.lng}`;
    window.open(url, "_blank");
  };
  // ***********| GET LOGISTICS |*********************
  const getList = async () => {
    let payload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };
    setLoading(true);
    const listRes = await SettingsService.listLogistics(payload);
    const result = listRes?.data?.data?.map((data: any) => {
      return {
        label: data?.logistics,
        value: data?.id,
      };
    });
    console.log(
      "listresponselogistics",
      listRes?.data?.data?.map((data: any) => {
        return {
          label: data?.logistics,
          value: data?.id,
        };
      })
    );

    setLoading(false);
    setLogistics(result || []);

    if (Logistics === undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  console.log("logistics", Logistics);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {isShowMap ? (
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  setIsShowMap(false);
                }}
              >
                Back
              </Button>
              <SelectLocation
                setFormData={setFormData}
                formData={formData}
                formik={formik}
              />
            </div>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Customer Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  label=""
                  placeholder="Enter customer name"
                  type="text"
                  name="customerName"
                  value={formik?.values?.customerName}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      customerName: e.target.value,
                    });
                  }}
                  error={getError(formik, "customerName")?.isTrue}
                  helperText={
                    getError(formik, "customerName")?.isTrue &&
                    getError(formik, "customerName")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Customer Id{" "}
                </InputLabel>
                <Textfield
                  label={""}
                  placeholder="Enter Customer Id"
                  type="text"
                  name="customerId"
                  value={formik?.values?.customerId}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      customerId: e.target.value,
                    });
                  }}
                  // error={getError(formik, "customerId")?.isTrue}
                  // helperText={
                  //   getError(formik, "customerId")?.isTrue &&
                  //   getError(formik, "customerId")?.message
                  // }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Contact Person 1{" "}
                  <span className={classes.requiredAsterisk}>*</span>
                </InputLabel>

                <Textfield
                  label={""}
                  type="text"
                  placeholder="Enter contact person"
                  name="contactPerson"
                  value={formik?.values?.contactPerson}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      contactPerson: e.target.value,
                    });
                  }}
                  error={getError(formik, "contactPerson")?.isTrue}
                  helperText={
                    getError(formik, "contactPerson")?.isTrue &&
                    getError(formik, "contactPerson")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Contact Person 2{" "}
                  {/* <span className={classes.requiredAsterisk}>*</span> */}
                </InputLabel>

                <Textfield
                  label={""}
                  type="text"
                  placeholder="Enter contact person 2"
                  name="contactPerson_two"
                  value={formik?.values?.contactPerson_two}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      contactPerson_two: e.target.value,
                    });
                  }}
                  // error={getError(formik, "contactPerson")?.isTrue}
                  // helperText={
                  //   getError(formik, "contactPerson")?.isTrue &&
                  //   getError(formik, "contactPerson")?.message
                  // }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Contact Person 3{" "}
                  {/* <span className={classes.requiredAsterisk}>*</span> */}
                </InputLabel>

                <Textfield
                  label={""}
                  type="text"
                  placeholder="Enter contact person 3"
                  name="contactPerson_three"
                  value={formik?.values?.contactPerson_three}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      contactPerson_three: e.target.value,
                    });
                  }}
                  // error={getError(formik, "contactPerson_three")?.isTrue}
                  // helperText={
                  //   getError(formik, "contactPerson_three")?.isTrue &&
                  //   getError(formik, "contactPerson_three")?.message
                  // }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Contact Number 1{" "}
                  <span className={classes.requiredAsterisk}>*</span>
                </InputLabel>
                <Textfield
                  label={""}
                  type="number"
                  placeholder="Enter contact number"
                  name="contactNumber"
                  value={formik?.values?.contactNumber}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      contactNumber: e.target.value,
                    });
                  }}
                  error={getError(formik, "contactNumber")?.isTrue}
                  helperText={
                    getError(formik, "contactNumber")?.isTrue &&
                    getError(formik, "contactNumber")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Contact Number 2{" "}
                  {/* <span className={classes.requiredAsterisk}>*</span> */}
                </InputLabel>
                <Textfield
                  label={""}
                  type="number"
                  placeholder="Enter contact number 2"
                  name="contactNumber_two"
                  value={formik?.values?.contactNumber_two}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      contactNumber_two: e.target.value,
                    });
                  }}
                  // error={getError(formik, "contactNumber")?.isTrue}
                  // helperText={
                  //   getError(formik, "contactNumber")?.isTrue &&
                  //   getError(formik, "contactNumber")?.message
                  // }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Contact Number 3{" "}
                  {/* <span className={classes.requiredAsterisk}>*</span> */}
                </InputLabel>
                <Textfield
                  label={""}
                  type="number"
                  placeholder="Enter contact number 3"
                  name="contactNumber_three"
                  value={formik?.values?.contactNumber_three}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      contactNumber_three: e.target.value,
                    });
                  }}
                  // error={getError(formik, "contactNumber")?.isTrue}
                  // helperText={
                  //   getError(formik, "contactNumber")?.isTrue &&
                  //   getError(formik, "contactNumber")?.message
                  // }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Email Address
                </InputLabel>
                <Textfield
                  label={""}
                  type="text"
                  name="  emailAddresses"
                  placeholder="Enter email address"
                  value={formik?.values?.emailAddresses}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      emailAddresses: e.target.value,
                    });
                  }}
                  error={getError(formik, "emailAddresses")?.isTrue}
                  helperText={
                    getError(formik, "emailAddresses")?.isTrue &&
                    getError(formik, "emailAddresses")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Address Line 1
                  <span className={classes.requiredAsterisk}> *</span>
                </InputLabel>
                <Textfield
                  label={""}
                  type="text"
                  placeholder="Enter address line 1"
                  name="addressLineOne"
                  value={formik?.values?.addressLineOne}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      addressLineOne: e.target.value,
                    });
                  }}
                  error={getError(formik, "addressLineOne")?.isTrue}
                  helperText={
                    getError(formik, "addressLineOne")?.isTrue &&
                    getError(formik, "addressLineOne")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Address Line 2
                </InputLabel>
                <Textfield
                  type="text"
                  placeholder="Enter address line 2"
                  name="addressLineTwo"
                  value={formik?.values?.addressLineTwo}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      addressLineTwo: e.target.value,
                    });
                  }}
                  error={getError(formik, "addressLineTwo")?.isTrue}
                  helperText={
                    getError(formik, "addressLineTwo")?.isTrue &&
                    getError(formik, "addressLineTwo")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Address Line 3
                </InputLabel>
                <Textfield
                  label={""}
                  type="text"
                  name="addressLineThree"
                  placeholder="Enter address line 3"
                  value={formik?.values?.addressLineThree}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      addressLineThree: e.target.value,
                    });
                  }}
                  error={getError(formik, "addressLineThree")?.isTrue}
                  helperText={
                    getError(formik, "addressLineThree")?.isTrue &&
                    getError(formik, "addressLineThree")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  City
                </InputLabel>
                <Textfield
                  type="text"
                  name="city"
                  placeholder="Enter customer city"
                  value={formik?.values?.city}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      city: e.target.value,
                    });
                  }}
                  error={getError(formik, "city")?.isTrue}
                  helperText={
                    getError(formik, "city")?.isTrue &&
                    getError(formik, "city")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  District <span className={classes.requiredAsterisk}>*</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="district"
                  placeholder="Enter customer district"
                  value={formik?.values?.district}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      district: e.target.value,
                    });
                  }}
                  error={getError(formik, "district")?.isTrue}
                  helperText={
                    getError(formik, "district")?.isTrue &&
                    getError(formik, "district")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  State <span className={classes.requiredAsterisk}>*</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="state"
                  placeholder="Enter customer state"
                  value={formik?.values?.state}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      state: e.target.value,
                    });
                  }}
                  error={getError(formik, "state")?.isTrue}
                  helperText={
                    getError(formik, "state")?.isTrue &&
                    getError(formik, "state")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Pincode/Zipcode
                  <span className={classes.requiredAsterisk}> *</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="pinCode"
                  placeholder="Enter pincode/zipcode"
                  value={formik?.values?.pinCode}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      pinCode: e.target.value,
                    });
                  }}
                  error={getError(formik, "pinCode")?.isTrue}
                  helperText={
                    getError(formik, "pinCode")?.isTrue &&
                    getError(formik, "pinCode")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Country
                </InputLabel>
                <AutoComplete
                  size="small"
                  options={countries}
                  value={formik?.values?.country || null}
                  onChange={(_, newValue) => {
                    formik.setFieldValue("country", newValue);
                    setFormData({
                      ...formData,
                      country: newValue,
                    });
                  }}
                  // onChange={(_e: any, event: any) => {
                  //   setFormData({
                  //     ...formData,
                  //     countryId: event._id,
                  //     countryName: event.label,
                  //   });
                  // }}
                  onBlur={formik?.handleBlur}
                  // disablePortal
                  id="country-select-demo"
                  // sx={{
                  //   '& .MuiOutlinedInput-root': {
                  //     borderRadius: 1,
                  //     padding: '0',
                  //   },
                  //   '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                  //     {
                  //       border: 'none',
                  //     },
                  // }}
                  // inputValue={formData?.country === "" ? "" : formData?.country}
                  // onInputChange={(_event, newInputValue) => {
                  //   setFormData({
                  //     ...formData,
                  //     countryId: "",
                  //     country: newInputValue,
                  //   });
                  // }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      // placeholder='Select Country'
                      // sx={{
                      //   background: '#F5F8FA',
                      //   borderRadius: 1,
                      //   border: 'none',
                      //   label: {
                      //     color: '#979797',
                      //     fontSize: '15px',
                      //   },
                      // }}
                      label={""}
                      placeholder="Select country"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // onError={getError(formik, 'country')?.isTrue}
                      // helperText={
                      //   getError(formik, "country")?.isTrue &&
                      //   getError(formik, "country")?.message
                      // }
                      // autoComplete='off'
                      // InputProps={{
                      //   endAdornment: (
                      //     <>
                      //       {formData?.countryName && (
                      //         <ClearIcon
                      //           style={{ cursor: 'pointer' }}
                      //           onClick={() => {
                      //             setFormData({
                      //               ...formData,
                      //               countryId: '',
                      //               countryName: '',
                      //             });
                      //           }}
                      //         />
                      //       )}
                      //       {params.InputProps.endAdornment}
                      //     </>
                      //   ),
                      // }}
                    />
                  )}
                />
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
                  Default Logistic Primary
                </InputLabel>
                <AutoComplete
                  options={Logistics}
                  onChange={(_, newValue) => {
                    formik.setFieldValue("defaultLogistic", newValue);
                    setFormData({
                      ...formData,
                      defaultLogistic: newValue,
                    });
                  }}
                  value={formik?.values?.defaultLogistic || null}
                  // onInputChange={(_e, newValue) => {
                  //   setFormData({ ...formData, defaultLogistic: newValue });
                  // }}
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
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Default Logistic Secondary
                </InputLabel>
                <AutoComplete
                  options={Logistics}
                  onChange={(_, newValue) => {
                    formik.setFieldValue("defaultLogisticSecondary", newValue);
                    setFormData({
                      ...formData,
                      defaultLogisticSecondary: newValue,
                    });
                  }}
                  value={formik?.values?.defaultLogisticSecondary || null}
                  // onInputChange={(_e, newValue) => {
                  //   setFormData({ ...formData, defaultLogistic: newValue });
                  // }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      placeholder="Enter default logistic"
                      // error={getError(formik, "defaultLogistic")?.isTrue}
                      // helperText={
                      //   getError(formik, "defaultLogistic")?.isTrue &&
                      //   getError(formik, "defaultLogistic")?.message
                      // }
                      fullWidth
                      onBlur={formik.handleBlur}
                    />
                  )}
                />
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
                  Default Delivery Point
                </InputLabel>
                <Textfield
                  type="text"
                  name="defaultDeliveryPoint"
                  placeholder="Enter delivery point"
                  value={formik?.values?.defaultDeliveryPoint}
                  // error={getError(formik, "defaultDeliveryPoint")?.isTrue}
                  // helperText={
                  //   getError(formik, "defaultDeliveryPoint")?.isTrue &&
                  //   getError(formik, "defaultDeliveryPoint")?.message
                  // }
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      defaultDeliveryPoint: e.target.value,
                    });
                  }}
                  error={getError(formik, "defaultDeliveryPoint")?.isTrue}
                  helperText={
                    getError(formik, "defaultDeliveryPoint")?.isTrue &&
                    getError(formik, "defaultDeliveryPoint")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  GST No
                </InputLabel>
                <Textfield
                  label={""}
                  type="text"
                  name="GSTNo"
                  placeholder="Enter GST number"
                  value={formik?.values?.GSTNo}
                  // error={getError(formik, "GSTNo")?.isTrue}
                  // helperText={
                  //   getError(formik, "GSTNo")?.isTrue &&
                  //   getError(formik, "GSTNo")?.message
                  // }
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      GSTNo: e.target.value,
                    });
                  }}
                  error={getError(formik, "GSTNo")?.isTrue}
                  helperText={
                    getError(formik, "GSTNo")?.isTrue &&
                    getError(formik, "GSTNo")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Radius
                </InputLabel>

                <AutoComplete
                  size="small"
                  options={CUSTOMER_DETAIL_RADIUS}
                  value={formData?.radius || null}
                  onChange={formik.handleChange}
                  onBlur={formik?.handleBlur}
                  id="country-select-demo"
                  inputValue={
                    formData?.radius === "" ? "" : formData?.formData?.radius
                  }
                  onInputChange={(_event, newInputValue) => {
                    setFormData({
                      ...formData,
                      countryId: "",
                      radius: newInputValue,
                    });
                  }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      placeholder="Select radius"
                      label={""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // helperText={
                      //   getError(formik, "country")?.isTrue &&
                      //   getError(formik, "country")?.message
                      // }
                    />
                  )}
                />
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
                  Limit
                </InputLabel>
                <Textfield
                  type="text"
                  name="limit"
                  placeholder="Enter limit"
                  value={formik?.values?.limit}
                  // error={getError(formik, "limit")?.isTrue}
                  // helperText={
                  //   getError(formik, "limit")?.isTrue &&
                  //   getError(formik, "limit")?.message
                  // }
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      limit: e.target.value,
                    });
                  }}
                  error={getError(formik, "limit")?.isTrue}
                  helperText={
                    getError(formik, "limit")?.isTrue &&
                    getError(formik, "limit")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Notes
                </InputLabel>
                <Textfield
                  label={""}
                  type="text"
                  name="notes"
                  placeholder="Enter notes"
                  value={formik?.values?.notes}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setFormData({
                      ...formData,
                      notes: e.target.value,
                    });
                  }}
                  error={getError(formik, "notes")?.isTrue}
                  helperText={
                    getError(formik, "notes")?.isTrue &&
                    getError(formik, "notes")?.message
                  }
                  fullWidth
                  onBlur={formik?.handleBlur}
                />
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
                  Image
                </InputLabel>
                <Grid>
                  <FileUpload
                    handleFileUpload={handleFileUpload}
                    // label={""}
                    onProgress={(flag: boolean) => {
                      setBtnDisable(flag);
                    }}
                    showNote={true}
                    // type="text"
                    // name="images"
                    // value={formik?.values?.images}
                    // onChange={(e: any) => {
                    //   formik.handleChange(e);
                    //   setFormData({
                    //     ...formData,
                    //     images: e.target.value,
                    //   });
                    // }}
                    // error={getError(formik, "images")?.isTrue}
                    // helperText={
                    //   getError(formik, "images")?.isTrue &&
                    //   getError(formik, "images")?.message
                    // }
                    // fullWidth
                    // onBlur={formik?.handleBlur}
                  />
                </Grid>
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
                  Location <span className={classes.requiredAsterisk}> *</span>
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

              <Grid item xs={3}>
                <Box display="flex" flexDirection="column" alignItems="center">
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
                    Distributor Login{" "}
                    <Tooltip title="If the toggle is switched on Email Address is Mandatory">
                      <InfoIcon sx={{ fontSize: "20px" }} color="primary" />
                    </Tooltip>
                    :
                  </InputLabel>
                  <ToggleSwitch
                    checked={formik?.values?.distributorLogin}
                    onChange={(event) => {
                      console.log(
                        "ToggleSwitch event >>>>>>",
                        event.target.checked
                      );
                      // formik?.setFieldValue(
                      //   "distributorLogin",
                      //   event?.target?.checked
                      // );
                      setFormData({
                        ...formData,
                        distributorLogin: event?.target?.checked,
                      });
                    }}
                    sx={{ marginBottom: 1, marginLeft: -2 }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            {isShowMap ? null : (
              <Button
                sx={{ width: "15%" }}
                type="submit"
                variant="contained"
                disabled={!_.isEmpty(formik.errors)}
              >
                {!loading && <span className="indicator-label">Save</span>}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </Button>
            )}
          </Box>
        </div>
      </form>
      {/* {error && (
        <Alert variant="filled" severity="error">
          <strong>{error}</strong>
        </Alert>
      )}
      {success && (
        <Alert variant="filled" severity="success">
          <strong>Successfully submitted the data</strong>
        </Alert>
      )} */}
    </>
  );
};
export { CustomerDetailModal };

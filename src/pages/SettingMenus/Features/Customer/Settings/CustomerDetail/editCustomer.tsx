import {
  Box,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { CustomDivier } from "../../../../../../../src/components/APP/app.index";
import {
  ActionIconButton,
  AutoComplete,
  ContainerBoxV2,
  FileUpload,
  Textfield,
} from "../../../../../../../src/components/MUI/mui.index";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import reqdemoservice from "../../../../../../services/requestdemoservice/requestdemo.service.ts";
import customerSettingService from "../../../../../../../src/services/settings/customer.setting.service.ts";
import { CUSTOMER_DETAIL_RADIUS } from "../../../../../../data/AppConst";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SelectLocation from "./SetLocation.tsx";
import { customerDetailSchema } from "../../../../../../data/yup/admin/addedit-usermanagement";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../../../src/hooks/index.ts";
import SettingsService from "../../../../../../services/settings/settings.service.ts";
import { toast } from "react-toastify";

interface Country {
  code: string;
  label: string;
  phone: string;
  _id: string;
}

const EditCustomer = () => {
  const location = useLocation();
  const AUTH = useAppSelector((state: { auth: any }) => state.auth);
  const { state } = location;
  const rowItem = state?.leadData;
  const navigate = useNavigate();
  const [fileUploadRes, setFileUploadRes] = useState<Record<string, any>>({});
  const [isShowMap, setIsShowMap] = useState(false);
  const [formData, setFormData] = useState<any>({
    customerName: rowItem?.customerName || "",
    customerId: rowItem?.customerId || "",
    contactPerson: rowItem?.contactPerson || "",
    emailAddresses: rowItem?.emailAddresses || "",
    contactNumber: rowItem?.contactNumber || "",
    addressLineOne: rowItem?.addressLineOne || "",
    addressLineTwo: rowItem?.addressLineTwo || "",
    addressLineThree: rowItem?.addressLineThree || "",
    city: rowItem?.city || "",
    district: rowItem?.district || "",
    pinCode: rowItem?.pinCode || "",
    state: rowItem?.state || "",
    country: rowItem?.country || "",
    defaultLogistic: rowItem?.defaultLogistic
      ? {
          label: rowItem?.defaultLogistic.logistics,
          value: rowItem?.defaultLogistic.id,
        }
      : null,
    defaultDeliveryPoint: rowItem?.defaultDeliveryPoint || "",
    GSTNo: rowItem?.GSTNo || "",
    radius: rowItem?.radius || "",
    limit: rowItem?.limit || "",
    images: rowItem?.images || "",
    notes: rowItem?.notes || "",
    location: rowItem?.location || null,
    contactPerson_two: rowItem?.contactPerson_two || "",
    contactPerson_three: rowItem?.contactPerson_three || "",
    contactNumber_two: rowItem?.contactNumber_two || "",
    contactNumber_three: rowItem?.contactNumber_three || "",
    defaultLogisticSecondary: rowItem?.defaultLogisticSecondary
      ? {
          label: rowItem?.defaultLogisticSecondary?.logistics,
          value: rowItem?.defaultLogisticSecondary?.id,
        }
      : null,
  });

  const [_btnDisable, setBtnDisable] = useState(false);
  const [Logistics, setLogistics] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // const handleUpdate = async (event: { preventDefault: () => void }) => {
  //   event.preventDefault();
  //   try {
  //     // Use your service to update customer details
  //     await customerSettingService.updateCustomer({
  //       id: rowItem.id,
  //       updatedData: formData,
  //     });

  //     navigate(-1);
  //   } catch (error) {
  //     console.error("Error updating customer details:", error);
  //   }
  // };
  // Handle the form submission logic here
  const formik = useFormik({
    initialValues: formData,
    validationSchema: customerDetailSchema,
    onSubmit: async (values) => {
      try {
        values = {
          ...formData,
          ...values,
          defaultLogistic: values?.defaultLogistic?.value,
          radius: values?.radius ? parseFloat(values?.radius) : null,
          defaultLogisticSecondary: values?.defaultLogisticSecondary?.value,
        };
        if (formData.country)
          values.country = formData?.country ? formData?.country : null;
        if (Object.keys(fileUploadRes)?.length) {
          values.images = fileUploadRes?.imagePath;
        }
        const res = await customerSettingService.updateCustomer({
          id: rowItem.id,
          updatedData: values, // Use validated form values
        });
        if (!res.data?.status) {
          toast.error(res?.data?.message || "", {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        navigate(-1);
      } catch (error) {
        console.error("Error updating customer details:", error);
      }
    },
  });
  const handleFileUpload = (res: Record<any, any>) => {
    setFileUploadRes(res);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${formData?.location?.lat},${formData?.location?.lng}`;
    window.open(url, "_blank");
  };

  const [countries, setCountries] = useState<
    { label: string; phone: string; code: string }[]
  >([]);
  const getAllCountries = async () => {
    try {
      const response = await reqdemoservice.getAllCountries();
      if (!response) {
        throw new Error("No data received");
      }

      const mappedCountries: Country[] = response.data.data.map(
        (country: any) => ({
          label: country.label,
          _id: country._id,
        })
      );

      setCountries(mappedCountries);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    // Check if fileUploadRes.imagePath exists and set it in formData
    if (fileUploadRes && fileUploadRes.imagePath) {
      setFormData((prevData: any) => ({
        ...prevData,
        images: fileUploadRes.imagePath,
      }));
    }
  }, [fileUploadRes]);
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
  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  return (
    <>
      <Paper>
        <ContainerBoxV2>
          <Grid container xs={12}>
            <Grid xs={12}>
              <Stack direction="row" justifyContent={"space-between"}>
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                  Edit Customer Details
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <CustomDivier />
        </ContainerBoxV2>
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
            <SelectLocation formik={formik} />
          </Box>
        ) : (
          <form style={{ padding: "15px" }} onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Customer Name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    id="customerName"
                    label=""
                    placeholder="Enter Customer Name"
                    size="small"
                    type="text"
                    name="customerName"
                    value={formik.values?.customerName || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.customerName &&
                      Boolean(formik.errors.customerName)
                    }
                    helperText={
                      formik.touched.customerName && formik.errors.customerName
                        ? (formik.errors.customerName as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Customer Id
                  </InputLabel>
                  <TextField
                    id="customerId"
                    label=""
                    placeholder="Enter Customer Id"
                    size="small"
                    type="text"
                    name="customerId"
                    value={formik.values?.customerId || ""}
                    onChange={formik.handleChange}
                    // error={
                    //   formik.touched.customerId &&
                    //   Boolean(formik.errors.customerId)
                    // }
                    // helperText={
                    //   formik.touched.customerId && formik.errors.customerId
                    //     ? (formik.errors.customerId as string)
                    //     : null
                    // }
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Contact Person 1<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="contactPerson"
                    placeholder="Enter contact person"
                    fullWidth
                    size="small"
                    value={formik.values?.contactPerson || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.contactPerson &&
                      Boolean(formik.errors.contactPerson)
                    }
                    helperText={
                      formik.touched.contactPerson &&
                      formik.errors.contactPerson
                        ? (formik.errors.contactPerson as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
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
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Contact Number <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="contactNumber"
                    placeholder="Enter contact number"
                    fullWidth
                    size="small"
                    value={formik.values?.contactNumber || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.contactNumber &&
                      Boolean(formik.errors.contactNumber)
                    }
                    helperText={
                      formik.touched.contactNumber &&
                      formik.errors.contactNumber
                        ? (formik.errors.contactNumber as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
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

              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Email Address 
                  </InputLabel>
                  <TextField
                    name="emailAddresses"
                    placeholder="Enter email address"
                    fullWidth
                    size="small"
                    value={formik.values?.emailAddresses || ""}
                    onChange={formik.handleChange}
                    // error={
                    //   formik.touched.emailAddresses &&
                    //   Boolean(formik.errors.emailAddresses)
                    // }
                    // helperText={
                    //   formik.touched.emailAddresses &&
                    //   formik.errors.emailAddresses
                    //     ? (formik.errors.emailAddresses as string)
                    //     : null
                    // }
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Address Line 1 <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="addressLineOne"
                    placeholder="Enter address line 1"
                    fullWidth
                    size="small"
                    value={formik.values?.addressLineOne || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addressLineOne &&
                      Boolean(formik.errors.addressLineOne)
                    }
                    helperText={
                      formik.touched.addressLineOne &&
                      formik.errors.addressLineOne
                        ? (formik.errors.addressLineOne as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Address Line 2
                  </InputLabel>
                  <TextField
                    name="addressLineTwo"
                    placeholder="Enter address line 2"
                    value={formik?.values?.addressLineTwo || ""}
                    onChange={formik?.handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Address Line 3
                  </InputLabel>
                  <TextField
                    name="addressLineThree"
                    placeholder="Enter address line 3"
                    value={formik?.values?.addressLineThree}
                    onChange={formik?.handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    City
                  </InputLabel>
                  <TextField
                    name="city"
                    placeholder="Enter city"
                    value={formData?.city || ""}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    District <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="district"
                    placeholder="Enter district"
                    fullWidth
                    size="small"
                    value={formik?.values?.district || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.district && Boolean(formik.errors.district)
                    }
                    helperText={
                      formik.touched.district && formik.errors.district
                        ? (formik.errors.district as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    State <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="state"
                    placeholder="Enter state"
                    fullWidth
                    size="small"
                    value={formik?.values?.state || ""}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={
                      formik.touched.state && formik.errors.state
                        ? (formik.errors.state as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Country
                  </InputLabel>
                  <TextField
                    placeholder="Select Country"
                    select
                    fullWidth
                    size="small"
                    name="country"
                    label=""
                    value={formData?.country || ""}
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value=""></option>
                    {countries.map((country, i) => (
                      <option key={i} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Pincode/Zipcode <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="pinCode"
                    placeholder="Enter pincode"
                    fullWidth
                    size="small"
                    value={formik?.values?.pinCode || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.pinCode && Boolean(formik.errors.pinCode)
                    }
                    helperText={
                      formik.touched.pinCode && formik.errors.pinCode
                        ? (formik.errors.pinCode as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
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
                  Default Logistic Primary
                </InputLabel>
                <AutoComplete
                  options={Logistics}
                  // onChange={handleChange}
                  value={formik?.values?.defaultLogistic || null}
                  onChange={(_e, newValue) => {
                    formik.setFieldValue("defaultLogistic", newValue);
                    setFormData({ ...formData, defaultLogistic: newValue });
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
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Default Delivery Point
                  </InputLabel>
                  <TextField
                    name="defaultDeliveryPoint"
                    placeholder="Enter default delivery point"
                    value={formik?.values?.defaultDeliveryPoint || ""}
                    onChange={formik?.handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    GST No
                  </InputLabel>
                  <TextField
                    name="GSTNo"
                    placeholder="Enter GST No"
                    value={formik?.values?.GSTNo || ""}
                    onChange={formik?.handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Radius <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    name="radius"
                    select
                    fullWidth
                    size="small"
                    placeholder="Select radius"
                    label=""
                    value={formik?.values?.radius || ""}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.radius && Boolean(formik.errors.radius)
                    }
                    helperText={
                      formik.touched.radius && formik.errors.radius
                        ? (formik.errors.radius as string)
                        : null
                    }
                    onBlur={formik.handleBlur}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value=""></option>
                    {CUSTOMER_DETAIL_RADIUS.map((radius, i) => (
                      <option key={i} value={radius.label}>
                        {radius.label}
                      </option>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Limit
                  </InputLabel>
                  <TextField
                    name="limit"
                    placeholder="Enter limit"
                    value={formik?.values?.limit || ""}
                    onChange={formik?.handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Notes
                  </InputLabel>
                  <TextField
                    name="notes"
                    placeholder="Enter notes"
                    value={formik?.values?.notes || ""}
                    onChange={formik?.handleChange}
                    fullWidth
                    size="small"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
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

                  {formData?.location !== null && (
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
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: "10px", width: "10%" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "10%" }}
              >
                {!loading && <span className="indicator-label">Update</span>}
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
            </Box>
          </form>
        )}
      </Paper>
    </>
  );
};

export default EditCustomer;

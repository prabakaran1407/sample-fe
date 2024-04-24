import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AUM_FORM_ACTION_TYPES } from "../../../../../data/AppConst";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomDivier } from "../../../../../components/APP/app.index";
import { Autocomplete, Button } from "@mui/material";
import ALS from "../../../../../services/admin/leadManagement.service";
import { useAppSelector } from "../../../../../hooks";
import reqdemoservice from "../../../../../services/requestdemoservice/requestdemo.service.ts";
import { getUserListForAdmin } from "../../../../../components/com_components/CustomerSettingsAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";

interface SourceOption {
  label: any;
}
interface StatusOption {
  leadStatus: any;
  _id: any;
}
interface PriorityOption {
  priority: string;
  leadPriority: any;
  _id: any;
}
interface Country {
  code: string;
  label: string;
  phone: string;
  _id: string;
}
interface UserData {
  _id: any;
  firstName: string;
}
const LeadManagementEditView: FC<any> = () => {
  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Company Name is required")
      .matches(/\S/, "Company Name cannot consist of only spaces"),

    firstName: Yup.string()
      .required("First Name is required")
      .matches(/\S/, "First Name cannot consist of only spaces"),

    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/\S/, "Last Name cannot consist of only spaces"),

    designation: Yup.string()
      .required("Designation is required")
      .matches(/\S/, "Designation  cannot consist of only spaces"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(/\S/, "Email  cannot consist of only spaces"),

    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .min(10, "Invalid Mobile Number")
      .max(10, "Invalid Mobile Number")
      .matches(/^[0-9]+$/, "Phone Number must only contain numbers"),
    numEmployees: Yup.string()
      .required("Number of Employees is required")
      .matches(/\S/, "Number of Employees   cannot consist of only spaces"),

    leadSource: Yup.mixed().required("Lead Source is required"),
    leadStatus: Yup.mixed().required("Lead Status is required"),
    leadPriority: Yup.mixed().required("Lead Priority is required"),
    address: Yup.string()
      .required("Address is required")
      .matches(/\S/, "Address  cannot consist of only spaces"),

    state: Yup.string()
      .required("State is required")
      .matches(/\S/, "State  cannot consist of only spaces"),

    country: Yup.mixed().required("Country is required"),
    zipcode: Yup.string()
      .required("Zip Code is required")
      .matches(/^[0-9]+$/, "Zip Code must only contain numbers"),
    district: Yup.string()
      .required("District is required")
      .matches(/\S/, "District  cannot consist of only spaces"),

    website: Yup.string(),
    alternatePhonenumber: Yup.number(),
    description: Yup.string(),
    assignee: Yup.string(),
    postalLocation: Yup.string()
      .required("City is required")
      .matches(/\S/, "City  cannot consist of only spaces"),
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { leadData, actionType } = location.state;
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const [editedLeadData, setEditedLeadData] = useState({
    ...leadData,
    assignee: {
      label: leadData?.assignee?.firstName,
      value: leadData?.assignee?.id,
    },
    country: {
      label: leadData?.country?.name,
      value: leadData?.country?._id,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [viewOnly, setViewOnly] = useState(false);
  const handleInputChange = (fieldName: string, value: any) => {
    formik.setFieldValue(fieldName, value);
    setEditedLeadData((prevData: any) => ({ ...prevData, [fieldName]: value }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const organization_id = auth?.data?.userRecord?.organization_id;
      const userId = auth?.data?.userRecord?.id;
      const leadPriority: any = editedLeadData?.leadPriority?.id;
      const leadSource: any = editedLeadData?.leadSource?.id;
      const leadStatus: any = editedLeadData?.leadStatus?.id;
      const country: any = editedLeadData?.country?.value;
      const assignee: any = editedLeadData?.assignee?.value;

      const dataToSend = {
        ...editedLeadData,
        organization_id,
        userId,
        leadPriority,
        leadSource,
        leadStatus,
        country,
        assignee,
      };

      await ALS.updateLead(dataToSend);
      navigate(-1);
    } catch (error: any) {
      setLoading(false);
      console.error("Error creating lead:", error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      if (!error?.response?.status) {
        toast.error(error?.message || "Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  // get lead source
  const [sourceOptions, setSourceOptions] = useState<SourceOption[]>([]);

  const getSource = async () => {
    let payload = {
      status: true,
      organization_id: auth?.data?.userRecord?.organization_id,
    };
    try {
      const response = await ALS.getSource(payload);
      const filteredData = (response.data || []).filter(
        (item: any) => item.status === true
      );
      setSourceOptions(filteredData);
    } catch (error) {
      console.error("Error fetching source data:", error);
    }
  };

  // get lead status
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);
  const getStatus = async () => {
    let payload = {
      status: true,
      organization_id: auth?.data?.userRecord?.organization_id,
    };
    try {
      const response = await ALS.getStatus(payload);
      const filteredData = (response.data || []).filter(
        (item: any) => item.status === true
      );

      setStatusOptions(filteredData);
    } catch (error) {
      console.error("Error fetching status data:", error);
    }
  };

  // get lead priority
  const [priorityOptions, setPriorityOptions] = useState<PriorityOption[]>([]);

  const getPriority = async () => {
    let payload = {
      status: true,
      organization_id: auth?.data?.userRecord?.organization_id,
    };
    try {
      const response = await ALS.getPriority(payload);
      const filteredData = (response.data || []).filter(
        (item: any) => item.status === true
      );
      setPriorityOptions(filteredData);
    } catch (error) {
      console.error("Error fetching priority data:", error);
    }
  };

  //get country
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
          value: country._id,
        })
      );

      setCountries(mappedCountries);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // get users
  const user: any = useSelector((state: any) => state.auth).data.userRecord;
  const [users, setUsers] = useState<{ label: any; value: any }[]>([]);
  const getUserData = async () => {
    try {
      const res = await getUserListForAdmin(user?.organization_id);
      const tempData: UserData[] = res.data.data;
      const userDataOptions = tempData.map(({ firstName, _id }) => ({
        label: firstName,
        value: _id,
      }));

      setUsers(userDataOptions);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSource();
    getStatus();
    getPriority();
    getAllCountries();
    getUserData();
    actionType === AUM_FORM_ACTION_TYPES[2]
      ? setViewOnly(true)
      : setViewOnly(false);
  }, []);
  const formik = useFormik({
    initialValues: {
      companyName: editedLeadData?.companyName,
      firstName: editedLeadData?.firstName,
      lastName: editedLeadData?.lastName,
      designation: editedLeadData?.designation,
      email: editedLeadData?.email,
      phoneNumber: editedLeadData?.phoneNumber,
      alternatePhonenumber: editedLeadData?.alternatePhoneNumber,
      website: editedLeadData?.website,
      leadSource: editedLeadData?.leadSource,
      leadStatus: editedLeadData?.leadStatus,
      leadPriority: editedLeadData?.leadPriority,
      numEmployees: editedLeadData?.numEmployees,
      address: editedLeadData?.address,
      assignee: editedLeadData?.assignee,
      zipcode: editedLeadData?.zipcode,
      state: editedLeadData?.state,
      country: editedLeadData?.country,
      description: editedLeadData?.description,
      district: editedLeadData?.district,
      postalLocation: editedLeadData?.postalLocation,
      comments: editedLeadData.comments,
    },
    validationSchema: validationSchema,
    onSubmit: handleUpdate,
    enableReinitialize: true,
  });
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          maxWidth: "1000px",
          margin: "10px",
          padding: "7px",
        }}
      >
        <Box sx={{ flex: 1, marginRight: "20px" }}>
          <Typography variant="h5" margin="left" gutterBottom>
            {actionType === AUM_FORM_ACTION_TYPES[2]
              ? "View Lead"
              : "Edit Lead"}
          </Typography>
          <CustomDivier style={{ marginTop: "0px" }} />

          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Company Name</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("companyName")}
              value={editedLeadData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName &&
                typeof formik.errors.companyName === "string"
                  ? formik.errors.companyName
                  : ""
              }
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
            />
          </Box>

          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>First Name</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("firstName")}
              value={editedLeadData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={
                formik.touched.firstName &&
                typeof formik.errors.firstName === "string"
                  ? formik.errors.firstName
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Last Name</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("lastName")}
              value={editedLeadData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={
                formik.touched.lastName &&
                typeof formik.errors.lastName === "string"
                  ? formik.errors.lastName
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Designation</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("designation")}
              value={editedLeadData.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={
                formik.touched.designation && Boolean(formik.errors.designation)
              }
              helperText={
                formik.touched.designation &&
                typeof formik.errors.designation === "string"
                  ? formik.errors.designation
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Email</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("email")}
              value={editedLeadData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email && typeof formik.errors.email === "string"
                  ? formik.errors.email
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>State</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("state")}
              value={editedLeadData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={
                formik.touched.state && typeof formik.errors.state === "string"
                  ? formik.errors.state
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1" paddingBottom={1}>
              <strong>Assignee</strong>
            </Typography>
            <Autocomplete
              options={users}
              // getOptionLabel={(option: any) =>
              //   option
              // }
              value={editedLeadData?.assignee || null}
              onChange={(_event, newValue) => {
                handleInputChange("assignee", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  fullWidth
                  size="small"
                />
              )}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 1, marginTop: "50px", marginLeft: "40px" }}>
          <Box sx={{}}>
            <Typography variant="subtitle1">
              <strong>Alternate Mobile Number:</strong>
            </Typography>
            <TextField
              type="text"
              value={editedLeadData.alternatePhonenumber}
              onChange={(e) =>
                handleInputChange("alternatePhonenumber", e.target.value)
              }
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Phone Number</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("phoneNumber")}
              value={editedLeadData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber &&
                typeof formik.errors.phoneNumber === "string"
                  ? formik.errors.phoneNumber
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Website</strong>
            </Typography>
            <TextField
              type="text"
              value={editedLeadData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
            />
          </Box>

          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1" paddingBottom={1}>
              <strong>Lead Source</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Autocomplete
              options={sourceOptions}
              getOptionLabel={(option: any) =>
                option.leadSource || "Select Lead Source"
              }
              value={editedLeadData.leadSource}
              onChange={(_event, newValue) => {
                handleInputChange("leadSource", newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("leadSource")}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.leadSource &&
                    Boolean(formik.errors.leadSource)
                  }
                  helperText={
                    formik.touched.leadSource &&
                    typeof formik.errors.leadSource === "string"
                      ? formik.errors.leadSource
                      : ""
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: "8px" }}>
            <Typography variant="subtitle1" paddingBottom={1}>
              <strong>Lead Status</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Autocomplete
              options={statusOptions}
              getOptionLabel={(option: any) =>
                option.leadStatus || "Select Lead Status"
              }
              value={editedLeadData.leadStatus}
              onChange={(_event, newValue) =>
                handleInputChange("leadStatus", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("leadStatus")}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.leadStatus &&
                    Boolean(formik.errors.leadStatus)
                  }
                  helperText={
                    formik.touched.leadStatus &&
                    typeof formik.errors.leadStatus === "string"
                      ? formik.errors.leadStatus
                      : ""
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1" paddingBottom={1}>
              <strong>Country</strong> <span style={{ color: "red" }}>*</span>
            </Typography>

            <Autocomplete
              options={countries}
              getOptionLabel={(option: any) =>
                option?.label || "Select country"
              }
              value={editedLeadData?.country}
              onChange={(_event, newValue) =>
                handleInputChange("country", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("country")}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={
                    formik.touched.country &&
                    typeof formik.errors.country === "string"
                      ? formik.errors.country
                      : ""
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Typography variant="subtitle1">
              <strong>Description:</strong>
            </Typography>
            <TextField
              type="textArea"
              multiline
              rows={3}
              maxRows={Infinity}
              value={editedLeadData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
            />
          </Box>
        </Box>
        <Box sx={{ flex: 1, marginTop: "47px", marginLeft: "40px" }}>
          <Box sx={{ marginTop: "px" }}>
            <Typography variant="subtitle1" paddingBottom={1}>
              <strong>Lead Priority</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Autocomplete
              options={priorityOptions}
              getOptionLabel={(option: any) =>
                option.leadPriority || "Select Lead Priority"
              }
              value={editedLeadData.leadPriority}
              onChange={(_event, newValue) =>
                handleInputChange("leadPriority", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("leadPriority")}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.leadPriority &&
                    Boolean(formik.errors.country)
                  }
                  helperText={
                    formik.touched.leadPriority &&
                    typeof formik.errors.leadPriority === "string"
                      ? formik.errors.leadPriority
                      : ""
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ marginTop: "12px" }}>
            <Typography variant="subtitle1">
              <strong>Number of Employees</strong>{" "}
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              value={editedLeadData.numEmployees}
              onChange={(e) =>
                handleInputChange("numEmployees", e.target.value)
              }
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Address</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("address")}
              value={editedLeadData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={
                formik.touched.address &&
                typeof formik.errors.address === "string"
                  ? formik.errors.address
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>Zipcode</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("zipcode")}
              value={editedLeadData.zipcode}
              onChange={(e) => handleInputChange("zipcode", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
              helperText={
                formik.touched.zipcode &&
                typeof formik.errors.zipcode === "string"
                  ? formik.errors.zipcode
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>District</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("district")}
              value={editedLeadData.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={
                formik.touched.district &&
                typeof formik.errors.district === "string"
                  ? formik.errors.district
                  : ""
              }
            />
          </Box>
          <Box sx={{ marginTop: "5px" }}>
            <Typography variant="subtitle1">
              <strong>City</strong> <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              type="text"
              {...formik.getFieldProps("postalLocation")}
              value={editedLeadData.postalLocation}
              onChange={(e) =>
                handleInputChange("postalLocation", e.target.value)
              }
              variant="outlined"
              fullWidth
              margin="dense"
              inputProps={{ readOnly: viewOnly }}
              size="small"
              onBlur={formik.handleBlur}
              error={
                formik.touched.postalLocation &&
                Boolean(formik.errors.postalLocation)
              }
              helperText={
                formik.touched.postalLocation &&
                typeof formik.errors.postalLocation === "string"
                  ? formik.errors.postalLocation
                  : ""
              }
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        {viewOnly ? null : (
          <>
            <Button
              color="primary"
              onClick={() => navigate(-1)}
              style={{ marginRight: "5px" }}
            >
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              loading={loading}
              disabled={loading}
            >
              Update
            </LoadingButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LeadManagementEditView;

/** @format */

import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  InputLabel,
} from "@mui/material";
import {
  ActionIconButton,
  ActionItems,
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
} from "../../../../components/MUI/mui.index.tsx";
import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../../data/AppConst.ts";
import ALS from "../../../../services/admin/leadManagement.service.tsx";
import reqdemoservice from "../../../../services/requestdemoservice/requestdemo.service.ts";
import { useAppSelector } from "../../../../hooks/index.ts";
import { CustomDivier } from "../../../../components/APP/app.index.tsx";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useNavigate, generatePath } from "react-router-dom";
import { APP_ROUTES } from "../../../../data/AppRoutes.ts";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomCellRenderValues from "../../../../../src/components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import { useSelector } from "react-redux";
import { getUserListForAdmin } from "../../../../components/com_components/CustomerSettingsAPI";
import { PropagateLoader } from "react-spinners";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { COLORS } from "../../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import FilterListIcon from "@mui/icons-material/FilterList";
interface SourceOption {
  label: any;
  _id: string;
}
interface StatusOption {
  leadStatus: any;
  _id: string;
}
interface PriorityOption {
  priority: string;
  leadPriority: any;
  _id: string;
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
const LeadManagement = () => {
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

    leadSource: Yup.string().required("Lead Source is required"),
    leadStatus: Yup.string().required("Lead Status is required"),
    leadPriority: Yup.string().required("Lead Priority is required"),
    address: Yup.string()
      .required("Address is required")
      .matches(/\S/, "Address  cannot consist of only spaces"),

    state: Yup.string()
      .required("State is required")
      .matches(/\S/, "State  cannot consist of only spaces"),

    country: Yup.string().required("Country is required"),
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

  const [openCreateLeadDialog, setOpenCreateLeadDialog] = useState(false);
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const initialFormState = {
    companyName: "",
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    phoneNumber: "",
    alternatePhonenumber: "",
    website: "",
    numEmployees: "",
    leadSource: "",
    leadStatus: "",
    leadPriority: "",
    address: "",
    state: "",
    country: "",
    zipcode: "",
    district: "",
    description: "",
    postalLocation: "",
    assignee: "",
  };
  const [_value, setValue] = useState<any>(initialFormState);
  const [openModel, setOpenModel] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    fromDate: "",
    toDate: "",
    companyName: "",
    name: "",
    designation: "",
    phoneNumber: "",
    email: "",
  });
  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };
  // const getListWithFilters = () => {
  //     getList(filterOptions);
  //   };

  const handleCancel = () => {
    setValue(initialFormState);
    setOpenCreateLeadDialog(false);
    formik.resetForm();
  };
  const formik: any = useFormik({
    initialValues: initialFormState,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const organization_id = auth?.data?.userRecord?.organization_id;
        const userId = auth?.data?.userRecord?.id;
        const dataToSend = { ...values, organization_id, userId };
        setSubmitting(true);

        await ALS.createLead(dataToSend);
        setOpenCreateLeadDialog(false);
        formik.resetForm();
        getList(filterOptions);
      } catch (error: any) {
        console.error("Error creating lead:", error);
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (!error?.response?.status) {
          toast.error(error?.message || "Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

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

  //get lead status
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

  // get country

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

  // get user
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

  // edit and view
  const navigate = useNavigate();

  const handleEdit = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.CRM?.LEADMANAGEMENT?.EDIT?.pathName,
      { id: rowItem?._id }
    );
    navigate(pathUrl, {
      state: {
        leadData: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[1],
      },
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.CRM?.LEADMANAGEMENT?.VIEW?.pathName,
      { id: rowItem?._id }
    );
    navigate(pathUrl, {
      state: {
        leadData: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };

  // list table

  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const getList = async (_filterParams: any) => {
    try {
      const organization_id = auth?.data?.userRecord?.organization_id;

      let payload = {
        organization_id,
        skip: pageSize * (page - 1),
        limit: pageSize,
        fromDate: filterOptions?.fromDate,
        toDate: filterOptions?.toDate,
        companyName: filterOptions?.companyName,
        firstName: filterOptions?.name,
        designation: filterOptions?.designation,
        phoneNumber: filterOptions?.phoneNumber,
        email: filterOptions?.email,
      };

      let listData = await ALS.getAll(payload);
      const modifiedDataList = listData.data.data.map((data: any) => ({
        ...data,
        Name: `${data.firstName} ${data.lastName}`,
      }));
      // const dataList = listData.data;
      // dataList?.map((data:any) =>{
      //   const first = data?.firstName;
      //   const last = data?.lastName;
      //   const fullName = first+ " "+last
      //   // data.firstName=fullName;
      // })
      setTableData(modifiedDataList.reverse() || []);
      setTotalData(listData.data?.count > 0 ? listData?.data?.count : 0);
      setLoading(false);
    } catch (e) {
      console.log("Error fetching data:", e);
      setLoading(false);
    }
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Company Name",
      field: "companyName",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "companyName",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: " Name",
      field: "Name",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "Name",
      },
      ...GetHeaderParams(),
    },
    // {
    //   headerName: "Last Name",
    //   field: "lastName",
    //   filter: true,
    //   width: 400,
    //   cellStyle: { textTransform: "capitalize" },
    //   suppressMovable: true,
    //   cellRenderer: CustomCellRenderValues,
    //   cellRendererParams: {
    //     field: "lastName",
    //   },
    //   ...GetHeaderParams(),
    // },
    {
      headerName: "Designation",
      field: "designation",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "designation",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Phone Number",
      field: "phoneNumber",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "phoneNumber",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Email",
      field: "email",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "email",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Actions",
      field: "",
      width: 400,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          // can_cancel: true,
          // can_delete: true,

          can_edit: true,
          can_view: true,
        },
        handleEdit: handleEdit,
        handleView: handleView,
        enableActions: ACTION_ICON_TYPES,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
  useEffect(() => {
    getSource();
    getStatus();
    getPriority();
    getAllCountries();
    getUserData();
  }, []);

  useEffect(() => {
    getList(filterOptions);
  }, [page, pageSize, filterOptions]);

  // const token = auth.data.userRecord.token;
  const handleZipcodeChange = async (zipcode: any) => {
    try {
      const countryCode = "IN";
      const result = await ALS.zipCode(zipcode, countryCode);

      const { state, district, postalLocation } = result.data.result[0];

      formik.setValues({
        ...formik.values,
        state,
        district,

        postalLocation,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <Grid container xs={12} padding={2}>
        <Grid xs={12}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Lead Management
            </Typography>
            <Box sx={{ padding: 0, display: "flex", columnGap: 1 }}>
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
                  getList(filterOptions);
                }}
              />
              <Button
                variant="contained"
                onClick={() => setOpenCreateLeadDialog(true)}
                sx={{ height: 38 }}
              >
                <Add sx={{ fontSize: 18, mr: 1 }} /> Add
              </Button>
              <Grid item xs={1}>
                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[11]}
                  sx={{
                    background: COLORS.primary,
                    borderRadius: 1,
                    width: 38,
                    height: 38,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  onClick={() => {
                    setOpenModel(true);
                  }}
                  title="Filter"
                >
                  <FilterListIcon sx={{ color: "white", fontSize: 16 }} />
                </ActionIconButton>
              </Grid>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <CustomDivier style={{ marginTop: "0px" }} />

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
            serverSidePagination={true}
            pageSize={pageSize}
            totalDataCount={totalData}
            serverRowSize={pageSize}
            currentPage={page}
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

      {/* Create Lead Dialog */}
      <Dialog
        open={openCreateLeadDialog}
        maxWidth="md"
        fullWidth
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            setOpenCreateLeadDialog(false);
          }
        }}
        sx={{ "& .MuiDialog-paper": { maxWidth: "60%" } }}
      >
        <DialogTitle>Create Lead</DialogTitle>
        <CustomDivier />
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Company Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  placeholder="Company Name"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "-5px" }}
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("companyName")}
                  error={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  First Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  placeholder="First Name"
                  style={{ marginTop: "-5px" }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("firstName")}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Last Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  placeholder="Last Name"
                  style={{ marginTop: "-5px" }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("lastName")}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>

              {/* Column 2 */}
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Designation<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  placeholder="Designation"
                  style={{ marginTop: "-5px" }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("designation")}
                  error={
                    formik.touched.designation &&
                    Boolean(formik.errors.designation)
                  }
                  helperText={
                    formik.touched.designation && formik.errors.designation
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Email Id<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  placeholder="Enter Email Id"
                  style={{ marginTop: "-5px" }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Phone Number<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="Enter Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  type="number"
                  {...formik.getFieldProps("phoneNumber")}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Alternate Mobile Number
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="Enter Alternate Number (optional)"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  type="number"
                  value={formik.values.alternatePhonenumber || ""}
                  onChange={(e) =>
                    formik.setFieldValue("alternatePhonenumber", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Website
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="Enter Website"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  value={formik.values.website || ""}
                  onChange={(e) =>
                    formik.setFieldValue("website", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Number of Employees <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="Enter number of Employees Website"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("numEmployees")}
                  error={
                    formik.touched.numEmployees &&
                    Boolean(formik.errors.numEmployees)
                  }
                  helperText={
                    formik.touched.numEmployees && formik.errors.numEmployees
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Lead Source <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={sourceOptions}
                  getOptionLabel={(option: any) =>
                    option.leadSource || "Select Lead Source"
                  }
                  value={formik.values.leadSource?._id}
                  onChange={(_event, newValue: any) =>
                    // (
                    // return {

                    // })
                    {
                      formik.setFieldValue("leadSource", newValue?.id || "");
                    }
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      name="leadSource"
                      style={{ marginTop: "-5px" }}
                      placeholder="Select Lead Source"
                      variant="outlined"
                      fullWidth
                      {...formik.getFieldProps("leadSource")}
                      error={
                        formik.touched.leadSource &&
                        Boolean(formik.errors.leadSource)
                      }
                      helperText={
                        formik.touched.leadSource && formik.errors.leadSource
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Lead Status <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={statusOptions}
                  getOptionLabel={(option: any) =>
                    option.leadStatus || "Select Lead Status"
                  }
                  value={formik.values.leadStatus?._id}
                  onChange={(_event, newValue: any) =>
                    formik.setFieldValue("leadStatus", newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      style={{ marginTop: "-5px" }}
                      placeholder="Select Lead Source"
                      variant="outlined"
                      fullWidth
                      {...formik.getFieldProps("leadStatus")}
                      error={
                        formik.touched.leadStatus &&
                        Boolean(formik.errors.leadStatus)
                      }
                      helperText={
                        formik.touched.leadStatus && formik.errors.leadStatus
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Lead Priority <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={priorityOptions}
                  getOptionLabel={(option: any) =>
                    option.leadPriority || "Select Lead Priority"
                  }
                  value={formik.values.leadPriority?._id}
                  onChange={(_event, newValue: any) =>
                    formik.setFieldValue("leadPriority", newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      style={{ marginTop: "-5px" }}
                      placeholder="Select Lead Priority"
                      variant="outlined"
                      fullWidth
                      {...formik.getFieldProps("leadPriority")}
                      error={
                        formik.touched.leadPriority &&
                        Boolean(formik.errors.leadPriority)
                      }
                      helperText={
                        formik.touched.leadPriority &&
                        formik.errors.leadPriority
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Assignee <span style={{ color: "red" }}></span>
                </InputLabel>
                <AutoComplete
                  options={users}
                  getOptionLabel={(option: any) =>
                    option.label || "Select Assignee"
                  }
                  value={formik.values.assignee?.value}
                  onChange={(_event, newValue: any) => {
                    formik.setFieldValue("assignee", newValue?.value || "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      style={{ marginTop: "-5px" }}
                      placeholder="Select Assignee"
                      variant="outlined"
                      fullWidth
                      {...formik.getFieldProps("assignee")}
                      error={
                        formik.touched.assignee &&
                        Boolean(formik.errors.assignee)
                      }
                      helperText={
                        formik.touched.assignee && formik.errors.assignee
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Zipcode <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="Zipcode / pincode"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("zipcode")}
                  error={
                    formik.touched.zipcode && Boolean(formik.errors.zipcode)
                  }
                  helperText={formik.touched.zipcode && formik.errors.zipcode}
                />
              </Grid>
              <DialogActions sx={{ marginTop: "20px" }}>
                <Button
                  onClick={() => handleZipcodeChange(formik.values.zipcode)}
                >
                  Get
                </Button>{" "}
              </DialogActions>

              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Country <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={countries}
                  getOptionLabel={(option: any) =>
                    option.label || "Select Country"
                  }
                  value={formik.values.country?._id}
                  onChange={(_event, newValue: any) =>
                    formik.setFieldValue("country", newValue?._id || "")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      style={{ marginTop: "-5px" }}
                      placeholder="Select Country"
                      variant="outlined"
                      fullWidth
                      {...formik.getFieldProps("country")}
                      error={
                        formik.touched.country && Boolean(formik.errors.country)
                      }
                      helperText={
                        formik.touched.country && formik.errors.country
                      }
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  State <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="State"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("state")}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  District <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="District"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("district")}
                  error={
                    formik.touched.district && Boolean(formik.errors.district)
                  }
                  helperText={formik.touched.district && formik.errors.district}
                />
              </Grid>

              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  City <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="City"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("postalLocation")}
                  error={
                    formik.touched.postalLocation &&
                    Boolean(formik.errors.postalLocation)
                  }
                  helperText={
                    formik.touched.postalLocation &&
                    formik.errors.postalLocation
                  }
                />
              </Grid>

              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Address <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px", height: "-35px" }}
                  placeholder="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    style: {
                      height: "40px",
                    },
                  }}
                  {...formik.getFieldProps("address")}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Description (Optional)
                </InputLabel>
                <TextField
                  label=""
                  style={{ marginTop: "-5px" }}
                  placeholder="Description (Optional)"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  sx={{ width: "80%" }}
                  value={formik.values.description || ""}
                  onChange={(e) =>
                    formik.setFieldValue("description", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCancel()}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <ActionModal
        open={openModel}
        onClose={() => {
          setOpenModel(false);
        }}
        title="Advance filter | select atleast one filter"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box style={{ width: "100%" }}>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6} sx={{ height: "30px" }}>
                <TextField
                  fullWidth
                  label="From Date"
                  type="date"
                  name="fromDate"
                  size="small"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    handleFilterChange("fromDate", selectedDate);
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions?.fromDate}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="To Date"
                  type="date"
                  name="toDate"
                  size="small"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    handleFilterChange("toDate", selectedDate);
                  }}
                  InputLabelProps={{ shrink: true }}
                  value={filterOptions?.toDate}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  type="text"
                  size="small"
                  onChange={(e: any) => {
                    handleFilterChange("companyName", e.target.value);
                  }}
                  value={filterOptions?.companyName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Name"
                  type="text"
                  size="small"
                  onChange={(e: any) => {
                    handleFilterChange("name", e.target.value);
                  }}
                  value={filterOptions?.name}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  type="text"
                  size="small"
                  onChange={(e: any) => {
                    handleFilterChange("designation", e.target.value);
                  }}
                  value={filterOptions?.designation}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="text"
                  size="small"
                  onChange={(e: any) => {
                    handleFilterChange("phoneNumber", e.target.value);
                  }}
                  value={filterOptions?.phoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="text"
                  size="small"
                  onChange={(e: any) => {
                    handleFilterChange("email", e.target.value);
                  }}
                  value={filterOptions?.email}
                />
              </Grid>
              <Box
                style={{ width: "100%", marginTop: "20px", marginLeft: "35px" }}
              >
                <Grid container xs={12} spacing={4}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setOpenModel(false);
                        setFilterOptions({
                          fromDate: "",
                          toDate: "",
                          companyName: "",
                          name: "",
                          designation: "",
                          phoneNumber: "",
                          email: "",
                        });
                        getList(filterOptions);
                      }}
                    >
                      Clear
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setOpenModel(false);
                        if (page != 1) {
                          setPage(1);
                        } else {
                          getList(filterOptions);
                        }
                      }}
                    >
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Box>
      </ActionModal>
    </div>
  );
};

export default LeadManagement;

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

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import _ from "lodash";
// ************* MUI Components
import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

// Components ******************
import {
  Textfield,
  AutoComplete,
  ContainerBoxV2,
  LoadingButtonV1,
} from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";

// **************** Service
import { organizationSchema } from "../../../../data/yup/admin/addedit-usermanagement";

// ************ costant data ***********
import { AUM_FORM_ACTION_TYPES } from "../../../../data/AppConst";
import LocalStorage from "../../../../libs/localStorage.service";
import { APP_ROUTES } from "../../../../data/AppRoutes";
import requestdemoService from "../../../../services/requestdemoservice/requestdemo.service";
import OrganizationService from "../../../../services/super-admin/organization/organization.service";
import { COLORS } from "../../../../utils/globals.ts";

function prospValue(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    isAdd: locationState?.actionType === AUM_FORM_ACTION_TYPES[0],
    isEdit: locationState?.actionType === AUM_FORM_ACTION_TYPES[1],
    isView: locationState?.actionType === AUM_FORM_ACTION_TYPES[2],
    id: locationState?.userId,
    data: locationState?.data,
  };
}

interface ApiResponse {
  id: string;
  name: string;
}
function AddEditViewOrganization(props: any) {
  const location = useLocation();
  let { isAdd, isEdit, isView, data } = prospValue(props, location?.state);

  const navigate = useNavigate();
  //   const router = useRouter();
  const [formData, setFormData] = useState<Record<string, unknown | any>>({
    organizationName: null,
    contactPerson: null,
    emailAddress: null,
    contactNumber: null,
    password: null,
    gstNumber: null,
    organizationType: null,
    address: null,
    noOfUsers: null,
    status: true,
  });

  const [loading, setLoading] = useState(false);

  const [organizationTypeOptions, setOrganizationTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [_localstorageData, setLocalStorageData] = useState<
    Record<string, any>
  >({});
  const handleSubmit = async (value: Record<string, any>) => {
    try {
      const cloneFormData = _.cloneDeep(value);
      setLoading(true);
      let payloadData = {
        ...cloneFormData,
        organizationName: cloneFormData?.organizationName,
        contactPerson: cloneFormData?.contactPerson,
        emailAddress: cloneFormData?.emailAddress,
        contactNumber: cloneFormData?.contactNumber,
        password: cloneFormData?.password,
        gstNumber: cloneFormData?.gstNumber,
        organizationType: cloneFormData?.organizationType?.value,
        address: cloneFormData?.address,
        noOfUsers: cloneFormData?.noOfUsers,
        status: cloneFormData?.status,
      };
      payloadData = JSON.parse(JSON.stringify(payloadData));
      if (isEdit) {
        // let _updatedOrganization: Record<string, any> =
        await OrganizationService.updateOrganization(data?.id, payloadData);
        setLoading(false);
      } else {
        // let _newOrganization: Record<string, any> =
        await OrganizationService.createOrganization(payloadData);
        setLoading(false);
        // console.log('newOrganization', newOrganization);
      }
      // Return to list page
      navigate(APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.pathName);
      // helperFn.reset()
    } catch (error: any) {
      // toast.error('Something went wrong 123', {
      //   className: 'toast-error',
      // });
      setLoading(false);

      // enqueueSnackbar(`${error?.response?.data?.message}`, {
      //   variant: "error",
      //   anchorOrigin: {
      //     vertical: "top",
      //     horizontal: "right",
      //   },
      // });
    }
  };

  const getIndustryType = async () => {
    try {
      const response = await requestdemoService.getIndustryType();
      if (!response) {
        throw new Error("No data received");
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
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getIndustryType();
  }, []);

  const formik = useFormik({
    validationSchema: organizationSchema({ isView, isEdit }),
    onSubmit: handleSubmit,
    initialValues: formData,
    enableReinitialize: isEdit || isView,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  // ******************** Initial data
  useEffect(() => {
    setLocalStorageData(
      LocalStorage.parseObj(LocalStorage.getItem("userData") || "{}")
    );
  }, []);

  const getOrganization = async () => {
    let org: any = await OrganizationService.getOneOrganization(
      data?._id as string
    );
    setFormData({
      organizationName: org?.data?.data?.organizationName,
      contactPerson: org?.data?.data?.contactPerson,
      emailAddress: org?.data?.data?.emailAddress,
      contactNumber: org?.data?.data?.contactNumber,
      gstNumber: org?.data?.data?.gstNumber,
      address: org?.data?.data?.address,
      noOfUsers: org?.data?.data?.noOfUsers,
      organizationType: {
        label: org?.data?.data?.organizationType?.name,
        value: org?.data?.data?.organizationType?.id,
      },
      status: data?.status,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      getOrganization();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ContainerBoxV2>
        <Grid
          container
          xs={12}
          style={{
            height: "auto",
            width: "100%",
          }}
        >
          <Grid container item xs={12}>
            <Typography style={{ fontWeight: "bold" }}>
              {`${isAdd ? "Add" : isEdit ? "Update" : "View"} Organization`}
            </Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Grid
          container
          xs={12}
          style={{
            height: "auto",
            width: "100%",
            marginTop: 5,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container item xs={12} spacing={6}>
              <Grid container item xs={12} spacing={1}>
                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        Organization Name{" "}
                        <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter the Organization Name"
                    type="text"
                    name="organizationName"
                    value={formik?.values?.organizationName?.trim()}
                    onChange={formik.handleChange}
                    error={getError(formik, "organizationName")?.isTrue}
                    helperText={
                      getError(formik, "organizationName")?.isTrue &&
                      getError(formik, "organizationName")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Grid>
                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        Contact Person <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter the Contact Person"
                    type="text"
                    name="contactPerson"
                    value={formik?.values?.contactPerson?.trim()}
                    onChange={formik.handleChange}
                    error={getError(formik, "contactPerson")?.isTrue}
                    helperText={
                      getError(formik, "contactPerson")?.isTrue &&
                      getError(formik, "contactPerson")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Grid>
                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        Email Address <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter email"
                    type="text"
                    name="emailAddress"
                    value={formik?.values?.emailAddress?.trim()}
                    onChange={formik.handleChange}
                    error={getError(formik, "emailAddress")?.isTrue}
                    helperText={
                      getError(formik, "emailAddress")?.isTrue &&
                      getError(formik, "emailAddress")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        Contact Number <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter Contact Number"
                    type="text"
                    name="contactNumber"
                    value={
                      formik?.values?.contactNumber
                      // ? formik?.values?.contactNumber?.trim()
                      // : formik?.values?.contactNumber
                    }
                    onChange={formik.handleChange}
                    error={getError(formik, "contactNumber")?.isTrue}
                    helperText={
                      getError(formik, "contactNumber")?.isTrue &&
                      getError(formik, "contactNumber")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*", // Optionally, you can also use the pattern attribute to enforce numeric input
                    }}
                  />
                </Grid>
                <Grid container item xs={4}>
                  <AutoComplete
                    options={organizationTypeOptions}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label={
                          <>
                            Organization Type{" "}
                            <span style={{ color: "red" }}>*</span>
                          </>
                        }
                        fullWidth
                        type="text"
                        name="organizationType"
                        placeholder="Select Organization Type"
                        error={getError(formik, "organizationType")?.isTrue}
                        helperText={
                          getError(formik, "organizationType")?.isTrue &&
                          getError(formik, "organizationType")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.organizationType}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue("organizationType", selectedOption);
                    }}
                    disabled={isView}
                  />
                </Grid>

                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        No of Users <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter No of Users"
                    type="text"
                    name="noOfUsers"
                    value={formik?.values?.noOfUsers?.trim()}
                    onChange={formik.handleChange}
                    error={getError(formik, "noOfUsers")?.isTrue}
                    helperText={
                      getError(formik, "noOfUsers")?.isTrue &&
                      getError(formik, "noOfUsers")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                {isAdd && (
                  <Grid container item xs={4}>
                    <Textfield
                      label={
                        <>
                          Password <span style={{ color: "red" }}>*</span>
                        </>
                      }
                      placeholder="Enter password"
                      type="text"
                      name="password"
                      value={formik?.values?.password?.trim()}
                      onChange={formik.handleChange}
                      error={getError(formik, "password")?.isTrue}
                      helperText={
                        getError(formik, "password")?.isTrue &&
                        getError(formik, "password")?.message
                      }
                      fullWidth
                      onBlur={formik?.handleBlur}
                    />
                  </Grid>
                )}
                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        GST Number <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter GST Number"
                    type="text"
                    name="gstNumber"
                    value={formik?.values?.gstNumber?.trim()}
                    onChange={formik.handleChange}
                    error={getError(formik, "gstNumber")?.isTrue}
                    helperText={
                      getError(formik, "gstNumber")?.isTrue &&
                      getError(formik, "gstNumber")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Grid>
                <Grid container item xs={4}>
                  <Textfield
                    label={
                      <>
                        Address <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    placeholder="Enter Address"
                    type="text"
                    name="address"
                    value={formik?.values?.address?.trim()}
                    onChange={formik.handleChange}
                    error={getError(formik, "address")?.isTrue}
                    helperText={
                      getError(formik, "address")?.isTrue &&
                      getError(formik, "address")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Grid>
              </Grid>
            </Grid>
            {!isView && (
              <Grid
                container
                item
                xs={12}
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
              >
                <LoadingButtonV1
                  type="submit"
                  sx={{
                    mt: 2,
                    background: COLORS.primary,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  loading={loading}
                >
                  {isAdd ? "Submit" : "Update"}
                </LoadingButtonV1>
              </Grid>
            )}
          </form>
        </Grid>
      </ContainerBoxV2>
    </>
  );
}

export default AddEditViewOrganization;

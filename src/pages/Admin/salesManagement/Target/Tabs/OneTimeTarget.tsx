import { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  ButtonV1,
  ContainerBoxV2,
  Textfield,
} from "../../../../../components/MUI/mui.index";
import { Autocomplete, Box, Grid, InputLabel,CircularProgress } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import _ from "lodash";
import { getUserListForAdmin } from "../../../../../components/com_components/CustomerSettingsAPI.tsx";
import { useAppSelector } from "../../../../../hooks";
import SalesTargetService from "../../../../../services/admin/salesTarget/salestarget.service.ts";
import { generatePath, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../../../src/data/AppRoutes.ts";
import { enqueueSnackbar } from "notistack";
// import moment from "moment";
import moment from "moment-timezone";
import { TIME_ZONE } from "../../../../../../src/data/AppConst.ts";



function OneTimeTarget() {
  const [formData, _setFormData] = useState<Record<string, unknown | any>>({
    targetType: null,
    users: [],
    fromDate: "",
    toDate: "",
    targetValue: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const auth = useAppSelector((state: any) => state.auth);
  console.log("auth", auth);

  let { organization_id, id, firstName, lastName } = auth?.data?.userRecord;

  console.log("auth", firstName, lastName);

  const [users, setUsers] = useState([]);

  const ValidationSchema = () => {
    return yup.object().shape({
      fromDate: yup.string().trim().required("From Date is required"),
      toDate: yup.string().trim().required("To Date is required"),
      users: yup.array().min(1, "At least one option must be selected"),
      targetType: yup
        .object()
        .shape({
          label: yup.string().required("Target Type is required"),
          value: yup.string().required("Target Type is required"),
        })
        .required("Target Type is required"),
      targetValue: yup.number().required("Target Value is required"),
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (value: Record<string, any>) => {
    let payload = {
      organization: organization_id,
      fromDate: value.fromDate,
      toDate: value.toDate,
      targetType: value.targetType.label,
      targetValue: value.targetValue,
      allocatedUsers: value.users,
      isOneTimeOrRecurring: "ONE_TIME",
      createdBy: id,
      createdUser: `${firstName} ${lastName}`,
    };
    setLoading(true);
    setDisabled(true);
    try {
      const response = await SalesTargetService.createNewTarget(payload);
      if (response.status === 200) {
        const path = generatePath(
          APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.pathName
        );
        navigate(path);
      }
    } catch (error: any) {
      let errorMsg = error.response.data.message;
      if (error) {
        enqueueSnackbar(`${errorMsg || "Something went wrong"}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      console.error('ERROR', error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const formik = useFormik({
    validationSchema: ValidationSchema,
    onSubmit: handleSubmit,
    initialValues: formData,
    enableReinitialize: true,
  });

  console.log(
    "formikformik",
    new Date(1710873000000)?.toISOString()?.split("T")[0]
  );

  const getUserData = async () => {
    await getUserListForAdmin(organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setUsers(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const TARGET_TYPE = [
    { label: "QUANTITY", value: "QUANTITY" },
    { label: "VALUE", value: "VALUE" },
    // { label: 'SALES COUNT', value: 'SALES COUNT' },
  ];

  const inputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e: any) => {
      e.preventDefault();
    };

    const inputElement: any = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        inputElement.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <>
      <ContainerBoxV2>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "10px" }}>
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
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Target Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <AutoComplete
                    options={TARGET_TYPE}
                    value={formik?.values?.targetType || null}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type="text"
                        name="targetType"
                        placeholder="Select targetType"
                        error={getError(formik, "targetType")?.isTrue}
                        helperText={
                          getError(formik, "targetType")?.isTrue &&
                          getError(formik, "targetType")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue("targetType", selectedOption);
                    }}
                    fullWidth
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
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Users <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={users}
                    limitTags={1}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type="text"
                        name="users"
                        placeholder="Select users"
                        error={getError(formik, "users")?.isTrue}
                        helperText={
                          getError(formik, "users")?.isTrue &&
                          getError(formik, "users")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      console.log("selectedOption", selectedOption);
                      formik?.setFieldValue("users", selectedOption);
                    }}
                    size="small"
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid container item xs={3}>
                <Box sx={{ width: "100%" }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    From Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Textfield
                    placeholder="dd-mm-yyyy"
                    type="date"
                    name="fromDate"
                    // value={displayFromDate}
                    onChange={(e: any) => {
                      const date = moment.tz(e.target.value, TIME_ZONE);
                      const startOfDay = date.startOf("day").valueOf();
                      console.log("startOfDay", startOfDay);
                      formik?.setFieldValue("fromDate", startOfDay);
                    }}
                    error={getError(formik, "fromDate")?.isTrue}
                    helperText={
                      getError(formik, "fromDate")?.isTrue &&
                      getError(formik, "fromDate")?.message
                    }
                    inputProps={{
                      max:
                        formik?.values?.toDate !== ""
                          ? new Date(formik?.values?.toDate)
                              .toISOString()
                              .split("T")[0]
                          : null,
                    }}
                    onBlur={formik?.handleBlur}
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid container item xs={3}>
                <Box sx={{ width: "100%" }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    To Date <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Textfield
                    placeholder="dd-mm-yyyy"
                    type="date"
                    name="toDate"
                    onChange={(e: any) => {
                      const date: any = moment.tz(e.target.value, TIME_ZONE);
                      const endOfDay = date.endOf("day").valueOf();
                      formik?.setFieldValue("toDate", endOfDay);
                    }}
                    error={getError(formik, "toDate")?.isTrue}
                    helperText={
                      getError(formik, "toDate")?.isTrue &&
                      getError(formik, "toDate")?.message
                    }
                    inputProps={{
                      min:
                        formik?.values?.fromDate !== ""
                          ? moment
                              .tz(formik?.values?.fromDate, TIME_ZONE)
                              .format("YYYY-MM-DD")
                              .split("T")[0]
                          : null,
                    }}
                    onBlur={formik?.handleBlur}
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid container item xs={3}>
                <Box sx={{ width: "100%" }}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#181C32',
                    }}
                  >
                    Target {_.capitalize(formik?.values?.targetType?.label)}{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </InputLabel>

                  <Textfield
                    type="number"
                    name="targetValue"
                    onChange={(e: any) => {
                      formik?.setFieldValue("targetValue", e?.target?.value);
                    }}
                    error={getError(formik, "targetValue")?.isTrue}
                    helperText={
                      getError(formik, "targetValue")?.isTrue &&
                      getError(formik, "targetValue")?.message
                    }
                    onBlur={formik?.handleBlur}
                    fullWidth
                    inputRef={inputRef}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <ButtonV1
              type='submit'
              disabled={!formik.isValid || !formik.dirty || disabled}
              style={{
                height: 38,
                fontSize: 14,
                width: '10%',
                marginTop: '15px',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color='inherit' />
              ) : (
                'Submit'
              )}
            </ButtonV1>
          </Grid>
        </form>
      </ContainerBoxV2>
    </>
  );
}

export default OneTimeTarget;

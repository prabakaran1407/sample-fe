/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

// **************** Component
import {
  TextField_v2,
  ButtonV1,
  ActionConfirmation,
} from "../../components/MUI/mui.index";

// ******************** Formik
import { useFormik } from "formik";

// ************** MUI/** @format */

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// *************** Router
import { useNavigate } from "react-router-dom";

// ************* const
// ***************** Service
import { APP_ROUTES } from "../../data/AppRoutes";

// ***************** Service
// import { AxiosResponse } from "axios";
import LocalStorageService from "../../libs/localStorage.service";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser } from "../../redux/features/authSlice";
import "./style.css";
import { enqueueSnackbar } from "notistack";
// import LocalStorageService from '../../libs/localStorage.service.ts'
import vector from "../../assets/svg/Vector.svg";
import S10Login from "../../assets/svg/S10Login.svg";
import logo from "../../assets/png/logo.png";
import * as Yup from "yup";

// *********** service
import AUMService from "../../services/admin/UserManagemet.service.ts";
import LSService from "../../libs/localStorage.service.ts";
// ************ util
import { RANDOM_UNIQUE_STR } from "../../utils/getUnique.ts";
import { COLORS } from "../../utils/globals.ts";

export default function SignIn() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const auth = useAppSelector((state) => state.auth);
  console.log("auth redux:", auth);
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [isLoading, setIsLoading] = useState(false);

  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  async function beforeLogin(payload: Record<string, any>): Promise<any> {
    try {
      payload = {
        ...payload,
        isWebLogin: true,
      };
      let userresponse: any = await AUMService.getOneUserForLogin(payload);
      userresponse = userresponse?.data;
      if (userresponse?.status) {
        userresponse = userresponse?.response;
        let login_session = LSService.getItem("login_session");
        console.log("login_session", login_session);
        console.log("userresponse", userresponse?.loginSession);

        if (userresponse?.loginSession) {
          if (login_session && login_session === userresponse?.loginSession) {
            handleLogin(payload);
          } else {
            setOpenConfirmation({
              open: true,
              title: "Login Action",
              message: `Welcome! You are currently logged in on another device. Are you sure you want to continue on this device?`,
            });
          }
        } else {
          handleLogin(payload);
        }
      }
    } catch (error: any) {
      error = error?.response?.data;
      console.log("error >>>>", error);
      if (!error?.response?.status) {
        enqueueSnackbar(`${error?.message || "Something went wrong"}`, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleLogin(payloadData: any) {
    const payload = payloadData;

    if (openConfirmation.open) {
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    }

    setIsLoading(true);
    try {
      const user = {
        username: payload.username.replace(/\s+/g, ""),
        password: payload.password,
        isWebLogin: true,
        loginSession: RANDOM_UNIQUE_STR(),
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const resultAction: any = await dispatch(loginUser(user));
      const originalPromiseResult = unwrapResult(resultAction);
      if (
        originalPromiseResult &&
        originalPromiseResult?.data?.userRecord?.token
      ) {
        const token = originalPromiseResult?.data.userRecord.token;
        const userData = originalPromiseResult?.data.userRecord;

        LocalStorageService.setItem("token", token);
        LocalStorageService.setItem("userData", JSON.stringify(userData));
        LocalStorageService.setItem("login_session", userData?.loginSession);
        if (userData?.isSuperAdmin) {
          navigate(APP_ROUTES?.SUPER_ADMIN?.DASHBOARD?.pathName, {
            replace: true,
          });
        } else {
          navigate(APP_ROUTES?.ADMIN?.DASHBOARD?.pathName, {
            replace: true,
          });
        }
      } else {
        enqueueSnackbar(
          `${
            originalPromiseResult?.data?.message
              ? originalPromiseResult?.data?.message
              : "Invalid Username or Password"
          }`,
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (rejectedValueOrSerializedError: any) {
      console.log(
        "rejectedValueOrSerializedError",
        rejectedValueOrSerializedError
      );
      if (rejectedValueOrSerializedError.response.data === "Unauthorized") {
        enqueueSnackbar(
          `${
            rejectedValueOrSerializedError.response.data.message
              ? rejectedValueOrSerializedError.response.data.message
              : "Password Does Not Match"
          }`,
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      } else {
        enqueueSnackbar(
          `${
            rejectedValueOrSerializedError.response.data.message
              ? rejectedValueOrSerializedError.response.data.message
              : "Internal Server Error"
          }`,
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      }
      console.log(
        "rejectedValueOrSerializedError",
        rejectedValueOrSerializedError
      );
    }
    setIsLoading(false);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const signinSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: beforeLogin,
  });

  return (
    <>
      <Box
        sx={{
          height: "fit-content",
          minHeight: "100vh",
          backgroundImage: `url(${vector})`,
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "fit-content",
            minHeight: "85vh",
            width: "80%",
            background: "#fff",
            borderRadius: 3,
            boxShadow: "0 0.3rem 1rem rgba(0, 0, 0, 0.25)",
            p: 1,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    m: 1,
                  }}
                >
                  <img
                    src={logo}
                    alt="logo"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      fontSize: 22,
                      fontWeight: "600",
                      fontFamily: "Poppins",
                      color: "#181C32",
                      textAlign: "center",
                    }}
                    pl={1}
                  >
                    Sales10X
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: isMobile ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                  }}
                >
                  <img src={S10Login} width="80%" />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <form
                  onSubmit={formik.handleSubmit}
                  style={{ width: isMobile ? "90%" : "70%" }}
                >
                  <Typography
                    style={{
                      color: "#181C32",
                      fontSize: "30px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                    }}
                    mb={2}
                  >
                    Login{" "}
                    <span style={{ fontWeight: "300", marginLeft: 20 }}>|</span>
                    <span
                      style={{
                        fontSize: 16,
                        marginLeft: 20,
                        marginTop: 5,
                        // color: '#68409C',
                        color: COLORS.secondary,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(APP_ROUTES?.REQUEST_DEMO?.pathName);
                      }}
                    >
                      Request Demo?
                    </span>
                  </Typography>
                  <Typography
                    style={{
                      color: "#181C32",
                      fontSize: "20px",
                      fontWeight: "500",
                      // display: isMobile ? "none" : "",
                    }}
                    mb={4}
                  >
                    Welcome Onboard With Us!
                  </Typography>
                  <Box pb={3}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Username<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={formik?.values?.username}
                      onBlur={formik?.handleBlur}
                      onChange={formik.handleChange}
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.username && formik.errors.username
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.username && formik.errors.username && (
                      <Typography variant="body2" color="error">
                        {formik.errors.username}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Password<span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik?.values?.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      placeholder="Enter your password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <Visibility fontSize="small" />
                            ) : (
                              <VisibilityOff fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: `1px solid ${
                          formik.touched.password && formik.errors.password
                            ? "red"
                            : "#F5F8FA"
                        }`,
                      }}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <Typography variant="body2" color="error">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "end" }}
                    pt={1}
                    pb={5}
                  >
                    {/* <Typography
                      style={{ color: COLORS.secondary, cursor: "pointer" }}
                      onClick={() => {
                        navigate(APP_ROUTES?.FORGOT_PASSWORD?.pathName);
                      }}
                    >
                      Forgot Password?
                    </Typography> */}
                  </Box>

                  <ButtonV1
                    type="submit"
                    style={{
                      background:
                        isLoading ||
                        !formik.isValid ||
                        !formik.values.username ||
                        !formik.values.password
                          ? "#B0A4BF"
                          : `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                      borderRadius: "7px",
                      border: `1px ${
                        isLoading ||
                        !formik.isValid ||
                        !formik.values.username ||
                        !formik.values.password
                          ? "#B0A4BF"
                          : COLORS.primary
                      } solid`,
                      color: "#ffff",
                      fontSize: 16,
                      fontWeight: "600",
                      height: 40,
                      textTransform: "none",
                      cursor:
                        isLoading ||
                        !formik.isValid ||
                        !formik.values.username ||
                        !formik.values.password
                          ? "not-allowed"
                          : "pointer",
                    }}
                    fullWidth
                    disabled={
                      isLoading ||
                      !formik.isValid ||
                      !formik.values.username ||
                      !formik.values.password
                    }
                  >
                    {isLoading ? <div className="spinner"></div> : "Login"}
                  </ButtonV1>
                  {/* <Typography mt={1} sx={{ textAlign: "center" }}>
                    Don't have an account?{" "}
                    <span
                      style={{
                        color: COLORS.secondary,
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(APP_ROUTES?.SIGN_UP?.pathName);
                      }}
                    >
                      Register
                    </span>
                  </Typography> */}
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          console.log("Action confirm");
          handleLogin(formik?.values);
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

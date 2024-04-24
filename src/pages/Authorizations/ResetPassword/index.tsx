/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

// **************** Component
import {
  ContainerWrapper,
  ContainerBoxV2,
  LoadingButton_v1,
  TextField_v2,
} from "../../../components/MUI/mui.index";

// ******************** Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// ************** MUI
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

// *************** Router
import { useNavigate } from "react-router-dom";

// ************* const
import { APP_ROUTES } from "../../../data/AppRoutes";
import GridImg from "../../../assets/png/Group.png";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ResetPassword() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [, setIsModalOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlecreatepassword = async () => {
    openModal();
    try {
      // const response = await UserService.createpassword(payload);
      // console.log("Password reset successful:", response.data);
      closeModal();
    } catch (error) {
      console.error("Reset Password failed:", error);
      closeModal();
      navigate(APP_ROUTES?.SIGN_IN?.pathName);
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),

    confirmPassword: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handlecreatepassword();
      // console.log("Form submitted with values:", values);
    },
  });

  return (
    <ContainerWrapper>
      <Grid container xs={12}>
        <Grid item xs={12} md={6} lg={6}>
          <ContainerBoxV2
            styles={{
              width: "inherit",
              height: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              style={{
                height: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography
                  style={{
                    textAlign: "center",
                    color: "#2C2B2B",
                    fontSize: "30px",
                    fontWeight: "600",
                  }}
                  pb={5}
                >
                  SALES 10X
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  pb={5}
                >
                  <img src={GridImg} alt="..." style={{ width: "70%" }} />
                </Box>
              </Box>
            </Box>
          </ContainerBoxV2>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <ContainerBoxV2
            styles={{
              width: "inherit",
              height: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#7145B0",
                height: "95vh",
                width: isMobile ? "100%" : "70%",
                borderRadius: 6,
              }}
            >
              <form style={{ padding: "8%", marginTop: "40px" }}>
                <Typography
                  style={{
                    color: "#ffff",
                    fontSize: "30px",
                    fontWeight: "600",
                  }}
                  pb={4}
                >
                  Create a new password
                </Typography>

                <Box pb={3}>
                  <InputLabel
                    shrink
                    sx={{ fontSize: "18px", fontWeight: "600", color: "#ffff" }}
                  >
                    New Password
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    size="small"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      background: "#fff",
                      borderRadius: 2,
                      marginBottom: 1,
                    }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                  {formik.values.password.length >= 8 ? null : (
                    <Typography style={{ color: "white", fontSize: 14 }}>
                      Use 8 or more characters
                    </Typography>
                  )}

                  {/[A-Z]/.test(formik.values.password) ? null : (
                    <Typography style={{ color: "white", fontSize: 14 }}>
                      Use at least one uppercase letter (e.g., Aa)
                    </Typography>
                  )}

                  {/[a-z]/.test(formik.values.password) ? null : (
                    <Typography style={{ color: "white", fontSize: 14 }}>
                      Use at least one lowercase letter (e.g., Aa)
                    </Typography>
                  )}

                  {/\d/.test(formik.values.password) ? null : (
                    <Typography style={{ color: "white", fontSize: 14 }}>
                      Use at least one number (e.g., 123)
                    </Typography>
                  )}

                  {/[!@#$%^&*]/.test(formik.values.password) ? null : (
                    <Typography style={{ color: "white", fontSize: 14 }}>
                      Use at least one symbol (e.g., @#*)
                    </Typography>
                  )}
                </Box>

                <Box pb={6}>
                  <InputLabel
                    shrink
                    sx={{ fontSize: "18px", fontWeight: "600", color: "#ffff" }}
                  >
                    Confirm Password
                  </InputLabel>
                  <TextField_v2
                    fullWidth
                    size="small"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      background: "#fff",
                      borderRadius: 2,
                      marginBottom: 1,
                    }}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="error">{formik.errors.confirmPassword}</div>
                  ) : null}
                  <Typography style={{ color: "white", fontSize: 14 }}>
                    Both Password must be match
                  </Typography>
                </Box>

                <LoadingButton_v1
                  fullWidth
                  style={{
                    background:
                      "linear-gradient(180deg, #9751FA 0%, #7B26F7 100%)",
                    boxShadow: "0px 4px 60px rgba(0, 0, 0, 0.25)",
                    borderRadius: "7px",
                    border: "1px #A465FF solid",
                    color: "#ffff",
                    fontWeight: "600",
                  }}
                >
                  Submit
                </LoadingButton_v1>
              </form>
            </Box>
          </ContainerBoxV2>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
}

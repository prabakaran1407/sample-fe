/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

// **************** Component
import {
  TextField_v2,
  ButtonV1,
  AutoComplete_V2,
} from "../../components/MUI/mui.index";

// ************** MUI/** @format */

import {
  Box,
  Grid,
  InputLabel,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

// *************** Router
import { useNavigate } from "react-router-dom";

// ***************** Service
import { APP_ROUTES } from "../../data/AppRoutes";

// ***************** Service
import { AxiosResponse } from "axios";
import "./style.css";
import { enqueueSnackbar } from "notistack";
import { COLORS } from "../../utils/globals.ts";
import vector from "../../assets/svg/Vector.svg";
import S10Login from "../../assets/svg/Signup.svg";
import logo from "../../assets/png/logo.png";
import requestdemoService from "../../services/requestdemoservice/requestdemo.service";
import { StylesConfig } from "react-select";

interface ApiResponse {
  id: string;
  name: string;
}
interface IRegister {
  organizationName: string;
  organizationType: string;
  email: string;
}
const customStyles: StylesConfig = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? "#7145B0" : "#E0E3E7",
    background: "#F5F8FA",
    borderRadius: 8,
    border: "none",

    ":hover": {
      borderColor: state.isFocused ? "#7145B0" : "#E0E3E7",
    },
  }),
};

export default function SignUp() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<IRegister>({
    organizationName: "",
    organizationType: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<IRegister>>({});

  const handleInputChange = (field: keyof IRegister, value: string) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const [organizationTypeOptions, setOrganizationTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getIndustryType = async () => {
    try {
      const response = await requestdemoService.getIndustryType();
      if (!response) {
        throw new Error("No data received");
      }
      const responseData = (response as AxiosResponse).data
        .data as ApiResponse[];
      const transformedOptions = responseData?.map((option: ApiResponse) => ({
        label: option.name,
        value: option.id,
      }));
      setOrganizationTypeOptions(transformedOptions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getIndustryType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValidInput = (value: any, type?: any, len?: any) => {
    function extraValidation(val: any) {
      if (type === "number") {
        console.log("REG EXP", /^\d+$/.test(val));
        return /^\d+$/.test(val) && (len ? val?.length === len : true);
      }
      return Boolean(val);
    }
    if (typeof value === "string") {
      return Boolean(extraValidation(value.trim()));
    } else {
      return Boolean(value);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const errors: Partial<IRegister> = {};

    if (!isValidInput(formData.organizationName)) {
      errors.organizationName = "Organization name is required";
    }
    if (!isValidInput(formData.organizationType)) {
      errors.organizationType = "Organization type is required";
    }
    const isValidEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };
    if (!isValidInput(formData.email)) {
      errors.email = "Work email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setIsLoading(true);
    try {
      // const response: any = await createNewOrganization(formData);
      console.log("Register data: ", formData);
    } catch (rejectedValueOrSerializedError: any) {
      console.log(
        "rejectedValueOrSerializedError",
        rejectedValueOrSerializedError
      );
      enqueueSnackbar(
        `${
          rejectedValueOrSerializedError.message
            ? rejectedValueOrSerializedError.message
            : "Invalid Username or Password"
        }`,
        {
          variant: "error",
        }
      );
    }
    setIsLoading(false);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

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
                    width: "100%",
                  }}
                >
                  <img src={S10Login} width="75%" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                  onSubmit={handleRegister}
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
                    Register{" "}
                    <span style={{ fontWeight: "300", marginLeft: 20 }}>|</span>
                    <span
                      style={{
                        fontSize: 16,
                        marginLeft: 20,
                        marginTop: 5,
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
                    mb={3}
                  >
                    Welcome Onboard With Us!
                  </Typography>
                  <Box pb={2}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Organization Name
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      type="text"
                      name="orgname"
                      placeholder="Enter your organization name"
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleInputChange("organizationName", e.target.value)
                      }
                      sx={{
                        background: "#F5F8FA",
                        borderRadius: 1,
                        border: "none",
                      }}
                    />
                    {formErrors.organizationName && (
                      <Typography variant="body2" color="error">
                        {formErrors.organizationName}
                      </Typography>
                    )}
                  </Box>
                  <Box pb={2}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Organization Type
                    </InputLabel>
                    <AutoComplete_V2
                      placeholder="Select your organization type"
                      options={organizationTypeOptions}
                      value={formData.organizationType}
                      styles={customStyles}
                      handleChange={(e: any) => {
                        setFormData({
                          ...formData,
                          organizationType: e.value,
                        });
                      }}
                    />
                    {formErrors.organizationType && (
                      <Typography variant="body2" color="error">
                        {formErrors.organizationType}
                      </Typography>
                    )}
                  </Box>
                  <Box pb={1}>
                    <InputLabel
                      shrink
                      sx={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#181C32",
                      }}
                    >
                      Work Email
                    </InputLabel>
                    <TextField_v2
                      fullWidth
                      name="email"
                      type="text"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your work email"
                      sx={{
                        background: "#F5F8FA",
                        border: "none",
                        borderRadius: 1,
                      }}
                    />
                    {formErrors.email && (
                      <Typography variant="body2" color="error">
                        {formErrors.email}
                      </Typography>
                    )}
                  </Box>
                  <Box pb={3}>
                    <Typography sx={{ fontSize: 12 }}>
                      By clicking below, you agree to the Sales10x{" "}
                      <span
                        style={{ color: COLORS.secondary, cursor: "pointer" }}
                      >
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span
                        style={{ color: COLORS.secondary, cursor: "pointer" }}
                      >
                        Privacy Policy
                      </span>
                      .
                    </Typography>
                  </Box>

                  <ButtonV1
                    type="submit"
                    style={{
                      background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                      borderRadius: "7px",
                      color: "#ffff",
                      fontSize: 16,
                      fontWeight: "600",
                      height: 40,
                      textTransform: "none",
                    }}
                    fullWidth
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? <div className="spinner"></div> : "Register"}
                  </ButtonV1>
                  <Typography mt={1} sx={{ textAlign: "center" }}>
                    Already have an account?{" "}
                    <span
                      style={{
                        color: COLORS.secondary,
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(APP_ROUTES?.SIGN_IN?.pathName);
                      }}
                    >
                      Login
                    </span>
                  </Typography>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

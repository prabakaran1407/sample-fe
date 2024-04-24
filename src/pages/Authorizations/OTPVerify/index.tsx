/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

// **************** Component
import {
  ContainerWrapper,
  ContainerBoxV2,
  LoadingButton_v1,
} from "../../../components/MUI/mui.index";

// ******************** Formik

// ************** MUI
import { Box, Grid, Theme, Typography, useMediaQuery } from "@mui/material";

// *************** Router
import { useNavigate } from "react-router-dom";

// ************* const
import { APP_ROUTES } from "../../../data/AppRoutes";
import OtpInput from "react-otp-input";
import GridImg from "../../../assets/png/Group.png";

export default function OtpVerify() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const [otp, setOtp] = useState("");

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
                  mb={2}
                >
                  OTP Verification
                </Typography>
                <Typography
                  style={{
                    color: "#ffff",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  mb={4}
                >
                  We&apos;ll send an email with instructions to reset your
                  password
                </Typography>
                <Box pb={3}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "center", // Horizontal center alignment
                      alignItems: "center", // Vertical center alignment
                    }}
                    renderInput={(props: any, _index: any) => (
                      <input
                        {...props}
                        style={{
                          width: "55px",
                          height: "55px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          margin: "10px",
                          marginBottom: "20px",
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                      />
                    )}
                  />
                </Box>

                <Box pb={4}>
                  <Typography style={{ color: "#fff", textAlign: "center" }}>
                    If you didn’t receive a code!{" "}
                    <span
                      style={{
                        fontWeight: "600",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Resend
                    </span>
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
                  onClick={() => navigate(APP_ROUTES?.RESET_PASSWORD?.pathName)}
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

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Box,
  IconButton,
  MobileStepper,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import imageIcon from "../../../../../assets/svg/image-file.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageCellRenderer = (props: any) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const customStyle: any = {
    // Add your custom styles here
    width: 40,
    height: 40,
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex", // Center horizontally
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    textAlign: "center",
  };

  let imageStepper: { label: string; image: string }[] = [];
  if (props.data.claimType.typeOfClaim === "HQ") {
    imageStepper = [{ label: "", image: "" }];
  } else if (props.data.claimType.typeOfClaim === "EXHQ") {
    imageStepper = [
      { label: "Speedo Meter Start", image: props.data.speedoMeterStart },
      { label: "Speedo Meter End", image: props.data.speedoMeterEnd },
    ];
  } else if (props.data.claimType.typeOfClaim === "OUTSTATION") {
    imageStepper = [{ label: "", image: props.data.image }];
  }

  const [activeImage, setActiveImage] = React.useState(0);
  const maxSteps = imageStepper.length;

  const handleNext = () => {
    setActiveImage((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveImage((prevActiveStep) => prevActiveStep - 1);
  };

  const images: any = [];
  if (props.data.image !== "" && props.data.image !== null) {
    images.push(props.data.image);
  }
  if (
    props.data.speedoMeterStart !== "" &&
    props.data.speedoMeterStart !== null
  )
    images.push(props.data.speedoMeterStart);
  if (props.data.speedoMeterEnd !== "" && props.data.speedoMeterEnd !== null)
    images.push(props.data.speedoMeterEnd);
  // if (props.data.image !== "" && props.data.image !== null) {
  //   images.push(props.data.image);
  // }
  const renderImages = () => {
    if (props.data.claimType.typeOfClaim === "HQ") {
      return <h5>--</h5>;
    } else if (props.data.claimType.typeOfClaim === "EXHQ") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Stack direction="row" spacing={1}>
            <LazyLoadImage
              alt={`Speedometer`}
              effect="blur"
              src={props.data.speedoMeterStart || imageIcon}
              style={customStyle}
              onClick={handleOpen}
            />
          </Stack>
        </Box>
      );
    } else if (props.data.claimType.typeOfClaim === "OUTSTATION") {
      return (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <LazyLoadImage
            alt={`Image`}
            effect="blur"
            src={props.data.image || imageIcon}
            style={customStyle}
            onClick={handleOpen}
          />
        </Box>
      );
    } else {
      return <h5>--</h5>;
    }
  };

  return (
    <>
      {renderImages()}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 16, color: "#7145B0", fontWeight: "600" }}
              pb={1}
            >
              {imageStepper[activeImage]?.label}
            </Typography>
          </Paper>
          <Box sx={{ height: 300, width: 300 }}>
            <img
              src={imageStepper[activeImage]?.image || imageIcon}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeImage}
            nextButton={
              <IconButton
                onClick={handleNext}
                disabled={activeImage === maxSteps - 1 || images.length === 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
            }
            backButton={
              <IconButton onClick={handleBack} disabled={activeImage === 0}>
                {theme?.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </IconButton>
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageCellRenderer;

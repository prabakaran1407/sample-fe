/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  Box,
  IconButton,
  MobileStepper,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import imageIcon from '../../../../assets/svg/image-file.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex', // Center horizontally
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    textAlign: 'center',
  };

  const imageStepper = [
    {
      label: 'Checkin Image',
      image: `${props.data.checkInImage}`,
    },
    {
      label: 'Checkout Image',
      image: `${props.data.checkOutImage}`,
    },
  ];

  const [activeImage, setActiveImage] = React.useState(0);
  const maxSteps = imageStepper.length;

  const handleNext = () => {
    setActiveImage((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveImage((prevActiveStep) => prevActiveStep - 1);
  };

  const images: any = [];
  if (props.data.checkInImage !== '') {
    images.push(props.data.checkInImage);
  }
  if (props.data.checkOutImage !== '') {
    images.push(props.data.checkOutImage);
  }

  const renderImages = () => {
    if (images.length === 1) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <LazyLoadImage
            alt={`Image`}
            effect='blur'
            src={images[0] || imageIcon} // use normal <img> attributes as props
            style={customStyle}
            onClick={handleOpen}
          />
        </Box>
      );
    } else if (images.length === 2) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Stack direction='row' spacing={1}>
            {images.map((image: any, index: any) => (
              <>
                <LazyLoadImage
                  alt={`Image ${index + 1}`}
                  effect='blur'
                  src={image}
                  style={customStyle}
                  onClick={handleOpen}
                />
              </>
            ))}
          </Stack>
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
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: 16, color: '#7145B0', fontWeight: '600' }}
              pb={1}
            >
              {imageStepper[activeImage].label}
            </Typography>
          </Paper>
          <Box sx={{ height: 300, width: 300 }}>
            <img
              src={imageStepper[activeImage].image || imageIcon}
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
          <MobileStepper
            variant='text'
            steps={maxSteps}
            position='static'
            activeStep={activeImage}
            nextButton={
              <IconButton
                onClick={handleNext}
                disabled={activeImage === maxSteps - 1 || images.length === 1}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </IconButton>
            }
            backButton={
              <IconButton onClick={handleBack} disabled={activeImage === 0}>
                {theme.direction === 'rtl' ? (
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

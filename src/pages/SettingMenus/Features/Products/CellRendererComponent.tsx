/** @format */

import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Box, Modal, Typography } from "@mui/material";

import ImageAvatar from "../../../../assets/svg/image-file.svg";

const customStyle: any = {
  // Add your custom styles here
  width: 40,
  height: 40,
  borderRadius: "20px",
  cursor: "pointer",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex", // Center horizontally
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  textAlign: "center",
};

export const ProductImageCellRenderer = (props: any) => {
  console.log("ProductImageCellRenderer", props);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        onClick={() => {
          setOpen(true);
        }}
      >
        <LazyLoadImage
          src={props?.data?.images?.imagePath || ImageAvatar}
          style={customStyle}
        />
      </Box>
      <Modal
        title={props?.data?.value}
        onClose={() => setOpen(false)}
        open={open}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            bgcolor: "background.paper",
            borderRadius: 1,
            border: "2px solid transparent",
            // boxShadow: boxShadow,
            // p: 4,
            height: "50%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              flexShrink: "inherit",
              flexWrap: "wrap",
            }}
          >
            <LazyLoadImage
              src={props?.data?.images?.imagePath || ImageAvatar}
              style={{
                // ...customStyle,
                padding: 5,
                width: "60%",
                height: "80%",
                display: "flex",
                flexWrap: "wrap",
              }}
            />
            <Typography sx={{ fontSize: 15, fontWeight: "600", pt: 1 }}>
              {props?.data?.value}
            </Typography>
            {/* <Grid container xs={12} sx={{ width: "100%", height: "100%" }}>
              <Grid item xs={12}>
                <Stack>
                  <Typography variant="h5">{props?.data?.value}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

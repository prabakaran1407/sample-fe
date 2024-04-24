import { Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import {
  ActionIconButton,
  ContainerBoxV2,
} from "../../../../../../../src/components/MUI/mui.index";
import {
  CustomDivier,
  ImageViewer,
} from "../../../../../../../src/components/APP/app.index";
import { useLocation } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
// import PanoramaIcon from "@mui/icons-material/Panorama";

const ViewCustomer = () => {
  const location = useLocation();
  const { state } = location;
  const rowItem = state?.leadData;
  const [imgViewer, setImgViewer] = useState(false);
  const [images, setImage] = useState<any[]>([{ url: rowItem?.images }]);

  useEffect(() => {
    setImage(images.filter((f: any) => Boolean(f?.url)));
  }, []);

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${rowItem?.location?.lat},${rowItem?.location?.lng}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Customer Details
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <CustomDivier />
      </ContainerBoxV2>
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        {/* Top Left Section */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Customer Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.customerName || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Customer Id:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.customerId || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact Person 1:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.contactPerson || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact Person 2:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.contactPerson_two || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact Person 3:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.contactPerson_three || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact Number 1:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.contactNumber || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact Number 2:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.contactNumber_two || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact Number 3:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.contactNumber_three || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Email Id:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.emailAddresses || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  First Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.customerName || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {rowItem?.addressLineOne},{rowItem?.addressLineTwo},
                  {rowItem?.addressLineThree}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  City:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.city || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  District:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.district || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  State:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.state || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Country:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.country || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Logistics Primary:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {rowItem?.defaultLogistic
                    ? rowItem?.defaultLogistic?.logistics
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Logistics Secondary:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {rowItem?.defaultLogisticSecondary
                    ? rowItem?.defaultLogisticSecondary?.logistics
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Default Delivery Point:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.defaultDeliveryPoint || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  GST No:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.GSTNo || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Radius:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.radius || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Limit:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.limit || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Pincode:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.pinCode || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Notes:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{rowItem?.notes || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Location:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {rowItem?.location?.lat ? (
                  <ActionIconButton
                    actionType=""
                    onClick={() => openGoogleMaps()}
                  >
                    <Tooltip title="Location">
                      <LocationOnIcon color="error" />
                    </Tooltip>
                  </ActionIconButton>
                ) : (
                  "-"
                )}
              </Grid>
            </Grid>
          </Grid>
          {rowItem?.images ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Image:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <img
                    src={rowItem?.images}
                    alt="Image"
                    style={{
                      width: 50,
                      height: 50,
                      cursor: "pointer",
                      borderRadius: 8,
                    }}
                    onClick={() => setImgViewer(true)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Image:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  -
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
      <ImageViewer
        imageArray={images}
        setOpen={setImgViewer}
        open={imgViewer}
      />
    </>
  );
};

export default ViewCustomer;

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import PanoramaIcon from '@mui/icons-material/Panorama';
import { ImageViewer } from '../../../components/APP/app.index'


const visitManagementView = () => {
  const location = useLocation();
  const { visitView } = location.state;
  console.log("visitView", visitView);
  const [imgViewer, setImgViewer] = useState(false)
  const [images, setImage] = useState<any[]>([{ url: visitView?.image}, { url: visitView?.image2 }, { url: visitView?.image3 }])
  console.log('imagesvisit',images);
  

  useEffect(() => {
    setImage(images.filter((f: any) => Boolean(f?.url)))
  }, [])

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Visit Mangement
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  User name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{visitView?.user?.firstName || "-"}</Typography>
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
                  Contact person:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{visitView?.contactPerson || "-"}</Typography>
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
                  Customer name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {visitView?.customer[0]?.customerName || "-"}
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
                  Billing party:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {visitView?.billingparty?.billingPartyName || "-"}
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
                  Visit purpose:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {visitView?.purposeOfVisit[0]?.purpose || "-"}
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
                  Visit type:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{visitView?.typeOfVisit[0]?.type || "-"}</Typography>
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
                 Group:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{visitView?.group?.[0]?.groupName || "-"}</Typography>
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
                  Scheduled visit date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {" "}
                  {visitView?.scheduledVisitDate !== null &&
                  visitView?.scheduledVisitDate !== undefined &&
                  visitView?.scheduledVisitDate !== "" &&
                  !isNaN(visitView.scheduledVisitDate)
                    ? new Date(
                        parseInt(visitView.scheduledVisitDate)
                      ).toLocaleDateString()
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
                  Notes:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{visitView?.notes || "-"}</Typography>
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
                  Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{visitView?.address || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {
            visitView?.audio_link && (
              <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{ fontWeight: "bold", color: "#333" }}
                    >
                      Audio
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <audio controls src={visitView?.audio_link} style={{ width: '243px', height: '30px' }}></audio>
                  </Grid>
                </Grid>
              </Grid>
            )
          }
          {
            images?.length > 0 ? (
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
                  src={images[0].url}
                  alt="Image"
                  style={{ width: 50, height: 50, cursor: 'pointer', borderRadius: 8 }}
                  onClick={() => setImgViewer(true)}
              />
              </Grid>
              </Grid>
              </Grid>
              ) : (
              <Grid item  xs={6}>
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
                  <PanoramaIcon color="primary" onClick={() => setImgViewer(true)} />
                </Grid>
              </Grid>
            </Grid>
          )
        }
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

export default visitManagementView;

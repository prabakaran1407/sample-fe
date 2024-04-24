import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { ImageViewer } from "../../../components/APP/app.index";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AttendanceView = () => {
  const location = useLocation();
  const { attendanceView } = location.state;
  const [imgViewer, setImgViewer] = useState(false);
  const [images, setImage] = useState<any[]>([
    { url: attendanceView?.checkInImage },
    { url: attendanceView?.checkOutImage },
  ]);

  useEffect(() => {
    setImage(images.filter((f: any) => Boolean(f?.url)));
  }, []);

  const formatTime = (timeString: any) => {
    if (!timeString) return "-";
    const dateObj = new Date(timeString);
    return dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const openLocationInMap = (latitude: any, longitude: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Attendance  Information
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
                  Date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {" "}
                  {attendanceView?.createdAt !== null &&
                  attendanceView?.createdAt !== undefined &&
                  attendanceView?.createdAt !== "" &&
                  !isNaN(attendanceView.createdAt)
                    ? new Date(
                        parseInt(attendanceView.createdAt)
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
                  User name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {attendanceView?.userId?.firstName || "-"}
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
                  Check In Time:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {formatTime(attendanceView?.checkInTime)}
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
                  Check Out Time:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {formatTime(attendanceView?.checkOutTime)}
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
                  Check In Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{attendanceView?.checkInAddress || "-"}</Typography>
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
                  Check Out Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {attendanceView?.checkOutAddress || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {images?.length > 0 ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Check In/Out Images:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <img
                    src={images[0].url}
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
                  <PanoramaIcon
                    color="primary"
                    onClick={() => setImgViewer(true)}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <ImageViewer
            imageArray={images}
            setOpen={setImgViewer}
            open={imgViewer}
          />
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Check In/Out Location:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ display: "flex", gap: "10px" }}>
                  {attendanceView?.checkInLocation && (
                    <LocationOnIcon
                      onClick={() =>
                        openLocationInMap(
                          attendanceView?.checkInLocation[0],
                          attendanceView?.checkInLocation[1]
                        )
                      }
                      style={{ cursor: "pointer", color: "red" }}
                    />
                  )}
                  /
                  {attendanceView?.checkOutLocation && (
                    <LocationOnIcon
                      onClick={() =>
                        openLocationInMap(
                          attendanceView?.checkOutLocation[0],
                          attendanceView?.checkOutLocation[1]
                        )
                      }
                      style={{ cursor: "pointer", color: "red" }}
                    />
                  )}
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
                  Check In/Out Battery Percentage:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {attendanceView?.checkInDeviceBatteryPercentage || "-"} /{" "}
                  {attendanceView?.checkOutDeviceBatteryPercentage || "-"}
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
                  Check In/Out Device:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {attendanceView?.checkInDevice || "-"} /{" "}
                  {attendanceView?.checkOutDevice || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Paper>
    </>
  );
};

export default AttendanceView;

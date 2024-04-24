/** @format */

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { format } from "date-fns";
import AdvanceSnackbars from "../../../components/com_components/advanceSnackBar";
import { MapModal } from "../../../content/cards/data/MapModal";
import { getDistanceNew } from "../../../components/com_components/MapApi";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapIcon from "@mui/icons-material/Map";
import image from "./tracking.svg";
import {
  ButtonV1,
  ContainerBoxV2,
  Textfield,
} from "../../../components/MUI/mui.index";
import Table from "./table";
import { useLocation } from "react-router-dom";
// *********** Utils
// import { AutoComplete, Textfield } from '@/components/MUI/mui.index';

type Props = {
  valueName: any;
  tableData: any[];
};

interface LocationPoint {
  lat: number;
  lng: number;
}

const UserMapTabel: React.FC<Props> = ({ valueName }) => {
  const [loading, setLoading] = useState(false);
  const [latLon, setLatLon] = useState<LocationPoint[]>([]);
  const [date, setDate] = useState(new Date());
  const [_propData, setPropData] = useState<any[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const todaysDate = new Date();
  const { state } = useLocation();

  const [displayDate, setDisplayDate] = useState(
    format(todaysDate, "yyyy-MM-dd")
  );
  console.log("Date >>>>>>> sfdsgfhd", date);
  const [userId, setUserId] = useState();
  const [snackbarState, setSnackBar] = useState({
    open: false,
    messege: "",
    severity: "info",
    autoHideDuriation: 2000,
  });

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateTotalDistance = (locations: LocationPoint[]) => {
    let totalDistance = 0;

    for (let i = 0; i < locations?.length - 1; i++) {
      totalDistance += haversineDistance(
        locations[i].lat,
        locations[i].lng,
        locations[i + 1].lat,
        locations[i + 1].lng
      );
    }
    return totalDistance;
  };

  const getLocation = async () => {
    setLoading(true);
    if ((userId || state?.State_UserId) && date) {
      setLoading(true);
      let startTime: any = new Date(date);
      let endTime: any = new Date(date);
      startTime = startTime.setHours(0, 0);
      endTime = endTime.setHours(23, 59);
      const data = {
        startTime: startTime,
        endTime: endTime,
        user: userId || state?.State_UserId,
        limit: 1000000,
        skip: 0,
      };
      getDistanceNew(data).then((res: any) => {
        console.log("res 23432", res.data);
        setPropData(res.data);
        setLatLon([]);
        if (res.data.data.length > 0) {
          const newArray = res.data.data
            .map((item: any) => ({
              lat: parseFloat(parseFloat(item?.location[0]).toFixed(5)),
              lng: parseFloat(parseFloat(item?.location[1]).toFixed(5)),
              time: item?.time,
              source: item?.source,
            }))
            .filter((item: any) => !isNaN(item.lat) && !isNaN(item.lng))
            .sort(
              (a: any, b: any) =>
                new Date(a.time).getTime() - new Date(b.time).getTime()
            );

          setLatLon(newArray);
          console.log("latLon>>>>>>>", latLon);
        } else {
          setSnackBar({
            ...snackbarState,
            open: true,
            messege: "No records found!",
            severity: "error",
          });
        }
      });
    } else {
      setSnackBar({
        ...snackbarState,
        open: true,
        messege: "Please Select User!",
        severity: "error",
      });
    }
    setLoading(false);
  };
  // const getMapTableData = () => {
  //   let payload = {
  //     start: dayStartOrEnd(date),
  //     end: dayStartOrEnd(date, 'END'),
  //   };
  // };
  const view = async () => {
    getLocation();
  };
  console.log("loading", loading);

  const [tableVisible, setTableVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(true);

  const handleDriveIconClick = () => {
    setTableVisible(!tableVisible);
    setMapVisible(!mapVisible);
  };

  useEffect(() => {
    if (state?.State_UserId) {
      console.log("state?.State_UserId", state?.State_UserId);
      setUserId(state?.State_UserId);
      view();
    }
  }, [state?.State_UserId]);
  console.log("userId", valueName.find((v: any) => v?.value === userId)?.label);

  return (
    <>
      <ContainerBoxV2>
        <Grid container py={1} spacing={2}>
          <Grid item xs={12} md={12} lg={7}>
            <Grid container spacing={2}>
              <Grid item xs={5} md={5} lg={5}>
                <Autocomplete
                  fullWidth
                  value={
                    valueName.find((v: any) => v?.value === userId) || null
                  }
                  disablePortal
                  options={valueName}
                  onChange={(_e: any, value: any) => {
                    console.log("value", value);
                    setUserId(value.value);
                  }}
                  clearOnBlur={false}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Users" />
                  )}
                />
              </Grid>
              <Grid item xs={5} md={5} lg={5}>
                <Textfield
                  label="Date"
                  placeholder="dd-mm-yyyy"
                  type="date"
                  name="serviceStartDate"
                  value={displayDate}
                  onChange={(e: any) => {
                    const date = new Date(e.target.value);
                    setDisplayDate(format(date, "yyyy-MM-dd"));
                    setDate(new Date(e.target.value));
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                <ButtonV1
                  style={{
                    width: "100%",
                    fontSize: 14,
                    fontWeight: "600",
                    height: 38,
                  }}
                  onClick={() => view()}
                >
                  View
                </ButtonV1>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={8} lg={9}>
                {latLon.length > 1 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 20,
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={image}
                        alt=""
                        style={{ marginRight: 8, height: 30 }}
                      />{" "}
                      {calculateTotalDistance(latLon).toFixed(2)} km
                    </Typography>
                  </Box>
                )}
              </Grid>
              <Grid item xs={6} md={4} lg={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "100%",
                  }}
                  onClick={handleDriveIconClick}
                  style={{ cursor: "pointer" }}
                >
                  {tableVisible && <MapIcon />}
                  {mapVisible && <ViewListIcon />}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContainerBoxV2>

      <Grid container xs={12} p={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            Users Location Details
          </Typography>
        </Grid>
      </Grid>

      {tableVisible &&
        (loading ? <CircularProgress /> : <Table data={latLon} />)}

      <Grid container item xs={12}>
        {mapVisible && (
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center", height: "full" }}
          >
            <MapModal Location={latLon} loading={loading} />
          </Grid>
        )}
      </Grid>

      {/* <CustomizedSnackbars
        open={snackbarState.open}
        severity={snackbarState.severity}
        messege={snackbarState.messege}
        autoHideDuration={snackbarState.autoHideDuriation}
        handleClose={() => {
          setSnackBar((prev) => ({
            ...prev,
            open: false,
            messege: "",
            severity: "",
          }));
        }}
      /> */}
      <AdvanceSnackbars
        open={snackbar.open}
        severity={snackbar.severity}
        messege={snackbar.message}
        handleClose={() => {
          setSnackbar((prev) => ({
            ...prev,
            open: false,
            messege: "",
            severity: "",
          }));
        }}
      />
    </>
  );
};

export { UserMapTabel };

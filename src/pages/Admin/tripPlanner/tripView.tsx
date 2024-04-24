import { useLocation } from "react-router-dom";
import {  Typography, Grid, Stack, Box, Button, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ContainerBoxV2, MyDrawer } from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import { useAppSelector } from "../../../../src/hooks";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import TripPlannerMap from "./map/index.tsx";

import TripplanService from "../../../services/admin/tripplanner/tripplanner.service.ts";
import { ACTION_ICON_TYPES } from "../../../../src/data/AppConst";
import { useEffect, useState } from "react";
import { capitalize } from 'lodash'
import { formatedDate } from '../../../utils/datetime'
import { COLORS } from "../../../utils/globals.ts";


function formActionType(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    isAdd: locationState?.actionType === ACTION_ICON_TYPES[0],
    isEdit: locationState?.actionType === ACTION_ICON_TYPES[1],
    isView: locationState?.actionType === ACTION_ICON_TYPES[2],
    id: locationState?.id,
  };
}

const TripView = (props: any) => {
  const location = useLocation();
  const { TripView } = location.state;
  const AUTH = useAppSelector((state) => state?.auth);
  const { id } = formActionType(props, location?.state);
  const [userId, setUserId] = useState<any>("");
  const [tripPlanData, setTripPlanData] = useState<any>({});
  const [TripViewData, setTripViewData] = useState<any>({});
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const getExistData = async () => {
    const payload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };
    let existData = await TripplanService.getTripplanById(payload, id);
    existData = existData?.data?.response;
    setTripViewData(existData);
    if (existData) {
      const planData = existData?.planToVisit.map(
        (item: any) => item?.location
      );
      setUserId(existData?.users[0]?.id);

      setTripPlanData(planData);
    }
  };

  useEffect(() => {
    if (id) {
      getExistData();
    }
  }, [id]);

  console.log("TripView", TripViewData);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Trip Planner
              </Typography>
              {Object.keys(TripViewData).length > 0  && (<Button
                variant='contained'
                size="small"
                onClick={() => {
                  // setActionType(ACTION_ICON_TYPES[0]);
                  setDrawerOpen(true);
                }}
                sx={{ height: 38 }}>
                View {capitalize(TripViewData?.type)}
              </Button>)}
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      {/* <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Typography fontWeight={600}>
          User Name: {TripViewData?.users?.[0]?.firstName}{" "}
          {TripViewData?.users?.[0]?.lastName}
        </Typography>
        <Box display={"flex"} flexWrap={"wrap"} gap={2}>
          {TripViewData?.planToVisit?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                p={2}
                display={"flex"}
                flexDirection={"column"}
                gap={1}
              >
                <Box display={"flex"} gap={1}>
                  <Typography variant="body1">Name:</Typography>
                  <Typography variant="body1">{item?.customerName}</Typography>
                </Box>

                <Box display={"flex"} gap={1}>
                  <Typography variant="body1">Is Visited:</Typography>
                  <Typography
                    variant="body1"
                    color={item?.isVisited ? "green" : "red"}
                  >
                    {item?.isVisited ? "Yes" : "No"}
                  </Typography>
                </Box>

                <Box display={"flex"} gap={1}>
                  <Typography variant="body1">{`Name: `}</Typography>
                  <Typography variant="body1">{item?.customerName}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper> */}
      <Box px={2} pb={2}>
        <TripPlannerMap
          tripPlanData={tripPlanData}
          userId={userId}
          tripView={TripView?.recurringType === "TODAY"}
          TripViewData={TripView}
        />
      </Box>
      <MyDrawer
        anchor={'right'}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onClose={undefined}
        onOpen={() => {
          undefined;
        }}
        drawerWidth='50%'
        title={capitalize(TripViewData?.type)}>
        {<>
        {
            TripViewData?.planToVisit?.length > 0 ?
              TripViewData?.planToVisit?.map((m: any) => (
                <Accordion sx={{ width: '100%'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <PersonPinIcon color="primary" /> &nbsp;{m?.name}
                  </AccordionSummary>
                  <AccordionDetails>
                    {
                      m?.tripplnitems?.length > 0 ? (
                        <>
                          <table>
                            <thead>
                              <tr>
                                <th>S.No</th>
                                <th>Type</th>
                                <th>T.Type</th>
                                <th>Ref.No</th>
                                <th>User</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                m?.tripplnitems?.map((tripItme: any, i: number) => (
                                  <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                      {tripItme?.business_or_nonbusiness}
                                    </td>
                                    <td>
                                      {capitalize(tripItme?.type)}
                                    </td>
                                    <td style={{ color: COLORS.primary }}>
                                      {tripItme?.refNo}
                                    </td>
                                    <td>  
                                      {tripItme?.users?.fullname}
                                    </td>
                                    <td>{
                                      formatedDate(tripItme?.createdAt, 'YY/MM/DD')
                                    }</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </>
                      ) : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant="subtitle2">No data found !</Typography>
                      </Box>
                    }
                  </AccordionDetails>
                </Accordion>
              ))

              : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Typography variant="subtitle2">No data found !</Typography>
            </Box>
        }
        </>}
      </MyDrawer>
    </>
  );
};

export default TripView;

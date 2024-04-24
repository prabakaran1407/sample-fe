/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserListForAdmin } from "../../../components/com_components/CustomerSettingsAPI";
import {
  Typography,
  Grid,
  Stack,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Avatar,
  InputLabel,
  IconButton,
} from "@mui/material";
import {
  ButtonV1,
  ContainerBoxV2,
  Textfield,
} from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import { Box } from "@mui/system";
import { Check, PriorityHigh } from "@mui/icons-material";
import userActivityService from "../../../services/admin/user-activity/userActivity.service";
import _ from "lodash";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../utils/globals";
import { MapPinnedIcon } from "lucide-react";
import { UserActivityModal } from "./map";

const UserActivity = () => {
  const user: any = useSelector((state: any) => state.auth).data.userRecord;
  console.log("user >>>>>>>>>", user);
  const [userId, setUserId] = useState<any>("");
  const [options, setOptions] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState<any>([]);
  const [showModal, setShow] = useState(false);
  const [mapData, setMapData] = useState<any>([]);
  const [filterUserData, setFilterUserData] = useState<any>({});

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [selectedDate, setSelectedDate] = useState<any>(formattedDate);

  let formattedDisplayDate = "";

  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj.getTime())) {
      const displayDay = String(dateObj.getDate()).padStart(2, "0");
      const displayMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(dateObj);
      const displayYear = dateObj.getFullYear();
      formattedDisplayDate = `${displayDay} ${displayMonth} ${displayYear}`;
    }
  }

  const getUserData = async () => {
    await getUserListForAdmin(user?.organization_id)
      .then((res) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserActivity = async () => {
    setLoading(true);
    try {
      let payload = {
        org_id: user?.organization_id,
        date: selectedDate,
        user_id: userId,
      };
      // let payload = {
      //   org_id: "65659d836f971f879e7c054b",
      //   date: "2024-02-09",
      //   user_id: "65659d836f971f879e7c054b",
      // };
      let query = `?organization_id=${payload?.org_id}&date=${payload?.date}&userId=${payload?.user_id}`;
      let response = await userActivityService.getUserActivity(query);
      const data = response?.data?.userActivityData;
      setActivityData(data);
      setFilterUserData(response?.data?.userData);
      setLoading(false);
    } catch (e) {
      console.log("Error fetching data:", e);
    }
  };
  useEffect(() => {
    if (activityData) {
      const tempData = activityData
        ?.map((item: any) => {
          if (item?.location?.length === 2) {
            return {
              ...item,
              location: {
                lat: item?.location?.[0],
                lng: item?.location?.[1],
              },
            };
          } else {
            return null;
          }
        })
        .filter((item: any) => item !== null);

      setMapData(tempData);
    }
  }, [activityData]);

  console.log(
    "activityData",
    activityData
      ?.map((item: any) => {
        if (item?.location?.length === 2) {
          return {
            ...item,
            location: {
              lat: item?.location?.[0],
              lng: item?.location?.[1],
            },
          };
        } else {
          return null;
        }
      })
      .filter((item: any) => item !== null)
  );

  const ActivityCard = ({ data }: any) => {
    const capitalizedMessage = data?.message?.toLowerCase();
    const finalMessage = capitalizedMessage
      ? capitalizedMessage.charAt(0).toUpperCase() + capitalizedMessage.slice(1)
      : null;

    return (
      <>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar />
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pl: 1,
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Typography sx={{ fontSize: 13 }}>
                      <span
                        style={{
                          fontWeight: "600",
                          textTransform: "capitalize",
                        }}
                      >
                        {activityData[0]?.userId?.firstName}{" "}
                        {activityData[0]?.userId?.lastName}{" "}
                      </span>
                      {finalMessage}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#969696",
                      }}
                    >
                      {new Date(data?.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      border:
                        data?.status === "success"
                          ? "1px solid green"
                          : "1px solid red",
                      borderRadius: 5,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {data?.status === "success" ? (
                      <Check sx={{ fontSize: 30, color: "green" }} />
                    ) : (
                      <PriorityHigh sx={{ fontSize: 30, color: "red" }} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                User Activity
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Grid container py={1} spacing={2}>
          <Grid item xs={12} md={12} lg={8}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={5} lg={5}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
                  >
                    User Name
                  </InputLabel>
                  <Autocomplete
                    fullWidth
                    value={options?.name}
                    disablePortal
                    options={options}
                    onChange={(_e: any, value: any) => {
                      console.log("value", value);
                      setUserId(value.value);
                    }}
                    clearOnBlur={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select User"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={5} lg={5}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
                  >
                    Date
                  </InputLabel>
                  <Textfield
                    type="date"
                    name="date"
                    value={selectedDate || ""}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                    }}
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Box sx={{ pt: 3 }}>
                  <ButtonV1
                    style={{
                      width: "100%",
                      fontSize: 14,
                      fontWeight: "600",
                      height: 38,
                    }}
                    onClick={() => getUserActivity()}
                    disabled={userId === ""}
                  >
                    View
                  </ButtonV1>
                </Box>
              </Grid>

              {(!_.isEmpty(activityData) || loading) && (
                <Grid item xs={12} md={12} lg={12}>
                  {loading ? (
                    <Grid container>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "50vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <PropagateLoader color={COLORS.primary} />
                        </Box>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            background: "#E9EAEE",
                            p: 2,
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: "600",
                              fontFamily: "Poppins",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {filterUserData?.firstName
                                ? `${filterUserData?.firstName} ${filterUserData?.lastName}`
                                : "User"}
                            </span>
                            's activity available on {formattedDisplayDate}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            height: "41vh",
                            width: "100%",
                            overflow: "auto",
                            overflowX: "hidden",
                            flexShrink: 1,
                            "&::-webkit-scrollbar": {
                              width: "0.3em",
                            },
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            borderRadius: 2,
                          }}
                        >
                          <Grid container spacing={2}>
                            {activityData.map((data: any, index: any) => (
                              <Grid key={index} item xs={12} md={12} lg={12}>
                                <ActivityCard data={data} />
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
          {!_.isEmpty(activityData) && (
            <Grid item xs={12} md={12} lg={4}>
              {loading ? (
                <></>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Avatar sx={{ width: 100, height: 100 }} />
                    <Typography
                      sx={{
                        fontSize: 18,
                        textAlign: "center",
                        py: 1,
                        textTransform: "capitalize",
                      }}
                    >
                      {activityData[0]?.userId?.firstName}{" "}
                      {activityData[0]?.userId?.lastName}
                    </Typography>
                  </Box>
                  <CustomDivier />
                  <Box
                    sx={{
                      width: "100%",
                      p: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                        Emb Code :
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {filterUserData?.embCode
                          ? filterUserData?.embCode
                          : "---"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                        Designation :
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {filterUserData?.designation?.value
                          ? filterUserData?.designation?.value
                          : "---"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                        Mobile :
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {filterUserData?.mobile
                          ? filterUserData?.mobile
                          : "---"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                        Email :
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {filterUserData?.emailAddress
                          ? filterUserData?.emailAddress
                          : "---"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                        Last Seen :
                      </Typography>
                      <Typography sx={{ fontSize: 14 }}>
                        {filterUserData?.lastSeenAt
                          ? new Date(
                              filterUserData?.lastSeenAt
                            ).toLocaleString()
                          : "---"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "600" }}>
                        Activity in map :
                      </Typography>
                      <IconButton
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <MapPinnedIcon color="#000" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
      </ContainerBoxV2>
      {showModal && (
        <UserActivityModal
          show={showModal}
          handleClose={() => {
            setShow(false);
          }}
          location_data={mapData || []}
        />
      )}
    </>
  );
};

export default UserActivity;

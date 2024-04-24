import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../../src/hooks';
import { COLORS } from '../../../src/utils/globals';
import { useEffect, useState } from 'react';
import OrganizationService from '../../../src/services/super-admin/organization/organization.service';
import Banner from '../../assets/svg/banner.svg';
import {
  AccessTimeOutlined,
  CorporateFareRounded,
  LocationOnOutlined,
  MailOutlineOutlined,
  PhoneOutlined,
} from '@mui/icons-material';

const MyProfile = () => {
  const auth = useAppSelector((state) => state.auth);
  const [_organizationData, setOrganizationData] = useState<any>(null);

  const createdAt = auth?.data?.userRecord?.createdAt;
  const date = new Date(createdAt);
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const formattedDate = `${month} ${year}`;

  // const [startTime, setStartTime] = useState<string>("");
  // const [endTime, setEndTime] = useState<string>("");
  // const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  // const handleStartTimeChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setStartTime(event.target.value);
  // };
  // const handleUpdateButtonClick = () => {
  //   setLoading(true);

  //   const orgId = auth.data.userRecord.organization_id;
  //   const payload = {
  //     startTime: startTime,
  //     endTime: endTime,
  //     organizationName: organizationData?.organizationName,
  //     contactNumber: organizationData?.contactNumber,
  //     emailAddress: organizationData?.emailAddress,
  //   };
  //   if (!startTime || !endTime) {
  //     console.error("Start time and end time are required");
  //     setLoading(false);

  //     return;
  //   }
  //   OrganizationService.updateOrganization(orgId, payload)
  //     .then((response) => {
  //       console.log("Organization updated successfully:", response);
  //       navigate(-1);
  //     })
  //     .catch((error) => {
  //       console.error("Error updating organization:", error);
  //     });
  // };

  // const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEndTime(event.target.value);
  // };

  useEffect(() => {
    if (auth?.data?.userRecord?.organization_id) {
      const organization_id = auth.data.userRecord.organization_id;
      OrganizationService.getOneOrganization(organization_id)
        .then((data) => {
          setOrganizationData(data?.data?.data);
          // setStartTime(data?.data?.data?.startTime || ''); // Set start time from organization data
          // setEndTime(data?.data?.data?.endTime || '');
        })
        .catch((error) => {
          console.error('Error fetching organization data:', error);
        });
    }
  }, [auth]);

  return (
    <>
      <Grid container p={1}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: '78vh',
              overflowY: 'scroll',
              m: 1,
              '&::-webkit-scrollbar': {
                width: '0em',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <img src={Banner} style={{ width: '100%' }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Tooltip title="Profile">
                  <Avatar
                    sx={{
                      bgcolor: COLORS.secondary,
                      fontSize: 50,
                      fontWeight: '500',
                      width: 110,
                      height: 110,
                      position: 'absolute',
                      bottom: -30,
                    }}
                  >
                    {auth?.data?.userRecord?.firstName
                      ? auth?.data?.userRecord?.firstName
                          .charAt(0)
                          .toUpperCase()
                      : ''}
                  </Avatar>
                </Tooltip>
              </Box>
            </Box>

            <Box
              mt={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: 20, color: '#333333' }}>
                {auth?.data?.userRecord?.firstName
                  ? auth?.data?.userRecord?.firstName
                  : 'User'}
              </Typography>
              <Box sx={{ width: '100%', p: 2 }}>
                <Button fullWidth variant="contained">
                  Edit Profile
                </Button>
              </Box>
            </Box>
            <Box sx={{ px: 2 }}>
              <Box sx={{ width: '100%', height: 40 }}>
                <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                  About
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <CorporateFareRounded sx={{ fontSize: 20, color: '#333333' }} />
                <Typography sx={{ fontSize: 14, pl: 3 }}>
                  {auth?.data?.userRecord?.organizationData?.organizationName
                    ? auth?.data?.userRecord?.organizationData?.organizationName
                    : 'Your Organization'}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  pt: 2,
                }}
              >
                <LocationOnOutlined sx={{ fontSize: 20, color: '#333333' }} />
                <Typography sx={{ fontSize: 14, pl: 3 }}>
                  {auth?.data?.userRecord?.organizationData?.address
                    ? auth?.data?.userRecord?.organizationData?.address
                    : 'Your Location'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ width: '100%', height: 40 }}>
                <Typography sx={{ fontSize: 14, fontWeight: '600' }}>
                  Contact Information
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <MailOutlineOutlined sx={{ fontSize: 20, color: '#333333' }} />
                <Typography sx={{ fontSize: 14, pl: 3 }}>
                  {auth?.data?.userRecord?.emailAddress
                    ? auth?.data?.userRecord?.emailAddress
                    : ''}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  pt: 2,
                }}
              >
                <PhoneOutlined sx={{ fontSize: 20, color: '#333333' }} />
                <Typography sx={{ fontSize: 14, pl: 3 }}>
                  {auth?.data?.userRecord?.mobile
                    ? auth?.data?.userRecord?.mobile
                    : ''}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <Paper
                sx={{
                  height: '67vh',
                  overflowY: 'scroll',
                  m: 1,
                  p: 2,
                  '&::-webkit-scrollbar': {
                    width: '0em',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {/* <Typography sx={{ fontSize: 18, fontWeight: "600" }}>
                  More Info
                </Typography>
                <Grid
                  container
                  rowSpacing={2}
                  alignItems={"center"}
                  marginTop={2}
                >
                  <Grid item xs={2}>
                    <Typography sx={{ display: "inline", fontSize: 15 }}>
                      Start Time
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ display: "inline", fontSize: 15 }}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={handleStartTimeChange}
                      sx={{ display: "inline", marginLeft: "40px" }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ display: "inline", fontSize: 15 }}>
                      End Time
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ display: "inline", fontSize: 15 }}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      id="end-time"
                      type="time"
                      value={endTime}
                      onChange={handleEndTimeChange}
                      sx={{ display: "inline", marginLeft: "40px" }}
                      size="small"
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ margin: "20px" }}
                    onClick={handleUpdateButtonClick}
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                </Box> */}
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper
                sx={{
                  height: '8vh',
                  m: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <AccessTimeOutlined sx={{ color: '#969696' }} />
                <Typography
                  sx={{ fontSize: 16, color: '#969696', pt: 0.3, pl: 2 }}
                >
                  Joined on {formattedDate}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MyProfile;

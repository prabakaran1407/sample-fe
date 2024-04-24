import { useLocation } from 'react-router-dom';
import { ContainerBoxV2 } from '../../../../components/MUI/mui.index';
import { CustomDivier } from '../../../../components/APP/app.index';
import { formatDistanceToNow } from 'date-fns';
import {
  Grid,
  Typography,
  Stack,
  Paper,
  Box,
  Avatar,
  Tooltip,
} from '@mui/material';
import AccordionUsage from '../components/Accordion/Accordion';
// import Map from '../../../../../src/pages/Admin/maps';

function propsValue(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    id: locationState?.userId,
    data: locationState?.data,
    org: locationState?.org,
    isFromRequestDetails: locationState?.isFromRequestDetails ? true : false,
  };
}
const View = (props: any) => {
  const location = useLocation();
  let { data } = propsValue(props, location?.state);
  let { org, isFromRequestDetails } = propsValue(props, location?.state);

  // if (data?.billingdetails.length > 0) {
  //   //   // let data = data?.billingdetails.map
  //   if (data?.billingdetails?.length > 0) {
  //     for (let index = 0; index < data?.billingdetails?.length; index++) {
  //       let element = data?.billingdetails[index];
  //       console.log('element', element);
  //       // if (element?.remarks) {
  //       remarksData.push(...element?.remarks);
  //       // }
  //     }
  //     console.log('remarksData', remarksData);
  //   }
  //   setSortedData([...remarksData]);
  // }

  // if (data && data.billingdetails && data.billingdetails.length > 0) {
  let remarksData: any = [];

  for (let index = 0; index < data?.billingdetails?.length; index++) {
    let element = data?.billingdetails[index];
    if (element && element.remarks) {
      remarksData.push(...element.remarks);
    }
  }
  console.log('remarksData', remarksData);
  // setSortedData([...remarksData]);
  // }

  return (
    <>
      <ContainerBoxV2>
        <Grid container>
          <Grid xs={12} item>
            <Stack direction="row" justifyContent={'space-between'}>
              <Typography variant="h6" sx={{ fontWeight: '600' }}>
                Organization Details
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Paper elevation={1} style={{ padding: '20px', margin: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Contact Person:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.contactPerson}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Contact Number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.contactNumber}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Organization Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.organizationName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Email Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.emailAddress}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Organization Type:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {isFromRequestDetails ? org : data.organizationType?.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Number of users:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.noOfUsers}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  GST Number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.gstNumber}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Address:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{data.address}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Box p={2}>
        {remarksData.length > 0 ? (
          <Typography sx={{ fontSize: 16, fontWeight: '600' }}>
            Remarks & Activity
          </Typography>
        ) : null}
        <Box py={1}>
          {remarksData?.map((item: any) => (
            <Box
              py={1}
              key={`${item.createdAt}`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Avatar sx={{ mr: 2, width: 30, height: 30 }} />
              <Tooltip
                title={`Date: ${new Date(
                  item.createdAt
                ).toLocaleDateString()},Time: ${new Date(
                  item.createdAt
                ).toLocaleTimeString()}`}
              >
                <Typography sx={{ fontSize: 15 }}>
                  {item?.name} {item?.createOrUpdate} Billing {`  `}
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      color: '#969696',
                    }}
                  >
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </Typography>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Box>

      <Box p={2}>
        {data &&
          data?.billingdetails?.length > 0 &&
          data?.billingdetails?.map((item: any, index: any) => {
            return (
              <Box sx={{ mb: 3 }}>
                <AccordionUsage
                  accordianHeader="Accordion 1"
                  defaultExpands={true}
                  data={item}
                  index={index}
                  activeTab={data.status}
                />
              </Box>
            );
          })}
      </Box>
      {/* <Map /> */}
    </>
  );
};

export default View;

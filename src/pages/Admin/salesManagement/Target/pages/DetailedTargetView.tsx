import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from '@mui/material';
import { ContainerBoxV2 } from '../../../../../components/MUI/mui.index';
import { CustomDivier } from '../../../../../components/APP/app.index';
import SalesTargetService from '../../../../../services/admin/salesTarget/salestarget.service';
import moment from 'moment';
import _ from 'lodash';
import ProgressBar from '../Components/ProgressBar';
import { PropagateLoader } from 'react-spinners';
import { COLORS } from '../../../../../utils/globals';
function DetailedTargetView() {
  // const { viewTask } = location.state;
  const [loading, setLoading] = useState(true);

  const targetViewID = localStorage.getItem('TARGET_VIEW_ID');

  const [targetViewData, setTargetViewData] = useState<any>({});

  const getOneSalesTarget = async () => {
    await SalesTargetService.getOneTarget({ id: targetViewID })
      .then((res: any) => {
        const tempData = res.data;
        setTargetViewData(tempData);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (targetViewID) {
      getOneSalesTarget();
    }
  }, [targetViewID]);

  const functionForUsers = (users: any) => {
    if (users.length > 0) {
      let concatenatedLabels = '';
      for (let i = 0; i < users.length; i++) {
        concatenatedLabels += users[i]?.label;
        if (i < users.length - 2) {
          concatenatedLabels += ', ';
        } else if (i === users.length - 2) {
          concatenatedLabels += ' and ';
        }
      }
      return concatenatedLabels;
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '65vh',
            width: '100%',
          }}
        >
          <PropagateLoader color={COLORS.primary} />
        </Box>
      ) : (
        <>
          '
          <ContainerBoxV2>
            <Grid container xs={12}>
              <Grid xs={12}>
                <Stack direction="row" justifyContent={'space-between'}>
                  <Typography variant="h6" sx={{ fontWeight: '600' }}>
                    View Target
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </ContainerBoxV2>
          <CustomDivier />
          {}
          {targetViewData?.response?.salesData?.isOneTimeOrRecurring ===
          'ONE_TIME' ? (
            <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Created By
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {targetViewData?.response?.salesData?.createdUser}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Created Date
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(
                          parseInt(
                            targetViewData?.response?.salesData?.createdAt
                          )
                        ).format('DD/MM/YYYY')}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Type
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {targetViewData?.response?.salesData?.targetType}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Value
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {targetViewData?.response?.salesData?.targetValue}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Mode
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {
                          targetViewData?.response?.salesData
                            ?.isOneTimeOrRecurring
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target From
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(
                          parseInt(
                            targetViewData?.response?.salesData?.fromDate
                          )
                        ).format('DD/MM/YYYY')}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Upto
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(
                          parseInt(targetViewData?.response?.salesData?.toDate)
                        ).format('DD/MM/YYYY')}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Users
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {functionForUsers(
                          targetViewData?.response?.salesData?.allocatedUsers
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {targetViewData?.response?.data.length > 0 &&
                (targetViewData?.response?.salesData?.isOneTimeOrRecurring ===
                'ONE_TIME' ? (
                  <>
                    <Typography
                      sx={{ fontSize: 20, mt: 3, fontWeight: 'bold' }}
                    >
                      Target By Users
                    </Typography>
                    <div style={{ margin: '20px' }}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                style={{ fontWeight: 'bold', color: '#333' }}
                              >
                                User Name
                              </TableCell>
                              <TableCell
                                style={{
                                  fontWeight: 'bold',
                                  color: '#333',
                                  textTransform: 'capitalize',
                                }}
                              >
                                Target{' '}
                                {_.capitalize(
                                  targetViewData?.response?.salesData
                                    ?.targetType
                                )}
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: 'bold', color: '#333' }}
                              >
                                Achieved{' '}
                                {_.capitalize(
                                  targetViewData?.response?.salesData
                                    ?.targetType
                                )}
                              </TableCell>
                              <TableCell
                                style={{ fontWeight: 'bold', color: '#333' }}
                              >
                                Progress
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {targetViewData?.response?.data.map((e: any) => (
                              <TableRow key={e?.user}>
                                <TableCell>
                                  {e.userData[0].firstName}{' '}
                                  {e.userData[0].lastName}
                                </TableCell>
                                <TableCell>
                                  {
                                    targetViewData?.response?.salesData
                                      ?.targetValue
                                  }
                                </TableCell>
                                <TableCell>
                                  {
                                    e[
                                      `${targetViewData?.response?.salesData?.targetType}`
                                    ]
                                  }
                                </TableCell>
                                <TableCell>
                                  <ProgressBar
                                    bgColor={'#3A1C60'}
                                    target={
                                      targetViewData?.response?.salesData
                                        ?.targetValue
                                    }
                                    achieved={Math.round(
                                      e[
                                        `${targetViewData?.response?.salesData?.targetType}`
                                      ]
                                    )}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </>
                ) : null)}
            </Paper>
          ) : null}
          {targetViewData?.response?.salesData?.isOneTimeOrRecurring ===
          'RECURRING' ? (
            <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Created By
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {targetViewData?.response?.salesData?.createdUser}
                        {/* response.data[0].createdBy[0] */}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Created Date
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(
                          parseInt(
                            targetViewData?.response?.salesData?.createdAt
                          )
                        ).format('DD/MM/YYYY')}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Type
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {targetViewData?.response?.salesData?.targetType}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Value
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {targetViewData?.response?.salesData?.targetValue}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Mode
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {
                          targetViewData?.response?.salesData
                            ?.isOneTimeOrRecurring
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target From
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(
                          parseInt(
                            targetViewData?.response?.salesData?.fromDate
                          )
                        ).format('DD/MM/YYYY')}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Target Upto
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(
                          parseInt(targetViewData?.response?.salesData?.toDate)
                        ).format('DD/MM/YYYY')}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        Users
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography sx={{ fontSize: 14 }}>
                        {functionForUsers(
                          targetViewData?.response?.salesData?.allocatedUsers
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {targetViewData?.response.data.length > 0 &&
                (targetViewData?.response?.salesData?.isOneTimeOrRecurring ===
                'RECURRING' ? (
                  <>
                    <Typography
                      sx={{ fontSize: 20, mt: 3, fontWeight: 'bold' }}
                    >
                      Target By Users
                    </Typography>

                    {targetViewData?.response.data.map((b: any) => (
                      <>
                        {b.data.length > 0 ? (
                          <>
                            <Typography sx={{ fontSize: 14, mt: 2 }}>
                              From{' '}
                              {moment(parseInt(b.from)).format('DD/MM/YYYY')} -{' '}
                              {''}
                              {moment(parseInt(b.to)).format('DD/MM/YYYY')}
                            </Typography>

                            <div style={{ margin: '20px' }}>
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        style={{
                                          fontWeight: 'bold',
                                          color: '#333',
                                        }}
                                      >
                                        User Name
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          fontWeight: 'bold',
                                          color: '#333',
                                          textTransform: 'capitalize',
                                        }}
                                      >
                                        Target{' '}
                                        {_.capitalize(
                                          targetViewData?.response?.salesData
                                            ?.targetType
                                        )}
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          fontWeight: 'bold',
                                          color: '#333',
                                        }}
                                      >
                                        Achieved{' '}
                                        {_.capitalize(
                                          targetViewData?.response?.salesData
                                            ?.targetType
                                        )}
                                      </TableCell>

                                      <TableCell
                                        style={{
                                          fontWeight: 'bold',
                                          color: '#333',
                                        }}
                                      >
                                        Progress
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {b.data?.map((e: any) => (
                                      <TableRow key={e?.user}>
                                        <TableCell>
                                          {e.userData[0].firstName}{' '}
                                          {e.userData[0].lastName}
                                        </TableCell>
                                        <TableCell>
                                          {' '}
                                          {
                                            targetViewData?.response?.salesData
                                              ?.targetValue
                                          }
                                        </TableCell>
                                        <TableCell>
                                          {
                                            e[
                                              `${targetViewData?.response?.salesData?.targetType}`
                                            ]
                                          }
                                        </TableCell>

                                        <TableCell>
                                          <ProgressBar
                                            bgColor={'#3A1C60'}
                                            target={
                                              targetViewData?.response
                                                ?.salesData?.targetValue
                                            }
                                            achieved={Math.round(
                                              e[
                                                `${targetViewData?.response?.salesData?.targetType}`
                                              ]
                                            )}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          </>
                        ) : null}
                      </>
                    ))}
                  </>
                ) : null)}
            </Paper>
          ) : null}
        </>
      )}
    </>
  );
}

export default DetailedTargetView;

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { COLORS } from '../../../utils/globals';
import './style.css';
import {
  AccountBalanceWalletOutlined,
  ArrowDropUp,
  BusinessCenterOutlined,
  Check,
  ChecklistRtlOutlined,
  ChevronLeft,
  ChevronRight,
  Clear,
  ExpandMoreRounded,
  // GppGoodOutlined,
  LibraryAddCheckOutlined,
  LocalOfferOutlined,
  PeopleOutline,
  PersonOutlined,
  // PersonPinCircleOutlined,
  ReceiptOutlined,
  VerifiedUserOutlined,
} from '@mui/icons-material';
import { AutoComplete } from '../../../components/MUI/mui.index';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../data/AppRoutes';
import DashboardService from '../../../services/admin/dashboard/dashboard.service';
import { useAppSelector } from '../../../hooks';
import _ from 'lodash';
import Nodata from '../../../assets/svg/noData.svg';

export default function Dashboard() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:1000px)');

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    today
  );
  const year = today.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const formatOverviewmonth = String(today.getMonth() + 1).padStart(2, '0');
  const formattedOverviewDate = `${year}-${formatOverviewmonth}-${day}`;

  const [countLoading, setCountLoading] = useState(true);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [salesLoading, setSalesLoading] = useState(true);
  const [countData, setCountData] = useState<any>({});
  const [overviewData, setOverviewData] = useState<any>({});
  const [salesStats, setSalesStats] = useState<any>([]);
  const [attendanceData, setAttendanceData] = useState<any>([]);

  const [selectedOverviewFilter, setSelectedOverviewFilter] =
    useState<any>('Date');
  const [selectedOverviewMonth, setSelectedOverviewMonth] = useState<any>('');
  const [selectedOverviewYear, setSelectedOverviewYear] = useState<any>('');
  const [selectedOverviewDate, setSelectedOverviewDate] = useState<any>(
    formattedOverviewDate
  );

  const filterOptions = ['Date', 'Month', 'Year'];
  const monthOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'Decemeber',
  ];

  const currentYear = new Date().getFullYear();
  const previousYears = Array.from({ length: 5 }, (_, index) =>
    (currentYear - index - 1).toString()
  );
  const nextYears = Array.from({ length: 5 }, (_, index) =>
    (currentYear + index + 1).toString()
  );
  const allYears: any = [
    ...previousYears.reverse(),
    currentYear.toString(),
    ...nextYears,
  ];

  const getDashboardCount = async () => {
    setCountLoading(true);
    const formatyear = today.getFullYear();
    const formatmonth = String(today.getMonth() + 1).padStart(2, '0');
    const formatday = String(today.getDate()).padStart(2, '0');
    const newFormattedDate = `${formatyear}-${formatmonth}-${formatday}`;
    try {
      let payload = {
        org_id: auth?.data?.userRecord?.organization_id,
        status: true,
        date: newFormattedDate,
      };
      let query = `?date=${payload?.date}&status=${payload?.status}&organization_id=${payload?.org_id}`;
      let response = await DashboardService.getOverallCount(query);
      const overallCount = response.data;
      setCountData(overallCount);
      setCountLoading(false);
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  const getAttendanceData = async () => {
    setAttendanceLoading(true);
    const formatyear = today.getFullYear();
    const formatmonth = String(today.getMonth() + 1).padStart(2, '0');
    const formatday = String(today.getDate()).padStart(2, '0');
    const newFormattedDate = `${formatyear}-${formatmonth}-${formatday}`;
    try {
      let payload = {
        org_id: auth?.data?.userRecord?.organization_id,
        date: newFormattedDate,
      };
      let query = `?date=${payload?.date}&organization_id=${payload?.org_id}`;
      // let query = `?date=2023-11-28&organization_id=656046d3bf6c8f2610dbee5b`;
      let response = await DashboardService.getAttendanceSummary(query);
      const data = response.data;
      setAttendanceData(data);
      setAttendanceLoading(false);
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  const getSalesStatistics = async () => {
    setSalesLoading(true);
    const formatday = String(today.getDate()).padStart(2, '0');
    const formatmonth = String(today.getMonth() + 1).padStart(2, '0');
    const formatyear = today.getFullYear();
    const newFormattedDate = `${formatyear}-${formatmonth}-${formatday}`;
    try {
      let payload = {
        organization_id: auth?.data?.userRecord?.organization_id,
        date: newFormattedDate,
        // organization_id: "659cc83b28b601254a9c8bf4",
        // date: "05-02-2024",
      };
      let response = await DashboardService.getSalesStats(payload);
      const salesData = response?.data;
      setSalesStats(salesData);
      setSalesLoading(false);
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  const getOverview = async () => {
    setOverviewLoading(true);
    try {
      let payload = {
        org_id: auth?.data?.userRecord?.organization_id,
        date: selectedOverviewDate,
        month: selectedOverviewMonth,
        year: selectedOverviewYear,
      };
      let query;
      if (selectedOverviewFilter === 'Month') {
        query = `?month=${payload?.month}&year=${payload?.year}&organization_id=${payload?.org_id}`;
      } else if (selectedOverviewFilter === 'Year') {
        query = `?year=${payload?.year}&organization_id=${payload?.org_id}`;
      } else {
        query = `?date=${payload?.date}&organization_id=${payload?.org_id}`;
      }
      let response = await DashboardService.getOverviewData(query);
      const overview = response.data;
      setOverviewData(overview);
      setOverviewLoading(false);
    } catch (e) {
      console.log('Error fetching data:', e);
    }
  };

  useEffect(() => {
    getDashboardCount();
    getAttendanceData();
    getSalesStatistics();
  }, []);

  useEffect(() => {
    getOverview();
  }, [selectedOverviewDate, selectedOverviewYear]);

  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    fill: {
      type: 'gradient',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: salesStats?.xAixs,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
      },
    },
    // yaxis: {
    //   labels: {
    //     formatter: function (value: any) {
    //       // return value
    //       return value == 'Infinity' ? `${value / 1000}k` : value
    //       console.log("Y >>>>>>>>>", value == 'Infinity')
    //       // if(value && value > 1000) {
    //       //   return 
    //       // }
    //       // else {
    //       //   return value
    //       // }
          
    //     }
    //   },
    // }
  };

  const attendanceOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    fill: {
      type: 'gradient',
    },
    plotOptions: {
      pie: {
        offsetX: -23,
        expandOnClick: true,
        donut: {
          size: '50%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: undefined,
              offsetY: -8,
            },
            value: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Poppins',
              fontWeight: 600,
              color: undefined,
              offsetY: 8,
            },
            total: {
              show: true,
              showAlways: false,
              label: 'Total',
              fontSize: '14px',
              fontFamily: 'Poppins',
              color: '#969696',
            },
          },
        },
      },
    },
    labels: attendanceData?.designationValue?.value,
    yaxis: {
      labels: {
        align: 'center',
      },
    },
    legend: {
      floating: true,
      position: 'left',
      fontFamily: 'Poppins',
      markers: {
        width: 12,
        height: 12,
        radius: 4,
      },
      itemMargin: {
        vertical: 5,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ': ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          plotOptions: {
            pie: {
              offsetX: 45,
              offsetY: -30,
              customScale: 0.6,
            },
          },
        },
      },
    ],
  };

  const CardData = [
    {
      title: 'Total Users',
      count: countData?.userCount || 0,
      percent: countData?.userCount !== 0
      ? ((countData?.userDayCount / countData?.userCount) * 100 || 0).toFixed(1)
      : '0.0',
      icon: PersonOutlined,
    },
    // {
    //   title: "Total Attendance",
    //   count: "120",
    //   percent: 80,
    //   icon: VerifiedUserOutlined,
    // },
    {
      title: 'Total Sales',
      count: countData?.salesCount || 0,
      percent: (
        (countData?.SalesDayCount / countData?.salesCount) * 100 || 0
      ).toFixed(1),
      icon: LocalOfferOutlined,
    },
    {
      title: 'Total Customers',
      count: countData?.customerCount || 0,
      percent: (
        (countData?.customerDayCount / countData?.customerCount) * 100 || 0
      ).toFixed(1),
      icon: PeopleOutline,
    },
    {
      title: 'Total Claims',
      count: countData?.cliamCount || 0,
      percent: (
        (countData?.ClaimsDayCount / countData?.cliamCount) * 100 || 0
      ).toFixed(1),
      icon: AccountBalanceWalletOutlined,
    },
    {
      title: 'Total Visits',
      count: countData?.visitsCount || 0,
      percent: (
        (countData?.VisitsCount / countData?.visitsCount) * 100 || 0
      ).toFixed(1),
      icon: BusinessCenterOutlined,
    },
    // {
    //   title: "Tracked Users",
    //   count: "130",
    //   percent: 90,
    //   icon: PersonPinCircleOutlined,
    // },
    {
      title: 'Total Billing',
      count: countData?.billingPartyCount || 0,
      percent: (
        (countData?.BillingPartyDayCount / countData?.billingPartyCount) *
          100 || 0
      ).toFixed(1),
      icon: ReceiptOutlined,
    },
    {
      title: 'Total Tasks',
      count: countData?.taskManagementsCount || 0,
      percent: (
        (countData?.TaskManagementsDayCount / countData?.taskManagementsCount) *
          100 || 0
      ).toFixed(1),
      icon: ChecklistRtlOutlined,
    },
    {
      title: 'Total Collections',
      count: countData?.collectionCount || 0,
      percent: (
        (countData?.CollectionDayCount / countData?.collectionCount) * 100 || 0
      ).toFixed(1),
      icon: LibraryAddCheckOutlined,
    },
  ];

  const CustomCard = ({ data }: any) => {
    return (
      <>
        {countLoading ? (
          <Box
            sx={{
              width: '100%',
              height: 105,
              borderRadius: 2,
              background: '#fff',
            }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Box sx={{ width: '85%' }}>
                    <Skeleton
                      variant='rounded'
                      animation='wave'
                      sx={{
                        width: '100%',
                        height: 18,
                      }}
                    />
                    <Skeleton
                      variant='rounded'
                      animation='wave'
                      sx={{
                        width: '100%',
                        height: 18,
                        mt: 2,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        right: -2,
                      }}>
                      <Skeleton
                        variant='circular'
                        animation='wave'
                        sx={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        ) : (
          <Card
            sx={{
              width: '100%',
              height: '94%',
              borderRadius: 2,
            }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Box sx={{ width: '85%' }}>
                    <Typography sx={{ fontSize: 13 }} color={COLORS.primary}>
                      {data?.title}
                    </Typography>
                    <Typography
                      color={COLORS.secondary}
                      sx={{ fontSize: 22, fontWeight: '600' }}>
                      {data?.count}
                    </Typography>
                    <LinearProgress
                      sx={{ color: COLORS.secondary, mt: 1 }}
                      variant='determinate'
                      value={data?.percent}
                    />
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        right: -2,
                      }}>
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          background: '#E9EAEE',
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <data.icon
                          sx={{ color: COLORS.primary, fontSize: 18 }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ position: 'absolute', top: 50, right: -5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ArrowDropUp />
                        <Typography sx={{ fontSize: 10 }}>
                          {data?.percent}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </>
    );
  };

  const [currentCard, setCurrentCard] = useState(0);

  const handleNext = () => {
    const nextStart = Math.min(currentCard + 3, CardData.length - 6);
    setCurrentCard(nextStart);
  };

  const handlePrev = () => {
    const prevStart = Math.max(currentCard - 3, 0);
    setCurrentCard(prevStart);
  };

  return (
    <Box
      sx={{
        background: '#E9EAEE',
        height: 'auto',
        minHeight: '85.6vh',
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6.5} lg={6.5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} className='carousel-container'>
                {CardData.slice(currentCard, currentCard + 6).map(
                  (data, index) => (
                    <Grid
                      key={index}
                      item
                      xs={6}
                      md={4}
                      lg={4}
                      className={`carousel-card ${
                        index === 0 ? 'active' : ''
                      }`}>
                      <CustomCard data={data} />
                    </Grid>
                  )
                )}
                {!countLoading && (
                  <Box
                    sx={{
                      width: '100%',
                      position: 'absolute',
                      top: 114,
                      left: 20,
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '96%',
                      }}>
                      <Tooltip title='Previous'>
                        <IconButton
                          onClick={handlePrev}
                          disabled={currentCard === 0}
                          sx={{
                            width: 25,
                            height: 25,
                            background: COLORS.primary,
                            '&:hover': {
                              background: COLORS.secondary,
                            },
                          }}>
                          <ChevronLeft sx={{ color: '#fff', fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Next'>
                        <IconButton
                          onClick={handleNext}
                          disabled={currentCard === CardData.length - 6}
                          sx={{
                            width: 25,
                            height: 25,
                            background: COLORS.primary,
                            '&:hover': {
                              background: COLORS.secondary,
                            },
                          }}>
                          <ChevronRight sx={{ color: '#fff', fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {attendanceLoading ? (
                <Box
                  sx={{
                    height: '41.3vh',
                    background: '#fff',
                    borderRadius: 2,
                    p: 2,
                    position: 'relative',
                  }}>
                  <Skeleton
                    variant='rounded'
                    animation='wave'
                    sx={{
                      width: '30%',
                    }}
                  />
                  <Skeleton
                    variant='rounded'
                    animation='wave'
                    sx={{
                      width: '100%',
                      height: '85%',
                      mt: 2,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '41.3vh',
                    background: '#fff',
                    borderRadius: 2,
                    p: 2,
                    position: 'relative',
                  }}>
                  <Typography sx={{ fontWeight: '600' }}>
                    Attendance Summary
                  </Typography>
                  {_.isEmpty(attendanceData?.designationValue?.value) ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '85%',
                      }}>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2,
                          }}>
                          <img
                            src={Nodata}
                            alt='...'
                            style={{ width: '50%', height: '50%' }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: '600',
                            fontFamily: 'Poppins',
                            textAlign: 'center',
                          }}>
                          No data available for {formattedDate}.
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <ReactApexChart
                        options={attendanceOptions}
                        series={attendanceData?.designationValue?.count}
                        type='donut'
                        height={'95%'}
                        width={'95%'}
                      />
                      {!isMobile && (
                        <Box
                          sx={{
                            position: 'absolute',
                            width: '35%',
                            height: '100%',
                            top: 0,
                            right: 0,
                          }}>
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Box
                              sx={{
                                width: '90%',
                              }}>
                              <Typography
                                sx={{
                                  fontSize: 14,
                                  fontWeight: '600',
                                  fontFamily: 'Poppins',
                                }}>
                                Today's Attendance
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  fontFamily: 'Poppins',
                                  color: '#969696',
                                }}>
                                {formattedDate}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <Box
                                  sx={{
                                    my: 2,
                                    ml: 1,
                                    mr: 2,
                                    position: 'relative',
                                  }}>
                                  <Box
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      background: 'lightgreen',
                                      borderRadius: 30,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Check
                                      sx={{ fontSize: 20, color: 'green' }}
                                    />
                                  </Box>
                                  <CircularProgress
                                    variant='determinate'
                                    size={40}
                                    thickness={3}
                                    sx={{
                                      color: 'green',
                                      position: 'absolute',
                                      top: -4,
                                      left: -4,
                                    }}
                                    value={
                                      (attendanceData?.totalAttendanceLength /
                                        countData?.userCount) *
                                        100 || 0
                                    }
                                  />
                                </Box>
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: 12,
                                      fontFamily: 'Poppins',
                                      color: '#969696',
                                    }}>
                                    Presented Users
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: 16,
                                      fontWeight: '600',
                                      fontFamily: 'Poppins',
                                      color: 'green',
                                    }}>
                                    {attendanceData?.totalAttendanceLength || 0}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}>
                                <Box
                                  sx={{
                                    my: 2,
                                    ml: 1,
                                    mr: 2,
                                    position: 'relative',
                                  }}>
                                  <Box
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      background: '#FFCDD2',
                                      borderRadius: 30,
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Clear
                                      sx={{ fontSize: 20, color: 'red' }}
                                    />
                                  </Box>
                                  <CircularProgress
                                    variant='determinate'
                                    size={40}
                                    thickness={3}
                                    sx={{
                                      color: 'red',
                                      position: 'absolute',
                                      top: -4,
                                      left: -4,
                                    }}
                                    value={
                                      ((countData?.userCount -
                                        attendanceData?.totalAttendanceLength) /
                                        countData?.userCount) *
                                        100 || 0
                                    }
                                  />
                                </Box>
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: 12,
                                      fontFamily: 'Poppins',
                                      color: '#969696',
                                    }}>
                                    Absented Users
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: 16,
                                      fontWeight: '600',
                                      fontFamily: 'Poppins',
                                      color: 'red',
                                    }}>
                                    {countData?.userCount -
                                      attendanceData?.totalAttendanceLength ||
                                      0}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5.5} lg={5.5}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {salesLoading ? (
                <Box
                  sx={{
                    height: '45vh',
                    background: '#fff',
                    borderRadius: 2,
                    p: 2,
                  }}>
                  <Skeleton
                    variant='rounded'
                    animation='wave'
                    sx={{
                      width: '30%',
                    }}
                  />
                  <Skeleton
                    variant='rounded'
                    animation='wave'
                    sx={{
                      width: '100%',
                      height: '85%',
                      mt: 2,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '45vh',
                    background: '#fff',
                    borderRadius: 2,
                    p: 2,
                  }}>
                  <Typography sx={{ fontWeight: '600' }}>
                    Sales Details{' '}
                  </Typography>
                  {salesStats?.data === undefined ||
                  _.isEmpty(salesStats?.data[0]?.data) ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '93%',
                      }}>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mb: 2,
                          }}>
                          <img
                            src={Nodata}
                            alt='...'
                            style={{ width: '50%', height: '50%' }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: '600',
                            fontFamily: 'Poppins',
                            textAlign: 'center',
                          }}>
                          No sales data available for {formattedDate}.
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <ReactApexChart
                      options={chartOptions}
                      series={salesStats?.data}
                      type='bar'
                      height={'93%'}
                      width={'100%'}
                    />
                  )}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              {countLoading || overviewLoading ? (
                <Box
                  sx={{
                    height: '33.9vh',
                    background: '#fff',
                    borderRadius: 2,
                    p: 1,
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      m: 1,
                    }}>
                    <Skeleton width='30%' animation='wave' />
                  </Box>
                  <Box
                    sx={{
                      height: '25vh',
                      overflow: 'auto',
                      overflowX: 'hidden',
                      flexShrink: 1,
                      '&::-webkit-scrollbar': {
                        width: '0em',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                      },
                    }}>
                    <Skeleton
                      variant='rounded'
                      animation='wave'
                      sx={{ height: '15vh', m: 1 }}
                    />
                    <Skeleton
                      variant='rounded'
                      animation='wave'
                      sx={{ height: '15vh', m: 1 }}
                    />
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: '33.9vh',
                    background: '#fff',
                    borderRadius: 2,
                    p: 1,
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      m: 1,
                    }}>
                    <Typography sx={{ fontWeight: '600' }}>Overview</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <AutoComplete
                        options={filterOptions}
                        onChange={(_event, value) =>
                          setSelectedOverviewFilter(value)
                        }
                        value={selectedOverviewFilter}
                        renderInput={(params) => (
                          <div
                            ref={params.InputProps.ref}
                            style={{ position: 'relative' }}>
                            <input
                              placeholder='Filter by'
                              type='text'
                              {...params.inputProps}
                              style={{
                                width: '100px',
                                border: '0.5px solid #969696',
                                borderRadius: 6,
                                padding: 5,
                              }}
                            />
                            <ExpandMoreRounded
                              style={{
                                fontSize: 18,
                                position: 'absolute',
                                top: 5,
                                right: 4,
                              }}
                            />
                          </div>
                        )}
                      />
                      {selectedOverviewFilter === 'Month' ? (
                        <>
                          <AutoComplete
                            options={monthOptions}
                            onChange={(_event, value) =>
                              setSelectedOverviewMonth(value)
                            }
                            value={selectedOverviewMonth}
                            renderInput={(params) => (
                              <div
                                ref={params.InputProps.ref}
                                style={{ position: 'relative' }}>
                                <input
                                  placeholder='Select month'
                                  type='text'
                                  {...params.inputProps}
                                  style={{
                                    width: '110px',
                                    border: '0.5px solid #969696',
                                    borderRadius: 6,
                                    padding: 5,
                                    marginLeft: 8,
                                  }}
                                />
                                <ExpandMoreRounded
                                  style={{
                                    fontSize: 18,
                                    position: 'absolute',
                                    top: 5,
                                    right: 4,
                                  }}
                                />
                              </div>
                            )}
                          />
                          <AutoComplete
                            options={allYears}
                            onChange={(_event, value) =>
                              setSelectedOverviewYear(value)
                            }
                            value={selectedOverviewYear}
                            renderInput={(params) => (
                              <div
                                ref={params.InputProps.ref}
                                style={{ position: 'relative' }}>
                                <input
                                  placeholder='Select year'
                                  type='text'
                                  {...params.inputProps}
                                  style={{
                                    width: '110px',
                                    border: '0.5px solid #969696',
                                    borderRadius: 6,
                                    padding: 5,
                                    marginLeft: 8,
                                  }}
                                />
                                <ExpandMoreRounded
                                  style={{
                                    fontSize: 18,
                                    position: 'absolute',
                                    top: 5,
                                    right: 4,
                                  }}
                                />
                              </div>
                            )}
                          />
                        </>
                      ) : selectedOverviewFilter === 'Year' ? (
                        <>
                          <AutoComplete
                            options={allYears}
                            onChange={(_event, value) =>
                              setSelectedOverviewYear(value)
                            }
                            value={selectedOverviewYear}
                            renderInput={(params) => (
                              <div
                                ref={params.InputProps.ref}
                                style={{ position: 'relative' }}>
                                <input
                                  placeholder='Select year'
                                  type='text'
                                  {...params.inputProps}
                                  style={{
                                    width: '110px',
                                    border: '0.5px solid #969696',
                                    borderRadius: 6,
                                    padding: 5,
                                    marginLeft: 8,
                                  }}
                                />
                                <ExpandMoreRounded
                                  style={{
                                    fontSize: 18,
                                    position: 'absolute',
                                    top: 5,
                                    right: 4,
                                  }}
                                />
                              </div>
                            )}
                          />
                        </>
                      ) : selectedOverviewFilter === 'Date' ? (
                        <>
                          <input
                            type='date'
                            value={selectedOverviewDate}
                            onChange={(e) => {
                              setSelectedOverviewDate(e.target.value);
                            }}
                            style={{
                              width: '120px',
                              border: '0.5px solid #969696',
                              borderRadius: 6,
                              padding: 5,
                              marginLeft: 8,
                              fontSize: 11,
                            }}
                          />
                        </>
                      ) : null}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      height: '25vh',
                      overflow: 'auto',
                      overflowX: 'hidden',
                      flexShrink: 1,
                      '&::-webkit-scrollbar': {
                        width: '0em',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                      },
                    }}>
                    {/* User Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <PersonOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Users
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Active Users
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'green',
                          }}>
                          {overviewData?.userData?.activeUser || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Deactive Users
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'red',
                          }}>
                          {overviewData?.userData?.deactiveUser || 0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(APP_ROUTES?.ADMIN?.USERMANAGEMENT?.pathName)
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Attendance Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <VerifiedUserOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Attendance
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Present
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'green',
                          }}>
                          {overviewData?.attendanceData?.listLength || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Absent
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'red',
                          }}>
                          {countData?.userCount -
                            overviewData?.attendanceData?.listLength}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(
                            APP_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.pathName
                          )
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Sales Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <LocalOfferOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Sales
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Products
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: '600' }}>
                          {overviewData?.activeSalesQuantityCount || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Amount
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: '600' }}>
                          {overviewData?.activeSalesValueCount || 0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(
                            APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.PRIMARY
                              ?.pathName
                          )
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Customer Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <PeopleOutline
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Customers
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Active Customers
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'green',
                          }}>
                          {overviewData?.customerCountData?.activeCustomer || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Deactive Customers
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'red',
                          }}>
                          {overviewData?.customerCountData?.deactiveCustomer ||
                            0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(APP_ROUTES?.SETTINGS?.CUSTOMER?.pathName)
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Claims Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <AccountBalanceWalletOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Claims
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Claim Rate
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLORS.primary,
                          }}>
                          {overviewData?.claimsData?.listLength || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Amount
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLORS.primary,
                          }}>
                          {overviewData?.totalClaimedAmount || 0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(
                            APP_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.pathName
                          )
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Visits Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <BusinessCenterOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Visits
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Count
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLORS.primary,
                          }}>
                          {overviewData?.visitCountData?.activevisit || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }} />

                      <Button
                        onClick={() =>
                          navigate(
                            APP_ROUTES?.ADMIN?.VISIT_MANAGEMENT?.pathName
                          )
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Tasks Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ChecklistRtlOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Tasks
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Pending Tasks
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'orange',
                          }}>
                          {overviewData?.taskCountData?.activeTask || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Completed Tasks
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'green',
                          }}>
                          {overviewData?.taskCountData?.deactiveTask || 0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(APP_ROUTES?.ADMIN?.TASK_MANAGEMENT?.pathName)
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Billing Part Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ReceiptOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Billing Party
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Active Billing Party
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'green',
                          }}>
                          {overviewData?.billingPartyCountData
                            ?.activebillingParty || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Deactive Billing Party
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'red',
                          }}>
                          {overviewData?.billingPartyCountData
                            ?.deactivebillingParty || 0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(APP_ROUTES?.SETTINGS?.CUSTOMER?.pathName)
                        }>
                        More
                      </Button>
                    </Box>

                    {/* Collections Overview */}

                    <Box
                      sx={{
                        background: '#fff',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                        height: '15vh',
                        borderRadius: 2,
                        m: 1,
                        p: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Box
                        sx={{
                          width: '10%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          mr: 3,
                        }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            background: '#E9EAEE',
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <LibraryAddCheckOutlined
                            sx={{ fontSize: 26, color: COLORS.primary }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: '600',
                            textAlign: 'center',
                          }}>
                          Collections
                        </Typography>
                      </Box>

                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Collection Count
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLORS.primary,
                          }}>
                          {overviewData?.collectionData?.activeCollection || 0}
                        </Typography>
                      </Box>
                      <Box sx={{ width: '30%' }}>
                        <Typography sx={{ fontSize: 12, fontWeight: '600' }}>
                          Amount
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: COLORS.primary,
                          }}>
                          {overviewData?.collectionData
                            ?.activeCollectiontotalAmount || 0}
                        </Typography>
                      </Box>
                      <Button
                        onClick={() =>
                          navigate(APP_ROUTES?.ADMIN?.COLLECTIONS?.pathName)
                        }>
                        More
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

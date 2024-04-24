import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { People, Business, Group, AttachMoney } from "@mui/icons-material";
import LockClockIcon from "@mui/icons-material/LockClock";
import { AutoComplete } from "../../../../src/components/MUI/mui.index";
import DashboardService from "../../../services/super-admin/dashboard/dashboard.service";
import { COLORS } from "../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";

export default function Dashboard() {
  const [gridData, setGridData] = useState<any>([]);
  const [selectedRange, setSelectedRange] = useState<any>("Month");
  const [selectedMonth, setSelectedMonth] = useState<any>(getMonthName(new Date().getMonth()));
  const [loadingData1, setLoadingData1] = useState(true);
  const [loadingData2, setLoadingData2] = useState(true);
  const [secondAutoCompleteOptions, setSecondAutoCompleteOptions] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "area",
    },
    // dataLabels: {
    //   enabled: false,
    // },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [],
    },
  });

  const [seriesData, setSeriesData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async (selectedMonth: string, currentYear: string) => {
      try {
        setLoadingData1(false);
        const apiData = await DashboardService.getAllCounts();
        const response = apiData.data;
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: [],
          },
        }));
        setSeriesData([]);

        const newData = [
          {
            label: "Organization",
            count: response.organization,
            icon: <Business />,
            backgroundColor: "#cce6ff",
          },
          {
            label: "Request details",
            count: response.requestCount,
            icon: <Group />,
            backgroundColor: "#ccffdd",
          },
          {
            label: "Total users",
            count: response.user,
            icon: <People />,
            backgroundColor: "#ffffcc",
          },
          {
            label: "Paid client",
            count: response.PaidUser,
            icon: <AttachMoney />,
            backgroundColor: "#ffcccc",
          },
          {
            label: "Trial client",
            count: response.TrialUser,
            icon: <LockClockIcon />,
            backgroundColor: "#e6ccff",
          },
        ];

        setGridData(newData);

        if (selectedRange === "Month") {
          const numericMonth: any = monthNameToNumber(selectedMonth);

          if (numericMonth === null) {
            console.error(`Invalid month name: ${selectedMonth}`);
            return;
          }

          const monthlyData = await DashboardService.getAllWeeks(
            currentYear,
            numericMonth
          );
          const responseWeek: any = monthlyData.data;
          console.log(responseWeek, "weeklyData");

          // Handle the responseWeek data as needed, e.g., for generating the chart data
          const { categories, data } = generateChartData(responseWeek);

          // Update chartOptions
          setChartOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              categories,
            },
          }));
          setLoadingData1(false);

          // Update seriesData
          setSeriesData(data);
        } else if (selectedRange === "Year") {
          // Fetch yearly data
          const yearlyData = await DashboardService.getAllYears(currentYear);
          const responseYear = yearlyData?.data;
          console.log(responseYear, "categories");
          setLoadingData1(false);

          // Handle the responseYear data as needed, e.g., for generating the chart data
          const { categories, data } = generateChartData(responseYear, true);

          // Update chartOptions
          setChartOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              categories,
            },
          }));
          setLoadingData1(false);

          // Update seriesData
          setSeriesData(data);
        }
      } catch (error) {
        console.error("Error setting grid data:", error);
        setLoadingData1(false);
      }
    };

    const currentYear = new Date().getFullYear().toString();
    fetchData(selectedMonth, currentYear);
  }, [selectedMonth, selectedRange]);

  const generateChartData = (
    response: { [s: string]: any },
    isYearly?: boolean
  ) => {
    if (isYearly) {
      return generateYearlyChartData(response);
    } else {
      return generateMonthlyChartData(response as any);
    }
  };
  function getMonthName(monthIndex: number) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthIndex];
  }
  const generateYearlyChartData = (response: { [s: string]: any }) => {
    const categories = Object.keys(response);

    const organizationData: any[] = [];
    const userData: any[] = [];
    const requestData: any[] = [];

    categories.forEach((month) => {
      const monthData = response[month];

      organizationData.push(monthData.organizationCount);
      userData.push(monthData.userCount);
      requestData.push(monthData.RequestCount);
    });

    const data = [
      { name: "Organization", data: organizationData },
      { name: "Total Users", data: userData },
      { name: "Request Details", data: requestData },
    ];

    return { categories, data };
  };

  const generateMonthlyChartData = (response: {
    organization: { [s: string]: any };
    paidUsers: { [s: string]: any };
    requestDemo: { [s: string]: any };
    trialUsers: { [s: string]: any };
    user: { [s: string]: any };
  }) => {
    const categories = Object.keys(response.organization);

    const dataOrganization = Object.values(response.organization);
    const dataPaidUsers = Object.values(response.paidUsers);
    const dataRequestDemo = Object.values(response.requestDemo);
    const dataTrialUsers = Object.values(response.trialUsers);
    const dataUser = Object.values(response.user);

    return {
      categories,
      data: [
        { name: "Organization", data: dataOrganization },
        { name: "Paid Users", data: dataPaidUsers },
        { name: "Request Demo", data: dataRequestDemo },
        { name: "Trial Users", data: dataTrialUsers },
        { name: "User", data: dataUser },
      ],
    };
  };

  const monthNameToNumber = (monthName: string) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = monthNames.indexOf(monthName);
    return monthIndex !== -1 ? monthIndex + 1 : null;
  };

  const handleRangeChange = (_event: any, value: React.SetStateAction<any>) => {
    setSelectedRange(value);
    if (value === "Month") {
      setSecondAutoCompleteOptions([
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]);
    } else if (value === "Year") {
      setSecondAutoCompleteOptions([]);
      setSelectedMonth("");
    }
  };

  const handleMonthChange = (_event: any, value: React.SetStateAction<any>) => {
    setSelectedMonth(value);
  };

  const [selectedBillingStatus, setSelectedBillingStatus] = useState<any>({
    label: "Last Week Paid ",
    value: "lastWeekPaidUsers",
  });
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, [selectedBillingStatus]);

  const fetchData = async () => {
    try {
      const apiData = await DashboardService.getDues();
      const response = apiData.data;
      setData(response);
      setLoadingData2(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingData2(false);
    }
  };

  useEffect(() => {
    console.log("Selected billing status:", selectedBillingStatus);
  }, [selectedBillingStatus]);

  useEffect(() => {
    console.log("Data in state:", data);
  }, [data]);

  const allDataLoaded = !loadingData1 && !loadingData2;

  return (
    <Box
      display="flex"
      flexDirection="column"
      position={"sticky"}
      height={"100%"}
    >
      {/* Grid Counts */}

      <Grid
        container
        xs={12}
        spacing={2}
        padding={3}
        gap={3}
        justifyContent="center"
      >
        {allDataLoaded ? (
          <>
            <Grid container item xs={12} spacing={1}>
              {gridData.map((item: any) => (
                <Grid container item xs={12 / 5} sx={{ width: "100%" }}>
                  <Box
                    key={item.label}
                    sx={{
                      width: "inherit",
                      height: "80px",
                      background: item.backgroundColor || "#47476b",
                      border: "2px solid #efefef",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: "500",
                          color: "#5E6278",
                        }}
                        px={2}
                      >
                        {item.label}{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "600" }}
                        px={2}
                      >
                        {item.count}
                      </Typography>
                    </Box>
                    {item.icon}
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid container item xs={12} columnSpacing={1}>
              <Grid container item xs={8}>
                <Grid container item spacing={1}>
                  <Grid container item xs={3}>
                    <AutoComplete
                      sx={{ width: "150px" }}
                      options={["Month", "Year"]}
                      value={selectedRange}
                      onChange={handleRangeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select date range"
                        />
                      )}
                      // fullWidth
                    />
                  </Grid>
                  <Grid container item xs={3}>
                    {selectedRange === "Month" && (
                      <AutoComplete
                        sx={{ width: "150px" }}
                        options={secondAutoCompleteOptions}
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Select month" />
                        )}
                        // fullWidth
                      />
                    )}
                  </Grid>
                </Grid>
                <Grid container item xs={12} height="100%">
                  <Box mt={1} p={1} height="100%" width="100%">
                    {(selectedRange === "Month" && selectedMonth) ||
                    selectedRange === "Year" ? (
                      <ReactApexChart
                        options={chartOptions}
                        series={seriesData}
                        type="area"
                        height="100%"
                        width="100%"
                      />
                    ) : selectedRange === "Year" ? (
                      <ReactApexChart
                        options={chartOptions}
                        series={seriesData}
                        type="area"
                        height="100%"
                        width="100%"
                      />
                    ) : (
                      <div
                        style={{
                          height: "320px",
                          width: "100%",
                          border: "1px solid #ccc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          fontSize: "18px",
                          color: "#555",
                        }}
                      >
                        <p>Please select a valid range.</p>
                      </div>
                    )}
                    {/* billing status */}
                  </Box>
                </Grid>
              </Grid>
              <Grid container item xs={4} sx={{ height: "75%" }}>
                <Paper
                  sx={{
                    textAlign: "center",
                    padding: "5px",
                    border: "1px solid #e0e0eb",
                    borderRadius: "9px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex" }}>
                      <AutoComplete
                        sx={{ width: "100%" }}
                        options={[
                          {
                            label: "Last Week Paid ",
                            value: "lastWeekPaidUsers",
                          },
                          {
                            label: "Last Week Expired ",
                            value: "lastWeekExpiredUsers",
                          },
                          {
                            label: "Soon To Expire ",
                            value: "soonToExpireUsers",
                          },
                        ]}
                        value={selectedBillingStatus}
                        onChange={(_event, newValue: any) =>
                          setSelectedBillingStatus(newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select billing status"
                          />
                        )}
                        disableClearable
                      />
                    </Box>
                    <Box
                      mt={2}
                      sx={{
                        overflowY: "auto",
                        height: "230px",
                        width: "100%",
                      }}
                    >
                      {/* Display filtered data */}
                      {data[selectedBillingStatus?.value]?.map((item: any) => (
                        <Paper
                          key={item.id}
                          sx={{
                            width: "100%",
                            textAlign: "center",
                            padding: "5px",
                            border: "1px solid #e0e0eb",
                            borderRadius: "9px",
                            height: "100px",
                            marginBottom:1.5,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              marginBottom: 0.5,
                              color: "#3A1C60",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.organization || "Null"}
                          </Typography>

                          <Typography variant="body1" sx={{ color: "#6c757d" }}>
                            Due on:{" "}
                            {item?.serviceEndDate
                              ? new Date(item.serviceEndDate).toLocaleString()
                              : "Null"}
                          </Typography>
                        </Paper>
                      ))}
                      {data[selectedBillingStatus]?.length === 0 && (
                        <Typography variant="body1">
                          No data available
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <PropagateLoader color={COLORS.primary} />
          </Box>
        )}
      </Grid>
    </Box>
  );
}

import { useEffect, useState, memo } from "react";
import { Grid, Typography, Stack } from "@mui/material";
import { useAppSelector } from "../../../../hooks/index.ts";
import SalesService from "../../../../services/admin/sales/Sales.service.ts";

// ************** chart
import ReactApexChart from "react-apexcharts";

import { CustomDivier } from "../../../../components/APP/app.index.tsx";
import {
  AutoComplete,
  ContainerBoxV2,
  Textfield,
  InfoIcon,
} from "../../../../components/MUI/mui.index.tsx";
import { DAY_COUNT } from "../../../../data/AppConst.ts";

function SalesForecasting() {
  const users = useAppSelector((state: any) => state?.auth);

  console.log("Data >>>>>>", users);
  const [resData, setResData] = useState<Record<string, any>>({});
  const [dayCount, setDayCount] = useState<any>(DAY_COUNT[0]);

  const getForecastData = async () => {
    try {
      let payload = {
        // fromDate: dayStartOrEnd(new Date().getTime(), 'START', 'year').valueOf(),
        // toDate: dayStartOrEnd(new Date().getTime(), 'END', 'year').valueOf(),
        // toDay: formatedDate(new Date().getTime(), 'YYYY-MM-DD'),
        // organization_id: users?.data?.userRecord?.organization_id,
        organization_id: users?.data?.userRecord?.organization_id,
        days: dayCount?.value ? dayCount?.value : 10,
      };
      let response = await SalesService.salesForecastingV2(payload);
      response = response?.data?.response;
      setResData(response);
      // console.log('response >>>>>>>>>>>>', response)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getForecastData();
  }, [dayCount]);
  const options: any = {
    series: resData?.series ? resData?.series : [],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#871CE5", "#C297E7"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2.5,
    },
    title: {
      text: `Quantity-based sales forecasting for next ${
        dayCount?.value ? dayCount?.value : 10
      } day(s).`,
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent", "#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: resData?.xaxis,
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return `${value && value > 1000 ? `${value / 1000}k` : value}`;
        },
      },
    },
  };

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Forecasting
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12} sx={{ display: "flex", flexDirection: "row" }}>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <AutoComplete
                options={DAY_COUNT}
                value={dayCount || null}
                renderInput={(params) => (
                  <Textfield {...params} fullWidth type="text" label="Days" />
                )}
                onChange={(_, selectedOption: Record<string, any>) => {
                  setDayCount(selectedOption);
                }}
                // fullWidth
                sx={{ width: "100px" }}
              />
              <InfoIcon
                info={
                  "The default display will show the sales quantity for the next 10 days. If you want to make changes, you can do so within a range of [10, 20, 20] days"
                }
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "end",
              }}
            >
              <Typography variant="caption" color={"error"}>
                Note*: Approximate result based on previous sales
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <ReactApexChart
              options={options}
              series={options?.series ? options?.series : []}
              type="line"
              height={350}
            />
          </Grid>
        </Grid>
      </ContainerBoxV2>
    </>
  );
}

export default memo(SalesForecasting);

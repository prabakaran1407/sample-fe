import React, { useState } from "react";
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
} from "@mui/material";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";
import CustomerStockService from "../../../../services/admin/customerStock/customerstock.service";
import moment from "moment";
import _ from "lodash";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../utils/globals";
function DetailedCustomerStockView() {
  // const { viewTask } = location.state;
  const [loading, setLoading] = useState(true);

  const customerStockId = localStorage.getItem("CUSROMER_STOCK_ID");

  const [customerStockData, setCustomerStockData] = useState<any>({});

  const getOneCustomerStock = async () => {
    let payload = {
      id: customerStockId,
    };
    await CustomerStockService.getOneCustomerStock(customerStockId, payload)
      .then((res: any) => {
        const tempData = res.data;
        setCustomerStockData(tempData);
        setLoading(false);
      })
      .catch((err: any) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (customerStockId) {
      getOneCustomerStock();
    }
  }, [customerStockId]);


  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65vh",
            width: "100%",
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
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    View Target
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
                  <Grid item xs={4}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      Created By
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography sx={{ fontSize: 14 }}>
                      {customerStockData?.response?.user}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      Created Date
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography sx={{ fontSize: 14 }}>
                      {moment(
                        parseInt(customerStockData?.response?.createdAt)
                      ).format("DD/MM/YYYY")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      Created For
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography sx={{ fontSize: 14 }}>
                      {customerStockData?.response?.type_of_external}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      Customer
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography sx={{ fontSize: 14 }}>
                      {customerStockData?.response?.customer}
                    </Typography>
                  </Grid>
                  {customerStockData?.response?.type_of_external !==
                  "CUSTOMER" ? (
                    <>
                      <Grid item xs={4}>
                        <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                          Billing Party
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography sx={{ fontSize: 14, fontWeight: "500" }}>
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography sx={{ fontSize: 14 }}>
                          {customerStockData?.response?.billingparty}
                        </Typography>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>

            {customerStockData?.response?.items.length > 0 && (
              <>
                <Typography sx={{ fontSize: 20, mt: 3, fontWeight: "bold" }}>
                  Products
                </Typography>
                <div style={{ margin: "20px" }}>
                  <TableContainer>
                    <Table sx={{ width: "80%" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{ fontWeight: "bold", color: "#333" }}
                          >
                            Product Name
                          </TableCell>
                          <TableCell
                            style={{
                              fontWeight: "bold",
                              color: "#333",
                              textTransform: "capitalize",
                            }}
                          >
                            Quantity
                            {_.capitalize(
                              customerStockData?.response?.salesData?.targetType
                            )}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customerStockData?.response?.items.map((e: any) => (
                          <TableRow key={e?.user}>
                            <TableCell>{e?.product?.value}</TableCell>

                            <TableCell>{e?.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </>
            )}
          </Paper>
        </>
      )}
    </>
  );
}

export default DetailedCustomerStockView;

import { useLocation, useNavigate } from "react-router-dom";

import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Paper, Typography, Grid, Stack } from "@mui/material";
import { ButtonV1, ContainerBoxV2 } from "../../../components/MUI/mui.index";
import { CustomDivier } from "../../../components/APP/app.index";
import { useState } from "react";
import saleService from "../../../services/admin/sales/Sales.service";

const SecondaryView = () => {
  const location = useLocation();
  const { secondaryView } = location.state;
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      let payload = {
        status: "approved",
        data: secondaryView,
      };
      setLoading(true);
      await saleService.approveSale(secondaryView?._id, payload);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      console.log("error while approving", error);
    }
  };

  const [openConfirmation, setOpenConfirmation] = useState<any>({
    open: false,
    title: null,
    message: null,
    rowItem: null,
  });

  const handleActivate = (value: any) => {
    setOpenConfirmation({
      open: true,
      message: `Are you sure you want to approve this sale?`,
      rowItem: value,
    });
  };

  const handleConfirmation = async () => {
    // Perform the approval action here
    await handleApprove();
    // Close the modal
    setOpenConfirmation({ ...openConfirmation, open: false });
  };
  const isButtonDisabled = secondaryView?.status === "approved";

  const tableHeader = secondaryView?.sales;
  const sizes: any = Object.values(tableHeader).reduce(
    (acc: any, item: any) => {
      Object.values(item).forEach((products: any) => {
        products.forEach((product: { size: any }) => {
          if (product.size && !acc.includes(product.size)) {
            acc.push(product.size);
          }
        });
      });
      return acc;
    },
    []
  );
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Secondary
              </Typography>
            </Stack>
          </Grid>
          <Grid container justifyContent="end">
            {!isButtonDisabled && (
              <ButtonV1
                variant="contained"
                style={{ width: "250px", display: "flex" }}
                onClick={handleActivate}
              >
                Approve
              </ButtonV1>
            )}
          </Grid>
          <Modal
            open={openConfirmation.open}
            onClose={() =>
              setOpenConfirmation({ ...openConfirmation, open: false })
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid container justifyContent="center">
              <Grid item xs={9} sm={7} md={5} lg={3}>
                <Paper
                  elevation={3}
                  style={{
                    padding: "20px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        {openConfirmation.message}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                          <ButtonV1
                            variant="contained"
                            onClick={() =>
                              setOpenConfirmation({
                                ...openConfirmation,
                                open: false,
                              })
                            }
                          >
                            Cancel
                          </ButtonV1>
                        </Grid>
                        <Grid item>
                          {!isButtonDisabled && (
                            <ButtonV1
                              variant="contained"
                              color="primary"
                              onClick={handleConfirmation}
                              disabled={loading}
                            >
                              {loading ? "Please wait..." : "Confirm"}
                            </ButtonV1>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Modal>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  User name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{secondaryView?.user?.firstName || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Billing party:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {secondaryView?.partyName?.billingPartyName || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Customer name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {secondaryView?.customer?.customerName || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact person:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {secondaryView?.customer?.contactPerson || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Contact number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {secondaryView?.customer?.contactNumber || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Order number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{secondaryView?.orderNo || "-"}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "bold", color: "#333" }}
                >
                  Status:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  style={{
                    backgroundColor:
                      secondaryView?.status === "open"
                        ? "#ffe0b2"
                        : secondaryView?.status === "approved"
                        ? "#C6F1DA"
                        : "transparent",
                    padding: "4px",
                    borderRadius: "10px",
                    color:
                      secondaryView?.status === "open"
                        ? "#f57c00"
                        : secondaryView?.status === "approved"
                        ? "#1A4331"
                        : "#000000",
                    width: "40%",
                    textAlign: "center",
                  }}
                >
                  {secondaryView?.status
                    ? secondaryView?.status.toUpperCase()
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <CustomDivier />
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                      Product Type
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                      Product Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                      Variant
                    </TableCell>
                    {/* Size headers */}
                    {sizes.map((size: any, index: any) => (
                      <TableCell
                        key={index + 3}
                        style={{ fontWeight: "bold", color: "#333" }}
                      >
                        {size}
                      </TableCell>
                    ))}
                    <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                      Selling price
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>{" "}
                <TableBody>
                  {Object.keys(secondaryView.sales).map((productTypeKey) =>
                    Object.keys(secondaryView.sales[productTypeKey]).map(
                      (productName) => {
                        const products =
                          secondaryView.sales[productTypeKey][productName];
                        return products.map((product: any) => (
                          <TableRow key={product.id}>
                            <TableCell>{productTypeKey}</TableCell>
                            <TableCell>{product?.product}</TableCell>
                            <TableCell>{product.color || "-"}</TableCell>
                            {sizes.map((size: any, index: number) => (
                              <TableCell key={index + 3}>
                                {product.size === size ? product.quantity : "-"}
                              </TableCell>
                            ))}
                            <TableCell>{product.sellingPrice || "-"}</TableCell>
                            <TableCell>
                              {product.quantity * product.sellingPrice || "-"}
                            </TableCell>
                          </TableRow>
                        ));
                      }
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SecondaryView;

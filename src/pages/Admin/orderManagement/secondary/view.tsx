import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Chip,
  Box,
  Button,
  TextField,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { PropagateLoader } from "react-spinners";
import * as _ from "lodash";
import {
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
} from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";
import settingsService from "../../../../services/settings/settings.service";
import { COLORS } from "../../../../utils/globals";
import OrderManagementService from "../../../../services/admin/OrderManagement.service";

const SecondaryOrderView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { primaryView } = location.state;
  const [loading, setLoading] = useState(false);
  const [statusList, setStatusList] = useState<any>([]);
  const [selected, setSelected] = useState([]);

  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [statusOption, setStatusOption] = useState<any>({});
  const [orderStatus, setOrderStatus] = useState<any>();

  const [cancelledStatusId, setCancelledStatusId] = useState<any>();
  const [reason, setReason] = useState("");

  const handleStatusChange = (field: any, value: any) => {
    setOrderStatus({
      ...orderStatus,
      [field]: value,
    });
  };

  // const tableHeader = primaryView?.sales?.sales;
  // const sizes: any = Object.values(tableHeader).reduce(
  //   (acc: any, item: any) => {
  //     Object.values(item).forEach((products: any) => {
  //       products.forEach((product: { size: any }) => {
  //         if (product.size && !acc.includes(product.size)) {
  //           acc.push(product.size);
  //         }
  //       });
  //     });
  //     return acc;
  //   },
  //   []
  // );

  const rowCount = Object.keys(primaryView.sales.sales).reduce(
    (acc, productTypeKey) => {
      const productCount = Object.keys(
        primaryView.sales.sales[productTypeKey]
      ).reduce((innerAcc, productName) => {
        const products = primaryView.sales.sales[productTypeKey][productName];
        return innerAcc + products.length;
      }, 0);
      return acc + productCount;
    },
    0
  );

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected: any = Object.keys(primaryView.sales.sales).flatMap(
        (productTypeKey) =>
          Object.keys(primaryView.sales.sales[productTypeKey]).flatMap(
            (productName) => {
              const products =
                primaryView.sales.sales[productTypeKey][productName];
              return products.map((product: any) => product.uuid);
            }
          )
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event: any, id: never | any) => {
    const selectedIndex = selected.indexOf(id as never);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: never | any): any =>
    selected.indexOf(id as never) !== -1;

  const getStatusList = async () => {
    setLoading(true);
    try {
      const payload = {
        matchObj: {
          status: true,
          settingsType: "SECONDARY STATUS",
        },
        organization_id: primaryView.organization_id,
      };
      const listRes = await settingsService.listAllOrderSetting(
        payload,
        "?isCount=true"
      );
      if (listRes?.status) {
        const responseData = listRes?.data?.response?.data || [];
        setStatusList(responseData);

        const filteredStatus = responseData.map((e: any) => ({
          label: e?.value,
          value: e?._id,
        }));
        setStatusOption(filteredStatus);

        const cancelledStatus = responseData.find(
          (status: any) => status.type === "Cancelled"
        );

        if (cancelledStatus) {
          setCancelledStatusId(cancelledStatus?._id);
        }
      }
    } catch (error) {
      console.log("Error fetching status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatusList();
  }, []);

  const updateOrderStatus = async () => {
    setLoading(true);
    try {
      const payload = {
        id: [primaryView?.id],
        producttype: selected,
        status: orderStatus?.filteredStatus?.value,
        organization_id: primaryView.organization_id,
        type: "secondary",
        reason: reason,
      };
      await OrderManagementService.updateOrder(payload);
    } catch (error) {
      console.log("Error while updating status", error);
    } finally {
      setOpenStatusModal(false);
      navigate(-1);
    }
  };

  return (
    <>
      <ContainerBoxV2>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Order Management - Secondary | {primaryView?.orderNo}
            </Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
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
          <Paper elevation={3} sx={{ p: 2, m: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      User Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {`${primaryView?.sales?.user?.firstName} ${primaryView?.sales?.user?.lastName}` ||
                        "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      User Mobile :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.sales?.user?.mobile || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Customer Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.sales?.customer?.customerName || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Contact Email :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.sales?.customer?.emailAddresses || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Contact Person :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.sales?.customer?.contactPerson || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Contact Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.sales?.customer?.contactNumber || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Customer Address :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {`${primaryView?.sales?.customer?.addressLineOne} ${primaryView?.sales?.customer?.addressLineTwo} ${primaryView?.sales?.customer?.addressLineThree} ${primaryView?.sales?.customer?.city} ${primaryView?.sales?.customer?.district} ${primaryView?.sales?.customer?.state} ${primaryView?.sales?.customer?.pinCode}` ||
                        "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Order Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.orderNo || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Quantity :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      {primaryView?.quantity || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography
                      variant="subtitle1"
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Amount :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }}>
                      &#8377; {primaryView?.value || "---"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <CustomDivier />
          {!_.isEmpty(selected) && (
            <Grid container pt={2} pr={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setOpenStatusModal(true);
                    }}
                  >
                    Change Status
                  </Button>
                </Box>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          indeterminate={
                            selected.length > 0 && selected.length < rowCount
                          }
                          checked={rowCount > 0 && selected.length === rowCount}
                          onChange={handleSelectAllClick}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </TableCell>
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
                      {/* {sizes.map((size: any, index: any) => (
                        <TableCell
                          key={index + 3}
                          style={{ fontWeight: "bold", color: "#333" }}
                        >
                          {size}
                        </TableCell>
                      ))} */}
                      <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                        Size
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                        Quantity
                      </TableCell>

                      <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                        Selling Price
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold", color: "#333" }}>
                        Value
                      </TableCell>
                      <TableCell
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(primaryView.sales.sales).map(
                      ([productTypeKey, productsMap]: any) =>
                        Object.values(productsMap).flatMap((products: any) =>
                          products.map((product: any) => {
                            const isItemSelected = isSelected(product.uuid);
                            const labelId = `enhanced-table-checkbox-${productTypeKey}-${product.uuid}`;

                            return (
                              <TableRow
                                hover
                                onClick={(event) =>
                                  handleClick(event, product.uuid)
                                }
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={product.uuid}
                                selected={isItemSelected}
                                sx={{ cursor: "pointer" }}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{productTypeKey}</TableCell>
                                <TableCell>{product?.product}</TableCell>
                                <TableCell>{product.color || "-"}</TableCell>
                                {/* {sizes.map((size: any, index: number) => (
                                  <TableCell key={index + 3}>
                                    {product.size === size
                                      ? product.quantity
                                      : "-"}
                                  </TableCell>
                                ))} */}
                                <TableCell>{product.size || "-"}</TableCell>
                                <TableCell>{product.quantity || "-"}</TableCell>
                                <TableCell>
                                  {product.sellingPrice || "-"}
                                </TableCell>
                                <TableCell>
                                  {product.quantity * product.sellingPrice ||
                                    "-"}
                                </TableCell>
                                <TableCell>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {product?.status === cancelledStatusId &&
                                    product?.status !== undefined ? (
                                      <Tooltip title={product?.reason}>
                                        <Chip
                                          label={
                                            statusList.find(
                                              (status: any) =>
                                                status?._id === product.status
                                            )?.value || "-"
                                          }
                                          color="primary"
                                          sx={{ textTransform: "capitalize" }}
                                        />
                                      </Tooltip>
                                    ) : (
                                      <Chip
                                        label={
                                          statusList.find(
                                            (status: any) =>
                                              status?._id === product.status
                                          )?.value || "-"
                                        }
                                        color="primary"
                                        sx={{ textTransform: "capitalize" }}
                                      />
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      )}
      <ActionModal
        open={openStatusModal}
        onClose={() => {
          setOpenStatusModal(false);
        }}
        title="Change order status"
        modalWidth="40%"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box sx={{ width: "60%" }}>
            <Box>
              <InputLabel
                shrink
                sx={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#181C32",
                }}
              >
                Status <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <AutoComplete
                value={orderStatus?.filteredStatus}
                onChange={(_event, newValue) => {
                  handleStatusChange("filteredStatus", newValue);
                }}
                options={statusOption}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Select order status"
                  />
                )}
              />
            </Box>
            {orderStatus?.filteredStatus?.value === cancelledStatusId &&
              orderStatus?.filteredStatus?.value !== undefined && (
                <Box pt={2}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Reason <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Enter reason"
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </Box>
              )}

            <Box sx={{ width: "100%", pt: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "#969696",
                }}
              >
                <span style={{ fontWeight: "600" }}>Note:</span> The status
                should only be updated for the selected products.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenStatusModal(false);
            }}
            sx={{ mx: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateOrderStatus();
            }}
          >
            Update
          </Button>
        </Box>
      </ActionModal>
    </>
  );
};

export default SecondaryOrderView;

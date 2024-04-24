/** @format */

import React, { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Button,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  InputLabel,
  Autocomplete,
  Popper,
} from "@mui/material";
import {
  ActionIconButton,
  ActionModal,
  ActionItems,
  ContainerBoxV2,
  Textfield,
} from "../../../../components/MUI/mui.index.tsx";

import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../../data/AppConst.ts";
// import { useNavigate, generatePath } from "react-router-dom";
import CollectionService from "../../../../services/admin/collection.service.tsx";
import { useAppSelector } from "../../../../hooks/index.ts";
import { CustomDivier } from "../../../../components/APP/app.index.tsx";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useNavigate, generatePath } from "react-router-dom";
import { APP_ROUTES } from "../../../../data/AppRoutes.ts";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomCellRenderValues from "../../../../../src/components/CustomCellAgGrid/CustomCellRenderValues.tsx";

import { PropagateLoader } from "react-spinners";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { COLORS } from "../../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";

const OutStanding = () => {
  const validationSchema = Yup.object().shape({
    customerName: Yup.object().required("Customer Name is required"),
    billNumber: Yup.string()
      .required("Bill Number is required")
      .matches(/\S/, "Bill Number cannot consist of only spaces"),
    amount: Yup.string()
      .required("Amount is required")
      .matches(/^[0-9]+$/, "Amount must consist of only numbers"),
  });

  const [openCreateLeadDialog, setOpenCreateLeadDialog] = useState(false);
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const [formValue, setFormValue] = useState({
    customerName: { label: "", value: "" },
    billNumber: "",
    amount: "",
  });
  const [customers, setCustomers] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<any>({
    customer_name: "",
  });
  const handleCancel = () => {
    setOpenCreateLeadDialog(false);
    formik.resetForm();
    setFormValue({
      customerName: { label: "", value: "" },
      billNumber: "",
      amount: "",
    });
  };

  const getCustomers = async () => {
    let payload = {
      status: true,
      organization_id: auth?.data?.userRecord?.organization_id,
    };
    try {
      const response = await CollectionService.getCustomers(payload);
      const customerOption = response?.data?.data.map((customer: any) => ({
        label: customer.customerName,
        id: customer.id,
      }));
      setCustomers(customerOption);
    } catch (error) {
      console.error("Error fetching status data:", error);
      return [];
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const formik: any = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: formValue,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const organization_id = auth?.data?.userRecord?.organization_id;
        const userId = auth?.data?.userRecord?.id;
        // const dataToSend = { ...values, organization_id, userId };
        setSubmitting(true);
        const payload = {
          bill_type: title === "Bills" ? "addbills" : "directbills",
          customer_name: values?.customerName?.value,
          bill_no: values?.billNumber,
          amount: values?.amount,
          organization_id,
          userId,
        };
        await CollectionService.createBills(payload);
        handleCancel();
        getList();
      } catch (error: any) {
        console.error("Error creating lead:", error);
        toast.error(error?.response?.data?.message || "Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (!error?.response?.status) {
          toast.error(error?.message || "Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const navigate = useNavigate();
  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.COLLECTIONS?.OUTSTANDING?.view,
      { id: rowItem?.id, customer_name: rowItem?.customer_name }
    );
    navigate(pathUrl, {
      state: {
        leadData: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };

  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const getList = async () => {
    setLoading(true);
    try {
      const organization_id = auth?.data?.userRecord?.organization_id;
      let payload: any = {
        organization_id,
        customer_name: filterOptions?.customer_name,
        skip: pageSize * (page - 1),
        limit: pageSize,
      };

      let listData = await CollectionService.getAllOutstanding(payload);
      const dataList = listData.data.data;

      setTableData(dataList ? dataList : []);
      setTotalData(listData?.data?.total > 0 ? listData?.data?.total : 0);
      setLoading(false);
    } catch (e) {
      console.log("Error fetching data:", e);
      setLoading(false);
    }
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Customer Name",
      field: "customer_name.customerName",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "customer_name.customerName",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: " Bill Number",
      field: "bill_no",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "bill_no",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: " Amount",
      field: "amount",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "amount",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Actions",
      field: "",
      width: 400,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
        },
        handleView: handleView,
        enableActions: ACTION_ICON_TYPES,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
  // useEffect(() => {
  //   getList();
  // }, []);

  useEffect(() => {
    getList();
  }, [page, pageSize, filterOptions?.customer_name]);

  return (
    <div className="">
      <Grid container xs={12} padding={2}>
        <Grid xs={12}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Outstanding
            </Typography>
            <Box sx={{ padding: 0, display: "flex", columnGap: 1 }}>
              <Autocomplete
                // disablePortal
                options={customers}
                // disableClearable
                getOptionLabel={(option) => option.label}
                // value={filterOptions?.customer_name}
                onChange={(_event, newValue) => {
                  if (newValue === null) {
                    setFilterOptions({
                      customer_name: "",
                    });
                  } else {
                    setFilterOptions({
                      customer_name: newValue?.id,
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Customer"
                    size="small"
                    variant="outlined"
                  />
                )}
                sx={{ width: 180 }}
                PopperComponent={(props) => (
                  <Popper {...props} placement="bottom-start" />
                )}
              />
              <ActionIconButton
                actionType={ACTION_ICON_TYPES[6]}
                sx={{
                  background: COLORS.primary,
                  borderRadius: 1,
                  width: 38,
                  height: 38,

                  "&:hover": {
                    background: COLORS.secondary,
                  },
                }}
                onClick={() => {
                  getList();
                }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  setOpenCreateLeadDialog(true);
                  setTitle("Bills");
                }}
                sx={{ height: 38, mx: 1 }}
              >
                <Add sx={{ fontSize: 18, mr: 1 }} /> Add Bills
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenCreateLeadDialog(true);
                  setTitle("Payment");
                }}
                sx={{ height: 38 }}
              >
                <Add sx={{ fontSize: 18, mr: 1 }} /> Add Payment
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <CustomDivier style={{ marginTop: "0px" }} />

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
        <ContainerBoxV2>
          <AgDataGrid
            rowData={tableData}
            columnDefs={columnDefs}
            TableHeight={60}
            rowHeight={45}
            handleCellClick={undefined}
            loading={false}
            disableClickSelectionRenderers={false}
            noDataTxt="No Records Found"
            serverSidePagination={true}
            pageSize={pageSize}
            totalDataCount={totalData}
            serverRowSize={pageSize}
            currentPage={page}
            serverPageCount={Math.ceil(totalData / pageSize)}
            setServerRowSize={(rowSize: number) => {
              setPageSize(rowSize);
            }}
            setServerSidePage={(_e: any, p: number) => {
              setPage(p);
            }}
            page={page}
            setPageSize={setPageSize}
            setPage={setPage}
          />
        </ContainerBoxV2>
      )}

      {/* Create Lead Dialog */}
      <ActionModal
        open={openCreateLeadDialog}
        title={`Add ${title}`}
        onClose={() => {
          handleCancel();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Customer Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Autocomplete
                  disablePortal
                  options={customers}
                  disableClearable
                  getOptionLabel={(option) => option.label}
                  value={formik?.values?.customerName || null}
                  onChange={(_event, newValue) => {
                    formik.setFieldValue("customerName", {
                      label: newValue?.label,
                      value: newValue?.id,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="customerName"
                      placeholder="Customer Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      error={
                        formik.touched.customerName &&
                        Boolean(formik.errors.customerName)
                      }
                      helperText={
                        formik.touched.customerName &&
                        formik.errors.customerName
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Bill Number <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  placeholder="Bill Number"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("billNumber")}
                  error={
                    formik.touched.billNumber &&
                    Boolean(formik.errors.billNumber)
                  }
                  helperText={
                    formik.touched.billNumber && formik.errors.billNumber
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Amount <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  placeholder="Amount"
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("amount")}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCancel()}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                formik.isSubmitting ||
                formik.values?.customerName?.value === "" ||
                formik.values?.billNumber === "" ||
                formik.values?.amount === ""
              }
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogActions>
        </form>
      </ActionModal>
    </div>
  );
};

export default OutStanding;

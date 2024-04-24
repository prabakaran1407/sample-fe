/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useState, useEffect } from "react";
import { useNavigate, generatePath } from "react-router-dom";
import { Grid, Typography, Stack, Button, Box } from "@mui/material";
import { CustomDivier } from "../../../components/APP/app.index.tsx";
import {
  ActionIconButton,
  ActionItems,
  ContainerBoxV2,
} from "../../../components/MUI/mui.index.tsx";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid.tsx";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../data/AppConst";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";

// import InvoiceCopyRenderer from "../../../pages/superadmin/components/download/index.tsx";
import CustomizedMenus from "../../../components/MUI/options/serviceoption.tsx";

import BillingService from "../../../services/super-admin/billing/billing.service.ts";
import "../../../components/AG-GRID/DataGrid/style-1.css";
import StatusCellRenderer from "./statusCellRenderer.tsx";
// import './style.css';
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../utils/globals.ts";
import { Add } from "@mui/icons-material";

// **************** | Loader |**********

const BillingDetails = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState<any>();
  const [_spinner, setSpinner] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.EDIT?.pathName,
      { id: rowItem?._id }
    );
    navigate(pathUrl, {
      state: {
        userId: rowItem?._id,
        actionType: AUM_FORM_ACTION_TYPES[1],
      },
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(
      APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.VIEW?.pathName,
      { id: rowItem?._id }
    );
    navigate(pathUrl, {
      state: {
        userId: rowItem?._id,
        actionType: AUM_FORM_ACTION_TYPES[2],
        data: { rowItem },
      },
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDownload = (invoiceCopyUrl: any) => {
    if (!invoiceCopyUrl || !invoiceCopyUrl.isInvoiceCopy) {
      // If invoiceCopyUrl or isInvoiceCopy is not defined, show an alert
      alert("No file available for download");
      return;
    }
    const downloadLink = document.createElement("a");
    downloadLink.href = invoiceCopyUrl?.isInvoiceCopy;
    downloadLink.download = "Invoice Download";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const columnDefs = [
    {
      headerName: "Organization Name",
      field: "organization.organizationName",
      filter: true,
      width: 400,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "organization.organizationName",
      },
      suppressMovable: true,
      ...GetHeaderParams(),
    },
    {
      headerName: "Date range",
      filter: true,
      width: 500,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: (rowData: { data: Record<string, any> }) => ({
        field: "createdAt",
        formatter: (value: any) =>
          value
            ? `${new Date(
                rowData.data.serviceStartDate
              ).toLocaleDateString()} to ${new Date(
                rowData.data.serviceEndDate
              ).toLocaleDateString()}`
            : "",
      }),
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    // {
    //   headerName: 'Service Start Date',
    //   field: 'serviceStartDate',
    //   filter: true,
    //   width: 500,
    //   suppressMovable: true,
    //   cellRenderer: (rowData: { data: { createdAt: string } }) =>
    //     rowData.data.createdAt
    //       ? new Date(rowData.data.createdAt).toLocaleDateString()
    //       : '',
    // },
    // {
    //   headerName: 'Service End Date',
    //   field: 'serviceEndDate',
    //   filter: true,
    //   width: 500,
    //   suppressMovable: true,
    //   cellRenderer: (rowData: { data: { createdAt: string } }) =>
    //     rowData.data.createdAt
    //       ? new Date(rowData.data.createdAt).toLocaleDateString()
    //       : '',
    // },
    {
      headerName: "Services Availed",
      field: "services",
      width: 500,
      filter: true,
      suppressMovable: true,
      cellRenderer: CustomizedMenus,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    {
      headerName: "Status",
      field: "billingType",
      cellRenderer: StatusCellRenderer,
      width: 400,
      filter: true,
      suppressMovable: true,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    {
      headerName: "Actions",
      field: "",
      width: 320,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_edit: true,
          can_view: true,
          can_download: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleEdit: handleEdit,
        handleView: handleView,
        handleDownload: handleDownload,
      },
      suppressMovable: true,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const payload = {
        isActive: true,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
      };
      setSpinner(true);
      let res = await BillingService.getAllBillingDetailsList(payload);
      res = res?.data;
      setTableData(res?.response?.total > 0 ? res?.response?.data : []);
      setTotalData(res?.response?.total);
      setSpinner(false);
    } catch (error) {
    } finally {
      setSpinner(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <div className="">
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Billing Details
              </Typography>
              <Box>
                <ActionIconButton
                  sx={{
                    background: COLORS.primary,
                    borderRadius: 1,
                    width: 38,
                    height: 38,
                    mx: 1,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  actionType={ACTION_ICON_TYPES[6]}
                  onClick={() => {
                    fetchData();
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(APP_ROUTES?.SUPER_ADMIN?.BILLING?.CREATE, {
                      state: {
                        userId: null,
                        actionType: AUM_FORM_ACTION_TYPES[0],
                      },
                    });
                  }}
                  sx={{ height: 38 }}
                >
                  <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                </Button>
              </Box>
            </Stack>
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
        <ContainerBoxV2>
          <AgDataGrid
            rowData={tableData}
            columnDefs={columnDefs}
            TableHeight={58}
            rowHeight={50}
            handleCellClick={undefined}
            loading={false}
            disableClickSelectionRenderers={false}
            noDataTxt="No Records Found"
            pageSize={pageSize}
            totalDataCount={totalData}
            serverRowSize={pageSize}
            currentPage={page}
            serverSidePagination={true}
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
    </div>
  );
};

export default BillingDetails;

/**
 * eslint-disable prefer-const
 *
 * @format
 */

/**
 * eslint-disable prefer-const
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useEffect, useState } from "react";
import {
  ActionIconButton,
  ActionItems,
  ContainerBoxV2,
} from "../../../../components/MUI/mui.index";
import {
  Box,

  // CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import CustomerStockService from "../../../../services/admin/customerStock/customerstock.service.ts";
import LocalStorage from "../../../../libs/localStorage.service";
import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../../data/AppConst";
import { CustomDivier } from "../../../../components/APP/app.index";
import { TNestedObj } from "../../../../types/global.types";
import LeaveApprovalModal from "../../../../components/MUI/LeaveModal/LeaveModal";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { COLORS } from "../../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
import { generatePath, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../data/AppRoutes.ts";

const CustomerTarget = () => {
  // const auth = useAppSelector((state: any) => state.auth);

  const [tableData, setTableData] = useState<TNestedObj[]>([]);

  const [rowItem, _setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(true);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();

  const handleView = (rowItem: Record<string, any>) => {
    localStorage.setItem("CUSROMER_STOCK_ID", rowItem?._id);
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.CUSUTOMER_STOCK?.expandView,
      {
        id: rowItem?._id,
      }
    );
    navigate(pathUrl, {
      state: {
        data: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
        id: rowItem?._id,
      },
    });
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Customer",
      field: "customer",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "customer",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Billing Party",
      field: "billingparty",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "billingparty",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "For Customer or Billing Party",
      field: "type_of_external",
      filter: true,
      width: 700,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "type_of_external",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Created Date",
      field: "createdAt",
      filter: true,
      width: 500,
      cellRenderer: (rowData: { data: { createdAt: string } }) =>
        rowData.data.createdAt ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {new Date(parseInt(rowData.data.createdAt)).toLocaleDateString()}
            </Typography>
          </Box>
        ) : (
          ""
        ),
      cellRendererParams: {
        field: "fromDate",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Actions",
      field: "",
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
      },
      width: 400,
      suppressMovable: true,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  const getAllCustomerStock = async () => {
    setLoading(true);
    try {
      let localStoreData = LocalStorage.parseObj(
        LocalStorage.parseObj(LocalStorage.getItem("userData"))
      );
      let payload = {
        organization_id: localStoreData?.organization_id,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
      };

      let listData = await CustomerStockService.getAllCustomerStocks(payload);
      setTableData(
        listData?.data?.response?.data ? listData?.data?.response?.data : []
      );
      setTotalCount(
        listData?.data?.response?.count ? listData?.data?.response?.count : 0
      );
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCustomerStock();
  }, [page, pageSize]);

  return (
    <div>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Customer Stock
              </Typography>
              <Box>
                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[6]}
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
                  onClick={() => {
                    getAllCustomerStock();
                  }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Grid container xs={12}>
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
            <AgDataGrid
              rowData={tableData}
              columnDefs={columnDefs}
              TableHeight={58}
              rowHeight={50}
              noDataTxt="No Records Found"
              loading={false}
              serverSidePagination={true}
              pageSize={pageSize}
              totalDataCount={totalCount}
              serverRowSize={pageSize}
              currentPage={page}
              serverPageCount={Math.ceil(totalCount / pageSize)}
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
          )}
        </Grid>
        <LeaveApprovalModal
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
          }}
          reRender={() => {
            getAllCustomerStock();
          }}
          reason={rowItem.reason}
          rowItem={rowItem}
          // replace with the actual field name
        />
      </ContainerBoxV2>
    </div>
  );
};

export default CustomerTarget;

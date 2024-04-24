import { useEffect, useState } from "react";
import {
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

import { CustomDivier } from "../../../../components/APP/app.index";
import { TNestedObj } from "../../../../types/global.types";
import LeaveApprovalModal from "../../../../components/MUI/LeaveModal/LeaveModal";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
import { COLORS } from "../../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";

import CollectionService from "../../../../services/admin/collection.service.tsx";
import { useAppSelector } from "../../../../hooks/index.ts";
import { useLocation } from "react-router-dom";
const ViewOutstandingHistory = () => {
  const [tableData, setTableData] = useState<TNestedObj[]>([]);

  const [rowItem, _setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(true);

const location=useLocation()

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  //const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalData, setTotalData] = useState<any>(0);

  const auth = useAppSelector((state: { auth: any }) => state.auth);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // const getbalanceList = async () => {
  //   try {
  //     const organization_id = auth?.data?.userRecord?.organization_id;
  //     let payload = {
  //       organization_id,
  //       skip: pageSize * (page - 1),
  //       limit: pageSize,
  //     };

  //     let listData = await CollectionService.getAllOutstanding(payload);
  //     const dataList = listData.data.data;

  //     console.log("listData.data", listData.data);

  //     setTableData(dataList ? dataList : []);
  //     setTotalData(
  //       listData?.data?.total > 0 ? listData?.data?.total : 0
  //     );
  //     setLoading(false);
  //   } catch (e) {
  //     console.log("Error fetching data:", e);
  //     setLoading(false);
  //   }
  // };


  const columnDefs: ColDef[] = [
    {
      headerName: "Customer Name",
      field: "customer_name.customerName",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "customer_name.customerName",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Bill Number",
      field: "bill_no",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "bill_no",
      },
      ...GetHeaderParams(),
    },

    // {
    //   headerName: "Bill Type",
    //   field: "bill_type",
    //   filter: true,
    //   width: 500,
    //   cellRenderer: CustomCellRenderValues,
    //   cellRendererParams: {
    //     field: "bill_type",
    //   },
    //   ...GetHeaderParams(),
    // },
    {
      headerName: "Bill Type",
      field: "bill_type",
      filter: true,
      width: 500,
      cellRenderer: (props: any)=>{
        return <>{props.data.bill_type === "addbills"?"Bills": props.data.bill_type === "directbills"? "Payment" :"Sales"}</>
      },
      cellRendererParams: {
        field: "bill_type",
      },
      cellStyle: function (params) {
        let backgroundColor = '';
        let textColor = '#000000';
        let marginTopValue = '12px';
        if (params.value === 'addbills') {
          backgroundColor = '#ffe0b2';
          textColor = '#f57c00';
        } else if (params.value === 'directbills') {
          backgroundColor = '#C6F1DA';
          textColor = '#1A4331';
        } else if (params.value === 'sales') {
          backgroundColor = '#f5f37a';
          textColor = '#6b6312';
        }
        return {
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          textTransform: 'capitalize',
          backgroundColor: backgroundColor,
          borderRadius: '30px',
          color: textColor,
          height: '50%',
          width :'10%',
          marginTop: marginTopValue,
        };
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Amount",
      field: "amount",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "amount",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Balance Amount",
      field: "balance",
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "balance",
      },
      ...GetHeaderParams(),
    },
  ];

  const getList = async () => {
    try {
      const organization_id = auth?.data?.userRecord?.organization_id;
      const customer_name = location.state.leadData.customer_name.id;
      const bill_no = location.state.leadData.bill_no;

      let payload = {
        organization_id,
        customer_name:customer_name,
        bill_no: bill_no,
        skip: pageSize * (page - 1),
        limit: pageSize,
      };

      let listData = await CollectionService.getHistoryList(payload);
      const dataList = listData.data.data;


      setTableData(dataList ? dataList : []);
      setTotalData(
        listData.data.data?.length > 0 ? listData?.data.data?.length : 0
      );
      setLoading(false);
    } catch (e) {
      console.log("Error fetching data:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [page, pageSize]);

  return (
    <div>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Bill History
              </Typography>
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
          )}
        </Grid>
        <LeaveApprovalModal
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
          }}
          reRender={() => {
            getList();
          }}
          reason={rowItem.reason}
          rowItem={rowItem}
          // replace with the actual field name
        />
      </ContainerBoxV2>
    </div>
  );
};

export default ViewOutstandingHistory;

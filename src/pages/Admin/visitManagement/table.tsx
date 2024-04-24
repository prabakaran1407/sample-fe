import { useEffect, useState } from "react";
import { ContainerBoxV2, ActionItems } from "../../../components/MUI/mui.index";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";
import { ColDef } from "ag-grid-community";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
import { generatePath, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import { AUM_FORM_ACTION_TYPES } from "../../../data/AppConst.ts";
import VisitSettingService from "../../../services/settings/visitsettings.service.ts";
import { useAppSelector } from "../../../hooks/index.ts";
import { ACTION_ICON_TYPES } from "../../../data/AppConst";
import { getSkipCount } from "../../../utils/index.ts";
import { Box, Button, Grid } from "@mui/material";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../src/utils/globals.ts";
import TableLocationRenderer from "./Location.tsx";
import DateCellRenderer from "../attendancemanagement/cellRenderers/dateCellRenderer.tsx";
import moment from "moment";
import { CSVLink } from "react-csv";

const Table = ({ filterOption }: any) => {
  const AUTH = useAppSelector((state) => state.auth);

  const [_startDate, _setStartDate] = useState("");
  const [tableData, setTableData] = useState([]);
  const [csvData, setCsvData] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // const handleEndDateChange = (e: any) => {
  //   setEndDate(e.target.value);
  // };
  // const _handleFilterButtonClick = () => {
  //   const startDateObject = startDate ? new Date(startDate) : null;
  //   const endDateObject = endDate ? new Date(endDate) : null;
  //   console.log("Start Date:", startDateObject);
  //   console.log("End Date:", endDateObject);

  //   const filteredData = rowData.filter((row) => {
  //     const rowDate = new Date(row.timestamp);
  //     return (
  //       (!startDateObject || rowDate >= startDateObject) &&
  //       (!endDateObject || rowDate <= endDateObject)
  //     );
  //   });
  //   console.log("Filtered Data:", filteredData);
  // };
  const navigate = useNavigate();

  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(APP_ROUTES?.ADMIN?.VISIT_MANAGEMENT?.view, {
      id: rowItem?.id,
    });
    navigate(pathUrl, {
      state: {
        visitView: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
    console.log(rowItem, "rowItem");
  };
  const columnDefs: ColDef[] = [
    {
      headerName: "Date",
      field: "scheduledVisitDate",
      filter: true,
      width: 200,
      cellStyle: { textTransform: "capitalize" },
      cellRendererParams: {
        field: "scheduledVisitDate",
      },
      cellRenderer: DateCellRenderer,

      ...GetHeaderParams(),
    },
    {
      headerName: "User",
      field: "user.fullname",
      filter: true,
      width: 200,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "user.firstName",
      },
      ...GetHeaderParams(),
    },
    // {
    //   headerName: "Customer",
    //   field: "customer?.customerName",
    //   filter: true,
    //   width: 200,
    //   cellStyle: { textTransform: "capitalize" },
    //   suppressMovable: true,
    //   cellRenderer: CustomCellRenderValues,
    //   cellRendererParams: {
    //     field: "customerName",
    //   },
    //   ...GetHeaderParams(),
    // },
    {
      headerName: "Billing Party",
      field: "billingparty.billingPartyName",
      filter: true,
      width: 200,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "billingparty.billingPartyName",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Address",
      field: "address",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "address",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "View",
      field: "",
      width: 200,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },

    {
      headerName: "Visit Location",
      field: "",
      filter: true,
      width: 200,
      cellRenderer: TableLocationRenderer,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    // {
    //   headerName: "Notes",
    //   field: "notes",
    //   filter: true,
    //   width: 200,
    //   suppressMovable: true,
    //   cellRenderer: CustomCellRenderValues,
    //   cellRendererParams: {
    //     field: "notes",
    //   },
    //   ...GetHeaderParams(),
    // }
  ];

  const getList = async () => {
    setLoading(true);
    try {
      let payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        skip: getSkipCount(page, pageSize),
        limit: pageSize,
      } as any;

      if (filterOption?.start && filterOption?.end) {
        payload.start = filterOption?.start;
        payload.end = filterOption?.end;
      }

      if (!filterOption?.start || !filterOption?.end) {
        const currentDate = new Date();
        const currentDayTimestamp = Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );

        const endOfTheDay = moment().endOf("day").valueOf();

        if (!filterOption?.start) {
          payload.start = currentDayTimestamp;
        }
        if (!filterOption?.end) {
          payload.end = endOfTheDay;
        }
      }

      let query = `?isCount=true`;
      let visitData = await VisitSettingService.visitManagementList(
        payload,
        query
      );
      visitData = visitData?.data;
      if (visitData?.status) {
        setTableData(visitData?.response?.data || []);
        setLoading(false);
        setTotalCount(visitData?.response?.totalCount || 0);
      }
      console.log("data >>>>>>>>>", visitData);
      console.log();
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(tableData, "tableData");

  const handleExportCSV = () => {
    if (tableData && tableData.length > 0) {
      const csvHeaders = [
        "User",
        "Group Name",
        "Customer Name",
        "Billing Party Name",
        "Contact Person",
        "Created At",
        "Scheduled Visit Date",
        "Visit Purpose",
        "Visit Type",
        "Image",
        "Image 2",
        "Image 3",
        "Audio link",
        "Address",
        "Notes",
        "Duration",
        "Visit Sequence",
      ];

      const csvDataFormatted = tableData.map((item: any) => [
        item?.user?.fullname,
        item?.group?.groupName,
        item?.customers?.customerName,
        item?.billingparty?.billingPartyName,
        item?.contactPerson,
        moment(item?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        moment(parseInt(item?.scheduledVisitDate)).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        item?.purposeOfVisit[0]?.purpose,
        item?.typeOfVisit[0]?.type,
        item?.image,
        item?.image2,
        item?.image3,
        item?.audio_link,
        item?.address,
        item?.notes,
        item?.duration,
        item?.visitSeq,
      ]);

      const csvFormattedData: any = [csvHeaders, ...csvDataFormatted];
      setCsvData(csvFormattedData);
    }
  };

  useEffect(() => {
    handleExportCSV();
  }, [tableData]);

  useEffect(() => {
    getList();
  }, [filterOption, page, pageSize]);

  return (
    <>
      <Grid sx={{ padding: 1.5, justifyContent: "end", display: "flex" }}>
        <CSVLink
          data={csvData}
          filename={"Visit-data.csv"}
          className="btn btn-primary btn-sm"
          target="_blank"
        >
          <Button variant="contained" disabled={csvData.length === 0}>
            Export to CSV
          </Button>
        </CSVLink>
      </Grid>
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
            serverSidePagination={Boolean(totalCount)}
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
        </ContainerBoxV2>
      )}
    </>
  );
};

export default Table;

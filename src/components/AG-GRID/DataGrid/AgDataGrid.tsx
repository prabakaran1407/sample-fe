/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import ReactResizeDetector from "react-resize-detector";
import _ from "lodash";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DEFAULT_PAGINATION_SIZES } from "../../../data/AppConst";

import "./style-1.css";
// import './style.css';

function ServerSideGrid(props: any) {
  const {
    columnDefs,
    rowData,
    onRowClicked,
    TableHeight,
    defaultColDef,
    loading,
    rowHeight,
    noDataTxt,
    children,
    pageSize,
    defaultPagination,
    setPage,
    setPageSize,
    totalDataCount,
    page,
    serverSidePagination,
    ...rest
  } = props;

  const gridOptions: any = useRef();
  const gridref: any = useRef();
  const [gridApi, setGridApi]: any = useState(null);

  const setOrUnsetResizeColsToFit = useCallback(
    (sizeColumns: any, columnApi: any) => {
      const allColumnIds: any = [];
      columnApi.getAllColumns().forEach((column: any) => {
        allColumnIds.push(column.getId());
      });
      if (!sizeColumns) columnApi.autoSizeAllColumns(allColumnIds, false);
      else if (gridApi) {
        gridApi.sizeColumnsToFit();
      }
    },
    [gridApi]
  );

  const updateRowData = useCallback(
    (columnApi: any) => {
      gridApi?.setRowData(rowData);
      setOrUnsetResizeColsToFit(true, columnApi);
    },
    [setOrUnsetResizeColsToFit, gridApi, rowData]
  );

  useEffect(() => {
    if (_.get(gridOptions, "current.api")) {
      updateRowData(gridOptions.current.columnApi);
    }
  }, [rowData, updateRowData]);

  const [currentWidth, setCurrentWidth] = useState(null);

  useEffect(() => {
    if (_.get(gridOptions, "current.api")) {
      const gridColApi = gridOptions.current.columnApi;
      gridApi?.setColumnDefs(columnDefs);
      gridApi?.resetRowHeights();

      setOrUnsetResizeColsToFit(true, gridColApi);
    }
  }, [columnDefs, setOrUnsetResizeColsToFit, currentWidth, gridApi]);

  const onResizeLayout = (width: any) => {
    setCurrentWidth(width);
  };
  const onGridReady = useCallback(
    (params: any) => {
      gridOptions.current = params;
      setGridApi(params.api);
      setOrUnsetResizeColsToFit(true, params.columnApi);
    },
    [setOrUnsetResizeColsToFit]
  );

  const gridStyle: any = useMemo(
    () => ({ height: `${TableHeight}vh`, width: "100%", overFlow: "scroll" }),
    [TableHeight]
  );

  const containerStyle: any = useMemo(
    () => ({ width: "100%", height: "100%" }),
    []
  );
  const [_pageCount, setPageCount] = useState(
    Math.ceil(totalDataCount / pageSize)
  );

  useEffect(() => {
    setPageCount(Math.ceil(totalDataCount / pageSize));
  }, [pageSize]);

  const getRowStyle = (params: any) => {
    return {
      background: params.node.rowIndex % 2 === 0 ? "#ffffff" : "#ffffff",
    };
  };

  return (
    <>
      <Paper sx={{ width: "100%" }}>
        <div style={containerStyle}>
          <div
            style={{ ...gridStyle, overFlow: "scroll" }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              ref={gridref}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              enableCellChangeFlash
              getRowStyle={getRowStyle} // Apply row styles
              rowData={rowData}
              animateRows
              onGridReady={onGridReady}
              headerHeight={60}
              onRowClicked={onRowClicked && onRowClicked}
              rowHeight={rowHeight || 50}
              suppressPaginationPanel
              pagination={true}
              overlayLoadingTemplate={
                '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
              }
              overlayNoRowsTemplate={noDataTxt || undefined}
              suppressDragLeaveHidesColumns
              // suppressHorizontalScroll={true}
              suppressMovableColumns={true}
              // gridOptions={gridOptionsNew}
              // alwaysShowVerticalScroll={true}
              // alwaysShowHorizontalScroll={true}
              // enableCellTextSelection={true}
              {...rest}
            >
              {children}
            </AgGridReact>
          </div>
        </div>

        <ReactResizeDetector handleWidth onResize={onResizeLayout} />
      </Paper>
      {rowData?.length > 0 && serverSidePagination && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  mr: 1,
                  fontSize: "14px",
                }}
              >
                Row per page
              </Box>
              <Select
                variant="standard"
                value={pageSize}
                onChange={(e: any) => {
                  // if (totalDataCount < e.target.value) {
                  //   setPage(1);
                  // }
                  setPage(1);
                  setPageSize(e.target.value);
                }}
              >
                {_.map(
                  defaultPagination?.length === 0
                    ? defaultPagination
                    : DEFAULT_PAGINATION_SIZES,
                  (value, idx) => (
                    <MenuItem key={idx} value={value}>
                      {value}
                    </MenuItem>
                  )
                )}
              </Select>
              <Typography sx={{ fontSize: 14 }} pl={3}>
                {totalDataCount === 0
                  ? "No records"
                  : `Showing ${(page - 1) * pageSize + 1} - ${
                      page * pageSize > totalDataCount
                        ? totalDataCount
                        : page * pageSize
                    } of ${totalDataCount} records`}
              </Typography>
            </Box>
          </Box>
          <Pagination
            count={Math.ceil(totalDataCount / pageSize)}
            disabled={loading}
            page={page === 0 ? 1 : page}
            onChange={(_e, page) => {
              setPage(page);
            }}
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
}

export default ServerSideGrid;

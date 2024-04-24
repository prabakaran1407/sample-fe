/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import _ from 'lodash';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Box, MenuItem, Pagination, Select } from '@mui/material';
import Paper from '@mui/material/Paper';

import './style.css';

// interface Iprops extends AgGridReactProps {
//   handleCellClick: any;
//   serverPageCount?: number;
//   serverRowSize?: number;
//   currentPage: number;
//   setServerRowSize?: any;
//   serverSidePagination: boolean;
//   setServerSidePage: any;
//   totalDataCount: number;
//   loading: boolean;
//   disableClickSelectionRenderers: boolean;
//   noDataTxt: string;
//   TableHeight: number;
//   // eslint-disable-next-line react/require-default-props
//   pageginationCount?: number[];

//   pageSize: number;
// }

// const TABLE_HEADER_HEIGHT = 40;

// const StyledBox = styled(Box)((theme: any) => ({
//   position: 'absolute',
//   top: TABLE_HEADER_HEIGHT,
//   paddingTop: '16px',
//   width: '100%',
//   height: '100%',
//   textAlign: 'center',
//   background: '#ffffff',
// }));

// const GridWrapper = styled(Box)(
//   () => ({
//     // '& .ag-center-cols-clipper': {
//     //   background: '#F1F1F1',
//     // },
//     // '&.ag-theme-material .ag-header-container': {
//     //   background: '#F1F1F1',
//     //   color: '#000000',
//     // },
//     // // position: 'relative',
//     // // height: '100VH',
//     // '& .ag-theme-material': {
//     //   '& ::-webkit-scrollbar, ::-webkit-scrollbar-track': {
//     //     width: '10px',
//     //     height: '10px',
//     //     backgroundColor: _.get(
//     //       TableStyles,
//     //       'scrollBar.trackColor',
//     //       'rgba(255, 255, 255, 0)'
//     //     ), // 'transparent'
//     //   },
//     //   '& ::-webkit-scrollbar-thumb': {
//     //     backgroundColor: _.get(
//     //       TableStyles,
//     //       'scrollBar.thumbColor',
//     //       'rgba(213, 213, 220, 1)'
//     //     ),
//     //     // theme.palette.almostBlack[400],
//     //     height: '80px',
//     //     borderRadius: '5px',
//     //   },
//     // },
//     // '& .ag-header': {
//     //   letterSpacing: '2px',
//     //   fontSize: '25px',
//     //   background: '#F1F1F1',
//     //   border: 0,
//     //   '& .ag-pinned-left-header': {
//     //     cursor: 'not-allowed',
//     //     backgroundColor: '',
//     //   },
//     // },
//     // '&.ag-theme-material .ag-header-cell': {
//     //   color: _.get(TableStyles, 'tableStyles.headerTxtColor'),
//     //   fontFamily: 'Poppins',
//     //   fontSize: '14px',
//     // },
//     // '& .ag-header-cell-label': {
//     //   display: 'flex',
//     //   justifyContent: 'center',
//     // },
//     // '&.ag-theme-material .ag-selection-checkbox': {
//     //   justifyContent: 'center',
//     //   // padding: '10px 20px',
//     //   paddingLeft: '14px',
//     // },
//     // '&.ag-theme-material .ag-cell': {
//     //   fontSize: '13px',
//     //   paddingRight: '0px',
//     //   background: '#F1F1F1',
//     //   display: 'flex',
//     //   alignItems: 'center',
//     //   paddingLeft: '1px',
//     //   justifyContent: 'center',
//     //   // paddingLeft: '1px',
//     //   '& .ag-react-container': {
//     //     height: '100%',
//     //     '& div': {
//     //       'white-space': 'nowrap',
//     //       'text-overflow': 'ellipsis',
//     //       overflow: 'hidden',
//     //     },
//     //   },
//     // },
//     // '&.ag-theme-material .ag-cell-focus': {
//     //   border: 'none !important',
//     // },
//     // '&.ag-theme-material .ag-cell-not-inline-editing': {
//     //   border: 'none',
//     // },
//     // '&.ag-theme-material .ag-row': {
//     //   // background: 'grey',
//     //   color: _.get(TableStyles, 'tableStyles.rowTxtColor'),
//     //   borderColor: _.get(TableStyles, 'tableStyles.rowSeparatorColor'),
//     //   '& .ag-cell-last-left-pinned': {
//     //     cursor: 'not-allowed',
//     //     backgroundColor: '',
//     //   },
//     // },
//     // '&.ag-theme-material .ag-row:hover': {
//     //   backgroundColor: 'rgba(250,250,251,1)',
//     // },
//   })
//   // loaderContainer: {
//   //   position: 'absolute',
//   //   top: TABLE_HEADER_HEIGHT,
//   //   paddingTop: '16px',
//   //   width: '100%',
//   //   height: '100%',
//   //   textAlign: 'center',
//   //   background: '#ffffff',
//   // },
// );

function ServerSideGrid(props: any) {
  const {
    columnDefs,
    rowData,
    onRowClicked,
    TableHeight,
    defaultColDef,
    currentPage,
    loading,
    serverPageCount,
    rowHeight,
    noDataTxt,
    children,
    setServerSidePage,
    serverSidePagination,
    pageSize,
    defaultPagination,
    setPage,
    setPageSize,
    ...rest
  } = props;

  const gridOptions: any = useRef();
  const gridref: any = useRef();
  const [gridApi, setGridApi]: any = useState(null);
  const [currentpage, setCurrentpage] = useState(0);
  const [totalPageSize, setTotalPageSize]: any = useState(10);

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

  // const onColumnResized = useCallback((params: any) => {}, [])
  const updateRowData = useCallback(
    (columnApi: any) => {
      gridApi?.setRowData(rowData);
      setOrUnsetResizeColsToFit(true, columnApi);
    },
    [setOrUnsetResizeColsToFit, gridApi, rowData]
  );

  useEffect(() => {
    if (_.get(gridOptions, 'current.api')) {
      updateRowData(gridOptions.current.columnApi);
    }
  }, [rowData, updateRowData]);

  const [currentWidth, setCurrentWidth] = useState(null);

  useEffect(() => {
    if (_.get(gridOptions, 'current.api')) {
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
    () => ({ height: `${TableHeight}vh`, width: '100%' }),
    [TableHeight]
  );

  const containerStyle: any = useMemo(
    () => ({ width: '100%', height: '100%' }),
    []
  );

  const onPaginationChanged = useCallback(() => {
    // Workaround for bug in events order
    if (gridref.current.api) {
      setTotalPageSize(gridref.current.api.paginationGetTotalPages());
    }
  }, []);

  const setPagePagination = (_event: any, page: number) => {
    setCurrentpage(page);

    if (gridref.current.api) {
      gridref.current.api.paginationGoToPage(page - 1);
    }
  };
  return (
    // <GridWrapper className={classnames('ag-theme-material')}>
    //   <>
    //     {loading && <LinearProgress />}
    //     <Box style={gridStyle}>
    <Paper sx={{ width: '100%', padding: '15px' }} elevation={4}>
      <div style={containerStyle}>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact
            ref={gridref}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            enableCellChangeFlash
            rowData={rowData}
            animateRows
            onGridReady={onGridReady}
            headerHeight={40}
            // onColumnResized={onColumnResized}
            onRowClicked={onRowClicked && onRowClicked}
            // onCellClicked={onCellClicked}
            rowHeight={rowHeight || 30}
            // paginationPageSize={10}
            suppressPaginationPanel
            pagination={true}
            overlayLoadingTemplate={
              '<span className="ag-overlay-loading-center">Please wait while your rows are loading...</span>'
            }
            overlayNoRowsTemplate={noDataTxt || undefined}
            onPaginationChanged={onPaginationChanged}
            suppressDragLeaveHidesColumns
            {...rest}
          >
            {children}
          </AgGridReact>
        </div>
      </div>

      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textAlign: 'center',
          margin: '10px',
          width: '100%',
          // margin: '25px 0px',
        }}
      >
        {/* <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Box sx={{ mr: 1 }}>Row per page</Box>
          <Select
            variant="standard"
            disabled={loading}
            value={serverSidePagination ? serverRowSize : rowSize}
            onChange={(e) => {
              !serverSidePagination
                ? setRowSize(Number(e.target.value))
                : setServerRowSize(e.target.value)
              onPageSizeChanged(e.target.value)
            }}
          >
            {_.map(pageginationCount || defaultPagination, (value, idx) => (
              <MenuItem key={idx} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </Box> */}
        <Box
          sx={{
            // position: 'relative',
            // top: '-58px',
            // left: 20,
            width: '50%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                mr: 1,
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Row per page
            </Box>
            <Select
              variant='standard'
              //   disabled={loading}
              value={pageSize}
              onChange={(e: any) => {
                setPage(0);
                setPageSize(e.target.value);
              }}
            >
              {_.map(defaultPagination, (value, idx) => (
                <MenuItem key={idx} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Pagination
          count={serverSidePagination ? serverPageCount : totalPageSize}
          disabled={loading}
          page={!serverSidePagination ? currentpage : currentPage}
          onChange={
            !serverSidePagination ? setPagePagination : setServerSidePage
          }
          shape='rounded'
        />
      </Box>

      <ReactResizeDetector handleWidth onResize={onResizeLayout} />
    </Paper>
  );
}

export default ServerSideGrid;

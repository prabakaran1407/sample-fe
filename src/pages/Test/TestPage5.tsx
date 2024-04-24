/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/** @format */

import { useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import { ColDef } from "@ag-grid-community/core";
import ServerSideGrid from "../../components/MUI/DataGrid/DataGrid";
import { Data } from "./Data";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from "lodash";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IconComponent(props: any) {
  console.log("props", props);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Button
            sx={{
              backgroundColor: "#F4F7F9",
              color: "#000000",
              fontFamily: "Poppins",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
              borderRadius: 8,
            }}
            disableElevation
            fullWidth
            variant="contained"
            // startIcon={<img src={edit} alt='logo' width={25} />}
          >
            Edit
          </Button>
        </Grid>
        <Grid item xs={7}>
          <Button
            sx={{
              backgroundColor: "#F4F7F9",
              color: "#000000",
              fontFamily: "Poppins",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
              borderRadius: 8,
            }}
            disableElevation
            fullWidth
            variant="contained"
            // onClick={() => {
            //   setShowConfirmationModal(true);
            // }}
            // startIcon={<img src={removeIcon} alt='logo' width={25}
            //  />}
          >
            Active
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
function TestPage5() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [totalData] = useState(30);
  const defaultPagination = [10, 20, 30, 40, 50, 100, 200, 500];
  console.log("page12", page);
  // console.log('page', page);
  console.log("pageSize", pageSize);

  console.log("selectedRow", selectedRow);
  const columnDefs: ColDef[] = [
    {
      headerName: "User Name",
      field: "username",
      filter: true,
      width: 500,
      cellStyle: { textTransform: "capitalize" },
    },
    {
      headerName: "Email Address",
      field: "emailAddress",
      filter: true,
      width: 500,
    },
    {
      headerName: "Mobile",
      field: "mobile",
      filter: true,
      width: 500,
    },
    {
      headerName: "Actions",
      field: "",
      width: 400,
      cellRenderer: IconComponent,
      cellRendererParams: {},
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectionChanged = (event: any) => {
    setSelectedRow(event.api.getSelectedRows());
  };
  return (
    <div>
      {/* <StyledBox> */}
      <ServerSideGrid
        rowData={Data}
        headerHeight={60}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          resizable: true,
          filter: true,
          flex: 1,
          minWidth: 100,
        }}
        rowHeight={60}
        handleCellClick={undefined}
        loading={false}
        disableClickSelectionRenderers={false}
        noDataTxt="No Records Found"
        TableHeight={70}
        // rowSelection={rowSelectionType}
        onSelectionChanged={onSelectionChanged}
        pageSize={pageSize}
        totalDataCount={totalData}
        serverRowSize={pageSize}
        currentPage={page}
        serverSidePagination={true}
        serverPageCount={Math.ceil(totalData / pageSize)}
        setServerRowSize={(rowSize: number) => {
          setPageSize(rowSize);
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setServerSidePage={(_e: any, p: number) => {
          setPage(p);
        }}
        defaultPagination={defaultPagination}
        setPageSize={setPageSize}
        setPage={setPage}
      />

      {/* </div> */}
      {/* </StyledBox> */}
    </div>
  );
}

export default TestPage5;

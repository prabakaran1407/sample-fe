/**
 * eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Data } from "../data/DummyData";

import * as _ from "lodash";

import { Grid, Typography } from "@mui/material";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "ag-grid-community";

type Props = {
  className: string;
  tableData: any;
  status: string;
  reRender: () => void;
};

const ClaimCategoryTable: React.FC<Props> = ({ tableData, status }) => {
  const [length, _setLength] = useState("10");
  const [_start, setStart] = useState(0);
  const [_end, setEnd] = useState(parseInt(length));
  const [type, _setType] = useState(null);
  const [choice, _setChoice] = useState(null);
  // const [contactChoice, setContactChoice] = useState(null)
  const [tData, setTData] = useState(tableData);
  const brandOptions: Array<any> = [];
  const [page, setMyPage] = useState(1);

  const columnDefs: ColDef[] = [
    {
      headerName: "Type of Claim",
      field: "organizationName",
      filter: true,
      width: 500,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
    },
    {
      headerName: "Level",
      field: "contactPerson",
      filter: true,
      width: 500,
      suppressMovable: true,
    },
    {
      headerName: "Action",
      field: "emailAddress",
      filter: true,
      width: 100,
      suppressMovable: true,
    },
  ];

  function setPage(_event: any, page: number) {
    setMyPage(page);
    const tableLength = parseInt(length);
    const startLength = tableLength * page - tableLength;
    const endLength =
      Data.length < tableLength * page ? Data.length : tableLength * page;
    setStart(startLength);
    setEnd(endLength);
  }

  useEffect(() => {
    tableData.forEach(({ name }: any) => {
      !brandOptions.includes(name) && brandOptions.push(name);
    });
  });

  useEffect(() => {
    function updateTable(choice: any) {
      if (choice == null && type == null) {
        setTData(tableData);
      } else {
        let FilterData = null;
        if (choice !== null) {
          FilterData = _.filter(tableData, (element) => {
            return element.name === choice;
          });
          if (type !== null) {
            FilterData = _.filter(FilterData, (element) => {
              return element.type === type;
            });
          }
        } else {
          FilterData = _.filter(tableData, (element) => {
            return element.type === type;
          });
        }
        setTData(FilterData);
      }
    }
    updateTable(choice);
  }, [choice, type]);

  useEffect(() => {
    if (Math.floor(tData.length / parseInt(length)) < page) {
      setMyPage(1);
      setStart(0);
      setEnd(tData.length);
    }
  }, [tData, length]);

  useEffect(() => {
    // setMyPage(page)
    const tableLength = parseInt(length);
    if (Math.floor(tData.length / parseInt(length)) < page) {
      setMyPage(1);
      setStart(0);
      setEnd(tData.length);
      return;
    }
    const startLength = tableLength * page - tableLength;
    const endLength =
      Data.length < tableLength * page ? Data.length : tableLength * page;
    setStart(startLength);
    setEnd(endLength);
  }, [length]);
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {status} Categories
            </Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <ContainerBoxV2>
        <AgDataGrid
          rowData={[]}
          columnDefs={columnDefs}
          TableHeight={35}
          rowHeight={45}
          handleCellClick={undefined}
          loading={false}
          disableClickSelectionRenderers={false}
          noDataTxt="No Records Found"
          currentPage={page}
          serverSidePagination={true}
          page={page}
          setPage={setPage}
        />
      </ContainerBoxV2>
    </>
  );
};

export { ClaimCategoryTable };

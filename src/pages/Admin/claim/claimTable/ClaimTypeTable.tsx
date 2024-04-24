/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Data } from "../data/DummyData";

import { Grid, Typography } from "@mui/material";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "ag-grid-community";
import { ACTION_ICON_TYPES } from "../../../../data/AppConst";
import { ActionItems } from "../../../../components/MUI/mui.index";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue";

type Props = {
  className: string;
  tableData: any;
  status: string;
  reRender: () => void;
  setEditModal: any;
  setDeleteModal: any;
  setSelectedId: any;
  setShowActiveModal: any;
  pageNew: any;
  setPageNew: any;
  pageSize: any;
  setPageSize: any;
  totalCount: any;
};

const TypeOfClaimTable: React.FC<Props> = ({
  tableData,
  status,
  setEditModal,
  setSelectedId,
  setDeleteModal,
  setShowActiveModal,
  pageNew,
  setPageNew,
  pageSize,
  setPageSize,
  totalCount,
}) => {
  const [length, _setLength] = useState("10");
  const [_start, setStart] = useState(0);
  const [_end, setEnd] = useState(parseInt(length));
  const [choice, _setChoice] = useState(null);

  const [tData, setTData] = useState(tableData);
  const brandOptions: Array<any> = [];
  const [page, setMyPage] = useState(1);

  const handleEdit = (rowItem: Record<string, any>) => {
    setSelectedId(rowItem?.id);
    setEditModal(true);
  };

  const handleDelete = (rowItem: Record<string, any>) => {
    const id = rowItem.id;
    setSelectedId(id);
    setDeleteModal(true);
  };

  const handleActive = (rowItem: Record<string, any>) => {
    const id = rowItem.id;
    setSelectedId(id);
    setShowActiveModal(true)
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Type of Claim",
      field: "typeOfClaim",
      filter: true,
      width: 800,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "typeOfClaim",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Actions",
      field: "",
      width: 150,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_edit: status==="Active"?true:false,
          can_delete: status==="Active"?true:false,
          can_activate:status==="Active"?false:true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleEdit: handleEdit,
        handleDelete: handleDelete,
        handleActivate:handleActive,
      },
      suppressMovable: true,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  useEffect(() => {
    tableData.forEach(({ name }: any) => {
      !brandOptions.includes(name) && brandOptions.push(name);
    });
  });

  useEffect(() => {
    function updateTable(choice: any) {
      if (choice == null) {
        setTData(tableData);
      } else {
        const tData = tableData.filter(
          (element: { name: any }) => choice && element.name === choice
        );
        setTData(tData);
      }
    }
    updateTable(choice);
  }, [choice]);

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
              {status} Claim Types
            </Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <ContainerBoxV2>
        <AgDataGrid
          rowData={tableData}
          columnDefs={columnDefs}
          TableHeight={35}
          rowHeight={45}
          handleCellClick={undefined}
          loading={false}
          disableClickSelectionRenderers={false}
          noDataTxt="No Records Found"
          pageSize={pageSize}
          totalDataCount={totalCount}
          serverRowSize={pageSize}
          currentPage={pageNew}
          serverSidePagination={Boolean(totalCount)}
          serverPageCount={Math.ceil(totalCount / pageSize)}
          setServerRowSize={(rowSize: number) => {
            setPageSize(rowSize);
          }}
          setServerSidePage={(_e: any, p: number) => {
            setPageNew(p);
          }}
          page={pageNew}
          setPageSize={setPageSize}
          setPage={setPageNew}
        />
      </ContainerBoxV2>
    </>
  );
};

export { TypeOfClaimTable };

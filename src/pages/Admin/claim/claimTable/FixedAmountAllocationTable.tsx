/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import React, { useEffect, useState } from "react";

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
  active: any;
  reRender: () => void;
  page1: number;
  setPage1: any;
  pageLimit1: number;
  setPageLimit1: any;
  total: any;
  setEditModal: any;
  setDeleteModal: any;
  setSelectedId: any;
  setShowActiveModal: any;
};

const FixedAllocationTable: React.FC<Props> = ({
  tableData,
  status,
  setEditModal,
  setSelectedId,
  setDeleteModal,
  setShowActiveModal,
  total,
  setPageLimit1,
  pageLimit1,
  setPage1,
  page1,
}) => {
  const [length, _setLength] = useState("10");
  const [_start, setStart] = useState(0);
  const [_end, setEnd] = useState(parseInt(length));
  const [choice, _setChoice] = useState(null);
  const [tData, setTData] = useState(tableData);

  const brandOptions: Array<any> = [];
  const [page, setMyPage] = useState(1);
  // *********** Pagination
  const [pageNew, _setPageNew] = useState(1);
  const [pageSize, _setPageSize] = useState(10);

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
      field: "typeOfClaim.typeOfClaim",
      filter: true,
      width: 500,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "typeOfClaim.typeOfClaim",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Grade",
      field: "class.className",
      filter: true,
      width: 500,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "class.className",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Role",
      field: "userRole.value",
      filter: true,
      width: 500,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "userRole.value",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Amount",
      field: "amount",
      filter: true,
      width: 500,
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
      width: 500,
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
    tableData?.data?.forEach(({ name }: any) => {
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
    if (tData && Math.floor(tData.length / parseInt(length)) < page) {
      setMyPage(1);
      setStart(0);
      setEnd(tData.length);
    }
  }, [tData, length]);

  useEffect(() => {
    const tableLength = parseInt(length);

    if (!tData || Math.floor(tData.length / tableLength) < page) {
      setMyPage(1);
      setStart(0);
      setEnd(tData ? tData.length : 0);
      return;
    }

    const startLength = tableLength * page - tableLength;
    const endLength =
      tData.length < tableLength * page ? tData.length : tableLength * page;

    setStart(startLength);
    setEnd(endLength);
  }, [tData, length, page]);
  const getListData = async () => {
    try {
      // let payload = {
      //   status: true,
      //   organization_id: '',
      // };
    } catch (e) {}
  };
  // **************** List table api call
  useEffect(() => {
    getListData();
  }, [pageNew, pageSize]);
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              {status} Fixed Amount Allocations
            </Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <ContainerBoxV2>
        <AgDataGrid
          rowData={tableData}
          columnDefs={columnDefs}
          TableHeight={28}
          rowHeight={45}
          handleCellClick={undefined}
          loading={false}
          disableClickSelectionRenderers={false}
          noDataTxt="No Records Found"
          pageSize={pageLimit1}
          totalDataCount={total}
          serverRowSize={pageLimit1}
          currentPage={page1}
          serverSidePagination={Boolean(total)}
          serverPageCount={Math.ceil(total / pageLimit1)}
          setServerRowSize={(rowSize: number) => {
            setPageLimit1(rowSize);
          }}
          setServerSidePage={(_e: any, p: number) => {
            setPage1(p);
          }}
          page={page1}
          setPageSize={setPageLimit1}
          setPage={setPage1}
        />
      </ContainerBoxV2>
    </>
  );
};

export { FixedAllocationTable };

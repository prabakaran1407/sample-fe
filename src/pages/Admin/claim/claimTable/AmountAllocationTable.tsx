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
  active: any;
  reRender: () => void;
  setEditModal: any;
  setEditTravelModal: any;
  setEditRoomModal: any;
  setDeleteModal: any;
  setSelectedId: any;
  setDeleteRoomModal: any;
  setDeleteTravelModal: any;
  setShowActiveModal: any;
  setActiveTravelModal: any;
  setActiveModal: any;
  setActiveRoomModal: any;
  page1: number;
  setPage1: any;
  pageLimit1: number;
  setPageLimit1: any;
  total: any;
};

const AmountAllocationTable: React.FC<Props> = ({
  tableData,
  status,
  active,
  setEditTravelModal,
  setEditRoomModal,
  setDeleteRoomModal,
  setDeleteTravelModal,
  setActiveTravelModal,
  setActiveRoomModal,
  setSelectedId,
  page1,
  setPage1,
  pageLimit1,
  setPageLimit1,
  total,
}) => {
  const [length, _setLength] = useState("10");
  const [_start, setStart] = useState(0);
  const [_end, setEnd] = useState(parseInt(length));
  const [tData, _setTData] = useState<[]>(tableData);

  const [page, setMyPage] = useState(1);

  const handleEdit = (rowItem: Record<string, any>) => {
    setSelectedId(rowItem?.id);
    if (active === 1) {
      setEditTravelModal(true);
    } else {
      setEditRoomModal(true);
    }
  };

  const handleDelete = (rowItem: Record<string, any>) => {
    const id = rowItem.id;
    setSelectedId(id);
    if (status === "Active") {
      if (active === 1) {
        setDeleteTravelModal(true);
      } else {
        setDeleteRoomModal(true);
      }
    }
  };

  const handleActive = (rowItem: Record<string, any>) => {
    const id = rowItem.id;
    setSelectedId(id);
    if (active === 1) {
      setActiveTravelModal(true);
    } else {
      setActiveRoomModal(true);
    }
  };
  

  const columnDefs: ColDef<any, any>[] | null =
    active === 1
      ? [
          {
            headerName: "Type of Travel",
            field: "typeOfTravel",
            filter: true,
            width: 500,
            cellStyle: { textTransform: "capitalize" },
            suppressMovable: true,
            cellRenderer: CustomCellRenderValues,
            cellRendererParams: {
              field: "typeOfTravel",
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
            width: 200,
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
          },
        ]
      : active === 2
      ? [
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
            cellStyle: { textTransform: "capitalize" },
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
            headerName: "Room Rent",
            field: "costOfRoom",
            filter: true,
            width: 500,
            suppressMovable: true,
            cellRenderer: CustomCellRenderValues,
            cellRendererParams: {
              field: "costOfRoom",
            },
            ...GetHeaderParams(),
          },
          {
            headerName: "Actions",
            field: "",
            width: 200,
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
        ]
      : null;

  useEffect(() => {
    if (Math.floor(tData?.length / parseInt(length)) < page) {
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
              {/* {status}  Travel Amount Allocations */}
              <div className="card-title align-items-start flex-column">
                {active !== 0 ? (
                  <span className="card-label fw-bolder fs-3 mb-1">
                    {active === 1
                      ? `${status} Travel Amount Allocations`
                      : active === 2
                      ? `${status} Room Rental Amount Allocations`
                      : status}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <ContainerBoxV2>
        <AgDataGrid
          rowData={tableData}
          columnDefs={columnDefs}
          TableHeight={29}
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

export { AmountAllocationTable };

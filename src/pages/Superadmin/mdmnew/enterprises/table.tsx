import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import {
  ActionConfirmation,
  ActionItems,
  ContainerBoxV2,
} from "../../../../components/MUI/mui.index";
import { ColDef } from "ag-grid-community";
import { useEffect, useState } from "react";
import {
  deleteEnterprise,
  getAllEnterprise,
} from "../../../../../src/services/admin/mdm/policies.service";
import { ACTION_ICON_TYPES } from "../../../../../src/data/AppConst";
import React from "react";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../utils/globals.ts";
import { Box } from "@mui/material";
interface RowData {
  assignee: string;
  taskType: { taskType: string };
  taskStatus: { taskStatus: string };
  timestamp: string;
}
const EnterpriseTable = (props?: any) => {
  const [enterprisesList, setEnterprisesList] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getEnterprise() {
    const enterprises = await getAllEnterprise();
    setEnterprisesList(enterprises?.data?.enterprises);
    setLoading(false);
  }

  async function handleDeleteEnterprise() {
    if (selectedRow?.name) {
      await deleteEnterprise(selectedRow?.name);
      setOpenConfirmation(false);
      getEnterprise();
    }
  }

  function handleDelete(e: any) {
    setSelectedRow(e);
    setOpenConfirmation(true);
  }

  useEffect(() => {
    getEnterprise();
  }, [props?.createFlag]);

  const columnDefs: ColDef[] = [
    {
      headerName: "Enterprise Id",
      field: "name",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "name",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Enterprise Name",
      field: "enterpriseDisplayName",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "enterpriseDisplayName",
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
          // can_cancel: true,
          can_delete: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleDelete: handleDelete,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
  const rowData: RowData[] = [...enterprisesList];
  return (
    <>
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
          <ActionConfirmation
            title={"Delete Enterprise"}
            open={openConfirmation}
            message={`Are you sure you want to delete ${selectedRow?.enterpriseDisplayName} Enterprise?`}
            confirmAction={() => {
              handleDeleteEnterprise();
            }}
            onClose={() => {
              setOpenConfirmation(false);
              setSelectedRow(null);
            }}
            children={<></>}
          />
          <AgDataGrid
            rowData={rowData}
            columnDefs={columnDefs}
            TableHeight={42}
            rowHeight={50}
            handleCellClick={undefined}
            loading={false}
            disableClickSelectionRenderers={false}
            serverSidePagination={false}
            noDataTxt="No Records Found"
          />
        </ContainerBoxV2>
      )}
    </>
  );
};

export default React.memo(EnterpriseTable);

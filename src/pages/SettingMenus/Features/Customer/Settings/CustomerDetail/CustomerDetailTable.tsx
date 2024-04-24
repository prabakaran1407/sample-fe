import React, { useMemo } from "react";
import AgDataGrid from "../../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "ag-grid-community";

import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../../../../data/AppConst";
import {
  ActionConfirmation,
  ActionItems,
} from "../../../../../../components/MUI/mui.index";
import GetHeaderParams from "../../../../../../components/CustomCellAgGrid/CustomHeaderValue";
import CustomCellRenderValues from "../../../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import { generatePath, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../../../../../src/data/AppRoutes";
import { toast } from "react-toastify";
import customerSettingService from "../../../../../../services/settings/customer.setting.service";

type Props = {
  className: string;
  setShow: any;
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
  activatedTab: any;
  getData: () => any;
};

const CustomerDetailTable: React.FC<Props> = ({
  tableData,

  activatedTab,
  pageNew,
  setPageNew,
  pageSize,
  setPageSize,
  totalCount,
  getData
}) => {
  const navigate = useNavigate();
  const handleEdit = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(APP_ROUTES?.SETTINGS?.CUSTOMER?.edit, {
      id: rowItem?.id,
    });
    navigate(pathUrl, {
      state: {
        leadData: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[1],
      },
    });
  };

  const [rowItem, setRowItem] = React.useState<any>({});
  const [_actionType, setActionType] = React.useState<string>(
    ACTION_ICON_TYPES[0]
  );
  const [openConfirmation, setOpenConfirmation] = React.useState<
    Record<string, any>
  >({
    open: false,
    title: null,
    message: null,
  });

  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(APP_ROUTES?.SETTINGS?.CUSTOMER?.view, {
      id: rowItem?.id,
    });
    navigate(pathUrl, {
      state: {
        leadData: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };

  const activeDeactive = async () => {
    try {
      let payload = {
        status: activatedTab === 0 ? false : true,
      } as Record<string, any>;
      let id: any = rowItem.id;
      await customerSettingService.customerActiveDeactive(id, payload);
      // reRender();
      getData()
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handleDelete = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate Customer",
      message: `Are you sure you want to deactivate this Customer?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Customer",
      message: `Are you sure you want to activate this Customer?`,
    });
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Customer",
        field: "customerName",

        filter: true,
        width: 500,
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        ...GetHeaderParams(),
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "customerName",
        },
      },

      {
        headerName: "Actions",
        field: "",
        width: 100,
        cellRenderer: ActionItems,
        cellRendererParams: {
          permission: {
            can_delete: activatedTab === 0 ? true : false,
            can_edit: activatedTab === 0 ? true : false,
            can_view: true,
            can_activate: activatedTab === 0 ? false : true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
          handleDelete: handleDelete,
          handleActivate: handleActivate,
        },
        suppressMovable: true,
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    []
  );
  return (
    <>
      <AgDataGrid
        rowData={tableData}
        columnDefs={columnDefs}
        TableHeight={40}
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
        style={{ border: "1px solid red" }}
      />

      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          activeDeactive();
        }}
        onClose={() => {
          setOpenConfirmation({
            ...openConfirmation,
            open: false,
          });
        }}
        children={<></>}
      />
    </>
  );
};

export default CustomerDetailTable;

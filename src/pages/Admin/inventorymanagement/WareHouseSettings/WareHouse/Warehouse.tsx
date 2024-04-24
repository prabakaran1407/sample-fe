/** @format */

import React, { memo, useEffect, useMemo, useState } from "react";
import AgDataGrid from "../../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx";
import {
  ContainerBoxV2,
  ActionIconButton,
  Textfield,
  // ButtonV1,
  ActionConfirmation,
  PillTab,
  AutoComplete,
  ActionItems,
} from "../../../../../components/MUI/mui.index.tsx";
import { TNestedObj } from "../../../../../types/global.types.ts";
import { Box, Button, Grid, Stack } from "@mui/material";
import { ColDef } from "ag-grid-community";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../data/AppConst.ts";
import CustomCellRenderValues from "../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// ******* Service
import ClaimSettingManagementService from "../../../claim/apis/Claim/TypeOfClaim";
import AmountAllocationService from "../../../claim/apis/Claim/AmountAllocation";

// ************** Util
import {
  getSkipCount,
} from "../../../../../utils/index.ts";
import { COLORS } from "../../../../../utils/globals.ts";
import { useAppSelector } from "../../../../../hooks/index.ts";
import _ from "lodash";

// ************** | Form schema

import { toast } from "react-toastify";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";
import WarehouseModal from "./Components/Modal/index.tsx";
import InventoryrSettingService from "../../../../../../src/services/settings/inventory.service.ts";

// ******************** | Add edit model|*******************

// const validationSchema = yup.object({
//   typeOfClaim: yup
//     .object()
//     .shape({
//       label: yup.string().required("Type of claim is required"),
//       value: yup.string().required("Type of claim is required"),
//     })
//     .required("Type of claim is required"),
//   grade: yup
//     .object()
//     .shape({
//       label: yup.string().required("Grade type is required"),
//       value: yup.string().required("Grade type is required"),
//     })
//     .required("Grade type is required"),
//   role: yup
//     .object()
//     .shape({
//       label: yup.string().required("Role is required"),
//       value: yup.string().required("Role is required"),
//     })
//     .required("Role is required"),
//   amount: yup
//     .string()
//     .trim()
//     .required("Amount is required.")
//     .notOneOf([" "], "Amount should not contain spaces."),
// });

// ********************* | Main List Page | *****************
function WarehouseCreate() {
  const AUTH = useAppSelector((state: any) => state?.auth);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [render, reRender] = useState(0);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [typeOfClaim, setTypeOfClaim] = useState<Record<string, any>[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };
  console.log("setIsActive", isActive);

  //******************** handle */
  const handleModalOpen = (setType: string) =>
    setType === "OPEN" ? setOpenModal(true) : setOpenModal(false);
  const handleClose = () => setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleDelete = (value: TNestedObj) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate Warehouse",
      message: `Are you sure you want to deactivate this Warehouse?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Warehouse",
      message: `Are you sure you want to activate Warehouse?`,
    });
  };

  const getList = async () => {
    setSpinner(true);
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
    };
    const response = await InventoryrSettingService.getAllWarehouse(payload);

    console.log("response", response);

    if (response?.status) {
      setTableData(response?.data?.response?.list || []);
      setTotalCount(response?.data?.response?.totalCount || 0);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab, selectedClaim]);

  const activeDeactive = async () => {
    setActionLoading(true);
    try {
      let data = {
        status: !isActive,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      } as Record<string, any>;
      let id: any = rowItem._id;
      await InventoryrSettingService.updateWarehouse(data, id);
      getList();
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
    setActionLoading(false);
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Type Of Warehouse",
        field: "warehouse_type",
        filter: true,
        width: 400,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "warehouse_type",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Warehouse",
        field: "warehouse_type",
        filter: true,
        width: 400,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "warehouse",
        },
        ...GetHeaderParams(),
      },

      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 300,
        cellRenderer: ActionItems,
        cellRendererParams: {
          permission: {
            can_delete: activatedTab === 0 ? true : false,
            // can_edit: activatedTab === 0 ? true : false,
            // can_view: true,
            can_activate: activatedTab === 0 ? false : true,
          },
          enableActions: ACTION_ICON_TYPES,
          // handleEdit: handleEdit,
          // handleView: handleView,
          handleDelete: handleDelete,
          handleActivate: handleActivate,
        },
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    [activatedTab]
  );

  const TABS = useMemo(
    () => [
      {
        label: "Active Warehouse",
        icon: <CheckCircle fontSize="small" />,
      },
      {
        label: "Deactivated Warehouse",
        icon: <Cancel fontSize="small" />,
      },
    ],
    []
  );

  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={8}>
              <PillTab
                tabMenus={TABS}
                selectedTab={handleTabSelect}
                value={activatedTab}
              />
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <AutoComplete
                    options={typeOfClaim}
                    getOptionLabel={(option: any) => {
                      return option.label;
                    }}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type="text"
                        name="typeOfClaim"
                        placeholder="Select Warehouse"
                      />
                    )}
                    fullWidth
                    value={selectedClaim}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      setSelectedClaim(selectedOption);
                    }}
                  />
                  <ActionIconButton
                    actionType={ACTION_ICON_TYPES[6]}
                    sx={{
                      background: COLORS.primary,
                      borderRadius: 1,
                      width: 38,
                      height: 38,
                      mx: 1,
                      "&:hover": {
                        background: COLORS.secondary,
                      },
                    }}
                    onClick={() => {
                      getList();
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      setOpenModal(true);
                    }}
                    sx={{ height: 38 }}
                  >
                    <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ContainerBoxV2>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            {spinner ? (
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
              <AgDataGrid
                rowData={tableData}
                columnDefs={columnDefs}
                TableHeight={55}
                rowHeight={50}
                noDataTxt="No Records Found"
                loading={false}
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
            )}
          </Grid>
        </ContainerBoxV2>
        <WarehouseModal
          actionType={actionType}
          handleClose={handleClose}
          open={openModal}
          data={rowItem}
          refresh={() => {
            getList();
          }}
          render={render}
        />
      </div>

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
        loading={actionLoading}
        children={<></>}
      />
    </>
  );
}

export default memo(WarehouseCreate);

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
// Modules.js

import React, { useEffect, useState, useMemo } from "react";
import {
  ActionIconButton,
  ActionItems,
  ContainerBoxV2,
  ActionConfirmation,
  PillTab,
} from "../../../components/MUI/mui.index";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import ModuleService from "../../../services/super-admin/modulesservice";

import { ACTION_ICON_TYPES, MODULE_TYPES } from "../../../data/AppConst";
import AddEditViewModal from "./add-edit-view/AddEditViewModal";

import { TNestedObj } from "../../../types/global.types";
import { toast } from "react-toastify";

// ********** utils
import { getSkipCount } from "../../../utils/index";
import { CustomDivier } from "../../../components/APP/app.index";
import { useAppSelector } from "../../../hooks/index";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";

// ************* Icons
import ActiveIcon from "@mui/icons-material/CheckCircleRounded";
// import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { COLORS } from "../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";

const Modules = () => {
  const AUTH = useAppSelector((state: Record<string, any>) => state.auth);
  // ******************** State
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj | any>({});
  const [loading, setLoading] = useState(true);

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

  // ************* Active De-active
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  //******************** handle */
  const handleModalOpen = (setType: string) =>
    setType === "OPEN" ? setOpenModal(true) : setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    console.log("EDIT >>>>>", value);
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
  };

  const handleDelete = (value: TNestedObj) => {
    setRowItem(value);
    if (activatedTab === 0) {
      setOpenConfirmation({
        open: true,
        title: "Deactive: Module",
        message: `When '${value?.moduleName
          ?.toString()
          ?.toUpperCase()}' is deactivated, its child modules are automatically disabled`,
      });
    } else {
      setOpenConfirmation({
        open: true,
        title: "Activate: Module",
        message: `Do you really want to activate '${value?.moduleName
          ?.toString()
          ?.toUpperCase()}' and its child modules?`,
      });
    }
  };

  const deactivate = async () => {
    try {
      let payload = {
        isActive: true,
      };
      let deactiveRes = await ModuleService.deactivateModule(
        rowItem?._id,
        payload
      );
      console.log("deactiveRes", deactiveRes);
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
      getList();
    } catch (error: any) {
      console.log("error", error);
      error = error.response;
      toast.error(error?.data?.message || "", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const handleActivate = (value: TNestedObj) => {
    setRowItem(value);
    setOpenConfirmation({
      open: true,
      title: "Activate: Module",
      message: `Do you really want to activate '${value?.moduleName
        ?.toString()
        ?.toUpperCase()}' and its child modules?`,
    });
  };

  const activate = async () => {
    try {
      let payload = {
        isActive: false,
      };
      let activateRes = await ModuleService.activateModule(
        rowItem?._id,
        payload
      );
      console.log("activateRes", activateRes);
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
      getList();
    } catch (error: any) {
      console.log("error", error);
      error = error.response;
      toast.error(error?.data?.message || "", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  async function getList() {
    try {
      setLoading(true);
      let payload = {
        moduleType: MODULE_TYPES[0],
        condtion: {
          status: isActive,
        },
        skip: getSkipCount(page, pageSize),
        limit: pageSize,
      };
      let listData: Record<string, any> = await ModuleService.getModules(
        payload
      );
      listData = listData?.data?.response;
      console.log("listData >>>>>", listData);
      setTableData(listData?.data);
      setTotalCount(listData?.totalCount);
    } catch (e) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Parent Modules",
        field: "moduleName",
        filter: true,
        width: 500,
        cellStyle: { textTransform: "capitalize" },
        ...GetHeaderParams(),
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "moduleName",
        },
      },
      {
        headerName: "Child Modules",
        field: "modules.moduleName",
        filter: true,
        // cellRenderer: ChildRenderer,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "modules.moduleName",
        },
        ...GetHeaderParams(),
      },
      // {
      //   headerName: "Status",
      //   field: "status",
      //   filter: true,
      //   width: 400,
      //   // headerComponent: StatusHeader,
      //   ...GetHeaderParams({
      //     display: "flex",
      //     justifyContent: "center",
      //     width: "100%",
      //   }),
      //   cellRenderer: StatusCellRenderer,
      // },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 400,
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
        cellRenderer: ActionItems,
        cellRendererParams: {
          // handleEdit: handleopenModal,
          permission: {
            // can_cancel: true,
            can_delete: activatedTab === 0 ? true : false,
            can_edit: activatedTab === 0 ? true : false,
            can_view: true,
            can_refresh: false,
            can_activate: activatedTab === 0 ? false : true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
          handleDelete: handleDelete,
          handleActivate: handleActivate,
        },
      },
    ],
    [isActive]
  );
  // **************** Active, Inactive
  const tab = useMemo(
    () => [
      {
        label: "Active Modules",
        icon: <ActiveIcon fontSize="small" />,
      },
      {
        label: "Deactive Modules",
        icon: <BlockIcon fontSize="small" />,
      },
    ],
    []
  );

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };

  return (
    <>
      <div>
        <ContainerBoxV2>
          <Grid container xs={12}>
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                  Modules
                </Typography>
                <Box>
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
                    sx={{
                      height: 38,
                    }}
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      handleModalOpen("OPEN");
                    }}
                  >
                    <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ContainerBoxV2>
        <CustomDivier />
        <ContainerBoxV2>
          <PillTab
            tabMenus={tab}
            selectedTab={handleTabSelect}
            value={activatedTab}
          />
          <Grid container xs={12}>
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
              <AgDataGrid
                rowData={tableData}
                columnDefs={columnDefs}
                TableHeight={50}
                rowHeight={50}
                noDataTxt="No Records Found"
                loading={false}
                serverSidePagination={true}
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
      </div>
      <AddEditViewModal
        open={openModal}
        handleClose={() => {
          handleModalOpen("CLOSE");
        }}
        actionType={actionType}
        data={rowItem}
        refresh={() => {
          getList();
        }}
        AUTH={AUTH}
      />
      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          console.log("Action confirm");

          activatedTab === 0 ? deactivate() : activate();
        }}
        onClose={() => {
          setOpenConfirmation({
            ...openConfirmation,
            open: false,
          });
        }}
        children={<></>}
      />
      {/* <BackDropLoaderV2 loading={loading} /> */}
    </>
  );
};

export default Modules;

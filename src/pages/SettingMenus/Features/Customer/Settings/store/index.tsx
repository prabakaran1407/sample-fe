import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ActionIconButton } from "../../../../../../../src/components/MUI/Buttons/Button";
import { PillTab } from "../../../../../../../src/components/MUI/Tabs/Tabs";
import { ACTION_ICON_TYPES } from "../../../../../../../src/data/AppConst";
import { COLORS } from "../../../../../../../src/utils/globals";
import StoreModal from "./modal";
import InventoryrSettingService from "../../../../../../../src/services/settings/inventory.service.ts";
import { useAppSelector } from "../../../../../../hooks/index.ts";
import { ColDef } from "ag-grid-community";
import AgDataGrid from "../../../../../../../src/components/AG-GRID/DataGrid/AgDataGrid.tsx";
import GetHeaderParams from "../../../../../../../src/components/CustomCellAgGrid/CustomHeaderValue.tsx";
import CustomCellRenderValues from "../../../../../../../src/components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import ActionItems from "../../../../../../../src/components/MUI/Actionitems/ActionItems.tsx";
import PropagateLoader from "../../../../../../../src/components/PorpagateLoader/PropagateLoader.tsx";
import { toast } from "react-toastify";
import generalService from "../../../../../../../src/services/genearls/general.service.ts";

const StoreSettings = () => {
  const TABS = [
    {
      label: "Active Store",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Deactivated Store",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [_actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [showModal, setShow] = useState(false);
  const AUTH = useAppSelector((state: { auth: any }) => state.auth);
  const [storeData, setStoreData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const [filterObject, setFilterObject] = useState<any>();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedData, setSelectedData] = useState<any>();
  const [filter, setFilter] = useState<{
    status: boolean;
    store: string;
  }>({
    status: true,
    store: "",
  });

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setFilter({
      ...filter,
      status: TABS[selection].status,
    });
  };

  const getDropdownData = async () => {
    try {
      const payload: any = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: true,
      };

      const response = await generalService.accessModel("store", payload);
      console.log(response?.data);
      setFilterObject(response?.data);
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const payload: any = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: filter?.status,
      };
      if (filter?.store) {
        payload.id = filter?.store;
      }

      if (pageSize) {
        payload.limit = pageSize;
      }
      if (page) {
        payload.skip = (page - 1) * pageSize;
      }
      const response = await InventoryrSettingService.getAll(payload);

      setTotalCount(response?.data?.response?.totalCount);

      setStoreData(response?.data?.response?.list);
      console.log(response?.data?.response?.list?.[0]);
    } catch (e) {
      console.error("ERROR", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (rowItem: Record<string, any>) => {
    setSelectedData(rowItem);
    setShow(true);
    setIsView(false);
  };

  const handleView = (rowItem: Record<string, any>) => {
    setSelectedData(rowItem);
    setShow(true);
    setIsView(true);
  };

  const handleDelete = async (rowItem: Record<string, any>) => {
    try {
      setLoading(true);
      const payload: any = {
        ...rowItem,
        status: false,
      };

      await InventoryrSettingService.activatedeactivateStore({
        payload: payload,
        id: rowItem?._id,
      });

      refreshData();
      setSelectedData(null);

      toast.success("Store deleted successfully");
    } catch (err: any) {
      console.error("Error updating store", err);
      toast.error(err?.response?.data?.message || "Error updating store");
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async (rowItem: Record<string, any>) => {
    try {
      setLoading(true);
      const payload: any = {
        ...rowItem,
        status: true,
      };

      await InventoryrSettingService.activatedeactivateStore({
        payload: payload,
        id: rowItem?._id,
      });

      refreshData();
      setSelectedData(null);

      toast.success("Store activated successfully");
    } catch (err: any) {
      console.error("Error updating store", err);
      toast.error(err?.response?.data?.message || "Error updating store");
    } finally {
      setLoading(false);
    }
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Store Name",
        field: "store",

        filter: true,
        width: 500,
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        ...GetHeaderParams(),
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "store",
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
    [activatedTab]
  );

  const refreshData = () => {
    getData();
  };

  useEffect(() => {
    getDropdownData();
  }, []);

  useEffect(() => {
    getData();
  }, [filter, page, pageSize]);

  console.log("filter", filter);

  return (
    <Box>
      <Grid container xs={12}>
        <Grid item xs={8}>
          <PillTab
            tabMenus={TABS}
            selectedTab={handleTabSelect}
            value={activatedTab}
          />
        </Grid>
        <Grid xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" justifyContent={"space-between"}>
            <Grid item xs={4} sx={{ marginRight: "12px" }}>
              <Autocomplete
                value={
                  filterObject?.find(
                    (item: any) => item.id === filter?.store
                  ) || null
                }
                onChange={(_event, newValue: any) =>
                  setFilter({
                    ...filter,
                    store: newValue?.id || "",
                  })
                }
                options={filterObject || []}
                getOptionLabel={(option: any) => option.store}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    label="store"
                    variant="outlined"
                    sx={{ width: 130 }}
                  />
                )}
              />
            </Grid>
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
                  getData();
                }}
              />
              <Button
                variant="contained"
                onClick={(_elements: any) => {
                  setActionType(ACTION_ICON_TYPES[0]);
                  setShow(true);
                }}
                sx={{ height: 38 }}
              >
                <Add sx={{ fontSize: 18, mr: 1 }} /> Add
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      {loading ? (
        <Box
          sx={{
            height: "45vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PropagateLoader />
        </Box>
      ) : (
        <AgDataGrid
          rowData={storeData}
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
          currentPage={page}
          serverSidePagination={Boolean(totalCount)}
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
          style={{ border: "1px solid red" }}
        />
      )}
      <StoreModal
        isOpen={showModal}
        handleClose={(isClose: boolean) => {
          setShow(isClose);
        }}
        formData={selectedData}
        refreshData={refreshData}
        isEdit={selectedData ? true : false}
        setSelectedData={setSelectedData}
        isView={isView}
        setIsView={setIsView}
      />
    </Box>
  );
};

export { StoreSettings };

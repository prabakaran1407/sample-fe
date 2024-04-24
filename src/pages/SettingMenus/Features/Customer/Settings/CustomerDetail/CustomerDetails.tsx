import { Autocomplete, Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { CustomerDetailModal } from "./CustomerDetailModal";
import {
  ActionIconButton,
  MyDrawer,
  PillTab,
} from "../../../../../../../src/components/MUI/mui.index";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { COLORS } from "../../../../../../../src/utils/globals";
import { ACTION_ICON_TYPES } from "../../../../../../../src/data/AppConst";
import ProductSettingBulkUpload from "../../../Products/Bukupload/ProductSettingBulkUpload";
import { useAppSelector } from "../../../../../../../src/hooks";
import {
  GET_CONST_FROM_AUTH,
  getSkipCount,
} from "../../../../../../utils/index.ts";
import customerSettingService from "../../../../../../../src/services/settings/customer.setting.service.ts";
import PropagateLoader from "../../../../../../../src/components/PorpagateLoader/PropagateLoader.tsx";
import CustomerDetailTable from "./CustomerDetailTable.tsx";

function CustomerDetails() {
  const TABS = [
    {
      label: "Active Customer",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Deactivated Customer",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];
  const [showModal, setShow] = useState(false);
  const [_editModal, setEditModal] = useState(false);
  const [_deleteModal, setDeleteModal] = useState(false);
  const [_selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [_showActiveModal, setShowActiveModal] = useState(false);
  const [_renderActiveModal, _setRenderActiveModal] = useState(false);
  const user = useSelector(({ auth }) => auth);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [_actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const AUTH = useAppSelector((state: any) => state?.auth);
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  const [filterobject, setFilterObject] = useState<any>({});
  console.log('filterObjectCX',filterobject)
  const [filterValue, setFilterValue] = useState<any>([]);
  console.log("filtervalueCX",filterValue)
  const list = "DROPDOWN_LIST"

  async function getData() {
    let payload = {
      status: isActive,
      organization_id: user.data.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      value: filterobject?.value || '',
    };
    try {
      setLoading(true);
      const res = await customerSettingService.getAll(payload);
      const activeData = res?.data?.data.filter(
        (item: { status: boolean }) => item.status === true
      );
      const deactivatedData = res?.data?.data.filter(
        (item: { status: boolean }) => item.status === false
      );
      setTableData(isActive ? activeData : deactivatedData);
      setTotalCount(isActive ? res?.data?.total : deactivatedData.length);
    } catch (err: any) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [page, pageSize, activatedTab, filterobject]);


  async function getDataForFilter() {
    let payload = {
      status: isActive,
      organization_id: user.data.userRecord?.organization_id,
      // skip: getSkipCount(page, pageSize),
      // limit: pageSize,
      list: list
    };
    try {
      setLoading(true);
      const res = await customerSettingService.getAll(payload);
      console.log("responsecx",res?.data?.data)
      setFilterValue(res?.data?.data);
      console.log("isActiveCX",isActive)
    } catch (err: any) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataForFilter();
  }, [activatedTab]);

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };

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
                <Grid item xs={4} sx={{marginRight:"12px"}}>
                  <Autocomplete
                    value={filterobject?.label}
                    onChange={(_event, newValue) =>
                      setFilterObject(newValue)
                    }
                    options={filterValue}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        label="Customer"
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
              {/* <ActionIconButton
                    actionType={ACTION_ICON_TYPES[7]}
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
                      setActionType(ACTION_ICON_TYPES[7]);
                      setDrawerOpen(true);
                    }}
                  /> */}
              <Button
                variant="contained"
                onClick={(_elements: any) => {
                  setActionType(ACTION_ICON_TYPES[0]);
                  // setchoice(elements);
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
      <MyDrawer
        anchor={"right"}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        onClose={undefined}
        onOpen={() => {
          undefined;
        }}
        drawerWidth="40%"
        title="Brand bulkupload"
      >
        <ProductSettingBulkUpload
          setting_type={CONSTANT_DATA?.PRODUCT_SETTING_TYPES[0]}
          sub_type={CONSTANT_DATA?.PRODUCT_SETTING_SUB_TYPES[0]}
        />
      </MyDrawer>
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
        <CustomerDetailTable
          reRender={() => {
            setLoading(true);
            getData();
          }}
          status={isActive ? "Active" : "De-Activated"}
          className="w-100 mb-5 mt-5 mb-xl-8"
          tableData={tableData}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
          setSelectedId={setSelectedId}
          setShowActiveModal={setShowActiveModal}
          setShow={setShow}
          pageNew={page}
          setPageNew={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={totalCount}
          activatedTab={activatedTab}
          getData={getData}
        />
      )}

      {showModal && (
        <CustomerDetailModal
          id={undefined}
          show={showModal}
          handleClose={(refreshFlag: any) => {
            getData();
            setShow(false);
            if (!refreshFlag) return;
            setLoading(true);
          }}
          refresh={() => {
            getData();
          }}
        />
      )}
    </Box>
  );
}

export default CustomerDetails;

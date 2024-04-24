/** @format */

import * as React from "react";

import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Stack } from "@mui/material";
import {
  ActionConfirmation,
  ActionIconButton,
  ActionItems,
  ContainerBoxV2,
  PillTab,
} from "../../../components/MUI/mui.index";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useEffect, useState, useMemo } from "react";

import { getUserListForAdmin } from "../../../components/com_components/CustomerSettingsAPI";
import { useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "../../../data/AppRoutes";
import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from "../../../data/AppConst";
import AUMService from "../../../services/admin/UserManagemet.service.ts";
import { getSkipCount } from "../../../utils/index.ts";
import { CustomDivier } from "../../../components/APP/app.index";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";
// ************** Icon
import {  Cancel, CheckCircle } from "@mui/icons-material";

import { toast } from "react-toastify";

import { COLORS } from "../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";

export default function ActionAreaCard() {
  const user: any = useAppSelector((state: any) => state.auth).data.userRecord;
  const navigate = useNavigate();

  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [activeBox, _setActiveBox] = useState(null);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [rowItem, setRowItem] = useState<Record<string, any>>();
  const [spinner, setSpinner] = useState<boolean>(false);
  const [selectedAction, setSelectedActions] = useState<string>("");

  const [_UserTypeOptions, setUserTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  const getUserData = async () => {
    await getUserListForAdmin(user?.organization_id)
      .then((res) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(({ _id, firstName }: any) => {
          return {
            label: `${firstName}`,
            value: _id,
          };
        });
        setUserTypeOptions(categoriesOption);
        // setTableData(res?.data);
      })
      .catch((err: any) => console.log(err.message));
  };

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };

  useEffect(() => {
    // getClaimUser();
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const auth = useAppSelector((state) => state.auth);

  const handleEdit = (rowItem: Record<string, any>) => {
    navigate(APP_ROUTES?.ADMIN?.USERMANAGEMENT?.EDIT?.pathName, {
      state: {
        userId: rowItem?._id,
        actionType: AUM_FORM_ACTION_TYPES[1],
      },
    });
  };

  const handleView = (rowItem: Record<string, any>) => {
    navigate(APP_ROUTES?.ADMIN?.USERMANAGEMENT?.VIEW?.pathName, {
      state: {
        userId: rowItem?._id,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };

  const handleDelete = (value: Record<string, any>) => {
    setRowItem(value);
    setSelectedActions(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate User",
      message: (
        <div>
          Are you sure you want to deactivate this user?
          <br />
          {value?.firstName} {value?.lastName}
        </div>
      ),
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    console.log("handleActivate >>>>>>", value);
    setRowItem(value);
    setSelectedActions(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate User",
      message: (
        <div>
          Are you sure you want to activate this user?
          <br />
          {value?.firstName} {value?.lastName}
        </div>
      ),
    });
  };
  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Name",
        field: "firstName",
        filter: true,
        width: 400,
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "firstName",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Role",
        field: "role.role",
        filter: true,
        width: 400,
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "role.role",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Email",
        field: "emailAddress",
        filter: true,
        width: 400,
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "emailAddress",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Mobile",
        field: "mobile",
        filter: true,
        width: 400,
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "mobile",
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
        pinned: "right",
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    [activatedTab]
  );

  if (activeBox === 1) {
    columnDefs[0].headerName = "Payer";
  }
  if (activeBox === 2) {
    columnDefs[0].headerName = "Approved";
  }

  const getList = async () => {
    try {
      setSpinner(true);
      const payload = {
        populate: true,
        select: [
          "firstName",
          "lastName",
          "id",
          "emailAddress",
          "mobile",
          "status",
          "isAdmin"
        ],
        limit: pageSize || 0,
        skip: getSkipCount(page, pageSize),
        where: {
          status: isActive,
        },
        organization_id: auth?.data?.userRecord?.organization_id,
        isAdmin: false,
      };
      let listData = await AUMService.getAll(payload);
      listData = listData.data;
      console.log("listData >>>>>>", listData);
      setTableData(listData?.data?.length > 0 ? listData.data : []);
      setTotalCount(listData?.totalCount);
      setSpinner(false);
    } catch (e) {
      console.log("error");
    }
  };

  // ***********Pagination
  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab]);
  const tab = [
    {
      label: "Active Users",
      icon: <CheckCircle fontSize="small" />,
    },
    {
      label: "Deactivated Users",
      icon: <Cancel fontSize="small" />,
    },
  ];

  const activeDeactive = async () => {
    try {
      let payload = {
        organization_id: user?.data?.userRecord?.organization_id,
        status: !isActive,
        currentStatus: isActive,
        actionType: selectedAction,
      };
      await AUMService.deactivate(rowItem?._id, payload);
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
  };

  return (
    <>
      <ContainerBoxV2 styles={{ position: "sticky", zIndex: 999 }}>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                User Management
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
                  onClick={() => {
                    navigate(APP_ROUTES?.ADMIN?.USERMANAGEMENT?.ADD?.pathName, {
                      state: {
                        userId: null,
                        actionType: AUM_FORM_ACTION_TYPES[0],
                      },
                    });
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
      <CustomDivier style={{ marginTop: "0px" }} />

      <ContainerBoxV2>
        <PillTab
          tabMenus={tab}
          selectedTab={handleTabSelect}
          value={activatedTab}
        />
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
              TableHeight={52}
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
            />
          )}
        </Grid>
      </ContainerBoxV2>
      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          console.log("Action confirm");
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
}

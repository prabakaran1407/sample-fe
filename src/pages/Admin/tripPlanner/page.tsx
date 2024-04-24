/** @format */

import * as React from "react";

import Typography from "@mui/material/Typography";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import {
  ActionIconButton,
  ActionItems,
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../../components/MUI/mui.index";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useState, useMemo } from "react";

import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
  TRIP_PLANNER_TYPE,
  TRIP_PLANNER_DATE_RECURRING_TYPES
} from "../../../data/AppConst";

import { CustomDivier } from "../../../components/APP/app.index";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

import { COLORS } from "../../../utils/globals.ts";
import { Add } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";
import { generatePath, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import { useAppSelector } from "../../../hooks/index.ts";
import { getSkipCount } from "../../../utils/index.ts";
import tripplannerService from "../../../services/admin/tripplanner/tripplanner.service.ts";
import TypeRenderer from "./cellRenderers/typeRenderer.tsx";
import RecurringTypeRenderer from "./cellRenderers/recurringTypeRenderer.tsx";
import FilterListIcon from "@mui/icons-material/FilterList";
import GeneralApiService from "../../../services/genearls/general.service.ts";
import { dayStartOrEnd } from '../../../utils/datetime.ts'


export default function TripPlanner() {
  const navigate = useNavigate();
  const user: any = useAppSelector((state: any) => state.auth).data.userRecord;
  const [CONST, _setCONST] = useState(user?.CONSTANT_DATA)
  console.log('CONST >>>>>>>>',user)
  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openModel, setOpenModel] = useState(false);

  const [spinner, setSpinner] = useState<boolean>(false);

  const [filterOptions, setFilterOptions] = useState<any>({})
  const [filterDropDowns, setFilterDropDowns] = useState<any>({
    users: []
  })
  
  const handleEdit = (rowItem: Record<string, any>) => {
    
    if([CONST?.TRIP_PLAN_STATUS[0]].includes(rowItem.tripPlanStatus)){
      navigate(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.CREATE?.pathName, {
        state: {
          id: rowItem?._id,
          actionType: ACTION_ICON_TYPES[1],
        },
      });
    }
  };

  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(APP_ROUTES?.ADMIN?.TRIP_PLANNER?.VIEW, {
      id: rowItem?._id,
      actionType: ACTION_ICON_TYPES[1],
    });
    navigate(pathUrl, {
      state: {
        id: rowItem?._id,
        TripView: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
    console.log(rowItem, "rowItem");
  };

  const getAllTripPlan = async () => {
    try {
      setSpinner(true);
      const payload = {
        status: true,
        limit: pageSize || 0,
        skip: getSkipCount(page, pageSize),
        organization_id: user?.organization_id,
        users: filterOptions?.users?.value ? [filterOptions?.users?.value] : [],
        customers: filterOptions?.customers?.value ? filterOptions?.customers?.value : null,
        recurringTypes: filterOptions?.recurringTypes?.value ? filterOptions?.recurringTypes?.value : null,
      } as any;
      if (Object.values(filterOptions).some(sm => Boolean(sm))) {
        payload.fromDate = filterOptions?.fromDate ? dayStartOrEnd(filterOptions?.fromDate)?.valueOf() : null
        payload.toDate = filterOptions?.toDate ? dayStartOrEnd(filterOptions?.toDate, 'END')?.valueOf() : null
      } else {
        payload.fromDate = dayStartOrEnd(new Date())?.valueOf()
        payload.toDate = dayStartOrEnd(new Date(), 'END')?.valueOf()
      }
      
      let query = "?isCount=true";
      let listData = await tripplannerService.getAllTrips(payload, query);
      listData = listData?.data?.response;
      setTableData(listData?.data?.length > 0 ? listData.data : []);
      setTotalCount(listData?.count);
      setSpinner(false);
    } catch (e) {
      console.log("error");
    }
  };
  const getFilterOptions = async () => {
    let tempObj = {} as any
    const users = await GeneralApiService.accessModel("user", {
      where: {
        organization_id: user?.organization_id,
        status: true,
        isAdmin: false,
      },
      select: [ "firstName",
      "lastName",],
    });
    
    tempObj.users = users?.data?.length > 0 ?
      users?.data?.map((m: any) => ({ label: `${m?.firstName} ${m?.lastName}` , value: m?.id})) :
      []
    
    setFilterDropDowns({
      ...tempObj
    })
    console.log('users >>>>>>>>>', users)
  }
  const handleFilterChange = (key: string, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [key]: value
    })
  }

  React.useEffect(() => {
    getAllTripPlan();
  }, [page, pageSize]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "User",
        field: "users.fullname",
        filter: true,
        width: 300,
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "users.fullname",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Date",
        field: "planDate",
        filter: true,
        width: 300,
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: () => ({
          field: "planDate",
          length: false,
          formatter: (value: any) =>
            value ? new Date(value).toLocaleDateString() : "",
        }),
        ...GetHeaderParams(),
      },
      {
        headerName: "Type",
        field: "type",
        filter: true,
        width: 300,
        suppressMovable: true,
        cellRenderer: TypeRenderer,
        cellRendererParams: {
          field: "type",
        },
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
      {
        headerName: "Recurring Type",
        field: "recurringType",
        filter: true,
        width: 300,
        suppressMovable: true,
        cellRenderer: RecurringTypeRenderer,
        cellRendererParams: {
          field: "recurringType",
        },
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
      {
        headerName: "Actions",
        field: "",
        width: 200,
        cellRenderer: ActionItems,
        cellRendererParams: {
          permission: {
            can_edit: true,
            can_view: true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
          // cb: (tempData: any) =>  = ['inprogress', 'completed'].includes(tempData.tripPlanStatus) ? 
        },
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    []
  );
  React.useEffect(() => {
    getFilterOptions()
  }, [])

  return (
    <>
      <ContainerBoxV2 styles={{ position: "sticky", zIndex: 999 }}>
        <Grid container>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Trip Planner
              </Typography>
              <Box sx={{ display: 'flex', gap: '2px'}}>
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
                    getAllTripPlan();
                  }}
                />
                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[11]}
                  sx={{
                    background: COLORS.primary,
                    borderRadius: 1,
                    width: 38,
                    height: 38,
                    "&:hover": {
                      background: COLORS.secondary,
                    },
                  }}
                  onClick={() => {
                    setOpenModel(true);
                  }}
                  title="Filter"
                >
                  <FilterListIcon sx={{ color: "white", fontSize: 16 }} />
                </ActionIconButton>
                <Box>

                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate(
                        APP_ROUTES?.ADMIN?.TRIP_PLANNER?.CREATE?.pathName,
                        {
                          state: {
                            id: null,
                            actionType: ACTION_ICON_TYPES[0],
                          },
                        }
                      );
                    }}
                    sx={{ height: 38 }}
                  >
                    <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <ContainerBoxV2>
        <Grid container>
          <Grid item xs={12}>
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
                TableHeight={56}
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
        </Grid>
        <ActionModal
        open={openModel}
        onClose={() => {
          setOpenModel(false);
        }}
        title="Advance filter | select atleast one filter"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 1,
          }}
        >
          <Box style={{ width: "100%" }}>
              <Grid container xs={12} spacing={2}>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={6} >
                    <Textfield
                      fullWidth
                      label="From Date"
                      type="date"
                      name="fromDate"
                      onChange={(e: any) => {
                        handleFilterChange("fromDate", e.target.value);
                      }}
                      InputLabelProps={{ shrink: true }}
                      value={filterOptions?.fromDate}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Textfield
                      fullWidth
                      label="To Date"
                      type="date"
                      name="toDate"
                      onChange={(e: any) => {
                        handleFilterChange("toDate", e.target.value);
                      }}
                      InputLabelProps={{ shrink: true }}
                      value={filterOptions?.toDate}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>

                  <Grid item xs={6}>
                    <AutoComplete
                      value={filterOptions?.users}
                      onChange={(_event, newValue) => {
                        handleFilterChange("users", newValue);
                      }}
                      options={filterDropDowns?.users}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          label="User"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <AutoComplete
                      value={filterOptions?.customers}
                      onChange={(_event, newValue) => {
                        handleFilterChange("customers", newValue);
                      }}
                      options={TRIP_PLANNER_TYPE}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          label="Type of customers"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>

                  <Grid item xs={6}>
                    <AutoComplete
                      value={filterOptions?.recurringTypes}
                      onChange={(_event, newValue) => {
                        handleFilterChange("recurringTypes", newValue);
                      }}
                      options={TRIP_PLANNER_DATE_RECURRING_TYPES}
                      renderInput={(params: any) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          label="Recurring types"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>

                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        setFilterOptions({})
                      }}
                    >
                      Clear All
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => {
                        setOpenModel(false);
                        if (page != 1) {
                          setPage(1);
                        } else {
                          getAllTripPlan();
                        }
                      }}
                    >
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
          </Box>
        </Box>
      </ActionModal>
      </ContainerBoxV2>
    </>
  );
}

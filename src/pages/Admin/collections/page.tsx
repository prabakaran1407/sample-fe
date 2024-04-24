import {
  ActionIconButton,
  ActionItems,
  ActionModal,
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../../components/MUI/mui.index";
import Typography from "@mui/material/Typography";
import { Box, TextField, Grid, Button } from "@mui/material";
import moment from "moment";
import React from "react";
import { ACTION_ICON_TYPES } from "../../../data/AppConst";
import { CustomDivier } from "../../../components/APP/app.index";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import { useEffect, useState } from "react";
import GetHeaderParams from "../../../../src/components/CustomCellAgGrid/CustomHeaderValue";
import CustomCellRenderValues from "../../../../src/components/CustomCellAgGrid/CustomCellRenderValues";
import CollectionService from "../../../services/admin/collection.service";
import { COLORS } from "../../../../src/utils/globals";
import { getSkipCount } from "../../../utils/index.ts";
import { useAppSelector } from "../../../hooks/index.ts";
import { getTimeStamp } from "../../../utils/datetime.ts";
import { PropagateLoader } from "react-spinners";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import { generatePath, useNavigate } from "react-router-dom";
import { getUserListForAdmin } from "../../../components/com_components/CustomerSettingsAPI.tsx";
import { AUM_FORM_ACTION_TYPES } from "../../../data/AppConst.ts";
import { CSVLink } from "react-csv";
import FilterListIcon from "@mui/icons-material/FilterList";
type UserType = {
  id: string;
  name: string;
};

const Collections = () => {
  const AUTH = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = React.useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [csvData, setCsvData] = useState([]);
  const [filterOptions, setFilterOptions] = useState<any>({
    fromDate: "",
    fromDateTimeStamp: 0,
    toDate: "",
    toDateTimeStamp: 0,
    assigneeLabel: "",
    assigneeValue: "",
  });
  const clearFilters = async () => {
    try {
      setLoading(true);
      setFilterOptions({
        ...filterOptions,
        fromDate: "",
        fromDateTimeStamp: 0,
        toDate: "",
        toDateTimeStamp: 0,
        assigneeLabel: "",
        assigneeValue: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error clearing filters:", error);
    } finally {
      setLoading(false);
    }
  };
  const [openModel, setOpenModel] = useState(false);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(APP_ROUTES?.ADMIN?.COLLECTIONS?.view, {
      id: rowItem?.id,
    });
    navigate(pathUrl, {
      state: {
        collection: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
    console.log(rowItem, "rowItem");
  };
  const columnDefs: ColDef[] = [
    {
      headerName: "Date",
      field: "date_field",
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: (params: any) => {
        const formattedDate = moment(params.data.createdAt).format(
          "DD/MM/YYYY"
        );
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              {formattedDate}
            </Typography>
          </Box>
        );
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "User name",
      field: "user_id.firstName ",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "user_id.firstName",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Collection type",
      field: "user_id.firstName ",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "collection_type",
      },
      ...GetHeaderParams(),
    },

    {
      headerName: "Amount",
      field: "amount",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
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
      width: 400,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
  const [selectedUser, _setSelectedUser] = useState<UserType | null>(null);
  const [_users, setUser] = useState<any>();
  useEffect(() => {
    fetchData();
    getUserData();
  }, [page, pageSize, selectedUser]);

  const [assigneeOptions, setAssigneeOptions] = useState([]);

  const getUserData = async () => {
    await getUserListForAdmin(getPayload?.organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setAssigneeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };
  let getPayload = {
    organization_id: AUTH?.data?.userRecord?.organization_id,
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const payload: any = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        skip: getSkipCount(page, pageSize),
        limit: pageSize,
        fromDate: filterOptions.fromDateTimeStamp || "",
        toDate: filterOptions.toDateTimeStamp || "",
        user_id: filterOptions?.assigneeValue || "",
        status: true,
      };
      console.log("payload :", payload);
      if (!filterOptions.fromDateTimeStamp) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        payload.fromDate = startOfDay.getTime();
      }

      if (!filterOptions.toDateTimeStamp) {
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        payload.toDate = endOfDay.getTime();
      }

      if (filterOptions.fromDate) {
        payload.fromDate = getTimeStamp(filterOptions.fromDate);
      }
      if (filterOptions.toDate) {
        payload.toDate = getTimeStamp(filterOptions.toDate);
      }

      const response = await CollectionService.getAll(payload);
      console.log("Response:", assigneeOptions);
      console.log("response", response);
      const responseData = response?.data;
      const userNames = (responseData?.data || []).map(
        (item: { user_name: any }) => item.user_name
      );
      setLoading(false);

      setUser(userNames);
      setTableData(responseData?.data || []);
      setTotalCount(responseData?.total || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };

  const generateCsvData = () => {
    // Assuming tableData is an array of objects with the same structure
    const csvData = tableData.map((row: any) => ({
      Date: moment(row.createdAt).format("DD/MM/YYYY"),
      "User Name": row.user_id.firstName,
      "Collection Type": row.collection_type,
      Amount: row.amount,
    }));
    return csvData;
  };
  const handleExportCsv = () => {
    const data: any = generateCsvData();
    setCsvData(data);
  };

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Collections
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Grid container justifyContent="flex-end" columnSpacing={1}>
              <Grid item xs={1}>
                <ActionIconButton
                  actionType={ACTION_ICON_TYPES[6]}
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
                    fetchData();
                  }}
                />
              </Grid>
              <Grid item xs={1}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Grid
        item
        xs={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: "20px",
          marginTop: "10px",
        }}
      >
        <CSVLink
          data={csvData}
          filename={"collection.csv"}
          className="btn btn-primary btn-sm"
          target="_blank"
        >
          <Button variant="contained" onClick={handleExportCsv}>
            Export to CSV
          </Button>
        </CSVLink>
      </Grid>
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
          <AgDataGrid
            rowData={tableData}
            columnDefs={columnDefs}
            TableHeight={58}
            rowHeight={50}
            handleCellClick={undefined}
            loading={false}
            disableClickSelectionRenderers={false}
            noDataTxt="No Records Found"
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
        </ContainerBoxV2>
      )}
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
              <Grid item xs={6} sx={{ height: "30px" }}>
                <Textfield
                  fullWidth
                  label="From Date"
                  type="date"
                  name="fromDate"
                  onChange={(e: any) => {
                    const selectedDate = e.target.value;
                    handleFilterChange("fromDate", getTimeStamp(selectedDate));
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6}>
                <Textfield
                  fullWidth
                  label="To Date"
                  type="date"
                  name="toDate"
                  onChange={(e: any) => {
                    const selectedDate: any = new Date(e.target.value);
                    selectedDate.setHours(23, 59, 59, 999).toString();
                    handleFilterChange("toDate", getTimeStamp(selectedDate));
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <AutoComplete
                  value={filterOptions?.assigneeLabel || null}
                  onChange={(_event: any, newValue: any) =>
                    setFilterOptions({
                      ...filterOptions,
                      assigneeLabel: newValue === null ? "" : newValue?.label,
                      assigneeValue: newValue === null ? "" : newValue?.value,
                    })
                  }
                  options={assigneeOptions}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      size="small"
                      label="User Name"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    clearFilters();
                    fetchData();
                  }}
                >
                  Clear
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
                      fetchData();
                    }
                  }}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ActionModal>
    </>
  );
};

export default Collections;

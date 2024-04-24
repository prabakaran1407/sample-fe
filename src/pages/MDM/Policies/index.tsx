/** @format */

import { useEffect, useState } from "react";

import AddPolicy from "./PolicySettings";
import { Box, Grid, Typography, Button } from "@mui/material";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { DeletePolicyModal } from "../components/DeleteModal";
import { getAllPolicies } from "../../../services/admin/mdm/policies.service";
import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";
import { ColDef } from "@ag-grid-community/core/dist/esm/es6/entities/colDef";
import PolicyCell from "./components/PolicyCell";
import ActionCellRenderer from "./components/ActionCellRenderer";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
import Loader from "../../../../src/components/PorpagateLoader/PropagateLoader";

import { useAppSelector } from "../../../../src/hooks";

// import { LoadScreen } from '../../LoadScreen';

const Policies = ({}) => {
  const [_cloneModel, _setCloneModel] = useState(false);
  const [show, setShow] = useState(false);
  const [_loading, setLoading] = useState(false);
  const [renderDelete, setRenderDeleteModal] = useState(false);
  const [deletePolicy, _setDeletePolicy] = useState("");
  const [editData, _setEditData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [totalCount, _setTotalCount] = useState(0);

  const auth = useAppSelector((state) => state.auth);
  const org_data = auth?.data?.userRecord?.organizationData;

  // const [totalPolicies, setTotalPolicies] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  // const lastIndex = page * pageSize;
  // const firstIndex = lastIndex - pageSize;
  // const currentPolicies = tableData.slice(firstIndex, lastIndex);
  // function generatePages() {
  //   const floor = tableData.length / pageSize;
  //   return Math.ceil(floor);
  // }

  const handleOpen = () => {
    setShow(true);
  };

  async function getPoliciesList() {
    // let skip = (page - 1) * pageSize;
    let limit = pageSize;
    setLoading(true);
    await getAllPolicies(limit, org_data?.enterprise_id).then((res: any) => {
      setTableData(res?.data?.policies);
      // setTotalPolicies(res?.data?.policies?.length);
    });
    setLoading(false);
  }
  // const cloneOldPolicy = async (e: any) => {
  //   e.preventDefault();
  //   setPolicyLoad(true);
  //   let policy: any = oldValue;
  //   let finalData: any = {};
  //   try {
  //     delete policy[`version`];
  //     delete policy[`name`];
  //     finalData = {
  //       policy_name: name,
  //       data: policy,
  //     };
  //   } catch (error) {}

  //   let k = await CreatePolicyData(finalData);
  //   if (k?.statusText === 'OK') {
  //     alert('Policy Cloned Sucessfully');
  //   } else {
  //     alert('Policy Cloned Failed');
  //   }
  //   setPolicyLoad(false);
  //   setCloneModel(false);
  //   setName('');
  //   setOldValue({});
  //   getPoliciesList();
  // };

  useEffect(() => {
    setLoading(true);
    getPoliciesList();
  }, [pageSize]);

  // const getPolicyName = (props: any) => {
  //   console.log(`get`, props);
  // };
  console.log(tableData);
  const columnDefs: ColDef[] = [
    {
      headerName: "Policy Name",
      field: "hardwareInfo.model",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 200,
      cellRenderer: PolicyCell,
      ...GetHeaderParams(),
    },
    {
      headerName: "Version",
      field: "version",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 200,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "version",
        // length: true,
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "App Count",
      field: "hardwareInfo.brand",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 200,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "applications",
        length: true,
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Actions",
      field: "hardwareInfo.brand",
      filter: true,
      cellStyle: { textTransform: "capitalize", fontSize: "12px" },
      width: 200,
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        field: "hardwareInfo.brand",
        setShow: setShow,
        setEditData: _setEditData,
      },
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];

  return (
    <>
      {show ? (
        <div style={{ height: "100%", overflow: "scroll" }}>
          <AddPolicy editData={editData} />
        </div>
      ) : (
        <Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid container justifyContent="flex-start">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Policies
              </Typography>
            </Grid>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<NoteAddRoundedIcon />}
                  onClick={() => handleOpen()}
                >
                  Add Policy
                </Button>
              </Grid>
            </Grid>
          </Box>

          <ContainerBoxV2 styles={{ height: "auto", overflow: "scroll" }}>
            <Grid container xs={12}>
              {_loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "65vh",
                    width: "100%",
                  }}
                >
                  <Loader />
                </Box>
              ) : (
                <AgDataGrid
                  rowData={tableData || []}
                  columnDefs={columnDefs}
                  TableHeight={58}
                  rowHeight={50}
                  noDataTxt="No Records Found"
                  loading={false}
                  // enableCellTextSelection={true}
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

          {renderDelete && (
            <DeletePolicyModal
              option="Policy"
              show={renderDelete}
              id={deletePolicy}
              handleClose={() => {
                setRenderDeleteModal(false);
                setLoading(true);
                getPoliciesList();
              }}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Policies;

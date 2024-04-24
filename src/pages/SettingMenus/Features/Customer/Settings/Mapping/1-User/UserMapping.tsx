import { useState, useEffect, useMemo } from "react";

// ************ Component
import {
  ContainerBoxV2,
  Textfield,
  ButtonV1,
  AutoComplete,
  ActionConfirmation,
  PillTab,
} from "../../../../../../../components/MUI/mui.index.tsx";

import { CustomDivier } from "../../../../../../../components/APP/app.index";

import { Box, Grid } from "@mui/material";

// ********** Contant
import { ASSIGN_OR_UNASSIGN } from "../../../../../../../data/AppConst.ts";

// ******** Icons

// ************** AgGrid
import AgDataGrid from "../../../../../../../components/AG-GRID/DataGrid/AgDataGrid";
import CustomCellRenderValues from "../../../../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import GetHeaderParams from "../../../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// **************** service
import AUMService from "../../../../../../../services/admin/UserManagemet.service.ts";
import UCBMappingService from "../../../../../../../services/settings/u-c-b-mapping-setting.service.ts";
import { Cancel, CheckCircle } from "@mui/icons-material";

// ************* utils
import { getSkipCount } from "../../../../../../../utils/index.ts";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../../../../utils/globals.ts";

interface IAddEditViewHierarchy {
  selectedOption: Record<string, any>;
  CONSTANT_DATA: Record<string, any>;
  AUTH: Record<string, any>;
}

function UserMapping({ selectedOption, AUTH }: IAddEditViewHierarchy) {
  console.log("AUTH >>>>>>> >>>>>", AUTH);

  //  ***************** States
  const [activeTab, setActivatedTab] = useState(0);
  const [assigneeData, setAssigneeData] = useState<Record<string, any>[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    ASSIGN_OR_UNASSIGN[0]?.value
  );
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [_hqData, _setHqData] = useState<Record<string, any>[]>([]);
  const [filterOption, setFilterOption] = useState<Record<string, any>>({
    user_id: null,
  });
  const [selectedRow, setSelectedRow] = useState([]);
  const [btn, setBtn] = useState<boolean>(true);
  const [assignedUser, setAssignedUser] = useState<any>(null);

  console.log("selectedRow >>>>>>>>>>", selectedRow);
  // ************* Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, _setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );
  const getAssignUnAssignList = async () => {
    setLoading(true)
    try {
      let payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: true,
        user_id: filterOption?.user_id,
      };
      let query = `?assign_or_unassign=${
        activeTab === 0 ? 'FOR_ASSIGN' : 'FOR_UNASSIGN'
      }`;
      let listData = await UCBMappingService.listAssignUnAssignUser(
        payload,
        query
      );
      console.log("listData >>>>>>>>>>>>>", listData);
      listData = listData?.data;
      if (listData?.status) {
        setTableData(listData?.data);
        setLoading(false)

      }
    } catch (error: any) {
      console.log("ERROR: ", error);
    }
    setLoading(false)
  };
  // ************** Fn

  const getInitialData = async () => {
    try {
      let assigneeCondition = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: true,
      };
      console.log("assigneeCondition >>>>>>>>>>>>", assigneeCondition);
      let assignee = await AUMService.getAll(assigneeCondition);
      assignee = assignee?.data;
      console.log("bbbbbbbbbbbbbbbbbb",AUTH?.data?.userRecord?.id,assignee.data)
      assignee["data"]=assignee.data.filter
      ((data:any)=>data._id!==AUTH?.data?.userRecord?.id)
      if (assignee?.status) {
        setAssigneeData(
          assignee?.data?.map((m: Record<string, any>) => ({
            label: `${m?.firstName} ${m?.lastName}`,
            value: m?.id,
          }))
        );
      }
    } catch (error: any) {
      console.log("ERROR: ", error);
    }
  };

  const getMappedUsers = async () => {
    
    try {
      // ***************** List table data for designation mapped users
      let usersConditions = {
        designation: selectedOption?.data?._id,
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: true,
        skip: getSkipCount(page, pageSize),
        limit: pageSize,
      } as Record<string, any>;
      if (filterOption?.selectedCategory) {
        usersConditions.state = filterOption?.selectedCategory?.value;
      }
      if (filterOption?.selectedSubCategory) {
        usersConditions.city = filterOption?.selectedSubCategory?.value;
      }
      // Mapped users  data for assign
      // let _users: any;
      console.log(
        "selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value",
        selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value
      );
      if (selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value) {
        // users = await HierarchyService.designationMappedUsers(usersConditions)
        // if (users?.status) {
        //   users = users?.data?.response
        //   console.log('users >>>>>>', users)
        //   setTableData(users?.designationMappedUser)
        //   console.log('for count >>>>>>', users)
        //   setTotalCount(users?.count)
        // }
      } else {
        if (assignedUser?.value) {
          //   usersConditions.assignee = assignedUser?.value
          //   //  Assiged user data for un-assign users tab
          //   users = await HierarchyService.designationMappedUsers(usersConditions, '?getAssignUser=true')
          //   if (users?.status) {
          //     users = users?.data?.response
          //     console.log('users else >>>>>>', users)
          //     setTableData(users?.assignedUser)
          //     console.log('for else count >>>>>>', users)
          //     setTotalCount(users?.count)
          //   }
        }
      }
    } catch (error: any) {
      console.log("CATCH ERROR >>>>>", error);
    }
    
  };

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setSelectedMenu(ASSIGN_OR_UNASSIGN[selection]?.value);
    setPage(1);
  };
  console.log(
    "activeTab >>>>>>>>>>",
    activeTab,
    "selectedMenu >>>>>>>>>>>>",
    selectedMenu
  );
  // *************** effects
  useEffect(() => {
    getInitialData();
    getAssignUnAssignList();
  }, [selectedMenu]);

  const onSelectionChanged = (event: any) => {
    setSelectedRow(event.api.getSelectedRows());
    // setTimeout(() => {
    //   setSelectedRow([])
    // }, 1000)
  };
  console.log("selectedMenu >>>>>>>>>>>", selectedMenu);
  // ************** useMemo

  const columnDefs = useMemo(
    () => [
      {
        // headerName: "Select",
        width: 100,
        suppressMovable: true,
        // cellRenderer: CustomCellRenderValues,
        // cellRendererParams: {
        //   field: "username",
        // },
        ...GetHeaderParams(),
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        cellStyle: { textAlign: "left" },
      },
      {
        headerName: "Group Name",
        field: "groupName",
        filter: true,
        width: 400,
        cellStyle: { textTransform: "capitalize" },
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "groupName",
        },
        ...GetHeaderParams(),
      },
    ],
    []
  );

  // const selectedRows = useCallback(() => {
  //   return (params: any) => {
  //     console.log("Selected rows >>>>>>>", params);
  //   };
  // }, []);

  function beforeSubmit() {
    setOpenConfirmation({
      open: true,
      title:
        selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value
          ? "Assign User Mapping"
          : "Un-Assign User Mapping",
      message:
        selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value
          ? `Are you sure you want to assign selected Groups to ${assignedUser?.label}?`
          : `Are you sure you want to unassign selected Groups from ${assignedUser.label}?`,
    });
  }
  async function handleSubmit() {
    try {
      if (selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value) {
        let payload = {
          user_id: assignedUser?.value,
          organization_id: AUTH?.data?.userRecord?.organization_id,
          // createdBy: AUTH?.data?.userRecord?.id,
          // updatedBy: AUTH?.data?.userRecord?.id,
        } as Record<string, any>;
        payload.gradeMapping = selectedRow?.map((items: any) => items?.id);
        let assignResponse =
          await UCBMappingService.createAssignUnAssignUserMapping(payload);
        console.log("assignResponse", assignResponse);
        getAssignUnAssignList();
      } else {
        let payload = {
          user_id: assignedUser?.value,
          organization_id: AUTH?.data?.userRecord?.organization_id,
          // createdBy: AUTH?.data?.userRecord?.id,
          // updatedBy: AUTH?.data?.userRecord?.id,
        } as Record<string, any>;
        payload.gradeMapping = selectedRow?.map((items: any) => items?.id);
        let unassignResponse =
          await UCBMappingService.updateAssignUnAssignUserMapping(payload);
        console.log("assignResponse", unassignResponse);
        getAssignUnAssignList();
      }
      setOpenConfirmation({
        status: false,
      });
      getMappedUsers();
    } catch (e) {}
  }

  // *************** effects
  useEffect(() => {
    getInitialData();
    // getMappedUsers()
  }, [selectedOption, selectedMenu]);

  useEffect(() => {
    getAssignUnAssignList();
    // getMappedUsers()
  }, [filterOption]);

  // useEffect(() => {
  //   if(filterOption?.selectedCategory){
  //     getHQData()
  //   }
  // }, [filterOption?.selectedCategory])

  // useEffect(() => {
  //   getMappedUsers()
  //   return () => {
  //     setTableData([])
  //   }
  // }, [filterOption, selectedOption, page, pageSize, assignedUser, activeTab])

  useEffect(
    () => setBtn(!assignedUser || selectedRow?.length === 0),
    [assignedUser, selectedRow]
  );

  const TAB_BUTTON = [
    {
      label: "Assign",
      icon: <CheckCircle fontSize="small" />,
      status: true,
    },
    {
      label: "Un-Assign",
      icon: <Cancel fontSize="small" />,
      status: false,
    },
  ];
  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12} sx={{ padding: 0 }}>
            <Grid container item xs={6} justifyContent={"flex-start"}>
              {/* <Grid container item xs={3}>
                <AutoComplete
                  options={[]}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      label="State"
                      fullWidth
                      type="text"
                      name="brand"
                      placeholder="Select brand type"
                    />
                  )}
                  fullWidth
                  //   onChange={(_, selectedOption: Record<string, any>) => {
                  //     console.log('selectedOption >>>>>>>>', selectedOption);
                  //     formik?.setFieldValue('brand', selectedOption);
                  //   }}
                />
              </Grid>
              <Grid xs={3}>
                <AutoComplete
                  options={[]}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      label="City"
                      fullWidth
                      type="text"
                      name="brand"
                      placeholder="Select brand type"
                    />
                  )}
                  fullWidth
                  //   onChange={(_, selectedOption: Record<string, any>) => {
                  //     console.log('selectedOption >>>>>>>>', selectedOption);
                  //     formik?.setFieldValue('brand', selectedOption);
                  //   }}
                />
              </Grid> */}
              <PillTab
                tabMenus={TAB_BUTTON}
                selectedTab={handleTabSelect}
                value={activeTab}
                style={{ padding: "10px" }}
              />
            </Grid>
            <Grid container item xs={6} justifyContent={"flex-end"}>
              {/* <ActionIconButton
                actionType={ACTION_ICON_TYPES[6]}
                onClick={() => {
                  //   getList();
                }}
              />
              <ActionIconButton
                actionType={ACTION_ICON_TYPES[0]}
                onClick={() => {
                  //   setActionType(ACTION_ICON_TYPES[0]);
                  //   setOpenModal(true);
                }}
              /> */}
            </Grid>
          </Grid>
        </ContainerBoxV2>
        <CustomDivier style={{ marginTop: 1 }} />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
              width: "100%",
            }}
          >
            <PropagateLoader color={COLORS.primary}/>
          </Box>
        ) : (
          <ContainerBoxV2 styles={{ padding: 1 }}>
            <Grid container xs={12} spacing={0.5}>
              <Grid
                container
                item
                xs={12}
                justifyContent={"space-between"}
                // spacing={0.5}
              >
                {/* <Grid container item xs={8} spacing={0.5}>
                <Grid item xs={3}>
                  <AutoComplete
                    options={category}
                    value={filterOption?.selectedCategory}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label="State"
                        fullWidth
                        type="text"
                        name="brand"
                        placeholder="Select state"
                      />
                    )}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      setFilterOption({
                        ...filterOption,
                        selectedCategory: selectedOption,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <AutoComplete
                    options={hqData}
                    value={filterOption?.selectedSubCategory}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label="City"
                        fullWidth
                        type="text"
                        name="brand"
                        placeholder="Select city"
                      />
                    )}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      setFilterOption({
                        ...filterOption,
                        selectedSubCategory: selectedOption,
                      });
                    }}
                  />
                </Grid>
              </Grid> */}
                <Grid
                  container
                  item
                  xs={4}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  spacing={0.5}
                >
                  <Grid item xs={8}>
                    <AutoComplete
                      options={assigneeData}
                      value={assignedUser}
                      renderInput={(params) => (
                        <Textfield
                          {...params}
                          label="User"
                          fullWidth
                          type="text"
                          name="brand"
                          placeholder="Select user"
                        />
                      )}
                      fullWidth
                      onChange={(_, selectedOption: Record<string, any>) => {
                        console.log("selectedOption >>>>>>>>", selectedOption);
                        setAssignedUser(selectedOption);
                        setFilterOption({
                          ...filterOption,
                          user_id: selectedOption?.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={4} justifyContent={"end"}>
                    <ButtonV1
                      type="submit"
                      disabled={btn}
                      onClick={() => beforeSubmit()}
                    >
                      {selectedMenu == ASSIGN_OR_UNASSIGN[0]?.value
                        ? "Assign"
                        : "Un-Assign"}
                    </ButtonV1>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12}>
                <AgDataGrid
                  rowData={tableData}
                  columnDefs={columnDefs}
                  TableHeight={48}
                  rowHeight={50}
                  noDataTxt="No Records Found"
                  loading={false}
                  rowSelection={"multiple"}
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
                  onSelectionChanged={onSelectionChanged}
                  disableClickSelectionRenderers={false}
                />
              </Grid>
            </Grid>
          </ContainerBoxV2>
        )}

        {/* <AddEditViewModal
          actionType={actionType}
          handleClose={handleClose}
          open={openModal}
          data={rowItem}
          refresh={() => {
            getList();
          }}
          render={render}
        /> */}
      </div>
      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          handleSubmit();
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

export default UserMapping;

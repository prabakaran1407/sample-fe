import { useState, useEffect, useMemo } from 'react';

// ************ Component
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  TabMenus,
  AutoComplete,
  ActionConfirmation,
} from '../../../../../components/MUI/mui.index';

import { CustomDivier } from '../../../../../components/APP/app.index';

import { Box, Grid } from '@mui/material';

// ********** Contant
import { ASSIGN_OR_UNASSIGN } from '../../../../../data/AppConst.ts';

// ******** Icons
import SettingsIcon from '@mui/icons-material/Settings';

// ********** Mapping setting
import MappingSetting from './MappingSettings';

// ************** AgGrid
import AgDataGrid from '../../../../../components/AG-GRID/DataGrid/AgDataGrid';
import CustomCellRenderValues from '../../../../../components/CustomCellAgGrid/CustomCellRenderValues';
import GetHeaderParams from '../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx';

// **************** service
import AUMService from '../../../../../services/admin/UserManagemet.service.ts';
import HierarchyService from '../../../../../services/settings/hierarchy.service.ts';

// ************* utils
import { getSkipCount } from '../../../../../utils/index.ts';
import { PropagateLoader } from 'react-spinners';
import { COLORS } from '../../../../../../src/utils/globals.ts';
import CountryStateCity from '../../../../../services/admin/CountryStateCity/CountryStateCity.service.ts';

interface IAddEditViewHierarchy {
  selectedOption: Record<string, any>;
  CONSTANT_DATA: Record<string, any>;
  AUTH: Record<string, any>;
}

function AddEditViewHierarchy({
  selectedOption,
  AUTH,
  CONSTANT_DATA,
}: IAddEditViewHierarchy) {
  console.log('selectedOption >>>>>', selectedOption);

  //  ***************** States
  const [openMappingSetting, setOpenMappingSetting] = useState<boolean>(false);
  const [activeTab, setActivatedTab] = useState(0);
  const [assigneeData, setAssigneeData] = useState<Record<string, any>[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    ASSIGN_OR_UNASSIGN[0]?.value
  );
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [_hqData, _setHqData] = useState<Record<string, any>[]>([]);
  const [_category, _setCategory] = useState<Record<string, any>[]>([]);
  const [filterOption, setFilterOption] = useState<Record<string, any>>({
    selectedCategory: null,
    selectedSubCategory: null,
  });
  const [selectedRow, setSelectedRow] = useState([]);
  const [btn, setBtn] = useState<boolean>(true);
  const [assignedUser, setAssignedUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log('selectedRow >>>>>>>>>>', selectedRow);
  // ************* Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  // ************** Fn

  const getInitialData = async () => {
    try {
      let assigneeCondition = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
        status: true,
        designation: selectedOption?.data?._id,
      };
      console.log('assigneeCondition >>>>>>>>>>>>', assigneeCondition);
      let assignee = await AUMService.getAll(assigneeCondition);
      assignee = assignee?.data;
      if (assignee?.status) {
        setAssigneeData(
          assignee?.data?.map((m: Record<string, any>) => ({
            label: `${m?.firstName} ${m?.lastName}`,
            value: m?.id,
          }))
        );
      }

      // ***************** List table data for designation mapped users
      // let usersConditions = {
      //   designation: selectedOption?.data?._id,
      //   organization_id: AUTH?.data?.userRecord?.organization_id,
      //   status: true
      // }

      // let categoryData: any = await AUMService.getCategory(
      //   `&isSubCategory=false`
      // );
      // categoryData = categoryData?.data;
      // categoryData =
      //   categoryData?.length > 0
      //     ? categoryData.map((m: Record<string, unknown>) => ({
      //         label: m?.name,
      //         value: m?.id,
      //       }))
      //     : [];
      // setCategory([...categoryData]);
      // if(){
      //   let users = await HierarchyService.designationMappedUsers(usersConditions)
      // users = users?.data
      // if(users?.status){
      //   // users = users?.data
      //   console.log('users >>>>>>', users)
      //   setTableData(users?.response?.designationMappedUser)
      // }
      // }else {

      // }
    } catch (error: any) {
      console.log('ERROR: ', error);
    }
  };

  const getMappedUsers = async () => {
    try {
      // ***************** List table data for designation mapped users
      setLoading(true);
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
      if(assignedUser) usersConditions.assignee = assignedUser?.value
      // Mapped users  data for assign
      let users: any;
      console.log(
        'selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value',
        selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value
      );
      if (selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value) {
        users = await HierarchyService.designationMappedUsers(usersConditions);
        if (users?.status) {
          users = users?.data?.response;
          console.log('users >>>>>>', users);
          setTableData(users?.designationMappedUser);
          console.log('for count >>>>>>', users);
          setTotalCount(users?.count);
        }
      } else {
        if (assignedUser?.value) {
          usersConditions.assignee = assignedUser?.value;
          //  Assiged user data for un-assign users tab
          users = await HierarchyService.designationMappedUsers(
            usersConditions,
            '?getAssignUser=true'
          );
          if (users?.status) {
            users = users?.data?.response;
            console.log('users else >>>>>>', users);
            setTableData(users?.assignedUser);
            console.log('for else count >>>>>>', users);
            setTotalCount(users?.count);
          }
        }
      }
      setLoading(false);
    } catch (error: any) {
      console.log('CATCH ERROR >>>>>', error);
      setLoading(false);
    }
  };

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setSelectedMenu(ASSIGN_OR_UNASSIGN[selection]?.value);
    setPage(1);
  };
  console.log(
    'activeTab >>>>>>>>>>',
    activeTab,
    'selectedMenu >>>>>>>>>>>>',
    selectedMenu
  );
  // *************** effects
  useEffect(() => {
    getInitialData();
  }, [selectedOption, selectedMenu]);

  // const getHQData = async () => {
  //   try {
  //     let hq: any = await AUMService.getCategory(
  //       `&isSubCategory=true&parentCategory=${filterOption?.selectedCategory?.value}`
  //     );
  //     console.log('hq data', hq);
  //     hq = hq?.data;
  //     hq =
  //       hq?.length > 0
  //         ? hq?.map((m: Record<string, unknown>) => ({
  //             label: m?.name,
  //             value: m?.id,
  //           }))
  //         : [];
  //     setHqData(hq);
  //     console.log('hq >>>>>>>>>>>>>>>', hq);
  //   } catch (e) {
  //     console.log('error', e);
  //   }
  // };

  const onSelectionChanged = (event: any) => {
    setSelectedRow(event.api.getSelectedRows());
    // setTimeout(() => {
    //   setSelectedRow([])
    // }, 1000)
  };
  console.log('selectedMenu >>>>>>>>>>>', selectedMenu);
  // ************** useMemo

  const countryDataId =
    AUTH?.data?.userRecord?.organizationData?.countryData?.countryId;

  const [states, setStates] = useState<any>();
  const fetchStates = async (countryId: any) => {
    try {
      const response = await CountryStateCity.getAllStatesByCountry(countryId);
      const statesData = response?.data?.data || [];
      console.log('statesData', statesData);
      const formattedStates = statesData.map((state: any) => ({
        label: state.name,
        value: state._id,
        id: state?.id,
      }));
      setStates(formattedStates);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };
  console.log(states, 'hello');

  useEffect(() => {
    if (countryDataId) {
      fetchStates(countryDataId);
    }
  }, [countryDataId]);

  const [cities, setCities] = useState<any[]>([]);
  console.log(
    filterOption?.selectedCategory?.id,
    'filterOption?.selectedCategory?.value'
  );

  const fetchCities = async () => {
    try {
      const response = await CountryStateCity.getAllCitiesByState(
        filterOption?.selectedCategory?.id
      );
      const citiesData = response?.data?.data || [];
      const formattedCities = citiesData.map((city: any) => ({
        label: city.name,
        value: city._id,
      }));
      setCities(formattedCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  console.log(cities, 'cities');

  useEffect(() => {
    console.log('Selected state changed, fetching cities...');
    if (filterOption?.selectedCategory?.value) {
      fetchCities();
    } else {
      console.log('while fetcing erro');
    }
  }, [filterOption?.selectedCategory?.value]);

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
        cellStyle: { textAlign: 'center' },
      },
      {
        headerName: 'User',
        field: 'username',
        filter: true,
        width: 400,
        cellStyle: { textTransform: 'capitalize' },
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'username',
        },
        ...GetHeaderParams(),
      },
      {
        headerName: 'City',
        field: 'city',
        filter: true,
        width: 400,
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'city',
        },
        ...GetHeaderParams(),
      },
      {
        headerName: 'State',
        field: 'state',
        filter: true,
        width: 400,
        suppressMovable: true,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'state',
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
          ? 'Assign hierarchy'
          : 'Un-Assign hierarchy',
      message:
        selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value
          ? `Are you sure you want to assign selected users from ${assignedUser.label}?`
          : `Are you sure you want to unassign selected users from ${assignedUser.label}?`,
    });
  }
  async function handleSubmit() {
    try {
      setBtn(true)
      if (selectedMenu === ASSIGN_OR_UNASSIGN[0]?.value) {
        let payload = {
          assignee: assignedUser?.value,
          organization_id: AUTH?.data?.userRecord?.organization_id,
          designation: selectedOption?.data?._id,
          createdBy: AUTH?.data?.userRecord?.id,
          updatedBy: AUTH?.data?.userRecord?.id,
        } as Record<string, any>;
        payload.users = selectedRow?.map((items: any) => items?.userId);
        let assignResponse = await HierarchyService.assignUser(payload);
        console.log('assignResponse', assignResponse);
      } else {
        let payload = {
          assignee: assignedUser?.value,
          organization_id: AUTH?.data?.userRecord?.organization_id,
          designation: selectedOption?.data?._id,
          updatedBy: AUTH?.data?.userRecord?.id,
        } as Record<string, any>;
        payload.positionIds = selectedRow?.map(
          (items: any) => items?.positionId
        );
        let unAssignRes = await HierarchyService.unAssignUser(payload);
        console.log('un-assignResponse', unAssignRes);
      }
      setOpenConfirmation({
        status: false,
      });
      getMappedUsers();
      setBtn(false)
    } catch (e) {
      setBtn(false)
    }
  }

  // *************** effects
  useEffect(() => {
    getInitialData();
    // getMappedUsers()
    // setFilterOption({
    //   selectedCategory: null,
    //   selectedSubCategory: null,
    // })
  }, [selectedOption, selectedMenu]);

  useEffect(() => {
    setAssignedUser(null)
    // if (filterOption?.selectedCategory) {
    // }
  }, [selectedOption]);

  useEffect(() => {
    getMappedUsers();
    return () => {
      setTableData([]);
    };
  }, [filterOption, selectedOption, page, pageSize, assignedUser, activeTab]);

  useEffect(
    () => setBtn(!assignedUser || selectedRow?.length === 0),
    [assignedUser, selectedRow, assignedUser]
  );
  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12} sx={{ padding: 0 }}>
            <Grid container item xs={6} justifyContent={'flex-start'}>
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
              <TabMenus
                tabMenus={ASSIGN_OR_UNASSIGN}
                selectedTab={handleTabSelect}
                value={activeTab}
                boxWidth='auto'
              />
            </Grid>
            <Grid container item xs={6} justifyContent={'flex-end'}>
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
              <ActionIconButton
                title='Mapping settings'
                disableRipple
                onClick={() => {
                  setOpenMappingSetting(true);
                }}
              >
                <SettingsIcon fontSize='small' color='primary' />
              </ActionIconButton>
            </Grid>
          </Grid>
        </ContainerBoxV2>
        <CustomDivier style={{ marginTop: 1 }} />
        <ContainerBoxV2 styles={{ padding: 1 }}>
          <Grid container xs={12} spacing={0.5}>
            <Grid
              container
              item
              xs={12}
              justifyContent={'space-between'}
              // spacing={0.5}
            >
              <Grid container item xs={8} spacing={0.5}>
                <Grid item xs={3}>
                  <AutoComplete
                    options={states}
                    value={filterOption?.selectedCategory}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label='State'
                        fullWidth
                        type='text'
                        name='brand'
                        placeholder='Select state'
                      />
                    )}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      if (!selectedOption) {
                        setFilterOption({
                          ...filterOption,
                          selectedCategory: null,
                          selectedSubCategory: null,
                        });
                        setCities([]);
                      } else {
                        setFilterOption({
                          ...filterOption,
                          selectedCategory: selectedOption,
                        });
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <AutoComplete
                    options={cities}
                    value={filterOption?.selectedSubCategory}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label='City'
                        fullWidth
                        type='text'
                        name='brand'
                        placeholder='Select city'
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
              </Grid>
              <Grid
                container
                item
                xs={4}
                alignItems={'center'}
                justifyContent={'flex-end'}
                spacing={0.5}
              >
                <Grid item xs={8}>
                  <AutoComplete
                    options={assigneeData}
                    value={assignedUser}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label='User'
                        fullWidth
                        type='text'
                        name='brand'
                        placeholder='Select user'
                      />
                    )}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      console.log('selectedOption >>>>>>>>', selectedOption);
                      setAssignedUser(selectedOption);
                    }}
                  />
                </Grid>
                <Grid item xs={4} justifyContent={'end'}>
                  <ButtonV1
                    type='submit'
                    disabled={btn}
                    onClick={() => beforeSubmit()}
                  >
                    {selectedMenu == ASSIGN_OR_UNASSIGN[0]?.value
                      ? 'Assign'
                      : 'Un-Assign'}
                  </ButtonV1>
                </Grid>
              </Grid>
            </Grid>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '65vh',
                  width: '100%',
                }}
              >
                <PropagateLoader color={COLORS.primary} />
              </Box>
            ) : (
              <Grid container item xs={12}>
                <AgDataGrid
                  rowData={tableData}
                  columnDefs={columnDefs}
                  TableHeight={48}
                  rowHeight={50}
                  noDataTxt='No Records Found'
                  loading={false}
                  rowSelection={'multiple'}
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
            )}
          </Grid>
        </ContainerBoxV2>
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
      <ActionModal
        open={openMappingSetting}
        onClose={() => setOpenMappingSetting(false)}
        title={selectedOption?.label}
      >
        <MappingSetting
          onClose={() => setOpenMappingSetting(false) as any}
          selectedOption={selectedOption}
          AUTH={AUTH}
          CONSTANT_DATA={CONSTANT_DATA}
        />
      </ActionModal>
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
        loading={btn}
      />
    </>
  );
}

export default AddEditViewHierarchy;

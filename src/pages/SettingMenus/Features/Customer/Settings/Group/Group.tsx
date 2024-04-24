/** @format */

import AgDataGrid from '../../../../../../components/AG-GRID/DataGrid/AgDataGrid';
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionItems,
  PillTab,
  ActionConfirmation,
} from '../../../../../../components/MUI/mui.index';
import { TNestedObj } from '../../../../../../types/global.types';
import { Autocomplete, Box, Button, Grid, Stack, TextField } from '@mui/material';
import { ColDef } from 'ag-grid-community';
import React, { useEffect, useMemo, useState } from 'react';

// ************* Const
import { ACTION_ICON_TYPES } from '../../../../../../data/AppConst';
import CustomCellRenderValues from '../../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx';
import GetHeaderParams from '../../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx';

// ******* Service

// ************** Util
import { getSkipCount } from '../../../../../../utils/index.ts';

// ************** | Form schema
import { Add, Cancel, CheckCircle } from '@mui/icons-material';
import { COLORS } from '../../../../../../utils/globals.ts';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { useAppSelector } from '../../../../../../hooks/index.ts';
import groupSettingService from '../../../../../../services/settings/group.setting.service.ts';
import AddEditViewModal from './AddEditViewModal.tsx';

type TNestedObjWithStatus = TNestedObj & {
  status: boolean;
};

function StatusType() {
  const AUTH = useAppSelector((state) => state?.auth);
  // ******************** State
  const [tableData, setTableData] = useState<TNestedObjWithStatus[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  console.log('openModal', openModal);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(false);
  const [render, reRender] = useState(0);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activeTableData, setActiveTableData] = useState<
    TNestedObjWithStatus[]
  >([]);
  const [deactivatedTableData, setDeactivatedTableData] = useState<
    TNestedObjWithStatus[]
  >([]);
  console.log('tabledatabillparty', tableData);
  const [filterobject, setFilterObject] = useState<any>({});
  console.log('filterObjectBP',filterobject)
  const [filterValue, setFilterValue] = useState<any>([]);
  console.log("filtervalueBP",filterValue)
  const list = "DROPDOWN_LIST"


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

  //******************** handle */
  const handleModalOpen = (setType: string) =>
    setType === 'OPEN' ? setOpenModal(true) : setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    handleModalOpen('OPEN');
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen('OPEN');
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleDelete = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: 'Deactivate Group',
      message: `Are you sure you want to deactivate this Group?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: 'Activate Group',
      message: `Are you sure you want to activate this Group?`,
    });
  };

  const getList = async () => {
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      value: filterobject?.value || '',
    };

    setLoading(true);
    try {
      const listRes = await groupSettingService.getAll(payload);
      // console.log('grouplist', listRes);
      if (listRes?.status) {
        const data = listRes?.data?.data || [];
        setTableData(listRes?.data?.data || []);
        setActiveTableData(
          data.filter((item: { status: boolean }) => item.status === true)
        );
        setDeactivatedTableData(
          data.filter((item: { status: boolean }) => item.status === false)
        );
        setTotalCount(listRes?.data?.total);
      } else {
        console.log('Status type response failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab, filterobject]);

  const getListFilter = async () => {
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      list: list,
    };

    setLoading(true);
    try {
      const listRes = await groupSettingService.getAll(payload);
      if (listRes?.status) {
        const data = listRes?.data?.data || [];
        setFilterValue(listRes?.data?.data || []);
        setActiveTableData(
          data.filter((item: { status: boolean }) => item.status === true)
        );
        setDeactivatedTableData(
          data.filter((item: { status: boolean }) => item.status === false)
        );
        setTotalCount(listRes?.data?.total);
      } else {
        console.log('Status type response failed');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getListFilter();
  }, [activatedTab]);



  const activeDeactive = async () => {
    try {
      let payload = {
        status: !isActive,
      } as Record<string, any>;
      let id: any = rowItem.id;
      console.log('console', id);
      await groupSettingService.updateGroupStatus({
        updatedData: payload,
        id,
      });
      console.log('updatedData');
      getList();
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || '', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: 'Group Name',
        field: 'groupName',
        filter: true,
        width: 500,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: 'groupName',
        },
        ...GetHeaderParams(),
      },
      {
        headerName: 'Actions',
        field: '',
        filter: true,
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
        ...GetHeaderParams({
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }),
      },
    ],
    [activatedTab]
  );

  const tab = [
    {
      label: 'Active Group',
      icon: <CheckCircle fontSize='small' />,
      status: true,
    },
    {
      label: 'Deactivated Group',
      icon: <Cancel fontSize='small' />,
      status: false,
    },
  ];

  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={8}>
              <PillTab
                tabMenus={tab}
                selectedTab={handleTabSelect}
                value={activatedTab}
              />
            </Grid>
            <Grid
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <Stack direction='row' justifyContent={'space-between'}>
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
                        label="Group"
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
                      '&:hover': {
                        background: COLORS.secondary,
                      },
                    }}
                    onClick={() => {
                      getList();
                    }}
                  />
                  <Button
                    variant='contained'
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      setOpenModal(true);
                    }}
                    sx={{ height: 38 }}>
                    <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ContainerBoxV2>

        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '65vh',
                  width: '100%',
                }}>
                <PropagateLoader color={COLORS.primary} />
              </Box>
            ) : (
              <AgDataGrid
                rowData={
                  activatedTab === 0 ? activeTableData : deactivatedTableData
                }
                columnDefs={columnDefs}
                TableHeight={50}
                rowHeight={50}
                noDataTxt='No Records Found'
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

        {openModal && (
          <AddEditViewModal
            actionType={actionType}
            handleClose={() => {
              setOpenModal(false);
            }}
            open={openModal}
            data={rowItem}
            refresh={() => {
              getList();
            }}
            render={render}
            setOpenModal={setOpenModal}
          />
        )}
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
        children={<></>}
      />
    </>
  );
}

export default StatusType;

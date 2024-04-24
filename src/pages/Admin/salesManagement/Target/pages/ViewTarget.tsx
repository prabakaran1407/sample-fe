/**
 * eslint-disable prefer-const
 *
 * @format
 */

/**
 * eslint-disable prefer-const
 *
 * @format
 */

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

import { useEffect, useState } from 'react';
import {
  ActionIconButton,
  ActionItems,
  ContainerBoxV2,
  Textfield,
} from '../../../../../components/MUI/mui.index';
import {
  Box,
  Button,
  // CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import AgDataGrid from '../../../../../components/AG-GRID/DataGrid/AgDataGrid';
import { ColDef } from '@ag-grid-community/core/dist/esm/es6/entities/colDef';
import SalesTargetService from '../../../../../services/admin/salesTarget/salestarget.service.ts';
import LocalStorage from '../../../../../libs/localStorage.service';
import {
  ACTION_ICON_TYPES,
  AUM_FORM_ACTION_TYPES,
} from '../../../../../data/AppConst';
import { CustomDivier } from '../../../../../components/APP/app.index';
import { TNestedObj } from '../../../../../types/global.types';
import LeaveApprovalModal from '../../../../../components/MUI/LeaveModal/LeaveModal';
import CustomCellRenderValues from '../../../../../components/CustomCellAgGrid/CustomCellRenderValues';
import GetHeaderParams from '../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx';
import { COLORS } from '../../../../../utils/globals.ts';
import { PropagateLoader } from 'react-spinners';
import { generatePath, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../../../data/AppRoutes.ts';
import { Add } from '@mui/icons-material';
import { getTimeStamp } from '../../../../../../src/utils/datetime.ts';

const ViewSalesTarget = () => {
  // const auth = useAppSelector((state: any) => state.auth);

  const [tableData, setTableData] = useState<TNestedObj[]>([]);

  const [rowItem, _setRowItem] = useState<TNestedObj>({});
  const [loading, setLoading] = useState(true);

  console.log('tableData', tableData);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<any>({
    startDate: null,
    endDate: null,
  }); 

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();

  const handleView = (rowItem: Record<string, any>) => {
    console.log('rowItem', rowItem);
    localStorage.setItem('TARGET_VIEW_ID', rowItem?._id);
    let pathUrl = generatePath(
      APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.expandView,
      {
        id: rowItem?._id,
      }
    );
    console.log('rowItem?._id', rowItem?._id);
    navigate(pathUrl, {
      state: {
        data: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
        id: rowItem?._id,
      },
    });
    console.log(rowItem, 'rowItem');
  };

  const handleEdit = (rowItem: Record<string, any>) => {
    console.log('rowItem', rowItem);
    let pathUrl = '';
    let stateData = {
      data: rowItem,
      actionType: AUM_FORM_ACTION_TYPES[2],
    };

    if (rowItem.isOneTimeOrRecurring === 'ONE_TIME') {
      pathUrl = generatePath(APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.EDITTARGET, {
        id: rowItem?._id,
      });
    } else {
      pathUrl = generatePath(
        APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.EDITRECURRING,
        {
          id: rowItem?._id,
        }
      );
    }

    navigate(pathUrl, { state: stateData });
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Target Type',
      field: 'targetType',
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'targetType',
      },
      ...GetHeaderParams(),
    },

    {
      headerName: 'Target',
      field: 'targetValue',
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'targetValue',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Recurring type',
      field: 'recurringType',
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'recurringType',
      },
      ...GetHeaderParams(),
    },

    {
      headerName: 'Target From',
      field: 'fromDate',
      filter: true,
      width: 500,
      cellRenderer: (rowData: { data: { fromDate: string } }) =>
        rowData.data.fromDate ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
            }}>
            <Typography variant='body2' sx={{ fontSize: '12px' }}>
              {new Date(parseInt(rowData.data.fromDate)).toLocaleDateString('en-GB')}
            </Typography>
          </Box>
        ) : (
          ''
        ),
      cellRendererParams: {
        field: 'fromDate',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Target To',
      field: 'toDate',
      filter: true,
      width: 500,
      cellRenderer: (rowData: { data: { toDate: string } }) =>
        rowData.data.toDate ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
            }}>
            <Typography variant='body2' sx={{ fontSize: '12px' }}>
              {new Date(parseInt(rowData.data.toDate)).toLocaleDateString('en-GB')}
            </Typography>
          </Box>
        ) : (
          ''
        ),
      cellRendererParams: {
        field: 'toDate',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Target Mode',
      field: 'isOneTimeOrRecurring',
      filter: true,
      width: 500,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'isOneTimeOrRecurring',
      },
      ...GetHeaderParams(),
    },

    {
      headerName: 'Actions',
      field: '',
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
          can_edit: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
        handleEdit: handleEdit,
      },
      width: 400,
      suppressMovable: true,
      ...GetHeaderParams({
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }),
    },
  ];

  // const STATUS_ARRAY = [
  //   {
  //     label: 'Applied',
  //     value: 'applied',
  //     color: '#f57c00',
  //     backGroundColor: '#ffe0b2',
  //   },
  //   {
  //     label: 'Rejected',
  //     value: 'rejected',
  //     color: '#b71c1c',
  //     backGroundColor: '#ffcdd2',
  //   },
  //   {
  //     label: 'Approved',
  //     value: 'approved',
  //     color: '#1A4331',
  //     backGroundColor: '#C6F1DA',
  //   },
  // ];

  const getAllSalesTargets = async () => {
    setLoading(true);
    try {
      let localStoreData = LocalStorage.parseObj(
        LocalStorage.parseObj(LocalStorage.getItem('userData'))
      );
      const startDate = filterOption.startDate;
      const endDate = filterOption.endDate;
      let payload = {
        organization: localStoreData?.organization_id,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
        startDate: startDate,
        endDate: endDate,
      };

      console.log('payload', payload);

      let listData = await SalesTargetService.getAllTargets(payload);
      setTableData(
        listData?.data?.response?.data ? listData?.data?.response?.data : []
      );
      console.log('listData', listData);
      setTotalCount(
        listData?.data?.response?.total ? listData?.data?.response?.total : 0
      );
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setLoading(false);
    }
  };
  console.log('page number ====>>>>', tableData);

  useEffect(() => {
    getAllSalesTargets();
  }, [page, pageSize,filterOption]);

  return (
    <div>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                Target
              </Typography>
              <Grid item xs={8}>
                <Grid container spacing={2} justifyContent={"end"}>
                  <Grid item xs={4}>
                    <Textfield
                      fullWidth
                      label="From Date"
                      type="date"
                      name="fromDate"
                      onChange={(e: any) => {
                        const selectedDate = e.target.value;
                        setFilterOption({
                          ...filterOption,
                          startDate: getTimeStamp(selectedDate),
                        });
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Textfield
                      fullWidth
                      label="To Date"
                      type="date"
                      name="toDate"
                      onChange={(e: any) => {
                        const selectedDate: any = new Date(e.target.value);
                        selectedDate.setHours(23, 59, 59, 999).toString();
                        setFilterOption({
                          ...filterOption,
                          endDate: getTimeStamp(selectedDate),
                        });
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
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
                    getAllSalesTargets();
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(
                      APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.TARGET?.pathName,
                      {
                        state: {
                          userId: null,
                          actionType: AUM_FORM_ACTION_TYPES[0],
                        },
                      }
                    );
                  }}
                  sx={{ height: 38 }}
                >
                  <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                </Button>
              </Box>
              {/* <Box sx={{ padding: 0, display: 'flex', columnGap: 1 }}>
                <Autocomplete
                  options={STATUS_ARRAY}
                  value={filterOptions?.statusLabel || null}
                  onChange={(_event, newValue) => {
                    return setFilterOptions({
                      ...filterOptions,
                      statusLabel: newValue === null ? '' : newValue?.label,
                      statusValue: newValue === null ? '' : newValue?.value,
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Status'
                      size='small'
                      variant='outlined'
                    />
                  )}
                  sx={{ width: 180 }}
                  PopperComponent={(props) => (
                    <Popper {...props} placement='bottom-start' />
                  )}
                />
                <Autocomplete
                  value={filterOptions?.assigneeLabel || null}
                  onChange={(_event, newValue) =>
                    setFilterOptions({
                      ...filterOptions,
                      assigneeLabel: newValue === null ? '' : newValue?.label,
                      assigneeValue: newValue === null ? '' : newValue?.value,
                    })
                  }
                  options={assigneeOptions}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      size='small'
                      label='User'
                      variant='outlined'
                    />
                  )}
                  sx={{ width: 180 }}
                />

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
                    getAllSalesTargets();
                  }}
                />
              </Box> */}
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
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
              TableHeight={58}
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
        <LeaveApprovalModal
          isOpen={isModalOpen}
          onClose={() => {
            handleCloseModal();
          }}
          reRender={() => {
            getAllSalesTargets();
          }}
          reason={rowItem.reason}
          rowItem={rowItem}
          // replace with the actual field name
        />
      </ContainerBoxV2>
    </div>
  );
};

export default ViewSalesTarget;

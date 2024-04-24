import {
  Typography,
  Grid,
  Stack,
  TextField,
  Autocomplete,
  Button,
  InputLabel,
} from '@mui/material';
import {
  ContainerBoxV2,
  
  Textfield,
} from '../../../../components/MUI/mui.index.tsx';
import { CustomDivier } from '../../../../components/APP/app.index.tsx';
import { useAppSelector } from '../../../../hooks/index.ts';
import { getUserListForAdmin } from '../../../../components/com_components/CustomerSettingsAPI.tsx';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import CollectionReport from '../../../../services/admin/reports/report.service.tsx';
import FileDownload from 'js-file-download';
import moment from 'moment';
import groupSettingService from '../../../../services/settings/group.setting.service.ts';
import { toast } from 'react-toastify';

const CollectionReports = () => {
  const [assigneeOptions, setAssigneeOptions] = useState<any>([]);
  const [ColumnOptions, setColumnOptions] = useState<any>([]);
  const [CollectionType, setCollectionType] = useState<any>([]);
  const [groupsOptions, setGroupOptions] = useState<any>([]);
  const [filterOptions, setFilterOptions] = useState<any>({
    fromDate: '',
    fromDateTimeStamp: 0,
    toDate: '',
    toDateTimeStamp: 0,
    group: [],
    user: [],
    collectionType: '',
    columns: [],
    organization_id: '',
  });

  const AUTH = useAppSelector((state) => state.auth);

  const getUserData = async () => {
    const getPayload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };
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
        setAssigneeOptions([
          { label: 'Select All', value: 'select_all' },
          ...categoriesOption,
        ]);
      })
      .catch((err: any) => console.log(err.message));
  };

  const getTypeOfCollections = () => {
    try {
      const typeData = [
        { label: 'Select All', value: 'select_all' },
        { label: 'Cash', value: 'CASH_COLLECTION_COLUMNS' },
        { label: 'Bank Transfer', value: 'BANK_TRANSFER_COLLECTION_COLUMNS' },
        { label: 'Cheque', value: 'CHEQUE_COLLECTION_COLUMNS' },
      ];
      setCollectionType(typeData);
    } catch (error) {
      console.error('Error fetching column data:', error);
    }
  };

  const getList = async () => {
    let payload = {
      status: true,
      organization_id: AUTH?.data?.userRecord?.organization_id,
    };

    try {
      const response = await groupSettingService.getAll(payload);
      const groups = response?.data?.data;
      const mappedGroups = groups.map((group: { id: any; groupName: any }) => ({
        _id: group.id,
        groupName: group.groupName,
      }));
      setGroupOptions(mappedGroups);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchColumns = async (type: any) => {
    try {
      const response = await CollectionReport?.getColumnsCollection(
        `?report_name=${type}`
      );
      setColumnOptions(response?.response?.columns);
    } catch (error) {
      console.error('Error fetching column data:', error);
    }
  };

  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };

  const handleDownload = async () => {
    try {
      const payload = {
        ...filterOptions,
        user: filterOptions?.assigneeLabel?.map(
          (m: { value: any }) => m?.value
        ),
        organization_id: AUTH?.data?.userRecord?.organization_id,
        columnType: filterOptions?.collectionType,
      };
      const response = await CollectionReport.DownloadCollections(payload);

      const filename = `collections_report${moment().format('DD-MM-YYYY')}.csv`;

      FileDownload(response.data, filename);
    } catch (error: any) {
      console.error('Error downloading report:', error);
      if (error?.response?.status == 500) {
        toast.warning('Collection report data not found', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  useEffect(() => {
    getUserData();
    getTypeOfCollections();
    getList();
  }, []);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                Collections reports
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Grid container spacing={2} alignItems='center' p={2}>

        <Grid item xs={2}>
          <InputLabel
            shrink
            sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
          >
            From
          </InputLabel>
          <Textfield
            type='date'
            value={
              filterOptions?.fromDate
                ? dayjs(filterOptions.fromDate).format('YYYY-MM-DD')
                : ''
            }
            onChange={(event) => {
              const timestamp = dayjs(event.target.value).valueOf();
              handleFilterChange('fromDate', timestamp);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <InputLabel
            shrink
            sx={{ fontSize: 18, fontWeight: '600', color: '#181C32' }}
          >
            To
          </InputLabel>
          <Textfield
            type='date'
            value={
              filterOptions?.toDate
                ? dayjs(filterOptions.toDate).format('YYYY-MM-DD')
                : ''
            }
            onChange={(event) => {
              const timestamp = dayjs(event.target.value).valueOf();
              handleFilterChange('toDate', timestamp);
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            multiple
            limitTags={1}
            value={filterOptions?.assigneeLabel || []}
            onChange={(_event, newValues) => {
              try {
                let tempValue = Boolean(
                  newValues?.filter((ft) => ft?.value == 'select_all')?.length
                )
                  ? assigneeOptions?.filter(
                      (ft: { value: string }) => ft?.value != 'select_all'
                    )
                  : newValues;

                setFilterOptions({
                  ...filterOptions,
                  assigneeLabel: _.uniqBy(tempValue, 'value'),
                });
              } catch (error) {
                console.error('Error setting filter options:', error);
              }
            }}
            options={assigneeOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Users'
                variant='outlined'
              />
            )}
            sx={{ width: '100%', maxHeight: '50px', mt:'25px' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            limitTags={1}
            value={filterOptions.collectionType}
            onChange={(_event, newValues) => {
              setFilterOptions({
                ...filterOptions,
                collectionType: newValues,
              });
              fetchColumns(newValues?.value);
            }}
            options={CollectionType}
            isOptionEqualToValue={(option, val) => option.value === val.value}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Collection Type'
                variant='outlined'
              />
            )}
            sx={{ width: '100%', maxHeight: '50px', mt:'25px' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems='center' p={2}>
        <Grid item xs={3}>
          <Autocomplete
            multiple
            limitTags={1}
            value={filterOptions.columns}
            onChange={(_event, newValues) => {
              setFilterOptions({
                ...filterOptions,
                columns: newValues,
              });
            }}
            options={ColumnOptions}
            isOptionEqualToValue={(option, val) => option.value === val.value}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Columns'
                variant='outlined'
              />
            )}
            sx={{ width: '100%', maxHeight: '50px' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            multiple
            limitTags={1}
            value={groupsOptions.filter((option: { _id: any }) =>
              filterOptions.group.includes(option._id)
            )}
            onChange={(_event, newValues) => {
              handleFilterChange(
                'group',
                newValues.map((value) => value._id)
              );
            }}
            options={groupsOptions}
            getOptionLabel={(option) => option.groupName}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Group'
                variant='outlined'
              />
            )}
            sx={{ width: '100%', maxHeight: '50px' }}
          />
        </Grid>
        <Grid item xs={2} >
          <Button
            variant='contained'
            color='primary'
            onClick={handleDownload}
            fullWidth
          >
            Export CSV
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default CollectionReports;

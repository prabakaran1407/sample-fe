import { Typography, Grid, Stack, InputLabel } from '@mui/material';
import {
  ContainerBoxV2,
  
  Textfield,
} from '../../../../components/MUI/mui.index.tsx';
import { CustomDivier } from '../../../../components/APP/app.index.tsx';
import { useAppSelector } from '../../../../hooks/index.ts';
import { useEffect, useState } from 'react';
import { getUserListForAdmin } from '../../../../components/com_components/CustomerSettingsAPI.tsx';
import { Autocomplete, TextField } from '@mui/material';
import dayjs from 'dayjs';
import AttendanceReport from '../../../../services/admin/reports/report.service.tsx';
import Button from '@mui/material/Button';
import FileDownload from 'js-file-download';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify';

const ClaimReports = () => {
  const AUTH = useAppSelector((state) => state.auth);
  const [filterOptions, setFilterOptions] = useState<any>({
    fromDate: '',
    fromDateTimeStamp: 0,
    toDate: '',
    toDateTimeStamp: 0,
    user: [],
    columns: [],
    organization_id: '',
    typeOfClaim: '',
    modeOfTransport: '',
    status: '',
  });

  const [assigneeOptions, setAssigneeOptions] = useState<any>([]);
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
        setAssigneeOptions([
          { label: 'Select All', value: 'select_all' },
          ...categoriesOption,
        ]);
      })
      .catch((err: any) => console.log(err.message));
  };

  let getPayload = {
    organization_id: AUTH?.data?.userRecord?.organization_id,
  };

  const handleFilterChange = (field: any, value: any) => {
    setFilterOptions({
      ...filterOptions,
      [field]: value,
    });
  };

  const [ColumnOptions, setColumnOptions] = useState<any>([]);
  const fetchColumns = async () => {
    try {
      const response = await AttendanceReport?.getColumnsClaims(
        '?report_name=ADMIN_CLAIM_REPORT'
      );

      setColumnOptions(response?.response?.columns);
    } catch (error) {
      console.error('Error fetching column data:', error);
    }
  };


  useEffect(() => {
    getUserData();
  }, [filterOptions?.assigneeValue]);

  const [claimTypeOptions, setClaimTypeOptions] = useState<any>([]);
  const fetchClaimType = async () => {
    let getPayload = {
      organization_id: AUTH?.data?.userRecord?.organization_id,
      status: true,
    };
    try {
      const response = await AttendanceReport?.getClaimtype(getPayload);

      setClaimTypeOptions(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching column data:', error);
    }
  };

 const [transType, setTransType] = useState<any>([]);

  const TransType = async ()=>{
    let getPayload={
      organization_id: AUTH?.data?.userRecord?.organization_id,
      status:true,
    }
    try{
      const response = await AttendanceReport?.getTrantype(getPayload);
      setTransType(response?.data?.data);

    }catch(error){
      console.error("error fetching transtype" ,error)
    }
  }
  useEffect(() => {
    getUserData();
    fetchColumns();
    fetchClaimType();
    TransType();
  }, [filterOptions]);

  const handleDownload = async () => {
    try {
      const payload = {
        ...filterOptions,
        user: filterOptions?.assigneeLabel?.map(
          (m: { value: any }) => m?.value
        ),
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      const response = await AttendanceReport.DownloadClaims(payload);

      const filename = `claim_report${moment().format('DD-MM-YYYY')}.csv`;

      FileDownload(response.data, filename);
    } catch (error:any) {
      console.error('Error downloading report:', error);
      if (error?.response?.status == 500) {
        toast.warning('Claim report data not found', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                Claim reports
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <Grid
        container
        spacing={3}
        alignItems='center'
        p={2}
      >
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
        <Grid item xs={3} mt={3}>
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
            isOptionEqualToValue={(option, val) => option.value === val.value}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Users'
                variant='outlined'
              />
            )}
            sx={{ width: '100%', maxHeight: '50px' }}
          />
        </Grid>

        <Grid item xs={3} mt={3}>
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
            value={claimTypeOptions.filter((option: { _id: any }) =>
              filterOptions.typeOfClaim.includes(option._id)
            )}
            onChange={(_event, newValues) => {
              handleFilterChange(
                'typeOfClaim',
                newValues.map((value) => value._id)
              );
            }}
            options={claimTypeOptions}
            getOptionLabel={(option) => option.typeOfClaim}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Type of Claim'
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
            value={transType.filter((option: { _id: any }) =>
              filterOptions.modeOfTransport.includes(option._id)
            )}
            onChange={(_event, newValues) => {
              handleFilterChange(
                'modeOfTransport',
                newValues.map((value) => value._id)
              );
            }}
            options={transType}
            getOptionLabel={(option) => option.modeOfTransport}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Mode of transport'
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

export default ClaimReports;

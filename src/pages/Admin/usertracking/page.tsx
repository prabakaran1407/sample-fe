/** @format */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserMapTabel } from './userMapTable';
import { getUserListForAdmin } from '../../../components/com_components/CustomerSettingsAPI';
import { ContainerBoxV2 } from '../../../components/MUI/mui.index';
import { Grid, Stack, Typography } from '@mui/material';
import { CustomDivier } from '../../../components/APP/app.index';

const UserTracking = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  const user: any = useSelector((state: any) => state.auth).data.userRecord;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    await getUserListForAdmin(user?.organization_id)
      .then((res) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(({ _id, firstName, lastName }: any) => {
          return {
            label: `${firstName} ${lastName}`,
            value: _id,
          };
        });
        setOptions(categoriesOption);
        setTableData(res.data);
      })
      .catch((err: any) => console.log(err.message));
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                User Tracking
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <UserMapTabel tableData={tableData} valueName={options} />
    </div>
  );
};

export default UserTracking;

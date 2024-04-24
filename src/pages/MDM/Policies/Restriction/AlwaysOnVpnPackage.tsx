/** @format */

import React from 'react';
import '../policies.css';
import * as _ from 'lodash';
import { TextField, Typography, Grid, Box } from '@mui/material';

type Props = {
  onAlwaysOnVpnPackageChange: any;
  data: any;
  setData: any;
  editData: any;
};

const AlwaysOnVpnPackage: React.FC<Props> = ({
  onAlwaysOnVpnPackageChange,
  data,
  setData,
}) => {
  const alwaysOnVpnPackage = (name: any, value: any) => {
    let vpnData = { ...data?.alwaysOnVpnPackage, [name]: value };
    if (_.isEmpty(value)) {
      vpnData = {};
    }
    setData({
      ...data,
      alwaysOnVpnPackage: vpnData,
    });
  };

  return (
    <div>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          Always On VPN Package
        </Typography>
      </Box>

      <Grid container spacing={3} direction='row' alignItems='flex-start'>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Package Name</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <TextField
              label='Package Name'
              size='small'
              style={{
                width: 340,
                background: '#FFFFFF',
                marginRight: 20,
              }}
              defaultValue={data?.alwaysOnVpnPackage?.packageName}
              onChange={(e) => {
                alwaysOnVpnPackage('packageName', e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Lockdown Enabled</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='lockdownEnabled'
                type='checkbox'
                checked={data?.alwaysOnVpnPackage?.lockdownEnabled}
                onChange={(e) => onAlwaysOnVpnPackageChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AlwaysOnVpnPackage;

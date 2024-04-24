/** @format */

import React from 'react';
import '../policies.css';
import * as _ from 'lodash';
import { Autocomplete, TextField, Typography, Grid, Box } from '@mui/material';

type Props = {
  onInputChange: any;
  data: any;
  setData: any;
  editData: any;
};

const KioskCustomization: React.FC<Props> = ({
  onInputChange,
  data,
  setData,
}) => {
  const kioskCustomization = (name: any, value: any) => {
    let statusbarData = { ...data?.kioskCustomization, [name]: value };
    if (_.isEmpty(value)) {
      statusbarData = {};
    }
    setData({
      ...data,
      kioskCustomization: statusbarData,
    });
  };

  return (
    <div>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          Kiosk Customization
        </Typography>
      </Box>

      <Grid container spacing={3} direction='row' alignItems='flex-start'>
        <Grid item xs={6}>
          <div>
            <label className='d-block fs-6'>
              Kiosk Custom Launcher Enabled
            </label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                type='checkbox'
                name='kioskCustomLauncherEnabled'
                onChange={(e) => onInputChange(e)}
                checked={data?.kioskCustomLauncherEnabled}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>

        {data.kioskCustomLauncherEnabled ? (
          <>
            <Grid item xs={6}>
              <div className='col-sm'>
                <label className='d-block fs-6'>Power Button Actions</label>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  defaultValue={data?.PowerButtonActions}
                  value={data?.kioskCustomization?.powerButtonActions}
                  options={[
                    'POWER_BUTTON_ACTIONS_UNSPECIFIED',
                    'POWER_BUTTON_AVAILABLE',
                    'POWER_BUTTON_BLOCKED',
                  ]}
                  sx={{ width: 340, background: '#FFFFFF' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Power Button Actions'
                      size='small'
                    />
                  )}
                  onChange={(_e, value) => {
                    kioskCustomization('powerButtonActions', value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <label className='d-block fs-6'>System Error Warnings</label>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  defaultValue={data?.SystemError}
                  value={data?.kioskCustomization?.systemErrorWarnings}
                  options={[
                    'SYSTEM_ERROR_WARNINGS_UNSPECIFIED',
                    'ERROR_AND_WARNINGS_ENABLED',
                    'ERROR_AND_WARNINGS_MUTED',
                  ]}
                  sx={{ width: 340, background: '#FFFFFF' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='System Error Warnings'
                      size='small'
                    />
                  )}
                  onChange={(_e, value) => {
                    kioskCustomization('systemErrorWarnings', value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <label className='d-block fs-6'>System Navigation</label>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  defaultValue={data?.SystemNavigation}
                  value={data?.kioskCustomization?.systemNavigation}
                  options={[
                    'SYSTEM_NAVIGATION_UNSPECIFIED',
                    'NAVIGATION_ENABLED',
                    'NAVIGATION_DISABLED',
                    'HOME_BUTTON_ONLY',
                  ]}
                  sx={{ width: 340, background: '#FFFFFF' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='System Navigation'
                      size='small'
                    />
                  )}
                  onChange={(_e, value) => {
                    kioskCustomization('systemNavigation', value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <label className='d-block fs-6'>Status Bar</label>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  defaultValue={data?.Status}
                  value={data?.kioskCustomization?.statusBar}
                  options={[
                    'STATUS_BAR_UNSPECIFIED',
                    'NOTIFICATIONS_AND_SYSTEM_INFO_ENABLED',
                    'NOTIFICATIONS_AND_SYSTEM_INFO_DISABLED',
                    'SYSTEM_INFO_ONLY',
                  ]}
                  sx={{ width: 340, background: '#FFFFFF' }}
                  renderInput={(params) => (
                    <TextField {...params} label='Status Bar' size='small' />
                  )}
                  onChange={(_e, value) => {
                    kioskCustomization('statusBar', value);
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <label className='d-block fs-6'>Device Settings</label>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className='col-sm'>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  defaultValue={data?.DeviceSettings}
                  value={data?.kioskCustomization?.deviceSettings}
                  options={[
                    'DEVICE_SETTINGS_UNSPECIFIED',
                    'SETTINGS_ACCESS_ALLOWED',
                    'SETTINGS_ACCESS_BLOCKED',
                  ]}
                  sx={{ width: 340, background: '#FFFFFF' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Device Settings'
                      size='small'
                    />
                  )}
                  onChange={(_e, value) => {
                    kioskCustomization('deviceSettings', value);
                  }}
                />
              </div>
            </Grid>
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default KioskCustomization;

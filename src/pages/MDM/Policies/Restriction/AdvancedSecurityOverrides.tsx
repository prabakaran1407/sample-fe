/** @format */

import React from 'react';
import '../policies.css';
import * as _ from 'lodash';
import { Autocomplete, TextField, Typography, Grid, Box } from '@mui/material';

type Props = {
  data: any;
  setData: any;
  editData: any;
};

const AdvancedSecurityOverrides: React.FC<Props> = ({ data, setData }) => {
  const advancedSecurityOverrides = (name: any, value: any) => {
    let securityData = { ...data?.advancedSecurityOverrides, [name]: value };
    if (_.isEmpty(value)) {
      securityData = {};
    }
    setData({
      ...data,
      advancedSecurityOverrides: securityData,
    });
    // setData({
    //   ...data,
    //   advancedSecurityOverrides: {
    //     ...data?.advancedSecurityOverrides,
    //     [name]: value,
    //   },
    // });
  };

  return (
    <div>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          Advanced Security Overrides
        </Typography>
      </Box>
      <Grid container spacing={3} direction='row' alignItems='flex-start'>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Untrusted Apps Policy</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              defaultValue={data?.UntrustedAppsPolicy}
              value={data?.advancedSecurityOverrides?.untrustedAppsPolicy}
              options={[
                'UNTRUSTED_APPS_POLICY_UNSPECIFIED',
                'DISALLOW_INSTALL',
                'ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY',
                'ALLOW_INSTALL_DEVICE_WIDE',
              ]}
              sx={{ width: 340, background: '#FFFFFF' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Untrusted Apps Policy'
                  size='small'
                />
              )}
              onChange={(_e, value) => {
                advancedSecurityOverrides('untrustedAppsPolicy', value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>
              Google Play Protect Verify Apps
            </label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              defaultValue={data?.GooglePlayProtectVerifyApps}
              value={
                data?.advancedSecurityOverrides?.googlePlayProtectVerifyApps
              }
              options={[
                'GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED',
                'VERIFY_APPS_ENFORCED',
                'VERIFY_APPS_USER_CHOICE',
              ]}
              sx={{ width: 340, background: '#FFFFFF' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Google Play Protect Verify Apps'
                  size='small'
                />
              )}
              onChange={(_e, value) => {
                advancedSecurityOverrides('googlePlayProtectVerifyApps', value);
              }}
            />
          </div>
        </Grid>

        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Developer Settings</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              defaultValue={data?.DeveloperSettings}
              value={data?.advancedSecurityOverrides?.developerSettings}
              options={[
                'DEVELOPER_SETTINGS_UNSPECIFIED',
                'DEVELOPER_SETTINGS_DISABLED',
                'DEVELOPER_SETTINGS_ALLOWED',
              ]}
              sx={{ width: 340, background: '#FFFFFF' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Developer Settings'
                  size='small'
                />
              )}
              onChange={(_e, value) => {
                advancedSecurityOverrides('developerSettings', value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Common Criteria Mode</label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <Autocomplete
              disablePortal
              id='combo-box-demo'
              defaultValue={data?.CommonCriteriaMode}
              value={data?.advancedSecurityOverrides?.commonCriteriaMode}
              options={[
                'COMMON_CRITERIA_MODE_UNSPECIFIED',
                'COMMON_CRITERIA_MODE_DISABLED',
                'COMMON_CRITERIA_MODE_ENABLED',
              ]}
              sx={{ width: 340, background: '#FFFFFF' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Common Criteria Mode'
                  size='small'
                />
              )}
              onChange={(_e, value) => {
                advancedSecurityOverrides('commonCriteriaMode', value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <label className='d-block fs-6'>
              Personal Apps That Can Read Work Notifications
            </label>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className='col-sm'>
            <TextField
              label='Personal Apps That Can Read Work Notifications'
              size='small'
              style={{
                width: 340,
                background: '#FFFFFF',
              }}
              defaultValue={
                data?.advancedSecurityOverrides
                  ?.personalAppsThatCanReadWorkNotifications
              }
              onChange={(e) => {
                advancedSecurityOverrides(
                  'personalAppsThatCanReadWorkNotifications',
                  e.target.value
                );
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdvancedSecurityOverrides;

/** @format */

import React from 'react';
import '../policies.css';
import { Typography, Grid, Box } from '@mui/material';

type Props = {
  onStatusReportingChange: any;
  onApplicationReportingChange: any;
  data: any;
  setData: any;
  editData: any;
};

const StatusReportingSettings: React.FC<Props> = ({
  onStatusReportingChange,
  onApplicationReportingChange,
  data,
}) => {
  console.log('************************', data.statusReportingSettings);
  // const [reportState,setReportState] =

  return (
    <div>
      <Box sx={{ pt: 2, pb: 2 }}>
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
          Status Reporting Settings{' '}
        </Typography>
      </Box>

      <Grid container spacing={3} direction='row' alignItems='flex-start'>
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Device Settings Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='deviceSettingsEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.deviceSettingsEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Software Info Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='softwareInfoEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.softwareInfoEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>{' '}
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Memory Info Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='memoryInfoEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.memoryInfoEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>{' '}
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Network Info Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='networkInfoEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.networkInfoEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>{' '}
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>Display Info Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='displayInfoEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.displayInfoEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>{' '}
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>
              Power Management Events Enabled
            </label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='powerManagementEventsEnabled'
                type='checkbox'
                checked={
                  data?.statusReportingSettings?.powerManagementEventsEnabled
                }
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>{' '}
        <Grid item xs={4}>
          {' '}
          <div className='col-sm'>
            <label className='d-block fs-6'>Hardware Status Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='hardwareStatusEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.hardwareStatusEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>{' '}
        <Grid item xs={4}>
          <div className='col-sm'>
            <label className='d-block fs-6'>System Properties Enabled</label>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className='col-sm'>
            <label className='switch'>
              <input
                name='systemPropertiesEnabled'
                type='checkbox'
                checked={data?.statusReportingSettings?.systemPropertiesEnabled}
                onChange={(e) => onStatusReportingChange(e)}
              />
              <span className='slider round'></span>
            </label>
          </div>
        </Grid>
        {data?.statusReportingSettings?.applicationReportsEnabled ? (
          <>
            <Grid item xs={4}>
              <div className='col-sm'>
                <label className='d-block fs-6'>Include Removed Apps</label>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className='col-sm'>
                <label className='switch'>
                  <input
                    name='includeRemovedApps'
                    type='checkbox'
                    checked={
                      data?.statusReportingSettings
                        ?.applicationReportingSettings?.includeRemovedApps
                    }
                    onChange={(e) => onApplicationReportingChange(e)}
                  />
                  <span className='slider round'></span>
                </label>
              </div>
            </Grid>
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default StatusReportingSettings;

/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { memo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import NotFound from '../../../assets/svg/illustration_404.svg';

function PageNotFound(_props: any) {
  return (
    <>
      <Box
        component='div'
        style={{
          width: '100vw',
          height: '100vh',
          backgroundImage: "linear-gradient(to right, #E8DAF3, #E2CCF6)"
        }}
      >
        <Grid
          container
          sx={{
            height: 'inherit',
            width: 'inherit',
          }}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Grid container item xs={12} justifyContent={'center'} flexDirection={'row'} sx={{ width: 'inherit', gap: 5}}>
            {/* <Typography variant="h4" color={'error'}>404</Typography><Typography variant="h6">
            &nbsp;|&nbsp;Page not found😭
            </Typography> */}
            <Grid container item xs={12} sx={{ width: 'inherit' }} justifyContent={'center'}>
              <img src={NotFound} alt='' height={'200px'} />

            </Grid>
            <Grid container item xs={12} justifyContent={'center'}>
              <Typography variant="subtitle2" color={'error'} sx={{ textAlign: 'justify'}}>
              We regret to inform you that you do not have the necessary permissions to access the requested page, please contact your admin.
              </Typography>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default memo(PageNotFound);

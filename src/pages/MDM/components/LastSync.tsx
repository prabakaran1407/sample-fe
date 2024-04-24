/** @format */

import { Typography, Box } from '@mui/material';
import moment from 'moment';

function LastCellRenderer(props: any) {
  const enrollmentTime = props?.data?.enrollmentTime
    ? props.data?.enrollmentTime
    : '--';
  console.log('enrollmentTime', enrollmentTime);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center', // Added style
      }}
    >
      <Typography variant='body2' sx={{ fontSize: '12px' }}>
        {enrollmentTime ? moment(enrollmentTime).format('YYYY-MM-DD') : '--'}
      </Typography>
    </Box>
  );
}

export default LastCellRenderer;

/** @format */

import { Typography, Box } from '@mui/material';

function PolicyCell(props: any) {
  const appliedPolicyName = props?.data?.name ? props.data?.name : '--';
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
        {appliedPolicyName?.split('/')?.splice(-1)
          ? appliedPolicyName?.split('/')?.splice(-1)
          : '---------'}
      </Typography>
    </Box>
  );
}

export default PolicyCell;

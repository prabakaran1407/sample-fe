/** @format */

import { Typography, Box } from '@mui/material';

function PolicyCellRenderer(props: any) {
  console.log('appliedPolicyName', props);
  const appliedPolicyName = props?.data?.appliedPolicyName
    ? props.data?.appliedPolicyName
    : '--';
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

export default PolicyCellRenderer;

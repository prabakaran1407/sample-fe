/** @format */

import React from 'react';
import { Box } from '@mui/material';
import { DEFAULT_STATUS_LEAVE_REQUEST } from '../../../data/AppConst';

interface StatusCellRendererProps {
  value: any;
}

const StatusCellRenderer: React.FC<StatusCellRendererProps> = (props: any) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {props?.data?.status ===
        DEFAULT_STATUS_LEAVE_REQUEST[`${props?.data?.status}`]['STATUS'] && (
        <Box
          sx={{
            color:
              DEFAULT_STATUS_LEAVE_REQUEST[`${props?.data?.status}`]['COLOR'],
            fontSize: 12,
            fontWeight: '500',
            height: '25px',
            width: '90px',
            background:
              DEFAULT_STATUS_LEAVE_REQUEST[`${props?.data?.status}`][
                'BACKGROUND'
              ],
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {DEFAULT_STATUS_LEAVE_REQUEST[`${props?.data?.status}`]['TEXT']}
        </Box>
      )}
    </Box>
  );
};

export default StatusCellRenderer;

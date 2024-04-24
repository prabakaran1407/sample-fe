/** @format */

import { Typography, Box } from '@mui/material';
import * as _ from 'lodash';

function CustomCellRenderValues(props: any) {
  let { data, field, length = false, formatter } = props;
  let value = _.get(data, field, '--');
  if (formatter) {
    value = formatter(value);
  } else if (length) {
    const arrayData = _.get(data, field, []);
    value = arrayData.length;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
      }}>
      <Typography variant='body2' sx={{ fontSize: '12px' }}>
        {value ? value : '--'}
      </Typography>
    </Box>
  );
}

export default CustomCellRenderValues;

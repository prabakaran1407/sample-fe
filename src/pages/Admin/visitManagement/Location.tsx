import { memo } from 'react';
// *********** Icon
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Stack, Tooltip } from '@mui/material';
import { ActionIconButton } from '../../../components/MUI/mui.index';
import { MAP_URL } from '../../../config';

function TableLocationRenderer(props: any) {
  const { location } = props.data;

  console.log('props.data', props.data);

  const viewMap = (_type: string) => {
    const URL = `${MAP_URL}?q=${location[0]},${location[1]}`;
    console.log('URL', URL);
    window.open(URL, '_blank');
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
        <Stack direction='row'>
          {location?.length === 2 && (
            <ActionIconButton actionType='' onClick={() => viewMap('IN')}>
              <Tooltip title='Visit Location'>
                <LocationOnIcon color='error' />
              </Tooltip>
            </ActionIconButton>
          )}{' '}
        </Stack>
      </Box>
    </>
  );
}

export default memo(TableLocationRenderer);

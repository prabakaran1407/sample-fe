/** @format */

// **************** MUI
import {
  Grid,
  SwipeableDrawer,
  SwipeableDrawerProps,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { ActionIconButton } from '../mui.index';
import { ACTION_ICON_TYPES } from '../../../data/AppConst';
import { CustomDivier } from '../../APP/app.index';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
interface IMyDrawer extends SwipeableDrawerProps {
  anchor: Anchor;
  children: React.ReactNode;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: any;
  drawerWidth?: string;
  title?: string;
}

export const MyDrawer: FC<IMyDrawer> = ({
  anchor,
  drawerWidth,
  children,
  drawerOpen,
  setDrawerOpen,
  title,
  ...rest
}: IMyDrawer) => {
  const [] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={drawerOpen}
      sx={{
        zIndex: 9999,
        '& .MuiDrawer-paper': {
          width: drawerWidth || '50%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        },
      }}
      {...rest}
    >
      <Grid
        container
        xs={12}
        sx={{ width: '100%', padding: 1, maxHeight: '10%' }}
      >
        <Grid container item xs={12} alignItems={'center'}>
          <Grid item xs={6} sx={{ display: 'fex', justifyContent: 'start' }}>
            <Typography
              variant='body1'
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                fontWeight: '600',
              }}
            >
              {title || 'No Page Name'}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
            <ActionIconButton
              actionType={ACTION_ICON_TYPES[3]}
              onClick={() => setDrawerOpen(false)}
              title='Close'
            />
          </Grid>
        </Grid>
      </Grid>
      <CustomDivier style={{ marginTop: '0px' }} />
      <Grid
        container
        item
        xs={12}
        sx={{ width: '100%', padding: 1, overflow: 'scroll', height: 'auto' }}
      >
        {children}
      </Grid>
    </SwipeableDrawer>
  );
};

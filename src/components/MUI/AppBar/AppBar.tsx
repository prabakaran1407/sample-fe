/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';

// MUI ***********
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// Component ************
import { TopBarBox } from '../Box/Box';
import {
  Avatar,
  Box,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';

export const AppBarComponent = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandSideBar, setExpandSidebar] = useState(true);
  const [viewSettingModal, setViewSettingModal] = useState(false);

  const toggleExpandSidebar = () => {
    setExpandSidebar(!expandSideBar);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <TopBarBox>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          style={{ display: isMobile ? 'flex' : 'none' }}
        >
          <MenuRoundedIcon style={{ fontSize: 30, color: '#7145B0' }} />
        </IconButton>
        <IconButton
          onClick={toggleExpandSidebar}
          style={{ display: isMobile ? 'none' : 'flex' }}
        >
          <MenuOpenRoundedIcon style={{ fontSize: 30, color: '#7145B0' }} />
        </IconButton>
        <Typography
          style={{
            fontSize: isMobile ? 20 : 24,
            paddingLeft: isMobile ? 80 : 16,
            fontWeight: '600',
            color: '#7145B0',
            textAlign: 'center',
          }}
        >
          SALES 10X
        </Typography>
      </Box>
      <Box style={{ display: 'flex' }}>
        <IconButton
          onClick={() => {
            setViewSettingModal(!viewSettingModal);
          }}
          style={{ display: isMobile ? 'none' : 'flex', marginRight: 24 }}
        >
          <SettingsOutlinedIcon style={{ fontSize: 24, color: '#7145B0' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setViewSettingModal(!viewSettingModal);
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            sx={{ width: 30, height: 30 }}
          />
        </IconButton>
      </Box>
    </TopBarBox>
  );
};

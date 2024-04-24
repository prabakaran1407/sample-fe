/** @format */

import { Outlet } from 'react-router-dom';

// components
import { AppContentBox } from '../Box/Box';

export const AppContent = () => {
  return (
    <AppContentBox>
      <Outlet />
    </AppContentBox>
  );
};

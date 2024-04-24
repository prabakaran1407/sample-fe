/** @format */

import { useState, useMemo } from 'react';
import { ContainerBoxV2, TabMenus } from '../../../../components/MUI/mui.index';

// ************* MUI
import { Grid, Typography } from '@mui/material';

// ************* Settings component
import VisitType from './2-Type/page';
import VisitPurpose from './1-Purpose/page';

// ***************** Icons
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import ClassIcon from '@mui/icons-material/Class';

import activeIcon from '@mui/icons-material/CheckCircleRounded';
import DeleteIcon from '@mui/icons-material/Delete';

export const DeactiveIcon = DeleteIcon;
export const ActiveIcon = activeIcon;

function VisitSettings() {
  const VISIT_TAB_MENU = useMemo(() => {
    return [
      {
        label: 'Purpose of visit',
        icon: <ClassIcon fontSize='small' />,
      },
      {
        label: 'Type of visit',
        icon: <BrandingWatermarkIcon fontSize='small' />,
      },
    ];
  }, []);

  // ******************** Product settings menus

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return VisitPurpose;
      case 1:
        return VisitType;
      //   case 2:
      //     return ProductSubCategory;
      //   case 3:
      //     return ProductType;
      //   case 4:
      //     return ProductColor;
      //   case 5:
      //     return ProductSize;
      //   case 6:
      //     return ProductHsn;
      //   case 7:
      //     return Product;
      default:
        return VisitType;
    }
  };

  const [activatedTab, setActivatedTab] = useState<number>(0);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };

  const SelectedPageContent: any = useMemo(
    () => SelectedMenuPage(),
    [activatedTab]
  );
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12} rowSpacing={3}>
          <Grid item xs={12} sx={{ borderBottomColor: 'black' }}>
            <Typography variant='h6' sx={{ fontWeight: '600' }}>
              Visit settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TabMenus
              tabMenus={VISIT_TAB_MENU}
              selectedTab={handleTabSelect}
              value={activatedTab}
              variant='scrollable'
              scrollButtons='auto'
            />
          </Grid>
          <Grid item xs={12}>
            <SelectedPageContent />
          </Grid>
        </Grid>
      </ContainerBoxV2>
    </>
  );
}

export default VisitSettings;

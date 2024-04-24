/** @format */

import { useState, useMemo } from "react";
import { ContainerBoxV2, TabMenus } from "../../../../components/MUI/mui.index";

// ************* MUI
import { Grid, Typography } from "@mui/material";

// ************* Settings component
import ProductBrand from "./1-Brand/page";
import ProductCategory from "./2-Category/page";
import ProductSubCategory from "./3-SubCategory/page";
import ProductType from "./4-ProductType/page";
import ProductColor from "./5-Color/page";
import ProductSize from "./6-Size/page";
import Product from "./Product/page";
import ProductHsn from "./7-Hsn/page";

// ***************** Icons
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import ClassIcon from "@mui/icons-material/Class";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import CategoryIcon from "@mui/icons-material/Category";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import activeIcon from "@mui/icons-material/CheckCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export const DeactiveIcon = DeleteIcon;
export const ActiveIcon = activeIcon;

function ProductSetting() {
  const PROD_TAB_MENU = useMemo(() => {
    return [
      {
        label: "Brand",
        icon: <BrandingWatermarkIcon fontSize="small" />,
      },
      {
        label: "Category",
        icon: <ClassIcon fontSize="small" />,
      },
      {
        label: "Sub Category",
        icon: <CardMembershipIcon fontSize="small" />,
      },
      {
        label: "Product Type",
        icon: <SplitscreenIcon fontSize="small" />,
      },
      {
        label: "Variant",
        icon: <ColorLensIcon fontSize="small" />,
      },
      {
        label: "Size",
        icon: <LinearScaleIcon fontSize="small" />,
      },
      {
        label: "HSN Code",
        icon: <ConfirmationNumberIcon fontSize="small" />,
      },
      {
        label: "Product",
        icon: <CategoryIcon fontSize="small" />,
      },
    ];
  }, []);

  // ******************** Product settings menus

  const SelectedMenuPage = () => {
    switch (activatedTab) {
      case 0:
        return ProductBrand;
      case 1:
        return ProductCategory;
      case 2:
        return ProductSubCategory;
      case 3:
        return ProductType;
      case 4:
        return ProductColor;
      case 5:
        return ProductSize;
      case 6:
        return ProductHsn;
      case 7:
        return Product;
      default:
        return Product;
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
          <Grid item xs={12} sx={{ borderBottomColor: "black" }}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Product Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TabMenus
              tabMenus={PROD_TAB_MENU}
              selectedTab={handleTabSelect}
              value={activatedTab}
              variant="scrollable"
              scrollButtons="auto"
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

export default ProductSetting;

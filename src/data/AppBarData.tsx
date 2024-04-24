/** @format */

import { APP_ROUTES } from "./AppRoutes";
// import { useAppSelector } from "../hooks/index.ts";
import {
  SETTING_OPTIONS_KEY,
  FEATURE_SETTING_OPTION_KEY,
} from "../data/AppConst";

import {
  SETTINGS_MENUS_KEYS,
  DEFAULT_MODULE,
  ADMIN_SIDE_MENU_KEYS,
} from "./AppModules.tsx";

// ************** Icons
import CategoryIcon from "@mui/icons-material/Category";
// import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TaskIcon from "@mui/icons-material/Task";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
// import { ControlPointDuplicate } from "@mui/icons-material";

import RBACService from "../utils/RBAC";
import {
  // AssignmentTurnedInOutlined,
  Inventory,
  Tune,
} from "@mui/icons-material";

export const getAppBarSetting = (_auth: Record<string, any>) => {
  const isSuperAdmin = _auth?.data?.userRecord?.isSuperAdmin;

  // const APP_BAR_SETTINGS = [
  //   {
  //     title: "Master Settings",
  //     icon: "",
  //     path: "",
  //     can_access: auth?.data?.userRecord?.isSuperAdmin,
  //   },
  //   {
  //     title: "User Management",
  //     icon: "",
  //     path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.pathName,
  //     can_access: !auth?.data?.userRecord?.isSuperAdmin,
  //   },
  // ];
  const APP_BAR_SETTINGS: Record<string, any> = {
    SETTINGS: {
      title: "Settings",
      can_access: !isSuperAdmin,
      icon: "",
      menus: [
        {
          title: "User",
          icon: <PeopleIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.pathName,
          key: SETTING_OPTIONS_KEY[0],
          keyName: SETTINGS_MENUS_KEYS[0],
          module: DEFAULT_MODULE,
        },
        // {
        //   title: "MDM",
        //   icon: <AppSettingsAltIcon fontSize="small" />,
        //   can_access: true,
        //   path: APP_ROUTES?.SETTINGS?.MDM?.pathName
        // },
        {
          title: "General",
          icon: <PlaylistAddIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.SETTINGS?.GENERAL?.pathName,
          key: SETTING_OPTIONS_KEY[1],
          keyName: SETTINGS_MENUS_KEYS[1],
          module: DEFAULT_MODULE,
        },
        {
          title: "Task Management",
          icon: <TaskIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.SETTINGS?.TASKMANAGEMENT?.pathName,
          key: SETTING_OPTIONS_KEY[2],
          keyName: SETTINGS_MENUS_KEYS[2],
          module: ADMIN_SIDE_MENU_KEYS[3],
        },
        // {
        //   title: "Ticket Management",
        //   icon: <AssignmentTurnedInOutlined fontSize="small" />,
        //   can_access: true,
        //   path: APP_ROUTES?.SETTINGS?.TASKMANAGEMENT?.pathName,
        //   key: SETTING_OPTIONS_KEY[2],
        //   keyName: SETTINGS_MENUS_KEYS[2],
        //   module: ADMIN_SIDE_MENU_KEYS[3],
        // },
      ],
    },
    FEATURES: {
      title: "Features",
      can_access: !isSuperAdmin,
      icon: "",
      menus: [
        {
          title: "Customer",
          icon: <GroupsIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.SETTINGS?.CUSTOMER?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[0],
          keyName: SETTINGS_MENUS_KEYS[3],
          module: DEFAULT_MODULE,
        },
        {
          title: "Product",
          icon: <CategoryIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.SETTINGS?.PRODUCTS?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[1],
          keyName: SETTINGS_MENUS_KEYS[4],
          module: ADMIN_SIDE_MENU_KEYS[5],
        },
        {
          title: "Claim Management",
          icon: <ReceiptIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.ADMIN?.CLAIM_SETTING_MANAGEMENT?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[2],
          keyName: SETTINGS_MENUS_KEYS[5],
          module: ADMIN_SIDE_MENU_KEYS[4],
        },
        {
          title: "Attendance",
          icon: <CoPresentIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.FEATURES?.ATTENDANCE?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[3],
          keyName: SETTINGS_MENUS_KEYS[6],
          module: ADMIN_SIDE_MENU_KEYS[1],
        },
        {
          title: "Lead Management",
          icon: <ManageAccountsIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.FEATURES?.LEADMANAGEMENT?.pathName,
          keyName: SETTINGS_MENUS_KEYS[7],
          module: ADMIN_SIDE_MENU_KEYS[12],
        },
        {
          title: "Hierarchy Mapping",
          icon: <LowPriorityIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.FEATURES?.HIERARCHY_MAPPING?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[4],
          keyName: SETTINGS_MENUS_KEYS[8],
          module: DEFAULT_MODULE,
        },
        {
          title: "Visit",
          icon: <DirectionsWalkIcon fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.FEATURES?.VISIT_MANAGEMENT?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[5],
          keyName: SETTINGS_MENUS_KEYS[9],
          module: ADMIN_SIDE_MENU_KEYS[11],
        },
        {
          title: "Order Management",
          icon: <Tune fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.FEATURES?.ORDER_MANAGEMENT?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[6],
          keyName: SETTINGS_MENUS_KEYS[10],
          module: ADMIN_SIDE_MENU_KEYS[29],
        },
        {
          title: "Inventory Settings",
          icon: <Inventory fontSize="small" />,
          can_access: true,
          path: APP_ROUTES?.FEATURES?.INVENTORY_MANAGEMENT?.pathName,
          key: FEATURE_SETTING_OPTION_KEY[7],
          keyName: SETTINGS_MENUS_KEYS[11],
          module: ADMIN_SIDE_MENU_KEYS[33],
        },
      ],
    },
    //   {
    //     title: "Claim Management",
    //     icon: "",
    //     path: APP_ROUTES?.ADMIN?.CLAIM_SETTING_MANAGEMENT?.pathName,
    //     can_access: !auth?.data?.userRecord?.isSuperAdmin,
    //   },
    // ];
  };

  // for(let [key, value] of Object.entries(APP_BAR_SETTINGS)){
  //   console.log('[key, value]', [key, value])
  //   value.menus = value?.menus?.filter((ft: Record<string, any>) => billingModuleArray?.find((fd: Record<string, any>) => fd?.parentmodules?.keyName === ft?.key))
  //   FILTER_APP_BAR_SETTING[key] = {
  //     ...value,
  //     can_access: !isSuperAdmin && value?.menus?.length > 0,
  //     menus: value?.menus
  //   }
  // }
  // console.log('FILETR_APP_BAR_SETTING >>>>>>>>>>>', FILETR_APP_BAR_SETTING)
  // return FILTER_APP_BAR_SETTING;
  // return APP_BAR_SETTINGS;
  return RBACService.GET_SETTING_MENUS(
    APP_BAR_SETTINGS,
    _auth?.data?.userRecord
  );
  // ************ for developer use only
  // return APP_BAR_SETTINGS
};

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/** @format */

import { lazy } from "react";

// ******************** APP DATA
import { APP_ROUTES } from "../../../../data/AppRoutes.ts";

// ******************** Interface
import { IPageComponentArray } from "../../../../types/index";
import {
  ADMIN_SIDE_MENU_KEYS,
  SUPERADMIN_SIDE_MENU_KEYS,
  DEFAULT_MODULE,
} from "../../../../data/AppModules.tsx";

// ************* lazy loading Components
import TestOne from "../../../../pages/Test/TestPage";
// const TestOne = lazy(() => import('../../../../pages/Test/TestPage').then(module => module.TestPageOne ))
const TestTwo = lazy(() => import("../../../../pages/Test/TestPage2"));
const TestThree = lazy(() => import("../../../../pages/Test/TestPage3"));
const TestFour = lazy(() => import("../../../../pages/Test/TestPage4"));

// ****************Admin UserManagement **********
import AdminDashboard from "../../../../pages/Admin/dashboard";
import AdminUserManagement from "../../../../pages/Admin/usermanagement/page.tsx";
import AUMAddEditView from "../../../../pages/Admin/usermanagement/add-edit-view/page";
import LeaveManagement from "../../../../pages/Admin/leavemanagement/page.tsx";
import InventoryManagement from "../../../../pages/Admin/inventorymanagement/page.tsx";
import LeadManagementEditView from "../../../../pages/Admin/crm/leadManagement/leadManagement.edit.view/leadManagement.edit.tsx";
// **************** SuperAdmin
import Dashboard from "../../../../pages/Superadmin/dashboard";
// import PaidDetails from "../../../../pages/Superadmin/paidDetails/index.tsx";
// import TrialDetails from "../../../../pages/Superadmin/trialDetails/index.tsx";
import AuditLog from "../../../../pages/Superadmin/auditLog/index.tsx";
import Organization from "../../../../pages/Superadmin/organization/organization.tsx";
import AddEditViewOrganization from "../../../../pages/Superadmin/organization/add-edit-view/page.tsx";
import View from "../../../../pages/Superadmin/organization/add-edit-view/view.tsx";
import Notification from "../../../../pages/Others/Notification/index.tsx";
import UserTracking from "../../../../pages/Admin/usertracking/page.tsx";
import Modules from "../../../../pages/Superadmin/modules/page.tsx";
import RequestDetails from "../../../../pages/Superadmin/requestDetails/index.tsx";
import AddEditViewBilling from "../../../../pages/Superadmin/billingDetails/add-edit-view/page.tsx";
import ViewBilling from "../../../../pages/Superadmin/billingDetails/add-edit-view/view.tsx";

// ****************Admin  **********
// ViewBilling;
// **************** Settings
import Enterprise from "../../../../pages/MDM/Enterpricies/Create.tsx";
import DeviceEnrollment from "../../../../pages/MDM/DeviceEnrollement/index.tsx";
import EnrolledDevices from "../../../../pages/MDM/EnrolledDevices/index.tsx";
import Policies from "../../../../pages/MDM/Policies/index.tsx";
import AttendanceManagement from "../../../../pages/Admin/attendancemanagement/page.tsx";
import Help from "../../../../pages/Others/Help/index.tsx";
import ActionAreaCard from "../../../../pages/Admin/claimManagement/viewClaimManagement/page";
import ReviewedClaims from "../../../../pages/Admin/claimManagement/reviewedClaims/index.tsx";
import RejectedClaims from "../../../../pages/Admin/claimManagement/rejectedClaims/index.tsx";
import ClaimSettings from "../../../../pages/SettingMenus/Features/ClaimSettings/page.tsx";

// **************** Settings
import AttendanceSetting from "../../../../pages/SettingMenus/Features/Attendance/page.tsx";
import GeneralSettings from "../../../../pages/SettingMenus/Setting/General/page.tsx";
import ProductSetting from "../../../../pages/SettingMenus/Features/Products/page.tsx";
import TaskManagementSettings from "../../../../pages/SettingMenus/Features/TaskManagement/page.tsx";
import TaskManagement from "../../../../pages/Admin/taskManagement/page.tsx";
import LeadManagementSettings from "../../../../pages/SettingMenus/Features/LeadManagement/page.tsx";
import LeadManagement from "../../../../pages/Admin/crm/leadManagement/page.tsx";
import LeadManagementView from "../../../../pages/Admin/crm/leadManagement/leadManagement.edit.view/leadManagement.view.tsx";
import Customer from "../../../../pages/SettingMenus/Features/Customer/customer.tsx";
import HierarchyMappingSetting from "../../../../pages/SettingMenus/Features/HierarchyMapping/page";
import VisitManagement from "../../../../pages/Admin/visitManagement/page.tsx";
import Primary from "../../../../pages/Admin/salesManagement/primary.tsx";
import Secondary from "../../../../pages/Admin/salesManagement/secondary.tsx";
import Viewtask from "../../../../../src/pages/Admin/taskManagement/components/Viewtask.tsx";
import Enterprises from "../../../../../src/pages/Superadmin/mdmnew/enterprises/page.tsx";
import Policy from "../../../../../src/pages/Superadmin/mdmnew/policy/index.tsx";
import Mapping from "../../../../../src/pages/Superadmin/mdmnew/mapping/page.tsx";
import ViewCustomer from "../../../../../src/pages/SettingMenus/Features/Customer/Settings/CustomerDetail/viewCustomer.tsx";
import EditCustomer from "../../../../../src/pages/SettingMenus/Features/Customer/Settings/CustomerDetail/editCustomer.tsx";
import AddBilling from "../../../../../src/pages/Superadmin/organization/addBilling/page.tsx";
import VistSettings from "../../../../pages/SettingMenus/Features/VisitManagement/page";
import Collections from "../../../../../src/pages/Admin/collections/page.tsx";
import CollectionView from "../../../../../src/pages/Admin/collections/viewcollection.tsx";
import VisitManagementView from "../../../../../src/pages/Admin/visitManagement/visitManagementView.tsx";
import PrimaryView from "../../../../../src/pages/Admin/salesManagement/primaryView.tsx";
import SecondaryView from "../../../../../src/pages/Admin/salesManagement/secondaryView.tsx";
import UserActivity from "../../../../../src/pages/Admin/userActitvity.tsx/page.tsx";
import TripPlanner from "../../../../../src/pages/Admin/tripPlanner/page.tsx";
import Reports from "../../../../../src/pages/Admin/reports/page.tsx";
import AttendanceReports from "../../../../pages/Admin/reports/attendance/AttendanceReports.tsx";
import ClaimReports from "../../../../../src/pages/Admin/reports/claim/ClaimReports.tsx";
import CollectionReports from "../../../../../src/pages/Admin/reports/collections/collectionReports.tsx";
import TaskReports from "../../../../../src/pages/Admin/reports/task/TaskReports.tsx";
import SalesReport from "../../../../../src/pages/Admin/reports/sales/SalesReport.tsx";
import VisitReports from "../../../../../src/pages/Admin/reports/visit/VisitReports.tsx";
import LeaveReports from "../../../../../src/pages/Admin/reports/attendance/leaveReports.tsx";
import LeadReports from "../../../../../src/pages/Admin/reports/lead/leadReports.tsx";
import LiveTrack from "../../../../../src/pages/Admin/liveTrack/index.tsx";
import GeoFencingReport from "../../../../../src/pages/Admin/reports/geo-fencing/geo-fencing.tsx";
// ***************** trip planner
import SalesTarget from "../../../../pages/Admin/salesManagement/Target/target.tsx";
import ViewSalesTarget from "../../../../pages/Admin/salesManagement/Target/pages/ViewTarget.tsx";
import DetailedTargetView from "../../../../pages/Admin/salesManagement/Target/pages/DetailedTargetView.tsx";
import AddEditTripPlanner from "../../../../pages/Admin/tripPlanner/AddEdit.tsx";
import ServiceShop from "../../../../pages/Admin/ServiceShop/Serviceshop";
import OutStanding from "../../../../pages/Admin/collections/outstanding/page.tsx";
import TripView from "../../../../../src/pages/Admin/tripPlanner/tripView.tsx";
import SalesTargetEdit from "../../../../pages/Admin/salesManagement/Target/Tabs/OneTimeTargetEdit.tsx";
import MyProfile from "../../../../../src/pages/MyProfile/page.tsx";

// ************ Sales Forecasting
import SalesForecasting from "../../../../pages/Admin/salesManagement/Forecasting/SalesForecasting";
import RecurringTargetEdit from "../../../../../src/pages/Admin/salesManagement/Target/Tabs/RecurringTargetEdit.tsx";
import PrimaryOrder from "../../../../pages/Admin/orderManagement/primary/index.tsx";
import SecondaryOrder from "../../../../pages/Admin/orderManagement/secondary/index.tsx";
import OrderSetting from "../../../../pages/SettingMenus/Features/OrderSetting/index.tsx";
import ViewOutstandingHistory from "../../../../pages/Admin/collections/outstanding/outstandingview.tsx";
import UserTrackingReport from "../../../../../src/pages/Admin/reports/userTracking/index.tsx";
import CustomerStock from "../../../../../src/pages/Admin/salesManagement/CustomerStock/CustomerStock.tsx";
import DetailedCustomerStockView from "../../../../../src/pages/Admin/salesManagement/CustomerStock/DetailedCustomerStockView.tsx";

import OrganizationSettings from "../../../../pages/Admin/OrganizationSettings/OrganizationSettings";
import AttendanceView from "../../../../../src/pages/Admin/attendancemanagement/attendanceView.tsx";
import TicketManagement from "../../../../../src/pages/Admin/ticketManagement/page.tsx";
import PrimaryOrderView from "../../../../../src/pages/Admin/orderManagement/primary/view.tsx";
import SecondaryOrderView from "../../../../../src/pages/Admin/orderManagement/secondary/view.tsx";

export const PageComponentArray: IPageComponentArray[] = [
  // ********************** ||*  SUPER ADMIN MODULES *|| *************************************************

  // START: ---------------| 1) SUPER ADMIN DASHBOARD |--------------------
  {
    path: APP_ROUTES?.SUPER_ADMIN?.DASHBOARD?.pathName,
    element: <Dashboard />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[0],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 2) BILLINGS |--------------------
  {
    path: APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.pathName,
    element: <AddBilling />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.BILLING?.CREATE,
    element: <AddEditViewBilling />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.EDIT?.pathName,
    element: <AddEditViewBilling />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.VIEW?.pathName,
    element: <ViewBilling />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[5],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 3) REQUEST DETAIL |--------------------
  {
    path: APP_ROUTES?.SUPER_ADMIN?.REQUEST_DETAILS?.pathName,
    element: <RequestDetails />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[2],
  },
  // END: ----------------------------------------------------------

  // START: ---------------| 4) MODULES |---------------------------
  {
    path: APP_ROUTES?.SUPER_ADMIN?.MODULES?.LIST?.pathName,
    element: <Modules />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[3],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 5) ORGANIZATION |----------------------
  {
    path: APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.pathName,
    element: <Organization />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[1],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.ADD_EDIT_VIEW?.pathName,
    element: <AddEditViewOrganization />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[1],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.VIEW?.pathName,
    element: <View />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[1],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 4) MDM |---------------------------
  {
    path: APP_ROUTES?.SUPER_ADMIN?.MDM?.ENTERPRISES?.pathName,
    element: <Enterprises />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[4],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.MDM?.POLICY?.pathName,
    element: <Policy />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[4],
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.MDM?.MAPPING?.pathName,
    element: <Mapping />,
    isLazy: false,
    module: SUPERADMIN_SIDE_MENU_KEYS[4],
  },
  // END: ----------------------------------------------------------

  // *****************************************************************************************************

  // ************************* ||* ADMIN MODULES *|| *****************************************************
  // START: ---------------------- PROFILES -----------------------------------
  {
    path: APP_ROUTES?.MYPROFILE?.ORGANIZATION?.pathname,
    element: <MyProfile />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.ADMIN?.SERVICESHOP?.pathName,
    element: <ServiceShop />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.ADMIN?.ORG_SETTINGS?.pathName,
    element: <OrganizationSettings />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },
  // END: ---------------------------------------------------------------------

  // START: ---------------| 1) ADMIN DASHBOARD |--------------------
  {
    path: APP_ROUTES?.ADMIN?.DASHBOARD?.pathName,
    element: <AdminDashboard />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[0]
    module: DEFAULT_MODULE,
  },
  // END: ----------------------------------------------------------

  // START: ---------------| 2) USER MANAGEMENT |--------------------
  {
    path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.pathName,
    element: <AdminUserManagement />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[25],
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.ADD?.pathName,
    element: <AUMAddEditView />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[25]
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.EDIT?.pathName,
    element: <AUMAddEditView />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[25],
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.VIEW?.pathName,
    element: <AUMAddEditView />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[25],
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.FEATURES?.HIERARCHY_MAPPING?.pathName,
    element: <HierarchyMappingSetting />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[25]
    module: DEFAULT_MODULE,
  },
  // END: ------------------------------------------------------------
  // START: ---------------| 3) ATTENDANCE MANAGEMENT |--------------------
  {
    path: APP_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.pathName,
    element: <AttendanceManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[1],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.ATTENDANCE?.pathName,
    element: <AttendanceReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[1],
  },
  {
    path: APP_ROUTES?.FEATURES?.ATTENDANCE?.pathName,
    element: <AttendanceSetting />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[1],
  },
  {
    path: APP_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.View,
    element: <AttendanceView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[1],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 4) CLAIM MANAGEMENT |--------------------
  {
    path: APP_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.pathName,
    element: <ActionAreaCard />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[4],
  },
  {
    path: APP_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.REVIEWED_CLAIM?.pathName,
    element: <ReviewedClaims />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[4],
  },
  {
    path: APP_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.REJECTED_CLAIM?.pathName,
    element: <RejectedClaims />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[4],
  },
  {
    path: APP_ROUTES?.ADMIN?.CLAIM_SETTING_MANAGEMENT?.pathName,
    element: <ClaimSettings />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[4],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.CLAIM?.pathName,
    element: <ClaimReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[4],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 5) LEAD MANAGEMENT |--------------------
  {
    path: APP_ROUTES?.ADMIN?.CRM?.LEADMANAGEMENT?.pathName,
    element: <LeadManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[12],
  },
  {
    path: APP_ROUTES?.ADMIN?.CRM?.LEADMANAGEMENT?.EDIT?.pathName,
    element: <LeadManagementEditView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[12],
  },
  {
    path: APP_ROUTES?.ADMIN?.CRM?.LEADMANAGEMENT?.VIEW?.pathName,
    element: <LeadManagementView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[12],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.LEAD?.pathName,
    element: <LeadReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[12],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.GEOFENCING?.pathName,
    element: <GeoFencingReport />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[2],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.USERTRACKING?.pathName,
    element: <UserTrackingReport />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[2],
  },
  {
    path: APP_ROUTES?.FEATURES?.LEADMANAGEMENT?.pathName,
    element: <LeadManagementSettings />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[12],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 6) COLLECTION MANAGEMENT |--------------------
  {
    path: APP_ROUTES?.ADMIN?.COLLECTIONS?.pathName,
    element: <Collections />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[13],
  },
  {
    path: APP_ROUTES?.ADMIN?.COLLECTIONS?.view,
    element: <CollectionView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[13],
  },
  {
    path: APP_ROUTES?.ADMIN?.COLLECTIONS?.OUTSTANDING?.pathName,
    element: <OutStanding />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[13],
  },
  {
    path: APP_ROUTES?.ADMIN?.COLLECTIONS?.OUTSTANDING?.view,
    element: <ViewOutstandingHistory />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[13],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.COLLECTIONS?.pathName,
    element: <CollectionReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[13],
  },
  {
    path: APP_ROUTES?.ADMIN?.USERACTIVITY?.pathName,
    element: <UserActivity />,
    isLazy: false,
  },
  {
    path: APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName,
    element: <TripPlanner />,
    isLazy: false,
  },
  {
    path: APP_ROUTES?.ADMIN?.USERMANAGEMENT?.VIEW?.pathName,
    element: <AUMAddEditView />,
    isLazy: false,
  },
  // START: ---------------| SALES MANAGEMENT (this module under attendance)|-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.PRIMARY?.pathName,
    element: <Primary />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.PRIMARY?.view,
    element: <PrimaryView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.SECONDARY?.pathName,
    element: <Secondary />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.SECONDARY?.view,
    element: <SecondaryView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.TARGET?.pathName,
    element: <SalesTarget />,
    isLazy: true,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.EDITTARGET,
    element: <SalesTargetEdit />,
    isLazy: true,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.EDITRECURRING,
    element: <RecurringTargetEdit />,
    isLazy: true,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.pathName,
    element: <ViewSalesTarget />,
    isLazy: true,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.expandView,
    element: <DetailedTargetView />,
    isLazy: true,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.CUSUTOMER_STOCK?.expandView,
    element: <DetailedCustomerStockView />,
    isLazy: true,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.SALES?.pathName,
    element: <SalesReport />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.FORECASTING.pathName,
    element: <SalesForecasting />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  {
    path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.CUSUTOMER_STOCK.pathName,
    element: <CustomerStock />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 8) LEAVE MANAGEMENT (this module under attendance)|-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.LEAVE_MANAGEMENT?.pathName,
    element: <LeaveManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[1],
  },
  {
    path: APP_ROUTES?.FEATURES?.INVENTORY_MANAGEMENT?.pathName,
    element: <InventoryManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[33],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.LEAVE?.pathName,
    element: <LeaveReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[1],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 9) USER TARCKING |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.USERTRACKING?.pathName,
    element: <UserTracking />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[2],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 10) TRIP PLANNER |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.TRIP_PLANNER?.pathName,
    element: <TripPlanner />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[17],
  },
  {
    path: APP_ROUTES?.ADMIN?.TRIP_PLANNER?.VIEW,
    element: <TripView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[17],
  },
  {
    path: APP_ROUTES?.ADMIN?.TRIP_PLANNER?.CREATE?.pathName,
    element: <AddEditTripPlanner />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[17],
  },
  // {
  //   path: APP_ROUTES?.FEATURES?.VISIT_MANAGEMENT?.VIEW?.pathName,
  //   element: <AddEditTripPlanner />,
  //   isLazy: true,
  // },
  // END: ----------------------------------------------------------
  // START: ---------------| 11) TASK MANAGEMENT |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.TASK_MANAGEMENT?.pathName,
    element: <TaskManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[3],
  },
  {
    path: APP_ROUTES?.ADMIN?.TASK_MANAGEMENT?.view,
    element: <Viewtask />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[3],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.TASK?.pathName,
    element: <TaskReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[3],
  },
  {
    path: APP_ROUTES?.SETTINGS?.TASKMANAGEMENT?.pathName,
    element: <TaskManagementSettings />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[3],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 12) VISIT MANAGEMENT |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.VISIT_MANAGEMENT?.pathName,
    element: <VisitManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[11],
  },
  {
    path: APP_ROUTES?.ADMIN?.VISIT_MANAGEMENT?.view,
    element: <VisitManagementView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[11],
  },
  {
    path: APP_ROUTES?.FEATURES?.VISIT_MANAGEMENT?.pathName,
    element: <VistSettings />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[11],
  },
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.VISIT?.pathName,
    element: <VisitReports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[11],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 13) LIVE TRACKING |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.LIVETRACKING?.pathName,
    element: <LiveTrack />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[24],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 13) Inventory Management |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.INVENTORYMANAGEMENT?.pathName,
    element: <LiveTrack />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[33],
  },
  // END: ----------------------------------------------------------
  // START: ---------------| 14) ADMIN MDM |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.MDM?.ENTERPRISES?.pathName,
    element: <Enterprise />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[18],
  },
  {
    path: APP_ROUTES?.ADMIN?.MDM?.POLICIES?.pathName,
    element: <Policies />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[18],
  },
  {
    path: APP_ROUTES?.ADMIN?.MDM?.DEVICE_ENROLLMENT?.pathName,
    element: <DeviceEnrollment />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[18],
  },
  {
    path: APP_ROUTES?.ADMIN?.MDM?.ENROLLED_DEVICES?.pathName,
    element: <EnrolledDevices />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[18],
  },
  // END: ----------------------------------------------------------

  // START: ---------------| 15) REPORTS MAIN |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.REPORTS?.pathName,
    element: <Reports />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[23],
  },
  // END: ----------------------------------------------------------

  // START: ---------------| 16) ORDER MANAGEMENT |-----------------------------
  {
    path: APP_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.PRIMARY?.pathName,
    element: <PrimaryOrder />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[29],
  },
  {
    path: APP_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.PRIMARY?.view,
    element: <PrimaryOrderView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[29],
  },
  {
    path: APP_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.SECONDARY?.pathName,
    element: <SecondaryOrder />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[29],
  },
  {
    path: APP_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.SECONDARY?.view,
    element: <SecondaryOrderView />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[29],
  },
  {
    path: APP_ROUTES?.FEATURES?.ORDER_MANAGEMENT?.pathName,
    element: <OrderSetting />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[29],
  },
  // END: ----------------------------------------------------------

  {
    path: APP_ROUTES?.ADMIN?.TICKET_MANAGEMENT?.pathName,
    element: <TicketManagement />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[34],
  },

  // ***************************** || ADMIN SETTINGS || *************************************
  // --------------------------- SETTINGS ------------------------------------------

  // START: -------------------------- 1) GENERAL --------------------------------
  {
    path: APP_ROUTES?.SETTINGS?.GENERAL?.pathName,
    element: <GeneralSettings />,
    isLazy: false,
    // module: ADMIN_SIDE_MENU_KEYS[26]
    module: DEFAULT_MODULE,
  },

  // --------------------------- FEATURES ------------------------------------------
  // START: -------------------------- 1) PRODUCT --------------------------------
  {
    path: APP_ROUTES?.SETTINGS?.PRODUCTS?.pathName,
    element: <ProductSetting />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[5],
  },
  // END: -------------------------------------------------------------------------
  // START: -------------------------- 2) CUSTOEMRS --------------------------------
  {
    path: APP_ROUTES?.SETTINGS?.CUSTOMER?.pathName,
    element: <Customer />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.SETTINGS?.CUSTOMER?.view,
    element: <ViewCustomer />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },
  {
    path: APP_ROUTES?.SETTINGS?.CUSTOMER?.edit,
    element: <EditCustomer />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },
  // END: -------------------------------------------------------------------------

  // ************************* |* OTHERS *| *****************************************************
  {
    path: APP_ROUTES?.NOTIFICATION.pathName,
    element: <Notification />,
    isLazy: false,
  },
  {
    path: APP_ROUTES?.HELP.pathName,
    element: <Help />,
    isLazy: false,
  },
  {
    path: APP_ROUTES?.SUPER_ADMIN?.AUDIT_LOG?.pathName,
    element: <AuditLog />,
    isLazy: false,
    module: ADMIN_SIDE_MENU_KEYS[27],
  },

  {
    path: APP_ROUTES?.ADMIN?.USERACTIVITY?.pathName,
    element: <UserActivity />,
    isLazy: false,
    module: DEFAULT_MODULE,
  },

  // ************************* |* TEST COMPONENTS *| *****************************************************
  // ---------------------------
  {
    path: APP_ROUTES?.TEST1?.pathName,
    element: <TestOne />,
    isLazy: false,
  },
  {
    path: APP_ROUTES?.TEST2.pathName,
    element: <TestTwo />,
    isLazy: true,
  },
  {
    path: APP_ROUTES?.TEST3?.pathName,
    element: <TestThree />,
    isLazy: true,
  },
  {
    path: APP_ROUTES?.TEST4.pathName,
    element: <TestFour />,
    isLazy: true,
  },
  // ---------------------------

  // {
  //   path: APP_ROUTES?.SUPER_ADMIN?.PAID_DETAILS?.pathName,
  //   element: <PaidDetails />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.SUPER_ADMIN?.TRIAL_DETAILS?.pathName,
  //   element: <TrialDetails />,
  //   isLazy: false,
  // },

  // {
  //   path: APP_ROUTES?.ADMIN?.TASK_MANAGEMENT?.pathName,
  //   element: <TaskManagement />,
  //   isLazy: false,
  // },

  // // **************** HIERARCHY MAPPING ***************
  // {
  //   path: APP_ROUTES?.FEATURES?.HIERARCHY_MAPPING?.pathName,
  //   element: <HierarchyMappingSetting />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.EDIT?.pathName,
  //   element: <AddEditViewBilling />,
  //   isLazy: false,
  // },

  // // ************* Visit settings
  // {
  //   path: APP_ROUTES?.FEATURES?.VISIT_MANAGEMENT?.pathName,
  //   element: <VistSettings />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.LIVETRACKING?.pathName,
  //   element: <LiveTrack />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.TRIP_PLANNER?.CREATE?.pathName,
  //   element: <AddEditTripPlanner />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.FEATURES?.VISIT_MANAGEMENT?.VIEW?.pathName,
  //   element: <AddEditTripPlanner />,
  //   isLazy: true,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.TARGET?.pathName,
  //   element: <SalesTarget />,
  //   isLazy: true,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.EDITTARGET,
  //   element: <SalesTargetEdit />,
  //   isLazy: true,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.EDITRECURRING,
  //   element: <RecurringTargetEdit />,
  //   isLazy: true,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.pathName,
  //   element: <ViewSalesTarget />,
  //   isLazy: true,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.VIEW_TARGET?.expandView,
  //   element: <DetailedTargetView />,
  //   isLazy: true,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SERVICESHOP?.pathName,
  //   element: <ServiceShop />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.ADMIN?.SALES_MANAGEMENT?.FORECASTING.pathName,
  //   element: <SalesForecasting />,
  //   isLazy: false,
  // },
  // {
  //   path: APP_ROUTES?.MYPROFILE?.ORGANIZATION?.pathname,
  //   element: <MyProfile />,
  //   isLazy: false,
  // },

  // ************* Order Management
];

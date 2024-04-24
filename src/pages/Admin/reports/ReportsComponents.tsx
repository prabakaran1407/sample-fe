// ******************** APP DATA
import { APP_ROUTES } from "../../../data/AppRoutes.ts";

export const ReportsPageComponents: any = [
  {
    title: "ATTENDANCE",
    can_access: true,
    reports: [
      {
        title: "Attendance",
        path: APP_ROUTES?.ADMIN?.REPORTS?.ATTENDANCE?.pathName,
        icon: <> </>,
      },
      {
        title: "Leave",
        path: APP_ROUTES?.ADMIN?.REPORTS?.LEAVE?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "CLAIM MANAGEMENT",
    can_access: true,
    reports: [
      {
        title: "Claims",
        path: APP_ROUTES?.ADMIN?.REPORTS?.CLAIM?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "COLLECTION",
    can_access: true,
    reports: [
      {
        title: "Collection",
        path: APP_ROUTES?.ADMIN?.REPORTS?.COLLECTIONS?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "TASK MANAGEMENT",
    can_access: true,
    reports: [
      {
        title: "Tasks",
        path: APP_ROUTES?.ADMIN?.REPORTS?.TASK?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "SALES MANAGEMENT",
    can_access: true,
    reports: [
      {
        title: "Sales",
        path: APP_ROUTES?.ADMIN?.REPORTS?.SALES?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "VISIT MANAGEMENT",
    can_access: true,
    reports: [
      {
        title: "Visit",
        path: APP_ROUTES?.ADMIN?.REPORTS?.VISIT?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "LEAD MANAGEMENT",
    can_access: true,
    reports: [
      {
        title: "Lead",
        path: APP_ROUTES?.ADMIN?.REPORTS?.LEAD?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "GEO-FENCING",
    can_access: true,
    reports: [
      {
        title: "Geo-fencing",
        path: APP_ROUTES?.ADMIN?.REPORTS?.GEOFENCING?.pathName,
        icon: <> </>,
      },
    ],
  },
  {
    title: "USER TRACKING",
    can_access: true,
    reports: [
      {
        title: "User tracking",
        path: APP_ROUTES?.ADMIN?.REPORTS?.USERTRACKING?.pathName,
        icon: <> </>,
      },
    ],
  },
];

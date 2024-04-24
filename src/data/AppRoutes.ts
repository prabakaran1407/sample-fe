/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

//  This is read only object

export const APP_ROUTES: Record<string, Record<string, any>> = Object.freeze({
  SIGN_IN: {
    pathName: "/",
  },
  SIGN_UP: {
    pathName: "/signup",
  },
  FORGOT_PASSWORD: {
    pathName: "/forgot_password",
  },
  OTP_VERIFY: {
    pathName: "/verify_otp",
  },
  RESET_PASSWORD: {
    pathName: "/reset_password",
  },
  REQUEST_DEMO: {
    pathName: "/request_demo",
  },
  LANDING: {
    pathName: "/sales10x",
  },
  NOTIFICATION: {
    pathName: "/sales10x/notification",
  },
  HELP: {
    pathName: "/sales10x/help",
  },
  MEDIA: {
    pathName: "expo/media",
  },
  TEST1: {
    pathName: "test",
  },
  TEST2: {
    pathName: "test",
  },
  TEST3: {
    pathName: "test3",
  },
  TEST4: {
    pathName: "test4",
  },

  ADMIN: {
    DASHBOARD: {
      pathName: "/sales10x/dasboard",
    },
    LIVETRACKING: {
      pathName: "/sales10x/livetracking",
    },
    INVENTORYMANAGEMENT: {
      pathName: "/sales10x/inventorymanagement",
    },
    USERMANAGEMENT: {
      pathName: "/sales10x/usermanagement",
      ADD: {
        pathName: "/sales10x/admin-usermanagement-add",
      },
      EDIT: {
        pathName: "/sales10x/admin-usermanagement-edit",
      },
      VIEW: {
        pathName: "/sales10x/admin-usermanagement-view",
      },
    },
    LEAVE_MANAGEMENT: {
      pathName: "/sales10x/leavemanagement",
      // ADD_EDIT_VIEW: {
      //   pathName: '/sales10x/admin-usermanagement-add-edit-view',
      // },
    },
    CLAIM_MANAGEMENT: {
      pathName: "/sales10x/claim-management/view-claim",
      REVIEWED_CLAIM: {
        pathName: "/sales10x/claim-management/reviewed-claims",
      },
      REJECTED_CLAIM: {
        pathName: "/sales10x/claim-management/rejected-claims",
      },
    },
    ATTENDANCE_MANAGEMENT: {
      pathName: "/sales10x/attendancemanagement",
      View: "/sales10x/attendancemanagement-view",
    },
    USERTRACKING: {
      pathName: "/sales10x/user-tracking",
    },
    VISIT_MANAGEMENT: {
      pathName: "/sales10x/visitManagement",
      view: "/sales10x/visitManagement/view",
    },
    SALES_MANAGEMENT: {
      PRIMARY: {
        pathName: "/sales10x/Sales-management/primary",
        view: "/sales10x/Sales-management/primary/view",
      },
      SECONDARY: {
        pathName: "/sales10x/Sales-management/secondary",
        view: "/sales10x/Sales-management/secondary/view",
      },
      TARGET: {
        pathName: "/sales10x/Sales-management/sales-target",
      },

      EDITTARGET: "/sales10x/Sales-management/edit-target",
      EDITRECURRING: "/sales10x/Sales-management/edit-recurring",
      VIEW_TARGET: {
        pathName: "/sales10x/Sales-management/view-target",
        expandView: "/sales10x/Sales-management/expand-view",
      },
      FORECASTING: {
        pathName: "/sales10x/Sales-management/forecasting",
      },
      CUSUTOMER_STOCK: {
        pathName: "/sales10x/Sales-management/customer-stock",
        expandView: "/sales10x/Sales-management/view-customer-stock",
      },
    },
    ORDER_MANAGEMENT: {
      PRIMARY: {
        pathName: "/sales10x/Order-management/primary",
        view: "/sales10x/Order-management/primary/view",
      },
      SECONDARY: {
        pathName: "/sales10x/Order-management/secondary",
        view: "/sales10x/Order-management/secondary/view",
      },
    },
    TICKET_MANAGEMENT: {
      pathName: "/sales10x/ticketManagement",
      view: "/sales10x/ticketManagement/view",
    },
    CRM: {
      pathName: "/sales10x/crm",
      LEADMANAGEMENT: {
        pathName: "/sales10x/leadManagement",
        EDIT: {
          pathName: "/sales10x/leadManagement/edit/:id",
        },
        VIEW: {
          pathName: "/sales10x/leadManagement/view/:id",
        },
      },
    },
    MDM: {
      // pathName: '/sales10x/mdm',
      ENTERPRISES: {
        pathName: "/sales10x/mdm-management/create-enterprise",
      },
      POLICIES: {
        pathName: "/sales10x/mdm-management/policies",
      },
      DEVICE_ENROLLMENT: {
        pathName: "/sales10x/mdm-management/device-enrollment",
      },
      ENROLLED_DEVICES: {
        pathName: "/sales10x/mdm-management/enrolled-devices",
      },
    },
    CLAIM_SETTING_MANAGEMENT: {
      pathName: "/sales10x/claimmanagement",
    },
    TASK_MANAGEMENT: {
      pathName: "/sales10x/taskManagement",
      view: "/sales10x/taskManagement/view",
    },
    COLLECTIONS: {
      pathName: "/sales10x/collections",
      view: "/sales10x/collections/view",

      OUTSTANDING: {
        pathName: "/sales10x/collections/outstanding",
        view: "/sales10x/collections/outstanding/view",
      },
    },

    USERACTIVITY: {
      pathName: "/sales10x/useractivity",
    },
    TRIP_PLANNER: {
      pathName: "/sales10x/trip-planner",
      CREATE: { pathName: "/sales10x/trip-planner/add" },
      EDIT: { pathName: "/sales10x/trip-planner/edit" },
      VIEW: "/sales10x/trip-planner/view",
    },
    REPORTS: {
      pathName: "/sales10x/reports",
      ATTENDANCE: {
        pathName: "/sales10x/reports/attendance/attendance",
      },
      LEAVE: {
        pathName: "/sales10x/reports/attendance/leave",
      },
      CLAIM: {
        pathName: "/sales10x/reports/claim/claim",
      },
      COLLECTIONS: {
        pathName: "/sales10x/reports/collection/collection",
      },
      TASK: {
        pathName: "/sales10x/reports/task/task",
      },
      SALES: {
        pathName: "/sales10x/reports/sales/sales",
      },
      VISIT: {
        pathName: "/sales10x/reports/visit/visit",
      },
      LEAD: {
        pathName: "/sales10x/reports/lead/lead",
      },
      GEOFENCING: {
        pathName: "/sales10x/reports/geo-fencing/geo-fencing",
      },
      USERTRACKING: {
        pathName: "/sales10x/reports/geo-fencing/user-tracking",
      },
    },
    SERVICESHOP: {
      pathName: "/sales10x/serviceshop",
    },
    ORG_SETTINGS: {
      pathName: "/sales10x/organization-settings",
    },
  },
  SUPER_ADMIN: {
    DASHBOARD: {
      pathName: "/sales10x/superadmin/dashboard",
    },
    PAID_DETAILS: {
      pathName: "/sales10x/superadmin/organization-details/paid-details",
    },
    TRIAL_DETAILS: {
      pathName: "/sales10x/superadmin/organization-details/trial-details",
    },
    MDM: {
      ENTERPRISES: {
        pathName: "/sales10x/superadmin/mdm/enterprises",
      },
      POLICY: {
        pathName: "/sales10x/superadmin/mdm/policy",
      },
      MAPPING: {
        pathName: "/sales10x/superadmin/mdm/mapping",
      },
    },
    BILLING_DETAILS: {
      pathName: "/sales10x/superadmin/billing-details",
      EDIT: {
        pathName: "/sales10x/superadmin/billing-details/edit/:id",
      },
      VIEW: {
        pathName: "/sales10x/superadmin/billing-details/view/:id",
      },
    },
    BILLING: {
      LIST: "/superadmin-billing",
      CREATE: "/sales10x/superadmin-billing-add-edit-view",
    },
    REQUEST_DETAILS: {
      pathName: "/sales10x/superadmin/request-details",
    },
    MODULES: {
      CREATE: "create-modules",
      LIST: {
        pathName: "/sales10x/service-modules",
      },
    },
    LEAVEMANAGEMENT: {
      LIST: {
        pathName: "/sales10x/leave-management",
      },
    },
    AUDIT_LOG: {
      pathName: "/sales10x/superadmin/organization-details/audit-log",
    },
    ORGANIZATION: {
      pathName: "/sales10x/superadmin/organization",
      ADD_EDIT_VIEW: {
        pathName: "/sales10x/superadmin-organization-add-edit-view",
      },
      VIEW: {
        pathName: "/sales10x/superadmin-organization-view",
      },
    },
  },
  // ******** Settings
  SETTINGS: {
    GENERAL: {
      pathName: "/sales10x/settings/general",
    },
    PRODUCTS: {
      pathName: "/sales10x/settings/products",
    },
    MDM: {
      pathName: "/sales10x/settings/MDM",
    },
    TASKMANAGEMENT: {
      pathName: "/sales10x/settings/taskmanagement",
    },
    CUSTOMER: {
      pathName: "/sales10x/settings/customer",
      view: "/sales10x/settings/customer/view",
      edit: "/sales10x/settings/customer/edit",
    },
    GROUP: {
      pathName: "/sales10x/settings/group",
      view: "/sales10x/settings/group/view",
      edit: "/sales10x/settings/group/edit",
    },
  },
  FEATURES: {
    ATTENDANCE: {
      pathName: "/sales10x/settings/features/attendance",
    },
    LEADMANAGEMENT: {
      pathName: "/sales10x/settings/features/leadmanagement",
    },
    HIERARCHY_MAPPING: {
      pathName: "/sales10x/settings/features/hierarchy-mapping",
    },
    VISIT_MANAGEMENT: {
      pathName: "/sales10x/settings/features/visit-management",
    },
    ORDER_MANAGEMENT: {
      pathName: "/sales10x/settings/features/order-management",
    },
    INVENTORY_MANAGEMENT: {
      pathName: "/sales10x/settings/features/inventory-management",
    },
  },
  MYPROFILE: {
    ORGANIZATION: {
      pathname: "/sales10x/myprofile",
    },
  },
});

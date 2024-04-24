/**
 * eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */

// require('dotenv').config()

import { API_BASE_URL } from "../config";

export const API_ROUTES = Object.freeze({
  AUTH: {
    SIGN_IN: `/entrance/login`,
    CREATE: `/api/user/create`,
    GET_USER: "/user/get-one-user",
  },

  // ************* Admin routes
  ADMIN: {
    DASHBOARD: {
      OVERALL_COUNT: {
        GET: "/dashboard/customerCountbyStatus",
      },
      OVERVIEW: {
        GET: "/dashboard/getCombinedData",
      },
      ATTENDANCE_SUMMARY: {
        GET: "/dashboard/attendanceCount",
      },
      SALES_STATS: {
        POST: "/dashboard/get-sales?filterType=DAY",
      },
    },
    SALES: {
      GET_ALL_SALES_DATA: "/sales/list-sales-order",
      APPROVED_SALES: "/sales/update",
      SALES_FORECAST: "/sales/getforecast",
      SALES_FORECAST_V2: "/sales/getforecast-v2",
    },
    SALES_TARGET: {
      CREATE_NEW_TARGET: "/createSalesTarget",
      LIST_ALL_TARGETS: "/listTarget",
      GET_ONE_TARGET: "/getOneTarget",
      UPDATE_TARGET: "/salesTarget/update",
      UPDATE_RECURRING: "/salesTarget/update",
    },
    CUSTOMER_STOCKS: {
      LIST_ALL_CUSTOMER_STOCKS: "/inventory/customer/list",
      GET_ONE_CUSTOMER_STOCK: "/inventory/customer/get-one",
    },
    INVENTORY_MANAGEMENT: {
      CREATE_STORE: "/store/create",
      GET_ALL_STORES: "/store/list?isCount=true",
      UPDATE_STORE: "/store/update",
      ACTIVATE_DEACTIVATE_STORE: "/store/active-deactive",
      CREATE_WAREHOUSE: "/warehouse/create",
      GET_ALL_WAREHOUSE: "/warehouse/list",
      UPDATE_WAREHOUSE: "/warehouse/update",
    },
    USERMANAGEMENT: {
      DESIGNATION: "/userDesignation",
      DEPARTMENT: "/userDepartment",
      CATEGORY: "/userCategory",
      CREATE: "/entrance/invite-user",
      LIST: "/user/list",
      GET_ONE: "/user",
      GET_ID: "/user/getuserbyid",
      UPDATE: "/user/update",
      ROLES: "/role",
      DELETE: "/user/deactive",
      ASSIGNE_SERVICE: "/shopservice/list-assign-services-for-users",
      GET_USERS_FOR_ADMIN: "/user/list",
    },
    LEAVE_MANAGEMENT: {
      LIST: "/leave-request",
      UPDATE: "/approveLeaveRequest",
    },
    ATTENDANCE_MANAGEMENT: {
      LIST: "/getAttendanceWithFilter",
      ATTENDANCE_COUNT: "/attendance/dashboard",
      GET_ATTENDANCE: "/getAttendanceV2",
      LATE_ATTENDANCE: "/attendance/late-users",
      ABSENTUSERS: "/attendance/absentuser",
    },
    ATTENDANCE_SETTINGS: {
      CREATE: "/settings/attendance/create-leave-type",
    },
    TASK_MANAGEMENT: {
      LIST: "/tasks",
      LISTALL: "/organizationTasks",
    },
    COLLECTIONS: {
      LIST: "/Collection/getall",
    },
    OUTSTANDING: {
      CREATE: "/addBills",
      LIST: "/getBills",
      CUSTOMER_LIST: "/listCustomer",
      HISTORY_LIST: "/listHistory",
    },
    REPORTS: {
      ATTENDACNE_COLUMNS: {
        COLUMNLIST: "/reports/get-reports-columns",
      },
      DOWNLOADATTENDANCE: "/reports/admin/attendance",
      CLAIMS_COLUMNS: {
        COLUMNLIST: "/reports/get-reports-columns",
      },
      CLAIMTYPE: {
        LIST: "/claim/claim-type-list",
      },
      TRANSTYPE: {
        LIST: "/claim/mot-type-list",
      },
      DOWNLOADCLAIMS: "/reports/admin/claims",
      COLLECTION_COLUMNS: {
        COLUMNLIST: "/reports/get-reports-columns",
      },
      DOWNLOADCOLLECTIONS: "/reports/admin/collection-two",
      TASK_COLUMNS: {
        COLUMNLIST: "/reports/get-reports-columns",
      },
      TASKTYPE: {
        LIST: "/getAllTaskTypes",
      },
      STATUSTYPE: {
        LIST: "/getAllTaskStatus",
      },
      DOWNLOADTASK: "/reports/admin/task",
      SALES: {
        SALES: "/reports/admin/sales",
      },
      DOWNLOADVISIT: "/reports/admin/visit",
      DOWNLOADLEAD: "/reports/admin/lead",
      DOWNLOADLEAVE: "/reports/admin/leave",
      DOWNLOADGEOFENCING: "/visits/geofencingReport",
      DOWNLOADUSERTRACKING: "/visits/gettrackingReport",
    },
    CLAIM_MANAGEMENT: {
      GET_ALL_CLAIMS: "/getAllClaims",
      GET_CLAIM_COUNT: "/getClaimDashboard",
      UPDATE_CLAIM_ACTION: "/claim/update-claim",
      OUTSTANDING_CLAIM: "/outStandingForClaims",
    },
    CLAIM: {
      CREATE: "/typeofclaim",
      UPDATE: "/typeofclaim",
      LIST: "/typeofclaim",
      LISTONE: "/typeofclaim",
      LISTALL: "/typeofclaim",
      LIST_TYPETRAVEL: "/ModeOfTransport",
      NEW_LIST: "/claim/claim-type-list",
    },
    MODE_OF_TRANSPORT: {
      CREATE: "/ModeOfTransport",
      GETALL: "/ModeOfTransport",
      UPDATE: "/ModeOfTransport",
      GETONE: "/ModeOfTransport",
      NEW_LIST: "/claim/mot-type-list",
    },
    SPLIT_SUB_CATEGORY: {
      CREATE: "/travelexpenses",
      UPDATE: "/travelexpenses",
      GETALL: "/travelexpenses",
      REQUEST_CLAIM_TRAVEL_SPLITSUBCATEGORY: "/travelexpenses",
      REQUEST_CLAIM_SPLITSUBCATEGORY_DATATRAVEL: "/ModeOfTransport",
      REQUEST_CLAIM_SPLITSUBCATEGORY_DATA: "/claimCategory",
      REQUEST_CLAIM_SPLITCUBCATEGORY_DATAMODEL: "/claimCategory",
      GET_CLAIMSPECIFIC_CATEGORY_DATA_MODELTARVEL: "/travelexpenses",
      NEW_LIST: "/claim/subcategory-type-list",
    },
    GRADE: {
      CREATE: "/grade",
      GETGRADES: "/grade",
      GETONEGRADE: "/grade",
      UPDATE: "/grade",
      GETALLCLASS: "/class",
      GETALLGRADES: "/grade",
      NEW_LIST: "/claim/grade-list",
    },
    AMOUNTALLOCATION: {
      CREATE: "/AmountAllocation",
      CREATE_ROOMRENT_ALLOCATION: "/RoomAllocation",
      CREATE_TRAVEL_ALLOCATION: "/TravelAllocation",
      UPDATE_AMOUNT_ALLOCATION: "/AmountAllocation",
      GETONE: "/AmountAllocation",
      GET_AMOUNT_ALLOCATION: "/AmountAllocation",
      GET_ALL_AMOUNT_ALLOCATIONS: "/AmountAllocation",
      GETALLTRAVEL: "/TravelAllocation",
      GET_ONE_TRAVEL: "/TravelAllocation",
      UPDATE_TRAVEL_ALLOCATION: "/TravelAllocation",
      GET_ONE_ROOMRENT: "/RoomAllocation",
      GET_ROOMRENT_ALLOCATION: "/RoomAllocation",
      UPDATE_ROOMRENT_ALLOCATION: "/RoomAllocation",
      GET_AMOUNT_ALLOCATION_V2: "/AmountAllocation",
      GET_ALL_AMOUNTALLOCATION_BYTYPE: "/allocation/types",
      GET_ALL_ROOMALLOCATION_BYTYPE: "/RoomAllocation",
      GET_TRAVEL_ALLOCATION: "/TravelAllocation",
      GET_ALL_TRAVELALLOCATION_BYTYPE: "/TravelAllocation",
      GET_ALL_ROOMRENT_ALLOCATIONDATA: "/RoomAllocation",
      FIXED_AMOUNT_LIST: "/claim/fixed-amount-list",
      TRAVEL_ALLOCATION_LIST: "/claim/travel-allocation-list",
      ROOMRENT_ALLOCATION_LIST: "/claim/roomrent-allocation-list",
    },
    LEAD_MANAGEMENT: {
      LIST: "/leadmanagement/get-all",
      CREATE: "/leadmanagement",
      UPDATE: "/leadmanagement",
      ZIPCODE: "/zipCodeApi",
      COUNTRY: "/countryCode",
    },
    USER_ACTIVITY: {
      GET: "/UserActivity/getall",
    },
    TRIPPLAN: {
      LIST: "/tripplan/list",
      CREATE: "/tripplan/create",
      UPDATE: "/tripplan/update/",
      USERS_GRP: "/tripplan/users-mappped-gcb",
      GET_BY_ID: "/tripplan/get-by-id/",
    },
    SHOP_SERVICE: {
      LIST_BILLING: "/shop/get-admin-billingdetails",
      CREATE: "/shopservice/assign-service-to-users",
      LIST_USERS: "/shopservice/listusers",
    },
    ORDER_MANAGEMENT: {
      GETALL_ORDERS: "/getAll",
      GET_ORDER_NUMBERS: "/getAllOrderId",
      UPDATE_ORDER: "/update",
      ORDER_COUNT: "/statusCount",
    },
  },

  // ************ other routes
  REQUEST_DEMO: {
    CREATE: `/createRequestDemo`,
    GET_INDUSTRY: "/industryType",
    GET_ALL_COUNTRIES: "/getAllCountries",
  },
  UPLOAD_FILE: {
    UPLOAD_FILE: "/fileupload",
  },

  // **************** Super Admin routes
  SUPER_ADMIN: {
    MODULES_SERVICES: {
      LIST: "/module",
      CREATE_PARENT_MODULE: "/module/parent/create",
      CREATE_CHILD_MODULE: "/module/create",
      GET_MODULES: "/module/get-modules",
      UPDATE_PARENT_MODULE: "/module/parent/update",
      UPDATE_CHILD_MODULE: "/module",
      DELETE: "/module/parent/delete",
    },
    BILLING: {
      LIST: "/BillingDetails",
      CREATE: "/BillingDetails",
      LIST_ALL: "/getAllBillingDetails",
      GET_ONE: "/billingdetails/get-one",
      UPDATE: "/billingdetails/update",
      NEW_LIST: "/billingdetails/list",
    },
    REQUEST_DETAILS: {
      GET: "/getAllRequestDemos",
      UPDATE: "/updateRequestDemo",
    },
    ORGANIZATION: {
      GET_ORG: "/organization",
      GET_ALL_ORGANIZATIONS: "/organization/list",
      CREATE_ORGANIZATION: "/organization/create",
      UPDATE_ORGANIZATION: "/organization/update",
      GET_ONE_ORGANIZATION: "/getOneOrganization",
      GET_ALL_ORGANIZATION_FOR_DROPDOWN: "/getAllOrganizationName",
      DELETE_ORGANIZATION: "/organization/delete",
      GETCOUNTRY: "/getAllCountry",
      GETSTATES: "/getAllStatesByCountry",
      GETCITIES: "/getAllCitiesByState",
      ORG_SETTING: "/organization/org-setting",
      GET_ONE_ORG_SETTING: "/organization/get-one-org",
    },
    MDM: {
      ENTERPRESIS: {
        CREATE: "/enterprise",
        LIST: "/enterprise/list-enterprise",
      },
    },
    DASHBOARD: {
      COUNTS: {
        LIST: "/dashboard",
      },
      WEEKLY: "/organizationweekly",
      YEAR: "/organizationmonthly",
      DUE: "/paymentduestatus",
    },
  },

  // ************ Setting Menu routes
  SETTINGS: {
    LIST: "/settings/get-settings-list",
    CREATE: "/settings/create",
    UPDATE: "/settings/update",
    UPDATEACTIVE: "/settings/updateIsActive",
    SETTING: {
      TASKMANAGEMENT: {
        LIST: "/getAllTaskTypes",
        CREATE: "/taskType",
        UPDATE: "/taskType",
      },
      STATUS: {
        LIST: "/getAllTaskStatus",
        CREATE: "/taskstatus",
        UPDATE: "/taskstatus",
      },
      PRIORITY: {
        LIST: "/getAllPriorities",
        CREATE: "/priority",
        UPDATE: "/priority",
      },
      LOGISTICS: {
        LIST: "/listlogistics",
        CREATE: "/logistics",
        UPDATE: "/updatelogistics",
        UPDATEACTIVE: "/activedeactive",
      },
    },
    FEATURES: {
      ATTENDANCE: {
        CREATE: "/settings/attendance/create-leave-type",
      },
      PRODUCT: {
        CREATE: "/settings/product/create",
        LIST: "/settings/product/list",
        UPDATE: "/settings/product/update",
        DELETE: "/settings/product/delete",
        BULKUPLOAD: "/settings/product/bulkupload",
        TEMPLATE: "/settings/product/templatedata",
        FORM_DATA_CREATE: "/settings/product/formdata-create",
        FORM_DATA_UPDATE: "/settings/product/formdata-update",
        ACTIVE_DEACTIVE: "/settings/product/active-deactive",
      },
      CUSTOMER: {
        CREATE: "/customer/create",
        LIST: "/customer/getall",
        GET_ALL_CUSTOMERS_BY_ORGANIZATION: "/getAllCustomersByOrganization",
        UPDATE: "/customer/update",
        GET_BY_GROUP: "/customermapping/get-customer-by-group",
        ACTIVE_DEACTIVE: "/customer/active-deactive",
      },
      GROUP: {
        CREATE: "/group/create",
        LIST: "/group/getall",
        UPDATE: "/group/update",
        UPDATE_STATUS: "/updateGroupActiveDeactive",
      },
      BILLINGPARTY: {
        CREATE: "/billingParty/create",
        LIST: "/billingParty/getall",
        UPDATE: "/billingParty/update",
        GET_BY_CUSTOMER: "/billingpartymapping/get-billingpartyby-customer",
        BULK_UPLOAD_TEMPLATE: "/billingparty/bulkuploadtemplate",
        BILLING_BULK_UPLOAD: "/billingparty/bulkupload-create",
        ACTIVE_DEACTIVE: "/billingParty/active-deactive",
      },
      LEADMANAGEMENT: {
        LEADTYPE: {
          LIST: "/leadType",
          CREATE: "/leadType",
          UPDATE: "/leadType",
        },
        LEADSTATUS: {
          LIST: "/leadstatusbyorg",
          CREATE: "/leadStatus",
          UPDATE: "/leadStatus",
        },
        LEADPRIORITY: {
          LIST: "/leadpriorityByOrg",
          CREATE: "/leadPriority",
          UPDATE: "/leadPriority",
        },
        LEADSOURCE: {
          LIST: "/leadsourceByOrgId",
          CREATE: "/leadSource",
          UPDATE: "/leadSource",
        },
      },
      HIERARCHY: {
        DESG_MAPPING_CREATE: "/settings/hierarchy/designation-mapping-create",
        DESG_MAPPING_UPDATE: "/settings/hierarchy/designation-mapping-update",
        DESG_MAPPING_FIND: "/settings/hierarchy/designation-mapping-find",
        DESG_MAPPED_USERS: "/settings/hierarchy/get-desigantion-mapped-user",
        ASSIGN_USER: "/settings/hierarchy/assign-user",
        UNASSIGN_USER: "/settings/hierarchy/unassign-user",
      },
      VISIT: {
        CREATE: "/settings/visit/create",
        UPDATE: "/settings/visit/update",
        GET_ONE: "/settings/visit/get-one",
        LIST: "/settings/visit/get-all",
        DELETE: "/settings/visit/delete",
        VISIT_MNG_LIST: "/visit/visitmanagement-list",
      },
      MAPPINGS: {
        LIST_FOR_USER: "/usermapping/assign-unassign-list",
        CREATE_USER_MAPPING: "/usermapping/createUserMapping",
        LIST_FOR_CUSTOMER: "/customermapping/assign-unassign-list",
        CREATE_CUSTOMER_MAPPING: "/customermapping/create",
        LIST_FOR_BILLINGPARTY: "/billingpartymapping/assign-unassign-list",
        CREATE_BILLINGPARTY_MAPPING: "/billingpartymapping/create",
        UPDATE: "/settings/visit/update",
        GET_ONE: "/settings/visit/get-one",
        LIST: "/settings/visit/get-all",
        DELETE: "/settings/visit/delete",
        UPDATE_CUSTOMER_MAPPING: "/customermapping/updateCustomerMapping",
        UPDATE_BILLINGPARTY_MAPPING:
          "/billingpartymapping/updateBillingPartyMapping",
        UPDATE_USER_MAPPING: "/usermapping/updateUserMapping",
      },
      ORDER_SETTINGS: {
        LIST: "/orderSetting/list",
        CREATE: "/orderSetting/create",
        UPDATE: "/orderSetting/update",
        STATUS: "/orderSetting/statusUpdate",
      },
    },
  },
  DIREDCT: {
    MODEL: "/genaral/direct-model",
  },
});

/** @note Pass above added module api routes */
export const getApiRoute = (pathName: string, optionlBaseURL?: string) => {
  return optionlBaseURL
    ? `${optionlBaseURL}${pathName}`
    : `${API_BASE_URL}${pathName}`;
};

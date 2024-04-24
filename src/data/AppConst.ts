/** @format */

export const API_DATE_FORMAT = [
  "DD-MM-YYYY",
  "DD-MM-YYYY HH:mm:ss ",
  "DD-MM-YY",
  "DD-MM-YY HH:mm:ss",
  "YYYY-MM-DD",
  "YYYY-MM-DD HH:mm:ss",
  "DD/MM/YYYY",
  "DD/MM/YYYY HH:mm:ss",
  "DD/MM/YY",
  "DD/MM/YY HH:mm:ss",
  "YYYY/MM/DD",
  "YYYY/MM/DD HH:mm:ss",
  "DD-MM-YYYY HH:mm:SS A",
];

// TIMEZONE
export const TIME_ZONE = "Asia/Kolkata";

// Admin user management designation
export const DESIGNATION = [
  {
    label: "SE",
    value: "SE",
  },
  {
    label: "ASM",
    value: "ASM",
  },
  {
    label: "RSM",
    value: "RSM",
  },
  {
    label: "ZSH",
    value: "ZSH",
  },
  {
    label: "BDM",
    value: "BDM",
  },
];

export const Services = [
  {
    label: "Attendance",
    value: "Attendance",
  },
  {
    label: "Module",
    value: "Module",
  },
  {
    label: "Payroll",
    value: "Payroll",
  },
];

export const PaymentService = [
  {
    label: "Paid",
    value: "PAID",
  },
  {
    label: "Trial",
    value: "TRIAL",
  },
];

export const Organization = [
  {
    label: "IT",
    value: "IT",
  },
  {
    label: "Manufacturing",
    value: "Manufacturing",
  },
];

export const ContactStatus = [
  {
    label: "Contacted",
    value: "Contacted",
  },
  {
    label: "Scheduled",
    value: "Scheduled",
  },
  {
    label: "Dropped",
    value: "Dropped",
  },
  {
    label: "Follow Up",
    value: "Follow Up",
  },
  {
    label: "Not Reachable",
    value: "Not Reachable",
  },
  {
    label: "Completed",
    value: "Completed",
  },
];

export const ACTION_ICON_TYPES = [
  "ADD",
  "EDIT",
  "VIEW",
  "CANCEL",
  "DELETE",
  "DOWNLOAD",
  "REFRESH",
  "UPLOAD",
  "UPDATER",
  "ACTIVATE",
  "ADD BILLING",
  "FILTER",
];

// Admin usermanagement form action types
export const AUM_FORM_ACTION_TYPES = ["ADD", "EDIT", "VIEW"];

export const DEFAULT_PAGINATION_SIZES = [10, 20, 30, 40, 50, 100, 200, 500];

export const MODULE_TYPES = ["PARENT", "CHILD"];

export const STATUS_TYPES = ["Active", "In-active"];

export const STATIC_MODULE_FOR_SUPER_ADMIN = [
  "Dashboard",
  "Organization Details",
  "Billing Details",
  "Request Details",
  "Modules",
  "MDM Master",
  "Audit Log",
];

export const STATIC_MODULE_FOR_ADMIN = [
  "Dashboard",
  "Leave Management",
  "Attendance",
  "User Tracking",
  "Claim Management",
  "MDM",
  "Task Management",
  "Lead Management",
  "Visit Management",
  "Sales Management",
  "Collections",
  "User Activity",
  "Trip Planner",
  "Reports",
  "Live Tracking",
  "Order Management",
  "Ticket Management",
  "Inventory Management",
];

export const STATIC_WAREHOUSE_DATA = [
  {
    label: "WAREHOUSE",
    value: "warehouse",
  },
  {
    label: "CUSTOMER",
    value: "customer",
  },
  {
    label: "STORE",
    value: "store",
  },
  // {
  //   label: "RETAILER",
  //   value: "retailer",
  // },
  {
    label: "USER",
    value: "user",
  },
];

export const DEFAULT_STATUS = [
  "OPEN",
  "APPROVED",
  "REJECTED",
  "CANCEL",
  "DELETE",
  "EXPIRED",
];

export const DEFAULT_STATUS_LEAVE_REQUEST: any = {
  applied: {
    STATUS: "applied",
    COLOR: "#f57c00",
    BACKGROUND: "#ffe0b2",
    TEXT: "Applied",
  },
  rejected: {
    STATUS: "rejected",
    COLOR: "#b71c1c",
    BACKGROUND: "#ffcdd2",
    TEXT: "Rejected",
  },
  approved: {
    STATUS: "approved",
    COLOR: "#1A4331",
    BACKGROUND: "#C6F1DA",
    TEXT: "Approved",
  },
};

export const CONFIRMATION_TYPE = ["INFO", "WARNING", "ERROR", "DELETE"];

export const SETTING_OPTIONS_KEY = [
  "USER_SETTING",
  "GENERAL_SETTING",
  "TASK_MANAGEMENT_SETTING",
];

export const FEATURE_SETTING_OPTION_KEY = [
  "CUSTOMER_SETTING",
  "PRODUCT_SETTING",
  "CLAIM_MANAGEMENT_SETTING",
  "ATTENDANCE_SETTING",
  "HIERARCHY_MAPPING",
  "VISIT",
  "ORDER_SETTING",
  "INVENTORY_SETTING",
];

export const CLAIM_STATUS = [
  {
    label: "CLAIMED",
    value: "claimed",
  },
  {
    label: "APPROVED",
    value: "approved",
  },
  {
    label: "PAID",
    value: "paid",
  },
  {
    label: "REVIEWED",
    value: "reviewed",
  },
  {
    label: "REJECTED",
    value: "rejected",
  },
  {
    label: "APPROVED PAYMENT",
    value: "pendingForPayment",
  },
];

export const CUSTOMER_DETAIL_RADIUS = [
  {
    label: "100",
    value: "100",
  },
  {
    label: "150",
    value: "150",
  },
  {
    label: "200",
    value: "200",
  },
  {
    label: "250",
    value: "250",
  },
  {
    label: "300",
    value: "300",
  },
  {
    label: "350",
    value: "350",
  },
  {
    label: "400",
    value: "400",
  },
  {
    label: "450",
    value: "450",
  },
  {
    label: "500",
    value: "500",
  },
  {
    label: "550",
    value: "550",
  },
  {
    label: "100",
    value: "100",
  },
  {
    label: "600",
    value: "650",
  },
  {
    label: "700",
    value: "700",
  },
  {
    label: "750",
    value: "750",
  },
  {
    label: "800",
    value: "800",
  },
  {
    label: "850",
    value: "850",
  },
  {
    label: "900",
    value: "900",
  },
  {
    label: "950",
    value: "950",
  },
  {
    label: "1000",
    value: "1000",
  },
];

export const ASSIGN_OR_UNASSIGN = [
  {
    label: "Assign",
    value: "ASSIGN",
  },
  {
    label: "Un-Assign",
    value: "UN_ASSIGN",
  },
];

export const CUSTOMER_OR_BILLINGPARTY = [
  { label: "Customer", value: "customer" },
  { label: "Billing Party", value: "billingParty" },
];

export const TRIP_PLANNER_TYPE = [
  // {
  //   label: 'Group',
  //   value: 'GROUP'
  // },
  {
    label: "Customers",
    value: "CUSTOMER",
  },
  {
    label: "Billing Party",
    value: "BILLING_PARTY",
  },
];

export const TRIP_PLANNER_DATE_RECURRING_TYPES = [
  {
    label: "Today",
    value: "TODAY",
  },
  {
    label: "Daily",
    value: "DAILY",
  },
  {
    label: "Weekly",
    value: "WEEKLY",
  },
  {
    label: "Monthly",
    value: "MONTHLY",
  },
];

//*********************|  User Settings  | *************************
export const ACCORDIAN_DATA = [
  // {
  //   title: "Attendance",
  //   items: [
  //     { label: "Screen Capture Disabled", name: "screenCaptureDisabled" },
  //     { label: "Apply Leave", name: "applyleave" },
  //   ],
  // },
  // {
  //   title: "Task Management",
  //   items: [
  //     { label: "Task Assignee", name: "taskAssignee" },
  //     { label: "Apply Leave", name: "applyleaveTask" },
  //     { label: "Taskcompletion", name: "Taskcompleteion"},
  //   ],
  // },
  {
    title: "General",
    items: [
      {
        label: "Customer Or BillingParty",
        name: "general_customer_or_billingparty",
        icon: "generic",
      },
    ],
  },
  {
    title: "Sales Management",
    items: [
      { label: "Order type", name: "sales_ordertype", icon: "order" },
      {
        label: "Default logistics",
        name: "sales_defaultlogtype",
        icon: "logistic",
      },
      {
        label: "Delivery location",
        name: "sales_deliverylocation",
        icon: "locations",
      },
      { label: "Delivery date", name: "sales_deliverydate", icon: "delivery" },
    ],
  },
  {
    title: "Visit Management",
    items: [
      {
        label: "Multiple image upload",
        name: "visit_multipleimage",
        icon: "image",
      },
      {
        label: "Purpose of visit",
        name: "visit_purposeofvisit",
        icon: "pur visit",
      },
      { label: "Type of visit", name: "visit_typeofvisit", icon: "type visit" },
      { label: "Voice record", name: "visit_voicerecord", icon: "voice rec" },
      {
        label: "Auto Voice record",
        name: "visit_auto_voicerecord",
        icon: "auto voice",
      },
    ],
  },
  {
    title: "Claim Management",
    items: [
      {
        label: "Fuel Reimbursement by tracking",
        icon: "fulecmail",
        name: "claim_fuel_reimbursement_by_tracking",
      },
    ],
  },
  // {
  //   title: "Lead Management",
  //   items: [
  //     { label: "Follow up", name: "visit_multipleimage" },
  //     { label: "Approve", name: "visit_purposeofvisit" },
  //   ],
  // },
];

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const SIGN_IN: Record<string, any> = {
  title: "Sign-In",
  items: [
    {
      label: "Web Only",
      name: "login_platform",
      info: "",
    },
    {
      label: "Mobile Only",
      name: "login_platform",
      info: "",
    },
    {
      label: "Both(Mob and Web)",
      name: "login_platform",
      info: "",
    },
  ],
};

export const LOGIN_PLATFROMS: string[] = ["WEB", "MOBILE", "BOTH"];

export const ORG_SETTINGS: Record<string, any> = Object.freeze({
  ATTENDANCE: {
    title: "Attendance",
    fields: [
      {
        label: "Is Multi Attendance",
        name: "is_multi_attendance",
        info: "You can mark attendance twice per day to enable this menu. By default, attendance is marked once per day",
      },
    ],
  },
  INVENTORY: {
    title: "Inventory",
    fields: [
      {
        label: "Is Multi Inventory",
        name: "is_multi_inventory",
        info: "You can mark inventory twice per day to enable this menu. By default, inventory is marked as single inventory",
      },
    ],
  },
});

export const DAY_COUNT = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
  {
    label: 30,
    value: 30,
  },
];

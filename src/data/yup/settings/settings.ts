/** @format */

import * as yup from "yup";

const decimalPlace = /^\d*\.?\d*$/;

const checkDecimalFn = (value: any) =>
  value?.trim() && decimalPlace.test(value);

export const designationFormSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    designation: yup.string().required("Designation name is required"),
    // order_level: yup.number().required("Level is required"),
  });
};

export const departmentFormSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    department: yup.string().required("Department is required"),
  });
};
export const LeaveTypeSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    leaveType: yup.string().required("Leave Type name is required"),
  });
};
export const PrioritySchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    priorityType: yup.string().required("Priority Type  is required"),
  });
};
export const TaskTypeSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    taskType: yup.string().required("Task Type  is required"),
  });
};
export const StatusTypeSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    statusType: yup.string().required("Status Type  is required"),
  });
};

// lead management

export const LeadManagementSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    leadType: yup.string().required("Fields are required"),
  });
};

export const LeadTypeSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    leadType: yup.string().required("Lead Type  is required"),
  });
};

export const StatusLeadSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    leadStatus: yup.string().required("Status type  is required"),
  });
};
export const PriorityLeadSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    leadPriority: yup.string().required("Priority type  is required"),
  });
};
export const SourceLeadSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    leadSource: yup.string().required("Source type  is required"),
  });
};
// *************************** Product settings from
export const productBrandSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    brand: yup.string().required("Brand type is required"),
  });
};

// *************************** Product category
export const productCategorySchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    brand: yup
      .object()
      .shape({
        label: yup.string().required("Brand is required"),
        value: yup.string().required("Brand is required"),
      })
      .required("Brand is required"),
    category: yup.string().required("Category is required"),
  });
};

// *************************** Product sub category

export const productSubCategorySchema = (
  _options?: Record<string, unknown>
) => {
  return yup.object().shape({
    brand: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Brand is required"),
    category: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Category is required"),
    // category: yup.string().required("Category is required"),
    subcategory: yup.string().required("Subcategory is required"),
  });
};

// *************************** Product type

export const productTypeSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    brand: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Brand is required"),
    category: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Category is required"),
    // category: yup.string().required("Category is required"),
    subcategory: yup
      .object()
      .shape({
        label: yup.string().required("Subcategory is required"),
        value: yup.string().required("Subcategory is required"),
      })
      .required("Subcategory is required"),
    producttype: yup.string().required("Product type is required"),
  });
};

// *************************** Product color

export const productColorSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    brand: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Brand is required"),
    category: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Category is required"),
    // category: yup.string().required("Category is required"),
    subcategory: yup
      .object()
      .shape({
        label: yup.string().required("Subcategory is required"),
        value: yup.string().required("Subcategory is required"),
      })
      .required("Subcategory is required"),
    producttype: yup
      .object()
      .shape({
        label: yup.string().required("Product type is required"),
        value: yup.string().required("Product type is required"),
      })
      .required("Product type is required"),
    color: yup.string().required("Color is required"),
  });
};

// *************************** Product size

export const productSizeSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    brand: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Brand is required"),
    category: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Category is required"),
    // category: yup.string().required("Category is required"),
    subcategory: yup
      .object()
      .shape({
        label: yup.string().required("Subcategory is required"),
        value: yup.string().required("Subcategory is required"),
      })
      .required("Subcategory is required"),
    producttype: yup
      .object()
      .shape({
        label: yup.string().required("Product type is required"),
        value: yup.string().required("Product type is required"),
      })
      .required("Product type is required"),
    color: yup
      .object()
      .shape({
        label: yup.string().required("Color is required"),
        value: yup.string().required("Color is required"),
      })
      .required("Product type is required"),

    size: yup.string().required("Size is required"),
  });
};

// *************************** Product

export const productSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    brand: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Brand is required"),
    category: yup
      .object()
      .shape({
        label: yup.string().required("Category is required"),
        value: yup.string().required("Category is required"),
      })
      .required("Category is required"),
    // category: yup.string().required("Category is required"),
    subcategory: yup
      .object()
      .shape({
        label: yup.string().required("Subcategory is required"),
        value: yup.string().required("Subcategory is required"),
      })
      .required("Subcategory is required"),
    producttype: yup
      .object()
      .shape({
        label: yup.string().required("Product type is required"),
        value: yup.string().required("Product type is required"),
      })
      .required("Product type is required"),
    color: yup
      .object()
      .shape({
        label: yup.string().required("Color is required"),
        value: yup.string().required("Color is required"),
      })
      .required("Product type is required"),

    size: yup
      .object()
      .shape({
        label: yup.string().required("Size is required"),
        value: yup.string().required("Size is required"),
      })
      .required("Size is required"),
    product: yup.string().required("Product name is required"),
    mrpPrice: yup
      .string()
      .required("MRP price is required")
      .test("'num-check'", "Invalid price", checkDecimalFn),
    // sellingPrice: yup.string().required('Selling price is required').matches(decimalPlace, 'accepts only number')
    sellingPrice: yup
      .string()
      .required("Selling price is required")
      .test("num-check", "Invalid price", checkDecimalFn),
  });
};

// *************************** Product

export const productBulkUploadSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    actionTyp: yup.string().required("Please select action"),
  });
};
//******************************Billing Part************************ */
export const billingPartySchema: any = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    billingPartyName: yup.string().required("Please enter billing party"),
    // customer: yup
    //   .object()
    //   .shape({
    //     label: yup.string().required("Please select customer name"),
    //     value: yup.string().required("Please select customer name"),
    //   }),
    customer: yup.object().required("Please select customer name"),
    contactPerson: yup.string().required("Please enter contact person"),
    contactNumber: yup
      .string()
      .required("Please enter contact number")
      .matches(/^\d+$/, "Contact number must only contain integers")
      .min(10, "Contact Number must be at least 10 digits")
      .max(10, "Contact Number must not exceed 10 digits"),
    // emailAddresses: yup
    //   .string()
    //   .required("Please enter email address")
    //   .email("Invalid email address")
    //   .matches(
    //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //     "Invalid email address"
    //   ),
    addressLineOne: yup.string().required("Please enter address line 1"),
    district: yup.string().required("Please enter district"),
    state: yup.string().required("Please enter state"),
    pinCode: yup.string().required("Please enter pincode"),
  });
};

// ************************* Price type
export const priceTypeFormSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    pricetype: yup.string().required("Price type is required"),
  });
};

export const productHsnSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    hsn: yup.string().required("Hsn code is required"),
    cgst: yup
      .string()
      .test("'num-check'", "Invalid input", checkDecimalFn)
      .required("CGST is required"),
    sgst: yup
      .string()
      .test("'num-check'", "Invalid input", checkDecimalFn)
      .required("SGST is required"),
    igst: yup
      .string()
      .test("'num-check'", "Invalid input", checkDecimalFn)
      .required("IGST is required"),
  });
};
// *****************|  Logistics SChema  |*****************
export const logisticsFormSchema = (_options?: Record<string, unknown>) => {
  return yup.object().shape({
    logistics: yup.string().required("Logistics name is required"),
  });
};

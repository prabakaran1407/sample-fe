import * as yup from "yup";

export const billingeditformSchema = (options?: Record<string, unknown>) => {
  return !options?.isEdit
    ? yup.object().shape({
        // username: yup.string().required('User name is required'),
        organization_id: yup.object()
        .shape({
          label: yup.string().required("organizationis required"),
          value: yup.string().required("organization is required"),
        }).required('Organization is required'),
        serviceStartDate: yup.string().required("Start date is required"),
        serviceEndDate: yup.string().required("End date is required"),
        // isInvoiceCopy: yup.string().required("Invoice Copy is required"),
        billingType: yup.object()
        .shape({
          label: yup.string().required("Billing type is required"),
          value: yup.string().required("Billing type is required"),
        }).required('Billing type is required'),
        // services: yup.array().required('Sevice is required'),
      })
    : yup.object().shape({
        // username: yup.string().required('User name is required'),
        organization_id: yup.object()
        .shape({
          label: yup.string().required("Designation is required"),
          value: yup.string().required("Designation is required"),
        }),
        serviceStartDate: yup.string().required("Start date is required"),
        serviceEndDate: yup.string().required("End date is required"),
        // isInvoiceCopy: yup.string().required("End date is required"),
        billingType: yup.object()
        .shape({
          label: yup.string().required("Payment status required"),
          value: yup.string().required("Payment status required"),
        }).required('Payment status required'),
        // services: yup.array().required("Service Code is required"),
      });
};

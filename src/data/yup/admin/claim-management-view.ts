import * as yup from "yup";

import { checkDecimalFn } from "../../../utils/index";

export const formSchema = (
  _options?: Record<string, unknown>,
  type?: Record<string, unknown>
) => {
  if (type?.pending_approver) {
    return yup.object().shape({
      approvedAmount: yup
        .string()
        .test("'num-check'", "Invalid input", checkDecimalFn)
        .required("Approve amount is required"),
      remarks: yup.string().required("Remark is required"),
    });
  }
  if (type?.pending_payer) {
    return yup.object().shape({
      requestAmount: yup
        .string()
        .test("'num-check'", "Invalid input", checkDecimalFn)
        .required("Request amount is required"),
      remarks: yup.string().required("Remarks is required"),
    });
  }
  if (type?.pending_payment) {
    return yup.object().shape({
      paidAmount: yup
        .string()
        .test("'num-check'", "Invalid input", checkDecimalFn)
        .required("Paid amount is required"),
      remarks: yup.string().required("Remarks is required"),
    });
  }
};

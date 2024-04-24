import * as yup from "yup";

export const visitPurpose = (_option?: any) => {
  return yup.object().shape({
    purpose: yup
      .string()
      .required("Purpose is required"),
  });
};


export const visitType = (_option?: any) => {
    return yup.object().shape({
      purpose: yup
        .object().shape({
            label: yup.string().required("Purpose is required"),
            value: yup.string().required("Purpose is required"),
          }).required("Purpose is required"),
      type: yup.string().required("Type is required"),
    });
  };
  
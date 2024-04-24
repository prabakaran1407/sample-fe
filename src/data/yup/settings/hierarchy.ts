import * as yup from "yup";

export const hierarychyMappingSettings = () => {
  return yup.object().shape({
    selectedDesignations: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required("Brand is required"),
          value: yup.string().required("Brand is required"),
        })
      )
      .required("should select atleast one designation"),
    // designations: yup.string().required("designation is required"),
  });
};

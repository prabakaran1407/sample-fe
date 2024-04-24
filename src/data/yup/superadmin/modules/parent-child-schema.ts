import * as yup from "yup";

export const formSchema = (options?: Record<string, unknown>) => {
  return options?.formType === "PARENT"
    ? yup.object().shape({
        // username: yup.string().required('User name is required'),
        moduleName: yup.string().required("Module name is required")
        .matches(/\S/, "Module Name cannot consist of only spaces"),

      })
    : yup.object().shape({
        parentModule: yup
          .object()
          .shape({
            label: yup.string().required("Parent type is required"),
            value: yup.string().required("Parent type is required"),
          })
          .required("Parent type is required"),
        moduleName: yup.string().required("Module name is required")
        .matches(/\S/, "Module Name cannot consist of only spaces"),

      });
};

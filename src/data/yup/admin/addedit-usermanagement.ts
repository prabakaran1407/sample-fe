/** @format */

import * as yup from "yup";

export const formSchema = (options?: Record<string, unknown>) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !options?.isEdit
    ? yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        emailAddress: yup
          .string()
          .lowercase("Uppercase letters are not allowed")
          .strict()
          .matches(emailRegex, "Invalid email format")
          .required("Email is required"),
        mobile: yup
          .string()
          .matches(
            /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
            "Enter numbers only"
          )
          .min(10, "Invalid mobile Number")
          .max(10, "Invalid mobile Number")
          .required("Mobile Number is required"),
        password: yup.string().required("Password is required"),
        embCode: yup.string().required("EMB Code is required"),
        designation: yup
          .object()
          .shape({
            label: yup.string().required("Designation is required"),
            value: yup.string().required("Designation is required"),
          })
          .required("Designation is required"),
        department: yup
          .object()
          .shape({
            label: yup.string().required("Department is required"),
            value: yup.string().required("Department is required"),
          })
          .required("Department is required"),
        role: yup
          .object()
          .shape({
            label: yup.string().required("Role is required"),
            value: yup.string().required("Role is required"),
          })
          .required("Role is required"),
        state: yup
          .object()
          .shape({
            label: yup.string().required("State is required"),
            value: yup.string().required("State is required"),
          })
          .required("State is required"),
        headquarters: yup
          .object()
          .shape({
            label: yup.string().required("District is required"),
            value: yup.string().required("District is required"),
          })
          .required("District is required"),
        // customer_or_billingparty: yup
        //   .string()
        //   .required('customer or billingparty is required'),
      })
    : yup.object().shape({
        // username: yup.string().required('User name is required'),
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        emailAddress: yup
          .string()
          .lowercase("Uppercase letters are not allowed")
          .strict()
          .matches(emailRegex, "Invalid email format")
          .required("Email is required"),
        mobile: yup
          .string()
          .matches(
            /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
            "Enter numbers only"
          )
          .max(10, "Invalid mobile no")
          .required("Mobile no is required"),

        embCode: yup.string().required("EMB Code is required"),
        designation: yup
          .object()
          .shape({
            label: yup.string().required("Designation is required"),
            value: yup.string().required("Designation is required"),
          })
          .required("Designation is required"),
        department: yup
          .object()
          .shape({
            label: yup.string().required("Department is required"),
            value: yup.string().required("Department is required"),
          })
          .required("Department is required"),
        role: yup
          .object()
          .shape({
            label: yup.string().required("Role is required"),
            value: yup.string().required("Role is required"),
          })
          .required("Role is required"),
        state: yup
          .object()
          .shape({
            label: yup.string().required("State is required"),
            value: yup.string().required("State is required"),
          })
          .required("State is required"),
        headquarters: yup
          .object()
          .shape({
            label: yup.string().required("District is required"),
            value: yup.string().required("District is required"),
          })
          .required("District is required"),
        // customer_or_billingparty: yup
        //   .string()
        //   .required('customer or billingparty is required'),
      });
};

export const organizationSchema = (options?: Record<string, unknown>) => {
  return !options?.isEdit
    ? yup.object().shape({
        organizationName: yup
          .string()
          .required("Organization Name is required")
          .matches(/\S/, "Organization Name cannot consist of only spaces"),
        contactPerson: yup
          .string()
          .required("Contact Person is required")
          .matches(/\S/, "Contact Person cannot consist of only spaces"),

        emailAddress: yup
          .string()
          .lowercase("Uppercase letters are not allowed")
          .strict()
          .email("Email must be valid")
          .required("Email is required"),
        contactNumber: yup
          .string()
          .matches(
            /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
            "Enter numbers only"
          )
          .min(10, "Invalid Contact Number")
          .max(10, "Invalid Contact Number")
          .required("Mobile Number is required"),
        password: yup.string().required("Password is required"),
        gstNumber: yup
          .string()
          // .transform((value, originalValue) => originalValue.trim())
          .required("GST Number is required")
          .matches(/\S/, "GST Number cannot consist of only spaces"),

        organizationType: yup
          .object()
          .shape({
            label: yup.string().required("OrganizationType is required"),
            value: yup.string().required("OrganizationType is required"),
          })
          .required("OrganizationType is required"),
        address: yup
          .string()
          .required("Address is required")
          .matches(/\S/, "Address cannot consist of only spaces"),
        noOfUsers: yup
          .string()
          .matches(/^[0-9]+$/, "Only numbers are allowed")
          .required("This field is required")
          .typeError("Please enter a valid number"),
      })
    : yup.object().shape({
        organizationName: yup
          .string()
          .required("Organization Name is required")
          .matches(/\S/, "Organization Name cannot consist of only spaces"),
        contactPerson: yup
          .string()
          .required("Contact Person is required")
          .matches(/\S/, "Contact Person cannot consist of only spaces"),
        emailAddress: yup
          .string()
          .lowercase("Uppercase letters are not allowed")
          .strict()
          .email()
          .required("Email is required"),
        contactNumber: yup
          .string()
          .strict()
          .matches(/^[0-9]+$/, "Only numbers are allowed")
          .max(10, "Invalid mobile no")
          .required("Mobile no is required"),
        gstNumber: yup
          .string()
          .required("GST Number is required")
          .matches(/\S/, "GST Number cannot consist of only spaces"),

        organizationType: yup
          .object()
          .shape({
            label: yup.string().required("organizationType is required"),
            value: yup.string().required("organizationType is required"),
          })
          .required("organizationType is required"),
        address: yup
          .string()
          .required("Address is required")
          .matches(/\S/, "Address cannot consist of only spaces"),
        noOfUsers: yup
          .string()
          .matches(/^[0-9]+$/, "Only numbers are allowed")
          .required("This field is required")
          .typeError("Please enter a valid number"),
      });
};

export const customerDetailSchema = () => {
  const phoneRegExp = /^[0-9]{10}$/;
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return yup.object().shape({
    customerName: yup.string().trim().required("Customer name is required"),
    contactPerson: yup.string().trim().required("Contact person is required"),
    contactNumber: yup
      .string()
      .required("Contact number is required")
      .matches(phoneRegExp, "Invalid mobile number"),
    // emailAddresses: yup
    //   .string()
    //   .required('Email address is required')
    //   .matches(emailRegExp, 'Invalid email address'),
    // emailAddresses: yup
    //   .string()
    //   .when(["contactPerson"], (contactPerson, schema) =>
    //     contactPerson
    //       ? schema
    //           .required("Email address is required")
    //           .matches(emailRegExp, "Invalid email address")
    //       : schema
    //   ),
    emailAddresses: yup
      .string()
      .when("$distributorLogin", (distributorLogin: any, schema: any) => {
        console.log(
          "Current contactPerson:",
          distributorLogin,
          distributorLogin[0],
          schema
        );
        return distributorLogin[0] === true
          ? schema
              .required("Email address is required")
              .matches(emailRegExp, "Invalid email address")
          : schema;
      }),
    addressLineOne: yup.string().trim().required("Address line 1 is required"),
    district: yup.string().trim().required("District is required"),
    state: yup.string().trim().required("State is required"),
    pinCode: yup.string().trim().required("Pincode  is required"),
  });
};

export const groupSchema = () => {
  return yup.object().shape({
    groupName: yup.string().trim().required("Group name is required"),
  });
};

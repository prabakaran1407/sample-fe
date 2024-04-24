import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
    "username": Yup.string().min(3, "Minimum 3 characters").max(50, "Maximum 50 characters").required("required"),
    "phoneno": Yup.string().min(10, 'Should 10 digits').max(10, 'Only 10 digits').required("Required"),
    "email": Yup.string().email("Invalid email format").required("Required"),
    "password": Yup.string().min(6, "Minimum 6 characters").max(20, "Maximum 20 characters").required('Required'),
    "confirmPassword": Yup.string().oneOf([Yup.ref("password")], "Password should match").required("Required")
})
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Yup from 'yup'

export const signinSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Invalid Password').required('Required')
})
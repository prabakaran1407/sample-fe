/** @format */

import * as yup from 'yup';

export const formSchema = (options?: Record<string, unknown>) => {
  return !options?.isEdit
    ? yup.object().shape({
        // username: yup.string().required('User name is required'),
        leaveType: yup.string().required('leaveType is required'),
        description: yup.string().required('description is required'),
        settingsType: yup.string().required('settingsType is required'),
        subTypes: yup.string().required('subTypes is required'),
        createdBy: yup.string().required('createdBy is required'),
        updatedBy: yup.string().required('updatedBy is required'),
        organization_id: yup.string().required('organization_id is required'),
      })
    : yup.object().shape({
        leaveType: yup.string().required('leaveType is required'),
        description: yup.string().required('description is required'),
        settingsType: yup.string().required('settingsType is required'),
        subTypes: yup.string().required('subTypes is required'),
        createdBy: yup.string().required('createdBy is required'),
        updatedBy: yup.string().required('updatedBy is required'),
        organization_id: yup.string().required('organization_id is required'),
      });
};
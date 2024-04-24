/** @format */

import React from 'react';
import * as _ from 'lodash';

// import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ModeOfTransportService from '../../claim/apis/Claim/ModeOfTransport';
type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  id: any;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Mode of Transport is required.')
    .notOneOf([' '], 'Mode of Transport should not contain spaces.'),
});

const NewTransport: React.FC<Props> = (props: Props) => {
  const { show, handleClose, id }: Props = props;
  const user = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      checked: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const data = {
          modeOfTransport: values.name.toUpperCase(),
          status: values.checked,
          organization_id: user?.data.userRecord?.organization_id,
        };

        if (id) {
          await ModeOfTransportService.updateModeOfTransport(data, id);
        } else {
          const response = await ModeOfTransportService.getTransport(data);
          const temp = response.data.find(
            (item: any) =>
              item.modeOfTransport === data.modeOfTransport &&
              item.organization_id.id === data.organization_id
          );

          if (!temp) {
            await ModeOfTransportService.createModeOfTransport(data);
            // handleClose;
            handlePostSubmission();
          } else {
            formik.setFieldError('name', 'Already Allocated');
          }
        }
      } catch (error: any) {
        formik.setFieldError('name', error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  function handlePostSubmission() {
    formik.resetForm();
    handleClose(true);
  }

  return (
    <>
      <Modal
        open={show}
        onClose={() => handleClose(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        // aria-labelledby="form-dialog-title"
        // maxWidth="md"
        // fullWidth
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='container-xl px-10 py-10'>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                pb={4}>
                <Typography variant='h5' sx={{ fontWeight: '600' }}>
                  {!id ? 'New' : 'Modify'} Transport
                </Typography>

                <IconButton
                  onClick={() => {
                    formik.resetForm();
                    handleClose(formik.values.name !== '');
                  }}>
                  <CloseRounded />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextField
                  label={
                    <>
                      Transport Name<span style={{ color: 'red' }}> * </span>
                    </>
                  }
                  size='small'
                  autoComplete='off'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ width: '320px', mb: 3 }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 3,
                }}>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={
                    formik.isSubmitting ||
                    !formik.isValid ||
                    !formik.values.name?.trim()
                  }>
                  {formik.isSubmitting ? 'Please wait...' : 'Save'}
                </Button>
              </Box>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};
export { NewTransport };

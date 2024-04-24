/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */
import AdvanceSnackbars from '../../../components/com_components/advanceSnackBar';
import React, { useState } from 'react';
import {
  Modal,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  TextField,
  CircularProgress,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { startStopLostMode } from '../../../services/admin/mdm/enrollment.service';

type Props = {
  show: boolean;
  handleClose: (param: boolean) => void;
  viewData: any;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 1.5,
};

const LostDeviceModal: React.FC<Props> = ({ show, handleClose, viewData }) => {
  const [snackbarState, setSnackBar] = useState({
    open: false,
    messege: '',
    severity: 'info',
    autoHideDuriation: 2000,
  });
  const [loading, _setLpading] = useState(false);
  const [isStartBtnEnabled, setIsStartBtnEnabled] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [fieldValues, setFieldValue] = useState({
    lostMessage: {
      defaultMessage: 'This  device was reported lost',
    },
    lostOrganization: {
      defaultMessage: '',
    },
    lostPhoneNumber: {
      defaultMessage: '',
    },
    lostStreetAddress: {
      defaultMessage: '',
    },
  });

  const lostDetails = (name: any, value: any) => {
    setFieldValue({ ...fieldValues, [name]: value });
    setIsStartBtnEnabled(false);
  };

  const handleSubmit = async () => {
    console.log('view', viewData);
    const splitName = viewData?.name?.split('/');
    const enterpriseName = splitName[splitName.length - 3];
    const deviceId = splitName[splitName.length - 1];
    const params = {
      type: 'START_LOST_MODE', // START_LOST_MODE, LOCK, STOP_LOST_MODE
      startLostModeParams: { ...fieldValues },
    };
    console.log(enterpriseName, deviceId, params);
    setIsStarted(true);
    if (enterpriseName && deviceId && params) {
      try {
        const res = await startStopLostMode(
          deviceId,
          `enterprises/${enterpriseName}`,
          params
        );
        console.log(res);
        handleClose(false);
        setSnackBar({
          ...snackbarState,
          open: true,
          messege: 'Device has been activated under lost mode',
          severity: 'success',
        });
        setIsStarted(false);
      } catch (error) {
        console.error('Error in enabling lost mode :', error);
        setSnackBar({
          ...snackbarState,
          open: true,
          messege: 'Failed to enable lost mode',
          severity: 'error',
        });
        setIsStarted(false);
      }
    }
  };
  return (
    <>
      <Modal
        open={show}
        onClose={() => handleClose(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: 1,
              pl: 2,
              pb: 1,
            }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Lost Device
            </Typography>
            <Button onClick={() => handleClose(true)} color='primary'>
              <CloseRoundedIcon />
            </Button>
          </Box>

          {!loading ? (
            <Container>
              <Box sx={{ p: '2px', mb: '1px' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                  Kindly fill the details
                </Typography>
                <Box sx={{ p: '8px' }}>
                  <Grid container spacing={0.8}>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <label className='d-block fs-6'>Lost Message</label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <TextField
                          disabled
                          label='lost Message'
                          size='small'
                          style={{
                            width: 340,
                            background: '#FFFFFF',
                          }}
                          value={fieldValues?.lostMessage?.defaultMessage}
                          onChange={(e) => {
                            lostDetails('lostMessage', {
                              defaultMessage: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <label className='d-block fs-6'>
                          Organization Name
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <TextField
                          label='Organization Name'
                          size='small'
                          style={{
                            width: 340,
                            background: '#FFFFFF',
                          }}
                          value={fieldValues?.lostOrganization?.defaultMessage}
                          onChange={(e) => {
                            lostDetails('lostOrganization', {
                              defaultMessage: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <label className='d-block fs-6'>Phone Number</label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <TextField
                          label='Phone Number'
                          size='small'
                          style={{
                            width: 340,
                            background: '#FFFFFF',
                          }}
                          value={fieldValues?.lostPhoneNumber?.defaultMessage}
                          onChange={(e) => {
                            lostDetails('lostPhoneNumber', {
                              defaultMessage: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <label className='d-block fs-6'>
                          Organization Address
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={6}>
                      <div className='col-sm'>
                        <TextField
                          label='Organization Address'
                          size='small'
                          style={{
                            width: 340,
                            background: '#FFFFFF',
                          }}
                          value={fieldValues?.lostStreetAddress?.defaultMessage}
                          onChange={(e) => {
                            lostDetails('lostStreetAddress', {
                              defaultMessage: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>

                  {/* Add similar grid items for other hardware information */}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => handleClose(false)}>Cancel</Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={isStartBtnEnabled}
                  onClick={() => handleSubmit()}>
                  {isStarted ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    'Start Lost Mode'
                  )}
                </Button>
              </Box>
            </Container>
          ) : (
            <div></div>
          )}
        </Box>
      </Modal>
      <AdvanceSnackbars
        open={snackbarState.open}
        severity={snackbarState.severity}
        messege={snackbarState.messege}
        autoHideDuration={snackbarState.autoHideDuriation}
        handleClose={() => {
          setSnackBar((prev) => ({
            ...prev,
            open: false,
            messege: '',
            severity: '',
          }));
        }}
      />
    </>
  );
};

export default LostDeviceModal;

/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */
import AdvanceSnackbars from '../../../components/com_components/advanceSnackBar';
import React, { useState } from 'react';
import { Modal, Button, Typography, Container, Grid, Box } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import moment from 'moment';

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

const EnrolledDeviceModal: React.FC<Props> = ({
  show,
  handleClose,
  viewData,
}) => {
  const [snackbarState, setSnackBar] = useState({
    open: false,
    messege: '',
    severity: 'info',
    autoHideDuriation: 2000,
  });
  const [loading, _setLpading] = useState(false);

  return (
    <>
      <Modal
        open={show}
        onClose={() => handleClose(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: 1,
              pl: 2,
              pb: 1,
            }}
          >
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Device Details
            </Typography>
            <Button onClick={() => handleClose(true)} color='primary'>
              <CloseRoundedIcon />
            </Button>
          </Box>

          {!loading ? (
            <Container>
              <Box sx={{ p: '2px', mb: '1px' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                  Hardware Information
                </Typography>
                <Box sx={{ p: '8px' }}>
                  <Grid container spacing={0.8}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Brand: {viewData?.hardwareInfo?.brand}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Hardware: {viewData?.hardwareInfo?.hardware}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Manufacturer : {viewData?.hardwareInfo?.manufacturer}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Device Baseband Version:{' '}
                        {viewData?.hardwareInfo?.deviceBasebandVersion}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Serial Number : {viewData?.hardwareInfo?.serialNumber}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Model : {viewData?.hardwareInfo?.model}{' '}
                      </Typography>
                    </Grid>
                    {/* Add similar grid items for other hardware information */}
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ p: '2px', mb: '1px' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                  Memory Information
                </Typography>
                <Box sx={{ p: '8px' }}>
                  <Grid container spacing={0.8}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        RAM : {viewData?.memoryInfo?.totalRam}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        ROM : {viewData?.memoryInfo?.totalInternalStorage}{' '}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box sx={{ p: '2px', mb: '1px' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                  Other Information
                </Typography>
                <Box sx={{ p: '8px' }}>
                  <Grid container spacing={0.8}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Device Name : {viewData?.hardwareInfo?.brand}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Management Mode : {viewData?.managementMode}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        State : {viewData?.state}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Applied State : {viewData?.state}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Policy Compliant: {viewData?.hardwareInfo?.brand}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Enrolled Time :{' '}
                        {moment(viewData?.enrollmentTime).format('YYYY-MM-DD')}{' '}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Last Status Report Time :{' '}
                        {moment(viewData?.lastStatusReportTime).format(
                          'YYYY-MM-DD'
                        )}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Last Policy Sync Time :{' '}
                        {moment(viewData?.lastPolicySyncTime).format(
                          'YYYY-MM-DD'
                        )}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Applied Policy Version :{' '}
                        {viewData?.appliedPolicyVersion}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Api Level : {viewData?.apiLevel}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Disabled Reason:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Hardware Info:{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Policy Name :{' '}
                        {viewData?.policyName?.split('/')?.slice(-1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px', color: '#616161' }}>
                        Applied Policy Name :{' '}
                        <span style={{ color: '#212121' }}>
                          {viewData?.appliedPolicyName?.split('/')?.slice(-1)}{' '}
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Memory Info :{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Username : {viewData?.userName?.split('/')?.slice(-1)}{' '}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Ownership : {viewData?.ownership}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Security Posture :{' '}
                        {viewData?.securityPosture?.devicePosture}{' '}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} />

                    <Grid item xs={12}>
                      <Typography sx={{ fontSize: '14px' }}>
                        Enrollment Token Name:{' '}
                        {viewData?.enrollmentTokenName?.split('/')?.slice(-1)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
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

export default EnrolledDeviceModal;

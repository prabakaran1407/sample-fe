import {
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
  } from '@mui/material';
  import { useAppSelector } from '../../../../../../src/hooks';
  import { useEffect, useState } from 'react';
  import OrganizationService from '../../../../../../src/services/super-admin/organization/organization.service';
  // import { useNavigate } from 'react-router-dom';
  import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const WorkTiming = () => {
    const auth = useAppSelector((state) => state.auth);

    const [organizationData, setOrganizationData] = useState<any>(null);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // const navigate = useNavigate();
    const handleStartTimeChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setStartTime(event.target.value);
    };
    const handleUpdateButtonClick = () => {
        setLoading(true);
    
        const orgId = auth.data.userRecord.organization_id;
        const payload = {
          startTime: startTime,
          endTime: endTime,
          organizationName: organizationData?.organizationName,
          contactNumber: organizationData?.contactNumber,
          emailAddress: organizationData?.emailAddress,
        };
    
        if (!startTime || !endTime) {
          console.error('Start time and end time are required');
          setLoading(false);
          return;
        }
    
        OrganizationService.updateOrganization(orgId, payload)
          .then((response) => {
            console.log('Work Timing updated successfully:', response);
            toast.success('Work Timing updated successfully'); 
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error updating Work Timing:', error);
            toast.error('Error updating Work Timing'); 
            setLoading(false);
          });
      };
  
    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndTime(event.target.value);
    };
    useEffect(() => {
      if (auth?.data?.userRecord?.organization_id) {
        const organization_id = auth.data.userRecord.organization_id;
        OrganizationService.getOneOrganization(organization_id)
          .then((data) => {
            setOrganizationData(data?.data?.data);
            setStartTime(data?.data?.data?.startTime || ''); 
            setEndTime(data?.data?.data?.endTime || '');
          })
          .catch((error) => {
            console.error('Error fetching organization data:', error);
          });
      }
    }, [auth]);
    return ( 
        <>
         <Paper sx={{ marginBottom: '20px', margin: '10px', padding: '10px' }}>
        <Grid container rowSpacing={2} alignItems={'center'} marginTop={2}>
          <Grid item xs={2}>
            <Typography variant='h6' sx={{ display: 'inline' }}>
              Start Time
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant='h6' sx={{ display: 'inline' }}>
              :
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id='start-time'
              type='time'
              value={startTime}
              onChange={handleStartTimeChange}
              sx={{ display: 'inline', marginLeft: '40px' }}
              size='small'
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant='h6' sx={{ display: 'inline' }}>
              End Time
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant='h6' sx={{ display: 'inline' }}>
              :
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField
              id='end-time'
              type='time'
              value={endTime}
              onChange={handleEndTimeChange}
              sx={{ display: 'inline', marginLeft: '40px' }}
              size='small'
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button
            variant='contained'
            sx={{ margin: '20px' }}
            onClick={handleUpdateButtonClick}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </Box>
      </Paper>
        </>
     );
}
 
export default WorkTiming;
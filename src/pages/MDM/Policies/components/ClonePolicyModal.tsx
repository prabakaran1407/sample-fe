/** @format */

import { Textfield } from '../../../../components/MUI/mui.index';
import { CreatePolicyData } from '../../../../services/admin/mdm/policies.service';
import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function ClonePolicyModal(props: any) {
  const { getPoliciesList, show, setCloneModel } = props;
  const [name, setName] = useState('');
  const [oldValue, setOldValue] = useState<any>({});
  const [_policyload, setPolicyLoad] = useState(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const cloneOldPolicy = async (e: any) => {
    e.preventDefault();
    setPolicyLoad(true);
    let policy: any = oldValue;
    let finalData: any = {};
    try {
      delete policy[`version`];
      delete policy[`name`];
      finalData = {
        policy_name: name,
        data: policy,
      };
    } catch (error) {}

    let k = await CreatePolicyData(finalData);
    if (k?.statusText === 'OK') {
      alert('Policy Cloned Sucessfully');
    } else {
      alert('Policy Cloned Failed');
    }
    setPolicyLoad(false);
    setCloneModel(false);
    setName('');
    setOldValue({});
    getPoliciesList();
  };
  return (
    <div>
      <Modal
        open={show}
        onClose={() => console.log('')}
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
              pb: 3,
              width: '100%',
            }}
          >
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              Enter a new name to clone the policy
            </Typography>
            <Button onClick={() => setCloneModel(false)} color='primary'>
              <CloseRoundedIcon />
            </Button>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={11}>
              <Box>
                <Textfield
                  required
                  style={{ width: '100%' }}
                  type='text'
                  value={name}
                  // disabled={editData !== ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={(_e) => {
                      setCloneModel(false);
                      setName('');
                      setOldValue({});
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant='contained'
                    color='success'
                    onClick={cloneOldPolicy}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/* <Box sx={style}>
          <form onSubmit={cloneOldPolicy}>
            <div>
              <div className='container-xl  px-10 py-10'>
                <div className='d-flex flex-column modal-header py-2 d-flex justify-content-start border-0'>
                  <h1> </h1>
                  <span className='mt-3 fs-5 fw-bold text-muted'>
                    Enter a new name to clone the policy
                  </span>
                </div>
                <div className='d-flex  justify-content-center gap-5 text-center mb-2 mt-4'>
                  <Textfield
                    required
                    style={{ width: '80%' }}
                    className='form-control form-control-sm'
                    type='text'
                    value={name}
                    disabled={editData !== ''}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='d-flex flex-wrap justify-content-center gap-5 text-center mb-2 mt-4'>
                  <button
                    type='button'
                    className='btn btn-sm btn-danger fw-bolder'
                    style={{ width: '150px ' }}
                    onClick={(e) => {
                      setCloneModel(false);
                      setName('');
                      setOldValue({});
                    }}
                    disabled={policyload}
                  >
                    Cancel
                  </button>

                  <button
                    type='submit'
                    style={{ width: '150px ' }}
                    className='btn btn-sm btn-primary fw-bolder'
                    disabled={policyload}
                  >
                    Save
                  </button>
                </div>
                <div className='d-flex flex-wrap justify-content-center gap-5 text-center mb-2 mt-4'>
                  <h2> {policyload ? 'Cloning Policy in progress' : ''}</h2>
                </div>
              </div>
            </div>
          </form>
        </Box> */}
      </Modal>
    </div>
  );
}

export default ClonePolicyModal;

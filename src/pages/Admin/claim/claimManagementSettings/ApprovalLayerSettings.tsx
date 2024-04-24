/** @format */

import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { NewBrandModal } from '../settings/NewBrandModal';

const dropDownOptions = ['Faso', 'Adidas'];

export const ApprovalLayerSettings: any = () => {
  const [_brandChoice, setBrandChoice] = useState('');
  const [showModal, setShow] = useState(false);
  return (
    <div className='card mt-5 d-flex flex-wrap flex-stack'>
      <div className='w-100 p-5 d-flex flex-column gap-2 flex-lg-row justify-content-between'>
        {/* <div className="d-flex justify-content-start justify-content-lg-center"> */}
        <Autocomplete
          disablePortal
          options={dropDownOptions}
          onChange={(_event, value) => (value ? setBrandChoice(value) : null)}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} size='small' label='Approval Layer' />
          )}
        />
        {/* </div> */}
        <div className='d-flex justify-content-center'>
          <button
            style={{ width: '200px' }}
            className='btn btn-sm btn-primary fw-bolder'
            onClick={(_e) => setShow(true)}
          >
            <AddIcon />
            Add Sub-category
          </button>
        </div>
        <NewBrandModal
          show={showModal}
          id={''}
          handleClose={() => setShow(false)}
        />
      </div>
    </div>
  );
};

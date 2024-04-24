/** @format */

import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

const dropDownOptions = ['Faso', 'Adidas'];

export const SpendingLimit: any = () => {
  const [_brandChoice, setBrandChoice] = useState('');
  return (
    <div className='card mt-5 d-flex flex-wrap flex-stack'>
      <div className='w-100 p-5 d-flex flex-column gap-2 flex-lg-row justify-content-center'>
        <div className='d-flex justify-content-center'>
          <Autocomplete
            disablePortal
            options={dropDownOptions}
            onChange={(_event, value) => (value ? setBrandChoice(value) : null)}
            sx={{ width: 200 }}
            renderInput={(params) => (
              <TextField {...params} size='small' label='Approval Layer' />
            )}
          />
        </div>
      </div>
    </div>
  );
};

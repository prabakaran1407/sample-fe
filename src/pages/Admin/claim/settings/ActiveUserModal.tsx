/** @format */

import React, { useState } from 'react';
import { Alert } from '@mui/material';
// import {
//   deleteBillingParty,
//   deleteBrand,
//   deleteCategory,
//   deleteClaimCategory,
//   deleteClaimDepartment,
//   deleteClaimSubCategory,
//   deleteCustomer,
//   deleteCustomerCategory,
//   deleteCustomerType,
//   deleteGroup,
//   deleteOrderType,
//   deletePreApproval,
//   deleteProduct,
//   deleteState,
//   deleteUser,
//   deleteUserCategory,
//   deleteTypeOfClaim,
//   deleteGrade,
//   deleteModeOfTransport,
//   deleteAmountAllocation,
//   deleteTravelAmountAllocation,
//   deleteRoomRentAllocation,
//   deleteTravelAllocation,
//   deleteOrganization,
//   deleteSplitSubCategory,
// } from '../apis/Claim/DeleteAPI';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {Box,Button} from '@mui/material';
import DeleteApiService from '../apis/Claim/DeleteAPI'
// const YourModalComponent = ({ show, handleClose, option, handleSubmit, success, error }) => {

type Props = {
  show: boolean;
  option: string;
  id: any;
  handleClose: (refreshFlag: boolean) => void;
};

const ActiveUserModal: React.FC<Props> = ({
  show,
  handleClose,
  option,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function deleteFunction(option: any, data: any) {
    if (option === 'brand') {
      await DeleteApiService.deleteBrand(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'category') {
      await DeleteApiService.deleteCategory(data, id)
        .then(() => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'product') {
      await DeleteApiService.deleteProduct(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'product') {
      await DeleteApiService.deleteProduct(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'claimDepartment') {
      await DeleteApiService.deleteClaimDepartment(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'claimCategory') {
      await DeleteApiService.deleteClaimCategory(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'claimSubCategory') {
      await DeleteApiService.deleteClaimSubCategory(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'preApproval') {
      await DeleteApiService.deletePreApproval(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'user') {
      await DeleteApiService.deleteUser(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'user category') {
      await DeleteApiService.deleteUserCategory(id, data)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'user sub category') {
      await DeleteApiService.deleteUserCategory(id, data)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'CustomerCategory') {
      await DeleteApiService.deleteCustomerCategory(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'CustomerType') {
      await DeleteApiService.deleteCustomerType(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Billing Party') {
      await DeleteApiService.deleteBillingParty(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Customer') {
      await DeleteApiService.deleteCustomer(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Group') {
      await DeleteApiService.deleteGroup(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'State') {
      await DeleteApiService.deleteState(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Order Type') {
      await DeleteApiService.deleteOrderType(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Claim Type') {
      await DeleteApiService.deleteTypeOfClaim(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Grade') {
      await DeleteApiService.deleteGrade(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    } else if (option === 'Mode Of Transport') {
      await DeleteApiService.deleteModeOfTransport(data, id)
        .then((_res: any) => {
          handlePostSubmission();
        })
        .catch((err: any) => setError(err.message));
      setLoading(false);
    } else if (option === 'Mode Of Travel') {
      await DeleteApiService.deleteTravelAllocation(data, id)
        .then((_res: any) => {
          handlePostSubmission();
        })
        .catch((err: any) => setError(err.message));
      setLoading(false);
    } else if (option === 'Amount Allocation') {
      await DeleteApiService.deleteAmountAllocation(data, id)
        .then((_res: any) => {
          handlePostSubmission();
        })
        .catch((err: any) => setError(err.message));
      setLoading(false);
    } else if (option === 'Travel Allocation') {
      await DeleteApiService.deleteTravelAmountAllocation(data, id)
        .then((_res: any) => {
          handlePostSubmission();
        })
        .catch((err: any) => setError(err.message));
      setLoading(false);
    } else if (option === 'Room Allocation') {
      await DeleteApiService.deleteRoomRentAllocation(data, id)
        .then((_res: any) => {
          handlePostSubmission();
        })
        .catch((err: any) => setError(err.message));
      setLoading(false);
    } else if (option === 'organization') {
      await DeleteApiService.deleteOrganization(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);
    }else if (option === 'Split Sub Category') {
      await DeleteApiService.deleteSplitSubCategory(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => setError(err.message));
      setLoading(false);

      }else {
      setError('Invalid option');
      setLoading(false);
    }
  }

  function handleSubmit() {
    setLoading(true);
    const data = {
      status: true,
    };
    deleteFunction(option, data);
  }

  function handlePostSubmission() {
    setSuccess(true);
    handleClose(true);
    cleanUp();
  }

  function cleanUp() {
    setError('');
    setSuccess(false);
  }

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle>
        <h3 style={{  textAlign: "center" }}>{option !== 'user' ? 'Activate' : 'Activate'}</h3>
   
        {option !== 'user' && (
          <span className='mt-3 fs-5 fw-bold text-muted'>
            Do you want to activate this {option}?
          </span>
        )}
        {option === 'user' && (
          <span className='mt-3 fs-5 fw-bold text-muted'>
            Do you want to activate this user?
          </span>
        )}
      </DialogTitle>

      <DialogContent>
      <Box sx={{width:"100%",display:"flex",justifyContent:'center',alignItems:"center"}}>
          
          <Button
            onClick={() => {
              setLoading(true);
              handleSubmit();
            }}
            disabled={success || error !== ''}
            variant='contained'
            color='secondary'
            style={{ width: "150px"}}
          >
            {!loading && (
              <span className='indicator-label'>
                {option !== 'user' ? 'Activate' : 'Activate'}
              </span>
            )}
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </Button>

          <Button
            style={{ width: '150px',marginLeft:30 }}
            variant='contained'
            color='primary'
            onClick={() => {
              setSuccess(false);
              success ? handleClose(true) : handleClose(false);
            }}
          >
            {!success ? 'Cancel' : 'Close'}
          </Button>
        </Box>
      </DialogContent>

      {error && (
        <Alert variant='filled' severity='error'>
          <strong>{error}</strong>
        </Alert>
      )}
      {success && (
        <Alert variant='filled' severity='success'>
          <strong>Successfully activated the data</strong>
        </Alert>
      )}
    </Dialog>
  );
};

export { ActiveUserModal };

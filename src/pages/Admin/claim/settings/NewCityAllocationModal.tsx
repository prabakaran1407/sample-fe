/** @format */

import React, { useState, useEffect } from 'react';
// import { Modal } from "react-bootstrap-v5";
import * as _ from 'lodash';
// import {
//   createGrade,
//   updateGrade,
//   getOneGrade,
//   getGrades,
// } from '../apis/Claim/GradeSelection';
// import { getAllClass } from '../apis/Claim/GradeSelection';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { SecondaryLoadScreen } from '../loader/SecondaryLoadScreen';
import { useSelector } from 'react-redux';
import { CloseRounded } from '@mui/icons-material';
import GradeService from '../../claim/apis/Claim/GradeSelection'

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

// const NewCityAllocationModal: React.FC<Props> = (props: Props) => {
//   const { show, handleClose, id }: Props = props;
//   return (
//     <Dialog
//       open={show}
//       onClose={() => handleClose(false)}
//       aria-labelledby="form-dialog-title"
//       maxWidth="md"
//       fullWidth
//     >
//       <DialogContent>
//         <FormField {...props} />
//       </DialogContent>
//     </Dialog>
//   );
// };

const NewCityAllocationModal: React.FC<Props> = (props: Props) => {
  const { show, handleClose }: Props = props;
  return (
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
        <FormField {...props} />
      </Box>
    </Modal>
  );
};
const FormField = ({ show, handleClose, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [success, setSuccess] = useState(false);
  const [primaryLoad, setPrimaryLoad] = useState(true);
  const [className, setClassName] = useState({ label: '', id: '' });
  const [optionsClass, setOptionsClass] = useState([]);
  const [_category, setCategory] = useState({ label: '', id: '' });
  const [name, setName] = useState('');

  const [checked, setChecked] = useState(true);
  const user = useSelector(({ auth }) => auth);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      class: className?.id,
      // city: name.trim().toUpperCase(),
      city: name.trim().charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      status: checked,
      organization_id: user.data.userRecord?.organization_id,
    };

    if (id) {
      await GradeService.updateGrade(data, id)
        .then((_res) => {
          handleClose(true);
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    } else {
      await GradeService.getGrades(data)
        .then(async (res) => {
          if (res.data.length === 0) {
            await GradeService.createGrade(data)
              .then((_res) => {
                handlePostSubmission();
                setTimeout(() => {
                  handleClose(true);
                }, 2000);
              })
              .catch((err) => {
                setError(err.message);
              });
            setLoading(false);
          } else {
            setError('Already Allocated');
          }
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    }
    // {
    //   await createGrade(data)
    //     .then((res) => {
    //       handlePostSubmission();
    //       setTimeout(() => {
    //         handleClose(true);
    //       }, 2000);
    //     })
    //     .catch((err) => {
    //       setError(err.message);
    //     });
    //   setLoading(false);
    // }
  }

  function handlePostSubmission() {
    setSuccess(true);
    cleanUp();
  }

  function cleanUp() {
    setError('');
  }

  async function getData() {
    await GradeService.getAllClass(true).then((res) => {
      let tempData = res.data;
      let classOption = _.reduce(
        tempData,
        (result, value): any => {
          let temp: Array<any> = result;
          temp.push({
            label: value.className,
            id: value.id,
            value,
          });
          return temp;
        },
        []
      );
      setOptionsClass(classOption);
    });

    if (id) {
      await GradeService.getOneGrade(id)
        .then((res) => {
          const data = res.data;
          // setGrade({ ...grade, label: data?.class, id: "1" });
          setClassName({
            label: data?.class.className,
            id: data?.class.id,
          });
          setName(data?.city);
          setChecked(data?.status);
        })
        .catch((err) => setError(err.message));
    }
    setPrimaryLoad(false);
  }

  useEffect(() => {
    if (!show) return;
    setPrimaryLoad(true);
    getData();
  }, [show, id]);

  return (
    
    <>
      {' '}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className='container-xl px-10 py-10'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            pb={4}
          >
            <Typography variant='h5' sx={{ fontWeight: '600' }}>
              {!id ? 'New' : 'Modify'} Grade
            </Typography>

            <IconButton
              onClick={(_e) => {
                cleanUp();
                setCategory({ id: '', label: '' });
                success ? handleClose(true) : handleClose(false);
                setSuccess(false);
              }}
            >
              <CloseRounded />
            </IconButton>
          </Box>

          {!primaryLoad ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'start',
              }}
            >
              <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                    display: "flex",
                    justifyContent: "start",
                    
                  }}
                >
                  Grade <span style={{ color: "red" }}></span>
                </InputLabel>
              <Autocomplete
                disablePortal
                options={optionsClass}
                defaultValue={!id ? { label: '', id: '' } : className}
                getOptionLabel={(option: any) => {
                  return option.label;
                }}
                onChange={(_event, value: any) => {
                  setClassName({
                    ...className,
                    label: value?.label,
                    id: value?.id,
                  });
                }}
                sx={{ width: 320, mb: 3 }}
                renderInput={(params) => (
                  <TextField {...params} size='small' placeholder='Grade' />
                )}
              />
<InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  City <span style={{ color: "red" }}>*</span>
                </InputLabel>
              <TextField
                
               
                size='small'
                autoComplete='off'
                value={name?.trimStart()}
                autoFocus
                
                onChange={(e) => {
                  setName(e.target.value.toUpperCase());
                  if (e.target.value !== '') {
                    setError('');
                  }
                }}
                sx={{ width: '320px', mb: 3 }}
              />
              {/* <FormControlLabel
                label='Active Grade'
                onChange={(_event, value) => setChecked(value)}
                control={<Switch checked={checked} />}
              /> */}
            </Box>
          ) : (
            <div className='mt-10 mb-10'>
              <SecondaryLoadScreen />
            </div>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Button
              type='submit'
              variant='contained'
              disabled={!id ? loading || name === '' : success}
            >
              {!loading && <span className='indicator-label'>Save</span>}
              {loading && (
                <span
                  className='indicator-progress'
                  style={{ display: 'block' }}
                >
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </Button>
          </Box>
        </div>
      </form>
      {error && (
        <Alert variant='filled' severity='error'>
          <strong>{error}</strong>
        </Alert>
      )}
      {success && (
        <Alert variant='filled' severity='success'>
          <strong>Successfully submitted the data</strong>
        </Alert>
      )}
    </>
  );
};
export { NewCityAllocationModal };

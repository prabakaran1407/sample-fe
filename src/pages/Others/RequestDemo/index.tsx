/**
 * eslint-disable no-empty-pattern
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import RequestDemoService from '../../../services/requestdemoservice/requestdemo.service';
import _ from 'lodash';
// **************** Component
import { TextField_v2, ButtonV1 } from '../../../components/MUI/mui.index';
import { COLORS } from '../../../utils/globals.ts';

// ************** MUI
import {
  Box,
  Grid,
  InputLabel,
  Theme,
  Typography,
  useMediaQuery,
  Button,
  CircularProgress,
  TextField,
  Autocomplete,
} from '@mui/material';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import { ArrowBackRounded, ErrorTwoTone } from '@mui/icons-material';

// *************** Router
import { useNavigate } from 'react-router-dom';

// ************* const
import { AxiosResponse } from 'axios';
import { APP_ROUTES } from '../../../data/AppRoutes';
import Logo from '../../../assets/png/logo.png';
import vector from '../../../assets/svg/Vector.svg';
import Demo from '../../../assets/svg/Demo.svg';
import GoogleMapsAddress from '../../../components/MUI/AddressAutoComplete/AddressAutoComplete.tsx';

interface IRequestDemo {
  organizationName: string;
  organizationType: string;
  contactPerson: string;
  contactNo: string;
  email: string;
  address: string;
  notes: string;
  organizationLabel: string;
  countryId: string;
  countryName: string;
}

interface ApiResponse {
  id: string;
  name: string;
}

export default function RequestDemo() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>();
  const [formData, setFormData] = useState<IRequestDemo>({
    organizationName: '',
    organizationType: '',
    organizationLabel: '',
    contactPerson: '',
    contactNo: '',
    email: '',
    address: '',
    notes: '',
    countryId: '',
    countryName: '',
  });

  console.log('formData', formData);

  const [formErrors, setFormErrors] = useState<Partial<IRequestDemo>>({});

  const [organizationTypeOptions, setOrganizationTypeOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [countries, setCountries] = useState<
    { label: string; phone: string; code: string }[]
  >([]);

  const handleInputChange = (field?: any, value?: string) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const getIndustryType = async () => {
    try {
      const response = await RequestDemoService.getIndustryType();
      if (!response) {
        throw new Error('No data received');
      }
      const responseData = (response as AxiosResponse).data
        .data as ApiResponse[];
      const transformedOptions = responseData?.map((option: ApiResponse) => ({
        label: option.name,
        value: option.id,
      }));
      setOrganizationTypeOptions(transformedOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getAllCountries = async () => {
    try {
      const response = await RequestDemoService.getAllCountries();
      if (!response) {
        throw new Error('No data received');
      }

      setCountries(response?.data?.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getIndustryType();
    getAllCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValidInput = (value: any, type?: any, len?: any) => {
    function extraValidation(val: any) {
      if (type === 'number') {
        return /^\d+$/.test(val) && (len ? val?.length === len : true);
      }
      return Boolean(val);
    }
    if (typeof value === 'string') {
      return Boolean(extraValidation(value.trim()));
    } else {
      return Boolean(value);
    }
  };

  const handleOrgSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<IRequestDemo> = {};

    if (!isValidInput(formData.organizationName)) {
      errors.organizationName = 'Organization name is required';
    }
    if (!isValidInput(formData.organizationType)) {
      errors.organizationType = 'Organization type is required';
    }
    if (!isValidInput(formData.address)) {
      errors.address = 'Address is required';
    }
    if (!isValidInput(formData.countryId)) {
      errors.countryId = 'Country is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setStep(2);
    }
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<IRequestDemo> = {};

    if (!isValidInput(formData.contactPerson)) {
      errors.contactPerson = 'Name is required';
    }
    const isValidEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    };
    if (!isValidInput(formData.email)) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!isValidInput(formData?.contactNo, 'number', 10)) {
      errors.contactNo = 'Invalid number';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    setIsLoading(true);

    const payload = {
      ...formData,
      contactStatus: 'OPEN',
      remarks: '',
    };

    try {
      const response: any = await RequestDemoService.postUserData(payload);
      console.log('response data', response);
      if (response.status === 200) {
        console.log('working', response.status);
        setStep(3);
      } else {
        setStep(4);
      }
    } catch (error: any) {
      setResponseData(error.response.data);
      setStep(4);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (label: any) => {
    let isError = false;
    if (_.isEmpty(formErrors)) {
      isError = false;
    } else {
      const includesKey = _.has(formErrors, label);
      if (includesKey) {
        let getKey = _.get(formErrors, label);
        if (getKey !== '') {
          isError = true;
        }
      }
    }
    return isError;
  };

  return (
    <>
      <Box
        sx={{
          height: 'fit-content',
          minHeight: '100vh',
          backgroundImage: `url(${vector})`,
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundAttachment: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            height: 'fit-content',
            minHeight: '85vh',
            width: '80%',
            background: '#fff',
            borderRadius: 3,
            boxShadow: '0 0.3rem 1rem rgba(0, 0, 0, 0.25)',
            p: 1,
          }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    m: 1,
                  }}>
                  <img
                    src={Logo}
                    alt='logo'
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                  <Typography
                    variant='h6'
                    noWrap
                    component='div'
                    sx={{
                      fontSize: 22,
                      fontWeight: '600',
                      fontFamily: 'Poppins',
                      color: '#181C32',
                      textAlign: 'center',
                    }}
                    pl={1}>
                    Sales10X
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: isMobile ? 'none' : 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 3,
                    width: '100%',
                  }}>
                  <img src={Demo} width='75%' />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  width: '100%',
                }}>
                {step === 1 && (
                  <form
                    onSubmit={handleOrgSubmit}
                    style={{ width: isMobile ? '90%' : '70%' }}>
                    <Typography
                      style={{
                        color: '#181C32',
                        fontSize: '22px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      mb={1}>
                      Organization Details
                    </Typography>
                    <Typography
                      style={{
                        color: '#181C32',
                        fontSize: '16px',
                        fontWeight: '500',
                        // display: isMobile ? "none" : "",
                      }}
                      mb={3}>
                      Please enter your organization details!
                    </Typography>
                    <Box pb={2}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Organization Name
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      <TextField_v2
                        fullWidth
                        type='text'
                        name='orgname'
                        placeholder='Enter your organization name'
                        value={formData.organizationName}
                        onChange={(e) =>
                          handleInputChange('organizationName', e.target.value)
                        }
                        sx={{
                          background: '#F5F8FA',
                          borderRadius: 1,
                          border: handleError('organizationName')
                            ? '2px solid red'
                            : 'none',
                        }}
                        inputProps={{
                          autocomplete: 'off',
                        }}
                      />
                      {formErrors.organizationName && (
                        <Typography variant='body2' color='error'>
                          {formErrors.organizationName}
                        </Typography>
                      )}
                    </Box>
                    <Box pb={2}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Organization Type
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      <Autocomplete
                        options={organizationTypeOptions}
                        value={formData.organizationLabel || null}
                        onChange={(_e: any, event: any) => {
                          setFormData({
                            ...formData,
                            organizationType: event.value,
                            organizationLabel: event.label,
                          });
                          handleInputChange('organizationType', event.value);
                        }}
                        inputValue={
                          formData?.organizationLabel === ''
                            ? ''
                            : formData?.organizationLabel
                        }
                        onInputChange={(_event, newInputValue) => {
                          setFormData({
                            ...formData,
                            organizationType: '',
                            organizationLabel: newInputValue,
                          });
                        }}
                        disablePortal
                        id='combo-box-demo'
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            padding: '0',
                          },
                          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                            {
                              border: 'none',
                            },
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder='Select your organization type'
                            sx={{
                              background: '#F5F8FA',
                              borderRadius: 1,
                              border: handleError('organizationType')
                                ? '2px solid red'
                                : 'none',
                              label: {
                                color: '#979797',
                                fontSize: '15px',
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                        size='small'
                      />
                      {formErrors.organizationType && (
                        <Typography variant='body2' color='error'>
                          {formErrors.organizationType}
                        </Typography>
                      )}
                    </Box>
                    <Box pb={2}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Country
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      <Autocomplete
                        size='small'
                        options={countries}
                        value={formData?.countryName || null}
                        onChange={(_e: any, event: any) => {
                          console.log('event123', event);
                          setFormData({
                            ...formData,
                            countryId: event._id,
                            countryName: event.label,
                          });
                          handleInputChange('countryId', event._id);
                        }}
                        // disablePortal
                        id='country-select-demo'
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                            padding: '0',
                          },
                          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                            {
                              border: 'none',
                            },
                        }}
                        inputValue={
                          formData?.countryName === ''
                            ? ''
                            : formData?.countryName
                        }
                        onInputChange={(_event, newInputValue) => {
                          setFormData({
                            ...formData,
                            countryId: '',
                            countryName: newInputValue,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder='Select Country'
                            sx={{
                              background: '#F5F8FA',
                              borderRadius: 1,
                              border: handleError('countryId')
                                ? '2px solid red'
                                : 'none',
                              label: {
                                color: '#979797',
                                fontSize: '15px',
                              },
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // autoComplete='off'
                            // InputProps={{
                            //   endAdornment: (
                            //     <>
                            //       {formData?.countryName && (
                            //         <ClearIcon
                            //           style={{ cursor: 'pointer' }}
                            //           onClick={() => {
                            //             setFormData({
                            //               ...formData,
                            //               countryId: '',
                            //               countryName: '',
                            //             });
                            //           }}
                            //         />
                            //       )}
                            //       {params.InputProps.endAdornment}
                            //     </>
                            //   ),
                            // }}
                          />
                        )}
                        renderOption={(props, option) => (
                          <Box
                            component='li'
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...props}>
                            <img
                              loading='lazy'
                              width='10'
                              srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
                              alt=''
                            />
                            {option?.label} 
                          </Box>
                        )}
                      />
                      {formErrors.countryId && (
                        <Typography variant='body2' color='error'>
                          {formErrors.countryId}
                        </Typography>
                      )}
                    </Box>
                    <Box pb={4}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Address
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      {/* <TextField_v2
                        fullWidth
                        name='address'
                        type='text'
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange('address', e.target.value)
                        }
                        placeholder='Enter your address'
                        sx={{
                          background: '#F5F8FA',
                          border: handleError('address')
                            ? '2px solid red'
                            : 'none',
                          borderRadius: 1,
                        }}
                      />
                      {formErrors.address && (
                        <Typography variant='body2' color='error'>
                          {formErrors.address}
                        </Typography>
                      )} */}
                      <GoogleMapsAddress
                        formErrors={formErrors}
                        setFormErrors={setFormErrors}
                        setFormData={setFormData}
                        formData={formData}
                      />
                      {formErrors.address && (
                        <Typography variant='body2' color='error'>
                          {formErrors.address}
                        </Typography>
                      )}
                    </Box>

                    <ButtonV1
                      type='submit'
                      style={{
                        background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                        borderRadius: '7px',
                        border: '1px #A465FF solid',
                        color: '#ffff',
                        fontSize: 16,
                        fontWeight: '600',
                        height: 40,
                        textTransform: 'none',
                      }}
                      fullWidth
                      disabled={isLoading ? true : false}>
                      {isLoading ? <div className='spinner'></div> : 'Next'}
                    </ButtonV1>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Button
                        startIcon={<ArrowBackRounded />}
                        sx={{ color: COLORS.secondary, fontSize: 12 }}
                        onClick={() => {
                          navigate(APP_ROUTES?.SIGN_IN?.pathName);
                        }}>
                        Back to Login
                      </Button>
                    </Box>
                  </form>
                )}
                {step === 2 && (
                  <form
                    onSubmit={handleCustomerSubmit}
                    style={{ width: isMobile ? '90%' : '70%' }}>
                    <Typography
                      style={{
                        color: '#181C32',
                        fontSize: '22px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      mb={1}>
                      Contact Details
                    </Typography>
                    <Typography
                      style={{
                        color: '#181C32',
                        fontSize: '16px',
                        fontWeight: '500',
                      }}
                      mb={2}>
                      Please enter your contact details!
                    </Typography>
                    <Box pb={2}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Name
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      <TextField_v2
                        fullWidth
                        type='text'
                        name='name'
                        placeholder='Enter your name'
                        value={formData.contactPerson}
                        onChange={(e) =>
                          handleInputChange('contactPerson', e.target.value)
                        }
                        sx={{
                          background: '#F5F8FA',
                          borderRadius: 1,
                          border: handleError('contactPerson')
                            ? '2px solid red'
                            : 'none',
                        }}
                      />
                      {formErrors.contactPerson && (
                        <Typography variant='body2' color='error'>
                          {formErrors.contactPerson}
                        </Typography>
                      )}
                    </Box>
                    <Box pb={2}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Email
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      <TextField_v2
                        fullWidth
                        type='text'
                        name='email'
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        sx={{
                          background: '#F5F8FA',
                          borderRadius: 1,
                          border: handleError('email')
                            ? '2px solid red'
                            : 'none',
                        }}
                      />
                      {formErrors.email && (
                        <Typography variant='body2' color='error'>
                          {formErrors.email}
                        </Typography>
                      )}
                    </Box>
                    <Box pb={2}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Mobile Number
                        <span style={{ color: 'red', fontSize: '20px' }}>
                          {' '}
                          *
                        </span>
                      </InputLabel>
                      <TextField_v2
                        fullWidth
                        name='contactNo'
                        type='tel'
                        inputMode='numeric'
                        placeholder='Enter your mobile number'
                        value={formData.contactNo}
                        onChange={(e) => {
                          const inputVal = e.target.value.replace(/\D/g, '');
                          handleInputChange('contactNo', inputVal);
                        }}
                        sx={{
                          background: '#F5F8FA',
                          border: handleError('contactNo')
                            ? '2px solid red'
                            : 'none',
                          borderRadius: 1,
                        }}
                      />
                      {formErrors.contactNo && (
                        <Typography variant='body2' color='error'>
                          {formErrors.contactNo}
                        </Typography>
                      )}
                    </Box>
                    <Box pb={4}>
                      <InputLabel
                        shrink
                        sx={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#181C32',
                        }}>
                        Description
                        <span style={{ color: '#969696', fontWeight: '400' }}>
                          {' '}
                          (Optional)
                        </span>
                      </InputLabel>
                      <TextField_v2
                        fullWidth
                        placeholder='Enter your description'
                        value={formData.notes}
                        onChange={(e) =>
                          handleInputChange('notes', e.target.value)
                        }
                        sx={{
                          background: '#F5F8FA',
                          border: 'none',
                          borderRadius: 1,
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <ButtonV1
                        style={{
                          borderRadius: '7px',
                          border: `1px ${COLORS.secondary} solid`,
                          background: '#fff',
                          color: COLORS.secondary,
                          fontSize: 16,
                          fontWeight: '600',
                          width: '48%',
                          height: 40,
                        }}
                        onClick={() => setStep(1)}>
                        Back
                      </ButtonV1>

                      <ButtonV1
                        type='submit'
                        style={{
                          background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
                          borderRadius: '7px',
                          border: '1px #A465FF solid',
                          color: '#ffff',
                          fontSize: 16,
                          fontWeight: '600',
                          width: '48%',
                          height: 40,
                        }}
                        disabled={isLoading ? true : false}>
                        {isLoading ? 'Loading...' : 'Submit'}
                      </ButtonV1>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Button
                        startIcon={<ArrowBackRounded />}
                        sx={{ color: '#68409C', fontSize: 12 }}
                        onClick={() => {
                          navigate(APP_ROUTES?.SIGN_IN?.pathName);
                        }}>
                        Back to Login
                      </Button>
                    </Box>
                  </form>
                )}
                {step === 3 && (
                  <form style={{ width: isMobile ? '90%' : '70%' }}>
                    {!isLoading ? (
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <MarkEmailReadTwoToneIcon
                            style={{
                              fontSize: '96px',
                              color: COLORS.secondary,
                            }}
                          />
                        </Box>
                        <Typography
                          style={{
                            color: COLORS.secondary,
                            fontSize: '22px',
                            fontWeight: '600',
                            textAlign: 'center',
                          }}
                          my={1}>
                          Request Submitted Successfull
                        </Typography>
                        <Typography
                          style={{
                            color: COLORS.secondary,
                            fontSize: '14px',
                            textAlign: 'center',
                          }}>
                          Thank you for requesting a demo! We have received your
                          information. Our team will get in touch with you
                          shortly.
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          pt={6}>
                          <Button
                            startIcon={<ArrowBackRounded />}
                            sx={{ color: COLORS.secondary, fontSize: 12 }}
                            onClick={() => {
                              navigate(APP_ROUTES?.SIGN_IN?.pathName);
                            }}>
                            Back to Login
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CircularProgress sx={{ color: COLORS.secondary }} />
                      </Box>
                    )}
                  </form>
                )}
                {step === 4 && (
                  <form style={{ width: isMobile ? '90%' : '70%' }}>
                    {!isLoading ? (
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ErrorTwoTone
                            style={{ fontSize: '96px', color: '#FF0000' }}
                          />
                        </Box>
                        <Typography
                          style={{
                            color: '#FF0000',
                            fontSize: '22px',
                            fontWeight: '600',
                            textAlign: 'center',
                          }}
                          my={1}>
                          Request Submission Failed!
                        </Typography>
                        {responseData?.message ? (
                          <Typography
                            style={{
                              color: '#FF0000',
                              fontSize: '16px',
                              fontWeight: '600',
                              textAlign: 'center',
                            }}
                            my={1}>
                            {responseData?.message}
                          </Typography>
                        ) : null}
                        <Typography
                          style={{
                            color: '#FF0000',
                            fontSize: '14px',
                            textAlign: 'center',
                          }}>
                          Try again after some time
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          pt={6}>
                          <Button
                            startIcon={<ArrowBackRounded />}
                            sx={{ color: COLORS.secondary, fontSize: 12 }}
                            onClick={() => {
                              navigate(APP_ROUTES?.SIGN_IN?.pathName);
                            }}>
                            Back to Login
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CircularProgress sx={{ color: COLORS.secondary }} />
                      </Box>
                    )}
                  </form>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

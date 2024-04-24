import { useLocation } from 'react-router-dom';

import { Paper, Typography, Grid, Stack } from '@mui/material';
import { ContainerBoxV2 } from '../../../components/MUI/mui.index';
import { CustomDivier } from '../../../components/APP/app.index';

const CollectionView = () => {
  const location = useLocation();
  const { collection } = location.state;
  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack direction='row' justifyContent={'space-between'}>
              <Typography variant='h6' sx={{ fontWeight: '600' }}>
                View collections
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Customer Name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{collection?.customer?.customerName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Contact Number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{collection?.customer?.contactNumber}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Billing party:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {' '}
                  {collection?.billing_party?.billingPartyName !== null &&
                  collection?.billing_party?.billingPartyName !== undefined &&
                  collection?.billing_party?.billingPartyName !== ''
                    ? collection.billing_party?.billingPartyName
                    : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Group name:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {' '}
                  {collection?.group?.groupName !== null &&
                  collection?.group?.groupName !== undefined &&
                  collection?.group?.groupName !== ''
                    ? collection.group?.groupName
                    : 'N/A'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Collection type:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{collection?.collection_type}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Amount:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{collection?.amount}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {collection?.collection_type?.toUpperCase() === 'CHEQUE' ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Bank name:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {collection?.bank_name !== null &&
                    collection?.bank_name !== undefined &&
                    collection?.bank_name !== ''
                      ? collection.bank_name
                      : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {collection?.collection_type?.toUpperCase() === 'CHEQUE' ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Branch name:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {' '}
                    {collection?.branch !== null &&
                    collection?.branch !== undefined &&
                    collection?.branch !== ''
                      ? collection.branch
                      : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {collection?.collection_type?.toUpperCase() === 'CHEQUE' ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Cheque number:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {' '}
                    {collection?.cheque_no !== null &&
                    collection?.cheque_no !== undefined &&
                    collection?.cheque_no !== ''
                      ? collection.cheque_no
                      : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {collection?.collection_type?.toUpperCase() === 'CHEQUE' ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Cheque date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {collection?.cheque_date !== null &&
                    collection?.cheque_date !== undefined &&
                    collection?.cheque_date !== '' &&
                    !isNaN(collection.cheque_date)
                      ? new Date(
                          parseInt(collection.cheque_date)
                        ).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {collection?.collection_type?.toUpperCase() === 'BANK TRANSFER' ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Transfer date:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    {collection?.transfer_date !== null &&
                    collection?.transfer_date !== undefined &&
                    collection?.transfer_date !== '' &&
                    !isNaN(collection.transfer_date)
                      ? new Date(
                          parseInt(collection.transfer_date)
                        ).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          {collection?.collection_type?.toUpperCase() === 'BANK TRANSFER' ? (
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant='subtitle1'
                    style={{ fontWeight: 'bold', color: '#333' }}
                  >
                    Transfer ID:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>{collection?.transfer_id}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant='subtitle1'
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  Receipt number:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{collection?.receipt_no || 'N/A'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CollectionView;

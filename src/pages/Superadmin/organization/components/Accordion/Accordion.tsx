import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Paper, Box, Typography, Grid, Stack } from '@mui/material';
import moment from 'moment';

import GetHeaderParams from '../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx';
import CustomCellRenderValues from '../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx';
import { ColDef } from '@ag-grid-community/core/dist/esm/es6/entities/colDef';
import AgDataGrid from '../../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx';
import ApproveBillingModal from './Modal/ApproveBillingModal.tsx';

export default function AccordionUsage(props: any) {
  const { defaultExpands, data, index } = props;
  const [open, setOpen] = React.useState<any>(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const columnDefs: ColDef[] = [
    {
      headerName: 'Service Name',
      field: 'organizationName',
      filter: true,
      width: 500,
      cellStyle: { textTransform: 'capitalize' },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'parentmodules[0].moduleName',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Total No Of Users',
      field: 'numberOfUsers',
      filter: true,
      width: 500,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'numberOfUsers',
      },
      ...GetHeaderParams(),
    },
    {
      headerName: 'Cost / Day',
      field: 'cost',
      filter: true,
      width: 400,
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: 'cost',
      },
      ...GetHeaderParams(),
    },
  ];
  console.log(data, 'data');
  const handleDownload = () => {
    window.open(data?.isInvoiceCopy, '_blank');
  };
  return (
    <div>
      <Paper elevation={2}>
        <Accordion defaultExpanded={defaultExpands}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <Stack>
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                {`Billing ${index + 1}`}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ pb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                        Billing Type
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 14 }}>
                        {data?.billingType}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                        Service Start Date
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(data?.serviceStartDate).format('DD/MM/YYYY')}{' '}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                        Service End Date
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 14 }}>
                        {moment(data?.serviceEndDate).format('DD/MM/YYYY')}{' '}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
                        Total Cost
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 14 }}>
                        {data?.totalCost}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                        Services Count
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 14 }}>
                        {data?.billingdetailsitems.length}{' '}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                        Status
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={5} md={5}>
                      <Box
                        sx={{
                          color:
                            data?.status === 'OPEN'
                              ? '#FF69B4'
                              : data?.status === 'PENDING'
                              ? '#f39c12'
                              : data?.status === 'APPROVED'
                              ? '#27ae60'
                              : '',
                          background:
                            data?.status === 'PENDING'
                              ? '#FFEDD0'
                              : data?.status === 'APPROVED'
                              ? '#CDFFE2'
                              : '',
                          fontSize: 12,
                          fontWeight: '500',
                          height: '28px',
                          width: '120px',
                          borderRadius: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: '700',
                            fontSize: 14,
                            textTransform: 'capitalize',
                          }}
                          pl={1}
                        >
                          {data?.status}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={5}>
                      <Typography sx={{ fontSize: 16, fontWeight: '500' }}>
                        Invoice
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography sx={{ fontSize: 14, fontWeight: '500' }}>
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='body2' align='center'>
                        {data?.isInvoiceCopy ? (
                          <Button
                            fullWidth
                            onClick={handleDownload}
                            variant='contained'
                            color='primary'
                          >
                            Download Invoice
                          </Button>
                        ) : (
                          <Typography variant='body2' sx={{ ml: -6 }}>
                            No invoice found
                          </Typography>
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {data?.billingType === 'PAID' ? (
                <Box sx={{ mt: 3, mb: 1 }}>
                  <Grid item xs={10}>
                    <AgDataGrid
                      rowData={
                        data?.billingdetailsitems
                          ? data?.billingdetailsitems
                          : []
                      }
                      columnDefs={columnDefs}
                      TableHeight={30}
                      rowHeight={40}
                      handleCellClick={undefined}
                      loading={false}
                      disableClickSelectionRenderers={false}
                      noDataTxt='No Records Found'
                    />
                  </Grid>
                </Box>
              ) : null}
            </Box>
            {data?.billingType === 'PAID' && data?.status !== 'APPROVED' ? (
              // {'}
              <Box sx={{ textAlign: 'end' }}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleOpen}
                >
                  Approve Billing
                </Button>
              </Box>
            ) : null}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <ApproveBillingModal
        openModal={open}
        data={data}
        handleClose={handleClose}
      />
    </div>
  );
}

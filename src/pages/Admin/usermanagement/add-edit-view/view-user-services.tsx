/** @format */
import { useEffect, useState } from 'react';

import {
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Grid,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../../data/AppRoutes';

export default function ViewUserServices(props: any) {
  const { services } = props;
  const [listService, setListService] = useState<any[]>([]);
  useEffect(() => {
    setListService([...services]);
  }, []);
  return (
    <>
      {services?.length > 0 ? (
        services?.map((section: any, index: any) => (
          <Grid container key={index} sx={{maxHeight:"20px"}}>
            <Accordion
              sx={{
                width: '100%',
                marginTop: index > 0 ? '20px' : 0,
                height: 'auto',
              }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}-content`}
                id={`panel${index + 1}-header`}>
                <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                  {`Bill No ${listService?.length - index}`}
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Box component={'div'}>
                  <Box style={{ marginBottom: '10px' }}>
                    <Typography variant='subtitle2'>{`service will expire on this date, ${section?.billingdetails?.expireDate}`}</Typography>
                  </Box>
                  {section.parentmodules.map((item: any, _idx: any) => (
                    <Box>{item?.moduleName}</Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))
      ) : (
        <Box
          component={'div'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
            No services are assigned for this user,{' '}
            <Link
              style={{
                textDecoration: 'none',
              }}
              to={APP_ROUTES?.ADMIN?.SERVICESHOP?.pathName}>
              click to assign
            </Link>
          </Typography>
        </Box>
      )}
    </>
  );
}

import * as React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

// type severityType = 'error' | 'warning' | 'info' | 'success';
interface Iprops {
  severity: any;
  handleClose?: any;
  autoHideDuration?: number;
  open: boolean;
  position?: SnackbarOrigin;
  messege: string;
}
export default function AdvanceSnackbars(props: Iprops) {
  const { messege, autoHideDuration, handleClose, severity, open, position } =
    props;
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (
  //     event?: React.SyntheticEvent | Event,
  //     reason?: string
  //   ) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  return (
    <Snackbar
      open={open}
      anchorOrigin={
        position ? position : { vertical: 'bottom', horizontal: 'center' }
      }
      autoHideDuration={autoHideDuration ? autoHideDuration : 3000}
      onClose={handleClose ? handleClose : () => {}}
    >
      <Alert
        onClose={handleClose ? handleClose : () => {}}
        severity={severity ? severity : 'info'}
        sx={{ width: '100%' }}
      >
        {messege}
      </Alert>
    </Snackbar>
    //   <Alert severity='error'>This is an error message!</Alert>
    //   <Alert severity='warning'>This is a warning message!</Alert>
    //   <Alert severity='info'>This is an information message!</Alert>
    //   <Alert severity='success'>This is a success message!</Alert>
  );
}

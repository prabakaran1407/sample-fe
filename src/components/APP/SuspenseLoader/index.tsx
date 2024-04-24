/** @format */

import {CircularProgress, Modal} from '@mui/material';
import { FC } from 'react';
import { PropagateLoader } from "react-spinners";
import {} from '../../../theme/AppTheme'

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress size={80} thickness={5} />
    {message && (
      <p style={{ fontSize: '20px', marginTop: '10px' }}>{message}</p>
    )}
  </div>
);

interface IBackDropLoader {
  message?: string
  loading: boolean
}

export const BackDropLoader: FC<IBackDropLoader> = ({
  loading,
  message,
}: IBackDropLoader) => {
  return (
    <Modal
      open={loading}
      onClose={() => {
        //
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ width: "100%", height: "100%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={80} thickness={5} />
        {message && (
          <p style={{ fontSize: "20px", marginTop: "10px" }}>{message}</p>
        )}
      </div>
    </Modal>
  );
};


export const BackDropLoaderV2: FC<any> = ({ loading }: any) => {
  return (
    <Modal
      open={loading}
      onClose={() => {
        //
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(219,225,227, 0.2)",
      }}
      hideBackdrop={true}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <PropagateLoader color="rgba(130, 41, 166, 10)" size={20} />
      </div>
    </Modal>
  );
};
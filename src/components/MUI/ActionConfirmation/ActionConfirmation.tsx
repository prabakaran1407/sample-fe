/** @format */

import { FC } from "react";

import {
  Box,
  CircularProgress,
  Modal,
  ModalProps,
  Typography,
} from "@mui/material";

import { ButtonV1 } from "../mui.index";
import { COLORS } from "../../../utils/globals.ts";

// ******** Icons
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
// import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

interface IActionConfirmation extends ModalProps {
  confirmationType?: string;
  message?: string;
  title?: string;
  confirmAction: (value?: Record<string, any> | any) => void;
  onClose: () => void;
  loading?: boolean;
  boxWidth?: number | string;
}

export const ActionConfirmation: FC<IActionConfirmation> = ({
  open,
  onClose,
  message,
  title,
  confirmAction,
  loading,
}: IActionConfirmation) => {
  return (
    <Modal open={open} onClose={undefined}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 3,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: "600" }}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ textAlign: "center", fontSize: 15, mt: 1 }}
        >
          {message}
        </Typography>
        <Box
          sx={{
            mt: 2,
            justifyContent: "space-evenly",
            display: "flex",
            width: "100%",
          }}
        >
          <ButtonV1
            variant="outlined"
            color="error"
            onClick={onClose}
            fullWidth
            style={{ width: "40%", fontSize: 16 }}
            disabled={loading}
          >
            Cancel
          </ButtonV1>
          <ButtonV1
            variant="contained"
            onClick={confirmAction}
            fullWidth
            style={{
              width: "40%",
              fontSize: 16,
              background: !loading ? COLORS.primary : "#dcdcdc",
            }}
            disabled={loading}
          >
            {!loading ? (
              "Confirm"
            ) : (
              <CircularProgress size={24} sx={{ color: "#a9a9a9" }} />
            )}
          </ButtonV1>
        </Box>
      </Box>
    </Modal>
  );
};

// export const HierarchyActionConfirmation

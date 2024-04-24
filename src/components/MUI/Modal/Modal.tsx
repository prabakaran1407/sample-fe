import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  ModalProps,
  Grid,
} from "@mui/material";
import { ActionIconButton } from "../mui.index";

import { CustomDivier } from "../../APP/app.index";

interface SimpleModalProps {
  buttonText?: string;
  modalTitle?: string;
  modalContent?: string;
  borderRadius?: number;
  boxShadow?: number;
  modalWidth?: number;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  buttonText = "Open Modal",
  modalTitle = "Text in a modal",
  modalContent = "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
  borderRadius = 1,
  boxShadow = 24,
  modalWidth = 400,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>{buttonText}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: modalWidth,
            bgcolor: "background.paper",
            borderRadius: borderRadius,
            border: "2px solid transparent",
            boxShadow: boxShadow,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
          <Button onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

interface ActionModalProps extends ModalProps {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose: any;
  boxHeight?: string;
}

export const ActionModal = ({
  children,
  open,
  onClose,
  title,
  modalWidth,
  boxHeight,
  ...rest
}: ActionModalProps | any) => {
  return (
    <Modal
      open={open}
      onClose={title !== "Add Module" ? onClose : undefined}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...rest}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <>
        <Box
          sx={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            width: modalWidth || "60%",
            bgcolor: "background.paper",
            borderRadius: 1,
            border: "2px solid transparent",
            overflowY: "scroll",
            maxHeight: "95vh",
          }}
        >
          <Grid
            container
            xs={12}
            sx={{ p: 2 }}
            // justifyContent={"space-between"}
          >
            <Grid xs={10}>
              <Typography sx={{ fontWeight: "bold" }}>
                {title || "Unknown"}
              </Typography>
            </Grid>
            <Grid
              xs={2}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ActionIconButton
                actionType="CLOSE"
                size="small"
                sx={{ height: "5px", width: "5px" }}
                onClick={() => {
                  onClose();
                }}
              />
            </Grid>
          </Grid>
          <CustomDivier style={{ marginTop: 0 }} />
          {/* <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider'}} /> */}
          <Grid container xs={12} sx={{ p: 2 }}>
            {children}
          </Grid>
        </Box>
      </>
    </Modal>
  );
};

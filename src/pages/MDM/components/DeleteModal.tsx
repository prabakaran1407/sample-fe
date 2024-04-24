/** @format */

import React, { useState } from "react";
import { Modal, Button, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import { deletePolicies } from "../../../services/admin/mdm/policies.service";
import { deleteDevices } from "../../../services/admin/mdm/enrollment.service";
import { useAppSelector } from "../../../../src/hooks";

type Props = {
  show: boolean;
  option: string;
  id: any;
  handleClose: () => void;
  deleteApp?: () => void;
};

const DeletePolicyModal: React.FC<Props> = ({
  show,
  handleClose,
  option,
  id,
  deleteApp,
}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const org_data = auth?.data?.userRecord?.organizationData;

  async function deleteFunction() {
    if (option === "Policy") {
      await deletePolicies(id, org_data?.enterprise_id)
        .then((_res: any) => {
          handlePostSubmission();
          handleClose();
        })
        .catch((err: any) => setError(err.message));
    } else if (option === "Devices") {
      await deleteDevices(id[0], org_data?.enterprise_id)
        .then((_res: any) => {
          handlePostSubmission();
          handleClose();
        })
        .catch((err: any) => setError(err.message));
    } else if (option === "Application") {
      deleteApp?.();
      handlePostSubmission();
      handleClose();
    }
  }

  function handlePostSubmission() {
    setSuccess(true);
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={style}>
          <Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <h1> </h1>
                <span className="mt-3 fs-5 fw-bold text-muted">
                  Do you want to delete this {option} ?
                </span>
              </Box>

              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "row",
                  columnGap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={() => handleClose()}
                  disabled={success || error !== ""}
                  variant="contained"
                  color="error"
                  sx={{ width: "30%" }}
                >
                  No
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteFunction()}
                  sx={{ width: "30%" }}
                >
                  Yes
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {error && (
          <Alert variant="filled" severity="error">
            <strong>{error}</strong>
          </Alert>
        )}
        {success && (
          <Alert variant="filled" severity="success">
            <strong>Successfully removed the data</strong>
          </Alert>
        )}
      </>
    </Modal>
  );
};

export { DeletePolicyModal };

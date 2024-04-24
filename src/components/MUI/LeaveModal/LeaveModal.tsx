/** @format */

import { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LeaveManagementService from "../../../services/admin/LeaveManagement.service";
import { useAppSelector } from "../../../hooks/index.ts";
import { CloseRounded } from "@mui/icons-material";

const LeaveApprovalModal = ({ isOpen, onClose, rowItem, reRender }: any) => {
  const [loading, setLoading] = useState({
    approved: false,
    rejected: false,
  });
  const auth = useAppSelector((state) => state.auth);
  const [isReject, setIsReject] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");
  const handleApproveAndReject = async (approveOrReject: string) => {
    setLoading({ ...loading, [`${approveOrReject}`]: true });

    const payload = {
      approvedPerson: auth?.data?.userRecord?.id,
      status: approveOrReject,
      rejectedReason: approveOrReject === "rejected" ? rejectedReason : "",
    };
    try {
      await LeaveManagementService.approveLeave(rowItem?._id, payload);
      setLoading({ ...loading, [`${approveOrReject}`]: false });
      onClose();
      reRender();
    } catch (error) {
      setLoading({ ...loading, [`${approveOrReject}`]: false });
    }
    setIsReject(false);
  };
  
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        setIsReject(false);
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          border: "none",
          borderRadius: "10px",
          boxShadow: 24,
          pb: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 20 }}>
            Leave Request
          </Typography>
          <IconButton
            onClick={() => {
              onClose();
              setIsReject(false);
            }}
          >
            <CloseRounded style={{ fontSize: 20, color: "#000" }} />
          </IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <Grid container rowSpacing={2} alignItems={"center"}>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                User Name
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 14 }}>
                {rowItem?.user?.firstName + " " + rowItem?.user?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                Employee Code
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 14 }}>
                {rowItem?.user?.embCode}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                Leave Type
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 14 }}>
                {rowItem?.leaveType?.value}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                Start Date
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 14 }}>{rowItem?.fromDate}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                End Date
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 14 }}>{rowItem?.toDate}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                Reason for Leave
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography sx={{ fontSize: 14 }}>{rowItem?.reason}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                :
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{
                  color:
                    rowItem?.status === "applied"
                      ? "#f57c00"
                      : rowItem?.status === "approved"
                      ? "#1A4331"
                      : "#b71c1c",
                  height: "25px",
                  width: "90px",
                  backgroundColor:
                    rowItem?.status === "applied"
                      ? "#ffe0b2"
                      : rowItem?.status === "approved"
                      ? "#C6F1DA"
                      : "#ffcdd2",
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: "500" }}>
                  {rowItem?.status?.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
            {rowItem?.status === "approved" && (
              <>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    Approved By
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    :
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography sx={{ fontSize: 14 }}>
                  {rowItem?.approvedPerson?.firstName} {rowItem?.approvedPerson?.lastName}
                  </Typography>
                </Grid>
              </>
            )}
            {rowItem?.status === "rejected" && (
              <>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    Rejected By
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    :
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography sx={{ fontSize: 14 }}>
                    {rowItem?.approvedPerson?.firstName} {rowItem?.approvedPerson?.lastName}

                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    Rejected Reason <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    :
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography sx={{ fontSize: 14 }}>
                    {rowItem?.rejectedReason ? rowItem?.rejectedReason : "----"}
                  </Typography>
                </Grid>
              </>
            )}
            {isReject && (
              <>
                <Grid item xs={4}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    Rejection Reason <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography sx={{ fontSize: 14, fontWeight: "700" }}>
                    :
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter your reason"
                    onChange={(e: any) => {
                      setRejectedReason(e.target.value);
                    }}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        {!isReject && rowItem?.status === "applied" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <LoadingButton
              variant="outlined"
              onClick={() => setIsReject(true)}
              color="error"
              sx={{ width: "45%" }}
            >
              Reject
            </LoadingButton>
            <LoadingButton
              variant="contained"
              onClick={() => handleApproveAndReject("approved")}
              loading={loading?.approved}
              color="success"
              sx={{ width: "45%" }}
            >
              Approve
            </LoadingButton>
          </Box>
        )}

        {isReject && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <LoadingButton
              variant="outlined"
              onClick={() => setIsReject(false)}
              sx={{
                width: "45%",
                color: "#969696",
                borderColor: "#969696",
                "&:hover": { color: "#969696", borderColor: "#969696" },
              }}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              variant="contained"
              onClick={() => handleApproveAndReject("rejected")}
              loading={loading?.rejected}
              disabled={rejectedReason === "" ? true : false}
              color="error"
              sx={{ width: "45%" }}
            >
              Reject
            </LoadingButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default LeaveApprovalModal;

import {
  IconButton,
  Modal,
  Box,
  Typography,
  Slide,
  Tooltip,
  TextField,
} from "@mui/material";
import { CustomDivier } from "../../../components/APP/app.index";
import { Maximize, Minimize, CloseRounded, Send } from "@mui/icons-material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      border: "none",
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "10px",
    },
  },
});

const ChatBoxModal = ({ open, handleClose }: any) => {
  const classes = useStyles();
  const [isMinimized, setIsMinimized] = useState(false);

  const CustomBackdrop = () => {
    return <div style={{ backgroundColor: "transparent" }}></div>;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: CustomBackdrop }}
      sx={{
        justifySelf: "flex-end",
        alignSelf: "flex-end",
      }}
    >
      <Slide in={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            height: "auto",
            py: 2,
            px: 2.5,
          }}
        >
          {!isMinimized ? (
            <Box
              sx={{
                width: 350,
                height: "auto",
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Typography variant="h6" component="div" sx={{ fontSize: 20 }}>
                  Chat Support
                </Typography>
                <Box>
                  <Tooltip title={isMinimized ? "Maximize" : "Minimize"}>
                    <IconButton
                      onClick={() => setIsMinimized(true)}
                      sx={{ borderRadius: 0, height: 24, width: 24, mx: 2 }}
                    >
                      <Minimize style={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close">
                    <IconButton
                      onClick={() => {
                        handleClose();
                        setIsMinimized(false);
                      }}
                      sx={{ borderRadius: 0, height: 24, width: 24 }}
                    >
                      <CloseRounded style={{ fontSize: 20, color: "#000" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <CustomDivier />
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    height: "60vh",
                    overflowY: "scroll",
                    // background: "#EFF0F4",
                    background: "rgb(234, 238, 243)",
                    p: 2,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Box
                      sx={{
                        background: "#FFFFFF",
                        color: "#000000",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 30px 5px",
                        fontSize: 14,
                      }}
                    >
                      How can we help you?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Box
                      sx={{
                        background: "#0066FF",
                        color: "#FFFFFF",
                        fontWeight: "600",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 5px 30px",
                        fontSize: 14,
                      }}
                    >
                      How to add an organization?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Box
                      sx={{
                        background: "#FFFFFF",
                        color: "#000000",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 30px 5px",
                        fontSize: 14,
                      }}
                    >
                      How can we help you?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Box
                      sx={{
                        background: "#0066FF",
                        color: "#FFFFFF",
                        fontWeight: "600",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 5px 30px",
                        fontSize: 14,
                      }}
                    >
                      How to add an organization?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Box
                      sx={{
                        background: "#FFFFFF",
                        color: "#000000",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 30px 5px",
                        fontSize: 14,
                      }}
                    >
                      How can we help you?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Box
                      sx={{
                        background: "#0066FF",
                        color: "#FFFFFF",
                        fontWeight: "600",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 5px 30px",
                        fontSize: 14,
                      }}
                    >
                      How to add an organization?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Box
                      sx={{
                        background: "#FFFFFF",
                        color: "#000000",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 30px 5px",
                        fontSize: 14,
                      }}
                    >
                      How can we help you?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Box
                      sx={{
                        background: "#0066FF",
                        color: "#FFFFFF",
                        fontWeight: "600",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 5px 30px",
                        fontSize: 14,
                      }}
                    >
                      How to add an organization?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "start" }}>
                    <Box
                      sx={{
                        background: "#FFFFFF",
                        color: "#000000",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 30px 5px",
                        fontSize: 14,
                      }}
                    >
                      How can we help you?
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Box
                      sx={{
                        background: "#0066FF",
                        color: "#FFFFFF",
                        fontWeight: "600",
                        width: "80%",
                        padding: 2,
                        marginBottom: 2,
                        borderRadius: "30px 30px 5px 30px",
                        fontSize: 14,
                      }}
                    >
                      How to add an organization?
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Type your message here"
                      autoFocus
                      variant="outlined"
                      className={classes.root}
                      sx={{
                        borderRadius: 1,
                        border: "1px solid #969696",
                        mr: 2,
                      }}
                    />
                    <IconButton>
                      <Send style={{ fontSize: 26, color: "#969696" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: 250,
                bgcolor: "background.paper",
                borderRadius: "8px",
                boxShadow: 4,
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="div" sx={{ fontSize: 14 }}>
                  Chat Support
                </Typography>
                <Box>
                  <Tooltip title="Maximize">
                    <IconButton
                      onClick={() => setIsMinimized(false)}
                      sx={{ borderRadius: 0, height: 24, width: 24, mx: 2 }}
                    >
                      <Maximize style={{ fontSize: 14, color: "#000" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close">
                    <IconButton
                      onClick={() => {
                        handleClose();
                        setIsMinimized(false);
                      }}
                      sx={{ borderRadius: 0, height: 24, width: 24 }}
                    >
                      <CloseRounded style={{ fontSize: 16, color: "#000" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Slide>
    </Modal>
  );
};

export default ChatBoxModal;

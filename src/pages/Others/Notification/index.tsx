import { Box, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const Notification = () => {

  
const DoubleTickIcon = () => (
  <Box position="relative" display="inline-block">
    <DoneAllIcon style={{ fontSize: 20 }} />
    <DoneAllIcon style={{ fontSize: 20, position: 'absolute', top: 0, left: 0 }} />
  </Box>
);
  return (
    <div style={{ margin: "30px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "600" }}>
         Notifications
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <DoubleTickIcon />
      <Typography ml={1}>Mark all as read</Typography>
    </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
      >
        <h3>No New Notifications</h3>
      </div>
    </div>
  );
};

export default Notification;

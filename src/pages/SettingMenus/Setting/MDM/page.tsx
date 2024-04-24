import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import ComingSoonImg from "../../../../assets/svg/businessman-explaining-the-strategy.svg";
const MDM = () => {
    const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
    return ( 
        <>
        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          pb={2}
        >
          <img
            src={ComingSoonImg}
            alt="..."
            style={{ width: isMobile ? "100%" : "600px" }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: isMobile ? "26px" : "36px",
            fontWeight: "300",
            letterSpacing: "0.05rem",
            textAlign: "center",
          }}
        >
          COMING SOON
        </Typography>
      </Box>
    </Box>
        </>
     );
}
 
export default MDM;
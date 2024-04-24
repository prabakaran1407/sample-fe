import {
  ButtonV1,
  ContainerBoxV2,
} from "../../../components/MUI/mui.index";
import { Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { CustomDivier } from "../../../components/APP/app.index";

const Report = () => {
  return (
    <>
    <ContainerBoxV2 styles={{ padding: 2, display: "flex",backgroundColor: "#fffff" }}>
      <Grid container justifyContent="end" padding="1px" >
        <ButtonV1 style={{ width: "250px", padding: "5px", display: "flex" }}>
          Download <DownloadIcon />
        </ButtonV1>
      </Grid>

      </ContainerBoxV2>
      <CustomDivier style={{ marginTop: "0px" }} />

    </>
  );
};

export default Report;

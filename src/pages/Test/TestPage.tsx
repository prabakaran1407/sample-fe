/** @format */

import { useEffect, useState } from "react";

// **************** Slice

// ****** MUI
import { Grid, Typography, Modal } from "@mui/material";

import { LottieLoader } from "./../../components/Lottie/LottieLoader";
import fileupload from "../../components/Lottie/fileupload.json";
import SocketService from "../../libs/SocketService";

// ************** Redux Hooks
// import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux.hooks';

// Components\

import {
  Textfield,
  AutoComplete,
  Datepicker,
  CheckBox,
  RadioButton,
  ToggleSwitch,
  ButtonV1,
  EditIcon,
  DeleteIcon,
  AddIcon,
  FileUpload,
} from "../../components/MUI/mui.index";

import { SimpleModal } from "../../components/MUI/Modal/Modal";

import { BackDropLoader } from "../../components/APP/app.index";

export default function TestPageOne() {
  // const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setDisplayData] = useState<any>([]);

  useEffect(() => {
    // dispatch(TestAPIGelAll({}))
    // const data = useAppSelector((state: any) => state?.testApi?.data)
    setDisplayData([]);
  }, []);
  const handleResponse = (value: any) => {
    console.log("Test page", value);
  };
  useEffect(() => {
    SocketService.GET_SOCKET_ON_CB("659cc83b28b601254a9c8bf4", () => {
      console.log("socket test >>>>>>>>");
    });
  }, []);

  return (
    <>
      {/* <ActionConfirmation
        open={true}
        confirmAction={() => {
          console.log('click event');
        }}
        onClose={() => {}}
        confirmationType='DELETE'
      /> */}

      <Grid container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Typography>Components Page</Typography>
        </Grid>
        <Grid item xs={12}>
          <Textfield label="hello" />
        </Grid>
        <Grid item xs={12}>
          <AutoComplete
            options={[
              {
                label: "test",
                value: "Test",
              },
              {
                label: "sfggfhj",
                value: "Test",
              },
              {
                label: "sdsf",
                value: "Test",
              },
              {
                label: "gfdghf",
                value: "Test",
              },
            ]}
            renderInput={(params) => (
              <Textfield {...params} label="autocomplete" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Datepicker
            // minDate={format}
            onChange={(value) => console.log("value", value)}
            defaultProps={undefined}
            // renderInput={(params) => <Textfield {...params} />}
            // renderInput={(params: any) => <Textfield {...params} InputLabelProps={{ shrink: true}} />}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <CheckBox />
        </Grid>
        <Grid item xs={12}>
          <RadioButton />
        </Grid>
        <Grid item xs={12}>
          <ToggleSwitch />
        </Grid>
        <Grid item xs={12}>
          <ButtonV1 color="error">One</ButtonV1>
          <ButtonV1 variant="outlined">One</ButtonV1>
          <ButtonV1>One</ButtonV1>
        </Grid>

        <Grid item xs={12}>
          <EditIcon />
          <DeleteIcon />
          <AddIcon />
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            handleFileUpload={handleResponse}
            onProgress={(flag: boolean) => {
              console.log("FLAG", flag);
            }}
          />
        </Grid>

        {/* Add a new Grid item for the SimpleModal */}
        <Grid item xs={12}>
          <SimpleModal />
        </Grid>
      </Grid>
      <Modal open={false} sx={{ width: "100%", height: "100%" }}>
        <LottieLoader data={fileupload} />
      </Modal>
      <BackDropLoader loading={false} message="" />
    </>
  );
}

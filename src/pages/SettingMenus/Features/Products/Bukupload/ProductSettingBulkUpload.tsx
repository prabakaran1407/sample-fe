import { useState } from "react";

// ************ React CSV
import { CSVLink } from "react-csv";
import { useFormik } from "formik";
import { useAppSelector } from "../../../../../hooks/index.ts";

// ************** Service
import SettingService from "../../../../../services/settings/settings.service.ts";

// ************* Util

// ******* MUI
import {
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Box,
  Divider,
  Modal,
} from "@mui/material";

// ************Component
import {
  FileUpload,
  RadioButton,
  ButtonV1,
  ActionModal,
} from "../../../../../components/MUI/mui.index";

// ************** | Form schema
import { productBulkUploadSchema } from "../../../../../data/yup/settings/settings.ts";

// *********Icon
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { ToastContainer, toast } from "react-toastify";

// ****************** | CSS
import "./ErrorTable.module.css";

// ******** Lottie *******************
import { LottieLoader } from "../../../../../components/Lottie/LottieLoader";
import fileuploadData from "../../../../../components/Lottie/fileupload.json";

interface IProductBulkUpload {
  setting_type: string;
  sub_type: string;
}

export default function ProductSettingBulkUpload({
  setting_type,
  sub_type,
}: IProductBulkUpload) {
  const AUTH = useAppSelector((state) => state.auth);
  const [formvalue] = useState({
    actionType: null,
    file: null,
  });
  const [selectedFile, setSelectedFile] = useState<FormData | any>(null);
  const [fileUploadLoader, setFileUploadLoading] = useState(false);
  const [csvSheet, setCSVSheet] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, any>[]>([]);
  const [_fileSelectLoader, setFielSelectLoader] = useState<boolean>(false);
  const [] = useState(false);
  const handleSubmit = async () => {
    try {
      setFileUploadLoading(true);
      const formData = new FormData();
      formData.append("csv", selectedFile);
      let authData = AUTH?.data?.userRecord;
      let query = `?setting_type=${setting_type}&sub_type=${sub_type}&actionType=${formik?.values?.actionType}&organization_id=${authData?.organization_id}
      &createdBy=${authData?.id}&updatedBy=${authData?.id}`;
      let bulkUploadRes = await SettingService.productSettingsBulkUpload(
        formData,
        query
      );
      console.log("bulkUploadRes >>>>>>>>", bulkUploadRes);
      bulkUploadRes = bulkUploadRes?.data?.response;
      setFileUploadLoading(false);
      if (!bulkUploadRes?.isValid && bulkUploadRes?.errors?.length) {
        setErrors([...bulkUploadRes?.errors]);
        setOpen(true);
      }
    } catch (error: any) {
      error = error?.response?.data;
      if (!error?.response?.isValid && error?.response?.errors?.length) {
        setErrors([...error?.response?.errors]);
        setOpen(true);
      }
      setFileUploadLoading(false);
    }
  };
  const formik = useFormik({
    validationSchema: productBulkUploadSchema({}),
    onSubmit: handleSubmit,
    initialValues: formvalue,
  });

  // ******* Templete data get from BE
  const templateData = async () => {
    try {
      let payload = {
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };
      let res: any = await SettingService.productSettingsTemplate(
        payload,
        `?setting_type=${setting_type}&sub_type=${sub_type}&actionType=${
          formik?.values?.actionType || "CREATE"
        }`
      );

      console.log("Res >>>>>>", res);
      setCSVSheet(res?.data?.response || []);
      setTimeout(() => {
        document.getElementById("csv-file-download")?.click();
      }, 500);
    } catch (error: any) {
      console.log("ERROR", error);
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box style={{ width: "100%" }}>
        <form style={{ width: "100%" }}>
          <Grid container xs={12} spacing={2}>
            <Grid container item xs={12} alignItems={"center"}>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Action type
                  </FormLabel>
                  <RadioGroup
                    row
                    name="actionType"
                    value={formik?.values?.actionType}
                    onChange={formik?.handleChange}
                  >
                    <FormControlLabel
                      value="CREATE"
                      label="Create"
                      control={<RadioButton />}
                    />
                    <FormControlLabel
                      value="UPDATE"
                      label="Update"
                      control={<RadioButton />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <FormLabel>Template</FormLabel>

                  <ButtonV1
                    startIcon={<CloudDownloadIcon />}
                    fullWidth
                    variant="contained"
                    disabled={!formik?.values?.actionType}
                    onClick={() => templateData()}
                  >
                    Download
                  </ButtonV1>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ height: "100px" }}>
              <FileUpload
                getFileOnly={true}
                showNote={false}
                handleFileUpload={setSelectedFile}
                onProgress={setFielSelectLoader}
                uploadIcon={<InsertDriveFileIcon />}
                iconText="Select file"
              />
            </Grid>
            <Grid container item xs={12}>
              <ButtonV1
                fullWidth
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                disabled={!formik?.values?.actionType || !selectedFile}
              >
                Upload
              </ButtonV1>
            </Grid>
          </Grid>
        </form>
        <Divider />
        <div hidden={true}>
          <CSVLink
            data={csvSheet}
            filename={`${sub_type?.toLowerCase()?.replace(" ", "_")}.csv`}
          >
            <input type="button" hidden={true} id="csv-file-download" />
          </CSVLink>
        </div>
      </Box>
      <ActionModal
        title="VALIDATION ERRORS: Please verify the listed errors in the CSV file and re-upload the corrected information"
        open={open}
        onClose={() => {
          handleClose();
        }}
        sx={{ zIndex: 9999 }}
      >
        <table className="errortable">
          <thead
            className="errortable__head"
            style={{ backgroundColor: "rgb(103, 58, 183)" }}
          >
            <th>S.No</th>
            <th>Message</th>
          </thead>
          <tbody
            className="errortable__tbody"
            // style={{ backgroundColor: "rgb(169, 143, 214)" }}
          >
            {errors?.map((m: Record<string, any>, index: number) => (
              <tr>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td style={{ textAlign: "left" }}>{m?.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ActionModal>
      {/* ************** Lottie loader */}
      <Modal
        open={fileUploadLoader}
        sx={{ width: "100%", height: "100%", zIndex: 9999 }}
      >
        <LottieLoader data={fileuploadData} />
      </Modal>
      <ToastContainer />
    </>
  );
}

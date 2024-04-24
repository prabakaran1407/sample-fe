/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, useState } from "react";
import { ButtonV1, LoadingButtonV1 } from "../mui.index";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InfoIcon from "@mui/icons-material/Info";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadService from "../../../services/UploadService/fileupload.service.ts";
import { COLORS } from "../../../utils/globals.ts";

const StyledInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface FileUploadProps {
  labelName?: string;
  handleFileUpload: (value: any) => any;
  onProgress?: (value: any) => any;
  showNote?: boolean;
  getFileOnly?: boolean;
  uploadIcon?: ReturnType<typeof CloudUploadIcon>;
  iconText?: string;
  isDisable?: boolean;
}

export const FileUpload = ({
  labelName,
  handleFileUpload,
  onProgress,
  showNote = true,
  getFileOnly = false,
  uploadIcon = <CloudUploadIcon />,
  iconText = "Upload",
  isDisable = false,
  ...rest
}: FileUploadProps) => {
  const [selectFile, setSelectFile] = useState<any>({});
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleChange = (event: InputHTMLAttributes<HTMLElement> | any) => {
    setSelectFile(event?.target?.files[0]);
    setIsSelected(true);
    onProgress && onProgress(getFileOnly ? false : true);

    // This only works with uploading file in sames component
    if (getFileOnly) handleFileUpload(event?.target?.files[0]);
  };
  const handleRemove = () => {
    setSelectFile(null);
    setIsSelected(false);
    onProgress && onProgress(false);
    // This only works with uploading file in sames component
    if (getFileOnly) handleFileUpload(null);
  };

  const handleUpload = async () => {
    setLoading(true);
    onProgress && onProgress(true);
    // let uploadFileResponse: any = await FileUploadService.uploadImage(
    //   selectFile,
    //   selectFile?.type
    // );
    let uploadFileResponseNew: any = await FileUploadService.uploadImageNew(
      selectFile
    );

    uploadFileResponseNew = uploadFileResponseNew?.data;
    // if (uploadFileResponseNew?.data) {
    //   uploadFileResponseNew = {
    //     imagePath: uploadFileResponseNew?.data?.imagePath,
    //   };
    // }
    setLoading(false);
    onProgress && onProgress(false);
    handleFileUpload(uploadFileResponseNew);
    setUploaded(true);
  };

  const showFileName = (name: string, type?: string) => {
    let text;
    if(type === 'tooltip'){
      text = name ? name : labelName ? labelName : ''
    }else {
      text = name ? name?.length > 9 ? name?.substr(0, 9) + "..." : name 
     : labelName ? labelName?.length > 9 ? labelName?.substr(0, 9) + "..." : name : ''
    }
    return text
  }
  return (
    <>
      <Grid container xs={12} spacing={1}>
        {showNote && (
          <Grid
            container
            item
            xs={1}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Tooltip title="One file select at a time">
              <InfoIcon fontSize="small" color="error" />
            </Tooltip>
          </Grid>
        )}
        <Grid container item xs={showNote ? 9 : 10}>
          {!loading ? (
            isSelected ? (
              <ButtonV1
                variant="outlined"
                component="label"
                // startIcon={
                //   !getFileOnly && (
                //     <Tooltip title="Click to upload">
                //       <CheckCircleIcon
                //         color="success"
                //         onClick={handleUpload}
                //         fontSize="large"
                //       />
                //     </Tooltip>
                //   )
                // }
                // endIcon={
                //   <Tooltip title="Click to remove">
                //     <HighlightOffIcon
                //       color="error"
                //       onClick={handleRemove}
                //       fontSize="small"
                //     />
                //   </Tooltip>
                // }
                fullWidth
                style={{
                  border: uploaded
                    ? `1px dashed green`
                    : `1px dashed ${COLORS.primary}`,
                  color: uploaded ? "green" : COLORS.primary,
                  height: 38,
                }}
                {...rest}
                onClick={handleRemove}
              >
                {/* {selectFile?.name?.length > 9 ? (
                  <Tooltip title={selectFile?.name ? selectFile?.name : labelName ? labelName : ''}>
                    <Typography variant="subtitle2">
                      {selectFile?.name?.substr(0, 9) + "..."}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography variant="subtitle2">
                    {" "}
                    {selectFile?.name}
                  </Typography>
                )} */}
                <Tooltip title={showFileName(selectFile?.name, 'tooltip')}>
                    <Typography variant="subtitle2">
                      {showFileName(selectFile?.name)}
                    </Typography>
                  </Tooltip>
              </ButtonV1>
            ) : (
              <ButtonV1
                variant="outlined"
                component="label"
                startIcon={uploadIcon}
                fullWidth
                style={{
                  border: `1px dashed ${COLORS.primary}`,
                  color: COLORS.primary,
                  height: 38,
                }}
                {...rest}
              >
                {labelName ? showFileName(labelName) : iconText}
                <StyledInput
                  type="file"
                  onChange={handleChange}
                  disabled={isDisable}
                />
              </ButtonV1>
            )
          ) : (
            <LoadingButtonV1
              loading={loading}
              loadingIndicator="uploading..."
              variant="outlined"
              fullWidth
            >
              uploading...
            </LoadingButtonV1>
          )}
        </Grid>
        {!getFileOnly && (
        <>
          <Grid container item xs={2} justifyContent="center">
            <Tooltip title="Click to upload">
              <IconButton disabled={isDisable || !isSelected}>
                <CheckCircleIcon
                  color="success"
                  onClick={handleUpload}
                  fontSize="medium"
                />
              </IconButton>
            </Tooltip>
          </Grid>
          {/* <Grid container item xs={2} justifyContent="center">
            <Tooltip title="Click to remove">
              <IconButton disabled={isDisable}>
                <HighlightOffIcon
                  color="error"
                  onClick={handleRemove}
                  fontSize="medium"
                />
              </IconButton>
            </Tooltip>
          </Grid> */}
        </>
        )} 
      </Grid>
    </>
  );
};

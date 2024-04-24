import * as React from "react";
import { Box, Grid, InputLabel } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  FileUpload,
  Textfield,
} from "../../../../../../components/MUI/mui.index";
import { useFormik } from "formik";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../../../../../hooks";
import { getTimeStamp } from "../../../../../../utils/datetime";
import BilllingService from "../../../../../../services/super-admin/billing/billing.service.ts";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 2,
};

export default function ApproveBillingModal(props: any) {
  const { openModal, data, handleClose } = props;
  const [fileUploadRes, setFileUploadRes] = React.useState<any>("");
  const [_btnDisable, setBtnDisable] = React.useState<Boolean>(true);
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = React.useState(false);
  const AUTH = useAppSelector((state) => state?.auth);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    invoiceCopy: yup.string().required("Invoice Copy is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
  });

  const [formvalue, setFormValue] = React.useState<Record<string, any>>({
    startDate: null,
    endDate: null,
    invoiceCopy: fileUploadRes,
  });

  const handleFileUpload = (res: Record<any, any>) => {
    setFormValue(() => ({
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
      invoiceCopy: res?.imagePath,
    }));
    setFileUploadRes(res?.imagePath);
  };

  const clearData = () => {
    // setFormValue({
    //   startDate: null,
    //   endDate: null,
    //   invoiceCopy: null,
    // });
    formik.setErrors({});
    formik.setValues(formvalue);
    formik.resetForm();
  };

  const handleSubmit = async (value: Record<string, any>) => {
    setLoading(true);
    try {
      let payload: Record<string, any> = {
        invoiceServiceStartDate: getTimeStamp(value?.startDate),
        invoiceServiceEndDate: getTimeStamp(value?.endDate),
        updatedBy: AUTH?.data?.userRecord?.id,
        status: "APPROVED",
        isInvoiceCopy: fileUploadRes,
        remarks: [
          ...data?.remarks,
          {
            name: `${AUTH?.data.userRecord.firstName} ${AUTH?.data.userRecord.lastName}`,
            createdAt: Date.now(),
            createOrUpdate: "Updated",
            serviceStartDate: getTimeStamp(value?.startDate),
            serviceEndDate: getTimeStamp(value?.endDate),
            billingType: data?.billingType,
          },
        ],
      };
      let update = await BilllingService.updateBillingDtl(data?._id, payload);
      update = update.data;
      if (update?.status) {
        navigate(-1);
      }
    } catch (error: any) {
      console.log(error, ":error");
    }
    setLoading(false);
  };
  const formik = useFormik({
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });
  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  console.log("formik", formik);

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          handleClose();
          clearData();
        }}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <Box
            sx={{
              paddingTop: 1,
              paddingBottom: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <h3 id="child-modal-title">Approve Billing</h3>
            <CloseIcon
              onClick={() => {
                handleClose();
                clearData();
              }}
            />
          </Box>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Start Date <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    type="date"
                    name="startDate"
                    value={(formik?.values?.startDate || "").trimStart()}
                    fullWidth
                    error={getError(formik, "startDate")?.isTrue}
                    helperText={
                      getError(formik, "startDate")?.isTrue &&
                      getError(formik, "startDate")?.message
                    }
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    inputProps={{
                      min: today,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    End Date <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    type="date"
                    name="endDate"
                    value={(formik?.values?.endDate || "").trimStart()}
                    fullWidth
                    error={getError(formik, "endDate")?.isTrue}
                    helperText={
                      getError(formik, "endDate")?.isTrue &&
                      getError(formik, "endDate")?.message
                    }
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    inputProps={{
                      min: today,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box pt={1}>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#000",
                    }}
                  >
                    Invoice Copy{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </InputLabel>
                  <FileUpload
                    handleFileUpload={handleFileUpload}
                    onProgress={(flag: boolean) => {
                      setBtnDisable(flag);
                    }}
                  />
                  {getError(formik, "invoiceCopy")?.isTrue ? (
                    <span
                      style={{
                        color: "#F44336",
                        fontSize: 12,
                        paddingLeft: "18!important",
                      }}
                    >
                      {getError(formik, "invoiceCopy")?.message}
                    </span>
                  ) : null}
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "end" }}>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  disabled={!_.isEmpty(formik.errors)}
                >
                  Approve
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
}

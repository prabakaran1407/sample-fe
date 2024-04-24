/** @format */

import {
  // CircularProgress,
  Grid,
  InputLabel,
} from "@mui/material";
import { Textfield, ButtonV1 } from "../../../../../components/MUI/mui.index";
import { useEffect, useMemo, useState } from "react";

import { useAppSelector } from "../../../../../hooks";
import { CLAIM_STATUS } from "../../../../../data/AppConst";

// ************** util

// ********** service
import ClaimManagementService from "../../../../../services/claim-management/claim-management.service.ts";

import { useFormik } from "formik";

// ********** schema
import { formSchema } from "../../../../../data/yup/admin/claim-management-view.ts";

export default function ClaimActions({
  selectedRow,
  setOpenModel,
  refreshCall,
  seletSelectedOption,
}: any) {
  const user: any = useAppSelector((state: any) => state.auth).data.userRecord;
  const [formData, setformData] = useState<Record<string, any>>({
    remarks: "",
    approvedAmount: "",
    requestAmount: "",
    paidAmount: "",
  });
  const [reRender, setReRender] = useState(Math.random());

  const claimStatus = useMemo(() => CLAIM_STATUS?.map((m) => m?.value), []);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema: formSchema({}, seletSelectedOption),
    enableReinitialize: true,
    onSubmit: () => {},
  });

  async function handleClaimAction(type: string, _btnType?: string) {
    try {
      let payload: Record<string, any> = {
        organization_id: user?.organization_id,
      };
      if (type === claimStatus[1]) {
        if (!formik?.values?.approvedAmount) {
          formik.setFieldError("approvedAmount", "Approve amount is required");
          setReRender(Math.random());
          return;
        }
        payload.updateData = {
          status: type,
          approverNotes: formik?.values?.remarks,
          approvedAmount:
            parseFloat(formik?.values?.approvedAmount || "0") || 0,
          paidAmount: parseFloat(formik?.values?.paidAmount || "0") || 0,
          approverId: user?.id,
        };
      }
      if (type === claimStatus[5]) {
        if (!formik?.values?.requestAmount) {
          formik.setFieldError("requestAmount", "Request amount is required");
          setReRender(Math.random());
          return;
        }
        payload.updateData = {
          status: type,
          payerNotes: formik?.values?.remarks || "",
          approvedAmount:
            parseFloat(formik?.values?.approvedAmount || "0") || 0,
          // paidAmount: parseFloat(formik?.values?.paidAmount || "0") || 0,
          requestPaymentAmount:
            parseFloat(formik?.values?.requestAmount || "0") || 0,
          // payerId: user?.id,
        };
      }
      if (type === claimStatus[3]) {
        if (!formik?.values?.remarks?.trim()) {
          formik.setFieldError("remarks", "Remark is required");
          setReRender(Math.random());
          return;
        }
        payload.updateData = {
          status: type,
          reviewerNotes: formik?.values?.remarks,
          reviewedAmount:
            parseFloat(formik?.values?.approvedAmount || "0") || 0,
        };
      }
      if (type === claimStatus[4]) {
        if (!formik?.values?.remarks?.trim()) {
          formik.setFieldError("remarks", "Remark is required");
          setReRender(Math.random());
          return;
        }
        payload.updateData = {
          status: type,
          rejectedNotes: formik?.values?.remarks,
        };
      }
      if (type === claimStatus[2]) {
        if (!formik?.values?.paidAmount) {
          formik.setFieldError("paidAmount", "Paid amount is required");
          setReRender(Math.random());
          return;
        }
        payload.updateData = {
          status: type,
          payerNotes: formik?.values?.remarks || "",
          approvedAmount:
            parseFloat(formik?.values?.approvedAmount || "0") || 0,
          requestPaymentAmount:
            parseFloat(formik?.values?.requestAmount || "0") || 0,
          paidAmount: parseFloat(formik?.values?.paidAmount || "0") || 0,
          payerId: user?.id,
        };
      }
      payload.history = {
        message: `status changed ${selectedRow?.status} to ${type}`,
        timeStamp: new Date().getTime(),
        remarks: formik?.values?.remarks || "",
      };

      await ClaimManagementService.claimActionUpdate(selectedRow?.id, payload);
      refreshCall();
      setOpenModel(false);
    } catch (error: any) {
      console.log("ERROR >>>>>", error);
    }
  }

  const ClaimActionButton = () => {
    if ([claimStatus[0]].includes(selectedRow?.status)) {
      return (
        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              onClick={() => handleClaimAction(claimStatus[1])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.approvedAmount ||
                !formik.values.remarks.trim()
              }
            >
              Approve
            </ButtonV1>
          </Grid>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              onClick={() => handleClaimAction(claimStatus[3])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.approvedAmount ||
                !formik.values.remarks.trim()
              }
            >
              Review
            </ButtonV1>
          </Grid>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => handleClaimAction(claimStatus[4])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.approvedAmount ||
                !formik.values.remarks.trim()
              }
            >
              Reject
            </ButtonV1>
          </Grid>
        </Grid>
      );
    }
    if ([claimStatus[1]].includes(selectedRow?.status)) {
      return (
        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.requestAmount ||
                !formik.values.remarks
              }
              onClick={() => handleClaimAction(claimStatus[5])}
            >
              Request Payment
            </ButtonV1>
          </Grid>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              onClick={() => handleClaimAction(claimStatus[3])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.requestAmount ||
                !formik.values.remarks
              }
            >
              Review
            </ButtonV1>
          </Grid>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => handleClaimAction(claimStatus[4])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.requestAmount ||
                !formik.values.remarks
              }
            >
              Reject
            </ButtonV1>
          </Grid>
        </Grid>
      );
    }
    if ([claimStatus[5]].includes(selectedRow?.status)) {
      return (
        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.paidAmount ||
                !formik.values.remarks
              }
              onClick={() => handleClaimAction(claimStatus[2])}
            >
              Paid
            </ButtonV1>
          </Grid>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              onClick={() => handleClaimAction(claimStatus[3])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.paidAmount ||
                !formik.values.remarks
              }
            >
              Review
            </ButtonV1>
          </Grid>
          <Grid container item xs={4}>
            <ButtonV1
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => handleClaimAction(claimStatus[4])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.paidAmount ||
                !formik.values.remarks
              }
            >
              Reject
            </ButtonV1>
          </Grid>
        </Grid>
      );
    }
    if ([claimStatus[3]].includes(selectedRow?.status)) {
      return (
        <Grid container item xs={12} spacing={1}>
          <Grid container item xs={6}>
            <ButtonV1
              fullWidth
              onClick={() => handleClaimAction(claimStatus[1])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.approvedAmount ||
                !formik.values.remarks.trim()
              }
            >
              Approve
            </ButtonV1>
          </Grid>

          <Grid container item xs={6}>
            <ButtonV1
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => handleClaimAction(claimStatus[4])}
              disabled={
                !formik?.isValid ||
                formik?.isSubmitting ||
                !formik.values.approvedAmount ||
                !formik.values.remarks.trim()
              }
            >
              Reject
            </ButtonV1>
          </Grid>
        </Grid>
      );
    }
  };

  const validateAmount = (value: any, type: string) => {
    if (type === "PAID_AMOUNT") {
      if (!value?.trim()) return formik?.setFieldValue("paidAmount", "");

      if (!isNaN(value)) {
        value = parseFloat(value);

        if (value > parseFloat(formik?.values?.requestAmount || "")) {
          formik?.setFieldError(
            "paidAmount",
            "Paid amount should less or equals to approve amount"
          );
          return;
        }
        formik?.setFieldValue("paidAmount", value);
      }
    }
    if (type === "APPROVED_AMOUNT") {
      if (!value?.trim()) return formik?.setFieldValue("approvedAmount", "");

      if (!isNaN(value)) {
        value = parseFloat(value);

        if (value > parseFloat(selectedRow?.totalExpenses || "")) {
          formik?.setFieldError(
            "approvedAmount",
            "Approved amount should less or equals to claim amount"
          );
          return;
        }
        formik?.setFieldValue("approvedAmount", value);
      }
    }
    if (type === "REQUEST_AMOUNT") {
      if (!value?.trim()) return formik?.setFieldValue("requestAmount", "");

      if (!isNaN(value)) {
        value = parseFloat(value);

        if (value > parseFloat(formik?.values?.approvedAmount || "")) {
          formik?.setFieldError(
            "requestAmount",
            "Request amount should less or equals to approve amount"
          );
          return;
        }
        formik?.setFieldValue("requestAmount", value);
      }
    }
    // formik?.setFieldValue('approvedAmount', value)
  };
  function setFormData() {
    if (seletSelectedOption?.pending_approver) {
      setformData({
        remarks: selectedRow?.approverNotes,
        approvedAmount: selectedRow?.approvedAmount,
        // paidAmount: selectedRow?.paidAmount,
      });
    }
    if (seletSelectedOption?.pending_payer) {
      setformData({
        // remarks: selectedRow?.approverNotes,
        approvedAmount: selectedRow?.approvedAmount,
        // paidAmount: selectedRow?.paidAmount || 0,
        requestAmount: selectedRow?.requestPaymentAmount || 0,
      });
    }
    if (seletSelectedOption?.pending_payment) {
      setformData({
        approvedAmount: selectedRow?.approvedAmount,
        requestAmount: selectedRow?.requestPaymentAmount || 0,
        paidAmount: selectedRow?.paidAmount || 0,
      });
    }
  }

  useEffect(() => {
    setFormData();
  }, []);

  useEffect(() => {}, [reRender]);

  return (
    <>
      <Grid container xs={12} spacing={1}>
        {/* ******************* || *************** */}
        <Grid container item xs={12}>
          <Grid container item xs={6} alignItems={"center"}>
            <InputLabel
              shrink
              sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
            >
              Claim Amount: {selectedRow?.totalExpenses}
            </InputLabel>
          </Grid>
          <Grid container item xs={6}>
            <InputLabel
              shrink
              sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
            >
              Approve/Review Amount <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Textfield
              fullWidth
              sx={{ ":root": "100px" }}
              value={formik.values.approvedAmount}
              name="approvedAmount"
              onChange={(event: any) => {
                let value = event?.target?.value;
                validateAmount(value, "APPROVED_AMOUNT");
              }}
              error={getError(formik, "approvedAmount")?.isTrue}
              helperText={
                getError(formik, "approvedAmount")?.isTrue &&
                getError(formik, "approvedAmount")?.message
              }
              onBlur={formik?.handleBlur}
              disabled={
                seletSelectedOption?.pending_payer ||
                seletSelectedOption?.pending_payment
              }
              type="text"
            />
          </Grid>
        </Grid>

        {/* *************************************** */}
        <Grid container item xs={12} spacing={1}>
          {(seletSelectedOption?.pending_payer ||
            seletSelectedOption?.pending_payment) && (
            <Grid container item xs={6}>
              <InputLabel
                shrink
                sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
              >
                Request Amount <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Textfield
                fullWidth
                sx={{ ":root": "100px" }}
                value={formik.values.requestAmount}
                name="requestAmount"
                onChange={(event: any) => {
                  let value = event?.target?.value;
                  validateAmount(value, "REQUEST_AMOUNT");
                }}
                error={getError(formik, "requestAmount")?.isTrue}
                helperText={
                  getError(formik, "requestAmount")?.isTrue &&
                  getError(formik, "requestAmount")?.message
                }
                onBlur={formik?.handleBlur}
                disabled={seletSelectedOption?.pending_payment}
                type="text"
              />
            </Grid>
          )}
          {seletSelectedOption?.pending_payment && (
            <Grid container item xs={6}>
              <InputLabel
                shrink
                sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
              >
                Paid Amount <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Textfield
                fullWidth
                sx={{ ":root": "100px" }}
                value={formik.values.paidAmount}
                name="paidAmount"
                onChange={(event: any) => {
                  let value = event?.target?.value;
                  validateAmount(value, "PAID_AMOUNT");
                }}
                error={getError(formik, "paidAmount")?.isTrue}
                helperText={
                  getError(formik, "paidAmount")?.isTrue &&
                  getError(formik, "paidAmount")?.message
                }
                onBlur={formik?.handleBlur}
                type="text"
              />
            </Grid>
          )}
          <Grid item xs={seletSelectedOption?.pending_payer ? 6 : 12}>
            <InputLabel
              shrink
              sx={{ fontSize: 16, fontWeight: "600", color: "#181C32" }}
            >
              Remarks <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Textfield
              fullWidth
              sx={{ ":root": "100px" }}
              value={formik.values.remarks}
              name="remarks"
              onChange={formik.handleChange}
              error={getError(formik, "remarks")?.isTrue}
              helperText={
                getError(formik, "remarks")?.isTrue &&
                getError(formik, "remarks")?.message
              }
              onBlur={formik?.handleBlur}
            />
          </Grid>
        </Grid>
        {ClaimActionButton()}
      </Grid>
    </>
  );
}

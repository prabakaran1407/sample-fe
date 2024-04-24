import { Box, Button, Grid, InputLabel } from "@mui/material";
import { ActionModal } from "../../../../../../../src/components/MUI/Modal/Modal";
import { Textfield } from "../../../../../../../src/components/MUI/InputFields/TextField";
import { useAppSelector } from "../../../../../../hooks/index.ts";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import React from "react";
import * as _ from "lodash";
import InventoryrSettingService from "../../../../../../../src/services/settings/inventory.service.ts";
import { toast } from "react-toastify";

type StoreModalProps = {
  isOpen: boolean;
  formData?: any;
  handleClose: (isOpen: boolean) => void;
  isEdit?: boolean;
  refreshData: () => void;
  setSelectedData?: any;
  isView?: boolean;
  setIsView?: any;
};

const StoreModal = ({
  isOpen,
  handleClose,
  formData,
  isEdit = false,
  refreshData,
  setSelectedData,
  isView = false,
  setIsView,
}: StoreModalProps) => {
  const initialState = {
    store: "",
    contactPerson: "",
    contactNo: "",
    address: "",
    description: "",
  };

  const AUTH = useAppSelector((state: { auth: any }) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  // const _initialValues = isEdit && formData ? { ...formData } : initialState;

  // Store Schema
  const StoreSchema = Yup.object().shape({
    store: Yup.string().required("Store name is required"),
    contactPerson: Yup.string().required("Contact name is required"),
    contactNo: Yup.number()
      .required("Contact number is required")
      .typeError("Contact number must be a number")
      .test(
        "len",
        "Contact number must be 10 digits",
        (val) => val.toString().length === 10
      ),
    address: Yup.string().required("Address is required"),
  });

  const formik: any = useFormik({
    initialValues: isEdit && formData ? { ...formData } : initialState,
    validationSchema: StoreSchema,
    onSubmit: (values: any) => {
      handleFormSubmit(values);
    },
    enableReinitialize: true,
  });

  const handleSUbmit = async (value: any) => {
    try {
      setLoading(true);
      const payload = {
        ...value,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };

      await InventoryrSettingService.createStore(payload);

      refreshData();
      handleClose(false);
      formik.resetForm();
      setSelectedData(null);

      toast.success("Store created successfully");
    } catch (err: any) {
      console.error("Error creating store", err);
      toast.error(err?.response?.data?.message || "Error updating store");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (value: any) => {
    try {
      setLoading(true);
      const payload = {
        ...value,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      };

      await InventoryrSettingService.updateStore({
        payload: payload,
        id: formData._id,
      });

      refreshData();
      handleClose(false);
      formik.resetForm();
      setSelectedData(null);

      toast.success("Store updated successfully");
    } catch (err: any) {
      console.error("Error updating store", err);
      toast.error(err?.response?.data?.message || "Error updating store");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (value: any) => {
    if (isEdit) {
      handleUpdate(value);
    } else {
      handleSUbmit(value);
    }
  };

  return (
    <ActionModal
      open={isOpen}
      onClose={() => {
        handleClose(false);
        formik.resetForm();
        setSelectedData(null);
        setIsView(false);
      }}
      title={isView ? "View Store" : isEdit ? "Edit Store" : "Create Store"}
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container columns={6} spacing={3}>
          <Grid item xs={3}>
            <InputLabel
              shrink
              sx={{
                fontSize: 18,
                fontWeight: "600",
                color: "#181C32",
              }}
            >
              Store Name <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Textfield
              placeholder="Enter customer name"
              type="text"
              name="store"
              value={formik?.values?.store}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              disabled={isView}
              error={formik?.touched?.store && formik?.errors?.store}
              helperText={formik?.touched?.store && formik?.errors?.store}
              fullWidth
              onBlur={formik?.handleBlur}
            />
          </Grid>
          <Grid item xs={3}>
            <InputLabel
              shrink
              sx={{
                fontSize: 18,
                fontWeight: "600",
                color: "#181C32",
              }}
            >
              Contact Name <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Textfield
              placeholder="Enter customer name"
              type="text"
              name="contactPerson"
              value={formik?.values?.contactPerson}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={
                formik?.touched?.contactPerson && formik?.errors?.contactPerson
              }
              helperText={
                formik?.touched?.contactPerson && formik?.errors?.contactPerson
              }
              fullWidth
              disabled={isView}
              onBlur={formik?.handleBlur}
            />
          </Grid>
          <Grid item xs={3}>
            <InputLabel
              shrink
              sx={{
                fontSize: 18,
                fontWeight: "600",
                color: "#181C32",
              }}
            >
              Contact Number <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Textfield
              placeholder="Enter customer number"
              type="number"
              name="contactNo"
              value={formik?.values?.contactNo}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={formik?.touched?.contactNo && formik?.errors?.contactNo}
              helperText={
                formik?.touched?.contactNo && formik?.errors?.contactNo
              }
              fullWidth
              disabled={isView}
              onBlur={formik?.handleBlur}
            />
          </Grid>
          <Grid item xs={3}>
            <InputLabel
              shrink
              sx={{
                fontSize: 18,
                fontWeight: "600",
                color: "#181C32",
              }}
            >
              Address <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Textfield
              placeholder="Enter store address"
              type="text"
              name="address"
              value={formik?.values?.address}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={formik?.touched?.address && formik?.errors?.address}
              helperText={formik?.touched?.address && formik?.errors?.address}
              fullWidth
              disabled={isView}
              onBlur={formik?.handleBlur}
            />
          </Grid>
          <Grid item xs={6}>
            <InputLabel
              shrink
              sx={{
                fontSize: 18,
                fontWeight: "600",
                color: "#181C32",
              }}
            >
              Description
            </InputLabel>
            <Textfield
              placeholder="Enter store description"
              type="text"
              name="description"
              value={formik?.values?.description}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              error={
                formik?.touched?.description && formik?.errors?.description
              }
              helperText={
                formik?.touched?.description && formik?.errors?.description
              }
              disabled={isView}
              fullWidth
              onBlur={formik?.handleBlur}
            />
          </Grid>
          {!isView && (
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              width={"100%"}
              paddingTop={4}
            >
              <Button
                type="submit"
                disabled={
                  !formik.isValid ||
                  (!isEdit
                    ? !(Object.keys(formik?.touched).length > 0)
                    : _.isEqual(formik?.values, formData)) ||
                  loading
                }
                variant="contained"
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </Box>
          )}
        </Grid>
      </form>
    </ActionModal>
  );
};

export default React.memo(StoreModal);

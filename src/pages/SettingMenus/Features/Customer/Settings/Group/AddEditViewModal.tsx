/** @format */

import { TNestedObj } from "../../../../../../types/global.types";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../../data/AppConst";

// ******* Service

// ************** Util

// ************** | Form schema
import { useFormik } from "formik";

import { groupSchema } from "../../../../../../data/yup/admin/addedit-usermanagement.ts";
import { useAppSelector } from "../../../../../../hooks/index.ts";
import groupSettingService from "../../../../../../services/settings/group.setting.service.ts";
import requestdemoService from "../../../../../../services/requestdemoservice/requestdemo.service.ts";
import CloseIcon from "@mui/icons-material/Close";

const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    id: data?.id,
  };
};

// ******************** | Add edit model|*******************
interface IAddEditViewModal {
  actionType: string;
  data?: TNestedObj | Record<string, any>;
  setActivatedTab?: (value?: any) => void;
  handleClose?: (value?: any) => void;
  refresh: (value?: Record<string, any>) => void;
  open: boolean;
  render: number;
  setOpenModal: (value?: any) => void;
}
export default function AddEditViewModal(props: IAddEditViewModal) {
  let { open, handleClose, actionType, data, refresh, render, setOpenModal } =
    props;
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 3,
  };
  // console.log('handleClose', );

  const { isAdd, isEdit, isView } = formActionType({
    actionType,
    data,
  });
  const id = data?.id || null;
  console.log("isView:", isView);
  const AUTH = useAppSelector((state: any) => state?.auth);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    groupName: null,
    status: true,
  });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitting the form");
    console.log("Formik Values:", formik.values);
    setLoading(true);
    setDisabled(true);
    try {
      const organizationId = AUTH?.data?.userRecord?.organization_id;
      const GroupData = {
        ...formik.values,
        organization_id: organizationId,
      };

      if (isEdit) {
        // Edit existing status type
        await groupSettingService.updateGroup({
          updatedData: GroupData,
          id: id,
        });

        setOpenModal(false);

        ResetForm();
        refresh && refresh();
        // handleClose();
      } else {
        // Creating a new group
        const settingList = await groupSettingService.createGroup(GroupData);
        console.log("settingList", settingList?.status);
        if (settingList?.status === 200) {
          setOpenModal(false);
          ResetForm();
          refresh && refresh();
          // handleClose();
          handleClose && handleClose();
        }
        const temp = settingList?.data?.data?.find(
          (item: any) =>
            item.groupName === GroupData &&
            item.organization_id === GroupData.organization_id
        );

        if (!temp) {
          // Group does not exist, create it
          // Note: You are creating the group again here; you may want to remove this line
          await groupSettingService.createGroup(GroupData);
          formik.resetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          // Group already exists
          formik.setFieldError("groupName", "groupName already exists.");
        }
      }
    } catch (error) {
      console.error("Error saving status type:", error);
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const formik = useFormik({
    validationSchema: groupSchema,
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });
  console.log("Formik Values:", formik.values);
  console.log("Formik Errors:", formik.errors);
  useEffect(() => {
    formik.resetForm();
  }, [isEdit, isView, data]);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const setDataForEditView = () => {
    setFormValue({
      groupName: data?.groupName,
      status: data?.status,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({ status: true });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  // **********get countries*********
  const [_countries, setCountries] = useState<
    { label: string; phone: string; code: string }[]
  >([]);
  const getAllCountries = async () => {
    try {
      const response = await requestdemoService.getAllCountries();
      if (!response) {
        throw new Error("No data received");
      }

      setCountries(response?.data?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            {actionType === ACTION_ICON_TYPES[0]
              ? "Add Group"
              : actionType === ACTION_ICON_TYPES[1]
              ? "Edit Group"
              : "View Group"}
          </Typography>

          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <form
          onSubmit={formik.handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              py: 1,
              width: "70%",
            }}
          >
            <Grid container spacing={3} py={2}>
              <Grid item xs={12}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Group Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  name="groupName"
                  variant="outlined"
                  value={(formik?.values?.groupName || "").trimStart()}
                  onChange={formik.handleChange}
                  error={getError(formik, "groupName")?.isTrue}
                  helperText={
                    getError(formik, "groupName")?.isTrue &&
                    getError(formik, "groupName")?.message
                  }
                  onBlur={formik?.handleBlur}
                  placeholder="Enter groupName"
                  disabled={isView}
                  size="small"
                />
              </Grid>
            </Grid>
            {/* Submit button */}
            {isView ? null : (
              <Grid container justifyContent="center">
                {/* <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2, mr: 2 }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button> */}

                {isAdd ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={disabled}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={disabled}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                )}
              </Grid>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

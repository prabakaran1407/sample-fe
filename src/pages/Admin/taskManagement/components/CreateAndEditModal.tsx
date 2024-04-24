import {
  Autocomplete,
  Grid,
  TextField,
  Stack,
  DialogContent,
  Box,
  Button,
  Typography,
  Dialog,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/index.ts";
import SettingsService from "../../../..//services/settings/settings.service";
import ATMService from "../../../../services/admin/TaskManagement.Service.tsx";
import { getUserListForAdmin } from "../../../../components/com_components/CustomerSettingsAPI.tsx";
import { useFormik } from "formik";
import * as yup from "yup";
import { enqueueSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  p: 1,
};

interface Task {
  priority: any;
  taskStatus: any;
  _id: string;
  organization_id: string;
  taskType: string;
  status: string;
  label: string;
}

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: any;
  isAddOrEdit: string;
  reRender: any;
  setIsAddOrEdit: any;
}

export const validationSchema = () =>
  yup.object().shape({
    taskValue: yup.string().required("Task Type is required"),
    assigneeValue: yup.string().required("Assignee is required"),
    taskStatusValue: yup.string().required("Task Status is required"),
    taskPriorityValue: yup.string().required("Task Priority is required"),
    dueDate: yup.string().required("Due Date is required"),
  });

export default function TaskCreationModal({
  open,
  setOpen,
  data,
  isAddOrEdit,
  setIsAddOrEdit,
  reRender,
}: Props) {
  const [taskOptions, setTaskOptions] = useState<Task[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState<Task[]>([]);
  const [priorityOptions, setPriorityOptions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isFieldsDisabled, setIsFieldsDisabled] = useState<boolean>(false);
  console.log('fielddisabled',isFieldsDisabled)

  const auth = useAppSelector((state: any) => state.auth);

  const formik = useFormik({
    initialValues: {
      taskValue: "",
      description: "",
      assigneeValue: "",
      taskStatusValue: "",
      taskPriorityValue: "",
      dueDate: "",
      dueDateInTimeStamp: "",
    },
    validationSchema: validationSchema(),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const assigneeId = values.assigneeValue;

        const payload = {
          taskType: values.taskValue,
          taskDescription: values.description || "",
          assignee: assigneeId,
          userId: values.assigneeValue,
          taskStatus: values.taskStatusValue,
          organization: auth?.data?.userRecord?.organization_id,
          taskPriority: values.taskPriorityValue,
          dueDate: values.dueDate,
          comments: isAddOrEdit === "EDIT" ? data?.comments : [],
          dueDateInTimeStamp: values.dueDateInTimeStamp,
          assignedBy: auth?.data.userRecord.id,
        };

        if (isAddOrEdit === "ADD") {
          await ATMService.createTask(payload);
        } else {
          await ATMService.updateTask(data?._id, payload);
        }

        handleCloseModal();
      } catch (error: any) {
        setLoading(false);

        enqueueSnackbar(
          `${error?.message ? error?.message : "Network error"}`,
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          }
        );
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  let getPayload = {
    organization_id: auth?.data?.userRecord?.organization_id,
    status: true,
  };

  const fetchTasks = async () => {
    try {
      const response = await SettingsService.listTaskTypes(getPayload);

      if (response) {
        const taskOptions = response?.data?.data.map((r: any) => ({
          label: r?.taskType,
          value: r?.id,
        }));
        setTaskOptions(taskOptions);
      }
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setLoading(false);
    reRender();
    setIsAddOrEdit("ADD");
    formik.resetForm();
  };

  const getStatus = async () => {
    try {
      const response = await SettingsService.listStatus(getPayload);
      console.log('statusresponse',response);
      if (response) {
        const taskStatus = response?.data?.data.map((r: any) => ({
          label: r?.taskStatus,
          value: r?.id,
        }));
        setStatusOptions(taskStatus);
        const taskStatusValueString = taskStatus.find(
        (option: any) => option.value === formik.values.taskStatusValue
      )?.label;
        console.log('taskStatusValueString:', taskStatusValueString);
      const isDisabled =
        ["Completed", "Done", "Closed"].includes(taskStatusValueString) ||
        isAddOrEdit === "VIEW";
        setLoading(false);
      setIsFieldsDisabled(isDisabled);
      }
    } catch (error) {
      console.error("Error fetching status data:", error);
      setLoading(false);
    }
  };


  const getUserData = async () => {
    try {
      const res = await getUserListForAdmin(getPayload?.organization_id);
      const tempData = res.data.data;
      const assigneeOptions = tempData.map(({ _id, firstName }: any) => ({
        label: `${firstName}`,
        value: _id,
      }));
      setAssigneeOptions(assigneeOptions);
    } catch (err) {
      console.log(err);
    }
  };

  const getPriority = async () => {
    try {
      const response = await SettingsService.listPriority(getPayload);
      if (response) {
        const taskPriority = response?.data?.data.map((r: any) => ({
          label: r?.priority,
          value: r?.id,
        }));
        setPriorityOptions(taskPriority);
      }
    } catch (error) {
      console.error("Error fetching priority data:", error);
    }
  };

  useEffect(() => {
    if (isAddOrEdit !== "VIEW" && open) {
      getUserData();
      fetchTasks();
      getStatus();
      getPriority();

      if (isAddOrEdit === "EDIT" && data) {
        formik.setValues({
          taskValue: data?.taskType?._id || "",
          description: data?.taskDescription || "",
          assigneeValue: data?.assignee || "",
          taskStatusValue: data?.taskStatus?._id || "",
          taskPriorityValue: data?.taskPriority?._id || "",
          dueDate: data?.dueDate || "",
          dueDateInTimeStamp: data?.dueDateInTimeStamp || "",
        });
      }
    }
  }, [isAddOrEdit, open]);
useEffect(() => {
  const taskStatusValueString: any = statusOptions.find(
    (option: any) => option.value === formik.values.taskStatusValue
  )?.label;

  const isDisabled =
    ["Completed", "Done", "Closed"].includes(taskStatusValueString) ||
    isAddOrEdit === "VIEW";

  setIsFieldsDisabled(isDisabled);
}, [formik.values.taskStatusValue, isAddOrEdit, statusOptions]);


  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    const timestamp = new Date(selectedDate).getTime();
    formik.setFieldValue("dueDate", selectedDate);
    formik.setFieldValue("dueDateInTimeStamp", timestamp);
  };
  useEffect(() => {
    formik.validateForm();
  }, [formik.values]);
  console.log('formikstatusvalue',formik?.values?.taskStatusValue)
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            setOpen(false);
          }
        }}
        sx={{ "& .MuiDialog-paper": { maxWidth: "60%" } }}
      >
        <Box sx={style}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {isAddOrEdit === "ADD"
                ? "Add"
                : isAddOrEdit === "VIEW"
                ? "View"
                : "Edit"}{" "}
              Task
            </Typography>
          </Box>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%" }}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                    >
                      Task Type <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Autocomplete
                      options={taskOptions}
                      disabled={isFieldsDisabled}
                      getOptionLabel={(option: any) =>
                        option.label || "Select Task Type"
                      }
                      value={
                        taskOptions.find(
                          (option: any) =>
                            option.value === formik.values.taskValue
                        ) || null
                      }
                      onChange={(_event, newValue: any) => {
                        formik.setFieldValue(
                          "taskValue",
                          newValue?.value || ""
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select Task Type"
                          onBlur={formik.handleBlur('taskValue')} 
                          fullWidth
                          error={
                            formik.touched.taskValue &&
                            Boolean(formik.errors.taskValue)
                          }
                          helperText={
                            formik.touched.taskValue && formik.errors.taskValue
                          }                         
                        />
                        
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: "100%" }}>
                    <InputLabel
                      shrink
                      sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                    >
                      Description <span style={{ color: "red" }}></span>
                    </InputLabel>
                    <TextField
                      style={{ width: "100%" }}
                      variant="outlined"
                      placeholder="Description"
                      value={formik.values.description || ""}
                      onChange={(e) =>
                        formik.setFieldValue("description", e.target.value)
                      }
                      multiline
                      rows={3}
                      disabled={isFieldsDisabled}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3} direction="row">
                    <Grid item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Assignee <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Autocomplete
                          options={assigneeOptions}
                          disabled={isFieldsDisabled}
                          getOptionLabel={(option: any) =>
                            option.label || " Assignee"
                          }
                          value={
                            assigneeOptions.find(
                              (option: any) =>
                                option.value === formik.values.assigneeValue
                            ) || null
                          }
                          onChange={(_event, newValue) => {
                            formik.setFieldValue(
                              "assigneeValue",
                              newValue?.value || ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Assignee"
                              variant="outlined"
                              onBlur={formik.handleBlur('assigneeValue')} 
                              fullWidth
                              disabled={isFieldsDisabled}
                              error={
                                formik.touched.assigneeValue &&
                                Boolean(formik.errors.assigneeValue)
                              }
                              helperText={
                                formik.touched.assigneeValue &&
                                formik.errors.assigneeValue
                              }
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Status <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Autocomplete
                          options={statusOptions}
                          disabled={isFieldsDisabled}
                          getOptionLabel={(option: any) =>
                            option.label || "Select Status "
                          }
                          value={
                            statusOptions.find(
                              (option: any) =>
                                option.value === formik.values.taskStatusValue
                            ) || null
                          }
                          onChange={(_event, newValue: any) => {
                            formik.setFieldValue(
                              "taskStatusValue",
                              newValue?.value || ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Status"
                              variant="outlined"
                              onBlur={formik.handleBlur('taskStatusValue')}
                              fullWidth
                              disabled={isFieldsDisabled}
                              error={
                                formik.touched.taskStatusValue &&
                                Boolean(formik.errors.taskStatusValue)
                              }
                              helperText={
                                formik.touched.taskStatusValue &&
                                formik.errors.taskStatusValue
                              }
                            />
                          )}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Priority <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Autocomplete
                          options={priorityOptions}
                          disabled={isFieldsDisabled}
                          getOptionLabel={(option: any) =>
                            option.label || "Select Priority"
                          }
                          value={
                            priorityOptions.find(
                              (option: any) =>
                                option.value === formik.values.taskPriorityValue
                            ) || null
                          }
                          onChange={(_event, newValue) => {
                            formik.setFieldValue(
                              "taskPriorityValue",
                              newValue?.value || ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Priority"
                              variant="outlined"
                              onBlur={formik.handleBlur('taskPriorityValue')}
                              fullWidth
                              disabled={isFieldsDisabled}
                              error={
                                formik.touched.taskPriorityValue &&
                                Boolean(formik.errors.taskPriorityValue)
                              }
                              helperText={
                                formik.touched.taskPriorityValue &&
                                formik.errors.taskPriorityValue
                              }
                            />
                          )}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel
                          shrink
                          sx={{
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#181C32",
                          }}
                        >
                          Due Date <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <TextField
                          type="date"
                          placeholder="Due Date"
                          onBlur={formik.handleBlur('dueDate')}
                          value={formik.values.dueDate}
                          onChange={handleDateChange}
                          error={
                            formik.touched.dueDate &&
                            Boolean(formik.errors.dueDate) &&
                            !formik.values.dueDate
                          }
                          helperText={
                            !formik?.values?.dueDate &&
                            formik.touched.dueDate &&
                            formik.errors.dueDate
                          }
                          fullWidth
                          disabled={isFieldsDisabled}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {isAddOrEdit === "VIEW" ? null : (
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={3}
                  sx={{ mt: 3, mb: 2 }}
                >
                  <Button
                    onClick={handleCloseModal}
                    color="primary"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    loading={loading}
                    disabled={
                      loading ||
                      formik.isValidating ||
                      !formik.isValid ||
                      !formik.values.taskValue ||
                      !formik.values.assigneeValue ||
                      !formik.values.taskStatusValue ||
                      !formik.values.taskPriorityValue ||
                      !formik.values.dueDate
                      // isFieldsDisabled
                    }
                  >
                    {isAddOrEdit === "EDIT" ? "Update" : "Add"} Task
                  </LoadingButton>
                </Stack>
              )}
            </form>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
}

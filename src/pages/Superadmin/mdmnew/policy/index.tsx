import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { CustomDivier } from "../../../../components/APP/app.index";
import {
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../../../components/MUI/mui.index";
// import EnterpriseTable from "./table.tsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createPolicy,
  getAllEnterprise,
} from "../../../../../src/services/admin/mdm/policies.service";

const validationSchema = Yup.object({
  enterprise_name: Yup.string().required("Enterprise name is required"),
  policy_name: Yup.string().required("Policy name is required"),
});

const Policy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enterpriseList, setEnterpriseList] = useState<any>();

  async function GetEnterpriseList() {
    const enterprise = await getAllEnterprise();
    setEnterpriseList(enterprise?.data?.enterprises);
  }

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      enterprise_name: "",
      policy_name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await createPolicy(values);
        console.log(res);
        setSubmitting(false);
        handleCloseModal();
        formik.resetForm();
      } catch (error) {
        console.error("Error creating enterprise:", error);
        setSubmitting(false);
      }
    },
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  useEffect(() => {
    GetEnterpriseList();
  }, []);

  return (
    <>
      <ContainerBoxV2>
        <Grid container xs={12}>
          <Grid xs={12}>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                MDM Policy
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleAddClick}
                  sx={{ height: 38 }}
                >
                  <Add sx={{ fontSize: 18, mr: 1 }} /> Add Policy
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />

      {/* Modal */}
      <Dialog
        open={isModalOpen}
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseModal();
          }
        }}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%", 
          },
        }}
      >
        <DialogTitle>Add Policy</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              mt: "0px",
            }}
          >
            <Grid sx={{ mt: "0px" }}>
              <InputLabel
                shrink
                sx={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#181C32",
                }}
              >
                Enterprise Name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <AutoComplete
                options={enterpriseList?.map((item: any) => {
                  return item?.enterpriseDisplayName;
                })}
                renderInput={(params) => (
                  <Textfield
                    {...params}
                    fullWidth
                    type="text"
                    name="enterprise_name"
                    value={formik?.values?.enterprise_name || ""}
                    placeholder="Select enterprise name"
                    error={
                      getError(formik, "enterprise_name")?.isTrue &&
                      formik.values.enterprise_name !== ""
                    }
                    onBlur={formik?.handleBlur}
                  />
                )}
                fullWidth
                onChange={(_, selectedOption: Record<string, any>) => {
                  console.log(
                    "selectedOption",
                    enterpriseList?.find((item: any) => {
                      return item?.enterpriseDisplayName === selectedOption;
                    })?.name
                  );
                  formik?.setFieldValue(
                    "enterprise_name",
                    enterpriseList?.find((item: any) => {
                      return item?.enterpriseDisplayName === selectedOption;
                    })?.name
                  );
                }}
              />
              {getError(formik, "enterprise_name")?.isTrue && (
                <FormHelperText error>
                  {getError(formik, "enterprise_name")?.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid sx={{ mt: "5px" }}>
              <InputLabel
                shrink
                sx={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#181C32",
                }}
              >
                Policy Name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                type="text"
                placeholder="Enter enterprise name"
                fullWidth
                {...formik.getFieldProps("policy_name")}
              />
              {formik.touched.policy_name && formik.errors.policy_name && (
                <div style={{ color: "red", fontSize: 12 }}>
                  {formik.errors.policy_name}
                </div>
              )}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ marginTop: "16px" }}>
            <Button onClick={handleCloseModal}>Close</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Grid>{/* <EnterpriseTable createFlag={createFlag} /> */}</Grid>
    </>
  );
};

export default Policy;

import { useState } from "react";
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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { CustomDivier } from "../../../../components/APP/app.index";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import EnterpriseTable from "./table.tsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createEnterprise } from "../../../../../src/services/admin/mdm/policies.service.ts";

const validationSchema = Yup.object({
  enterprise_name: Yup.string().required("Enterprise name is required"),
});

const Enterprises = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createFlag, setcreateFlag] = useState(1);

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
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await createEnterprise(values);
        console.log("Response12:", response);
        setcreateFlag(createFlag + 1);
        setSubmitting(false);
        handleCloseModal();
        formik.resetForm();
      } catch (error) {
        console.error("Error creating enterprise:", error);
        setSubmitting(false);
      }
    },
  });

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
                MDM Enterprises
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  onClick={handleAddClick}
                  sx={{ height: 38 }}
                >
                  <Add sx={{ fontSize: 18, mr: 1 }} /> Add Enterprise
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
        <DialogTitle>Add Enterprise</DialogTitle>
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
                Enterprise name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                type="text"
                placeholder="Enter enterprise name"
                fullWidth
                {...formik.getFieldProps("enterprise_name")}
              />
              {formik.touched.enterprise_name &&
                formik.errors.enterprise_name && (
                  <div style={{ color: "red" }}>
                    {formik.errors.enterprise_name}
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
      <Grid>
        <EnterpriseTable createFlag={createFlag} />
      </Grid>
    </>
  );
};

export default Enterprises;

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
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { CustomDivier } from "../../../../components/APP/app.index";
import {
  AutoComplete,
  ContainerBoxV2,
  Textfield,
} from "../../../../components/MUI/mui.index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAllEnterprise } from "../../../../../src/services/admin/mdm/policies.service.ts";
import mdmService from "../../../../../src/services/super-admin/mdm/mdmservice.tsx";
import OrganizationService from "../../../../services/super-admin/organization/organization.service.ts";
import AgDataGrid from "../../../../components/AG-GRID/DataGrid/AgDataGrid";
import GetHeaderParams from "../../../../components/CustomCellAgGrid/CustomHeaderValue";
import CustomCellRenderValues from "../../../../components/CustomCellAgGrid/CustomCellRenderValues";
import { ACTION_ICON_TYPES } from "../../../../../src/data/AppConst";
import { PropagateLoader } from "react-spinners";
import { COLORS } from "../../../../utils/globals.ts";
import {
  ActionConfirmation,
  ActionItems,
} from "../../../../components/MUI/mui.index";
import { ColDef } from "ag-grid-community";
interface Organization {
  _id: string;
  organizationName: string;
}

const validationSchema = Yup.object({
  enterprise_name: Yup.string().required("Enterprise name is required"),
  orgName: Yup.string().required("Policy name is required"),
});

const Mapping = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createFlag, setcreateFlag] = useState(1);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [enterpriseList, setEnterpriseList] = useState<any>();

  async function GetEnterpriseList() {
    const enterprise = await getAllEnterprise();
    setEnterpriseList(enterprise?.data?.enterprises);
  }

  const [orgList, setOrgList] = useState<Organization[]>([]);
  const [_selectedOrgId, setSelectedOrgId] = useState<any>("");
  const [loading, setLoading] = useState(true);

  async function GetOrgList() {
    try {
      const response = await mdmService.getAllOrg();
      let res: any = [];
      for (let i = 0; i < response?.data?.data?.length; i++) {
        if (response?.data?.data?.[i]?.enterprise_id) {
          res.push(response?.data?.data?.[i]);
        }
      }
      setLoading(false)
      setOrgList(res);
    } catch (error) {
      console.error("Error fetching organization list", error);
    }
  }

  const [orgOptions, setOrgoptions] = useState<any>();

  async function GetOrgListOptions() {
    try {
      const response = await mdmService.getAllOrg();
      setOrgoptions(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching organization list", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      enterprise_name: "",
      orgName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const orgId = formik.values.orgName;

        const payload = {
          enterprise_id: values.enterprise_name,
          orgName: values.orgName,
        };

        const res = await OrganizationService.updateOrganization(
          orgId,
          payload
        );
        console.log(res);
        setSubmitting(false);
        handleCloseModal();
        formik.resetForm();
        setcreateFlag(createFlag + 1);
        GetOrgList();
      } catch (error) {
        console.error("Error updating organization:", error);
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    GetEnterpriseList();
    GetOrgList();
    GetOrgListOptions();
  }, []);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });
  console.log(
    orgList?.map((item: any) => {
      return item?.organizationName;
    })
  );

  const confirmDelete: any = async () => {
    try {
      const payload = {
        enterprise_id: null,
      };
      const res = await OrganizationService.updateOrganization(
        selectedOrgToDelete?._id,
        payload
      );
      console.log(res, "hello");
      setcreateFlag(createFlag + 1);
      GetOrgList();
      setConfirmationDialogOpen(false);
    } catch (error) {
      console.error("Error updating organization:", error);
      if (error) {
        console.error("Server responded with:", error);
      }
    }
  };

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedOrgToDelete, setSelectedOrgToDelete] = useState<any>(null);

  const handleDelete = (orgId: any) => {
    setSelectedOrgToDelete(orgId);
    setConfirmationDialogOpen(true);
  };
  const cancelDelete = () => {
    setConfirmationDialogOpen(false);
  };
  const columnDefs: ColDef[] = [
    {
      headerName: "Enterprise Id",
      field: "enterprise_id",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "enterprise_id",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Organization Name",
      field: "organizationName",
      filter: true,
      width: 400,
      cellStyle: { textTransform: "capitalize" },
      suppressMovable: true,
      cellRenderer: CustomCellRenderValues,
      cellRendererParams: {
        field: "organizationName",
      },
      ...GetHeaderParams(),
    },
    {
      headerName: "Actions",
      field: "",
      width: 200,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          // can_cancel: true,
          can_delete: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleDelete: handleDelete,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
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
                MDM Mapping
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  sx={{ height: 38 }}
                  onClick={handleAddClick}
                >
                  <Add sx={{ fontSize: 18, mr: 1 }} /> Create mapping
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
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
        <DialogTitle> Create mapping</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              mt: "0px",
            }}
          >
            <Grid>
              <InputLabel
                shrink
                sx={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#181C32",
                }}
              >
                Organization name <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <AutoComplete
                options={
                  orgOptions?.map((item: any) => item.organizationName) || []
                }
                getOptionLabel={(option: any) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    type="text"
                    name="orgName"
                    value={formik.values.orgName || ""}
                    placeholder="Select organization name"
                    error={
                      getError(formik, "orgName")?.isTrue &&
                      formik.values.orgName !== ""
                    }
                    onBlur={formik.handleBlur}
                  />
                )}
                onChange={(_, selectedOption: any) => {
                  const selectedOrg = orgOptions.find(
                    (item: any) => item.organizationName === selectedOption
                  );
                  setSelectedOrgId(selectedOrg?._id || "");
                  formik.setFieldValue("orgName", selectedOrg?._id || "");
                }}
              />
            </Grid>
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
              <AutoComplete
                options={
                  enterpriseList?.map((item: any) => {
                    return item?.enterpriseDisplayName;
                  }) || []
                }
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
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65vh",
            width: "100%",
          }}
        >
          <PropagateLoader color={COLORS.primary} />
        </Box>
      ) : (
      <ContainerBoxV2>
        <ActionConfirmation
          open={confirmationDialogOpen}
          onClose={cancelDelete}
          confirmAction={confirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this unlink?" children={<></>}      />
        <AgDataGrid
          rowData={orgList}
          columnDefs={columnDefs}
          TableHeight={60}
          rowHeight={50}
          handleCellClick={undefined}
          loading={false}
          disableClickSelectionRenderers={false}
          serverSidePagination={false}
          noDataTxt="No Records Found"
        />
      </ContainerBoxV2>
      )}
    </>
  );
};

export default Mapping;

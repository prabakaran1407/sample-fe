/**
 * eslint-disable prefer-const
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  ActionModal,
  TabMenus,
  Textfield,
  ButtonV1,
  AutoComplete,
} from "../../../../components/MUI/mui.index";
import { Grid, InputLabel } from "@mui/material";
import { TNestedObj } from "../../../../types/global.types";
import { useFormik } from "formik";
import { formSchema } from "../../../../data/yup/superadmin/modules/parent-child-schema";
import { ACTION_ICON_TYPES, MODULE_TYPES } from "../../../../data/AppConst";
import ModuleService from "../../../../services/super-admin/modulesservice";
import { APP_ROUTES } from "../../../../data/AppRoutes";
import { render } from "react-dom";
import { toast } from "react-toastify";

interface ModuleFormProps {
  actionType: string;
  data?: TNestedObj | Record<string, any>;
  setActivatedTab?: (value?: any) => void;
  handleClose?: (value?: any) => void;
  refresh: (value?: Record<string, any>) => void;
  render?: number;
  AUTH: Record<string, any>;
}
const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    parentId: data?._id,
    childId: data?.modules?._id,
  };
};

const getError = (fmk: any, field: string) => ({
  isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
  message: fmk?.errors[field],
});

// ************** Parent module form
const ParentModuleForm: FC<ModuleFormProps> = ({
  actionType,
  data,
  setActivatedTab,
  refresh,
  AUTH,
}: ModuleFormProps) => {
  const { isAdd, isEdit, isView, parentId } = formActionType({
    actionType,
    data,
  });
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    moduleName: "",
    description: "",
  });

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      const payload = {
        moduleName: value?.moduleName,
        description: value?.description,
        createdBy: AUTH?.data?.userRecord?.id,
        updatedBy: AUTH?.data?.userRecord?.id,
      } as Record<string, unknown>;
      if (isEdit) {
        if (payload?.createdBy) delete payload["createdBy"];
        let update = await ModuleService.updateParent(parentId, payload);
        update = update.data;
        if (update?.status) {
          setActivatedTab && setActivatedTab(1);
        }
        refresh && refresh();
      } else {
        let created = await ModuleService.createParent(payload);
        created = created.data;
        console.log("created", created);
        if (created?.status) {
          setActivatedTab && setActivatedTab(1);
        }
      }
      refresh && refresh();
    } catch (error: any) {
      error = error?.response?.data;
      if (!error?.status) {
        toast.error(
          error?.message || "Something went wrong, please try again later",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
      console.log("Error", error);
    }
  };
  const formik = useFormik({
    validationSchema: formSchema({ formType: "PARENT" }),
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const setDataForEditView = () => {
    setFormValue({
      moduleName: data?.moduleName,
      description: data?.description,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [isView, isEdit]);
  console.log("render", render);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container item xs={12} spacing={2}>
            <Grid container item xs={6}>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Parent module <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  type="text"
                  name="moduleName"
                  value={formik?.values?.moduleName}
                  fullWidth
                  error={getError(formik, "moduleName")?.isTrue}
                  helperText={
                    getError(formik, "moduleName")?.isTrue &&
                    getError(formik, "moduleName")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder={
                    formik?.values?.moduleName ? "" : "Enter Parent module"
                  }
                  disabled={isView}
                />
              </Box>
            </Grid>
            <Grid container item xs={6}>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Description <span style={{ color: "red" }}></span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="description"
                  value={formik?.values?.description}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter description"
                  disabled={isView}
                  // contentEditable={isView}
                />
              </Box>
            </Grid>

            {!isView && (
              <Grid container item xs={12} justifyContent={"flex-end"}>
                <ButtonV1
                  disabled={!formik?.isValid || !formik?.dirty}
                  type="submit"
                >
                  {isAdd ? "Add" : "Update"}
                </ButtonV1>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </>
  );
};

// ************** Child module form
const ChildModuleForm: FC<ModuleFormProps> = ({
  actionType,
  data,
  handleClose,
  refresh,
  AUTH,
}: ModuleFormProps) => {
  const { isAdd, isEdit, isView, childId } = formActionType({
    actionType,
    data,
  });
  console.log("data from child", data);

  console.log();
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    parentModule: null,
    moduleName: null,
    description: null,
  });
  console.log("formvalue", formvalue);
  const [parentModules, setParentModules] = useState<Record<string, any>[]>([]);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      const payload = {
        parentModule: value?.parentModule?.value,
        moduleName: value?.moduleName,
        description: value?.description,
        createdBy: AUTH?.data?.userRecord?.id,
        updatedBy: AUTH?.data?.userRecord?.id,
      } as Record<string, unknown>;
      if (isEdit && childId) {
        if (payload?.createdBy) delete payload["createdBy"];
        let update = await ModuleService.updateChild(childId, payload);
        update = update?.data;
        console.log("updated", update);
        if (update?.status) {
          console.log(
            "w4325346",
            APP_ROUTES?.SUPER_ADMIN?.MODULES?.LIST?.pathName
          );
          handleClose && handleClose();
          refresh && refresh();
        }
      } else {
        let created = await ModuleService.createChild(payload);
        created = created?.data;
        console.log("created", created);
        if (created?.status) {
          console.log(
            "w4325346",
            APP_ROUTES?.SUPER_ADMIN?.MODULES?.LIST?.pathName
          );
          handleClose && handleClose();
        }
        refresh && refresh();
      }
    } catch (e) {
      console.log("Error", e);
    }
  };
  const getParentModuleData = async () => {
    try {
      const payload: any = {
        moduleType: MODULE_TYPES[0],
        condtion: {
          status: true,
        },
        select: ["moduleName", "keyName", "description"],
      };
      let modules = await ModuleService.getModules(payload);
      modules = modules?.data;
      console.log("modules", modules);
      if (modules?.status) {
        setParentModules(
          modules?.response?.data?.map((m: Record<string, any>) => ({
            label: m?.moduleName,
            value: m?.id,
          })) || []
        );
      }
      console.log("module", modules);
    } catch (e) {
      console.log("Error");
    }
  };
  useEffect(() => {
    getParentModuleData();
  }, []);
  const formik = useFormik({
    validationSchema: formSchema({ formType: "CHILD" }),
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const setDataForEditView = () => {
    setFormValue({
      parentModule: { label: data?.moduleName, value: data?._id },
      moduleName: data?.modules?.moduleName,
      description: data?.modules?.description,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Parent module <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={parentModules}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="parentModule"
                      value={formik?.values?.parentModule || ""}
                      placeholder="Select Parent type"
                      error={
                        getError(formik, "parentModule")?.isTrue &&
                        formik.values.parentModule !== ""
                      }
                      helperText={
                        (getError(formik, "parentModule")?.isTrue &&
                          getError(formik, "parentModule")?.message) ||
                        (formik.values.parentModule === "" && " ") ||
                        " "
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.parentModule || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("parentModule", selectedOption);
                  }}
                  disabled={isView}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Module name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="moduleName"
                  value={formik?.values?.moduleName}
                  placeholder="Enter module name"
                  error={getError(formik, "moduleName")?.isTrue}
                  helperText={
                    getError(formik, "moduleName")?.isTrue &&
                    getError(formik, "moduleName")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  disabled={isView}
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ width: "100%" }}>
                <InputLabel
                  shrink
                  sx={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#181C32",
                  }}
                >
                  Description <span style={{ color: "red" }}></span>
                </InputLabel>
                <Textfield
                  fullWidth
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={formik?.values?.description}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  disabled={isView}
                />
              </Box>
            </Grid>
            {!isView && (
              <Grid container item xs={12} justifyContent={"flex-end"}>
                <ButtonV1
                  disabled={!formik?.isValid || !formik?.dirty}
                  type="submit"
                >
                  {isAdd ? "Add" : "Update"}
                </ButtonV1>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </>
  );
};

interface AddEditViewModalProps {
  open: boolean;
  handleClose: (value: any) => void;
  actionType: string;
  data?: TNestedObj;
  refresh: () => void;
  AUTH: Record<string, any>;
}
const AddEditViewModal = ({
  open,
  handleClose,
  actionType,
  data,
  refresh,
  AUTH,
}: AddEditViewModalProps) => {
  const [tab, _setTab] = useState([
    {
      label: "Parent Module",
    },
    {
      label: "Child Module",
    },
  ]);

  const [activatedTab, setActivatedTab] = useState<number>(0);
  useEffect(() => {
    setActivatedTab(0);
    return () => {
      setActivatedTab(0);
    };
  }, []);
  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
  };

  return (
    <ActionModal
      open={open}
      onClose={(e: any) => {
        handleClose(e);
        setActivatedTab(0);
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? "Add Module"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Module"
          : "View Module"
      }
      boxHeight="auto"
    >
      <Grid container item xs={12} spacing={4}>
        <Grid container item xs={12} sx={{ width: "100%" }}>
          <TabMenus
            tabMenus={tab}
            selectedTab={handleTabSelect}
            value={activatedTab}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{ width: "100%" }}
          justifyContent={"center"}
        >
          {activatedTab === 0 ? (
            <ParentModuleForm
              actionType={actionType}
              setActivatedTab={setActivatedTab}
              data={data}
              refresh={refresh}
              AUTH={AUTH}
            />
          ) : activatedTab === 1 ? (
            <ChildModuleForm
              actionType={actionType}
              handleClose={handleClose}
              data={data}
              refresh={refresh}
              AUTH={AUTH}
            />
          ) : null}
        </Grid>
      </Grid>
    </ActionModal>
  );
};

export default AddEditViewModal;

/** @format */

import { useEffect, useState } from "react";
import {
  // ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  // ActionItems,
  // ActionConfirmation,
  // PillTab,
  AutoComplete,
} from "../../../../../../../components/MUI/mui.index.tsx";
import {
  TNestedObj,
  Ipayload,
} from "../../../../../../../types/global.types.ts";
import { Box, Grid, InputLabel } from "@mui/material";
// import { ColDef } from "ag-grid-community";

// ************* Const
import {
  ACTION_ICON_TYPES,
  STATIC_WAREHOUSE_DATA,
} from "../../../../../../../data/AppConst.ts";

// ******* Service
// import ClaimSettingManagementService from "../../../../../claim/apis/Claim/TypeOfClaim";
// import GradeService from "../../../../../claim/apis/Claim/GradeSelection/index.ts";
import AmountAllocationService from "../../../../../claim/apis/Claim/AmountAllocation";
import SettingService from "../../../../../../../services/settings/settings.service.ts";
import customerSettingService from "../../../../../../../../src/services/settings/customer.setting.service.ts";

// ************** Util
import { useAppSelector } from "../../../../../../../hooks/index.ts";
import _ from "lodash";

// ************** | Form schema
import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-toastify";
// import { Add, Cancel, CheckCircle } from "@mui/icons-material";
// import { PropagateLoader } from "react-spinners";
import { getUserListForAdmin } from "../../../../../../../components/com_components/CustomerSettingsAPI.tsx";
import InventoryrSettingService from "../../../../../../../../src/services/settings/inventory.service.ts";

interface IAddEditViewModal {
  actionType: string;
  data?: TNestedObj | Record<string, any>;
  setActivatedTab?: (value?: any) => void;
  handleClose?: (value?: any) => void;
  refresh: (value?: Record<string, any>) => void;
  open: boolean;
  render: number;
}

export default function WarehouseModal(props: IAddEditViewModal) {
  let { open, handleClose, actionType, data, refresh, render } = props;

  const formActionType = ({ actionType, data }: Record<string, any>) => {
    return {
      isAdd: actionType === ACTION_ICON_TYPES[0],
      isEdit: actionType === ACTION_ICON_TYPES[1],
      isView: actionType === ACTION_ICON_TYPES[2],
      id: data?._id,
    };
  };

  const { isAdd, isEdit, isView, id } = formActionType({
    actionType,
    data,
  });

  const auth = useAppSelector((state) => state.auth);
  // const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(auth), []);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    warehouseType: null,
    warehouse: "",
    refId: null,
    status: true,
  });
  console.log("formvalue", formvalue);
  console.log("auth", auth);
  //   const [claimType, setClaimType] = useState<Record<string, any>[]>([]);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [gradeData, setGradeData] = useState<Record<string, any>[]>([]);
  const [roleData, setRoleData] = useState<Record<string, any>[]>([]);
  const [storeData, setStoreData] = useState<any>([]);
  const [customerData, setCustomerData] = useState<any>([]);

  const getData = async () => {
    try {
      const payload: any = {
        organization_id: auth?.data?.userRecord?.organization_id,
        status: true,
      };

      const response = await InventoryrSettingService.getAll(payload);

      const storeOption = response?.data?.response?.list.map(
        ({ _id, store }: any) => {
          return {
            label: `${store}`,
            value: _id,
          };
        }
      );

      setStoreData(storeOption);
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  console.log("storeData", storeData);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      console.log("123values", value);
      let data: any = {
        warehouse_type: value?.warehouseType?.label,
        refId: value?.refId?.value,
        warehouse: value?.warehouse ? value?.warehouse : value?.refId?.label,
        organization_id: auth?.data?.userRecord?.organization_id,
      };

      const response = await InventoryrSettingService.createWarehouse(data);

      console.log("response", response);

      if (response?.status === 200) {
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      }

      // const temp = response?.data?.data?.find((item: any) => {
      //   return (
      //     item.warehouseType?._id === data.warehouseType &&
      //     item.class?._id === data.class &&
      //     item.userRole._id === data.userRole &&
      //     item.organization._id === data.organization_id
      //   );
      // });

      // if (isEdit) {
      //   await AmountAllocationService.updateAllocationData(data, id);
      //   ResetForm();
      //   refresh && refresh();
      //   handleClose && handleClose();
      // } else {
      //   // if (!temp) {
      //   //   await AmountAllocationService.createAmountAllocation(data);
      //   //   ResetForm();
      //   //   refresh && refresh();
      //   //   handleClose && handleClose();
      //   // } else {
      //   //   formik.setFieldError("amount", "Amount already allocated.");
      //   // }
      // }
    } catch (error: any) {
      if (!error?.message) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  let validationSchema = yup.object({
    warehouseType: yup
      .object()
      .shape({
        label: yup.string().required("Warehouse Type is required"),
        value: yup.string().required("Wareformikhouse Type is required"),
      })
      .required("Warehouse Type is required"),
    refId: yup
      .object()
      .shape({
        label: yup.string().required("Ref Id is required"),
        value: yup.string().required("Ref Id is required"),
      })
      .required("Ref type is required"),
  });

  let validationSchemaWarehouse = yup.object({
    warehouseType: yup
      .object()
      .shape({
        label: yup.string().required("Warehouse Type is required"),
        value: yup.string().required("Wareformikhouse Type is required"),
      })
      .required("Warehouse Type is required"),

    warehouse: yup.string().required("Warehouse is Required"),
  });

  console.log("validationSchema", validationSchema);

  const formik = useFormik({
    validationSchema:
      formvalue.warehouseType?.label === "WAREHOUSE"
        ? validationSchemaWarehouse
        : validationSchema,
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });
  validationSchema;
  console.log("formik", formik);
  console.log("customerData", customerData);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });
  console.log("data", data);
  const setDataForEditView = () => {
    setFormValue({
      warehouseType: {
        label: data?.warehouse_type,
        value: data?.warehouse_type,
      },
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({
      warehouseType: null,
      warehouse: "",
      refId: null,
      status: true,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  // ******************** Get initial Data

  const getUserData = async () => {
    await getUserListForAdmin(auth?.data?.userRecord?.organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setAssigneeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  async function getCustomer() {
    let payload = {
      status: true,
      organization_id: auth?.data?.userRecord?.organization_id,
    };
    try {
      const res = await customerSettingService.getAll(payload);

      const customerOption = res.data.data.map(({ id, customerName }: any) => {
        return {
          label: customerName,
          value: id,
        };
      });

      setCustomerData(customerOption);

      console.log("res", res.data.data);
    } catch (err: any) {
      console.error("Error fetching data:", err.message);
    }
  }

  useEffect(() => {
    if (open) {
      getUserData();
      getData();
      getCustomer();
    }
  }, [render, open]);

  // const _disabledSxProp: any = useMemo(
  //   () =>
  //     isView
  //       ? {
  //           "& .MuiInputBase-input": {
  //             backgroundColor: "transparent",
  //           },
  //           "& .MuiInputBase-input.Mui-disabled": {
  //             opacity: 1,
  //             "-webkit-text-fill-color": "rgb(0, 0, 0, 1)",
  //           },
  //         }
  //       : {},
  //   []
  // );

  const getType = () => {
    let refArray = [];
    if (formik?.values?.warehouseType?.label === "CUSTOMER") {
      refArray = customerData;
    }
    if (formik?.values?.warehouseType?.label === "STORE") {
      refArray = storeData;
    }
    if (formik?.values?.warehouseType?.label === "USER") {
      refArray = assigneeOptions;
    }

    return refArray;
  };

  return (
    <ActionModal
      open={open}
      onClose={() => {
        ResetForm();
        handleClose && handleClose();
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? "Create Warehouse"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Warehouse"
          : "View Warehouse"
      }
      modalWidth="32%"
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Warehouse Type<span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={STATIC_WAREHOUSE_DATA}
                  getOptionLabel={(option: any) => {
                    return option.label;
                  }}
                  renderInput={(params: any) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="warehouseType"
                      placeholder="Select Warehouse Type"
                      error={getError(formik, "warehouseType")?.isTrue}
                      helperText={
                        getError(formik, "warehouseType")?.isTrue &&
                        getError(formik, "warehouseType")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.warehouseType || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("warehouseType", selectedOption);
                    formik?.setFieldValue("refId", null);
                    console.log("selectedOption", selectedOption);
                    setFormValue({
                      ...formvalue,
                      warehouseType: selectedOption,
                    });
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            {formik?.values?.warehouseType?.label !== "WAREHOUSE" ? (
              <Grid item xs={12}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                  >
                    Reference Id <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <AutoComplete
                    options={getType()}
                    getOptionLabel={(option: any) => {
                      return option.label;
                    }}
                    renderInput={(params: any) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type="text"
                        name="refId"
                        placeholder="Select Ref Id"
                        error={getError(formik, "refId")?.isTrue}
                        helperText={
                          getError(formik, "refId")?.isTrue &&
                          getError(formik, "refId")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.refId || null}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue("refId", selectedOption);
                    }}
                    disabled={isView || isEdit}
                  />
                </Box>
              </Grid>
            ) : null}

            {formik?.values?.warehouseType?.label === "WAREHOUSE" ? (
              <Grid item xs={12}>
                <Box>
                  <InputLabel
                    shrink
                    sx={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#181C32",
                    }}
                  >
                    Warehouse Name <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Textfield
                    label=""
                    placeholder="Enter Warehouse name"
                    type="text"
                    name="warehouse"
                    value={formik?.values?.warehouse || null}
                    onChange={(e) => {
                      formik?.setFieldValue("warehouse", e.target.value);
                    }}
                    error={getError(formik, "warehouse")?.isTrue}
                    helperText={
                      getError(formik, "warehouse")?.isTrue &&
                      getError(formik, "warehouse")?.message
                    }
                    fullWidth
                    onBlur={formik?.handleBlur}
                  />
                </Box>
              </Grid>
            ) : null}

            {!isView && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    py: 1,
                  }}
                >
                  <ButtonV1
                    disabled={formik?.isSubmitting || !formik.isValid}
                    type="submit"
                    style={{ height: 38, fontSize: 14, width: "20%" }}
                  >
                    {isAdd ? "Add" : "Update"}
                  </ButtonV1>
                </Box>
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </ActionModal>
  );
}

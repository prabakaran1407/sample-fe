/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
"use client";
import { useState, useEffect, useMemo } from "react";
import { useFormik } from "formik";
import _ from "lodash";
import { toast } from "react-toastify";
// ************* MUI Components
import {
  // Box,
  // Button,
  Grid,
  Stack,
  // IconButton,
  // Stack,
  Typography,
  // fabClasses,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

// Components ******************
import {
  Textfield,
  AutoComplete,
  ButtonV1,
  ContainerBoxV2,
  FileUpload,
  ActionIconButton,
  Datepicker,
} from "../../../../components/MUI/mui.index";
import { CustomDivier } from "../../../../components/APP/app.index";

// **************** Service
import BilllingService from "../../../../services/super-admin/billing/billing.service.ts";
import ModuleService from "../../../../services/super-admin/modulesservice.ts";
import { billingeditformSchema } from "../../../../data/yup/superadmin/billing/addedit-billing";

// ************ costant data ***********
import {
  AUM_FORM_ACTION_TYPES,
  PaymentService,
  MODULE_TYPES,
  ACTION_ICON_TYPES,
  API_DATE_FORMAT,
} from "../../../../data/AppConst";
import LocalStorage from "../../../../libs/localStorage.service";
import { APP_ROUTES } from "../../../../data/AppRoutes";

// ******* Until
import {
  getTimeStamp,
  formatedDate,
  dateDiff,
} from "../../../../utils/datetime.ts";
import { isInteger, isDecimal } from "../../../../utils/index";

import "../../../../styles/add-edit-view-billing.module.css";

// ************ Icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useAppSelector } from "../../../../hooks/index";

// **************** | Loader |**********
import { BackDropLoader } from "../../../../components/APP/app.index.tsx";
import { COLORS } from "../../../../utils/globals.ts";

// ************ Table compoent

function prospValue(
  _props: Record<string, any>,
  locationState: Record<string, any>
) {
  return {
    isAdd: locationState?.actionType === AUM_FORM_ACTION_TYPES[0],
    isEdit: locationState?.actionType === AUM_FORM_ACTION_TYPES[1],
    isView: locationState?.actionType === AUM_FORM_ACTION_TYPES[2],
    id: locationState?.userId,
    data: _props.data,
  };
}
function AddEditViewBilling(props: any) {
  const location = useLocation();
  const AUTH = useAppSelector((state) => state.auth);
  let { isAdd, isEdit, isView } = prospValue(props, location?.state);
  let { id }: any = useParams();
  const navigate = useNavigate();
  const [formData, _setFormData] = useState<Record<string, unknown | any>>({
    organization_id: null,
    serviceStartDate: null,
    serviceEndDate: null,
    isInvoiceCopy: null,
    // services: [
    //   {
    //     parentModule: null,
    //     numberOfUser: null,
    //     cost: null,
    //   },
    // ],
    billingType: null,
    selectParent: null,
    selectChild: null,
    totalCost: null,
  });

  const [_localstorageData, setLocalStorageData] = useState<
    Record<string, any>
  >({});
  const [organizations, setOrganizations] = useState<Record<string, any>[]>([]);
  const [parentServices, setParentServices] = useState<Record<string, any>[]>(
    []
  );
  const [_childServices, _setChildServices] = useState<Record<string, any>[]>(
    []
  );
  const [fileUploadRes, setFileUploadRes] = useState<Record<string, any>>({});
  const [btnDisable, setBtnDisable] = useState(false);
  const [itemTable, setItemTable] = useState<Record<string, any>[]>([
    {
      parentModule: null,
      numberOfUser: null,
      cost: null,
    },
  ]);
  const [removedItems, setRemovedItem] = useState<Record<string, any>[]>([]);
  const [spinner, setSpinner] = useState<boolean>(false);

  // const beforeSubmit = (value: Record<string, any>): boolean => {

  // }

  const handleSubmit = async (_value: Record<string, any>) => {
    try {
      // if(!beforeSubmit(value)){
      //   return
      // }
      setSpinner(true);
      let payload: Record<string, any> = {
        organization_id: formik?.values?.organization_id?.value,
        serviceStartDate: getTimeStamp(formik?.values?.serviceStartDate),
        serviceEndDate: getTimeStamp(formik?.values?.serviceEndDate),
        // services: formik?.values?.services?.map((m: any) => m?.value),
        billingType: formik?.values?.billingType?.value,
        isInvoiceCopy: fileUploadRes?.imagePath || "",
        createdBy: AUTH?.data?.userRecord?.id,
        updatedBy: AUTH?.data?.userRecord?.id,
        totalCost: formik?.values?.totalCost ? formik?.values?.totalCost : 0,
      };
      let { service, isValid } = validateService(itemTable);
      if (!isValid) {
        toast.error("At least one module must be selected." || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setSpinner(false);
        return;
      }
      payload.services = [...service];
      if (isEdit) {
        // Add removed items also
        payload.services = [...payload.services, ...removedItems];
        
        let update = await BilllingService.updateBillingDtl(id, payload);
        update = update.data;
        setSpinner(false);
        if (update?.status) {
          navigate(APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.pathName);
        }
      } else {
        let create = await BilllingService.create(payload);
        create = create.data;
        setSpinner(false);
        if (create?.status) {
          navigate(APP_ROUTES?.SUPER_ADMIN?.BILLING_DETAILS?.pathName);
        }
      }
      // helperFn.reset()
    } catch (error: any) {
      setSpinner(false);
      error = error?.response?.data;
      console.log("error >>>>", error);
      if (!error?.response?.status) {
        toast.error(error?.message || "Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const formik = useFormik({
    validationSchema: billingeditformSchema({ isView, isEdit }),
    onSubmit: handleSubmit,
    initialValues: formData,
    enableReinitialize: isEdit || isView,
  });

  function validateService(value: Record<string, any>[]) {
    let isValid = true;
    for (let i = 0; i < value?.length; i++) {
      let el = value[i];
      function modifyData() {
        el.numberOfUsers = parseInt(el?.numberOfUser);
        el.cost =
          formik.values?.billingType?.value === "PAID"
            ? parseFloat(el?.cost)
            : 0;
        el.parentModuleId = el?.parentModule?.value;
        return el;
      }
      if (formik.values?.billingType?.value === "PAID") {
        if (el?.parentModule && el?.numberOfUser && el?.cost) {
          el = modifyData();
        } else {
          isValid = false;
        }
      } else {
        if (el?.parentModule && el?.numberOfUser) {
          el = modifyData();
        } else {
          isValid = false;
        }
      }
    }
    value = value.filter((ft: Record<string, any>) => Boolean(ft));
    return { service: value, isValid };
  }
  console.log("AUTH", AUTH);

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const getInitialData = async () => {
    try {
      let organizationList = await BilllingService.getOrganization();
      organizationList = organizationList?.data;

      const organizationName = organizationList?.data.map((item: any) => ({
        label: item?.organizationName,
        value: item?.id,
      }));
      setOrganizations(organizationName);

      let modulePayload = {
        moduleType: MODULE_TYPES[0],
        condtion: {
          status: true,
        },
      };
      let getServices = await ModuleService.getModules(modulePayload);

      getServices = getServices?.data?.response;
      let getUniq =
        getServices?.data?.map((m: Record<string, any>) => ({
          label: m?.moduleName,
          value: m?._id,
          details: m,
        })) || [];
      setParentServices(_.uniqBy(getUniq, "value"));

      // let childModulePayload = {
      //   moduleType: MODULE_TYPES[1],
      //   condtion: {
      //     status: true,
      //   },
      // };
      // let childServices = await ModuleService.getModules(childModulePayload);
      // childServices = childServices?.data?.response;
      // setChildServices(
      //   childServices?.data?.map((m: Record<string, any>) => ({
      //     label: m?.moduleName,
      //     value: m?._id,
      //   })) || []
      // );
    } catch (e) {
      console.log("error", e);
    }
  };

  // ******************** Initial data
  useEffect(() => {
    getInitialData();
    setLocalStorageData(
      LocalStorage.parseObj(LocalStorage.getItem("userData") || "{}")
    );
  }, []);

  // ************** currently we are npt using Child modules

  // useEffect(() => {
  //   // Filter child modules6
  //   let childModules: any = [];
  //   for (let i = 0; i < parentServices?.length; i++) {
  //     let el = parentServices[i];
  //     if (
  //       el?.value === formik?.values?.selectParent?.value &&
  //       el?.details?.modules
  //     ) {
  //       childModules.push({
  //         label: el?.details?.modules?.moduleName,
  //         value: el?.details?.modules?._id,
  //       });
  //     }
  //   }
  //   setChildServices([...childModules]);
  //   console.log("childModules >>>>>>>>", childModules);
  // }, [formik?.values?.selectParent]);

  // *********************** | Edit flow| **************
  // console.log('form value', formik?.values)
  const handleFileUpload = (res: Record<any, any>) => {
    setFileUploadRes(res);
  };

  const getByOne = async () => {
    try {
      setSpinner(true);
      let billingRes = await BilllingService.billingDtlGetById(id as string);
      billingRes = billingRes?.data;
      if (billingRes?.status) {
        billingRes = billingRes.response;
        // Set form data
        let billingType = {
          label: billingRes?.billingType === "TRIAL" ? "Trail" : "Paid",
          value: billingRes?.billingType === "TRIAL" ? "TRIAL" : "PAID",
        };
        _setFormData({
          organization_id: {
            label: billingRes?.organization?.organizationName,
            value: billingRes?.organization?._id,
          },
          serviceStartDate: formatedDate(
            billingRes?.serviceStartDate,
            API_DATE_FORMAT[4]
          ),
          serviceEndDate: formatedDate(
            billingRes?.serviceEndDate,
            API_DATE_FORMAT[4]
          ),
          isInvoiceCopy: billingRes.isInvoiceCopy,
          billingType: billingType,
          totalCost: billingRes?.totalCost,
        });
        let serviceArray: Record<string, any>[] = [];
        if (billingRes?.billingdetailsitems?.length > 0) {
          billingRes?.billingdetailsitems.map((m: Record<string, any>) => {
            serviceArray.push({
              id: m?._id,
              parentModule: {
                label: m?.parentmodules?.moduleName,
                value: m?.parentmodules?._id,
              },
              numberOfUser: m?.numberOfUsers,
              cost: m?.cost,
            });
          });
        }
        setItemTable([...serviceArray]);
        setSpinner(false);
      }
    } catch (error: any) {
      setSpinner(false);
    }
  };
  useEffect(() => {
    if (isEdit || isView) {
      getByOne();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addLineItem = () => {
    setItemTable([
      ...itemTable,
      {
        parentModule: null,
        numberOfUser: null,
        cost: null,
      },
    ]);
  };
  const removeLineItem = (index: number) => {
    // ************* Only for Edit fn
    let removedItem = { ...itemTable[index] };
    if (isEdit && removedItem?.id) {
      removedItem.isActive = false;
      setRemovedItem([...removedItems, removedItem]);
    }

    if (itemTable?.length != 1) {
      setItemTable([...itemTable.filter((_ft: any, i: number) => index != i)]);
    } else {
      let nullArray: any[] = [];
      itemTable.forEach((item: any) => {
        Object.keys(item).forEach((key: any) => {
          item[key] = typeof item[key] === "object" ? null : "";
        });
        nullArray.push(item);
      });
      setItemTable([...nullArray]);
    }
  };

  const setItemData = (inputValue: any, field: string, index: number) => {
    let item = itemTable[index];
    if (field === "cost" && isDecimal(inputValue)) {
      item[field] = inputValue ? inputValue : 0;
      // Calculate total price
      calculateTotalCost();
    }
    if (field === "numberOfUser" && isInteger(inputValue)) {
      item[field] = parseInt(inputValue ? inputValue : 0);
    }
    if (field === "parentModule") {
      // Check duplicate item
      let isAlreadyExist = itemTable.find(
        (f) => inputValue && f?.parentModule?.label === inputValue?.label
      );
      console.log("isAlreadyExist >>>>>>>", isAlreadyExist);
      if (!isAlreadyExist) {
        item[field] = inputValue;
      } else {
        toast.error(`${inputValue?.label} service, already exist `, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
    }
    setItemTable([...itemTable]);
  };

  const TBL_TH = useMemo(
    () =>
      formik?.values?.billingType?.value === "PAID"
        ? [
            { name: "Module", width: "30%" },
            { name: "Users Count", width: "30%" },
            { name: "Cost / day", width: "30%" },
          ]
        : [
            { name: "Module", width: "50%" },
            { name: "Users Count", width: "50%" },
          ],
    [formik?.values?.billingType]
  );
  function calculateTotalCost() {
    // if(!formik?.values?.serviceStartDate || !formik?.values?.serviceEndDate) {
    //   toast.error("Should select service start and end date" || "", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   return
    // }
    console.log("itemTable <<<<<<<>>>>", itemTable);
    const daysCount = dateDiff(
      formik?.values?.serviceStartDate,
      formik?.values?.serviceEndDate
    );
    const totalValue = _.sumBy(
      itemTable,
      (el) =>
        parseFloat(el?.cost || 0) * daysCount * parseInt(el?.numberOfUser || 1)
    );
    console.log("daysCount >>>>", daysCount);
    console.log("totalValue >>>>", totalValue);
    formik.setFieldValue("totalCost", totalValue);
  }
  useEffect(() => {
    if (formik?.values?.billingType?.value === "PAID") {
      calculateTotalCost();
    }
  }, [
    formik?.values?.serviceStartDate,
    formik?.values?.serviceEndDate,
    itemTable,
  ]);

  console.log("formik >>>>>>>>>>", formik.values);
  return (
    <>
      <ContainerBoxV2>
        <Grid
          container
          xs={12}
          style={{
            height: "auto",
            width: "100%",
          }}
        >
          <Grid container item xs={12}>
            <Typography sx={{ fontWeight: "bold" }}>{`${
              isAdd ? "Add" : isEdit ? "Update" : "View"
            } Billing details`}</Typography>
          </Grid>
        </Grid>
      </ContainerBoxV2>
      <CustomDivier />
      <ContainerBoxV2>
        <Grid
          container
          xs={12}
          style={{
            height: "auto",
            width: "100%",
            marginTop: 5,
          }}
          gap={2}
        >
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid container item xs={12} spacing={4}>
              <Grid container item xs={12} spacing={1}>
                <Grid container item xs={4}>
                  <AutoComplete
                    options={organizations}
                    getOptionLabel={(option: any) => option?.label}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label={
                          <>
                            Organization Name
                            <span style={{ color: "red" }}>*</span>
                          </>
                        }
                        fullWidth
                        type="text"
                        name="organization_id"
                        placeholder="Organization Name"
                        error={getError(formik, "organization_id")?.isTrue}
                        helperText={
                          getError(formik, "organization_id")?.isTrue &&
                          getError(formik, "organization_id")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.organization_id}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue("organization_id", selectedOption);
                    }}
                    disabled={isView}
                  />
                </Grid>
                <Grid container item xs={4}>
                  {/* <Textfield
                    ref={startDate}
                    label="Service Start Date"
                    required
                    placeholder="dd-mm-yyyy"
                    type="date"
                    name="serviceStartDate"
                    value={formik?.values?.serviceStartDate}
                    onChange={formik.handleChange}
                    error={getError(formik, "serviceStartDate")?.isTrue}
                    helperText={
                      getError(formik, "serviceStartDate")?.isTrue &&
                      getError(formik, "serviceStartDate")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  /> */}
                  <Datepicker
                    label={
                      <>
                        Service Start Date
                        <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    sx={{
                      width: "100%",
                    }}
                    format="DD/MM/YYYY"
                    value={dayjs(formik?.values?.serviceStartDate)}
                    textFieldProps={{
                      name: "serviceStartDate",
                      error: getError(formik, "serviceStartDate")?.isTrue,
                      helperText:
                        getError(formik, "serviceStartDate")?.isTrue &&
                        getError(formik, "serviceStartDate")?.message,
                      disabled: isView,
                      onBlur: formik?.handleBlur,
                    }}
                    onChange={(value) => {
                      console.log("value >>>>>>", value);
                      formik?.setFieldValue(
                        "serviceStartDate",
                        value ? formatedDate(value?.$d) : null
                      );
                    }}
                    disabled={isView}
                    // maxDate={dayjs(formik?.values?.serviceEndtDate) || null}
                  />
                </Grid>
                <Grid container item xs={4}>
                  {/* <Textfield
                    ref={endDate}
                    label="Service End Date"
                    placeholder="dd-mm-yyyy"
                    type="date"
                    name="serviceEndDate"
                    value={formik?.values?.serviceEndDate}
                    onChange={formik.handleChange}
                    error={getError(formik, "serviceEndDate")?.isTrue}
                    helperText={
                      getError(formik, "serviceEndDate")?.isTrue &&
                      getError(formik, "serviceEndDate")?.message
                    }
                    disabled={isView}
                    fullWidth
                    onBlur={formik?.handleBlur}
                  /> */}
                  <Datepicker
                    label={
                      <>
                        Service End Date
                        <span style={{ color: "red" }}>*</span>
                      </>
                    }
                    sx={{
                      width: "100%",
                    }}
                    format="DD/MM/YYYY"
                    value={dayjs(formik?.values?.serviceEndDate)}
                    textFieldProps={{
                      name: "serviceEndDate",
                      error: getError(formik, "serviceEndDate")?.isTrue,
                      helperText:
                        getError(formik, "serviceEndDate")?.isTrue &&
                        getError(formik, "serviceEndDate")?.message,
                      disabled: isView,
                      onBlur: formik?.handleBlur,
                    }}
                    onChange={(value) => {
                      console.log("value >>>>>>", value);
                      formik?.setFieldValue(
                        "serviceEndDate",
                        value ? formatedDate(value?.$d) : value
                      );
                    }}
                    minDate={dayjs(formik?.values?.serviceStartDate) || null}
                    disabled={isView}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid container item xs={4}>
                  <AutoComplete
                    options={PaymentService}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        label={
                          <>
                            Billing type
                            <span style={{ color: "red" }}>*</span>
                          </>
                        }
                        fullWidth
                        type="text"
                        name="billingType"
                        placeholder="Select Billing Type"
                        error={getError(formik, "billingType")?.isTrue}
                        helperText={
                          getError(formik, "billingType")?.isTrue &&
                          getError(formik, "billingType")?.message
                        }
                        onBlur={formik?.handleBlur}
                      />
                    )}
                    value={formik?.values?.billingType}
                    fullWidth
                    onChange={(_, selectedOption: Record<string, any>) => {
                      formik?.setFieldValue("billingType", selectedOption);
                    }}
                    disabled={isView}
                  />
                </Grid>
                {formik?.values?.billingType?.value === "PAID" && (
                  <Grid container item xs={4}>
                    <FileUpload
                      handleFileUpload={handleFileUpload}
                      onProgress={(flag: boolean) => {
                        setBtnDisable(flag);
                      }}
                      showNote={true}
                      isDisable={isView}
                    />
                  </Grid>
                )}
              </Grid>
              <CustomDivier style={{ marginTop: "10px" }} />
              <Grid container item xs={12} spacing={1} rowSpacing={2}>
                <Grid xs={12}>
                  <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography sx={{ fontWeight: "bold" }}>
                      Modules details
                    </Typography>

                    <ActionIconButton
                      sx={{
                        background: COLORS.primary,
                        borderRadius: 1,
                        width: 30,
                        height: 30,
                        "&:hover": {
                          background: COLORS.secondary,
                        },
                      }}
                      actionType={ACTION_ICON_TYPES[0]}
                      onClick={() => addLineItem()}
                      disabled={isView}
                    />
                  </Stack>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <table style={{ borderRadius: "10px" }}>
                    <thead>
                      {TBL_TH?.map((th: any) => (
                        <th
                          style={{
                            width: th.width,
                            textAlign: "center",
                          }}
                        >
                          {th.name}
                        </th>
                      ))}
                      <th colSpan={2} style={{ textAlign: "center" }}>
                        Action
                      </th>
                    </thead>
                    <tbody>
                      {itemTable?.map(
                        (row: Record<string, any>, index: number) => (
                          <tr key={index}>
                            <td>
                              <AutoComplete
                                options={parentServices}
                                renderInput={(params) => (
                                  <Textfield
                                    {...params}
                                    fullWidth
                                    type="text"
                                    name="parentModule"
                                    placeholder="Select service"
                                  />
                                )}
                                value={row?.parentModule || null}
                                fullWidth
                                onChange={(
                                  _,
                                  selectedOption: Record<string, any>
                                ) => {
                                  setItemData(
                                    selectedOption,
                                    "parentModule",
                                    index
                                  );
                                }}
                                disabled={isView}
                              />
                            </td>
                            <td>
                              <Textfield
                                placeholder="Number of users"
                                type="text"
                                name="numberOfUser"
                                value={row?.numberOfUser || ""}
                                onChange={(event: any) => {
                                  setItemData(
                                    event?.target?.value,
                                    "numberOfUser",
                                    index
                                  );
                                }}
                                // disabled={isView}
                                fullWidth
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                disabled={isView}
                              />
                            </td>
                            {formik?.values?.billingType?.value === "PAID" && (
                              <td>
                                <Textfield
                                  placeholder="Enter cost"
                                  type="text"
                                  name="cost"
                                  value={row?.cost || ""}
                                  onChange={(event: any) => {
                                    setItemData(
                                      event?.target?.value,
                                      "cost",
                                      index
                                    );
                                  }}
                                  // disabled={isView}
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  disabled={isView}
                                />
                              </td>
                            )}

                            <td style={{ textAlign: "center" }}>
                              <ActionIconButton
                                actionType={ACTION_ICON_TYPES[4]}
                                onClick={() => {
                                  removeLineItem(index);
                                }}
                                title="Remove"
                                disabled={isView}
                              >
                                <CloseRoundedIcon
                                  fontSize="medium"
                                  color="error"
                                />
                              </ActionIconButton>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </Grid>
              </Grid>
              <Grid container item xs={12} justifyContent={"end"} spacing={1}>
                <h5>Total cost: {formik?.values?.totalCost || 0}</h5>
              </Grid>
            </Grid>

            {/* *************** Table item **************/}
            {!isView && (
              <Grid
                container
                item
                xs={12}
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
                style={{ marginTop: "15px" }}
              >
                <ButtonV1
                  type="submit"
                  disabled={formik.isSubmitting || btnDisable}
                  style={{
                    background: COLORS.primary,
                    fontSize: 14,
                  }}
                >
                  {isAdd ? "Submit" : "Update"}
                </ButtonV1>
              </Grid>
            )}
          </form>
        </Grid>
      </ContainerBoxV2>
      <BackDropLoader loading={spinner} />
    </>
  );
}

export default AddEditViewBilling;

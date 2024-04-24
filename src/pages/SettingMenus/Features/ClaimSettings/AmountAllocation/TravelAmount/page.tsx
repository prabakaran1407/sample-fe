/** @format */

import React, { memo, useEffect, useMemo, useState } from "react";
import AgDataGrid from "../../../../../../components/AG-GRID/DataGrid/AgDataGrid.tsx";
import {
  ContainerBoxV2,
  ActionIconButton,
  ActionModal,
  Textfield,
  ButtonV1,
  ActionItems,
  ActionConfirmation,
  PillTab,
  AutoComplete,
} from "../../../../../../components/MUI/mui.index.tsx";
import { TNestedObj, Ipayload } from "../../../../../../types/global.types.ts";
import { Box, Button, Grid, InputLabel, Stack } from "@mui/material";
import { ColDef } from "ag-grid-community";

// ************* Const
import { ACTION_ICON_TYPES } from "../../../../../../data/AppConst.ts";
import CustomCellRenderValues from "../../../../../../components/CustomCellAgGrid/CustomCellRenderValues.tsx";
import GetHeaderParams from "../../../../../../components/CustomCellAgGrid/CustomHeaderValue.tsx";

// ******* Service
import ClaimSettingManagementService from "../../apis/Claim/TypeOfClaim";
import AmountAllocationService from "../../apis/Claim/AmountAllocation";
import SettingService from "../../../../../../services/settings/settings.service.ts";

// ************** Util
import {
  getSkipCount,
  GET_CONST_FROM_AUTH,
} from "../../../../../../utils/index.ts";
import { COLORS } from "../../../../../../utils/globals.ts";
import { useAppSelector } from "../../../../../../hooks/index.ts";
import _ from "lodash";

// ************** | Form schema
import { useFormik } from "formik";
import * as yup from "yup";

import { toast } from "react-toastify";
import { Add, Cancel, CheckCircle } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";

const formActionType = ({ actionType, data }: Record<string, any>) => {
  return {
    isAdd: actionType === ACTION_ICON_TYPES[0],
    isEdit: actionType === ACTION_ICON_TYPES[1],
    isView: actionType === ACTION_ICON_TYPES[2],
    id: data?._id,
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
}

const validationSchema = yup.object({
  typeOfTravel: yup
    .object()
    .shape({
      label: yup.string().required("Type of travel is required"),
      value: yup.string().required("Type of travel is required"),
    })
    .required("Type of travel is required"),
  role: yup
    .object()
    .shape({
      label: yup.string().required("Role is required"),
      value: yup.string().required("Role is required"),
    })
    .required("Role is required"),
  amount: yup
    .string()
    .trim()
    .required("Amount is required.")
    .notOneOf([" "], "Amount should not contain spaces."),
});

function AddEditViewModal(props: IAddEditViewModal) {
  let { open, handleClose, actionType, data, refresh, render } = props;

  const { isAdd, isEdit, isView, id } = formActionType({
    actionType,
    data,
  });
  const AUTH = useAppSelector((state) => state?.auth);
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(AUTH), []);
  const [formvalue, setFormValue] = useState<Record<string, any>>({
    typeOfTravel: null,
    role: null,
    amount: null,
    checked: true,
  });
  const [travelType, setTravelType] = useState<Record<string, any>[]>([]);
  const [roleData, setRoleData] = useState<Record<string, any>[]>([]);

  const handleSubmit = async (value: Record<string, any>) => {
    try {
      let data: any = {
        typeOfTravel: value?.typeOfTravel?.value,
        userRole: value?.role?.value,
        amount: value?.amount,
        status: value?.checked,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      } as Ipayload;

      const response = await AmountAllocationService.getTravelAmountList({
        status: true,
        organization_id: AUTH?.data?.userRecord?.organization_id,
      });

      const temp = response?.data?.data?.find((item: any) => {
        return (
          item.typeOfTravel?._id === data.typeOfTravel &&
          item.userRole._id === data.userRole &&
          item.organization_id._id === data.organization_id
        );
      });

      if (isEdit) {
        await AmountAllocationService.updateTravelAllocationData(data, id);
        ResetForm();
        refresh && refresh();
        handleClose && handleClose();
      } else {
        if (!temp) {
          await AmountAllocationService.createTravelAmountAllocation(data);
          ResetForm();
          refresh && refresh();
          handleClose && handleClose();
        } else {
          formik.setFieldError("amount", "Amount already allocated.");
        }
      }
    } catch (error: any) {
      if (!error?.message) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  const formik = useFormik({
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    initialValues: formvalue,
    enableReinitialize: true,
  });

  const getError = (fmk: any, field: string) => ({
    isTrue: Boolean(fmk?.errors[field] && fmk?.touched[field]),
    message: fmk?.errors[field],
  });

  const setDataForEditView = () => {
    setFormValue({
      typeOfTravel: {
        label: data?.typeOfTravel?.modeOfTransport,
        value: data?.typeOfTravel?._id,
      },
      role: {
        label: data?.userRole?.value,
        value: data?.userRole?._id,
      },
      amount: data?.amount,
      checked: data?.status,
    });
  };

  const ResetForm = () => {
    formik.resetForm();
    setFormValue({
      typeOfTravel: null,
      role: null,
      amount: null,
      checked: true,
    });
  };

  useEffect(() => {
    if (isEdit || isView) {
      setDataForEditView();
    }
    return () => {};
  }, [render]);

  // ******************** Get initial Data
  const getInitialData = async () => {
    try {
      // Type Of Travel
      let TravelTypeList =
        await ClaimSettingManagementService.getAllTypesOfTravel(
          true,
          AUTH?.data?.userRecord?.organization_id
        );
      let travelOptions = TravelTypeList?.data || [];
      let travelTypes = travelOptions?.map((value: any) => ({
        label: value.modeOfTransport,
        _id: value.id,
        value: value.id,
      }));
      setTravelType(travelTypes || []);

      // Role Data
      let roleList = await SettingService.list(
        {
          matchObj: {
            isActive: true,
            settingsType: CONSTANT_DATA?.SETTING_TYPES[1],
            subTypes: CONSTANT_DATA?.SETTING_SUB_TYPES[1],
          },
          organization_id: AUTH?.data?.userRecord?.organization_id,
        },
        "?isCount=true"
      );
      let roleOptions = roleList?.data?.response?.data || [];
      let roleTypes = roleOptions?.map((value: any) => ({
        label: value.value,
        _id: value._id,
        value: value._id,
      }));
      setRoleData(roleTypes || []);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    getInitialData();
  }, [render]);

  const disabledSxProp: any = useMemo(
    () =>
      isView
        ? {
            "& .MuiInputBase-input": {
              backgroundColor: "transparent",
            },
            "& .MuiInputBase-input.Mui-disabled": {
              opacity: 1,
              "-webkit-text-fill-color": "rgb(0, 0, 0, 1)",
            },
          }
        : {},
    []
  );

  return (
    <ActionModal
      open={open}
      onClose={() => {
        ResetForm();
        handleClose && handleClose();
      }}
      title={
        actionType === ACTION_ICON_TYPES[0]
          ? "New Travel Amount Allocation"
          : actionType === ACTION_ICON_TYPES[1]
          ? "Edit Travel Amount Allocation"
          : "View Travel Amount Allocation"
      }
      modalWidth="40%"
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
        <form onSubmit={formik.handleSubmit} style={{ width: "70%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Type Of Travel <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={travelType}
                  getOptionLabel={(option: any) => {
                    return option.label;
                  }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="typeOfTravel"
                      placeholder="Select type of travel"
                      error={getError(formik, "typeOfTravel")?.isTrue}
                      helperText={
                        getError(formik, "typeOfTravel")?.isTrue &&
                        getError(formik, "typeOfTravel")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.typeOfTravel || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("typeOfTravel", selectedOption);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Role <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <AutoComplete
                  options={roleData}
                  getOptionLabel={(option: any) => {
                    return option.label;
                  }}
                  renderInput={(params) => (
                    <Textfield
                      {...params}
                      fullWidth
                      type="text"
                      name="role"
                      placeholder="Select role"
                      error={getError(formik, "role")?.isTrue}
                      helperText={
                        getError(formik, "role")?.isTrue &&
                        getError(formik, "role")?.message
                      }
                      onBlur={formik?.handleBlur}
                    />
                  )}
                  value={formik?.values?.role || null}
                  fullWidth
                  onChange={(_, selectedOption: Record<string, any>) => {
                    formik?.setFieldValue("role", selectedOption);
                  }}
                  disabled={isView || isEdit}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <InputLabel
                  shrink
                  sx={{ fontSize: 18, fontWeight: "600", color: "#181C32" }}
                >
                  Amount <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Textfield
                  type="number"
                  name="amount"
                  value={(formik?.values?.amount?.toString() || "").trimStart()}
                  fullWidth
                  error={getError(formik, "amount")?.isTrue}
                  helperText={
                    getError(formik, "amount")?.isTrue &&
                    getError(formik, "amount")?.message
                  }
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  placeholder="Enter amount"
                  disabled={isView}
                  sx={disabledSxProp}
                />
              </Box>
            </Grid>

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
                    disabled={
                      formik?.isSubmitting ||
                      !formik.isValid ||
                      !formik.values.amount
                    }
                    type="submit"
                    style={{ height: 38, fontSize: 14, width: "30%" }}
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

// ********************* | Main List Page | *****************
function TravelAmountAllocation() {
  const AUTH = useAppSelector((state: any) => state?.auth);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [actionType, setActionType] = useState<string>(ACTION_ICON_TYPES[0]);
  const [rowItem, setRowItem] = useState<TNestedObj>({});
  const [render, reRender] = useState(0);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [activatedTab, setActivatedTab] = useState<number>(0);
  const [typeOfTravel, setTypeOfTravel] = useState<Record<string, any>[]>([]);
  const [selectedTravel, setSelectedTravel] = useState<any>(null);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // **************Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [openConfirmation, setOpenConfirmation] = useState<Record<string, any>>(
    {
      open: false,
      title: null,
      message: null,
    }
  );

  const handleTabSelect = (_element: HTMLElement, selection: number) => {
    setActivatedTab(selection);
    setIsActive(selection === 0);
    setPage(1);
  };

  //******************** handle */
  const handleModalOpen = (setType: string) =>
    setType === "OPEN" ? setOpenModal(true) : setOpenModal(false);
  const handleClose = () => setOpenModal(false);

  // Edit and view
  const handleEdit = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[1]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleView = (value: TNestedObj) => {
    handleModalOpen("OPEN");
    setActionType(ACTION_ICON_TYPES[2]);
    setRowItem(value);
    reRender(Math.random());
  };

  const handleDelete = (value: TNestedObj) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[4]);
    setOpenConfirmation({
      open: true,
      title: "Deactivate Amount Allocation",
      message: `Are you sure you want to deactivate this travel amount allocation?`,
    });
  };

  const handleActivate = (value: Record<string, any>) => {
    setRowItem(value);
    setActionType(ACTION_ICON_TYPES[9]);
    setOpenConfirmation({
      open: true,
      title: "Activate Amount Allocation",
      message: `Are you sure you want to activate this travel amount allocation?`,
    });
  };

  const getTravelData = async () => {
    try {
      let TravelTypeList =
        await ClaimSettingManagementService.getAllTypesOfTravel(
          true,
          AUTH?.data?.userRecord?.organization_id
        );

      let travelOptions = TravelTypeList?.data || [];
      let travelTypes = travelOptions?.map((value: any) => ({
        label: value.modeOfTransport,
        value: value.id,
      }));
      setTypeOfTravel(travelTypes || []);
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getList = async () => {
    setSpinner(true);
    let payload = {
      status: isActive,
      organization_id: AUTH?.data?.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
      typeOfTravel: selectedTravel?.value ? selectedTravel?.value : null,
    };
    const response = await AmountAllocationService.getTravelAmountList(payload);

    if (response?.status) {
      setTableData(response?.data?.data || []);
      setTotalCount(response?.data?.totalCount);
    }
    setSpinner(false);
  };

  useEffect(() => {
    getTravelData();
  }, []);

  useEffect(() => {
    getList();
  }, [page, pageSize, activatedTab, selectedTravel]);

  const activeDeactive = async () => {
    setActionLoading(true);
    try {
      let data = {
        status: !isActive,
      } as Record<string, any>;
      let id: any = rowItem._id;
      await AmountAllocationService.updateTravelAllocationData(data, id);
      getList();
      setOpenConfirmation({
        open: false,
        title: null,
        message: null,
      });
    } catch (error: any) {
      if (!error?.response?.data?.status) {
        toast.error(error?.response?.data?.message || "", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    setActionLoading(false);
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Type Of Travel",
        field: "typeOfTravel.modeOfTransport",
        filter: true,
        width: 400,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "typeOfTravel.modeOfTransport",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Role",
        field: "userRole.value",
        filter: true,
        width: 400,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "userRole.value",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Amount",
        field: "amount",
        filter: true,
        width: 400,
        cellRenderer: CustomCellRenderValues,
        cellRendererParams: {
          field: "amount",
        },
        ...GetHeaderParams(),
      },
      {
        headerName: "Actions",
        field: "",
        filter: true,
        width: 300,
        cellRenderer: ActionItems,
        cellRendererParams: {
          permission: {
            can_delete: activatedTab === 0 ? true : false,
            can_edit: activatedTab === 0 ? true : false,
            can_view: true,
            can_activate: activatedTab === 0 ? false : true,
          },
          enableActions: ACTION_ICON_TYPES,
          handleEdit: handleEdit,
          handleView: handleView,
          handleDelete: handleDelete,
          handleActivate: handleActivate,
        },
        ...GetHeaderParams({
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }),
      },
    ],
    [activatedTab]
  );

  const TABS = useMemo(
    () => [
      {
        label: "Active Allocations",
        icon: <CheckCircle fontSize="small" />,
      },
      {
        label: "Deactivated Allocations",
        icon: <Cancel fontSize="small" />,
      },
    ],
    []
  );

  return (
    <>
      <div>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            <Grid item xs={8}>
              <PillTab
                tabMenus={TABS}
                selectedTab={handleTabSelect}
                value={activatedTab}
              />
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <AutoComplete
                    options={typeOfTravel}
                    getOptionLabel={(option: any) => {
                      return option.label;
                    }}
                    renderInput={(params) => (
                      <Textfield
                        {...params}
                        fullWidth
                        type="text"
                        name="typeOfTravel"
                        placeholder="Select type of travel"
                      />
                    )}
                    fullWidth
                    value={selectedTravel}
                    onChange={(_, selectedOption: Record<string, any>) => {
                      setSelectedTravel(selectedOption);
                    }}
                  />
                  <ActionIconButton
                    actionType={ACTION_ICON_TYPES[6]}
                    sx={{
                      background: COLORS.primary,
                      borderRadius: 1,
                      width: 38,
                      height: 38,
                      mx: 1,
                      "&:hover": {
                        background: COLORS.secondary,
                      },
                    }}
                    onClick={() => {
                      getList();
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      setActionType(ACTION_ICON_TYPES[0]);
                      setOpenModal(true);
                    }}
                    sx={{ height: 38 }}
                  >
                    <Add sx={{ fontSize: 18, mr: 1 }} /> Add
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </ContainerBoxV2>
        <ContainerBoxV2 styles={{ padding: 0 }}>
          <Grid container xs={12}>
            {spinner ? (
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
              <AgDataGrid
                rowData={tableData}
                columnDefs={columnDefs}
                TableHeight={55}
                rowHeight={50}
                noDataTxt="No Records Found"
                loading={false}
                serverSidePagination={Boolean(totalCount)}
                pageSize={pageSize}
                totalDataCount={totalCount}
                serverRowSize={pageSize}
                currentPage={page}
                serverPageCount={Math.ceil(totalCount / pageSize)}
                setServerRowSize={(rowSize: number) => {
                  setPageSize(rowSize);
                }}
                setServerSidePage={(_e: any, p: number) => {
                  setPage(p);
                }}
                page={page}
                setPageSize={setPageSize}
                setPage={setPage}
              />
            )}
          </Grid>
        </ContainerBoxV2>
        <AddEditViewModal
          actionType={actionType}
          handleClose={handleClose}
          open={openModal}
          data={rowItem}
          refresh={() => {
            getList();
          }}
          render={render}
        />
      </div>

      <ActionConfirmation
        title={openConfirmation?.title}
        open={openConfirmation.open}
        message={openConfirmation?.message}
        confirmAction={() => {
          activeDeactive();
        }}
        onClose={() => {
          setOpenConfirmation({
            ...openConfirmation,
            open: false,
          });
        }}
        loading={actionLoading}
        children={<></>}
      />
    </>
  );
}

export default memo(TravelAmountAllocation);

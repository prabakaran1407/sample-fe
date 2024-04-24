/** @format */

import React, { useState, useEffect, useMemo } from "react";

import * as _ from "lodash";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { SecondaryLoadScreen } from "../loader/SecondaryLoadScreen";
import ClaimSettingManagementService from "../../claim/apis/Claim/TypeOfClaim";
import GradeService from "../../claim/apis/Claim/GradeSelection";

import AmountAllocationService from "../../claim/apis/Claim/AmountAllocation";
import { useSelector } from "react-redux";
import { CloseRounded } from "@mui/icons-material";
import { GET_CONST_FROM_AUTH } from "../../../../utils/index.ts";
import SettingService from "../../../../services/settings/settings.service.ts";

type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  id: any;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};



const RoomAllocationModal: React.FC<Props> = (props: Props) => {
  const { show, handleClose }: Props = props;
  return (
    <Modal
      open={show}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormField {...props} />
      </Box>
    </Modal>
  );
};
const FormField = ({ show, handleClose, id }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const [optionsClass, setOptionsClass] = useState([]);
  const [, _setSelectedLevel] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [primaryLoad, setPrimaryLoad] = useState(true);
  const [_category, setCategory] = useState({ label: "", id: "" });
  const [className, setClassName] = useState({ label: "", id: "" });
  const [roleData, setRoleData] = useState<any>({ label: "", id: "" });
  const [_amount, setAmount] = useState("");
  const [roomRent, setRoomRent] = useState("");
  const [typeOfClaim, setTypeOfClaim] = useState({ label: "", id: "" });
  const [checked, setChecked] = useState(true);
  const user = useSelector(({ auth }) => auth);
  // const [role, _setRole] = useState(staticRoles);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      typeOfClaim: typeOfClaim?.id,
      class: className?.id,
      userRole: roleData1?.value,
      costOfRoom: roomRent,
      status: checked,
      organization_id: user.data.userRecord?.organization_id,
    };
    if (id) {
      await AmountAllocationService.updateRoomAllocationData(data, id)
        .then((_res: any) => {
          handleClose(true);
        })
        .catch((err: any) => {
          setError(err.message);
        });
      setLoading(false);
    } else {
      const dataGet = {
        typeOfClaim: typeOfClaim?.id,
        class: className?.id,
        userRole: roleData?.label,
        // costOfRoom: roomRent,
        status: checked,
        organization_id: user.data.userRecord?.organization_id,
      };
      await AmountAllocationService.getAllRoomRentAllocationData(dataGet)
        .then(async (res) => {
          if (res.data.length === 0) {
            await AmountAllocationService.createRoomRentAllocation(data)
              .then(() => {
                handlePostSubmission();
                setTimeout(() => {
                  handleClose(true);
                }, 2000);
              })
              .catch((err) => {
                setError(err.message);
              });
            setLoading(false);
          } else {
            setError("Amount Already Allocated");
          }
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    }
  }

  function handlePostSubmission() {
    setSuccess(true);
    cleanUp();
  }

  function cleanUp() {
    setError("");
  }

  async function getData() {
    await ClaimSettingManagementService.getAllClaimTypes({
      status: true,
      organization_id: user.data.userRecord?.organization_id,
    })
      .then((res) => {
        let tempData = res.data?.data;
        // let Data = tempData.filter(
        //   (value: any) => value?.typeOfClaim == "OUTSTATION"
        // );
        let categoriesOption = _.reduce(
          tempData,
          (result: any, value: any): any => {
            let temp: Array<any> = result;
            temp.push({
              label: value.typeOfClaim,
              id: value.id,
              value,
            });
            return temp;
          },
          []
        );
        setOptions(categoriesOption);
      })
      .catch((err) => console.log(err.message));

    await GradeService.getAllClass(true).then((res) => {
      let tempData = res.data;
      let classOption = _.reduce(
        tempData,
        (result: any, value: any): any => {
          let temp: Array<any> = result;
          temp.push({
            label: value.className,
            id: value.id,
            value,
          });
          return temp;
        },
        []
      );
      setOptionsClass(classOption);
    });

    if (id) {
      await AmountAllocationService.getRoomRentAmountAllocationById(id)
        .then((res) => {
          const data = res.data;

          setTypeOfClaim({
            label: data?.typeOfClaim.typeOfClaim,
            id: data?.typeOfClaim?.id,
          });
          setClassName({
            label: data?.class.className,
            id: data?.class.id,
          });
          setRoleData({
            label: data?.userRole,
            id: data?.userRole,
          });
          setRoleData1({
            label: data?.userRole?.value,
            value: data?.userRole?.id,
          });
          setAmount(data?.amount);
          setRoomRent(data?.costOfRoom);
          setChecked(data?.status);
        })
        .catch((err) => setError(err.message));
    }
    setPrimaryLoad(false);
  }

  useEffect(() => {
    if (!show) return;
    setPrimaryLoad(true);
    getData();
  }, [show, id]);

  const [roleData1, setRoleData1] = useState<any>({ label: "", id: "" });
  const [roleOptions, setRoleOptions] = useState<any>([]);
  const [, setSelectedRoleId] = useState();
  const CONSTANT_DATA = useMemo(() => GET_CONST_FROM_AUTH(user), []);

  const fetchRoleOptions = async (query: any) => {
    try {
      const payload = {
        matchObj: {
          settingsType: CONSTANT_DATA?.SETTING_TYPES[1],
          subTypes: CONSTANT_DATA?.SETTING_SUB_TYPES[1],
        },
        organization_id: user?.data?.userRecord?.organization_id,
      };

      const response = await SettingService.list(payload, query);
      const roles = response?.data?.response?.data;

      setRoleOptions(
        roles.map((label: any) => ({
          label: label?.value,
          value: label?._id,
        }))
      );
    } catch (error) {
      console.error("Error fetching role options:", error);
    }
  };

  useEffect(() => {
    fetchRoleOptions("");
  }, []);

  return (
    <>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container-xl px-10 py-10">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            pb={4}
          >
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              {!id ? "New" : "Modify"} Room Rent Allocation
            </Typography>

            <IconButton
              onClick={(_e) => {
                cleanUp();
                setCategory({ id: "", label: "" });
                success ? handleClose(true) : handleClose(false);
                setSuccess(false);
              }}
            >
              <CloseRounded />
            </IconButton>
          </Box>

          {!primaryLoad ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option: any) => {
                  return option.label;
                }}
                value={typeOfClaim}
                onChange={(_event, value: any) => {
                  setTypeOfClaim({
                    ...typeOfClaim,
                    label: value?.label,
                    id: value?.id,
                  });
                }}
                sx={{ width: 320, mb: 2 }}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Type of Claim" />
                )}
              />

              <Autocomplete
                disablePortal
                options={optionsClass}
                defaultValue={!id ? { label: "", id: "" } : className}
                getOptionLabel={(option: any) => {
                  return option.label;
                }}
                onChange={(_event, value: any) => {
                  setClassName({
                    ...className,
                    label: value?.label,
                    id: value?.id,
                  });
                }}
                sx={{ width: 320, mb: 3 }}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Class" />
                )}
              />
             <Autocomplete
                disablePortal
                options={roleOptions}
                value={roleData1}
                onChange={(_event, value: any) => {
                  const selectedRoleId = value?._id || "";

                  setRoleData1(value);
                  setSelectedRoleId(selectedRoleId);
                }}
                sx={{ width: 320, mb: 3 }}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="Role" />
                )}
              />

              <TextField
               
                label={
                  <>
             Room Rent<span style={{color:'red'}}> * </span>
                  </>
                }
                size="small"
                autoComplete="off"
                value={roomRent?.trimStart()}
                autoFocus
                onChange={(e) => {
                  setRoomRent(e.target.value.toUpperCase());
                  if (e.target.value !== "") {
                    setError("");
                  }
                }}
                sx={{ width: "320px", mb: 3 }}
              />
              {/* <FormControlLabel
                label="Active Amount Allocation"
                onChange={(_event, value) => setChecked(value)}
                control={<Switch checked={checked} />}
              /> */}
            </Box>
          ) : (
            <div className="mt-10 mb-10">
              <SecondaryLoadScreen />
            </div>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!id ? loading || roomRent === "" : success}
            >
              {!loading && <span className="indicator-label">Save</span>}
              {loading && (
                <span
                  className="indicator-progress"
                  style={{ display: "block" }}
                >
                  Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              )}
            </Button>
          </Box>
        </div>
      </form>
      {error && (
        <Alert variant="filled" severity="error">
          <strong>{error}</strong>
        </Alert>
      )}
      {success && (
        <Alert variant="filled" severity="success">
          <strong>Successfully submitted the data</strong>
        </Alert>
      )}
    </>
  );
};
export { RoomAllocationModal };

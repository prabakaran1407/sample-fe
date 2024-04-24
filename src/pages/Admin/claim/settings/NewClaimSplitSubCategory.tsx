/** @format */

import React, { useState, useEffect } from "react";
// import { Modal } from "react-bootstrap-v5";
import * as _ from "lodash";
import { find } from "lodash";
// import {
//   createClaimTransportCategory,
//   getAllTravelCtegories,
//   updateClaimCategoryTravel,
// } from '../apis/Claim/CreateOptionAPI';

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

// import { SecondaryLoadScreen } from '../loader/SecondaryLoadScreen';

import SplitSubCategoryService from "../apis/Claim/SplitSubCategory";

import { useSelector } from "react-redux";
import { CloseRounded } from "@mui/icons-material";

import CreateOptionApiService from "../../claim/apis/Claim/CreateOptionAPI";
import ProductSettingService from "../../claim/apis/Claim/ProductSettingsAPI";

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
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const NewClaimSplitSubCategoryModal: React.FC<Props> = (props: Props) => {
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

  const [success, setSuccess] = useState(false);
  const [primaryLoad, setPrimaryLoad] = useState(true);
  const [_category, setCategory] = useState({ label: "", id: "" });
  const [_subCategory, _setSubCategory] = useState({ label: "", id: "" });

  const [name, setName] = useState("");
  const [_type, setType] = useState("");
  const [type1, setType1] = useState("");
  const [_selectedLevel, setSelectedLevel] = useState<any>({});
  const [checked, setChecked] = useState(true);
  const user = useSelector(({ auth }) => auth);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      TypeofSubCategory: name.trim().toUpperCase(),
      status: checked,
      transportType: type1,
      organization_id: user.data.userRecord?.organization_id,
    };

    if (id) {
      await CreateOptionApiService.updateClaimCategoryTravel(data, id)
        .then((_res) => {
          handleClose(true);
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    } else {
      await CreateOptionApiService.getAllTravelCtegories(data)
        .then(async (res) => {
          if (res.data.length === 0) {
            await CreateOptionApiService.createClaimTransportCategory(data)
              .then((_res) => {
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
            setError("Already Allocated");
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
    setPrimaryLoad(true);
    await SplitSubCategoryService.requestClaimSplitSubCategoryDataTravel(
      true,
      user?.data.userRecord?.organization_id
    )
      .then((res) => {
        let tempData = res.data;

        let categoriesOption = _.reduce(
          tempData,
          (result, value): any => {
            let temp: Array<any> = result;
            temp.push({
              label: value.modeOfTransport,
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
    if (id) {
      await ProductSettingService.getClaimSpecificCategoryDataModelTravel(id)
        .then((res) => {
          const data = res.data;
          const brandData = {
            id: data.TypeofSubCategory,
            label: data.transportType.modeOfTransport,
          };

          setCategory(brandData);
          setName(data.TypeofSubCategory);
          setType(data.TypeofSubCategory);
          setType1(data.transportType.id);
          setChecked(data.status);
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
              {!id ? "New" : "Modify"} Split Sub Category
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
                alignItems: "start",
              }}
            >
              <InputLabel
                shrink
                sx={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#181C32",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Sub Category <span style={{ color: "red" }}></span>
              </InputLabel>
              <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option: any) => {
                  return option.label;
                }}
                value={find(options, (o: any) => o.id === type1)}
                onChange={(_e, value: any) => {
                  setSelectedLevel(value.value);
                  setType1(value.id);
                  if (value !== "") {
                    setError("");
                  }
                }}
                sx={{ width: 320, mb: 2 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Sub Category"
                  />
                )}
              />
              <InputLabel
                shrink
                sx={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#181C32",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                Sub Category name<span style={{ color: "red" }}>*</span>
              </InputLabel>
              <TextField
                placeholder="Sub Category name"
                size="small"
                autoComplete="off"
                value={name?.trimStart()}
                autoFocus
                onChange={(e) => {
                  setName(e.target.value.toUpperCase());
                  if (e.target.value !== "") {
                    setError("");
                  }
                }}
                sx={{ width: "320px", mb: 3 }}
              />

              {/* <FormControlLabel
                label="Active Split Sub Category"
                onChange={(_event, value) => setChecked(value)}
                control={<Switch checked={checked} />}
              /> */}
            </Box>
          ) : (
            <div className="mt-10 mb-10"></div>
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
              disabled={!id ? loading || name === "" : success}
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
export { NewClaimSplitSubCategoryModal };

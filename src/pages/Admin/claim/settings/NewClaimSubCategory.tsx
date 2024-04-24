/** @format */

import React, { useState, useEffect } from "react";

import {
  Alert,
  Autocomplete,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import { SecondaryLoadScreen } from "../loader/SecondaryLoadScreen";
import { Switch, FormControlLabel } from "@mui/material";

import { requestClaimCategoryDataModel } from "../apis/Claim/SubCategoryApi";
import { KTSVG } from "../apis/helpers";
import CreateOptionApiService from "../../claim/apis/Claim/CreateOptionAPI";
import ProductSettingService from "../../claim/apis/Claim/ProductSettingsAPI";
type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  id: any;
};

const NewClaimSubCategoryModal: React.FC<Props> = ({
  show,
  handleClose,
  id,
}) => {
  return (
    <Dialog
      open={show}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <FormField id={id} handleClose={handleClose} show={show} />
      </DialogContent>
    </Dialog>
  );
};

const FormField = ({ id, handleClose, show }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [options, setOptions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [primaryLoad, setPrimaryLoad] = useState(true);
  const [category, setCategory] = useState({ label: "", id: "" });
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [_subCategoryData, setSubcategoryData] = useState([]);
  const [checked, setChecked] = useState(true);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      type: type,
      parent: category.id,
      isSubCategory: true,
      status: checked,
    };

    if (id) {
      await CreateOptionApiService.updateClaimCategory(data, id)
        .then((_res) => {
          handleClose(true);
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    } else {
      await CreateOptionApiService.createClaimCategory(data)
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
    }
  }

  function handlePostSubmission() {
    setSuccess(true);
    cleanUp();
  }

  function cleanUp() {
    setError("");
  }
  useEffect(() => {
    return () => {
      setLoading(false);
      setName("");
      setType("");
      setPrimaryLoad(false);
      setOptions([]);
      setSuccess(false);
    };
  }, []);
  async function getData() {
    await requestClaimCategoryDataModel(true)
      .then((res) => {
        setSubcategoryData(res.data);
        let tempData = res.data;
        let categoriesOption = tempData.map((category: any) => {
          return {
            label: category.name,
            id: category.id,
            category,
          };
        });
        setOptions(categoriesOption);
      })
      .catch((err) => console.log(err.message));
    if (id) {
      await ProductSettingService.getClaimSpecificCategoryDataModel(id)
        .then((res) => {
          const data = res.data;
          const brandData = {
            id: data.parent.id,
            label: data.parent.name,
          };
          setCategory(brandData);
          setName(data.name);
          setType(data.type);
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container-xl px-10 py-10">
          <div className="modal-header py-2 d-flex justify-content-between border-0">
            <h1>{!id ? "New" : "Modify"} Sub Category</h1>
            {/* begin::Close */}
            <div
              className="btn btn-icon btn-sm btn-light-primary"
              onClick={(_e) => {
                cleanUp();
                setCategory({ id: "", label: "" });
                success ? handleClose(true) : handleClose(false);
                setSuccess(false);
              }}
            >
              <KTSVG
                className="svg-icon-2"
                path="/media/icons/duotune/arrows/arr061.svg"
              />
            </div>
          </div>

          {!primaryLoad && options.length !== 0 ? (
            <div className="mt-5 mb-5 d-flex gap-3 w-100 flex-column ">
              <div className="w-100 d-flex justify-content-center">
                {/* {!primaryLoad && */}
                <Autocomplete
                  disablePortal
                  options={options}
                  value={category}
                  getOptionLabel={(option: any) => {
                    return option.label;
                  }}
                  onChange={(_event, value: any) => {
                    if (value) {
                      setCategory(value);
                      setType(value.category.type);
                    } else {
                      setCategory({ label: "", id: "" });
                      setType("");
                    }
                  }}
                  sx={{ width: 320 }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" label="Category" />
                  )}
                />
                {/* } */}
              </div>

              <div className="mt-5 mb-5 d-flex gap-3 w-100 flex-column ">
                {/* <label className="text-muted text-center fw-bold text-muted d-block fs-7" >
                                    Category Name
                                </label> */}
                <div className="d-flex justify-content-center">
                  <input
                    style={{ width: "320px" }}
                    autoComplete="off"
                    value={name}
                    autoFocus
                    required
                    placeholder="Sub-Category Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <input
                    style={{ width: "320px" }}
                    autoComplete="off"
                    autoFocus
                    value={type}
                    required
                    disabled
                    placeholder="Category Type"
                    onChange={(e) => setType(e.target.value)}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
              </div>

              {/* labelPlacement="start" */}
              <div className="w-100 d-flex justify-content-center gap-4">
                <FormControlLabel
                  label="Active Sub Category"
                  onChange={(_event, value) => setChecked(value)}
                  control={<Switch checked={checked} />}
                />
              </div>
            </div>
          ) : (
            <div className="mt-10 mb-10">
              <SecondaryLoadScreen />
            </div>
          )}

          <div className="text-center mb-2">
            <button
              className="btn btn-sm btn-primary fw-bolder"
              type="submit"
              disabled={
                !id
                  ? loading ||
                    name === "" ||
                    category.id === "" ||
                    error !== "" ||
                    success
                  : success || category.id === ""
              }
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
            </button>
          </div>
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
export { NewClaimSubCategoryModal };

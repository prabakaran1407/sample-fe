/** @format */

import React, { useState, useEffect } from "react";

import { KTSVG } from "../apis/helpers";
import * as _ from "lodash";

import {
  Alert,
  Autocomplete,
  DialogContent,
  Modal,
  TextField,
} from "@mui/material";

import { SecondaryLoadScreen } from "../loader/SecondaryLoadScreen";
import { Switch, FormControlLabel } from "@mui/material";
import CreateOptionApiService from "../../claim/apis/Claim/CreateOptionAPI";
import ProductSettingService from "../../claim/apis/Claim/ProductSettingsAPI";
type Props = {
  open: boolean;
  onClose: (refreshFlag: boolean) => void;
  id: any;
};

const NewClaimCategoryModal: React.FC<Props> = ({ open, onClose, id }) => {
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <DialogContent>
        <FormFields id={id} handleClose={onClose} />
      </DialogContent>
    </Modal>
  );
};
const FormFields = ({ id, handleClose }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [checked, setChecked] = useState(true);
  const [primaryLoad, setPrimaryLoad] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    let data = {
      name: name,
      type: type,
      isSubCategory: false,
      status: checked,
    };

    if (!id) {
      await CreateOptionApiService.createClaimCategory(data)
        .then((_res) => {
          setLoading(false);
          handlePostSubmission();
          setTimeout(() => {
            handleClose(true);
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    } else {
      await CreateOptionApiService.updateClaimCategory(data, id)
        .then(() => {
          handleClose(true);
        })
        .catch((err) => setError(err.message));
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
    if (!id) return;
    async function getData() {
      await ProductSettingService.getClaimSpecificCategoryData(id)
        .then((res) => {
          setName(_.get(res, "data.name"));
          setChecked(_.get(res, "data.status"));
          setType(_.get(res, "data.type"));
        })
        .catch((err) => setError(err.message));
      setPrimaryLoad(false);
    }
    setPrimaryLoad(true);
    getData();
  }, [id]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container-xl px-10 py-10">
          <div className="modal-header py-2 d-flex justify-content-between border-0">
            <h1>{id ? "Modify" : "Add"} Category</h1>
            {/* begin::Close */}
            <div
              className="btn btn-icon btn-sm btn-light-primary"
              onClick={(_e) => {
                cleanUp();
                success ? handleClose(true) : handleClose(false);
                setSuccess(false);
              }}
            >
              <KTSVG
                className="svg-icon-2"
                path="/media/icons/duotune/arrows/arr061.svg"
              />
            </div>
            {/* end::Close */}
          </div>
          {!primaryLoad ? (
            <>
              <div className="mt-5 mb-5 d-flex gap-3 flex-lg-row flex-column justify-content-evenly">
                <div className="w-sm-100 w-lg-50 d-flex justify-content-center align-items-center">
                  <input
                    style={{ width: "320px" }}
                    placeholder="Category Name"
                    autoComplete="off"
                    autoFocus
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>

                <div className="w-sm-100 w-lg-50 d-flex justify-content-center align-items-center">
                  <Autocomplete
                    style={{ width: "320px" }}
                    disablePortal
                    options={["FIXED", "FRESH"]}
                    value={type}
                    onChange={(_event, value: any) => {
                      setType(value);
                    }}
                    // onInputChange={(event, newInputValue) => {
                    //   setType(newInputValue);
                    // }}
                    sx={{ width: 320 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Category Type"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="mt-5 mb-5 d-flex gap-3 flex-lg-row flex-column justify-content-evenly">
                <div className="w-sm-100 w-lg-50"></div>
              </div>

              <div className="w-100 d-flex justify-content-center gap-4 mb-2">
                <FormControlLabel
                  label="Active Category"
                  onChange={(_event, value) => setChecked(value)}
                  control={<Switch checked={checked} />}
                />
              </div>
            </>
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
                  ? !name || loading || error !== "" || success
                  : success || name === ""
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
          <strong>
            {!id
              ? "Successfully submitted the data"
              : "Successfully updated the data"}
          </strong>
        </Alert>
      )}
    </>
  );
};
export { NewClaimCategoryModal };

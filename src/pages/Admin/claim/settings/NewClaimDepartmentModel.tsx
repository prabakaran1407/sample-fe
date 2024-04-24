/** @format */

import React, { useState, useEffect } from "react";

import { KTSVG } from "../apis/helpers";

import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CreateOptionApiService from "../../claim/apis/Claim/CreateOptionAPI";
import { SecondaryLoadScreen } from "../loader/SecondaryLoadScreen";
import { Switch, FormControlLabel } from "@mui/material";

type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  id: any;
};

const NewClaimDepartmentModel: React.FC<Props> = ({
  show,
  handleClose,
  id,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(true);
  const [primaryLoad, setPrimaryLoad] = useState(false);
  const [description, setDescription] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      status: checked,
      note: description,
    };
    if (!id) {
      await CreateOptionApiService.createNewClaimDepartMentCategory(data)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    } else {
      await CreateOptionApiService.updateClaimDepartment(data, id)
        .then((_res) => {
          handlePostSubmission();
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
    setChecked(true);
  }

  async function getData() {
    setPrimaryLoad(false);

    if (id) {
      await CreateOptionApiService.getOneDepartment(show, id)
        .then((res) => {
          const data = res.data;

          setName(data?.name);
          setDescription(data?.note);
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

  return (
    <Dialog
      open={show}
      onClose={() => handleClose(false)}
      maxWidth="md"
      fullWidth
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogTitle>
          <div className="d-flex justify-content-between border-0">
            <h1>{id ? "Modify" : "Add"} Department</h1>
            <div
              className="btn btn-icon btn-sm btn-light-primary"
              onClick={(_e) => {
                setName("");
                setDescription("");
                setError("");
                setChecked(true);
                cleanUp();
                success ? handleClose(true) : handleClose(false);
                setSuccess(false);
              }}
            >
              {/* Replace with your SVG component */}
              <KTSVG
                className="svg-icon-2"
                path="/media/icons/duotune/arrows/arr061.svg"
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          {!primaryLoad ? (
            <>
              <div className="mt-5 mb-5 d-flex gap-3 flex-lg-row flex-column justify-content-evenly">
                <div className="w-sm-100 w-lg-50">
                  <label className="text-muted fw-bold text-muted d-block fs-7">
                    Department Name
                  </label>
                  <input
                    autoComplete="off"
                    autoFocus
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>

                <div className="w-sm-100 w-lg-50">
                  <label className="text-muted fw-bold text-muted d-block fs-7">
                    Description
                  </label>
                  <textarea
                    autoComplete="off"
                    value={description}
                    required={!id ? true : false}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="w-sm-100 w-lg-50 text-center">
                  <FormControlLabel
                    label="Active"
                    control={
                      <Switch
                        onChange={(_event, value) => setChecked(value)}
                        checked={checked}
                      />
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="mt-10 mb-10">
              {/* Replace with your loading component */}
              <SecondaryLoadScreen />
            </div>
          )}

          <div className="text-center mb-2">
            <Button
              className="btn btn-sm btn-primary fw-bolder"
              type="submit"
              disabled={
                !id
                  ? !name || loading || error !== "" || success || !description
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
            </Button>
          </div>
        </DialogContent>
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
    </Dialog>
  );
};
export { NewClaimDepartmentModel };

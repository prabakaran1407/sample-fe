/** @format */

import React, { useState, useEffect } from "react";
import * as _ from "lodash";

import { Alert, Box, Modal } from "@mui/material";
import { SecondaryLoadScreen } from "../loader/SecondaryLoadScreen";
import { Switch, FormControlLabel } from "@mui/material";
import { useSelector } from "react-redux";
import GradeService from "../../claim/apis/Claim/GradeSelection";
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
  width: 200,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  // p: 4,
};

const NewGradeModal: React.FC<Props> = (props: Props) => {
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

  const [success, setSuccess] = useState(false);
  const [primaryLoad, setPrimaryLoad] = useState(true);
  const [grade, setGrade] = useState("");

  const [name, setName] = useState("");

  const [checked, setChecked] = useState(true);
  const user = useSelector(({ auth }) => auth.user);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const data: any = {
      class: grade,
      status: checked,
      organization_id: user?.organization_id,
    };

    if (id) {
      await GradeService.updateGrade(data, id)
        .then((_res) => {
          handleClose(true);
        })
        .catch((err) => {
          setError(err.message);
        });
      setLoading(false);
    } else {
      await GradeService.createGrade(data)
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
    if (id) {
      await GradeService.getOneGrade(id)
        .then((res) => {
          const data = res.data;
          //   setGrade({ ...grade, label: data?.class, id: "1" });
          setGrade(data?.grade);
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
    <>
      {" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="container-xl px-10 py-10">
          <div className="modal-header py-2 d-flex justify-content-between border-0">
            <h1>{!id ? "New" : "Modify"} Grade</h1>

            {/* <div
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
            </div> */}
          </div>

          {!primaryLoad ? (
            <div className="mt-5 mb-5 d-flex gap-3 w-100 flex-column ">
              <div className="mt-5 mb-5 d-flex gap-3 w-100 flex-column ">
                <div className="d-flex justify-content-center">
                  <input
                    style={{ width: "320px" }}
                    autoComplete="off"
                    value={grade}
                    autoFocus
                    required
                    placeholder="Grade"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>
              </div>
                    
              <div className="w-100 d-flex justify-content-center gap-4">
                <FormControlLabel
                  label="Active Grade"
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
export { NewGradeModal };

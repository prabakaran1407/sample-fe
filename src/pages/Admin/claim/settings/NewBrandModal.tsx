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
import { SecondaryLoadScreen } from "../loader/SecondaryLoadScreen";
import ProductSettingService from "../../claim/apis/Claim/ProductSettingsAPI";

import { useSelector } from "react-redux";

import CreateOptionApiService from "../../claim/apis/Claim/CreateOptionAPI";

type Props = {
  show: boolean;
  handleClose: (refreshFlag: boolean) => void;
  id: any;
};

const NewBrandModal: React.FC<Props> = ({ show, handleClose, id }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [checked, setChecked] = useState(true);
  const [primaryLoad, setPrimaryLoad] = useState(false);
  const [_errorMessage, setErrorMessage] = useState("");
  const user = useSelector(({ auth }) => auth.user);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    let compdata: any;
    const data = {
      name: name.trim().toUpperCase(),
      image: url,
      status: checked,
      organization_id: user?.organization_id,
    };
    await CreateOptionApiService.requestBrandDetailsByName(data.name)
      .then((res) => {
        compdata = res.data;
      })
      .catch((err) => {
        setError(err.message);
      });

    if (!id) {
      if (compdata.some((item: { name: any }) => item.name === data.name)) {
        setError(`The brand name '${data.name}' already exists.`);
      } else {
        await CreateOptionApiService.createNewBrand(data)
          .then((_res) => {
            handlePostSubmission();
          })
          .catch((err) => {
            setError(err.message);
          });
        cleanUp();
      }
      setLoading(false);
    } else {
      await CreateOptionApiService.updateBrand(data, id)
        .then((_res) => {
          handlePostSubmission();
        })
        .catch((err) => console.log(err.message));
      setLoading(false);
    }
  }

  function handlePostSubmission() {
    setSuccess(true);
    cleanUp();
    setTimeout(() => {
      handleClose(true);
      setSuccess(false);
    }, 2000);
  }

  function cleanUp() {
    setError("");
    setUrl("");
    setName("");
    setErrorMessage("");
    setLoading(false);
  }

  useEffect(() => {
    if (!id) return;
    // console.log(id)
    async function getData() {
      await ProductSettingService.getSpecificBrandData(id)
        .then((res) => {
          // console.log(res)
          setName(res.data.name);
          setUrl(res.data.image);
          setChecked(res.data.status);
        })
        .catch((err) => console.log(err.message));
      setPrimaryLoad(false);
    }
    setPrimaryLoad(true);
    getData();
  }, []);

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
            <h1>{!id ? "New" : "Modify"} Brand</h1>
            <div
              className="btn btn-icon btn-sm btn-light-primary"
              onClick={(_e) => {
                cleanUp();
                success ? handleClose(true) : handleClose(false);
                setSuccess(false);
              }}
            >
              {/* You might need to replace this with your SVG component */}
              <KTSVG
                className="svg-icon-2"
                path="/media/icons/duotune/arrows/arr061.svg"
              />
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          {!primaryLoad ? (
            <div className="mt-5 mb-5 d-flex flex-wrap gap-3 flex-lg-row flex-column justify-content-center">
              {/* ... rest of your form content ... */}
            </div>
          ) : (
            <div className="mt-10 mb-10">
              {/* Replace with your loading component */}
              <SecondaryLoadScreen />
            </div>
          )}

          {url !== "" && (
            <div className="text-center mb-2">
              <img src={url} alt="uploaded" width={100} className="rounded" />
            </div>
          )}

          <div className="text-center mb-2">
            <Button
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
export { NewBrandModal };

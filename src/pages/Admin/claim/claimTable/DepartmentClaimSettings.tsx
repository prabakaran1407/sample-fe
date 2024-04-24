/**
 * eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { Data } from "../data/DummyData";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DeleteModal } from "../settings/DeleteModal";
import { NewClaimDepartmentModel } from "../settings/NewClaimDepartmentModel";
import { KTSVG } from "../apis/helpers";

type Props = {
  className: string;
  tableData: any;
  reRender: () => void;
  status: string;
};

const DepartmentClaimSettingsTable: React.FC<Props> = ({
  className,
  tableData,
  reRender,
  status,
}) => {
  const tableValuesLength = [10, 20, 30, 50, 100, 200, 500];

  const [length, setLength] = useState("10");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(parseInt(length));
  const [choice, setChoice] = useState(null);
  const [tData, setTData] = useState(tableData);
  const brandOptions: Array<any> = [];
  const [page, setMyPage] = useState(1);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(undefined);
  const [renderModal, setRenderModal] = useState(false);
  const [_renderDeleteModal, setRenderDeleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(undefined);

  function setPage(_event: any, page: number) {
    setMyPage(page);
    const tableLength = parseInt(length);
    const startLength = tableLength * page - tableLength;
    const endLength =
      Data.length < tableLength * page ? Data.length : tableLength * page;
    setStart(startLength);
    setEnd(endLength);
  }

  useEffect(() => {
    tableData.forEach(({ name }: any) => {
      !brandOptions.includes(name) && brandOptions.push(name);
    });
  });

  useEffect(() => {
    function updateTable(choice: any) {
      if (choice == null) {
        setTData(tableData);
      } else {
        const tData = tableData.filter(
          (element: { name: any }) => choice && element.name === choice
        );
        setTData(tData);
      }
    }
    updateTable(choice);
  }, [choice]);

  useEffect(() => {
    if (Math.floor(tData.length / parseInt(length)) < page) {
      setMyPage(1);
      setStart(0);
      setEnd(tData.length);
    }
  }, [tData, length]);

  function generatePages() {
    const floor = tData.length / parseInt(length);
    return Math.ceil(floor);
  }

  useEffect(() => {
    // setMyPage(page)
    const tableLength = parseInt(length);
    if (Math.floor(tData.length / parseInt(length)) < page) {
      setMyPage(1);
      setStart(0);
      setEnd(tData.length);
      return;
    }
    const startLength = tableLength * page - tableLength;
    const endLength =
      Data.length < tableLength * page ? Data.length : tableLength * page;
    setStart(startLength);
    setEnd(endLength);
  }, [length]);

  return (
    <>
      <div className={`card w-100 ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5 flex">
          <div className="card-title w-100 d-flex flex-wrap justify-content-between gap-10">
            <div className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                {status} Department
              </span>
              <span className="text-muted mt-1 fw-bold fs-7">
                Showing {start + 1} - {end} of {tData.length} Department
              </span>
            </div>

            <Autocomplete
              disablePortal
              options={brandOptions}
              onChange={(_event, value) => setChoice(value)}
              sx={{ width: 225 }}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Department" />
              )}
            />
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-130px">Department</th>
                  <th className="min-w-140px">Description</th>
                  <th className="min-w-120px text-end">Action</th>
                </tr>
              </thead>

              <tbody>
                {tData
                  .slice(start, end)
                  .map(({ name, id, note }: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="d-flex justify-content-start flex-column">
                              <div className="text-dark fw-bolder text-hover-primary fs-6">
                                {name}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center text-dark fw-bolder text-hover-primary fs-6">
                            {note}
                          </div>
                        </td>

                        <td>
                          <div className="d-flex justify-content-end flex-shrink-0">
                            <div
                              onClick={() => {
                                setRenderModal(false);
                                setId(id);
                                setRenderModal(true);
                                setShow(true);
                              }}
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            >
                              <KTSVG
                                path="/media/icons/duotune/art/art005.svg"
                                className="svg-icon-3"
                              />
                            </div>
                            <div
                              onClick={() => {
                                setRenderDeleteModal(false);
                                setDeleteId(id);
                                setRenderDeleteModal(true);
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                            >
                              <KTSVG
                                path="/media/icons/duotune/general/gen027.svg"
                                className="svg-icon-3"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between mr-5 ml-5">
          <div style={{ marginLeft: "20px" }}>
            <label className="fw-bold fs-5">Size</label>
            <select
              className="text-muted fw-bold text-muted fs-7"
              style={{
                borderRadius: "5px",
                padding: "20px",
                width: "90px",
                textAlign: "center",
                border: "0",
                outline: "none",
                margin: "10px 0",
                marginTop: "10px",
              }}
              // className="form-check-input"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            >
              {tableValuesLength.map((element, index) => {
                return (
                  <option
                    className="text-muted fw-bold text-muted d-block fs-7"
                    key={index}
                    value={element}
                  >
                    {element}
                  </option>
                );
              })}
            </select>
          </div>
          <Pagination
            count={generatePages()}
            page={page}
            onChange={setPage}
            shape="rounded"
          />
        </div>
        {renderModal && (
          <NewClaimDepartmentModel
            show={show}
            id={id}
            handleClose={(refreshFlag) => {
              setShow(false);
              setRenderModal(false);
              if (!refreshFlag) return;
              reRender();
            }}
          />
        )}

        {
          <DeleteModal
            option="claimDepartment"
            show={showDeleteModal}
            id={deleteId}
            handleClose={(refreshFlag) => {
              setShowDeleteModal(false);
              setRenderDeleteModal(false);
              if (!refreshFlag) return;
              reRender();
            }}
          />
        }
      </div>
    </>
  );
};

export { DepartmentClaimSettingsTable };

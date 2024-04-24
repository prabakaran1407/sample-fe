/** @format */

import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";

import { requestDepartmentData } from "../apis/RequestClaimManagement";
import { NewClaimDepartmentModel } from "../settings/NewClaimDepartmentModel";

import { DepartmentClaimSettingsTable } from "../claimTable/DepartmentClaimSettings";
import { LoadScreen } from "../loader/LoadScreen";

const baseOptions = ["Active Department", "De-Active Department"];

export const DepartmentSettings: any = () => {
  const [choice, setchoice] = useState(baseOptions[0]);

  const [showModal, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  async function getData() {
    await requestDepartmentData(choice === baseOptions[0])
      .then((res) => setTableData(res.data))
      .catch((err) => console.log(err.message));
    setLoading(true);
  }
  useEffect(() => {
    setLoading(false);
    getData();
  }, [choice]);

  return (
    <div className="card mt-5 d-flex flex-wrap flex-stack">
      <div className=" fw-bolder my-2 mt-5 mb-5 d-flex flex-column flex-lg-row justify-content-center gap-5">
        {baseOptions.map((elements, index) => {
          return (
            <button
              style={{ cursor: "pointer", width: "180px" }}
              key={index}
              className={
                choice === elements
                  ? "rounded shadow btn btn-sm btn-primary cursor-pointer"
                  : "btn btn-sm btn-primary cursor-pointer rounded"
              }
              onClick={() => setchoice(elements)}
            >
              {elements}
            </button>
          );
        })}
        <button
          style={{ width: "180px" }}
          className="btn btn-sm btn-primary fw-bolder"
          onClick={() => setShow(true)}
        >
          <AddIcon />
          Add Department
        </button>
      </div>

      <NewClaimDepartmentModel
        show={showModal}
        id={undefined}
        handleClose={(refreshFlag) => {
          setShow(false);
          if (!refreshFlag) return;
          setLoading(false);
          getData();
        }}
      />

      {loading ? (
        <DepartmentClaimSettingsTable
          status={choice === baseOptions[0] ? "Active" : "De-Active"}
          className="mb-5 mt-5 mb-xl-8"
          tableData={tableData}
          reRender={() => {
            setLoading(false);
            getData();
          }}
        />
      ) : (
        <LoadScreen />
      )}
    </div>
  );
};

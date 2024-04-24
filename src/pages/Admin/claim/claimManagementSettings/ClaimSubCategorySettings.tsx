/** @format */

import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as _ from "lodash";
import { LoadScreen } from "../loader/LoadScreen";
import { ClaimSubCategoryTable } from "../claimTable/ClaimSubCategoryTable";
import { NewClaimSubCategoryModal } from "../settings/NewClaimSubCategory";
import { requestClaimSubCategoryData } from "../apis/Claim/SubCategoryApi";

export const SubCategoryClaimSettings: any = () => {
  const [showModal, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const baseOptions = [
    {
      label: "Active Sub-Category",
      status: true,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "De-Active Sub-Category",
      status: false,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "Add Sub-Category",
      status: true,
      icon: <AddIcon />,
      onClick: (elements: any) => {
        setchoice(elements);
        setShow(true);
      },
    },
  ];
  const [choice, setchoice] = useState(baseOptions[0]);

  async function getData() {
    await requestClaimSubCategoryData(_.get(choice, "status", true))
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => console.log(err.message));
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    getData();
  }, [choice]);

  return (
    <div className="card mt-5 d-flex flex-wrap flex-stack">
      <div className="fw-bolder my-2 mt-5 mb-5 d-flex flex-column flex-lg-row justify-content-center gap-5">
        {baseOptions.map((elements, index) => {
          return (
            <button
              style={{ cursor: "pointer", width: "200px" }}
              key={index}
              className={
                choice.label === _.get(elements, "label")
                  ? "rounded shadow btn btn-sm btn-primary cursor-pointer"
                  : "btn btn-sm btn-primary cursor-pointer rounded"
              }
              onClick={() => {
                elements.onClick(elements);
              }}
            >
              <div className="d-flex justify-content-center align-items-center">
                {elements.icon}
                <div> {elements.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      <NewClaimSubCategoryModal
        id={undefined}
        show={showModal}
        handleClose={(refreshFlag) => {
          setShow(false);
          if (!refreshFlag) return;
          setLoading(true);
          getData();
        }}
      />

      {loading ? (
        <LoadScreen />
      ) : (
        <ClaimSubCategoryTable
          status={_.get(choice, "status", true) ? "Active" : "De-Active"}
          className="w-100 mb-5 mt-5 mb-xl-8"
          tableData={tableData}
          reRender={() => {
            setLoading(true);
            getData();
          }}
        />
      )}
    </div>
  );
};

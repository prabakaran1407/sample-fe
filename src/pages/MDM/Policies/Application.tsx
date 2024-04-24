/**
 * /* eslint-disable jsx-a11y/anchor-is-valid
 *
 * @format
 */

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import AddApplication from "./AddApplication";
import { DeletePolicyModal } from "../components/DeleteModal";
import { Box, Button, Typography } from "@mui/material";

const Application = ({ applicationData, applicationSetData }: any) => {
  const [showAddApplication, setShowAddApplication] = useState(false);
  const [editApplication, setEditApplication] = useState("");
  const [AppDatas, setAppDatas] = useState<any>(applicationData);
  const [renderDelete, setRenderDeleteModal] = useState(false);
  const [deleteApplication, setDeleteApplication] = useState(0);

  const handleClose = (data: any) => {
    setShowAddApplication(false);
    setAppDatas(data);
  };

  const handleOpen = () => {
    setShowAddApplication(true);
    setEditApplication("");
  };

  // const deleteApp = (index: number) => {
  //   const data = AppDatas.applications[index];
  //   const filterData = AppDatas.applications.filter(
  //     (e: any) => e?.packageName !== data?.packageName
  //   );

  //   console.log("filterDAta", index);

  //   setAppDatas({
  //     ...AppDatas,
  //     applications: index,
  //   });
  //   applicationSetData({
  //     ...AppDatas,
  //     applications: index,
  //   });
  // };

  console.log(AppDatas);

  return (
    <>
      <div>
        {showAddApplication ? (
          <AddApplication
            setShowAddApplication={setShowAddApplication}
            applicationData={applicationData}
            applicationSetData={applicationSetData}
            editApplication={editApplication}
            handleClose={handleClose}
          />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Application
              </Typography>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={(_e) => handleOpen()}
              >
                Add Application
              </Button>
            </Box>

            <div
              style={{
                marginTop: 20,
              }}
              className="card-body py-3"
            >
              {/* begin::Table container */}
              <div className="table-responsive">
                {/* begin::Table */}
                {AppDatas?.applications === null ||
                AppDatas?.applications?.length === 0 ? (
                  <h4 style={{ textAlign: "center", marginTop: 50 }}>
                    No Data
                  </h4>
                ) : (
                  <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                    {/* begin::Table head */}
                    <>
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="min-w-140px">Package Name</th>
                          <th className="min-w-140px">Install Type</th>
                          <th className="min-w-140px text-center">Actions</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                        {AppDatas &&
                          AppDatas?.applications &&
                          AppDatas?.applications?.map(
                            (
                              // { installType, packageName }: any,
                              e: any,
                              index: number
                            ) => {
                              return (
                                <tr key={index} className={"text-dark"}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="d-flex justify-content-start flex-column">
                                        <p className="fw-bolder text-hover-primary fs-6">
                                          {`${e?.packageName} `}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="fw-bolder text-hover-primary d-block fs-6">
                                      {e?.installType
                                        ? e?.installType
                                        : "---------"}
                                    </p>
                                  </td>

                                  <td>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                      // className="d-flex justify-content-center flex-shrink-0"
                                    >
                                      <div
                                        onClick={() => {
                                          setEditApplication(e);
                                          setShowAddApplication(true);
                                        }}
                                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                      >
                                        <EditIcon />
                                      </div>

                                      <div
                                        onClick={() => {
                                          setRenderDeleteModal(true);
                                          setDeleteApplication(index);
                                        }}
                                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                      >
                                        <RemoveCircleOutlineIcon />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </>

                    {/* end::Table body */}
                  </table>
                )}
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
          </>
        )}
      </div>
      {renderDelete && (
        <DeletePolicyModal
          option="Application"
          show={renderDelete}
          id={deleteApplication}
          handleClose={() => {
            setRenderDeleteModal(false);
            // setLoading(true);
          }}
          deleteApp={() => {
            const swdw = AppDatas.applications[deleteApplication];
            const tete = AppDatas.applications.filter(
              (e: any) => e.packageName !== swdw.packageName
            );
            console.log(tete);

            setAppDatas({
              ...AppDatas,
              applications: tete,
            });
            applicationSetData({
              ...AppDatas,
              applications: tete,
            });
          }}
        />
      )}
    </>
  );
};

export { Application };

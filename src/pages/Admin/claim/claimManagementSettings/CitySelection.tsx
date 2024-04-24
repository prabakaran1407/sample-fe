/** @format */

import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as _ from "lodash";
import { LoadScreen } from "../loader/LoadScreen";
import { NewCityAllocationModal } from "../settings/NewCityAllocationModal";
import { CitySelectionTable } from "../claimTable/CitySelectionTable";
import GradeService from "../../claim/apis/Claim/GradeSelection";
import { useSelector } from "react-redux";
// import { RootState } from "../../../../../setup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DeleteModal } from "../settings/DeleteModal";
import { ActiveUserModal } from "../settings/ActiveUserModal";
import { getSkipCount } from '../../../../utils/index'

export const City: any = () => {
  const [showModal, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [_renderActiveModal, setRenderActiveModal] = useState(false);
  const user = useSelector(({ auth }) => auth);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const baseOptions = [
    {
      label: "Active Grades",
      status: true,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "DeActivated Grades",
      status: false,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "Add Grade",
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
    let payload = {
      status: _.get(choice, "status", true) ? true : false,
      organization_id: user.data.userRecord?.organization_id,
      skip: getSkipCount(page, pageSize),
      limit: pageSize,
    }
    await GradeService.getAllGrades(
     payload
    )
      .then((res) => {
        setTableData(res?.data?.data);
        setTotalCount(res?.data?.totalCount);
      })
      .catch((err) => console.log(err.message));
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    getData();
  }, [choice, page, pageSize]);

  return (
    <div className="card mt-5 d-flex flex-wrap flex-stack">
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        my={2}
      >
        <Stack spacing={2} direction="row">
          {baseOptions.map((elements, index) => {
            return (
              <Button
                variant="contained"
                style={{ cursor: "pointer", width: "200px" }}
                key={index}
                onClick={() => {
                  elements.onClick(elements);
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {elements.icon}
                  <Typography sx={{ fontSize: 12 }}>
                    {" "}
                    {elements.label}
                  </Typography>
                </Box>
              </Button>
            );
          })}
        </Stack>
      </Box>
      {showModal && (
        <NewCityAllocationModal
          id={undefined}
          show={showModal}
          handleClose={(refreshFlag) => {
            setShow(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
        />
      )}
      {editModal && (
        <NewCityAllocationModal
          id={selectedId}
          show={editModal}
          handleClose={(refreshFlag) => {
            setEditModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
        />
      )}

      {deleteModal && (
        <DeleteModal
          option="Grade"
          id={selectedId}
          show={deleteModal}
          handleClose={(refreshFlag) => {
            setDeleteModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
        />
      )}
      {showActiveModal && (
        <ActiveUserModal
          option="Grade"
          show={showActiveModal}
          id={selectedId}
          handleClose={(refreshFlag) => {
            setShowActiveModal(false);
            setRenderActiveModal(false);
            if (!refreshFlag) return;
            getData();
          }}
        />
      )}

      {loading ? (
        <Box
          sx={{
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <LoadScreen />
        </Box>
      ) : (
        <CitySelectionTable
          reRender={() => {
            setLoading(true);
            getData();
          }}
          status={_.get(choice, "status", true) ? "Active" : "De-Activated"}
          className="w-100 mb-5 mt-5 mb-xl-8"
          tableData={tableData}
          setEditModal={setEditModal}
          setDeleteModal={setDeleteModal}
          setSelectedId={setSelectedId}
          setShowActiveModal={setShowActiveModal}
          pageNew={page}
          setPageNew={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={totalCount}
        />
      )}
    </div>
  );
};

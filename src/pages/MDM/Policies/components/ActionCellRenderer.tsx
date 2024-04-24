/** @format */

import { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box } from "@mui/material";
import { DeletePolicyModal } from "../../components/DeleteModal";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ClonePolicyModal from "./ClonePolicyModal";

function ActionCellRenderer(props: any) {
  const { data, getPoliciesList, editData } = props;
  const [_showDataModal, setShowDataModal] = useState(false);
  const [_renderDataModal, setRenderDataModal] = useState(false);
  const [_viewData, setViewData] = useState("");
  const [renderDelete, setRenderDeleteModal] = useState(false);
  const [_deletePolicy, _setDeletePolicy] = useState("");
  const [_loading, setLoading] = useState(false);
  const [cloneModel, setCloneModel] = useState(false);
  const [_oldValue, setOldValue] = useState<any>({});

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          columnGap: 3,
        }}
      >
        <Box
          onClick={() => {
            setRenderDataModal(false);
            setViewData(data);
            setRenderDataModal(true);
            setShowDataModal(true);
            props?.setEditData(data);
            props?.setShow(true);
          }}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditNoteRoundedIcon />
        </Box>

        <Box
          onClick={() => {
            setRenderDeleteModal(true);
            // setDeletePolicy(data?.name?.split('/')?.slice(-1));
          }}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RemoveCircleOutlineIcon />
        </Box>
        <Box
          onClick={() => {
            setCloneModel(true);
            console.log("oldData", data);
            setOldValue(data);
          }}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FileCopyRoundedIcon />
        </Box>
      </Box>

      {renderDelete && (
        <DeletePolicyModal
          option="Policy"
          show={renderDelete}
          id={data?.name?.split("/")?.slice(-1)?.toString()}
          handleClose={() => {
            setRenderDeleteModal(false);
            setLoading(true);
            getPoliciesList();
          }}
        />
      )}
      {cloneModel && (
        <ClonePolicyModal
          show={cloneModel}
          setCloneModel={setCloneModel}
          getPoliciesList={getPoliciesList}
          editData={editData}
          // id={deletePolicy}
          // handleClose={() => {
          //   setRenderDeleteModal(false);
          //   setLoading(true);
          //   getPoliciesList();
          // }}
        />
      )}
    </>
  );
}

export default ActionCellRenderer;

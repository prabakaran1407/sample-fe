/** @format */

import { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EnrolledDeviceModal from "../EnrolledDevices/EnrolledDeviceModal";
import { DeletePolicyModal } from "./DeleteModal";
import { Box } from "@mui/material";
import LostDeviceModal from "../EnrolledDevices/LostDeviceModal";

function ActionCellRenderer(props: any) {
  const { data, getPoliciesList } = props;
  const [showDataModal, setShowDataModal] = useState(false);
  const [renderDataModal, setRenderDataModal] = useState(false);
  const [showLostDeviceModal, setShowLostDeviceModal] = useState(false);
  const [viewData, setViewData] = useState("");
  const [renderDelete, setRenderDeleteModal] = useState(false);
  const [deletePolicy, _setDeletePolicy] = useState("");
  const [_loading, setLoading] = useState(false);

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
          }}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VisibilityIcon />
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
            setShowLostDeviceModal(true);
          }}
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeviceUnknownIcon />
        </Box>
      </Box>
      {renderDataModal && (
        <EnrolledDeviceModal
          viewData={viewData}
          show={showDataModal}
          handleClose={(refreshFlag: any) => {
            setShowDataModal(false);
            if (!refreshFlag) return;
            // reRender({ where: {} });
          }}
        />
      )}
      {renderDelete && (
        <DeletePolicyModal
          option="Devices"
          show={renderDelete}
          id={deletePolicy}
          handleClose={() => {
            setRenderDeleteModal(false);
            setLoading(true);
            getPoliciesList();
          }}
        />
      )}
      {showLostDeviceModal && (
        <LostDeviceModal
          viewData={viewData}
          show={showLostDeviceModal}
          handleClose={(refreshFlag: any) => {
            setShowLostDeviceModal(false);
            if (!refreshFlag) return;
            // reRender({ where: {} });
          }}
        />
      )}
    </>
  );
}

export default ActionCellRenderer;

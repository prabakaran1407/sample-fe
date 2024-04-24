/** @format */

import { useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";

import { LoadScreen } from "../loader/LoadScreen";
import { NewClaimCategoryModal } from "../settings/NewClaimCategory";
import { ClaimCategoryTable } from "../claimTable/ClaimCategoryTable";
import _ from "lodash";
import { requestClaimCategoryData } from "../apis/Claim/Category";
import { Box, Button, Stack, Typography } from "@mui/material";

export const ClaimCategorySettings: any = () => {
  const [showModal, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseOptions = [
    {
      label: "Active Category",
      status: true,
      icon: <></>,

      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "De-Active Category",
      status: false,
      icon: <></>,

      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "Add Category",
      icon: <AddIcon />,

      onClick: (elements: any) => {
        setchoice(elements);
        setShow(true);
      },
    },
  ];
  const [choice, setchoice] = useState(baseOptions[0]);
  const [tableData, setTableData] = useState([]);

  async function getData() {
    await requestClaimCategoryData(_.get(choice, "status", true))
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
      <div className="w-100 p-5 d-flex flex-column gap-2 flex-lg-row justify-content-between">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
        <NewClaimCategoryModal
          id={undefined}
          open={showModal}
          onClose={(refreshFlag) => {
            setShow(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
        />
      </div>

      {!loading ? (
        <ClaimCategoryTable
          className="mb-5 mt-5 mb-xl-8"
          tableData={tableData}
          status={_.get(choice, "status", true) ? "Active" : "De-Active"}
          reRender={() => {
            setLoading(true);
            getData();
          }}
        />
      ) : (
        <LoadScreen />
      )}
    </div>
  );
};

/** @format */

import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as _ from "lodash";
import { LoadScreen } from "../loader/LoadScreen";

import { NewGradeModal } from "../settings/NewGradeModal";
import { GradeSelectionTable } from "../claimTable/GradeSelectionTable";

import { useSelector } from "react-redux";

import { Box, Button, Stack, Typography } from "@mui/material";
import GradeService from "../../claim/apis/Claim/GradeSelection";

export const Grade: any = () => {
  const [showModal, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const user = useSelector(({ auth }) => auth.user);
  const baseOptions = [
    {
      label: "Active Grade",
      status: true,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "De-Active Grade",
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
    try {
      const gradesData = await GradeService.getAllGrades({
        status: _.get(choice, "status", true),
        organizationId: user?.organization_id,
      });
  
      setTableData(gradesData.data);
    } catch (error:any) {
      console.error('Error fetching grades:', error.message);
    }
  
    setLoading(false);
  }
  
  useEffect(() => {
    setLoading(true);
    getData();
  }, [choice]);

  
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

      <NewGradeModal
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
        <GradeSelectionTable
          reRender={() => {
            setLoading(true);
            getData();
          }}
          status={_.get(choice, "status", true) ? "Active" : "De-Active"}
          className="w-100 mb-5 mt-5 mb-xl-8"
          tableData={tableData}
        />
      )}
    </div>
  );
};

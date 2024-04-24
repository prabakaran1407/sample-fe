/** @format */

import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { AmountAllocationTable } from "../claimTable/AmountAllocationTable";
import { FixedAllocationTable } from "../claimTable/FixedAmountAllocationTable";
import { NewAmountAllocationModal } from "../settings/NewAmountAllocationModal";
import { RoomAllocationModal } from "../settings/RoomAllocationModal";
import { TravelAllocationModal } from "../settings/TravelAllocationModal";
import "./allocation.css";
import { useSelector } from "react-redux";
import { LoadScreen } from "../loader/LoadScreen";
import { ContainerBoxV2 } from "../../../../components/MUI/mui.index";
import { DeleteModal } from "../settings/DeleteModal";
import { ActiveUserModal } from "../settings/ActiveUserModal";
import ClaimSettingManagementService from "../../claim/apis/Claim/TypeOfClaim";
import AmountAllocationService from "../../claim/apis/Claim/AmountAllocation";
import { getSkipCount } from "../../../../utils/index";

export const AmountAllocation: any = () => {
  const [showModal, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [active, setActive] = useState(0);
  const [options, setOptions] = useState([]);
  const [typeOfClaim, setTypeOfClaim] = useState({ label: "", id: "" });
  const [options1, setOptions1] = useState([]);
  const [typeOfTravel, setTypeOfTravel] = useState({ label: "", id: "" });
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [editTravelModal, setEditTravelModal] = useState(false);
  const [editRoomModal, setEditRoomModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTravelModal, setDeleteTravelModal] = useState(false);
  const [deleteRoomModal, setDeleteRoomModal] = useState(false);

  const [selectedId, setSelectedId] = useState("");
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [_renderActiveModal, setRenderActiveModal] = useState(false);
  const [_activeModal, setActiveModal] = useState(false);
  const [activeTravelModal, setActiveTravelModal] = useState(false);
  const [activeRoomModal, setActiveRoomModal] = useState(false);
  const user = useSelector(({ auth }) => auth);

  const baseOptions = [
    {
      label: "Active Allocations",
      status: true,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "DeActivated Allocations",
      status: false,
      onClick: (elements: any) => {
        setchoice(elements);
      },
    },
    {
      label: "Add Allocation",
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
    setLoading(true);

    let fixedAMontPayload = {
      status: _.get(choice, "status", true),
      organization_id: user.data.userRecord?.organization_id,
      typeOfClaim: typeOfClaim?.id ? typeOfClaim?.id : null,
      skip: getSkipCount(page, pageLimit),
      limit: pageLimit,
    };
    await AmountAllocationService.getFixedAmountList(fixedAMontPayload)

      // await AmountAllocationService.getAmountAllocationV2(_.get(choice, "status", true), user.data.userRecord?.organization_id)
      .then((res) => {
        setTableData(res?.data?.data);
        setTotal(res?.data?.totalCount);
      })
      .catch((err) => console.log(err.message));
    setLoading(false);

    await ClaimSettingManagementService.getAllClaimTypes({
      status: true,
      organization_id: user.data.userRecord?.organization_id,
    })
      .then((res) => {
        let tempData = res?.data?.data;
        let categoriesOption = _.reduce(
          tempData,
          (result, value): any => {
            let temp: Array<any> = result;
            temp.push({
              label: value.typeOfClaim,
              id: value.id,
              value,
            });
            return temp;
          },
          []
        );
        setOptions(categoriesOption);
      })
      .catch((err) => console.log(err.message));
  }

  async function getTravelData() {
    setLoading(true);
    let payload = {
      organization_id: user.data.userRecord?.organization_id,
      status: _.get(choice, "status", true),
      typeOfTravel: typeOfTravel?.label ? typeOfTravel.label : null,
    };

    await AmountAllocationService.getTravelAmountList(payload)
      .then((res) => {
        setTableData(res.data?.data);
        setTotal(res?.data?.totalCount);
      })
      .catch((err) => console.log(err.message));
    setLoading(false);

    await ClaimSettingManagementService.getAllTypesOfTravel(
      true,
      user.data.userRecord?.organization_id
    )
      .then((res) => {
        let tempData = res.data;

        let categoriesOption = _.reduce(
          tempData,
          (result, value): any => {
            let temp: Array<any> = result;
            temp.push({
              label: value.modeOfTransport,
              id: value.id,
              value,
            });
            return temp;
          },
          []
        );
        // console
        setOptions1(categoriesOption);
      })
      .catch((err) => console.log(err.message));
  }

  async function getRoomRentData() {
    setLoading(true);

    let payload = {
      status: _.get(choice, "status", true),
      organization_id: user.data.userRecord?.organization_id,
      typeOfClaim: typeOfClaim?.id ? typeOfClaim?.id : null,
    };
    await AmountAllocationService.getRoomRentList(payload)
      .then((res) => {
        setTableData(res?.data?.data);
        setTotal(res?.data?.totalCount);
      })
      .catch((err) => console.log(err.message));
    setLoading(false);

    await ClaimSettingManagementService.getAllClaimTypes({
      status: true,
      organization_id: user.data.userRecord?.organization_id,
    })
      .then((res) => {
        let tempData = res?.data?.data;

        let categoriesOption = _.reduce(
          tempData,
          (result, value): any => {
            let temp: Array<any> = result;
            temp.push({
              label: value.typeOfClaim,
              id: value.id,
              value,
            });
            return temp;
          },
          []
        );
        setOptions(categoriesOption);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    if (active == 0) {
      getData();
    }
    if (active == 1) {
      getTravelData();
    }
    if (active == 2) {
      getRoomRentData();
    }
    return () => {
      setPage(1);
      setPageLimit(10);
      // setTableData([])
    };
    // getClaimData();
  }, [active, choice]);

  useEffect(() => {
    if (active == 0) {
      getData();
    }
    if (active == 1) {
      getTravelData();
    }
    if (active == 2) {
      getRoomRentData();
    }
  }, [typeOfClaim, typeOfTravel, page, pageLimit]);

  const handleChange = (_e: React.SyntheticEvent, value: number) => {
    setLoading(true);
    cleanUp();
    setActive(value);
  };

  function cleanUp() {
    setTypeOfClaim({ label: "", id: "" });
    setTypeOfTravel({ label: "", id: "" });
    // setLoading(false);
  }

  return (
    <>
      <div className="col-md-12 mt-5">
        <div className="row">
          <ContainerBoxV2>
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Grid container>
                <Grid item xs={8}>
                  <Tabs
                    value={active}
                    onChange={(e: any, value: any) => handleChange(e, value)}
                    style={{ fontSize: "2em" }}
                    // centered
                  >
                    <Tab label="Fixed Amount Allocation" />
                    <Tab label="Travel Amount Allocation" />
                    <Tab label="Room Rental Amount Allocation" />
                  </Tabs>
                </Grid>
                <Grid item xs={4}>
                  {active == 0 ? (
                    <div className="col-md-6">
                      <Autocomplete
                        disablePortal
                        options={options ? options : []}
                        value={typeOfClaim}
                        //  defaultValue={ typeOfClaim}
                        getOptionLabel={(category: any) => {
                          return category?.label;
                        }}
                        onChange={(_event, value: any) => {
                          if (_.isEmpty(value)) {
                            setTypeOfClaim({ id: "", label: "" });
                          } else {
                            setTypeOfClaim({
                              ...typeOfClaim,
                              label: value?.label,
                              id: value?.id,
                            });
                          }
                        }}
                        sx={{ width: 500, marginLeft: "auto" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Type of Claim"
                          />
                        )}
                      />
                    </div>
                  ) : active == 1 ? (
                    <div className="col-md-6">
                      <Autocomplete
                        disablePortal
                        options={options1 ? options1 : []}
                        value={typeOfTravel || null}
                        defaultValue={typeOfClaim || null}
                        getOptionLabel={(category: any) => {
                          return category?.label;
                        }}
                        onChange={(_event, value: any) => {
                          if (_.isEmpty(value)) {
                            setTypeOfTravel({ id: "", label: "" });
                          } else {
                            setTypeOfTravel({
                              ...typeOfClaim,
                              label: value?.label,
                              id: value?.id,
                            });
                          }
                        }}
                        // onSelect={handleInputBox}
                        sx={{ width: 500, marginLeft: "auto" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Type Of Travel"
                          />
                        )}
                      />
                    </div>
                  ) : active == 2 ? (
                    <div className="col-md-6">
                      <Autocomplete
                        disablePortal
                        options={options ? options : []}
                        value={typeOfClaim || null}
                        defaultValue={typeOfClaim || null}
                        getOptionLabel={(category: any) => {
                          return category?.label;
                        }}
                        onChange={(_event, value: any) => {
                          if (_.isEmpty(value)) {
                            setTypeOfClaim({ id: "", label: "" });
                          } else {
                            setTypeOfClaim({
                              ...typeOfClaim,
                              label: value?.label,
                              id: value?.id,
                            });
                          }
                        }}
                        sx={{ width: 500, marginLeft: "auto" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Type of Claim"
                          />
                        )}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Box>
          </ContainerBoxV2>
        </div>
      </div>

      <div className="card mt-5 d-flex flex-wrap flex-stack">
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

        {active == 0 ? (
          <NewAmountAllocationModal
            id={undefined}
            show={showModal}
            handleClose={(refreshFlag) => {
              setShow(false);
              if (!refreshFlag) return;
              setLoading(true);
              getData();
            }}
            tableData={tableData}
          />
        ) : active == 1 ? (
          <TravelAllocationModal
            id={undefined}
            show={showModal}
            handleClose={(refreshFlag) => {
              setShow(false);
              if (!refreshFlag) return;
              setLoading(true);
              getTravelData();
            }}
          />
        ) : active == 2 ? (
          <RoomAllocationModal
            id={undefined}
            show={showModal}
            handleClose={(refreshFlag) => {
              setShow(false);
              if (!refreshFlag) return;
              setLoading(true);
              getRoomRentData();
            }}
          />
        ) : (
          ""
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
        ) : active === 0 ? (
          <FixedAllocationTable
            reRender={() => {
              setLoading(true);
              getData();
            }}
            page1={page}
            setPage1={setPage}
            pageLimit1={pageLimit}
            setPageLimit1={setPageLimit}
            total={total}
            active={active}
            status={_.get(choice, "status", true) ? "Active" : "De-Activated"}
            className="w-100 mb-5 mt-5 mb-xl-8"
            tableData={tableData}
            setEditModal={setEditModal}
            setDeleteModal={setDeleteModal}
            setSelectedId={setSelectedId}
            setShowActiveModal={setShowActiveModal}
          />
        ) : (
          // <div>Haii</div>
          <AmountAllocationTable
            reRender={() => {
              setLoading(true);
              if (active == 1) {
                getTravelData();
              } else {
                getRoomRentData();
              }
            }}
            active={active}
            status={_.get(choice, "status", true) ? "Active" : "De-Activated"}
            className="w-100 mb-5 mt-5 mb-xl-8"
            tableData={tableData}
            setEditModal={setEditModal}
            setEditTravelModal={setEditTravelModal}
            setEditRoomModal={setEditRoomModal}
            setDeleteRoomModal={setDeleteRoomModal}
            setDeleteModal={setDeleteModal}
            setDeleteTravelModal={setDeleteTravelModal}
            setSelectedId={setSelectedId}
            setShowActiveModal={setShowActiveModal}
            setActiveTravelModal={setActiveTravelModal}
            setActiveModal={setActiveModal}
            setActiveRoomModal={setActiveRoomModal}
            page1={page}
            setPage1={setPage}
            pageLimit1={pageLimit}
            setPageLimit1={setPageLimit}
            total={total}
          />
        )}
      </div>

      {editModal && (
        <NewAmountAllocationModal
          id={selectedId}
          show={editModal}
          handleClose={(refreshFlag) => {
            setEditModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
          tableData={tableData}
        />
      )}
      {editTravelModal && (
        <TravelAllocationModal
          id={selectedId}
          show={editTravelModal}
          handleClose={(refreshFlag) => {
            setEditTravelModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getTravelData();
          }}
        />
      )}
      {editRoomModal && (
        <RoomAllocationModal
          id={selectedId}
          show={editRoomModal}
          handleClose={(refreshFlag) => {
            setEditRoomModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getRoomRentData();
          }}
        />
      )}
      {deleteModal && (
        <DeleteModal
          option="Amount Allocation"
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
      {deleteTravelModal && (
        <DeleteModal
          option="Travel Allocation"
          id={selectedId}
          show={deleteTravelModal}
          handleClose={(refreshFlag) => {
            setDeleteTravelModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
        />
      )}
      {deleteRoomModal && (
        <DeleteModal
          option="Room Allocation"
          id={selectedId}
          show={deleteRoomModal}
          handleClose={(refreshFlag) => {
            setDeleteRoomModal(false);
            if (!refreshFlag) return;
            setLoading(true);
            getData();
          }}
        />
      )}
      {showActiveModal && (
        <ActiveUserModal
          option="Amount Allocation"
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
      {activeTravelModal && (
        <ActiveUserModal
          option="Travel Allocation"
          show={activeTravelModal}
          id={selectedId}
          handleClose={(refreshFlag) => {
            setActiveTravelModal(false);
            setRenderActiveModal(false);
            if (!refreshFlag) return;
            getData();
          }}
        />
      )}
      {activeRoomModal && (
        <ActiveUserModal
          option="Room Allocation"
          show={activeRoomModal}
          id={selectedId}
          handleClose={(refreshFlag) => {
            setActiveRoomModal(false);
            setRenderActiveModal(false);
            if (!refreshFlag) return;
            getData();
          }}
        />
      )}
    </>
  );
};

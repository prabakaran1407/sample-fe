/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/** @format */

import statusCellRenderer from "./cellRenderers/statusCellRenderer";
import DateCellRenderer from "./cellRenderers/dateCellRenderer";
import { useEffect, useState } from "react";
import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
import { APP_ROUTES } from "../../../data/AppRoutes.ts";
import { AUM_FORM_ACTION_TYPES } from "../../../data/AppConst.ts";
import {
  ActionItems,
  ActionModal,
  ContainerBoxV2,
  Textfield,
} from "../../../components/MUI/mui.index";
import {
  Autocomplete,
  Box,
  Button,
  // CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AttendanceManagementservice from "../../../services/admin/AttendanceManagement.service";
import { ColDef } from "ag-grid-community";
import ImageCellRenderer from "./cellRenderers/imageCellRenderer";
// import dateCellRenderer from "./cellRenderers/dateCellRenderer";
import AddressCellRenderer from "./cellRenderers/addressCellRenderer";
import EmpNameCellRenderer from "./cellRenderers/empNameCellRenderer";
import { useAppSelector } from "../../../hooks";
import { People } from "@mui/icons-material";
import { getUserListForAdmin } from "../../../components/com_components/CustomerSettingsAPI";
import moment from "moment";
import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
import { COLORS } from "../../../utils/globals.ts";
import { PropagateLoader } from "react-spinners";
import { CSVLink } from "react-csv";
import _ from "lodash";
import AddressCellRenderer1 from "./cellRenderers/addressCellRenderers1.tsx";
import { ACTION_ICON_TYPES } from "../../../../src/data/AppConst.ts";
import { generatePath, useNavigate } from "react-router-dom";

const AttendanceManagement = () => {
  function getDate(timestamp: any) {
    const date = new Date(timestamp);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  }
  const auth = useAppSelector((state: any) => state.auth);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeBox, _setActiveBox] = useState<any>(1);
  const [assigneeOptions, setAssigneeOptions] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [lateAttendanceData, setLateAttendanceData] = useState<any>([]);
  const [lateUser, setLateUser] = useState<any>(null);
  const [onTimeUser, setOnTimeUser] = useState<any>(null);
  const [isLateUserModalOpen, setIsLateUserModalOpen] = useState(false);
  const [isOnTimeUserModalOpen, setIsOnTimeUserModalOpen] = useState(false);
  const [absentUsers, setAbsentUsers] = useState<any>(null);
  const [absentmodal, setAbsentModal] = useState(false);
  const [_presentUsers, setPresentUsers] = useState<any>(null);
  const [presentModal, setPresentModal] = useState(false);

  const getUserData = async () => {
    await getUserListForAdmin(auth?.data?.userRecord?.organization_id)
      .then((res: any) => {
        const tempData = res.data.data;
        const categoriesOption = tempData.map(
          ({ _id, firstName, lastName }: any) => {
            return {
              label: `${firstName} ${lastName}`,
              value: _id,
            };
          }
        );
        setAssigneeOptions(categoriesOption);
      })
      .catch((err: any) => console.log(err.message));
  };

  const [countDataRes, setCountDataRes] = useState<any>(null);

  const [filterOptions, setFilterOptions] = useState<any>({
    assigneeLabel: "",
    assigneeValue: "",
    dateTimeStamp: "",
    date: "",
  });

  const [_date, setDate] = useState<any>("");
  
  const navigate = useNavigate();
  const handleView = (rowItem: Record<string, any>) => {
    let pathUrl = generatePath(APP_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.View, {
      id: rowItem?.id,
    });
    navigate(pathUrl, {
      state: {
        attendanceView: rowItem,
        actionType: AUM_FORM_ACTION_TYPES[2],
      },
    });
  };
  
  const columnDefs: ColDef[] = [
    {
      headerName: "Date",
      field: "createdAt",
      filter: true,
      width: 120,
      cellRenderer: DateCellRenderer,
      // cellRenderer: (rowData: { data: { createdAt: string } }) =>
      //   rowData.data.createdAt
      //     ? new Date(rowData.data.createdAt).toLocaleDateString()
      //     : "",
      ...GetHeaderParams(),
    },
    {
      headerName: "User Name",
      field: "userId.firstName",
      filter: true,
      width: 145,
      cellRenderer: EmpNameCellRenderer,
      ...GetHeaderParams(),
    },
    {
      headerName: "Image In/Out",
      field: "checkInImage",
      // filter: true,
      width: 170,
      cellRenderer: ImageCellRenderer,
      cellStyle: {
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      },
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    {
      headerName: "Time In/Out",
      field: "checkInTime",
      filter: true,
      width: 230,
      cellRenderer: statusCellRenderer,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    // {
    //   headerName: "Device Details In/Out",
    //   field: "checkInDevice",
    //   cellRenderer: DeviceCellRenderer,
    //   filter: true,
    //   width: 240,
    //   ...GetHeaderParams({
    //     display: "flex",
    //     justifyContent: "center",
    //     width: "100%",
    //   }),
    // },
    {
      headerName: "Address In",
      field: "checkInAddress",
      cellRenderer: AddressCellRenderer,
      autoHeight: true,
      filter: true,
      width: 200,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
    {
      headerName: "Address Out",
      field: "checkOutAddress",
      cellRenderer: AddressCellRenderer1,
      autoHeight: true,
      filter: true,
      width: 200,
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },

    // {
    //   headerName: "Location In/Out",
    //   field: "checkInLocation",
    //   filter: true,
    //   width: 200,
    //   cellRenderer: locationCellRenderer,
    //   ...GetHeaderParams({
    //     display: "flex",
    //     justifyContent: "center",
    //     width: "100%",
    //   }),
    // },
    {
      headerName: "View",
      field: "",
      width: 100,
      cellRenderer: ActionItems,
      cellRendererParams: {
        permission: {
          can_view: true,
        },
        enableActions: ACTION_ICON_TYPES,
        handleView: handleView,
      },
      pinned: "right",
      ...GetHeaderParams({
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }),
    },
  ];
  const getLateAttendanceData = async () => {
    try {
      const payload = {
        organization_id: auth?.data?.userRecord?.organization_id,
        date: filterOptions?.date,
      };
      const response = await AttendanceManagementservice.getLateAttendance(
        payload
      );
      const formattedLateUser = response?.data?.LateUsers?.map((user: any) => ({
        ...user,
        checkInTime: moment(user.checkInTime).format("HH:mm:ss"),
      }));
      setLateAttendanceData(response?.data);
      setLateUser(formattedLateUser);
      const formattedOnTimeUser = response?.data?.onTimeUsers?.map(
        (user: any) => ({
          ...user,
          checkInTime: moment.utc(user.checkInTime).format("HH:mm:ss"),
        })
      );
      setOnTimeUser(formattedOnTimeUser);
    } catch (error) {
      console.error("Error fetching late attendance data:", error);
    }
  };
  useEffect(() => {
    getLateAttendanceData();
  }, [filterOptions?.date]);

  const handleLateUsersClick = () => {
    setIsLateUserModalOpen(true);
    // getLateAttendanceData();
  };
  const handleOnTimeUsersClick = () => {
    setIsOnTimeUserModalOpen(true);
    // getLateAttendanceData();
  };
  const handleAbsent = () => {
    setAbsentModal(true);
  };
  const handlePresent = () => {
    setPresentModal(true);
  };
  const getAttendanceCount = async () => {
    try {
      const query = `?organization_id=${auth?.data?.userRecord?.organization_id}`;
      const countData = await AttendanceManagementservice.getAttendanceCount(
        query
      );
      if (countData) {
        setCountDataRes(countData?.data);
      }
    } catch (error) {
      console.log("The Error : ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserData();

    const originalDate = moment(new Date());
    const startOfTheDay = moment().startOf("day").valueOf();
    setFilterOptions({
      ...filterOptions,
      dateTimeStamp: startOfTheDay,
      date: originalDate.format("YYYY-MM-DD"),
    });
  }, []);

  const getAttendanceList = async () => {
    try {
      let payload: any = {
        organization_id: auth?.data?.userRecord?.organization_id,
        skip: page === 1 ? 0 : pageSize * (page - 1),
        limit: pageSize,
      };

      if (
        filterOptions?.assigneeValue !== undefined &&
        filterOptions?.assigneeValue !== ""
      ) {
        payload["user"] = filterOptions?.assigneeValue;
      }
      if (filterOptions?.date !== "") {
        payload["day"] = filterOptions?.date;
      }

      const listData =
        await AttendanceManagementservice.getAttendanceManagementlist(payload);
      setTableData(listData?.data?.data);
      setTotalCount(listData?.data?.data.length);

      let refactorData = _.reduce(
        listData?.data?.data,
        (result, value): any => {
          let temp: any = result;
          temp.push({
            Date: getDate(_.get(value, "createdAt", "")),
            [`User Name`]: _.get(value, "userId.firstName", ""),
            [`user Id`]:
              _.get(value, "userId.firstName", "") +
              " " +
              _.get(value, "userId.lastName", ""),
            [`Check In Device`]: _.get(value, "checkInDevice", ""),
            [`Battery Percentage`]: _.get(
              value,
              "checkInDeviceBatteryPercentage",
              ""
            ),
            [`Check In Time`]: _.get(value, "checkInTime")
              ? new Date(_.get(value, "checkInTime")).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",

            // [`Check In Time`]: _.get(value, 'checkInTime', ''),
            [`Check In Image`]: _.get(value, "checkInImage", ""),
            [`Check Out Time`]: _.get(value, "checkOutTime")
              ? new Date(_.get(value, "checkOutTime")).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            // [`Check Out Time`]: _.get(value, 'checkOutTime', ''),
            [`Check Out Image`]: _.get(value, "checkOutImage", ""),
          });
          return temp;
        },
        []
      );
      setCsvData(refactorData);
    } catch (error) {
      console.log("The Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: any) => {
    const selectedDate = event.target.value;
    const timestamp = new Date(selectedDate).getTime();
    setFilterOptions({
      ...filterOptions,
      date: selectedDate,
      dateTimeStamp: timestamp,
    });
    setDate(selectedDate);
  };

  const handleAbsentUsers = async () => {
    try {
      const selectedDate = moment(filterOptions.date).local();
      const startTime = selectedDate.startOf("day").valueOf();
      const endTime = selectedDate.endOf("day").valueOf();
      let payload: any = {
        organization_id: auth?.data?.userRecord?.organization_id,
        from: startTime,
        to: endTime,
      };
      const listData = await AttendanceManagementservice.getAbsentUsers(
        payload
      );
      setAbsentUsers(listData?.data || []);
    } catch (error) {
      console.log("error while getting absent users ", error);
    }
  };
  const handlePresentUsers = async () => {
    try {
      let payload: any = {
        organization_id: auth?.data?.userRecord?.organization_id,
      };
      const listData = await AttendanceManagementservice.getAbsentUsers(
        payload
      );
      setPresentUsers(listData?.data?.present?.users || []);
    } catch (error) {
      console.log("error while getting absent users ", error);
    }
  };
  useEffect(() => {
    getAttendanceList();
  }, [filterOptions?.assigneeValue, filterOptions?.date, pageSize, page]);

  useEffect(() => {
    getAttendanceCount();
    handleAbsentUsers();
    handlePresentUsers();
  }, [filterOptions?.date]);

  return (
    <div>
      <ContainerBoxV2>
        <Grid display={"flex"} justifyContent={"space-between"}>
          <Grid xs={3}>
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Attendance
            </Typography>
          </Grid>
          <Grid display={"flex"} gap={2}>
            <Grid xs={2}>
              <Textfield
                fullWidth
                label="Date"
                type="date"
                name="serviceStartDate"
                value={filterOptions?.date}
                onChange={handleDateChange}
              />
            </Grid>

            <Grid item>
              <Autocomplete
                value={filterOptions?.assigneeLabel || null}
                onChange={(_event, newValue) =>
                  setFilterOptions({
                    ...filterOptions,
                    assigneeLabel: newValue?.label,
                    assigneeValue: newValue?.value,
                  })
                }
                options={assigneeOptions}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    size="small"
                    label="User"
                    variant="outlined"
                  />
                )}
                style={{ width: "150px" }}
              />
            </Grid>

            <Grid xs={2}>
              <CSVLink
                data={csvData}
                filename={"Attendance-data.csv"}
                className="btn btn-primary btn-sm"
                target="_blank"
              >
                <Button variant="contained">Export to CSV</Button>
              </CSVLink>
            </Grid>
          </Grid>
        </Grid>
      </ContainerBoxV2>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          p={2}
          rowSpacing={2}
          columnSpacing={1}
          gap={4.5}
          sx={{ justifyContent: "center" }}
        >
          <Grid
            item
            xs={12}
            lg={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "80px",
                background: "#FFFFFF",
                border: "2px solid #efefef",
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                // boxShadow:
                //   activeBox === 0 ? "0 2px 6px rgba(0, 0, 0, 0.15)" : "",
              }}
              // onClick={() => setActiveBox(0)}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "500", color: "#5E6278" }}
                  px={2}
                >
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "600" }} px={2}>
                  {countDataRes?.UserTotal ? countDataRes?.UserTotal : 0}
                </Typography>
              </Box>
              <People sx={{ fontSize: 34, color: "#FFC700", mx: 2 }} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "80px",
                background: "#FFFFFF",
                border: "2px solid #efefef",
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                // boxShadow:
                //   activeBox === 1 ? "0 2px 6px rgba(0, 0, 0, 0.15)" : "",
              }}
              onClick={handlePresent}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "500", color: "#5E6278" }}
                  px={2}
                >
                  Present
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "600" }} px={2}>
                  {absentUsers
                    ? absentUsers.reduce((total: any, user: any) => {
                        if (user.count !== 0) {
                          total += 1;
                        }
                        return total;
                      }, 0)
                    : 0}
                </Typography>
              </Box>
              <People sx={{ fontSize: 34, color: "#50CD89", mx: 2 }} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "80px",
                background: "#FFFFFF",
                border: "2px solid #efefef",
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                // boxShadow:
                //   activeBox === 2 ? "0 2px 6px rgba(0, 0, 0, 0.15)" : "",
              }}
              onClick={handleOnTimeUsersClick}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "500", color: "#5E6278" }}
                  px={2}
                >
                  Late
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "600" }} px={2}>
                  {lateAttendanceData?.totalCount || 0}
                </Typography>
              </Box>

              <People sx={{ fontSize: 30, color: "#FF6666", mx: 2 }} />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            lg={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "80px",
                background: "#FFFFFF",
                border: "2px solid #efefef",
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                // boxShadow:
                //   activeBox === 2 ? "0 2px 6px rgba(0, 0, 0, 0.15)" : "",
              }}
              onClick={handleLateUsersClick}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "500", color: "#5E6278" }}
                  px={2}
                >
                  On-time
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "600" }} px={2}>
                  {lateAttendanceData?.onTimeCount || 0}
                </Typography>
              </Box>

              <People sx={{ fontSize: 30, color: "#FF6666", mx: 2 }} />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            lg={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "80px",
                background: "#FFFFFF",
                border: "2px solid #efefef",
                borderRadius: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                // boxShadow:
                //   activeBox === 2 ? "0 2px 6px rgba(0, 0, 0, 0.15)" : "",
              }}
              onClick={handleAbsent}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: "500", color: "#5E6278" }}
                  px={2}
                >
                  Absent
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "600" }} px={2}>
                  {absentUsers
                    ? absentUsers.reduce((total: any, user: any) => {
                        if (user.count === 0) {
                          total += 1;
                        }
                        return total;
                      }, 0)
                    : 0}
                </Typography>
              </Box>
              <People sx={{ fontSize: 30, color: "#FF6666", mx: 2 }} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <ContainerBoxV2>
        <Grid container rowSpacing={2}>
          {/* <Grid
              item
              xs={10}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                style={{
                  color: '#000000',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {activeBox === 0
                  ? 'Total'
                  : activeBox === 1
                  ? 'Present'
                  : activeBox === 2
                  ? 'Absent'
                  : activeBox === 3
                  ? 'Late'
                  : ''}{' '}
                Users
              </Typography>
            </Grid> */}

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></Grid>
          <Grid item xs={12}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "65vh",
                  width: "100%",
                }}
              >
                <PropagateLoader color={COLORS.primary} />
              </Box>
            ) : (
              <AgDataGrid
                rowData={activeBox === 3 ? lateAttendanceData : tableData}
                columnDefs={columnDefs}
                TableHeight={58}
                rowHeight={50}
                noDataTxt="No Records Found"
                loading={false}
                serverSidePagination={true}
                pageSize={pageSize}
                totalDataCount={totalCount}
                serverRowSize={pageSize}
                currentPage={page}
                serverPageCount={Math.ceil(totalCount / pageSize)}
                setServerRowSize={(rowSize: number) => {
                  setPageSize(rowSize);
                }}
                setServerSidePage={(_e: any, p: number) => {
                  setPage(p);
                }}
                page={page}
                setPageSize={setPageSize}
                setPage={setPage}
              />
            )}
          </Grid>
        </Grid>

        <ActionModal
          open={isLateUserModalOpen}
          onClose={() => {
            setIsLateUserModalOpen(false);
          }}
          title={`On-time User (${filterOptions?.date})`}
          modalWidth={600}
        >
          {onTimeUser && onTimeUser.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Check In Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {onTimeUser?.map((user: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{`${user?.users?.fullname}`}</TableCell>
                    <TableCell>{`${user?.checkInTime}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No On-time users found</Typography>
          )}
        </ActionModal>
        <ActionModal
          open={isOnTimeUserModalOpen}
          onClose={() => {
            setIsOnTimeUserModalOpen(false);
          }}
          title={`Late User (${filterOptions?.date})`}
          modalWidth={600}
        >
          {lateUser && lateUser.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Check In Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lateUser?.map((user: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{`${user?.users?.fullname}`}</TableCell>
                    <TableCell>{`${user?.checkInTime}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No late users found</Typography>
          )}
        </ActionModal>
        <ActionModal
          open={absentmodal}
          onClose={() => {
            setAbsentModal(false);
          }}
          title={`Absent User (${filterOptions?.date})`}
          modalWidth={600}
        >
          {absentUsers && absentUsers.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {absentUsers
                  .filter((user: any) => user.count === 0)
                  .map((user: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>Absent</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No absent users found</Typography>
          )}
        </ActionModal>
        <ActionModal
          open={presentModal}
          onClose={() => {
            setPresentModal(false);
          }}
          title={`Present User (${filterOptions?.date})`}
          modalWidth={600}
        >
          {absentUsers && absentUsers.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {absentUsers
                  .filter((user: any) => user.count !== 0)
                  .map((user: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>Present</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No present users found</Typography>
          )}
        </ActionModal>
      </ContainerBoxV2>
    </div>
  );
};
export default AttendanceManagement;

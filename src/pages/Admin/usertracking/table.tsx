/** @format */

// import AgDataGrid from "../../../components/AG-GRID/DataGrid/AgDataGrid";
// import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
// import Modal from "@mui/material/Modal";
// import RoomIcon from "@mui/icons-material/Room";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import { useState } from 'react';
// import GetHeaderParams from "../../../components/CustomCellAgGrid/CustomHeaderValue";
// import CustomCellRenderValues from "../../../components/CustomCellAgGrid/CustomCellRenderValues";
// import { ContainerBoxV2 } from "../../../components/MUI/mui.index";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import moment from 'moment';

const Table = (data: any) => {
  // const [selectedAddress, setSelectedAddress] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  // const [rowData, setRowData] = useState([]);
  // // console.log(props,"heloo");

  // useEffect(() => {
  //   if (props.tableData.data && props.tableData.data.length > 0) {
  //     const formattedData = props.tableData.data.map((item: any) => ({
  //       createdAt: item.createdAt,
  //       location: item.location,
  //     }));
  //     // console.log('Formatted Data:', formattedData);
  //     setRowData(formattedData);
  //   }
  // }, [props.tableData]);

  // const handleButtonClick = (params: any) => {
  //   if (
  //     params &&
  //     params.data &&
  //     params.data.location &&
  //     Array.isArray(params.data.location) &&
  //     params.data.location.length === 2
  //   ) {
  //     const [latitude, longitude] = params.data.location;
  //     const apiKey = "AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA";
  //     const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  //     fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.results && data.results.length > 0) {
  //           const formattedAddress = data.results[0].formatted_address;
  //           setSelectedAddress(formattedAddress);
  //           setOpenModal(true);
  //         } else {
  //           console.error("Address not found");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching address:", error);
  //       });
  //   } else {
  //     console.error("Invalid Location data in params");
  //   }
  // };

  // const handleCloseModal = () => {
  //   setSelectedAddress(null);
  //   setOpenModal(false);
  // };

  // const locationCellRenderer = (params: any) => {
  //   const location = params.data.location;

  //   const handleMapClick = () => {
  //     if (location && Array.isArray(location) && location.length === 2) {
  //       const [latitude, longitude] = location;
  //       const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

  //       window.open(mapUrl, "_blank");
  //     } else {
  //       console.error("Invalid Location");
  //     }
  //   };

  //   if (location && Array.isArray(location) && location.length === 2) {
  //     return (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "100%",
  //         }}
  //       >
  //         <IconButton onClick={handleMapClick} color="primary">
  //           <RoomIcon />
  //         </IconButton>
  //       </Box>
  //     );
  //   } else {
  //     return <p>Invalid Location</p>;
  //   }
  // };

  // const columnDefs = useMemo(
  //   () => [
  //     {
  //       field: "createdAt",
  //       headerName: "Time",
  //       width: 300,
  //       cellRenderer: CustomCellRenderValues,
  //       cellRendererParams: (rowData: { data: Record<string, any> }) => ({
  //         field: "createdAt",
  //         formatter: (value: any) =>
  //           value
  //             ? `${new Date(rowData.data.createdAt).toLocaleTimeString(
  //                 "en-US",
  //                 {
  //                   hour12: true,
  //                   hour: "2-digit",
  //                   minute: "2-digit",
  //                   second: "2-digit",
  //                 }
  //               )}`
  //             : "",
  //       }),
  //       ...GetHeaderParams(),
  //     },
  //     {
  //       field: "location",
  //       headerName: "Location",
  //       width: 400,
  //       cellRenderer: locationCellRenderer,
  //       ...GetHeaderParams({
  //         display: "flex",
  //         justifyContent: "center",
  //         width: "100%",
  //       }),
  //     },
  //     {
  //       field: "address",
  //       headerName: "Address",
  //       width: 100,
  //       cellRenderer: (params) => (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100%",
  //           }}
  //         >
  //           <Button onClick={() => handleButtonClick(params)}>Show</Button>
  //         </Box>
  //       ),
  //       ...GetHeaderParams({
  //         display: "flex",
  //         justifyContent: "center",
  //         width: "100%",
  //       }),
  //     },
  //   ],
  //   []
  // );

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [itemsPerPage, setitemsPerPage] = useState<number>(10);

  const handleChange = (event: any) => {
    setitemsPerPage(event.target.value);
  };

  if (!Array.isArray(data?.data)) {
    data = [];
  }

  function dateformate(date: any) {
    const momentObject: any = moment(date);
    return momentObject.format('hh:mm a');
  }

  const filteredData = data?.data?.filter(
    (point: any, index: any, array: any) => {
      if (index === 0) {
        return true;
      } else {
        const previous = array[index - 1];
        return point.lat !== previous.lat || point.lng !== previous.lng;
      }
    }
  );

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data?.data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.data?.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchAddress = async (marker: any) => {
    const { lat, lng } = marker;
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA`
    )
      .then((response) => response.json())
      .then((response) => {
        const address =
          response?.results[0]?.formatted_address || 'Address not found';
        setselectedAddress(address);
      })
      .catch((error) => {
        console.log(error);
        setselectedAddress(null);
      });
  };

  const handleShowClick = (item: any) => {
    console.log(item);
    if (!item?.lat || !item?.lng) {
      return;
    } else {
      fetchAddress(item);
    }
  };

  const handleClosePopup = () => {
    setselectedAddress(null);
  };

  console.log(startIndex, endIndex, filteredData, 'data');
  return (
    <>
      {/* <ContainerBoxV2>
        <AgDataGrid
          rowData={rowData}
          columnDefs={columnDefs}
          TableHeight={50}
          serverSidePagination={true}
        />
      </ContainerBoxV2>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 8,
            maxWidth: 400,
            boxShadow: "0 4px 8px rgba(1, 2, 1, 0.4)",
            position: "relative",
          }}
        >
          <IconButton
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
            onClick={handleCloseModal}
            color="primary"
          >
            <CloseIcon />
          </IconButton>
          <h2 style={{ marginBottom: 16 }}>Address:</h2>
          <p style={{ wordWrap: "break-word" }}>{selectedAddress}</p>
        </div>
      </Modal> */}

      <div>
        <Dialog open={selectedAddress !== null} onClose={handleClosePopup}>
          <DialogContent>
            <DialogContentText>Address: {selectedAddress}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{dateformate(item.time)}</td>
                <td>
                  <p
                    style={{ cursor: 'pointer', color: '#5867dd' }}
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`
                      );
                    }}>{`${item?.lat}-${item?.lng}`}</p>
                </td>
                <td>
                  <div
                    style={{ cursor: 'pointer', color: '#5867dd' }}
                    onClick={() => {
                      handleShowClick(item);
                    }}>
                    show
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Button
              onClick={prevPage}
              disabled={currentPage === 0}
              color='primary'>
              Previous
            </Button>
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              color='primary'>
              Next
            </Button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <InputLabel id='itemsPerPage' style={{ paddingRight: '10px' }}>
              Items Per Page :{' '}
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              value={itemsPerPage}
              onChange={handleChange}
              label='ItemsPer Page'
              variant='standard'>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

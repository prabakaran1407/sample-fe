import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../src/hooks";
import SocketService from "../../../../src/libs/SocketService";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LiveTrack() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const containerStyle = {
    width: "1000px",
    height: "450px",
  };

  const [locations, setLocations] = useState<any>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    SocketService.GET_SOCKET_ON_CB(
      auth?.data?.userRecord?.organization_id,
      (socketData: any) => {
        setLocations(socketData?.list);
      }
    );
  }, []);

  return (
    <Box pr={4} pl={4} pt={4} pb={4}>
      <Typography variant="h6" pb={1} sx={{ fontWeight: "600" }}>
        Live Track
      </Typography>
      <LoadScript googleMapsApiKey="AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA">
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={
            locations.length > 0
              ? locations[0].position
              : { lat: 12.9715987, lng: 77.5945667 }
          }
        >
          {locations.map((location: any, index: number) => (
            <Marker
              key={index}
              position={{
                lat: location?.localtion[0],
                lng: location?.localtion[1],
              }}
              onClick={() => setSelectedUser(location)}
              icon={{
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                  '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                    "orange" +
                    '" width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><text x="50%" y="50%" font-size="10" text-anchor="middle" alignment-baseline="middle" fill="white">' +
                    location?.users?.shortName +
                    "</text></svg>"
                )}`,
              }}
            />
          ))}
          {selectedUser && (
            <InfoWindow
              position={{
                lat: selectedUser?.localtion[0],
                lng: selectedUser?.localtion[1],
              }}
              onCloseClick={() => setSelectedUser(null)}
            >
              <div>
                <h4>User Details</h4>
                <table style={{ border: "none" }}>
                  <tr>
                    <td>User Name</td>
                    <td> : {selectedUser?.users?.fullname}</td>
                  </tr>
                  <tr>
                    <td>User Id</td>
                    <td> : {selectedUser?._id}</td>
                  </tr>
                  <tr>
                    <td>Last seen</td>
                    <td>
                      {" "}
                      :{" "}
                      {new Date(selectedUser?.time).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                  </tr>
                </table>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={() => {
                    navigate("/sales10x/user-tracking", {
                      state: { State_UserId: selectedUser?.users?._id },
                    });
                  }}
                >
                  View on Map
                </Button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

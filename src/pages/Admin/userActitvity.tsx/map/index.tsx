import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import React from "react";
import { ActionModal } from "../../../../../src/components/MUI/Modal/Modal";

interface Props {
  show: any;
  handleClose: any;
  location_data: any;
}

export const UserActivityModal: React.FC<Props> = (props: Props) => {
  const { show, handleClose, location_data }: Props = props;

  return (
    <ActionModal
      open={show}
      onClose={() => {
        handleClose();
      }}
      title="User Activity Map"
    >
      <UserTrackingMap location_data={location_data || []} />
    </ActionModal>
  );
};

function UserTrackingMap({ location_data }: { location_data: any }) {
  const [directions, setDirections] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [points, _setPoints] = useState<any>(location_data);

  const mapStyles = {
    height: "64vh",
    width: "785px",
  };

  const center = points[0]?.location || { lat: 11.127123, lng: 78.656891 };

  useEffect(() => {
    if (map && points.length >= 1) {
      const waypoints = points.map((point: any) => ({
        location: { lat: point?.location?.lat, lng: point?.location?.lng },
        stopover: true,
      }));

      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints.slice(1, -1).map((waypoint: any) => ({
            location: waypoint.location,
            stopover: true,
          })),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result: any, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            if (result.routes && result.routes.length > 0) {
              const route = result.routes[0];
              let distance = 0;
              route.legs.forEach((leg: any) => {
                distance += leg.distance.value; // distance in meters
              });
              setTotalDistance(distance / 1000); // convert to kilometers
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [map, points]);

  // function calculateDistance(lat1: any, lng1: any, lat2: any, lng2: any) {
  //   const R = 6371; // Radius of the Earth in kilometers
  //   const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
  //   const dLng = ((lng2 - lng1) * Math.PI) / 180;
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos((lat1 * Math.PI) / 180) *
  //       Math.cos((lat2 * Math.PI) / 180) *
  //       Math.sin(dLng / 2) *
  //       Math.sin(dLng / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c; // Distance in kilometers
  //   return distance;
  // }

  // function calculateTotalDistanceNew(points: any) {
  //   let totalDistance = 0;
  //   for (let i = 0; i < points?.length - 1; i++) {
  //     totalDistance += calculateDistance(
  //       points[i]?.lat,
  //       points[i]?.lng,
  //       points[i + 1]?.lat,
  //       points[i + 1]?.lng
  //     );
  //   }
  //   return totalDistance;
  // }

  // function bruteForceMinimumPath(points: any) {
  //   let minDistance = Infinity;
  //   let minPath = [];
  //   const permutations = getPermutations(points);
  //   for (const perm of permutations) {
  //     const distance = calculateTotalDistanceNew(perm);
  //     if (distance < minDistance) {
  //       minDistance = distance;
  //       minPath = perm;
  //     }
  //   }
  //   return minPath;
  // }

  // function getPermutations(arr: any) {
  //   const permutations: any = [];
  //   const permute = (arr: any, m = []) => {
  //     if (arr.length === 0) {
  //       permutations.push(m);
  //     } else {
  //       for (let i = 0; i < arr.length; i++) {
  //         const curr = arr.slice();
  //         const next = curr.splice(i, 1);
  //         permute(curr.slice(), m.concat(next));
  //       }
  //     }
  //   };
  //   permute(arr);
  //   return permutations;
  // }

  //   useEffect(() => {
  //     if (location_data) {
  //       const minPath = bruteForceMinimumPath(location_data);
  //       //   setPoints(minPath);
  //     }
  //   }, [location_data]);

  return (
    <div>
      {totalDistance && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            paddingTop: "10px",
            paddingBottom: "10px",
            gap: "10px",
          }}
        >
          <h4>Total Distance (apx.): {totalDistance} km</h4>
        </div>
      )}

      <LoadScript googleMapsApiKey="AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
          onLoad={(map) => setMap(map)}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: { strokeColor: "blue" },
                // suppressMarkers: true, // Add this line to suppress markers
              }}
            />
          )}
          {/* {points?.map((point: any, index: number) => (
            <Marker
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png", // Violet pin icon
              }}
              key={index}
              position={{
                lat: point?.location?.lat,
                lng: point?.location?.lng,
              }}
            />
          ))} */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(UserTrackingMap);

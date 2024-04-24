import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getDistanceNew } from "../../../../../src/components/com_components/MapApi";
import React from "react";
import { Textfield } from "../../../../../src/components/MUI/InputFields/TextField";
import { format } from "date-fns";

function TripPlannerMap({
  userId,
  tripPlanData,
  tripView,
}: {
  userId: any;
  tripPlanData: any;
  tripView: any;
  TripViewData: any;
}) {
  const [date, setDate] = useState(new Date());
  const [directions, setDirections] = useState<any>(null);
  const [totalDistance, setTotalDistance] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const [actualPoints, setActualPoints] = useState<any>(null);
  const [points, setPoints] = useState<any>(tripPlanData);

  const mapStyles = {
    height: "64vh",
    width: "100%",
  };

  const center = points[0] || { lat: 11.127123, lng: 78.656891 };

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const calculateTotalDistance = (locations: any) => {
    let totalDistance = 0;

    for (let i = 0; i < locations?.length - 1; i++) {
      totalDistance += haversineDistance(
        locations[i].lat,
        locations[i].lng,
        locations[i + 1].lat,
        locations[i + 1].lng
      );
    }
    return totalDistance;
  };

  useEffect(() => {
    if (map && points.length >= 1) {
      const waypoints = points.map((point: any) => ({
        location: { lat: point.lat, lng: point.lng },
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

  const getLocation = async () => {
    if (userId && date) {
      let startTime: any = new Date(date);
      let endTime: any = new Date(date);
      startTime = startTime.setHours(0, 0);
      endTime = endTime.setHours(23, 59);

      const data = {
        startTime: startTime,
        endTime: endTime,
        user: userId,
        limit: 1000000,
        skip: 0,
      };

      getDistanceNew(data).then((res: any) => {
        setActualPoints([]);
        if (res.data.data.length > 0) {
          const newArray = res.data.data
            .map((item: any) => ({
              lat: parseFloat(parseFloat(item?.location[0]).toFixed(5)),
              lng: parseFloat(parseFloat(item?.location[1]).toFixed(5)),
              time: item?.createdAt,
            }))
            .filter((item: any) => !isNaN(item?.lat) && !isNaN(item?.lng));

          setActualPoints(newArray);
        } else {
          console.log("No data found");
        }
      });
    } else {
      console.log("No user id found");
    }
  };

  function calculateDistance(lat1: any, lng1: any, lat2: any, lng2: any) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function calculateTotalDistanceNew(points: any) {
    let totalDistance = 0;
    for (let i = 0; i < points?.length - 1; i++) {
      totalDistance += calculateDistance(
        points[i]?.lat,
        points[i]?.lng,
        points[i + 1]?.lat,
        points[i + 1]?.lng
      );
    }
    return totalDistance;
  }

  function bruteForceMinimumPath(points: any) {
    let minDistance = Infinity;
    let minPath = [];
    const permutations = getPermutations(points);
    for (const perm of permutations) {
      const distance = calculateTotalDistanceNew(perm);
      if (distance < minDistance) {
        minDistance = distance;
        minPath = perm;
      }
    }
    return minPath;
  }

  function getPermutations(arr: any) {
    const permutations: any = [];
    const permute = (arr: any, m = []) => {
      if (arr.length === 0) {
        permutations.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next));
        }
      }
    };
    permute(arr);
    return permutations;
  }

  useEffect(() => {
    getLocation();
  }, [userId, date]);

  useEffect(() => {
    if (tripPlanData) {
      const minPath = bruteForceMinimumPath(tripPlanData);
      setPoints(minPath);
    }
  }, [tripPlanData, userId, date]);

  // console.log("TripPlannerMap", directions, "actualPoints");
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <h4>Map View</h4>
        {tripView ? null : (
          <Textfield
            label="Date"
            placeholder="dd-mm-yyyy"
            type="date"
            name="serviceStartDate"
            //   value={date}
            onChange={(e: any) => {
              const dateString = e.target.value;
              const formattedDate = format(new Date(dateString), "yyyy-MM-dd");
              setDate(new Date(formattedDate));
            }}
            InputLabelProps={{ shrink: true }}
          />
        )}
      </div>

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
          <h4>Planed Distance: {totalDistance} km</h4>

          <h4>
            Actual Distance: {calculateTotalDistance(actualPoints).toFixed(2)}{" "}
            km
          </h4>

          <h4>
            Difference:{" "}
            <span
              style={{
                color:
                  Number(
                    (
                      totalDistance - calculateTotalDistance(actualPoints)
                    ).toFixed(2)
                  ) > 0
                    ? " green"
                    : " red",
              }}
            >
              {Math.abs(
                Number(
                  (
                    totalDistance - calculateTotalDistance(actualPoints)
                  ).toFixed(2)
                )
              )}{" "}
              km
              {Number(
                (totalDistance - calculateTotalDistance(actualPoints)).toFixed(
                  2
                )
              ) > 0
                ? " (Less)"
                : " (More)"}
            </span>
          </h4>
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
              options={{ polylineOptions: { strokeColor: "blue" } }}
            />
          )}

          {
            <Polyline
              path={actualPoints}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.5,
                strokeWeight: 6,
              }}
            />
          }
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(TripPlannerMap);

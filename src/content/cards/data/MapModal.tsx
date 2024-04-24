import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import moment from "moment";
import { SecondaryLoadScreen } from "../../../../src/components/com_components/SecondaryLoadScreen";
type Props = {
  Location: any;
  loading: any;
};

const MapModal: React.FC<Props> = ({ Location, loading }) => {
  const [currentTime, setCurrentTime] = useState("");
  const containerStyle = {
    width: "1000px",
    height: "550px",
  };

  const time_low = {
    min: 40,
    max: 116,
  };
  const time_medium = {
    min: 120,
    max: 236,
  };
  const time_high = {
    min: 240,
  };

  function dateformate(date: any) {
    const momentObject: any = moment(date);
    return momentObject.format("hh:mm a");
  }

  function dateformateToMinutes(time: string): number {
    const momentObject = moment(time, "hh:mm a");

    const hours = momentObject.hours();
    const minutes = momentObject.minutes();
    const totalMinutes = hours * 60 + minutes;

    return totalMinutes;
  }

  function findRepetedcood(points: any, time?: any) {
    const coordinateTimes: Record<string, string[]> = {};

    for (const point of points) {
      const key = `${parseFloat(point.lat).toFixed(4)},${parseFloat(
        point.lng
      ).toFixed(4)}`;

      if (coordinateTimes[key]) {
        coordinateTimes[key].push(point.time);
        // console.log(coordinateTimes[key])
      } else {
        coordinateTimes[key] = [point.time];
      }
    }

    const resultArray: any[] = [];

    const Timespent = (diff: any) => {
      if (10 <= diff && diff <= 29) {
        return 1;
      } else if (30 <= diff && diff <= 59) {
        return 2;
      } else if (60 <= diff) {
        return 3;
      } else {
        return 0;
      }
    };

    for (const key in coordinateTimes) {
      const [lat, lng] = key.split(",").map(parseFloat);
      const times: any = coordinateTimes[key].sort((a: any, b: any) => a - b);
      const initialTime = dateformate(times[0]);
      const endTime = dateformate(times[times.length - 1]);

      const totalMinutes1 = dateformateToMinutes(initialTime);
      const totalMinutes2 = dateformateToMinutes(endTime);

      let difference = Math.abs(totalMinutes2 - totalMinutes1);
      if (
        coordinateTimes[key].length > time?.min &&
        coordinateTimes[key].length < time?.max
      ) {
        resultArray.push({
          lat,
          lng,
          initialTime,
          endTime,
          time: difference,
          timeSpent: Timespent(difference),
        });
      }
    }

    return resultArray;
  }

  const timeHigh = findRepetedcood(Location, time_high);
  const timeMedium = findRepetedcood(Location, time_medium);
  const timeLow = findRepetedcood(Location, time_low);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  // console.log("--",selectedMarker)

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker);
    fetchAddress(marker);
  };

  const handleMarkerData = (data: any) => {
    fetchAddress(data, dateformate(data?.position?.time));
  };

  const fetchAddress = async (marker: any, time?: any) => {
    const { lat, lng } = marker.position;
    await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA`
    )
      .then((response) => response.json())
      .then((response) => {
        const address =
          response?.results[0]?.formatted_address || "Address not found";
        if (time) {
          setSelectedMarker({ address, time: time, ...marker });
        } else {
          setSelectedMarker({ ...marker, address });
        }
      })
      .catch((error) => {
        console.log(error);
        setSelectedMarker({ ...marker, address: "Address not found" });
      });
  };

  return (
    <>
      {loading && <SecondaryLoadScreen />}

      {Location?.length > 0 ? (
        <div>
          <LoadScript googleMapsApiKey="AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={Location[0]}
              zoom={10}
            >
              {Location?.map((data: any) => (
                <Marker
                  position={data}
                  // icon={{
                  //   url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                  //     '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                  //       "blue" +
                  //       '" width="10" height="10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>'
                  //   )}`,
                  // }}
                  // icon={{
                  //   url: "http://maps.google.com/mapfiles/ms/icons/orange.png",
                  //   scaledSize: new window.google.maps.Size(10, 10),
                  // }}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                        "transparent" +
                        '" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>'
                    )}`,
                  }}
                  onClick={() => handleMarkerData({ position: data })}
                />
              ))}
              <Marker
                position={Location[0]}
                icon={"http://maps.google.com/mapfiles/ms/icons/green.png"}
              />
              <Marker
                position={Location[Location?.length - 1]}
                icon={"http://maps.google.com/mapfiles/ms/icons/red.png"}
              />
              <Polyline
                path={Location.filter(
                  (point: any) => point.lat !== null && point.lng !== null
                )}
                options={{
                  strokeColor: "blue",
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                }}
              />

              {timeHigh?.map((pts: any, index: number) => (
                <Marker
                  key={index}
                  position={pts}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                        (pts?.timeSpent === 1
                          ? "green"
                          : pts?.timeSpent === 2
                          ? "#F6BE00"
                          : pts?.timeSpent === 3
                          ? "red"
                          : "white") +
                        '" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>'
                    )}`,
                  }}
                  onClick={() => handleMarkerClick({ position: pts })}
                />
              ))}
              {timeMedium?.map((pts: any, index: number) => (
                <Marker
                  key={index}
                  position={pts}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                        (pts?.timeSpent === 1
                          ? "green"
                          : pts?.timeSpent === 2
                          ? "#F6BE00"
                          : pts?.timeSpent === 3
                          ? "red"
                          : "white") +
                        '" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>'
                    )}`,
                  }}
                  onClick={() => handleMarkerClick({ position: pts })}
                />
              ))}
              {timeLow?.map((pts: any, index: number) => (
                <Marker
                  key={index}
                  position={pts}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" fill="' +
                        (pts?.timeSpent === 1
                          ? "green"
                          : pts?.timeSpent === 2
                          ? "#F6BE00"
                          : pts?.timeSpent === 3
                          ? "red"
                          : "white") +
                        '" width="32" height="32" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>'
                    )}`,
                  }}
                  onClick={() => handleMarkerClick({ position: pts })}
                />
              ))}

              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker?.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div style={{ width: "300px" }}>
                    <table>
                      <tr>
                        <td>Address</td>
                        <td>{selectedMarker?.address}</td>
                      </tr>
                      {selectedMarker?.time ? (
                        <tr>
                          <td>Time </td>
                          <td>{selectedMarker?.time}</td>
                        </tr>
                      ) : (
                        <>
                          <tr>
                            <td>Initial Time </td>
                            <td>{selectedMarker?.position?.initialTime}</td>
                          </tr>
                          <tr>
                            <td>End Time </td>
                            <td>{selectedMarker?.position?.endTime}</td>
                          </tr>
                          <tr>
                            <td>Total Time </td>
                            <td>{selectedMarker?.position?.time} min</td>
                          </tr>
                        </>
                      )}
                    </table>
                  </div>
                </InfoWindow>
              )}
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                Current time: {currentTime}
              </div>
            </GoogleMap>
          </LoadScript>
        </div>
      ) : (
        <div>No records Found</div>
      )}
    </>
  );
};
export { MapModal };

import { useEffect, memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default memo(function SelectLocation(props: { formik: any } | any) {
  const containerStyle = {
    width: "730px",
    height: "300px",
  };

  const handleMapClick = (event: any) => {
    props.formik.setFieldValue("location", {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  useEffect(() => {
    if (navigator?.geolocation && props?.formik?.location != null) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          props.formik.setFieldValue("location", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <p style={{ marginTop: 10 }}>
        Select the location of the customer on the map.
      </p>

      <div>
        <LoadScript googleMapsApiKey="AIzaSyAfo0XXycj9r3CizgqozxFH1oSkY6WvqJA">
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={{
              lat: props?.formik?.values?.location?.lat || 0,
              lng: props?.formik?.values?.location?.lng || 0,
            }}
            onClick={handleMapClick}
          >
            {props?.formik?.values?.location && (
              <Marker
                position={{
                  lat: props?.formik?.values?.location?.lat,
                  lng: props?.formik?.values?.location?.lng,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
})

import { useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function SelectLocation(props: {
  formik: any;
  setFormData?: any;
  formData?: any;
}) {
  const containerStyle = {
    width: "730px",
    height: "300px",
  };

  const handleMapClick = (event: any) => {
    props?.formik?.setFieldValue("location", {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    props?.setFormData({
      ...props?.formData,
      location: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    });
  };

  console.log(
    "props?.formik?.values?.location",
    props?.formik?.values?.location,
    props?.formData?.location
  );

  useEffect(() => {
    if (
      navigator?.geolocation &&
      !props?.formik?.values?.location &&
      !props?.formData?.location
    ) {
      navigator?.geolocation?.getCurrentPosition(
        (position) => {
          props?.formik?.setFieldValue("location", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          props?.setFormData({
            ...props?.formData,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
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
}

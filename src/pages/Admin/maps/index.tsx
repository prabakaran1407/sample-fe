// import { useEffect, useState } from 'react';
// import GoogleMapReact from 'google-map-react';
// import { GOOGLE_MAP_API_KEY } from '../../../../src/config';

// const Map = () => {
//   const [center, setCenter] = useState<any>({ lat: 0, lng: 0 });
//   const [pin, _setPin] = useState<any>(null);
//   const [_error, setError] = useState<any>(null);

//   const handleMapClick = ({ lat, lng }: any) => {
//     // setPin({ lat, lng });
//     console.log('{ lat, lng }:', { lat, lng });
//   };

//   console.log('pin', pin);
//   console.log('center', center);

//   useEffect(() => {
//     // Fetch the user's current location using the Geolocation API
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCenter({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           setError(error.message);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       {center.lat !== 0 && center.lng !== 0 ? (
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
//           // defaultCenter={center}
//           // defaultZoom={14}
//           // defaultCenter={{ lat: 0, lng: 0 }}
//           center={center}
//           defaultZoom={14}
//           onClick={handleMapClick}>
//           {center && (
//             <>
//               <LocationPin
//                 lat={center.lat}
//                 lng={center.lng}
//                 icon={'http://maps.google.com/mapfiles/ms/icons/green.png'}
//                 text='Pinned Location'
//               />
//             </>
//           )}
//         </GoogleMapReact>
//       ) : null}
//     </div>
//   );
// };

// export default Map;

// // const Marker = ({ text }: any) => (
// //   <div>
// //     <img src='http://maps.google.com/mapfiles/ms/icons/green.png' />
// //     <h4>{text}</h4>
// //   </div>
// // );

// // const Marker = ({ text }: any) => (
// //   <div
// //     style={{
// //       color: 'white',
// //       background: 'blue',
// //       padding: '10px 15px',
// //       display: 'inline-flex',
// //       textAlign: 'center',
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       borderRadius: '100%',
// //       transform: 'translate(-50%, -50%)',
// //     }}>
// //     {text}
// //   </div>
// // );

// const LocationPin = ({ address }: any) => (
//   <div className='pin'>
//     <img
//       src={'http://maps.google.com/mapfiles/ms/icons/green.png'}
//       className='pin-icon'
//       style={{
//         fontSize: '60px',
//         width: '50px', // Set the width of the marker
//         height: '50px', // Set the height of the marker
//         // position: 'relative',
//         // top: '-50px', // Adjust the position vertically
//         // left: '-25px', // Adjust the position horizontally
//       }}
//     />
//     <p className='pin-text'>{address}</p>
//   </div>
// );

// // const LocationPin = ({ address }: Props['location']) => (
// //   <div className='pin'>
// //     <Icon
// //       icon={locationIcon}
// //       className='pin-icon'
// //       style={{ fontSize: '60px' }}
// //     />
// //     <p className='pin-text'>{address}</p>
// //   </div>
// // );

/** @format */

import { ScaleLoader } from 'react-spinners';

export function SecondaryLoadScreen() {
  const loaderStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={loaderStyles}>
      <ScaleLoader color='#009EF7' height={30} />
    </div>
  );
}

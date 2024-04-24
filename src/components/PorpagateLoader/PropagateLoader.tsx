import  { useState, useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';
import { COLORS } from '../../../src/utils/globals';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, []); 

  return (
    <div>
          <PropagateLoader color={COLORS.primary} loading={loading}/>
    </div>
  );
};

export default Loader;

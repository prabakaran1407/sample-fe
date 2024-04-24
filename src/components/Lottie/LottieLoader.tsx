/** @format */

import Lottie from 'react-lottie';

export const LottieLoader = (props: any) => {
  const { data } = props;
  const defaultOptions = {
    autoplay: true,
    loop: true,
    animationData: data,
  };
  return <Lottie width={300} options={defaultOptions} />;
};

/** @format */

import { MDM_URL } from '../../../config';
import axios from 'axios';

export function getPlayStore() {
  let payload = {
    parentFrameUrl: 'https://192.168.0.100:3000',
    permissions: ['APPROVE_APPS'],
    enabledFeatures: [
      'PLAY_SEARCH',
      'PRIVATE_APPS',
      'WEB_APPS',
      'STORE_BUILDER',
      'MANAGED_CONFIGURATIONS',
      'ZERO_TOUCH_CUSTOMER_MANAGEMENT',
    ],
  };
  const POST_PLAYSTORE_DATA = `${MDM_URL}/playstore`;
  const config: any = {
    method: 'post',
    headers: {
      //   "Access-Control-Allow-Credentials": true,
      'Access-Control-Allow-Origin': '*',
    },
    url: POST_PLAYSTORE_DATA,
    data: payload,
  };
  return axios(config);
}

// export function deletePolicies(name: any) {
//   const DELETE_POLICY = `${LOC_API_URL}/policies?policy-name=${name}`;
//   const config: AxiosRequestConfig = {
//     method: "delete",
//     url: DELETE_POLICY,
//     // data: data,
//   };
//   return axios(config);
// }

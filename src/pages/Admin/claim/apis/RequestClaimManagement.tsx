/** @format */

import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../../../../config';

const API_URL = API_BASE_URL;
export const REQUEST_CLAIM_MANAGEMENT = `${API_URL}/claims`;
export const REQUEST_PRE_APPROVAL_CLAIM_MANAGEMENT = `${API_URL}/preApprovalClaim`;

export function RequestPreApprovedClaimManagement() {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_PRE_APPROVAL_CLAIM_MANAGEMENT + `?sort=createdAt%20DESC`,
    // headers: { 'Authorization': token }
  };
  return axios(config);
}

// export function RequestClaimManagement(query: boolean,limit: any,skip: any, organization_id: any) {
//   const where = {
//     isPreApprovalClaim: query,
//     organization_id: organization_id
//   };
//   const OgQuery = JSON.stringify(where);
//   let URI = `${API_URL}/getAllClaims?where=${OgQuery}&limit=${limit}&skip=${skip}`;
//   const config: AxiosRequestConfig = {
//     method: "get",
//     url:URI,
//   };
//   return axios(config);
// }

export function getAllClaims(payload: any) {
  let URL = `${API_URL}/getAllClaims`;
  return axios.post(`${URL}`, payload);
}

// export function RequestClaimManagement(isPreApprovalClaim: boolean) {
//   const config: AxiosRequestConfig = {
//     method: "get",
//     url:
//       REQUEST_CLAIM_MANAGEMENT +
//       `?isPreApprovalClaim=${isPreApprovalClaim}&sort=createdAt%20DESC`,
//     // headers: { 'Authorization': token }
//   };
//   return axios(config);
// }
export function requestDepartmentData(status: boolean) {
  const REQUEST_CLAIM_MANAGEMENT = `${API_URL}/userDepartment?status=${status}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CLAIM_MANAGEMENT,
    // headers: { 'Authorization': token }
  };
  return axios(config);
}
export function requestCategoryData() {
  const REQUEST_CLAIM_MANAGEMENT = `${API_URL}/claimCategory`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CLAIM_MANAGEMENT,
    // headers: { 'Authorization': token }
  };
  return axios(config);
}

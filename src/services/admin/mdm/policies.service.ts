/** @format */

import { MDM_URL } from '../../../../src/config';
import axios, { AxiosRequestConfig } from 'axios';

export function getPolicies(enterprise_id?: any) {
  // const REQUEST_POLICY_DATA = `${LOC_API_URL}/policies/list-all-policies?page-size=${limit}&pageToken=${currentPage}`;
  const REQUEST_POLICY_DATA = `${MDM_URL}/policies/list-all-policies?page-size=500&enterprise-name=${enterprise_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_POLICY_DATA,
  };
  return axios(config);
}

export function getAllPolicies(limit: any, org_id?: any) {
  // const REQUEST_POLICY_DATA = `${LOC_API_URL}/policies/list-all-policies?page-size=${limit}&pageToken=${page}`;
  const REQUEST_POLICY_DATA = `${MDM_URL}/policies/list-all-policies?page-size=${limit}&enterprise-name=${org_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_POLICY_DATA,
  };
  return axios(config);
}

export function deletePolicies(name: any, enterprise_name: string) {
  const DELETE_POLICY = `${MDM_URL}/policies?policy-name=${name}&enterprise-name=${enterprise_name}`;
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: DELETE_POLICY,
    // data: data,
  };
  return axios(config);
}

export function CreatePolicyData(data: any) {
  const POST_POLICY = `${MDM_URL}/policies`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: POST_POLICY,
    data: data,
  };
  return axios(config);
}

export function createEnterprise(data: any) {
  const POST_ENTERPRISE = `${MDM_URL}/enterprise`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: POST_ENTERPRISE,
    data: data,
  };
  return axios(config);
}

export function getAllEnterprise() {
  const GET_ENTERPRISE = `${MDM_URL}/enterprise/list-enterprise`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: GET_ENTERPRISE,
  };
  return axios(config);
}

export function deleteEnterprise(enterpriseName: string) {
  const DELETE_ENTERPRISE = `${MDM_URL}/enterprise?enterpriseName=${enterpriseName}`;
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: DELETE_ENTERPRISE,
  };
  return axios(config);
}

export function createPolicy(data: any) {
  data = { ...data, data: {} };
  const POST_POLICY = `${MDM_URL}/policies`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: POST_POLICY,
    data: data,
  };
  return axios(config);
}

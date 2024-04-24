/** @format */

import { MDM_URL } from '../../../config';
import axios, { AxiosRequestConfig } from 'axios';

export function getDevices(data: any, enterprise_id?: any) {
  const REQUEST_POLICY_DATA = `${MDM_URL}/devices?policy-name=${data}&enterprise-name=${enterprise_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_POLICY_DATA,
  };
  return axios(config);
}

export function getAllDevices(limit: any, enterprise_id: any) {
  const REQUEST_POLICY_DATA = `${MDM_URL}/devices/list-all-devices?page-size=${limit}&enterprise_name=${enterprise_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_POLICY_DATA,
  };
  return axios(config);
}

export function getAllDevicesCount(enterprise_id: any) {
  const REQUEST_POLICY_DATA = `${MDM_URL}/devices/list-all-devices?skip=50&enterprise_name=${enterprise_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_POLICY_DATA,
  };
  return axios(config);
}

export function deleteDevices(name: any, enterprise_id: string) {
  const DELETE_POLICY = `${MDM_URL}/devices?name=${name}&enterprise-name=${enterprise_id}`;
  const config: AxiosRequestConfig = {
    method: 'delete',
    url: DELETE_POLICY,
    // data: data,
  };
  return axios(config);
}

export function startStopLostMode(name: any, enterprise_id: string, data: any) {
  const REQUEST_POLICY_DATA = `${MDM_URL}/devices/issuecommand?name=${name}&enterprise-name=${enterprise_id}`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: REQUEST_POLICY_DATA,
    data: data,
  };
  return axios(config);
}

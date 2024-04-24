/** @format */

import { API_BASE_URL } from "../../config";
import axios, { AxiosRequestConfig } from "axios";

interface Payload {
  user: string;
  startTime: number;
  endTime: number;
  limit?: number;
  skip?: number;
}

export function getDistance(data: any) {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Check if the token is available
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const GetLatLan = `${API_BASE_URL}/visits/getdistance?user=${data.id}&startTime=${data.startTime}&endTime=${data.endTime}`;

  const config: AxiosRequestConfig = {
    method: "get",
    headers: {
      Authorization: JSON.parse(token),
    },
    url: GetLatLan,
  };

  return axios(config);
}

export function getDistanceNew(payload: Payload) {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("token");

  // Check if the token is available
  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const GetLatLan = `${API_BASE_URL}/visits/getdistance`;

  const config: AxiosRequestConfig = {
    method: "post",
    headers: {
      Authorization: JSON.parse(token),
    },
    url: GetLatLan,
    data: payload, // Include the payload in the request
  };

  return axios(config);
}

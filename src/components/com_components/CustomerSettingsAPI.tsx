/** @format */

import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../config";
import AxiosService from "../../libs/axios.services";

const API_URL = API_BASE_URL;
export function getCustomerData(
  status: any,
  skip?: string | number | null,
  limit?: string | number | null
) {
  let REQUEST_CUSTOMER_DATA = `${API_URL}/customers?status=${status}`;
  if (skip) {
    REQUEST_CUSTOMER_DATA += `&skip=${skip}`;
  }
  if (limit) {
    REQUEST_CUSTOMER_DATA += `&limit=${limit}`;
  }
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_CUSTOMER_DATA,
  };
  return axios(config);
}

export function getCustomerDataNew(
  where: any,
  skip?: string | number | null,
  limit?: string | number | null,
  populate: boolean | null = false,
  select: any[] = ["*"]
) {
  const REQUEST_CUSTOMER_DATA = `${API_URL}/customers/new`;

  const payload: any = {};
  if (skip) {
    payload[`skip`] = skip;
  }
  if (limit) {
    payload[`limit`] = limit;
  }
  payload[`where`] = where;
  payload[`populate`] = populate;
  payload[`select`] = select;
  const config: AxiosRequestConfig = {
    method: "post",
    url: REQUEST_CUSTOMER_DATA,
    data: payload,
  };
  return axios(config);
}

export function getCustomerDataByGroupId(groupId: string) {
  const REQUEST_CUSTOMER_DATA = `${API_URL}/customerCategorySaved?category=${groupId}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_CUSTOMER_DATA,
  };
  return axios(config);
}

export function getCustomerCategorySavedV2(
  where: any,
  skip?: string | number | null,
  limit?: string | number | null,
  populate: boolean | null = false,
  select: any[] = ["*"]
) {
  const REQUEST_CUSTOMER_DATA = `${API_URL}/getCustomerCategorySavedV2`;
  const payload: any = {};
  if (skip) {
    payload[`skip`] = skip;
  }
  if (limit) {
    payload[`limit`] = limit;
  }
  payload[`where`] = where;
  payload[`populate`] = populate;
  payload[`select`] = select;
  const config: AxiosRequestConfig = {
    method: "post",
    url: REQUEST_CUSTOMER_DATA,
    data: payload,
  };
  return axios(config);
}

export function getCustomerDataByAssignment(status: any) {
  const REQUEST_CUSTOMER_DATA = `${API_URL}/customers?status=${true}&assigned=${status}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_CUSTOMER_DATA,
  };
  return axios(config);
}
export function getCustomerDataByAssignmentSpecific(
  categoryId: any,
  subCategoryId: any,
  status: any
) {
  const query = {
    category: categoryId,
    subCategory: subCategoryId,
  };
  const REQUEST_CUSTOMER_DATA = `${API_URL}/customers?status=${true}&assigned=${status}&where=${JSON.stringify(
    query
  )}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_CUSTOMER_DATA,
  };
  return axios(config);
}

export function getCustomerDataAssigned() {
  const REQUEST_BILLING_DATA = `${API_URL}/customerCategorySaved`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_BILLING_DATA,
  };
  return axios(config);
}

export function getUserDataUnAssigned(status: any, designation: any) {
  const REQUEST_BILLING_DATA = `${API_URL}/user?status=${status}&designation=${designation}`;

  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_BILLING_DATA,
  };
  return axios(config);
}

export function getUserListV2(
  where: any,
  skip?: string | number | null,
  limit?: string | number | null,
  populate: boolean | null = false,
  select: any[] = ["*"]
) {
  const REQUEST_USER_DATA = `${API_URL}/userV2`;
  const payload: any = {};
  if (skip) {
    payload[`skip`] = skip;
  }
  if (limit) {
    payload[`limit`] = limit;
  }
  payload[`where`] = where;
  payload[`populate`] = populate;
  payload[`select`] = select;
  const config: AxiosRequestConfig = {
    method: "post",
    url: REQUEST_USER_DATA,
    data: payload,
  };
  return axios(config);
}
export async function getUserListForAdmin(organization_id: any) {
  const AXIOS_INSTANCE = AxiosService.getApiInstance();
  const REQUEST_USER_DATA = `${API_URL}/user/list?organization_id=${organization_id}`;
  return await AXIOS_INSTANCE.get(REQUEST_USER_DATA);
}
export function getUserDataAssigned(status: any, designation: any) {
  const REQUEST_BILLING_DATA = `${API_URL}/user?status=${status}&designation=${designation}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_BILLING_DATA,
  };
  return axios(config);
}

export function getUserData() {
  const REQUEST_BILLING_DATA = `${API_URL}/getUsernameforUser`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_BILLING_DATA,
  };
  return axios(config);
}

export function getBillingDataNew(
  where: string,
  skip?: string | number | null,
  limit?: string | number | null,
  populate: boolean | null = false,
  select: any[] = ["*"]
) {
  const REQUEST_CUSTOMER_DATA = `${API_URL}/billingparty/new`;
  // if (skip) {
  //   REQUEST_CUSTOMER_DATA += `&skip=${skip}`;
  // }
  // if (limit) {
  //   REQUEST_CUSTOMER_DATA += `&limit=${limit}`;
  // }
  const payload: any = {};
  if (skip) {
    payload[`skip`] = skip;
  }
  if (limit) {
    payload[`limit`] = limit;
  }
  payload[`where`] = where;
  payload[`populate`] = populate;
  payload[`select`] = select;

  const config: AxiosRequestConfig = {
    method: "post",
    url: REQUEST_CUSTOMER_DATA,
    data: payload,
  };
  return axios(config);
}

export function getBillingData(status: any, query?: any, customerId?: string) {
  let REQUEST_BILLING_DATA = `${API_URL}/billingparty?status=${status}&select=id,billingPartyName,contactPerson,contactNumber,customer,user,status&populate=false`;

  if (customerId) {
    REQUEST_BILLING_DATA += `&customer=${customerId}`;
  }

  if (query) {
    REQUEST_BILLING_DATA += `&where=${JSON.stringify(query)}`;
  }
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_BILLING_DATA,
  };
  return axios(config);
}

export function getDashboardData(organization_id: any) {
  const REQUEST_BILLING_DATA = `${API_URL}/user/dashboardBO?organization_id=${organization_id}`;
  const config: AxiosRequestConfig = {
    method: "get",
    url: REQUEST_BILLING_DATA,
  };
  return axios(config);
}

export function bulkUpload(file: any) {
  const formData = new FormData();
  formData.append("csv", file);
  const REQUEST_BULK_CUSTOMERS = `${API_URL}/migrate/customers`;
  const config: AxiosRequestConfig = {
    method: "post",
    url: REQUEST_BULK_CUSTOMERS,
    data: formData,
    headers: {
      "Content-Type": `multipart/form-data`,
    },
  };
  return axios(config);
}

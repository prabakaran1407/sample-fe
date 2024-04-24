/** @format */

import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../../../../../../config';


import { API_ROUTES, getApiRoute } from '../../../../../../data/ApiRoutes';
import AxiosService from '../../../../../../libs/axios.services'

const API_URL = API_BASE_URL;
class ProductSettingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

async getBrandData(status: boolean, organization_id: any) {
  const REQUEST_BRAND_DATA = `${API_URL}/brand?status=${status}&organization_id=${organization_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_BRAND_DATA,
  };
  return axios(config);
}
async getBrandDataV2(
  skip: number | string | undefined = 0,
  limit: number | string | undefined = 0,
  where: any = {},
  select: string[] = ['*'],
  populate: boolean = false
) {
  let payload: any = {};
  if (skip) {
    payload[`skip`] = skip;
  }
  if (limit) {
    payload[`limit`] = limit;
  }
  payload[`where`] = JSON.stringify(where);
  payload[`populate`] = populate;
  payload[`select`] = select;
  // const config: AxiosRequestConfig = {
  //   method: "post",
  //   url: REQUEST_CUSTOMER_DATA,
  //   data: payload,
  // };
  // return axios(config);
  // let REQUEST_SUB_CATEGORY = `${API_URL}/userCategory?status=${status}&isSubCategory=true`;
  let REQUEST_BRAND_DATA = `${API_URL}/brandV2`;

  // if (parentCategoryId) {
  //   REQUEST_SUB_CATEGORY += `&parentCategory=${parentCategoryId}`;
  // }

  const config: AxiosRequestConfig = {
    method: 'post',
    url: REQUEST_BRAND_DATA,
    data: payload,
  };
  return axios(config);
}

async requestAllBrandDetails(data: any) {
  const REQUEST_PRODUCT_DATA = `${API_URL}/brand?where=${JSON.stringify(data)}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_PRODUCT_DATA,
  };
  return axios(config);
}

async getProductsData(status: boolean, organization_id: any) {
  const REQUEST_PRODUCT_DATA = `${API_URL}/product?status=${status}&sort=createdAt%20DESC&organization_id=${organization_id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_PRODUCT_DATA,
  };
  return axios(config);
}

async getProductsDataV2(
  skip: number | string | undefined = 0,
  limit: number | string | undefined = 0,
  where: any = {},
  select: string[] = ['*'],
  populate: boolean = false
) {
  let payload: any = {};
  if (skip) {
    payload[`skip`] = skip;
  }
  if (limit) {
    payload[`limit`] = limit;
  }
  payload[`where`] = JSON.stringify(where);
  payload[`populate`] = populate;
  payload[`select`] = select;
  let REQUEST_PRODUCT_DATA = `${API_URL}/productV2`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: REQUEST_PRODUCT_DATA,
    data: payload,
  };
  return axios(config);
}

async getProductsSubCategoryData(status: boolean) {
  const REQUEST_PRODUCT_DATA = `${API_URL}/productCategory?status=${status}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_PRODUCT_DATA,
  };
  return axios(config);
}

async getSpecificBrandData(id: any) {
  const REQUEST_BRAND_DATA = `${API_URL}/brand/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_BRAND_DATA,
  };
  return axios(config);
}

async getClaimSpecificCategoryData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/claimCategory/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}
async getClaimSpecificCategoryDataModel(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/claimCategory/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}

// async getClaimSpecificCategoryDataModelTravel(id: any) {
//   const REQUEST_CATEGORY_DATA = `${API_URL}/travelexpenses/${id}`;
//   const config: AxiosRequestConfig = {
//     method: 'get',
//     url: REQUEST_CATEGORY_DATA,
//   };
//   return axios(config);
// }

async  getClaimSpecificCategoryDataModelTravel(id: any) {
  let URL = getApiRoute(API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY?.GET_CLAIMSPECIFIC_CATEGORY_DATA_MODELTARVEL)
  if (id) URL += `/${id}`;
  return await this.AXIOS.get(URL,id);
}

async getSpecificCustomerTypeData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/customerType/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}
async getSpecificCustomerStateData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/state/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}
async getSpecificCustomerGroupData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/userCategory/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}
async getSpecificCustomerCategoryData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/userCategory/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}
async getSpecificCategoryData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/productCategory/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}
async getDepartmentSpecificCategoryData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/claimDepartment/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}

async getSpecificUserCategory(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/userCategory/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}

async getSpecificOrderData(id: any) {
  const REQUEST_CATEGORY_DATA = `${API_URL}/orderType/${id}`;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: REQUEST_CATEGORY_DATA,
  };
  return axios(config);
}

async bulkUploadProducts(file: any) {
  const formData = new FormData();
  formData.append('csv', file);
  const REQUEST_BULK_CUSTOMERS = `${API_URL}/migrate/product`;
  const config: AxiosRequestConfig = {
    method: 'post',
    url: REQUEST_BULK_CUSTOMERS,
    data: formData,
    headers: {
      'Content-Type': `multipart/form-data`,
    },
  };
  return axios(config);
}
}

export default new ProductSettingService()

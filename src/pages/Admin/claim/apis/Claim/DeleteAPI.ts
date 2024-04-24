/** @format */

import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../../../../config";
import { API_ROUTES, getApiRoute } from "../../../../../data/ApiRoutes";
import AxiosService from "../../../../../libs/axios.services";

const API_URL = API_BASE_URL;
class DeleteApiService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async deleteBrand(data: any, id: any) {
    const DELETE_BRAND = `${API_URL}/brand/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: DELETE_BRAND,
      data: data,
    };
    return axios(config);
  }

  async deleteDeBrand(_data: any, id: any) {
    const DELETE_BRAND = `${API_URL}/brand/delete?brandId=${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: DELETE_BRAND,
    };
    return axios(config);
  }

  // export function deleteCategory(data: any, id: any) {
  //   const DELETE_CATEGORY = `${API_URL}/productCategory/${id}`
  //   const config: AxiosRequestConfig = {
  //     method: "patch",
  //     url: DELETE_CATEGORY,
  //     data: data,
  //   }
  //   return axios(config)
  // }

  async deleteCategory(_data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/productcategory/delete?productId=${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: DELETE_CATEGORY,
    };
    return axios(config);
  }

  async deleteAcCategory(_data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/category/activate?categoryId=${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: DELETE_CATEGORY,
    };
    return axios(config);
  }

  // export function deleteAcCategory(data: any) {
  //   const NEW_USER_URL = `${API_URL}/category/activate`;
  //   const config: AxiosRequestConfig = {
  //     method: "post",
  //     url: NEW_USER_URL,
  //     data: data,
  //   };
  //   return axios(config);
  // }

  async deleteSubCategory(_data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/productsubcategory/delete?subCategoryId=${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: DELETE_CATEGORY,
    };
    return axios(config);
  }

  async deleteAcSubCategory(_data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/subcategory/activate?subCategoryId=${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: DELETE_CATEGORY,
    };
    return axios(config);
  }

  async deleteProduct(data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/product/${id.id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: DELETE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async deleteAcProduct(_data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/product/activate?productId=${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: DELETE_CATEGORY,
    };
    return axios(config);
  }
  async deleteClaimDepartment(data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/userDepartment/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: DELETE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async deleteClaimCategory(data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/claimCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: DELETE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async deleteClaimSubCategory(data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/claimCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: DELETE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async deletePreApproval(data: any, id: any) {
    const DELETE_CATEGORY = `${API_URL}/claims/${id}`;
    const config: AxiosRequestConfig = {
      method: "delete",
      url: DELETE_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async deleteUser(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/user/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteOrganization(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/organization/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteUserCategory(id: any, data: any) {
    const NEW_USER_CATEGORY = `${API_URL}/userCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async deleteState(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/userCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteOrderType(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/orderType/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteGroup(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/userCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteCustomer(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/customers/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteBillingParty(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/billingParty/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteCustomerType(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/CustomerType/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteCustomerCategory(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/customerCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }
  // export function deleteTypeOfClaim(data: any, id: any) {
  //   const NEW_TYPE_URL = `${API_URL}/typeOfClaim/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'put',
  //     url: NEW_TYPE_URL,
  //     data: data,
  //   };
  //   return axios(config);
  // }

  async deleteTypeOfClaim(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }
  async deleteModeOfTransport(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.MODE_OF_TRANSPORT?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }
  async deleteGrade(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  async deleteAmountAllocation(data: any, id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.UPDATE_AMOUNT_ALLOCATION
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  async deleteTravelAmountAllocation(data: any, id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.UPDATE_TRAVEL_ALLOCATION
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  async deleteRoomRentAllocation(data: any, id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.UPDATE_ROOMRENT_ALLOCATION
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  async deleteTravelAllocation(data: any, id: any) {
    const NEW_TYPE_URL = `${API_URL}/travelexpenses/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_TYPE_URL,
      data: data,
    };
    return axios(config);
  }

  async deleteSplitSubCategory(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }
}

export default new DeleteApiService();

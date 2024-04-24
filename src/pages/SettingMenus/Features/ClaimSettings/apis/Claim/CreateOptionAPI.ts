/** @format */

import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../../../../../../config";
import { API_ROUTES, getApiRoute } from "../../../../../../data/ApiRoutes";
import AxiosService from "../../../../../../libs/axios.services";

const API_URL = API_BASE_URL;

class CreateOptionApiService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async createNewBrand(data: any) {
    const CREATE_NEW_BRAND = `${API_URL}/brand`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_BRAND,
      data: data,
    };
    return axios(config);
  }

  // export function createNewOrganization(data: any) {
  //   const CREATE_NEW_ORG = `${API_URL}/organization`;
  //   const config: AxiosRequestConfig = {
  //     method: "post",
  //     url: CREATE_NEW_ORG,
  //     data: data,
  //   };
  //   return axios(config);
  // }
  async createNewOrganization(data: any) {
    const CREATE_NEW_ORG = `${API_URL}/organization/create`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_ORG,
      data: data,
    };
    return axios(config);
  }

  async UpdateOrganization(data: any, id: any) {
    const NEW_ORGANIZATION_URL = `${API_URL}/organization/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_ORGANIZATION_URL,
      data: data,
    };
    return axios(config);
  }

  async updateBrand(data: any, id: any) {
    const UPDATE_BRAND = `${API_URL}/brand/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_BRAND,
      data: data,
    };
    return axios(config);
  }

  async createNewState(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/state`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async createNewGroup(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/userCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async getAllGroupsAllocationData(data: any) {
    const TYPE_OF_CLAIM = `${API_URL}/userCategory?where=${JSON.stringify(
      data
    )}`;
    let URL = `${TYPE_OF_CLAIM}`;
    return axios.get(`${URL}`);
  }

  async createNewCustomerCategory(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/userCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async getAllstateAllocationData(data: any) {
    const TYPE_OF_CLAIM = `${API_URL}/userCategory?where=${JSON.stringify(
      data
    )}`;
    let URL = `${TYPE_OF_CLAIM}`;
    return axios.get(`${URL}`);
  }

  async createNewCustomerType(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/customerType`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async createNewCategory(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/productCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async createNewOrdertype(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/orderType`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async getAllOrderCtegories(status: any) {
    const TYPE_OF_CLAIM = `${API_URL}/orderType?where=${JSON.stringify(
      status
    )}`;
    let URL = `${TYPE_OF_CLAIM}`;
    return axios.get(`${URL}`);
  }

  async createPreApproval(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/preApprovalClaim`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async createClaimCategory(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/claimCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async createClaimTransportCategory(payload: any) {
    console.log("-----working----------");
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async getAllTravelCtegories(status: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY.GETALL);
    return await this.AXIOS.get(`${URL}?where=${JSON.stringify(status)}`);
  }

  // private getApiRoute(route: string) {
  //   return `${API_URL}/travelexpenses?where=${JSON.stringify(route)}`;
  // }

  async createNewClaimDepartMentCategory(data: any) {
    const CREATE_NEW_CATEGORY = `${API_URL}/userDepartment`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async updateGroup(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/userCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async updateClaimCategory(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/claimCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async updateClaimCategoryTravel(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }
  async updateCustomerType(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/customerType/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async updateCustomerCategory(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/userCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async updateCategory(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/productCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async updateOrdertype(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/orderType/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async updateClaimDepartment(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/userDepartment/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async getOneDepartment(data: any, id: any) {
    const UPDATE_CATEGORY = `${API_URL}/userDepartment/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async requestClaimCategoryData(status: boolean) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?&status=${status}&isSubCategory=false`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestClaimSubCategoryData(status: boolean) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?&status=${status}&isSubCategory=true`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestClaimSubCategoryDataModel(status: boolean) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?&status=${status}&isSubCategory=false`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestSubCategoryData(status: boolean) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?&status=${status}&isSubCategory=false`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async getProductCategoryV2(
    skip: number | string | undefined = 0,
    limit: number | string | undefined = 0,
    where: any = {},
    select: string[] = ["*"],
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

    let REQUEST_CATEGORY = `${API_URL}/getProductCategoryV2`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: REQUEST_CATEGORY,
      data: payload,
    };
    return axios(config);
  }

  async requestSubCategoryDataBybrand(dataGet: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?&status=true&isSubCategory=false&where={"brandName":"${dataGet.brandName}","name":"${dataGet.name}"}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestOrderData(status: boolean) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/orderType?&status=${status}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async getOrderTypeV2(
    skip: number | string | undefined = 0,
    limit: number | string | undefined = 0,
    where: any = {},
    select: string[] = ["*"],
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

    let REQUEST_CATEGORY = `${API_URL}/getOrderTypeV2`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: REQUEST_CATEGORY,
      data: payload,
    };
    return axios(config);
  }

  async requestCategoryData(status: boolean) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?&status=${status}&isSubCategory=true`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestCategoryDataBybrand(dataGet: any) {
    console.log("requestCategoryDataBybrand", dataGet);
    // "parent":{"brandName":"${dataGet.parent.brandName}","name":"${dataGet.parent.name}"}
    // "name":"${dataGet.name}
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?&status=true&isSubCategory=true&where={"name":"${dataGet.name}", "brandName":"${dataGet.parent.brandName},"parent":"${dataGet.parent.name}"}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestALLCategoryData(status: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?where=${JSON.stringify(
      status
    )}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestCustomerData() {
    const REQUEST_SUB_CATEGORY = `${API_URL}/customers`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestStateData(status: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/state?status=${status}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestCustomerGroupData(status: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/group?status=${status}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestCustomerSubCategoryData(status: any, parentCategoryId?: string) {
    let REQUEST_SUB_CATEGORY = `${API_URL}/userCategory?status=${status}&isSubCategory=true`;

    if (parentCategoryId) {
      REQUEST_SUB_CATEGORY += `&parentCategory=${parentCategoryId}`;
    }

    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestCustomerSubCategoryDataV2(
    skip: number | string | undefined = 0,
    limit: number | string | undefined = 0,
    where: any = {},
    select: string[] = ["*"],
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
    let REQUEST_SUB_CATEGORY = `${API_URL}/userCategoryV2`;

    // if (parentCategoryId) {
    //   REQUEST_SUB_CATEGORY += `&parentCategory=${parentCategoryId}`;
    // }

    const config: AxiosRequestConfig = {
      method: "post",
      url: REQUEST_SUB_CATEGORY,
      data: payload,
    };
    return axios(config);
  }

  async requestCustomerCategoryData(status: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/userCategory?status=${status}&isSubCategory=false`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestCustomerCategoryDataV2(
    where: string,
    skip?: string | number | null,
    limit?: string | number | null,
    populate: boolean | null = false,
    select: any[] = ["*"]
  ) {
    let REQUEST_CUSTOMER_DATA = `${API_URL}/userCategoryV2`;
    let payload: any = {};
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

  async requestCustomerTypeData(status: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/customerType?status=${status}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestAllClaimSubCategoryData() {
    const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?where={"isSubCategory": "true"}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestAllSubCategoryData() {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?where={"isSubCategory": "true"}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async AllSubCategoryData(id: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?where={"isSubCategory": "true","parent":"${id}","status":"true"}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    console.log("config Sub Categoey", axios(config));
    return axios(config);
  }

  async requestAllClaimCategoryDataByType(type: string) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?where={"isSubCategory": "false", "type": "${type}"}&status=${true}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }

  async requestAllClaimCategoryData() {
    const REQUEST_SUB_CATEGORY = `${API_URL}/claimCategory?where={"isSubCategory": "false"}&status=${true}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    return axios(config);
  }
  async requestAllCategoryData(brandName: any) {
    const REQUEST_SUB_CATEGORY = `${API_URL}/productCategory?where={"isSubCategory": "false","brandName":"${brandName}","status":"true"}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };
    console.log("config Category", axios(config));
    return axios(config);
  }
  async requestAllUser() {
    const REQUEST_SUB_CATEGORY = `${API_URL}/user`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_SUB_CATEGORY,
    };

    return axios(config);
  }

  async requestSpecificBillingData(id: any) {
    const REQUEST_PRODUCT_DATA = `${API_URL}/billingParty/${id}?populate=false`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }
  async requestSpecificCustomerData(id: any) {
    const REQUEST_PRODUCT_DATA = `${API_URL}/customers?where={"id":"${id}"}&populate=false`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }
  async requestSpecificBrandData(id: any) {
    const REQUEST_PRODUCT_DATA = `${API_URL}/product/${id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }
  async requestSpecificPreApprovalData(id: any) {
    const REQUEST_PRODUCT_DATA = `${API_URL}/preApprovalClaim/${id}&status=${true}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }

  async requestSpecificPreApprovalDataFilter(data: any) {
    const CREATE_NEW_CUSTOMER = `${API_URL}/getclaimsbydate`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CUSTOMER,
      data: data,
    };
    return axios(config);
  }

  async requestBrandDetails() {
    const REQUEST_PRODUCT_DATA = `${API_URL}/brand?status=${true}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }

  async requestBrandDetailsFilter(organization_id: any) {
    const REQUEST_PRODUCT_DATA = `${API_URL}/usercategory?isSubCategory=true&organization_id=${organization_id}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }

  async requestBrandDetailsByName(brandName: any) {
    const REQUEST_PRODUCT_DATA = `${API_URL}/brand?where={"name":"${brandName}"}&status=${true}`;
    const config: AxiosRequestConfig = {
      method: "get",
      url: REQUEST_PRODUCT_DATA,
    };
    return axios(config);
  }

  async createNewBillingParty(data: any) {
    const CREATE_NEW_BILLING_PARTY = `${API_URL}/billingParty`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_BILLING_PARTY,
      data: data,
    };
    return axios(config);
  }
  async createNewCustomer(data: any) {
    const CREATE_NEW_CUSTOMER = `${API_URL}/customers`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_CUSTOMER,
      data: data,
    };
    return axios(config);
  }
  async createNewProduct(data: any) {
    const CREATE_NEW_PRODUCT = `${API_URL}/product`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_PRODUCT,
      data: data,
    };
    return axios(config);
  }

  async UpdateState(data: any, id: any) {
    const CREATE_NEW_PRODUCT = `${API_URL}/state/${id}`;
    console.log(CREATE_NEW_PRODUCT);
    const config: AxiosRequestConfig = {
      method: "patch",
      url: CREATE_NEW_PRODUCT,
      data: data,
    };
    return axios(config);
  }
  async UpdateCustomer(data: any, id: any) {
    const UPDATE_CUSTOMER = `${API_URL}/customers/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_CUSTOMER,
      data: data,
    };
    return axios(config);
  }
  async UpdateBillingParty(data: any, id: any) {
    const UPDATE_BILLING_PARTY = `${API_URL}/billingParty/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_BILLING_PARTY,
      data: data,
    };
    return axios(config);
  }
  async UpdateProduct(data: any, id: any) {
    const UPDATE_PRODUCT = `${API_URL}/product/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: UPDATE_PRODUCT,
      data: data,
    };
    return axios(config);
  }
  async UpdatePreApprovalData(data: any, id: any) {
    const CREATE_PRE_APPROVAL_CLAIM = `${API_URL}/preApprovalClaim/${id}`;
    const config: AxiosRequestConfig = {
      method: "patch",
      url: CREATE_PRE_APPROVAL_CLAIM,
      data: data,
    };
    return axios(config);
  }
  async mapUser(data: any) {
    const ASSIGN_USER_TO_CATEGORY = `${API_URL}/mapping/assignuser`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: ASSIGN_USER_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async unMapUser(data: any) {
    const UNASSIGN_USER_TO_CATEGORY = `${API_URL}/user/unassignToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_USER_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async unMapCustomer(data: any) {
    const UNASSIGN_CUSTOMER_TO_CATEGORY = `${API_URL}/customer/unassignToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_CUSTOMER_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async mapCustomers(data: any) {
    const CREATE_NEW_PRODUCT = `${API_URL}/customer/assignToCategory/`;
    console.log(CREATE_NEW_PRODUCT);
    const config: AxiosRequestConfig = {
      method: "post",
      url: CREATE_NEW_PRODUCT,
      data: data,
    };
    return axios(config);
  }
  async mapBillingParty(id: any, data: any) {
    const CREATE_NEW_PRODUCT = `${API_URL}/billingParty/${id}`;
    console.log(CREATE_NEW_PRODUCT);
    const config: AxiosRequestConfig = {
      method: "patch",
      url: CREATE_NEW_PRODUCT,
      data: data,
    };
    return axios(config);
  }

  async CreateNewUser(data: any) {
    const NEW_USER_URL = `${API_URL}/entrance/invite-user`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async UpdateUser(data: any, id: any) {
    const NEW_USER_URL = `${API_URL}/user/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async UpdateBulkPassword(data: any) {
    const NEW_USER_URL = `${API_URL}/reset-password-bulk`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: NEW_USER_URL,
      data: data,
    };
    return axios(config);
  }

  async createNewUserCategory(data: any) {
    const NEW_USER_CATEGORY = `${API_URL}/userCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: NEW_USER_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async updateUserCategory(id: any, data: any) {
    const NEW_USER_CATEGORY = `${API_URL}/userCategory/${id}`;
    const config: AxiosRequestConfig = {
      method: "put",
      url: NEW_USER_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async mapAsm(data: any) {
    const ASSIGN_ASM_TO_CATEGORY = `${API_URL}/mapping/assigntoasm`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: ASSIGN_ASM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async unMapAsm(data: any) {
    const UNASSIGN_ASM_TO_CATEGORY = `${API_URL}/user/unassignASMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_ASM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async mapRsm(data: any) {
    const ASSIGN_RSM_TO_CATEGORY = `${API_URL}/mapping/assigntorsm`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: ASSIGN_RSM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async unMapRsm(data: any) {
    const UNASSIGN_RSM_TO_CATEGORY = `${API_URL}/user/unassignRSMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_RSM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async mapZsm(data: any) {
    const ASSIGN_ZSM_TO_CATEGORY = `${API_URL}/mapping/assigntozsh`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: ASSIGN_ZSM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async unMapZsm(data: any) {
    const UNASSIGN_ZSM_TO_CATEGORY = `${API_URL}/user/unassignZSMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_ZSM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async mapBdm(data: any) {
    const ASSIGN_BDM_TO_CATEGORY = `${API_URL}/user/assignBDMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: ASSIGN_BDM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async unMapBdm(data: any) {
    const UNASSIGN_BDM_TO_CATEGORY = `${API_URL}/user/unassignBDMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_BDM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }
  async mapSrRSM(data: any) {
    const ASSIGN_SRRSM_TO_CATEGORY = `${API_URL}/user/assignSrRSMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: ASSIGN_SRRSM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }

  async unMapSrRSM(data: any) {
    const UNASSIGN_SRRSM_TO_CATEGORY = `${API_URL}/user/unassignSrRSMToCategory`;
    const config: AxiosRequestConfig = {
      method: "post",
      url: UNASSIGN_SRRSM_TO_CATEGORY,
      data: data,
    };
    return axios(config);
  }
}
export default new CreateOptionApiService();

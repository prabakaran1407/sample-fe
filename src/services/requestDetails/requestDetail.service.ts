/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class RequestDemoDetails {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async getAllRequestDetails(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.REQUEST_DETAILS?.GET);
    return await this.AXIOS.post(URL, payload);
  }

  async updateRequestData(id: string, payload: Record<string, unknown>) {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.REQUEST_DETAILS?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.post(URL, payload);
  }

  async updateUser(userId: string, payload: Record<string, unknown>) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.UPDATE);
    if (userId) URL += `/${userId}`;
    return await this.AXIOS.put(URL, payload);
  }
}

export default new RequestDemoDetails();

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class LeaveManagementservice {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getLeaveManagementlist(payload?: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.LEAVE_MANAGEMENT?.LIST);
    return await this.AXIOS.post(URL, payload);
  }

  async approveLeave(id: string, payload: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.LEAVE_MANAGEMENT?.UPDATE);
    URL = `${URL}?id=${id}`;
    return await this.AXIOS.post(URL, payload);
  }
}

export default new LeaveManagementservice();

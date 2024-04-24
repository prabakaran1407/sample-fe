/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class ClaimManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // async postUserData(payload:any){
  //     const URL = getApiRoute(API_ROUTES?.REQUEST_DEMO?.CREATE);
  //     return await AxiosService.POST(URL, payload);
  // }

  async getClaimUser() {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.LIST);
    // No Auth
    return await AxiosService.GET(URL);
  }

  async getAllClaims(payload: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.GET_ALL_CLAIMS
    );
    return await this.AXIOS.post(URL, payload);
  }

  async getClaimDashboard(query?: string) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.GET_CLAIM_COUNT}?${query || ""}`
    );
    return await this.AXIOS.get(URL);
  }

  async claimActionUpdate(id: string, payload: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.UPDATE_CLAIM_ACTION}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }

  async getOutstandingForClaims(org_id: string) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.CLAIM_MANAGEMENT?.OUTSTANDING_CLAIM}/?organization=${org_id}`
    );
    return await this.AXIOS.get(URL);
  }
}

export default new ClaimManagementService();

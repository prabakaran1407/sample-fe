/** @format */

import { API_ROUTES, getApiRoute } from "../../../../../../../data/ApiRoutes";
import AxiosService from "../../../../../../../libs/axios.services";

class ClaimSettingManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  async createTypeOfClaim(payload: any) {
    console.log("-----working----------");
    const URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }
  async updateTypeOfClaim(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }
  async getClaimTypes(status: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.LIST);
    return await this.AXIOS.get(URL, status);
  }
  async getOneClaim(id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.LISTONE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.get(URL, id);
  }

  async getAllClaimTypes(payload: any) {
    // const URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.LISTALL)
    const URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.NEW_LIST);
    console.log("-------get all claim types------>");
    // return await this.AXIOS.get(`${URL}?status=${status}&organization_id=${organization_id}`);
    return await this.AXIOS.post(URL, payload);
  }
  async getAllTypesOfTravel(status: any, organization_id: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.CLAIM?.LIST_TYPETRAVEL);
    return await this.AXIOS.get(
      `${URL}?status=${status}&organization_id=${organization_id}`
    );
  }
}
export default new ClaimSettingManagementService();

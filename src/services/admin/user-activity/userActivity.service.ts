/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class UserActivityServices {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getUserActivity(query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USER_ACTIVITY?.GET);
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }
}

export default new UserActivityServices();

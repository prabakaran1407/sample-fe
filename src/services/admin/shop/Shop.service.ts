/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class ShopService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getAdminBillings(payload: any, query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.SHOP_SERVICE?.LIST_BILLING);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }
  async createUserService(payload: any, query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.SHOP_SERVICE?.CREATE);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }
  async listUsers(payload: any, query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.SHOP_SERVICE?.LIST_USERS);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }
  
}

export default new ShopService();

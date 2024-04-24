/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class BillingAddEditViewService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async getDepartment(): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    URL += `?status=true`;
    return await this.AXIOS.get(URL);
  }
  async getCategory(query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    URL += `?status=true`;
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }
  async createUser(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    return await this.AXIOS.post(URL, payload);
  }

  async getAll(payload?: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    return await this.AXIOS.post(URL, payload);
  }

  async getOneUser(userId: string) {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    if (userId) URL += `/${userId}`;
    return await this.AXIOS.get(URL);
  }

  async updateUser(userId: string, payload: Record<string, unknown>) {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    if (userId) URL += `/${userId}`;
    return await this.AXIOS.put(URL, payload);
  }

  async getRoles() {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
    return await this.AXIOS.get(URL);
  }
}

export default new BillingAddEditViewService();

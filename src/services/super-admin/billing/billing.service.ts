/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../../libs/axios.services';
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from '../../../data/ApiRoutes';

class BillingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getAll(query?: string) {
    try {
      let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST);
      if (query) URL += query;
      return await this.AXIOS.get(URL);
    } catch (e) {
      console.log('error', e);
    }
  }

  async getOrganization(query?: string) {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GET_ORG);
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }

  async create(payload: Record<string, any>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async getAllBillingDetails(payload: Record<string, any>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.LIST_ALL);
    return await this.AXIOS.post(URL, payload);
  }

  async billingDtlGetById(id: string, payload?: Record<string, any>) {
    const URL = getApiRoute(`${API_ROUTES?.SUPER_ADMIN?.BILLING?.GET_ONE}/${id}`);
    return await this.AXIOS.post(URL, payload);
  }

  async updateBillingDtl(id: string, payload: Record<string, any>) {
    const URL = getApiRoute(`${API_ROUTES?.SUPER_ADMIN?.BILLING?.UPDATE}/${id}`);
    return await this.AXIOS.put(URL, payload);
  }
  
  async getAllBillingDetailsList(payload: Record<string, any>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.BILLING?.NEW_LIST);
    return await this.AXIOS.post(URL, payload);
  }
  
}

export default new BillingService();

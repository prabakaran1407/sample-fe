/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class CollectionService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getAll(payload:any) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.COLLECTIONS?.LIST}`);
    return await this.AXIOS.post(URL,payload);
  }

  async createBills(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.OUTSTANDING?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }
  async getAllOutstanding(payload:any) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.OUTSTANDING?.LIST}?limit=${payload?.limit}&skip=${payload?.skip}&organization_id=${payload?.organization_id}&customer_name=${payload?.customer_name}&status=true`);
    return await this.AXIOS.get(URL);
  }

async getCustomers(payload?:any) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.OUTSTANDING?.CUSTOMER_LIST}?organization_id=${payload?.organization_id}`);
    return await this.AXIOS.get(URL);
  }
  async getHistoryList(payload?:any) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.OUTSTANDING?.HISTORY_LIST}?limit=${payload?.limit}&skip=${payload?.skip}&organization_id=${payload?.organization_id}&customer_name=${payload?.customer_name}&bill_no=${payload?.bill_no}`);
    return await this.AXIOS.get(URL);
  }

}

export default new CollectionService();

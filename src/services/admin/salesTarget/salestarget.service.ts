/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../../data/ApiRoutes';

class SalesTargetService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async createNewTarget(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SALES_TARGET?.CREATE_NEW_TARGET);
    return await this.AXIOS.post(URL, payload);
  }

  async getAllTargets(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SALES_TARGET?.LIST_ALL_TARGETS);
    return await this.AXIOS.post(URL, payload);
  }

  async getOneTarget(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SALES_TARGET?.GET_ONE_TARGET);
    return await this.AXIOS.post(URL, payload);
  }

  async updateTarget(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SALES_TARGET?.UPDATE_TARGET);
    return await this.AXIOS.put(`${URL}`, payload);
  }
  async updateRecurring(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SALES_TARGET?.UPDATE_RECURRING);
    return await this.AXIOS.put(`${URL}`, payload);
  }
}

export default new SalesTargetService();

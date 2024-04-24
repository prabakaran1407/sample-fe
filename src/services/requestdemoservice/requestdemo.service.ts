/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import AxiosService from '../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class RequestDemoService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  async postUserData(payload: any) {
    const URL = getApiRoute(API_ROUTES?.REQUEST_DEMO?.CREATE);
    return await AxiosService.POST(URL, payload);
  }

  async getIndustryType() {
    const URL = getApiRoute(API_ROUTES?.REQUEST_DEMO?.GET_INDUSTRY);
    // No Auth
    return await AxiosService.GET(URL);
  }

  async getAllCountries() {
    const URL = getApiRoute(API_ROUTES?.REQUEST_DEMO?.GET_ALL_COUNTRIES);
    // No Auth
    return await AxiosService.GET(URL);
  }
}

export default new RequestDemoService();

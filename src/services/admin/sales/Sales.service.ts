/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ROUTES, getApiRoute } from '../../../data/ApiRoutes';
import axiosServices from '../../../libs/axios.services';

class AdminSalesManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = axiosServices.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************

  async getAllSalesData(payload: Record<string, unknown>) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.SALES?.GET_ALL_SALES_DATA);
    URL += `?isCount=true`;
    console.log('URL', URL);
    return await this.AXIOS.post(URL, payload);
  }
  async approveSale(id: any, payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.SALES?.APPROVED_SALES}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }
  async salesForecasting(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.SALES?.SALES_FORECAST
    );
    return await this.AXIOS.post(URL, payload);
  }
  async defaultApi(url: string) {
    const URL = getApiRoute(
      url
    );
    return await this.AXIOS.get(URL);
  } 
  async salesForecastingV2(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.SALES?.SALES_FORECAST_V2
    );
    return await this.AXIOS.post(URL, payload);
  }
}

export default new AdminSalesManagementService();

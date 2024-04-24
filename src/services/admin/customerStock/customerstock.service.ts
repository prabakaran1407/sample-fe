/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class CustomerStockService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************

  async getAllCustomerStocks(payload: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.CUSTOMER_STOCKS?.LIST_ALL_CUSTOMER_STOCKS
    );
    return await this.AXIOS.post(URL, payload);
  }

  async getOneCustomerStock(id: any, payload: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.CUSTOMER_STOCKS?.GET_ONE_CUSTOMER_STOCK
    );
    return await this.AXIOS.post(`${URL}/${id}`, payload);
  }
}

export default new CustomerStockService();

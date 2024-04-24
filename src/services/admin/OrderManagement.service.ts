/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class OrderManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN ORDER MANAGEMENT |***********************

  async getAll(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.GETALL_ORDERS}?limit=${payload?.limit}&skip=${payload?.skip}&orderNo=${payload?.orderNo}&organization_id=${payload?.organization_id}&fromDate=${payload?.fromDate}&toDate=${payload?.toDate}&status=${payload?.status}&type=${payload?.type}`
    );
    return await this.AXIOS.post(URL);
  }

  async getAllOrderID(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.GET_ORDER_NUMBERS}?organization_id=${payload?.organization_id}&type=${payload?.type}&user=${payload?.user}&customer=${payload?.customer}`
    );
    return await this.AXIOS.get(URL);
  }

  async updateOrder(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.UPDATE_ORDER}`
    );
    return await this.AXIOS.put(URL, payload);
  }

  async getOrderCount(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.ORDER_MANAGEMENT?.ORDER_COUNT}?organization_id=${payload?.organization_id}&type=${payload?.type}`
    );
    return await this.AXIOS.get(URL);
  }
}

export default new OrderManagementService();

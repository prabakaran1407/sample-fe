/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class AdminTaskManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN Task Management |***********************

  async createUser(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.TASK_MANAGEMENT?.LIST);
    return await this.AXIOS.post(URL, payload);
  }
  async getAll(payload?: Record<string, unknown>) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.TASK_MANAGEMENT?.LISTALL}`);
    return await this.AXIOS.post(URL, payload);
  }
  async createTask(payload?: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.TASK_MANAGEMENT?.LIST);
    return await this.AXIOS.post(URL, payload);
  }

  async updateTask(id: any, payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.ADMIN?.TASK_MANAGEMENT?.LIST}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }
  async getTasks(payload?: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.SETTING?.TASKMANAGEMENT?.LIST
    );
    return await this.AXIOS.post(URL, payload);
  }
  async getStatus(payload?: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.STATUS?.LIST);
    return await this.AXIOS.get(URL, payload);
  }
  async getPriority(payload?: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.PRIORITY?.LIST);
    return await this.AXIOS.get(URL, payload);
  }
}

export default new AdminTaskManagementService();

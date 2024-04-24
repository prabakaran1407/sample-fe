/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class GroupSettingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| GROUP SETTING |***********************
  async createGroup(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.GROUP?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }
  async getAll(payload?: { organization_id: any }) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.GROUP?.LIST);
    console.log('API URL:', URL);
    return await this.AXIOS.get(URL, { params: payload });
  }
  async updateGroup(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.GROUP?.UPDATE);
    return await this.AXIOS.put(`${URL}/${payload.id}`, payload?.updatedData);
  }
  async updateGroupStatus(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.GROUP?.UPDATE_STATUS);
    return await this.AXIOS.put(`${URL}/${payload.id}`, payload?.updatedData);
  }
}
export default new GroupSettingService();

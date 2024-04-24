/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class AdminUserManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async getDepartment(query: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.DEPARTMENT);
    URL += query;
    return await this.AXIOS.get(URL);
  }
  async getDesignation(): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.DESIGNATION);
    URL += `?status=true`;
    return await this.AXIOS.get(URL);
  }
  async getCategory(query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.CATEGORY);
    URL += `?status=true`;
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }
  async createUser(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async getAll(payload?: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.LIST);
    return await this.AXIOS.post(URL, payload);
  }

  async getOneUser(userId: string) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.GET_ONE);
    if (userId) URL += `/${userId}`;
    return await this.AXIOS.get(URL);
  }
  async listUserById( userId?: string) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.GET_ID);
    if (userId) URL += `/${userId}`;
    return this.AXIOS.get(URL);
  }


  async updateUser(userId: string, payload: Record<string, unknown>) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.UPDATE);
    if (userId) URL += `/${userId}`;
    return await this.AXIOS.put(URL, payload);
  }

  async getRoles() {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.USERMANAGEMENT?.ROLES);
    return await this.AXIOS.get(URL);
  }

  async deactivate(id: string, payload: Record<string, unknown>) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.USERMANAGEMENT?.DELETE}/${id}`);
    return await this.AXIOS.put(URL, payload);
  }

  async getOneUserForLogin(payload: any, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.AUTH?.GET_USER}`);
    if(query) URL = `${URL}${query}`
    return await AxiosService.POST(URL, payload);
  }

  
  // ******************** shop service ****************
  async getAssignedServiceForUser(payload: any, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.ADMIN?.USERMANAGEMENT?.ASSIGNE_SERVICE}`);
    if(query) URL = `${URL}${query}`
    return this.AXIOS.post(URL, payload);
  }
}

export default new AdminUserManagementService();

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class ModulesService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| SUPER-ADMIN  |***********************
  async getAll() {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN.MODULES_SERVICES.LIST);
    return await this.AXIOS.get(URL);
  }

  async createParent(payload: Record<string, any>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.CREATE_PARENT_MODULE)
    return await this.AXIOS.post(URL, payload)
  }

  async createChild(payload: Record<string, any>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.CREATE_CHILD_MODULE)
    return await this.AXIOS.post(URL, payload)
  }

  async getModules(payload: Record<string, any>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.GET_MODULES)
    return await this.AXIOS.post(URL, payload)
  }
  async updateParent(id: string, payload: Record<string, any>) {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.UPDATE_PARENT_MODULE)
    if(id) URL += `/${id}`
    return await this.AXIOS.put(URL, payload)
  }
  async updateChild(id: string, payload: Record<string, any>) {
    let URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.UPDATE_CHILD_MODULE)
    if(id) URL += `/${id}`
    return await this.AXIOS.put(URL, payload)
  }

  async deactivateModule(id: string, payload?: Record<string, any>){
    let URL = getApiRoute(`${API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.DELETE}/${id}`)
    return await this.AXIOS.put(URL, payload)
  }
  async activateModule(id: string, payload?: Record<string, any>){
    let URL = getApiRoute(`${API_ROUTES?.SUPER_ADMIN?.MODULES_SERVICES?.DELETE}/${id}`)
    return await this.AXIOS.put(URL, payload)
  }
  
  
}

export default new ModulesService();

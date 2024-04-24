/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';
import { Ipayload } from '../../types/global.types';

class VisitSettingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async create(payload: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.VISIT?.CREATE);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }
  async update(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.VISIT?.UPDATE}/${id}`);
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }
  async list(payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.VISIT?.LIST}`);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  // ******** visit list
  async visitManagementList(payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.VISIT?.VISIT_MNG_LIST}`);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }
  async activedeactive(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.VISIT?.DELETE}/${id}`);
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }

  
  
}

export default new VisitSettingService();

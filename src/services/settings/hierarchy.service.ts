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

class HierarchyService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async createDesignationMapping(payload: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.HIERARCHY?.DESG_MAPPING_CREATE);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  async updateDesignationMapping(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.HIERARCHY?.DESG_MAPPING_UPDATE}/${id}`);
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }

  async findDesignationMapping(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.HIERARCHY?.DESG_MAPPING_FIND}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }
  async designationMappedUsers(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.HIERARCHY?.DESG_MAPPED_USERS}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }
  async assignUser(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.HIERARCHY?.ASSIGN_USER}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }
  async unAssignUser(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.HIERARCHY?.UNASSIGN_USER}`);
    if (query) URL += query;    
    return this.AXIOS.put(URL, payload);
  }
  
}

export default new HierarchyService();

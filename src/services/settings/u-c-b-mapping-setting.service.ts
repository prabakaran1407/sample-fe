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

class UCBMappingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
//   
  async listAssignUnAssignUser(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.LIST_FOR_USER}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }
  async createAssignUnAssignUserMapping(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.CREATE_USER_MAPPING}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }
  async updateAssignUnAssignUserMapping(payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.UPDATE_USER_MAPPING}`);
    if (query) URL += query;    
    return this.AXIOS.put(URL, payload);
  }

  async listAssignUnAssignCustomer(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.LIST_FOR_CUSTOMER}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }

  async createAssignUnAssignCustomerMapping(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.CREATE_CUSTOMER_MAPPING}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }

  async listAssignUnAssignBillingParty(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.LIST_FOR_BILLINGPARTY}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }

  async createAssignUnAssignBillingPartyMapping(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.CREATE_BILLINGPARTY_MAPPING}`);
    if (query) URL += query;    
    return this.AXIOS.post(URL, payload);
  }

  async updateAssignUnAssignCustomerMapping(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.UPDATE_CUSTOMER_MAPPING}`);
    if (query) URL += query;    
    return this.AXIOS.put(URL, payload);
  }
  async updateAssignUnAssignBillingPartyMapping(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.MAPPINGS?.UPDATE_BILLINGPARTY_MAPPING}`);
    if (query) URL += query;    
    return this.AXIOS.put(URL, payload);
  }
  
}

export default new UCBMappingService();

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class AdminLeadManagementService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN Lead Management |***********************

  async createLead(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.LEAD_MANAGEMENT?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async zipCode(zipcode: any,countryCode:any ) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.LEAD_MANAGEMENT?.ZIPCODE);
    return await this.AXIOS.get(`${URL}?zipCode=${zipcode}&countryCode=${countryCode}`);
  }
  async countryCode(countryCode: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.LEAD_MANAGEMENT?.COUNTRY);
    return await this.AXIOS.post(URL, countryCode);
  }
  async updateLead(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.LEAD_MANAGEMENT?.UPDATE);
    return await this.AXIOS.put(`${URL}/${payload._id}`, payload);
  }

  async getAll(payload?: { organization_id: any }) {
    const URL = getApiRoute(`${API_ROUTES?.ADMIN?.LEAD_MANAGEMENT?.LIST}`);
    return await this.AXIOS.post(URL, payload );
  }
  
  async getLeads() {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADTYPE?.LIST);
    return await this.AXIOS.get(URL);
  }
  async getStatus(payload?:any) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSTATUS?.LIST}/${payload.organization_id}`);
    return this.AXIOS.get(URL,payload);
  }
  async getPriority(payload?:any) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADPRIORITY?.LIST}/${payload.organization_id}`);
    return this.AXIOS.get(URL,payload);
  }
  async getSource(payload?:any) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSOURCE?.LIST}/${payload.organization_id}`);
    return this.AXIOS.get(URL,payload);
  }

}

export default new AdminLeadManagementService();

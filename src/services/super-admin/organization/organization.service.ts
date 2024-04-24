/** @format */

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosServices from '../../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../../data/ApiRoutes';

class OrganizationService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = axiosServices.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async getAllOrganizations(payload: any): Promise<any> {
    const URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GET_ALL_ORGANIZATIONS
    );

    return await this.AXIOS.post(URL, payload);
  }

  async createOrganization(payload: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.CREATE_ORGANIZATION
    );
    return await this.AXIOS.post(URL, payload);
  }

  async updateOrganization(orgId: string, payload: Record<string, unknown>) {
    let URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.UPDATE_ORGANIZATION
    );
    if (orgId) URL += `/${orgId}`;
    return await this.AXIOS.put(URL, payload);
  }

  async getOneOrganization(orgId: string) {
    let URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GET_ONE_ORGANIZATION
    );
    if (orgId) URL += `/${orgId}`;
    return await this.AXIOS.get(URL);
  }

  async deactivateOrganization(id: string, payload?: Record<string, any>) {
    let URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.DELETE_ORGANIZATION}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }
  async activateOrganization(id: string, payload?: Record<string, any>) {
    let URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.DELETE_ORGANIZATION}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }

  async getAllOrganizationsForDropDown() {
    let URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GET_ALL_ORGANIZATION_FOR_DROPDOWN
    );
    return await this.AXIOS.get(URL);
  }

  async createOrUpdateOrgSettings(id: string, payload: Record<string, any>){
    let URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.ORG_SETTING}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }

  async getOneOrgSetting(id: string, query?: string){
    let URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GET_ONE_ORG_SETTING}/${id}`
    );
    if(query) URL += query
    return await this.AXIOS.get(URL);
  }
}

export default new OrganizationService();

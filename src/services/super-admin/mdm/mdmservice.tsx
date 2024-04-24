/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../../libs/axios.services';
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from '../../../data/ApiRoutes';

class MdmService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getAll() {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN.MDM.ENTERPRESIS.LIST);
    return await this.AXIOS.get(URL);
  }
  async createEnter(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.MDM?.ENTERPRESIS?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async createMapping(payload: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.UPDATE_ORGANIZATION
    );
    return await this.AXIOS.post(URL, payload);
  }
  async getAllOrg(): Promise<any> {
    const URL = getApiRoute(
      API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GET_ALL_ORGANIZATIONS
    );

    return await this.AXIOS.post(URL);
  }
}
export default new MdmService();

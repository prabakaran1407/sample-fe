
/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class GeneralService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async accessModel(collection: string, payload: Record<string, any>, query?: string): Promise<any> {
    let URL = getApiRoute(`${API_ROUTES?.DIREDCT?.MODEL}/${collection}`);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }

  
}

export default new GeneralService();


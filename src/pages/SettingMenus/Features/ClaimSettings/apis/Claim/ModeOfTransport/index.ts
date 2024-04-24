/** @format */

import { API_ROUTES, getApiRoute } from "../../../../../../../data/ApiRoutes";
import AxiosService from "../../../../../../../libs/axios.services";

class ModeOfTransportService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  async createModeOfTransport(payload: any) {
    console.log("-----working----------");
    const URL = getApiRoute(API_ROUTES?.ADMIN?.MODE_OF_TRANSPORT.CREATE);
    return await this.AXIOS.post(URL, payload);
  }
  async getAllTransport(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.MODE_OF_TRANSPORT.NEW_LIST);
    console.log("------------->", status);
    // return await this.AXIOS.get(`${URL}?status=${status}&organization_id=${organization_id}`);
    return await this.AXIOS.post(URL, payload);
  }
  async getTransport(status: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.MODE_OF_TRANSPORT?.GETALL);
    return await this.AXIOS.get(URL, status);
  }
  async updateModeOfTransport(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.MODE_OF_TRANSPORT?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }
  async getOneTransport(id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.MODE_OF_TRANSPORT?.GETONE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.get(URL, id);
  }
}
export default new ModeOfTransportService();

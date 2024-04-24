/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class TripplanService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async create(payload: any, query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.TRIPPLAN?.CREATE);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }
  async update(payload: any, id: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.TRIPPLAN?.UPDATE);
    if (id) URL += id;
    return await this.AXIOS.put(URL, payload);
  }
  async userMappeGroupWiseData(payload: any, query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.TRIPPLAN?.USERS_GRP);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }
  async getAllTrips(payload: any, query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.TRIPPLAN?.LIST);
    if (query) URL += query;
    return await this.AXIOS.post(URL, payload);
  }
  async getTripplanById(payload: any, id: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.TRIPPLAN?.GET_BY_ID);
    if (id) URL += id;
    return await this.AXIOS.post(URL, payload);
  }
}

export default new TripplanService();

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../../libs/axios.services';
import { getApiRoute } from '../../../data/ApiRoutes';
import { MAP_URL, API_BASE_URL } from '../../../config';

class TrackingDetails {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async getDistance(data: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_BASE_URL}/visits/getdistance?user=${data.id}&startTime=${data.startTime}&endTime=${data.endTime}`
    );
    return await this.AXIOS.get(URL);
  }

  async getLocationList(query?: string) {
    let URL = getApiRoute(MAP_URL, query);
    return await AxiosService.GET(URL);
  }
}

export default new TrackingDetails();

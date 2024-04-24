/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class AttendanceReports {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getColumns() {
    const URL: any = getApiRoute(
      `${API_ROUTES?.ADMIN?.REPORTS?.ATTENDACNE_COLUMNS}`
    );
    return await this.AXIOS.GET(URL);
  }
}

export default new AttendanceReports();

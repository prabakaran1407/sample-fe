/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class DashboardDetails {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getOverallCount(query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.DASHBOARD?.OVERALL_COUNT?.GET);
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }

  async getAttendanceSummary(query?: string): Promise<any> {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.DASHBOARD?.ATTENDANCE_SUMMARY?.GET
    );
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }

  async getSalesStats(payload: Record<string, unknown>) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.DASHBOARD?.SALES_STATS?.POST);
    return await this.AXIOS.post(URL, payload);
  }

  async getOverviewData(query?: string): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.DASHBOARD?.OVERVIEW?.GET);
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }
}

export default new DashboardDetails();

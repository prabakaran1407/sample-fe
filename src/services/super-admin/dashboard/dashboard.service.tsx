/**
 * eslint-disable @typescript-eslint/no-explicit-any
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class DashboardService {
  AXIOS!: any;

  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getAllCounts() {
    const URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.DASHBOARD?.COUNTS?.LIST}`
    );
    return await this.AXIOS.get(URL);
  }

  async getAllWeeks(currentYear: string, currentMonth: string) {
    const URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.DASHBOARD?.WEEKLY}?month=${currentMonth}&year=${currentYear}`
    );

    return await this.AXIOS.get(URL);
  }
  async getAllYears(currentYear: string) {
    const URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.DASHBOARD?.YEAR}?year=${currentYear}`
    );

    return await this.AXIOS.get(URL);
  }

  async getDues() {
    const URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.DASHBOARD?.DUE}`
    );
    return await this.AXIOS.get(URL);
  }
}

export default new DashboardService();

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class AttendanceManagementservice {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getAttendanceManagementlist(payload?: any): Promise<any> {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.LIST);
    return await this.AXIOS.post(URL, payload);
  }
  async getAttendanceCount(query?: string): Promise<any> {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.ATTENDANCE_COUNT
    );
    if (query) URL += query;
    return await this.AXIOS.get(URL);
  }
  async getAttendanceByDate(payload?: any): Promise<any> {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.GET_ATTENDANCE
    );
    return await this.AXIOS.post(URL, payload);
  }
  async getLateAttendance(payload?: any): Promise<any> {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.LATE_ATTENDANCE
    );
    return await this.AXIOS.post(URL, payload);
  }
  async getAbsentUsers(payload?: any): Promise<any> {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.ATTENDANCE_MANAGEMENT?.ABSENTUSERS
    );
    return await this.AXIOS.post(URL, payload);
  }
}

export default new AttendanceManagementservice();

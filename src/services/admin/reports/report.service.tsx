/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../../data/ApiRoutes";

class ReportService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  // attendance
  async getColumnsAttendance(query: string) {
    try {
      let URL = getApiRoute(
        `${API_ROUTES?.ADMIN?.REPORTS?.ATTENDACNE_COLUMNS?.COLUMNLIST}`
      );
      if (query) URL = `${URL}${query}`;
      const response = await this.AXIOS.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching column data: " + error);
    }
  }

  async DownloadAttendance(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADATTENDANCE);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }
  // attendance ends

  // claims
  async getColumnsClaims(query: string) {
    try {
      let URL = getApiRoute(
        `${API_ROUTES?.ADMIN?.REPORTS?.CLAIMS_COLUMNS?.COLUMNLIST}`
      );
      if (query) URL = `${URL}${query}`;
      const response = await this.AXIOS.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching column data: " + error);
    }
  }

  async getClaimtype(getPayload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.CLAIMTYPE?.LIST);
    return await this.AXIOS.post(URL, getPayload);
  }

  async getTrantype(getPayload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.TRANSTYPE?.LIST);
    return await this.AXIOS.post(URL, getPayload);
  }

  async DownloadClaims(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADCLAIMS);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }
  // claim ends

  // task

  async getColumnsTasks(query: string) {
    try {
      let URL = getApiRoute(
        `${API_ROUTES?.ADMIN?.REPORTS?.TASK_COLUMNS?.COLUMNLIST}`
      );
      if (query) URL = `${URL}${query}`;
      const response = await this.AXIOS.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching column data: " + error);
    }
  }

  async getTasktype(getPayload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.TASKTYPE?.LIST);
    return await this.AXIOS.post(URL, getPayload);
  }

  async getStatustype(getPayload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.STATUSTYPE?.LIST);
    return await this.AXIOS.post(URL, getPayload);
  }

  async DownloadTasks(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADTASK);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  // Collection
  async getColumnsCollection(query: string) {
    try {
      let URL = getApiRoute(
        `${API_ROUTES?.ADMIN?.REPORTS?.COLLECTION_COLUMNS?.COLUMNLIST}`
      );
      if (query) URL = `${URL}${query}`;
      const response = await this.AXIOS.get(URL);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching column data: " + error);
    }
  }

  async DownloadCollections(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADCOLLECTIONS);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  async getAllGroup(payload?: { organization_id: any }) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.GROUP?.LIST);
    console.log("API URL:", URL);
    return await this.AXIOS.get(URL, { params: payload });
  }

  async DownloadVisit(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADVISIT);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  // sales
  async salesReport(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.SALES?.SALES);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  // lead
  async DownloadLead(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADLEAD);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  //geo-fencing
  async DownloadGeoFencing(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADGEOFENCING);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  //geo-fencing
  async DownloadUserTracking(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADUSERTRACKING);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }

  // leave
  async DownloadLeave(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.REPORTS?.DOWNLOADLEAVE);
    return await this.AXIOS.post(URL, payload, {
      responseType: "arraybuffer",
      headers: { "Content-Type": "blob" },
    });
  }
}

export default new ReportService();

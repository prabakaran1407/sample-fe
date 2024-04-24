/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
// import { Ipayload } from "../../types/global.types";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";
import { Ipayload } from "../../types/global.types";

class SettingsService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async list(payload: Ipayload, query?: string) {
    /** @querystring setting_sub_type, isCount */
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.LIST);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }
  async create(payload: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.CREATE);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }
  async update(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.UPDATE}/${id}`);
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }

  async updateIsActive(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(`${API_ROUTES?.SETTINGS?.UPDATEACTIVE}/${id}`);
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }
  async postAttendanceSettingsData(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.ATTENDANCE_SETTINGS?.CREATE);
    return await AxiosService.POST(URL, payload);
  }
  async listAttendanceTypes(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.LIST);
    return this.AXIOS.post(URL, payload);
  }

  // Task Types
  async listTaskTypes(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.TASKMANAGEMENT?.LIST);
    return this.AXIOS.post(URL, payload);
  }
  async createTaskTypes(payload: Ipayload) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.SETTING?.TASKMANAGEMENT?.CREATE
    );
    return this.AXIOS.post(URL, payload);
  }

  async editTaskTypes(payload: any) {
    try {
      const { id, ...restPayload } = payload;
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS.SETTING.TASKMANAGEMENT.UPDATE}/${id}`
      );
      const response = await this.AXIOS.put(URL, restPayload);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing task type:", error);
      throw error;
    }
  }
  // status types
  async listStatus(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.STATUS?.LIST);
    return this.AXIOS.post(URL, payload);
  }
  async createStatusTypes(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.STATUS?.CREATE);
    return this.AXIOS.post(URL, payload);
  }
  async editStatusTypes(payload: any) {
    try {
      const { id, ...restPayload } = payload;
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS.SETTING.STATUS.UPDATE}/${id}`
      );
      const response = await this.AXIOS.put(URL, restPayload);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing task type:", error);
      throw error;
    }
  }

  // priority types
  async listPriority(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.PRIORITY?.LIST);
    return this.AXIOS.post(URL, payload);
  }
  async createPriorityTypes(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.PRIORITY?.CREATE);
    return this.AXIOS.post(URL, payload);
  }
  async editPriorityTypes(payload: any) {
    try {
      const { id, ...restPayload } = payload;
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS.SETTING.PRIORITY.UPDATE}/${id}`
      );
      const response = await this.AXIOS.put(URL, restPayload);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing task type:", error);
      throw error;
    }
  }

  // lead management

  // lead type
  async listLeadTypes() {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADTYPE?.LIST
    );
    return this.AXIOS.get(URL);
  }
  async createLeadTypes(payload: Ipayload) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADTYPE?.CREATE
    );
    return this.AXIOS.post(URL, payload);
  }

  async editLeadTypes(payload: any) {
    try {
      const { id, ...restPayload } = payload;
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS.FEATURES?.LEADMANAGEMENT?.LEADTYPE?.UPDATE}/${id}`
      );
      const response = await this.AXIOS.put(URL, restPayload);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing task type:", error);
      throw error;
    }
  }

  //status
  async listLeadStatus(payload: any) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSTATUS?.LIST}/${payload.organization_id}`
    );
    return this.AXIOS.get(URL, payload);
  }
  async createLeadStatusTypes(payload: Ipayload) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSTATUS?.CREATE
    );
    return this.AXIOS.post(URL, payload);
  }
  async editLeadStatusTypes(statusTypeData: any) {
    try {
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSTATUS?.UPDATE}/${statusTypeData?.id}`
      );
      const response = await this.AXIOS.put(URL, statusTypeData);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing task type:", error);
      throw error;
    }
  }

  //priority

  async listLeadPriority(payload: any) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADPRIORITY?.LIST}/${payload.organization_id}`
    );
    return this.AXIOS.get(URL, payload);
  }
  async createLeadPriorityTypes(payload: Ipayload) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADPRIORITY?.CREATE
    );
    return this.AXIOS.post(URL, payload);
  }
  async editLeadPriorityTypes(payload: any) {
    try {
      const { id, ...restPayload } = payload;
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADPRIORITY?.UPDATE}/${id}`
      );
      const response = await this.AXIOS.put(URL, restPayload);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing task type:", error);
      throw error;
    }
  }

  // source
  async listLeadSource(payload: any) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSOURCE?.LIST}/${payload.organization_id}`
    );
    return this.AXIOS.get(URL, payload);
  }
  async createLeadSourceTypes(payload: Ipayload) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSOURCE?.CREATE
    );
    return this.AXIOS.post(URL, payload);
  }
  async editLeadSourceTypes(payload: any) {
    try {
      const { id, ...restPayload } = payload;
      const URL = getApiRoute(
        `${API_ROUTES.SETTINGS?.FEATURES?.LEADMANAGEMENT?.LEADSOURCE?.UPDATE}/${id}`
      );
      const response = await this.AXIOS.put(URL, restPayload);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing source type:", error);
      throw error;
    }
  }
  // ****************** Product setting section *******************

  async productSettingList(payload: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.LIST);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  async productSettingCreate(payload: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.CREATE);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  async productSettingUpdate(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.UPDATE}/${id}`
    );
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }
  async productSettingDelete(id: string, payload: Ipayload, query?: string) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.DELETE}/${id}`
    );
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }

  async productSettingsBulkUpload(payload: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.BULKUPLOAD);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  async productSettingsTemplate(payload?: Ipayload, query?: string) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.TEMPLATE);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  async productSettingCreateWithFormData(payload: Ipayload, query?: string) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.FORM_DATA_CREATE
    );
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }
  async productSettingUpdateWithFormData(
    _id: string,
    payload: Ipayload,
    query?: string
  ) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.FORM_DATA_UPDATE
    );
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  async productsSettingActiveDeactive(
    _id: string,
    payload: Ipayload,
    query?: string
  ) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.PRODUCT?.ACTIVE_DEACTIVE}/${_id}`
    );
    if (query) URL += query;
    return this.AXIOS.put(URL, payload);
  }

  // Order Settings Services

  async listAllOrderSetting(payload: Ipayload, query?: string) {
    /** @querystring setting_sub_type, isCount */
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.ORDER_SETTINGS?.LIST);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }
  async createOrderSetting(payload: Ipayload) {
    let URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.ORDER_SETTINGS?.CREATE
    );
    return this.AXIOS.post(URL, payload);
  }
  async updateOrderSetting(id: string, payload: Ipayload) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.ORDER_SETTINGS?.UPDATE}/${id}`
    );
    return this.AXIOS.put(URL, payload);
  }
  async activateOrderSetting(id: string, payload: Ipayload) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.ORDER_SETTINGS?.STATUS}/${id}`
    );
    return this.AXIOS.put(URL, payload);
  }

  // *********************| Logistics |*************************** //
  async listLogistics(payload: Ipayload, query?: string) {
    /** @querystring setting_sub_type, isCount */
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.LOGISTICS?.LIST);
    if (query) URL += query;
    return this.AXIOS.post(URL, payload);
  }

  async createLogistics(payload: Ipayload) {
    let URL = getApiRoute(API_ROUTES?.SETTINGS?.SETTING?.LOGISTICS?.CREATE);
    return this.AXIOS.post(URL, payload);
  }

  async updateLogistics(id: string, payload: Ipayload) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.SETTING?.LOGISTICS?.UPDATE}/${id}`
    );
    return this.AXIOS.post(URL, payload);
  }
  async updateIsActiveLogistics(id: string, payload: Ipayload) {
    let URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.SETTING?.LOGISTICS?.UPDATEACTIVE}/${id}`
    );
    return this.AXIOS.post(URL, payload);
  }
}

export default new SettingsService();

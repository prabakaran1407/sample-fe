/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';

class CustomerSettingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| CUSTOMER SETTING |***********************
  async createCustomer(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.CUSTOMER?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }
  async getAll(payload?: { organization_id: any }) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.CUSTOMER?.LIST);
    return await this.AXIOS.get(URL, { params: payload });
  }
  async getAllCustomersByOrganization(organization_id: any) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.CUSTOMER
        ?.GET_ALL_CUSTOMERS_BY_ORGANIZATION
    );
    return await this.AXIOS.get(`${URL}?organization_id=${organization_id}`);
  }
  async getCustomerByGroup(payload?: { organization_id: any; groupId: any }) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.CUSTOMER?.GET_BY_GROUP
    );
    return await this.AXIOS.post(URL, payload);
  }
  async updateCustomer(payload: Record<string, unknown>) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.CUSTOMER?.UPDATE);
    return await this.AXIOS.put(`${URL}/${payload.id}`, payload?.updatedData);
  }
  //********************| Billing Party |***************************
  async createBillingParty(payload: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.CREATE
    );
    return await this.AXIOS.post(URL, payload);
  }
  async getAllBillingParty(payload?: { organization_id: any }) {
    const URL = getApiRoute(API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.LIST);
    console.log('API URL:', URL);
    return await this.AXIOS.get(URL, { params: payload });
  }
  async updateBillingParty(payload: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.UPDATE
    );
    return await this.AXIOS.put(`${URL}/${payload.id}`, payload?.updatedData);
  }
  async getBillingPartyByCustomer(payload?: {
    organization_id: any;
    customerId: any;
  }) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.GET_BY_CUSTOMER
    );
    return await this.AXIOS.post(URL, payload);
  }
  async getBillingBulkuploadTemp() {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.BULK_UPLOAD_TEMPLATE
    );
    return await this.AXIOS.get(URL);
  }
  async bulkUploadBilling(payload: any) {
    const URL = getApiRoute(
      API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.BILLING_BULK_UPLOAD
    );
    return await this.AXIOS.post(URL, payload);
  }
  async customerActiveDeactive(id: string, payload: any) {
    const URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.CUSTOMER?.ACTIVE_DEACTIVE}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }
  async billingPartyActiveDeactive(id: string, payload: any) {
    const URL = getApiRoute(
      `${API_ROUTES?.SETTINGS?.FEATURES?.BILLINGPARTY?.ACTIVE_DEACTIVE}/${id}`
    );
    return await this.AXIOS.put(URL, payload);
  }
}
export default new CustomerSettingService();

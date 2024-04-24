import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";

class InventoryrSettingService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async createStore(payload: Record<string, unknown>) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.CREATE_STORE
    );
    return await this.AXIOS.post(URL, payload);
  }

  async getAll(payload?: {
    organization_id: any;
    status?: boolean;
    _id?: string;
  }) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.GET_ALL_STORES
    );
    return await this.AXIOS.post(URL, payload);
  }

  async updateStore({
    id,
    payload,
  }: {
    id: string;
    payload: Record<string, unknown>;
  }) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.UPDATE_STORE
    );
    console.log("URL", `${URL}/${id}`);
    return await this.AXIOS.put(`${URL}/${id}`, payload);
  }

  async activatedeactivateStore({
    id,
    payload,
  }: {
    id: string;
    payload: Record<string, unknown>;
  }) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.ACTIVATE_DEACTIVATE_STORE
    );
    console.log("URL", `${URL}/${id}`);
    return await this.AXIOS.put(`${URL}/${id}`, payload);
  }

  async createWarehouse(payload: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.CREATE_WAREHOUSE
    );
    console.log("URL", URL);
    return await this.AXIOS.post(URL, payload);
  }

  async getAllWarehouse(payload: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.GET_ALL_WAREHOUSE
    );
    console.log("URL", URL);
    return await this.AXIOS.post(`${URL}?isCount=true`, payload);
  }

  async updateWarehouse(payload: any, id: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.INVENTORY_MANAGEMENT?.UPDATE_WAREHOUSE
    );
    console.log("URL", URL);
    return await this.AXIOS.put(`${URL}/${id}`, payload);
  }
}
export default new InventoryrSettingService();

/** @format */

import { API_ROUTES, getApiRoute } from "../../../../../../../data/ApiRoutes";
import AxiosService from "../../../../../../../libs/axios.services";

class SplitSubCategoryService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async requestClaimSubCategoryDataModel(id: String) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY
        ?.REQUEST_CLAIM_SPLITCUBCATEGORY_DATAMODEL
    );
    console.log("------------->");
    return await this.AXIOS.get(
      `${URL}?&status=true&isSubCategory=true&type=FRESH&parent=${id}`
    );
  }

  async requestClaimSplitSubCategoryData(status: Boolean) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY?.REQUEST_CLAIM_SPLITSUBCATEGORY_DATA
    );
    console.log("------------->", status);
    return await this.AXIOS.get(
      `${URL}?&status=${status}&isSubCategory=true&isSubSplitCategory=true`
    );
  }

  async requestClaimSplitSubCategoryDataTravel(
    status: Boolean,
    organization_id: any
  ) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY
        ?.REQUEST_CLAIM_SPLITSUBCATEGORY_DATATRAVEL
    );
    console.log("------------->", status);
    return await this.AXIOS.get(
      `${URL}?&status=${status}&organization_id=${organization_id}`
    );
  }
  async requestClaimTravelSplitSubCategoryData(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.SPLIT_SUB_CATEGORY?.NEW_LIST);
    return await this.AXIOS.post(URL, payload);
  }
}
export default new SplitSubCategoryService();

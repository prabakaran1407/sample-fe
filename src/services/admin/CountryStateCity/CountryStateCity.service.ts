/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from '../../../libs/axios.services';
import { API_ROUTES, getApiRoute } from '../../../data/ApiRoutes';
// import { API_BASE_URL } from '../../../config';

class CountryStateCity {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }
  // ******************| ADMIN User Management |***********************
  async getAllCountries() {
    const URL = getApiRoute(API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GETCOUNTRY);
    return await this.AXIOS.get(URL);
  }
  async getAllStatesByCountry(country: Record<string, unknown>) {
    const URL = getApiRoute(
        `${API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GETSTATES}?country=${country}`
    );
    return await this.AXIOS.get(URL);
}

  async getAllCitiesByState(state: Record<string, unknown>) {
    const URL = getApiRoute(
      `${API_ROUTES?.SUPER_ADMIN?.ORGANIZATION?.GETCITIES}?state=${state}`
    );
    return await this.AXIOS.get(URL);
  }
}

export default new CountryStateCity();

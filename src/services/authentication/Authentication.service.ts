/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import AxiosService from "../../libs/axios.services";
import { API_ROUTES, getApiRoute } from "../../data/ApiRoutes";


// import { IUserLogin } from "../../types/sample";
import { AxiosResponse } from "axios";

class AuthenticationService {
  signIn(_values: Record<string, any>): AxiosResponse<any, any> | PromiseLike<AxiosResponse<any, any>> {
    throw new Error("Method not implemented.");
  }
  constructor() {
  }

  async SignIn(payload: Record<string, any>): Promise<AxiosResponse<any>> {
    try {
      const LOGIN_API_URL = getApiRoute(API_ROUTES?.AUTH?.SIGN_IN);

      const response = await AxiosService.PUT(LOGIN_API_URL, payload);
      return response?.data;
    } catch (error) {
      console.error("Error in createLogin:", error);
      throw error;
    }
  }
}
//   async signIn(paylaod: Ipayload, query?: string) {
//     let URL = getApiRoute(API_ROUTES?.AUTH?.SIGN_IN);
//     if (query) {
//       URL += `?${query}`;
//     }
//     return await AxiosService.POST(URL, paylaod);
//   }

//   async signUp(payload: Ipayload, query?: string) {
//     let URL = API_ROUTES?.AUTH?.CREATE;
//     if (query) {
//       URL += `?${query}`;
//     }
//     return await AxiosService.POST(URL, payload);
//   }
// }

export default new AuthenticationService();

/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   STATIC_MODULE_FOR_SUPER_ADMIN,
//   STATIC_MODULE_FOR_ADMIN,
// } from '../data/AppConst';
import LSService from "../libs/localStorage.service";

// ************** service
import AUMService from "../services/admin/UserManagemet.service";
import {
  SUPERADMIN_SIDE_MENU_KEYS,
  DEFAULT_MODULE,
} from "../data/AppModules.tsx";

class RBACService {
  constructor() {
    //
  }

  GET_SIDEBAR_DATA(data: any[], userData: Record<string, any>) {
    console.log("userData >>>>", userData);
    if (userData?.isSuperAdmin) {
      return data?.filter((ft) =>
        SUPERADMIN_SIDE_MENU_KEYS.includes(ft?.module)
      );
    } else {
      // return data?.filter((ft) => STATIC_MODULE_FOR_ADMIN.includes(ft?.title));
      console.log("sidemenu data >>>>>>>>>>>", data);

      return data?.filter(
        (ft) =>
          userData?.services_for_user?.UAS_MODULES?.filter(
            (f: any) =>
              f?.keyName == ft?.module || ft?.module === DEFAULT_MODULE
          )?.length > 0
      );

      // ************* For developer use only
      // return data
    }
  }
  GET_PAGE_COMPONENTS(data: any[], userData: Record<string, any>) {
    if (userData?.isSuperAdmin) {
      return data?.filter(
        (ft) =>
          SUPERADMIN_SIDE_MENU_KEYS.includes(ft?.module) ||
          ft?.module === DEFAULT_MODULE
      );
    } else {
      console.log("sidemenu data >>>>>>>>>>>", data);

      // *********** Actual flow component restriction
      return data?.filter(
        (ft: any) =>
          userData?.services_for_user?.UAS_MODULES?.filter(
            (f: any) =>
              ft?.module === f?.keyName || ft?.module === DEFAULT_MODULE
          )?.length > 0
      );

      // ************* For developer use only
      // return data
    }
  }

  CHECK_LOGIN_TOKEN(key: string = "token") {
    return LSService.getItem(key) ? true : false;
  }

  // Billing based module display
  GET_SETTING_MENUS(data: Record<string, any>, userData: Record<string, any>) {
    let FILTER_APP_BAR_SETTING = {} as any;
    for (let [key, value] of Object.entries(data)) {
      console.log("[key, value]", [key, value]);
      value.menus = value?.menus?.filter(
        (ft: any) =>
          userData?.services_for_user?.UAS_MODULES?.filter(
            (f: any) =>
              ft?.module === f?.keyName || ft?.module === DEFAULT_MODULE
          )?.length > 0
      );
      FILTER_APP_BAR_SETTING[key] = {
        ...value,
        can_access: !userData?.isSuperAdmin && value?.menus?.length > 0,
        menus: value?.menus,
      };
    }
    return FILTER_APP_BAR_SETTING;
  }

  async CHECK_IS_MULTI_LOGIN(payload: any): Promise<any> {
    try {
      payload = {
        ...payload,
        select: ["loginSession", "emailAddress", "organization_id"],
      };
      let response: any = await AUMService.getOneUserForLogin(payload);
      response = response?.data?.response;
      //  console.log('CHECK_IS_MULTI_LOGIN >>>>>>>', response)
      //  console.log('LSService.getItem>>>>>>>', JSON.parse(LSService.getItem('login_session') || '') != response?.loginSession)

      //  ************ Check local storage data for valid session or not
      if (
        JSON.parse(LSService.getItem("login_session") || "") !=
        response?.loginSession
      ) {
        ["userData", "token", "login_session"].forEach((item: string) => {
          LSService.removeItem(item);
        });
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    } catch (error) {
      console.log("ERROR >>>>>", error);
      return Promise.resolve(false);
    }
  }

  //   async GET_REPORTS_DATA(reports: any, userModules: any): Promise<any> {
  //     try {
  //       const result = reports.filter((item1: any) => {
  //         const foundItem = userModules.find((item2: any) => {
  //           const cleanedTitle = item1.title.replace(/\s/g, "_").toUpperCase();
  //           console.log("cleanedTitle", cleanedTitle);
  //           if (
  //             cleanedTitle === "USER_TRACKING" ||
  //             cleanedTitle === "GEO-FENCING"
  //           ) {
  //             return true; // Always include USER_TRACKING and GEO-FENCING
  //           }
  //           return cleanedTitle.includes(item2.keyName.toUpperCase());
  //         });
  //         return foundItem;
  //       });

  //       // console.log(result);

  //       return Promise.resolve(result);
  //     } catch (error) {
  //       console.log("ERROR >>>>>", error);
  //       return Promise.resolve(false);
  //     }
  //   }

  async GET_REPORTS_DATA(reports: any, userModules: any): Promise<any> {
    try {
      const hasUserTracking = userModules.some(
        (item: any) => item.keyName === "USER_TRACKING"
      );

      // Filter reports
      const result = reports.filter((item1: any) => {
        const cleanedTitle = item1.title.replace(/\s/g, "_").toUpperCase();
        if (cleanedTitle === "GEO-FENCING" && hasUserTracking) {
          return true;
        } else {
          const foundItem = userModules.find((item2: any) => {
            return cleanedTitle.includes(item2.keyName.toUpperCase());
          });
          return foundItem;
        }
      });

      return Promise.resolve(result);
    } catch (error) {
      console.log("ERROR >>>>>", error);
      return Promise.resolve(false);
    }
  }
}

export default new RBACService();

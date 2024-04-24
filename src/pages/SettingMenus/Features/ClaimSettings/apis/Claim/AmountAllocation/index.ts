/** @format */

import { API_ROUTES, getApiRoute } from "../../../../../../../data/ApiRoutes";
import AxiosService from "../../../../../../../libs/axios.services";

class AmountAllocationService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  // async createAmountAllocation(payload: any) {
  //   const TYPE_OF_CLAIM = `${API_URL}/AmountAllocation`;
  //   let URL = `${TYPE_OF_CLAIM}`;
  //   return axios.post(`${URL}`, payload);
  // }

  async createAmountAllocation(payload: any) {
    console.log("-----create ----------");
    const URL = getApiRoute(API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async createRoomRentAllocation(payload: any) {
    console.log("-----working----------");
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.CREATE_ROOMRENT_ALLOCATION
    );
    return await this.AXIOS.post(URL, payload);
  }

  async createTravelAmountAllocation(payload: any) {
    console.log("-----working----------");
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.CREATE_TRAVEL_ALLOCATION
    );
    return await this.AXIOS.post(URL, payload);
  }

  async getAllAmountAllocationData(status: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ALL_AMOUNT_ALLOCATIONS
    );
    return await this.AXIOS.get(`${URL}?status=${status}`);
  }

  // async getAmountAllocationV2(
  //   where: any,
  //   skip?: string | number | null,
  //   limit?: any,
  //   populate: boolean | null = false,
  //   select: any[] = ['*']
  // ) {
  //   const URL = getApiRoute(API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_AMOUNT_ALLOCATION_V2)
  //   let payload: any = {};
  //   if (skip) {
  //     payload[`skip`] = skip;
  //   }
  //   if (limit) {
  //     payload[`limit`] = limit;
  //   }
  //   payload[`where`] = where;
  //   payload[`populate`] = populate;
  //   payload[`select`] = select;

  //   // const config: AxiosRequestConfig = {
  //   //   method: 'post',
  //   //   url: REQUEST_AMOUNT_ALLOCATION_DATA,
  //   //   data: payload,
  //   // };
  //   // return axios(config);
  //   return await this.AXIOS.get(URL);
  // }

  // async getAmountAllocationV2(where: any,
  //   skip?: string | number | null,
  //   limit?: any,
  //   populate: boolean | null = false,
  //   select: any[] = ["*"]){
  //     console.log("--------getAmountAllocationV2-------")
  //     const URL = getApiRoute(API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_AMOUNT_ALLOCATION_V2)
  //     let payload: any = {};
  //     if (skip) {
  //       payload[`skip`] = skip;
  //     }
  //     if (limit) {
  //       payload[`limit`] = limit;
  //     }
  //     payload[`where`] = where;
  //     payload[`populate`] = populate;
  //     payload[`select`] = select;

  //     return await this.AXIOS.post(URL,payload)
  // }

  async getAmountAllocationV2(status: any, organization_id: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ALL_AMOUNT_ALLOCATIONS
    );
    return await this.AXIOS.get(
      `${URL}?status=${status}&organization_id=${organization_id}`
    );
  }

  // async getAmountAllocationData(data: any) {
  //   delete data.amount;
  //   delete data.costOfRoom;
  //   const TYPE_OF_CLAIM = `${API_URL}/AmountAllocation?where=${JSON.stringify(
  //     data
  //   )}`;
  //   let URL = `${TYPE_OF_CLAIM}`;
  //   return axios.get(`${URL}`);
  // }

  async getAmountAllocationData(data: any) {
    delete data.amount;
    delete data.costOfRoom;
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_AMOUNT_ALLOCATION
    );
    console.log("------status------->");
    return await this.AXIOS.get(`${URL}?where=${JSON.stringify(data)}`);
  }

  // async getAllAmountAllocationDataByType(
  //   status: any,
  //   typeOfClaim: any,
  //   organization_id: any
  // ) {
  //   const TYPE_OF_TRAVEL = `${API_URL}/allocation/types?types=${typeOfClaim}`;
  //   let URL = `${TYPE_OF_TRAVEL}`;
  //   return axios.get(
  //     `${URL}&status=${status}&organization_id=${organization_id}`
  //   );
  // }
  async getAllAmountAllocationDataByType(
    status: any,
    typeOfClaim: any,
    organization_id: any
  ) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ALL_AMOUNTALLOCATION_BYTYPE
    );
    console.log("------status------->");
    return await this.AXIOS.get(
      `${URL}?types=${typeOfClaim}&status=${status}&organization_id=${organization_id}`
    );
  }

  // async getRoomRentAllocationDataByType(
  //   status: any,
  //   typeOfClaim: any,
  //   organization_id: any
  // ) {
  //   const TYPE_OF_TRAVEL = `${API_URL}/RoomAllocation?typeOfClaim=${typeOfClaim}`;
  //   let URL = `${TYPE_OF_TRAVEL}`;
  //   return axios.get(
  //     `${URL}&status=${status}&organization_id=${organization_id}`
  //   );
  // }

  async getRoomRentAllocationDataByType(
    status: any,
    typeOfClaim: any,
    organization_id: any
  ) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ALL_ROOMALLOCATION_BYTYPE
    );
    console.log("------status------->");
    return await this.AXIOS.get(
      `${URL}?typeOfClaim=${typeOfClaim}&status=${status}&organization_id=${organization_id}`
    );
  }

  // async getAllTravelAmountAllocationData(
  //   status: any,
  //   organization_id: any
  // ) {
  //   const TYPE_OF_TRAVEL = `${API_URL}/TravelAllocation`;
  //   let URL = `${TYPE_OF_TRAVEL}`;
  //   return axios.get(
  //     `${URL}?status=${status}&organization_id=${organization_id}`
  //   );
  // }

  async getAllTravelAmountAllocationData(status: any, organization_id: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GETALLTRAVEL);
    console.log("------------->", status);
    return await this.AXIOS.get(
      `${URL}?status=${status}&organization_id=${organization_id}`
    );
  }

  // async getTravelAmountAllocationData(data: any) {
  //   delete data.amount;
  //   delete data.costOfRoom;
  //   const TYPE_OF_CLAIM = `${API_URL}/TravelAllocation?where=${JSON.stringify(
  //     data
  //   )}`;
  //   let URL = `${TYPE_OF_CLAIM}`;
  //   return axios.get(`${URL}`);
  // }

  async getTravelAmountAllocationData(data: any) {
    delete data.amount;
    delete data.costOfRoom;
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_TRAVEL_ALLOCATION
    );
    console.log("------status------->");
    return await this.AXIOS.get(`${URL}?where=${JSON.stringify(data)}`);
  }

  // async getAllTravelAmountAllocationDataByType(
  //   status: any,
  //   typeOfTravel: any,
  //   organization_id: any
  // ) {
  //   const TYPE_OF_TRAVEL = `${API_URL}/TravelAllocation?typeOfTravel=${typeOfTravel}`;
  //   let URL = `${TYPE_OF_TRAVEL}`;
  //   return axios.get(
  //     `${URL}&status=${status}&organization_id=${organization_id}`
  //   );
  // }
  async getAllTravelAmountAllocationDataByType(
    status: any,
    typeOfTravel: any,
    organization_id: any
  ) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ALL_TRAVELALLOCATION_BYTYPE
    );
    console.log("------status------->");
    return await this.AXIOS.get(
      `${URL}?typeOfTravel=${typeOfTravel}&status=${status}&organization_id=${organization_id}`
    );
  }

  // async getRoomRentAllocationData(status: any, organization_id: any) {
  //   const TYPE_OF_TRAVEL = `${API_URL}/RoomAllocation`;
  //   let URL = `${TYPE_OF_TRAVEL}`;
  //   return axios.get(
  //     `${URL}?status=${status}&organization_id=${organization_id}`
  //   );
  // }

  async getRoomRentAllocationData(status: any, organization_id: any) {
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ROOMRENT_ALLOCATION
    );
    console.log("------------->", status);
    return await this.AXIOS.get(
      `${URL}?status=${status}&organization_id=${organization_id}`
    );
  }

  // async getAllRoomRentAllocationData(data: any) {
  //   delete data.amount;
  //   delete data.costOfRoom;
  //   const TYPE_OF_CLAIM = `${API_URL}/RoomAllocation?where=${JSON.stringify(
  //     data
  //   )}`;
  //   let URL = `${TYPE_OF_CLAIM}`;
  //   return axios.get(`${URL}`);
  // }

  async getAllRoomRentAllocationData(data: any) {
    delete data.amount;
    delete data.costOfRoom;
    const URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ALL_ROOMRENT_ALLOCATIONDATA
    );
    console.log("------status------->");
    return await this.AXIOS.get(`${URL}?where=${JSON.stringify(data)}`);
  }

  // async updateAllocationData(data: any, id: any) {
  //   const UPDATE_TYPE = `${API_URL}/AmountAllocation/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'put',
  //     url: UPDATE_TYPE,
  //     data: data,
  //   };
  //   return axios(config);
  // }

  async updateAllocationData(data: any, id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.UPDATE_AMOUNT_ALLOCATION
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  // async updateRoomAllocationData(data: any, id: any) {
  //   const UPDATE_TYPE = `${API_URL}/RoomAllocation/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'put',
  //     url: UPDATE_TYPE,
  //     data: data,
  //   };
  //   return axios(config);
  // }

  async updateRoomAllocationData(data: any, id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.UPDATE_ROOMRENT_ALLOCATION
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  // async updateTravelAllocationData(data: any, id: any) {
  //   const UPDATE_TYPE = `${API_URL}/TravelAllocation/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'put',
  //     url: UPDATE_TYPE,
  //     data: data,
  //   };
  //   return axios(config);
  // }

  async updateTravelAllocationData(data: any, id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.UPDATE_TRAVEL_ALLOCATION
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  // async getOneAmountAllocation(id: any) {
  //   const REQUEST_CATEGORY_DATA = `${API_URL}/AmountAllocation/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'get',
  //     url: REQUEST_CATEGORY_DATA,
  //   };
  //   return axios(config);
  // }

  async getOneAmountAllocation(id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GETONE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.get(URL, id);
  }

  // async getOneTravelAmountAllocation(id: any) {
  //   const REQUEST_CATEGORY_DATA = `${API_URL}/TravelAllocation/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'get',
  //     url: REQUEST_CATEGORY_DATA,
  //   };
  //   return axios(config);
  // }

  async getOneTravelAmountAllocation(id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ONE_TRAVEL);
    if (id) URL += `/${id}`;
    return await this.AXIOS.get(URL, id);
  }

  // async getRoomRentAmountAllocationById(id: any) {
  //   const REQUEST_CATEGORY_DATA = `${API_URL}/RoomAllocation/${id}`;
  //   const config: AxiosRequestConfig = {
  //     method: 'get',
  //     url: REQUEST_CATEGORY_DATA,
  //   };
  //   return axios(config);
  // }

  async getRoomRentAmountAllocationById(id: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.GET_ONE_ROOMRENT
    );
    if (id) URL += `/${id}`;
    return await this.AXIOS.get(URL, id);
  }
  async getFixedAmountList(payload: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.FIXED_AMOUNT_LIST
    );

    return await this.AXIOS.post(URL, payload);
  }
  async getTravelAmountList(payload: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.TRAVEL_ALLOCATION_LIST
    );

    return await this.AXIOS.post(URL, payload);
  }
  async getRoomRentList(payload: any) {
    let URL = getApiRoute(
      API_ROUTES?.ADMIN?.AMOUNTALLOCATION?.ROOMRENT_ALLOCATION_LIST
    );

    return await this.AXIOS.post(URL, payload);
  }
}

export default new AmountAllocationService();

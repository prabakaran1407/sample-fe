/** @format */

import axios from "axios";
import { API_BASE_URL } from "../../../../../../../config";
import { API_ROUTES, getApiRoute } from "../../../../../../../data/ApiRoutes";
import AxiosService from "../../../../../../../libs/axios.services";

const API_URL = API_BASE_URL;
class GradeService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = AxiosService.getApiInstance();
  }

  async getGrade(_payload: any) {
    const TYPE_OF_CLAIM = `${API_URL}/class&status=true`;
    let URL = `${TYPE_OF_CLAIM}`;
    return axios.get(`${URL}`);
  }

  async createGrade(payload: any) {
    console.log("-----working----------");
    const URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.CREATE);
    return await this.AXIOS.post(URL, payload);
  }

  async getAllGrades(payload: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.NEW_LIST);
    // console.log("------------->",status)
    return await this.AXIOS.post(URL, payload);
  }

  async getGrades(status: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.GETGRADES);
    console.log("------status------->", status);
    return await this.AXIOS.get(`${URL}?where=${JSON.stringify(status)}`);
  }

  async getAllClass(status: any) {
    const URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.GETALLCLASS);
    console.log("------------->", status);
    return await this.AXIOS.get(`${URL}?status=${status}`);
  }
  async getAllGradesForCity(className: any, status: any) {
    const TYPE_OF_CLAIM = `${API_URL}/grade?class=${className}&status=${status}`;
    let URL = `${TYPE_OF_CLAIM}`;
    return axios.get(`${URL}`);
  }

  async updateGrade(data: any, id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.UPDATE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.put(URL, data);
  }

  async getOneGrade(id: any) {
    let URL = getApiRoute(API_ROUTES?.ADMIN?.GRADE?.GETONEGRADE);
    if (id) URL += `/${id}`;
    return await this.AXIOS.get(URL, id);
  }
}
export default new GradeService();

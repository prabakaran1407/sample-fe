/**
 * eslint-disable class-methods-use-this
 *
 * @format
 */

/* eslint-disable lines-between-class-members */
/* eslint-disable no-return-await */
/* eslint-disable arrow-body-style */
import { API_ROUTES, getApiRoute } from '../../data/ApiRoutes';
import axiosServices from '../../libs/axios.services';

class CommonService {
  AXIOS!: any;
  constructor() {
    this.AXIOS = axiosServices.getApiInstance();
  }

  async uploadImage(imageFile: File, type: string) {
    const URL = getApiRoute(API_ROUTES?.UPLOAD_FILE?.UPLOAD_FILE);
    const formData = new FormData();
    formData.append('type', type);
    formData.append('image', imageFile);
    return await this.AXIOS.post(URL, formData);
  }

  async uploadImageNew(imageFile: File) {
    const URL = getApiRoute(API_ROUTES?.UPLOAD_FILE?.UPLOAD_FILE);
    // const URL = 'http://localhost:1337/fileupload';

    const formData = new FormData();
    // formData.append('type', type);
    formData.append('file', imageFile);
    return await this.AXIOS.put(URL, formData);
  }
}

export default new CommonService();
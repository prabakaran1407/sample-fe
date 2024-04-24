/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AxioService from '../service.index'

class TestAPIService{
    async getUserData(URL: string, _queryString?: string, _config?: any){
        return await AxioService.GET(URL, _config)
    }

    async getUserDataOne(URL: string, _queryString?: string){
        return await AxioService.GET(URL)
    }
}

export default new TestAPIService()
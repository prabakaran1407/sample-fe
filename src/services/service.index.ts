import axios from "axios";

type IConfig = Record<string, string | Array<Record<string, unknown>> | boolean | number | Record<string, unknown>>

type Ipayload = Record<string, string | Array<Record<string, unknown>> | boolean | number | Record<string, unknown>> | Record<string, string | Array<Record<string, unknown>> | boolean | number | Record<string, unknown>>[]

class AxiosService {
  constructor(){
    // 
  } 

  async GET(URL: string, config?: IConfig) {

    return await axios.get(URL, config)
  }

  async POST(URL: string, payload: Ipayload, config?: IConfig) {
    return await axios.post(URL, payload, config)
  }

  async PATCH(URL: string, payload: Ipayload, config?: IConfig) {
    return await axios.patch(URL, payload, config)
  }

  async PUT(URL: string, payload: Ipayload, config?: IConfig) {
    return await axios.put(URL, payload, config)
  }

  async DELETE(URL: string, config?: IConfig) {
    return await axios.delete(URL, config)
  }
}

export default new AxiosService();

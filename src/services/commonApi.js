import axios from "axios";
import { data } from "react-router-dom";

const commonApi=async(reqUrl,reqMethod,reqHeader,reqBody)=>{
    const config={
        url:reqUrl,
        method:reqMethod,
        headers:reqHeader?reqHeader:"Content-Type:application/json",
        data:reqBody
    }
    return await axios(config)
}
export default commonApi

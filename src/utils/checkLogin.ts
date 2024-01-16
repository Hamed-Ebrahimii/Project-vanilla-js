
import {Axios} from "../api/axios.ts";
export const checkLogin = async () =>{
    const response  = await Axios({
        method : "GET",
        url : `sneaker?page=1&limit=10`
    })
    if(response.status !== 200){
        return true
    }
}
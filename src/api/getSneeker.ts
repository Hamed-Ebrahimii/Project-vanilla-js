import {Axios} from "./axios.ts";
import {navigate} from "../router.ts";

export const getSneeker = async (page : number )  =>{
    const token = sessionStorage.getItem('token');
    try{
        const response  = await Axios({
            method : "GET",
            url : `sneaker?page=${page}&limit=10`,
            headers : {
                Authorization : token
            }
        })
        return response.data
    }catch(error){
        navigate('login')
    }
}
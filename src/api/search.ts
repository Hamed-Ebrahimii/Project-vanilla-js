import {Axios} from "./axios.ts";

export const search = async (data : string , page : number) =>{
    const token = sessionStorage.getItem('token');
    const response = await Axios({
        method : 'GET',
        url : `sneaker?page=${page}&limit=20&search=${data}`,
        headers : {
            Authorization : token
        }
    })
    return response.data
}
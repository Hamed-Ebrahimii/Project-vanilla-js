import {Axios} from "../api/axios.ts";
import {navigate} from "../router.ts";

export const getSneekerItem =  async (id : number)  =>{
    const token = sessionStorage.getItem('token')
    try{
        const response = await Axios({
            method : "GET",
            url : `sneaker/item/${id}` ,
            headers : {
                Authorization : token
            }
        })
        return response.data
    }catch (error){
        navigate('login')
    }


}
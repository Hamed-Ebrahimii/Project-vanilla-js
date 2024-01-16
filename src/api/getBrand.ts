import {Axios} from "./axios.ts";

export const getBrand = async () =>{
    const token = sessionStorage.getItem('token');
   try{
       const response = await Axios({
           method : "GET" ,
           url : '/sneaker/brands',
           headers : {
               Authorization : token
           }

       })
       return response.data
   }catch (error){
       // navigate('login')
   }
}
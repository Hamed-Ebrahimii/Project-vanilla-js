import {Axios} from "./axios.ts";
export const getUser = async () =>{
    const token = sessionStorage.getItem('token');
   try{
       const response = await Axios({
           method : "GET" ,
           url : 'user',
           headers : {
               Authorization : token
           }
       })
       return response
   }catch (error){
       // navigate('login')
   }
}
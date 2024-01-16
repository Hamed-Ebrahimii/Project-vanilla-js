import {Axios} from "./axios.ts";

export const signup = async (user: login) =>{
    const response = await  Axios({
        method: 'POST' ,
        url: '/auth/signup',
        data : user
    })
    sessionStorage.setItem('token' , response.data.token)
}
import axios from "axios";

export const getCart = async () =>{
    const response = await axios({
        method : "GET" ,
        url : 'http://localhost:8000/Cart',
    })
    return response.data
}
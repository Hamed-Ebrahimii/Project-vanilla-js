import axios from "axios";

export const PostCart = async (data : Cart) =>{
    const response = await axios({
        method : "POST" ,
        url : '  http://localhost:8000/Cart',
        data
    })
    console.log(response.status)
}
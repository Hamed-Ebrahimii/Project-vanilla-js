import axios from "axios";

export const deleteCart =async (id: number) =>{
    await axios({
        url : `http://localhost:8000/Cart/${id}`,
        method : "DELETE",
    })
}
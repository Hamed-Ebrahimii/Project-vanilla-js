import {Axios} from "./axios.ts";
import {setFilterBrand, setIsFilter} from "../pages/home";
import {resetMain} from "../utils/resetMain.ts";
import {getSneeker} from "./getSneeker.ts";


export const filter = async (brand : string , page : number) =>{
    const token = sessionStorage.getItem('token')
    if (brand === 'All'){
        setIsFilter(false)
        setFilterBrand('')
        resetMain()
        const list = await  getSneeker(1)
        console.log(list.data)
        return list
    }
    const response = await Axios({
        method : "GET" ,
        url : `sneaker?page=${page}&limit=10&brands=${brand}`,

    })
    return response.data
}
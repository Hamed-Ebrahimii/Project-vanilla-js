import axios from 'axios';
import {token} from "../utils/getToken.ts";
export const Axios  = axios.create({
    baseURL: 'http://localhost:3000/',
    headers : {
    Authorization : token()
}
})
import {navigate} from "./router.ts";
import {token} from "./utils/getToken.ts";

const checkLogin = () =>{
    if (!token) navigate('/login');
}
checkLogin()


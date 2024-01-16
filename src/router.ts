import Navigo from "navigo";
import {render} from "./utils/render.ts";
import {loginTemplate} from "./pages/login";
import {homeTemplate} from "./pages/home";
import {signUpTemplate} from "./pages/signUp";
import {renderProductInfo} from "./pages/productInfo";
import {searchTemplate} from "./pages/search";
import {onBoardingTemplate, Slider} from "./pages/onBoarding";
import {CartTemplate} from "./pages/Cart";
export const  router = new Navigo('http://localhost:5173')
export  const navigate = (url : string) =>{
    router.navigate(url)
}
router.on('/' , async () =>{
    render( await  homeTemplate() as Node)
})
router.on('/login' ,  async ()=>{
    render( await loginTemplate())
})
router.on('/productInfo' , async ()=>{
    render(await renderProductInfo())
})
router.on('/signup' , async ()=>{
    render(await signUpTemplate())
})
router.on('/search' , async ()=>{
    render(await searchTemplate() as Node)
})
router.on('/onboarding' , ()=>{
    render(onBoardingTemplate())
    Slider()
})
router.on('/Cart' , async ()=>{
    render(await CartTemplate())
})
router.resolve()

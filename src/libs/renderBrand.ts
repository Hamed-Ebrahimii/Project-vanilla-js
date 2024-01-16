import {setFilterBrand, setIsFilter} from "../pages/home";
import {resetMain} from "../utils/resetMain.ts";
import {filter} from "../api/filter.ts";
import {renderProduct} from "./renderProduct.ts";

export const renderBrand = (listBrand : string[]): Node[] =>  {
    const newArray = ["All" , ...listBrand];
    const NodeList : Node[] = []
    newArray.forEach(item=>{
        const brand = document.createElement('input')
        brand.type = 'button'
        brand.className = 'bg-transparent border-2 border-black text-sm text-slate-700 focus:bg-slate-800 focus:text-white whitespace-nowrap rounded-3xl py-2 px-5'
        brand.value = item
        brand.addEventListener('click' ,  async () =>{
            const main = <HTMLDivElement> document.getElementById('main');
            setIsFilter(true)
            setFilterBrand(item)
            resetMain()
            const list  =  await filter(item , 1)
            main.append(...renderProduct(list.data))

        })
        NodeList.push(brand)
    })
    return NodeList
}
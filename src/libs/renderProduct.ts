import {truncate} from "../utils/truncate.ts";
import {navigate} from "../router.ts";
export  const renderProduct = (list : sneeker[]): Node[] =>{
    const listNode : Node[] = []
   list.forEach(item =>{
       const div = <HTMLDivElement>document.createElement("div");
       div.addEventListener('click' , () =>{
           navigate(`productInfo?id=${item.id}`);
       })
       const wrapperImg = document.createElement("div");
       const img = document.createElement("img");
       img.src = item.imageURL
       img.className = "w-36 h-36 rounded-lg"
       wrapperImg.appendChild(img)
       const nameEl = document.createElement("p")
       nameEl.innerText = truncate(item.name , 13)
       const priceEl = document.createElement("p")
       priceEl.innerText = `$ ${item.price}`
       div.appendChild(wrapperImg)
       div.appendChild(nameEl)
       div.appendChild(priceEl)
       listNode.push(div)
   })
    return listNode
}

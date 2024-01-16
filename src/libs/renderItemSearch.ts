import {truncate} from "../utils/truncate.ts";

export const renderItemSearch = ( item : sneeker[]) =>{
    const search = <HTMLDivElement>document.getElementById('search-item')
    const wrapper = <HTMLDivElement>document.getElementById('wrapper-search')
    wrapper.classList.remove('hidden')
    console.log(search)
    if (item.length === 0 ) {
        search.innerHTML = `
            <div class="w-screen flex flex-col items-center gap-4 p-4">
        <img src="/public/icon/icons8-not-found-96.png" alt="">
        <p class="text-lg font-bold">product not found ):</p>
      </div>
        `
        return
    }
    for (let i =0  ;  i < 4 ; i++){
        if (!item[i]) return
        search.innerHTML += `
        <div class="w-11/12 p-3 rounded-lg border flex justify-around gap-4">
        <div class="w-28 h-28">
          <img src="${item[i].imageURL}" alt="" class="rounded-lg">
        </div>
        <div class="flex flex-col justify-between">
          <h3 class="w-full whitespace-nowrap">${truncate(item[i].name , 10)}</h3>
          <p>$${item[i].price}</p>
        </div>
      </div>
        `
    }
}
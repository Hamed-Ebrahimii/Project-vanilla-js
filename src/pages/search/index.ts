import {search} from "../../api/search.ts";
import {renderProduct} from "../../libs/renderProduct.ts";
import {navigate} from "../../router.ts";

export const searchTemplate = async () => {
    const query = location.search
    const params = new URLSearchParams(query).get('search')
    const result = await search(params! , 1)
    const container = document.createElement('div')
    container.innerHTML = `
         <div class=" py-4 flex items-center gap-1 ">
            <div class="bg-[#FAFAFA] w-full py-2 px-3 rounded-md flex items-center gap-3">
                <button id="btn-search">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <g clip-path="url(#clip0_1_2387)">
                    <path d="M11.7419 10.844C12.7102 9.52267 13.1439 7.88447 12.9562 6.25713C12.7685 4.62979 11.9733 3.13332 10.7297 2.06711C9.48604 1.0009 7.88567 0.443582 6.24876 0.506655C4.61184 0.569728 3.05911 1.24854 1.90119 2.40729C0.743273 3.56603 0.0655718 5.11926 0.00366997 6.75621C-0.0582319 8.39317 0.500231 9.99314 1.56733 11.236C2.63443 12.4789 4.13147 13.273 5.75894 13.4596C7.38641 13.6461 9.0243 13.2112 10.3449 12.242H10.3439C10.3739 12.282 10.4059 12.32 10.4419 12.357L14.2919 16.207C14.4794 16.3946 14.7338 16.5001 14.9991 16.5002C15.2643 16.5003 15.5188 16.395 15.7064 16.2075C15.8941 16.02 15.9995 15.7656 15.9996 15.5003C15.9997 15.2351 15.8944 14.9806 15.7069 14.793L11.8569 10.943C11.8212 10.9068 11.7827 10.8734 11.7419 10.843V10.844ZM11.9999 6.99998C11.9999 7.72225 11.8577 8.43745 11.5813 9.10474C11.3049 9.77203 10.8997 10.3783 10.389 10.8891C9.87829 11.3998 9.27197 11.8049 8.60468 12.0813C7.93739 12.3577 7.22219 12.5 6.49992 12.5C5.77765 12.5 5.06245 12.3577 4.39516 12.0813C3.72787 11.8049 3.12156 11.3998 2.61083 10.8891C2.10011 10.3783 1.69498 9.77203 1.41858 9.10474C1.14218 8.43745 0.999921 7.72225 0.999921 6.99998C0.999921 5.54129 1.57938 4.14234 2.61083 3.11089C3.64228 2.07944 5.04123 1.49998 6.49992 1.49998C7.95861 1.49998 9.35756 2.07944 10.389 3.11089C11.4205 4.14234 11.9999 5.54129 11.9999 6.99998Z" fill="#6C757D"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_2387">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                    </defs>
                    </svg>
                </button>
                <input type="text" class="border-none outline-none  bg-[#FAFAFA]" placeholder="search" id="search" >
            </div>
          </div>
          <div class="w-full flex justify-between mt-3 px-4">
            <div>
                <p class="text-lg font-bold" id="search-value">Result for "${params}"</p>
            </div>
            <div>
                <p class="font-bold text-lg" id="found">${result.data.length} found</p>
            </div>
        </div>
    `
    const product = document.createElement('div');
    product.className = 'w-full flex flex-wrap justify-center items-center gap-2'
    if (result.data.length === 0) {
        product.innerHTML =`
        <div class="w-screen flex flex-col items-center gap-4 p-4">
        <img src="/public/icon/icons8-not-found-96.png" alt="">
        <p class="text-lg font-bold">product not found ):</p>
      </div>
        `
        return
    }
    product.append(...renderProduct(result.data))
    container.appendChild(product)
    const btnBack = document.createElement('button')
    btnBack.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 38.273 38.273" xml:space="preserve">\n' +
        '<g>\n' +
        '\t<path style="fill:#0f0f10;" d="M20.621,10.484V5.84c0-0.808-0.458-1.548-1.181-1.909c-0.722-0.359-1.589-0.279-2.236,0.206   l-9.486,7.147c-0.677,0.292-1.117,0.67-1.401,1.058l-5.468,4.119C0.312,16.866-0.003,17.501,0,18.173   c0.002,0.673,0.322,1.305,0.862,1.706l16.355,12.133c0.646,0.48,1.51,0.554,2.23,0.191c0.72-0.362,1.174-1.1,1.174-1.905v-5.517   c0.013,0,0.025,0,0.038,0c3.842,0,10.687,1.089,13.366,8.386c0.311,0.846,1.116,1.397,2.001,1.397c0.079,0,0.157-0.004,0.236-0.013   c0.975-0.108,1.751-0.868,1.88-1.84c0.052-0.394,1.208-9.682-4.461-16.23C30.621,12.948,26.235,10.935,20.621,10.484z    M20.659,20.515c-1.443,0-2.379,0.132-2.482,0.146c-1.046,0.154-1.822,1.053-1.822,2.111v3.287l-10.66-7.907l3.555-2.678   c0.136-0.104,0.259-0.222,0.365-0.351c0.155-0.068,0.301-0.152,0.437-0.254l6.303-4.75v2.401c0,1.168,0.939,2.119,2.108,2.134   c5.345,0.063,9.374,1.61,11.975,4.6c1.442,1.658,2.314,3.602,2.835,5.469C28.923,21.038,23.424,20.515,20.659,20.515z"/>\n' +
        '</g>\n' +
        '</svg>'
    btnBack.className = 'absolute top-0 lef-5'
    btnBack.addEventListener('click', () =>{
        navigate('')
    })
    container.appendChild(btnBack)
    return container
}
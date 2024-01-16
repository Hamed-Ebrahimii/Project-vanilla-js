import {truncate} from "../../utils/truncate.ts";
import {getSneekerItem} from "../../libs/getSneekerItem.ts";
import {PostCart} from "../../api/postCart.ts";
import {navigate} from "../../router.ts";
import Toastify from "toastify-js";
const cart : Cart = {
    name : '' ,
    color : '' ,
    size : '',
    image : '' ,
    total : 1 ,
    price : 0 ,
    totalPrice : 0
}
const renderSizeEl = (sizeList : string[]) :Node[] =>  {
   const list : Node[] = []

    sizeList.forEach(item => {
        const sizeEl = document.createElement('div');
        sizeEl.classList.add('w-10', 'h-10', 'rounded-full', 'border-2', 'border-gray-400', 'flex', 'items-center', 'justify-center', 'focus:bg-black', 'focus:text-white' , 'relative' , 'overflow-hidden' , 'size');
        sizeEl.innerText = item;
        sizeEl.addEventListener('click', () =>{
            const elList = document.querySelectorAll('.size')
            elList.forEach(item=>{
               const svg =  item?.children
                if ( svg[0] && svg[0].tagName == 'svg'){
                    item?.lastChild?.remove()
                }
            })
            cart.size = item
            sizeEl.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" class="absolute bg-white w-full  " xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">\n' +
                '<polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "/>\n' +
                '</svg>'
        })
        list.push(sizeEl);
    });

    return list
};

const renderColor = (colorList : string[]) => {
    const divEl = document.createElement('div');
    divEl.classList.add('w-full', 'flex', 'gap-3');
    colorList.forEach(item => {
        const colorEl = document.createElement('div');
        colorEl.style.backgroundColor = item;
        colorEl.classList.add('w-10', 'h-10', 'rounded-full', 'border-2', 'flex', 'items-center', 'justify-center' , 'color');
        colorEl.addEventListener('click', () =>{
            const listColor = document.querySelectorAll('.color')
            listColor.forEach(item =>{
                item?.lastChild?.remove()
            })
            cart.color = item
            colorEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xml:space="preserve">\n' +
                '<polygon points="452.253,28.326 197.831,394.674 29.044,256.875 0,292.469 207.253,461.674 490,54.528 "/>\n' +
                '</svg>'
        })
        divEl.appendChild(colorEl);
    });

    return divEl;
};

export const renderProductInfo = async () => {
    const query = location.search
    const param = new URLSearchParams(query).get('id')
    const item = await getSneekerItem(Number(param))
    cart.name = item.name
    cart.image = item.imageURL
    cart.price = item.price
    cart.totalPrice = item.price
    const size = item.sizes.split('|');
    const color = item.colors.split('|');
    let Quantity = 1
    const wrapper = document.createElement('div');
    wrapper.classList.add('product-wrapper');
    const btnBack = document.createElement('button')
    btnBack.className = 'absolute top-3 lef-5'
    btnBack.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 38.273 38.273" xml:space="preserve">\n' +
        '<g>\n' +
        '\t<path style="fill:#0f0f10;" d="M20.621,10.484V5.84c0-0.808-0.458-1.548-1.181-1.909c-0.722-0.359-1.589-0.279-2.236,0.206   l-9.486,7.147c-0.677,0.292-1.117,0.67-1.401,1.058l-5.468,4.119C0.312,16.866-0.003,17.501,0,18.173   c0.002,0.673,0.322,1.305,0.862,1.706l16.355,12.133c0.646,0.48,1.51,0.554,2.23,0.191c0.72-0.362,1.174-1.1,1.174-1.905v-5.517   c0.013,0,0.025,0,0.038,0c3.842,0,10.687,1.089,13.366,8.386c0.311,0.846,1.116,1.397,2.001,1.397c0.079,0,0.157-0.004,0.236-0.013   c0.975-0.108,1.751-0.868,1.88-1.84c0.052-0.394,1.208-9.682-4.461-16.23C30.621,12.948,26.235,10.935,20.621,10.484z    M20.659,20.515c-1.443,0-2.379,0.132-2.482,0.146c-1.046,0.154-1.822,1.053-1.822,2.111v3.287l-10.66-7.907l3.555-2.678   c0.136-0.104,0.259-0.222,0.365-0.351c0.155-0.068,0.301-0.152,0.437-0.254l6.303-4.75v2.401c0,1.168,0.939,2.119,2.108,2.134   c5.345,0.063,9.374,1.61,11.975,4.6c1.442,1.658,2.314,3.602,2.835,5.469C28.923,21.038,23.424,20.515,20.659,20.515z"/>\n' +
        '</g>\n' +
        '</svg>'
    btnBack.addEventListener('click', () => navigate(''))
    wrapper.appendChild(btnBack)
    let showdes = false
    const imgEl = document.createElement('img');
    imgEl.src = item.imageURL;
    imgEl.alt = item.name;
    wrapper.appendChild(imgEl);

    const divEl = document.createElement('div');
    divEl.classList.add('w-screen', 'p-8');
    const wrapperNameItem = document.createElement('div')
    wrapperNameItem.className = 'flex w-full justify-between'
    const nameItem = document.createElement('p')
    nameItem.innerText = item.name;
    divEl.innerHTML += `
        <div class="flex w-full justify-between">
            <p class="text-2xl font-bold">${truncate(item.name, 20)}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_1_2377)">
                    <path d="M12 4.12201L10.9245 3.01651C8.39996 0.421512 3.77096 1.31701 2.09996 4.57951C1.31546 6.11401 1.13846 8.32951 2.57096 11.157C3.95096 13.8795 6.82196 17.1405 12 20.6925C17.178 17.1405 20.0475 13.8795 21.429 11.157C22.8615 8.32801 22.686 6.11401 21.9 4.57951C20.229 1.31701 15.6 0.420012 13.0755 3.01501L12 4.12201ZM12 22.5C-10.9995 7.30201 4.91846 -4.55999 11.736 1.71451C11.826 1.79701 11.9145 1.88251 12 1.97101C12.0846 1.88259 12.1727 1.79753 12.264 1.71601C19.08 -4.56299 34.9995 7.30051 12 22.5Z" fill="#212529"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_2377">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
        <div class="w-full flex gap-4 mt-5">
            <div class="bg-slate-100 rounded-lg p-1">
                <p class="text-xs font-medium">5.371 sold</p>
            </div>
            <div class="flex gap-2">
                <i class="bi bi-star-half"></i>
                <p>4.3(5,389 reviews)</p>
            </div>
        </div>
        <hr class="mt-5">
    `;

    const divDescription = document.createElement("div");
    divDescription.classList.add("w-full", "flex", "flex-col", "gap-3", "mt-5");
    divDescription.innerHTML = `
        <h3 class="text-lg font-bold">Description</h3>
    `;

    const Description = document.createElement("p");
    Description.classList.add("text-sm");
    Description.innerText = `${truncate('Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis temporibus architecto corrupti suscipit odit ex velit at nisi fugiat aspernatur molestias, ducimus possimus nihil quia, delectus dicta. Libero, eaque beatae?', 50)}`;
    divDescription.appendChild(Description);

    const btnView = document.createElement("button");
    btnView.classList.add("px-3", "py-1", "rounded-lg", "mt-5", "view");
    btnView.innerText = "View More";

    btnView.addEventListener("click", () => {
        console.log('ok');
        if (!showdes) {
            Description.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis temporibus architecto corrupti suscipit';
            showdes = true
            btnView.innerText = 'hidden'
        }
        else {
            Description.innerText = truncate('Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis temporibus architecto corrupti suscipit odit ex velit at nisi fugiat aspernatur molestias, ducimus possimus nihil quia, delectus dicta. Libero, eaque beatae?', 50)
            showdes = false
            btnView.innerText = 'View More'
        }
    });

    divDescription.appendChild(btnView);
    divEl.appendChild(divDescription)
    const divWrapper = document.createElement("div");
    divWrapper.classList.add("w-full", "flex", "gap-3", "justify-between", "items-center", "overflow-x-scroll");

    const sizeEl = document.createElement("div");
    sizeEl.classList.add("flex", "w-5/12", "flex-col", "gap-3", "mt-5");

    const sizeTitle = document.createElement("h3");
    sizeTitle.classList.add("text-lg", "font-bold");
    sizeTitle.innerHTML = "Size";
    sizeEl.appendChild(sizeTitle);
    const wrapperSize = document.createElement("div");
    wrapperSize.classList.add("w-full" , 'flex' , 'gap-2')
    wrapperSize.append(...renderSizeEl(size))
    sizeEl.appendChild(wrapperSize);
    divWrapper.appendChild(sizeEl);

    const colorEl = document.createElement("div");
    colorEl.classList.add("flex", "flex-col", "gap-3", "mt-5");

    const colorTitle = document.createElement("h3");
    colorTitle.classList.add("text-lg", "font-bold");
    colorTitle.innerHTML = "Color";

    colorEl.appendChild(colorTitle);
    colorEl.appendChild(renderColor(color));
    divWrapper.appendChild(colorEl);

    divEl.appendChild(divWrapper);

    const hr = document.createElement("hr");
    hr.classList.add("mt-5")
    divEl.appendChild(hr);

    const divQuantity = document.createElement('div');
    divQuantity.classList.add('w-full', 'flex', 'gap-3', 'mt-5', 'items-center');

    const titleQuantity = document.createElement('h3');
    titleQuantity.classList.add('font-bold', 'text-lg');
    titleQuantity.innerHTML = 'Quantity';

    divQuantity.appendChild(titleQuantity);

    const divQuantityWrapper = document.createElement('div');
    divQuantityWrapper.classList.add('flex', 'bg-slate-100', 'rounded-full', 'py-2', 'px-6', 'gap-3', 'items-center');
    const quantity = document.createElement('span');
    const minus = document.createElement('button');
    minus.classList.add('text-lg', 'font-semibold');
    minus.innerHTML = '-';
    minus.addEventListener('click', () => {
        if (Quantity <= 0) return;
        Quantity--;
        cart.total = Quantity
        quantity.innerHTML = String(Quantity);
        cart.totalPrice = cart.total * cart.price
        p.innerText = '$' + Quantity * cart.price;
    });

    divQuantityWrapper.appendChild(minus);


    quantity.classList.add('text-lg', 'font-semibold');
    quantity.innerHTML = '1';
    divQuantityWrapper.appendChild(quantity);

    const plus = document.createElement('button');
    plus.classList.add('text-lg', 'font-semibold');
    plus.innerHTML = '+';
    plus.addEventListener('click', () => {
        Quantity++;
        cart.total = Quantity
        quantity.innerHTML = String(Quantity);
        cart.totalPrice = cart.total * item.price
        p.innerText = '$' + Quantity * item.price;
    });

    divQuantityWrapper.appendChild(plus);

    divQuantity.appendChild(divQuantityWrapper);
    divEl.appendChild(divQuantity);

    const divCart = document.createElement('div');
    divCart.classList.add('mt-5', 'w-full', 'flex', 'items-center', 'justify-between');

    const divPrice = document.createElement('div');
    divPrice.classList.add('w-4/12');

    const span = document.createElement('span');
    span.classList.add('text-gray-500', 'text-sm');
    span.innerHTML = 'Total Price';

    const p = document.createElement('p');
    p.classList.add('text-2xl', 'font-bold');
    p.innerText = '$' + item.price;

    divPrice.appendChild(span);
    divPrice.appendChild(p);

    const button = document.createElement('button');
    button.classList.add('bg-black', 'text-white', 'rounded-full', 'py-3', 'px-6', 'flex', 'items-center', 'justify-center', 'gap-2', 'w-7/12');
    button.innerHTML = '<i class="bi bi-bag-fill"></i><span class="text-sm">Add to cart</span>';
    button.addEventListener('click', async () =>{
        if (!cart.size && !cart.color){
            Toastify({
                text : 'Please select a color and size' ,
                position : 'right' ,
                gravity : 'top' ,
                duration : 3000
            }).showToast()
            return
        }
        await PostCart(cart)
    })
    divCart.appendChild(divPrice);
    divCart.appendChild(button);
    divEl.appendChild(divCart);
    wrapper.appendChild(divEl);
    return wrapper
};

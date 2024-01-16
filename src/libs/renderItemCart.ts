import {hiddeModule, showModel} from "../pages/Cart";
import {deleteCart} from "../api/DeleteCart.ts";
import {navigate} from "../router.ts";

    let isShow = false
export const renderItemCart = (listCart : Cart[]) :Node[] =>{
    const list : Node[] = []
    listCart.forEach(item =>{
        let Quantity = item.total
        // ایجاد المنت اصلی
        const mainDiv = document.createElement('div');
        mainDiv.setAttribute('class', 'p-4 w-full rounded-2xl shadow-lg flex gap-2');

// ایجاد المنت تصویر
        const imageDiv = document.createElement('div');
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', item.image);
        imgElement.setAttribute('alt', 'image');
        imgElement.setAttribute('class', 'w-24 h-24 rounded-lg');
        imageDiv.appendChild(imgElement);

// ایجاد المنت دیگر
        const textDiv = document.createElement('div');
        textDiv.setAttribute('class', 'flex flex-col gap-2 w-8/12');

// ایجاد المنت برای نمایش عنوان
        const titleDiv = document.createElement('div');
        titleDiv.setAttribute('class', 'w-full flex justify-between items-center');
        const titleP = document.createElement('p');
        titleP.setAttribute('class', 'text-lg font-bold truncate w-8/12');
        titleP.textContent = item.name;
        const deleteButton = document.createElement('button');
        const deleteIcon = document.createElement('i');
        deleteIcon.setAttribute('class', 'bi bi-trash-fill text-lg');
        deleteButton.appendChild(deleteIcon);
        titleDiv.appendChild(titleP);
        titleDiv.appendChild(deleteButton);

// ایجاد المنت برای اطلاعات محصول
        const productInfoDiv = document.createElement('div');
        productInfoDiv.setAttribute('class', 'w-full flex gap-2 items-center');
        const colorDiv = document.createElement('div');
        colorDiv.setAttribute('class', 'w-5 h-5 rounded-full');
        colorDiv.style.backgroundColor = item.color
        const colorSpan = document.createElement('span');
        colorSpan.setAttribute('class', 'pr-4 border-r-2');
        colorSpan.textContent = item.color;
        const sizeSpan = document.createElement('span');
        sizeSpan.setAttribute('class', 'text-slate-600 font-medium');
        sizeSpan.textContent = `Size=${item.size}`;
        productInfoDiv.appendChild(colorDiv);
        productInfoDiv.appendChild(colorSpan);
        productInfoDiv.appendChild(sizeSpan);

// ایجاد المنت برای نمایش قیمت و تعداد
        const priceAndQuantityDiv = document.createElement('div');
        priceAndQuantityDiv.setAttribute('class', 'w-full flex items-center justify-between font-medium');
        const priceSpan = document.createElement('span');
        priceSpan.setAttribute('class', 'font-medium');
        priceSpan.textContent = `$ ${item.totalPrice}`;
        const controlDiv = document.createElement('div');
        controlDiv.setAttribute('class', 'bg-gray-100 rounded-full py-1 px-4 flex gap-3 justify-around items-center');
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () =>{
             Quantity --
            if (Quantity <= 0 ){
                if (isShow) return;
                isShow =true
                const module = <HTMLDivElement>document.getElementById('module')
                const titleWrapper = document.createElement('div')
                titleWrapper.className = 'w-full py-3 px-3 flex items-center justify-center'
                const title = document.createElement('h1')
                title.className = 'font-bold text-xl'
                title.innerText = 'Remove from Cart ?'
                titleWrapper.appendChild(title)
                module.appendChild(titleWrapper)
                const hr = document.createElement('hr')
                hr.className = 'mt-3 mb-3'
                module.appendChild(hr)
                module.append(...renderItemCart([item]))
                module.appendChild(hr)
                const btnWrapper = document.createElement('div')
                btnWrapper.className = 'w-full flex py-3 px-2 items-center justify-center gap-3'
                const btnCancel = document.createElement('btn')
                btnCancel.className = 'px-4 py-2 bg-gray-300 rounded-full font-bold text-lg'
                btnCancel.innerText = 'Cancel'
                btnCancel.addEventListener('click', () => hiddeModule())
                btnWrapper.appendChild(btnCancel)
                const btnDelete = document.createElement('button')
                btnDelete.className = 'px-4 py-2 bg-black text-white text-lg font-bold rounded-full '
                btnDelete.innerText = 'Delete'
                btnDelete.addEventListener('click', async () =>{
                  await  deleteCart(item.id!)
                    navigate('Cart')
                })
                btnWrapper.appendChild(btnDelete)
                module.appendChild(btnWrapper)
                showModel()
                return
            }
            quantitySpan.innerText = String(Quantity)
            priceSpan.innerText ='$ ' + String(item.price * Quantity)
        })
        const quantitySpan = document.createElement('span');
        quantitySpan.textContent = `${item.total}`;
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () =>{
            Quantity++
            quantitySpan.innerText = String(Quantity)
            priceSpan.innerText = '$ ' + String(item.price * Quantity)
        })
        controlDiv.appendChild(minusButton);
        controlDiv.appendChild(quantitySpan);
        controlDiv.appendChild(plusButton);
        priceAndQuantityDiv.appendChild(priceSpan);
        priceAndQuantityDiv.appendChild(controlDiv);

// افزودن تمام المنت‌ها به المنت اصلی
        textDiv.appendChild(titleDiv);
        textDiv.appendChild(productInfoDiv);
        textDiv.appendChild(priceAndQuantityDiv);

        mainDiv.appendChild(imageDiv);
        mainDiv.appendChild(textDiv);

// افزودن المنت اصلی به بدنه سند
        list.push(mainDiv)

    })
    return list
}
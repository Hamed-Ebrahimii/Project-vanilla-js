import {getSneeker} from "../../api/getSneeker.ts";
import {renderProduct} from "../../libs/renderProduct.ts";
import {getUser} from "../../api/getUser.ts";
import {renderBrand} from "../../libs/renderBrand.ts";
import {getBrand} from "../../api/getBrand.ts";
import {filter} from "../../api/filter.ts";
import {debounce} from "../../utils/debounce.ts";
import {search} from "../../api/search.ts";
import {renderItemSearch} from "../../libs/renderItemSearch.ts";
import {navigate} from "../../router.ts";
import {token} from "../../utils/getToken.ts";
let totalPage = 0
let page = 1
let isFilter = false
let filterBrand = ''

export const setFilterBrand =(brand: string) =>{
    filterBrand = brand
}
export const setIsFilter = (data : boolean) =>{
    isFilter = data
}
export const homeTemplate = async ()  =>{
    if (!token()){
        console.log('ok')
        navigate('onboarding')
        return
    }
    console.log('home')
    const user = await getUser()
    const brandLIst = await getBrand()
    const response = await getSneeker(1)
    totalPage = response.totalPages
    const listSneeker : sneeker[] = response.data
   const body = document.createElement('div')
    // Create header element
    const header = document.createElement('header');
    header.classList.add('w-full', 'bg-white', 'sticky', 'top-0');

// Create first div
    const div1 = document.createElement('div');
    div1.classList.add('w-full', 'flex', 'px-6', 'py-4', 'gap-4', 'items-center');

// Create image element
    const img = document.createElement('img');
    img.src = '/public/icon/man.png';
    img.alt = '';

// Create second div
    const div2 = document.createElement('div');
    div2.classList.add('flex-grow');

// Create first paragraph
    const p1 = document.createElement('p');
    p1.classList.add('text-gray-600', 'font-medium');
    p1.textContent = 'Good Morning 👋';

// Create second paragraph with ID
    const p2 = document.createElement('p');
    p2.classList.add('text-black', 'font-medium');
    p2.id = 'username';
    p2.textContent = `${user?.data.username}`;

// Append paragraphs to the second div
    div2.appendChild(p1);
    div2.appendChild(p2);

// Create first button with SVG
    const button1 = document.createElement('button');
    button1.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="23" viewBox="0 0 24 23" fill="none">
        <!-- SVG path data -->
        <g clip-path="url(#clip0_1_2379)">
            <path d="M12 22.0688C12.7956 22.0688 13.5587 21.7782 14.1213 21.2608C14.6839 20.7435 15 20.0418 15 19.3102H9C9 20.0418 9.31607 20.7435 9.87868 21.2608C10.4413 21.7782 11.2044 22.0688 12 22.0688ZM12 2.64538L10.8045 2.86745C9.44844 3.12152 8.2295 3.79863 7.35398 4.78417C6.47846 5.76971 6.00015 7.00315 6 8.27573C6 9.14193 5.799 11.3061 5.3115 13.4371C5.0715 14.495 4.7475 15.5971 4.317 16.5516H19.683C19.2525 15.5971 18.93 14.4964 18.6885 13.4371C18.201 11.3061 18 9.14193 18 8.27573C17.9995 7.00339 17.521 5.77028 16.6455 4.78502C15.7701 3.79976 14.5513 3.12285 13.1955 2.86883L12 2.644V2.64538ZM21.33 16.5516C21.6645 17.1681 22.0515 17.6564 22.5 17.9309H1.5C1.9485 17.6564 2.3355 17.1681 2.67 16.5516C4.02 14.0688 4.5 9.48952 4.5 8.27573C4.5 4.9378 7.08 2.15159 10.5075 1.51573C10.4866 1.32394 10.5096 1.13024 10.5751 0.947137C10.6405 0.76403 10.747 0.595574 10.8876 0.452634C11.0283 0.309694 11.1999 0.195443 11.3915 0.11725C11.5831 0.0390565 11.7904 -0.00134277 12 -0.00134277C12.2096 -0.00134277 12.4169 0.0390565 12.6085 0.11725C12.8001 0.195443 12.9717 0.309694 13.1124 0.452634C13.253 0.595574 13.3595 0.76403 13.4249 0.947137C13.4904 1.13024 13.5134 1.32394 13.4925 1.51573C15.1879 1.83283 16.7121 2.67898 17.8069 3.9109C18.9016 5.14282 19.4998 6.68479 19.5 8.27573C19.5 9.48952 19.98 14.0688 21.33 16.5516Z" fill="#212529"/>
            </g>
            <defs>
            <clipPath id="clip0_1_2379">
            <rect width="24" height="22.069" fill="white"/>
            </clipPath>
            </defs>
    </svg>
`;

// Create second button with SVG
    const button2 = document.createElement('button');
    button2.innerHTML = `
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
`;

// Append buttons to the first div
    div1.appendChild(img);
    div1.appendChild(div2);
    div1.appendChild(button1);
    div1.appendChild(button2);

// Create third div
    const div3 = document.createElement('div');
    div3.classList.add('w-full');

// Create inner div with search elements
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('px-6', 'py-4', 'flex', 'items-center', 'gap-1' );
    const form = document.createElement('form');
    form.className = 'px-3 py-2 flex w-full gap-2 bg-[#FAFAFA] rounded-lg'
// Create search button with SVG
    const searchButton = document.createElement('button');
    searchButton.id = 'btn-search';
    searchButton.innerHTML = `
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
`;

// Create search input field
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('border-none', 'outline-none', 'bg-[#FAFAFA]');
    searchInput.placeholder = 'search';
    searchInput.id = 'search';
    searchInput.addEventListener('input' , ()=>{
        debounce(async ()=>{
            if (!searchInput.value){
                wrapperSearch.classList.add('hidden')
                return
            }
            const result = await  search(searchInput.value , 1)
            renderItemSearch(result.data)

        } , 2000);
    })

// Append search button and input to the inner div
    form.appendChild(searchButton);
    form.appendChild(searchInput);
    form.addEventListener('submit' , (e)=>{
        e.preventDefault()
        navigate(`/search?search=${searchInput.value}`)
    })
    innerDiv.appendChild(form)
// Append inner div to the third div
    div3.appendChild(innerDiv);

// Create wrapper for search results
    const wrapperSearch = document.createElement('div');
    wrapperSearch.classList.add('w-screen', 'absolute', 'px-6', 'overflow-x-auto', 'bg-white', 'hidden' , 'shadow-lg');
    wrapperSearch.id = 'wrapper-search';

// Create search item div
    const searchItemDiv = document.createElement('div');
    searchItemDiv.classList.add('w-screen', 'bg-white', 'flex', 'gap-5', 'items-center', 'overflow-x-scroll');
    searchItemDiv.id = 'search-item';

// Append search item div to the wrapper
    wrapperSearch.appendChild(searchItemDiv);

// Create last div for filters
    const lastDiv = document.createElement('div');
    lastDiv.classList.add('w-full', 'flex', 'flex-col', 'gap-2');

// Create inner div for filter section
    const innerDivFilter = document.createElement('div');
    innerDivFilter.classList.add('w-full', 'px-6', 'py-2', 'flex', 'justify-between');

// Create heading for filters
    const heading = document.createElement('h3');
    heading.classList.add('text-xl', 'font-medium');
    heading.textContent = 'Most Popular';

// Create "See All" paragraph
    const seeAllParagraph = document.createElement('p');
    seeAllParagraph.classList.add('text-lg', 'font-medium');
    seeAllParagraph.textContent = 'See All';

// Append heading and "See All" to inner div filter
    innerDivFilter.appendChild(heading);
    innerDivFilter.appendChild(seeAllParagraph);

// Create div for filter items
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('w-full', 'overflow-x-scroll', 'flex', 'items-center', 'gap-3', 'py-1', 'px-4');
    filterDiv.id = 'filter';
    filterDiv.append(...renderBrand(brandLIst))
// Append inner div filter and filter div to the last div
    lastDiv.appendChild(innerDivFilter);
    lastDiv.appendChild(filterDiv);
// Append all created elements to the header
    header.appendChild(div1);
    header.appendChild(div3);
    header.appendChild(wrapperSearch);
    header.appendChild(lastDiv);

// Append the header to the body or any desired parent element
    body.appendChild(header);
    // create main div
    const main = document.createElement('div');
    main.id = 'main';
    main.className = 'w-full flex flex-wrap gap-3 items-center justify-center overflow-y-scroll max-h-screen'
    main.append(...renderProduct(listSneeker))
    main.addEventListener('scrollend' , async ()=>{
        if (page > totalPage) return
        if(window.scrollY + window.innerHeight >= main.scrollWidth){
           if(isFilter) {
              const list = await filter(filterBrand , page)
               console.log(list)
               main.append(...renderProduct(list.data))
               page++
               return
           }
            const list =  await getSneeker(page)
            main.append(...renderProduct(list.data))
            page++
        }
    })
    body.appendChild(main);
    const footer = document.createElement('footer')
    footer.className = 'sticky bottom-0 bg-white w-full py-3 px-12 flex gap-8'
    const btnHome = document.createElement('button')
    btnHome.className = 'flex flex-col items-center after:w-full after:h-0.5 after:bg-green-500'
    btnHome.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9.75 21.75V16.4925C9.75 16.125 10.125 15.75 10.5 15.75H13.5C13.875 15.75 14.25 16.125 14.25 16.5V21.75C14.25 21.9489 14.329 22.1397 14.4697 22.2803C14.6103 22.421 14.8011 22.5 15 22.5H21C21.1989 22.5 21.3897 22.421 21.5303 22.2803C21.671 22.1397 21.75 21.9489 21.75 21.75V11.25C21.7502 11.1514 21.7309 11.0538 21.6933 10.9627C21.6558 10.8716 21.6006 10.7888 21.531 10.719L19.5 8.6895V3.75C19.5 3.55109 19.421 3.36032 19.2803 3.21967C19.1397 3.07902 18.9489 3 18.75 3H17.25C17.0511 3 16.8603 3.07902 16.7197 3.21967C16.579 3.36032 16.5 3.55109 16.5 3.75V5.6895L12.531 1.719C12.4613 1.64915 12.3786 1.59374 12.2875 1.55593C12.1963 1.51812 12.0987 1.49866 12 1.49866C11.9014 1.49866 11.8037 1.51812 11.7126 1.55593C11.6214 1.59374 11.5387 1.64915 11.469 1.719L2.469 10.719C2.3994 10.7888 2.34423 10.8716 2.30665 10.9627C2.26908 11.0538 2.24983 11.1514 2.25 11.25V21.75C2.25 21.9489 2.32902 22.1397 2.46967 22.2803C2.61032 22.421 2.80109 22.5 3 22.5H9C9.19891 22.5 9.38968 22.421 9.53033 22.2803C9.67098 22.1397 9.75 21.9489 9.75 21.75Z" fill="#212529"/>
            </svg>
            <p class="text-xs">
              Home
     </p>
    `
    btnHome.addEventListener('click', () =>navigate(''))
    const btnCart = document.createElement('button')
    btnCart.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V6H8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5ZM17.25 6V5.25C17.25 3.85761 16.6969 2.52226 15.7123 1.53769C14.7277 0.553123 13.3924 0 12 0C10.6076 0 9.27226 0.553123 8.28769 1.53769C7.30312 2.52226 6.75 3.85761 6.75 5.25V6H1.5V21C1.5 21.7956 1.81607 22.5587 2.37868 23.1213C2.94129 23.6839 3.70435 24 4.5 24H19.5C20.2956 24 21.0587 23.6839 21.6213 23.1213C22.1839 22.5587 22.5 21.7956 22.5 21V6H17.25ZM3 7.5H21V21C21 21.3978 20.842 21.7794 20.5607 22.0607C20.2794 22.342 19.8978 22.5 19.5 22.5H4.5C4.10218 22.5 3.72064 22.342 3.43934 22.0607C3.15804 21.7794 3 21.3978 3 21V7.5Z" fill="#212529"/>
            </svg>
            <p class="text-xs">
              Cart
            </p>
    `
    btnCart.addEventListener('click', () => navigate('/Cart'))
    footer.append(btnHome , btnCart)
    const btnOrder = document.createElement('button')
    btnOrder.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M0 3.75C0 3.55109 0.0790176 3.36032 0.21967 3.21967C0.360322 3.07902 0.551088 3 0.75 3H3C3.1673 3.00005 3.32978 3.05603 3.4616 3.15904C3.59342 3.26205 3.68701 3.40618 3.7275 3.5685L4.335 6H21.75C21.8639 6.00003 21.9763 6.02602 22.0787 6.07598C22.1811 6.12594 22.2708 6.19857 22.3409 6.28836C22.411 6.37814 22.4598 6.48272 22.4834 6.59416C22.5071 6.7056 22.5051 6.82096 22.4775 6.9315L20.2275 15.9315C20.187 16.0938 20.0934 16.238 19.9616 16.341C19.8298 16.444 19.6673 16.5 19.5 16.5H6C5.8327 16.5 5.67022 16.444 5.5384 16.341C5.40658 16.238 5.31299 16.0938 5.2725 15.9315L2.415 4.5H0.75C0.551088 4.5 0.360322 4.42098 0.21967 4.28033C0.0790176 4.13968 0 3.94891 0 3.75ZM4.71 7.5L6.585 15H18.915L20.79 7.5H4.71ZM7.5 19.5C7.10218 19.5 6.72064 19.658 6.43934 19.9393C6.15804 20.2206 6 20.6022 6 21C6 21.3978 6.15804 21.7794 6.43934 22.0607C6.72064 22.342 7.10218 22.5 7.5 22.5C7.89782 22.5 8.27936 22.342 8.56066 22.0607C8.84196 21.7794 9 21.3978 9 21C9 20.6022 8.84196 20.2206 8.56066 19.9393C8.27936 19.658 7.89782 19.5 7.5 19.5ZM4.5 21C4.5 20.2044 4.81607 19.4413 5.37868 18.8787C5.94129 18.3161 6.70435 18 7.5 18C8.29565 18 9.05871 18.3161 9.62132 18.8787C10.1839 19.4413 10.5 20.2044 10.5 21C10.5 21.7956 10.1839 22.5587 9.62132 23.1213C9.05871 23.6839 8.29565 24 7.5 24C6.70435 24 5.94129 23.6839 5.37868 23.1213C4.81607 22.5587 4.5 21.7956 4.5 21ZM18 19.5C17.6022 19.5 17.2206 19.658 16.9393 19.9393C16.658 20.2206 16.5 20.6022 16.5 21C16.5 21.3978 16.658 21.7794 16.9393 22.0607C17.2206 22.342 17.6022 22.5 18 22.5C18.3978 22.5 18.7794 22.342 19.0607 22.0607C19.342 21.7794 19.5 21.3978 19.5 21C19.5 20.6022 19.342 20.2206 19.0607 19.9393C18.7794 19.658 18.3978 19.5 18 19.5ZM15 21C15 20.2044 15.3161 19.4413 15.8787 18.8787C16.4413 18.3161 17.2044 18 18 18C18.7956 18 19.5587 18.3161 20.1213 18.8787C20.6839 19.4413 21 20.2044 21 21C21 21.7956 20.6839 22.5587 20.1213 23.1213C19.5587 23.6839 18.7956 24 18 24C17.2044 24 16.4413 23.6839 15.8787 23.1213C15.3161 22.5587 15 21.7956 15 21Z" fill="#212529"/>
            </svg>
            <p class="text-xs">
              Orders
            </p>
    `
    const btnWallet = document.createElement('button');
    btnWallet.innerHTML = `
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clip-path="url(#clip0_40_9727)">
                <path d="M18.204 0.489006C18.5356 0.406061 18.8817 0.399753 19.2161 0.470561C19.5505 0.541369 19.8644 0.687431 20.1339 0.89766C20.4034 1.10789 20.6214 1.37676 20.7715 1.68385C20.9216 1.99095 20.9997 2.3282 21 2.67001V4.50001H21.75C22.3467 4.50001 22.919 4.73706 23.341 5.15902C23.7629 5.58097 24 6.15327 24 6.75001V20.25C24 20.8467 23.7629 21.419 23.341 21.841C22.919 22.263 22.3467 22.5 21.75 22.5H2.25C1.65326 22.5 1.08097 22.263 0.65901 21.841C0.237053 21.419 1.47137e-07 20.8467 1.47137e-07 20.25V6.75001C-0.000209191 6.17079 0.222964 5.6138 0.623066 5.19498C1.02317 4.77616 1.56938 4.52776 2.148 4.50151L18.204 0.489006ZM8.343 4.50001H19.5V2.67001C19.4997 2.55621 19.4736 2.44396 19.4235 2.34177C19.3735 2.23958 19.3008 2.15012 19.2111 2.08016C19.1213 2.01021 19.0168 1.96159 18.9055 1.938C18.7941 1.91441 18.6789 1.91647 18.5685 1.94401L8.343 4.50001ZM2.25 6.00001C2.05109 6.00001 1.86032 6.07902 1.71967 6.21968C1.57902 6.36033 1.5 6.55109 1.5 6.75001V20.25C1.5 20.4489 1.57902 20.6397 1.71967 20.7803C1.86032 20.921 2.05109 21 2.25 21H21.75C21.9489 21 22.1397 20.921 22.2803 20.7803C22.421 20.6397 22.5 20.4489 22.5 20.25V6.75001C22.5 6.55109 22.421 6.36033 22.2803 6.21968C22.1397 6.07902 21.9489 6.00001 21.75 6.00001H2.25Z" fill="#212529"/>
              </g>
              <defs>
                <clipPath id="clip0_40_9727">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <p class="text-xs">
              Wallet
            </p>
    `
    const btnProfile = document.createElement('button')
    btnProfile.innerHTML = `
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12ZM15 7.5C15 8.29565 14.6839 9.05871 14.1213 9.62132C13.5587 10.1839 12.7956 10.5 12 10.5C11.2044 10.5 10.4413 10.1839 9.87868 9.62132C9.31607 9.05871 9 8.29565 9 7.5C9 6.70435 9.31607 5.94129 9.87868 5.37868C10.4413 4.81607 11.2044 4.5 12 4.5C12.7956 4.5 13.5587 4.81607 14.1213 5.37868C14.6839 5.94129 15 6.70435 15 7.5ZM21 19.5C21 21 19.5 21 19.5 21H4.5C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5ZM19.5 19.494C19.4985 19.125 19.269 18.015 18.252 16.998C17.274 16.02 15.4335 15 12 15C8.565 15 6.726 16.02 5.748 16.998C4.731 18.015 4.503 19.125 4.5 19.494H19.5Z" fill="#212529"/>
            </svg>
            <p class="text-xs">
              Profile
            </p>
    `
    btnCart.className = 'flex flex-col items-center'
    btnProfile.className = 'flex flex-col items-center'
    btnOrder.className = 'flex flex-col items-center'
    btnWallet.className = 'flex flex-col items-center'
    footer.append(btnHome , btnCart , btnOrder  ,btnWallet , btnProfile)
    body.appendChild(footer)
    return body
}


import {Axios} from "../../api/axios.ts";
import {navigate} from "../../router.ts";
import {createElement} from "../../utils/Element.ts";
import {getUser} from "../../api/getUser.ts";
import {token} from "../../utils/getToken.ts";
import {setToken} from "../../utils/setToken.ts";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
const isLogin = async () =>{
    const res = await getUser()
    if (res?.status === 200){
        navigate('')
    }
}

 const handleLogin = async () =>{
    try {
        const inpUsername = <HTMLInputElement>document.getElementById('username')
        const inpPassword = <HTMLInputElement>document.getElementById('password')
        const obj : login = {
            username : inpUsername.value,
            password : inpPassword.value
        }
        const response   =  await  Axios({
            url : 'auth/login' ,
            method: "POST",
            headers : {
                Authorization : token()
            },
            data : obj
        })
        await setToken(response.data.token)
        if (response.status === 201) {
            navigate('')
        }

    }catch (e : any) {
        console.log(e)
        Toastify({
            text : e.response.data.message ,
            gravity : 'top' ,
            position : 'right' ,
            style : {
                background: "#fd1d1d"
            }
        }).showToast()
    }
}
export  const loginTemplate = async () : Promise<Node> =>{
  await  isLogin()
        const body = createElement({
            tag : 'div'
        })
    const headerElement = document.createElement('header');
    headerElement.setAttribute('class', 'w-full flex items-center px-6 py-3');

    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', '/public/icon/arrow-left-short.svg');
    imgElement.setAttribute('alt', '');

    headerElement.appendChild(imgElement);

    const containerElement = document.createElement('div');
    containerElement.setAttribute('class', 'container mx-auto');

    const flexContainerElement = document.createElement('div');
    flexContainerElement.setAttribute('class', 'w-full flex items-center justify-center h-56');

    const logoImgElement = document.createElement('img');
    logoImgElement.setAttribute('src', '/public/icon/logo.svg');
    logoImgElement.setAttribute('alt', '');

    flexContainerElement.appendChild(logoImgElement);
    containerElement.appendChild(flexContainerElement);

    const titleElement = document.createElement('div');
    titleElement.setAttribute('class', 'w-full flex justify-center');

    const h1Element = document.createElement('h1');
    h1Element.setAttribute('class', 'text-3xl font-bold');
    h1Element.innerText = 'Login to Your Account';
    titleElement.appendChild(h1Element);
    containerElement.appendChild(titleElement);
    // Continue creating other elements and appending them as needed...
    const formElement = document.createElement('form');
    formElement.setAttribute('class', 'w-full h-full p-6 mt-6 flex flex-col');
    formElement.setAttribute('id', 'form-login');

    const usernameWrapper = document.createElement('div');
    usernameWrapper.setAttribute('class', 'py-2 px-3 bg-gray-100 rounded-md flex gap-1 items-center mb-5');

    const usernameIcon = document.createElement('svg');
    usernameIcon.setAttribute('height', '14');
    usernameIcon.setAttribute('width', '14');
    usernameIcon.setAttribute('version', '1.1');
    usernameIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    usernameIcon.setAttribute('fill', '#ffffff');
    usernameIcon.setAttribute('stroke', '#ffffff');
    usernameIcon.innerHTML = '<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style="fill:#6C757D;" cx="7" cy="7" rx="7" ry="7"></ellipse> <path style="fill:#6C757D;" d="M11.25 14.5H2.75C2.05964 14.5 1.5 13.9404 1.5 13.25V2.75C1.5 2.05964 2.05964 1.5 2.75 1.5H11.25C11.9404 1.5 12.5 2.05964 12.5 2.75V13.25C12.5 13.9404 11.9404 14.5 11.25 14.5Z"></path> </g> </g> </g></svg>';

    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('id', 'username');
    usernameInput.setAttribute('name', 'username');
    usernameInput.setAttribute('class', 'bg-gray-100 outline-none border-none');
    usernameInput.setAttribute('placeholder', 'username');

    usernameWrapper.appendChild(usernameIcon);
    usernameWrapper.appendChild(usernameInput);
    formElement.appendChild(usernameWrapper);

    const passwordWrapper = document.createElement('div');
    passwordWrapper.setAttribute('class', 'py-2 px-3 bg-gray-100 rounded-md flex gap-1 items-center mb-5 flex-grow');

    const passwordIcon = document.createElement('svg');
    passwordIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    passwordIcon.setAttribute('width', '14');
    passwordIcon.setAttribute('height', '15');
    passwordIcon.setAttribute('viewBox', '0 0 14 15');

    passwordIcon.innerHTML = '<g clip-path="url(#clip0_1_12324)"><path d="M2.1875 8.375C2.1875 7.91087 2.37187 7.46575 2.70006 7.13756C3.02825 6.80937 3.47337 6.625 3.9375 6.625H10.0625C10.5266 6.625 10.9717 6.80937 11.2999 7.13756C11.6281 7.46575 11.8125 7.91087 11.8125 8.375V12.75C11.8125 13.2141 11.6281 13.6592 11.2999 13.9874C10.9717 14.3156 10.5266 14.5 10.0625 14.5H3.9375C3.47337 14.5 3.02825 14.3156 2.70006 13.9874C2.37187 13.6592 2.1875 13.2141 2.1875 12.75V8.375Z" fill="#6C757D"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.9375 4C3.9375 3.18777 4.26016 2.40882 4.83449 1.83449C5.40882 1.26016 6.18777 0.9375 7 0.9375C7.81223 0.9375 8.59118 1.26016 9.16551 1.83449C9.73984 2.40882 10.0625 3.18777 10.0625 4V6.625H9.1875V4C9.1875 3.41984 8.95703 2.86344 8.5468 2.4532C8.13656 2.04297 7.58016 1.8125 7 1.8125C6.41984 1.8125 5.86344 2.04297 5.4532 2.4532C5.04297 2.86344 4.8125 3.41984 4.8125 4V6.625H3.9375V4Z" fill="#6C757D"></path></g><defs><clipPath id="clip0_1_12324"><rect width="14" height="14" fill="white" transform="translate(0 0.5)"></rect></clipPath></defs></svg>';

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('name', 'password');
    passwordInput.setAttribute('id', 'password');
    passwordInput.setAttribute('class', 'bg-gray-100 outline-none border-none flex-grow');
    passwordInput.setAttribute('placeholder', 'password');

    const showPassButton = document.createElement('button');
    showPassButton.setAttribute('id', 'showPass');
    showPassButton.setAttribute('type', 'button');

    const showPassIcon = document.createElement('svg');
    showPassIcon.setAttribute('width', '20');
    showPassIcon.setAttribute('height', '20');
    showPassIcon.setAttribute('viewBox', '0 0 24 24');
    showPassIcon.setAttribute('fill', 'none');
    showPassIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    showPassIcon.innerHTML = '<path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="12" cy="12" r="3" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>';
    showPassButton.appendChild(showPassIcon);
    passwordWrapper.appendChild(passwordIcon);
    passwordWrapper.appendChild(passwordInput);
    passwordWrapper.appendChild(showPassButton);
    formElement.appendChild(passwordWrapper);
    const signUpLink = document.createElement('div');
    signUpLink.setAttribute('class', 'w-full flex items-center justify-around');
    const p = document.createElement('p')
    p.innerText = 'Don\'t have a sub account?'
    p.className = 'font-medium'
    signUpLink.appendChild(p)
    const signUpAnchor = document.createElement('button');
    signUpAnchor.setAttribute('class', 'text-lg font-medium');
    signUpAnchor.innerText = 'sign up';
    signUpAnchor.type = 'button'
    signUpAnchor.addEventListener('click', () =>{
        navigate('/signup');
    })
    signUpLink.appendChild(signUpAnchor);
    formElement.appendChild(signUpLink);
    const loginButton = document.createElement('button');
    loginButton.setAttribute('class', 'bg-black rounded-full w-full flex items-center justify-center font-medium text-white py-4 mt-20');
    loginButton.innerText = 'login';
    formElement.appendChild(loginButton);
    formElement.addEventListener('submit' , async (e)=>{
        e.preventDefault();

       await handleLogin()
    })
    containerElement.appendChild(formElement)
    body.append(headerElement , containerElement)




    return body;
}
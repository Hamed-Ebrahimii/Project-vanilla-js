import {navigate} from "../../router.ts";
import {signup} from "../../api/signup.ts";


const handleSubmit = () =>{

    const  usernameInp  = <HTMLInputElement>document.getElementById('username');
    const errorUsername = <HTMLDivElement>document.getElementById('error-username');
    const passwordInp = <HTMLInputElement>document.getElementById('password');
    const errorPassword = <HTMLDivElement>document.getElementById('error-password');
    const repeatPassword = <HTMLInputElement>document.getElementById('repeatPassword');
    const errorRepeatPassword = <HTMLDivElement>document.getElementById('error-repeatPassword');
    if (!usernameInp.value){
        errorUsername.innerText = 'Please enter a username '
        errorUsername.classList.remove('hidden')
    }
   else if (usernameInp.value.length < 5){
        errorUsername.innerText = ''
        errorUsername.innerText += 'user name must be at least 5 characters'
        usernameInp.classList.remove('hidden')
    }
   else {
       errorUsername.classList.add('hidden')
    }
    if (!passwordInp.value){
        errorPassword.innerText = 'Please enter a password'
        errorPassword.classList.remove('hidden')
    }
   else if (passwordInp.value.length < 5){
        errorPassword.innerText = ''
        errorPassword.innerText = 'password must be at least 5 characters'
        errorPassword.classList.remove('hidden')
    }
   else if (!passwordInp.value.includes('@' || '!' || '$' || '%' || '&' || '*' )){
        errorPassword.innerText = 'password is not a strong'
        errorPassword.classList.remove('hidden')
    }
    else {
        errorPassword.classList.add('hidden')
    }
     if(passwordInp.value !== repeatPassword.value){
        errorRepeatPassword.innerText = 'password and repeat password are not the same'
         errorRepeatPassword.classList.remove('hidden')
    }
     else {
         errorRepeatPassword.classList.add('hidden')
     }
    if (usernameInp.value && passwordInp.value && repeatPassword.value) {
        try{
            const user : login ={
                username : usernameInp.value ,
                password : passwordInp.value
            }
            signup(user)
            navigate('login')
        }catch (e) {
            console.log(e)
        }

    }
}
export const signUpTemplate = async (): Promise<Node> => {
    const body = document.createElement('div')
    // Create header element
    const headerElement = document.createElement('header');
    headerElement.className = 'w-full flex items-center px-6 py-3';

// Create img element
    const imgElement = document.createElement('img');
    imgElement.src = '/public/icon/arrow-left-short.svg';
    imgElement.alt = '';

// Append img to header
    headerElement.appendChild(imgElement);

// Create container element
    const containerElement = document.createElement('div');
    containerElement.className = 'container mx-auto';

// Create flex container element
    const flexContainerElement = document.createElement('div');
    flexContainerElement.className = 'w-full flex items-center justify-center h-48';

// Create logo img element
    const logoImgElement = document.createElement('img');
    logoImgElement.src = '/public/icon/logo.svg';
    logoImgElement.alt = '';

// Append logo img to flex container
    flexContainerElement.appendChild(logoImgElement);

// Append flex container to container
    containerElement.appendChild(flexContainerElement);

// Create title element
    const titleElement = document.createElement('div');
    titleElement.className = 'w-full flex justify-center';

// Create h1 element
    const h1Element = document.createElement('h1');
    h1Element.className = 'text-3xl font-bold';
    h1Element.innerText = 'Sign up to Your Account';

// Append h1 to title
    titleElement.appendChild(h1Element);

// Create login form element
    const loginFormElement = document.createElement('form');
    loginFormElement.className = 'w-full h-full p-6 mt-3 flex flex-col';
    loginFormElement.id = 'form-login';

// Create signup form element
    const signupFormElement = document.createElement('form');
    signupFormElement.className = 'w-full h-full p-6 mt-3 flex flex-col';
    signupFormElement.id = 'form-sign';

// Function to create form input group
    const createFormGroup = (type : string, name : string, placeholder : string) => {
        const div = document.createElement('div');
        div.className = 'mb-3'
        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.name = name;
        inputElement.placeholder = placeholder;
        inputElement.className = 'bg-gray-100 outline-none border-none py-2 px-3 bg-gray-100 rounded-md w-full';
        inputElement.id = name;
        div.appendChild(inputElement)
        const errorElement = document.createElement('div');
        errorElement.className = 'w-full  rounded-lg bg-red-500 text-white mt-3 py-1 px-2 hidden transition-all'
        errorElement.id = `error-${name}`
        div.appendChild(errorElement)
        return div;
    };

// Create form groups for login form
    const loginUsernameGroupElement = createFormGroup('text', 'username', 'username');
    const loginPasswordGroupElement = createFormGroup('password', 'password', 'password');

// Append form groups to login form
    loginFormElement.appendChild(loginUsernameGroupElement);
    loginFormElement.appendChild(loginPasswordGroupElement);

// Create form groups for signup form
    const signupUsernameGroupElement = createFormGroup('text', 'username', 'username');
    const signupPasswordGroupElement = createFormGroup('password', 'password', 'password');
    const signupRepeatPasswordGroupElement = createFormGroup('password', 'repeatPassword', 'repeat password');
    const navigation = document.createElement('div')
    navigation.className = 'w-full flex items-center justify-around'
    const p = document.createElement('p')
    p.className = 'font-medium'
    p.innerHTML = 'Do you have a sub account?'
    const btnLogin = document.createElement('button')
    btnLogin.className=  'font-medium'
    btnLogin.innerHTML = 'Login'
    btnLogin.type = 'button'
    btnLogin.addEventListener('click', () =>{
        navigate('login')
    })
    navigation.append(p , btnLogin)
// Append form groups to signup form
    signupFormElement.appendChild(signupUsernameGroupElement);
    signupFormElement.appendChild(signupPasswordGroupElement);
    signupFormElement.appendChild(signupRepeatPasswordGroupElement);
    signupFormElement.appendChild(navigation)

// Create button for both forms
    const buttonElement = document.createElement('button');
    buttonElement.className = 'bg-black rounded-full w-full flex items-center justify-center font-medium text-white py-4 mt-20';

// Set button text based on the current form
    buttonElement.innerText = 'login';

// Append button to both forms
    loginFormElement.appendChild(buttonElement.cloneNode(true));
    signupFormElement.appendChild(buttonElement);
   signupFormElement.addEventListener('submit' , (e) => {
       e.preventDefault()
       handleSubmit()
       console.log('ok')
   })
// Append elements to the body
    body.appendChild(headerElement);
    body.appendChild(containerElement);
    body.appendChild(titleElement);
    body.appendChild(signupFormElement);

    return body;
}
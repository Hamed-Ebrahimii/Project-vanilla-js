export const setToken = async (token: string) =>{
   await sessionStorage.setItem('token', token);
}
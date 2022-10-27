export const getToken = () => {
    return localStorage.getItem('XYGTOKEN');
}

export const setToken = (token)=>{
    localStorage.setItem('XYGTOKEN',token);
}

export const removeToken = ()=>{
    localStorage.removeItem('XYGTOKEN');
}
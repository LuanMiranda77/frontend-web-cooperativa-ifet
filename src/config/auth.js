
export let TOKEN_KEY = null;


export const isAuthenticated = () => sessionStorage.getItem('@TOKEN_KEY') !== null;
// export const isAuthenticated = () => true;


export const getToken = () => sessionStorage.getItem('@TOKEN_KEY');


export const login = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};


export const logout = () => {
  TOKEN_KEY = null;
  sessionStorage.removeItem(TOKEN_KEY);
};
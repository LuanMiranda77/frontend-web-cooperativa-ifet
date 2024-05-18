
export let TOKEN_KEY = null;


export const isAuthenticated = () => sessionStorage.getItem("@user-data") !== null;
// export const isAuthenticated = () => true;


export const getToken = () => sessionStorage.getItem("@user-data");


export const saveToken = token => {
  sessionStorage.setItem(TOKEN_KEY, token);
};


export const delToken = () => {
  TOKEN_KEY = null;
  sessionStorage.removeItem(TOKEN_KEY);
};

export function persistLocalStorage<T>(key: string, initialState: T, comando: 'get' | 'set' | 'remove')  {

    
    if(comando === 'get'){
        const localStorageValue = localStorage.getItem(key);
        if(localStorageValue){
            return JSON.parse(localStorageValue);
        }
    }
    else if(comando === 'set'){
        localStorage.setItem(key, JSON.stringify(initialState));
    }else if(comando === 'remove'){
        localStorage.removeItem(key);
    }else{
        // eslint-disable-next-line no-throw-literal
        throw 'Comando errado somente é aceito get | set | remove';
    }
}

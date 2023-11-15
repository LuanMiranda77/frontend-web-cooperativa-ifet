
import {useState, useEffect, Dispatch, SetStateAction} from 'react';

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>,
];

function usePersistState<T>(key: string, initialState: T) : Response<T> {
    const [state, setState] = useState(()=>{
        const localStorageValue = localStorage.getItem(key);
        if(localStorageValue){
            return JSON.parse(localStorageValue);
        }else{
            return initialState;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    },[key, state]);

    return [state, setState];
}

export default  usePersistState;
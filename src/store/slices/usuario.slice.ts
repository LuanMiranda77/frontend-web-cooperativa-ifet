import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAplicationType } from '../../domain/types/user_aplication';
import { RootState } from '../index.store';

export const initialState = {
    id:0,
    name: '',
    cpf:'',
    email: '',
    dateCreate: null ,
    dateUpdate: null ,
    lastName:'',
    acesso: null,
    status: 'S',
    password:'',
    celular: '',
    cargo: null,
    roles: '',
    userName:'',
    estabelecimento: null,
    // isOpenModal:false
}

export const usuarioSlice = createSlice({
    name:'user-aplication',
    initialState: initialState, 
    reducers:{
        load(state, action: PayloadAction<any>){
            return state = {...action.payload}
        },

        saveUser(state, action: PayloadAction<any>){
            return state = {...action.payload}
        },

        reset(state){
            return state = {...initialState};
        },

    }
});
export const {saveUser, load,  reset } = usuarioSlice.actions;
export const selectStateUser = (state: RootState) => state.userAplication;
export default usuarioSlice.reducer;

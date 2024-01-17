import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAplicationType } from '../../domain/types/user_aplication';
import { RootState } from '../index.store';

export const initialState = {
    codigo:0,
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
}

export const usuarioSlice = createSlice({
    name:'user-aplication',
    initialState: initialState, 
    reducers:{
        load(state, action: PayloadAction<any>){
            return state = {...action.payload}
        },

        save(state, action: PayloadAction<any>){
            state = {...action.payload}
        },

        reset(state){
            state = {...initialState};
        },

    }
});
export const {save, load,  reset } = usuarioSlice.actions;
export const selectStateUser = (state: RootState) => state.userAplication;
export default usuarioSlice.reducer;

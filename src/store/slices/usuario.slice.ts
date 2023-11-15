import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAplicationType } from '../../domain/types/user_aplication';
import { RootState } from '../index.store';

export const initialState = {
    codigo:0,
    nome: '',
    cpf:'',
    email: '',
    dataCriacao: null ,
    dataAtualizacao: null ,
    acesso: null,
    status: 'S',
    password:'',
    celular: '',
    cargo: null,
    roles: '',
    estabelecimento: null,
}as UserAplicationType

export const usuarioSlice = createSlice({
    name:'user-aplication',
    initialState: initialState, 
    reducers:{
        load(state, action: PayloadAction<UserAplicationType>){
            return state = {...action.payload}
        },

        save(state, action: PayloadAction<UserAplicationType>){
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

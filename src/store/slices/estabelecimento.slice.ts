import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegimeTributario } from '../../domain/enums';
import { RootState } from '../index.store';
import { EstabelecimentoType } from './../../domain/types/estabelecimento';
// import { EstabelecimentoService } from './../../module/estabelecimento/pages/services/EstabelecimentoService';

export const initialState = {
    // id: undefined,
    cnpjCpf:'',
    instEstadual: '',
    instMunicipal: '',
    razao: '',
    name:'',
    cep:'',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    logo: '',
    codIbge:'',
    regime: RegimeTributario.MEI,
    email:'',
    email2:'',
    foneFixo: '',
    celular1: '',
    celular2: '',
    matrizId: '',
} as EstabelecimentoType;

// const service = new EstabelecimentoService();
const url='api/estabelecimento';

export const estabelecimentoSlice = createSlice({
    name:'estabelecimento',
    initialState: initialState,
    reducers:{

        load(state, action: PayloadAction<EstabelecimentoType>){
           return state = {...action.payload}
        },

        save(state, action: PayloadAction<EstabelecimentoType>){
             return state = {...action.payload}
        },

        reset(state){
            return state = {...initialState}
        },

        initial(){
            return initialState
        }
    }
});
export const {save, load, reset, initial } = estabelecimentoSlice.actions;
export const selectStateEstab = (state: RootState) => state.estabelecimento;
export default estabelecimentoSlice.reducer;

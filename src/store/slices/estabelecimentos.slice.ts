import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EstabelecimentoType } from '../../domain/types/estabelecimento';
import { RootState } from '../index.store';

const initialState = Array<EstabelecimentoType>();

export const estabelecimentosSlice = createSlice({
    name:'estabelecimento',
    initialState: initialState,
    reducers:{

        loadEstabelecimentos(state, action: PayloadAction<Array<EstabelecimentoType>>){
            return state = [...action.payload];
        },

        reset(state){
            return state = [...initialState];
        },
    }
});
export const {loadEstabelecimentos, reset } = estabelecimentosSlice.actions;
export const selectStateEstabelecimentos = (state: RootState) => state.estabelecimentos;
export default estabelecimentosSlice.reducer;

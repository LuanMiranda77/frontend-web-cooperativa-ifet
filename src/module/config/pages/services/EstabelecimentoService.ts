import { EstabelecimentoType } from '../../../../domain/types/estabelecimento';
import { api } from "../../../../config/api";
import { ConfigModuloType } from '../../../../domain/types/configModulo';

    //end-point da api
    const url='api/estabelecimento';
    const urlModo='api/modulo';

    //modelo de request post
    export  async function save(pEntity: EstabelecimentoType){
      const response = await api.post(url, pEntity).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }

    //modelo de request get
    export  async function  get(){
      const response = await api.get(url).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });
      return response;
    }

    export  async function  setStatus(id: number | undefined, status: string){
      const response = await api.put(url+`/status/${id}/${status}`).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });
      return response;
    }

    export  async function saveModulo(pEntity: ConfigModuloType){
      const response = await api.post(urlModo, pEntity).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }

    export  async function  getModulo(estabelecimento: number){
      const response = await api.get(urlModo+`/${estabelecimento}`).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });
      return response;
    }

    
  
import { api } from "../../../../config/api";

/**
*@Author
*@Issue
*/
export class PDVService {

    //end-point da api
    url='api/pdv';

    //modelo de request post
    async post(pEntity: String){
      const response = await api.post(this.url, pEntity).then( resp =>{
            return resp.data;
        })
        .catch(error => {
            console.log(error.response.data);
            return Promise.reject(error.response.data[0]);
        });;
      return response;
    }

    //modelo de request get
    async getCaxixa(){
      let resp = {dinheiro:1500, debito:200, credito:500, vale:150, diferenca:0, valorDigitado:0, status:0}
      return resp;
      // const response = await api.get(this.url).then( resp =>{
      //       return resp.data;
      //   })
      //   .catch(error => {
      //       console.log(error.response.data);
      //       return Promise.reject(error.response.data[0]);
      //   });
      // return response;
    }
    
  
}
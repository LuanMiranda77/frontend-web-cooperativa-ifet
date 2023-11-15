import { api } from "../../config/api";
import { EstabelecimentoType } from "../../domain";

const  url='api/upload';

export const UploadService = {

    // async post (estabelecimento: EstabelecimentoType, files: Array<File>){
    //   let objTO={estabelecimento:estabelecimento, files:  new Array<FormData>()}
    //   for (let f of files) {
    //         if (f && f.size < 5e6) {
    //         const formData = new FormData();
    //         formData.append('file', f);
    //         objTO.files.push(formData);  
    //         }
    //   }
    //   console.log(objTO);
    //    return await api.post(url, objTO);
    // }

    async post (estabelecimento: EstabelecimentoType, file: File){

        const formData = new FormData();
        formData.append('file', file);
        let teste = new File([], ""+estabelecimento.id);
        formData.append('estabelecimento', teste);
        return  await api.post(url, formData);

    }
}
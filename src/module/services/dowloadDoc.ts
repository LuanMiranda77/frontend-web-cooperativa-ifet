import { api } from "../../config/api";

const  url='api/download';

export const DowloadService = {
    async get(codigo: string, typeDocument: string, estabelecimentoID: number){
      return await api.get(`${url+'?c='+codigo+'&ct='+typeDocument+'&est='+estabelecimentoID}`);
    }
}
  // href="./CarregadorArquivos1?c=<%= arq.getCodigo() %>&ct=<%= arq.getContentType() %>"
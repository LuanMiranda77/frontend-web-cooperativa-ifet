import { toast } from "react-toastify";
import { api } from "../../../../config/api";
import { ProductType } from "../../../../domain/types/productType";

/**
 *@Author Luan Miranda
 *@Issue
 */
//end-point da api
const url = "api/produto";
export const ProductService = {
  //modelo de request post
  save: async (pEntity: ProductType): Promise<any> => {
    if (!Boolean(pEntity.name)) {
      return toast.error("Nome do produto é obrigatório");
    }
    if (!Boolean(pEntity.measure)) {
      return toast.error("Medida do produto é obrigatório");
    }
    return pEntity.id ? await api.put(`${url}?pID=${pEntity.id}`, pEntity) : await api.post(url, pEntity);
  },

  setStatus: async (pEntity: ProductType): Promise<any> =>{
    if(pEntity.status == "S")
        await api.put(`${url}/actived?pID=${pEntity.id}`)
    else if(pEntity.status == "N") 
        await api.put(`${url}/inactived?pID=${pEntity.id}`) 
  },

  findAll: async (estabelecimento: number): Promise<ProductType[]> => {
    return await api
      .get(`${url}/setor?pID=${estabelecimento}`)
      .then((resp) => resp.data)
      .catch((error) => error);
  },
};

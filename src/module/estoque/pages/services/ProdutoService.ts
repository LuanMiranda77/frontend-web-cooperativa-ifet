import { api } from "../../../../config/api";
import { ProdutoType } from "../../../../domain";

/**
 *@Author
 *@Issue
 */
//end-point da api
const url = "api/produto";
export const ProductService = {
  //modelo de request post
  save: async (pEntity: String): Promise<ProdutoType> => {
    return await api
      .post(url, pEntity)
      .then((resp) => resp.data)
      .catch((error) => error);
  },

  findAll: async (estabelecimento: number): Promise<ProdutoType[]> => {
    return await api
      .get(`${url}/estabelecimento/${estabelecimento}`)
      .then((resp) => resp.data)
      .catch((error) => error);
  },
};

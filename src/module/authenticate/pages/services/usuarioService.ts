import { api } from "../../../../config/api";
import { login, logout } from "../../../../config/auth";
import { UserAplicationType } from "../../../../domain";
import { Cargo } from "../../../../domain/enums";
import { UtilsUserLocal } from "../../../../utils/utils_userLocal";


/**
*@Author
*@Issue
*/
export class UsuarioService {

  url='api/usuario';
  auth='/token';
  erro='';

  public async login(pEntity : any) {
      const token = await api.post(this.auth, {email:process.env.REACT_APP_API_USER, password:process.env.REACT_APP_API_PASSWORD}).then(response =>{
          login(response.data);
          return response.data;
      });
      if(token){
         try{
          const response = await api.post(this.url+'/login', pEntity).then( resp =>{
              let userLogado = resp.data;
              userLogado.token = token;
              if(userLogado.cargo !== Cargo.MASTER){
                userLogado.estabelecimento = resp.data.estabelecimento.id;
              }
            //   persistLocalStorage<UserAplicationType>("@user-data", userLogado, 'set');
              UtilsUserLocal.setTokenLogin(userLogado);
              logout();
              return resp.data;
          })
          .catch(error => {
              return error.response.data[0] !== undefined ? Promise.reject(error.response.data[0]) : Promise.reject({mensagemUsuario:'Verifique o JWT'});
          });
          console.log(response);
          return response;
        }catch(error){
            return Promise.reject(error);
        }
      }
  }

  public async recuperarSenha(pEntity: any){
      const response = await api.post(this.url+'/recuperasenha', pEntity)
      .then( resp =>{
          return resp.data;
      })
      .catch(error => {
          return Promise.reject(error.response.data[0]);
      });
      return response;
  }

  public async trocarSenha(user: UserAplicationType){
      const response = await api.put(this.url+`/${user.id}`, user)
      .then( resp =>{
          return resp.data;
      })
      .catch(error => {
          console.log(error);
          return Promise.reject(error.response.data[0]);
      });
      return response;
  }

  public async save(user: UserAplicationType){
    const response = await api.post(this.url, user)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return response;
 }

 public async update(user: UserAplicationType){
    const response = await api.put(this.url, user)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return response;
 }

  public async getUsuarios(){
    const response = await api.get(this.url)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return Promise.resolve(response);
  }
  public async getUsuariosBySetor(estabelecimento: number){
    const response = await api.get(this.url+`/estabelecimento/${estabelecimento}`)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return Promise.resolve(response);
  }

  public async setStatus( id:number, status: string){
    const response = await api.put(this.url+`/status/${id}/${status}`)
    .then( resp =>{
        return resp.data;
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(error.response.data[0]);
    });
    return Promise.resolve(response);
  }
  
    
  
}
import { UserAplicationType } from '../domain/types/user_aplication';
import { persistLocalStorage } from './persistLocalStorage';

export class UtilsUserLocal{
    
    public static setTokenLogin(user: UserAplicationType){
        sessionStorage.setItem("@user-data", JSON.stringify(user));
    }

    public static getTokenLogin() : any {
        let json = sessionStorage.getItem("@user-data");
        let userLogado = ''
        if(json){
            userLogado = JSON.parse(json);
        }
        return userLogado;
    }

    public static logout(){
        // persistLocalStorage("@user-data", '', 'remove');
        // persistLocalStorage("@TOKEN_KEY", '', 'remove');
        sessionStorage.removeItem("@user-data");
    }

    private static  encrypt(dados: string){
        var result = "";
        for(let i=0;i<dados.length;i++){
          if(i<dados.length-1) {
              result+=dados.charCodeAt(i)+10;
              result+="-";
          } else{
              result+=dados.charCodeAt(i)+10;
          }
        }
        return result;
    }

    private  static decrypt(key: string){
        var result="";
        var array = key.split("-");
        for(let i=0;i<array.length;i++){
          result+=String.fromCharCode(Number(array[i])-10);
        }
        return result;
    }

    private static geraStringAleatoria(tamanho: number) {
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var stringAleatoria = '';
        for (var i = 0; i < tamanho; i++) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
}
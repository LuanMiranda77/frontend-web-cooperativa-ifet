import { Cargo } from '../domain/enums';
import { UserAplicationType } from '../domain/types/user_aplication';
import { persistLocalStorage } from './persistLocalStorage';

export class UtilsUserLocal{
    
    public static setTokenLogin(user: UserAplicationType){
        let data = this.encrypt(
        this.geraStringAleatoria(10)+'&'
        +user.id+"&"+this.geraStringAleatoria(5)+'&'
        +user.codigo+'&'+this.geraStringAleatoria(15)+'&'
        +user.cpf+'&'+this.geraStringAleatoria(20)+'&'
        +user.nome+'&'+this.geraStringAleatoria(25)+'&'
        +user.email+'&'+this.geraStringAleatoria(30)+'&'
        +user.dataCriacao+'&'+this.geraStringAleatoria(35)+'&'
        +user.dataAtualizacao+'&'+this.geraStringAleatoria(40)+'&'
        +user.acesso+'&'+this.geraStringAleatoria(45)+'&'
        +user.password+'&'+this.geraStringAleatoria(50)+'&'
        +user.celular+'&'+this.geraStringAleatoria(15)+'&'
        +user.cargo+'&'+this.geraStringAleatoria(20)+'&'
        +user.roles+'&'+this.geraStringAleatoria(15)+'&'
        +user.token+'&'+this.geraStringAleatoria(15)+'&'
        +user.status+"&"+this.geraStringAleatoria(8)+'&'
        +user.estabelecimento+"&"+this.geraStringAleatoria(8));
        // persistLocalStorage("@TOKEN_KEY", data, 'set');
        sessionStorage.setItem("@TOKEN_KEY", JSON.stringify(data));
    }

    public static getTokenLogin() : UserAplicationType {
        let key = sessionStorage.getItem("@TOKEN_KEY");
        let userLogado = {} as UserAplicationType;
        if(key != null){
            const array = this.decrypt(key).split('&');
            userLogado = {
                id: Number(array[1]),
                codigo:Number(array[3]),
                cpf:array[5],
                nome: array[7], 
                email:array[9], 
                dataCriacao: new Date(array[11]), 
                dataAtualizacao:  new Date(array[13]), 
                acesso: new Date(array[15]),
                password: array[17], 
                celular:array[19],
                cargo: array[21]==='A'? Cargo.ADMIN : 
                array[21]==='C'? Cargo.CAIXA :
                array[21]==='M'? Cargo.MASTER : 
                array[21]==='E'? Cargo.ESTOQUISTA :
                array[21]==='G'? Cargo.GERENTE :
                Cargo.REVENDA,
                roles:array[23],
                token:array[25],
                status: array[27]==="S"?"S":'N', 
                estabelecimento:Number(array[29])
            };
            return userLogado;
        }
        return userLogado;
        
    }

    public static logout(){
        // persistLocalStorage("@user-data", '', 'remove');
        // persistLocalStorage("@TOKEN_KEY", '', 'remove');
        sessionStorage.removeItem("@TOKEN_KEY");
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
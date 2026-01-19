 import {usuarios} from "../../data/banco.js"





 export class UsuarioModel{
    
    static exibir(){
        return usuarios
    }

    static exibirId(id){
        usuarios.find(i => i.id)
    }
 }
 export class UsuarioModel{
    
    static exibir(){
        return usuarios
    }

    static exibirId(id){
        usuarios.find(i => i.id)
    }
 }
import { UsuarioModel } from "../../models/usuario/UsuarioModels";

export class UsuarioController{
    static listarUsuarios(req,res){
        try {
            const usuarios = UsuarioModel.listarTodos()
            if(usuarios.length  === 0 || !usuarios){
                res.status(400).json({msdg: "nenhum usuario no banco"})
                return
            }
            res.status(200).json({msg: "Usuarios Encontrado", usuarios})
        } catch (error){

        }
    }
}
import { CursoModel } from "../models/CursoModel";



export class CursoController{
    static listarCurso(req, res){
        try{
            const cursos = CursoModel.listarCursos();
            if(cursos.length === 0 || !cursos){
                res.status(400).json({msg: "Nenhum curso cadastrado no banco"})
                return;
            }
            res.status(200).json({msg: "Cursos encontrados.", cursos})
        }catch(error){
            res.status(500).json({msg: "Erro interno ao listar os curso", erro: error.message})
        }
    }
}
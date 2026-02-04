import { UsuarioModel } from "../models/UsuarioMdeols.js";
import axios from "axios";

export class UsuarioController {
    static listarUsuario(req, res) {
        try {
            const usuarios = UsuarioModel.listarUsuario();
            if (!usuarios || usuarios.length === 0) {
                res.status(404).json({ msg: "nenhum usuario cadastrado" });
                return;
            }
            res.status(200).json({ msg: " Usuarios encontrado", usuarios });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao listar usuarios", erro: error.message });
        }
    }

    // funcao assincrona para buscar os dados do viacep
    static async criarUsuario(req, res) {
        try {
            const { nome, email, telefone, cep } = req.body;
            if (!nome || !email || !telefone || !cep) {
                res.status(400).json({ msg: "todos os campos devem ser preenchidos" });
                return;
            }
            
            const buscarCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            if (buscarCep.erro) {
                res.status(400).json({ msg: "CEP invalido" });
                return;
            }
            
            console.log(buscarCep);
            const novoUsuario = {
                id: Date.now(),
                nome: nome,
                email: email,
                telefone: telefone,
                cep: cep,
                logradouro: buscarCep.data.logradouro,
                uf: buscarCep.data.uf
            };
            
            const userCriado = UsuarioModel.criarUsuario(novoUsuario);
            res.status(200).json({ msg: "Usuario criado com sucesso!", userCriado });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao criar o usuario", erro: error.message });
        }
    }

    static buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = UsuarioModel.buscarPorId(id);
            if (!usuario) {
                res.status(404).json({ msg: "Usuario nao encontrado" });
                return;
            }
            res.status(200).json({ msg: "Usuario encontrado", usuario });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar usuario", erro: error.message });
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, telefone, cep } = req.body;

            const usuarioExiste = UsuarioModel.buscarPorId(id);
            if (!usuarioExiste) {
                res.status(404).json({ msg: "Usuario nao encontrado" });
                return;
            }

            const dadosAtualizados = { nome, email, telefone };

            if (cep) {
                const buscarCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (buscarCep.erro) {
                    res.status(400).json({ msg: "CEP invalido" });
                    return;
                }
                dadosAtualizados.cep = cep;
                dadosAtualizados.logradouro = buscarCep.data.logradouro;
                dadosAtualizados.uf = buscarCep.data.uf;
            }

            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, dadosAtualizados);
            res.status(200).json({ msg: "Usuario atualizado com sucesso", usuario: usuarioAtualizado });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao atualizar usuario", erro: error.message });
        }
    }

    static deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            const usuarioExiste = UsuarioModel.buscarPorId(id);
            if (!usuarioExiste) {
                res.status(404).json({ msg: "Usuario nao encontrado" });
                return;
            }

            const deletado = UsuarioModel.deletarUsuario(id);
            if (deletado) {
                res.status(200).json({ msg: "Usuario deletado com sucesso" });
            } else {
                res.status(400).json({ msg: "Erro ao deletar usuario" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Erro ao deletar usuario", erro: error.message });
        }
    }

    static async buscarCep(req, res) {
        try {
            const { cep } = req.params;
            
            if (!cep || cep.length !== 8) {
                res.status(400).json({ msg: "CEP invalido. Deve conter 8 digitos" });
                return;
            }

            const buscarCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            
            if (buscarCep.data.erro) {
                res.status(404).json({ msg: "CEP nao encontrado" });
                return;
            }

            res.status(200).json({ 
                msg: "CEP encontrado", 
                dados: {
                    cep: buscarCep.data.cep,
                    logradouro: buscarCep.data.logradouro,
                    complemento: buscarCep.data.complemento,
                    bairro: buscarCep.data.bairro,
                    localidade: buscarCep.data.localidade,
                    uf: buscarCep.data.uf,
                    estado: buscarCep.data.estado
                }
            });
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar CEP", erro: error.message });
        }
    }
}
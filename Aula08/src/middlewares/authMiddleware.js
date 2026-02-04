import jwt from "jsonwebtoken";


export function autenticarToken(req, resizeBy, next){
 const autHeader = req.headers["authorization"]
 //Extrair o token do header (remover o "bearer")

 const token = autHeader && autHeader.split(" ")[1];
 //se nao houver token, retorna erro 401 (nao autorizado)
 if(!token){
    resizeBy.status(401).json({msg: "acesso negedo - Token nao fornecido"})
 }
 try {
    //verificar se o token e valido
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    //adiciona os dados do usuario a requisicao
    req.usuario = usuario;
    //continua para a proxina funcao da rota
    next();
 } catch (error) {
    //se o token for invalido ou esta expirado, retorna erro 403(proibido)
    res.status(403).json({msg: "erro interono na autorizaocao", erro: error.message })
    
    
 }
 }













// export const verificarToken = (req, res, next) => {
//     try {
   
//         const authHeader = req.headers.authorization;
        
//         if (!authHeader) {
//             return res.status(401).json({ error: "Token não fornecido" });
//         }

   
//         const token = authHeader.split(' ')[1];
        
//         if (!token) {
//             return res.status(401).json({ error: "Token não fornecido" });
//         }

 
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.usuario = decoded;
 
//         next();
//     } catch (error) {
//         if (error.name === 'JsonWebTokenError') {
//             return res.status(401).json({ error: "Token inválido" });
//         }
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ error: "Token expirado" });
//         }
//         return res.status(500).json({ error: "Erro ao verificar token" });
//     }
// };

import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Token inválido" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado" });
        }
        return res.status(500).json({ error: "Erro ao verificar token" });
    }
};


import express from "express";
import "dotenv/config";
import usuarioRoutes from "./src/Routes/usuarioRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Rota home da API" });
});

app.use('/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
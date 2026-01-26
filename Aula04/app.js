import express from 'express';
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
const mensagem = process.env.mensagem;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(mensagem);
});

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta http://localhost:${PORT}`);
});


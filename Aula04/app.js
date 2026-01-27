import express from 'express';
import "dotenv/config";
import cursoRoutes from './src/routes/curso/curso.routes.js';
import alunoRoutes from './src/routes/aluno/aluno.routes.js';

const app = express();
const PORT = process.env.PORT;
const mensagem = process.env.mensagem;

app.use(express.json());

app.use('/cursos', cursoRoutes);
app.use('/alunos', alunoRoutes);

app.get('/', (req, res) => {
    res.status(200).send(mensagem);
});

app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta http://localhost:${PORT}`);
});


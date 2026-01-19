import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

let alunos = [
    {
        id: 1,
        aluno: "vinicius Almeida",
        matricula: "18924985",
    },
    {
        id: 2,
        aluno: "vinicius silva",
        matricula: "19123983",
    }
]

app.get('/', (req, res) => {
    res.json({ msg: "tudo certo por aqui" })
})

app.get('/alunos', (req, res) => {
    res.json(alunos)
})

app.get('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const aluno = alunos.find(a => a.id === id)

    if (!aluno) {
        return res.status(404).json({ mensagem: "Aluno não encontrado!" })
    }

    res.json(aluno)
})

app.post('/alunos', (req, res) => {
    const novoAluno = req.body
    novoAluno.id = alunos.length + 1
    alunos.push(novoAluno)
    res.status(201).json(novoAluno)
})

app.put('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)

    if (index === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado!" })
    }

    const alunoAtualizado = { id, ...req.body }
    alunos[index] = alunoAtualizado
    res.json(alunoAtualizado)
})

app.delete('/alunos/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)

    if (index === -1) {
        return res.status(404).json({ mensagem: "Aluno não encontrado!" })
    }

    alunos.splice(index, 1)
    res.json({ mensagem: "Aluno removido com sucesso!" })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})

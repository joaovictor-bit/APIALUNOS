// importa a biblioteca
const express = require("express"); // framework web

//cria a aplicação express
const app = express();

app.use(express.json())

const PORT = 3000;
const ALUNOS = [
    {
        id: 1, nome:"João Victor", cor: "azul", idade: 16 
    },
    {
        id: 2, nome:"Henry Gay", cor: "preto", idade: 17 
    },
    {
        id: 3, nome:"Sem Ducha", cor: "amarelo", idade: 15
    }
]
app.get("/",(req, res)=>{
res.json({
    mensagem: "Henry é gayzao"
})
})

app.get("/alunos", (req,res)=>{
    res.json(ALUNOS);
})



app.get("/alunos/cor/:cor",(req,res)=>{
    const cor = req.params.cor
    console.log(`Cor recebida: ${cor}`)
    const alunosFiltrados = ALUNOS.filter(
        (aluno) => aluno.cor.toLowerCase() === cor.toLowerCase()
    );
    if (alunosFiltrados.length > 0){
        res.status(200).json(alunosFiltrados);
    }else{
        res.status(404).json({msg: "Nenhum aluno encontrado com essa cor"})
    }
})


app.get("/alunos/:id",(req, res)=>{
    const id = Number(req.params.id)
    console.log(`Valor recebido ${id}`)
    const aluno = ALUNOS.filter((aluno)=> aluno.id ===id)

    if (aluno.length > 0){
        res.status(200).json(aluno)
    }else{
        res.status(404).json( {msg: "Aluno não encontrado"})
    }
})


app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
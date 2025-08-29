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
        id: 2, nome:"Diamante", cor: "preto", idade: 17 
    },
    {
        id: 3, nome:"Sem Ducha", cor: "amarelo", idade: 15
    }
]
app.get("/",(req, res)=>{
res.json({
    mensagem: "Henry é chatão"
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
app.post("/alunos",(req,res)=>{
    const {nome,cor,idade}= req.body;
    if(!nome || !cor || !idade){
        return res.status(400).json({msg: "Nome cor e idade são obrigatórias"})
    }
    
    // ALUNOS.length = 3
    // ALUNOS[2]

    // ALUNOS.lenght - 1
    // ALUNOS[2].id = 3
    // ALUNOS[2].id + 1
    // id = 4

    // if(ALUNOS.length > 0)
    //     ALUNOS[ALUNOS.length - 1].id + 1
    // else{
    //     id = 1
    // }
    const id = ALUNOS.length > 0 ? ALUNOS[ALUNOS.length - 1].id + 1 : 1
    const novoAluno = {
            id,nome,cor,idade
        }


    console.log(novoAluno)
    ALUNOS.push(novoAluno)
    res.status(201).json({mensagen: "Aluno criado com sucesso"})
})
app.delete("/alunos/:id",(req,res)=>{
    const id = Number(req.params.id)
    const indice = ALUNOS.findIndex(aluno => aluno.id ===id)
    if (indice === -1){
        return res.status(404).json({
            msg: "Aluno não encontrado ou já deletado"
        })
    }
    console.log(indice)
    ALUNOS.splice(indice,1)
    res.status(204).json({msg:"Deletando..."})
})
app.put("/alunos/:id",(req,res) => {
    const id = Number (req.params.id)
    const {nome , cor , idade} = req.body
    const indice = ALUNOS.findIndex(aluno => aluno.id === id)
    if(indice === -1){
        return res.status(404).json({msg:"Aluno não encontrado"})
    }

    if(!nome || !cor || !idade){
        return res.status(400).json({msg: "Nome, cor e idade são obrigatórios"})
    }
    ALUNOS[indice] = {id, nome , cor , idade}
    res.status(200).json({msg: "Aluno editado com sucsso"})
})





app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
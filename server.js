const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const port = 3000;

const lanches = require('./public/data/lanches.json');

app.use(morgan('dev')); // Middleware para logs
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar o corpo das requisições
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

const categorias = ["Gourmet", "Vegetariano", "Vegano", "Apimentado"];

// ROTA RAIZ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// CONTATO (GET)
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contatos.html'));
});

// CONTATO (POST)
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const respostaHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Contato Recebido</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-success">Obrigado pelo contato!</h1>
                        <p><strong>Nome:</strong> ${nome}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Assunto:</strong> ${assunto}</p>
                        <p><strong>Mensagem:</strong> ${mensagem}</p>
                        <a href="/" class="btn btn-primary">Voltar à Página Inicial</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    res.send(respostaHTML);
});

// SUGESTAO (GET)
app.get('/sugestao', (req, res) => {
    const htmlSugestao = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Sugerir Novo Lanche</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1 class="mb-4">Sugerir Novo Lanche</h1>
                <form action="/sugestao" method="GET">
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome do Lanche:</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                    </div>
                    <div class="mb-3">
                        <label for="ingredientes" class="form-label">Ingredientes:</label>
                        <textarea class="form-control" id="ingredientes" name="ingredientes" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar Sugestão</button>
                </form>
                <a href="/" class="btn btn-secondary mt-3">Voltar à Página Inicial</a>
            </div>
        </body>
        </html>
    `;
    res.send(htmlSugestao);
});

// SUGESTAO (GET com Query String)
app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;

    if (!nome || !ingredientes) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const respostaHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado pela Sugestão!</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-success">Obrigado pela sugestão!</h1>
                        <p><strong>Nome do Lanche:</strong> ${nome}</p>
                        <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                        <a href="/" class="btn btn-primary">Voltar à Página Inicial</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    res.send(respostaHTML);
});

// API LANCHES
app.get('/api/lanches', (req, res) => {
    res.json(lanches.hamburgueres);
});

// 404 - Página Não Encontrada
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// INICIAR SERVIDOR
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

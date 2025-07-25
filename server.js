const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const port = 3000;

const lanches = require('./public/data/lanches.json');

app.use(morgan('dev')); // Middleware para logs
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar o corpo das requisições
app.use(express.static(path.join(__dirname, 'public'))); // Servir arquivos estáticos

// ROTA RAIZ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// CONTATO (GET)
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contatos.html'));
});

// CONTATO (POST) - Implementação do padrão PRG
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    // Redireciona para a rota de sucesso
    res.redirect(`/contato/sucesso?nome=${encodeURIComponent(nome)}`);
});

app.get('/contato/sucesso', (req, res) => {
    const { nome } = req.query;

    const htmlSucesso = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Contato Enviado</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5 text-center">
                <h1 class="text-success">Obrigado pelo contato, ${nome}!</h1>
                <a href="/" class="btn btn-primary mt-3">Voltar à Página Inicial</a>
            </div>
        </body>
        </html>
    `;
    res.send(htmlSucesso);
});

// SUGESTAO (GET - Formulário)
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
    res.json(lanches);
});

// 404 - Página Não Encontrada
app.use((req, res) => {
    const html404 = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Página Não Encontrada</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5 text-center">
                <h1 class="text-danger">404 - Página Não Encontrada</h1>
                <p>A página que você está procurando não existe.</p>
                <a href="/" class="btn btn-primary">Voltar à Página Inicial</a>
            </div>
        </body>
        </html>
    `;
    res.status(404).send(html404);
});

// INICIAR SERVIDOR
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

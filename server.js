const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const port = 3000;

const lanches = require('./public/data/lanches.json');

app.use(morgan('dev')); // já inclui o next()
app.use(express.urlencoded({ extended: true }));

// ESTÁTICOS
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

const categorias = ["Gourmet", "Vegetariano", "Vegano", "Apimentado"];

//CONTATO
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contatos.html'));
});

//CONTATO
app.post('/contato', (req, res) => {
    const { nome, email, mensagem } = req.body;


    if (!nome || !email || !mensagem) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const respostaHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado pelo Contato!</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { padding: 20px; }
                .card { margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container mt-5">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-success">Obrigado pelo contato!</h1>
                        <p><strong>Nome:</strong> ${nome}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Mensagem:</strong> ${mensagem}</p>
                        <a href="/contato" class="btn btn-primary">Enviar outra mensagem</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    res.send(respostaHTML);
});

// SUGESTAO
app.get('/form', (req, res) => {
    const htmlForm = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Sugerir Lanche - DevBurger</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1 class="mb-4">Sugira um novo lanche!</h1>
                <form action="/sugestao" method="POST">
                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome do lanche:</label>
                        <input type="text" class="form-control" id="nome" name="nome" required>
                    </div>
                    <div class="mb-3">
                        <label for="categoria" class="form-label">Categoria:</label>
                        <select class="form-select" id="categoria" name="categoria" required>
                            ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="ingredientes" class="form-label">Ingredientes:</label>
                        <textarea class="form-control" id="ingredientes" name="ingredientes" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Enviar</button>
                </form>
            </div>
        </body>
        </html>
    `;

    res.send(htmlForm);
});

// SUGESTAO
app.post('/sugestao', (req, res) => {
    const { nome, categoria, ingredientes } = req.body;


    if (!nome || !categoria || !ingredientes) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const respostaHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Obrigado!</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body { padding: 20px; }
                .card { margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <h1 class="card-title text-success">Obrigado pela sugestão!</h1>
                        <div class="card-text">
                            <p><strong>Nome do lanche:</strong> ${nome}</p>
                            <p><strong>Categoria:</strong> ${categoria}</p>
                            <p><strong>Ingredientes:</strong> ${ingredientes}</p>
                        </div>
                        <a href="/form" class="btn btn-primary">Sugerir outro lanche</a>
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

// 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// START
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

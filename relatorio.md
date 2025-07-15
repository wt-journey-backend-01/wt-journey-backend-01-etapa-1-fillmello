<sup>Esse é um feedback gerado por IA, ele pode conter erros.</sup>

Você tem 8 créditos restantes para usar o sistema de feedback AI.

# Feedback para fillmello:

Nota final: **41.6/100**

# Feedback do Desafio de Servidor Express.js 🚀

Olá, fillmello! 👋 Primeiro, quero parabenizá-lo pelo seu esforço e dedicação! A nota final de **41.6/100** mostra que você já está no caminho certo, mas sempre há espaço para melhorias, e estou aqui para te ajudar a brilhar ainda mais! 🌟

## Conquistas Bônus 🎉
Antes de mergulharmos nos pontos de melhoria, vamos celebrar algumas vitórias! Você utilizou corretamente as tags `<label>` e o atributo `id` nos inputs do formulário da rota `/contato (GET)`. Isso é excelente, pois melhora a acessibilidade e a usabilidade do seu formulário! Continue assim!

## Análise dos Requisitos que Precisam de Atenção 🔍
Vamos explorar os pontos onde seu código não atendeu aos requisitos. Vou explicar cada um deles e suas causas para que você possa entender e corrigir.

1. **Rota `/` - deve conter pelo menos um formulário:**
   - A rota raiz (`app.get('/')`) atualmente serve apenas um arquivo HTML estático. Para atender a esse requisito, você precisa inserir um formulário na página inicial. Vamos pensar juntos em que informações você gostaria que os usuários enviassem diretamente na página inicial?

2. **Rota `/` - form deve conter botão do tipo submit:**
   - Novamente, como não temos nenhum formulário na rota `/`, isso gera a falha. Assim, não há como ter um botão de submit. Assim como mencionado acima, vamos criar um formulário simples para que os usuários possam enviar suas informações!

3. **Rota `/` - deve conter dois campos de input do tipo texto com atributos "name" sendo "nome" no primeiro e "ingredientes" no segundo:**
   - Isso está diretamente relacionado ao primeiro e segundo pontos. Uma vez que você adicionar um formulário à rota `/`, certifique-se de incluir os campos necessários com os `name` corretos.

4. **Rota `/sugestao` - deve exibir o nome enviado via query string na página HTML:**
   - Na rota `/sugestao`, você não está manipulando a query string. Você pode usar `req.query` para capturar e exibir o nome na página HTML que você está retornando.

5. **Rota `/sugestao` - deve exibir os ingredientes enviados via query string na página HTML:**
   - O mesmo se aplica aqui. Para exibir os ingredientes, você precisaria garantir que eles sejam capturados da query string e adicionados à resposta HTML.

6. **Rota `/contato (GET)` - deve conter uma âncora para a rota raiz `/`:**
   - Na sua rota de contato, você pode adicionar um link para retornar à página inicial. Isso poderia ser um simples `<a href="/">Voltar à Página Inicial</a>`.

7. **Rota `/contato (POST)` - deve conter uma âncora para a rota raiz `/`:**
   - O mesmo se aplica aqui. Após o envio do formulário, você pode incluir um link que leve à rota raiz, assim os usuários podem voltar facilmente.

8. **Rota `/api/lanches` - deve retornar um array de lanches:**
   - Você implementou a rota `/api/lanches`, mas precisamos verificar se o arquivo `lanches.json` realmente contém um array e se está estruturado corretamente.

9. **Rota `/api/lanches` - deve retornar um array com pelo menos 3 lanches:**
   - Se o seu arquivo JSON não tem pelo menos 3 lanches, isso vai gerar um problema. Verifique o conteúdo do seu `lanches.json`.

10. **Rota `/api/lanches` - cada objeto de lanche do array deve ter os seguintes atributos: id, nome, ingredientes:**
    - Aqui, você precisa garantir que cada lanche no JSON tenha esses atributos. Se algum estiver faltando, a API não vai funcionar como esperado.

11. **Rota `/api/lanches` - cada atributo deve possuir o tipo de dado correto e não ser vazio, 0 ou null:**
    - Novamente, isso está ligado ao conteúdo do seu arquivo JSON. Certifique-se de que cada atributo dos lanches esteja devidamente preenchido.

## Problemas que Geraram Descontos ⚠️
Vamos agora abordar os pontos críticos que causaram descontos na sua nota. 

1. **Endpoint `/sugestao` não deve aceitar método POST:**
   - Parece que você se esqueceu de definir que a rota `/sugestao` não deve aceitar POST. Se você não pretende que essa rota funcione para envios de dados, remova o método POST ou ajuste a implementação conforme necessário.

2. **Name attributes: formulário da página index.html não possui campos de input com name attributes corretos:**
   - Como discutido anteriormente, ao criar um formulário na rota `/`, você precisa garantir que os `name` dos inputs sejam os corretos para que os dados sejam aceitos.

3. **Static files: projeto contém outras dependências além do express:**
   - Veja se você realmente precisa de todas as dependências que estão no seu projeto. O ideal é que você mantenha apenas o que for necessário.

4. **Static files: .gitignore não contém pasta node_modules:**
   - Para evitar que a pasta `node_modules` seja versionada no seu repositório, adicione-a ao seu arquivo `.gitignore`. Isso é uma boa prática em projetos Node.js!

## Considerações Finais 🌈
Você está a caminho de se tornar um(a) desenvolvedor(a) incrível! Lembre-se de que cada erro é uma oportunidade de aprendizado. 💪 Ao corrigir esses pontos, você não só melhorará seu projeto, mas também solidificará suas habilidades em Node.js e Express.js.

Estou aqui para ajudar em qualquer dúvida que você tenha. Vamos juntos fazer esse código brilhar! ✨
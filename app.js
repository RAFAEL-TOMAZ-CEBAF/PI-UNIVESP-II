const express       = require('express');
const app           = express();  // cria o servidor para uso
const db            = require('./db/connection');
const bodyParser    = require('body-parser');

// inicia o servidor
const PORT = 3000;     //porta de início
app.listen(PORT , function() {
    console.log(`O Express está rodando na porta ${PORT}\n
        Digite no navegador:\n 
        localhost:3000`);
});

// body parser
app.use(bodyParser.urlencoded({extended: false}))


// db connection
db
    .authenticate()
    .then(( ) => {  
        console.log("Conectado ao banco de dados com sucesso");
    })
    .catch(err => {
        console.log("Erro ao conectar ao banco de dados" , err)
    });

// routes
app.get('/' , (req,res) => {
    res.send("Working in progress - ");
});

// jobs routes
app.use('/jobs' , require('./routes/jobs'));


const express       = require('express');
const exphbs        = require('express-handlebars');
const app           = express();    // cria o servidor para uso
const path          = require('path');
const db            = require('./db/connection');
const bodyParser    = require('body-parser');

const Job        = require('./models/Job');         // necessário para tornar a view dinâmica
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;


// inicia o servidor
const PORT = 3000;     //porta de início

app.listen(PORT , function() {
    console.log(`O Express está rodando na porta ${PORT}\n
        Digite no navegador:\n 
        localhost:3000`);
});

// body parser
app.use(bodyParser.urlencoded({extended: false}))

// Handlebars
app.set('views', path.join(__dirname, 'views'));        // onde estão os templates do projeto

// Configuração da engine (render) do handlebars - ver https://stackoverflow.com/questions/43704187/cant-get-express-handlebars-render-an-html-page
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"})); 
app.set('view engine', 'hbs');

// Pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));


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
    
    // busca as jobs por ordem de criação (usando a aba createdAt, pelo sequelize)
    Job.findAll({order: [
        ['createdAt', 'DESC']
      ]})
    .then(jobs => {
        res.render('index', {
            jobs
        });
    
      })
});




// jobs routes
app.use('/jobs' , require('./routes/jobs'));


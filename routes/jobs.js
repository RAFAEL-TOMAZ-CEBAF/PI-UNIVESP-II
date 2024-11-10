
// rota q adiciona jobs no projeto
// faz inserção via Sequelize, no banco

const express   = require('express');
const router    = express.Router();
const Job       = require('../models/Job');


// Rota de teste // verificação com POSTMAN
router.get('/test', (req, res) => {
    res.send("Funcionando - PI UNIVESP 2024\n Time de desenvolvimento. ");       // via postman, usa-se um get nessa rota pra testar a conexão
});


router.get('/add', (req, res) => {
    res.render('add');       // Renderização do site
});

// add job via post
router.post('/add' , (req, res) => {
    
    let {title, solicitante, disciplina, local, detalhes , new_job } = req.body;

    // insert
    // o método create do sequelize insere dados no banco
    Job.create({
        title,
        solicitante,
        disciplina,
        local,
        detalhes,
        new_job 
    }) // como ele retorna algo, então usamos o .then()
    .then(() => res.redirect('/'))  // depois q ele retorna algo, volte para a home
    .catch(err => console.log(err));     

});

module.exports = router
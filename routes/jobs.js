
// rota q adiciona jobs no projeto
// faz inserção via Sequelize, no banco

const express   = require('express');
const router    = express.Router();
const Job       = require('../models/Job');

router.get('/test', (req, res) => {
    res.send("Working ");       // via postman, usa-se um get nessa rota pra testar a conexão
});

// add job via post
router.post('/add' , (req, res) => {
    let {tittle, salary, company, description, email , new_job }= req.body;

    // insert
    // o método create do sequelize insere dados no banco
    Job.create({
        tittle,
        salary,
        company,
        description,
        email ,
        new_job 
    }) // como ele retorna algo, então usamos o .then()
    .then(() => res.redirect('/'))  // depois q ele retorna algo, volte para a home
    .catch(err => console.log(err));     

});

module.exports = router
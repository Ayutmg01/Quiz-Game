// route no logics

const { Router } = require('express');
const app = Router();
const { loginUser, registerNewUser}= require('../controllers/users');



app.post('/register',registerNewUser);

app.post('/login',loginUser);


module.exports = app;
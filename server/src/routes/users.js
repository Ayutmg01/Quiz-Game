// route no logics

const { Router } = require('express');
const app = Router();
const { loginUser, registerNewUser}= require('../controllers/user');

app.post('/register',registerNewUser);

app.post('/login',loginUser);


module.exports = app;
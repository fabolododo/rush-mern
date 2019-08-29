const account = require('../controllers/user.controller.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
}
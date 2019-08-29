const UserController = require('../controllers/user.controller.js');

module.exports = function (app) {
    app.post('/login',UserController.login);
    app.post('/signup',UserController.signup);
    app.get('/listUser',UserController.listUser);
}
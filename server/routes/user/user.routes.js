const controller = require('../../controllers/user/user.controller');

module.exports = (app) => {
    app.post('/user/login', controller.login);
    app.post('/user/signup', controller.signup);
}
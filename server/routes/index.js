module.exports = (app) => { 
    require('./user/user.routes')(app);
    require('./test/test.routes')(app);
    require('./questions/questions.routes')(app);
    return app;
}
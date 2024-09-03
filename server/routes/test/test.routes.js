const controller = require('../../controllers/test/test.controller');

module.exports = (app) => {
    app.get('/tests/start/:testId', controller.getTestSeries);
    app.post('/tests', controller.createTestSeries);
    app.post('/tests/addQuestionToTest', controller.addQuestionToTest);
    app.post('/tests/getResultByUserId', controller.getResultByUserId);
    app.get('/tests/allTestSeries', controller.getAllTestSeries);
    app.post('/tests/submitTest', controller.submitTest);
}
const controller = require('../../controllers/question/question.controller');

module.exports = (app) => {
    app.get('/questions', controller.questions);
    app.post('/questions', controller.createQuestions);
    app.get('/questions/:id', controller.questionsById);
    app.put('/questions/:id', controller.updateQuestion);
    app.delete('/questions/:id', controller.deleteQuestion);
}
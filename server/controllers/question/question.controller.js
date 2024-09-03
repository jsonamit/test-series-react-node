const Questions = require('../../db/models/question/Questions');

exports.questions = async (req, res) => { 
    try {
        let questions = await Questions.findAll({where:{isActive:1}});

        if (!questions) {
            res.send({
                resp: 0,
                msg: 'Questions not found'
            });
            return;
        }
    
        res.send({
            resp: 1,
            data: questions,
            msg: 'Questions fatched successfully'
        });
    } catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!'
        });
    }
}

exports.createQuestions = async (req, res) => { 
    try {

        let params = req.body;

        if (!params.question || !params.option1 || !params.option2 || !params.option3 || !params.option4 || !params.answer) {
            res.send({
                resp: 0,
                msg: 'Missing parameters'
            });
            return;
        }

        let body = {
            question: params.question,
            option1: params.option1,
            option2: params.option2,
            option3: params.option3,
            option4: params.option4,
        }

        const questions = await Questions.create(body);

        if (!questions) {
            res.send({
                resp: 0,
                msg: 'Internal server error!!'
            });
            return;
        }
    
        res.send({
            resp: 1,
            msg: 'Questions created successfully'
        });
    } 
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!'
        });
    }
}

exports.questionsById = async (req, res) => { 
    try {

        let { id } = req.params;

        let questions = await Questions.findOne({where: { id }});

        if (!questions) {
            res.send({
                resp: 0,
                msg: 'Questions not found'
            });
            return;
        }
    
        res.send({
            resp: 1,
            data: questions,
            msg: 'Questions fatched successfully'
        });
    } catch(ex) {
        res.send({
            resp: 0,
            data: {},
            msg: 'Internal server error!!'
        });
    }
}

exports.updateQuestion = async (req, res) => { 
    try {

        let params = req.body;

        if (!params.id) {
            res.send({
                resp: 0,
                msg: 'Questions id is mandatory'
            });
            return;
        }

        let questions = await Questions.update(
            params,
            {where: { id: params.id }}
        );

        if (!questions) {
            res.send({
                resp: 0,
                msg: 'Questions not updated'
            });
            return;
        }
    
        res.send({
            resp: 1,
            msg: 'Questions updated successfully'
        });
    } catch(ex) {
        res.send({
            resp: 0,
            data: {},
            msg: 'Internal server error!!'
        });
    }
}

exports.deleteQuestion = async (req, res) => { 
    try {

        let { id } = req.params;

        if (!id) {
            res.send({
                resp: 0,
                msg: 'Questions id is mandatory'
            });
            return;
        }

        let questions = await Questions.update(
            { isActive: 0},
            { where: { id } }
        );

        if (!questions) {
            res.send({
                resp: 0,
                msg: 'Questions not deleted'
            });
            return;
        }
    
        res.send({
            resp: 1,
            msg: 'Questions deleted successfully'
        });
    } catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!'
        });
    }
}
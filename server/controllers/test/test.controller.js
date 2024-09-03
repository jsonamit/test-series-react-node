const TestResult = require('../../db/models/result/TestResult');
const TestSeries = require('../../db/models/testSeries/TestSeries');
const TestSeriesHasQuestions = require('../../db/models/testSeries/TestSeriesHasQuestions');
const Questions = require('../../db/models/question/Questions');

exports.getTestSeries = async (req, res) => { 

    try {
        let { testId } = req.params;
    
        if(!testId) {
            res.send({
                resp: 0,
                msg: 'Missing testId'
            });
            return;
        }

        const series = await TestSeries.findOne({
            where: { id: testId },
            include: [
                {
                    model: TestSeriesHasQuestions,
                    include: [
                        {
                            model: Questions, 
                            attributes: { exclude: ['answer'] }
                        }
                    ],
                },
            ],
        });

        if (!series) {
            res.send({
                resp: 0,
                msg: 'Test series not found'
            });
            return;
        }
    
        res.send({
            resp: 1,
            data: series,
            msg: 'Test series data fatched successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!',
        });
    }
}

exports.createTestSeries = async (req, res) => { 

    try {
       
        let params = req.body;

        if (!params.name || !params.total_marks || !params.passing_marks || !params.expiredDt) {
            res.send({
                resp: 0,
                msg: 'Missing parameters'
            });
            return;
        }

        let testBody = {
            name: params.name,
            total_marks: params.total_marks,
            passing_marks: params.passing_marks,
            expiredDt: params.expiredDt
        }

        const testSeries = await TestSeries.create(testBody);

        if (!testSeries) {
            res.send({
                resp: 0,
                msg: 'Internal server error!!',
            });
            return;
        }
    
        res.send({
            resp: 1,
            msg: 'Test series created successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!',
        });
    }
}

exports.addQuestionToTest = async (req, res) => { 

    try {
       
        let params = req.body;

        if (!params.test_series_id || !params.question_id) {
            res.send({
                resp: 0,
                msg: 'Missing parameters'
            });
            return;
        }

        let testBody = {
            test_series_id: params.test_series_id,
            question_id: params.question_id
        }

        const testSeries = await TestSeriesHasQuestions.create(testBody);

        if (!testSeries) {
            res.send({
                resp: 0,
                msg: 'Internal server error!!'
            });
            return;
        }
    
        res.send({
            resp: 1,
            msg: 'Added questions to test series successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!',
        });
    }
}

exports.getResultByUserId = async (req, res) => { 

    try {
        let { user_id, test_id } = req.body;
    
        if(!user_id || !test_id) {
            res.send({
                resp: 0,
                msg: 'Missing parameters'
            });
            return;
        }

        const result = await TestResult.findAll({
            where: { test_series_id: test_id, user_id: user_id },
            include: [
                {
                    model: TestSeries,
                    as: 'test_series'
                }
            ]
        });

        if (!result) {
            res.send({
                resp: 0,
                msg: 'Result not found'
            });
            return;
        }
    
        res.send({
            resp: 1,
            data: result,
            msg: 'Result fatched successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!'
        });
    }
}

exports.getAllTestSeries = async (req, res) => { 
    try {
     
        const series = await TestSeries.findAll({
            include: [
                {
                    model: TestSeriesHasQuestions,
                    // include: [
                    //     {
                    //         model: Questions, 
                    //         attributes: { exclude: ['answer'] }
                    //     }
                    // ],
                },
            ],
          });

        if (!series) {
            res.send({
                resp: 0,
                msg: 'Test series not found'
            });
            return;
        }
    
        res.send({
            resp: 1,
            data: series,
            msg: 'Test series data fatched successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!',
        });
    }
}

exports.submitTest = async (req, res) => { 
    try {

        let params = req.body;
        let result = {
            user_id: 0,
            test_series_id: 0,
            total_questions: 0,
            total_marks_obtained: 0,
            total_questions_attempt: 0,
            total_right_questions: 0,
            total_wrong_questions: 0,
        };

        if (!params.user_id || !params.test_id) {
            res.send({
                resp: 0,
                msg: 'Missing parameters'
            });
            return;
        }

        const testSeries = await TestSeries.findOne({
            where: { id: params.test_id },
            include: [
                {
                    model: TestSeriesHasQuestions,
                    include: [
                        {
                            model: Questions
                        }
                    ],
                },
            ],
        });

        if (!testSeries) {
            res.send({
                resp: 0,
                msg: 'Test series not found'
            });
            return;
        }

        if(testSeries.test_series_has_questions.length == 0) {
            res.send({
                resp: 0,
                data: {},
                msg: 'No questions found in test series'
            });
            return;
        }

        result['user_id'] = params.user_id;
        result['test_series_id'] = params.test_id;
        result['total_questions'] = testSeries.test_series_has_questions.length;

        const filterQuestions = params.data.filter(item => item.question.hasOwnProperty('selected'));
        result['total_questions_attempt'] = filterQuestions.length;

        let totalRight = 0;
        let totalWrong = 0;

        if (testSeries && testSeries.test_series_has_questions && filterQuestions) {
            
            for (let i = 0; i < testSeries.test_series_has_questions.length; i++) {
                let testQuestion = testSeries.test_series_has_questions[i].question;
                let matchedQuestion = filterQuestions.find(fq => fq.question.id === testQuestion.id);

                if (matchedQuestion) {
                    if (testQuestion.answer == matchedQuestion.question.answer) {
                        totalRight++;
                    } else if (matchedQuestion.question.selected) { 
                        totalWrong++;
                    }
                }
            }
        }

        result['total_right_questions'] = totalRight;
        result['total_wrong_questions'] = totalWrong;
        result['total_marks_obtained'] = totalRight;

        const updateResult = await TestResult.create(result);

        if(!updateResult) {
            res.send({
                resp: 0,
                msg: 'Internal server error!!',
            });
            return;
        }
    
        res.send({
            resp: 1,
            msg: 'Test series submitted successfully'
        });
    }
    catch(ex) {
        res.send({
            resp: 0,
            msg: 'Internal server error!!',
        });
    }
}
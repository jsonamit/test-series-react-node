const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection/mysql');
const Questions = require('../question/Questions');
const TestSeriesHasQuestions = require('../testSeries/TestSeriesHasQuestions');

const TestSeries = sequelize.define('test_series', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total_marks: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    passing_marks: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    expiredDt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

TestSeries.hasMany(TestSeriesHasQuestions, {
    foreignKey: 'test_series_id',
});

TestSeriesHasQuestions.belongsTo(TestSeries, {
    foreignKey: 'test_series_id'
});

TestSeriesHasQuestions.belongsTo(Questions, {
    foreignKey: 'question_id',
});

Questions.hasMany(TestSeriesHasQuestions, {
    foreignKey: 'question_id',
});


module.exports = TestSeries;
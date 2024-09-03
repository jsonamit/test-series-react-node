const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection/mysql');
const TestSeries = require('../testSeries/TestSeries');

const Result = sequelize.define('test_results', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    test_series_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_marks_obtained: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_questions_attempt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_right_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_wrong_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

Result.belongsTo(TestSeries, {
    foreignKey: 'test_series_id',
    as: 'test_series'
});

module.exports = Result;

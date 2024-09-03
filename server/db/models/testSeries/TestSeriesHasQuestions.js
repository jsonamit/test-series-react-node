const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection/mysql');

const TestSeriesHasQ = sequelize.define('test_series_has_questions', {
    test_series_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'test_series',
            key: 'id',
        },
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'questions',
            key: 'id',
        },
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

module.exports = TestSeriesHasQ;
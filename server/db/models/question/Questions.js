const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection/mysql');

const Questions = sequelize.define('questions', {
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option2: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option3: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    option4: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    },
    answer: {
        type: DataTypes.STRING,
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

module.exports = Questions;

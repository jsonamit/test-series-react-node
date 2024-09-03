'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('questions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        question: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        option1: {
            allowNull: false,
            type: Sequelize.STRING,
        }, 
        option2: {
            allowNull: false,
            type: Sequelize.STRING,
        }, 
        option3: {
            allowNull: false,
            type: Sequelize.STRING,
        }, 
        option4: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        },
        answer: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        }
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('questions');
  }
};

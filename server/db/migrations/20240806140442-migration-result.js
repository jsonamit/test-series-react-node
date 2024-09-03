'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('test_results', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        user_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        test_series_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        total_questions: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        total_marks_obtained: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        total_questions_attempt: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        total_right_questions: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        total_wrong_questions: {
            allowNull: false,
            type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('test_results');
  }
};

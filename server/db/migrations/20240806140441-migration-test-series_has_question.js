'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('test_series_has_questions', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        test_series_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'test_series',
                key: 'id',
            },
        },
        question_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'questions',
                key: 'id',
            },
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
    return queryInterface.dropTable('test_series_has_questions');
  }
};

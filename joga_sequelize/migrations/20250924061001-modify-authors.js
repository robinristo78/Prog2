'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Authors', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    });

  
    await queryInterface.changeColumn('Authors', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });

  
    await queryInterface.changeColumn('Authors', 'body', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Articles');
  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authors', [
      {
        name: 'John Doe',
        body: 'An experienced yoga teacher.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        body: 'A passionate yoga practitioner.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emily Johnson',
        body: 'Author of several yoga books.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};

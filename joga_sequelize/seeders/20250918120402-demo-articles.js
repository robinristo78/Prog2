'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert('Articles', [{
      name: 'Introduction to Ashtanga',
      slug: 'introduction-to-ashtanga',
      image: 'ashtanga.jpg',
      body: 'This is the body of the first article.',
      published: "2020-01-08 15:02:30",
      author_id: 1
    }]),
    queryInterface.bulkInsert('Articles', [{
      name: 'Morning vinyasa flow routine',
      slug: 'morning-vinyasa-flow-routine',
      image: 'morning.jpg',
      body: 'This is the body of the second article.',
      published: "2020-04-14 15:02:41",
      author_id: 2
    }]),
    queryInterface.bulkInsert('Articles', [{
      name: 'Secrets of a yoga teacher  ',
      slug: 'secrets-of-a-yoga-teacher',
      image: 'yoga-teacher.jpg',
      body: 'This is the body of the third article.',
      published: "2020-05-28 15:02:55",
      author_id: 3
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Articles', null, {});
  }
};

import BaseSQLModel from "./baseSQLModel.js";

// CREATE TABLE users (
//     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//     username VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
// );

class UserModel extends BaseSQLModel {
    constructor() {
        // Call the parent constructor with the table name 'users'
        super('users');
      }

    async findOne(username) {
        return await super.findOne('username', username);
    }
}

export default UserModel;
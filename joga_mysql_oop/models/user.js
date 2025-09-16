import BaseSQLModel from "./baseSQLModel.js";

class UserModel extends BaseSQLModel {
    constructor() {
        // Call the parent constructor with the table name 'users'
        super('users');
      }

    async findUser(username) {
        return await super.findOne('username', username);
    }  
}

export default UserModel;
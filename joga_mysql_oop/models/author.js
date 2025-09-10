import BaseSQLModel from "./baseSQLModel.js";

class AuthorModel extends BaseSQLModel {
  constructor() {
    // Call the parent constructor with the table name 'author'
    super("author");
  }

  async findById(id) {
    return await super.findById(id);
  }

}

export default AuthorModel;
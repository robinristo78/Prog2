
import BaseSQLModel from './baseSQLModel.js';

class ArticleModel extends BaseSQLModel {
  constructor() {
    // Call the parent constructor with the table name 'article'
    super('article');
  }

  async findAll() {
    return await super.findAll();
  }


}

export default ArticleModel;

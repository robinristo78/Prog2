
import BaseSQLModel from './baseSQLModel.js';

class ArticleModel extends BaseSQLModel {
  constructor() {
    // Call the parent constructor with the table name 'article'
    super('article');
  }

//   async findAll() {
//     return await super.findAll();
//   }

  async findOne(slug) {
    return await super.findOne('slug', slug);
  } 

  async findMany(author) {
    return await super.findMany('author_id', author);
  }

}

export default ArticleModel;

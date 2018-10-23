const postQueries = require('../db/queries.posts.js');
const { Console } = require('console');

module.exports = {
  new(req, res, next){
    res.render('posts/new', {topicId: req.params.topicId});
  }

}

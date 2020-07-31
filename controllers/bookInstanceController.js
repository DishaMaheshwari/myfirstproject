var BookInstance = require('../models/bookinstance');

//Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {

  BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });

};

//display detail page for a specific bookinstance
exports.bookinstance_detail = function(req, res){
  res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
};

//display book instance create form on get
exports.bookInstance_create_get = function(req, res){
  res.send('NOT IMPLEMENTED: BookInstance create get');
};

//handle book instance create on POST
exports.bookinstance_create_post = function(req, res){
  res.send('NOT IMPLEMENTED: bookInstance create post');
};

//display book instance delete form on get
exports.bookInstance_delete_get = function(req, res){
  res.send('NOT IMPLEMENTED: BookInstance delete get');
};

//handle book instance delete on POST
exports.bookinstance_delete_post = function(req, res){
  res.send('NOT IMPLEMENTED: bookInstance delete post');
};

//display book instance update form on get
exports.bookInstance_update_get = function(req, res){
  res.send('NOT IMPLEMENTED: BookInstance update get');
};

//handle book instance update on POST
exports.bookinstance_update_post = function(req, res){
  res.send('NOT IMPLEMENTED: bookInstance update post');
};

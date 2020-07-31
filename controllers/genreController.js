var Genre = require('../models/genre');
const validator = require('express-validator');

//display list of all genre
exports.genre_list = function(req, res){
  res.send('NOT IMPLEMENTED: Genre list');
};

//display detail page for specific genre
exports.genre_detail = function(req, res){
  res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

//display genre create form on get
exports.genre_create_get = function(req, res){
  res.renderg('genre_form', { title: 'Create Genre' });
};

//handle genre create on POST
exports.genre_create_post = [

  //Validate that the name field is not empty
  validator.body('name', 'Genre name required').trim().isLength({ min: 1}),

  //Sanitizee(escape) the name name_field
  validator.sanitizeBody('name').escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract the validation errors from a request
    const errors = validator.validationResult(req);

    //Create a genre object with escaped and trimmed data
    var genre = new Genre(
      { name: req.body.name }
    );

    if(!errors.isEmpty()){
      //There are errors. Render the form again with sanitized values/error messages
      res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
      return;
    }
    else {
      //Data from form is valid
      //Check if genre with same name already exists
      Genre.findOne({ 'name': req.body.name})
         .exec( function(err, found_genre) {
           if(err) { return next(err); }

           if(found_genre) {
             //Genre exists, redirect to its detail Page
             res.redirect(found_genre.url);
           }
           else {

             genre.save(function(err) {
               if (err) { return next(err); }
               //Genre saved. Redirect to genre detail Page
               res.redirect(genre.url);
             });
           }
         });
    }
  }
];

//display genre delete form on get
exports.genre_delete_get = function(req, res){
  res.send('NOT IMPLEMENTED: Genre delete get');
};

//handle genre delete on POST
exports.genre_delete_post = function(req, res){
  res.send('NOT IMPLEMENTED: Genre delete post');
};

//display genre update form on get
exports.genre_update_get = function(req, res){
  res.send('NOT IMPLEMENTED: Genre update get');
};

//handle genre update on POST
exports.genre_update_post = function(req, res){
  res.send('NOT IMPLEMENTED: Genre update post');
};

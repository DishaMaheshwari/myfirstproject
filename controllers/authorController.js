var Author = require('../models/author');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Display list of all Authors.
exports.author_list = function(req, res, next) {

  Author.find()
    .populate('author')
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });

};
//display detail page for a specific author
exports.author_detail = function(req, res){
  res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

//display author create form on get
exports.author_create_get = function(req, res){
  res.send('author_form', { title: 'Create Author'});
};

//handle Author create on POST
exports.author_create_post = [

  //Validate fields
  body('first_name').isLength({min: 1}).trim().withMessage('First name must be specified.')
      .isAlphanumeric().withMessage('First name has non alphanumeric characters.'),
  body('family_name').isLength({ min: 1}).trim().withMessage('Family name must be specified.')
      .isAlphanumeric().withMessage('Family name has non alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
  body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

  //Sanitize fields
  sanitizeBody('first_name').escape(),
  sanitizeBody('family_name').escape(),
  sanitizeBody('date_of_birth').toDate(),
  sanitizeBody('date_of_death').toDate(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract validation errors from a request
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      //There are errors.Render form again with sanitized values/errors messages.
      res.render('author_form', {title: 'Create Author', author: req.body, errors: errors.array() });
      return;
    }
    else {
      //Data from form is valid

      //Create an Author object with escaped and trimmed data.
      var author = new Author(
        {
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death
        });
      author.save(functon(err)) {
        if (err) { return next(err); }
        //Succesful- redirect to new author record
        res.redirect(auhtor.url);
      });
    }
  }
];

//display delete form on get
exports.author_delete_get = function(req, res){
  res.send('NOT IMPLEMENTED: Author delete GET');
};

//handle Author delete on POST
exports.author_delete_post = function(req, res){
  res.send('NOT IMPLEMENTED: Author delete POST');
};

//display update form on get
exports.author_update_get = function(req, res){
  res.send('NOT IMPLEMENTED: Author update GET');
};

//handle Author update on POST
exports.author_update_post = function(req, res){
  res.send('NOT IMPLEMENTED: Author update POST');
};

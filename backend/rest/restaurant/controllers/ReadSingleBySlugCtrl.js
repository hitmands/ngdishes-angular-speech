(function() {

  var path = require('path');
  var manager = require(path.join(__dirname, '..', 'services', 'DishesManager.js'));

  function ReadPostFoodSingleCtrl(req, res) {
    var slug = req.params.slug;

    return manager
      .findBySlug(slug)
      .then(function(post) {
        res.status(200).json(post);
      })
      .catch(function() {

        res.status(404).end();
      })
      ;

  }

  module.exports = ReadPostFoodSingleCtrl;
}).call(this);

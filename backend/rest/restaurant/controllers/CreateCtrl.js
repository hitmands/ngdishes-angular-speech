(function() {

  var path = require('path');
  var Promise = require('bluebird');
  var manager = require(path.join(__dirname, '..', 'services', 'DishesManager.js'));

  function CreatePostFoodCtrl(req, res) {
    var id = Number(req.params.search);

    return res.json({
      message: "under development",
      username: (req.credentials && req.credentials.username) || null
    });
  }

  module.exports = CreatePostFoodCtrl;
}).call(this);

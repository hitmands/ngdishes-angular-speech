(function() {

  var path = require('path');
  var Promise = require('bluebird');
  var manager = require(path.join(__dirname, '..', 'services', 'DishesManager.js'));


  function DeletePostFoodCtrl(req, res) {
    var id = Number(req.params.search);

    return Promise
      .resolve()
      .then(function() {
        if(id % 1 !== 0) {
          return Promise.reject();
        }

        return manager.deleteItem(id);
      })
      .then(function() {

        return manager.store();
      })
      .then(function() {

        return res.status(200).end();
      })
      .catch(function(err) {
        console.log(id, err);
        return res.status(400).end();
      })
      ;
  }

  module.exports = DeletePostFoodCtrl;
}).call(this);

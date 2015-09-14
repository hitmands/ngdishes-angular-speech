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
          console.log('21');
          return Promise.reject({ status: 400 });
        }

        return manager.findById(id);
      })
      .then(function() {

        return manager.deleteItem(id);
      })
      .then(function() {

        return manager.store();
      })
      .then(function() {

        return res.status(200).end();
      })
      .catch(function(err) {
        var status = err && err.status || 404;

        return res.status(status).end();
      })
      ;
  }

  module.exports = DeletePostFoodCtrl;
}).call(this);

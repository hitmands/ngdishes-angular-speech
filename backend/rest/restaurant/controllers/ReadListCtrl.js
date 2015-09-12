(function() {

  var Promise = require('bluebird');
  var path = require('path');
  var manager = require(path.join(__dirname, '..', 'services', 'DishesManager.js'));

  function ReadPostFoodListCtrl(req, res) {
    var page = req.params.page;
    var itemsPerPage = req.params.itemsPerPage;
    var showFullInfo = req.params.showFullInfo;
    var isFullList = (page < 1);

    return manager
      .count()
      .then(function(itemsCount) {
        if(itemsCount < 1) {
          return Promise.reject({
            status: 204
          });
        }

        if(isFullList) {
          return manager.findAll();
        }

        return manager.findPage(page, itemsPerPage);
      })
      .catch(function() {
        return Promise.reject({
          status: 404
        });
      })
      .then(function(result) {

        if(showFullInfo) {
          return result;
        }

        return result.items || result;
      })
      .then(function(posts) {

        return res.status(200).json(posts);
      })
      .catch(function(rejection) {

        return res.status(rejection.status).end();
      })
    ;

  }

  module.exports = ReadPostFoodListCtrl;
}).call(this);

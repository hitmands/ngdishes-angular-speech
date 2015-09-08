(function() {

  var Promise = require('bluebird');


  function ReadPostFoodListCtrl(req, res) {

    return Promise
      .resolve(res.results)
      .then(function(result) {

        if(result.length < 1) {
          return Promise.reject()
        }

        return result.items;
      })
      .then(function(posts) {

        return res.status(200).json(posts);
      })
      .catch(function() {

        return res.status(204).end();
      })
    ;

  }

  module.exports = ReadPostFoodListCtrl;
}).call(this);

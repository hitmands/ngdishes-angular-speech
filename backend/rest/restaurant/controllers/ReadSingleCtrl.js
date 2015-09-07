(function() {

  var _ = require('lodash');
  var Promise = require('bluebird');

  function ReadPostFoodSingleCtrl(req, res) {
    var id = req.params.id;

    return Promise
      .resolve(res.results)
      .then(function(result) {
        if(result.length < id) {
          return Promise.reject();
        }

        return result.items;
      })
      .then(function(posts) {

        return _.find(posts, { "id": id });
      })
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

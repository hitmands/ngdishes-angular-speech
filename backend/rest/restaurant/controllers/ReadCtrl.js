(function() {

  var fs = require('fs');
  var _ = require('lodash');
  var path = require('path');
  var Promise = require('bluebird');
  var db = path.join(__dirname, '..', 'data', '_db.json');

  var readCollection = Promise.promisify(fs.readFile);

  function ReadPostFoodCtrl(req, res) {
    var id = req.params.id;
    var isArray = _.isUndefined(id);
    var totalPosts;

    id = isArray ? null : _.parseInt(req.params.id, 10);

    if(!isArray && _.isNaN(id)) {
      return res.status(400).end();
    }

    // Simulate a Database Query
    return readCollection(db, 'UTF8')
      .then(function(data) {

        return JSON.parse(data);
      })
      .then(function(data) {
        // Count Items
        totalPosts = data.length;

        return data;
      })
      .then(function(data) {
        if(!isArray) {
          // (If isn't a Collection Query) Check if post exists;
          return id <= data.length ? _.find(data, { "id": id }) : Promise.reject();
        }

        // (If is a Collection Query) return the whole collection;
        return data;
      })
      .then(function(data) {

        // Check if Object or Array are empty
        return _.isEmpty(data) ? Promise.reject() : data;
      })
      .then(function(post) {

        return res.status(200).json(post);
      })
      .catch(function() {
        var status = isArray ? 204 : 404;

        return res.status(status).end();
      })
    ;

  }

  module.exports = ReadPostFoodCtrl;
}).call(this);

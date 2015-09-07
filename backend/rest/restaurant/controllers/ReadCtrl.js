(function() {

  var fs = require('fs');
  var _ = require('lodash');
  var path = require('path');
  var Promise = require('bluebird');
  var db = path.join(__dirname, '..', 'data', '_db.json');

  var ListCtrl = require( path.join(__dirname, 'ReadListCtrl') );
  var SingleCtrl = require( path.join(__dirname, 'ReadSingleCtrl') );

  var readCollection = Promise.promisify(fs.readFile);

  function ReadPostFoodCtrl(req, res, next) {
    var id = req.params.id;
    var isArray = _.isUndefined(id);
    id = isArray ? null : Number(id);

    var isIntId = (id % 1 === 0);

    if(!isArray && !isIntId) {
      return res.status(400).end();
    }

    // Simulate a Database Query
    return readCollection(db, 'UTF8')
      .then(function(data) {

        return JSON.parse(data);
      })
      .then(function(posts) {
        res.results = {
          items: posts,
          length: posts.length
        };

        if(isArray) {
          req.params.isArray = true;
          req.params.id = void(0);
          return ListCtrl;
        }

        req.params.id = id;
        return SingleCtrl;
      })
      .then(function(ctrl) {
        return ctrl(req, res, next);
      })
      ;

  }

  module.exports = ReadPostFoodCtrl;
}).call(this);

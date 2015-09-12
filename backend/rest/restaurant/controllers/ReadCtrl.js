(function() {

  var fs = require('fs');
  var _ = require('lodash');
  var path = require('path');
  var Promise = require('bluebird');

  var ListCtrl = require( path.join(__dirname, 'ReadListCtrl') );
  var SingleByIdCtrl = require( path.join(__dirname, 'ReadSingleByIdCtrl') );
  var SingleBySlugCtrl = require( path.join(__dirname, 'ReadSingleBySlugCtrl') );

  function ReadPostFoodCtrl(req, res, next) {
    var search = req.params.search;
    var page = Number(req.query.page);
    var itemsPerPage = Number(req.query.itemsPerPage);
    var showFullInfo = (req.query.showFullInfo === 'true');

    delete req.params.search;
    delete req.query.page;
    delete req.query.itemsPerPage;
    delete req.query.showFullInfo;

    var slug = String(search);
    var id = Number(search);

    var isArray = _.isUndefined(search);
    var isIntId = (id % 1 === 0);

    return Promise
      .resolve()
      .then(function() {
        if(isArray) {
          req.params.page = page || -1;
          req.params.itemsPerPage = itemsPerPage || 20;
          req.params.isArray = true;
          req.params.showFullInfo = showFullInfo;
          return ListCtrl;
        }

        if(isIntId) {
          req.params.id = id;
          return SingleByIdCtrl;
        }

        req.params.slug = slug;
        return SingleBySlugCtrl;
      })
      .then(function(controller) {
        return controller(req, res, next);
      })
      ;

  }

  module.exports = ReadPostFoodCtrl;
}).call(this);

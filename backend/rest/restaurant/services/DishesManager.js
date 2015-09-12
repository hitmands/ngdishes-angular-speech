(function() {
  'use strict';

  var path = require('path');
  var Promise = require('bluebird');
  var _ = require('lodash');
  var fs = require('fs');
  var _db = path.join(__dirname, '..', 'data', '_db.dishes.json');
  var data = require(_db);
  var moment = require('moment');
  var slug = require('slug');

  function DishesManager(data) {
    this._data = data;
    this.length = data._length;
  }

  DishesManager.prototype._data = [];
  DishesManager.prototype._length = 0;

  DishesManager.prototype.count = function(includeDeleted) {
    return Promise.resolve(this._data.length);
  };

  DishesManager.prototype.countSync = function(includeDeleted) {
    return this.length;
  };

  DishesManager.prototype.createItem = function(data) {
    this._data.push = _.merge(data, {
      id : (this.count(true) + 1),
      pubdate : moment().format(),
      slug: slug(data.title),
      revisions : []
    });

    this._length += 1;

    return this;
  };

  DishesManager.prototype.updateItem = function(id, data) {
    var index = _.findIndex(this._data, {id : id});

    this._data[index] = _.merge(this._data[index], data);
    this._data[index].revisions.push({
      date : moment().format(),
      action : 'update'
    });

    return this;
  };

  DishesManager.prototype.deleteItem = function(id) {
    var index = _.findIndex(this._data, {id : id});

    this._data[index].deleted = true;
    this._data[index].revisions.push({
      date : moment().format(),
      action : 'delete'
    });

    return this;
  };

  DishesManager.prototype.findById = function(id, includeDeleted) {
    var haystack = {id : id};
    var task = 'resolve';

    if(!includeDeleted) {
      haystack.deleted = false;
    }

    var res = _.find(this._data, haystack);

    if(!res) {
      task = 'reject';
    }

    return Promise[task](res);
  };

  DishesManager.prototype.findBySlug = function(slug, includeDeleted) {
    var haystack = {slug : slug};
    var task = 'resolve';

    if(!includeDeleted) {
      haystack.deleted = false;
    }

    var res = _.find(this._data, haystack);

    if(!res) {
      task = 'reject';
    }

    return Promise[task](res);
  };

  DishesManager.prototype.findAll = function(includeDeleted) {
    var haystack = {deleted : false};

    if(includeDeleted) {
      haystack = void(0);
    }

    return Promise.resolve(_.filter(this._data, haystack));
  };

  DishesManager.prototype.findPage = function(page, itemsPerPage, includeDeleted) {
    var haystack = includeDeleted ? void(0) : {deleted : false};
    var req = _.filter(this._data, haystack);
    var reqLength = req.length;
    var totalPages = Math.ceil(reqLength / itemsPerPage);
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var res = _.slice(req, startIndex, endIndex);
    var task = 'resolve';

    if(res && res.length) {
      res = {
        items: res,
        page: page,
        itemsPerPage: itemsPerPage,
        totalItems: reqLength,
        totalPages: totalPages
      };
    } else {
      res = null;
      task = 'reject';
    }

    return Promise[task](res);
  };


  DishesManager.prototype.store = function() {
    var self = this;

    return new Promise(function(resolve, reject) {
      fs.writeFile(_db, JSON.stringify(self._data, null, 3), function(err) {
        if(err) {
          return reject(err);
        }

        return resolve(self._data)
      });
    });
  };

  module.exports = new DishesManager(data);
}).call(this);

(function() {

  var path = require('path');

  var createCtrl = require( path.join(__dirname, 'controllers', 'CreateCtrl') );
  var readCtrl = require( path.join(__dirname, 'controllers', 'ReadCtrl') );
  var updateCtrl = require( path.join(__dirname, 'controllers', 'UpdateCtrl') );
  var deleteCtrl = require( path.join(__dirname, 'controllers', 'DeleteCtrl') );


  function restaurantApiRoutes(app) {

    app

    /**
     * @apiGroup Restaurant/Dishes
     * @apiDescription /api/<version>/<format>/<group>
     * @apiSampleRequest /api/v1/json/restaurant/dishes
     */
      .route('/api/v1/json/restaurant/dishes/:search?')

    /**
     * @api {get} /api/v1/json/:idOrSlug
     * @apiGroup Restaurant
     * @apiVersion 1.0.0
     * @apiDescription Returns an Object or Array

     * @apiParam {int{1..}} [id]
     * @apiParam {string{1..}} [slug]
     * @apiParam {int} [page] Query string parameter, ignored if idOrSlug is provided;
     * @apiParam {int} [itemsPerPage = 20] Query string parameter, ignored if idOrSlug is provided;
     * @apiParam {int} [showFullInfo] Query string parameter, ignored if idOrSlug is provided;
     * @apiSuccess {Object[]} data
     */
      .get(readCtrl)

    /**
     * @api {post} /api/v1/json/
     * @apiGroup Restaurant
     * @apiVersion 1.0.0
     * @apiDescription Creates an Item

     * @apiHeader {String} Authorization Http Basic Access Authentication
     * @apiPermission admin

     * @apiParam {Object} data The new Post Object
     * @apiParamExample {json} Request-Example:
     *  {
     *     "title": "Pizza Margherita",
     *     "...": "..."
     *  }

     */
      .post(createCtrl)

    /**
     * @api {put} /api/v1/json/:id
     * @apiGroup Restaurant
     * @apiVersion 1.0.0
     * @apiDescription Updates an existing Item

     * @apiHeader {String} Authorization Http Basic Access Authentication
     * @apiPermission admin

     * @apiParam {int{1..}} id The id of the Item
     * @apiParam {Object} data The updated data
     * @apiParamExample {json} Request-Example:
     *  {
     *     "title": "Pizza Margherita"
     *     "...": "..."
     *  }

     */
      .put(updateCtrl)

    /**
     * @api {delete} /api/v1/json/:id
     * @apiGroup Restaurant
     * @apiVersion 1.0.0
     * @apiDescription Deletes an Item

     * @apiHeader {String} Authorization Http Basic Access Authentication
     * @apiPermission admin

     * @apiParam {int{1..}} id The id of the Item

     */
      .delete(deleteCtrl)
    ;

  }

  module.exports = restaurantApiRoutes
}).call(this);

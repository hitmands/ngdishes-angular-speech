(function() {

  var path = require('path');

  var createCtrl = require( path.join(__dirname, 'controllers', 'CreateCtrl') );
  var readCtrl = require( path.join(__dirname, 'controllers', 'ReadCtrl') );
  var updateCtrl = require( path.join(__dirname, 'controllers', 'UpdateCtrl') );
  var deleteCtrl = require( path.join(__dirname, 'controllers', 'DeleteCtrl') );


  function testApiRoutes(app) {

    app

    /**
     * @apiGroup Restaurant
     * @apiDescription /api/<version>/<format>/<group>
     * @apiSampleRequest /api/v1/json/restaurant
     */
      .route('/api/v1/json/restaurant/:id?')

    /**
     * @api {get} /api/v1/json/:id
     * @apiGroup Restaurant
     * @apiVersion 1.0.0
     * @apiDescription Returns a Item or Array of Items

     * @apiParam {int{1..}} [id]
     * @apiSuccess {Object[]} Post Returns an Object or Array of Items
     */
      .get(readCtrl)

    /**
     * @api {post} /api/v1/json/
     * @apiGroup Restaurant
     * @apiVersion 1.0.0
     * @apiDescription Creates an Item

     * @apiHeader {String} Authorization Http Basic Access Authentication
     * @apiPermission admin

     * @apiParam {Object} post The new Post Object
     * @apiParamExample {json} Request-Example:
     *  {
     *     "title": "Pizza Margherita",
     *     "..." : "..."
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

     * @apiParam {int} id The id of the Item
     * @apiParam {Object} post The updated data
     * @apiParamExample {json} Request-Example:
     *  {
     *     "title": "Pizza Margherita"
     *     "..." : "..."
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

     * @apiParam {int} id The id of the Item

     */
      .delete(deleteCtrl)
    ;

  }

  module.exports = testApiRoutes
}).call(this);

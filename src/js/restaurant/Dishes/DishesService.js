(function() {

  /* @ngInject */
  function DishesService() {
    var self = this;


  }

  angular
    .module(FSYS.APP + '.restaurant')
    .service('DishesService', DishesService)
}).call(this);

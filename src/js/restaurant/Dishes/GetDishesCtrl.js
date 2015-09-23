(function() {

  /* @ngInject */
  function GetDishesConfig($stateProvider) {
    var section = {
      name: 'app.restaurant.get-dishes',
      url: 'dishes/',
      data: {
        pageTitle: 'appname-index'
      },
      views: {
        'main@': {
          templateUrl: '/partials/restaurant/Dishes/GetDishes.html',
          controller: 'GetDishesCtrl'
        }
      }
    };

    $stateProvider
      .state(section);
  }

  /* @ngInject */
  function GetDishesCtrl($scope, DishesService) {
//  var vm = this;
  }

  angular
    .module(FSYS.APP + '.restaurant')
    .config(GetDishesConfig)
    .controller('GetDishesCtrl', GetDishesCtrl)
  ;
}).call(this);

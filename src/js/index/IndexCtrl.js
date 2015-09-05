(function() {

  /* @ngInject */
  function IndexConfig($stateProvider) {
    var section = {
      name: 'app.index',
      url: '',
      data: {
        pageTitle: 'appname-index'
      },
      views: {
        'main@': {
          templateUrl: '/partials/index/Index.html',
          controller: 'IndexCtrl'
        }
      }
    };

    $stateProvider
      .state(section);
  }

  /* @ngInject */
  function IndexCtrl() {
//  var vm = this;

  }

  angular
    .module(FSYS.APP)
    .config(IndexConfig)
    .controller('IndexCtrl', IndexCtrl)
  ;
}).call(this);

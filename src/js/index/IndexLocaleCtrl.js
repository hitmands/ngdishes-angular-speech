(function() {

  /* @ngInject */
  function IndexLocaleConfig($stateProvider) {
    var section = {
      name: 'app.locale.index',
      url: '',
      data: {
        pageTitle: 'appname-locale-index'
      },
      views: {
        'main@': {
          templateUrl: '/partials/index/Index.html',
          controller: 'IndexLocaleCtrl'
        }
      }
    };

    $stateProvider
      .state(section);
  }

  /* @ngInject */
  function IndexLocaleCtrl() {
//  var vm = this;

  }

  angular
    .module(FSYS.APP)
    .config(IndexLocaleConfig)
    .controller('IndexLocaleCtrl', IndexLocaleCtrl)
  ;
}).call(this);

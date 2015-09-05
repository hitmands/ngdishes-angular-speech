(function() {

  /* @ngInject */
  function ErrorsModuleConfig($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise(function($injector, $location){

      return 'errors/not-found/';
    });

    var section = {
      name: 'app.errors',
      abstract: true,
      url: 'errors/',
      data: {
        pageTitle: 'router-error'
      }
    };

    $stateProvider
      .state(section)
    ;
  }

  /* @ngInject */
  function ErrorsModuleRun($rootScope) {

  }


  var dependencies = [
    FSYS.APP
  ];


  angular
    .module(FSYS.APP + '.errors', dependencies)
    .config(ErrorsModuleConfig)
    .run(ErrorsModuleRun)
  ;
}).call(this);

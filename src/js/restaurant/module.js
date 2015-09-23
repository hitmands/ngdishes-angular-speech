(function() {

  /* @ngInject */
  function ErrorsModuleConfig($stateProvider) {


    var section = {
      name: 'app.restaurant',
      abstract: true,
      url: 'restaurant/',
      data: {
        pageTitle: 'router-restaurant'
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
    .module(FSYS.APP + '.restaurant', dependencies)
    .config(ErrorsModuleConfig)
    .run(ErrorsModuleRun)
  ;
}).call(this);

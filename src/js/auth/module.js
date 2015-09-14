(function() {

  /* @ngInject */
  function AuthModuleConfig() {

  }

  /* @ngInject */
  function AuthModuleRun($rootScope) {

  }


  var dependencies = [
    FSYS.APP
  ];

  angular
    .module(FSYS.APP + '.auth', dependencies)
    .constant('INIT_SESSION', FSYS.session)
    .config(AuthModuleConfig)
    .run(AuthModuleRun)
  ;
}).call(this);

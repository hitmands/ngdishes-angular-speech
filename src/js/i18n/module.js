(function() {

  /* @ngInject */
  function LocaleModuleConfig() {

  }

  /* @ngInject */
  function LocaleModuleRun($rootScope) {

  }


  var dependencies = [
    FSYS.APP
  ];

  angular
    .module(FSYS.APP + '.locale', dependencies)
    .config(LocaleModuleConfig)
    .run(LocaleModuleRun)
  ;
}).call(this);

(function() {

  /* @ngInject */
  function NgProgressConfig() {
  }
  /* @ngInject */
  function NgProgressRun($rootScope, ngProgressFactory) {
    var ngProgress = ngProgressFactory.createInstance();

    $rootScope.$on('$stateChangeStart', function ngProgressStart() {
      ngProgress.start();
    });
    $rootScope.$on('$stateChangeSuccess', function ngProgressComplete() {
      ngProgress.complete();

    });
    $rootScope.$on('$stateChangeError', function ngProgressReset() {
      ngProgress.reset();
    });
  }


  angular
    .module(FSYS.APP)
    .config(NgProgressConfig)
    .run(NgProgressRun)
  ;

}).call(this);

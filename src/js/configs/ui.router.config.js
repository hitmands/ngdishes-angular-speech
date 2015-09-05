(function() {

  /* @ngInject */
  function UiRouterConfig($urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.url();

      if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
        return;
      }

      if (path.indexOf('?') > -1) {
        return path.replace('?', '/?');
      }

      return path + '/';
    });
  }


  angular
    .module(FSYS.APP)
    .config(UiRouterConfig)
  ;

}).call(this);

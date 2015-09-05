(function() {

  /* @ngInject */
  function ApplicationConfig(FSYS, IS_PRODUCTION, IS_DEBUG, $stateProvider, $compileProvider, $locationProvider) {
    $compileProvider.debugInfoEnabled(!IS_PRODUCTION || IS_DEBUG);
    $locationProvider.html5Mode(true);


    var app = {
      name: "app",
      url: "^/",
      abstract: true,
      views: {
        main: {
          templateUrl: '/partials/main-base.html'
        },
        header: {
          templateUrl: '/partials/header-base.html'
        },
        footer: {
          templateUrl: '/partials/footer-base.html'
        }
      },
      data: {
        pageTitle: 'appname'
      }
    };


    $stateProvider
      .state(app)
    ;
  }

  /* @ngInject */
  function ApplicationRun($rootScope, $state, $stateParams, $injector) {
    // TEST ONLY
    window.$rootScope = $rootScope;
    window.$injector = $injector;
    window.$state = $state;

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }


  var dependencies = [
    'ui.router',
    'ngSanitize',
    'ngAnimate',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngProgress',
    'ui.bootstrap',
    FSYS.APP + '.auth',
    FSYS.APP + '.locale',
    FSYS.APP + '.errors'
  ];


  angular
    .module(FSYS.APP, dependencies)
    .constant('FSYS', FSYS)
    .constant('IS_PRODUCTION', !!FSYS.PRODUCTION)
    .constant('IS_DEBUG', !!FSYS.DEBUG)
    .constant('ENVIRONMENT', FSYS.ENV)
    .config(ApplicationConfig)
    .run(ApplicationRun)
  ;
}).call(this);

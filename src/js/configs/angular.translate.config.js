(function() {

  /* @ngInject */
  function AngularTranslateConfig($translateProvider, I18nProvider) {
    var defaultLocale = I18nProvider.getDefault();

    $translateProvider
      .useSanitizeValueStrategy(null)
      .useStaticFilesLoader({
        prefix: '/build/i18n/',
        suffix: '.json'
      })
      .determinePreferredLanguage(function() {
        return defaultLocale;
      });
  }

  /* @ngInject */
  function AngularTranslateRun($rootScope, $translate, I18n) {
    $rootScope.$on('$translateChangeSuccess', function(event, locale) {
      console.log('%cTRANSLATE SET', 'color: #EB6528; font-weight:bold;', locale);
    });
  }


  angular
    .module(FSYS.APP)
    .config(AngularTranslateConfig)
    .run(AngularTranslateRun)
  ;

}).call(this);

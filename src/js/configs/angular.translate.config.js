(function() {

  /* @ngInject */
  function AngularTranslateConfig($translateProvider, I18nProvider, $injector) {
    var defaultLocale = I18nProvider.getDefault();

    $translateProvider
      .useSanitizeValueStrategy(null)
      .useStaticFilesLoader({
        prefix: '/build/i18n/',
        suffix: '.json'
      })
      .determinePreferredLanguage(function() {
        console.log('$translateProvider.determinePreferredLanguage', defaultLocale);
        return defaultLocale.iso;
      });
  }

  /* @ngInject */
  function AngularTranslateRun(I18n) {}

  angular
    .module(FSYS.APP)
    .config(AngularTranslateConfig)
    .run(AngularTranslateRun)
  ;

}).call(this);

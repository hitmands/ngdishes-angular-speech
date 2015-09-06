(function() {

  /* @ngInject */
  function LocaleConfig($stateProvider, I18nProvider) {
    var isoList = I18nProvider.getUrlParams();

    var localizedApp = {
      name: 'app.locale',
      url: "{iso:" + isoList.join('|') + "}/",
      abstract: true,
      resolve: {
        currentLocale: /* @ngInject */ function($stateParams, I18n, $state, $log) {
          return I18n.use($stateParams.iso).catch(function(error) {
            $log.error('PROMISE_ERROR:I18n.use', error);
            return $state.go('app.errors.500');
          });
        }
      },
      data: {
        pageTitle: 'appname-locale'
      }
    };

    $stateProvider
      .state(localizedApp);
  }

  /* @ngInject */
  function LocaleCtrl() {
//  var vm = this;

  }

  angular
    .module(FSYS.APP + '.i18n')
    .config(LocaleConfig)
    .controller('LocaleCtrl', LocaleCtrl)
  ;
}).call(this);

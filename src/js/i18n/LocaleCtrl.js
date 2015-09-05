(function() {

  /* @ngInject */
  function LocaleConfig($stateProvider, I18nProvider) {
    var isoList = I18nProvider.getUrlParams();

    var localizedApp = {
      name: 'app.locale',
      url: "{iso:"+ isoList.join('|') +"}/",
      abstract: true,
      resolve: {
        currentLocale: /* @ngInject */ function($stateParams, I18n, $state, $log) {
          return I18n.resolveByUrlParam($stateParams.iso).catch(function(error) {
            $log.error('ERROR:I18n.resolveByUrlParam', error);
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
  function LocaleCtrl(currentLocale) {
//  var vm = this;

  }

  angular
    .module(FSYS.APP + '.locale')
    .config(LocaleConfig)
    .controller('LocaleCtrl', LocaleCtrl)
  ;
}).call(this);

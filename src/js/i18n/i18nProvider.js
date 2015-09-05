(function() {

  /* @ngInject */
  function I18nServiceProviderFactory(tmhDynamicLocaleProvider) {
    var provider = this;
    var _availableLanguages = FSYS.i18n.languages;
    var _urlParams = (function() {
      var res = [];

      for(var i = 0; i < _availableLanguages.length; i++) {
        res.push(_availableLanguages[i].iso);
      }

      return res;
    }).call(this);


    tmhDynamicLocaleProvider.localeLocationPattern('/vendor/angular-i18n/angular-locale_{{locale}}.js');


    provider.getDefault = function() {
      return _availableLanguages[0].iso;
    };
    provider.getAvailableList = function() {
      return _availableLanguages;
    };
    provider.getUrlParams = function() {
      return _urlParams;
    };

    /* @ngInject */
    provider.$get = function I18nServiceFactory($translate, tmhDynamicLocale, $rootScope, $q) {
      var scope = this;

      var i18nService = (function() {
        function I18nService() {}

        I18nService.prototype._current = null;
        I18nService.prototype._languagesList = _availableLanguages;


        I18nService.prototype.set = function(value) {
          var self = this;

          return $translate
            .use(value)
            .then(
            function(data) {
              return self._set(value).get();
            },
            function(error) {
              $q.reject(error);
            }
          );
        };
        I18nService.prototype.resolveByUrlParam = function(urlParam) {
          var self = this;
          var deferred = $q.defer();

          $translate
            .use(urlParam)
            .then(
            function(data) {
              return self._configure(urlParam);
            },
            function(error) {
              deferred.reject(error);
              return $q.reject(error);
            }
          ).then(function() {
              deferred.resolve(urlParam);
            })
          ;

          return deferred.promise;
        };


        I18nService.prototype._loadAngularI18n = function(value) {
          tmhDynamicLocale.set(value.replace(/_/g, '-'));
          return this;
        };
        I18nService.prototype._setLangHtmlAttribute = function(value) {
          window.document.documentElement.setAttribute('lang', value);
          return this;
        };
        I18nService.prototype._update$rootScope = function(value) {
          $rootScope.currentLocale = value;
          return this;
        };
        I18nService.prototype._configure = function(value) {
          this._current = value;
          return this._loadAngularI18n(value)._setLangHtmlAttribute(value)._update$rootScope(value);
        };


        I18nService.prototype.has = function(iso) {
          var haystack = provider.getUrlParams();
          for(var i = 0; i < haystack.length; i++) {
            if(angular.equals(iso, haystack[i])) {
              return true;
            }
          }

          return false;
        };


        I18nService.prototype.get = function() {
          return this._current;
        };
        I18nService.prototype.getAvailableList = function() {
          return this._languagesList;
        };
        I18nService.prototype.getDefaultList = function() {
          return provider.getAvailableList();
        };

        return new I18nService();
      }).call(this);


      return i18nService;
    };
  }

  angular
    .module(FSYS.APP + '.locale')
    .provider('I18n', I18nServiceProviderFactory)
  ;
}).call(this);

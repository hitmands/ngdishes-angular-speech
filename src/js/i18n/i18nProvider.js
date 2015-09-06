(function() {

  /* @ngInject */
  function I18nServiceProviderFactory(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/vendor/angular-i18n/angular-locale_{{locale}}.js');

    var AVAILABLE_LANGUAGES = FSYS.i18n.languages;
    var DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES[0];
    var DEFAULT_ISO_LIST = (function() {
      var res = [];

      for(var i = 0; i < AVAILABLE_LANGUAGES.length; i++) {
        res.push(AVAILABLE_LANGUAGES[i].iso);
      }

      return res;
    }).call(this);

    var provider = this;
    var current = null;


    /**
     * Returns the Default Locale Object
     * @returns {Object}
     */
    provider.getDefault = function() {
      return DEFAULT_LANGUAGE;
    };

    /**
     * Returns the list of supported ISO Code
     * @returns {Array<string>}
     */
    provider.getUrlParams = function() {
      return DEFAULT_ISO_LIST;
    };

    /**
     * If param given returns Object|null, otherwise returns the whole list of supported languages;
     * @param {string} [iso = undefined]
     * @returns {Object|Array<Object>|null}
     */
    provider.get = function(iso) {
      var list = AVAILABLE_LANGUAGES;

      if(!angular.isString(iso)) {
        return list;
      }

      for(var i = 0; i < list.length; i++) {
        if(angular.equals(list[i].iso, iso)) {
          return list[i];
        }
      }

      return null;
    };

    /* @ngInject */
    provider.$get = function I18nServiceFactory($translate, tmhDynamicLocale, $rootScope, $q, $log) {

      var i18nService = (function() {
        /**
         * @singleton
         * @constructor
         */
        function I18nService() {}

        /**
         * Checks if the param (according to ISO LANGUAGES CODE) is supported.
         * @param {string} iso
         * @returns {boolean}
         */
        I18nService.prototype.supports = function(iso) {
          return (DEFAULT_ISO_LIST.indexOf(iso) !== -1);
        };

        /**
         * If supported sets the current language, returns Promise;
         * @param {string} iso
         * @returns {Promise}
         */
        I18nService.prototype.use = function(iso) {
          var supported = this.supports(iso);

          if(!supported) {
            return $q.reject({
              iso: iso,
              supported: supported
            });
          }

          return $translate.use(iso);
        };

        /**
         * If param given returns Object|null, otherwise returns Array the whole list of supported languages;
         * @param {string} [iso = undefined]
         * returns {Object|Array<Object>|null};
         */
        I18nService.prototype.get = function(iso) {
          return provider.get(iso);
        };

        /**
         * returns the current locale
         * @returns {Object|null}
         */
        I18nService.prototype.getCurrent = function() {
          return current;
        };

        /**
         * Loads angular-i18n module, sets Lang Attribute to the Html tag, Updates $rootScope.currentLocale
         * @param iso
         * @returns {I18nService}
         * @private
         */
        I18nService.prototype._configure = function(iso) {
          var self = this;

          $q
            .when(tmhDynamicLocale.set(iso.replace(/_/g, '-')))
            .then(function() {
              return window.document.documentElement.setAttribute('lang', iso);
            })
            .then(function() {
              current = self.get(iso);

              return current;
            })
            .then(function(current) {
              $rootScope.currentLocale = current.iso;
              return current;
            })
            .then(function(current) {
              console.log('%ci18n, using: ', 'color: #EB6528; font-weight:bold;', current);
              return current;
            })
            .catch(function(error) {
              $log.error('i18n configuration error:', error);
              return $q.reject(error);
            })
          ;

          return this;
        };

        return new I18nService();
      }).call(this);


      // Handling $translateChangeSuccess and (re)configure the module
      $rootScope.$on('$translateChangeSuccess', function(event, locale) {
        i18nService._configure(locale.language);
      });

      return i18nService;
    };
  }

  angular
    .module(FSYS.APP + '.i18n')
    .provider('I18n', I18nServiceProviderFactory)
  ;
}).call(this);

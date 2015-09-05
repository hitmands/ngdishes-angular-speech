(function() {

  /* @ngInject */
  function Error500Config($stateProvider) {
    var section = {
      name: 'app.errors.500',
      url: 'server-error/',
      views: {
        'main@': {
        controllerAs: 'error',
          templateUrl: '/partials/errors/Error500/Error500.html',
          controller: 'Error500Ctrl'
        }
      },
      data: {
        pageTitle: 'router-error-500'
      }
    };

    $stateProvider
      .state(section);
  }

  /* @ngInject */
  function Error500Ctrl() {
  var vm = this;

  }

  angular
    .module(FSYS.APP + '.errors')
    .config(Error500Config)
    .controller('Error500Ctrl', Error500Ctrl)
  ;
}).call(this);

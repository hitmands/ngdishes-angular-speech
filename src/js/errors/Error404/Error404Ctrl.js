(function() {

  /* @ngInject */
  function Error404Config($stateProvider) {
    var section = {
      name: 'app.errors.404',
      url: 'not-found/',
      views: {
        'main@': {
        controllerAs: 'error',
          templateUrl: '/partials/errors/Error404/Error404.html',
          controller: 'Error404Ctrl'
        }
      },
      data: {
        pageTitle: 'router-error-404'
      }
    };

    $stateProvider
      .state(section);
  }

  /* @ngInject */
  function Error404Ctrl() {
  var vm = this;

  }

  angular
    .module(FSYS.APP + '.errors')
    .config(Error404Config)
    .controller('Error404Ctrl', Error404Ctrl)
  ;
}).call(this);

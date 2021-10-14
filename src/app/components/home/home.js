import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './home.css';
import template from './home.html';

class HomeCtrl {
  constructor($log) {
    // $log.info('HomeCtrl instantiated');
    this.title = 'Home Works!';
  }
}

HomeCtrl.$inject = ['$log'];

let home = {
  template: template,
  controller: HomeCtrl,
};

const MODULE_NAME = 'home';

angular
  .module(MODULE_NAME, [uiRouter])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('');
    $stateProvider.state('home', {
      url: '',
      template: '<home></home>',
    });
    $stateProvider.state('theaters', {
      url: 'theaters/{id}',
      template: '<home></home>',
    });
  })
  .component('home', home);

export default MODULE_NAME;

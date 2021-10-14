import angular from 'angular';
import uiRouter from 'angular-ui-router';

import home from './components/home/home';
import about from './components/about/about';

import '../style/app.css';
import template from './app.html';

export class AppCtrl {
  constructor($log) {
    // $log.info('AppCtrl instantiated');
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

AppCtrl.$inject = ['$log'];

export const appDirective = {
  template: template,
  controller: AppCtrl,
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [home, about]).component('app', appDirective);

export default MODULE_NAME;

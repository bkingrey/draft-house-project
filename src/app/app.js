import angular from 'angular';
import uiRouter from 'angular-ui-router';

import home from './components/home/home';
import selections from './components/selections/selections';

import '../style/app.css';
import template from './app.html';

export class AppCtrl {
  constructor($log) {
    this.url = 'https://github.com/preboot/angular-webpack';
  }
}

AppCtrl.$inject = ['$log'];

export const appDirective = {
  template: template,
  controller: AppCtrl,
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [home, selections]).component('app', appDirective);

export default MODULE_NAME;

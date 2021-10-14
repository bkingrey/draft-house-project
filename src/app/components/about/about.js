import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './about.css';
import template from './about.html';

class AboutCtrl {
  constructor($scope, $http, $log) {
    // $log.info('AboutCtrl instantiated');
    this.title = 'FIND A MOVIE';
    this.films = $scope.films;
    this.heroSlider = $scope.heroSlider;
    this.market = $scope.market;
    this.sessionAttributes = $scope.sessionAttributes;
    this.sessions = $scope.sessions;
    var successCallBack = function (response) {
      const res = response.data;
      console.log(res);
      $scope.films = res.data.films;
      $scope.heroSlider = res.data.heroSlider;
      $scope.market = res.data.market;
      $scope.sessionAttributes = res.data.sessionAttributes;
      $scope.sessions = res.data.sessions;
    };
    var errorCallBack = function (response) {
      this.error = response.data;
    };
    $http({
      method: 'GET',
      url: 'https://drafthouse.com/s/mother/v1/page/market/main/austin',
    }).then(successCallBack, errorCallBack);
  }
}

AboutCtrl.$inject = ['$scope', '$http', '$log'];

let about = {
  template: template,
  controller: AboutCtrl,
};

const MODULE_NAME = 'about';

angular
  .module(MODULE_NAME, [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('about', {
      url: '/about',
      template: '<about></about>',
    });
  })
  .component('about', about);

export default MODULE_NAME;

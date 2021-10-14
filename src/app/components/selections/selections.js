import angular from 'angular';
import uiRouter from 'angular-ui-router';

import './selections.css';
import template from './selections.html';

class SelectionsCtrl {
  constructor($scope, $http, $log) {
    this.title = 'FIND A MOVIE';
    this.selectedTheater = $scope.selectedTheater;
    this.selectedSessions = $scope.selectedSessions;
    this.films = $scope.films;
    this.heroSlider = $scope.heroSlider;
    this.market = $scope.market;
    this.sessionAttributes = $scope.sessionAttributes;
    this.sessions = $scope.sessions;

    $scope.goToTheater = function (session) {
      const url = `https://drafthouse.com/show/${session.filmSlug}?cinemaId=${session.cinemaId}`;
      window.open(url, '_blank') || window.location.replace(url);
    };

    $scope.selectedATheater = function (theater) {
      updateTheaterListings(theater.id);
      $scope.selectedTheater = theater;
    };

    var updateTheaterListings = function (id) {
      const filteredSessions = $scope.sessions
        .filter((session) => session.cinemaId === id)
        .map((session) => {
          return {
            filmName: session.filmName,
            filmSlug: session.filmSlug,
            cinemaId: session.cinemaId,
          };
        });
      $scope.selectedSessions = [
        ...new Map(
          filteredSessions.map((session) => [session['filmSlug'], session])
        ).values(),
      ].sort(compare);
    };

    var compare = function (a, b) {
      const filmSlugA = a.filmSlug.toUpperCase();
      const filmSlugB = b.filmSlug.toUpperCase();
      let comparison = 0;
      if (filmSlugA > filmSlugB) {
        comparison = 1;
      } else if (filmSlugA < filmSlugB) {
        comparison = -1;
      }
      return comparison;
    };

    var successCallBack = function (response) {
      const res = response.data;
      $scope.sessionHovered = false;
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

SelectionsCtrl.$inject = ['$scope', '$http', '$log'];

let selections = {
  template: template,
  controller: SelectionsCtrl,
};

const MODULE_NAME = 'selections';

angular
  .module(MODULE_NAME, [uiRouter])
  .config(($stateProvider) => {
    $stateProvider.state('selections', {
      url: '/selections',
      template: '<selections></selections>',
    });
  })
  .component('selections', selections);

export default MODULE_NAME;

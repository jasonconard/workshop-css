'use strict';

/**
 * @ngdoc overview
 * @name exampleApp
 * @description
 * # exampleApp
 *
 * Main module of the application.
 */

var i18n = angular.module('i18n');
i18n.config(['i18nServiceProvider', function(i18nServiceProvider) {
  //Set Locales for service
  i18nServiceProvider.setLocales({
    'default': 'i18n/resources-locale_en.json',
    'en': 'i18n/resources-locale_en.json',
    'fr': 'i18n/resources-locale_fr.json'
  }, true);
}]);


var app = angular.module('workshop-css', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'i18n']);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.run(['$rootScope', '$http', 'i18nService', function ($rootScope, $http, i18nService) {
  $rootScope.i18nLanguage = i18nService.i18n;

  $http.get('configuration/conf.json')
      .success(function (data) {
        $rootScope.frontVersion = data.version;
      })
      .error(function () {
      });
}]);
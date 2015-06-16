'use strict';

/**
 * @ngdoc overview
 * @name exampleApp
 * @description
 * # exampleApp
 *
 * Main module of the application.
 */

var app = angular.module('workshop-css', ['ngAnimate']);

var MainCtrl = function($scope){
  $scope.leftMenuOpen = false;

  $scope.toggleMenu = function() {
    $scope.leftMenuOpen = !$scope.leftMenuOpen;
  }

  $scope.list = ['Pomme', 'Chaussettes', 'Chips'];
  $scope.listExample = [
    {'name': 'Bulbizarre', 'css': 'bulbizarre'},
    {'name': 'Salamèche', 'css': 'salameche'},
    {'name': 'Carapuce', 'css': 'carapuce'}];

  $scope.listSelected = null;
  $scope.selectInList = function(item) {
    $scope.listSelected = item;
  }

  $scope.buttonsOpen = false;
  $scope.toggleButtons = function(){
    $scope.buttonsOpen = !$scope.buttonsOpen;
  }


  $scope.deleteItem = function(index) {
    $scope.list.splice(index, 1);
  }

  $scope.reinitItems = function() {
    $scope.list = ['Pomme', 'Chaussettes', 'Chips'];
  }

};
app.controller('MainCtrl', ['$scope', MainCtrl]);


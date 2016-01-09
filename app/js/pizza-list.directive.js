(function () {
  'use strict';

  /**
   * Directive for showing an editable list.
   */
  var m = angular.module('tynkki.directives.pizzaList', [
    'linkify'
  ]);

  m.directive('tynkkiPizzaList', function () {
    return {
      restrict: 'E',
      controller: 'PizzaListController',
      controllerAs: 'list',
      templateUrl: 'templates/pizza-list.directive.html',
      scope: {
        items: '=',
        onItemsChanged: '&',
      },
      bindToController: true
    };
  });

  m.controller('PizzaListController', function () {
    // New items can be added by typing in the lowermost row and pressing the button
    this.newItemText = '';
    this.addNewItem = function add() {
      if (this.newItemText) {
        this.items.push({text: this.newItemText});
        this.newItemText = '';
      }
    };

    // Keep track of the items selected for deletion
    var selectedItems = [];
    this.itemIsNowSelected = function itemSelected(item, isSelected) {
      if (isSelected) {
        selectedItems.push(item);
      } else {
        _.pull(selectedItems, item);
      }
    };

    // Remove the items selected for deletion from the pizza list
    this.deleteSelectedItems = function deleteThem() {
      // Deletion of many items is cleanest and most convenient to do using lodash
      _.remove(this.items, function isSelected(item) {
        return _.contains(selectedItems, item);
      });
      // Nothing is selected anymore, the formerly selected items have all been removed
      selectedItems = [];
    };

    // We want to disable the button when there is nothing to add or delete
    this.noItemsSelected = function nothingSelected() {
      return _.isEmpty(selectedItems);
    };
  });
})();

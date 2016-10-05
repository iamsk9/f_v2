// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var sampleApp = angular.module('starter', ['ionic', 'starter.controllers', 'backand', 'starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function(BackandProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
  BackandProvider.setAppName('freshworld');
  BackandProvider.setSignUpToken('7b9e3550-c67a-4282-8746-1e3a36820872');
  BackandProvider.setAnonymousToken('dc4a9b54-fdd9-4ec2-8dc5-21e13049f4b2');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl as vm'
  })

  .state('app.register', {
    url: '/register',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
  .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'AppCtrl as vm'
        }
      }
    })
    .state('app.categories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'CategoryCtrl'
        }
      }
    }).state('app.order', {
      url: '/order',
      views: {
        'menuContent': {
          templateUrl: 'templates/order.html',
          controller: 'CheckoutCtrl'
        }
      }
    })
    .state('app.menu_items', {
      url: '/menu_items',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu_items.html',
          controller: 'MenuCtrl'
        }
      }
    })
    .state('app.checkout', {
      url: '/checkout',
      views: {
        'menuContent': {
          templateUrl: 'templates/checkout.html',
          controller: 'CheckoutCtrl'
        }
      }
    })
    .state('app.allitems', {
      url: '/allitems',
      views: {
        'menuContent': {
          templateUrl: 'templates/allitems.html',
          controller: 'AllitemsCtrl'
        }
      }
    })
    .state('app.offers', {
      url: '/offers',
      views: {
        'menuContent': {
          templateUrl: 'templates/offers.html',
          controller: 'OffersCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/login');
  $httpProvider.interceptors.push('APIInterceptor');
});

'use strict';

// Declare app level module which depends on views, and components
var cloudNestApp = angular.module('cloudNestApp', [
  'ngRoute',
  'cloudNestApp.logicalManagment',
  'cloudNestApp.login',
  'cloudNestApp.version',
  'ui.bootstrap',
<<<<<<< HEAD
  'ngBreadcrumbs','ngMaterial'
=======
<<<<<<< HEAD
  'ngBreadcrumbs','ngMaterial'
=======
  'ngBreadcrumbs'
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  				when('/about', {
  					templateUrl: "views/about/about.html",
  				}).
  				when('/' , {
  					templateUrl: "views/home/home.html"
  				}).
  				otherwise({
  					redirectTo: '/'});
}])

.controller('MainController', function($rootScope,$scope, $location, $route, BreadCrumbsService) 
{ 
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.upgradeRegistered = function(){
        componentHandler.upgradeAllRegistered()
    }
    $scope.stopPropagation = function($event){
        $event.stopImmediatePropagation();
    }
    $scope.enableEdit=function(){
        $scope.isEditEnable = true;
    }
    
<<<<<<< HEAD
=======
=======
>>>>>>> 9c97dde2cd209287eb9d1bc1495512c4a5efcc29
>>>>>>> efca8af042c5574c02c50f1d121e2529a23afbe3
    $scope.pushBreadCrumb = function (collectionName, fullRoute) {
    var key;
    var added = false;
    for(key in $scope.bcrumbs){
      if ($scope.bcrumbs[key].label === collectionName){
        $scope.bcrumbs[key].href= '#'+fullRoute;
        added = true;
      }
    }
    if (!added){
      $scope.bcrumbs.push(
    {
      href:'#'+fullRoute,
      label: collectionName,
    })
    }
    localStorage.setItem("cn-bcrumbs",JSON.stringify($scope.bcrumbs));
  };
  $scope.signIn= function (newUser) {
    $scope.user= newUser;
    localStorage.setItem("cn-user",JSON.stringify(newUser))}
  $scope.signOut= function () {
    $scope.user= "";
    localStorage.removeItem("cn-user")}
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };

    $scope.$on( "$routeChangeStart", function(event, next, current) {
      if (next.state){
        if ($scope.bcrumbs){
          $scope.refreshBreadCrumbs('home',next.state);
          }
        $scope.state = next.state;
      }
      else {
        $scope.state = 'off';
      }
    });
  $scope.refreshBreadCrumbs = function (id,state) {
    var crumbsCopy = $scope.bcrumbs.slice();
    var visibleCrumbs= crumbsCopy.map(function (crumb){return crumb.label});
    var index = visibleCrumbs.indexOf(state);
    if (index>=0) $scope.bcrumbs.splice(index+1);
    BreadCrumbsService.setBreadCrumbs(id, $scope.bcrumbs);
  };

  $scope.go = function(collection, path){
    $location.path(path);
    $scope.pushBreadCrumb(collection, path);
  };
  $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) {
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply();
        }
  };
  if (localStorage.getItem("cn-user"))
  {
    $scope.user = JSON.parse(localStorage.getItem("cn-user"));
    if ($location.path()==="/") {$scope.changeRoute("#/region");console.log("de")}
  };
  if ($location.path()!="/" && $location.path()!="/about" && $location.path()!="/login"){
    if (!localStorage.getItem("cn-user")){$scope.changeRoute("#/login")}
  }
  if (localStorage.getItem("cn-bcrumbs"))
  {
    $scope.bcrumbs = JSON.parse(localStorage.getItem("cn-bcrumbs"));
  }
  else 
  {$scope.bcrumbs = [];
  $scope.pushBreadCrumb('regions',"/region");
  };
  //BreadCrumbsService.setBreadCrumbs('home',$scope.bcrumbs);
}).
run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            componentHandler.upgradeAllRegistered();
        });
    });
});
angular.module('ngBreadcrumbs', []).factory('BreadCrumbsService', function($rootScope, $log) {
    var data = {};
    var ensureIdIsRegistered = function(id) {
        if (angular.isUndefined(data[id])) {
            data[id] = [];
        }
    };
    return {
        push: function(id, item) {
            ensureIdIsRegistered(id);
            data[id].push(item);
            $log.log( "$broadcast" );
            $rootScope.$broadcast( 'breadcrumbsRefresh' );
        },
        get: function(id) {
            ensureIdIsRegistered(id);
            return angular.copy(data[id]);
        },
        setLastIndex: function( id, idx ) {
            ensureIdIsRegistered(id);
            if ( data[id].length > 1+idx ) {
                data[id].splice( 1+idx, data[id].length - idx );
            }
        },
        cleanBreadCrumbs: function (id){
            ensureIdIsRegistered(id);
            data[id]=[];
            $rootScope.$broadcast( 'breadcrumbsRefresh' );
        },
        setBreadCrumbs: function (id,crumbs){
            var key;
            data[id]=[];
            for (key in crumbs) {
              data[id].push({
                href: crumbs[key].href,
                label: crumbs[key].label
              });
            }
            $rootScope.$broadcast( 'breadcrumbsRefresh' );
            localStorage.setItem("cn-bcrumbs",JSON.stringify(crumbs));
        }
    };
}).directive('breadCrumbs', function($log, BreadCrumbsService) {
    return {
        restrict: 'A',
        template: '<ul class="breadcrumb"><li ng-repeat=\'bc in breadcrumbs\' ng-class="{\'active\': {{$last}} }"><a ng-click="unregisterBreadCrumb( $index )" ng-href="{{bc.href}}">{{bc.label}}</a><span class="divider" ng-show="! $last"></span></li></ul>',
        replace: true,
        compile: function(tElement, tAttrs) {
            return function($scope, $elem, $attr) {
                var bc_id = $attr['id'],
                    resetCrumbs = function() {
                        $scope.breadcrumbs = [];
                        angular.forEach(BreadCrumbsService.get(bc_id), function(v) {
                            $scope.breadcrumbs.push(v);
                        });
                    };
                resetCrumbs();
                $scope.unregisterBreadCrumb = function( index ) {
                    BreadCrumbsService.setLastIndex( bc_id, index );
                    resetCrumbs();
                };
                $scope.$on( 'breadcrumbsRefresh', function() {
                    resetCrumbs();
                });
            }
        }
    };

});

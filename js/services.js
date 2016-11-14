'use strict';

/* Services */

angular.module('raw.services', [])

	.factory('dataService', function ($http, $q, $timeout) {
		  
		  return {
		    
		    loadSample : function(sample){
		      var deferred = $q.defer();
		      $http.get(sample)
			      .then(function(response){
			          deferred.resolve(response.data);
			      },
			      function(){
			          deferred.reject("An error occured while getting sample (" + sample.title + ")");
			      });
		      
		      return deferred.promise;
		    },

		    debounce : function (func, wait, immediate) {
			    var timeout;
			    var deferred = $q.defer();
			    return function() {
			      var context = this, args = arguments;
			      var later = function() {
			        timeout = null;
			        if(!immediate) {
			          deferred.resolve(func.apply(context, args));
			          deferred = $q.defer();
			        }
			      };
			      var callNow = immediate && !timeout;
			      if ( timeout ) {
			        $timeout.cancel(timeout);
			      }
			      timeout = $timeout(later, wait);
			      if (callNow) {
			        deferred.resolve(func.apply(context,args));
			        deferred = $q.defer();
			      }
			      return deferred.promise;
			    };
			  }

	  	}
	})
	.service('summaryPicker', function($http, $q) {
    var _this = this;

    this.get = function() {
        var defer = $q.defer();

        $http.get('sprintData/summary.txt')
            .success(function(data) {
                angular.extend(_this, data);
                defer.resolve(data);
            })
            .error(function() {
                defer.reject('could not find summary.txt');
            });

        return defer.promise;
    }
});


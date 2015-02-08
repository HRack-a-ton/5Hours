angular.module('starter')
	.directive('starRating',function(){
		return {
			restrict: 'E',
			replace: true,
			template:"<span class='stars'> </span>",
			link: function(scope,ele,attr){
				console.log(scope)
				ele.text("    "+scope.poll.averageRating+" stars")
			}
		}
	})
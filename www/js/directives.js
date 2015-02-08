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
	.directive('chart',function(){
	  var aggregateResults = function(poll){
	    results = {'yes': 0, 'no': 0}
	    if(poll.pollResponses){
	      for(var key in poll.pollResponses){
	        if(poll.pollResponses[key]){
	          poll.pollResponses[key].thisUsersAnswer.toLowerCase()==='yes' ? results.yes++ : results.no++;
	        }
	      }
	    }
	    return results;
	  };
	  return {
	    restrict: 'E',
	    replace: true,
	    scope:{
	      data: '=',
	      poll: '='
	    },
	    template: "<canvas id='myChart' width='400' height='100'></canvas>",
	    link: function(scope,ele,attr){
	      var ctx = ele[0].getContext("2d");
	      var data = {
	          labels: ["Yes", "No"],
	          datasets: [
	            {
	              label: "My First dataset",
	              fillColor: "rgba(151,187,205,0.2)",
	              strokeColor: "rgba(151,187,205,1)",
	              pointColor: "rgba(151,187,205,1)",
	              pointStrokeColor: "#fff",
	              pointHighlightFill: "#fff",
	              pointHighlightStroke: "rgba(151,187,205,1)",
	              data: [aggregateResults(scope.poll).yes, aggregateResults(scope.poll).no]
	            }
	          ]
	      };
	      var myBarChart = new Chart(ctx).Bar(data);
	    }
	  }
	})
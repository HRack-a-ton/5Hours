angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, auth, $state, store) {
  auth.signin({
    closable: false,
    // This asks for the refresh token
    // So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    //temporarily just go to tab.polls
    $state.go('tab.polls');
    /////////////////////
    auth.getToken({
      api: 'firebase'
    }).then(function(delegation) {
      store.set('firebaseToken', delegation.id_token);
      $state.go('tab.polls');
    }, function(error) {
      console.log("There was an error logging in", error);
    })
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})


.controller('PollsCtrl', function($scope, Polls, $ionicModal) {
 $ionicModal.fromTemplateUrl('templates/poll-add-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.newFriend = {
    name: '',
    description: ''
  };

  $scope.aggregateResults = function(poll){
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

  $scope.polls = Polls.asArray;

  $scope.showAddFriend = function() {
    $scope.modal.show();
  };

  $scope.addFriend = function() {
    if(!$scope.newFriend.$id) {
      Polls.add($scope.newFriend);
    } else {
      Polls.save($scope.newFriend);
    }
    $scope.newFriend = {};
    $scope.modal.hide();
  };

  $scope.deleteFriend = function(friend) {
    Polls.delete(friend);
  };

  $scope.editFriend = function(friend) {
    $scope.newFriend = friend;
    $scope.modal.show();
  };

  $scope.close = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

.controller('singlePollCtrl', function($scope, $stateParams, Polls) {
  $scope.poll = Poll.get($stateParams.pollId);
})

.controller('AccountCtrl', function($scope, auth, $state, store) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login');
  }
})

.controller('NewPollCtrl', function($scope, Polls, $state, store) {
  $scope.submitNewPost = function(pollData) {
    if(typeof pollData != "string" || pollData.length <= 0)
      return;

    console.log("working", pollData)  
    var poll = {
      name: pollData
    };

    Polls.add(poll);
    $scope.pollData = "";
  }
});

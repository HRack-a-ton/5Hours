
angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
.service('Polls', function($firebase, store, $state) {
  var pollsRef = new Firebase("https://sizzling-torch-1069.firebaseio.com/polls");
  var fb = new Firebase("https://sizzling-torch-1069.firebaseio.com");
  //set token so we can access database
  pollsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      // $state.go('login');
    }
  });

  fb.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      // $state.go('login');
    }
  });
  var polls = {asArray: []};
  var fbSync = $firebase(fb);
  var fbpolls = fbSync.$asObject();

  // console.log(polls)
  this.sync = function(){
    return ;
  }
  this.all = function() {
    fbpolls.$loaded().then(function(data){
      angular.copy(data.polls, polls);
    });

    return polls;
  };

  this.add = function(friend) {
    polls.$add(friend);
  };

  this.get = function(id) {
    return polls.$getRecord(id);
  };

  this.save = function(friend) {
    polls.$save(friend);
  };

  this.delete = function(friend) {
    polls.$remove(friend);
  };

});
// angular.module('starter.services', ['firebase'])

// /**
//  * A simple example service that returns some data.
//  */
// .service('Friends', function($firebase, store, $state) {
//   var friendsRef = new Firebase("https://auth0-ionic-sample.firebaseio.com/friends");
//   friendsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
//     if (error) {
//       // There was an error logging in, redirect the user to login page
//       $state.go('login');
//     }
//   });
//   //Sets up a link with firebase /friends api
//   var friendsSync = $firebase(friendsRef);
//   //creates
//   var friends = friendsSync.$asArray();

//   this.all = function() {
//     return friends;
//   };

//   this.add = function(friend) {
//     friends.$add(friend);
//   };

//   this.get = function(id) {
//     return friends.$getRecord(id);
//   };

//   this.save = function(friend) {
//     friends.$save(friend);
//   };

//   this.delete = function(friend) {
//     friends.$remove(friend);
//   };

// });
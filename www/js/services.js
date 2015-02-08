
angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
.service('Polls', function($firebase, store, $state) {
  var ref = new Firebase("https://sizzling-torch-1069.firebaseio.com/polls");
  //set token so we can access database
  ref.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      // $state.go('login');
    }
  });

  this.asArray = $firebase(ref).$asArray();

  this.all = function(){
    return polls;
  }

  this.add = function(poll) {
    ref.push(poll);
  };

  this.get = function(id) {
    return polls.$getRecord(id);
  };

  this.save = function(poll) {
    polls.$save(poll);
  };

  this.delete = function(poll) {
    polls.$remove(poll);
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
angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
.service('Friends', function ($firebase, store, $state) {

    /**
     * Example given is
     *   var friendsRef = new Firebase("https://<your-account>.firebaseio.com/<your collection>");
     * 
     * This scaffold included:
     *   var friendsRef = new Firebase("https://auth0-ionic-sample.firebaseio.com/friends");
     * 
     * From page:
     *   https://auth0.com/docs/scenarios/ionic-and-firebase
     **/
    var friendsRef = new Firebase("https://sizzling-torch-1069.firebaseio.com/");
    // Here we're using the Firebase Token we stored after login
    friendsRef.authWithCustomToken(store.get('firebaseToken'), function (error, auth) {
        if (error) {
            // There was an error logging in, redirect the user to login page
            $state.go('login');
        }
    });

    var friendsSync = $firebase(friendsRef);
    var friends = friendsSync.$asArray();

    this.all = function () {
        return friends;
    };

    this.add = function (friend) {
        friends.$add(friend);
    };

    this.get = function (id) {
        return friends.$getRecord(id);
    };

    this.save = function (friend) {
        friends.$save(friend);
    };

    this.delete = function (friend) {
        friends.$remove(friend);
    };

});
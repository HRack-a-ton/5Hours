var Location = function () {


    this.options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

//    {
//        users: {
//            "Aaron Melocik": {
//                "pollsCreated": {
//
//                }
//            },
//            "Mike Luby": {
//
//            }
//        }
//
//
//    }


}







if ("geolocation" in navigator) {
    /**
     * geolocation.prototype is:
     *
     *   getCurrentPosition()
     *   clearWatch()
     **/


    var location = navigator.geolocation;

} else {
    console.log('not here')
}





};

Location.prototype.constructor = Location;
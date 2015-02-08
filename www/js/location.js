/**
 * geolocation.prototype is:
 *   getCurrentPosition()
 *   clearWatch()
 *
 * Returns:
 *   coordinates: {
 *     latitude: 123,
 *     longitude: 123,
 *     accuracy: 123 // in meters
 *   } // end coordinates
 **/
var Location = function () {
    var _this = this;

    _this.options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    _this.coordinates = {};
}; // end Location()

Location.prototype.constructor = Location;

Location.prototype.getLocation = function() {
  var _this = this;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      _this.coordinates = pos.coords;
    };

    console.log('DEBUG: position is ',  _this.coordinates.latitude, _this.coordinates.longitude, '; accuracy = ', _this.coordinates.accuracy, ' m.'); // Your current position is:
    return _this.coordinates;
  }, function(error) { // end if ("geolocation" in navigator)
    console.warn('ERROR(' + err.code + '): ' + err.message, 'your device may not support location.');
  }, options);
}; // end getLocation()
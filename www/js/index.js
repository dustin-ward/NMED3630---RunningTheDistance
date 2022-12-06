var lat;
var long;
var map;
var yourMarker;
var geoOpts = {
  enableHighAccuracy: true,
};

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOpts);
}
function geoSuccess(position) {
  // console.log(position);
  lat = position.coords.latitude;
  long = position.coords.longitude;

  coords = { lat: lat, lng: long };
  // if (map) map.setCenter(coords);
  if (yourMarker) yourMarker.setPosition(coords);
}
function geoError(message) {
  alert(message.message);
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  var watchID = navigator.geolocation.watchPosition(
    geoSuccess,
    geoError,
    geoOpts
  );

  app.store.dispatch("calcUserScore");
}


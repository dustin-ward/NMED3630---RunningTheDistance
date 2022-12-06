var lat;
var long;
var map;
var yourMarker;
var home;
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

  let distance = calcCrow(coords, home.location);
  $("#curScore").html(`${Math.round(distance*1000)/1000}km`)
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

  home = app.store.getters.getHome.value;
  app.store.dispatch("calcUserScore");
}


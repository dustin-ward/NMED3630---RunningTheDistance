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

  // Camera Options
  var options = {
    // quality: 80,
    destinationType: Camera.DestinationType.FILE_URI,
  };

  // Photo button click event handler
  $("#takePhoto").on("click", () => {
    navigator.camera.getPicture(onSuccess, onFail, options);
  });

  // On successful image
  function onSuccess(imageData) {
    resolveLocalFileSystemURL(
      imageData,
      function (fileEntry) {
        let imgURL = fileEntry.toURL();
        let img = new Image();
        img.src = imgURL;
        console.log("Picture taken:", img.src, "at", lat, long);
        let uid = app.store.getters.genUid.value;
        let photo = {
          id: uid,
          url: imgURL,
          location: {
            lat: lat,
            lng: long,
          },
        };
        app.store.dispatch("addPhoto", photo);
      },
      onFail
    );
  }

  // On failure to take image
  function onFail(message) {
    console.log("ERROR", message);
    alert("Error: Image not taken");
  }

  app.store.dispatch("calcPoints");
}

$(document).on("page:init", '.page[data-name="map"]', function () {
  //CREATE THE MAP
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: lat, lng: long },
  });

  yourMarker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
  });

  var markers = [];
  console.log("STORE", app.store.getters.photos);
  app.store.dispatch("calcPoints");
  app.store.getters.photos.value.map((photo) => {
    let image = {
      url: photo.url,
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(18, 50),
    };

    let newMarker = new google.maps.Marker({
      map: map,
      title: photo.id.toString(),
      position: photo.location,
      icon: image,
    });

    newMarker.addListener("click", () => {
      console.log("Marker clicked!");
    });

    markers = [...markers, newMarker];
  });
});

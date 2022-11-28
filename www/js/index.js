
var lat;
var long;
var geoOpts = {
    enableHighAccuracy: true
}
function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOpts);
}
function geoSuccess(position) {
    console.log(position);
    lat = position.coords.latitude
    long = position.coords.longitude;
    //$("#currentPos").append("<p>" + lat + ", " + long + "</p>")
}
function geoError(message) {
    alert(message.message)
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  var watchID = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOpts);

  // Camera Options
  var options = {
    quality: 100,
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
        var imgURL = fileEntry.toURL();
        var img = new Image();
        img.src = imgURL;
        //$("#imageContainer").append(img);
        console.log("Picture taken:", img.src, "at", lat,long);
      },
      onFail
    );
  }

  // On failure to take image
  function onFail(message) {
    console.log("ERROR", message);
    alert("Error: Image not taken");
  }
}

$(document).on("page:init", '.page[data-name="map"]', function () {
  //CREATE THE MAP
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: { lat: lat, lng: long },
  });
  //ADD THE MARKER
  var marker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
  });
});

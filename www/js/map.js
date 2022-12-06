var markers = [];

$(document).on("page:init", '.page[data-name="map"]', function () {
  //CREATE THE MAP
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: lat, lng: long },
  });

  console.log("STORE", app.store.getters.photos);
  app.store.dispatch("calcPoints");
  addMarkers();

  yourMarker = new google.maps.Marker({
    position: { lat: lat, lng: long },
    map: map,
    label: {
      text: "\ue412",
      fontFamily: "Material Icons",
      color: "#ffffff",
      fontSize: "18px",
    },
  });

  homeMarker = new google.maps.Marker({
    position: app.store.getters.getHome.value.location,
    map: map,
    label: {
      text: "\ue587",
      fontFamily: "Material Icons",
      color: "#ffffff",
      fontSize: "18px",
    },
  });

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
        addMarkers();
      },
      onFail
    );

    let score = app.store.getters.getUserScore.value;
    console.log("SCORE", score);
  }

  // On failure to take image
  function onFail(message) {
    console.log("ERROR", message);
    alert("Error: Image not taken");
  }
});

function addMarkers() {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];

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
}

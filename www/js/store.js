window.store = Framework7.createStore({
  state: {
    photos: [
      {
        id: "0",
        url: "https://via.placeholder.com/1080x1920",
        location: {
          lat: 49.666,
          lng: -112.865,
        },
      },
      {
        id: "1",
        url: "https://via.placeholder.com/1080x1920",
        location: {
          lat: 49.709,
          lng: -112.839,
        },
      },
    ],
    home: {
      location: {
        lat: 49.6767,
        lng: -112.863,
      },
    },
  },
  getters: {
    photos({ state }) {
      return state.photos;
    },

    getPhoto({ state }, { id }) {
      for (p in state.photos) {
        if (p.id == id) return p;
      }
    },

    // Code snipped from article about generating unique ids in JavaScript
    // https://learnersbucket.com/examples/javascript/unique-id-generator-in-javascript
    genUid() {
      let genRandDigits = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      };
      return (
        genRandDigits() +
        "-" +
        genRandDigits() +
        "-" +
        genRandDigits() +
        "-" +
        genRandDigits()
      );
    },
  },
  actions: {
    addPhoto({ state }, photo) {
      state.photos = [...state.photos, photo];
    },

    calcPoints({ state }) {
      state.photos.forEach((photo) => {
        photo.score = calcCrow(state.home.location, photo.location);
      });
    },
  },
});

// Calculate the distance between two coordinates.
// Taken from https://www.folkstalk.com/tech/js-calculate-distance-between-two-coordinates-with-code-examples/
function calcCrow(p1, p2) {
  let lat1 = p1.lat;
  let lon1 = p1.lng;
  let lat2 = p2.lat;
  let lon2 = p2.lng;
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
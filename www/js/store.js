window.store = Framework7.createStore({
  state: {
    photos: [
      {
        id: 0,
        url: "https://via.placeholder.com/50",
        location: {
          lat: 49.666,
          lng: -112.865,
        },
      },
      {
        id: 1,
        url: "https://via.placeholder.com/50",
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
  },
});

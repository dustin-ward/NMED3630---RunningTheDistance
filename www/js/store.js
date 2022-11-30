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
          lng: -112.8630,
        },
    }
  },
  getters: {
    photos({ state }) {
      return state.photos;
    },
    getPhoto({state},{id}) {
      for(p in state.photos) {
        if(p.id == id)
          return p;
      }
    }
  },
  actions: {
    addPhoto({ state }, photo) {
      state.photos = [...state.photos, photo];
    },
  },
});
